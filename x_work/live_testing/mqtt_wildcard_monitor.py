#!/usr/bin/env python3
"""Phase 3 — Wildcard '#' diagnostic monitor.

Subscribes to the multi-level wildcard '#' on the test broker and logs every
message (topic | qos | retain | payload) with a timestamp, to capture all
responses / events / heartbeats and any transient/undocumented topics.

Usage:
    python mqtt_wildcard_monitor.py [--host H] [--port P] [--seconds N] [--scope #]

Behavior notes / honesty:
  * On the MOCK/FALLBACK path (this run) a local broker only re-emits what test
    clients publish, so '#' validates ROUTING, not firmware-originated traffic.
  * On a LIVE path, device-originated messages on MDM/clients/resp|event would be
    real firmware traffic. The device session was NOT proven attached this run, so
    nothing captured here may be labeled [verified-on-device].
"""
import argparse, json, time, sys
from datetime import datetime, timezone
import paho.mqtt.client as mqtt

LOGFILE = "wildcard_capture.log"

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--host", default="192.168.1.6")
    ap.add_argument("--port", type=int, default=1883)
    ap.add_argument("--seconds", type=float, default=12.0)
    ap.add_argument("--scope", default="#", help="subscription filter (e.g. '#' or 'MDM/clients/#')")
    ap.add_argument("--logfile", default=LOGFILE)
    args = ap.parse_args()

    log = open(args.logfile, "a", encoding="utf-8")
    def emit(line):
        print(line, flush=True)
        log.write(line + "\n"); log.flush()

    count = {"n": 0}
    emit(f"# ==== wildcard monitor start {datetime.now(timezone.utc).isoformat()} "
         f"host={args.host}:{args.port} scope={args.scope!r} window={args.seconds}s ====")

    def on_connect(c, u, flags, rc, *a):
        emit(f"# [connect] rc={rc} ({'ok' if rc == 0 else 'REFUSED'})")
        if rc == 0:
            c.subscribe(args.scope, 0)
            if args.scope != "#":
                c.subscribe("$SYS/broker/clients/connected", 0)

    def on_message(c, u, msg):
        count["n"] += 1
        ts = datetime.now(timezone.utc).strftime("%H:%M:%S.%f")[:-3]
        payload = msg.payload.decode("utf-8", "replace")
        emit(f"{ts} | topic={msg.topic} | qos={msg.qos} | retain={bool(msg.retain)} | {payload[:500]}")

    try:
        cl = mqtt.Client(client_id="iotc-wildcard-monitor", clean_session=True,
                         callback_api_version=mqtt.CallbackAPIVersion.VERSION1)
    except Exception:
        cl = mqtt.Client(client_id="iotc-wildcard-monitor", clean_session=True)
    cl.on_connect = on_connect
    cl.on_message = on_message
    try:
        cl.connect(args.host, args.port, keepalive=30)
    except Exception as e:
        emit(f"# [FATAL] cannot connect to broker {args.host}:{args.port}: {e}")
        emit("# wildcard capture BLOCKED: no broker available")
        log.close(); sys.exit(2)
    cl.loop_start()
    time.sleep(args.seconds)
    cl.loop_stop(); cl.disconnect()
    emit(f"# ==== wildcard monitor stop — {count['n']} message(s) captured ====")
    log.close()

if __name__ == "__main__":
    main()
