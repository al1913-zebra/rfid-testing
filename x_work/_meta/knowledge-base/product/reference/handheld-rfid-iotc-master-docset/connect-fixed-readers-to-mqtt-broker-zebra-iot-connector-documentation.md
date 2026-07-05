This section serves to guide the user to connect Zebra fixed readers `FX9600`, `FX7500` and `ATR7000` with `MQTT Broker` with MQTT version 3.1.1.

Important

prerequisite:

-   `FX9600` and `FX7500` readers firmware version should be >= `3.10.X`
    
-   `ATR7000` reader firmware version should be >= `3.17.X`
    

Warning

Reader uses `8883` port to connect with `EMQX MQTT Broker`. Port should be open for this tutorial to work.

Other pages in this section provide guidance for:

# Connect Fixed Readers to MQTT Broker[](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/MQTT/index.html/#connect-fixed-readers-to-mqtt-broker "Link to this heading")

-   [MQTT Broker Setup](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/MQTT/cloud_instructions.html)
    -   [Installing MQTT broker on windows](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/MQTT/cloud_instructions.html#installing-mqtt-broker-on-windows)
    -   [Testing the broker installation](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/MQTT/cloud_instructions.html#testing-the-broker-installation)
    -   [Network Considerations](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/MQTT/cloud_instructions.html#network-considerations)
-   [Device Setup](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/MQTT/device_side_instructions.html)
    -   [Web Interface](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/MQTT/web.html)
        -   [Import Certificates](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/MQTT/web.html#import-certificates)
            -   [Using SCP](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/MQTT/web.html#using-scp)
            -   [Using Web UI](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/MQTT/web.html#using-web-ui)
        -   [Add MQTT Endpoint](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/MQTT/web.html#add-mqtt-endpoint)
        -   [Interface Configuration](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/MQTT/web.html#interface-configuration)
    -   [Reader Manager](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/MQTT/RM.html)
        -   [Import Certificates and Generate Endpoint Configuration](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/MQTT/RM.html#import-certificates-and-generate-endpoint-configuration)
        -   [Import Configuration into Reader](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/MQTT/RM.html#import-configuration-into-reader)
        -   [Connect to Cloud](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/MQTT/RM.html#connect-to-cloud)
        -   [Verify Cloud Connection](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/MQTT/RM.html#verify-cloud-connection)
-   [Testing](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/MQTT/testing.html)
    -   [Install MQTT Client](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/MQTT/testing.html#install-mqtt-client)
    -   [Configure MQTT Client](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/MQTT/testing.html#configure-mqtt-client)
    -   [Interact with Reader](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/MQTT/testing.html#interact-with-reader)
-   [Troubleshooting](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/MQTT/troubleshoot.html)