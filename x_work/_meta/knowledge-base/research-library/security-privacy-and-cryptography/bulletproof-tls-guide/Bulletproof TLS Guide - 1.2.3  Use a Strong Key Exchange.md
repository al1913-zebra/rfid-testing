### 1.2.3 Use a Strong Key Exchange

In 2026, our main focus is on defending against quantum computers. As far as we know, these devices don't yet exist, but that doesn't mean that they are not dangerous. In fact, there is a type of attack called store now, decrypt later (or, if you prefer, harvest now, decrypt later) that focuses on capturing some important encrypted network traffic today, in anticipation of being able to use quantum computers to decrypt it some time later.

If quantum computers are in your threat model, you should aim to update your services to support one of the brand-new hybrid key agreement mechanisms that provide safety: `X25519MLKEM768`, `SecP256r1MLKEM768`, or `SecP384r1MLKEM1024`. If you're familiar with the modern cryptographic primitives, you will infer from these names that they are hybrids of some popular elliptic curve groups and the new ML-KEM post-quantum algorithm approved by NIST. These key agreements are so fresh that they haven't been published in an official RFC yet, but they're already supported by modern browsers and operating systems, many CDNs, and the newer generation of operation systems that are built around OpenSSL 3.5.x.

🛈︎

Note

**Quantum computing**: TLS is immediately vulnerable to attacks by quantum computers, even though they don't yet exist. The `X25519MLKEM768` key agreement mechanism has been established as the de-facto standard post-quantum key agreement and should be the one you should aim to support on your systems.

The rest of this section applies only to legacy platforms running TLS 1.2 and earlier protocol revisions, which will not be upgraded to be safe against quantum computers. When it comes to these, configuring a strong key exchange is still important, albeit not as critical.

Because DHE fell out of fashion in recent years, ECDHE is mandatory, but DHE could still be used if there is an old user agent that requires it. (This is less and less likely with every passing year.) With older protocols, it still might be possible to configure a suite that uses the RSA key exchange (not to be confused with RSA authentication), but you should not use that one as it compromises forward security.

For key exchange to be secure, ECDHE and DHE have to be used with secure parameters. For ECDHE, the parameters are called _named curves_ (or named groups) and only two are practical: `X25519` and `P-256` (also known as `sec256r1`). For DHE (if using), ensure the parameters provide 2,048 bits of security. Some server applications provide secure DHE parameters out of the box; with others, you'll have to provide your own.