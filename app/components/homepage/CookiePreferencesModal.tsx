import React, { useState } from 'react';
import type { CookiePreferences } from '~/hooks/useCookieConsent';

interface CookiePreferencesModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (preferences: CookiePreferences) => void;
  currentPreferences: CookiePreferences;
}

export function CookiePreferencesModal({
  isVisible,
  onClose,
  onSave,
  currentPreferences,
}: CookiePreferencesModalProps) {
  const [preferences, setPreferences] = useState<CookiePreferences>(currentPreferences);

  if (!isVisible) return null;

  const handleToggle = (category: keyof CookiePreferences) => {
    if (category === 'essential') return; // Essential cookies cannot be disabled
    
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleSave = () => {
    onSave(preferences);
    onClose();
  };

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    onSave(allAccepted);
    onClose();
  };

  const handleAcceptEssential = () => {
    const essentialOnly: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    onSave(essentialOnly);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-3 md:p-4">
      <div className="bg-white rounded-lg max-w-sm md:max-w-lg lg:max-w-2xl w-full max-h-[95vh] md:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">Cookie Preferences</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          <p className="text-sm md:text-base text-gray-600">
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
            You can choose which types of cookies to allow below.
          </p>

          {/* Cookie Categories */}
          <div className="space-y-3 md:space-y-4">
            {/* Essential Cookies */}
            <div className="border rounded-lg p-3 md:p-4">
              <div className="flex items-start md:items-center justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-sm md:text-base">Essential Cookies</h3>
                  <p className="text-xs md:text-sm text-gray-600 mt-1">
                    These cookies are necessary for the website to function properly. They cannot be disabled.
                  </p>
                </div>
                <div className="flex items-center mt-1 md:mt-0">
                  <input
                    type="checkbox"
                    checked={preferences.essential}
                    disabled
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="border rounded-lg p-3 md:p-4">
              <div className="flex items-start md:items-center justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-sm md:text-base">Analytics Cookies</h3>
                  <p className="text-xs md:text-sm text-gray-600 mt-1">
                    These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                  </p>
                </div>
                <div className="flex items-center mt-1 md:mt-0">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={() => handleToggle('analytics')}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="border rounded-lg p-3 md:p-4">
              <div className="flex items-start md:items-center justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-sm md:text-base">Marketing Cookies</h3>
                  <p className="text-xs md:text-sm text-gray-600 mt-1">
                    These cookies are used to track visitors across websites to display relevant and engaging advertisements.
                  </p>
                </div>
                <div className="flex items-center mt-1 md:mt-0">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={() => handleToggle('marketing')}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Functional Cookies */}
            <div className="border rounded-lg p-3 md:p-4">
              <div className="flex items-start md:items-center justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-sm md:text-base">Functional Cookies</h3>
                  <p className="text-xs md:text-sm text-gray-600 mt-1">
                    These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.
                  </p>
                </div>
                <div className="flex items-center mt-1 md:mt-0">
                  <input
                    type="checkbox"
                    checked={preferences.functional}
                    onChange={() => handleToggle('functional')}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Policy Link */}
          <div className="text-xs md:text-sm text-gray-600">
            <p>
              Learn more about how we use cookies in our{' '}
              <a href="/privacy-policy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-2 md:gap-3 p-4 md:p-6 border-t bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
            <button
              onClick={handleAcceptEssential}
              className="px-3 md:px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-100 transition-colors"
            >
              Accept Essential Only
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-3 md:px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
            >
              Accept All
            </button>
          </div>
          <button
            onClick={handleSave}
            className="w-full sm:w-auto px-3 md:px-4 py-2 bg-gray-900 text-white rounded text-sm hover:bg-gray-800 transition-colors"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
} 