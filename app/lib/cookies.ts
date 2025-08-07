import type { CookiePreferences } from '~/hooks/useCookieConsent';

/**
 * Cookie management utilities for Shopify/Hydrogen
 */

// Cookie categories
export const COOKIE_CATEGORIES = {
  ESSENTIAL: 'essential',
  ANALYTICS: 'analytics',
  MARKETING: 'marketing',
  FUNCTIONAL: 'functional',
} as const;

// Cookie names by category
export const COOKIE_NAMES = {
  [COOKIE_CATEGORIES.ESSENTIAL]: [
    'session', // Shopify session
    'cart', // Shopify cart
    'customer_account_redirect', // Shopify customer redirect
    'customer_account_preview', // Shopify customer preview
    'checkout_session_token', // Shopify checkout
  ],
  [COOKIE_CATEGORIES.ANALYTICS]: [
    '_ga', // Google Analytics
    '_gid', // Google Analytics
    '_gat', // Google Analytics
    '_ga_*', // Google Analytics
    'shopify_analytics', // Shopify Analytics
    'shopify_analytics_*', // Shopify Analytics
  ],
  [COOKIE_CATEGORIES.MARKETING]: [
    '_fbp', // Facebook Pixel
    '_fbc', // Facebook Pixel
    'ads_prefs', // Google Ads
    'ads_user_data_consent', // Google Ads
    'ads_personalization', // Google Ads
  ],
  [COOKIE_CATEGORIES.FUNCTIONAL]: [
    'language', // Language preference
    'currency', // Currency preference
    'theme', // Theme preference
    'notifications', // Notification preferences
    'accessibility', // Accessibility preferences
  ],
} as const;

/**
 * Set a cookie with proper attributes
 */
export function setCookie(
  name: string,
  value: string,
  options: {
    days?: number;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
  } = {}
) {
  const {
    days = 365,
    path = '/',
    domain,
    secure = true,
    sameSite = 'Lax',
  } = options;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  let cookieString = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=${path}`;
  
  if (domain) {
    cookieString += `; domain=${domain}`;
  }
  
  if (secure) {
    cookieString += '; secure';
  }
  
  cookieString += `; samesite=${sameSite}`;

  document.cookie = cookieString;
}

/**
 * Get a cookie value by name
 */
export function getCookie(name: string): string | null {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }
  
  return null;
}

/**
 * Delete a cookie
 */
export function deleteCookie(name: string, path = '/') {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`;
}

/**
 * Apply cookie consent preferences
 */
export function applyCookieConsent(preferences: CookiePreferences) {
  // Analytics cookies
  if (preferences.analytics) {
    enableAnalyticsCookies();
  } else {
    disableAnalyticsCookies();
  }

  // Marketing cookies
  if (preferences.marketing) {
    enableMarketingCookies();
  } else {
    disableMarketingCookies();
  }

  // Functional cookies
  if (preferences.functional) {
    enableFunctionalCookies();
  } else {
    disableFunctionalCookies();
  }

  // Essential cookies are always enabled
  enableEssentialCookies();
}

/**
 * Enable analytics cookies
 */
function enableAnalyticsCookies() {
  // Google Analytics consent
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied', // Keep ads separate
    });
  }

  // Shopify Analytics
  setCookie('shopify_analytics_enabled', 'true', { days: 365 });
  
  console.log('Analytics cookies enabled');
}

/**
 * Disable analytics cookies
 */
function disableAnalyticsCookies() {
  // Google Analytics consent
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied',
    });
  }

  // Delete analytics cookies
  COOKIE_NAMES[COOKIE_CATEGORIES.ANALYTICS].forEach(cookieName => {
    if (cookieName.includes('*')) {
      // Handle wildcard cookies
      const baseName = cookieName.replace('*', '');
      const allCookies = document.cookie.split(';');
      allCookies.forEach(cookie => {
        const [name] = cookie.split('=');
        if (name.trim().startsWith(baseName)) {
          deleteCookie(name.trim());
        }
      });
    } else {
      deleteCookie(cookieName);
    }
  });

  console.log('Analytics cookies disabled');
}

/**
 * Enable marketing cookies
 */
function enableMarketingCookies() {
  // Facebook Pixel consent
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('consent', 'grant');
  }

  // Google Ads consent
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      ad_storage: 'granted',
    });
  }

  console.log('Marketing cookies enabled');
}

/**
 * Disable marketing cookies
 */
function disableMarketingCookies() {
  // Facebook Pixel consent
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('consent', 'revoke');
  }

  // Google Ads consent
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      ad_storage: 'denied',
    });
  }

  // Delete marketing cookies
  COOKIE_NAMES[COOKIE_CATEGORIES.MARKETING].forEach(cookieName => {
    deleteCookie(cookieName);
  });

  console.log('Marketing cookies disabled');
}

/**
 * Enable functional cookies
 */
function enableFunctionalCookies() {
  // Set default functional preferences
  setCookie('language', 'en', { days: 365 });
  setCookie('currency', 'USD', { days: 365 });
  setCookie('theme', 'light', { days: 365 });
  
  console.log('Functional cookies enabled');
}

/**
 * Disable functional cookies
 */
function disableFunctionalCookies() {
  // Delete functional cookies
  COOKIE_NAMES[COOKIE_CATEGORIES.FUNCTIONAL].forEach(cookieName => {
    deleteCookie(cookieName);
  });

  console.log('Functional cookies disabled');
}

/**
 * Enable essential cookies (always enabled)
 */
function enableEssentialCookies() {
  // Essential cookies are managed by Shopify/Hydrogen
  // We don't need to manually set them
  console.log('Essential cookies are always enabled');
}

/**
 * Get all cookies by category
 */
export function getCookiesByCategory(category: keyof typeof COOKIE_CATEGORIES) {
  const cookies: Record<string, string> = {};
  const categoryCookies = COOKIE_NAMES[COOKIE_CATEGORIES[category]];
  
  categoryCookies.forEach(cookieName => {
    if (cookieName.includes('*')) {
      // Handle wildcard cookies
      const baseName = cookieName.replace('*', '');
      const allCookies = document.cookie.split(';');
      allCookies.forEach(cookie => {
        const [name, value] = cookie.split('=');
        if (name.trim().startsWith(baseName)) {
          cookies[name.trim()] = decodeURIComponent(value || '');
        }
      });
    } else {
      const value = getCookie(cookieName);
      if (value) {
        cookies[cookieName] = value;
      }
    }
  });
  
  return cookies;
}

/**
 * Clear all cookies except essential ones
 */
export function clearNonEssentialCookies() {
  Object.values(COOKIE_CATEGORIES).forEach(category => {
    if (category !== COOKIE_CATEGORIES.ESSENTIAL) {
      COOKIE_NAMES[category].forEach(cookieName => {
        if (cookieName.includes('*')) {
          // Handle wildcard cookies
          const baseName = cookieName.replace('*', '');
          const allCookies = document.cookie.split(';');
          allCookies.forEach(cookie => {
            const [name] = cookie.split('=');
            if (name.trim().startsWith(baseName)) {
              deleteCookie(name.trim());
            }
          });
        } else {
          deleteCookie(cookieName);
        }
      });
    }
  });
  
  console.log('Non-essential cookies cleared');
}

// Type declarations for global analytics objects
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
} 