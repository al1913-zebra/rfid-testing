> ![123RFID Desktop User Applications](https://zebradevs.github.io/rfid-ziotc-docs/_images/Applications.png)

IoT connector provides commands through which the userapps can be installed. The supported commands are listed in the table below.

> # User Applications[](https://zebradevs.github.io/rfid-ziotc-docs/migration/123RFID_Desktop/applications.html/#user-applications "Link to this heading")
> 
> |       **Command**       |                     **Description**                      |                                                                                       **Example Payload**                                                                                       |
> |---------------------|------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
> |     **get_userapps**     |       Gets the list of all installed UserApps        | {
> 
> “command”: “get_userapps”,
> 
> “command_id”: “16266718797272556”,
> 
> “payload”: {}
> 
> } |
> |  **set_installUserapp**  |                Installs the userapp.                 | {
> 
> “command”: “set_installUserapp”,
> 
> “command_id”: “16266718797272556”,
> 
> “payload”: {
> 
> “url”: “http://hostname:portNo/”,
> 
> “authenticationType”: “NONE”,
> 
> “filename”: “sample_1.0.1.deb”
> 
> }
> 
> } |
> | **set_uninstallUserapp** |                 Uninstalls the app.                  | {
> 
> “command”: “set_uninstallUserapp”,
> 
> “command_id”: “16266718797272556”,
> 
> “payload”: {
> 
> “appname”: “sample”
> 
> }
> 
> } |
> |   **set_startUserapp**   |                 Starts the user app                  | {
> 
> “command”: “set_startUserapp”,
> 
> “command_id”: “16266718797272556”,
> 
> “payload”: {
> 
> “appname”: “sample”
> 
> }
> 
> } |
> |   **set_stopUserapp**    |                  Stops the user app                  | {
> 
> “command”: “set_stopUserapp”,
> 
> “command_id”: “16266718797272556”,
> 
> “payload”: {
> 
> “appname”: “sample”
> 
> }
> 
> } |
> | **set_autostartUserapp** | Enables/disables the autostart flag on the user app. | {
> 
> “command”: “set_autostartUserapp”,
> 
> “command_id”: “16266718797272556”,
> 
> “payload”: {
> 
> “appname”: “sample”,
> 
> “autostart”: true
> 
> }
> 
> } |