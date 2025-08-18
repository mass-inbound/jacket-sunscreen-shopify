import React, { useState, useMemo, useRef } from 'react';
import { formatReviewDate, type ReviewForDisplay, type ReviewStats, submitReview } from '~/lib/judge-me';
import { useFetcher } from 'react-router';

interface ProductReviewsProps {
  reviews: ReviewForDisplay[];
  stats: ReviewStats;
  productName?: string;
  productId?: string;
  shopDomain: string;
  apiToken: string;
}

type SortOption = 'relevant' | 'newest' | 'oldest' | 'highest' | 'lowest' | 'helpful';
type FilterOption = 'all' | '5' | '4' | '3' | '2' | '1';

// Star rating component
function StarRating({rating, size = 'default', interactive = false, onRatingChange}: {
  rating: number; 
  size?: 'small' | 'default';
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}) {
  const sizeClass = size === 'small' ? 'w-5 h-5' : 'w-7 h-7'; // Increased from w-4 h-4 and w-5 h-5
  
  return (
    <div className="flex">
      {Array.from({length: 5}, (_, index) => (
        <svg 
          key={index} 
          className={`${sizeClass} ${index < rating ? 'text-[#FBAC18]' : 'text-gray-300'} ${interactive ? 'cursor-pointer hover:text-[#FBAC18]' : ''}`} 
          fill="currentColor" 
          viewBox="0 0 20 20"
          onClick={interactive && onRatingChange ? () => onRatingChange(index + 1) : undefined}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// Review Form Component (now inline)
function ReviewForm({ productId, productName, onClose, onSubmit, shopDomain, apiToken }: {
  productId: string;
  productName: string;
  onClose: () => void;
  onSubmit: () => void;
  shopDomain: string;
  apiToken: string;
}) {
  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    body: '',
    reviewerName: '',
    reviewerEmail: ''
  });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const maxFiles = 3;
    
    if (selectedImages.length + files.length > maxFiles) {
      setSubmitError(`You can only upload up to ${maxFiles} images`);
      return;
    }

    // Validate file types and sizes
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      
      if (!isValidType) {
        setSubmitError('Please select only image files');
        return false;
      }
      
      if (!isValidSize) {
        setSubmitError('Image size must be less than 5MB');
        return false;
      }
      
      return true;
    });

    if (validFiles.length > 0) {
      setSubmitError('');
      const newImages = [...selectedImages, ...validFiles];
      const newPreviewUrls = [...imagePreviewUrls];

      validFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newPreviewUrls.push(e.target?.result as string);
          setImagePreviewUrls([...newPreviewUrls]);
        };
        reader.readAsDataURL(file);
      });

      setSelectedImages(newImages);
    }
  };

  const removeImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    const newPreviewUrls = imagePreviewUrls.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    setImagePreviewUrls(newPreviewUrls);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.rating === 0) {
      setSubmitError('Please select a rating');
      return;
    }
    
    if (!formData.title.trim() || !formData.body.trim() || !formData.reviewerName.trim() || !formData.reviewerEmail.trim()) {
      setSubmitError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Submit to Judge.me API
      const result = await submitReview(
        {
          productId,
          rating: formData.rating,
          title: formData.title,
          body: formData.body,
          reviewerName: formData.reviewerName,
          reviewerEmail: formData.reviewerEmail,
          images: selectedImages,
        },
        shopDomain,
        apiToken
      );

      if (result.success) {
        setSubmitSuccess(true);
        setTimeout(() => {
          onSubmit();
          onClose();
        }, 2000);
      } else {
        setSubmitError(result.error || 'Failed to submit review');
      }
    } catch (error) {
      setSubmitError('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 p-8 text-center mt-8">
        <div className="flex items-center justify-center mb-6">
          <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-green-900 mb-3">Review Submitted Successfully!</h3>
        <p className="text-green-700 text-base">
          Thank you for your review! It will be visible after moderation by our team.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 border border-gray-200 p-8 mt-8 max-w-4xl mx-auto">
   

     

      {submitError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 mb-6">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label htmlFor="reviewerName" className="block text-sm font-medium text-gray-900 mb-3 text-left">
              Name* 
            </label>
            <input
              type="text"
              id="reviewerName"
              value={formData.reviewerName}
              onChange={(e) => setFormData(prev => ({ ...prev, reviewerName: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-[#FBAC18] focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="reviewerEmail" className="block text-sm font-medium text-gray-900 mb-3 text-left">
              Email*
            </label>
            <input
              type="email"
              id="reviewerEmail"
              value={formData.reviewerEmail}
              onChange={(e) => setFormData(prev => ({ ...prev, reviewerEmail: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-[#FBAC18] focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Rating */}
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-900 mb-3 text-left">
            Add a rating*
          </label>
          <div id="rating">
            <StarRating 
              rating={formData.rating} 
              interactive={true}
              onRatingChange={(rating) => setFormData(prev => ({ ...prev, rating }))}
            />
          </div>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="reviewTitle" className="block text-sm font-medium text-gray-900 mb-3 text-left">
            Review title*
          </label>
          <input
            type="text"
            id="reviewTitle"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-[#FBAC18] focus:border-transparent"
            maxLength={350}
            required
          />
          <div className="text-right text-sm text-gray-500 mt-2">
            {formData.title.length}/350
          </div>
        </div>

        {/* Review Body */}
        <div>
          <label htmlFor="reviewBody" className="block text-sm font-medium text-gray-900 mb-3 text-left">
            Review*
          </label>
          <textarea
            id="reviewBody"
            value={formData.body}
            onChange={(e) => setFormData(prev => ({ ...prev, body: e.target.value }))}
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-[#FBAC18] focus:border-transparent"
            maxLength={500}
            required
          />
          <div className="text-right text-sm text-gray-500 mt-2">
            {formData.body.length}/500
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="reviewImages" className="block text-sm font-medium text-gray-900 mb-3 text-left">
            Add images ({selectedImages.length}/3)
          </label>
          
          {/* Image Preview */}
          {imagePreviewUrls.length > 0 && (
            <div className="flex gap-4 mb-6 flex-wrap">
              {imagePreviewUrls.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-24 h-24 object-cover border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white w-8 h-8 flex items-center justify-center text-base hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {/* Upload Button */}
          {selectedImages.length < 3 && (
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                multiple
                className="hidden"
                id="reviewImages"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 p-8 text-center hover:border-[#FBAC18] transition-colors w-full"
              >
                <svg className="mx-auto h-10 w-10 text-gray-400 mb-3" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-base text-gray-600">
                  Click to upload images (max 3, up to 5MB each)
                </p>
              </button>
            </div>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-6 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-4 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-base font-medium"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-4 bg-[#FBAC18] text-white hover:bg-[#e69b15] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base font-medium min-w-[160px] flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Publish Review'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

// Individual review component
function ReviewCard({review}: {review: ReviewForDisplay}) {
  return (
    <div className="bg-white p-6 rounded-lg">
      {/* Review Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-900">{review.author}</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-600">{formatReviewDate(review.createdAt)}</span>
        </div>
        
        {/* Verified Badge */}
        {review.verified && (
          <div className="flex items-center space-x-2 bg-[#FBAC18] bg-opacity-20 rounded-xl px-3 py-1">
            <svg className="w-4 h-4 text-[#FBAC18]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-[#FBAC18] font-medium">Verified</span>
          </div>
        )}
      </div>

      {/* Star Rating */}
      <div className="flex items-center space-x-1 mb-4">
        <StarRating rating={review.rating} />
      </div>

      {/* Review Title */}
      {review.title && (
        <h3 className="font-bold text-xl text-gray-900 mb-4">{review.title}</h3>
      )}

      {/* Review Text */}
      <p className="text-gray-600 leading-relaxed mb-4">
        {review.content}
      </p>

      {/* Review Images */}
      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-4">
          {review.images.slice(0, 4).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Customer review ${index + 1}`}
              className="w-16 h-16 object-cover rounded-lg"
              loading="lazy"
            />
          ))}
          {review.images.length > 4 && (
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 text-sm">
              +{review.images.length - 4}
            </div>
          )}
        </div>
      )}

      {/* Helpful Section */}
      <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
        <span className="text-gray-600 text-sm">Was this helpful?</span>
        <button className="flex items-center space-x-1 text-[#FBAC18] hover:text-[#e69b15] transition-colors text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          <span>Yes</span>
        </button>
        <button className="flex items-center space-x-1 text-gray-400 hover:text-gray-600 transition-colors text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.737 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13v-3m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
          </svg>
          <span>No</span>
        </button>
      </div>
    </div>
  );
}

export function ProductReviews({reviews, stats, productName, productId, shopDomain, apiToken}: ProductReviewsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('relevant');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');

  // Filter and sort reviews
  const filteredAndSortedReviews = useMemo(() => {
    let filtered = reviews;

    // Apply rating filter
    if (filterBy !== 'all') {
      const targetRating = parseInt(filterBy);
      filtered = filtered.filter(review => review.rating === targetRating);
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        case 'helpful':
          // For now, keep original order. In a real app, you'd sort by helpfulness scores
          return 0;
        case 'relevant':
        default:
          // For relevance, you might consider rating, date, and helpfulness
          // For now, prioritize higher ratings and newer reviews
          const ratingDiff = b.rating - a.rating;
          if (ratingDiff !== 0) return ratingDiff;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return sorted;
  }, [reviews, sortBy, filterBy]);

  // Don't show the section if there are no reviews
  if (stats.totalReviews === 0) {
    return (
      <div className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Reviews</h2>
          <p className="text-gray-600 mb-6">No reviews yet. Be the first to share your experience!</p>
          {productId && (
            <button 
              onClick={() => setShowReviewForm(true)}
              className="bg-[#FBAC18] text-white px-8 py-4 hover:bg-[#e69b15] transition-colors font-medium text-base"
            >
              Write a Review
            </button>
          )}
          
          {/* Review Form */}
          {showReviewForm && productId && productName && (
            <div className="max-w-4xl mx-auto">
              <ReviewForm
                productId={productId}
                productName={productName}
                onClose={() => setShowReviewForm(false)}
                onSubmit={() => {
                  // In a real app, you'd refresh the reviews here
                  console.log('Review submitted successfully');
                }}
                shopDomain={shopDomain}
                apiToken={apiToken}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Reviews Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Reviews</h2>
              {productId && (
                <button 
                  onClick={() => setShowReviewForm(true)}
                  className="border-2 border-[#FBAC18] text-[#FBAC18] px-8 py-4 hover:bg-[#FBAC18] hover:text-white transition-colors font-medium text-base"
                >
                  Leave a Review
                </button>
              )}
            </div>
            
            <div className="flex flex-col items-end">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <StarRating rating={Math.round(stats.averageRating)} />
                  <span className="text-2xl font-bold text-gray-900">
                    {stats.averageRating.toFixed(1)}
                  </span>
                </div>
                <span className="text-gray-600">
                  Based on {stats.totalReviews} {stats.totalReviews === 1 ? 'review' : 'reviews'}
                </span>
              </div>
              
              {/* Rating Breakdown */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = stats.ratingBreakdown[stars] || 0;
                  const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
                  
                  return (
                    <div key={stars} className="flex items-center space-x-3">
                      <span className="text-xs text-gray-600 w-12 text-right">
                        {stars} {stars === 1 ? 'star' : 'stars'}
                      </span>
                      <div className="w-44 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[#FBAC18] h-2 rounded-full" 
                          style={{ 
                            width: `${percentage}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 w-4 text-left">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Review Form */}
          {showReviewForm && productId && productName && (
            <ReviewForm
              productId={productId}
              productName={productName}
              onClose={() => setShowReviewForm(false)}
              onSubmit={() => {
                // In a real app, you'd refresh the reviews here
                console.log('Review submitted successfully');
              }}
              shopDomain={shopDomain}
              apiToken={apiToken}
            />
          )}

          {/* Filter & Sort Section */}
          <div className="flex items-center justify-between py-4 border-b border-gray-300">
            <span className="text-gray-600">
              {filteredAndSortedReviews.length} {filteredAndSortedReviews.length === 1 ? 'review' : 'reviews'}
              {filterBy !== 'all' && ` (${filterBy} star${filterBy === '1' ? '' : 's'})`}
            </span>
            <div className="flex items-center space-x-4">
              {/* Filter Dropdown */}
              <div className="relative">
                <select 
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value as FilterOption)}
                  className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#FBAC18] focus:border-transparent"
                >
                  <option value="all">Filter by rating: All stars</option>
                  <option value="5">5 stars only</option>
                  <option value="4">4 stars only</option>
                  <option value="3">3 stars only</option>
                  <option value="2">2 stars only</option>
                  <option value="1">1 star only</option>
                </select>
                <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {/* Sort Dropdown */}
              <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#FBAC18] focus:border-transparent"
                >
                  <option value="relevant">Sort by: Most Relevant</option>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Rated</option>
                  <option value="lowest">Lowest Rated</option>
                  <option value="helpful">Most Helpful</option>
                </select>
                <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Review List */}
          <div className="space-y-6 mt-6">
            {filteredAndSortedReviews.length > 0 ? (
              filteredAndSortedReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No reviews match the selected filter.
              </div>
            )}
            
            {filteredAndSortedReviews.length > 0 && filteredAndSortedReviews.length < stats.totalReviews && (
              <div className="text-center py-6">
                <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors">
                  Load More Reviews
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 