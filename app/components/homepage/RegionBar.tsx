import React from 'react';

interface RegionBarProps {
  onAccept: () => void;
  onDeclineAll: () => void;
  onShowSettings: () => void;
  onClose: () => void;
  isVisible: boolean;
}

export function RegionBar({ 
  onAccept, 
  onDeclineAll,
  onShowSettings, 
  onClose, 
  isVisible 
}: RegionBarProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white z-50 shadow-lg">
      <div className="mx-auto px-3 md:px-5 lg:px-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between py-3 md:py-4 gap-3 md:gap-4">
          {/* Content */}
          <div className="flex-1 w-full lg:w-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 lg:gap-6">
              {/* Text */}
              <div className="flex-1 text-xs md:text-sm leading-relaxed">
                <p className="text-left">
                  We use cookies to improve your experience, analyze traffic, and show personalized ads. 
                  By clicking &ldquo;Accept,&rdquo; you agree to our use of cookies. You can customize your preferences or decline all non-essential cookies. Learn more in our{' '}
                  <a href="/policies/privacy-policy" className="underline hover:no-underline transition-all">
                    Privacy Policy
                  </a>
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full md:w-auto">
                <button
                  onClick={onShowSettings}
                  className="px-3 md:px-4 py-2 border border-white text-white rounded text-xs md:text-sm hover:bg-white hover:text-black transition-colors whitespace-nowrap"
                >
                  Show Settings
                </button>
                <button
                  onClick={onDeclineAll}
                  className="px-3 md:px-4 py-2 border border-white text-white rounded text-xs md:text-sm hover:bg-white hover:text-black transition-colors whitespace-nowrap"
                >
                  Decline All
                </button>
                <button
                  onClick={onAccept}
                  className="px-3 md:px-4 py-2 bg-white text-black rounded text-xs md:text-sm hover:bg-gray-100 transition-colors whitespace-nowrap"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="flex-shrink-0 self-end lg:self-center p-1 md:p-2 text-white hover:text-gray-300 transition-colors"
            aria-label="Close cookie notice"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 