# Introduction[](https://zebradevs.github.io/rfid-ziotc-docs/setupziotc/index.html/#introduction "Link to this heading")

This section guides user to setup Zebra IoT Connector for various deployment modes discussed at [section](https://zebradevs.github.io/rfid-ziotc-docs/introduction/deployment_modes/index.html#deployment-modes).

Setting up Zebra IoT Connector is three step process:

> 1.  Add endpoint configuration.
>     
> 2.  Configure interfaces to appropriate endpoints.
>     
> 3.  Start IoT Connector Service.
>     

## ZIoT Connector Web Interface[](https://zebradevs.github.io/rfid-ziotc-docs/setupziotc/index.html#ziot-connector-web-interface "Link to this heading")

The Zebra IoT Connector can be configured using the reader web UI.

-   Open a web browser to connect to the reader using the host name or IP address.
    
-   The configuration page is used for configuring ZIoTC endpoints and interfaces.
    
    > -   Click **Communication** > **Zebra IoT Connector** > **Configuration**.
    >     
    >     > ![ZIOTC Configuration](https://zebradevs.github.io/rfid-ziotc-docs/_images/configuration_page5.png)
    >     
    > -   Using this page user can `Add`, `View`, `Update`, and `Delete` endpoint configurations.
    >     
    > -   Endpoint Configuration can be added by clicking `Add Endpoint` button. currently reader supports following endpoints.
    >     
    >     > -   MQTT Broker.
    >     >     
    >     > -   HTTP Server.
    >     >     
    >     > -   AWS IoT Core.
    >     >     
    >     > -   Azure IoT Hub.
    >     >     
    >     > -   TCP
    >     >     
    >     > -   Websockets
    >     >     
    >     > -   Keyboard Emulation and HID
    >     >     
    >     
    > -   Current configured endpoints will be displayed under **Endpoint Configurations** section.
    >     
    > -   Endpoint Configuration can be updated by clicking on the endpoint configuration row.
    >     
    > -   Endpoint Configuration can be deleted by clicking on the delete icon in the endpoint configuration row.
    >     
    > -   The current interface configuration will be displayed under **Interface Configuration** section.
    >     
    > -   Interface configuration can be updated by selecting appropriate endpoint from dropdown and clicking `Update` button.
    >     
    
-   The connection page is used to view the current Interface Connection Status.
    
    > -   Click **Communication** > **Zebra IoT Connector** > **Connection**.
    >     
    >     > ![ZIOTC Connection](https://zebradevs.github.io/rfid-ziotc-docs/_images/connection_page.png)
    >     
    > -   The **Connection Status** section displays the current interface `Connection Status` and `Connection Error` information.
    >     
    > 
    > Note
    > 
    > While connected, the reader is configured to listen for local REST requests by default.
    

## Reader Configuration[](https://zebradevs.github.io/rfid-ziotc-docs/setupziotc/index.html#reader-configuration "Link to this heading")

This section guides user to add an MQTT and HTTP Post endpoint configurations.

## Endpoint Configuration[](https://zebradevs.github.io/rfid-ziotc-docs/setupziotc/index.html#endpoint-configuration "Link to this heading")

### Add MQTT Endpoint[](https://zebradevs.github.io/rfid-ziotc-docs/setupziotc/index.html#add-mqtt-endpoint "Link to this heading")

Note

An open source online MQTT Broker hosted at [test.mosquitto.org](https://test.mosquitto.org/) will be used for this tutorial.

-   Open a web browser to connect to the reader using the host name or IP address.
    
-   Click **Communication** > **Zebra IoT Connector** > **Configuration**.
    
-   Click on `Add Endpoint` button to add new endpoint.
    
    > ![ZIOTC Add Endpoint](https://zebradevs.github.io/rfid-ziotc-docs/_images/add_endpoint_page6.png)
    
-   Select `MQTT` for **Endpoint Type**.
    
-   Configure **Endpoint Name** and **Endpoint Description** fields.
    
-   Configure **Connection**, **Topics** and **Certificates** sections.
    
-   Configure `Server`, `Port`, `Protocol`, `Client Id`, `Clean Session`, `Basic Authentication`, and `Keep Alive` parameters under **Connection** section.
    
    > ![ZIOTC MQTT Connections](https://zebradevs.github.io/rfid-ziotc-docs/_images/mqtt_connection.png)
    
-   Click on **Topics** to configure topics to be used for Management, Control, Health and Tag Data Interfaces.
    
    > ![ZIOTC MQTT topics](https://zebradevs.github.io/rfid-ziotc-docs/_images/mqtt_topics.png)
    
-   Click on `Add` button to add endpoint.
    
    > ![ZIOTC MQTT endpoint view](https://zebradevs.github.io/rfid-ziotc-docs/_images/mqtt_endpoint_view.png)
    

### Add HTTP POST Endpoint[](https://zebradevs.github.io/rfid-ziotc-docs/setupziotc/index.html#add-http-post-endpoint "Link to this heading")

Note

An open source online HTTP server hosted at [webhook.site](https://webhook.site/) will be used for this tutorial.

-   Open a web browser to connect to the reader using the host name or IP address.
    
-   Click **Communication** > **Zebra IoT Connector** > **Configuration**.
    
-   Click on `Add Endpoint` button to add new endpoint.
    
    > ![ZIOTC Add Endpoint](https://zebradevs.github.io/rfid-ziotc-docs/_images/add_endpoint_page6.png)
    
-   Select `HTTP POST` for **Endpoint Type**.
    
-   Configure **Endpoint Name** and **Endpoint Description** fields.
    
-   Configure **Connection** and **Certificates** sections.
    
-   Configure `URL`, `Verify Host`, `Verify Peer` and `Authentication Type` parameters under **Connection** section.
    
    > ![ZIOTC HTTP Connection](https://zebradevs.github.io/rfid-ziotc-docs/_images/http_post_connection1.png)
    
-   Click on `Add` button to add endpoint.
    
    > ![ZIOTC HTTP endpoint view](https://zebradevs.github.io/rfid-ziotc-docs/_images/http_post_endpoint_view.png)
    

## Interface Configuration[](https://zebradevs.github.io/rfid-ziotc-docs/setupziotc/index.html#interface-configuration "Link to this heading")

-   Open a web browser to connect to the reader using the host name or IP address.
    
-   Click **Communication** > **Zebra IoT Connector** > **Configuration**.
    
-   Select _mosquitto_ endpoint for **Management Interface**, **Control Interface**, and **Management Events Interface1**.
    
-   Select _webhooksite_ endpoint for **Tag Data Interface** and **Management Events Interface2**.
    
    > ![ZIOTC Interface Configuration](https://zebradevs.github.io/rfid-ziotc-docs/_images/interface_configuration.png)
    
-   Click on `Update` button to update interface configuration.
    
-   current connection status of the interfaces will be displayed under **Connection Status** section.
    
    > ![ZIOTC Connection](https://zebradevs.github.io/rfid-ziotc-docs/_images/connection_status.png)
    

## Start Reading Tags[](https://zebradevs.github.io/rfid-ziotc-docs/setupziotc/index.html#start-reading-tags "Link to this heading")

The process of starting tag reading can be initiated in two ways:

1.  By clicking the `Start` button on the connection page of the web interface.
    
2.  By sending a request through Postman.
    

-   Open `Postman` and send a GET request to `/cloud/localRestLogin` to the local Rest Management interface as shown below.
    
    > Important
    > 
    > The Authentication type `Basic Auth` should be selected and the username and password provided must be same as what is used to login to reader web console as an admin user.
    > 
    > ![../_images/local_rest_login1.png](https://zebradevs.github.io/rfid-ziotc-docs/_images/local_rest_login1.png)
    
-   Send a PUT request to `/cloud/start` to start tag reads.
    
    Important
    
    The Authentication type `Bearer Token` should be selected and the token returned from the localRestLogin API must be used excluding the string “JWT Token:”.
    
    ![../_images/local_rest_start.png](https://zebradevs.github.io/rfid-ziotc-docs/_images/local_rest_start.png)
    

## Testing[](https://zebradevs.github.io/rfid-ziotc-docs/setupziotc/index.html#testing "Link to this heading")

Note

To interact with reader via MQTT Broker an MQTT client is required. An open source MQTT Client [MQTT X](https://www.emqx.com/en/products/mqttx) will be used for this tutorial.

## Install MQTT Client[](https://zebradevs.github.io/rfid-ziotc-docs/setupziotc/index.html#install-mqtt-client "Link to this heading")

-   Install the MQTT Client by following steps [here](https://www.emqx.com/en/products/mqttx).
    

## Configure MQTT Client[](https://zebradevs.github.io/rfid-ziotc-docs/setupziotc/index.html#configure-mqtt-client "Link to this heading")

-   Launch the MQTT X Client.
    
    > ![MQTT X Client](https://zebradevs.github.io/rfid-ziotc-docs/_images/mqtt_client_intro.png)
    
-   Configure the MQTT X Client with MQTT Broker details configured in the reader and click on **Connect**.
    
    > ![MQTT X Configuration](https://zebradevs.github.io/rfid-ziotc-docs/_images/mqtt_client_config.png)
    
-   Subscribe to all the topics to view the events sent by the reader by clicking **New Subscription**.
    
    > ![MQTT X Subscription](https://zebradevs.github.io/rfid-ziotc-docs/_images/mqtt_client_sub.png)
    
-   Once subscribed the MQTT X Client will start showing the health events sent by the reader in the Management Events topics configured.
    
    > ![MQTT X Events](https://zebradevs.github.io/rfid-ziotc-docs/_images/mqtt_client_events.png)
    

## Interact with Reader[](https://zebradevs.github.io/rfid-ziotc-docs/setupziotc/index.html#interact-with-reader "Link to this heading")

-   Using the MQTT X Client the user can manage and control the reader by sending [RAW MQTT Payload Schemas](https://zebradevs.github.io/rfid-ziotc-docs/schemas/raw_mqtt_payloads/index.html#raw-mqtt-payloads) in the commands topic configured.
    
    > ![MQTT X Status](https://zebradevs.github.io/rfid-ziotc-docs/_images/mqtt_client_status.png)
    
-   Tag reads can be started by sending `start` command to the reader.
    
    > ![MQTT X Start](https://zebradevs.github.io/rfid-ziotc-docs/_images/mqtt_client_start.png)
    
-   Once `start` succeed the tag data will be sent to the HTTP Server configured in the reader.
    
    > ![WebHook Site Data](https://zebradevs.github.io/rfid-ziotc-docs/_images/webhook_client_data.png)
    
-   For full set of supported commands refer [RAW MQTT Payload Schemas](https://zebradevs.github.io/rfid-ziotc-docs/schemas/raw_mqtt_payloads/index.html#raw-mqtt-payloads) section.