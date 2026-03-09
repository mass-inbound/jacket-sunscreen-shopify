import { type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Link, useLoaderData, type MetaFunction } from 'react-router';
import { Image, getPaginationVariables } from '@shopify/hydrogen';
import type { ArticleItemFragment } from 'storefrontapi.generated';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const blog = data?.blog;
  const seoTitle = blog?.seo?.title || blog?.title;
  const seoDescription = blog?.seo?.description;

  return [
    { title: seoTitle ? `${seoTitle} | Jacket Sunscreen` : 'Blog | Jacket Sunscreen' },
    ...(seoDescription ? [{ name: 'description', content: seoDescription }] : []),
  ];
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
async function loadCriticalData({
  context,
  request,
  params,
}: LoaderFunctionArgs) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 4,
  });

  if (!params.blogHandle) {
    throw new Response(`blog not found`, { status: 404 });
  }

  const [{ blog }, { blogs }] = await Promise.all([
    context.storefront.query(BLOGS_QUERY, {
      variables: {
        blogHandle: params.blogHandle,
        ...paginationVariables,
      },
    }),
    context.storefront.query(ALL_BLOGS_QUERY, {
      variables: {
        first: 50, // Get all blogs for tabs
      },
    }),
  ]);

  if (!blog) {
    throw new Response('Blog not found', { status: 404 });
  }

  if (!blog.articles || blog.articles.nodes.length === 0) {
    // Return blog even if empty - let the UI handle empty state
  }

  redirectIfHandleIsLocalized(request, { handle: params.blogHandle, data: blog });

  return { blog, blogs };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({ context }: LoaderFunctionArgs) {
  return {};
}

export default function Blog() {
  const { blog, blogs } = useLoaderData<typeof loader>();
  const { articles } = blog;
  const currentBlogHandle = blog.handle;

  if (!articles || articles.nodes.length === 0) {
    return (
      <div className="blog max-w-7xl mx-auto px-4 py-8">
        <BlogTabs blogs={blogs} currentHandle={currentBlogHandle} />
        <div className="mt-8">
          <p className="text-gray-600">No articles found in this blog.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog max-w-7xl mx-auto px-2 sm:px-4 py-8 w-full">
      <BlogTabs blogs={blogs} currentHandle={currentBlogHandle} />
      <PaginatedResourceSection
        connection={articles}
        resourcesClassName="blog-grid grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-8 w-full"
      >
        {({ node: article, index }) => (
          <ArticleItem
            article={article as ArticleItemFragment}
            key={(article as ArticleItemFragment).id}
            loading={index < 2 ? 'eager' : 'lazy'}
          />
        )}
      </PaginatedResourceSection>
    </div>
  );
}

function BlogTabs({ blogs, currentHandle }: { blogs: any; currentHandle: string }) {
  if (!blogs || !blogs.nodes || blogs.nodes.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-4 mb-8 border-b border-gray-200 pb-4 overflow-x-scroll hide-scrollbar">
      {blogs.nodes.map((blogItem: any) => {
        const isActive = blogItem.handle === currentHandle;
        return (
          <Link
            key={blogItem.handle}
            to={`/blogs/${blogItem.handle}`}
            className={`px-4 py-2 font-semibold text-sm md:text-base transition-colors ${isActive
              ? 'text-[#F9AD19] border-b-2 border-[#F9AD19]'
              : 'text-black hover:text-[#F9AD19]'
              }`}
            prefetch="intent"
          >
            {blogItem.title.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}

function ArticleItem({
  article,
  loading,
}: {
  article: ArticleItemFragment & { excerpt?: string };
  loading?: HTMLImageElement['loading'];
}) {
  const publishedAt = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(article.publishedAt!));

  // Calculate reading time (rough estimate: 200 words per minute)
  const wordCount = article.contentHtml ? article.contentHtml.replace(/<[^>]*>/g, '').split(/\s+/).length : 0;
  const readingTime = Math.ceil(wordCount / 200) || 1;

  return (
    <article className="blog-article bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col w-full max-w-full min-w-0" key={article.id}>
      <Link to={`/blogs/${article.blog.handle}/${article.handle}`} className="flex flex-col h-full w-full group min-w-0">
        {article.image && (
          <div className="blog-article-image w-full aspect-[4/3] overflow-hidden bg-gray-100 min-w-0 flex-shrink-0">
            <Image
              alt={article.image.altText || article.title}
              data={article.image}
              loading={loading}
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-4 sm:p-6 flex flex-col flex-grow min-w-0">
          {/* Author and Date Section */}
          <div className="flex items-center gap-3 mb-4">
            {article.author?.name && (
              <>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-sm font-semibold text-gray-700 flex-shrink-0">
                  {article.author.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-gray-900 truncate">{article.author.name}</span>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <time dateTime={article.publishedAt}>{publishedAt}</time>
                    <span>&middot;</span>
                    <span>{readingTime} min read</span>
                  </div>
                </div>
              </>
            )}
            {!article.author?.name && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <time dateTime={article.publishedAt}>{publishedAt}</time>
                <span>&middot;</span>
                <span>{readingTime} min read</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2 group-hover:text-[#FBAC18] transition-colors">
            {article.title}
          </h3>

          {/* Excerpt if available */}
          {'excerpt' in article && article.excerpt && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed flex-grow">
              {article.excerpt}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog
const BLOGS_QUERY = `#graphql
  query Blog(
    $language: LanguageCode
    $blogHandle: String!
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      title
      handle
      seo {
        title
        description
      }
      articles(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ArticleItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }

      }
    }
  }
  fragment ArticleItem on Article {
    author: authorV2 {
      name
    }
    contentHtml
    excerpt
    handle
    id
    image {
      id
      altText
      url
      width
      height
    }
    publishedAt
    title
    seo {
      description
      title
    }
    blog {
      handle
    }
  }
` as const;

const ALL_BLOGS_QUERY = `#graphql
  query AllBlogs(
    $first: Int
  ) {
    blogs(first: $first) {
      nodes {
        title
        handle
      }
    }
  }
` as const;
