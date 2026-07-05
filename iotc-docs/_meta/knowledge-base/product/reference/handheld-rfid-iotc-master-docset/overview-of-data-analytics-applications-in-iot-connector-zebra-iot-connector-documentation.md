[Zebra IoT Connector](https://zebradevs.github.io/rfid-ziotc-docs/index.html)

## Introduction[](https://zebradevs.github.io/rfid-ziotc-docs/user_apps/index.html#introduction "Link to this heading")

Reader supports hosting custom embedded applications using Zebra `IoT connector` API extensions for data analytics.

`IOT Connector` enables simple filtering on the reader as part of the Radio Control operating mode. The block diagram below shows the standard system overview highlighting the flow of data from the Radio Control to the Reader Gateway.

> ![../_images/system_overview2.png](https://zebradevs.github.io/rfid-ziotc-docs/_images/system_overview2.png)

Note

While most use cases require a DA app for data filtering, DA apps can be written to also manage and control the readers. Management and control REST APIS can be called on the 127.0.0.1 interface. The REST APIs when called from the DA apps does not require a login and can always be called using HTTP as long as the request is made on 127.0.0.1 interface.

There are many use cases that require advanced filtering and analytics to be done on the reader before sending the data off the reader. Similarly, there are use cases where actions (such as GPO operations) need to be performed on the reader, as well. With the introduction of the **Data Analytics** functionality in `IoT Connector`, these capabilities are available.

The block diagram below shows the introduction of an Analytics Script that can be used to filter, analyze, and act upon data prior to sending that data to the Reader Gateway and off the reader.

> ![../_images/system_overview_DA.png](https://zebradevs.github.io/rfid-ziotc-docs/_images/system_overview_DA.png)

Users can write DA apps using either `Python` or `NodeJS`. Further information on each of these can be found in the respective programmers guide.