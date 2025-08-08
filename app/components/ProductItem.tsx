import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';
import {useState} from 'react';
import {AddToCartButton} from './AddToCartButton';
import {useAside} from './Aside';
import { getMaxAddableQuantity } from '~/lib/inventory';
import { useRouteLoaderData } from 'react-router';
import type { RootLoader } from '~/root';

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
  const {open} = useAside();
  const rootData = useRouteLoaderData<RootLoader>('root');
  const cart = rootData?.cart as any;

  // Get the first available variant for add to cart
  const firstVariant = (product as any).variants?.nodes?.[0] || null;

  // Calculate maximum quantity that can be added
  const maxAddable = getMaxAddableQuantity(cart, firstVariant?.id, firstVariant);
  const maxQuantity = Math.max(1, maxAddable);

  const incrementQuantity = () => {
    if (quantity < maxQuantity) {
      setQuantity(prev => prev + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    open('cart');
  };

  return (
    <div className="product-item bg-white rounded-3xl overflow-hidden shadow-sm">
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
            className="block no-underline hover:no-underline"
            prefetch="intent"
            to={variantUrl}
          >
            <h3 className="text-[#1B1A1B] font-bold text-xl leading-tight mb-2 line-clamp-2 hover:text-[#FBAC18] transition-colors">
              {product.title}
            </h3>
            
            {/* Separator Line */}
            <div className="w-20 h-1 bg-[#FBAC18] mb-2"></div>
            
            {/* Price */}
            <div className="text-[#545354] text-sm font-normal">
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
          <div className="flex items-center border border-gray-300 rounded-md w-full">
            <button
              type="button"
              onClick={decrementQuantity}
              className="px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              disabled={quantity <= 1}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="flex-1 text-center py-2 text-sm font-medium">
              {quantity}
            </span>
            <button
              type="button"
              onClick={incrementQuantity}
              className="px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              disabled={quantity >= maxQuantity}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          {maxQuantity < 999 && (
            <p className="text-xs text-gray-500 mt-1 text-center">
              Only {maxQuantity} available
            </p>
          )}
        </div>

        {/* Add to Cart Button */}
        {firstVariant ? (
          <AddToCartButton
            lines={[
              {
                merchandiseId: firstVariant.id,
                quantity,
              },
            ]}
            onClick={handleAddToCart}
            disabled={!firstVariant.availableForSale || maxQuantity === 0}
          >
            <button className="w-full bg-[#FBAC18] text-[#1B1A1B] font-normal text-base py-2 px-4 rounded mt-3 hover:bg-[#e69c15] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
              {!firstVariant.availableForSale ? 'Sold out' : 
               maxQuantity === 0 ? 'No stock available' : 'ADD TO CART'}
            </button>
          </AddToCartButton>
        ) : (
          <button 
            onClick={handleAddToCart}
            disabled={true}
            className="w-full bg-[#FBAC18] text-[#1B1A1B] font-normal text-base py-2 px-4 rounded mt-3 hover:bg-[#e69c15] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Loading...
          </button>
        )}
      </div>
    </div>
  );
}
