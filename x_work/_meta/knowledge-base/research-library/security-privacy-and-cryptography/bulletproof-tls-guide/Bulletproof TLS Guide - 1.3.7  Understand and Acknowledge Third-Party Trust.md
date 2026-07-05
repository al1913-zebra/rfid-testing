### 1.3.7 Understand and Acknowledge Third-Party Trust

When everything else is properly configured and secured, we still can’t escape the fact that many web sites rely on services provided by third parties. It could be that some JavaScript libraries are hosted on a content delivery network or that ads are supplied by an ad delivery network or that there are genuine services (e.g., chat widgets) supplied by others.

These third parties are effectively a backdoor that can be used to break your web site. The bigger the service, the more attractive it is. For example, Google Analytics is known to provide its service to half the Internet; what if its code is compromised?

This is not an easy problem to solve. Although it would be ideal to self-host all resources and have full control over everything, in practice that’s not quite possible because we don’t have infinite budgets to do everything ourselves. What we should do, however, is evaluate every third-party dependency from a security perspective and ask ourselves if keeping it is worth the risk.

A technology called Subresource Integrity (SRI) can be used to secure resources that are hosted by third parties and that don’t change. SRI works by embedding cryptographic hashes of included references, which browsers check every time the resource is retrieved.