import React from 'react';

interface Review {
  id: string;
  rating: number;
  title: string;
  content: string;
  author: string;
  verified?: boolean;
}

interface ReviewsSectionProps {
  reviews: Review[];
}

// Star rating component
function StarRating({rating}: {rating: number}) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <span key={index} className="text-yellow-400">
          ⭐
        </span>
      ))}
    </div>
  );
}

// Individual review component
function ReviewCard({review}: {review: Review}) {
  return (
    <div className="mb-6 last:mb-0">
      {/* Rating and Title */}
      <div className="mb-2">
        <div className="flex items-center gap-2">
          <StarRating rating={review.rating} />
          <span className="text-sm font-normal text-[#1B1A1B] leading-relaxed">
            {review.title}
          </span>
        </div>
      </div>

      {/* Review Content */}
      <div className="mb-2">
        <p className="text-base leading-relaxed text-[#1B1A1B] font-normal">
          {review.content}
        </p>
      </div>

      {/* Author */}
      <div className="text-base text-[#1B1A1B] font-normal">
        — {review.author}
        {/* {review.verified && (
          <span className="ml-2 text-xs text-green-600">✓ Verified</span>
        )} */}
      </div>
    </div>
  );
}

export function ReviewsSection({reviews}: ReviewsSectionProps) {
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
