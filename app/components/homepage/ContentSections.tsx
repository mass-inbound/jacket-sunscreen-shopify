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
      <div className="max-w-[1200px] mx-auto bg-white relative px-4 md:px-0">
        {/* Section 1: JACKET Sunscreen - Image on RIGHT */}
        <div className="flex flex-col lg:flex-row bg-[#1B1A1B] mb-4 md:mb-8 rounded-lg lg:rounded-none">
          <div className="flex-1 lg:w-1/2">
            <div className="text-white flex flex-col lg:flex-row p-4 md:p-8 lg:p-16 gap-4 lg:gap-10">
              <div className="flex justify-center lg:justify-start">
                <img
                  src="/assets/contentProduct1.png"
                  alt="JACKET Sunscreen"
                  className="object-contain w-32 md:w-40 lg:w-auto max-w-[150px] lg:max-w-none"
                />
              </div>
              <div className="flex-1">
                <div>
                  <div className="flex flex-col md:flex-row items-center lg:items-start mb-2 md:mb-[3px] text-center lg:text-left">
                    <span className="text-lg md:text-xl lg:text-[27px] font-normal text-[#FBAC18] mr-0 lg:mr-[15px]">
                      JACKET
                    </span>
                    <span className="text-sm md:text-base lg:text-[18px] font-normal text-[#FFFFFE]">
                      SUNSCREEN
                    </span>
                  </div>
                  <div className="text-center lg:text-left">
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal leading-[1.6em] mb-1">
                      • BROAD-SPECTRUM PROTECTION
                    </p>
                    <p className="text-xs md:text-sm lg:text-[17.86px] font-normal leading-[1.61em] mb-1">
                      • REDUCES DARK SPOTS
                    </p>
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal leading-[1.6em] mb-1">
                      • ANTI-AGING FORMULA
                    </p>
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal leading-[1.6em] mb-1">
                      • SMOOTHS LINES AND WRINKLES
                    </p>
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal leading-[1.6em] mb-1">
                      • WATER-RESISTANT
                    </p>
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal leading-[1.6em] mb-1">
                      • NON-GREASY & LIGHTWEIGHT
                    </p>
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal leading-[1.6em] mb-1">
                      • SAFE FOR ALL SKIN TYPES
                    </p>
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal leading-[1.6em] mb-1">
                      • NATURAL INGREDIENTS
                    </p>
                    <p className="text-xs md:text-sm lg:text-[17.86px] font-normal leading-[1.61em] mb-1">
                      • REEF-SAFE FORMULA
                    </p>
                  </div>
                  <div className="flex justify-center lg:justify-end mt-4">
                    <a 
                      href="/products/spf-50-anti-aging-sunscreen?Title=Default+Title"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#FBAC18] rounded text-[#1B1A1B] px-3 md:px-[12px] py-2 md:py-[7px] font-bold text-xs md:text-sm lg:text-[15px] inline-block"
                    >
                      LEARN MORE
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 h-[200px] md:h-[250px] lg:h-full order-first lg:order-last">
            <img
              src="/assets/contentImage1.png"
              alt="JACKET Sunscreen"
              className="w-full h-full rounded-t-lg lg:rounded-none object-cover"
            />
          </div>
        </div>

        {/* Section 2: JACKET Spray Sunscreen - Image on LEFT */}
        <div className="flex flex-col lg:flex-row bg-[#1B1A1B] mb-4 md:mb-8 rounded-lg lg:rounded-none">
          <div className="lg:w-1/2 h-[200px] md:h-[250px] lg:h-full">
            <img
              src="/assets/contentImage2.png"
              alt="JACKET Sunscreen"
              className="w-full h-full rounded-t-lg lg:rounded-none object-cover"
            />
          </div>
          <div className="flex-1 lg:w-1/2">
            <div className="text-white flex flex-col lg:flex-row p-4 md:p-8 lg:p-16 gap-4 lg:gap-10">
              <div className="flex justify-center lg:justify-start">
                <img
                  src="/assets/contentProduct2.png"
                  alt="JACKET Sunscreen"
                  className="object-contain w-32 md:w-40 lg:w-auto max-w-[150px] lg:max-w-none"
                />
              </div>
              <div className="flex-1">
                <div>
                  <div className="flex flex-col md:flex-row items-center lg:items-start mb-2 md:mb-[3px] text-center lg:text-left">
                    <span className="text-lg md:text-xl lg:text-[27px] font-normal text-[#FBAC18] mr-0 lg:mr-[15px]">
                      JACKET
                    </span>
                    <span className="text-sm md:text-base lg:text-[18px] font-normal text-[#FFFFFE]">
                      SPRAY SUNSCREEN
                    </span>
                  </div>
                  <div className="text-center lg:text-left">
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal text-white leading-[1.6em] mb-1">
                      • UVA/UVB PROTECTION
                    </p>
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal text-white leading-[1.6em] mb-1">
                      • ANTI-AGING PEPTIDES
                    </p>
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal text-white leading-[1.6em] mb-1">
                      • HYDRATES AND NOURISHES
                    </p>
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal text-white leading-[1.6em] mb-1">
                      • LIGHTWEIGHT SPRAY FORMULA
                    </p>
                    <p className="text-xs md:text-sm lg:text-[17.72px] font-normal text-white leading-[1.63em] mb-1">
                      • REFRESHING SCENT
                    </p>
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal text-white leading-[1.6em] mb-1">
                      • WATER-RESISTANT
                    </p>
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal text-white leading-[1.6em] mb-1">
                      • SAFE FOR SENSITIVE SKIN
                    </p>
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal text-white leading-[1.6em] mb-1">
                      • FADES DARK SPOTS
                    </p>
                    <p className="text-xs md:text-sm lg:text-[17.86px] font-normal text-white leading-[1.61em] mb-1">
                      • VERSATILE USE
                    </p>
                  </div>
                  <div className="flex justify-center lg:justify-end mt-4">
                    <a 
                      href="/products/refine-by-jacket?Title=Default+Title"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#FBAC18] rounded text-[#1B1A1B] px-3 md:px-[12px] py-2 md:py-[7px] font-bold text-xs md:text-sm lg:text-[15px] inline-block"
                    >
                      LEARN MORE
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: REFRESH BY JACKET - Image on RIGHT */}
        <div className="flex flex-col lg:flex-row bg-[#8d8d8d] mb-4 md:mb-8 rounded-lg lg:rounded-none">
          <div className="flex-1 lg:w-1/2">
            <div className="text-white flex flex-col lg:flex-row px-4 py-2 md:px-8 md:py-4 lg:px-16 lg:py-10 gap-4 lg:gap-10">
              <div className="flex justify-center lg:justify-start">
                <img
                  src="/assets/contentProduct3.png"
                  alt="JACKET Sunscreen"
                  className="object-contain h-48 md:h-60 lg:h-[355px] w-auto max-w-[150px] lg:max-w-none lg:-ml-8"
                />
              </div>
              <div className="flex-1 lg:-ml-12">
                <div>
                  <div className="flex flex-col md:flex-row items-center lg:items-start mb-2 md:mb-[3px] text-center lg:text-left">
                    <span className="text-lg md:text-xl lg:text-[27px] font-normal text-white mr-0 lg:mr-[15px]">
                      REFRESH
                    </span>
                    <span className="text-sm md:text-base lg:text-[18px] font-normal text-black">
                      BY JACKET
                    </span>
                  </div>
                  <div className="text-center lg:text-left">
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal leading-[1.6em] mb-1">
                      • HYDRATING SERUM
                    </p>
                    <p className="text-xs md:text-sm lg:text-[17.86px] font-normal leading-[1.61em] mb-1">
                      • POST-SUN RECOVERY
                    </p>
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal leading-[1.6em] mb-1">
                      • CALMS AND SOOTHES
                    </p>
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal leading-[1.6em] mb-1">
                      • ANTI-AGING INGREDIENTS
                    </p>
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal leading-[1.6em] mb-1">
                      • ANTIOXIDANT-INFUSED
                    </p>
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal leading-[1.6em] mb-1">
                      • RESTORES MOISTURE
                    </p>
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal leading-[1.6em] mb-1">
                      • ALOE + ALGIN ENRICHED
                    </p>
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal leading-[1.6em] mb-1">
                      • IMMEDIATE RELIEF
                    </p>
                  </div>
                  <div className="flex justify-center lg:justify-end mt-4">
                    <a 
                      href="/products/refresh-by-jacket?Title=Default+Title"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black rounded text-white px-3 md:px-[12px] py-2 md:py-[7px] font-bold text-xs md:text-sm lg:text-[15px] inline-block"
                    >
                      LEARN MORE
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 h-[200px] md:h-[250px] lg:h-full order-first lg:order-last">
            <img
              src="/assets/contentImage3.png"
              alt="JACKET Sunscreen"
              className="w-full h-full rounded-t-lg lg:rounded-none object-cover"
            />
          </div>
        </div>

        {/* Section 4: LIP BALM BY JACKET - Image on LEFT */}
        <div className="flex flex-col lg:flex-row bg-[#1B1A1B] mb-4 md:mb-8 rounded-lg lg:rounded-none">
          <div className="lg:w-1/2 h-[200px] md:h-[250px] lg:h-full">
            <img
              src="/assets/contentImage4.png"
              alt="JACKET Sunscreen"
              className="w-full h-full rounded-t-lg lg:rounded-none object-cover"
            />
          </div>
          <div className="flex-1 lg:w-1/2">
            <div className="text-white flex flex-col lg:flex-row px-4 py-2 md:px-8 md:py-4 lg:px-16 lg:py-10 gap-4 lg:gap-10">
              <div className="flex justify-center lg:justify-start">
                <img
                  src="/assets/contentProduct4.png"
                  alt="JACKET Sunscreen"
                  className="object-contain w-32 md:w-40 lg:w-auto max-w-[150px] lg:max-w-none"
                />
              </div>
              <div className="flex-1">
                <div>
                  <div className="flex flex-col md:flex-row items-center lg:items-start mb-2 md:mb-[3px] text-center lg:text-left">
                    <span className="text-lg md:text-xl lg:text-[27px] font-normal text-[#FBAC18] mr-0 lg:mr-[15px]">
                      LIP BALM
                    </span>
                    <span className="text-sm md:text-base lg:text-[18px] font-normal text-[#FFFFFE]">
                      BY JACKET
                    </span>
                  </div>
                  <div className="text-center lg:text-left">
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal text-white leading-[1.6em] mb-1">
                      • MOISTURIZER + SUNSCREEN
                    </p>
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal text-white leading-[1.6em] mb-1">
                      • SPF 15 PROTECTION
                    </p>
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal text-white leading-[1.6em] mb-1">
                      • BROAD-SPECTRUM DEFENSE
                    </p>
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal text-white leading-[1.6em] mb-1">
                      • WATER RESISTANT
                    </p>
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal text-white leading-[1.6em] mb-1">
                      • SOOTHES IRRITATION
                    </p>
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal text-white leading-[1.6em] mb-1">
                      • ANTIOXIDANTS + VITAMINS
                    </p>
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal text-white leading-[1.6em] mb-1">
                      • BEESWAX + SHEA BUTTER
                    </p>
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal text-white leading-[1.6em] mb-1">
                      • COCONUT + SUNFLOWER OIL
                    </p>
                  </div>
                  <div className="flex justify-center lg:justify-end mt-4">
                    <a 
                      href="/products/lip-balm-by-jacket?Title=Default+Title"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#FBAC18] rounded text-[#1B1A1B] px-3 md:px-[12px] py-2 md:py-[7px] font-bold text-xs md:text-sm lg:text-[15px] inline-block"
                    >
                      LEARN MORE
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: PLATINUM PEPTIDE BY JACKET - Image on RIGHT */}
        <div className="flex flex-col lg:flex-row bg-[#8d8d8d] rounded-lg lg:rounded-none">
          <div className="flex-1 lg:w-1/2">
            <div className="text-white flex flex-col lg:flex-row px-4 py-2 md:px-8 md:py-4 lg:px-16 lg:py-10 gap-4 lg:gap-10">
              <div className="flex justify-center lg:justify-start">
                <img
                  src="/assets/contentProduct5.png"
                  alt="JACKET Sunscreen"
                  className="object-contain h-48 md:h-60 lg:h-[355px] w-auto max-w-[150px] lg:max-w-none"
                />
              </div>
              <div className="flex-1">
                <div>
                  <div className="text-center lg:text-left mb-2 md:mb-[3px]">
                    <div className="text-lg md:text-xl lg:text-[27px] font-normal text-white">
                      PLATINUM PEPTIDE
                    </div>
                    <div className="text-sm md:text-base lg:text-[18px] font-normal text-black">
                      BY JACKET
                    </div>
                  </div>
                  <div className="text-center lg:text-left">
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal text-[#1B1A1B] leading-[1.6em] mb-1">
                      • ADVANCED PEPTIDE FORMULA
                    </p>
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal text-[#1B1A1B] leading-[1.6em] mb-1">
                      • BOOSTS COLLAGEN PRODUCTION
                    </p>
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal text-[#1B1A1B] leading-[1.6em] mb-1">
                      • SMOOTHS LINES AND WRINKLES
                    </p>
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal text-[#1B1A1B] leading-[1.6em] mb-1">
                      • ENHANCES SKIN ELASTICITY
                    </p>
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal text-[#1B1A1B] leading-[1.6em] mb-1">
                      • ANTI-AGING ANTIOXIDANTS
                    </p>
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal text-[#1B1A1B] leading-[1.6em] mb-1">
                      • RETAINS AND RESTORES MOISTURE
                    </p>
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal text-[#1B1A1B] leading-[1.6em] mb-1">
                      • HYDRATES FOR HEALTHIER SKIN
                    </p>
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal text-[#1B1A1B] leading-[1.6em] mb-1">
                      • PROTECTS AGAINST ENVIRONMENTAL STRESSORS
                    </p>
                    <p className="text-xs md:text-sm lg:text-[18px] font-normal text-[#1B1A1B] leading-[1.6em] mb-1">
                      • SUITS ADVENTURE AND DAILY USE
                    </p>
                  </div>
                  <div className="flex justify-center lg:justify-end mt-4">
                    <a 
                      href="/products/platinum-peptide-by-jacket-1?Title=Default+Title"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black rounded text-white px-3 md:px-[12px] py-2 md:py-[7px] font-bold text-xs md:text-sm lg:text-[15px] inline-block"
                    >
                      LEARN MORE
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 h-[200px] md:h-[250px] lg:h-full order-first lg:order-last">
            <img
              src="/assets/contentImage5.png"
              alt="JACKET Sunscreen"
              className="w-full h-[200px] md:h-[250px] lg:h-[507px] rounded-t-lg lg:rounded-none object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
