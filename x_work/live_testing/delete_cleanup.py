#!/usr/bin/env python3
"""Clean the trust store: delete ca_cert/mqtt and the two stray tNoType_* (type=null) certs.
Adaptive: since the strays have type=null and delete_certificate requires a type, try each
valid type per name until one matches (code 0) or all return not-found. Before/after read-backs."""
import json, sys, time, uuid
import paho.mqtt.client as mqtt
B="10.117.229.9"; CMND="zebra/MDM/clients/cmnd/RFD40-24190525100255"; RESP="zebra/MDM/clients/resp/RFD40-24190525100255"
TYPES=["mqtt","wifi","filestore","server","client"]
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
    cl=nc("clean-"+uuid.uuid4().hex[:8]); cl.on_connect=oc; cl.on_message=om; st["rc"]=None
    cl.connect(B,1883,keepalive=30); cl.loop_start()
    t0=time.time()
    while time.time()-t0<5 and st["rc"] is None: time.sleep(0.1)
    return st["rc"]==0
def rt(command, extra=None, timeout=9.0, retries=3):
    for attempt in range(1,retries+1):
        rid="cl-"+uuid.uuid4().hex[:8]; env={"command":command,"requestId":rid}
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
    print(f"\n[{label}] code={(r or {}).get('response',{}).get('code')} certInfo({len(certs)}): " +
          "; ".join(f"{c.get('name')}/{c.get('type')}" for c in certs))
    return certs

def delete_cert(name):
    print(f"\n--- delete '{name}' (trying types until match) ---")
    for t in TYPES:
        r=rt("delete_certificate", {"certificateInfo":{"name":name,"type":t}})
        rc=(r or {}).get("response",{}) or {}
        code=rc.get("code")
        print(f"   {name}/{t}: code={code} desc={rc.get('description')!r}")
        if code==0:
            print(f"   -> DELETED as type '{t}'")
            return ("deleted", t)
    print(f"   -> NOT deleted (no type matched)")
    return ("not-deleted", None)

def main():
    if not connect(): print(f"[FATAL] connect rc={st['rc']}"); sys.exit(2)
    print("[mqtt] connected to", B)
    if rt("get_version") is None: print("[BLOCKER] device not attached"); sys.exit(3)
    readback("BEFORE")
    results={}
    results["ca_cert"]=delete_cert("ca_cert")
    results["tNoType_ca_cert"]=delete_cert("tNoType_ca_cert")
    results["tNoType_client_cert"]=delete_cert("tNoType_client_cert")
    remaining=readback("AFTER")
    cl.loop_stop()
    try: cl.disconnect()
    except Exception: pass
    print("\n==== SUMMARY ====")
    for n,(stat,t) in results.items(): print(f"  {n}: {stat}" + (f" (type {t})" if t else ""))
    print(f"  remaining certs: {len(remaining)}" + (" — CLEAN" if not remaining else " — " + ", ".join(f"{c.get('name')}/{c.get('type')}" for c in remaining)))

if __name__=="__main__":
    main()
