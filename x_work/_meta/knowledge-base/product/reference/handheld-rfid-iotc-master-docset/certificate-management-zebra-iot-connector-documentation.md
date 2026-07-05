This section guides the user on how to manage the certificates on the reader.

## Certificate Management Overview[](https://zebradevs.github.io/rfid-ziotc-docs/certificate_management/index.html#certificate-management-overview "Link to this heading")

The Reader provides an ability to install multiple certificates. There are mainly 3 types on certificates that can be installed on the reader.

> -   **Server**: This is the Main certificate that can be installed on the reader. There can only be one server certificate on the reader. The reader by default comes up with a self signed certificate. A certificate installed as the server certificate is used by the reader to secure the incoming connections to the reader ( For Ex: the Web Console, SFTP etc).
>     
> -   **Client**: There can be more than one client certificates installed on the reader. The client certificates are typically used to secure outgoing connections from the reader. This certificate is the recommended type for use with `IoT Connector`.
>     
> -   **App**: This type of certificate can be installed for use by the user applications on the reader.
>     
> 
> Important
> 
> Reader supports only certificates in PFX format.

## Installing Certificates from Web Console[](https://zebradevs.github.io/rfid-ziotc-docs/certificate_management/index.html#installing-certificates-from-web-console "Link to this heading")

The FX Series and ATR7000 readers support installing certificates using two methods.

-   **Server Based:** In this method the reader pulls the certificate from a secure server where it is hosted. The certificate must be hosted using one of the supported secure server protocols.
    
    > The following server protocols are supported.
    
    -   **HTTPS with Basic Authentication**
        
    -   **FTPS**
        
    -   **SCP**
        
    
-   **File Based:** In this method the file can be uploaded directly to the reader from the browser.
    

### Server Based installation[](https://zebradevs.github.io/rfid-ziotc-docs/certificate_management/index.html#server-based-installation "Link to this heading")

To install the client certificate, go to the **Configure Reader** > **Certificates** page. Select the installation method. Select the **Certificate Type** as `client`. Enter a **Name** for the certificate for easy identification. Enter the **URL** where the certificate is hosted. The **UserID** and **Password** fields must be supplied if the server where certificate is hosted requires authentication. **PFX Password** must be supplied if the cert being installed is password protected.

> ![../_images/cert_install.png](https://zebradevs.github.io/rfid-ziotc-docs/_images/cert_install.png)

### File Based installation[](https://zebradevs.github.io/rfid-ziotc-docs/certificate_management/index.html#file-based-installation "Link to this heading")

To install the client certificate, go to the **Configure Reader** > **Certificates** page. Select the installation method. Select the **Certificate Type** as `client`. Enter a **Name** for the certificate for easy identification. Click on the **Browse** button and select the file to be installed. **PFX Password** must be supplied if the cert being installed is password protected.

> ![../_images/cert_install_file_based.png](https://zebradevs.github.io/rfid-ziotc-docs/_images/cert_install_file_based.png)

## Installing CA Certificates[](https://zebradevs.github.io/rfid-ziotc-docs/certificate_management/index.html#installing-ca-certificates "Link to this heading")

To install the CA Certificates in the reader, download and import postman collections [`Cert Management.postman_collection.json`](https://zebradevs.github.io/rfid-ziotc-docs/_downloads/8008b1b9d75b7846cd8c9a210823e9df/Cert%20Management.postman_collection.json)

1.  Create an environment variables `protocol` (http/https) and `reader-ip` (10.17.231.7).
    
2.  Execute `Login` API.
    
    > Important
    > 
    > change username and password field in the body with readers username and password configured.
    > 
    > ![../_images/login.png](https://zebradevs.github.io/rfid-ziotc-docs/_images/login.png)
    
3.  Goto the `ADD CA Cert` API and replace the content in `<motorm:CAfileContent>` tag with the content of the CA certificate to be imported and replace the content in `<motorm:sessionID>` tag with the sessionID obtained in Login API.
    
    > ![../_images/add_cert.png](https://zebradevs.github.io/rfid-ziotc-docs/_images/add_cert.png)
    

## Generating Certificates[](https://zebradevs.github.io/rfid-ziotc-docs/certificate_management/index.html#generating-certificates "Link to this heading")

To generate the client certificates for reader, download and extract the scripts [`SecurityCertGeneratorScriptsV4.zip`](https://zebradevs.github.io/rfid-ziotc-docs/_downloads/fc5348b5aa8b63897047690972211590/SecurityCertGeneratorScriptsV4.zip)

Follow the below steps:

-   go to **SecurityCertGeneratorScriptsV3** folder
    
-   edit the **caconfig.cnf** ro change the variables in **root\_ca\_distinguished\_name** section.
    
-   edit the **samplehost.cnf** to enter the details of the reader.
    
-   generate the CA Certificates by running **./InitRootCA.sh**
    
-   generate the client certificates by running **./CreateClientCert.sh**
    
-   the client certificates will be generated under CA-Certs/myCA/ folder as client\_cert.pfx. The PFX file will be protected with the password specified in the **GENERATED\_CERT\_KEY\_PASSWORD** variable in CreateClientCert.sh script.
    

Note

The password needs to be included while configuring endpoints that use this certificate