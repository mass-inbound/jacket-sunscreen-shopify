import {type LoaderFunctionArgs} from 'react-router';

export async function loader({context}: LoaderFunctionArgs) {
  try {
    const {collection} = await context.storefront.query(
      SHOP_ALL_MENU_PRODUCTS_QUERY,
    );

    return Response.json({
      products: collection?.products?.nodes || [],
    });
  } catch (error) {
    console.error('Error fetching shop-all products for header menu:', error);
    return Response.json({products: []}, {status: 500});
  }
}

const SHOP_ALL_MENU_PRODUCTS_QUERY = `#graphql
  fragment ShopAllMenuProduct on Product {
    id
    title
    handle
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
      maxVariantPrice {
        amount
        currencyCode
      }
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
  query ShopAllMenuProducts($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collection(handle: "shop-all") {
      id
      title
      products(first: 50, sortKey: COLLECTION_DEFAULT) {
        nodes {
          ...ShopAllMenuProduct
        }
      }
    }
  }
` as const;
