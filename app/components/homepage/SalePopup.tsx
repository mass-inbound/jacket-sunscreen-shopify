import React from 'react';
import { ShopifyNewsletterForm } from './ShopifyNewsletterForm';

interface SalePopupProps {
  onClose: () => void;
  isVisible: boolean;
}

export function SalePopup({ onClose, isVisible }: SalePopupProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={handleBackdropClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Close popup"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        {/* <div
          className="pointer-events-auto relative w-full max-w-lg bg-white rounded-lg shadow-2xl p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Newsletter signup"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-2 right-2 z-10 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Close popup"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button> */}

        <div className="pt-6">
          <ShopifyNewsletterForm
            compact={false}
            className="w-full min-h-[280px] rounded-md overflow-hidden"
          />
        </div>
        {/* </div> */}
      </div>

      {/*
      Custom branded modal UI (commented out — restore if needed):

      - Dark panel bg-[#1B1A1B], headings JACKET UP / Save 15%, body copy
      - Promo image /assets/promo.png
      - Link to /newsletter-signup
      */}
    </>
  );
}
