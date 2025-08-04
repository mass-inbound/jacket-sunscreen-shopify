import React, { useState } from 'react';
import { Link } from 'react-router';
import { Image, Money } from '@shopify/hydrogen';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';

interface FeaturedProductsProps {
  
  products?: (ProductItemFragment | CollectionItemFragment | RecommendedProductFragment)[];
}

export function FeaturedProducts({
 
  products = []
}: FeaturedProductsProps) {
  return (
    <section className="w-full mt-9 py-5 md:py-5 lg:py-5 px-5 md:px-6 lg:px-[230px]">
      <div className="max-w-[280px] md:max-w-[980px] lg:max-w-[980px] mx-auto">
        
        
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {products.map((product, index) => (
            <ProductCard key={product.id || index} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ 
  product 
}: { 
  product: ProductItemFragment | CollectionItemFragment | RecommendedProductFragment 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const image = product.featuredImage;
  const price = product.priceRange?.minVariantPrice;

  return (
    <div 
      className="relative group flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative overflow-hidden  mb-4 flex-shrink-0 h-80 md:h-96 lg:h-[420px]">
        {image && (
          <Image
            alt={image.altText || product.title}
            aspectRatio="1/1"
            data={image}
            loading="lazy"
            sizes="(min-width: 45em) 400px, 100vw"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        
        {/* Quick View Overlay */}
        {isHovered && (
          <div className="absolute inset-0 w-full flex items-end justify-center pb-6 transition-opacity duration-300">
            <Link
              to={`/products/${product.handle}`}
              className="bg-[#FBAC18] text-black w-full text-center py-4 font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              QUICK VIEW
            </Link>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="text-center px-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Product Title */}
          <Link to={`/products/${product.handle}`} className="block">
            <h3 className="text-base md:text-lg font-bold text-[#1B1A1B] mb-2 leading-tight">
              {product.title}
            </h3>
          </Link>
          
          {/* Separator */}
          <div className="flex justify-center mb-2">
            <div className="w-5 h-px bg-[#1B1A1B]"></div>
          </div>
          
          {/* Price */}
          <div className="mb-4">
            {price && (
              <Money 
                data={price} 
                className="text-sm md:text-base font-bold text-[#545354]"
              />
            )}
          </div>
        </div>
        
        {/* Add to Cart Button */}
        <button className="w-full bg-[#FBAC18] text-white font-bold py-2 px-4 rounded text-sm md:text-base hover:bg-[#e69b15] transition-colors duration-200">
          ADD TO CART
        </button>
      </div>
    </div>
  );
} 