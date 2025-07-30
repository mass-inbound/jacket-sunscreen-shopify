import React from 'react';

export function ImageGallery() {
  return (
    <section className="w-full bg-white py-[14px]">
      <div className="max-w-[1439px] mx-auto">
        <div className="overflow-x-auto">
          <div className="flex gap-0 min-w-max">
            {/* Image 1 */}
            <div className="w-[1117px] h-[629px] bg-gray-200 flex items-center justify-center flex-shrink-0">
              <span className="text-gray-600">Gallery Image 1</span>
            </div>
            
            {/* Image 2 */}
            <div className="w-[1117px] h-[629px] bg-gray-300 flex items-center justify-center flex-shrink-0">
              <span className="text-gray-600">Gallery Image 2</span>
            </div>
            
            {/* Image 3 */}
            <div className="w-[1117px] h-[629px] bg-gray-400 flex items-center justify-center flex-shrink-0">
              <span className="text-gray-600">Gallery Image 3</span>
            </div>
            
            {/* Image 4 */}
            <div className="w-[1117px] h-[629px] bg-gray-500 flex items-center justify-center flex-shrink-0">
              <span className="text-gray-600">Gallery Image 4</span>
            </div>
            
            {/* Image 5 */}
            <div className="w-[1117px] h-[629px] bg-gray-600 flex items-center justify-center flex-shrink-0">
              <span className="text-gray-600">Gallery Image 5</span>
            </div>
            
            {/* Image 6 */}
            <div className="w-[1117px] h-[629px] bg-gray-700 flex items-center justify-center flex-shrink-0">
              <span className="text-gray-600">Gallery Image 6</span>
            </div>
            
            {/* Image 7 */}
            <div className="w-[1117px] h-[629px] bg-gray-800 flex items-center justify-center flex-shrink-0">
              <span className="text-gray-600">Gallery Image 7</span>
            </div>
            
            {/* Image 8 */}
            <div className="w-[1117px] h-[629px] bg-gray-900 flex items-center justify-center flex-shrink-0">
              <span className="text-gray-600">Gallery Image 8</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 