import React, { useState, useEffect } from 'react';

interface SalePopupProps {
  onClose: () => void;
  isVisible: boolean;
}

export function SalePopup({ onClose, isVisible }: SalePopupProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Implement newsletter signup logic
    console.log('Newsletter signup:', email);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

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
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={handleBackdropClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Close popup"
      />
      
      {/* Popup */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-[812px] bg-[#1B1A1B] text-white rounded-lg overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
            aria-label="Close popup"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex flex-col md:flex-row">
            {/* Content Section */}
            <div className="flex-1 p-8 md:p-12">
              {/* Logo/Icon */}
              <div className="mb-6">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#1B1A1B] font-bold text-sm">JS</span>
                </div>
              </div>

              {/* Heading */}
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Join the JACKET Sunscreen Community
              </h2>

              {/* Description */}
              <div className="space-y-4 mb-8">
                <p className="text-base leading-relaxed">
                  Join the JACKET Sunscreen community and get 15% off your first order.
                </p>
                <p className="text-base leading-relaxed">
                  Stay ahead of the sun with early access to new products, skincare tips, and exclusive offers.
                </p>
              </div>

              {/* Newsletter Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 px-4 py-3 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Signing up...' : 'Get 15% Off'}
                  </button>
                </div>
              </form>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-[299px] h-[430px] bg-gray-300 flex items-center justify-center">
              <div className="text-gray-600 text-center">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>Product Image</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 