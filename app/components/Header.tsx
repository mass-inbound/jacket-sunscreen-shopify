import {Suspense, useState, useEffect} from 'react';
import { Await, NavLink, useAsyncValue } from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import { getCartItemCount } from '~/lib/inventory';

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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50); // Start sticky behavior after 50px scroll
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`w-full z-40 transition-all duration-300 ${isScrolled ? 'fixed top-0 left-0 right-0' : ''}`}>
      <div className={`flex px-4 justify-center items-center py-[15px] md:py-[15px] lg:py-[15px] ${isScrolled ? 'pt-[40px]' : ''} bg-transparent`}>
        <div className="relative w-full mx-auto">
          {/* Overlay + Shadow + Background */}
          <div 
            className={`absolute top-0 left-0 w-full h-full rounded-[10px] shadow-[0_1px_4px_0_rgba(0,0,0,0.6)] transition-opacity duration-300`} 
            style={{ 
              background: '#FBAC18',
              opacity: isScrolled ? 0.8 : 1
            }} 
          />
          {/* Content */}
          <div className="relative flex items-center justify-between h-[52.3px] md:h-[79.3px] px-4 md:px-8 lg:px-8">
            {/* Left: Mobile Menu Toggle */}
            <div className="flex items-center z-10">
              <HeaderMenuMobileToggle />
            </div>
            
            {/* Center: Logo */}
            <div className="flex-1 flex justify-center">
              <NavLink prefetch="intent" to="/" className="flex items-center z-10 select-none" style={{ textDecoration: 'none' }} end>
                <span className="block -mr-28 w-[120px] h-[32px] md:w-[160px] md:h-[40px] lg:w-[180px] lg:h-[48px] rounded flex items-center justify-center font-bold text-white text-lg md:text-3xl lg:text-4xl">
                  JA
                </span>
              </NavLink>
            </div>
            
            {/* Right: CTAs */}
            <div className="flex items-center z-10">
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
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleSubmenu = (itemId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newExpandedItems = new Set(expandedItems);
    if (newExpandedItems.has(itemId)) {
      newExpandedItems.delete(itemId);
    } else {
      newExpandedItems.add(itemId);
    }
    setExpandedItems(newExpandedItems);
  };

  // Static menu items matching the design
  const staticMenuItems = [
    {
      id: 'home',
      title: 'HOME',
      url: '/',
      items: []
    },
    {
      id: 'shop',
      title: 'SHOP',
      url: '/collections',
      items: []
    },
    {
      id: 'explore',
      title: 'EXPLORE',
      url: '#',
      items: [
        { id: 'retailers', title: 'RETAILERS', url: '/pages/retailers' },
        { id: 'reviews', title: 'REVIEWS', url: '/pages/reviews' },
        { id: 'contact', title: 'CONTACT', url: '/pages/contact' },
        { id: 'about', title: 'ABOUT', url: '/pages/about' }
      ]
    },
    {
      id: 'education',
      title: 'EDUCATION',
      url: '#',
      items: [
        { id: 'faq', title: 'FAQ', url: '/pages/faq' }
      ]
    }
  ];

  return (
    <nav className={className} role="navigation">
      {staticMenuItems.map((item) => {
        const hasSubItems = item.items && item.items.length > 0;
        const isExpanded = expandedItems.has(item.id);
        
        return (
          <div key={item.id} className={viewport === 'mobile' ? 'mobile-menu-group' : ''}>
            <NavLink
              className={`${viewport === 'desktop' ? 'text-white font-semibold text-base lg:text-lg tracking-widest hover:text-black transition-colors px-2 py-1 rounded' : 'mobile-menu-item'} ${hasSubItems ? 'has-submenu' : ''} ${isExpanded ? 'expanded' : ''}`}
              style={viewport === 'desktop' ? { letterSpacing: '0.12em', textDecoration: 'none' } : {}}
              end
              onClick={hasSubItems && viewport === 'mobile' ? (e) => toggleSubmenu(item.id, e) : close}
              prefetch="intent"
              to={hasSubItems && viewport === 'mobile' ? '#' : item.url}
            >
              {item.title}
              {viewport === 'mobile' && hasSubItems && (
                <svg className="chevron-down" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              )}
            </NavLink>
            {viewport === 'mobile' && hasSubItems && isExpanded && (
              <div className="mobile-submenu">
                {item.items.map((subItem) => (
                  <NavLink
                    key={subItem.id}
                    className="mobile-submenu-item"
                    onClick={close}
                    prefetch="intent"
                    to={subItem.url}
                  >
                    {subItem.title}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
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
  let open: (mode: 'search' | 'cart' | 'mobile' | 'closed') => void = () => {};
  
  try {
    const aside = useAside();
    open = aside.open;
  } catch (error) {
    console.warn('Aside context not available:', error);
  }
  
  return (
    <button
      className="flex items-center justify-center w-10 h-10 text-black hover:text-gray-600 transition-colors"
      onClick={() => open('mobile')}
      aria-label="Open menu"
    >
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>
  );
}

function SearchToggle() {
  let open: (mode: 'search' | 'cart' | 'mobile' | 'closed') => void = () => {};
  
  try {
    const aside = useAside();
    open = aside.open;
  } catch (error) {
    console.warn('Aside context not available:', error);
  }
  
  return (
    <button className="reset text-black hover:text-gray-600 transition-colors" onClick={() => open('search')}>
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
    </button>
  );
}

function CartBadge({count}: {count: number | null}) {
  const analytics = useAnalytics();
  let open: (mode: 'search' | 'cart' | 'mobile' | 'closed') => void = () => {};
  
  try {
    const aside = useAside();
    open = aside.open;
  } catch (error) {
    console.warn('Aside context not available:', error);
  }

  const {publish, shop, cart, prevCart} = analytics;

  return (
    <button
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
      className="text-black font-semibold hover:text-gray-600 transition-colors relative"
    >
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      {count !== null && count > 0 && (
        <span className="absolute -top-2 -right-2 bg-white text-[#FBAC18] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold border border-gray-200">
          {count}
        </span>
      )}
    </button>
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
  return <CartBadge count={getCartItemCount(cart as CartApiQueryFragment | null)} />;
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
