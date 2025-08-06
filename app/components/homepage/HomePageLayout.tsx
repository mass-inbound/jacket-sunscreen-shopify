import React from 'react';
import { Await } from 'react-router';
import { Suspense } from 'react';
import type { CartApiQueryFragment } from 'storefrontapi.generated';
import { Aside } from '~/components/Aside';
import { CartMain } from '~/components/CartMain';

interface HomePageLayoutProps {
  cart: Promise<CartApiQueryFragment | null>;
  children?: React.ReactNode;
}

export function HomePageLayout({
  cart,
  children = null,
}: HomePageLayoutProps) {
  return (
    <Aside.Provider>
      <CartAside cart={cart} />
      <main>{children}</main>
    </Aside.Provider>
  );
}

function CartAside({cart}: {cart: HomePageLayoutProps['cart']}) {
  return (
    <Suspense fallback={<p>Loading cart ...</p>}>
      <Await resolve={cart}>
        {(cart) => (
          <Aside type="cart" heading="CART" cart={cart}>
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <CartMain cart={cart} layout="aside" />
              </div>
            </div>
          </Aside>
        )}
      </Await>
    </Suspense>
  );
} 