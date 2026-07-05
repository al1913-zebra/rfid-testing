#!/usr/bin/env python3
"""install_certificate via certSource=DIRECT — embeds the PEM content inline in the
MQTT payload (certificateBundle), so NO HTTP server / port / firewall / routing is needed.
The device receives the cert content directly in the command message.

NOTE: over plain MQTT (1883, no TLS) the private key travels in cleartext — fine for these
TEST certs, but never do this with a production private key on an unencrypted broker.
"""
import json, os, sys, time, uuid
import paho.mqtt.client as mqtt

BROKER, PORT = "10.117.229.9", 1883
CERT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "certificates")
CMND_TOPIC  = "zebra/MDM/clients/cmnd/RFD40-24190525100255"
RESP_TOPIC  = "zebra/MDM/clients/resp/RFD40-24190525100255"
EVENT_TOPIC = "zebra/MDM/clients/event/RFD40-24190525100255"
RFID_TOPIC  = "zebra/MDM/clients/rfid/RFD40-24190525100255"
REQ_ID = "cert-test-direct-001"
WINDOW = 45.0

def read_pem(name):
    with open(os.path.join(CERT_DIR, name), "r", encoding="utf-8") as f:
        return f.read()

PAYLOAD = {
    "command": "install_certificate",
    "requestId": REQ_ID,
    "certDetails": {
        "type": "mqtt",
        "name": "testMqttCert",
        "authenticationType": "NONE",     # no remote source to authenticate to
        "certSource": "DIRECT",           # <-- inline content, no HTTP download
        "verificationType": "VERIFY_PEER",
        "certificateBundle": {
            "ca_cert":     read_pem("mqtt_ca_cert.pem"),
            "client_cert": read_pem("mqtt_client_cert.pem"),
            "client_key":  read_pem("mqtt_client_key.pem"),
        },
    },
}

responses, all_msgs, connected = {}, [], {"rc": None}

def new_client(cid):
    try:
        return mqtt.Client(client_id=cid, clean_session=True, callback_api_version=mqtt.CallbackAPIVersion.VERSION1)
    except Exception:
        return mqtt.Client(client_id=cid, clean_session=True)

def on_connect(c,u,f,rc,*a):
    connected["rc"] = rc
    print(f"[mqtt] connect rc={rc} ({'OK' if rc==0 else 'REFUSED'})", flush=True)
    if rc == 0:
        c.subscribe([(RESP_TOPIC,1),(EVENT_TOPIC,1),(RFID_TOPIC,1)])

def on_message(c,u,msg):
    try: txt = msg.payload.decode("utf-8","replace")
    except Exception: txt = "<binary>"
    all_msgs.append((time.strftime("%H:%M:%S"), msg.topic, txt[:240]))
    try:
        j = json.loads(txt); rid = j.get("requestId")
        if rid: responses[rid] = j
    except Exception: pass

def round_trip(cl, command, timeout=10.0):
    rid = uuid.uuid4().hex[:16]
    cl.publish(CMND_TOPIC, json.dumps({"command":command,"requestId":rid}), qos=1)
    print(f"[mqtt] published '{command}' rid={rid}", flush=True)
    t0=time.time()
    while time.time()-t0 < timeout:
        if rid in responses: return responses[rid]
        time.sleep(0.15)
    return None

def main():
    sizes = {k: len(v) for k,v in PAYLOAD["certDetails"]["certificateBundle"].items()}
    wire = len(json.dumps(PAYLOAD))
    print(f"[payload] certSource=DIRECT, inline bundle bytes={sizes}, total MQTT payload={wire} bytes (no HTTP needed)", flush=True)
    cid = "cert-direct-" + uuid.uuid4().hex[:10]
    cl = new_client(cid); cl.on_connect=on_connect; cl.on_message=on_message
    cl.connect(BROKER, PORT, keepalive=30); cl.loop_start(); time.sleep(1.5)
    if connected["rc"] != 0:
        print(f"[FATAL] broker connect refused rc={connected['rc']}"); cl.loop_stop(); sys.exit(2)

    print("\n=== PREFLIGHT (get_version) ===", flush=True)
    pre = round_trip(cl, "get_version", timeout=10.0)
    print(f"[preflight] {'ATTACHED code='+str(pre.get('response',{}).get('code')) if pre else 'NO RESPONSE — device not attached'}", flush=True)

    print("\n=== PUBLISH install_certificate (DIRECT) ===", flush=True)
    redacted = json.loads(json.dumps(PAYLOAD))
    for k in redacted["certDetails"]["certificateBundle"]:
        v = redacted["certDetails"]["certificateBundle"][k]
        redacted["certDetails"]["certificateBundle"][k] = f"<{k} PEM, {len(v)} bytes>"
    print(json.dumps(redacted, indent=2), flush=True)
    responses.pop(REQ_ID, None)
    cl.publish(CMND_TOPIC, json.dumps(PAYLOAD), qos=1)
    print(f"[mqtt] published 'install_certificate' rid={REQ_ID} -> {CMND_TOPIC}", flush=True)

    print(f"\n=== WATCHING resp + event + rfid for {WINDOW:.0f}s ===", flush=True)
    t0=time.time(); install_resp=None; seen=len(all_msgs)
    while time.time()-t0 < WINDOW:
        while seen < len(all_msgs):
            ts,topic,body = all_msgs[seen]; seen+=1
            tag = "EVENT" if "/event/" in topic else ("RESP" if "/resp/" in topic else "RFID")
            print(f"  [{tag}] {ts} {topic}\n        {body}", flush=True)
        if install_resp is None and REQ_ID in responses:
            install_resp = responses[REQ_ID]
        time.sleep(0.3)

    cl.loop_stop()
    try: cl.disconnect()
    except Exception: pass

    print("\n"+"="*60+"\nRESULT\n"+"="*60, flush=True)
    print(f"preflight attached: {pre is not None}")
    if install_resp:
        rc = install_resp.get("response",{})
        print(f"install_certificate response: code={rc.get('code')} desc=\"{rc.get('description')}\"")
        print(f"  full: {json.dumps(install_resp)}")
    else:
        print("install_certificate response: NONE within window")
    print(f"async event/rfid messages ({len([m for m in all_msgs if '/resp/' not in m[1]])}):")
    for m in all_msgs:
        if "/resp/" not in m[1]: print("   ", m[0], m[1], m[2][:90])

if __name__ == "__main__":
    main()
