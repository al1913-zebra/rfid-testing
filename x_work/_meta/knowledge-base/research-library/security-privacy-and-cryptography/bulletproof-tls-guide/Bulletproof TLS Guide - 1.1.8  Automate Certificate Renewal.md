### 1.1.8 Automate Certificate Renewal

The days of manual certificate renewal are numbered. We used to be able to get certificates valid for multiple years, then only a year, and now it's only up to 200 days, as of March 2026. In March 2027, there will be another reduction to 100 days, then—finally—in March 2029, a reduction to only 47 days.

Don't leave it until the last moment to initiate the renewal. In fact, it's better if you renew earlier—for example, about a month before the current certificate expires. Doing so will provide you with a margin of safety should the new issuance fail for whatever reason. Many things can go wrong, among them issues with the CA itself or issues with the CAA configuration.

For best results, deploy new certificates to production about two weeks after they are issued. This practice _(1)_ helps avoid certificate warnings for some users who don't have the correct time on their computers and also _(2)_ avoids failed revocation checks with CAs that need extra time to propagate their new certificates to their OCSP responders.