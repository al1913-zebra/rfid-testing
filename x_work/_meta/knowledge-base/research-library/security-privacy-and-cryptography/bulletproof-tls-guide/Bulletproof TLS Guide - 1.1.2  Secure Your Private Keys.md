### 1.1.2 Secure Your Private Keys

Although we spend the most time obsessing about key size, issues surrounding key management are more likely to have a real impact on your security. There is ample evidence to suggest that the most successful attacks bypass encryption rather than break it. If someone can break into your server and steal your private key or otherwise compel you to disclose the key, why would they bother with difficult attacks against cryptography?

Keep your private keys private

Treat your private keys as an important asset, restricting access to the smallest possible group of employees while still keeping the arrangements practical. Some CAs offer to generate private keys for you, but they should know better. The hint is in the name: private keys should stay private, without exception.

Think about random number generation

The security of encryption keys depends on the quality of the random number generator (RNG) of the computer on which the keys are generated. Keys are often created on servers right after their installation and rebooting, but at that point the server might not have sufficient entropy to generate a strong key. It’s better to generate all your keys in one (offline) location, where you can ensure that a strong RNG is in place.

Password protect your keys

Your keys should have a passphrase on them from the moment they are created. This helps reduce the attack surface if your backup system is compromised. It also helps prevent leakage of the key material when copying keys from one computer to another (directly or using USB sticks); it’s getting increasingly difficult to safely delete data from modern file systems.

Don’t share keys among unrelated servers and applications

Sharing keys is dangerous: if one system is broken into, its compromised key could be used to attack other systems that use the same key, even if they use different certificates. For the best results, use separate private keys for each logical environment. This approach provides a robust defense against external and internal attacks.

Change keys regularly

Treat private keys as a liability. Keep track of when the keys were created to ensure they don’t remain in use for too long. You _must_ change them after a security incident and when a key member of your staff leaves, and you should change them when obtaining a new certificate. When you generate a new key, you remove the old key as an attack vector. This is especially true for systems that do not use or support forward secrecy. In this case, your key can be used to decrypt all previous communications, if your adversary has recorded them. By deleting the key safely, you ensure that it can’t be used against you.

Your default should be to generate a new private key with every certificate renewal. Systems with valuable assets that do not use forward secrecy (which is not advisable) should have their keys changed at least quarterly.

Store keys safely

Keep a copy of your keys in a safe location. Losing a server key is usually not a big deal because you can always generate a new one, but it’s a different story altogether with keys used for intermediate and private CAs and keys that are used for public key pinning.

Generating and keeping private keys in tamper-resistant hardware is the safest approach you can take, if you can afford it. Such tools are known as Hardware Security Modules (HSMs). If you use such a device, private keys never leave the HSM and, in fact, can’t be extracted. These days, HSMs are commonly available as cloud services.