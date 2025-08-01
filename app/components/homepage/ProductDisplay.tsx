import React from 'react';

interface ProductDisplayProps {
  productImage?: string;
  productName?: string;
}

export function ProductDisplay({
  productImage,
  productName = "Product Image"
}: ProductDisplayProps) {
  return (
    <div className="absolute top-1/2 right-[50px] transform -translate-y-1/2 z-20">
      <div className="w-[480px] h-[817px] bg-[#FBAC18] rounded-lg flex items-center justify-center">
        <div className="w-[228px] h-[600px] bg-white rounded-lg flex items-center justify-center">
          {productImage ? (
            <img 
              src={productImage} 
              alt={productName}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <span className="text-[#1B1A1B] font-bold text-lg">{productName}</span>
          )}
        </div>
      </div>
    </div>
  );
} 