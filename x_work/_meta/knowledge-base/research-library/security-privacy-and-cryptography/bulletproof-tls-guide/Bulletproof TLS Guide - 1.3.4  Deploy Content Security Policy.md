### 1.3.4 Deploy Content Security Policy

Content Security Policy (CSP) is a mechanism that enables web sites to control how resources embedded in HTML pages are retrieved. As with HSTS, web sites signal their policies via an HTTP response header for enforcement in compliant browsers. Although CSP was originally primarily designed as a way of combating XSS, it has an important application for web site encryption; that is, it can be used to prevent third-party mixed content by rejecting plaintext links that might be present in the page via the following command:

```css
Content-Security-Policy: upgrade-insecure-requests
```

In 2026, modern browsers are by default upgrading insecure requests to security, but it's still useful to be explicit about this one configuration setting until the majority of your user base lets go of their older tools.