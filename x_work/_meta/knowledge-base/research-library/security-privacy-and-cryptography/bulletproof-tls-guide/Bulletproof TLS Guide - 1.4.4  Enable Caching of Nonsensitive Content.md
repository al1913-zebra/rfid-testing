### 1.4.4 Enable Caching of Nonsensitive Content

An earlier section in this guide recommended that you disable HTTP caching by default. Although that’s the most secure option, not all properties require the same level of security. HTTPS is commonly used for all web sites today, even when the content on them is not sensitive. In that case, you want to selectively enable caching in order to improve performance.

The first step might be to enable caching at the browser level by indicating that the content is private:

```cpp
Cache-Control: private
```

If you have a content delivery network in place and want to utilize its caching abilities, indicate that the content is public:

```cpp
Cache-Control: public
```

In both situations, you can use other HTTP caching configuration options to control how the caching is to be done.