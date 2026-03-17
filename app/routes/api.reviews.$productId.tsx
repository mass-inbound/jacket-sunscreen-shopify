import type { LoaderFunctionArgs } from 'react-router';
import {
  calculateStatsFromRawReviews,
  fetchAllJudgeMeReviewsRawCached,
  filterRawReviewsForProduct,
  resolveJudgeMeCredentials,
} from '~/lib/judge-me';

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

  const { shopDomain, apiToken } = resolveJudgeMeCredentials(context.env);

  try {
    const all = await fetchAllJudgeMeReviewsRawCached(shopDomain, apiToken);
    const raw = filterRawReviewsForProduct(all, productId);
    const stats = calculateStatsFromRawReviews(raw);
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
