import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import { useLoaderData, type MetaFunction, Link } from 'react-router';
import {ProductItem} from '~/components/ProductItem';
import type {ProductItemFragment} from 'storefrontapi.generated';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Extras Collection | Jacket Sunscreen`}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {collection} = await context.storefront.query(EXTRAS_COLLECTION_QUERY);
  
  if (!collection) {
    throw new Response(`Collection not found`, {
      status: 404,
    });
  }

  return {
    collection,
    products: collection.products.nodes
  };
}

export default function ExtrasCollection() {
  const {collection, products} = useLoaderData<typeof loader>();

  return (
    <div className="extras-collection">
        
      {/* Breadcrumb */}
      <div className="py-4 px-3 md:px-2 lg:px-6">
        <div className="max-w-7xl">
          <nav className="flex items-center space-x-2 text-sm">
            <Link 
              to="/" 
              className="text-gray-500 hover:text-[#FBAC18] transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Extras</span>
          </nav>
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="pb-8 md:pb-12 lg:pb-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {products.map((product: ProductItemFragment, index: number) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  loading={index < 8 ? 'eager' : undefined}
                  variant="collection"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">No products found in this collection.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const EXTRAS_COLLECTION_QUERY = `#graphql
  fragment ExtrasProduct on Product {
    id
    title
    handle
    tags
    featuredImage {
      id
      url
      altText
      width
      height
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
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
  query ExtrasCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collection(handle: "extras") {
      id
      title
      description
      handle
      products(first: 50) {
        nodes {
          ...ExtrasProduct
        }
      }
    }
  }
` as const; 