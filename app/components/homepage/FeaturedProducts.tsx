import React from 'react';
import {ProductItem} from '~/components/ProductItem';

interface FeaturedProductsProps {
  title?: string;
  products?: any[];
}

export function FeaturedProducts({
  title = "Featured Products",
  products = []
}: FeaturedProductsProps) {
  return (
    <section className="w-full py-5 md:py-5 lg:py-5 px-5 md:px-6 lg:px-[230px]">
      <div className="max-w-[280px] md:max-w-[980px] lg:max-w-[980px] mx-auto">
        <div className="flex justify-center items-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8">
            {title}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-8">
          {products.map((product, index) => (
            <ProductItem key={product.id || index} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
} 