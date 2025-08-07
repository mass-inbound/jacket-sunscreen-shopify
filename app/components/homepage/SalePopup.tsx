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
        <div className="relative w-full max-w-[350px] md:max-w-[600px] lg:max-w-[812px] bg-[#1B1A1B] text-white overflow-hidden rounded-lg lg:rounded-none">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 md:top-4 md:right-4 z-10 text-white hover:text-gray-300 transition-colors"
            aria-label="Close popup"
          >
            <svg
              width="20"
              height="20"
              className="md:w-6 md:h-6"
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

          <div className="flex flex-col lg:flex-row">
            {/* Content Section */}
            <div className="flex-1 px-4 py-4 md:px-6 md:py-5 lg:px-8 lg:py-6 xl:px-12">
              {/* Logo/Icon */}
              <div className="mb-4 md:mb-6">
                
              </div>

              {/* Heading */}
              <h2 className="text-xl md:text-2xl lg:text-3xl mb-2">
                Stay Protected 
              </h2>
              <h2 className="text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6">
                &  <span className='text-[#FBAC18]'>Save 15%</span> 
              </h2>
              {/* Description */}
              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <p className="text-sm md:text-base leading-relaxed">
                  Join the JACKET Sunscreen community and get 15% off your first order.
                </p>
                <p className="text-sm md:text-base leading-relaxed">
                  Stay ahead of the sun with early access to new products, skincare tips, and exclusive offers.
                </p>
              </div>

              {/* Newsletter Form */}
              <form onSubmit={handleSubmit} className="">
                <div className="mb-3 md:mb-4">
                  <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                    Email
                  </label>
                </div>
                <div className="flex flex-col gap-3">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-[#1B1A1B] text-white border border-[#FBAC18] focus:outline-none focus:border-[#FBAC18] placeholder-gray-400 text-sm md:text-base"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-4 md:px-6 py-2 md:py-3 bg-[#FBAC18] text-black font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 text-sm md:text-base"
                  >
                   SIGN UP
                  </button>
                </div>
              </form>
            </div>

            {/* Image Section */}
            <div className="lg:w-1/2 flex justify-center items-center p-4 lg:p-0">
              <img
                src="/assets/promo.png"
                alt="JACKET Sunscreen"
                className="object-contain w-full max-w-[200px] md:max-w-[250px] lg:max-w-none h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 