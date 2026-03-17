import type { LoaderFunctionArgs } from 'react-router';
import { fetchProductReviews } from '~/lib/judge-me';

/**
 * API route that returns review stats for a specific product from Judge.me.
 * Used by ProductItem to show dynamic ratings on listing pages without
 * exposing Judge.me credentials to the client.
 */
export async function loader({ context, params }: LoaderFunctionArgs) {
  const productId = params.productId;
  if (!productId) {
    return Response.json({ stats: null }, { status: 400 });
  }

  const { env } = context;
  // Same fallbacks as products.$handle.tsx so Judge.me returns data consistently
  const shopDomain =
    env.JUDGE_ME_SHOP_DOMAIN ||
    env.PUBLIC_STORE_DOMAIN ||
    'jacket-sunscreen.myshopify.com';
  const apiToken =
    env.JUDGE_ME_PRIVATE_API_TOKEN ||
    env.JUDGE_ME_PUBLIC_API_TOKEN ||
    '3ySpx789ET7EP9Fp1gBiPxssnQE';

  try {
    // Match products.$handle.tsx behavior exactly (default page/perPage)
    // so list cards show the same stats as the product page.
    const { stats } = await fetchProductReviews(productId, shopDomain, apiToken);
    return Response.json({ stats });
  } catch (error) {
    console.error('Error fetching review stats for product', productId, error);
    return Response.json({
      stats: {
        averageRating: 0,
        totalReviews: 0,
        ratingBreakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      },
    });
  }
}
