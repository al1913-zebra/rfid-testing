#!/usr/bin/env python3
"""Diagnostic: wildcard-subscribe the broker, publish a get_version, and report ALL traffic
seen (which topics the device actually uses / whether it's alive)."""
import json, time, uuid, collections
import paho.mqtt.client as mqtt
BROKER, PORT = "10.117.229.9", 1883
CMND="zebra/MDM/clients/cmnd/RFD40-24190525100255"
seen=[]; topics=collections.Counter(); st={"rc":None}
def newc(cid):
    try: return mqtt.Client(client_id=cid,clean_session=True,callback_api_version=mqtt.CallbackAPIVersion.VERSION1)
    except Exception: return mqtt.Client(client_id=cid,clean_session=True)
def on_connect(c,u,f,rc,*a):
    st["rc"]=rc
    if rc==0:
        c.subscribe([("#",0)])
        print(f"[connect] rc={rc}; subscribed to '#'", flush=True)
def on_message(c,u,msg):
    txt=msg.payload.decode("utf-8","replace")
    topics[msg.topic]+=1
    seen.append((time.strftime("%H:%M:%S"), msg.topic, txt[:160]))
    print(f"  [{time.strftime('%H:%M:%S')}] {msg.topic}\n     {txt[:160]}", flush=True)
cl=newc("sniff-"+uuid.uuid4().hex[:8]); cl.on_connect=on_connect; cl.on_message=on_message
cl.connect(BROKER,PORT,keepalive=30); cl.loop_start(); time.sleep(2.0)
print(f"[connect rc] {st['rc']}", flush=True)
for i in range(3):
    rid="sniff-"+uuid.uuid4().hex[:8]
    cl.publish(CMND, json.dumps({"command":"get_version","requestId":rid}), qos=1)
    print(f"[pub] get_version rid={rid} -> {CMND}", flush=True)
    time.sleep(8)
print("\n==== TOPIC SUMMARY ====")
for t,n in topics.most_common(): print(f"  {n:3d}  {t}")
print(f"total messages: {len(seen)}")
cl.loop_stop()
try: cl.disconnect()
except Exception: pass
