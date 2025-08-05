import {Suspense} from 'react';
import { Await, NavLink, useAsyncValue } from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const {shop, menu} = header;
  return (
    <header className="w-full z-40">
      <div className="flex justify-center items-center py-[15px] md:py-[15px] lg:py-[15px] bg-transparent">
        <div className="relative w-full max-w-[1430px] md:max-w-[1014px] lg:max-w-[1430px] mx-auto">
          {/* Overlay + Shadow + Background */}
          <div className="absolute top-0 left-0 w-full h-full rounded-[10px] shadow-[0_1px_4px_0_rgba(0,0,0,0.6)]" style={{ background: '#FBAC18' }} />
          {/* Content */}
          <div className="relative flex items-center justify-between h-[52.3px] md:h-[79.3px] px-4 md:px-8 lg:px-8">
            {/* Left: Logo */}
            <NavLink prefetch="intent" to="/" className="flex items-center z-10 select-none" style={{ textDecoration: 'none' }} end>
              <span className="block w-[120px] h-[32px] md:w-[160px] md:h-[40px] lg:w-[180px] lg:h-[48px] bg-white rounded flex items-center justify-center font-bold text-[#FBAC18] text-lg md:text-xl lg:text-2xl shadow-sm">
                {shop.name}
              </span>
            </NavLink>
            {/* Desktop/Tablet Menu */}
            <HeaderMenu
              menu={menu}
              viewport="desktop"
              primaryDomainUrl={header.shop.primaryDomain.url}
              publicStoreDomain={publicStoreDomain}
            />
            {/* Desktop/Tablet CTAs */}
            <div className="hidden md:flex items-center z-10">
              <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
            </div>
            {/* Mobile Hamburger/CTAs */}
            <div className="md:hidden flex items-center z-10">
              <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  const className = `header-menu-${viewport} ${viewport === 'desktop' ? 'hidden md:flex gap-8 lg:gap-12 items-center z-10' : 'flex flex-col gap-4'} `;
  const {close} = useAside();

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={close}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
        >
          Home
        </NavLink>
      )}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className="text-white font-semibold text-base lg:text-lg tracking-widest hover:text-black transition-colors px-2 py-1 rounded"
            style={{ letterSpacing: '0.12em', textDecoration: 'none' }}
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav className="header-ctas flex items-center gap-4" role="navigation">
      <HeaderMenuMobileToggle />
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle} className="text-white font-semibold hover:text-black transition-colors">
        <Suspense fallback="Sign in">
          <Await resolve={isLoggedIn} errorElement="Sign in">
            {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Sign in')}
          </Await>
        </Suspense>
      </NavLink>
      <SearchToggle />
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="header-menu-mobile-toggle reset text-white text-2xl px-2"
      onClick={() => open('mobile')}
      aria-label="Open menu"
    >
      <span className="sr-only">Open menu</span>
      <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="18" x2="20" y2="18" />
      </svg>
    </button>
  );
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <button className="reset text-white hover:text-black transition-colors" onClick={() => open('search')}>
      Search
    </button>
  );
}

function CartBadge({count}: {count: number | null}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <a
      href="/cart"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
      className="text-white font-semibold hover:text-black transition-colors"
    >
      Cart {count === null ? <span>&nbsp;</span> : count}
    </a>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599033',
      resourceId: null,
      tags: [],
      title: 'Reviews',
      type: 'HTTP',
      url: '/reviews',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599034',
      resourceId: null,
      tags: [],
      title: 'Contact',
      type: 'HTTP',
      url: '/pages/contact',
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
    textDecoration: 'none',
  };
}
