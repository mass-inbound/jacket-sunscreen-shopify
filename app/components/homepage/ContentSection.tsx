import React from 'react';
import type { ContentSectionData } from './ContentSections.data';

interface Props {
  section: ContentSectionData;
}

export function ContentSection({ section }: Props) {
  const isImageLeft = section.imageSide === 'left';
  const sideImageHeights = 'h-[220px] md:h-[440px] lg:h-[560px] xl:h-[600px]';
  const contentMinHeights = 'min-h-[220px] md:min-h-[440px] lg:min-h-[560px] xl:min-h-[600px]';

  return (
    <div className={`flex rounded-none flex-col lg:flex-row ${section.bgColorClass} mb-4 md:mb-8 rounded-lg lg:rounded-none`}>
      {isImageLeft && (
        <div className={`w-full lg:w-1/2 ${sideImageHeights} order-first`}>
          <img
            src={section.sideImageSrc}
            alt={section.sideImageAlt}
            className="w-full h-full rounded-none object-cover"
          />
        </div>
      )}

      <div className={`w-full lg:w-1/2 ${contentMinHeights}`}>
        <div className="text-white flex flex-col lg:flex-row lg:gap-12 px-4 py-3 md:px-8 md:py-6 xl:px-16 xl:py-10 h-full">
          {/* Mobile: Title at top */}
          <div className="flex flex-row lg:hidden items-center justify-center gap-2 mb-4">
            <span className={`text-sm font-bold ${section.titlePrimaryColorClass}`}>
              {section.titlePrimary}
            </span>
            <span className={`text-xs font-bold ${section.titleSecondaryColorClass}`}>
              {section.titleSecondary}
            </span>
          </div>

          {/* Mobile: Image and description side by side */}
          <div className="flex flex-row lg:hidden justify-between gap-2 mb-4">
            <div className="flex justify-center">
              <img
                src={section.productImageSrc}
                alt={section.productImageAlt}
                className="object-contain h-32 w-auto max-w-[80px]"
              />
            </div>
            <div className="flex-1 ml-2">
              <div className="text-left">
                {section.bullets.map((b, idx) => (
                  <p key={idx} className={`text-[10px] font-normal leading-[1.4em] mb-0.5 ${b.color ?? ''}`}>
                    {b.text}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: Learn More button centered at bottom */}
          <div className="flex lg:hidden justify-center">
            <a
              href={section.button.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${section.button.bgColorClass} rounded ${section.button.textColorClass} px-4 py-1.5 font-bold text-[10px] inline-block`}
            >
              {section.button.label}
            </a>
          </div>

          {/* Desktop: Original layout */}
          <div className="hidden lg:flex justify-center lg:justify-start">
            <img
              src={section.productImageSrc}
              alt={section.productImageAlt}
              className="object-contain w-auto max-w-full max-h-[200px] md:max-h-[260px] lg:max-h-[320px] xl:max-h-[360px]"
            />
          </div>
          <div className="hidden lg:flex flex-1 flex-col justify-between lg:ml-8">
            <div>
              <div className="flex flex-col md:flex-row items-start mb-2 md:mb-4 lg:mb-6 text-left">
                <span className={`text-sm md:text-xl lg:text-2xl xl:text-[27px] font-bold ${section.titlePrimaryColorClass} mr-0 lg:mr-[15px]`}>
                  {section.titlePrimary}
                </span>
                <span className={`text-xs md:text-base lg:text-lg xl:text-[18px] font-bold ${section.titleSecondaryColorClass}`}>
                  {section.titleSecondary}
                </span>
              </div>
              <div className="text-left">
                {section.bullets.map((b, idx) => (
                  <p
                    key={idx}
                    className={`text-[10px] md:text-sm lg:text-base xl:text-[18px] font-normal leading-[1.5em] md:leading-[1.6em] mb-0.5 md:mb-1 ${b.color ?? ''}`}
                  >
                    {b.text}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex justify-center lg:justify-end mt-2 md:mt-4">
              <a
                href={section.button.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${section.button.bgColorClass} rounded ${section.button.textColorClass} px-4 md:px-[12px] py-1.5 md:py-[7px] font-bold text-[10px] md:text-sm lg:text-base xl:text-[15px] inline-block`}
              >
                {section.button.label}
              </a>
            </div>
          </div>
        </div>
      </div>

      {!isImageLeft && (
        <div className={`w-full lg:w-1/2 ${sideImageHeights} order-last lg:order-last`}>
          <img
            src={section.sideImageSrc}
            alt={section.sideImageAlt}
            className="w-full h-full rounded-none object-cover"
          />
        </div>
      )}
    </div>
  );
}

export default ContentSection;


