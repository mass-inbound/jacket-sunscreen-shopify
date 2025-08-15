import React from 'react';
import { formatReviewDate, type ReviewForDisplay } from '~/lib/judge-me';

interface ReviewsSectionProps {
  reviews: ReviewForDisplay[];
}

// Star rating component
function StarRating({rating}: {rating: number}) {
  return (
    <div className="flex">
      {Array.from({length: 5}, (_, index) => (
        <svg key={index} className={`w-5 h-5 ${index < rating ? 'text-[#FBAC18]' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// Individual review component
function ReviewCard({review}: {review: ReviewForDisplay}) {
  return (
    <div className="mb-6 last:mb-0">
      {/* Rating and Title */}
      <div className="mb-2">
        <div className="flex items-center gap-2">
          <StarRating rating={review.rating} />
          {review.title && (
            <span className="text-sm font-normal text-[#1B1A1B] leading-relaxed">
              {review.title}
            </span>
          )}
        </div>
      </div>

      {/* Review Content */}
      <div className="mb-2">
        <p className="text-base leading-relaxed text-[#1B1A1B] font-normal">
          {review.content}
        </p>
      </div>

      {/* Review Images */}
      {review.images && review.images.length > 0 && (
        <div className="mb-4">
          <div className="flex gap-2 flex-wrap">
            {review.images.slice(0, 3).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Customer review ${index + 1}`}
                className="w-20 h-20 object-cover rounded-lg"
                loading="lazy"
              />
            ))}
            {review.images.length > 3 && (
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 text-sm">
                +{review.images.length - 3}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Author and Date */}
      <div className="text-base text-[#1B1A1B] font-normal flex items-center gap-2">
        <span>— {review.author}</span>
        {review.verified && (
          <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-green-100 text-green-800">
            ✓ Verified
          </span>
        )}
        <span className="text-gray-500 text-sm">
          • {formatReviewDate(review.createdAt)}
        </span>
      </div>
    </div>
  );
}

export function ReviewsSection({reviews}: ReviewsSectionProps) {
  if (reviews.length === 0) {
    return (
      <div className="">
        {/* Header Section with Yellow Background */}
        <div className="py-4 text-center">
          <div className="bg-[#FBAC18] px-8 py-2 inline-block rounded">
            <div className="text-5xl font-normal text-white">REVIEWS</div>
          </div>
        </div>

        {/* No Reviews Message */}
        <div className="w-full bg-white">
          <div className="max-w-7xl mx-auto px-[230px] py-12">
            <div className="text-center text-gray-500">
              <p className="text-xl mb-4">No reviews yet</p>
              <p>Be the first to share your thoughts about our products!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {/* Header Section with Yellow Background */}
      <div className="py-4 text-center">
        <div className="bg-[#FBAC18] px-8 py-2 inline-block rounded">
          <div className="text-5xl font-normal text-white">REVIEWS</div>
        </div>
      </div>

      {/* Reviews Content */}
      <div className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-[230px] py-6">
          <div className="max-w-4xl">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
