# Production CSP Fix Guide

## Problem
Content Security Policy (CSP) is blocking JavaScript from loading in production, preventing interactive features from working.

## Solution Steps

### 1. Update Shopify CSP Settings

**Option A: Through Shopify Admin**
1. Go to your Shopify Admin
2. Navigate to `Settings` → `Checkout`
3. Scroll down to `Content Security Policy`
4. Add these domains to the allowlist:

```
script-src:
- https://cdn.shopify.com
- https://shopify.com
- https://*.myshopify.com
- https://*.shopifycdn.com

style-src:
- https://cdn.shopify.com
- https://fonts.googleapis.com

font-src:
- https://fonts.gstatic.com
- https://cdn.shopify.com

img-src:
- https://cdn.shopify.com
- https://*.shopifycdn.com

connect-src:
- https://monorail-edge.shopifysvc.com
- https://api.shop.app
- https://*.myshopify.com
```

**Option B: Through Liquid Templates (if you have access)**
Add this to your `theme.liquid` file in the `<head>` section:

```html
<meta http-equiv="Content-Security-Policy" content="
  script-src 'self' 'unsafe-inline' https://cdn.shopify.com https://shopify.com https://*.myshopify.com https://*.shopifycdn.com https://forms.inboundrequest.com;
  style-src 'self' 'unsafe-inline' https://cdn.shopify.com https://fonts.googleapis.com;
  img-src 'self' data: https://cdn.shopify.com https://*.shopifycdn.com;
  font-src 'self' https://fonts.gstatic.com https://cdn.shopify.com;
  connect-src 'self' https://monorail-edge.shopifysvc.com https://api.shop.app https://*.myshopify.com;
">
```

### 2. Deploy Updated Code

The `entry.server.tsx` has been updated to include proper CSP headers that will work with Hydrogen.

### 3. Clear Cache

After making these changes:
1. Clear your browser cache
2. Clear Shopify's CDN cache (if possible)
3. Test the interactive features

### 4. Verify Fix

Test these features in production:
- ✅ Search toggle opens search sidebar
- ✅ Cart toggle opens cart sidebar  
- ✅ Mobile menu (hamburger) opens navigation
- ✅ Quick view modals work on product hover

## If Issues Persist

If the issue continues, check:
1. Browser Developer Console for any remaining CSP errors
2. Network tab to ensure JavaScript files are loading
3. Contact Shopify Support for CSP configuration help

## Alternative Quick Fix

If you can't modify CSP settings immediately, you can temporarily disable CSP by:
1. Going to Shopify Admin → Online Store → Themes
2. Edit code → `layout/theme.liquid` 
3. Remove any CSP meta tags temporarily (NOT recommended for production)

---
**Note**: The code changes in `entry.server.tsx` provide the proper CSP headers for Hydrogen, but Shopify's own CSP settings may override these. 