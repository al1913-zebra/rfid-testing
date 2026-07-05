#!/usr/bin/env python3
"""Wait for the RFD40 MDM session to re-attach, then fire install_certificate ERROR probes
rapidly (rejected commands don't drop the session). DIRECT only."""
import json, os, sys, time, uuid
import paho.mqtt.client as mqtt

BROKER, PORT = "10.117.229.9", 1883
CERT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "certificates")
CMND="zebra/MDM/clients/cmnd/RFD40-24190525100255"; RESP="zebra/MDM/clients/resp/RFD40-24190525100255"
EVENT="zebra/MDM/clients/event/RFD40-24190525100255"; RFID="zebra/MDM/clients/rfid/RFD40-24190525100255"
def pem(n):
    with open(os.path.join(CERT_DIR,n),encoding="utf-8") as f: return f.read()
BUNDLE={"ca_cert":pem("mqtt_ca_cert.pem"),"client_cert":pem("mqtt_client_cert.pem"),"client_key":pem("mqtt_client_key.pem")}

responses={}; allmsgs=[]; st={"rc":None}
def newc(cid):
    try: return mqtt.Client(client_id=cid,clean_session=True,callback_api_version=mqtt.CallbackAPIVersion.VERSION1)
    except Exception: return mqtt.Client(client_id=cid,clean_session=True)
def on_connect(c,u,f,rc,*a):
    st["rc"]=rc
    if rc==0: c.subscribe([(RESP,1),(EVENT,1),(RFID,1)])
def on_message(c,u,msg):
    txt=msg.payload.decode("utf-8","replace"); allmsgs.append((time.strftime("%H:%M:%S"),msg.topic,txt[:200]))
    try:
        j=json.loads(txt); rid=j.get("requestId")
        if rid: responses[rid]=j
    except Exception: pass

cl=newc("cert-wait-"+uuid.uuid4().hex[:8]); cl.on_connect=on_connect; cl.on_message=on_message
cl.connect(BROKER,PORT,keepalive=30); cl.loop_start(); time.sleep(1.2)
if st["rc"]!=0: print(f"[FATAL] broker connect rc={st['rc']}"); sys.exit(2)
print("[mqtt] broker connected; waiting for device session to re-attach…", flush=True)

def probe(command, extra=None, timeout=8.0):
    rid="wp-"+uuid.uuid4().hex[:8]; env={"command":command,"requestId":rid}
    if extra: env.update(extra)
    responses.pop(rid,None); cl.publish(CMND,json.dumps(env),qos=1)
    t0=time.time()
    while time.time()-t0<timeout:
        if rid in responses: return responses[rid]
        time.sleep(0.1)
    return None

# poll get_version until attached (up to 120s)
attached=None; t0=time.time()
while time.time()-t0<120:
    r=probe("get_version", timeout=6.0)
    if r is not None: attached=r; break
    print(f"  …still waiting ({int(time.time()-t0)}s)", flush=True)
if attached is None:
    print("[BLOCKER] device did not re-attach within 120s — error-path live capture not possible this window.")
    cl.loop_stop(); sys.exit(3)
print(f"[attached] get_version code={attached.get('response',{}).get('code')} after {int(time.time()-t0)}s — firing error probes now", flush=True)

PROBES=[
 ("ERR-A direct + NO certificateBundle (expect 30)", {"certDetails":{"type":"mqtt","name":"tNoBundle","authenticationType":"NONE","certSource":"DIRECT","verificationType":"NONE"}}),
 ("ERR-B invalid certSource enum 'FTP'", {"certDetails":{"type":"mqtt","name":"tBadSrc","authenticationType":"NONE","certSource":"FTP","verificationType":"NONE","certificateBundle":BUNDLE}}),
 ("ERR-C missing required 'type'", {"certDetails":{"name":"tNoType","authenticationType":"NONE","certSource":"DIRECT","certificateBundle":BUNDLE}}),
 ("ERR-D invalid 'type' enum 'bogus'", {"certDetails":{"type":"bogus","name":"tBadType","authenticationType":"NONE","certSource":"DIRECT","certificateBundle":BUNDLE}}),
 ("ERR-E missing required 'authenticationType'", {"certDetails":{"type":"mqtt","name":"tNoAuth","certSource":"DIRECT","certificateBundle":BUNDLE}}),
]
for label,extra in PROBES:
    r=probe("install_certificate", extra, timeout=8.0)
    print(f"\n--- {label} ---")
    if r is None: print("  resp: <none>")
    else:
        rc=r.get("response",{}) or {}
        print(f"  resp: code={rc.get('code')} description={rc.get('description')!r} apiVersion={r.get('apiVersion')}")
    time.sleep(0.5)

cl.loop_stop()
try: cl.disconnect()
except Exception: pass
evs=[m for m in allmsgs if "/resp/" not in m[1]]
print(f"\n[async event/rfid: {len(evs)}]"); [print("  ",m) for m in evs]
