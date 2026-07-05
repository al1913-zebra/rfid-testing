### 1.1.1 Use Strong Private Keys

For the certificate private key, you have a choice of RSA or ECDSA algorithms. The easy option is to use RSA keys because they are universally supported. But at 2,048 bits, which is the current minimum, RSA keys offer less security and worse performance than ECDSA keys. A 256-bit ECDSA key provides 128 bits of security, versus only 112 bits for a 2,048-bit RSA key. At these sizes, in addition to providing better security, ECDSA is also significantly faster.

By now, ECDSA is very widely supported. Devices that don’t support it are rare and probably obsolete from a security perspective. If you’re still concerned about interoperability, it’s possible to deploy services with dual certificates, thus supporting RSA and ECDSA keys simultaneously. The only disadvantage of this setup is the increased maintenance overhead. Some managed providers can do this automatically for you.

Until recently, ECDSA was thought to be the algorithm of the future, but that all changed when the world decided to embark on a path to post-quantum cryptography. Both RSA and ECDSA can be broken by a cryptographically relevant quantum computer (CRQC). A variety of replacement options are being considered, but it will be some time before the successors are decided.

🛈︎

Note

**Quantum computing**: If you're protecting public infrastructure, continue using ECDSA or RSA keys for the time being, as per your preference. As of March 2026, public certificates haven't yet been upgraded to support post-quantum cryptography. An IETF working group called PLANTS (PKI, Logs, And Tree Signatures) has been formed to explore creating an entirely new type of certificate that reduces the effects of the increased key size of post-quantum cryptography.

If your focus is on private infrastructure, you may be able to move faster, as new low-level standards become available. For example, if you're relying on private PKIs to protect your internal assets, it's now possible to create a private CA with a certificate hierarchy based around ML-DSA. Many organizations are running pilots to build an understanding of whether the key algorithm changes will have a practical impact in their environments.