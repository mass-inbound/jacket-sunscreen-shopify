import React from 'react';

interface PGAPartnerProps {
  title?: string;
 }

export function PGAPartner({
  title = "PROUD SUNSCREEN PARTNER OF",
  
}: PGAPartnerProps) {
  return (
    <div className="w-full bg-[#1B1A1B] py-[18px] mx-2 rounded">
      <div className=" flex items-center justify-center gap-2">
        <div className="w-[528px]">
          <h5 className="text-[19.84px] leading-[1.411] font-bold text-white">
            {title}
          </h5>
        </div>
        <div className="w-[149px] h-[112px] ">
          
            <img 
            src="/assets/pgaImg.svg" 
            alt="PGA Partner Logo"
            className="w-full h-full object-cover"
          />
        
        </div>
      </div>
    </div>
  );
} 