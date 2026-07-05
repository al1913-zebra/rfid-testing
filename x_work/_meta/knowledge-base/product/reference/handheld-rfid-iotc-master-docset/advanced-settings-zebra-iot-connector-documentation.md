The Advanced Settings in `123RFID Desktop` is part of the **Operating Mode** configuration in `IoT Connector`.

> ![123RFID Desktop Advanced Settings](https://zebradevs.github.io/rfid-ziotc-docs/_images/Advanced.png)

## Antenna Singulation[](https://zebradevs.github.io/rfid-ziotc-docs/migration/123RFID_Desktop/advanced.html#antenna-singulation "Link to this heading")

To configure the antenna singulation using **Operating Mode** the `session` field under `query` can be used. If the same singulation is desired on all the antennas, the operating mode can be set as follows

> IoT Connector Operating Mode to set the same singulation on all antennas[](https://zebradevs.github.io/rfid-ziotc-docs/migration/123RFID_Desktop/advanced.html#id1 "Link to this code")
> 
> ```json
>  {
>      "type": "CUSTOM",
>      "query": {
>          "session": "S0"
>      }
>  }
> ```

To Configure different antenna singulation on each antenna, first the antennas to be used for reading tags must be specified using the antennas field and then the singulation can be specified for each selected antenna.

> IoT Connector Operating Mode to set different singulation on each antenna of a 4 port reader[](https://zebradevs.github.io/rfid-ziotc-docs/migration/123RFID_Desktop/advanced.html#id2 "Link to this code")
> 
> ```json
>  {
>      "type": "CUSTOM",
>      "antennas": [1, 2, 3, 4],
>      "query": [
>          {
>              "session": "S0"
>          },
>          {
>              "session": "S1"
>          },
>          {
>              "session": "S2"
>          },
>          {
>              "session": "S3"
>          }
>      ]
>  }
> ```

The above operating mode specifies that antennas 1,2,3,4 of the 4 port reader is to be used for reading tags and the corresponding singulation are to be set to s0, s1, s2, s3 respectively.

> Important
> 
> The singulation is matched with the corresponding antenna in the antennas array. The length of the array for antennas must be same as the length of the array in query.

## State Aware[](https://zebradevs.github.io/rfid-ziotc-docs/migration/123RFID_Desktop/advanced.html#state-aware "Link to this heading")

To configure the antenna State Aware parameters using **Operating Mode** the `sel` and `target` fields under `query` can be used. If the same State Aware parameters are desired on all the antennas, the operating mode can be set as follows

> IoT Connector Operating Mode to set the same State Aware parameters on all antennas[](https://zebradevs.github.io/rfid-ziotc-docs/migration/123RFID_Desktop/advanced.html#id3 "Link to this code")
> 
> ```json
>  {
>      "type": "CUSTOM",
>      "query": {
>          "sel": "ALL",
>          "target": "A"
>      }
>  }
> ```

To Configure different antenna State Aware parameters on each antenna, first the antennas to be used for reading tags must be specified using the antennas field and then the State Aware parameters can be specified for each selected antenna.

> IoT Connector Operating Mode to set different State Aware parameters on each antenna of a 4 port reader[](https://zebradevs.github.io/rfid-ziotc-docs/migration/123RFID_Desktop/advanced.html#id4 "Link to this code")
> 
> ```json
>  {
>      "type": "CUSTOM",
>      "antennas": [1, 2, 3, 4],
>      "query": [
>          {
>              "sel": "NOT_SL",
>              "target": "A"
>          },
>          {
>              "sel": "ALL",
>              "target": "B"
>          },
>          {
>              "sel": "SL",
>              "target": "AB"
>          },
>          {
>              "sel": "ALL",
>              "target": "AB"
>          }
>      ]
>  }
> ```

The above operating mode specifies that antennas 1,2,3,4 of the 4 port reader is to be used for reading tags and the corresponding State Aware parameters are to be set to NOT\_SL/A, ALL/B, SL/AB, ALL/AB respectively.

> Important
> 
> The State Aware parameters are matched with the corresponding antenna in the antennas array. The length of the array for antennas must be same as the length of the array in query.

## Tag Population Estimate[](https://zebradevs.github.io/rfid-ziotc-docs/migration/123RFID_Desktop/advanced.html#tag-population-estimate "Link to this heading")

To configure the antenna Tag population using **Operating Mode** the `tagPopulation` field under `query` can be used. If the same Tag Population is desired on all the antennas, the operating mode can be set as follows

> IoT Connector Operating Mode to set the same Tag Population on all antennas[](https://zebradevs.github.io/rfid-ziotc-docs/migration/123RFID_Desktop/advanced.html#id5 "Link to this code")
> 
> ```json
>  {
>      "type": "CUSTOM",
>      "query": {
>          "tagPopulation": 100
>      }
>  }
> ```

To Configure different antenna Tag population on each antenna, first the antennas to be used for reading tags must be specified using the antennas field and then the singulation can be specified for each selected antenna.

> IoT Connector Operating Mode to set different tagPopulation on each antenna of a 4 port reader[](https://zebradevs.github.io/rfid-ziotc-docs/migration/123RFID_Desktop/advanced.html#id6 "Link to this code")
> 
> ```json
>  {
>      "type": "CUSTOM",
>      "antennas": [1, 2, 3, 4],
>      "query": [
>          {
>              "tagPopulation": 50
>          },
>          {
>              "tagPopulation": 100
>          },
>          {
>              "tagPopulation": 150
>          },
>          {
>              "tagPopulation": 200
>          }
>      ]
>  }
> ```

The above operating mode specifies that antennas 1,2,3,4 of the 4 port reader is to be used for reading tags and the corresponding tagPopulation are to be set to 50, 100, 150, 200 respectively.

> Important
> 
> The tagPopulation is matched with the corresponding antenna in the antennas array. The length of the array for antennas must be same as the length of the array in query.