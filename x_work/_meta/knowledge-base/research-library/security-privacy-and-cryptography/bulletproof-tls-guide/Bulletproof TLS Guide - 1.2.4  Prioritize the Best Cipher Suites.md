### 1.2.4 Prioritize the Best Cipher Suites

In TLS, servers are in the best position to determine the most secure communication option to use with the connecting clients. That’s because the first step of the TLS handshake involves the client sending a list of supported features. What remains is for the server to choose what feature to proceed with.

Unfortunately, some platforms don’t actively choose the best option, instead resorting to choosing the first one offered by clients. For best results, check what your platform does and enable server preference wherever possible. In general, avoid platforms that don’t support server preference enforcement as it may not be possible to configure them securely in a general case.