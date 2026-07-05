[Zebra IoT Connector](https://zebradevs.github.io/rfid-ziotc-docs/index.html)

This Page provides guidance for setting up an HTTP file server using Flask.

Host : Ubuntu or Windows

**Steps:**

# Configure HTTP File server for set\_os:[](https://zebradevs.github.io/rfid-ziotc-docs/batching_and_retention/http_fileServer/index.html/#configure-http-file-server-for-set-os "Link to this heading")

2.  Create a Python script utilizing the Flask framework to implement a web server.
    
    Download the sample python script utilizing the Flask framework [`httpserver`](https://zebradevs.github.io/rfid-ziotc-docs/_downloads/0513ca03b2e6ac8f682eeee46416abc1/httpserver.py)
    
    Important
    
    Necessary prerequisites for running the provided Python script.
    
    ```yaml
    1. install python3
    2. install Flask
    3. Use the telnet command to check for open ports, and then adjust the port in the script(line no: 78) accordingly.
        a. usage of telnet : telnet <Server_IP> <port>
        b. sample example : telnet 10.23.34.45 8080
    4. Adjust the path in the script(line No : 77) according to the location where the script is being executed.
    ```
    
3.  Create a folder to store all firmware files.
    
    > Below is sample tree structure of folder ‘Builds’
    > 
    > ```python
    > ├── Builds
    > │   └── Build_3.21.23
    > |       └── fxupdate.elf
    > |       └── osupdate.elf
    > |       └── platform.tar.gz
    > |       └── platform_3.21.23.0.jffs2
    > |       └── response.txt
    > |       └── response_ext.txt
    > |       └── rootfs_3.20.5.0.jffs2
    > |       └── rootfs_3.20.5.0.jffs2_2
    > |       └── rootfs_3.20.5.0.jffs2_3
    > |       └── rootfs_3.20.5.0.jffs2_4
    > |       └── u-boot_3.17.6.0.bin
    > |       └── uImage_3.20.1.0
    > |       └── x-load_4.0.0.0.bin.ift
    > │   └── Build_3.21.21
    > │   └── Build_3.10.30
    > ```
    
4.  run the python script in the server.
    
    > ```
    > python3 httpserver.py
    > ```
    
5.  Navigate to the postman application or mqtt to send the set\_os request.
    
    for instructions on how to send set\_os request refer to [Local Deployment REST API Guide](https://zebradevs.github.io/rfid-ziotc-docs/api_ref/local_rest/index.html#local-rest-apis)
    

Now test from reader for HTTP file transfer.