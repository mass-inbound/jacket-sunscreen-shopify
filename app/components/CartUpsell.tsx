import {useEffect, useRef} from 'react';
import {useFetcher} from 'react-router';
import {CartForm, Image, Money} from '@shopify/hydrogen';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import type {CartLayout} from '~/components/CartMain';

type CartUpsellProps = {
  cart: CartApiQueryFragment | null | any;
  layout: CartLayout;
};

export function CartUpsell({cart, layout}: CartUpsellProps) {
  const fetcher = useFetcher<{products: any[]}>();
  const scrollRef = useRef<HTMLDivElement>(null);

  const cartProductIds =
    cart?.lines?.nodes
      ?.map((line: any) => line.merchandise?.product?.id)
      .filter(Boolean) || [];

  const firstProductId = cartProductIds[0] || '';
  const excludeParam = cartProductIds.join(',');

  useEffect(() => {
    if (fetcher.state === 'idle' && !fetcher.data) {
      const params = new URLSearchParams();
      if (firstProductId) params.set('productId', firstProductId);
      if (excludeParam) params.set('exclude', excludeParam);
      fetcher.load(`/api/recommendations?${params.toString()}`);
    }
  }, [firstProductId, excludeParam]);

  const products = fetcher.data?.products || [];

  if (products.length === 0 && fetcher.state === 'idle' && fetcher.data) {
    return null;
  }

  if (products.length === 0) return null;

  const isCompact = layout === 'aside';

  return (
    <div className={`cart-upsell ${isCompact ? 'py-4' : 'py-6'} border-t border-gray-200`}>
      <h3
        className={`font-bold text-gray-900 mb-3 ${
          isCompact ? 'text-sm px-0' : 'text-base'
        }`}
      >
        You May Also Like
      </h3>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto hide-scrollbar scroll-smooth pb-2"
        >
          {products.map((product: any) => (
            <UpsellCard
              key={product.id}
              product={product}
              compact={isCompact}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function UpsellCard({
  product,
  compact,
}: {
  product: any;
  compact: boolean;
}) {
  const variant = product.variants?.nodes?.[0];
  if (!variant) return null;

  const imgSize = compact ? 70 : 100;

  return (
    <div
      className={`flex-shrink-0 bg-white border border-gray-200 rounded-lg overflow-hidden ${
        compact ? 'w-[140px]' : 'w-[160px]'
      }`}
    >
      {product.featuredImage && (
        <Image
          alt={product.featuredImage.altText || product.title}
          data={product.featuredImage}
          width={imgSize * 2}
          height={imgSize * 2}
          className="w-full object-cover"
          style={{height: `${imgSize}px`}}
        />
      )}
      <div className={`${compact ? 'p-2' : 'p-3'}`}>
        <h4
          className={`font-medium text-gray-900 leading-tight line-clamp-2 ${
            compact ? 'text-[11px] mb-1' : 'text-xs mb-1.5'
          }`}
        >
          {product.title}
        </h4>
        <div className={`font-semibold text-gray-900 ${compact ? 'text-[11px] mb-1.5' : 'text-xs mb-2'}`}>
          <Money data={variant.price} />
        </div>
        <CartForm
          route="/cart"
          action={CartForm.ACTIONS.LinesAdd}
          inputs={{
            lines: [{merchandiseId: variant.id, quantity: 1}],
          }}
        >
          <button
            type="submit"
            disabled={!variant.availableForSale}
            className={`w-full bg-[#FBAC18] text-white font-bold rounded hover:bg-[#e69b15] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              compact ? 'text-[10px] py-1' : 'text-xs py-1.5'
            }`}
          >
            {variant.availableForSale ? 'ADD' : 'SOLD OUT'}
          </button>
        </CartForm>
      </div>
    </div>
  );
}
