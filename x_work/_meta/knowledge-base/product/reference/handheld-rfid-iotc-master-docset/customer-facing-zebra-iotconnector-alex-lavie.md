**Alex Lavie**


##### Zebra IoT Connector


  - Free of charge standard feature, built-in reader feature set that replaces FX
Connect and on-device CloudConnect


  - Fully automated, real-time enterprise data collection tool using modern IoT
protocols such as MQTT, WebSockets and HTTPS


  - Routes data from Zebra devices into your preferred IoT endpoint, whether
it’s a data lake in the cloud or your on-premises web server


  - Accesses vital information from your fleet of Zebra devices, such as health
alerts, with date and time stamps


  - Manages and controls readers using MQTT or REST APIs


  - Simple to configure, off-the-shelf tool—no coding required


  - Allows script-based app development using Python or NodeJS to do more
sophisticated analytics on device, enabling users to make real-time
decisions at the edge


**ZEBRA TECHNOLOGIES**


#### General FX readers Application Architecture











Zebra MWE
Management












|Col1|Col2|Col3|Col4|Col5|Col6|Col7|Col8|Col9|Col10|Col11|Col12|Col13|
|---|---|---|---|---|---|---|---|---|---|---|---|---|
||||||||||||||
|||||IoT Connect||||DA Scripts|||||
||||||||||||||



LLRP



**FX**



REST, MQTT, Websockets, USB HID,
TCP/IP



ZEBRA TECHNOLOGIES


**Scenario**     - Customer
leverages analytics services

offered by 3 [rd] party cloud or

Zebra cloud to create

dashboard


AWS, GCP, IBM,

Azure


ZEBRA TECHNOLOGIES



**Customer Dashboard/Application**

in Cloud or On-prem

           - Where is my asset?

        - How are my devices doing?


**Scenario**  - Customer

dashboard
(customer implements its

own analytics)



Health
Events


Tag Data


Control Management Data
Interface Interface Interface


Zebra Fixed Reader



Reader
Webserver




|Col1|Col2|Col3|Col4|Col5|Col6|
|---|---|---|---|---|---|
|Reader G|at|eway / Cloud Agent|eway / Cloud Agent|||
|Reader G||||||
|Reader G|||Radio Control|Radio Control||



ZEBRA TECHNOLOGIES


### Reader Operations with IoTConnect


#### IoTConnect vs. Host or Embedded SDKs


  - Configuration vs. Coding


  - Less complexity


  - Easier deployment and prototyping


  - Faster integration


  - On reader intelligence


ZEBRA TECHNOLOGIES


#### Main Activities in Action


  - All these activities can be done


  - FX Reader WebConsole


  - Using Rest APIs with Tools like Postman


  - Mqtt based tools like Node-Red


  - Use Zebra RFID Reader Management Console


  - Today we will not have time to cover:


  - Deployment of Certificates


  - Deployment of Functions and applications for on
Reader Intelligence ( _covered in a session tomorrow_ )


ZEBRA TECHNOLOGIES



Adjust



Configure



Monitor



Report

Reads



Write Modes


#### Configure Reader for IOTConnect
###### Demo


  - Define Endpoints for Management and Data


  - Set Security for Data flows


  - Define rules for data Retention and optimise Network utilisation


     - Start IoTConnector


     - Start the Reading process


  - Export Configuration to use for other readers


ZEBRA TECHNOLOGIES


#### Using WebConsole

ZEBRA TECHNOLOGIES



10


#### Using APIs

ZEBRA TECHNOLOGIES


#### Report Reads


  - Tag read will be reported in what ever interface that is available to the Endpoint you selected


  - You can send data to 2 Destinations at the same time


  - Data format will be Json


  - To customise the data message you can use Operation Modes for the data reported; and
IOTConnect embedded/DA applications to adapt format for easier mapping/integration


ZEBRA TECHNOLOGIES


#### Operating Modes

ZEBRA TECHNOLOGIES
















































#### Custom Mode
###### Black Belt Level ;-)

{

"type": "CUSTOM",
"antennas": [

1,
2,
3,
4
],
"filter": {

"value": "[a-zA-Z0-9]{2,}",
"match": "regex",
"operation": "include"
},
"environment": "AUTO_DETECT",
"transmitPower": 27,


},
"tagMetaData": [

"RSSI",
"ANTENNA"


ZEBRA TECHNOLOGIES



],
"radioStartConditions": {

"type": "GPI",
"gpis": [

{

"port": 1,
"signal": "HIGH",
"debounceTime": 0
}
]
},


}
}


#### Writing data to Tags with IOTConnector
###### New in latest release – Brings IOT Connector to almost full coverage of SDK features

- Use Custom Mode on the fly to perform Write Operation to tag in the field


import http.client
import json


conn = http.client.HTTPSConnection("192.168.1.38")
payload = json.dumps({
"type": "CUSTOM",
"accesses": [
{
"type": "WRITE",
"config": {
"membank": "EPC",
"wordPointer": 2,
"data": "1111"
}
}
]
})
headers = {
'Content-Type': 'application/json',
'Accept': 'text/html',
'Authorization': 'Bearer
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJaRUJSQSIsImV4cCI6MTY5MTU3ODQ1M30.M
PEZAwHt2yRT3DKA3ghe4KxlkJDW-In case of an error: {"code": 3, "message":
AOwjWOV_CNA9At78Yn1TZl_jwDTnRtoyE7JXCHgX_Pryoh0pVYF0uwcRA'
}"\"set_mode\" Failed to apply. Description:
conn.request("PUT", "/cloud/mode", payload, headers)
res = conn.getresponse()unsuccessful rc response: Failure:
data = res.read()
print(data.decode("utf-8"))\"accesses\" must be either an array of

objects or an array of array of objects"}



ZEBRA TECHNOLOGIES


#### Monitor

MQTT using
heartbeat with interval


ZEBRA TECHNOLOGIES


#### Sample Dashboard with MQTT Health Messages

ZEBRA TECHNOLOGIES


# Questions



ZEBRA TECHNOLOGIES


#### Resources


  - Documentation:

  - [https://zebradevs.github.io/rfid-ziotc-docs/index.html](https://zebradevs.github.io/rfid-ziotc-docs/index.html)


  - FXWedge: Android APK to call IOTConnect methods from Android device:
[https://github.com/ltrudu/ZebraFXWedge/tree/master/ZebraFXWedge](https://github.com/ltrudu/ZebraFXWedge/tree/master/ZebraFXWedge)


  - Windows Dockers Project that demonstrates IOTConnect MQTT and data storage in RDBMS:


  - [https://github.com/ZebraDevs/RFID-IoTConnector-MQTT-dotnet-DockDoorSample](https://github.com/ZebraDevs/RFID-IoTConnector-MQTT-dotnet-DockDoorSample)


ZEBRA TECHNOLOGIES


#### FAQ



















ZEBRA TECHNOLOGIES


## Thank You

jurisdictions worldwide. All other trademarks are the property of their respective owners.
©2023 Zebra Technologies Corp. and/or its affiliates. All rights reserved.


ZEBRA TECHNOLOGIES


