import type { LoaderFunctionArgs } from 'react-router';
import {
  calculateStatsFromRawReviews,
  fetchAllJudgeMeReviewsRawCached,
  resolveJudgeMeCredentials,
} from '~/lib/judge-me';

function parseIdsParam(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function loader({ context, request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const ids = parseIdsParam(url.searchParams.get('ids'));

  if (ids.length === 0) {
    return Response.json({ statsByProductId: {} });
  }

  const { shopDomain, apiToken } = resolveJudgeMeCredentials(context.env);

  try {
    const allReviews = await fetchAllJudgeMeReviewsRawCached(shopDomain, apiToken);

    const wanted = new Set(ids.map(String));
    const reviewsById = new Map<string, any[]>();
    for (const review of allReviews) {
      const pid = String(review.product_external_id);
      if (!wanted.has(pid)) continue;
      const arr = reviewsById.get(pid);
      if (arr) arr.push(review);
      else reviewsById.set(pid, [review]);
    }

    const statsByProductId: Record<
      string,
      { averageRating: number; totalReviews: number }
    > = {};
    for (const id of ids) {
      const raw = reviewsById.get(String(id)) ?? [];
      const stats = calculateStatsFromRawReviews(raw as any);
      statsByProductId[String(id)] = {
        averageRating: stats.averageRating,
        totalReviews: stats.totalReviews,
      };
    }

    return Response.json({ statsByProductId });
  } catch (error) {
    console.error('Error fetching batch review stats', error);
    return Response.json({ statsByProductId: {} }, { status: 200 });
  }
}

