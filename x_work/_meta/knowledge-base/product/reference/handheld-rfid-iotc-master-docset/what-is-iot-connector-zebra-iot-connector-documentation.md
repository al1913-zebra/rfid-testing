# What is IoT Connector?[](https://zebradevs.github.io/rfid-ziotc-docs/introduction/intro/index.html/#what-is-iot-connector "Link to this heading")

`Zebra IoT Connector` is a standard built-in feature inside RFID readers (`FX9600`, `FX7500`, and `ATR7000`) that makes reader deployment easy. It provides easy-to-use interface to manage, control readers as well as to extract tag data and events from readers. The interface is built on web-friendly protocols such as MQTT, REST and JSON-formatted data structures that can be leveraged by any web applications running on the cloud or on-premise.

Readers can push tag data and events to the cloud via MQTT. To push data to a local webserver, reader can also stream using HTTP Post. Applications can manage and control readers using either MQTT or REST interface.

## System Overview[](https://zebradevs.github.io/rfid-ziotc-docs/introduction/intro/index.html#system-overview "Link to this heading")

![system overview](https://zebradevs.github.io/rfid-ziotc-docs/_images/system_overview.png)

## Interfaces[](https://zebradevs.github.io/rfid-ziotc-docs/introduction/intro/index.html#interfaces "Link to this heading")

The `Zebra IoT Connector` feature provides four different interfaces as below, each can be configured to use a different endpoint of choice.

> -   Management
>     
> -   Health
>     
> -   Control
>     
> -   Data
>     

### Management Interface[](https://zebradevs.github.io/rfid-ziotc-docs/introduction/intro/index.html#management-interface "Link to this heading")

This interface is used to perform management actions on reader (e.g firmware update, getting and setting reader configuration). This is a synchronous interface, i.e. the reader accepts commands on this interface and sends response to those commands.

This interface can be configured to use either MQTT (for cloud deployments) or REST APIs (for on-premise deployments).

> -   When configured to use a MQTT endpoint, command and response topics must be specified to perform management functions. Refer [RAW MQTT Payload Schemas](https://zebradevs.github.io/rfid-ziotc-docs/schemas/raw_mqtt_payloads/index.html#raw-mqtt-payloads) on how to perform these operations over MQTT.
>     
> -   When using Local REST for management, please refer [Local Deployment REST API Guide](https://zebradevs.github.io/rfid-ziotc-docs/api_ref/local_rest/index.html#local-rest-apis).
>     

### Management Events Interface[](https://zebradevs.github.io/rfid-ziotc-docs/introduction/intro/index.html#management-events-interface "Link to this heading")

Unlike the Management interface, this is an asynchronous interface, i.e the reader sends asynchronous messages on this interface. This interface is used to monitor health events from the reader (e.g Heartbeats (reader temperature, CPU, RAM, etc.), GPIO events, Errors and Warnings (CPU, RAM, Flash utilizations)).

This interface can be configured to use either MQTT (for cloud deployments) or HTTP Post (for on-premise deployments).

> -   When configured for an MQTT endpoint, the management events topic must be used to consume the health events from the reader. Refer [Health Events Format](https://zebradevs.github.io/rfid-ziotc-docs/schemas/async_event_schema/index.html#management-events-formats) schema to get health events over MQTT or HTTP Post.
>     

The health events can be configured at the time of deployment via configuration file or at run time using the Management Interface (e.g heartbeat fields and interval, errors and warnings limits and reporting interval, etc).

> -   When Management Interface is configured to use a MQTT endpoint `get_config` and `set_config` commands are used for retrieving and updating health events configuring. Refer [RAW MQTT Payload Schemas](https://zebradevs.github.io/rfid-ziotc-docs/schemas/raw_mqtt_payloads/index.html#raw-mqtt-payloads) on how to perform these operations over MQTT.
>     
> -   When Management Interface is configured for Local REST `GET/PUT config` APIs are used for retriving and updating health events configuring, please refer [Local Deployment REST API Guide](https://zebradevs.github.io/rfid-ziotc-docs/api_ref/local_rest/index.html#local-rest-apis).
>     

### Control Interface[](https://zebradevs.github.io/rfid-ziotc-docs/introduction/intro/index.html#control-interface "Link to this heading")

This Interface is used to perform control actions on the reader (for example, configuring the radio mode, starting/stopping the tag reads). This interface is a synchronous interface, similar to Management Interface.

This interface can be configured to use either MQTT (for cloud deployments) or REST APIs (for on-premise deployments).

> -   When configured to use a MQTT endpoint, command and response topics must be specified to perform control functions. Refer [RAW MQTT Payload Schemas](https://zebradevs.github.io/rfid-ziotc-docs/schemas/raw_mqtt_payloads/index.html#raw-mqtt-payloads) on how to perform these operations over MQTT.
>     
> -   When using Local REST for control, please refer [Local Deployment REST API Guide](https://zebradevs.github.io/rfid-ziotc-docs/api_ref/local_rest/index.html#local-rest-apis).
>     

### Data Interface[](https://zebradevs.github.io/rfid-ziotc-docs/introduction/intro/index.html#data-interface "Link to this heading")

This interface is used to consume RFID tag events from the reader. IoT Connector supports sending data events to two separate data endpoints. The endpoints can be any of the endpoint types supported.

> -   When configured for an MQTT endpoint, the tag events topic must be used to consume the RFID tag data from the reader.
>     

The Management Interface can be used to configure the Operating Mode at run time. Refer [Operating Modes Schema](https://zebradevs.github.io/rfid-ziotc-docs/schemas/operating_modes/index.html#oper-modes) for supported configuration options.

> -   When Management Interface is configured to use a MQTT endpoint `get_mode` and `set_mode` commands are used for retrieving and updating tag identification mode settings. Refer [RAW MQTT Payload Schemas](https://zebradevs.github.io/rfid-ziotc-docs/schemas/raw_mqtt_payloads/index.html#raw-mqtt-payloads) on how to perform these operations over MQTT.
>     
> -   When Management Interface is configured for Local REST `GET/PUT mode` APIs are used for retrieving and updating tag identification mode settings, please refer [Local Deployment REST API Guide](https://zebradevs.github.io/rfid-ziotc-docs/api_ref/local_rest/index.html#local-rest-apis).
>     

The data interface additionally supports following features.

> -   Retention
>     
> -   Batching
>     

#### Retention[](https://zebradevs.github.io/rfid-ziotc-docs/introduction/intro/index.html#retention "Link to this heading")

Enables reader to buffer the tag events and stream data back to server in case of network issues or server failures. By default retention will be enabled and reader can retain most recent 150000 tag events and can stream data back to server at 500TPS.

#### Batching[](https://zebradevs.github.io/rfid-ziotc-docs/introduction/intro/index.html#batching "Link to this heading")

Enables reader to group multiple tag events into single event based on the configuration. Batching reduces network usage as well as reader CPU usage.

The Retention and Batching features can be configured at the time of deployment via configuration file or at run time using the Management Interface.

> -   When Management Interface is configured to use a MQTT endpoint `get_config` and `set_config` commands are used for retrieving and updating retention and batching configuring. Refer [RAW MQTT Payload Schemas](https://zebradevs.github.io/rfid-ziotc-docs/schemas/raw_mqtt_payloads/index.html#raw-mqtt-payloads) on how to perform these operations over MQTT.
>     
> -   When Management Interface is configured for Local REST `GET/PUT config` APIs are used for retrieving and updating retention and batching configuring, please refer [Local Deployment REST API Guide](https://zebradevs.github.io/rfid-ziotc-docs/api_ref/local_rest/index.html#local-rest-apis).
>     

Important

Depending on how the `Zebra IoT Connector` interfaces are configured, there are three possible deployment modes as described in the chapter [Introduction](https://zebradevs.github.io/rfid-ziotc-docs/introduction/deployment_modes/index.html#deployment-modes).

## Reader Components[](https://zebradevs.github.io/rfid-ziotc-docs/introduction/intro/index.html#reader-components "Link to this heading")

The reader contains a number of software components that enable Cloud Connect for RFID.

### Reader Gateway[](https://zebradevs.github.io/rfid-ziotc-docs/introduction/intro/index.html#reader-gateway "Link to this heading")

The Reader Gateway is the component responsible for connecting to the outside world. The Management and Control requests are received by the Reader Gateway and passed along to be handled by the appropriate component. The Reader Gateway also collects the tag data from the Radio Control and pushes them out on the Data interface.

### Radio Control[](https://zebradevs.github.io/rfid-ziotc-docs/introduction/intro/index.html#radio-control "Link to this heading")

The Radio Control component configures, controls, and maintains a connection to the RFID radio. Radio control receives the tag read events from the radio and sends them to the Reader Gateway which in turn passes it onto the Data interface.

### Reader Manager[](https://zebradevs.github.io/rfid-ziotc-docs/introduction/intro/index.html#reader-manager "Link to this heading")

The Reader Manager is the component responsible for performing all reader configuration and management operations.

### Reader Webserver[](https://zebradevs.github.io/rfid-ziotc-docs/introduction/intro/index.html#reader-webserver "Link to this heading")

The Reader Webserver presents a web console to control the reader. When Cloud Connect Management and Control Interfaces are configured for Local REST mode, the Reader Webserver handles the REST requests before passing the requests to the Reader Gateway.