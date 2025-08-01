import React from 'react';

interface PGAPartnerProps {
  title?: string;
  logoImage?: string;
}

export function PGAPartner({
  title = "PROUD SUNSCREEN PARTNER OF",
  logoImage
}: PGAPartnerProps) {
  return (
    <div className="w-full bg-[#1B1A1B] py-[18px]">
      <div className="px-[164px] flex items-center justify-between">
        <div className="w-[528px]">
          <h5 className="text-[19.84px] leading-[1.411] font-bold text-white">
            {title}
          </h5>
        </div>
        <div className="w-[149px] h-[112px] bg-white rounded flex items-center justify-center">
          {logoImage ? (
            <img 
              src={logoImage} 
              alt="PGA Logo"
              className="w-full h-full object-contain rounded"
            />
          ) : (
            <span className="text-[#1B1A1B] font-bold">PGA Logo</span>
          )}
        </div>
      </div>
    </div>
  );
} 