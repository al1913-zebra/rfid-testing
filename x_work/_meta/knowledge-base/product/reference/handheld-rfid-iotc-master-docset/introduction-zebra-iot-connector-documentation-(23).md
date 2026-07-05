# Introduction[](https://zebradevs.github.io/rfid-ziotc-docs/directionality/index.html#portal-directionality-web-interface/#introduction "Link to this heading")

This section guides user to setup Portal Directionality.

Important

1.  Portal Directionality mode is only applicable to ATR7000 Readers. For full set of supported parameters refer to the [Operating Modes Schema](https://zebradevs.github.io/rfid-ziotc-docs/schemas/operating_modes/index.html#oper-modes) section.
    
2.  The web interface does not allow the usage of the start and stop directionality app. The task can only be accomplished by utilizing local\_rest or Mqtt.
    

## Portal Directionality Web Interface[](https://zebradevs.github.io/rfid-ziotc-docs/directionality/index.html#portal-directionality-web-interface "Link to this heading")

Portal Directionality can be configured using the reader web UI.

-   Click **Portal Directionality** on the navigation menu.
    

![Navigation menu](https://zebradevs.github.io/rfid-ziotc-docs/_images/pd_navigation.png)

-   The Portal Directionality webpage opens up in a **new tab**.
    

Note

**Note**: Navigating to the portal directionality page will change the operating mode configuration to `Directionality` and add an endpoint named “PDWC” to the list of configured endpoints.

-   You may be prompted with a login window. Use the _same credentials_ as the ones used to login to the reader.
    
    > ![Directionality Login](https://zebradevs.github.io/rfid-ziotc-docs/_images/directionality_login.png)
    

Important

Launching Portal Directionality for the first time on a reader may take several minutes to load up

## Layout[](https://zebradevs.github.io/rfid-ziotc-docs/directionality/index.html#layout "Link to this heading")

-   Once the Portal Directionality page is up, it will load up the Directionality Events Table and Zone Plan sections as shown below
    
    > ![Directionality Dashboard](https://zebradevs.github.io/rfid-ziotc-docs/_images/directionality_dashboard.png)
    
-   The directionality dashboard has three main sections:
    
    > -   **Directionality Events Table**: The left side, Directionality Events, displays the ongoing directionality tag events.
    >     
    > -   **Zone Plan**: The right side is a spatial graph that displays the number of tags present in various zones with respect to the reader.
    >     
    > -   **Settings**: The menu button on the top-left corner of the page opens the **settings** and **advanced settings** menus.
    >     
    

### Directionality Events Table[](https://zebradevs.github.io/rfid-ziotc-docs/directionality/index.html#directionality-events-table "Link to this heading")

The Directionality Events Table displays information on current tags and transitions. The table consists of the following columns

> -   **Tag**: A list of unique tags in the field of view
>     
> -   **Timestamp**: Indicates when a tag event was reported
>     
> -   **Previous Zone -> Current Zone**: This column reports the tag transition events. There are three possible events.
>     
>     -   `NEW`: Indicates that the tag has just entered a zone. In such a scenario, the zone the tag was detected in is reported. In case of a new event, the previous zone of the tag will not be reported.
>         
>     -   `TRANSITION`: 1=>3 indicates a transition event where the tag in question has moved from zone 1 to zone 3. If the tag has not moved from it’s zone, this field will report the zone the tag is found in.
>         
>     -   `TIMED_OUT`: Indicates a tag has timed out. Occurs when the tag in question has not reported to the reader within a set interval.
>         
>     
> 
> ![Directionality Events Table](https://zebradevs.github.io/rfid-ziotc-docs/_images/events_table.png)

### Zone Plan[](https://zebradevs.github.io/rfid-ziotc-docs/directionality/index.html#zone-plan "Link to this heading")

> The Zone Plan graph displays the spatial arrangement of the zones with respect to the ATR.
> 
> -   The orientation of the ATR is displayed on the graph with a tiny arrow pointing upwards. The arrow corresponds to the North of the ATR. If the orientation of the ATR does not align with the default positions of the zones, It can be configured in the [orientation configuration](https://zebradevs.github.io/rfid-ziotc-docs/directionality/index.html#orientation-configuration) section in the settings menu.
>     
>     > ![Reader orientation](https://zebradevs.github.io/rfid-ziotc-docs/_images/reader_orientation.png)
>     
> -   The user can switch between a **4 Zone** and a **6 Zone** plan.
>     
>     ![Zone Plan](https://zebradevs.github.io/rfid-ziotc-docs/_images/zone_plan.png)
>     

> -   The names of the zones can also be changed. In case a name is changed, the names of all other zones should also be updated as needed.
>     
>     ![Zones Renamed](https://zebradevs.github.io/rfid-ziotc-docs/_images/zone_rename.png)
>     
> 
> Note
> 
> Hit [Apply](https://zebradevs.github.io/rfid-ziotc-docs/directionality/index.html#apply-settings) in the directionality settings menu to apply Zone Name changes.

-   **START**: Start reading and reporting tags
    
-   **STOP**: Stop reading but tags will report the TIMED\_OUT events.
    
-   **Clear**: Clear the events and zones graph of reported tags.
    
-   **Export**: Exports the output in the form of a csv file.
    

### Directionality Settings[](https://zebradevs.github.io/rfid-ziotc-docs/directionality/index.html#directionality-settings "Link to this heading")

> The settings menu allows users to configure basic and advanced directionality settings
> 
> > ![Directionality Settings](https://zebradevs.github.io/rfid-ziotc-docs/_images/directionality_settings.png)
> > 
> > -   `Reader Height`: Defines the height at which the reader is placed. It can be fixed at any height within the range of 10 and 20 feet.
> >     
> > -   `Tag Height`: Height of tag (in feet).
> >     
> > -   `Zones`: Defines the number of zones the atr classifies the tags into. The ATR can switch between a _4 zone_ and a _6 zone_ setup. _The zones can be_ [renamed](https://zebradevs.github.io/rfid-ziotc-docs/directionality/index.html#rename-zones) _on the spatial graph_.
> >     
> > -   `Orientation`: Defines the Orientation of the tag (in degrees). The values are within the range of _0_ and _360_ degrees.
> >     
> > -   `Zone Inner Width`: Defines the inner zone width in feet.
> >     
> > -   `Zone Extension`: The extension of the main zone into one another (in feet).
> >     
> > -   `Beam Configuration`: Density of Beams. Can be switched between _Default_, _Dense_ and _Sparse_
> >     
> > -   `Filter tags with Prefix`: Defines a mask to filter reported tags with.
> >     
> > -   `Report Updates`: Duration to report tag updates even if no transition (value in seconds) (-1 is never report).
> >     
> > -   `Tag Timeout`: Minimum duration until a tag is deemed “gone” (in seconds).
> >     
> > -   `Hysteresis Distance`: Set the distance (in feet) a tag must travel into a zone to be able to move back into previous zone.
> >     

> -   **Apply**: Applies the set configuration to the reader
>     
> -   **Reset**: Resets the UI to display the current configuration on the reader.
>     
> -   **Export**: Exports the json configuration as a text file.
>     
> -   **Import**: Imports a local configuration onto the reader. Refer to [Operating Mode Schemas](https://zebradevs.github.io/rfid-ziotc-docs/schemas/operating_modes/index.html#oper-modes) on how to create a raw configuration
>