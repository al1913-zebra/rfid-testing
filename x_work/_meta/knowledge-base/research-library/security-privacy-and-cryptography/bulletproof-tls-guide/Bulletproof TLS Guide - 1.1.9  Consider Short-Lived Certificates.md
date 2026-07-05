### 1.1.9 Consider Short-Lived Certificates

As of 2026, we have another useful security tool to add to our arsenal—certificates that are valid for such a short period of time that they don’t incorporate any revocation information. These are called short-lived certificates and can last for up to 7 days.

Longer-life certificates come with two problems: _(1)_ they force you to use the backing private keys for a longer period of time and _(2)_ they could be weaponized for a longer period of time if stolen. The latter problem was supposed to be solved using revocation, but that’s never worked properly and is being abandoned, at least for public certificates.

Short-lived certificates have always been a good idea from the security standpoint, but they make more sense now, in a world where issuance automation is widespread. Operationally, however, it remains to be seen if the extreme reduction of certificate lifetime leads to increased outages. More companies need to adopt these types of certificate before we can tell.