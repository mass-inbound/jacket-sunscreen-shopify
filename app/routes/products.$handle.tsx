import {redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import { useLoaderData, type MetaFunction, Link } from 'react-router';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import {ProductPrice} from '~/components/ProductPrice';
import {ProductImage} from '~/components/ProductImage';
import {AddToCartButton} from '~/components/AddToCartButton';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import { useState } from 'react';
import { useAside } from '~/components/Aside';
import { getMaxAddableQuantity } from '~/lib/inventory';
import { useRouteLoaderData } from 'react-router';
import type { RootLoader } from '~/root';
import { ProductItem } from '~/components/ProductItem';
import { Suspense } from 'react';
import { Await } from 'react-router';
import { RecommendedProductItem } from '~/components/RecommendedProductItem';
import { ImageZoomModal } from '~/components/ImageZoomModal';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [
    {title: `${data?.product.title ?? ''} | Jacket Sunscreen`},
    {
      rel: 'canonical',
      href: `/products/${data?.product.handle}`,
    },
  ];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({
  context,
  params,
  request,
}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{product}] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {handle, selectedOptions: getSelectedProductOptions(request)},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, {handle, data: product});

  return {
    product,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context, params}: LoaderFunctionArgs) {
  // Fetch 10 recommended products
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      console.error(error);
      return null;
    });
  return { recommendedProducts };
}

export default function Product() {
  const {product} = useLoaderData<typeof loader>();
  const [quantity, setQuantity] = useState(1);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const {open} = useAside();
  const rootData = useRouteLoaderData<RootLoader>('root');
  const cart = rootData?.cart as any;
  const { recommendedProducts } = useLoaderData<typeof loader>();

  // Optimistically selects a variant with given available variant information
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  // Sets the search param to the selected variant without navigation
  // only when no search params are set in the url
  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  // Get the product options array
  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const {title, descriptionHtml} = product;

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Calculate maximum quantity that can be added
  const maxAddable = getMaxAddableQuantity(cart, selectedVariant?.id, selectedVariant);
  const maxQuantity = Math.max(1, maxAddable);

  const handleQuantityChange = (newQuantity: number) => {
    const clampedQuantity = Math.max(1, Math.min(newQuantity, maxQuantity));
    setQuantity(clampedQuantity);
  };

  const handleAddToCart = () => {
    open('cart');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-[#FBAC18] transition-colors">
            Home
          </Link>
          <span> / </span>
          <span className="text-gray-400">{title}</span>
        </div>
      </nav>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image Gallery */}
          <div className="space-y-6">
            <div className="relative group">
              <div 
                className="aspect-square overflow-hidden rounded-lg bg-gray-100 cursor-pointer"
                onClick={() => setIsZoomModalOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setIsZoomModalOpen(true);
                  }
                }}
                aria-label="Click to zoom product image"
              >
                <ProductImage 
                  image={selectedVariant?.image} 
                />
              </div>
              {/* Zoom Button */}
              <button 
                className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
                onClick={() => setIsZoomModalOpen(true)}
                aria-label="Zoom image"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </button>
            </div>

            {/* Product Description - Moved here below the image */}
            <div className="prose prose-sm text-gray-600 leading-relaxed">
              <div dangerouslySetInnerHTML={{__html: descriptionHtml}} />
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Product Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                {title}
              </h1>
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#FBAC18]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">5.0 | 1 review</span>
            </div>

            {/* SKU */}
            <div className="text-sm text-gray-500">
              SKU: {selectedVariant?.sku || 'JKT-SNSCRN-01'}
            </div>

            {/* Price */}
            <div className="text-xl font-semibold text-gray-900">
        <ProductPrice
          price={selectedVariant?.price}
          compareAtPrice={selectedVariant?.compareAtPrice}
        />
            </div>

            {/* Add to Cart Section */}
            <div className="space-y-4">
              {/* Quantity Selector */}
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity <span className="text-red-500">*</span>
                </div>
                <div className="flex items-center border border-gray-300 rounded-md w-24">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(quantity - 1)}
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
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
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

              {/* Add to Cart Button */}
              <AddToCartButton
                disabled={!selectedVariant?.availableForSale || maxQuantity === 0}
                onClick={handleAddToCart}
                lines={[
                  {
                    merchandiseId: selectedVariant?.id,
                    quantity,
                  },
                ]}
              >
                <button className="w-full bg-[#FBAC18] text-white font-bold py-3 px-6 rounded-md hover:bg-[#e69b15] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {!selectedVariant?.availableForSale ? 'Sold out' : 
                   maxQuantity === 0 ? 'No stock available' : 'ADD TO CART'}
                </button>
              </AddToCartButton>

              {/* Wishlist Button */}
              {/* <button className="w-12 h-12 border border-[#FBAC18] rounded-full flex items-center justify-center hover:bg-[#FBAC18] hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button> */}
            </div>

            {/* Collapsible Sections */}
            <div className="space-y-4">
              {/* How to Use */}
              <div className="border-b border-[#FBAC18] pb-4">
                <button
                  onClick={() => toggleSection('howToUse')}
                  className="flex items-center justify-between w-full text-left font-bold text-lg"
                >
                  HOW TO USE
                  <svg 
                    className={`w-5 h-5 transform transition-transform ${expandedSections.howToUse ? 'rotate-45' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                {expandedSections.howToUse && (
                  <div className="mt-4 text-gray-600">
                    <p>Apply liberally 15 minutes before sun exposure. Reapply at least every 2 hours, after swimming, sweating, or towel drying.</p>
                  </div>
                )}
              </div>

              {/* Ingredients */}
              <div className="border-b border-[#FBAC18] pb-4">
                <button
                  onClick={() => toggleSection('ingredients')}
                  className="flex items-center justify-between w-full text-left font-bold text-lg"
                >
                  INGREDIENTS
                  <svg 
                    className={`w-5 h-5 transform transition-transform ${expandedSections.ingredients ? 'rotate-45' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                {expandedSections.ingredients && (
                  <div className="mt-4 text-gray-600">
                    <p>Active Ingredients: Zinc Oxide 20%, Octinoxate 7.5%, Octisalate 5%, Avobenzone 3%, Octocrylene 2%</p>
                    <p className="mt-2">Inactive Ingredients: Water, Glycerin, Cetearyl Alcohol, Dimethicone, and other natural ingredients.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center space-x-4">
              <a href="https://x.com/JACKET_SPF" target="_blank" rel="noopener noreferrer" className="w-6 h-6 text-[#107FEA] hover:opacity-80 transition-opacity flex items-center justify-center">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="https://www.pinterest.com/jacketsunscreen" target="_blank" rel="noopener noreferrer" className="w-6 h-6 text-[#E81627] hover:opacity-80 transition-opacity flex items-center justify-center">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/jacketsunscreen/" target="_blank" rel="noopener noreferrer" className="w-6 h-6 text-[#1BC149] hover:opacity-80 transition-opacity flex items-center justify-center">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/JacketSunscreenOfficial" target="_blank" rel="noopener noreferrer" className="w-6 h-6 text-black hover:opacity-80 transition-opacity flex items-center justify-center">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Reviews Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Reviews</h2>
              <button className="border border-[#FBAC18] text-[#FBAC18] px-8 py-3 rounded-md hover:bg-[#FBAC18] hover:text-white transition-colors font-medium">
                Leave a Review
              </button>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-[#FBAC18]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-2xl font-bold text-gray-900">5.0</span>
                </div>
                <span className="text-gray-600">Based on 1 review</span>
              </div>
              {/* Rating Breakdown */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center space-x-3">
                    <span className="text-xs text-gray-600 w-12 text-right">
                      {stars} {stars === 1 ? 'star' : 'stars'}
                    </span>
                    <div className="w-44 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#FBAC18] h-2 rounded-full" 
                        style={{ 
                          width: stars === 5 ? '100%' : '0%',
                          opacity: stars === 5 ? 1 : 0.2
                        }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 w-4 text-left">
                      {stars === 5 ? '1' : '0'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Filter & Sort Section */}
          <div className="flex items-center justify-between py-4 border-b border-gray-300">
            <span className="text-gray-600">1 review</span>
            <div className="flex items-center space-x-4">
              {/* Filter Dropdown */}
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#FBAC18] focus:border-transparent">
                  <option>Filter by rating: All stars</option>
                  <option>5 stars only</option>
                  <option>4 stars only</option>
                  <option>3 stars only</option>
                  <option>2 stars only</option>
                  <option>1 star only</option>
                </select>
                <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {/* Sort Dropdown */}
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#FBAC18] focus:border-transparent">
                  <option>Sort by: Most Relevant</option>
                  <option>Newest First</option>
                  <option>Oldest First</option>
                  <option>Highest Rated</option>
                  <option>Lowest Rated</option>
                </select>
                <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Review List */}
          <div className="space-y-6 mt-6">
            <div className="bg-white p-6 rounded-lg">
              {/* Review Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">Maria Armendariz</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">3 days ago</span>
                </div>
                
                {/* Verified Badge */}
                <div className="flex items-center space-x-2 bg-[#FBAC18] bg-opacity-20 rounded-xl px-3 py-1">
                  <svg className="w-4 h-4 text-[#FBAC18]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-[#FBAC18] font-medium">Verified</span>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#FBAC18]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Review Title */}
              <h3 className="font-bold text-xl text-gray-900 mb-4">Jacket spf sunscreen</h3>

              {/* Review Text */}
              <p className="text-gray-600 leading-relaxed mb-6">
                I&apos;ve been using this sunscreen for a few weeks now, and I&apos;m genuinely impressed. Not only does it provide strong sun protection, but it also has anti-aging properties that make a real difference in how my skin looks and feels. Highly recommend for anyone looking for a multitasking product that protects and improves your skin at the same time!
              </p>

              {/* Helpful Section */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Was this helpful?</span>
                <button className="flex items-center space-x-2 text-[#FBAC18] hover:text-[#e69b15] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  <span>Yes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Recommendations */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
          <div className="relative">
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 hover:bg-gray-100"
              onClick={() => {
                document.getElementById('recommend-scroll')?.scrollBy({ left: -400, behavior: 'smooth' });
              }}
              aria-label="Scroll left"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <Suspense fallback={<div className="text-center py-8">Loading products...</div>}>
              <Await resolve={recommendedProducts}>
                {(response) => (
                  <div
                    id="recommend-scroll"
                    className="flex overflow-x-auto gap-6 hide-scrollbar scroll-smooth px-8"
                    style={{ scrollBehavior: 'smooth' }}
                  >
                    {response && response.products && response.products.nodes.length > 0 ? (
                      response.products.nodes.map((product: any) => (
                        <div key={product.id} className="min-w-[260px] max-w-[280px] flex-shrink-0">
                          <RecommendedProductItem product={product} />
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">No products available</div>
                    )}
                  </div>
                )}
              </Await>
            </Suspense>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 hover:bg-gray-100"
              onClick={() => {
                document.getElementById('recommend-scroll')?.scrollBy({ left: 400, behavior: 'smooth' });
              }}
              aria-label="Scroll right"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />

      <ImageZoomModal
        isOpen={isZoomModalOpen}
        onClose={() => setIsZoomModalOpen(false)}
        image={selectedVariant?.image}
      />
    </div>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
    quantityAvailable
  }
` as const;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    encodedVariantExistence
    encodedVariantAvailability
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
    variants(first: 1) {
      nodes {
        id
        availableForSale
        quantityAvailable
        price {
          amount
          currencyCode
        }
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 10, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
