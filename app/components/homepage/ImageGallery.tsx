import React, { useState, useEffect, useRef } from 'react';

export function ImageGallery() {
  const [translateX, setTranslateX] = useState(0);
  const animationRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  const images = [
    '/assets/carousel1.jpg',
    '/assets/carousel2.jpg',
    '/assets/carousel3.jpg',
  ];

  // Create multiple copies of images for seamless infinite scroll
  const extendedImages = [...images, ...images, ...images, ...images];
  const scrollSpeed = 0.1; // pixels per frame - adjust for speed

  useEffect(() => {
    const animate = () => {
      setTranslateX(prev => {
        const newValue = prev - scrollSpeed;
        // Reset position when we've scrolled through one complete set of images
        // Each image is 60vw wide, so reset when we've moved beyond the original set
        const resetPoint = -60 * images.length;
        return newValue <= resetPoint ? 0 : newValue;
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [images.length]);

  return (
    <section className="w-full bg-white py-2 md:py-4 lg:py-6 xl:py-8 relative">
      <div className="w-full relative overflow-hidden">
        {/* Scrolling Background Images */}
        <div 
          ref={containerRef}
          className="flex"
          style={{
            transform: `translateX(${translateX}vw)`,
            width: `${extendedImages.length * 60}vw`,
          }}
        >
          {extendedImages.map((image, index) => (
            <div 
              key={`${image}-${index}`}
              className="relative flex-shrink-0"
              style={{ width: '60vw' }}
            >
              <div className="relative w-full h-[200px] sm:h-[250px] md:h-[350px] lg:h-[500px] xl:h-[629px]">
                <img
                  src={image}
                  alt={`Carousel background ${index}`}
                  className="w-full h-full object-cover"
                />
                {/* Semi-transparent overlay for better text readability */}
                <div className="absolute inset-0 bg-black bg-opacity-40" />
              </div>
            </div>
          ))}
        </div>

        {/* Fixed Center Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center px-4 md:px-8">
            <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold leading-tight drop-shadow-2xl">
              MAXIMIZE THE ACTION. MINIMIZE THE RISK.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
} 