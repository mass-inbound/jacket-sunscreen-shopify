import { useState, useEffect } from 'react';
import { useCookieConsent } from './useCookieConsent';

interface FirstVisitState {
  hasVisited: boolean;
  popupClosed: boolean;
  regionBarClosed: boolean;
}

export function useFirstVisit() {
  const [state, setState] = useState<FirstVisitState>({
    hasVisited: false,
    popupClosed: false,
    regionBarClosed: false,
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const [showCookieModal, setShowCookieModal] = useState(false);

  const {
    hasConsented,
    preferences,
    acceptAll,
    acceptEssential,
    updateConsent,
  } = useCookieConsent();

  useEffect(() => {
    // Check localStorage on mount
    const stored = localStorage.getItem('jacket-sunscreen-first-visit');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as FirstVisitState;
        setState(parsed);
      } catch (error) {
        console.error('Error parsing first visit data:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  const updateState = (updates: Partial<FirstVisitState>) => {
    const newState = { ...state, ...updates };
    setState(newState);
    localStorage.setItem('jacket-sunscreen-first-visit', JSON.stringify(newState));
  };

  const closePopup = () => {
    updateState({ popupClosed: true });
  };

  const openPopup = () => {
    updateState({ popupClosed: false });
  };

  const closeRegionBar = () => {
    updateState({ regionBarClosed: true });
  };

  const acceptCookies = () => {
    acceptAll();
    closeRegionBar();
  };

  const declineAllCookies = () => {
    acceptEssential();
    closeRegionBar();
  };

  const showSettings = () => {
    setShowCookieModal(true);
  };

  const closeCookieModal = () => {
    setShowCookieModal(false);
  };

  const saveCookiePreferences = (newPreferences: any) => {
    updateConsent(newPreferences);
    closeRegionBar();
    closeCookieModal();
  };

  return {
    isLoaded,
    showPopup: isLoaded && !state.hasVisited && !state.popupClosed,
    showRegionBar: isLoaded && !state.hasVisited && !state.regionBarClosed && !hasConsented,
    showCookieModal,
    closePopup,
    openPopup,
    closeRegionBar,
    acceptCookies,
    declineAllCookies,
    showSettings,
    closeCookieModal,
    saveCookiePreferences,
    cookiePreferences: preferences,
  };
} 