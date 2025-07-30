import { useState, useEffect } from 'react';

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

  const closeRegionBar = () => {
    updateState({ regionBarClosed: true });
  };

  const acceptAllCookies = () => {
    updateState({ regionBarClosed: true });
    // TODO: Implement actual cookie consent logic
  };

  const managePreferences = () => {
    // TODO: Implement cookie preferences management
    console.log('Manage cookie preferences');
  };

  return {
    isLoaded,
    showPopup: isLoaded && !state.hasVisited && !state.popupClosed,
    showRegionBar: isLoaded && !state.hasVisited && !state.regionBarClosed,
    closePopup,
    closeRegionBar,
    acceptAllCookies,
    managePreferences,
  };
} 