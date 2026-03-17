import { type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Link, useLoaderData, type MetaFunction } from 'react-router';
import { Analytics } from '@shopify/hydrogen';
import { ProductItem } from '~/components/ProductItem';
import { ProductFilter } from '~/components/ProductFilter';
import type { CollectionItemFragment } from 'storefrontapi.generated';

export const meta: MetaFunction<typeof loader> = () => {
  return [{ title: `Jacket Sunscreen | Shop All` }];
};

const SHOP_ALL_COLLECTION_HANDLE = 'shop-all';
type ShopAllProduct = CollectionItemFragment & {
  productType?: string | null;
  tags?: string[] | null;
};

export async function loader(args: LoaderFunctionArgs) {
  const { context, request } = args;
  const { storefront } = context;
  const url = new URL(request.url);
  const selectedProductTypes = url.searchParams
    .getAll('product_type')
    .map((type) => type.trim())
    .filter(Boolean);
  const selectedTags = url.searchParams
    .getAll('tag')
    .map((tag) => tag.trim())
    .filter(Boolean);

  const { collection } = await storefront.query<ShopAllCollectionProductsQuery>(
    SHOP_ALL_COLLECTION_PRODUCTS_QUERY,
    {
      variables: {
        handle: SHOP_ALL_COLLECTION_HANDLE,
      },
    },
  );

  if (!collection) {
    throw new Response('Shop All collection not found', { status: 404 });
  }

  const products =
    (collection.products?.nodes as ShopAllProduct[] | undefined) || [];

  const filteredProducts = products.filter((product) => {
    const matchesType =
      selectedProductTypes.length === 0 ||
      (product.productType &&
        selectedProductTypes.includes(product.productType));
    const matchesTags =
      selectedTags.length === 0 ||
      (product.tags &&
        selectedTags.every((tag) => product.tags?.includes(tag)));
    return matchesType && matchesTags;
  });

  const availableProductTypes = Array.from(
    new Set(
      products
        .map((product) => product.productType?.trim())
        .filter((type): type is string => Boolean(type)),
    ),
  ).sort();

  return {
    collection: {
      id: collection.id,
      handle: collection.handle,
      title: collection.title,
      description: collection.description,
    },
    products: filteredProducts,
    availableProductTypes,
    selectedProductTypes,
  };
}

export default function ShopAllCollectionPage() {
  const {
    collection,
    products,
    availableProductTypes = [],
    selectedProductTypes = [],
  } = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="pt-4 px-3 md:px-2 lg:px-6 mb-8">
        <div className="max-w-7xl">
          <nav className="flex items-center space-x-2 text-sm">
            <Link
              to="/"
              className="text-gray-500 hover:text-[#FBAC18] transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Shop All</span>
          </nav>
        </div>
      </div>

      <div className="collections-page px-8 pt-2">
        <ProductFilter
          productTypes={availableProductTypes}
          selectedTypes={selectedProductTypes}
        />
        <div className="collections-content">
          {products.length === 0 ? (
            <div className="text-center py-16 text-lg">
              No products found for the selected filters.
            </div>
          ) : (
            <div className="products-grid grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  loading={index < 20 ? 'eager' : undefined}
                  variant="collection"
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Analytics.CollectionView
        data={{
          collection: {
            id: 'shop-all',
            handle: 'shop-all',
          },
        }}
      />
    </div>
  );
}

const SHOP_ALL_COLLECTION_ITEM_FRAGMENT = `#graphql
  fragment ShopAllMoneyCollectionItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ShopAllCollectionItem on Product {
    id
    handle
    title
    productType
    tags
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...ShopAllMoneyCollectionItem
      }
      maxVariantPrice {
        ...ShopAllMoneyCollectionItem
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
` as const;

const SHOP_ALL_COLLECTION_PRODUCTS_QUERY = `#graphql
  ${SHOP_ALL_COLLECTION_ITEM_FRAGMENT}
  query ShopAllCollectionProducts(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(first: 250, sortKey: COLLECTION_DEFAULT) {
        nodes {
          ...ShopAllCollectionItem
        }
      }
    }
  }
` as const;

type ShopAllCollectionProductsQuery = {
  collection: {
    id: string;
    handle: string;
    title: string;
    description: string | null;
    products: {
      nodes: ShopAllProduct[];
    };
  } | null;
};
