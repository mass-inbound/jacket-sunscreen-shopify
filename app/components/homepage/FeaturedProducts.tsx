import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Image, Money } from '@shopify/hydrogen';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import { AddToCartButton } from '../AddToCartButton';
import { useAside } from '../Aside';
import { getMaxAddableQuantity } from '~/lib/inventory';
import { useRouteLoaderData } from 'react-router';
import type { RootLoader } from '~/root';

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
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { open } = useAside();
  const rootData = useRouteLoaderData<RootLoader>('root');
  const cart = rootData?.cart as any;
  const image = product.featuredImage;
  const price = product.priceRange?.minVariantPrice;
  
  // Get the first available variant for add to cart
  const firstVariant = (product as any).variants?.nodes?.[0] || null;

  // Calculate maximum quantity that can be added
  const maxAddable = getMaxAddableQuantity(cart, firstVariant?.id, firstVariant);
  const maxQuantity = Math.max(1, maxAddable);

  const handleAddToCart = () => {
    open('cart');
  };

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

  const handleQuickView = () => {
    setIsModalOpen(true);
  };

  const handleModalAddToCart = () => {
    open('cart');
  };

  return (
    <>
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
              <button
                onClick={handleQuickView}
                className="bg-[#FBAC18] text-black w-full text-center py-4 font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
              >
                QUICK VIEW
              </button>
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
          
          {/* Quantity Selector */}
          {/* <div className="mb-3">
            <div className="flex items-center justify-center border border-gray-300 rounded-md mx-auto w-24">
              <button
                onClick={decrementQuantity}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                disabled={quantity <= 1}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 13H5v-2h14v2z"/>
                </svg>
              </button>
              
              <div className="flex-1 text-center">
                <span className="text-[#1B1A1B] font-bold text-sm">{quantity}</span>
              </div>
              
              <button
                onClick={incrementQuantity}
                className="p-2 text-[#1B1A1B] hover:text-gray-700 transition-colors"
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
          </div> */}
          
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
              <button className="w-full bg-[#FBAC18] text-white font-bold py-2 px-4 rounded text-sm md:text-base hover:bg-[#e69b15] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                {!firstVariant.availableForSale ? 'Sold out' : 
                 maxQuantity === 0 ? 'No stock available' : 'ADD TO CART'}
              </button>
            </AddToCartButton>
          ) : (
            <button 
              onClick={handleAddToCart}
              disabled={true}
              className="w-full bg-[#FBAC18] text-white font-bold py-2 px-4 rounded text-sm md:text-base hover:bg-[#e69b15] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Loading...
            </button>
          )}
        </div>
      </div>

      {/* Quick View Modal */}
      {isModalOpen && (
        <QuickViewModal 
          product={product}
          firstVariant={firstVariant}
          quantity={quantity}
          maxQuantity={maxQuantity}
          onClose={() => setIsModalOpen(false)}
          onAddToCart={handleModalAddToCart}
          onIncrementQuantity={incrementQuantity}
          onDecrementQuantity={decrementQuantity}
        />
      )}
    </>
  );
}

function QuickViewModal({ 
  product, 
  firstVariant, 
  quantity, 
  maxQuantity, 
  onClose, 
  onAddToCart,
  onIncrementQuantity,
  onDecrementQuantity
}: {
  product: ProductItemFragment | CollectionItemFragment | RecommendedProductFragment;
  firstVariant: any;
  quantity: number;
  maxQuantity: number;
  onClose: () => void;
  onAddToCart: () => void;
  onIncrementQuantity: () => void;
  onDecrementQuantity: () => void;
}) {
  const image = product.featuredImage;
  const price = product.priceRange?.minVariantPrice;
  const { open, type } = useAside();
  
  // Auto-close modal when cart opens
  useEffect(() => {
    if (type === 'cart') {
      onClose();
    }
  }, [type, onClose]);
  
  // Generate SKU from product handle or variant
  const sku = firstVariant?.sku || `${product.handle?.toUpperCase().replace(/-/g, '')}-01` || 'SKU-N/A';

  // Handle add to cart: just open cart sidebar like all other handleAddToCart functions
  const handleModalAddToCart = () => {
    open('cart');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          ×
        </button>
        
        <div className="flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="md:w-1/2 p-6">
            {image && (
              <Image
                alt={image.altText || product.title}
                aspectRatio="1/1"
                data={image}
                loading="lazy"
                sizes="(min-width: 45em) 400px, 100vw"
                className="w-full h-full object-cover rounded-lg"
              />
            )}
          </div>
          
          {/* Product Details */}
          <div className="md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              {/* Product Title */}
              <h2 className="text-2xl md:text-3xl font-bold text-[#FBAC18] mb-4">
                {product.title}
              </h2>
              
              {/* Price */}
              <div className="mb-4">
                {price && (
                  <Money 
                    data={price} 
                    className="text-2xl font-bold text-[#1B1A1B]"
                  />
                )}
              </div>
              
              {/* SKU */}
              <div className="mb-6">
                <span className="text-sm text-gray-600">SKU: {sku}</span>
              </div>
              
              {/* Quantity Selector */}
              <div className="mb-6">
                <div className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity *
                </div>
                <div className="flex items-center border border-gray-300 rounded-md w-32">
                  <button
                    onClick={onDecrementQuantity}
                    className="p-3 text-gray-500 hover:text-gray-700 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 13H5v-2h14v2z"/>
                    </svg>
                  </button>
                  
                  <div className="flex-1 text-center">
                    <span className="text-[#1B1A1B] font-bold">{quantity}</span>
                  </div>
                  
                  <button
                    onClick={onIncrementQuantity}
                    className="p-3 text-[#1B1A1B] hover:text-gray-700 transition-colors"
                    disabled={quantity >= maxQuantity}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                {maxQuantity < 999 && (
                  <p className="text-xs text-gray-500 mt-1">
                    Only {maxQuantity} available
                  </p>
                )}
              </div>
            </div>
            
            {/* Buttons */}
            <div className="space-y-4">
              {/* Add to Cart Button */}
              {firstVariant ? (
                <AddToCartButton
                  lines={[
                    {
                      merchandiseId: firstVariant.id,
                      quantity,
                    },
                  ]}
                  onClick={handleModalAddToCart}
                  disabled={!firstVariant.availableForSale || maxQuantity === 0}
                >
                  <button className="w-full bg-[#FBAC18] text-white font-bold py-3 px-6 rounded text-lg hover:bg-[#e69b15] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                    {!firstVariant.availableForSale ? 'Sold out' : 
                     maxQuantity === 0 ? 'No stock available' : 'ADD TO CART'}
                  </button>
                </AddToCartButton>
              ) : (
                <button 
                  disabled={true}
                  className="w-full bg-[#FBAC18] text-white font-bold py-3 px-6 rounded text-lg hover:bg-[#e69b15] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Loading...
                </button>
              )}
              
              {/* View More Details Link */}
              <div className="text-center">
                <Link
                  to={`/products/${product.handle}`}
                  className="text-[#FBAC18] font-medium hover:underline"
                  onClick={onClose}
                >
                  View More Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 