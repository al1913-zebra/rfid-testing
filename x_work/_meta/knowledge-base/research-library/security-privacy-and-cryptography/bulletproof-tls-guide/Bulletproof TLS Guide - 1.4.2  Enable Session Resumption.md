### 1.4.2 Enable Session Resumption

In TLS terminology, when a client and server have a successful handshake, they establish a session. Handshakes involve a fair amount of computation, which is why cryptographic protocols focused on performance also incorporate session caching (or session resumption), which makes it possible to continue to use the results of one handshake over a period of time, typically for up to a day.

Session resumption is an essential performance optimization that ensures smooth operation, even for web sites that don’t need to scale. Servers that don’t use it or don’t use it well are going to perform significantly slower.