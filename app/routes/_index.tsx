import { type LoaderFunctionArgs } from 'react-router';
import {
  Await,
  useLoaderData,
  Link,
  type MetaFunction,
  useRouteLoaderData,
} from 'react-router';
import { Suspense } from 'react';
import { Image, Money } from '@shopify/hydrogen';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import { ProductItem } from '~/components/ProductItem';
import {
  Hero,
  FeaturedProducts,
  InfoTabsSection,
  ComparisonChart,
  TabsSection,
  CTASection,
  HomePageLayout,
  SalePopup,
  RegionBar,
  CookiePreferencesModal,
  ContentSections,
  ImageGallery,
  OverlaySection,
} from '~/components/homepage';
import { PGAPartner } from '~/components/homepage/PGAPartner';
import type { RootLoader } from '~/root';
import { useFirstVisit } from '~/hooks/useFirstVisit';

export const meta: MetaFunction = () => {
  return [{ title: 'Jacket Sunscreen | Premium Sun Protection' }];
};

export async function loader(args: LoaderFunctionArgs) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return { ...deferredData, ...criticalData };
}

async function loadCriticalData({ context }: LoaderFunctionArgs) {
  try {
    const [{ collections }, featuredProductsCollection] = await Promise.all([
      context.storefront.query(FEATURED_COLLECTION_QUERY),
      context.storefront.query(FEATURED_PRODUCTS_COLLECTION_QUERY),
    ]);

    return {
      featuredCollection: collections?.nodes?.[0] ?? null,
      featuredProducts:
        featuredProductsCollection?.collection?.products?.nodes ?? [],
    };
  } catch (error) {
    console.error('Error loading critical data on home page:', error);
    return {
      featuredCollection: null,
      featuredProducts: [],
    };
  }
}

function loadDeferredData({ context }: LoaderFunctionArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      console.error('Recommended products error:', error instanceof Error ? error.message : error);
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
    showCookieModal,
    closePopup,
    openPopup,
    closeRegionBar,
    acceptCookies,
    declineAllCookies,
    showSettings,
    closeCookieModal,
    saveCookiePreferences,
    cookiePreferences,
  } = useFirstVisit();

  const tabs = [
    {
      id: 'all',
      label: 'All Products',
      content: <RecommendedProducts products={data.recommendedProducts} />,
    },
    {
      id: 'sunscreen',
      label: 'Sunscreen',
      content: (
        <div className="text-center py-8">
          Sunscreen products coming soon...
        </div>
      ),
    },
    {
      id: 'skincare',
      label: 'Skincare',
      content: (
        <div className="text-center py-8">Skincare products coming soon...</div>
      ),
    },
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <Hero />

      {/* Task 3: Tabs Section — between hero and products */}
      <TabsSection tabs={tabs} />

      {/* Featured Products Section */}
      <FeaturedProducts products={data.featuredProducts} />

      {/* Info Tabs Section */}
      <InfoTabsSection />

      {/* Task 4: Product Line Image */}
      <div className="w-full">
        <img
          src="/images/Products%20BCKGD.png"
          alt="Jacket product lineup"
          className="w-full h-auto"
        />
      </div>

      {/* Comparison Chart */}
      <ComparisonChart />

      {/* PGA Partner Section */}
      <PGAPartner />

      {/* Image Gallery */}
      <ImageGallery />

      {/* CTA Section */}
      <CTASection />

      {/* Sale Popup */}
      <SalePopup isVisible={showPopup} onClose={closePopup} />

      {/* Region Bar */}
      <RegionBar
        isVisible={showRegionBar}
        onClose={closeRegionBar}
        onAccept={acceptCookies}
        onDeclineAll={declineAllCookies}
        onShowSettings={showSettings}
      />

      {/* Cookie Preferences Modal */}
      <CookiePreferencesModal
        isVisible={showCookieModal}
        onClose={closeCookieModal}
        onSave={saveCookiePreferences}
        currentPreferences={cookiePreferences}
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
      <Suspense
        fallback={
          <div className="text-center py-4 md:py-6 lg:py-8">
            Loading products...
          </div>
        }
      >
        <Await resolve={products}>
          {(response) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 px-4 md:px-6 lg:px-8">
              {response ? (
                response.products.nodes.map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center py-4 md:py-6 lg:py-8 text-sm md:text-base">
                  No products available
                </div>
              )}
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

const FEATURED_PRODUCTS_COLLECTION_QUERY = `#graphql
  fragment FeaturedProduct on Product {
    id
    title
    handle
    tags
    createdAt
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
        price {
          amount
          currencyCode
        }
      }
    }
  }
  query FeaturedProductsCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collection(handle: "featured-products") {
      id
      title
      handle
      products(first: 50) {
        nodes {
          ...FeaturedProduct
        }
      }
    }
  }
` as const;

const FEATURED_PRODUCTS_QUERY = `#graphql
  fragment FeaturedProduct on Product {
    id
    title
    handle
    tags
    createdAt
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
        price {
          amount
          currencyCode
        }
      }
    }
  }
  query FeaturedProducts($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 50, sortKey: UPDATED_AT, reverse: true) {
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
    variants(first: 1) {
      nodes {
        id
        availableForSale
        price {
          amount
          currencyCode
        }
      }
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