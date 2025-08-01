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
    <section className="relative w-full h-[896px] mb-8 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ 
            objectPosition: 'center',
            minWidth: '100%',
            minHeight: '100%'
          }}
        >
          <source src="/assets/file.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Content Container */}
      <div className="absolute top-[200px] flex flex-col justify-center">
        {/* Main Content */}
        <div className="px-[230px]">
          <div className="w-[351px]">
            {/* Title Stack */}
            <div className="flex flex-col items-start mb-[28px]">
              <h1 className="text-[52px] leading-[1.1] font-[500] text-[#FBAC18] mb-[9px]">
                IT&apos;S ALWAYS
              </h1>
              <h1 className="text-[86px] leading-[1.1] font-[800] text-white mb-[9px]">
                JACKET
              </h1>
              <h1 className="text-[52px] leading-[1.1] font-[500] text-[#FBAC18] mb-[9px]">
                WEATHER
              </h1>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="px-[230px] pb-[10px]">
        
            <h5 className="text-[19px] leading-[1.411] font-[600] text-white">
              ULTIMATE PERFORMANCE,<br />
              ANTI-AGING SUNSCREEN<br />
              THAT PROTECTS + REPAIRS
            </h5>
         
        </div>
      </div>

      {/* Yellow Product Section - Positioned on the right */}
      <div className="absolute top-0 right-0">
        <div className="relative w-[480px] h-[817px] bg-[#FBAC18]  flex items-center justify-center">
          <div className="absolute -left-1/4 flex items-center justify-center">
            <img 
              src="/assets/main-sunscreen.png" 
              alt="Main Sunscreen Product"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
} 