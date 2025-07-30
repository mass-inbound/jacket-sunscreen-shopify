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
    <Aside type="cart" heading="CART">
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
} 