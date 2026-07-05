Applications must be packaged in Debian installer format (.deb) and deployed to execute on the readers.

## Development and Testing of user applications[](https://zebradevs.github.io/rfid-ziotc-docs/user_apps/packaging_and_deployment.html#development-and-testing-of-user-applications "Link to this heading")

During development phase, developers can run and debug app from the SSH command line of the reader using rfidadm user.

> -   Copy the app to /apps folder on the reader (e.g. scp sample.py [rfidadm@ip-addr-of-reader](mailto:rfidadm%40ip-addr-of-reader):/apps/)
>     
> -   Login into to the reader over SSH as user rfidadm (no password needed).
>     
> -   Then run the app from command line. For e.g., for a Python application do
>     
> 
> ```bash
> cd /apps
> python3 sample.py
> ```

## Packaging[](https://zebradevs.github.io/rfid-ziotc-docs/user_apps/packaging_and_deployment.html#packaging "Link to this heading")

Once applications are developed/tested to confirm its functional, it can be packaged for deployment to one or more readers. Use an Ubuntu Linux host PC for packaging the application into a Debian installer.

> Important
> 
> Make sure dpkg-deb command line tool is available on the host.

Following is the procedure to create a package of an any application. This procedure assumes an application sample.py needs to be packaged for installation.

> -   Create a any application. Example [Python sample.py DA app.](https://zebradevs.github.io/rfid-ziotc-docs/user_apps/python/legacy/python_guide.html#sample-python-da-app)
>     
> -   Create a Start script namely ‘start\_sample.sh’. Rename the ‘sample’ with actual name of the DA application.
>     
>     > ```bash
>     > EXECUTABLE_NAME= sample
>     > python3 /apps/${EXECUTABLE_NAME}.py &
>     > ```
>     
> -   Create a Stop script namely ‘stop\_sample.sh’. Rename the ‘sample’ with actual name of the DA application.
>     
>     > ```bash
>     > EXECUTABLE_NAME= sample
>     > PID=`ps -C 'python3 /apps/${EXECUTABLE_NAME}.py' -o pid=`
>     > kill -9 $PID
>     > unset EXECUTABLE_NAME
>     > unset PID
>     > ```
>     
> -   Replace line EXECUTABLE\_NAME= sample in start\_sample.sh and stop\_sample.sh with name of the DA application.
>     
> -   Create a control file with the below content in it.
>     
>     > ```vbnet
>     > Package: sample
>     > Version: 1.0.1
>     > Source: base
>     > Priority: optional
>     > Architecture: all
>     > Maintainer: Zebra
>     > Description: "Sample DA application"
>     > APP_TYPE: DA
>     > ```
>     
> -   In a suitable folder on the Linux host PC (e.g. ~/projects/sample\_1.0.1) keep the application file sample.py and the scripts created in above step, and an empty folder named DEBIAN for manifest.
>     
>     > ```
>     > sample_1.0.1 (folder)
>     > ├── DEBIAN (folder)
>     > |   └──  control
>     > ├── sample.py
>     > ├── start_sample.sh
>     > ├── stop_sample.sh
>     > ```
>     
> -   From shell prompt issue command: dpkg-deb with **–build** and **\-Zgzip** options, followed by the folder tree where python script, start/stop bash scripts and DEBIAN manifest folder are present.
>     
>     > ```sql
>     > user@dev-host:~/projects$ dpkg-deb --build -Zgzip sample_1.0.1/
>     > ```
>     
> -   Output Debian package generated can then be used for reader deployment.
>     

## Deployment[](https://zebradevs.github.io/rfid-ziotc-docs/user_apps/packaging_and_deployment.html#deployment "Link to this heading")

Application may be deployed to the reader using one of the following methods:

### Reader Administrative Web Console[](https://zebradevs.github.io/rfid-ziotc-docs/user_apps/packaging_and_deployment.html#reader-administrative-web-console "Link to this heading")

-   Access reader using Reader Administrative Console and navigate to **Applications** page.
    
-   In **Install New Package** click `Browse` and select the Debian package to be installed and click `Install`.
    
    > ![../_images/user_apps_webconsole.png](https://zebradevs.github.io/rfid-ziotc-docs/_images/user_apps_webconsole.png)
    
-   After installation, click `Start`. If app needs to be run at startup, keep the `AutoStart` option enabled.
    

### Using IoT connector API[](https://zebradevs.github.io/rfid-ziotc-docs/user_apps/packaging_and_deployment.html#using-iot-connector-api "Link to this heading")

IoT connector provides commands through which the userapps can be installed. The supported commands are listed in the table below and can be sent using the management interface.

> |       **Command**       |                     **Description**                      |
> |---------------------|------------------------------------------------------|
> |     **get_userapps**     |       Gets the list of all installed UserApps        |
> |  **set_installUserapp**  |                Installs the userapp.                 |
> | **set_uninstallUserapp** |                 Uninstalls the app.                  |
> |   **set_startUserapp**   |                 Starts the user app                  |
> |   **set_stopUserapp**    |                  Stops the user app                  |
> | **set_autostartUserapp** | Enables/disables the autostart flag on the user app. |

Please refer to [API documentation](https://zebradevs.github.io/rfid-ziotc-docs/schemas/raw_mqtt_payloads/index.html#raw-mqtt-payloads) for details on usage of these APIs.