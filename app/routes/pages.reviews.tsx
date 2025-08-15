import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from 'react-router';
import {ReviewsSection} from '../components/ReviewsSection';
import {fetchAllReviews} from '~/lib/judge-me';

export const meta: MetaFunction = () => {
  return [{title: 'Customer Reviews | Jacket Sunscreen'}];
};

export async function loader(args: LoaderFunctionArgs) {
  const {env} = args.context;
  
  // Fetch all reviews from Judge.me
  try {
    const reviews = await fetchAllReviews(
      env.JUDGE_ME_SHOP_DOMAIN || '',
      env.JUDGE_ME_PRIVATE_API_TOKEN || ''
    );
    
    return { reviews };
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    // Return empty reviews on error to prevent page crash
    return { reviews: [] };
  }
}

export default function Reviews() {
  const { reviews } = useLoaderData<typeof loader>();

  return (
    <div className="reviews-page">
      <ReviewsSection reviews={reviews} />
    </div>
  );
} 