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
    <section className="w-full bg-white py-[12px]">
      <div className="max-w-[1200px] mx-auto bg-white relative">
        {/* Section 1: JACKET Sunscreen - Image on RIGHT */}
        <div className="flex flex-col lg:flex-row bg-[#1B1A1B] mb-8">
          <div className="flex-1 lg:w-1/2">
            <div className="text-white flex flex-col lg:flex-row p-4 lg:p-16 gap-4 lg:gap-10">
              <img
                src="/assets/contentProduct1.png"
                alt="JACKET Sunscreen"
                className="object-contain w-full lg:w-auto"
              />
              <div className="flex-1">
                <div>
                  <div className="flex items-center mb-[3px]">
                    <span className="text-[20px] lg:text-[27px] font-normal text-[#FBAC18] mr-[15px]">
                      JACKET
                    </span>
                    <span className="text-[14px] lg:text-[18px] font-normal text-[#FFFFFE]">
                      SUNSCREEN
                    </span>
                  </div>
                  <p className="text-[14px] lg:text-[18px] font-normal leading-[1.6em]">
                    • BROAD-SPECTRUM PROTECTION
                  </p>
                  <p className="text-[14px] lg:text-[17.86px] font-normal leading-[1.61em]">
                    • REDUCES DARK SPOTS
                  </p>
                  <p className="text-[14px] lg:text-[18px] font-normal leading-[1.6em]">
                    • ANTI-AGING FORMULA
                  </p>
                  <p className="text-[14px] lg:text-[18px] font-normal leading-[1.6em]">
                    • SMOOTHS LINES AND WRINKLES
                  </p>
                  <p className="text-[14px] lg:text-[18px] font-normal leading-[1.6em]">
                    • WATER-RESISTANT
                  </p>
                  <p className="text-[14px] lg:text-[18px] font-normal leading-[1.6em]">
                    • NON-GREASY & LIGHTWEIGHT
                  </p>
                  <p className="text-[14px] lg:text-[18px] font-normal leading-[1.6em]">
                    • SAFE FOR ALL SKIN TYPES
                  </p>
                  <p className="text-[14px] lg:text-[18px] font-normal leading-[1.6em]">
                    • NATURAL INGREDIENTS
                  </p>
                  <p className="text-[14px] lg:text-[17.86px] font-normal leading-[1.61em]">
                    • REEF-SAFE FORMULA
                  </p>
                  <div className="flex justify-end">
                    <button className="bg-[#FBAC18] mt-4 rounded text-[#1B1A1B] px-[12px] py-[7px] font-bold text-[13px] lg:text-[15px]">
                      LEARN MORE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 h-[300px] lg:h-full">
            <img
              src="/assets/contentImage1.png"
              alt="JACKET Sunscreen"
              className="w-full h-full rounded-none object-cover"
            />
          </div>
        </div>

        {/* Section 2: JACKET Spray Sunscreen - Image on LEFT */}
        <div className="flex flex-col lg:flex-row bg-[#1B1A1B] mb-8">
        <div className="lg:w-1/2 h-[300px] lg:h-full">
            <img
              src="/assets/contentImage2.png"
              alt="JACKET Sunscreen"
              className="w-full h-full rounded-none object-cover"
            />
          </div>
          <div className="flex-1 lg:w-1/2">
            <div className="text-white flex flex-col lg:flex-row p-4 lg:p-16 gap-4 lg:gap-10">
              <img
                src="/assets/contentProduct2.png"
                alt="JACKET Sunscreen"
                className="object-contain w-full lg:w-auto"
              />
              <div className="flex-1">
                <div>
                  <div className="flex items-center mb-[3px]">
                    <span className="text-[20px] lg:text-[27px] font-normal text-[#FBAC18] mr-[15px]">
                      JACKET
                    </span>
                    <span className="text-[14px] lg:text-[18px] font-normal text-[#FFFFFE]">
                      SPRAY SUNSCREEN
                    </span>
                  </div>
                  <p className="text-[14px] lg:text-[18px] font-normal text-white leading-[1.6em]">
                  • UVA/UVB PROTECTION
                </p>
                <p className="text-[14px] lg:text-[18px] font-normal text-white leading-[1.6em]">
                  • ANTI-AGING PEPTIDES
                </p>
                <p className="text-[14px] lg:text-[18px] font-normal text-white leading-[1.6em]">
                  • HYDRATES AND NOURISHES
                </p>
                <p className="text-[14px] lg:text-[18px] font-normal text-white leading-[1.6em]">
                  • LIGHTWEIGHT SPRAY FORMULA
                </p>
                <p className="text-[14px] lg:text-[17.72px] font-normal text-white leading-[1.63em]">
                  • REFRESHING SCENT
                </p>
                <p className="text-[14px] lg:text-[18px] font-normal text-white leading-[1.6em]">
                  • WATER-RESISTANT
                </p>
                <p className="text-[14px] lg:text-[18px] font-normal text-white leading-[1.6em]">
                  • SAFE FOR SENSITIVE SKIN
                </p>
                <p className="text-[14px] lg:text-[18px] font-normal text-white leading-[1.6em]">
                  • FADES DARK SPOTS
                </p>
                <p className="text-[14px] lg:text-[17.86px] font-normal text-white leading-[1.61em]">
                  • VERSATILE USE
                </p>
                  <div className="flex justify-end">
                    <button className="bg-[#FBAC18] mt-4 rounded text-[#1B1A1B] px-[12px] py-[7px] font-bold text-[13px] lg:text-[15px]">
                      LEARN MORE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* Section 3: REFRESH BY JACKET - Image on RIGHT */}
        <div className="flex flex-col lg:flex-row bg-[#8d8d8d] mb-8">
          <div className="flex-1 lg:w-1/2">
            <div className="text-white flex flex-col lg:flex-row px-4 py-2 lg:px-16 lg:py-10 gap-4 lg:gap-10">
              <img
                src="/assets/contentProduct3.png"
                alt="JACKET Sunscreen"
                className="object-contain h-[355px] lg:w-auto -ml-8"
              />
              <div className="flex-1 -ml-12">
                <div>
                  <div className="flex items-center mb-[3px]">
                    <span className="text-[20px] lg:text-[27px] font-normal text-white mr-[15px]">
                      REFRESH
                    </span>
                    <span className="text-[14px] lg:text-[18px] font-normal text-black">
                      BY JACKET
                    </span>
                  </div>
                  <p className="text-[14px] lg:text-[18px] font-normal leading-[1.6em]">
                    • HYDRATING SERUM
                  </p>
                  <p className="text-[14px] lg:text-[17.86px] font-normal leading-[1.61em]">
                    • POST-SUN RECOVERY
                  </p>
                  <p className="text-[14px] lg:text-[18px] font-normal leading-[1.6em]">
                    • CALMS AND SOOTHES
                  </p>
                  <p className="text-[14px] lg:text-[18px] font-normal leading-[1.6em]">
                    • ANTI-AGING INGREDIENTS
                  </p>
                  <p className="text-[14px] lg:text-[18px] font-normal leading-[1.6em]">
                    • ANTIOXIDANT-INFUSED
                  </p>
                  <p className="text-[14px] lg:text-[18px] font-normal leading-[1.6em]">
                    • RESTORES MOISTURE
                  </p>
                  <p className="text-[14px] lg:text-[18px] font-normal leading-[1.6em]">
                    • ALOE + ALGIN ENRICHED
                  </p>
                  <p className="text-[14px] lg:text-[18px] font-normal leading-[1.6em]">
                    • IMMEDIATE RELIEF
                  </p>

                  <div className="flex justify-end">
                    <button className="bg-black mt-4 rounded text-[#1B1A1B] px-[12px] py-[7px] font-bold text-white lg:text-[15px]">
                      LEARN MORE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 h-[300px] lg:h-full">
            <img
              src="/assets/contentImage3.png"
              alt="JACKET Sunscreen"
              className="w-full rounded-none rounded-none object-cover"
            />
          </div>
        </div>

        {/* Section 4: LIP BALM BY JACKET - Image on LEFT */}
       
        <div className="flex flex-col lg:flex-row bg-[#1B1A1B] mb-8">
        <div className="lg:w-1/2 h-[300px] lg:h-full">
            <img
              src="/assets/contentImage4.png"
              alt="JACKET Sunscreen"
              className="w-full h-full rounded-none object-cover"
            />
          </div>
          <div className="flex-1 lg:w-1/2">
            <div className="text-white flex flex-col lg:flex-row px-4 py-2 lg:px-16 lg:py-10 gap-4 lg:gap-10">
              <img
                src="/assets/contentProduct4.png"
                alt="JACKET Sunscreen"
                className="object-contain w-full lg:w-auto"
              />
              <div className="flex-1">
                <div>
                  <div className="flex items-center mb-[3px]">
                    <span className="text-[20px] lg:text-[27px] font-normal text-[#FBAC18] mr-[15px]">
                      LIP BALM
                    </span>
                    <span className="text-[14px] lg:text-[18px] font-normal text-[#FFFFFE]">
                      BY JACKET
                    </span>
                  </div>
                  <p className="text-[14px] lg:text-[18px] font-normal text-white leading-[1.6em]">
                  • MOISTURIZER + SUNSCREEN
                </p>
                <p className="text-[14px] lg:text-[18px] font-normal text-white leading-[1.6em]">
                  • SPF 15 PROTECTION
                </p>
                <p className="text-[14px] lg:text-[18px] font-normal text-white leading-[1.6em]">
                  • BROAD-SPECTRUM DEFENSE
                </p>
                <p className="text-[14px] lg:text-[18px] font-normal text-white leading-[1.6em]">
                  • WATER RESISTANT
                </p>
                <p className="text-[14px] lg:text-[18px] font-normal text-white leading-[1.6em]">
                  • SOOTHES IRRITATION
                </p>
                <p className="text-[14px] lg:text-[18px] font-normal text-white leading-[1.6em]">
                  • ANTIOXIDANTS + VITAMINS
                </p>
                <p className="text-[14px] lg:text-[18px] font-normal text-white leading-[1.6em]">
                  • BEESWAX + SHEA BUTTER
                </p>
                <p className="text-[14px] lg:text-[18px] font-normal text-white leading-[1.6em]">
                  • COCONUT + SUNFLOWER OIL
                </p>
                  <div className="flex justify-end">
                    <button className="bg-[#FBAC18] mt-4 rounded text-[#1B1A1B] px-[12px] py-[7px] font-bold text-[13px] lg:text-[15px]">
                      LEARN MORE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* Section 5: PLATINUM PEPTIDE BY JACKET - Image on RIGHT */}

        <div className="flex flex-col lg:flex-row bg-[#8d8d8d]">
          <div className="flex-1 lg:w-1/2">
            <div className="text-white flex flex-col lg:flex-row px-4 py-2 lg:px-16 lg:py-10 gap-4 lg:gap-10">
              <img
                src="/assets/contentProduct5.png"
                alt="JACKET Sunscreen"
                className="object-contain h-[355px] lg:w-auto"
              />
              <div className="flex-1 ">
                <div>
                 
                    <div className="text-[20px] w-full lg:text-[27px] font-normal text-white mr-[15px]">
                      PLATINUM PEPTIDE
                    </div>
                    <div className="text-[14px] lg:text-[18px] font-normal text-black">
                      BY JACKET
                    </div>
                
                  <p className="text-[14px] lg:text-[18px] font-normal text-[#1B1A1B] leading-[1.6em]">
                    • ADVANCED PEPTIDE FORMULA
                  </p>
                  <p className="text-[14px] lg:text-[18px] font-normal text-[#1B1A1B] leading-[1.6em]">
                    • BOOSTS COLLAGEN PRODUCTION
                  </p>
                  <p className="text-[14px] lg:text-[18px] font-normal text-[#1B1A1B] leading-[1.6em]">
                    • SMOOTHS LINES AND WRINKLES
                  </p>
                  <p className="text-[14px] lg:text-[18px] font-normal text-[#1B1A1B] leading-[1.6em]">
                    • ENHANCES SKIN ELASTICITY
                  </p>
                  <p className="text-[14px] lg:text-[18px] font-normal text-[#1B1A1B] leading-[1.6em]">
                    • ANTI-AGING ANTIOXIDANTS
                  </p>
                  <p className="text-[14px] lg:text-[18px] font-normal text-[#1B1A1B] leading-[1.6em]">
                    • RETAINS AND RESTORES MOISTURE
                  </p>
                  <p className="text-[14px] lg:text-[18px] font-normal text-[#1B1A1B] leading-[1.6em]">
                    • HYDRATES FOR HEALTHIER SKIN
                  </p>
                  <p className="text-[14px] lg:text-[18px] font-normal text-[#1B1A1B] leading-[1.6em]">
                    • PROTECTS AGAINST
                  </p>
                  <p className="text-[14px] lg:text-[18px] font-normal text-[#1B1A1B] leading-[1.6em]">
                    ENVIRONMENTAL STRESSORS
                  </p>
                  <p className="text-[14px] lg:text-[18px] font-normal text-[#1B1A1B] leading-[1.6em]">
                    • SUITS ADVENTURE AND DAILY USE
                  </p>

                  <div className="flex justify-end">
                    <button className="bg-black mt-4 rounded text-[#1B1A1B] px-[12px] py-[7px] font-bold text-white lg:text-[15px]">
                      LEARN MORE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 h-[300px] lg:h-full">
            <img
              src="/assets/contentImage5.png"
              alt="JACKET Sunscreen"
              className="w-full h-[507px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
