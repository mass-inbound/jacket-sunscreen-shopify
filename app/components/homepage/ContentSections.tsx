import React from 'react';

interface ContentSectionProps {
  title?: string;
  description?: string;
  imagePosition?: 'left' | 'right';
  imageUrl?: string;
  backgroundColor?: string;
}

export function ContentSections() {
  return (
    <section className="w-full bg-white py-3 md:py-[12px]">
      <div className="mx-auto bg-white relative md:px-2 xl:px-20">
        {/* Section 1: JACKET Sunscreen - Image on RIGHT */}
        <div className="rounded-none flex flex-col lg:flex-row bg-[#1B1A1B] mb-4 md:mb-8 rounded-lg lg:rounded-none">
          <div className="flex-1 lg:w-1/2 h-full">
            <div className="text-white flex flex-col lg:flex-row lg:gap-10 p-4 md:p-8 xl:p-16 h-full">
              {/* Mobile: Title at top */}
              <div className="flex flex-row lg:hidden items-center justify-center gap-2 mb-4">
                <span className="text-sm font-normal text-[#FBAC18]">
                  JACKET
                </span>
                <span className="text-xs font-normal text-[#FFFFFE]">
                  SUNSCREEN
                </span>
              </div>
              
              {/* Mobile: Image and description side by side */}
              <div className="flex flex-row lg:hidden justify-between gap-2 mb-4">
                <div className="flex justify-center">
                  <img
                    src="/assets/contentProduct1.png"
                    alt="JACKET Sunscreen"
                    className="object-contain w-16 max-w-[80px]"
                  />
                </div>
                <div className="flex-1 ml-2">
                  <div className="text-left">
                    <p className="text-[10px] font-normal leading-[1.4em] mb-0.5">
                      • ANTIOXIDANT AND ZINC ENRICHED
                    </p>
                    <p className="text-[10px] font-normal leading-[1.4em] mb-0.5">
                      • ANTI-AGING INGREDIENTS
                    </p>
                    <p className="text-[10px] font-normal leading-[1.4em] mb-0.5">
                      • SMOOTHS WRINKLES AND FADES AGE SPOTS
                    </p>
                    <p className="text-[10px] font-normal leading-[1.4em] mb-0.5">
                      • WEIGHTLESS FORMULA
                    </p>
                    <p className="text-[10px] font-normal leading-[1.4em] mb-0.5">
                      • BOOSTS COLLAGEN PRODUCTION
                    </p>
                    <p className="text-[10px] font-normal leading-[1.4em] mb-0.5">
                      • BROAD-SPECTRUM PROTECTION
                    </p>
                    <p className="text-[10px] font-normal leading-[1.4em] mb-0.5">
                      • WATER AND SWEAT RESISTANT
                    </p>
                    <p className="text-[10px] font-normal leading-[1.4em] mb-0.5">
                      • NON-GREASY, WON’T CLOG PORES
                    </p>
                    <p className="text-[10px] font-normal leading-[1.4em] mb-0.5">
                      • SUPPORTS MOISTURE BARRIER
                    </p>
                     <p className="text-[10px] font-normal leading-[1.4em] mb-0.5">
                      • BLOCKS BLUE LIGHT
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile: Learn More button centered at bottom */}
              <div className="flex lg:hidden justify-center">
                <a 
                  href="/products/spf-50-anti-aging-sunscreen?Title=Default+Title"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#FBAC18] rounded text-[#1B1A1B] px-4 py-1.5 font-bold text-[10px] inline-block"
                >
                  LEARN MORE
                </a>
              </div>

              {/* Desktop: Original layout */}
              <div className="hidden lg:flex justify-center lg:justify-start">
                <img
                  src="/assets/contentProduct1.png"
                  alt="JACKET Sunscreen"
                  className="object-contain w-16 md:w-40 lg:w-auto max-w-[80px] md:max-w-[150px] lg:max-w-none"
                />
              </div>
              <div className="hidden lg:flex flex-1 flex-col justify-between lg:ml-10">
                <div>
                  <div className="flex flex-col md:flex-row items-start mb-2 md:mb-4 lg:mb-6 text-left">
                    <span className="text-sm md:text-xl lg:text-[27px] font-normal text-[#FBAC18] mr-0 lg:mr-[15px]">
                      JACKET
                    </span>
                    <span className="text-xs md:text-base lg:text-[18px] font-normal text-[#FFFFFE]">
                      SUNSCREEN
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • ANTIOXIDANT AND ZINC ENRICHED
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[17.86px] font-normal leading-[1.4em] md:leading-[1.61em] mb-0.5 md:mb-1">
                      • ANTI-AGING INGREDIENTS
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • SMOOTHS WRINKLES AND FADES AGE SPOTS
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • WEIGHTLESS FORMULA
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • BOOSTS COLLAGEN PRODUCTION
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • BROAD-SPECTRUM PROTECTION
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • WATER AND SWEAT RESISTANT
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • NON-GREASY, WON’T CLOG PORES
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[17.86px] font-normal leading-[1.4em] md:leading-[1.61em] mb-0.5 md:mb-1">
                      • SUPPORTS MOISTURE BARRIER
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[17.86px] font-normal leading-[1.4em] md:leading-[1.61em] mb-0.5 md:mb-1">
                      • BLOCKS BLUE LIGHT
                    </p>
                  </div>
                  </div>
                  <div className="flex justify-center lg:justify-end mt-2 md:mt-4">
                    <a 
                      href="/products/spf-50-anti-aging-sunscreen?Title=Default+Title"
                      target="_blank"
                      rel="noopener noreferrer"
                    className="bg-[#FBAC18] rounded text-[#1B1A1B] px-4 md:px-[12px] py-1.5 md:py-[7px] font-bold text-[10px] md:text-sm lg:text-[15px] inline-block"
                    >
                      LEARN MORE
                    </a>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 h-[217px] md:h-[510px] order-last lg:order-last">
            <img
              src="/assets/contentImage1.png"
              alt="JACKET Sunscreen"
              className="w-full h-full rounded-none object-cover"
            />
          </div>
        </div>

        {/* Section 2: JACKET Spray Sunscreen - Image on LEFT */}
        <div className="flex rounded-none flex-col lg:flex-row bg-[#1B1A1B] mb-4 md:mb-8 rounded-lg lg:rounded-none">
          <div className="lg:w-1/2 h-[217px] md:h-[510px] order-first">
            <img
              src="/assets/contentImage2.png"
              alt="JACKET Sunscreen"
              className="w-full h-full rounded-none object-cover"
            />
          </div>
          <div className="flex-1 lg:w-1/2 h-full">
            <div className="text-white flex flex-col lg:flex-row lg:gap-10 p-4 md:p-8 xl:p-16 h-full">
              {/* Mobile: Title at top */}
              <div className="flex flex-row lg:hidden items-center justify-center gap-2 mb-4">
                <span className="text-sm font-normal text-[#FBAC18]">
                  JACKET
                </span>
                <span className="text-xs font-normal text-[#FFFFFE]">
                  SPRAY SUNSCREEN
                </span>
              </div>
              
              {/* Mobile: Image and description side by side */}
              <div className="flex flex-row lg:hidden justify-between gap-2 mb-4">
                <div className="flex justify-center">
                  <img
                    src="/assets/contentProduct2.png"
                    alt="JACKET Sunscreen"
                    className="object-contain w-16 max-w-[80px]"
                  />
                </div>
                <div className="flex-1 ml-2">
                  <div className="text-left">
                    <p className="text-[10px] font-normal text-white leading-[1.4em] mb-0.5">
                      • ANTIOXIDANT ENRICHED
                    </p>
                    <p className="text-[10px] font-normal text-white leading-[1.4em] mb-0.5">
                      • ANTI-AGING INGREDIENTS
                    </p>
                    <p className="text-[10px] font-normal text-white leading-[1.4em] mb-0.5">
                      • FADES AGE SPOTS
                    </p>
                    <p className="text-[10px] font-normal text-white leading-[1.4em] mb-0.5">
                      • WEIGHTLESS, SUPER-FINE MIST
                    </p>
                    <p className="text-[10px] font-normal text-white leading-[1.4em] mb-0.5">
                      • PREVENTS COLLAGEN BREAKDOWN
                    </p>
                    <p className="text-[10px] font-normal text-white leading-[1.4em] mb-0.5">
                      • BROAD-SPECTRUM PROTECTION
                    </p>
                    <p className="text-[10px] font-normal text-white leading-[1.4em] mb-0.5">
                      • WATER AND SWEAT RESISTANT
                    </p>
                    <p className="text-[10px] font-normal text-white leading-[1.4em] mb-0.5">
                      • NON-GREASY, WON’T CLOG PORES
                    </p>
                    <p className="text-[10px] font-normal text-white leading-[1.4em] mb-0.5">
                      • SUPPORTS MOISTURE BARRIER
                    </p>
                    <p className="text-[10px] font-normal text-white leading-[1.4em] mb-0.5">
                      • BLOCKS BLUE LIGHT
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile: Learn More button centered at bottom */}
              <div className="flex lg:hidden justify-center">
                <a 
                  href="/products/refine-by-jacket?Title=Default+Title"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#FBAC18] rounded text-[#1B1A1B] px-4 py-1.5 font-bold text-[10px] inline-block"
                >
                  LEARN MORE
                </a>
              </div>

              {/* Desktop: Original layout */}
              <div className="hidden lg:flex justify-center lg:justify-start">
                <img
                  src="/assets/contentProduct2.png"
                  alt="JACKET Sunscreen"
                  className="object-contain w-16 md:w-40 lg:w-auto max-w-[80px] md:max-w-[150px] lg:max-w-none"
                />
              </div>
              <div className="hidden lg:flex flex-1 flex-col justify-between lg:ml-10">
                <div>
                  <div className="flex flex-col md:flex-row items-start mb-2 md:mb-4 lg:mb-6 text-left">
                    <span className="text-sm md:text-xl lg:text-[27px] font-normal text-[#FBAC18] mr-0 lg:mr-[15px]">
                      JACKET
                    </span>
                    <span className="text-xs md:text-base lg:text-[18px] font-normal text-[#FFFFFE]">
                      SPRAY SUNSCREEN
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal text-white leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • ANTIOXIDANT ENRICHED
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal text-white leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • ANTI-AGING INGREDIENTS
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal text-white leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • FADES AGE SPOTS
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal text-white leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • WEIGHTLESS, SUPER-FINE MIST
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[17.72px] font-normal text-white leading-[1.4em] md:leading-[1.63em] mb-0.5 md:mb-1">
                      • PREVENTS COLLAGEN BREAKDOWN
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal text-white leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • BROAD-SPECTRUM PROTECTION
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal text-white leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • WATER AND SWEAT RESISTANT
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal text-white leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • NON-GREASY, WON’T CLOG PORES
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[17.86px] font-normal text-white leading-[1.4em] md:leading-[1.61em] mb-0.5 md:mb-1">
                      • SUPPORTS MOISTURE BARRIER
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[17.86px] font-normal text-white leading-[1.4em] md:leading-[1.61em] mb-0.5 md:mb-1">
                      • BLOCKS BLUE LIGHT
                    </p>
                  </div>
                  </div>
                  <div className="flex justify-center lg:justify-end mt-2 md:mt-4">
                    <a 
                      href="/products/refine-by-jacket?Title=Default+Title"
                      target="_blank"
                      rel="noopener noreferrer"
                    className="bg-[#FBAC18] rounded text-[#1B1A1B] px-4 md:px-[12px] py-1.5 md:py-[7px] font-bold text-[10px] md:text-sm lg:text-[15px] inline-block"
                    >
                      LEARN MORE
                    </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: REFRESH BY JACKET - Image on RIGHT */}
        <div className="flex rounded-none flex-col lg:flex-row bg-[#8d8d8d] mb-4 md:mb-8 rounded-lg lg:rounded-none">
          <div className="flex-1 lg:w-1/2 h-full">
            <div className="text-white flex flex-col lg:flex-row lg:gap-10 px-4 py-2 md:px-8 md:py-4 xl:px-16 xl:py-10 h-full">
              {/* Mobile: Title at top */}
              <div className="flex flex-row lg:hidden items-center justify-center gap-2 mb-4">
                <span className="text-sm font-normal text-white">
                  REFRESH
                </span>
                <span className="text-xs font-normal text-black">
                  BY JACKET
                </span>
              </div>
              
              {/* Mobile: Image and description side by side */}
              <div className="flex flex-row lg:hidden justify-between gap-2 mb-4">
                <div className="flex justify-center">
                  <img
                    src="/assets/contentProduct3.png"
                    alt="JACKET Sunscreen"
                    className="object-contain h-32 w-auto max-w-[80px]"
                  />
                </div>
                <div className="flex-1 ml-2">
                  <div className="text-left">
                    <p className="text-[10px] font-normal leading-[1.4em] mb-0.5">
                      • POST-SUN RECOVERY
                    </p>
                    <p className="text-[10px] font-normal leading-[1.4em] mb-0.5">
                      • ANTIOXIDANT INFUSED
                    </p>
                    <p className="text-[10px] font-normal leading-[1.4em] mb-0.5">
                      • CALMS AND SOOTHES IRRITATION
                    </p>
                    <p className="text-[10px] font-normal leading-[1.4em] mb-0.5">
                      • RESTORES MOISTURE
                    </p>
                    <p className="text-[10px] font-normal leading-[1.4em] mb-0.5">
                      • ALOE AND ALGIN ENRICHED
                    </p>
                    <p className="text-[10px] font-normal leading-[1.4em] mb-0.5">
                      • PROVIDES IMMEDIATE RELIEF
                    </p>
                    <p className="text-[10px] font-normal leading-[1.4em] mb-0.5">
                      • ANTI-AGING INGREDIENTS
                    </p>
                    <p className="text-[10px] font-normal leading-[1.4em] mb-0.5">
                      • IDEAL FOR DAILY USE
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile: Learn More button centered at bottom */}
              <div className="flex lg:hidden justify-center">
                <a 
                  href="/products/refresh-by-jacket?Title=Default+Title"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black rounded text-white px-4 py-1.5 font-bold text-[10px] inline-block"
                >
                  LEARN MORE
                </a>
              </div>

              {/* Desktop: Original layout */}
              <div className="hidden lg:flex justify-center lg:justify-start">
                <img
                  src="/assets/contentProduct3.png"
                  alt="JACKET Sunscreen"
                  className="object-contain h-32 md:h-60 lg:h-[355px] w-auto max-w-[80px] md:max-w-[150px] lg:max-w-none lg:-ml-8"
                />
              </div>
              <div className="hidden lg:flex flex-1 flex-col justify-between lg:-ml-12">
                <div>
                  <div className="flex flex-col md:flex-row items-start mb-2 md:mb-4 lg:mb-6 text-left">
                    <span className="text-sm md:text-xl lg:text-[27px] font-normal text-white mr-0 lg:mr-[15px]">
                      REFRESH
                    </span>
                    <span className="text-xs md:text-base lg:text-[18px] font-normal text-black">
                      BY JACKET
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • POST-SUN RECOVERY
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[17.86px] font-normal leading-[1.4em] md:leading-[1.61em] mb-0.5 md:mb-1">
                      • ANTIOXIDANT INFUSED
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • CALMS AND SOOTHES IRRITATION
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • RESTORES MOISTURE
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • ALOE AND ALGIN ENRICHED
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • PROVIDES IMMEDIATE RELIEF
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • ANTI-AGING INGREDIENTS
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • IDEAL FOR DAILY USE
                    </p>
                  </div>
                  </div>
                  <div className="flex justify-center lg:justify-end mt-2 md:mt-4">
                    <a 
                      href="/products/refresh-by-jacket?Title=Default+Title"
                      target="_blank"
                      rel="noopener noreferrer"
                    className="bg-black rounded text-white px-4 md:px-[12px] py-1.5 md:py-[7px] font-bold text-[10px] md:text-sm lg:text-[15px] inline-block"
                    >
                      LEARN MORE
                    </a>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 h-[217px] md:h-[510px] order-last lg:order-last">
            <img
              src="/assets/contentImage3.png"
              alt="JACKET Sunscreen"
              className="w-full h-full rounded-none object-cover"
            />
          </div>
        </div>

        {/* Section 4: LIP BALM BY JACKET - Image on LEFT */}
        <div className="flex rounded-none flex-col lg:flex-row bg-[#1B1A1B] mb-4 md:mb-8 rounded-lg lg:rounded-none">
          <div className="lg:w-1/2 h-[217px] md:h-[510px] order-first">
            <img
              src="/assets/contentImage4.png"
              alt="JACKET Sunscreen"
              className="w-full h-full rounded-none object-cover"
            />
          </div>
          <div className="flex-1 lg:w-1/2 h-full">
            <div className="text-white flex flex-col lg:flex-row lg:gap-4 px-4 py-2 md:px-8 md:py-4 h-full">
              {/* Mobile: Title at top */}
              <div className="flex flex-row lg:hidden items-center justify-center gap-2 mb-4">
                <span className="text-sm font-normal text-[#FBAC18]">
                  LIP BALM
                </span>
                <span className="text-xs font-normal text-[#FFFFFE]">
                  BY JACKET
                </span>
              </div>
              
              {/* Mobile: Image and description side by side */}
              <div className="flex flex-row lg:hidden justify-between gap-2 mb-4">
                <div className="flex justify-center">
                  <img
                    src="/assets/contentProduct4.png"
                    alt="JACKET Sunscreen"
                    className="object-contain w-16 max-w-[80px]"
                  />
                </div>
                <div className="flex-1 ml-2">
                  <div className="text-left">
                    <p className="text-[10px] font-normal text-white leading-[1.4em] mb-0.5">
                      • MOISTURIZING SUNSCREEN
                    </p>
                    <p className="text-[10px] font-normal text-white leading-[1.4em] mb-0.5">
                      • BROAD-SPECTRUM PROTECTION
                    </p>
                    <p className="text-[10px] font-normal text-white leading-[1.4em] mb-0.5">
                      • WATER RESISTANT
                    </p>
                    <p className="text-[10px] font-normal text-white leading-[1.4em] mb-0.5">
                      • ANTIOXIDANT ENRICHED
                    </p>
                    <p className="text-[10px] font-normal text-white leading-[1.4em] mb-0.5">
                      • LIGHTWEIGHT AND NON-GREASY
                    </p>
                    <p className="text-[10px] font-normal text-white leading-[1.4em] mb-0.5">
                      • SOOTHES IRRITATION
                    </p>
                    <p className="text-[10px] font-normal text-white leading-[1.4em] mb-0.5">
                      • BEESWAX AND SHEA BUTTER
                    </p>
                    <p className="text-[10px] font-normal text-white leading-[1.4em] mb-0.5">
                      • COCONUT AND SUNFLOWER OIL
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile: Learn More button centered at bottom */}
              <div className="flex lg:hidden justify-center">
                <a 
                  href="/products/lip-balm-by-jacket?Title=Default+Title"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#FBAC18] rounded text-[#1B1A1B] px-4 py-1.5 font-bold text-[10px] inline-block"
                >
                  LEARN MORE
                </a>
              </div>

              {/* Desktop: Original layout */}
              <div className="hidden lg:flex justify-center lg:justify-start">
                <img
                  src="/assets/contentProduct4.png"
                  alt="JACKET Sunscreen"
                  className="object-contain w-16 md:w-40 lg:w-auto max-w-[80px] md:max-w-[150px] lg:max-w-none"
                />
              </div>
              <div className="hidden lg:flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex flex-col md:flex-row items-start mb-2 md:mb-4 lg:mb-6 text-left">
                    <span className="text-sm md:text-xl lg:text-[27px] font-normal text-[#FBAC18] mr-0 lg:mr-[15px]">
                      LIP BALM
                    </span>
                    <span className="text-xs md:text-base lg:text-[18px] font-normal text-[#FFFFFE]">
                      BY JACKET
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal text-white leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • MOISTURIZING SUNSCREEN
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal text-white leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • BROAD-SPECTRUM PROTECTION
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal text-white leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • WATER RESISTANT
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal text-white leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • ANTIOXIDANT ENRICHED
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal text-white leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • LIGHTWEIGHT AND NON-GREASY
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal text-white leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • SOOTHES IRRITATION
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal text-white leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • BEESWAX AND SHEA BUTTER
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal text-white leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • COCONUT AND SUNFLOWER OIL
                    </p>
                  </div>
                  </div>
                  <div className="flex justify-center lg:justify-end mt-2 md:mt-4">
                    <a 
                      href="/products/lip-balm-by-jacket?Title=Default+Title"
                      target="_blank"
                      rel="noopener noreferrer"
                    className="bg-[#FBAC18] rounded text-[#1B1A1B] px-4 md:px-[12px] py-1.5 md:py-[7px] font-bold text-[10px] md:text-sm lg:text-[15px] inline-block"
                    >
                      LEARN MORE
                    </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: PLATINUM PEPTIDE BY JACKET - Image on RIGHT */}
        <div className="flex rounded-none flex-col lg:flex-row bg-[#8d8d8d] rounded-lg lg:rounded-none">
          <div className="flex-1 lg:w-1/2 h-full">
            <div className="text-white flex flex-col lg:flex-row lg:gap-10 px-4 py-2 md:px-8 md:py-4 xl:px-16 xl:py-10 h-full">
              {/* Mobile: Title at top */}
              <div className="flex flex-row lg:hidden items-center justify-center gap-2 mb-4">
                <span className="text-sm font-normal text-white">
                  PLATINUM PEPTIDE
                </span>
                <span className="text-xs font-normal text-black">
                  BY JACKET
                </span>
              </div>
              
              {/* Mobile: Image and description side by side */}
              <div className="flex flex-row lg:hidden justify-between gap-2 mb-4">
                <div className="flex justify-center">
                  <img
                    src="/assets/contentProduct5.png"
                    alt="JACKET Sunscreen"
                    className="object-contain h-32 w-auto max-w-[80px]"
                  />
                </div>
                <div className="flex-1 ml-2">
                  <div className="text-left">
                    <p className="text-[10px] font-normal text-[#1B1A1B] leading-[1.4em] mb-0.5">
                      • FACE FIRMING CREAM
                    </p>
                    <p className="text-[10px] font-normal text-[#1B1A1B] leading-[1.4em] mb-0.5">
                      • ADVANCED PEPTIDE FORMULA
                    </p>
                    <p className="text-[10px] font-normal text-[#1B1A1B] leading-[1.4em] mb-0.5">
                      • BOOSTS COLLAGEN PRODUCTION
                    </p>
                    <p className="text-[10px] font-normal text-[#1B1A1B] leading-[1.4em] mb-0.5">
                      • ANTI-AGING ANTIOXIDANT ENRICHED
                    </p>
                    <p className="text-[10px] font-normal text-[#1B1A1B] leading-[1.4em] mb-0.5">
                      • SMOOTHS LINES AND WRINKLES
                    </p>
                    <p className="text-[10px] font-normal text-[#1B1A1B] leading-[1.4em] mb-0.5">
                      • IMPROVES SKIN ELASTICITY
                    </p>
                    <p className="text-[10px] font-normal text-[#1B1A1B] leading-[1.4em] mb-0.5">
                      • HYDRATES AND MOISTURIZES
                    </p>
                    <p className="text-[10px] font-normal text-[#1B1A1B] leading-[1.4em] mb-0.5">
                      • PROTECTS AGAINST ENVIRONMENTAL STRESSORS
                    </p>
                    <p className="text-[10px] font-normal text-[#1B1A1B] leading-[1.4em] mb-0.5">
                      • IDEAL FOR DAILY USE
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile: Learn More button centered at bottom */}
              <div className="flex lg:hidden justify-center">
                <a 
                  href="/products/platinum-peptide-by-jacket-1?Title=Default+Title"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black rounded text-white px-4 py-1.5 font-bold text-[10px] inline-block"
                >
                  LEARN MORE
                </a>
              </div>

              {/* Desktop: Original layout */}
              <div className="hidden lg:flex justify-center lg:justify-start">
                <img
                  src="/assets/contentProduct5.png"
                  alt="JACKET Sunscreen"
                  className="object-contain h-32 md:h-60 lg:h-[355px] w-auto max-w-[80px] md:max-w-[150px] lg:max-w-none"
                />
              </div>
              <div className="hidden lg:flex flex-1 flex-col justify-between">
                <div>
                  <div className="text-left mb-2 md:mb-4 lg:mb-6">
                    <div className="text-sm md:text-xl lg:text-[27px] font-normal text-white">
                      PLATINUM PEPTIDE
                    </div>
                    <div className="text-xs md:text-base lg:text-[18px] font-normal text-black">
                      BY JACKET
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal text-[#1B1A1B] leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • FACE FIRMING CREAM
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal text-[#1B1A1B] leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • ADVANCED PEPTIDE FORMULA
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal text-[#1B1A1B] leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • BOOSTS COLLAGEN PRODUCTION
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal text-[#1B1A1B] leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • ANTI-AGING ANTIOXIDANT ENRICHED
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal text-[#1B1A1B] leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • SMOOTHS LINES AND WRINKLES
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal text-[#1B1A1B] leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • IMPROVES SKIN ELASTICITY
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal text-[#1B1A1B] leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • HYDRATES AND MOISTURIZES
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal text-[#1B1A1B] leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • PROTECTS AGAINST ENVIRONMENTAL STRESSORS
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[18px] font-normal text-[#1B1A1B] leading-[1.4em] md:leading-[1.6em] mb-0.5 md:mb-1">
                      • IDEAL FOR DAILY USE
                    </p>
                  </div>
                  </div>
                  <div className="flex justify-center lg:justify-end mt-2 md:mt-4">
                    <a 
                      href="/products/platinum-peptide-by-jacket-1?Title=Default+Title"
                      target="_blank"
                      rel="noopener noreferrer"
                    className="bg-black rounded text-white px-4 md:px-[12px] py-1.5 md:py-[7px] font-bold text-[10px] md:text-sm lg:text-[15px] inline-block"
                    >
                      LEARN MORE
                    </a>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 h-[217px] md:h-[510px] order-last lg:order-last">
            <img
              src="/assets/contentImage5.png"
              alt="JACKET Sunscreen"
              className="w-full h-[217px] md:h-[510px] rounded-none object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
