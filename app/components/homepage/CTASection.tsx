import React from 'react';

interface CTASectionProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export function CTASection({
  title = "DON'T FORGET YOUR...",
  description = "JACKET Sunscreen – Long-Lasting, Water-Resistant SPF for Outdoor Protection",
  ctaText = "SHOP NOW",
  ctaLink = "/products"
}: CTASectionProps) {
  return (
    <section className="w-full bg-white py-[11px]">
      <div className="max-w-[1440px] mx-auto relative">
        {/* Background */}
        <div className="absolute inset-0 bg-white"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-[64px] px-[152px] py-[378px]">
          {/* Title */}
          <div className="px-[225px] pt-[31px] pb-[10px]">
            <div className="w-[675px]">
              <h4 className="text-[40px] leading-[1.4] font-bold text-center text-[#1B1A1B]">
                DON&apos;T FORGET YOUR...
              </h4>
            </div>
          </div>

          {/* Product Image */}
          <div className="px-[225px] pb-[38px]">
            <div className="w-[600px] h-[230px] bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-600">Product Image</span>
            </div>
          </div>

          {/* Spacer */}
          <div className="px-[225px] pb-[31px]">
            <div className="w-[142px] h-[40px]"></div>
          </div>

          {/* CTA Button */}
          <button className="px-[14.92px] py-[10.92px] bg-[#1B1A1B] text-white rounded-[3px] font-bold text-[15px] leading-[1.15] tracking-[10%] hover:bg-[#2a292a] transition-colors">
            {ctaText}
          </button>
        </div>
      </div>
    </section>
  );
} 