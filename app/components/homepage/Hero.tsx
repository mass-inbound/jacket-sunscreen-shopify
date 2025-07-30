import React from 'react';

interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

export function Hero({
  title = "IT'S ALWAYS WEATHER",
  subtitle = "ULTIMATE PERFORMANCE, ANTI-AGING SUNSCREEN THAT PROTECTS + REPAIRS",
  ctaText = "SHOP NOW",
  ctaLink = "/products"
}: HeroProps) {
  return (
    <section className="relative w-full h-[896px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero-background-desktop-56d723.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-center">
        {/* Main Content */}
        <div className="px-[230px] pt-[188px] pb-[9px]">
          <div className="w-[351px]">
            {/* Title */}
            <div className="flex justify-center items-center gap-[-0.01px] mb-[9px]">
              <h1 className="text-[49px] leading-[1.1] text-center font-normal text-white">
                IT&apos;S
              </h1>
              <h1 className="text-[50px] leading-[1.078] text-center font-normal text-[#FBAC18]">
                ALWAYS
              </h1>
            </div>
          </div>
        </div>

        {/* Logo */}
        <div className="px-[230px] pb-[9px]">
          <div className="w-[351px] h-[72px]">
            <div className="w-full h-full bg-white rounded flex items-center justify-center">
              <span className="text-[#1B1A1B] font-bold text-lg">JACKET SUNSCREEN</span>
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <div className="px-[230px] pb-[28px]">
          <div className="w-[351px]">
            <h1 className="text-[62px] leading-[1.1] text-center font-normal text-[#FBAC18]">
              WEATHER
            </h1>
          </div>
        </div>

        {/* Description */}
        <div className="px-[263px] pb-[10px]">
          <div className="w-[284px]">
            <h5 className="text-[19.84px] leading-[1.411] text-center font-bold text-white">
              ULTIMATE PERFORMANCE,<br />
              ANTI-AGING SUNSCREEN<br />
              THAT PROTECTS + REPAIRS
            </h5>
          </div>
        </div>

        {/* CTA Button */}
        <div className="px-[961px] pb-[10px]">
          <div className="w-[480px] h-[817px] bg-[#FBAC18] rounded-lg flex items-center justify-center">
            <div className="w-[228px] h-[600px] bg-white rounded-lg flex items-center justify-center">
              <span className="text-[#1B1A1B] font-bold text-lg">Product Image</span>
            </div>
          </div>
        </div>
      </div>

      {/* PGA Partner Section */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#1B1A1B] py-[18px]">
        <div className="px-[164px] flex items-center justify-between">
          <div className="w-[528px]">
            <h5 className="text-[19.84px] leading-[1.411] font-bold text-white">
              PROUD SUNSCREEN PARTNER OF
            </h5>
          </div>
          <div className="w-[149px] h-[112px] bg-white rounded flex items-center justify-center">
            <span className="text-[#1B1A1B] font-bold">PGA Logo</span>
          </div>
        </div>
      </div>
    </section>
  );
} 