export interface JudgeMeReview {
  id: string;
  rating: number;
  title: string;
  body: string;
  reviewer: {
    name: string;
    email: string;
  };
  created_at: string;
  verified: string;
  pictures?: Array<{
    urls: {
      small: string;
      compact: string;
      huge: string;
      original: string;
    };
    hidden: boolean;
  }>;
  product_external_id: string;
}

export interface JudgeMeApiResponse {
  reviews: JudgeMeReview[];
  total: number;
  per_page: number;
  current_page: number;
}

export interface ReviewForDisplay {
  id: string;
  rating: number;
  title: string;
  content: string;
  author: string;
  verified?: boolean;
  createdAt: string;
  images?: string[];
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingBreakdown: Record<number, number>;
}

export function resolveJudgeMeCredentials(env: {
  JUDGE_ME_SHOP_DOMAIN?: string;
  JUDGE_ME_PRIVATE_API_TOKEN?: string;
  JUDGE_ME_PUBLIC_API_TOKEN?: string;
  PUBLIC_STORE_DOMAIN?: string;
}): { shopDomain: string; apiToken: string } {
  const shopDomain =
    env.JUDGE_ME_SHOP_DOMAIN ||
    env.PUBLIC_STORE_DOMAIN ||
    'jacket-sunscreen.myshopify.com';
  const apiToken =
    env.JUDGE_ME_PRIVATE_API_TOKEN ||
    env.JUDGE_ME_PUBLIC_API_TOKEN ||
    '3ySpx789ET7EP9Fp1gBiPxssnQE';
  return { shopDomain, apiToken };
}

let allReviewsCache:
  | {
      key: string;
      expiresAt: number;
      reviews: JudgeMeReview[];
    }
  | undefined;

async function fetchAllJudgeMeReviewsRaw(
  shopDomain: string,
  apiToken: string
): Promise<JudgeMeReview[]> {
  const perPage = 100;
  let page = 1;
  let all: JudgeMeReview[] = [];

  // Paginate until we've fetched all pages or Judge.me returns no more reviews.
  // Judge.me responses include `total`, but we guard with length checks too.
  while (true) {
    const url = new URL('https://judge.me/api/v1/reviews');
    url.searchParams.append('shop_domain', shopDomain);
    url.searchParams.append('api_token', apiToken);
    url.searchParams.append('page', String(page));
    url.searchParams.append('per_page', String(perPage));

    const response = await fetch(url.toString());
    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      console.error(
        'Judge.me API error (all reviews):',
        response.status,
        response.statusText,
        errorText
      );
      break;
    }

    const data = (await response.json()) as JudgeMeApiResponse;
    const batch = Array.isArray(data.reviews) ? data.reviews : [];
    all = all.concat(batch);

    const fetchedSoFar = page * (data.per_page || perPage);
    const total = data.total ?? 0;
    if (batch.length === 0) break;
    if (total > 0 && fetchedSoFar >= total) break;
    page += 1;
  }

  return all;
}

export async function fetchAllJudgeMeReviewsRawCached(
  shopDomain: string,
  apiToken: string,
  ttlMs: number = 60_000
): Promise<JudgeMeReview[]> {
  const key = `${shopDomain}::${apiToken}`;
  const now = Date.now();
  if (allReviewsCache && allReviewsCache.key === key && allReviewsCache.expiresAt > now) {
    return allReviewsCache.reviews;
  }

  const reviews = await fetchAllJudgeMeReviewsRaw(shopDomain, apiToken);
  allReviewsCache = { key, expiresAt: now + ttlMs, reviews };
  return reviews;
}

export function calculateStatsFromRawReviews(reviews: JudgeMeReview[]): ReviewStats {
  return calculateStats(reviews);
}

export function transformJudgeMeReviewForDisplay(
  review: JudgeMeReview,
): ReviewForDisplay {
  return transformReview(review);
}

export function getEmptyReviewStats(): ReviewStats {
  return getEmptyStats();
}

export function getProductIdFromGid(gid: string | undefined | null): string {
  if (!gid) return '';
  return gid.split('/').pop() || '';
}

export function filterRawReviewsForProduct(
  allReviews: JudgeMeReview[],
  productId: string,
): JudgeMeReview[] {
  const pid = String(productId);
  return allReviews.filter((r) => String(r.product_external_id) === pid);
}

/**
 * Fetch reviews for a specific product from Judge.me
 */
export async function fetchProductReviews(
  productId: string,
  shopDomain: string,
  apiToken: string,
  page: number = 1,
  perPage: number = 20
): Promise<{ reviews: ReviewForDisplay[]; stats: ReviewStats }> {
  try {
    // Use the correct Judge.me API endpoint with proper product filtering
    const url = new URL('https://judge.me/api/v1/reviews');
    url.searchParams.append('shop_domain', shopDomain);
    url.searchParams.append('api_token', apiToken);
    url.searchParams.append('product_external_id', productId); // Filter by specific product
    url.searchParams.append('page', page.toString());
    url.searchParams.append('per_page', perPage.toString());

    console.log('Judge.me API URL:', url.toString()); // Debug log
    console.log('Shop domain:', shopDomain); // Debug log
    console.log('API token:', apiToken ? 'Present' : 'Missing'); // Debug log
    console.log('Product ID:', productId); // Debug log

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      console.error('Judge.me API error:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Judge.me API error response:', errorText);
      return { reviews: [], stats: getEmptyStats() };
    }

    const data = await response.json() as JudgeMeApiResponse;
    console.log('Judge.me API response:', data); // Debug log
    
    // Filter reviews to only include ones for this specific product
    const productReviews = data.reviews.filter(review => 
      review.product_external_id.toString() === productId.toString()
    );
    
    console.log(`Found ${productReviews.length} reviews for product ${productId}`); // Debug log
    
    const reviews = productReviews.map(transformReview);
    const stats = calculateStats(productReviews);

    return { reviews, stats };
  } catch (error) {
    console.error('Error fetching product reviews:', error);
    return { reviews: [], stats: getEmptyStats() };
  }
}

/**
 * Submit a new review to Judge.me
 */
export async function submitReview(
  reviewData: {
    productId: string;
    rating: number;
    title: string;
    body: string;
    reviewerName: string;
    reviewerEmail: string;
    images?: File[];
  },
  shopDomain: string,
  apiToken: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const url = new URL('https://judge.me/api/v1/reviews');
    
    const formData = new FormData();
    formData.append('shop_domain', shopDomain);
    formData.append('api_token', apiToken);
    formData.append('product_external_id', reviewData.productId);
    formData.append('rating', reviewData.rating.toString());
    formData.append('title', reviewData.title);
    formData.append('body', reviewData.body);
    formData.append('reviewer[name]', reviewData.reviewerName);
    formData.append('reviewer[email]', reviewData.reviewerEmail);
    
    // Add images if provided
    if (reviewData.images && reviewData.images.length > 0) {
      reviewData.images.forEach((image, index) => {
        formData.append(`pictures[${index}]`, image);
      });
    }

    console.log('Submitting review to Judge.me:', {
      productId: reviewData.productId,
      rating: reviewData.rating,
      title: reviewData.title,
      reviewerName: reviewData.reviewerName,
      imageCount: reviewData.images?.length || 0
    });

    const response = await fetch(url.toString(), {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Judge.me review submission error:', response.status, errorText);
      
      // Parse error message if possible
      try {
        const errorData = JSON.parse(errorText) as { error?: string };
        return { success: false, error: errorData.error || `API Error: ${response.status}` };
      } catch {
        return { success: false, error: `API Error: ${response.status} - ${errorText}` };
      }
    }

    const result = await response.json() as { id?: string; review?: unknown; error?: string };
    console.log('Judge.me review submission result:', result);

    // Check if the response indicates success
    if (result.id || result.review) {
      return { success: true };
    } else {
      return { success: false, error: result.error || 'Unknown error occurred' };
    }
  } catch (error) {
    console.error('Error submitting review:', error);
    return { success: false, error: 'Network error occurred' };
  }
}

export async function fetchAllReviews(
  shopDomain: string,
  apiToken: string,
): Promise<ReviewForDisplay[]> {
  const reviews = await fetchAllJudgeMeReviewsRawCached(shopDomain, apiToken);
  return reviews.map(transformReview);
}

/**
 * Transform Judge.me review to our display format
 */
function transformReview(review: JudgeMeReview): ReviewForDisplay {
  return {
    id: review.id,
    rating: review.rating,
    title: review.title || '',
    content: review.body || '',
    author: review.reviewer.name || 'Anonymous',
    verified: review.verified === 'yes',
    createdAt: review.created_at,
    images: review.pictures?.filter(pic => !pic.hidden).map(pic => pic.urls.original) || []
  };
}

/**
 * Calculate review statistics
 */
function calculateStats(reviews: JudgeMeReview[]): ReviewStats {
  if (reviews.length === 0) {
    return getEmptyStats();
  }

  const ratingBreakdown: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let totalRating = 0;

  reviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingBreakdown[review.rating] = (ratingBreakdown[review.rating] || 0) + 1;
      totalRating += review.rating;
    }
  });

  const averageRating = totalRating / reviews.length;

  return {
    averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
    totalReviews: reviews.length,
    ratingBreakdown
  };
}

/**
 * Get empty stats object
 */
function getEmptyStats(): ReviewStats {
  return {
    averageRating: 0,
    totalReviews: 0,
    ratingBreakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  };
}

/**
 * Format date for display
 */
export function formatReviewDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return '1 day ago';
  } else if (diffDays < 30) {
    return `${diffDays} days ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return months === 1 ? '1 month ago' : `${months} months ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    return years === 1 ? '1 year ago' : `${years} years ago`;
  }
} 