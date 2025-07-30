import React from 'react';

interface RegionBarProps {
  onAcceptAll: () => void;
  onManagePreferences: () => void;
  onClose: () => void;
  isVisible: boolean;
}

export function RegionBar({ 
  onAcceptAll, 
  onManagePreferences, 
  onClose, 
  isVisible 
}: RegionBarProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white z-40 shadow-lg">
      <div className="max-w-[1440px] mx-auto px-5 md:px-6 lg:px-5">
        <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">
          {/* Content */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
              {/* Text */}
              <div className="flex-1 text-sm leading-relaxed">
                <p>
                  We use cookies to improve your experience, analyze traffic, and show personalized ads. 
                  By clicking &ldquo;Accept All,&rdquo; you agree to our use of cookies. Manage preferences anytime.
                </p>
                <p className="mt-2">
                  Learn more in our{' '}
                  <button
                    onClick={onManagePreferences}
                    className="underline hover:no-underline transition-all"
                  >
                    Privacy Policy
                  </button>
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onManagePreferences}
                  className="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-black transition-colors"
                >
                  Manage Preferences
                </button>
                <button
                  onClick={onAcceptAll}
                  className="px-4 py-2 bg-white text-black rounded hover:bg-gray-100 transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="flex-shrink-0 p-2 text-white hover:text-gray-300 transition-colors"
            aria-label="Close cookie notice"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 