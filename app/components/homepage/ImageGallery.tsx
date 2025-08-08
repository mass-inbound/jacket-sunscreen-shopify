import React, { useState, useEffect } from 'react';

export function ImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    '/assets/carousel1.jpg',
    '/assets/carousel2.jpg',
    '/assets/carousel3.jpg',
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="w-full bg-white py-2 md:py-4 lg:py-6 xl:py-8">
      <div className="w-full">
        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          {/* Carousel Track - Shows 3 images at once with sliding */}
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {images.map((image, index) => (
              <div 
                key={index}
                className="relative w-full flex-shrink-0"
                style={{ width: '100%' }}
              >
                <div className="flex">
                  {/* Previous Image (responsive width) */}
                  <div className="relative w-[10%] md:w-[12%] lg:w-[15%] flex-shrink-0">
                    <div className="relative w-full h-[200px] sm:h-[250px] md:h-[350px] lg:h-[500px] xl:h-[629px]">
                      <img
                        src={images[(index - 1 + images.length) % images.length]}
                        alt={`Previous carousel`}
                        className="w-full h-full object-cover rounded-none"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20" />
                    </div>
                  </div>

                  {/* Current Image (responsive width) */}
                  <div className="relative w-[80%] md:w-[76%] lg:w-[70%] flex-shrink-0">
                    <div className="relative w-full h-[200px] sm:h-[250px] md:h-[350px] lg:h-[500px] xl:h-[629px]">
                      <img
                        src={image}
                        alt={`Current carousel`}
                        className="w-full h-full object-cover rounded-none"
                      />
                      
                      {/* Overlay with centered text - only on central image */}
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <div className="text-center px-2 md:px-4">
                          <h2 className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold leading-tight">
                            MAXIMIZE THE ACTION. MINIMIZE THE RISK.
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Next Image (responsive width) */}
                  <div className="relative w-[10%] md:w-[12%] lg:w-[15%] flex-shrink-0">
                    <div className="relative w-full h-[200px] sm:h-[250px] md:h-[350px] lg:h-[500px] xl:h-[629px]">
                      <img
                        src={images[(index + 1) % images.length]}
                        alt={`Next carousel`}
                        className="w-full h-full object-cover rounded-none"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 