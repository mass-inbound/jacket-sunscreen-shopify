import {useEffect, useState, useRef, useCallback} from 'react';
import {useFetchers, useFetcher} from 'react-router';
import {CartForm, Image, Money} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';

export function AddedToCartPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fetchers = useFetchers();
  const recFetcher = useFetcher<{products: any[]}>();
  const {open: openAside} = useAside();
  const trackedKeysRef = useRef<Set<string>>(new Set());

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    clearTimer();
  }, [clearTimer]);

  useEffect(() => {
    const addFetchers = fetchers.filter(
      (f) =>
        f.formData &&
        f.formData.get('cartAction') === CartForm.ACTIONS.LinesAdd,
    );

    for (const f of addFetchers) {
      const key = f.key || String(Date.now());
      const wasTracked = trackedKeysRef.current.has(key);

      if (f.state === 'submitting' && !wasTracked) {
        trackedKeysRef.current.add(key);
        setIsOpen(true);
        clearTimer();
        timerRef.current = setTimeout(close, 8000);
        recFetcher.load('/api/recommendations');
      }

      if (f.state === 'idle' && wasTracked) {
        trackedKeysRef.current.delete(key);
      }
    }
  }, [fetchers, close, clearTimer]);

  useEffect(() => {
    if (!isOpen) return;
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, close]);

  if (!isOpen) return null;

  const recommendations = recFetcher.data?.products?.slice(0, 4) || [];

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-20 sm:items-center sm:pt-0">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={close}
      />
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 max-h-[85vh] overflow-y-auto">
        <button
          onClick={close}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 z-10"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-5 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-bold text-sm text-gray-900">
              Item added to your cart!
            </span>
          </div>
        </div>

        {recommendations.length > 0 && (
          <div className="p-5 border-b border-gray-200">
            <h3 className="font-bold text-sm text-gray-900 mb-3">
              You May Also Like
            </h3>
            <div className="space-y-3">
              {recommendations.map((product: any) => (
                <PopupRecommendationCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        <div className="p-5 space-y-2">
          <button
            onClick={() => {
              close();
              openAside('cart');
            }}
            className="w-full bg-[#1B1A1B] text-white font-bold py-3 px-4 rounded hover:bg-gray-800 transition-colors text-sm"
          >
            GO TO MY CART
          </button>
          <button
            onClick={close}
            className="w-full bg-white text-gray-900 font-bold py-3 px-4 rounded border border-gray-300 hover:bg-gray-50 transition-colors text-sm"
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    </div>
  );
}

function PopupRecommendationCard({product}: {product: any}) {
  const variant = product.variants?.nodes?.[0];
  if (!variant) return null;

  return (
    <div className="flex items-center gap-3">
      {product.featuredImage && (
        <div className="w-14 h-14 flex-shrink-0 rounded overflow-hidden bg-gray-100">
          <Image
            data={product.featuredImage}
            width={112}
            height={112}
            className="w-full h-full object-cover"
            alt={product.featuredImage.altText || product.title}
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-900 truncate">
          {product.title}
        </p>
        <div className="text-xs font-semibold text-gray-900">
          <Money data={variant.price} />
        </div>
      </div>
      <CartForm
        route="/cart"
        action={CartForm.ACTIONS.LinesAdd}
        inputs={{lines: [{merchandiseId: variant.id, quantity: 1}]}}
      >
        <button
          type="submit"
          disabled={!variant.availableForSale}
          className="bg-[#FBAC18] text-white text-xs font-bold px-4 py-2 rounded hover:bg-[#e69b15] transition-colors disabled:opacity-50 flex-shrink-0"
        >
          ADD
        </button>
      </CartForm>
    </div>
  );
}
