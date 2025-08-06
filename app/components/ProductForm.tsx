import {useState} from 'react';
import {useFetcher} from 'react-router';
import {Button} from '~/components/Button';
import {getSelectedProductOptions} from '@shopify/hydrogen';
import { getMaxAddableQuantity } from '~/lib/inventory';
import { useRouteLoaderData } from 'react-router';
import type { RootLoader } from '~/root';

/**
 * A client component that provides a form for adding a product variant to the cart
 */
export function ProductForm({
  productOptions,
  selectedVariant,
}: {
  productOptions: any[];
  selectedVariant: any;
}) {
  const [quantity, setQuantity] = useState(1);
  const fetcher = useFetcher();
  const rootData = useRouteLoaderData<RootLoader>('root');
  const cart = rootData?.cart as any;

  // Calculate maximum quantity that can be added
  const maxAddable = getMaxAddableQuantity(cart, selectedVariant?.id, selectedVariant);
  const maxQuantity = Math.max(1, maxAddable);

  // Ensure quantity doesn't exceed available inventory
  const safeQuantity = Math.min(quantity, maxQuantity);

  const lines = [
    {
      merchandiseId: selectedVariant?.id,
      quantity: safeQuantity,
    },
  ];

  const handleQuantityChange = (newQuantity: number) => {
    const clampedQuantity = Math.max(1, Math.min(newQuantity, maxQuantity));
    setQuantity(clampedQuantity);
  };

  return (
    <fetcher.Form action="/cart" method="post">
      <input type="hidden" name="cartAction" value="ADD_LINES" />
      <input
        type="hidden"
        name="lines"
        value={JSON.stringify(lines)}
      />
      <input
        type="hidden"
        name="selectedOptions"
        value={JSON.stringify(getSelectedProductOptions(window.location as any))}
      />
      
      <div className="space-y-4">
        {/* Quantity Selector */}
        <div>
          <label htmlFor="quantity-selector" className="block text-sm font-medium text-gray-700 mb-2">
            Quantity <span className="text-red-500">*</span>
          </label>
          <div id="quantity-selector" className="flex items-center border border-gray-300 rounded-md w-24">
            <button
              type="button"
              onClick={() => handleQuantityChange(quantity - 1)}
              className="px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              disabled={quantity <= 1}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="flex-1 text-center py-2 text-sm font-medium">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => handleQuantityChange(quantity + 1)}
              className="px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              disabled={quantity >= maxQuantity}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          {maxQuantity < 999 && (
            <p className="text-xs text-gray-500 mt-1">
              Only {maxQuantity} available
            </p>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          type="submit"
          variant="primary"
          className="w-full bg-[#FBAC18] text-white font-bold py-3 px-6 rounded-md hover:bg-[#e69b15] transition-colors"
          disabled={!selectedVariant?.availableForSale || fetcher.state !== 'idle' || maxQuantity === 0}
        >
          {!selectedVariant?.availableForSale ? 'Sold out' : 
           maxQuantity === 0 ? 'No stock available' : 'ADD TO CART'}
        </Button>
      </div>
    </fetcher.Form>
  );
}
