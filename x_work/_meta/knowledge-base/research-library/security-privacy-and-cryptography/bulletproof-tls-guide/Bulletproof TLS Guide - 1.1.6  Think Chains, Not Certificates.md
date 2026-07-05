### 1.1.6 Think Chains, Not Certificates

Although we spend a lot of time talking about server _certificates_, in practice we work with certificate chains. Because server operators have to configure these chains manually, mistakes are common. Most often, you will see TLS servers with just the leaf certificate or a set of certificates that don’t actually form a valid chain.

An invalid certificate chain may render the entire TLS connection invalid, leading to a browser warning. To make things worse, this problem is often difficult to diagnose because some browsers try hard to fix it and others don’t. This is a good example of a problem that should be diagnosed by your monitoring tool.