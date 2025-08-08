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
    <section className="relative w-full h-[500px] md:h-[700px] lg:h-[896px] mb-4 md:mb-8 overflow-hidden">
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
      <div className="absolute top-8 md:top-16 lg:top-[200px] left-0 right-0 flex flex-col justify-center">
        {/* Main Content */}
        <div className="px-4 md:px-8 lg:px-[230px]">
          <div className="w-full max-w-[351px] md:max-w-none">
            {/* Title Stack */}
            <div className="flex flex-col items-start mb-4 md:mb-6 lg:mb-[28px]">
              <h1 className="text-2xl md:text-4xl lg:text-[52px] leading-[1.1] font-[500] text-[#FBAC18] mb-1 md:mb-2 lg:mb-[9px]">
                IT&apos;S ALWAYS
              </h1>
              <h1 className="text-4xl md:text-6xl lg:text-[86px] leading-[1.1] font-[800] text-white mb-1 md:mb-2 lg:mb-[9px]">
                JACKET
              </h1>
              <h1 className="text-2xl md:text-4xl lg:text-[52px] leading-[1.1] font-[500] text-[#FBAC18] mb-1 md:mb-2 lg:mb-[9px]">
                WEATHER
              </h1>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="px-4 md:px-8 lg:px-[230px] pb-2 md:pb-4 lg:pb-[10px]">
          <h5 className="text-sm md:text-base lg:text-[19px] leading-[1.411] font-[600] text-white max-w-xs md:max-w-md lg:max-w-none">
            ULTIMATE PERFORMANCE,<br />
            ANTI-AGING SUNSCREEN<br />
            THAT PROTECTS + REPAIRS
          </h5>
        </div>
      </div>

      {/* Yellow Product Section - Responsive positioning */}
      <div className="absolute top-0 right-0 w-full md:w-3/5 lg:w-auto h-full md:h-auto">
        <div className="relative w-full md:w-[350px] lg:w-[480px] h-full md:h-[600px] lg:h-[817px] bg-[#FBAC18] flex items-center justify-center ml-auto">
          <div className="absolute -left-8 md:-left-16 lg:-left-1/4 flex items-center justify-center">
            <img 
              src="/assets/main-sunscreen.png" 
              alt="Main Sunscreen Product"
              className="w-full h-full object-cover max-w-[200px] md:max-w-[300px] lg:max-w-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
} 