### 1.2.5 Use Secure Cipher Suites

In TLS, cipher suites are the most visible aspect of server configuration. Usually a lot of effort goes into understanding what options are available, secure, and required to achieve secure communication. Determining what cipher suites to use has traditionally been difficult; over time, the TLS protocol accumulated a very large number of suites, most of which are considered insecure or inadequate today.

On the positive side, TLS 1.3, the most recent incarnation of the TLS protocol, supports only a handful of suites, and all of them are secure. If you base your configuration on this protocol version, all connections with clients that also support it will be secure with ease. You should lead with the following three suites (which are usually enabled by default anyway):

```
TLS_AES_128_GCM_SHA256
TLS_CHACHA20_POLY1305_SHA256
TLS_AES_256_GCM_SHA384
```

When it comes to TLS 1.2, you should rely on cipher suites that provide strong key exchange, forward secrecy, and AEAD (authenticated encryption with associated data) encryption of 128 bits. Use AES and ChaCha20 encryption algorithms. Your configuration can continue to utilize non-AEAD suites, but only to support very old clients, if that’s necessary. Don’t use anything else unless you consult a cryptography expert and you know what you’re doing.

The preceding recommendations, translated to specific TLS 1.2 suites, yields the following:

```
TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256
TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256
TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384
TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA
TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA
TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256
TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384
TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256
TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA
TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA
TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256
TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384
TLS_DHE_RSA_WITH_AES_128_GCM_SHA256
TLS_DHE_RSA_WITH_CHACHA20_POLY1305_SHA256
TLS_DHE_RSA_WITH_AES_256_GCM_SHA384
TLS_DHE_RSA_WITH_AES_128_CBC_SHA
TLS_DHE_RSA_WITH_AES_256_CBC_SHA
TLS_DHE_RSA_WITH_AES_128_CBC_SHA256
TLS_DHE_RSA_WITH_AES_256_CBC_SHA256
```

This configuration is designed with both security and performance in mind. It supports both ECDSA and RSA keys, with priority given to the former, which is faster. It also includes more suites than strictly necessary in order to support a wider range of clients.

Some older OpenSSL versions don’t recognize the official cipher suite names. The following configuration is exactly the same but uses the nonstandard legacy OpenSSL suite names:

```
ECDHE-ECDSA-AES128-GCM-SHA256
ECDHE-ECDSA-CHACHA20-POLY1305
ECDHE-ECDSA-AES256-GCM-SHA384
ECDHE-ECDSA-AES128-SHA
ECDHE-ECDSA-AES256-SHA
ECDHE-ECDSA-AES128-SHA256
ECDHE-ECDSA-AES256-SHA384
ECDHE-RSA-AES128-GCM-SHA256
ECDHE-RSA-CHACHA20-POLY1305
ECDHE-RSA-AES256-GCM-SHA384
ECDHE-RSA-AES128-SHA
ECDHE-RSA-AES256-SHA
ECDHE-RSA-AES128-SHA256
ECDHE-RSA-AES256-SHA384
DHE-RSA-AES128-GCM-SHA256
DHE-RSA-CHACHA20-POLY1305
DHE-RSA-AES256-GCM-SHA384
DHE-RSA-AES128-SHA
DHE-RSA-AES256-SHA
DHE-RSA-AES128-SHA256
DHE-RSA-AES256-SHA256
```

I recommend that you always configure OpenSSL with an explicit list of desired suites, as indicated earlier. This approach is the simplest and provides great visibility into exactly what is enabled. With OpenSSL, it’s also possible to use the legacy, keyword-based configuration approach, but that leads to opaque configurations that are difficult to understand and often end up doing the wrong thing.