import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';
import {useState} from 'react';

export function ProductItem({
  product,
  loading,
}: {
  product:
    | CollectionItemFragment
    | ProductItemFragment
    | RecommendedProductFragment;
  loading?: 'eager' | 'lazy';
}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="product-item bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Product Image Container */}
      <div className="relative">
        <Link
          className="block"
          prefetch="intent"
          to={variantUrl}
        >
          {image && (
            <div className="w-full h-[346px] rounded-3xl overflow-hidden">
              <Image
                alt={image.altText || product.title}
                aspectRatio="1/1"
                data={image}
                loading={loading}
                sizes="(min-width: 45em) 400px, 100vw"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </Link>
        
        {/* Optional NEW! Badge - you can add logic to show this based on product tags or dates */}
        {/* <div className="absolute top-2 left-2 bg-[#FBAC18] text-white text-xs font-bold px-3 py-1 rounded-lg">
          NEW!
        </div> */}
      </div>

      {/* Product Info Container */}
      <div className="p-4 flex flex-col h-full">
        {/* Product Title and Price */}
        <div className="flex-1">
          <Link
            className="block"
            prefetch="intent"
            to={variantUrl}
          >
            <h3 className="text-[#1B1A1B] font-bold text-xl leading-tight mb-2 line-clamp-2">
              {product.title}
            </h3>
            
            {/* Separator Line */}
            <div className="w-20 h-1 bg-[#FBAC18] mb-2"></div>
            
            {/* Price */}
            <div className="text-[#1B1A1B] text-base font-normal">
              <Money data={product.priceRange.minVariantPrice} />
            </div>
          </Link>
        </div>

        {/* Star Rating */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="#FBAC18"
                className="w-4 h-4"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <span className="text-[#1B1A1B] text-sm">5.0 (1)</span>
        </div>

        {/* Quantity Selector */}
        <div className="mt-3">
          <div className="bg-white flex items-center justify-between px-1 py-1">
            <button
              onClick={decrementQuantity}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              disabled={quantity <= 1}
            >
              <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13H5v-2h14v2z"/>
              </svg>
            </button>
            
            <div className="flex-1 text-center">
              <span className="text-[#1B1A1B] font-bold text-sm">{quantity}</span>
            </div>
            
            <button
              onClick={incrementQuantity}
              className="p-2 text-[#1B1A1B] hover:text-gray-700 transition-colors"
            >
              <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button className="w-full bg-[#FBAC18] text-[#1B1A1B] font-normal text-base py-2 px-4 rounded mt-3 hover:bg-[#e69c15] transition-colors duration-200">
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
