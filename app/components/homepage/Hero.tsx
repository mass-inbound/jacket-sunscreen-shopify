import React from 'react';
import { Link } from 'react-router';

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
    <section className="relative w-full h-[550px] md:h-[700px] lg:h-[896px] mb-4 md:mb-8 overflow-hidden">
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
      
      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Mobile text elements over video background */}
        <div className="absolute top-0 left-0 right-0 z-10">
          {/* "IT'S ALWAYS" */}
          <div className="absolute top-[43px] left-[19px] w-[280px]">
            <h1 className="text-[26px] leading-[1.1] font-[400] text-[#FBAC18] text-center">IT&apos;S ALWAYS</h1>
            <img
                src="/assets/jacket.png"
                alt="Main Sunscreen Product"
                className="object-contain"
              />
            <h1 className="text-[29px] leading-[1.1] font-[400] text-[#FBAC18] text-center">WEATHER</h1>
          </div>

         
          

       

          {/* "THE NEW FACE OF SUNSCREEN" */}
          <div className="absolute top-[184.4px] left-[5px] w-[310px] pb-[10px]">
            <h6 className="text-[17.75px] leading-[1.15] font-[700] text-white text-center">THE NEW FACE OF SUNSCREEN</h6>
          </div>
        </div>

        {/* Yellow bottom section */}
        <div className="absolute bottom-0 left-0 right-0 h-[173px] bg-[#FBAC18]">
          {/* Product image - half outside, half inside */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-[146px]">
            <Link to={ctaLink || '/products'} aria-label="View JACKET Sunscreen Bottle">
              <img
                src="/assets/main-sunscreen.png"
                alt="Main Sunscreen Product"
                className="w-[112px] h-auto object-contain -rotate-90"
              />
            </Link>
          </div>
          
          {/* Text inside yellow section */}
          <div className="pt-[72px] pb-[29px] px-5 h-full flex items-center justify-center">
            <h5 className="text-[16px] leading-[1.411] font-[600] text-black text-center">
              ULTIMATE PERFORMANCE,<br />
              ANTI-AGING SUNSCREEN<br />
              THAT PROTECTS + REPAIRS
            </h5>
          </div>
        </div>
      </div>

      {/* Desktop/Tablet Layout */}
      <div className="hidden md:block">
        {/* Content Container */}
        <div className="absolute top-16 lg:top-[200px] left-0 right-0 flex flex-col justify-center z-10">
          {/* Main Content */}
          <div className="px-8 lg:px-[100px]">
            <div className="w-full">
              {/* Title Stack */}
              <div className="flex flex-col items-start mb-6 lg:mb-[28px]">
                <h1 className="text-4xl lg:text-[52px] leading-[1.1] font-[500] text-[#FBAC18] mb-2 lg:mb-[9px]">
                  IT&apos;S ALWAYS
                </h1>
                <h1 className="text-6xl lg:text-[86px] leading-[1.1] font-[800] text-white mb-2 lg:mb-[9px]">
                  JACKET
                </h1>
                <h1 className="text-4xl lg:text-[52px] leading-[1.1] font-[500] text-[#FBAC18] mb-2 lg:mb-[9px]">
                  WEATHER
                </h1>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="px-8 lg:px-[100px] pb-4 lg:pb-[10px]">
            <h5 className="text-base lg:text-[19px] leading-[1.411] font-[600] text-white max-w-md lg:max-w-none">
              ULTIMATE PERFORMANCE,<br />
              ANTI-AGING SUNSCREEN<br />
              THAT PROTECTS + REPAIRS
            </h5>
          </div>
        </div>

        {/* Yellow Product Section */}
        <div className="absolute top-0 right-0 w-3/5 lg:w-auto h-auto">
          <div className="relative w-[350px] h-[600px] lg:h-[817px] bg-[#FBAC18] flex items-center justify-center ml-auto">
            {/* Image */}
            <div className="absolute -left-16 lg:-left-1/4 flex items-center justify-center">
              <img 
                src="/assets/main-sunscreen.png" 
                alt="Main Sunscreen Product"
                className="w-full h-full object-cover max-w-[300px] lg:max-w-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 