### 1.1.3 Choose the Right Certification Authority

For a small site that needs only a simple domain-validated certificate, virtually any CA will suffice. If you can automate certificate renewal (highly recommended), just get your certificates for free from Let’s Encrypt or another free provider. What’s the point of paying if you don’t have to? If you have complex requirements, you may want to explore the commercial options, at which point you should take your time and select a CA that meets your requirements.

Features

At a minimum, you will want to work with a CA that supports both RSA and ECDSA certificate keys. We now finally have a standard for automated certificate issuance (the Automatic Certificate Management Environment, or ACME for short); you should pick a CA that supports issuance automation.

Focus and expertise

PKI is a field that requires deep expertise and dedication; mistakes are easy to make. If you’re going to be relying on a CA for a critical function, you may as well choose an organization that’s serious about it. This is not quite easy to quantify, but you should examine the selected CA’s history, staff, and business direction. It’s best to work with CAs for which certificate issuance is the core part of their business.

Service

At the end of the day, it’s all about the service. The certificate business is getting more complicated by the day. If you don’t have experts on your staff, perhaps you should work with a CA on which you can rely. Costs matter, but so do the management interfaces and the quality of the support. Determine what level of support you will require from your CA, and choose an organization that will be able to provide it when you need it.

You should be aware that if you're getting your certificates from only one CA, they are your single point of failure. If your deployments are sufficiently important to justify the additional effort, consider getting your certificates from two different CAs at the same time. With overlapping certificate lifetimes, you will always have a backup certificate to use if the primary fails for whatever reason.