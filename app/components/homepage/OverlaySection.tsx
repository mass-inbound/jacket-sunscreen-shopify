import React from 'react';

export function OverlaySection() {
  return (
    <section className="w-full bg-white py-[13px]">
      <div className="max-w-[1440px] mx-auto relative">
        {/* Background Image with Overlay */}
        <div className="relative w-full h-[630px]">
          <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600">Background Image</span>
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          
          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center px-[230px]">
            <div className="text-center">
              <h4 className="text-[40px] leading-[1.4] font-bold text-white">
                MAXIMIZE THE ACTION. MINIMIZE THE RISK.
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 