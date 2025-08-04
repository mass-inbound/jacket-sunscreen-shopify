import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, useSearchParams, type MetaFunction} from 'react-router';
import {getPaginationVariables, Image, Money} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {ProductItem} from '~/components/ProductItem';
import {ProductFilter} from '~/components/ProductFilter';
import type {CatalogQuery} from 'storefrontapi.generated';

export const meta: MetaFunction<typeof loader> = () => {
  return [{title: `Hydrogen | Products`}];
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
async function loadCriticalData({context, request}: LoaderFunctionArgs) {
  const {storefront} = context;
  const url = new URL(request.url);
  const productTypes = url.searchParams.getAll('product_type');
  
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  // Build filter query using the correct Shopify syntax
  let query = '';
  if (productTypes.length > 0) {
    const typeFilters = productTypes.map(type => `product_type:${type}`).join(' OR ');
    query = `(${typeFilters})`;
  }

  const [{products}, {productTypes: availableProductTypes}] = await Promise.all([
    storefront.query(CATALOG_QUERY, {
      variables: {
        ...paginationVariables,
        query: query || undefined,
      },
    }),
    storefront.query(PRODUCT_TYPES_QUERY, {
      variables: {},
    }),
  ]);
  
  return {
    products,
    availableProductTypes: availableProductTypes?.nodes || [],
    selectedProductTypes: productTypes,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  return {};
}

export default function Collection() {
  const {products, availableProductTypes, selectedProductTypes} = useLoaderData<typeof loader>();

  return (
    <div className="collections-page px-8 pt-2">
      <ProductFilter 
        productTypes={availableProductTypes}
        selectedTypes={selectedProductTypes}
      />
      
      <div className="collections-content">
       
        
        <PaginatedResourceSection
          connection={products}
          resourcesClassName="products-grid"
        >
          {({node: product, index}) => (
            <ProductItem
              key={product.id}
              product={product as CatalogQuery['products']['nodes'][0]}
              loading={index < 8 ? 'eager' : undefined}
            />
          )}
        </PaginatedResourceSection>
      </div>
    </div>
  );
}

const COLLECTION_ITEM_FRAGMENT = `#graphql
  fragment MoneyCollectionItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment CollectionItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyCollectionItem
      }
      maxVariantPrice {
        ...MoneyCollectionItem
      }
    }
  }
` as const;

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/product
const CATALOG_QUERY = `#graphql
  query Catalog(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
    $query: String
  ) @inContext(country: $country, language: $language) {
    products(
      first: $first, 
      last: $last, 
      before: $startCursor, 
      after: $endCursor,
      query: $query
    ) {
      nodes {
        ...CollectionItem
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${COLLECTION_ITEM_FRAGMENT}
` as const;

const PRODUCT_TYPES_QUERY = `#graphql
  query ProductTypes(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    productTypes(first: 250) {
      nodes
    }
  }
` as const;
