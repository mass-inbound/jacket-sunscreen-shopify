import React, { useState, useEffect } from 'react';
import { Link, useRouteLoaderData } from 'react-router';
import { Image, Money } from '@shopify/hydrogen';
import type { 
  ProductItemFragment, 
  CollectionItemFragment, 
  RecommendedProductFragment 
} from 'storefrontapi.generated';
import { AddToCartButton } from '~/components/AddToCartButton';
import { useAside } from '~/components/Aside';
import { getMaxAddableQuantity } from '~/lib/inventory';
import type { RootLoader } from '~/root';

interface FeaturedProductsProps {
  products?: (ProductItemFragment | CollectionItemFragment | RecommendedProductFragment)[];
}

export function FeaturedProducts({
  products = []
}: FeaturedProductsProps) {
  // Function to determine if a product is new
  const isNewProduct = (product: any) => {
    // Only check if product has "new" related tags - no automatic detection
    if (product.tags && product.tags.some((tag: string) => 
      tag.toLowerCase().includes('new') || 
      tag.toLowerCase().includes('arrival') ||
      tag.toLowerCase().includes('latest')
    )) {
      return true;
    }
    
    return false;
  };

  return (
    <section className="py-8 md:py-12 lg:py-16 px-6 md:px-8 lg:px-9">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12 lg:mb-16 text-gray-900">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} isNew={isNewProduct(product)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ 
  product, 
  isNew 
}: { 
  product: ProductItemFragment | CollectionItemFragment | RecommendedProductFragment;
  isNew: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Fix hydration by only enabling interactions after mounting
  useEffect(() => {
    setMounted(true);
  }, []);
  
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
    if (mounted) {
      open('cart');
    }
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
    if (mounted) {
      setIsModalOpen(true);
    }
  };

  const handleModalAddToCart = () => {
    if (mounted) {
      open('cart');
    }
  };

  // Don't render hover effects or modals until mounted
  const showHoverEffects = mounted && isHovered;
  const showModal = mounted && isModalOpen;

  return (
    <>
      <div 
        className="relative group flex flex-col"
        onMouseEnter={() => mounted && setIsHovered(true)}
        onMouseLeave={() => mounted && setIsHovered(false)}
      >
        {/* Product Image Container */}
        <div className="relative overflow-hidden  mb-4 flex-shrink-0" style={{ height: '425px', width: '319px', maxWidth: '100%', margin: '0 auto' }}>
          {image && (
            <Link to={`/products/${product.handle}`} className="block w-full h-full">
              <Image
                alt={image.altText || product.title}
                aspectRatio="3/4"
                data={image}
                loading="lazy"
                sizes="(min-width: 45em) 319px, 100vw"
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          )}
          
          {/* Quick View Overlay - Only covers bottom area */}
          {showHoverEffects && (
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center pb-6 transition-opacity duration-300 pointer-events-none">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleQuickView();
                }}
                className="bg-[#FBAC18] text-black w-full text-center py-4 font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg pointer-events-auto"
                type="button"
              >
                QUICK VIEW
              </button>
            </div>
          )}
        </div>

        {/* NEW Tag - appears between image and product info */}
        {isNew && (
          <div className="flex justify-center mb-3">
            <span className="bg-[#FBAC18] mt-1 text-white font-bold px-4 py-1 text-xs rounded-none">
              NEW!
            </span>
          </div>
        )}

        {/* Product Info */}
        <div className="text-center px-4 flex-1 flex flex-col justify-between">
          <div>
            {/* Product Title */}
            <Link 
              to={`/products/${product.handle}`}
              className="block mb-3 no-underline hover:no-underline"
            >
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 hover:text-[#FBAC18] transition-colors relative pb-2">
                {product.title}
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[25px] h-[2px] bg-black"></span>
              </h3>
            </Link>
            
            {/* Price */}
            {price && (
              <div className="mb-4">
                <Money data={price} className="text-base md:text-lg font-bold text-[#545354]" />
              </div>
            )}
          </div>
          
          {/* Add to Cart Button */}
          {firstVariant && mounted ? (
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
              <button className="w-[50%] bg-[#FBAC18] text-black font-bold py-2 px-4 rounded text-sm md:text-base hover:bg-[#e69b15] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                {!firstVariant.availableForSale ? 'Sold out' : 
                 maxQuantity === 0 ? 'No stock available' : 'ADD TO CART'}
              </button>
            </AddToCartButton>
          ) : (
            <button 
              onClick={handleAddToCart}
              disabled={!mounted}
              className="w-full bg-[#FBAC18] text-white font-bold py-2 px-4 rounded text-sm md:text-base hover:bg-[#e69b15] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {!mounted ? 'Loading...' : 'ADD TO CART'}
            </button>
          )}
        </div>
      </div>

      {/* Quick View Modal */}
      {showModal && (
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

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  
  // Generate SKU from product handle or variant
  const sku = firstVariant?.sku || `${product.handle?.toUpperCase().replace(/-/g, '')}-01` || 'SKU-N/A';

  // Handle add to cart: just open cart sidebar like all other handleAddToCart functions
  const handleModalAddToCart = () => {
    open('cart');
  };

  // Handle background click to close modal
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      style={{ zIndex: 9999 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
    >
      {/* Background overlay that closes modal */}
      <button
        className="absolute inset-0 w-full h-full bg-transparent border-none cursor-default"
        onClick={onClose}
        aria-label="Close quick view"
        type="button"
      />
      
      <div 
        className="bg-white rounded-none max-w-4xl w-full max-h-[90vh] overflow-hidden relative z-10"
        role="document"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 text-2xl w-12 h-12 flex items-center justify-center transition-colors"
          aria-label="Close quick view"
          type="button"
        >
          ×
        </button>
        
        <div className="flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="md:w-1/2 p-6">
            {image && (
              <Image
                alt={image.altText || product.title}
                aspectRatio="3/4"
                data={image}
                loading="lazy"
                sizes="(min-width: 45em) 400px, 100vw"
                className="w-full h-full object-contain rounded-lg"
              />
            )}
          </div>
          
          {/* Product Details */}
          <div className="md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              {/* Product Title */}
              <h2 
                id="quick-view-title"
                className="text-2xl md:text-3xl font-bold text-[#FBAC18] mb-4"
              >
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
                    className="p-3 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={quantity <= 1}
                    type="button"
                    aria-label="Decrease quantity"
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
                    className="p-3 text-[#1B1A1B] hover:text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={quantity >= maxQuantity}
                    type="button"
                    aria-label="Increase quantity"
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
                  <button 
                    className="w-full bg-[#FBAC18] text-black font-bold py-3 px-6 rounded text-lg hover:bg-[#e69b15] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    type="button"
                  >
                    {!firstVariant.availableForSale ? 'Sold out' : 
                     maxQuantity === 0 ? 'No stock available' : 'ADD TO CART'}
                  </button>
                </AddToCartButton>
              ) : (
                <button 
                  disabled={true}
                  className="w-full bg-[#FBAC18] text-white font-bold py-3 px-6 rounded text-lg hover:bg-[#e69b15] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  type="button"
                >
                  Loading...
                </button>
              )}
              
              {/* View More Details Link */}
              <div className="text-center">
                <Link
                  to={`/products/${product.handle}`}
                  className="text-[#FBAC18] font-medium hover:no-underline"
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