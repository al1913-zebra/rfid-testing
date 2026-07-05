### 1.4.3 Optimize Connection Management

In the early days, slow cryptographic operations were the main bottleneck introduced by encryption. Since then, CPU speed has improved greatly, so much so that most sites don’t worry about its overhead. The main overhead of TLS now lies with the increased network latency of the handshake. The best way to improve TLS performance is to find ways to avoid repeated handshakes.

Keep connections open

The best approach to avoiding TLS handshakes is to keep existing connections open for an extended period of time and reuse them for subsequent user requests. In HTTP, this feature is known as keep-alives, and using it is a simple matter of web server reconfiguration.

Use TLS 1.3

The complete redesign of TLS in version 1.3 to improve security was also a good opportunity to improve its performance. As a result, this protocol version reduces full handshake latency by half, compared to the standard handshake in earlier protocol revisions. TLS 1.3 also introduces a special 0-RTT (zero round-trip time) mode, in which TLS adds no additional latency over TCP. Your servers will fly with this mode enabled, but with the caveat that using it opens you up to replay attacks. Because of this, this mode is not appropriate for use with all applications.

Use modern HTTP protocols

There was a very fast pace of HTTP protocol evolution recently. After HTTP/1.1, there was a long period of no activity, but then we got HTTP/2 and soon thereafter HTTP/3 (built on another protocol, called QUIC). These two releases didn’t change HTTP itself but focused on connection management and the underlying transport mechanism.

Use content delivery networks

Content delivery networks (CDNs) can be very effective at improving network performance, provided they are designed to reduce the network latency of new connections to origin servers. Normally, when you open a connection to a remote server, you need to exchange some packets with it for the handshake to complete. At best, you need to send your handshake request and receive the server’s response before you can start sending application data. The further the server, the worse the latency. CDNs, by definition, are going to be close to you, which means that the latency between you and them is going to be small. CDNs that keep connections to origin servers open won’t have to open new connections all the time, leading to potentially substantial performance improvements.