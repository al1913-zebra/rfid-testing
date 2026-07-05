#!/usr/bin/env python3
"""End-to-end install_certificate: HTTP attempt (documents fetch behavior) + DIRECT fallback +
validation read-back. Patient preflight (device session is intermittent). Graceful teardown."""
import json, os, sys, time, uuid, socket, threading, functools
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import paho.mqtt.client as mqtt

BROKER, PORT = "10.117.229.9", 1883
HTTP_PORT = 8080
CERT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "certificates")
CMND = "zebra/MDM/clients/cmnd/RFD40-24190525100255"
RESP = "zebra/MDM/clients/resp/RFD40-24190525100255"
EVENT= "zebra/MDM/clients/event/RFD40-24190525100255"
RFID = "zebra/MDM/clients/rfid/RFD40-24190525100255"

# egress IP toward the broker (host may have drifted WiFi)
_s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
try: _s.connect((BROKER, PORT)); HOST_IP = _s.getsockname()[0]
finally: _s.close()
SERVER_URL = f"http://{HOST_IP}:{HTTP_PORT}"

def pem(n):
    with open(os.path.join(CERT_DIR, n), encoding="utf-8") as f: return f.read()
BUNDLE = {"ca_cert": pem("mqtt_ca_cert.pem"), "client_cert": pem("mqtt_client_cert.pem"), "client_key": pem("mqtt_client_key.pem")}

CA_INLINE = "-----BEGIN CERTIFICATE-----\nMIIDPTCCAiWgAwIBAgIUHtj1WDceNR9Nf+vZBB1Ne7sFmHkwDQYJKoZIhvcNAQEL\nBQAwLjEPMA0GA1UEAwwGVGVzdENBMQ4wDAYDVQQKDAVaZWJyYTELMAkGA1UEBhMC\nVVMwHhcNMjYwNTExMTMxNDQ3WhcNMzYwNTA4MTMxNDQ3WjAuMQ8wDQYDVQQDDAZU\nZXN0Q0ExDjAMBgNVBAoMBVplYnJhMQswCQYDVQQGEwJVUzCCASIwDQYJKoZIhvcN\nAQEBBQADggEPADCCAQoCggEBANR8E/mxoQ5uTPW/muWnGoWDM7+YH5lIJiCM/n92\ndMLIQ+TVgb9mcOz80VnpgkQqomhbZaIG4CtnBufyIJvNKid+mgrrFh18HtMnE78d\nlGoPC4M469Rm+0oEN9GkUHgtgF2N4Qt9bYomySux3yyPlFuUOC+uaYRCCn3Hm8ko\nXE/a7XWdXeJkpIB0Mzzf7MoNq14AfX431RKgvpMgAqZTnDWtm4TVnK9Hq0t64tP7\naKIAJV2avJd87dF8x+K80kLBErDnKtuNFpXN7KoC7BBwdTzbG8VWYNUZeG8eCqBh\neL9MY5Ik7POmR0AM/TxRBLAXyoZHSPdEpEoaQZjSzJ7IHv0CAwEAAaNTMFEwHQYD\nVR0OBBYEFJHms5XPEyFYnVcf2++X9N8UlkahMB8GA1UdIwQYMBaAFJHms5XPEyFY\nnVcf2++X9N8UlkahMA8GA1UdEwEB/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEB\nAL4HEEMhuQ9sQLFE9wiGw4BIILxnX30FbphWM8/xpHKuYNsH/NOWpjulG+ZAxe8n\n+QUhaU9hruBEajT7mYjKvZ9NtUumcAmAh3s29KD4NpjwglqUYfKQpzT4QxkcMXuW\nzCmqlAqGVzK3ve/Fuurgdbk3kApOZTTyqFw629dmmRhoP+2sdCYMAukyf348/4Gl\nY6ZtwwAJygC4/WCfWg/7XaeQ+6kqKtY6ijSJFfCNwEPPY7CW3XAqP+kZ0e2taL5a\nrvm5UUPRMGCs20JOucntSF8uPOICNWUEr3DbqAJ4jXKhSHdsG6fNDyJIOzX1zn0j\nVqh5mX6k2PZe0eylcukyu/s=\n-----END CERTIFICATE-----"

HTTP_PAYLOAD = {"command":"install_certificate","requestId":"cert-test-001","certDetails":{
    "type":"mqtt","name":"testMqttCert","authenticationType":"CERTIFICATE","certSource":"HTTP","verificationType":"VERIFY_PEER",
    "caCertificateFileContent":CA_INLINE,
    "url":[{"key":"ca_cert","value":f"{SERVER_URL}/mqtt_ca_cert.pem"},
           {"key":"client_cert","value":f"{SERVER_URL}/mqtt_client_cert.pem"},
           {"key":"client_key","value":f"{SERVER_URL}/mqtt_client_key.pem"}]}}
DIRECT_PAYLOAD = {"command":"install_certificate","requestId":"cert-test-direct-e2e","certDetails":{
    "type":"mqtt","name":"testMqttCert","authenticationType":"NONE","certSource":"DIRECT","verificationType":"VERIFY_PEER",
    "certificateBundle":BUNDLE}}

http_log=[]
class Handler(SimpleHTTPRequestHandler):
    def log_message(self, fmt, *args):
        http_log.append((time.strftime("%H:%M:%S"), self.client_address[0], fmt % args))
        print(f"  [HTTP] {self.client_address[0]} -> {fmt % args}", flush=True)
def start_http():
    srv = ThreadingHTTPServer(("0.0.0.0", HTTP_PORT), functools.partial(Handler, directory=CERT_DIR))
    threading.Thread(target=srv.serve_forever, daemon=True).start(); return srv

responses={}; allmsgs=[]; st={"rc":None}
def nc(c):
    try: return mqtt.Client(client_id=c,clean_session=True,callback_api_version=mqtt.CallbackAPIVersion.VERSION1)
    except Exception: return mqtt.Client(client_id=c,clean_session=True)
def oc(c,u,f,rc,*a):
    st["rc"]=rc
    if rc==0: c.subscribe([(RESP,1),(EVENT,1),(RFID,1)])
def om(c,u,m):
    txt=m.payload.decode("utf-8","replace"); allmsgs.append((time.strftime("%H:%M:%S"),m.topic,txt[:200]))
    try:
        j=json.loads(txt); rid=j.get("requestId")
        if rid: responses[rid]=j
    except Exception: pass
cl=nc("e2e-"+uuid.uuid4().hex[:8]); cl.on_connect=oc; cl.on_message=om
cl.connect(BROKER,PORT,keepalive=30); cl.loop_start(); time.sleep(1.5)
print(f"[mqtt] broker connect rc={st['rc']}  | host egress IP={HOST_IP}  server={SERVER_URL}", flush=True)
if st["rc"]!=0: print("[FATAL] broker connect refused"); sys.exit(2)

def send(payload, label, timeout=10):
    rid=payload["requestId"]; responses.pop(rid,None)
    cl.publish(CMND, json.dumps(payload), qos=1)
    print(f"\n[publish] {label} rid={rid} -> {CMND}", flush=True)
    t0=time.time()
    while time.time()-t0<timeout:
        if rid in responses:
            r=responses[rid]; rc=r.get("response",{}) or {}
            print(f"  [resp] code={rc.get('code')} desc={rc.get('description')!r} apiVersion={r.get('apiVersion')}")
            return r
        time.sleep(0.12)
    print("  [resp] <none within timeout>"); return None
def probe(cmd, timeout=8):
    rid="e2e-"+uuid.uuid4().hex[:8]; responses.pop(rid,None)
    cl.publish(CMND, json.dumps({"command":cmd,"requestId":rid}), qos=1)
    t0=time.time()
    while time.time()-t0<timeout:
        if rid in responses: return responses[rid]
        time.sleep(0.1)
    return None

# patient preflight (device session intermittent)
print("[preflight] waiting for device session (up to 50s)...", flush=True)
att=None; t0=time.time()
while time.time()-t0<50:
    r=probe("get_version",6)
    if r is not None: att=r; break
    print(f"  ...waiting ({int(time.time()-t0)}s)", flush=True)
if att is None:
    print("\n[BLOCKER] device session NOT attached within 50s — cannot run the install flow this window.")
    cl.loop_stop(); sys.exit(3)
print(f"[preflight] ATTACHED: get_version code={att.get('response',{}).get('code')} apiVersion={att.get('apiVersion')}")

# baseline
bl=probe("get_installed_certificates"); blc=(bl.get("installedCerts",{}) or {}).get("certInfo",[]) if bl else []
print("[baseline] installed certs: %d: %s" % (len(blc), "; ".join("%s/%s" % (c.get('name'), c.get('type')) for c in blc)))

# --- Step: HTTP attempt ---
print("\n===== ATTEMPT 1: HTTP (server hosting) =====")
srv=start_http()
print(f"[http] serving {CERT_DIR} at {SERVER_URL}")
# self-check the URL loads from the host
import urllib.request
try:
    with urllib.request.urlopen(f"{SERVER_URL}/mqtt_ca_cert.pem", timeout=4) as rr:
        print(f"[http] self-check -> HTTP {rr.status}, {len(rr.read())} bytes (server serves)")
except Exception as e: print(f"[http] self-check failed: {e}")
send(HTTP_PAYLOAD, "HTTP install_certificate")
print("[http] watching ~25s for device fetches...")
t0=time.time();
while time.time()-t0<25: time.sleep(0.5)
dev_fetch=[r for r in http_log if r[1] not in (HOST_IP,"127.0.0.1","::1")]
print(f"[http] DEVICE fetches: {len(dev_fetch)} (self-checks excluded)  {dev_fetch}")
srv.shutdown(); print("[http] server stopped")

# --- Step: DIRECT fallback ---
print("\n===== ATTEMPT 2: DIRECT (inline bundle, firewall-free) =====")
send(DIRECT_PAYLOAD, "DIRECT install_certificate")

# --- validate ---
print("\n===== VALIDATION read-back =====")
time.sleep(2.0)
rb=probe("get_installed_certificates"); rbc=(rb.get("installedCerts",{}) or {}).get("certInfo",[]) if rb else []
print("[validate] installed certs: %d: %s" % (len(rbc), "; ".join("%s/%s/%s" % (c.get('name'), c.get('type'), c.get('serial')) for c in rbc)))

cl.loop_stop()
try: cl.disconnect()
except Exception: pass
print("\n==== ASYNC event/rfid messages ====")
for m in allmsgs:
    if "/resp/" not in m[1]: print("  ", m)
print("\n[teardown] HTTP server stopped, MQTT disconnected.")
