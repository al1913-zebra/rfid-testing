### 1.3.3 Use Strict Transport Security

For proper security of the transport layer, you must indicate your preference for encrypted content. HTTP Strict Transport Security (HSTS) is a standard that allows web sites to request strict handling of encryption. Web sites signal their policies via an HTTP response header for enforcement in compliant browsers. Once HSTS is deployed, compliant browsers will switch to always using TLS when communicating with the web site. This addresses a number of issues that are otherwise difficult to enforce: _(1)_ users who have plaintext bookmarks and follow plaintext links, _(2)_ insecure cookies, _(3)_ HTTPS stripping attacks, and _(4)_ mixed-content issues within the same site.

In addition, and perhaps more importantly, HSTS fixes handling of invalid certificates. Without HSTS, when browsers encounter invalid certificates, they allow their users to proceed to the site. Many users can’t differentiate between attacks and configuration issues and decide to proceed, which makes them susceptible to active network attacks. With HSTS, certificate validation failures are final and can’t be bypassed. That brings TLS back to how it should have been implemented in the first place.

All web sites should deploy HSTS to fix legacy browser issues in how encryption is handled. In fact, deploying HSTS is probably the single most important improvement you can make. The following configuration enables HSTS on the current domain and all subdomains, with a policy duration of one full year:

```lua
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

For best results, consider adding your properties to the HSTS preload list. With that, browsers and other clients can ship with a full list of encryption-properties, which means that even first access to those sites can enforce encryption.

⯃︎

Warning

Unless you have full control over your infrastructure, it's best to deploy HSTS incrementally, starting with a short policy duration (e.g., 300 seconds) and no preloading. The fact that HSTS has a memory effect, combined with its potential effect on subdomains, can lead to problems in complex environments. With incremental deployments, problems are discovered while they're still easy to fix. Request preloading as the last deployment step, and after you activate sufficiently long policy duration.

HSTS is not the only technology that can help with enforcing encryption. Although much more recent and with a lot of catching up to do, there are also the HTTPS DNS resource records, which build on the DNS infrastructure to carry various metadata, including signaling of support for encryption.

In the SMTP space, there is MTA Strict Transport Security (MTA-STS), which enforces encryption for transmission of email messages.