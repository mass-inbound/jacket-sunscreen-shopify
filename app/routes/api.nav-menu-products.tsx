import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';

export async function loader({context}: LoaderFunctionArgs) {
  try {
    const {collection} = await context.storefront.query(NAV_MENU_PRODUCTS_QUERY);
    
    return Response.json({
      products: collection?.products?.nodes || []
    });
  } catch (error) {
    console.error('Error fetching nav menu products:', error);
    return Response.json({products: []}, {status: 500});
  }
}

const NAV_MENU_PRODUCTS_QUERY = `#graphql
  fragment NavMenuProduct on Product {
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
  }
  query NavMenuProducts($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collection(handle: "nav-menu-products") {
      id
      title
      products(first: 50) {
        nodes {
          ...NavMenuProduct
        }
      }
    }
  }
` as const; 