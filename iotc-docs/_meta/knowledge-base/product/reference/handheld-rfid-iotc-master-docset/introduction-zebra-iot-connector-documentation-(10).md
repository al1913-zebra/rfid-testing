`Zebra IoT Connector` can be configured in a variety of deployment modes

> -   [Pure Cloud Deployment](https://zebradevs.github.io/rfid-ziotc-docs/introduction/deployment_modes/index.html#pure-cloud-deployment)
>     
>     > -   [Amazon Web Services (AWS) IoT Core](https://zebradevs.github.io/rfid-ziotc-docs/introduction/deployment_modes/index.html#amazon-web-services)
>     >     
>     > -   [Microsoft Azure IoT Hub](https://zebradevs.github.io/rfid-ziotc-docs/introduction/deployment_modes/index.html#microsoft-azure)
>     >     
>     
> -   [Local Deployment](https://zebradevs.github.io/rfid-ziotc-docs/introduction/deployment_modes/index.html#local-deployment)
>     
>     > -   [Local Deployment with MQTT](https://zebradevs.github.io/rfid-ziotc-docs/introduction/deployment_modes/index.html#local-deployment-with-mqtt)
>     >     
>     > -   [Local Deployment with HTTP](https://zebradevs.github.io/rfid-ziotc-docs/introduction/deployment_modes/index.html#local-deployment-with-http)
>     >     
>     
> -   [Hybrid Deployment](https://zebradevs.github.io/rfid-ziotc-docs/introduction/deployment_modes/index.html#hybrid-deployment)
>     

## Pure Cloud Deployment[](https://zebradevs.github.io/rfid-ziotc-docs/introduction/deployment_modes/index.html#pure-cloud-deployment "Link to this heading")

In a Pure Cloud deployment, the Management, Control, and Data interfaces of the `Zebra IoT Connector` feature are all configured to connect to a cloud service provider.

`Zebra IoT Connector` also enables a configuration to connect with major public cloud platforms like `Amazon Web Services` and `Microsoft Azure`.

Figure illustrates a Pure Cloud deployment and the flow of different interfaces.

Important

The solid lines in Figure represent the Management interfaces, the dotted black lines represent the Control interface and the dotted red lines represent the Data interface.

![Cloud Deployment](https://zebradevs.github.io/rfid-ziotc-docs/_images/DM1.png)

## Amazon Web Services (AWS) IoT Core[](https://zebradevs.github.io/rfid-ziotc-docs/introduction/deployment_modes/index.html#amazon-web-services-aws-iot-core "Link to this heading")

This feature enables fixed reader to connect with `AWS IoT Core` service and provides interface to manage, control and stream events from fixed Readers.

For information on how to setup reader to connect with `AWS IoT Core`, follow the instructions at [Connect To AWS](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/AWS/index.html#connect-to-aws).

## Microsoft Azure IoT Hub[](https://zebradevs.github.io/rfid-ziotc-docs/introduction/deployment_modes/index.html#microsoft-azure-iot-hub "Link to this heading")

This feature enables fixed reader to connect with `Azure IoT Hub` service and provides interface to manage, control and stream events from fixed Readers.

For information on how to setup reader to connect with `Azure IoT Hub`, follow the instructions at [Connect To Azure](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/AZURE/index.html#connect-to-azure).

## Local Deployment[](https://zebradevs.github.io/rfid-ziotc-docs/introduction/deployment_modes/index.html#local-deployment "Link to this heading")

In a local deployment, the reader is setup to have all the interfaces (Management, Control and Data) exposed locally so that the reader does not have to be connected to the Internet. When setup locally, `IoT Connector` can send data to either a HTTP/HTTPS server or a MQTT data broker. The Management and Control interfaces can be configured to Local REST or to connect to a MQTT broker.

## Local Deployment with MQTT[](https://zebradevs.github.io/rfid-ziotc-docs/introduction/deployment_modes/index.html#local-deployment-with-mqtt "Link to this heading")

When setup this way the Control, Management and Data interfaces are connected to a MQTT broker.

![Local Deployment with MQTT](https://zebradevs.github.io/rfid-ziotc-docs/_images/local_deployment_2.JPG)

Important

The solid lines in Figure represent the Management interfaces, the dotted black lines represent the Control interface and the dotted red lines represent the Data interface. The Control and Management functionalities can be exercised through the local REST APIs.

## Local Deployment with HTTP[](https://zebradevs.github.io/rfid-ziotc-docs/introduction/deployment_modes/index.html#local-deployment-with-http "Link to this heading")

When setup this way the Control and Management interfaces are exposed as REST APIs on the reader that can be directly accessed as shown in the figure below. The data is sent as HTTP/HTTPS POST request to the specified server.

Important

The solid lines in Figure represent the Management interfaces, the dotted black lines represent the Control interface and the dotted red lines represent the Data interface. The Control and Management functionalities can be exercised through the local REST APIs.

Local Deployment With On Premise Data, Control and Management Interfaces

![Local Deployment with HTTP](https://zebradevs.github.io/rfid-ziotc-docs/_images/local_deployment.png)

Important

`IoT Connector` can also be configured to expose the Management and Control interfaces as a REST interface as described in [Local Deployment with HTTP](https://zebradevs.github.io/rfid-ziotc-docs/introduction/deployment_modes/index.html#local-deployment-with-http) but send data over the MQTT interface as described in [Local Deployment with MQTT](https://zebradevs.github.io/rfid-ziotc-docs/introduction/deployment_modes/index.html#local-deployment-with-mqtt)

## Hybrid Deployment[](https://zebradevs.github.io/rfid-ziotc-docs/introduction/deployment_modes/index.html#hybrid-deployment "Link to this heading")

In a Hybrid deployment, the Control, Management, and Data interfaces can be configured to connect to different endpoints. For example, the Control and Management interfaces can be connected to the cloud services platform and the Data interface can be configured to connect to a local HTTP/HTTPS server. This scenario is illustrated in Figure below. When the Data interface is configured to connect to the local HTTP/HTTPS server, the reader will send tag data information to the HTTP/HTTPS server as POST requests.

Hybrid Deployment With On Premise Data Interface

![hybrid Deployment](https://zebradevs.github.io/rfid-ziotc-docs/_images/hybrid_deployment.jpg)

## REST APIs[](https://zebradevs.github.io/rfid-ziotc-docs/introduction/deployment_modes/index.html#rest-apis "Link to this heading")

## Local Deployment[](https://zebradevs.github.io/rfid-ziotc-docs/introduction/deployment_modes/index.html#id6 "Link to this heading")

For information on REST APIs in Local Deployment Please see [here](https://zebradevs.github.io/rfid-ziotc-docs/api_ref/local_rest/index.html#local-rest-apis).

## Other Clouds and Hybrid Deployment[](https://zebradevs.github.io/rfid-ziotc-docs/introduction/deployment_modes/index.html#other-clouds-and-hybrid-deployment "Link to this heading")

In a generic deployment, a REST API can be created based on the messages on the control and management interfaces. Please see [here](https://zebradevs.github.io/rfid-ziotc-docs/schemas/raw_mqtt_payloads/index.html#raw-mqtt-payloads) for more details.