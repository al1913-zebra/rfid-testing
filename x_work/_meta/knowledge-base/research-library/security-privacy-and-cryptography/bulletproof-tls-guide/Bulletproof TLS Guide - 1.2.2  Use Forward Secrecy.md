### 1.2.2 Use Forward Secrecy

Forward secrecy (also known as perfect forward secrecy) is a feature of cryptographic protocols that ensures that every communication (e.g., a connection in the case of TLS) uses a different set of encryption keys. Such keys are called _ephemeral_ because they are discarded after they are no longer needed. Ephemeral connection keys do not depend on any long-term keys—for example, the server key. When there is no forward secrecy, an adversary who can record your network traffic and later obtain the server key can also decrypt all past communications.

SSL and TLS initially used only the RSA key exchange that doesn’t support forward secrecy. To fix that, the ephemeral Diffie-Hellman (DHE) and Elliptic Curve Diffie-Hellman (ECDHE) key exchanges were added over time, along with some protocol improvements in TLS 1.3. Don’t be confused by the fact that RSA can be used for key exchange and authentication operations; the former is bad, but the latter is fine.

In TLS 1.2 and earlier protocol versions, the key exchange (and thus forward secrecy) is controlled via cipher suite configuration. Therefore, you want to ensure that all enabled suites embed the keywords `DHE` and `ECDHE`. In TLS 1.3, _all_ suites support forward secrecy; the RSA key exchange is no longer supported.

We’re now in the process of adopting new key exchange methods as part of the transition to post-quantum cryptography, but it certain that they will all support forward secrecy by default.