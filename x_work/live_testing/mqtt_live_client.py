#!/usr/bin/env python3
"""Robust live MQTT client for the Handheld RFID IOTC (RFD40/RFD90) device, designed to avoid the
recurring intermittent failures seen with ad-hoc capture scripts.

Root causes it addresses:
  1. Device-session intermittency — the RFD40's MQTT session is only attached when it is on Wi-Fi
     with its MDM endpoint active. When it is docked/USB-only, asleep, off-network, or its session is
     churning (keepAlive/reconnect), published commands have no subscriber and TIME OUT. This client
     does an attach PREFLIGHT and RETRIES with backoff, and reports a clear blocker instead of crashing.
  2. clientId collisions — two MQTT clients sharing a clientId cause the broker to EVICT the first
     (MQTT_ERR_CONN_LOST), so its in-flight request never completes. This client uses a UNIQUE
     uuid-based clientId per run, so retries/overlapping runs never collide.
  3. No-retry/short-timeout — a single transient blip became a hard failure. This client retries.

Usage:
  python mqtt_live_client.py get_wifi --requestId abc123
  python mqtt_live_client.py get_status
  python mqtt_live_client.py control_operation --payload "{\"ctrlOprPayload\":{\"controlType\":\"RFID\",\"operation\":\"START\"}}" --ep CTRL

Topics are built as {tenant}/{EP}/clients/{cmnd|resp|event}/{serial} (the device's real on-wire form).
"""
import argparse, json, sys, time, uuid
import paho.mqtt.client as mqtt


def new_client(cid):
    try:
        return mqtt.Client(client_id=cid, clean_session=True,
                           callback_api_version=mqtt.CallbackAPIVersion.VERSION1)
    except Exception:
        return mqtt.Client(client_id=cid, clean_session=True)


class LiveClient:
    def __init__(self, host, port, tenant, serial, ep, verbose=True):
        self.host, self.port = host, port
        self.cmnd = f"{tenant}/{ep}/clients/cmnd/{serial}"
        self.resp = f"{tenant}/{ep}/clients/resp/{serial}"
        self.event = f"{tenant}/{ep}/clients/event/{serial}"
        self.verbose = verbose
        self.cid = "iotc-live-" + uuid.uuid4().hex[:10]      # UNIQUE clientId -> no collisions
        self.responses = {}                                    # requestId -> parsed json
        self.unexpected_disconnect = {"rc": None}
        self.cl = new_client(self.cid)
        self.cl.on_connect = self._on_connect
        self.cl.on_disconnect = self._on_disconnect
        self.cl.on_message = self._on_message
        self._connected = {"rc": None}

    def _log(self, m):
        if self.verbose:
            print(m, flush=True)

    def _on_connect(self, c, u, f, rc, *a):
        self._connected["rc"] = rc
        self._log(f"[connect] clientId={self.cid} rc={rc} ({'ok' if rc == 0 else 'REFUSED'})")
        if rc == 0:
            c.subscribe([(self.resp, 1), (self.event, 1)])

    def _on_disconnect(self, c, u, *a):
        rc = a[-1] if a else None
        # rc 0 == we initiated; anything else mid-run is unexpected (e.g. clientId eviction = 7)
        try:
            code = int(rc[0]) if isinstance(rc, tuple) else int(rc)
        except Exception:
            code = None
        if code not in (0, None):
            self.unexpected_disconnect["rc"] = code
            self._log(f"[disconnect] UNEXPECTED rc={code}"
                      + ("  (clientId eviction — another client used the same id)" if code == 7 else ""))

    def _on_message(self, c, u, msg):
        try:
            j = json.loads(msg.payload.decode("utf-8", "replace"))
        except Exception:
            return
        rid = j.get("requestId") if isinstance(j, dict) else None
        if rid is not None:
            self.responses[rid] = j

    def connect(self):
        self.cl.connect(self.host, self.port, keepalive=30)
        self.cl.loop_start()
        time.sleep(1.5)
        return self._connected["rc"] == 0

    def close(self):
        self.cl.loop_stop()
        try:
            self.cl.disconnect()
        except Exception:
            pass

    def round_trip(self, command, payload=None, timeout=8.0, retries=3, backoff=2.0):
        """Publish a command and wait for the correlated device response; retry on timeout/eviction."""
        for attempt in range(1, retries + 1):
            rid = uuid.uuid4().hex[:16] if command == "_preflight" else None
            rid = rid or (payload.pop("__rid__", None) if isinstance(payload, dict) else None) or uuid.uuid4().hex[:16]
            env = {"command": command, "requestId": rid}
            if payload:
                env.update(payload)
            self.responses.pop(rid, None)
            self.cl.publish(self.cmnd, json.dumps(env), qos=1)
            t0 = time.time()
            while time.time() - t0 < timeout:
                if rid in self.responses:
                    return self.responses[rid], rid, attempt
                if self.unexpected_disconnect["rc"] == 7:
                    break  # evicted; retry with same (unique) client will re-establish
                time.sleep(0.15)
            self._log(f"[retry] {command} attempt {attempt}/{retries} timed out after {timeout}s"
                      + (f"; retrying in {backoff}s" if attempt < retries else ""))
            if attempt < retries:
                time.sleep(backoff)
        return None, None, retries

    def preflight(self, probe_command="get_version", timeout=6.0, retries=2):
        """Confirm the device session is attached by getting ANY correlated response."""
        resp, rid, _ = self.round_trip(probe_command, timeout=timeout, retries=retries, backoff=1.5)
        return resp is not None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("command")
    ap.add_argument("--requestId", default=None)
    ap.add_argument("--payload", default=None, help="JSON object string merged into the envelope")
    ap.add_argument("--host", default="192.168.1.6")
    ap.add_argument("--port", type=int, default=1883)
    ap.add_argument("--tenant", default="zebra")
    ap.add_argument("--serial", default="RFD40-24190525100255")
    ap.add_argument("--ep", default="MDM", help="endpoint type segment: MDM / CTRL / MGMT ...")
    ap.add_argument("--timeout", type=float, default=8.0)
    ap.add_argument("--retries", type=int, default=3)
    ap.add_argument("--no-preflight", action="store_true")
    ap.add_argument("--out", default=None)
    args = ap.parse_args()

    payload = json.loads(args.payload) if args.payload else None
    if args.requestId and payload is not None:
        payload["__rid__"] = args.requestId
    lc = LiveClient(args.host, args.port, args.tenant, args.serial, args.ep)
    if not lc.connect():
        print(f"[FATAL] broker connect refused (rc={lc._connected['rc']}) at {args.host}:{args.port}")
        lc.close(); sys.exit(2)

    if not args.no_preflight and args.command != "get_version":
        if not lc.preflight():
            print("\n[BLOCKER] device session NOT attached — preflight get_version got no response.")
            print("  The broker is reachable but the RFD40 is not answering. Likely the sled is off Wi-Fi,")
            print("  docked/USB-only, asleep, or its MDM session is down. Re-attach the sled and retry.")
            lc.close(); sys.exit(3)
        print("[preflight] device session attached (get_version answered).")

    # build payload + optional fixed requestId for the target command
    pl = payload
    if args.requestId and pl is None:
        pl = {"__rid__": args.requestId}
    resp, rid, attempt = lc.round_trip(args.command, payload=pl, timeout=args.timeout, retries=args.retries)
    lc.close()

    print(f"\n==== {args.command} ====")
    if resp is None:
        print(f"[BLOCKER] no device response after {args.retries} attempts (timeout {args.timeout}s each).")
        print(f"  unexpected_disconnect rc={lc.unexpected_disconnect['rc']}")
        sys.exit(3)
    code = resp.get("response", {}).get("code") if isinstance(resp.get("response"), dict) else None
    print(f"[OK] requestId={resp.get('requestId')} code={code} apiVersion={resp.get('apiVersion')} (attempt {attempt})")
    print(json.dumps(resp, indent=2))
    if args.out:
        with open(args.out, "w", encoding="utf-8") as f:
            json.dump(resp, f, indent=2)
        print(f"[saved] {args.out}")
    sys.exit(0)


if __name__ == "__main__":
    main()
