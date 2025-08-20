import React from 'react';

interface PGAPartnerProps {
  title?: string;
}

export function PGAPartner({
  title = "PROUD SUNSCREEN PARTNER OF -updated",
}: PGAPartnerProps) {
  return (
    <div className="w-full bg-[#1B1A1B] py-4 md:py-[18px] mx-0 md:mx-2 rounded">
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 px-4 md:px-0">
        <div className="w-full md:w-[528px] text-center md:text-left">
          <h5 className="text-base md:text-lg lg:text-[19.84px] leading-[1.411] font-bold text-white">
            {title}
          </h5>
        </div>
        <div className="w-24 h-20 md:w-32 md:h-24 lg:w-[149px] lg:h-[112px]">
          <img 
            src="/assets/pgaImg2.png" 
            alt="PGA Partner Logo"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
} 