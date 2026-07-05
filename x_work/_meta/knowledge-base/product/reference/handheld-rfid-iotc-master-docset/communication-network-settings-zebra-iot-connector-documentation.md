The Communication / Network Settings in `123RFID Desktop` is part of the **network** configuration in `IoT Connector`.

> ![123RFID Desktop Communication / Network Settings](https://zebradevs.github.io/rfid-ziotc-docs/_images/Communication.png)

The Network Settings on the `123RFID Desktop` can be translated and used as follows.

> # Communication / Network Settings[](https://zebradevs.github.io/rfid-ziotc-docs/migration/123RFID_Desktop/communication.html/#communication-network-settings "Link to this heading")
> 
> IoT Connector set\_network REST API to set different Network setting for the reader.[](https://zebradevs.github.io/rfid-ziotc-docs/migration/123RFID_Desktop/communication.html#id1 "Link to this code")
> 
> ```json
>  {
>      "command": "set_network",
>      "command_id": "16266718797272556",
>      "payload": {
>          "macAddress": "84:24:8D:FB:6C:10",
>          "dhcp": "false",
>          "dnsAddress": "10.17.1.30",
>          "subnetMask": "255.255.255.0",
>          "gatewayAddress": "10.17.231.1",
>          "ipAddress": "10.17.231.62",
>          "hostName": "FX9600FB6C10"
>      }
>  }
> ```