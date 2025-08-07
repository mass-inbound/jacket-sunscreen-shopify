import { useState, useEffect } from 'react';
import { applyCookieConsent as applyCookieConsentUtil, clearNonEssentialCookies } from '~/lib/cookies';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export interface CookieConsentState {
  hasConsented: boolean;
  preferences: CookiePreferences;
  lastUpdated: string;
}

const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true, // Always true, cannot be disabled
  analytics: false,
  marketing: false,
  functional: false,
};

const COOKIE_CONSENT_KEY = 'jacket-sunscreen-cookie-consent';

export function useCookieConsent() {
  const [state, setState] = useState<CookieConsentState>({
    hasConsented: false,
    preferences: DEFAULT_PREFERENCES,
    lastUpdated: new Date().toISOString(),
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load cookie consent from localStorage
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CookieConsentState;
        setState(parsed);
        
        // Apply stored preferences on load
        if (parsed.hasConsented) {
          applyCookieConsentUtil(parsed.preferences);
        }
      } catch (error) {
        console.error('Error parsing cookie consent data:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  const updateConsent = (preferences: Partial<CookiePreferences>) => {
    const newPreferences = { ...state.preferences, ...preferences };
    const newState: CookieConsentState = {
      hasConsented: true,
      preferences: newPreferences,
      lastUpdated: new Date().toISOString(),
    };
    
    setState(newState);
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(newState));
    
    // Apply cookie consent using the utility function
    applyCookieConsentUtil(newPreferences);
  };

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    updateConsent(allAccepted);
  };

  const acceptEssential = () => {
    const essentialOnly: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    updateConsent(essentialOnly);
  };

  const resetConsent = () => {
    const resetState: CookieConsentState = {
      hasConsented: false,
      preferences: DEFAULT_PREFERENCES,
      lastUpdated: new Date().toISOString(),
    };
    
    setState(resetState);
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    
    // Clear all non-essential cookies
    clearNonEssentialCookies();
  };

  return {
    isLoaded,
    hasConsented: state.hasConsented,
    preferences: state.preferences,
    lastUpdated: state.lastUpdated,
    acceptAll,
    acceptEssential,
    updateConsent,
    resetConsent,
  };
} 