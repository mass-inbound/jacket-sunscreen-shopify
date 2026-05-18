import React from 'react';

interface HeroProps {
  bottomText?: string;
}

export function Hero({
  bottomText = "DERMATOLOGIST DEVELOPED SUNSCREEN + SKINCARE"
}: HeroProps) {
  return (
    <section className="relative w-full py-0">

      {/* ── MOBILE ── */}
      <div className="md:hidden">
        {/* Image container */}
        <div className="relative w-full h-[52vh] overflow-hidden">
          <img
            src="/images/jacket-hero-image-mobile-may.png"
            alt="Jacket skincare products"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0">
            <div className="absolute top-[20%] right-0 left-0 flex flex-col items-end px-6">
              {/* Task 2: SPF LIFE + STYLE subheadline */}
              <p className="text-[18px] font-bold uppercase tracking-[0.15em] text-[#f9ad19] mb-2">
                SPF LIFE+STYLE
              </p>
              <h1 className="text-[35px] leading-[1] font-light tracking-tight text-white text-right">
                PROTECTS.<br />
                REPAIRS.<br />
                HYDRATES.
              </h1>
            </div>
          </div>
        </div>

        {/* Task 1: White ribbon gap */}
        <div className="w-full h-4 bg-white" />

        {/* Black bar — outside the image */}
        <div className="w-full bg-black px-4 py-2 text-center">
          <p className="text-[12px] leading-tight font-semibold uppercase tracking-[0.02em] whitespace-nowrap text-[#f9ad19]">
            {bottomText}
          </p>
        </div>
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden md:block">
        {/* Image container */}
        <div className="relative w-full h-[calc(100vh-220px)] overflow-hidden">
          <img
            src="/images/jacket-hero-image-desktop-may-new.png"
            alt="Jacket skincare products"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0">
            <div className="flex justify-start pl-[52%] pt-12">
              <div className="flex flex-col items-start">
                {/* Task 2: SPF LIFE + STYLE subheadline */}
                <p className="text-[32px] font-bold uppercase tracking-[0.15em] text-[#f9ad19] mb-3">
                  SPF LIFE+STYLE
                </p>
                <h1 className="text-[60px] leading-[1] font-light tracking-tight text-white text-left lg:text-[70px] 2xl:text-[80px]">
                  PROTECTS.<br />
                  REPAIRS.<br />
                  HYDRATES.
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Task 1: White ribbon gap */}
        <div className="w-full h-5 bg-white" />

        {/* Black bar — outside the image */}
        <div className="w-full bg-black px-8 py-2 text-center">
          <p className="text-[24px] leading-tight font-semibold uppercase tracking-[0.04em] text-[#f9ad19]">
            {bottomText}
          </p>
        </div>
      </div>

    </section>
  );
}