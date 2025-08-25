import React from 'react';

export type ImageSide = 'left' | 'right';

export interface ContentSectionBullet {
  text: string;
  color?: string; // tailwind text color class like 'text-white' or 'text-[#1B1A1B]'
}

export interface ContentSectionButton {
  label: string;
  href: string;
  bgColorClass: string; // e.g., 'bg-[#FBAC18]' or 'bg-black'
  textColorClass: string; // e.g., 'text-[#1B1A1B]' or 'text-white'
}

export interface ContentSectionData {
  id: string;
  bgColorClass: string; // background color for the whole section
  imageSide: ImageSide; // which side shows the large image
  sideImageSrc: string; // large side image
  sideImageAlt: string;
  productImageSrc: string; // small product image (icon/product)
  productImageAlt: string;
  titlePrimary: string; // first word(s) with distinct color
  titleSecondary: string; // second word(s) with distinct color
  titlePrimaryColorClass: string;
  titleSecondaryColorClass: string;
  bullets: ContentSectionBullet[];
  button: ContentSectionButton;
}

export const contentSectionsData: ContentSectionData[] = [
  {
    id: 'jacket-sunscreen',
    bgColorClass: 'bg-[#1B1A1B]',
    imageSide: 'right',
    sideImageSrc: '/assets/contentImage1.png',
    sideImageAlt: 'JACKET Sunscreen',
    productImageSrc: '/assets/contentProduct1.png',
    productImageAlt: 'JACKET Sunscreen',
    titlePrimary: 'JACKET',
    titleSecondary: 'SUNSCREEN',
    titlePrimaryColorClass: 'text-[#FBAC18]',
    titleSecondaryColorClass: 'text-[#FFFFFE]',
    bullets: [
      {text: '• BROAD-SPECTRUM PROTECTION'},
      {text: '• REDUCES DARK SPOTS'},
      {text: '• ANTI-AGING FORMULA'},
      {text: '• SMOOTHS LINES AND WRINKLES'},
      {text: '• WATER-RESISTANT'},
      {text: '• NON-GREASY & LIGHTWEIGHT'},
      {text: '• SAFE FOR ALL SKIN TYPES'},
      {text: '• NATURAL INGREDIENTS'},
      {text: '• REEF-SAFE FORMULA'},
    ],
    button: {
      label: 'LEARN MORE',
      href: '/products/spf-50-anti-aging-sunscreen?Title=Default+Title',
      bgColorClass: 'bg-[#FBAC18]',
      textColorClass: 'text-[#1B1A1B]',
    },
  },
  {
    id: 'jacket-spray-sunscreen',
    bgColorClass: 'bg-[#1B1A1B]',
    imageSide: 'left',
    sideImageSrc: '/assets/contentImage2.png',
    sideImageAlt: 'JACKET Sunscreen',
    productImageSrc: '/assets/contentProduct2.png',
    productImageAlt: 'JACKET Sunscreen',
    titlePrimary: 'JACKET',
    titleSecondary: 'SPRAY SUNSCREEN',
    titlePrimaryColorClass: 'text-[#FBAC18]',
    titleSecondaryColorClass: 'text-[#FFFFFE]',
    bullets: [
      {text: '• UVA/UVB PROTECTION', color: 'text-white'},
      {text: '• ANTI-AGING PEPTIDES', color: 'text-white'},
      {text: '• HYDRATES AND NOURISHES', color: 'text-white'},
      {text: '• LIGHTWEIGHT SPRAY FORMULA', color: 'text-white'},
      {text: '• REFRESHING SCENT', color: 'text-white'},
      {text: '• WATER-RESISTANT', color: 'text-white'},
      {text: '• SAFE FOR SENSITIVE SKIN', color: 'text-white'},
      {text: '• FADES DARK SPOTS', color: 'text-white'},
      {text: '• VERSATILE USE', color: 'text-white'},
    ],
    button: {
      label: 'LEARN MORE',
      href: '/products/refine-by-jacket?Title=Default+Title',
      bgColorClass: 'bg-[#FBAC18]',
      textColorClass: 'text-[#1B1A1B]',
    },
  },
  {
    id: 'refresh-by-jacket',
    bgColorClass: 'bg-[#8d8d8d]',
    imageSide: 'right',
    sideImageSrc: '/assets/contentImage3.png',
    sideImageAlt: 'JACKET Sunscreen',
    productImageSrc: '/assets/contentProduct3.png',
    productImageAlt: 'JACKET Sunscreen',
    titlePrimary: 'REFRESH',
    titleSecondary: 'BY JACKET',
    titlePrimaryColorClass: 'text-white',
    titleSecondaryColorClass: 'text-black',
    bullets: [
      {text: '• HYDRATING SERUM'},
      {text: '• POST-SUN RECOVERY'},
      {text: '• CALMS AND SOOTHES'},
      {text: '• ANTI-AGING INGREDIENTS'},
      {text: '• ANTIOXIDANT-INFUSED'},
      {text: '• RESTORES MOISTURE'},
      {text: '• ALOE + ALGIN ENRICHED'},
      {text: '• IMMEDIATE RELIEF'},
    ],
    button: {
      label: 'LEARN MORE',
      href: '/products/refresh-by-jacket?Title=Default+Title',
      bgColorClass: 'bg-black',
      textColorClass: 'text-white',
    },
  },
  {
    id: 'lip-balm-by-jacket',
    bgColorClass: 'bg-[#1B1A1B]',
    imageSide: 'left',
    sideImageSrc: '/assets/contentImage4.png',
    sideImageAlt: 'JACKET Sunscreen',
    productImageSrc: '/assets/contentProduct4.png',
    productImageAlt: 'JACKET Sunscreen',
    titlePrimary: 'LIP BALM',
    titleSecondary: 'BY JACKET',
    titlePrimaryColorClass: 'text-[#FBAC18]',
    titleSecondaryColorClass: 'text-[#FFFFFE]',
    bullets: [
      {text: '• MOISTURIZER + SUNSCREEN', color: 'text-white'},
      {text: '• SPF 15 PROTECTION', color: 'text-white'},
      {text: '• BROAD-SPECTRUM DEFENSE', color: 'text-white'},
      {text: '• WATER RESISTANT', color: 'text-white'},
      {text: '• SOOTHES IRRITATION', color: 'text-white'},
      {text: '• ANTIOXIDANTS + VITAMINS', color: 'text-white'},
      {text: '• BEESWAX + SHEA BUTTER', color: 'text-white'},
      {text: '• COCONUT + SUNFLOWER OIL', color: 'text-white'},
    ],
    button: {
      label: 'LEARN MORE',
      href: '/products/lip-balm-by-jacket?Title=Default+Title',
      bgColorClass: 'bg-[#FBAC18]',
      textColorClass: 'text-[#1B1A1B]',
    },
  },
  {
    id: 'platinum-peptide-by-jacket',
    bgColorClass: 'bg-[#8d8d8d]',
    imageSide: 'right',
    sideImageSrc: '/assets/contentImage5.png',
    sideImageAlt: 'JACKET Sunscreen',
    productImageSrc: '/assets/contentProduct5.png',
    productImageAlt: 'JACKET Sunscreen',
    titlePrimary: 'PLATINUM PEPTIDE',
    titleSecondary: 'BY JACKET',
    titlePrimaryColorClass: 'text-white',
    titleSecondaryColorClass: 'text-black',
    bullets: [
      {text: '• ADVANCED PEPTIDE FORMULA', color: 'text-[#1B1A1B]'},
      {text: '• BOOSTS COLLAGEN PRODUCTION', color: 'text-[#1B1A1B]'},
      {text: '• SMOOTHS LINES AND WRINKLES', color: 'text-[#1B1A1B]'},
      {text: '• ENHANCES SKIN ELASTICITY', color: 'text-[#1B1A1B]'},
      {text: '• ANTI-AGING ANTIOXIDANTS', color: 'text-[#1B1A1B]'},
      {text: '• RETAINS AND RESTORES MOISTURE', color: 'text-[#1B1A1B]'},
      {text: '• HYDRATES FOR HEALTHIER SKIN', color: 'text-[#1B1A1B]'},
      {text: '• PROTECTS AGAINST ENVIRONMENTAL STRESSORS', color: 'text-[#1B1A1B]'},
      {text: '• SUITS ADVENTURE AND DAILY USE', color: 'text-[#1B1A1B]'},
    ],
    button: {
      label: 'LEARN MORE',
      href: '/products/platinum-peptide-by-jacket-1?Title=Default+Title',
      bgColorClass: 'bg-black',
      textColorClass: 'text-white',
    },
  },
  {
    id: 'spf-50-mineral-stick',
    bgColorClass: 'bg-[#1B1A1B]',
    imageSide: 'left',
    sideImageSrc: '/assets/contentImage1.png',
    sideImageAlt: 'SPF 50+ Mineral Sunscreen Stick',
    productImageSrc: '/assets/contentProduct1.png',
    productImageAlt: 'SPF 50+ Mineral Sunscreen Stick',
    titlePrimary: 'SPF 50+ MINERAL',
    titleSecondary: 'SUNSCREEN STICK',
    titlePrimaryColorClass: 'text-[#FBAC18]',
    titleSecondaryColorClass: 'text-[#FFFFFE]',
    bullets: [
      {text: '• NATURAL, MINERAL-ONLY FORMULA', color: 'text-white'},
      {text: '• 100% VEGAN', color: 'text-white'},
      {text: '• VITAMIN AND NUTRIENT ENRICHED', color: 'text-white'},
      {text: '• OIL-FREE AND NON-GREASY', color: 'text-white'},
      {text: '• BROAD-SPECTRUM PROTECTION', color: 'text-white'},
      {text: '• WATER AND SWEAT RESISTANT', color: 'text-white'},
      {text: "• WON'T CLOG PORES", color: 'text-white'},
      {text: '• CONTAINS SOOTHING ALOE', color: 'text-white'},
    ],
    button: {
      label: 'LEARN MORE',
      href: '/products/spf-50-mineral-stick-sunscreen?Title=Default+Title',
      bgColorClass: 'bg-[#FBAC18]',
      textColorClass: 'text-[#1B1A1B]',
    },
  },
  {
    id: 'spf-40-tinted-moisturizer',
    bgColorClass: 'bg-[#8d8d8d]',
    imageSide: 'right',
    sideImageSrc: '/assets/contentImage2.png',
    sideImageAlt: 'SPF 40+ Tinted Moisturizer',
    productImageSrc: '/assets/contentProduct4.png',
    productImageAlt: 'SPF 40+ Tinted Moisturizer',
    titlePrimary: 'SPF 40+ TINTED',
    titleSecondary: 'MOISTURIZER',
    titlePrimaryColorClass: 'text-white',
    titleSecondaryColorClass: 'text-black',
    bullets: [
      {text: '• SKIN-PERFECTING TINT', color: 'text-[#1B1A1B]'},
      {text: '• EVEN, SHINE-FREE COMPLEXION', color: 'text-[#1B1A1B]'},
      {text: '• ZINC AND TITANIUM OXIDE ENRICHED', color: 'text-[#1B1A1B]'},
      {text: '• MINIMIZES IMPERFECTIONS', color: 'text-[#1B1A1B]'},
      {text: '• MATTE FINISH', color: 'text-[#1B1A1B]'},
      {text: "• NON-GREASY, WON'T CLOG PORES", color: 'text-[#1B1A1B]'},
      {text: '• BROAD-SPECTRUM PROTECTION', color: 'text-[#1B1A1B]'},
      {text: '• WATER AND SWEAT RESISTANT', color: 'text-[#1B1A1B]'},
      {text: '• BLOCKS BLUE LIGHT', color: 'text-[#1B1A1B]'},
    ],
    button: {
      label: 'LEARN MORE',
      href: '/products/jacket-spf-40-tinted-moisturizer',
      bgColorClass: 'bg-black',
      textColorClass: 'text-white',
    },
  },
  {
    id: 'refine-face-wash',
    bgColorClass: 'bg-[#1B1A1B]',
    imageSide: 'left',
    sideImageSrc: '/assets/contentImage1.png',
    sideImageAlt: 'Refine Face Wash',
    productImageSrc: '/assets/contentProduct1.png',
    productImageAlt: 'Refine Face Wash',
    titlePrimary: 'REFINE',
    titleSecondary: 'FACE WASH',
    titlePrimaryColorClass: 'text-[#FBAC18]',
    titleSecondaryColorClass: 'text-[#FFFFFE]',
    bullets: [
      {text: '• NATURAL, BOTANICAL CLEANSER', color: 'text-white'},
      {text: '• PLANT-BASED INGREDIENTS', color: 'text-white'},
      {text: '• MAINTAINS MOISTURE BARRIER', color: 'text-white'},
      {text: '• NO HARSH CHEMICALS, SULFATES', color: 'text-white'},
      {text: '• NO ARTIFICAL FRAGRANCES', color: 'text-white'},
      {text: '• REMOVES GRIME AND IMPURITIES', color: 'text-white'},
      {text: '• SOOTHES AND REVITALIZIES', color: 'text-white'},
      {text: '• CRUELTY FREE', color: 'text-white'},
      {text: '• IDEAL FOR DAILY USE', color: 'text-white'},
    ],
    button: {
      label: 'LEARN MORE',
      href: '/products/refine-by-jacket',
      bgColorClass: 'bg-[#FBAC18]',
      textColorClass: 'text-[#1B1A1B]',
    },
  },
];

export default contentSectionsData;


