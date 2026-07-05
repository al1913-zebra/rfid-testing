[Zebra IoT Connector](https://zebradevs.github.io/rfid-ziotc-docs/index.html)

Can we disable the buffer mode. so that we do not get a tag data after the tag has already moved away ?

If tags move away, you would not read them, so buffering will not be required.

Can the tag meta data report the Reader ID ?

No. The idea is the user will create MQTT topic by reader ID.

Is there a compatibility with Microsoft Azure Iot platform planned? To be a Microsoft azure Iot certified ?

IoT Connector can push data to Azure IoT Hub.

Does IoT have to be used, will it be the only way to connect to readers in the future? Can developers use the same methods they currently use to connect to readers ?

For current FX readers we offer both SDK and IoT Connector as the 2 ways to interact with reader. However, IoT Connector will be the preferred mode to connect.

Is it Possible Write Tag using IOT connector ?

Yes, this is possible using setting the appropriate operating mode.

I have used iot connector but i didn’t find a way to activate antenna 1 and 2 with GPIO 1 and antenna 3 and 4 with GPIO 2. Is it possible?

This is a future feature enhancement. Not available today

can we control the frequency of data on iot ?

Yes, by setting reportfilter in Operating Mode.

In current 3.10.30 fx firmware has keyboard provision ?

No. The latest 3.21.21 will.

we get reader id(Mac/ip/device id) using iot connector? for multiple reader environment?

No. The idea is the user will create MQTT topic by reader ID

Is latest tech doc of user app is available in public?

Yes, from FX9600 support site - [https://zebradevs.github.io/rfid-ziotc-docs/index.html](https://zebradevs.github.io/rfid-ziotc-docs/index.html)

Iot Connector is linked with a specific firmware version to take advantage of its features and highlights? Talking about FX7500 & FX9600.

The latest 3.21.21 of firmware supports IoT Connector.

How many reads can IoT connector buffer ?

150k read events.

Given that Google Cloud IoT Core is being retired on August 16, 2023, has Zebra started testing ClearBlade, which is pointed to as the replacement ?

We will make sure we test replacement options with IoT Connector.