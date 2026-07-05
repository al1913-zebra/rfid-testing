#!/usr/bin/env python3
"""get_installed_certificates edge/error probes (read-only, safe). Captures ALL resp-topic
traffic in a window after each publish (so replies are caught even when requestId is omitted)."""
import json, time, uuid
import paho.mqtt.client as mqtt
B="10.117.229.9"; CMND="zebra/MDM/clients/cmnd/RFD40-24190525100255"; RESP="zebra/MDM/clients/resp/RFD40-24190525100255"
msgs=[]; st={"rc":None}
def nc(c):
    try: return mqtt.Client(client_id=c,clean_session=True,callback_api_version=mqtt.CallbackAPIVersion.VERSION1)
    except Exception: return mqtt.Client(client_id=c,clean_session=True)
def oc(c,u,f,rc,*a):
    st["rc"]=rc
    if rc==0: c.subscribe([(RESP,1)])
def om(c,u,m):
    msgs.append((time.strftime("%H:%M:%S"), m.payload.decode("utf-8","replace")))
cl=nc("gic-"+uuid.uuid4().hex[:8]); cl.on_connect=oc; cl.on_message=om
cl.connect(B,1883,keepalive=30); cl.loop_start(); time.sleep(1.5)
print("connect rc=",st["rc"])

def probe(label, env, wait=6.0):
    base=len(msgs)
    cl.publish(CMND, json.dumps(env), qos=1)
    print(f"\n--- {label} ---\n  sent: {json.dumps(env)[:120]}")
    t0=time.time()
    while time.time()-t0<wait:
        if len(msgs)>base:
            time.sleep(1.0); break
        time.sleep(0.15)
    new=msgs[base:]
    if not new: print("  reply: <none>")
    for ts,txt in new:
        try:
            j=json.loads(txt); rc=j.get("response",{}) or {}
            certs=(j.get("installedCerts",{}) or {}).get("certInfo")
            cn = (len(certs) if isinstance(certs,list) else ("obj" if isinstance(j.get("installedCerts"),dict) else "-"))
            print(f"  reply[{ts}]: command={j.get('command')} requestId={j.get('requestId')} code={rc.get('code')} desc={rc.get('description')!r} apiVersion={j.get('apiVersion')} certInfo={cn}")
        except Exception:
            print(f"  reply[{ts}] (raw): {txt[:160]}")

probe("P1 plural (canonical)",        {"command":"get_installed_certificates","requestId":"gic-plural"})
probe("P2 SINGULAR (file/title name)",{"command":"get_installed_certificate","requestId":"gic-singular"})
probe("P3 missing requestId",         {"command":"get_installed_certificates"})
probe("P4 extra unknown field",       {"command":"get_installed_certificates","requestId":"gic-extra","bogusField":"x"})
probe("P5 bogus command",             {"command":"get_installed_certs_typo","requestId":"gic-bogus"})
time.sleep(1.5)
cl.loop_stop()
try: cl.disconnect()
except Exception: pass
print(f"\n[total resp messages captured: {len(msgs)}]")
