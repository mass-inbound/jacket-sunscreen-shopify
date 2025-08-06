import {useOptimisticCart} from '@shopify/hydrogen';
import { Link } from 'react-router';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {CartLineItem} from '~/components/CartLineItem';
import {CartSummary} from './CartSummary';

export type CartLayout = 'page' | 'aside';

export type CartMainProps = {
  cart: CartApiQueryFragment | null;
  layout: CartLayout;
};

/**
 * The main cart component that displays the cart items and summary.
 * It is used by both the /cart route and the cart aside dialog.
 */
export function CartMain({layout, cart: originalCart}: CartMainProps) {
  // The useOptimisticCart hook applies pending actions to the cart
  // so the user immediately sees feedback when they modify the cart.
  const cart = useOptimisticCart(originalCart);

  // Temporary debugging - remove this after confirming the fix works
  console.log('CartMain Debug:', {
    totalQuantity: cart?.totalQuantity,
    linesCount: cart?.lines?.nodes?.length,
    lines: cart?.lines?.nodes,
    cart
  });

  const linesCount = cart?.lines?.nodes?.length || 0;
  const withDiscount =
    cart &&
    Boolean(cart?.discountCodes?.filter((code) => code.applicable)?.length);
  const className = `cart-main ${withDiscount ? 'with-discount' : ''}`;
  const cartHasItems = cart?.totalQuantity ? cart.totalQuantity > 0 : false;

  return (
    <div className={className}>
      <CartEmpty hidden={linesCount > 0} layout={layout} />
      <div className="cart-details flex flex-col h-full">
        <div className="cart-lines flex-1 overflow-y-auto" aria-labelledby="cart-lines" style={{maxHeight: 'calc(100vh - 60px - 329px)'}}>
          <ul className="space-y-0">
            {(cart?.lines?.nodes ?? []).map((line) => (
              <CartLineItem key={line.id} line={line} layout={layout} />
            ))}
          </ul>
        </div>
        {cartHasItems && <CartSummary cart={cart} layout={layout} />}
      </div>
    </div>
  );
}

function CartEmpty({
  hidden = false,
}: {
  hidden: boolean;
  layout?: CartMainProps['layout'];
}) {
  const {close} = useAside();
  return (
    <div hidden={hidden} className="text-center py-8">
      <p className="text-gray-600 mb-4">
        Looks like you haven&rsquo;t added anything yet, let&rsquo;s get you
        started!
      </p>
      <Link 
        to="/collections" 
        onClick={close} 
        prefetch="viewport"
        className="text-[#FBAC18] hover:text-[#e69b15] transition-colors"
      >
        Continue shopping →
      </Link>
    </div>
  );
}
