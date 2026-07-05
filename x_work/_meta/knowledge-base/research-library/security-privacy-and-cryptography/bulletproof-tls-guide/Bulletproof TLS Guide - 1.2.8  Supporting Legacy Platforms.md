### 1.2.8 Supporting Legacy Platforms

Sometimes you’ll find yourself needing to support legacy user agents that don’t have the latest and greatest security features. In this case, you will need to reach out for, and enable, certain components that are not ideal but are still acceptable for use in exceptional situations. It could be that the risk of the exploitation is low or that the service is not that valuable, or perhaps you have mitigation measures in place. If you are in this situation, this section is for you; I will outline here some of those imperfect but palatable legacy features.

The good news is that it’s generally possible to deploy strong and weak elements at the same time, relying on the TLS negotiation features and protocol downgrade defense to ensure that individual connections use the best commonly supported features. This means that those weak elements in your configuration will be used only as a last resort.

RSA private keys

The ECDSA algorithm is gaining in popularity on account of its speed, but you will often find that it’s not supported by some old user agents. In this case, fall back to the RSA algorithm. If you care about performance, deploy with two certificates, using both ECDSA and RSA at the same time.

TLS 1.1, TLS 1.0, SSL 3, and SSL 2

Very old user agents won’t support TLS 1.2, so you may need to enable TLS 1.0 for them. This is not terrible and you may find that my recommended suite configuration works for you. If you’re considering SSL 3, you’re dealing with ancient stuff. Are you sure you want to do that? It’s probably best that you seek professional advice. SSL 2 cannot be used securely—and it’s worse than no encryption because this protocol version can be used to exploit secure servers (via DROWN). Nobody cares about TLS 1.1.

Weak Diffie-Hellman key exchange

There are some old clients (e.g., Java before version 8) that can’t use the DH key exchange at 2,048 bits, which is the recommended strength today. You may consider dropping the strength to 1,024 bits to accommodate these clients. If you do, you should generate a unique set of DH parameters on each server. You must not use any of the predefined well-known groups because they can be exploited via a precomputation attack. Anything below 1,024 bits is very easy to exploit.

You need to be aware that if you reduce the strength of the DH key exchange, it will affect both modern and legacy clients. This is one aspect of TLS configuration that cannot be negotiated on a per connection basis. The best approach is to have separate systems for modern and legacy customers. If you can’t do that, preferring the ECDHE key exchange (as in my recommended configuration) will ensure that modern clients all use ECDHE and never attempt DHE.

Weak cipher suites

Once upon a time, it was necessary to make compromises to support some very old user agents—for example, Windows XP and Android. These are bad at cryptography and don’t support either DHE or ECDHE key exchange, not even AES. To support these platforms you’ll need to support the plain old RSA key exchange that doesn’t provide forward security. For Windows XP, you’ll need to support 3DES as well. You very likely don’t need that, but here are some last-resort suites to place at the end of your prioritized list of suites if there is no other way:

```
TLS_RSA_WITH_AES_128_CBC_SHA
TLS_RSA_WITH_AES_256_CBC_SHA
TLS_RSA_WITH_3DES_EDE_CBC_SHA
```