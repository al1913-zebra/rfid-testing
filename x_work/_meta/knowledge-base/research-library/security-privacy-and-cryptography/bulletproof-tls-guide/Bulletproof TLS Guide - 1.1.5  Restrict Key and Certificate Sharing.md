### 1.1.5 Restrict Key and Certificate Sharing

In PKI, private keys and certificates can be shared among properties. This practice is not necessarily insecure, but only if it’s done correctly. If in doubt, don’t share: _(1)_ don’t use the same private key with multiple certificates, and _(2)_ don’t put unrelated service domains together on the same certificate. When private keys, certificates, and service domains are not shared, each property will be independently secured.

The main issue with sharing is that if one property is compromised, the other ones in the same group can also be attacked. If you have a group of properties that are all managed by the same team and are all part of the same system, then sharing is not necessarily bad. On the other hand, sharing across multiple teams or systems is _always_ bad.

Wildcard certificates have their place. For example, they are best used by a single property when you need to support an arbitrary number of subdomains—for example, one per customer. Avoid them otherwise.