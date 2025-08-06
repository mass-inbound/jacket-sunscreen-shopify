import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import { useLoaderData, type MetaFunction } from 'react-router';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {ReviewsSection} from '../components/ReviewsSection';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Hydrogen | ${data?.page?.title ?? data?.reviewsTitle ?? ''}`}];
};

export async function loader(args: LoaderFunctionArgs) {
  // Custom loader for /pages/reviews
  if (args.params.handle === 'reviews') {
    // Static reviews data (copy from your old reviews loader)
    const reviews = [
      {
        id: '1',
        rating: 5,
        title: 'New favorite sunscreen for my face!',
        content: "I was raised in the beaches of Puerto Rico, and because of that, now that I'm older I've had a couple of skin cancers removed. My dermatologist had recommended using pure zinc oxide sunscreen only, but they pretty much left me looking like a mime. I found JACKET, and this was a blessing! It's a strong sunscreen, doesn't feel oily, and doesn't leave any white residue on my face, even though it has a good zinc oxide content. It's 4 ounces, which allows me to bring it with me when I travel. And the fact that it has age spot remover is a bonus! I highly recommend it and will continue using it.",
        author: 'José Alvarez',
        verified: true
      },
      // ... (add more reviews as needed, or copy from your old file)
    ];
    return { reviews, reviewsTitle: 'Customer Reviews' };
  }

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
  request,
  params,
}: LoaderFunctionArgs) {
  if (!params.handle) {
    throw new Error('Missing page handle');
  }

  const [{page}] = await Promise.all([
    context.storefront.query(PAGE_QUERY, {
      variables: {
        handle: params.handle,
      },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!page) {
    throw new Response('Not Found', {status: 404});
  }

  redirectIfHandleIsLocalized(request, {handle: params.handle, data: page});

  return {
    page,
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

export default function Page() {
  const data = useLoaderData<typeof loader>();

  // Custom rendering for /pages/reviews
  if (data.reviews) {
    return (
      <div className="reviews-page">
        <ReviewsSection reviews={data.reviews} />
      </div>
    );
  }

  // Default page rendering
  return (
    <div className="page">
      <header>
        <h1>{data.page?.title ?? ''}</h1>
      </header>
      <main dangerouslySetInnerHTML={{__html: data.page?.body ?? ''}} />
    </div>
  );
}

const PAGE_QUERY = `#graphql
  query Page(
    $language: LanguageCode,
    $country: CountryCode,
    $handle: String!
  )
  @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      handle
      id
      title
      body
      seo {
        description
        title
      }
    }
  }
` as const;
