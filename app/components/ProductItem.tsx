import { Link } from 'react-router';
import { Image, Money } from '@shopify/hydrogen';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import { useVariantUrl } from '~/lib/variants';
import { useState, useEffect } from 'react';
import { AddToCartButton } from './AddToCartButton';
import { useAside } from './Aside';
import { getMaxAddableQuantity } from '~/lib/inventory';
import { useRouteLoaderData, useFetcher } from 'react-router';
import type { RootLoader } from '~/root';

// ---------------------------------------------------------------------------
// Star icon that supports full, half, and empty states
// ---------------------------------------------------------------------------
const STAR_PATH =
  'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z';

function StarIcon({ fill }: { fill: 'full' | 'half' | 'empty' }) {
  const fillWidth =
    fill === 'full' ? '100%' : fill === 'half' ? '50%' : '0%';
  return (
    <span className="relative inline-block w-4 h-4 flex-shrink-0">
      {/* Gray base star */}
      <svg
        viewBox="0 0 20 20"
        className="w-4 h-4 absolute inset-0"
        fill="#D1D5DB"
        aria-hidden="true"
      >
        <path d={STAR_PATH} />
      </svg>
      {/* Gold overlay, clipped to fillWidth */}
      <span
        className="absolute inset-0 overflow-hidden"
        style={{ width: fillWidth }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 20 20" className="w-4 h-4" fill="#FBAC18">
          <path d={STAR_PATH} />
        </svg>
      </span>
    </span>
  );
}

function getStarFill(
  index: number,
  rating: number
): 'full' | 'half' | 'empty' {
  if (index < Math.floor(rating)) return 'full';
  if (index === Math.floor(rating) && rating % 1 >= 0.5) return 'half';
  return 'empty';
}

// ---------------------------------------------------------------------------
// ProductItem
// ---------------------------------------------------------------------------
export function ProductItem({
  product,
  loading,
  variant = 'default',
}: {
  product:
  | CollectionItemFragment
  | ProductItemFragment
  | RecommendedProductFragment;
  loading?: 'eager' | 'lazy';
  variant?: 'default' | 'collection';
}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  // Use fetcher so the request goes through the app and gets same loader context as product page
  const reviewsFetcher = useFetcher<{ stats?: { averageRating: number; totalReviews: number } }>();
  const productNumericId = product.id ? product.id.split('/').pop() ?? '' : '';

  // Fix hydration by only enabling interactions after mounting
  useEffect(() => {
    setMounted(true);
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load Judge.me review stats for this product (same API as product page)
  useEffect(() => {
    if (!productNumericId) return;
    reviewsFetcher.load(`/api/reviews/${productNumericId}`);
  }, [productNumericId]);

  // Derive review stats from fetcher data (null = loading, undefined stats = no data yet)
  const reviewStats =
    reviewsFetcher.data?.stats != null
      ? {
        averageRating: reviewsFetcher.data.stats.averageRating ?? 0,
        totalReviews: reviewsFetcher.data.stats.totalReviews ?? 0,
      }
      : null;

  const { open } = useAside();
  const rootData = useRouteLoaderData<RootLoader>('root');
  const cart = rootData?.cart as any;

  // Get the first available variant for add to cart
  const firstVariant = (product as any).variants?.nodes?.[0] || null;

  // Calculate maximum quantity that can be added
  const maxAddable = getMaxAddableQuantity(cart, firstVariant?.id, firstVariant);
  const maxQuantity = Math.max(1, maxAddable);

  // Image dimensions based on variant and screen size
  const imageHeight = windowWidth < 768
    ? '373px'
    : variant === 'collection'
      ? (windowWidth === 1024 ? '250px' : '450px')
      : '346px';
  const imageWidth = variant === 'collection' ? 'w-full max-w-[400px] mx-auto' : 'w-full';

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
    if (mounted) {
      open('cart');
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

  // Function to determine if a product is new
  const isNewProduct = (product: any) => {
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
    <>
      <div
        className="product-item bg-white rounded-3xl overflow-hidden shadow-sm group"
        onMouseEnter={() => mounted && setIsHovered(true)}
        onMouseLeave={() => mounted && setIsHovered(false)}
      >
        {/* Product Image Container */}
        <div className="relative">
          <Link
            className="block"
            prefetch="intent"
            to={variantUrl}
          >
            {image && (
              <div
                className={`${imageWidth} rounded-3xl overflow-hidden`}
                style={{ height: imageHeight }}
              >
                {variant === 'collection' ? (
                  <img
                    src={image.url}
                    alt={image.altText || product.title}
                    loading={loading === 'eager' ? 'eager' : 'lazy'}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    style={{ height: '100%', minHeight: imageHeight }}
                  />
                ) : (
                  <Image
                    alt={image.altText || product.title}
                    aspectRatio="1/1"
                    data={image}
                    loading={loading}
                    sizes="(min-width: 45em) 400px, 100vw"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
              </div>
            )}
          </Link>

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

          {/* NEW Badge */}
          {isNewProduct(product) && (
            <div className="absolute top-2 left-2 bg-[#FBAC18] text-white text-xs font-bold px-3 py-1 rounded-lg">
              NEW!
            </div>
          )}
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

          {/* Star Rating - Dynamic from Judge.me */}
          <div className="flex flex-wrap items-center gap-2 mt-2" aria-label={
            reviewStats === null
              ? 'Loading rating'
              : reviewStats.totalReviews > 0
                ? `${reviewStats.averageRating.toFixed(1)} out of 5, ${reviewStats.totalReviews} reviews`
                : 'No reviews yet'
          }>
            <div className="flex gap-0.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <StarIcon
                  key={i}
                  fill={
                    reviewStats === null
                      ? 'empty'
                      : getStarFill(i, reviewStats.averageRating)
                  }
                />
              ))}
            </div>
            <span className="text-[#1B1A1B] text-sm">
              {reviewStats === null
                ? ''
                : reviewStats.totalReviews > 0
                  ? `${reviewStats.averageRating.toFixed(1)} (${reviewStats.totalReviews})`
                  : 'No reviews yet'}
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="mt-3">
            <div className="flex items-center rounded-md w-full">
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
              <button className="w-full bg-[#FBAC18] text-[#1B1A1B] font-normal text-base py-2 px-4 rounded mt-3 hover:bg-[#e69c15] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                {!firstVariant.availableForSale ? 'Sold out' :
                  maxQuantity === 0 ? 'No stock available' : 'ADD TO CART'}
              </button>
            </AddToCartButton>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={!mounted}
              className="w-full bg-[#FBAC18] text-[#1B1A1B] font-normal text-base py-2 px-4 rounded mt-3 hover:bg-[#e69c15] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                      <path d="M19 13H5v-2h14v2z" />
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
