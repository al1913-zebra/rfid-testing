The GPO (General Purpose Output) Programming in `123RFID Desktop` is part of the **Operating Mode** configuration in `IoT Connector`.

> ![123RFID Desktop GPO Programming](https://zebradevs.github.io/rfid-ziotc-docs/_images/GPO.png)

The following Code illustrate the IoT Connector config REST API that must be configured on the reader to effectively migrate the 123RFID Desktop configuration.

> # GPO (General Purpose Output) Programming[](https://zebradevs.github.io/rfid-ziotc-docs/migration/123RFID_Desktop/gpo.html/#gpo-general-purpose-output-programming "Link to this heading")
> 
> IoT Connector set\_config REST API to set different GPO setting for the reader.[](https://zebradevs.github.io/rfid-ziotc-docs/migration/123RFID_Desktop/gpo.html#id1 "Link to this code")
> 
> ```json
>  {
>      "command": "set_config",
>      "command_id": "16266718797272556",
>      "payload": {
>          "GPIO-LED": {
>              "RADIO_START": [
>                  {
>                      "type": "GPO",
>                      "pin": 1,
>                      "state": "HIGH"
>                  }
>              ],
>              "RADIO_STOP": [
>                  {
>                      "type": "GPO",
>                      "pin": 1,
>                      "state": "LOW"
>                  }
>              ]
>          }
>      }
>  }
> ```