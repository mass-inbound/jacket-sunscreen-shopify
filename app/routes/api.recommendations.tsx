import {type LoaderFunctionArgs} from 'react-router';

export async function loader({request, context}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const productId = url.searchParams.get('productId');
  const excludeParam = url.searchParams.get('exclude') || '';
  const excludeIds = new Set(excludeParam.split(',').filter(Boolean));

  const {storefront} = context;

  try {
    let products: any[] = [];

    if (productId) {
      const {productRecommendations} = await storefront.query(
        PRODUCT_RECOMMENDATIONS_QUERY,
        {
          variables: {productId},
          cache: storefront.CacheShort(),
        },
      );
      products = productRecommendations || [];
    }

    if (products.length < 4) {
      const {products: bestSellers} = await storefront.query(
        BEST_SELLING_PRODUCTS_QUERY,
        {cache: storefront.CacheShort()},
      );

      const existingIds = new Set(products.map((p: any) => p.id));
      const additionalProducts = (bestSellers?.nodes || []).filter(
        (p: any) => !existingIds.has(p.id),
      );
      products = [...products, ...additionalProducts];
    }

    products = products
      .filter((p: any) => !excludeIds.has(p.id))
      .filter(
        (p: any) => p.variants?.nodes?.[0]?.availableForSale !== false,
      )
      .slice(0, 8);

    return Response.json({products});
  } catch (error) {
    console.error(
      'Error fetching recommendations:',
      error instanceof Error ? error.message : error,
    );
    return Response.json({products: []}, {status: 500});
  }
}

const RECOMMENDATION_FRAGMENT = `#graphql
  fragment RecommendationProduct on Product {
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
`;

const PRODUCT_RECOMMENDATIONS_QUERY = `#graphql
  ${RECOMMENDATION_FRAGMENT}
  query ProductRecommendations(
    $productId: ID!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    productRecommendations(productId: $productId) {
      ...RecommendationProduct
    }
  }
` as const;

const BEST_SELLING_PRODUCTS_QUERY = `#graphql
  ${RECOMMENDATION_FRAGMENT}
  query BestSellingProducts(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products(first: 12, sortKey: BEST_SELLING) {
      nodes {
        ...RecommendationProduct
      }
    }
  }
` as const;
