#!/usr/bin/env python3
"""End-to-end install_certificate test for RFD40 Premium+ via MQTT.

Self-contained: serves the ./certificates dir over HTTP (logging every device fetch),
preflights the device session (get_version), publishes install_certificate, captures the
correlated response, holds the server open for the fetch window, then tears down cleanly.
"""
import json, os, sys, time, uuid, threading, functools
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import paho.mqtt.client as mqtt

# ---- environment (from the task) ----
BROKER   = "10.117.229.9"
PORT     = 1883
HOST_IP  = "10.233.46.168"          # egress IP toward the device network
HTTP_PORT= 8080
CERT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "certificates")
SERVER_URL = f"http://{HOST_IP}:{HTTP_PORT}"
CMND_TOPIC = "zebra/MDM/clients/cmnd/RFD40-24190525100255"   # user-confirmed
RESP_TOPIC = "zebra/MDM/clients/resp/RFD40-24190525100255"   # user-confirmed
EVENT_TOPIC = "zebra/MDM/clients/event/RFD40-24190525100255" # async install status / alerts
FETCH_WINDOW = 90.0                 # seconds to keep HTTP server open after publish

# ---- the MQTT payload (verbatim from the task; {server_url} substituted) ----
PAYLOAD = {
  "command": "install_certificate",
  "requestId": "cert-test-003",
  "certDetails": {
    "type": "mqtt",
    "name": "testMqttCert",
    "authenticationType": "NONE",
    "certSource": "HTTP",
    "verificationType": "VERIFY_PEER",
    "caCertificateFileContent": "-----BEGIN CERTIFICATE-----\nMIIDPTCCAiWgAwIBAgIUHtj1WDceNR9Nf+vZBB1Ne7sFmHkwDQYJKoZIhvcNAQEL\nBQAwLjEPMA0GA1UEAwwGVGVzdENBMQ4wDAYDVQQKDAVaZWJyYTELMAkGA1UEBhMC\nVVMwHhcNMjYwNTExMTMxNDQ3WhcNMzYwNTA4MTMxNDQ3WjAuMQ8wDQYDVQQDDAZU\nZXN0Q0ExDjAMBgNVBAoMBVplYnJhMQswCQYDVQQGEwJVUzCCASIwDQYJKoZIhvcN\nAQEBBQADggEPADCCAQoCggEBANR8E/mxoQ5uTPW/muWnGoWDM7+YH5lIJiCM/n92\ndMLIQ+TVgb9mcOz80VnpgkQqomhbZaIG4CtnBufyIJvNKid+mgrrFh18HtMnE78d\nlGoPC4M469Rm+0oEN9GkUHgtgF2N4Qt9bYomySux3yyPlFuUOC+uaYRCCn3Hm8ko\nXE/a7XWdXeJkpIB0Mzzf7MoNq14AfX431RKgvpMgAqZTnDWtm4TVnK9Hq0t64tP7\naKIAJV2avJd87dF8x+K80kLBErDnKtuNFpXN7KoC7BBwdTzbG8VWYNUZeG8eCqBh\neL9MY5Ik7POmR0AM/TxRBLAXyoZHSPdEpEoaQZjSzJ7IHv0CAwEAAaNTMFEwHQYD\nVR0OBBYEFJHms5XPEyFYnVcf2++X9N8UlkahMB8GA1UdIwQYMBaAFJHms5XPEyFY\nnVcf2++X9N8UlkahMA8GA1UdEwEB/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEB\nAL4HEEMhuQ9sQLFE9wiGw4BIILxnX30FbphWM8/xpHKuYNsH/NOWpjulG+ZAxe8n\n+QUhaU9hruBEajT7mYjKvZ9NtUumcAmAh3s29KD4NpjwglqUYfKQpzT4QxkcMXuW\nzCmqlAqGVzK3ve/Fuurgdbk3kApOZTTyqFw629dmmRhoP+2sdCYMAukyf348/4Gl\nY6ZtwwAJygC4/WCfWg/7XaeQ+6kqKtY6ijSJFfCNwEPPY7CW3XAqP+kZ0e2taL5a\nrvm5UUPRMGCs20JOucntSF8uPOICNWUEr3DbqAJ4jXKhSHdsG6fNDyJIOzX1zn0j\nVqh5mX6k2PZe0eylcukyu/s=\n-----END CERTIFICATE-----",
    "url": [
      {"key": "ca_cert",     "value": f"{SERVER_URL}/mqtt_ca_cert.pem"},
      {"key": "client_cert", "value": f"{SERVER_URL}/mqtt_client_cert.pem"},
      {"key": "client_key",  "value": f"{SERVER_URL}/mqtt_client_key.pem"},
    ],
  },
}

http_log = []     # (ts, client_ip, method, path, status)

class Handler(SimpleHTTPRequestHandler):
    def log_message(self, fmt, *args):
        http_log.append((time.strftime("%H:%M:%S"), self.client_address[0], (args[0] if args else ""), str(args[1] if len(args)>1 else "")))
        print(f"  [HTTP] {time.strftime('%H:%M:%S')} {self.client_address[0]} -> {fmt % args}", flush=True)

def start_http():
    h = functools.partial(Handler, directory=CERT_DIR)
    srv = ThreadingHTTPServer(("0.0.0.0", HTTP_PORT), h)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv

# ---- MQTT ----
def new_client(cid):
    try:
        return mqtt.Client(client_id=cid, clean_session=True, callback_api_version=mqtt.CallbackAPIVersion.VERSION1)
    except Exception:
        return mqtt.Client(client_id=cid, clean_session=True)

responses = {}     # requestId -> json
all_msgs  = []      # (ts, topic, payload-short)
connected = {"rc": None}

def on_connect(c,u,f,rc,*a):
    connected["rc"] = rc
    print(f"[mqtt] connect rc={rc} ({'OK' if rc==0 else 'REFUSED'})", flush=True)
    if rc == 0:
        c.subscribe([(RESP_TOPIC,1), ("zebra/MDM/clients/event/RFD40-24190525100255",1),
                     ("zebra/MDM/clients/rfid/RFD40-24190525100255",1)])

def on_message(c,u,msg):
    try: txt = msg.payload.decode("utf-8","replace")
    except Exception: txt = "<binary>"
    all_msgs.append((time.strftime("%H:%M:%S"), msg.topic, txt[:200]))
    try:
        j = json.loads(txt); rid = j.get("requestId")
        if rid: responses[rid] = j
    except Exception:
        pass

def round_trip(cl, command, payload=None, rid=None, timeout=10.0):
    rid = rid or uuid.uuid4().hex[:16]
    env = {"command": command, "requestId": rid}
    if payload: env.update(payload)
    responses.pop(rid, None)
    cl.publish(CMND_TOPIC, json.dumps(env), qos=1)
    print(f"[mqtt] published '{command}' rid={rid} -> {CMND_TOPIC}", flush=True)
    t0 = time.time()
    while time.time()-t0 < timeout:
        if rid in responses: return responses[rid], rid
        time.sleep(0.15)
    return None, rid

def main():
    print(f"[http] serving {CERT_DIR} at {SERVER_URL}  (files: {os.listdir(CERT_DIR)})", flush=True)
    srv = start_http()
    # self-check: confirm the cert URL actually loads from the running server
    import urllib.request
    _u = f"{SERVER_URL}/mqtt_ca_cert.pem"
    try:
        with urllib.request.urlopen(_u, timeout=5) as r:
            print(f"[http] self-check {_u} -> HTTP {r.status}, {len(r.read())} bytes", flush=True)
    except Exception as e:
        print(f"[http] self-check FAILED: {e}", flush=True)
    cid = "cert-installer-" + uuid.uuid4().hex[:10]
    cl = new_client(cid)
    cl.on_connect = on_connect; cl.on_message = on_message
    cl.connect(BROKER, PORT, keepalive=30); cl.loop_start()
    time.sleep(1.5)
    if connected["rc"] != 0:
        print(f"[FATAL] broker connect refused rc={connected['rc']}"); srv.shutdown(); cl.loop_stop(); sys.exit(2)

    # --- preflight: confirm device session attached ---
    print("\n=== PREFLIGHT (get_version) ===", flush=True)
    pre, _ = round_trip(cl, "get_version", timeout=10.0)
    if pre is None:
        print("[preflight] NO RESPONSE — broker reachable but device session not attached/answering on these topics.", flush=True)
        attached = False
    else:
        print(f"[preflight] device ATTACHED: code={pre.get('response',{}).get('code')} "
              f"apiVersion={pre.get('apiVersion')} serial={pre.get('versionInfo',{}).get('serialNumber','?') if isinstance(pre.get('versionInfo'),dict) else '?'}", flush=True)
        attached = True

    # --- publish install_certificate ---
    print("\n=== PUBLISH install_certificate ===", flush=True)
    print(json.dumps(PAYLOAD, indent=2), flush=True)
    responses.pop("cert-test-003", None)
    cl.publish(CMND_TOPIC, json.dumps(PAYLOAD), qos=1)
    print(f"[mqtt] published 'install_certificate' rid=cert-test-003 -> {CMND_TOPIC}", flush=True)

    # --- hold the fetch window, surfacing resp + async event-topic messages live ---
    print(f"\n=== HOLDING HTTP server {FETCH_WINDOW:.0f}s; watching resp + event topics ===", flush=True)
    t0 = time.time(); install_resp = None; seen = len(all_msgs)
    while time.time()-t0 < FETCH_WINDOW:
        while seen < len(all_msgs):
            ts, topic, body = all_msgs[seen]; seen += 1
            tag = "EVENT" if "/event/" in topic else ("RESP" if "/resp/" in topic else "RFID/MSG")
            print(f"  [{tag}] {ts} {topic}\n        {body}", flush=True)
        if install_resp is None and "cert-test-003" in responses:
            install_resp = responses["cert-test-003"]
        time.sleep(0.3)

    # --- teardown ---
    cl.loop_stop()
    try: cl.disconnect()
    except Exception: pass
    srv.shutdown()
    print("\n[teardown] HTTP server stopped, MQTT disconnected.", flush=True)

    # --- report ---
    print("\n" + "="*60 + "\nRESULT SUMMARY\n" + "="*60, flush=True)
    print(f"preflight (device attached): {attached}")
    print(f"install_certificate response: {json.dumps(install_resp) if install_resp else 'NONE (no device reply within window)'}")
    selfips = {HOST_IP, "127.0.0.1", "::1"}
    dev = [r for r in http_log if r[1] not in selfips]
    selfc = [r for r in http_log if r[1] in selfips]
    print(f"DEVICE HTTP fetches ({len(dev)}):  <-- this is the real success signal")
    for r in dev: print("   ", r)
    print(f"(host self-check fetches, ignore: {len(selfc)})")
    print(f"other MQTT messages captured ({len(all_msgs)}):")
    for m in all_msgs[:12]: print("   ", m[0], m[1], m[2][:80])

if __name__ == "__main__":
    main()
