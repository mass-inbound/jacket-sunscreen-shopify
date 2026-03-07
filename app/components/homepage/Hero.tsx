import React from 'react';
import { Link } from 'react-router';

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  bottomText?: string;
}

export function Hero({
  title = "OUTDOOR BEAUTY SYSTEM",
  subtitle = "DERMATOLOGIST-DEVELOPED, ANTIOXIDANT-ENRICHED, ANTI-AGING SUN AND SKIN CARE THAT PROTECTS, REPAIRS, HEALS AND HYDRATES.",
  ctaText = "SHOP NOW",
  ctaLink = "/products",
  bottomText = "COMFORT AND CONFIDENCE WITHOUT COMPROMISE."
}: HeroProps) {
  return (
    <section className="relative w-full h-[calc(100vh-145px)] min-h-[560px] overflow-hidden">
      {/* Background images */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/JACKET_MOBILE_PRODUCTS1.png"
          alt="Jacket skincare products"
          className="block md:hidden w-full h-full object-cover object-center"
        />

        <img
          src="/images/JACKET_DESKTOP_PRODUCTS.png"
          alt="Jacket skincare products"
          className="hidden md:block w-full h-[93%] object-cover object-center"
        />
      </div>

      {/* Overlay content */}
      <div className="relative z-10 h-full">
        {/* Mobile text */}
        <div className="md:hidden px-6 pt-[1.1rem] text-center">
          <h1 className="mx-auto max-w-[340px] text-[34px] leading-[0.95] font-semibold tracking-tight text-black">
            OUTDOOR <br />
            BEAUTY SYSTEM
          </h1>

          <div className="mx-auto mt-[15px] h-[3px] w-full max-w-[340px] bg-[#f9ad19]" />

          <p className="mx-auto mt-[15px] max-w-[550px] text-[16px] leading-[1.22] font-light uppercase tracking-[0.01em] text-black">
            {subtitle}
          </p>
        </div>

        {/* Desktop text */}
        <div className="hidden md:block">
          <div className="max-w-[980px] px-10 pt-12 lg:px-12 lg:pt-4 xl:px-16">
            <h1 className="max-w-[860px] text-[42px] leading-[0.95] font-semibold tracking-tight text-black lg:text-[45px]">
              {title}
            </h1>

            <div className="mt-3 h-[3px] w-[420px] bg-[#f9ad19] lg:w-[520px]" />

            <p className="mt-5 max-w-[670px] text-[17px] leading-[1.35] font-[400] uppercase tracking-[0.01em] text-black lg:text-[20px]">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Mobile bottom banner - attached to image bottom */}
        <div className="absolute bottom-[60px] left-0 w-full bg-[#f9ad19] px-4 py-1.5 text-center md:hidden">
          <p className="text-[18px] leading-tight font-semibold uppercase tracking-[0.04em] text-black">
            {bottomText}
          </p>
        </div>

        {/* Desktop bottom banner */}
        <div className="absolute bottom-0 left-0 hidden w-full bg-[#f9ad19] px-8 py-2 text-center md:block">
          <p className="text-[24px] leading-tight font-semibold uppercase tracking-[0.04em] text-black">
            {bottomText}
          </p>
        </div>
      </div>
    </section>
  );
}