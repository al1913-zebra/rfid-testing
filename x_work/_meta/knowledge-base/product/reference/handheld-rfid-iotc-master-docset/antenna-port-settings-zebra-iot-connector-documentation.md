The Antenna Port Settings in `123RFID Desktop` is part of the **Operating Mode** configuration in `IoT Connector`.

> ![123RFID Desktop Antenna Port Settings](https://zebradevs.github.io/rfid-ziotc-docs/_images/Antenna.png)

Antenna Name and Color in 123RFID Desktop is not supported in IoT Connector.

## Antenna Enable/Disable[](https://zebradevs.github.io/rfid-ziotc-docs/migration/123RFID_Desktop/antenna.html#antenna-enable-disable "Link to this heading")

To configure the antennas using **Operating Mode** the `antennas` field can be used.

> IoT Connector Operating Mode to enable the antennas.[](https://zebradevs.github.io/rfid-ziotc-docs/migration/123RFID_Desktop/antenna.html#id1 "Link to this code")
> 
> ```json
>  {
>      "type": "CUSTOM",
>      "antennas":[1,2,3,4]
>  }
> ```

Not setting this field on any operating modes payload makes by default Enable all the Antennas supported on the reader. Example: 2 / 4 / 8.

## Power(dBm)[](https://zebradevs.github.io/rfid-ziotc-docs/migration/123RFID_Desktop/antenna.html#power-dbm "Link to this heading")

To configure the antenna power using **Operating Mode** the `transmitPower` field can be used. If the same transmit power is desired on all the antennas, the operating mode can be set as follows

> IoT Connector Operating Mode to set the same transmit power on all antennas[](https://zebradevs.github.io/rfid-ziotc-docs/migration/123RFID_Desktop/antenna.html#id2 "Link to this code")
> 
> ```json
>  {
>      "type": "CUSTOM",
>      "transmitPower": 25
>  }
> ```

To Configure different antenna power on each antenna, first the antennas to be used for reading tags must be specified using the antennas field and then the transmit power can be specified for each selected antenna.

> IoT Connector Operating Mode to set different transmit power on each antenna of a 4 port reader[](https://zebradevs.github.io/rfid-ziotc-docs/migration/123RFID_Desktop/antenna.html#id3 "Link to this code")
> 
> ```json
>  {
>      "type": "CUSTOM",
>      "antennas": [1,2,3,4],
>      "transmitPower": [20,22,25,30]
>  }
> ```

The above operating mode specifies that antennas 1,2,3,4 of the 4 port reader is to be used for reading tags and the corresponding transmit powers are to be set to 20, 22, 35, 30 dbm respectively.

> Important
> 
> The transmit power is matched with the corresponding antenna in the antennas array. The length of the array for antennas must be same as the length of the array in transmitPower.

## RF Modes[](https://zebradevs.github.io/rfid-ziotc-docs/migration/123RFID_Desktop/antenna.html#rf-modes "Link to this heading")

To configure the RF Modes using **Operating Mode** the `linkProfile` field can be used. If the same RF Modes is desired on all the antennas, the operating mode can be set as follows

> IoT Connector Operating Mode to set the same RF Mode on all antennas[](https://zebradevs.github.io/rfid-ziotc-docs/migration/123RFID_Desktop/antenna.html#id4 "Link to this code")
> 
> ```json
>  {
>      "type": "CUSTOM",
>      "linkProfile": 3
>  }
> ```

To Configure different RF Mode on each antenna, first the antennas to be used for reading tags must be specified using the antennas field and then the linkProfile can be specified for each selected antenna.

> IoT Connector Operating Mode to set different linkProfile on each antenna of a 4 port reader[](https://zebradevs.github.io/rfid-ziotc-docs/migration/123RFID_Desktop/antenna.html#id5 "Link to this code")
> 
> ```json
>  {
>      "type": "CUSTOM",
>      "antennas": [1,2,3,4],
>      "linkProfile": [3,101,913,1519]
>  }
> ```

The above operating mode specifies that antennas 1,2,3,4 of the 4 port reader is to be used for reading tags and the corresponding RF Modes are to be set to 3, 101, 913, 1519 respectively.

> Important
> 
> The RF Mode is matched with the corresponding antenna in the antennas array. The length of the array for antennas must be same as the length of the array in linkProfile.

## Dwell Time[](https://zebradevs.github.io/rfid-ziotc-docs/migration/123RFID_Desktop/antenna.html#dwell-time "Link to this heading")

To configure the Dwell Time using **Operating Mode** the `antennaStopCondition` field can be used.

The following table provides the equivalent parameters of Dwell Time in 123RFID Desktop and antennaStopCondition on the IoT Connector.

> |   Dwell Time    |      antennaStopCondition       |                                                                    Description                                                                    |                           Payload                            |
> |-----------------|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------|
> |   N_Attempts    |         INVENTORY_COUNT         |                               Inventory will switch to a different antenna after ‘n’ number of Inventory attempts.                                | {
> 
> “type”:”INVENTORY_COUNT”,
> 
> “value”:100
> 
> } |
> |   N_Millisecs   |            DURATION             |                                       Inventory will switch to a different antenna after ‘n’ Milliseconds.                                        | {
> 
> “type”: “DURATION”,
> 
> “value”: 400
> 
> } |
> |    N_Seconds    |            DURATION             | Inventory will switch to a different antenna after ‘n’ Seconds in 123RFID Desktop.
> 
> Whereas DURATION in IoT Connector supports only Milliseconds. | {
> 
> “type”: “DURATION”,
> 
> “value”: 1000
> 
> } |
> | N_Millisecs_1_Rnd | SINGLE_INVENTORY_LIMITED_DURATION | The antenna stop condition is set to run a single inventory round for no longer than 1/N seconds.
> 
> Where N is the number of enabled antennas. | {
> 
> “type”:”SINGLE_INVENTORY_LIMITED_DURATION”,
> 
> “value”:200
> 
> } |

If the same Dwell Time is desired on all the antennas, the operating mode can be set as follows

> IoT Connector Operating Mode to set the same Dwell Time on all antennas[](https://zebradevs.github.io/rfid-ziotc-docs/migration/123RFID_Desktop/antenna.html#id7 "Link to this code")
> 
> ```json
>  {
>      "type": "CUSTOM",
>      "antennaStopCondition":
>          {
>              "type": "DURATION",
>              "value": 400
>          }
>  }
> ```

To Configure different Dwell Time on each antenna, first the antennas to be used for reading tags must be specified using the antennas field and then the antennaStopCondition can be specified for each selected antenna.

> IoT Connector Operating Mode to set different antennaStopCondition on each antenna of a 4 port reader[](https://zebradevs.github.io/rfid-ziotc-docs/migration/123RFID_Desktop/antenna.html#id8 "Link to this code")
> 
> ```json
>  {
>      "type": "CUSTOM",
>      "antennas": [
>          1,
>          2,
>          3,
>          4
>      ],
>      "antennaStopCondition": [
>          {
>              "type": "DURATION",
>              "value": 400
>          },
>          {
>              "type": "INVENTORY_COUNT",
>              "value": 100
>          },
>          {
>              "type": "DURATION",
>              "value": 65000
>          },
>          {
>              "type": "SINGLE_INVENTORY_LIMITED_DURATION",
>              "value": 200
>          }
>      ]
>  }
> ```

The above operating mode specifies that antennas 1,2,3,4 of the 4 port reader is to be used for reading tags and the corresponding Dwell Times are to be set to DURATION, INVENTORY\_COUNT, DURATION, and SINGLE\_INVENTORY\_LIMITED\_DURATION respectively.

> Important
> 
> The Dwell Time is matched with the corresponding antenna in the antennas array. The length of the array for antennas must be same as the length of the array in antennaStopCondition.