import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import { Await, useLoaderData, Link, type MetaFunction, useRouteLoaderData } from 'react-router';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import {ProductItem} from '~/components/ProductItem';
import {
  Hero,
  FeaturedProducts,
  TabsSection,
  CTASection,
  HomePageLayout,
  SalePopup,
  RegionBar,
  ContentSections,
  ImageGallery,
  OverlaySection
} from '~/components/homepage';
import { PGAPartner } from '~/components/homepage/PGAPartner';
import type { RootLoader } from '~/root';
import { useFirstVisit } from '~/hooks/useFirstVisit';

export const meta: MetaFunction = () => {
  return [{title: 'Jacket Sunscreen | Premium Sun Protection'}];
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
async function loadCriticalData({context}: LoaderFunctionArgs) {
  const [{collections}, {products}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    context.storefront.query(FEATURED_PRODUCTS_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
    featuredProducts: products.nodes,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  const rootData = useRouteLoaderData<RootLoader>('root');
  const {
    showPopup,
    showRegionBar,
    closePopup,
    closeRegionBar,
    acceptAllCookies,
    managePreferences,
  } = useFirstVisit();
  
  // Sample tabs data - you can customize this based on your needs
  const tabs = [
    {
      id: 'all',
      label: 'All Products',
      content: <RecommendedProducts products={data.recommendedProducts} />
    },
    {
      id: 'sunscreen',
      label: 'Sunscreen',
      content: <div className="text-center py-8">Sunscreen products coming soon...</div>
    },
    {
      id: 'skincare',
      label: 'Skincare',
      content: <div className="text-center py-8">Skincare products coming soon...</div>
    }
  ];

  return (
    <div className="homepage">
      {/* Header */}
      {/* <Header /> */}
      
      {/* Hero Section */}
      <Hero />
      
      {/* PGA Partner Section */}
      <PGAPartner />
      
      {/* Featured Products Section */}
      <FeaturedProducts 
        title="Featured Products"
        products={data.featuredProducts}
      />
      
      {/* Content Sections */}
      <ContentSections />
      
      {/* Image Gallery */}
      <ImageGallery />
      
      {/* Overlay Section */}
      <OverlaySection />
      
      {/* Tabs Section */}
      <TabsSection 
        title="Learn More About JACKET"
        tabs={tabs}
      />
      
      {/* CTA Section */}
      <CTASection />

      {/* Sale Popup */}
      <SalePopup 
        isVisible={showPopup}
        onClose={closePopup}
      />

      {/* Region Bar */}
      <RegionBar 
        isVisible={showRegionBar}
        onClose={closeRegionBar}
        onAcceptAll={acceptAllCookies}
        onManagePreferences={managePreferences}
      />
    </div>
  );
}

function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery | null>;
}) {
  return (
    <div className="recommended-products">
      <Suspense fallback={<div className="text-center py-8">Loading products...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-8">
              {response
                ? response.products.nodes.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))
                : <div className="text-center py-8">No products available</div>}
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const FEATURED_PRODUCTS_QUERY = `#graphql
  fragment FeaturedProduct on Product {
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
  }
  query FeaturedProducts($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 6, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedProduct
      }
    }
  }
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
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
