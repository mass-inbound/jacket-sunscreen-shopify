import { type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, type MetaFunction } from 'react-router';
import { Image } from '@shopify/hydrogen';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const article = data?.article;
  const seoTitle = article?.seo?.title || article?.title;
  const seoDescription = article?.seo?.description;

  return [
    { title: seoTitle ? `${seoTitle} | Jacket Sunscreen` : 'Article | Jacket Sunscreen' },
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
  const { blogHandle, articleHandle } = params;

  if (!articleHandle || !blogHandle) {
    throw new Response('Not found', { status: 404 });
  }

  const [{ blog }] = await Promise.all([
    context.storefront.query(ARTICLE_QUERY, {
      variables: { blogHandle, articleHandle },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!blog?.articleByHandle) {
    throw new Response(null, { status: 404 });
  }

  redirectIfHandleIsLocalized(
    request,
    {
      handle: articleHandle,
      data: blog.articleByHandle,
    },
    {
      handle: blogHandle,
      data: blog,
    },
  );

  const article = blog.articleByHandle;

  return { article };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({ context }: LoaderFunctionArgs) {
  return {};
}

export default function Article() {
  const { article } = useLoaderData<typeof loader>();
  const { title, image, contentHtml, author, publishedAt, blog } = article;

  const publishedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(publishedAt));

  // Calculate reading time (rough estimate: 200 words per minute)
  const wordCount = contentHtml ? contentHtml.replace(/<[^>]*>/g, '').split(/\s+/).length : 0;
  const readingTime = Math.ceil(wordCount / 200) || 1;

  return (
    <article className="article min-h-screen bg-gray-50 py-8 md:py-12">
      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Article Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Image Section - Inside Card */}
          {image && (
            <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden bg-gray-200 relative">
              <div className="w-full h-full">
                <Image
                  data={image}
                  sizes="100vw"
                  loading="eager"
                  className="w-full h-full object-cover"
                  style={{ height: '100%', width: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          )}

          {/* Header Section */}
          <header className="px-6 md:px-10 lg:px-12 pt-8 md:pt-10 pb-6 border-b border-gray-100">
            {/* Author and Meta Info */}
            <div className="flex items-center gap-4 mb-6">
              {author?.name && (
                <>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FBAC18] to-[#F9AD19] flex items-center justify-center text-white text-lg font-bold flex-shrink-0 shadow-md">
                    {author.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-semibold text-gray-900">{author.name}</span>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <time dateTime={publishedAt} className="font-medium">{publishedDate}</time>
                      <span className="text-gray-300">&middot;</span>
                      <span>{readingTime} min read</span>
                    </div>
                  </div>
                </>
              )}
              {!author?.name && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <time dateTime={publishedAt} className="font-medium">{publishedDate}</time>
                  <span className="text-gray-300">&middot;</span>
                  <span>{readingTime} min read</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              {title}
            </h1>

            {/* Decorative Line */}
            <div className="w-20 h-1 bg-gradient-to-r from-[#FBAC18] to-[#F9AD19] rounded-full" />
          </header>

          {/* Article Content */}
          <div className="px-6 md:px-10 lg:px-12 py-8 md:py-10">
            <div
              dangerouslySetInnerHTML={{ __html: contentHtml }}
              className="article-content prose prose-lg prose-headings:font-bold prose-headings:text-gray-900 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-a:text-[#FBAC18] prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-strong:font-semibold prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6 prose-li:text-gray-700 prose-li:mb-2 prose-img:rounded-lg prose-img:shadow-md prose-blockquote:border-l-4 prose-blockquote:border-[#FBAC18] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600 max-w-none [&>p]:text-justify [&>li]:text-justify [&>div]:text-justify [&>span]:text-justify [&>p:first-child]:text-xl [&>p:first-child]:font-medium [&>p:first-child]:text-gray-800"
            />
          </div>
        </div>

        {/* Back to Blog Link */}
        <div className="mt-8 pb-12">
          <a
            href={`/blogs/${blog?.handle || 'news'}`}
            className="inline-flex items-center gap-2 text-[#FBAC18] hover:text-[#F9AD19] font-semibold transition-colors group"
          >
            <svg
              className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </a>
        </div>
      </div>
    </article>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog#field-blog-articlebyhandle
const ARTICLE_QUERY = `#graphql
  query Article(
    $articleHandle: String!
    $blogHandle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    blog(handle: $blogHandle) {
      handle
      articleByHandle(handle: $articleHandle) {
        handle
        title
        contentHtml
        publishedAt
        author: authorV2 {
          name
        }
        image {
          id
          altText
          url
          width
          height
        }
        seo {
          description
          title
        }
        blog {
          handle
        }
      }
    }
  }
` as const;
