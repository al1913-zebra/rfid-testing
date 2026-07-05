-   [](https://zebradevs.github.io/rfid-ziotc-docs/index.html)
-   Connect Fixed Readers to HTTP POST

___

This section serves to guide the user to connect Zebra fixed readers `FX9600`, `FX7500` and `ATR7000` with `HTTP POSTcServer` for sending Tag Events.

Important

prerequisite:

-   `FX9600` and `FX7500` readers firmware version should be >= `3.10.X`
    
-   `ATR7000` reader firmware version should be >= `3.17.X`
    

Other pages in this section provide guidance for:

-   [HTTP POST Server Setup](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/HTTP_POST/cloud_instructions.html)
-   [HTTP POST Proxy Server Setup](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/HTTP_POST/cloud_instructions.html#http-post-proxy-server-setup)
    -   [Guide to Setting Up a Proxy Server with Squid](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/HTTP_POST/cloud_instructions.html#guide-to-setting-up-a-proxy-server-with-squid)
        -   [Step 1: Install Squid](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/HTTP_POST/cloud_instructions.html#step-1-install-squid)
            -   [On Ubuntu/Debian:](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/HTTP_POST/cloud_instructions.html#on-ubuntu-debian)
        -   [Step 2: Configure Squid](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/HTTP_POST/cloud_instructions.html#step-2-configure-squid)
        -   [Step 3: Set Up Authentication](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/HTTP_POST/cloud_instructions.html#step-3-set-up-authentication)
        -   [Step 4: Start and Enable Squid Service](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/HTTP_POST/cloud_instructions.html#step-4-start-and-enable-squid-service)
        -   [Step 5: Configure Firewall](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/HTTP_POST/cloud_instructions.html#step-5-configure-firewall)
        -   [Step 6: Test the Proxy Server](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/HTTP_POST/cloud_instructions.html#step-6-test-the-proxy-server)
-   [Device Setup](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/HTTP_POST/device_side_instructions.html)
    -   [Web Interface](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/HTTP_POST/web.html)
        -   [Import Certificates](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/HTTP_POST/web.html#import-certificates)
            -   [Using SCP](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/HTTP_POST/web.html#using-scp)
            -   [Using Web UI](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/HTTP_POST/web.html#using-web-ui)
        -   [Add HTTP Post Endpoint](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/HTTP_POST/web.html#add-http-post-endpoint)
        -   [Interface Configuration](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/HTTP_POST/web.html#interface-configuration)
    -   [Reader Manager](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/HTTP_POST/RM.html)
        -   [Import Certificates and Generate Endpoint Configuration](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/HTTP_POST/RM.html#import-certificates-and-generate-endpoint-configuration)
        -   [Import Configuration into Reader](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/HTTP_POST/RM.html#import-configuration-into-reader)
        -   [Connect to Cloud](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/HTTP_POST/RM.html#connect-to-cloud)
        -   [Verify Cloud Connection](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/HTTP_POST/RM.html#verify-cloud-connection)
-   [Testing](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/HTTP_POST/testing.html)
    -   [Interact with Reader](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/HTTP_POST/testing.html#interact-with-reader)
    -   [Sample Tag Data for HTTP Proxy](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/HTTP_POST/testing.html#sample-tag-data-for-http-proxy)
-   [Troubleshooting](https://zebradevs.github.io/rfid-ziotc-docs/other_cloud_support/HTTP_POST/troubleshoot.html)