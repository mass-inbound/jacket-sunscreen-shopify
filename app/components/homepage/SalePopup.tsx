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
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={handleBackdropClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Close popup"
      />
      
      {/* Popup */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-[812px] bg-[#1B1A1B] text-white overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
            aria-label="Close popup"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className="flex flex-col md:flex-row">
            {/* Content Section */}
            <div className="flex-1 px-8 py-5 md:py-6 md:px-12">
              {/* Logo/Icon */}
              <div className="mb-6">
                
              </div>

              {/* Heading */}
              <h2 className="text-2xl md:text-3xl">
                Stay Protected 
              </h2>
              <h2 className="text-3xl md:text-4xl mb-6">
                &  <span className='text-[#FBAC18]'>Save 15%</span> 
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
              <form onSubmit={handleSubmit} className="">
                <div className="mb-4">
                  <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                    Email
                  </label>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 px-4 py-3 bg-[#1B1A1B] text-white border border-[#FBAC18] focus:outline-none focus:border-[#FBAC18] placeholder-gray-400"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-[#FBAC18] text-white font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
                  >
                   SIGN UP
                  </button>
                </div>
              </form>
            </div>

            {/* Image Section */}
           
            <img
                src="/assets/promo.png"
                alt="JACKET Sunscreen"
                className="object-contain rounded-none lg:w-auto"
              />
            </div>
          </div>
        </div>
      
    </>
  );
} 