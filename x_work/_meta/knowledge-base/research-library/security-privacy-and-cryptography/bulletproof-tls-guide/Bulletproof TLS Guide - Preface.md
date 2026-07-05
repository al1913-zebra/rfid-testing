## Preface

Our journey to achieving good network transport security has been long and fraught with difficulties. In the 1990s—when this story began with the early versions of SSL and the Netscape browser—the main challenges were lack of good encryption standards, restrictions on the export of cryptography, and insufficiently powerful computer chips. It took us a good three decades to work through these problems. During that period, a few things improved. The export restrictions went away and computers became faster. A few other things became worse, chiefly because the web platform continued to evolve organically without sufficient thought given to security.

But we collectively kept chipping away at the problems, eventually figuring out what secure network protocols should look like and what kind of security we’d like to have. We figured out that we don’t have to configure each and every server individually and that we can instead rely on the secure and sane defaults now available. We also figured out that we don’t need to manually rotate every single certificate and that automation can achieve much better results with far less time and effort.

At some point, the threads of our progress started to converge, and transport security is now within our reach. _Your_ reach. The field remains complex and filled with many moving parts that need to be accounted for. Some assembly is required.

The guide that’s in front of you has been designed to get you over the finish line. If you follow the assembly instructions specified herein, you will be able to deploy TLS and PKI with confidence.

Most of what I learned has been recorded in my book _Bulletproof TLS and PKI_, which I’ve been continuously writing and updating for more than a decade. You should definitely read it if you’re involved with computer security, software development, or system administration. But even if you don’t have time for that, this guide will tell you everything you need to know. In fact, this guide has been taken directly from the book and published on its own for the very purpose of being easily available to a large audience.

—Ivan Ristić