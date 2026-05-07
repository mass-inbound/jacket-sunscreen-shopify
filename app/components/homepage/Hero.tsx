import React from 'react';

interface HeroProps {
  bottomText?: string;
}

export function Hero({
  bottomText = "DERMATOLOGIST DEVELOPED SUNSCREEN + SKINCARE"
}: HeroProps) {
  return (
    <section className="relative w-full py-0">

      {/* Mobile */}
      <div className="md:hidden relative w-full h-[calc(100vh-145px)] overflow-hidden">
        <img
          src="/images/jacket-hero-image-mobile-may.png"
          alt="Jacket skincare products"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0">
          <div className="absolute top-[20%] right-0 left-0 flex justify-end px-6">
            <h1 className="text-[36px] leading-[1] font-light tracking-tight text-white text-right">
              PROTECTS.<br />
              REPAIRS.<br />
              HYDRATES.
            </h1>
          </div>
          <div className="absolute bottom-0 left-0 w-full bg-black px-4 py-2 text-center">
            <p className="text-[12px] leading-tight font-semibold uppercase tracking-[0.02em] whitespace-nowrap text-[#f9ad19]">
              {bottomText}
            </p>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block relative w-full h-[calc(100vh-145px)] overflow-hidden">
        <img
          src="/images/jacket-hero-image-desktop-may-new.png"
          alt="Jacket skincare products"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 flex flex-col justify-between">
          <div className="flex justify-start pl-[45%] pt-12">
            <h1 className="text-[60px] leading-[1] font-light tracking-tight text-white text-left lg:text-[70px] 2xl:text-[80px]">
              PROTECTS.<br />
              REPAIRS.<br />
              HYDRATES.
            </h1>
          </div>
          <div className="w-full bg-black px-8 py-2 text-center">
            <p className="text-[24px] leading-tight font-semibold uppercase tracking-[0.04em] text-[#f9ad19]">
              {bottomText}
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}