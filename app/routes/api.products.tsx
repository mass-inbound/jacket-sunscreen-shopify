import {LoaderFunctionArgs} from 'react-router';

export async function loader({context, request}: LoaderFunctionArgs) {
  const {storefront} = context;
  const url = new URL(request.url);
  const limit = url.searchParams.get('limit') || '5';

  try {
    const {products} = await storefront.query(PRODUCTS_QUERY, {
      variables: {
        first: parseInt(limit),
      },
      cache: storefront.CacheShort(),
    });

    return Response.json({
      products: products.nodes,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return Response.json({products: []}, {status: 500});
  }
}

const PRODUCTS_QUERY = `#graphql
  query Products($first: Int!) {
    products(first: $first, sortKey: BEST_SELLING) {
      nodes {
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
      }
    }
  }
` as const; 