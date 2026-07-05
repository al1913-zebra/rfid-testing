### 1.1.7 Deploy Certification Authority Authorization

Certification Authority Authorization (CAA) is an evolving security standard that enables you to restrict what CAs are allowed to issue certificates for your properties. CAA is delivered via DNS. When a new certificate is requested, the CA must look for a CAA policy on the affected hosts and verify that they have permission to proceed. If they don't, the issuance must fail.

In the following example configuration, Let’s Encrypt is allowed to issue nonwildcard certificates (`issue`), DigiCert and Entrust are allowed to issue wildcard certificates (`issuewild`), no CA is allowed to issue S/MIME or BIMI certificates (`issuemail` and `issuevmc`), and there is an advertized email address to use to report issuance problems (`iodef`):

```objectivec
example.com.  CAA     0 issue "letsencrypt.org"
example.com.  CAA     0 issuewild "digicert.com"
example.com.  CAA     0 issuewild "entrust.com"
example.com.  CAA     0 issuemail ";"
example.com.  CAA     0 issuevmc ";"
example.com.  CAA     0 iodef "pki@example.com"
```

CAA is a very useful addition to the defense arsenal. Even a policy that allows many CAs is helpful as a way of reducing the attack surface, compared to the default, which allows all CAs. Deploying CAA may be difficult in complex environments because a policy set on the apex domain name automatically applies to all subdomains. Having a list of all existing certificates for an entire domain name space (including subdomains) is very helpful for establishing which CAs should be on your list. A good PKI monitoring tool will provide this list.

If you’re operating a very secure environment, restricting issuance down to a CA level may not be sufficient. For a better approach, work with CAs that support CAA account binding (RFC 8659). With this feature, you will be locking issuance to specific accounts operated by your CAs.