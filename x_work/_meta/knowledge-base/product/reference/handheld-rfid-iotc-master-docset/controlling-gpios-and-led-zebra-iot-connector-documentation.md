`IoT Connector` provides an easy to use rules based mechanism to control the reader GPOs and LED. User can create multiple rules and actions combo and save them on the reader. The reader will monitor for those events and take the configured actions automatically.

> Important
> 
> IoT Connector can only control the App LED (LED3) on the device.

## Configuring using Web Console[](https://zebradevs.github.io/rfid-ziotc-docs/controlling_gpio_n_led/index.html#configuring-using-web-console "Link to this heading")

The GPIO-LED configuration page can be accessed by navigating to **Communication** > **Zebra IoT Connector** > **GPIO Config**. This page allows the users to add any number of rules that will control the GPOs and the LED based on certain conditions.

> ![../_images/gpio_led_config.PNG](https://zebradevs.github.io/rfid-ziotc-docs/_images/gpio_led_config.PNG)

The page consists of the following sections:

> -   **Defaults** : Specifies the default state of the GPOs and LED.
>     
> -   **Event** : Specifies the event of interest.
>     
> -   **Condition**: Specifies the additional conditions to check for before taking the action on an event.
>     
> -   **Action**: The action to be taken
>     

The following table provides more info on each of the above items.

> |  Section   |      Control       |                                                                                                                                                         Description                                                                                                                                                         |                                                                                                                                                              Values                                                                                                                                                              |
> |------------|--------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
> |  Defaults  |        `GPO1`        |                                                                                                                                          Specifies the default state of the GPO 1.                                                                                                                                          |                                                                                                                                                            `LOW`, `HIGH`                                                                                                                                                             |
> |  Defaults  |        `GPO2`        |                                                                                                                                          Specifies the default state of the GPO 2.                                                                                                                                          |                                                                                                                                                            `LOW`, `HIGH`                                                                                                                                                             |
> |  Defaults  |        `GPO3`        |                                                                                                                                          Specifies the default state of the GPO 3.                                                                                                                                          |                                                                                                                                                            `LOW`, `HIGH`                                                                                                                                                             |
> |  Defaults  |        `GPO4`        |                                                                                                                                          Specifies the default state of the GPO 4.                                                                                                                                          |                                                                                                                                                            `LOW`, `HIGH`                                                                                                                                                             |
> |  Defaults  |        `LED3`        |                                                                                                                                          Specifies the default state of the LED 3.                                                                                                                                          |                                                                                                                                                      `OFF`, `RED`, `AMBER`, `GREEN`                                                                                                                                                      |
> |   Event    |       `Event`        |                                                                                                                                              Specifies the event of interest.                                                                                                                                               | `GPI`, `Cloud Connect`, `Cloud Disconnect`, `Tag Read`, `Radio Start`, `Radio Stop`.
> 
> In case of a GPI events the **Port Number** and **state** can be specified.
> 
> **Note:**
> 
> - GPI Events are reported on GPI triggers.
> 
> - Tag Events are reported on GPI triggers only if the corresponding GPI is set as the start trigger
> 
> and inventory is ongoing. |
> |   Event    |       `Number`       |                                                                                                                    Specifies the Port Number of the **GPI**. This is valid only if **Event** is selected as `GPI`                                                                                                                     |                                                                                                                                                                                                                                                                                                                                  |
> |   Event    |       `State`        | Specifies the State of the GPI to be monitored. When the GPI goes to the specified state, then the event is trigerred.
> 
> This is valid only if the **Event** is selected as `GPI`. |                                                                                                                                                            `HIGH`, `Low`                                                                                                                                                             |
> | Conditions |  `Cloud Connected`   |                                                                                                             If checked, the configured action is taken only if the `IoT Connector` is connected to the endpoints.                                                                                                             |                                                                                                                                                                                                                                                                                                                                  |
> | Conditions | `Cloud Disconnected` |                                                                                                          If checked, the configured action is taken only if the `IoT Connector` is disconnected from the endpoints.                                                                                                           |                                                                                                                                                                                                                                                                                                                                  |
> | Conditions |   `Radio Ongoing`    |                                                                                                      If Checked, the configured action is taken only if the reader is currently trying to read tags (Start is issued).                                                                                                      |                                                                                                                                                                                                                                                                                                                                  |
> | Conditions |  `Radio Notongoing`  |                                                                                                         If Checked, the configured action is taken only if the reader is not trying to read tags (Stop is issued).                                                                                                          |                                                                                                                                                                                                                                                                                                                                  |
> | Conditions |      `Operand`       | More than one condition can be specified in which the case operand to apply must also be specified.
> 
> If `AND` Operand is selected, then the action will be applied only if all the conditions specified have been met.
> 
> If `OR` Operand is selected, then if one of the conditions is met, the configured action will be taken. |                                                                                                                                                             `AND`, `OR`                                                                                                                                                              |
> |   Action   |       `Entity`       |                                                                                                                                       Entity to be controlled when the event occurs.                                                                                                                                        |                                                                                                                                                   `LED3`, `GPO1`, `GPO2`, `GPO3`, `GPO4`                                                                                                                                                   |
> |   Action   |       `State`        |                                                                                                                                    specifies what state to put the control entity into.                                                                                                                                     | For GPOs the **state** can be `HIGH` or `LOW`.
> 
> for LED, the **State** can be set to `GREEN`, `RED` or `AMBER`. |
> |   Action   | `Post Action State`  |                                                                                                                        specifies what **State** the Entity must be left in after performing the action.                                                                                                                         | For GPOs the **Post Action State** can be `HIGH` or `LOW`.
> 
> For LED, the **Post Action State** can be set to `GREEN`, `RED` or `AMBER`. |
> |   Action   |         `On`         | This is part of the blink parameters. Specifies how long in milli-seconds the entity must be in the state configured.
> 
> For GPOs and LED the **On** state is what is configured in `State` field in Action section. |                                                                                                                                                         A valid integer                                                                                                                                                          |
> |   Action   |        `Off`         | This is part of the blink parameters. Specifies how long in milli-seconds the entity must be in the off state.
> 
> For GPOs the **Off** state is the opposite of the state configured in `State` field in the Action section.
> 
> For LED, the **Off** state is when LED is OFF. |                                                                                                                                                         A valid integer                                                                                                                                                          |
> |   Action   |   `Blink Duration`   |                                                                                                                     Specifies the duration in milli-seconds for which to perform On/Off of the entity.                                                                                                                      |                                                                                                                                                         A valid Integer                                                                                                                                                          |

## Managing GPIO-LED Configuration[](https://zebradevs.github.io/rfid-ziotc-docs/controlling_gpio_n_led/index.html#managing-gpio-led-configuration "Link to this heading")

Once the required configuration parameters for GPO-LED control is entered in the UI, User can click on the `Add` button. This will add the current configuration to the list of configuration at the bottom of the page as shown below.

> ![../_images/added_configs.png](https://zebradevs.github.io/rfid-ziotc-docs/_images/added_configs.png)

User can click on any of the added configurations to **view** the details. Upon clicking the `Delete` icon, the configuration will be deleted. Once the required configuration is all set, then the user must click on `Save`. Only then will the changes be pushed to the reader.

## Example[](https://zebradevs.github.io/rfid-ziotc-docs/controlling_gpio_n_led/index.html#example "Link to this heading")

In this example, the following control logic will be set on the reader.

> -   By default all GPOs will be low and LED will be OFF
>     
> -   When a tag is read, if the cloud is disconnected, then GPO 1 will be set to HIGH for 100ms.
>     
> -   After 100ms GPO1 will be set back to LOW
>     

The above configuration can be set on the reader as indicated below.

> ![../_images/example1.png](https://zebradevs.github.io/rfid-ziotc-docs/_images/example1.png)