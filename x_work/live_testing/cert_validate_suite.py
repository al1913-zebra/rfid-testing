#!/usr/bin/env python3
"""install_certificate test/validation suite (reconnect-tolerant).
Order: preflight -> ERROR probes first (rejected, won't drop session) -> VALID install LAST
(applying an mqtt cert may drop the session) -> re-preflight -> after read-back.
All DIRECT (no HTTP/firewall)."""
import json, os, sys, time, uuid
import paho.mqtt.client as mqtt

BROKER, PORT = "10.117.229.9", 1883
CERT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "certificates")
CMND = "zebra/MDM/clients/cmnd/RFD40-24190525100255"
RESP = "zebra/MDM/clients/resp/RFD40-24190525100255"
EVENT= "zebra/MDM/clients/event/RFD40-24190525100255"
RFID = "zebra/MDM/clients/rfid/RFD40-24190525100255"

def pem(n):
    with open(os.path.join(CERT_DIR, n), encoding="utf-8") as f: return f.read()
BUNDLE = {"ca_cert": pem("mqtt_ca_cert.pem"), "client_cert": pem("mqtt_client_cert.pem"), "client_key": pem("mqtt_client_key.pem")}

responses, allmsgs = {}, []
state = {"rc": None, "dropped": False}
def newc(cid):
    try: return mqtt.Client(client_id=cid, clean_session=True, callback_api_version=mqtt.CallbackAPIVersion.VERSION1)
    except Exception: return mqtt.Client(client_id=cid, clean_session=True)
def on_connect(c,u,f,rc,*a):
    state["rc"]=rc
    if rc==0: c.subscribe([(RESP,1),(EVENT,1),(RFID,1)])
def on_disconnect(c,u,*a):
    state["dropped"]=True
def on_message(c,u,msg):
    txt = msg.payload.decode("utf-8","replace")
    allmsgs.append((time.strftime("%H:%M:%S"), msg.topic, txt[:200]))
    try:
        j=json.loads(txt); rid=j.get("requestId")
        if rid: responses[rid]=j
    except Exception: pass

cl = None
def connect():
    global cl
    cl = newc("cert-suite-"+uuid.uuid4().hex[:8])
    cl.on_connect=on_connect; cl.on_disconnect=on_disconnect; cl.on_message=on_message
    state["rc"]=None
    cl.connect(BROKER,PORT,keepalive=30); cl.loop_start()
    t0=time.time()
    while time.time()-t0<5 and state["rc"] is None: time.sleep(0.1)
    return state["rc"]==0

def rt(label, command, extra=None, timeout=9.0, retries=3):
    """publish + await correlated response; retry (re-preflight) on miss/drop."""
    for attempt in range(1, retries+1):
        rid = "vs-"+uuid.uuid4().hex[:8]
        env={"command":command,"requestId":rid}
        if extra: env.update(extra)
        responses.pop(rid,None)
        try: cl.publish(CMND, json.dumps(env), qos=1)
        except Exception: pass
        t0=time.time()
        while time.time()-t0<timeout:
            if rid in responses:
                r=responses[rid]; rc=r.get("response",{}) or {}
                print(f"\n--- {label} ---")
                print(f"  req: command={command} extra={list(extra.get('certDetails',{}).keys()) if extra and 'certDetails' in extra else (list(extra.keys()) if extra else [])} rid={rid} (attempt {attempt})")
                print(f"  resp: code={rc.get('code')} description={rc.get('description')!r} apiVersion={r.get('apiVersion')}")
                if command.startswith("get_installed"):
                    certs=(r.get("installedCerts",{}) or {}).get("certInfo",[])
                    print(f"  certInfo({len(certs)}): " + "; ".join(f"{c.get('name')}/{c.get('type')}/{c.get('serial')}" for c in certs))
                return r
            time.sleep(0.12)
        # miss -> reconnect and retry
        print(f"  [{label}] attempt {attempt} no-response; reconnecting…", flush=True)
        try: cl.loop_stop(); cl.disconnect()
        except Exception: pass
        time.sleep(3.0)
        connect(); time.sleep(1.0)
    print(f"\n--- {label} ---\n  req: command={command} rid=(all {retries} attempts)\n  resp: <NONE after {retries} attempts>")
    return None

def main():
    if not connect(): print(f"[FATAL] connect rc={state['rc']}"); sys.exit(2)
    print("[mqtt] connected to", BROKER)
    if rt("PREFLIGHT get_version","get_version") is None:
        print("[BLOCKER] device not attached after retries"); sys.exit(3)

    rt("BASELINE get_installed_certificates","get_installed_certificates")

    print("\n========== ERROR PATH PROBES (rejected; session preserved) ==========")
    rt("ERR-A direct + NO certificateBundle (expect 30)","install_certificate",
       {"certDetails":{"type":"mqtt","name":"tNoBundle","authenticationType":"NONE","certSource":"DIRECT","verificationType":"NONE"}})
    rt("ERR-B invalid certSource enum 'FTP'","install_certificate",
       {"certDetails":{"type":"mqtt","name":"tBadSrc","authenticationType":"NONE","certSource":"FTP","verificationType":"NONE","certificateBundle":BUNDLE}})
    rt("ERR-C missing required 'type'","install_certificate",
       {"certDetails":{"name":"tNoType","authenticationType":"NONE","certSource":"DIRECT","certificateBundle":BUNDLE}})
    rt("ERR-D invalid 'type' enum 'bogus'","install_certificate",
       {"certDetails":{"type":"bogus","name":"tBadType","authenticationType":"NONE","certSource":"DIRECT","certificateBundle":BUNDLE}})
    rt("ERR-E missing required 'authenticationType'","install_certificate",
       {"certDetails":{"type":"mqtt","name":"tNoAuth","certSource":"DIRECT","certificateBundle":BUNDLE}})

    print("\n========== VALID INSTALL (last; may drop session) ==========")
    rt("VALID install (DIRECT full bundle)","install_certificate",
       {"certDetails":{"type":"mqtt","name":"testMqttCert","authenticationType":"NONE","certSource":"DIRECT","verificationType":"VERIFY_PEER","certificateBundle":BUNDLE}})

    time.sleep(2.0)
    rt("AFTER get_installed_certificates","get_installed_certificates")

    time.sleep(2.0)
    cl.loop_stop()
    try: cl.disconnect()
    except Exception: pass
    evs=[m for m in allmsgs if "/resp/" not in m[1]]
    print(f"\n[async event/rfid messages: {len(evs)}]")
    for m in evs: print("  ", m)

if __name__=="__main__":
    main()
