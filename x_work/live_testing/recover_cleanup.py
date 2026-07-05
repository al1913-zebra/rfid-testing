#!/usr/bin/env python3
"""Recover & remove the un-deletable type=null strays: re-install name 'tNoType' WITH type=mqtt
(same bundle) to give the tNoType_* entries a type, then delete them by {name, type:mqtt}."""
import json, os, sys, time, uuid
import paho.mqtt.client as mqtt
B="10.117.229.9"; CMND="zebra/MDM/clients/cmnd/RFD40-24190525100255"; RESP="zebra/MDM/clients/resp/RFD40-24190525100255"
CERT_DIR=os.path.join(os.path.dirname(os.path.abspath(__file__)),"certificates")
def pem(n):
    with open(os.path.join(CERT_DIR,n),encoding="utf-8") as f: return f.read()
BUNDLE={"ca_cert":pem("mqtt_ca_cert.pem"),"client_cert":pem("mqtt_client_cert.pem"),"client_key":pem("mqtt_client_key.pem")}
responses={}; st={"rc":None}
def nc(c):
    try: return mqtt.Client(client_id=c,clean_session=True,callback_api_version=mqtt.CallbackAPIVersion.VERSION1)
    except Exception: return mqtt.Client(client_id=c,clean_session=True)
def oc(c,u,f,rc,*a):
    st["rc"]=rc
    if rc==0: c.subscribe([(RESP,1)])
def om(c,u,m):
    try:
        j=json.loads(m.payload.decode("utf-8","replace")); rid=j.get("requestId")
        if rid: responses[rid]=j
    except Exception: pass
cl=None
def connect():
    global cl
    cl=nc("recov-"+uuid.uuid4().hex[:8]); cl.on_connect=oc; cl.on_message=om; st["rc"]=None
    cl.connect(B,1883,keepalive=30); cl.loop_start()
    t0=time.time()
    while time.time()-t0<5 and st["rc"] is None: time.sleep(0.1)
    return st["rc"]==0
def rt(command, extra=None, timeout=10.0, retries=3):
    for attempt in range(1,retries+1):
        rid="rc-"+uuid.uuid4().hex[:8]; env={"command":command,"requestId":rid}
        if extra: env.update(extra)
        responses.pop(rid,None)
        try: cl.publish(CMND,json.dumps(env),qos=1)
        except Exception: pass
        t0=time.time()
        while time.time()-t0<timeout:
            if rid in responses: return responses[rid]
            time.sleep(0.12)
        try: cl.loop_stop(); cl.disconnect()
        except Exception: pass
        time.sleep(3.0); connect(); time.sleep(1.0)
    return None
def readback(label):
    r=rt("get_installed_certificates")
    certs=(r.get("installedCerts",{}) or {}).get("certInfo",[]) if r else []
    print(f"\n[{label}] certInfo({len(certs)}): " + "; ".join(f"{c.get('name')}/{c.get('type')}" for c in certs))
    return certs
def main():
    if not connect(): print(f"[FATAL] connect rc={st['rc']}"); sys.exit(2)
    print("[mqtt] connected to", B)
    if rt("get_version") is None: print("[BLOCKER] device not attached"); sys.exit(3)
    readback("BEFORE")
    # re-install name 'tNoType' WITH explicit type mqtt (same bundle) to set the type on the strays
    r=rt("install_certificate", {"certDetails":{"type":"mqtt","name":"tNoType","authenticationType":"NONE",
         "certSource":"DIRECT","verificationType":"VERIFY_PEER","certificateBundle":BUNDLE}})
    rc=(r or {}).get("response",{}) or {}
    print(f"\n[install tNoType/mqtt] code={rc.get('code')} desc={rc.get('description')!r}")
    time.sleep(4.0)
    mid=readback("AFTER RE-INSTALL")
    # now delete the tNoType entries as type mqtt
    for nm in ["tNoType_ca_cert","tNoType_client_cert"]:
        r=rt("delete_certificate", {"certificateInfo":{"name":nm,"type":"mqtt"}})
        rc=(r or {}).get("response",{}) or {}
        print(f"[delete {nm}/mqtt] code={rc.get('code')} desc={rc.get('description')!r}")
    final=readback("FINAL")
    cl.loop_stop()
    try: cl.disconnect()
    except Exception: pass
    print("\n==== RESULT ====")
    print(f"  remaining certs: {len(final)}" + (" — CLEAN ✓" if not final else " — " + ", ".join(f"{c.get('name')}/{c.get('type')}" for c in final)))
if __name__=="__main__":
    main()
