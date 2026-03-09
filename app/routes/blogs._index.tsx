import { type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Link, useLoaderData, type MetaFunction } from 'react-router';
import { getPaginationVariables } from '@shopify/hydrogen';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: 'Blogs | Jacket Sunscreen' }];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return { ...deferredData, ...criticalData };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({ context, request }: LoaderFunctionArgs) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 10,
  });

  const [{ blogs }] = await Promise.all([
    context.storefront.query(BLOGS_QUERY, {
      variables: {
        ...paginationVariables,
      },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return { blogs };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({ context }: LoaderFunctionArgs) {
  return {};
}

export default function Blogs() {
  const { blogs } = useLoaderData<typeof loader>();

  if (!blogs || blogs.nodes.length === 0) {
    return (
      <div className="blogs max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Blogs</h1>
        <p>No blogs found.</p>
      </div>
    );
  }

  return (
    <div className="blogs max-w-6xl mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Blogs</h1>
      <PaginatedResourceSection connection={blogs} resourcesClassName='blogs-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {({ node: blog }) => (
          <Link
            className="blog block p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
            key={blog.handle}
            prefetch="intent"
            to={`/blogs/${blog.handle}`}
          >
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            {blog.seo?.description && (
              <p className="text-gray-600 text-sm">{blog.seo.description}</p>
            )}
          </Link>
        )}
      </PaginatedResourceSection>
    </div>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog
const BLOGS_QUERY = `#graphql
  query Blogs(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    blogs(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        title
        handle
        seo {
          title
          description
        }
      }
    }
  }
` as const;
