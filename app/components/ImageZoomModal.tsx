import { useState, useRef, useEffect } from 'react';
import { Image } from '@shopify/hydrogen';
import type { ProductVariantFragment } from 'storefrontapi.generated';

interface ImageZoomModalProps {
  image: ProductVariantFragment['image'];
  isOpen: boolean;
  onClose: () => void;
}

export function ImageZoomModal({ image, isOpen, onClose }: ImageZoomModalProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Reset zoom and position when modal opens
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle mouse wheel for zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(0.5, Math.min(5, scale * delta));
    setScale(newScale);
  };

  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Zoom in function
  const zoomIn = () => {
    setScale(prev => Math.min(5, prev * 1.2));
  };

  // Zoom out function
  const zoomOut = () => {
    setScale(prev => Math.max(0.5, prev / 1.2));
  };

  // Reset zoom and position
  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  if (!isOpen || !image) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Image zoom modal"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
        aria-label="Close zoom"
      >
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Zoom controls */}
      <div className="absolute top-4 left-4 z-10 flex space-x-2">
        <button
          onClick={zoomIn}
          className="bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
          aria-label="Zoom in"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </button>
        <button
          onClick={zoomOut}
          className="bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
          aria-label="Zoom out"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </button>
        <button
          onClick={resetZoom}
          className="bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
          aria-label="Reset zoom"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {/* Zoom level indicator */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-white rounded-full px-3 py-1 text-sm font-medium">
        {Math.round(scale * 100)}%
      </div>

      {/* Image container */}
      <button
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing border-0 bg-transparent"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            onClose();
          }
        }}
        aria-label="Zoomable product image - use mouse wheel to zoom, drag to pan"
        type="button"
      >
        <div
          ref={imageRef}
          className="relative transition-transform duration-200 ease-out"
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
            cursor: scale > 1 ? 'grab' : 'default',
          }}
        >
          <Image
            alt={image.altText || 'Product Image'}
            data={image}
            className="max-w-none"
            sizes="100vw"
          />
        </div>
      </button>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg text-sm">
        Use mouse wheel to zoom • Drag to pan • Press ESC to close
      </div>
    </div>
  );
} 