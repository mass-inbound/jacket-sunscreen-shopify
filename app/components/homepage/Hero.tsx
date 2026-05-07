import React from 'react';

interface HeroProps {
  bottomText?: string;
}

export function Hero({
  bottomText = "DERMATOLOGIST DEVELOPED SUNSCREEN + SKINCARE"
}: HeroProps) {
  return (
    <section className="relative w-full h-[calc(100vh-145px)] max-[375px]:max-h-[670px] md:max-h-[580px] min-[1025px]:max-h-[calc(100vh-145px)] min-h-[560px] overflow-hidden">

      {/* Background images */}
      <div className="absolute inset-0 w-full h-full md:max-h-[600px] lg:max-h-full">
        <img
          src="/images/jacket-hero-image-mobile-may.png"
          alt="Jacket skincare products"
          className="block md:hidden w-full h-full object-cover object-center"
        />
        <img
          src="/images/jacket-hero-image-desktop-may.jpg"
          alt="Jacket skincare products"
          className="hidden md:block w-full h-[93%] object-cover object-center"
        />
      </div>

      {/* Overlay content */}
      <div className="relative z-10 h-full">

        {/* Mobile title - right aligned */}
        <div className="md:hidden flex justify-end px-6 pt-8">
          <h1 className="text-[36px] leading-[1] font-light tracking-tight text-white text-right">
            PROTECTS.<br />
            REPAIRS.<br />
            HYDRATES.
          </h1>
        </div>

        {/* Desktop title - right aligned */}
        <div className="hidden md:flex justify-end px-10 pt-8 lg:px-12 xl:px-16">
          <h1 className="text-[60px] leading-[1] font-light tracking-tight text-white text-right lg:text-[70px] 2xl:text-[80px]">
            PROTECTS.<br />
            REPAIRS.<br />
            HYDRATES.
          </h1>
        </div>

        {/* Mobile bottom banner */}
        <div className="absolute bottom-[60px] left-0 w-full bg-black px-4 py-1.5 text-center md:hidden">
          <p className="text-[18px] leading-tight font-semibold uppercase tracking-[0.04em] text-[#f9ad19]">
            {bottomText}
          </p>
        </div>

        {/* Desktop bottom banner */}
        <div className="absolute bottom-0 left-0 hidden w-full bg-black px-8 py-2 text-center md:block">
          <p className="text-[24px] leading-tight font-semibold uppercase tracking-[0.04em] text-[#f9ad19]">
            {bottomText}
          </p>
        </div>

      </div>
    </section>
  );
}