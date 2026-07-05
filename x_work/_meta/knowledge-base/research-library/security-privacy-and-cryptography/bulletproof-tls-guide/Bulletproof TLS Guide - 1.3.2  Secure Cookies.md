### 1.3.2 Secure Cookies

In HTTP, cookies are a weak link and need additional attention. You could have a web site that is 100% encrypted and yet remains insecure because of how its cookies are configured. Browsers have been working hard to eliminate this problem, but they’ll need your help.

Mark cookies secure

Depending on the user agent, cookies may by default span both HTTP and HTTPS contexts, which is why they need to be explicitly marked as _secure_ to disable transmission over insecure channels.

Mark cookies as HttpOnly

If a web site uses cookies that need not be accessed from the browser itself, they should be marked as HttpOnly. This is a defense-in-depth technique that aims to minimize the attack surface.

Use cookie name prefixes

Cookie prefixes are a new security measure that is now supported by browsers and being added to the main cookie specification (RFC 6265bis). Cookies with names that start with prefixes `__Host-` and `__Secure-` are given special powers that address a variety of problems that had existed for years. All cookies should be transitioned to use these prefixes.

For best results, consider adding cryptographic integrity validation or even encryption to your cookies. These techniques are useful with cookies that include application data. Encryption can help if the data inadvertently includes something that the user doesn't already know. Integrity validation will prevent tampering. To prevent substitution attacks, include ownership information with each cookie you send, and verify when it is returned back to you.