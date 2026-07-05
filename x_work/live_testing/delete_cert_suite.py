#!/usr/bin/env python3
"""delete_certificate test/validation suite. Captures the 3 operator payloads (wifi ca / mqtt
client / filestore ca) with before/after read-backs, plus error/edge probes. Reconnect-tolerant."""
import json, sys, time, uuid
import paho.mqtt.client as mqtt
B="10.117.229.9"; CMND="zebra/MDM/clients/cmnd/RFD40-24190525100255"; RESP="zebra/MDM/clients/resp/RFD40-24190525100255"
EVENT="zebra/MDM/clients/event/RFD40-24190525100255"
responses={}; allmsgs=[]; st={"rc":None}
def nc(c):
    try: return mqtt.Client(client_id=c,clean_session=True,callback_api_version=mqtt.CallbackAPIVersion.VERSION1)
    except Exception: return mqtt.Client(client_id=c,clean_session=True)
def oc(c,u,f,rc,*a):
    st["rc"]=rc
    if rc==0: c.subscribe([(RESP,1),(EVENT,1)])
def om(c,u,m):
    txt=m.payload.decode("utf-8","replace"); allmsgs.append((time.strftime("%H:%M:%S"),m.topic,txt[:200]))
    try:
        j=json.loads(txt); rid=j.get("requestId")
        if rid: responses[rid]=j
    except Exception: pass
cl=None
def connect():
    global cl
    cl=nc("delcert-"+uuid.uuid4().hex[:8]); cl.on_connect=oc; cl.on_message=om; st["rc"]=None
    cl.connect(B,1883,keepalive=30); cl.loop_start()
    t0=time.time()
    while time.time()-t0<5 and st["rc"] is None: time.sleep(0.1)
    return st["rc"]==0

def rt(label, command, extra=None, timeout=9.0, retries=3):
    for attempt in range(1,retries+1):
        rid="dc-"+uuid.uuid4().hex[:8]; env={"command":command,"requestId":rid}
        if extra: env.update(extra)
        responses.pop(rid,None)
        try: cl.publish(CMND,json.dumps(env),qos=1)
        except Exception: pass
        t0=time.time()
        while time.time()-t0<timeout:
            if rid in responses:
                r=responses[rid]; rc=r.get("response",{}) or {}
                print(f"\n--- {label} ---")
                print(f"  sent: {json.dumps(env)[:130]}")
                print(f"  resp: code={rc.get('code')} description={rc.get('description')!r} apiVersion={r.get('apiVersion')} (attempt {attempt})")
                if command.startswith("get_installed"):
                    certs=(r.get("installedCerts",{}) or {}).get("certInfo",[])
                    print(f"  certInfo({len(certs)}): " + "; ".join(f"{c.get('name')}/{c.get('type')}" for c in certs))
                return r
            time.sleep(0.12)
        print(f"  [{label}] attempt {attempt} no-response; reconnecting...")
        try: cl.loop_stop(); cl.disconnect()
        except Exception: pass
        time.sleep(3.0); connect(); time.sleep(1.0)
    print(f"\n--- {label} ---\n  resp: <NONE after {retries} attempts>")
    return None

def main():
    if not connect(): print(f"[FATAL] connect rc={st['rc']}"); sys.exit(2)
    print("[mqtt] connected to", B)
    if rt("PREFLIGHT get_version","get_version") is None:
        print("[BLOCKER] device not attached"); sys.exit(3)

    rt("BEFORE get_installed_certificates","get_installed_certificates")

    print("\n========== OPERATOR PAYLOADS (3) ==========")
    rt("D1 delete wifi ca_cert (not present -> expect not-found)","delete_certificate",
       {"certificateInfo":{"name":"ca_cert","type":"wifi"}})
    rt("D2 delete mqtt client_cert (present -> expect success)","delete_certificate",
       {"certificateInfo":{"name":"client_cert","type":"mqtt"}})
    rt("D3 delete filestore ca_cert (not present -> expect not-found)","delete_certificate",
       {"certificateInfo":{"name":"ca_cert","type":"filestore"}})

    rt("AFTER get_installed_certificates","get_installed_certificates")

    print("\n========== ERROR / EDGE PROBES ==========")
    rt("E1 invalid type enum 'bogus'","delete_certificate",
       {"certificateInfo":{"name":"x","type":"bogus"}})
    rt("E2 unknown extra field (closed-schema?)","delete_certificate",
       {"certificateInfo":{"name":"x","type":"mqtt"},"bogusField":"y"})
    rt("E3 missing required 'type' (payload required:[type])","delete_certificate",
       {"certificateInfo":{"name":"x"}})
    rt("E4 no certificateInfo at all","delete_certificate")

    time.sleep(2.0)
    cl.loop_stop()
    try: cl.disconnect()
    except Exception: pass
    evs=[m for m in allmsgs if "/resp/" not in m[1]]
    print(f"\n[async event/rfid messages: {len(evs)}]"); [print("  ",m) for m in evs]

if __name__=="__main__":
    main()
