import { Suspense, useState, useEffect } from 'react';
import { Await, NavLink, useAsyncValue, useLocation } from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {
  HeaderQuery,
  CartApiQueryFragment,
  CollectionFragment,
  ProductItemFragment,
} from 'storefrontapi.generated';
import { useAside } from '~/components/Aside';
import { getCartItemCount } from '~/lib/inventory';
import HamburgerIcon from "../assets/HamburgerIcon.svg";
import SearchIcon from "../assets/SearchIcon.svg"

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
  const { shop, menu } = header;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`w-full z-40 transition-all duration-300 ${isScrolled ? 'fixed top-0 left-0 right-0' : ''}`}
    >
      <div
        className={`flex md:px-2 justify-center items-center py-2 md:py-[15px] ${isScrolled ? 'pt-4 md:pt-[40px]' : ''} bg-transparent`}
      >
        <div className="relative w-full mx-auto">
          {/* Background */}
          <div
            className={`absolute top-0 left-0 w-full h-full rounded-[10px] shadow-[0_1px_4px_0_rgba(0,0,0,0.6)] transition-opacity duration-300`}
            style={{
              background: '#FFFFFF',
              opacity: isScrolled ? 0.8 : 1,
            }}
          />
          {/* Content */}
          <div className="relative flex items-center justify-between h-[44px] md:h-[56px] lg:h-[77px] px-3 md:px-32 lg:px-48 xl:px-64">
            {/* Left: Mobile Menu Toggle */}
            <div className="flex items-center z-10">
              <HeaderMenuMobileToggle />
            </div>

            {/* Center: Logo */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <NavLink
                prefetch="intent"
                to="/"
                className="flex items-center select-none"
                style={{ textDecoration: 'none' }}
                end
              >
                <img
                  src="/images/JACKET%20Logo_Black.svg"
                  alt="Logo"
                  className="block h-[50px] md:h-[57px] lg:h-[77px] xl:h-[115px] object-contain mt-3"
                />
              </NavLink>
            </div>

            {/* Right: CTAs */}
            <div className="flex items-center z-10 gap-1 md:gap-3 lg:gap-4">
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
  isLoggedIn,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
  isLoggedIn?: Promise<boolean>;
}) {
  const className = `header-menu-${viewport} ${viewport === 'desktop' ? 'hidden md:flex gap-4 lg:gap-6 items-center z-10' : 'flex flex-col'} `;
  const { close } = useAside();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const location = useLocation();

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

  const staticMenuItems = [
    {
      id: 'home',
      title: 'HOME',
      url: '/',
      items: [],
    },
    {
      id: 'shop',
      title: 'SHOP',
      url: '/collections/shop-all',
      items: [
        { id: 'shop-all', title: 'SHOP ALL', url: '/collections/shop-all' },
        {
          id: 'sunscreen',
          title: 'SUNSCREEN',
          url: '#',
          items: [
            { id: 'spf50-face-body', title: 'SPF 50+ FACE AND BODY', url: '/products/spf-50-anti-aging-sunscreen' },
            { id: 'spf30-spray', title: 'SPF 30+ SPRAY', url: '/products/jacket-spray-sunscreen' },
            { id: 'spf50-mineral-stick', title: 'SPF 50+ MINERAL STICK', url: '/products/spf-50-mineral-stick-sunscreen' },
            { id: 'spf40-tinted', title: 'SPF 40+ TINTED MINERAL MOISTURIZER', url: '/products/jacket-spf-40-tinted-moisturizer' },
            { id: 'spf15-lip-balm', title: 'SPF 15 LIP BALM', url: '/products/lip-balm-by-jacket' },
          ],
        },
        {
          id: 'skincare',
          title: 'SKINCARE',
          url: '#',
          items: [
            { id: 'skincare-spf40-tinted', title: 'SPF 40+ TINTED MINERAL MOISTURIZER', url: '/products/jacket-spf-40-tinted-moisturizer' },
            { id: 'refresh-serum', title: 'REFRESH HYDRATING SERUM', url: '/products/refresh-by-jacket' },
            { id: 'refine-face-wash', title: 'REFINE FACE WASH', url: '/products/refine-by-jacket' },
            { id: 'platinum-peptide', title: 'PLATINUM PEPTIDE FACE FIRMING CREAM', url: '/products/platinum-peptide-by-jacket-1' },
            { id: 'radiance-brightening', title: 'RADIANCE BRIGHTENING SOLUTION', url: '/products/radiance-accelerated-brightening-solution' },
          ],
        },
        {
          id: 'bundles',
          title: 'BUNDLES',
          url: '#',
          items: [
            { id: 'sun-day-essentials', title: 'SUN DAY ESSENTIALS', url: '/products/sun-day-essentials-bundle' },
            { id: 'wrinkle-reducer', title: 'WRINKLE REDUCER', url: '/products/wrinkle-reducer-bundle' },
            { id: 'outdoor-beauty', title: 'OUTDOOR BEAUTY SYSTEM', url: '/products/outdoor-beauty-system-bundle' },
          ],
        },
        {
          id: 'apparel',
          title: 'APPAREL',
          url: '#',
          items: [
            { id: 'shirt-black', title: 'UPF 50+ LONG-SLEEVE SHIRT (BLACK)', url: '/products/jacket-l-s-hooded-performance-shirt' },
            { id: 'shirt-white', title: 'UPF 50+ LONG-SLEEVE SHIRT (WHITE)', url: '/products/upf-50-long-sleeve-hooded-performance-shirt-white' },
            { id: 'hat-black', title: 'STRAW SUN HAT (BLACK SHIELD)', url: '/products/jacket-lifeguard-hat-black-patch' },
            { id: 'hat-yellow', title: 'STRAW SUN HAT (YELLOW SHIELD)', url: '/products/lifeguard-hat-yellow-patch' },
            { id: 'hat-snapback', title: 'SNAPBACK ROPE HAT (OFF WHITE)', url: '/products/jacket-rope-snapback-hat-white' },
          ],
        },
      ],
    },
    {
      id: 'explore',
      title: 'EXPLORE',
      url: '#',
      items: [
        { id: 'retailers', title: 'RETAILERS', url: '/pages/retailers' },
        { id: 'reviews', title: 'REVIEWS', url: '/pages/reviews' },
        { id: 'contact', title: 'CONTACT', url: '/pages/contact' },
        { id: 'about', title: 'ABOUT', url: '/pages/about' },
      ],
    },
    {
      id: 'education',
      title: 'EDUCATION',
      url: '#',
      items: [
        { id: 'faq', title: 'FAQ', url: '/pages/faq' },
        { id: 'blog', title: 'BLOG', url: '/blog' },
      ],
    },
  ];

  const isMenuItemActive = (item: any, pathname: string) => {
    if (item.id === 'home' && pathname === '/') return true;
    if (item.id === 'shop') {
      return (
        pathname === '/collections/shop-all' ||
        pathname === '/collections/all' ||
        pathname === '/collections/extras' ||
        pathname.startsWith('/products/')
      );
    }
    if (item.id === 'blog') return pathname.startsWith('/blog') || pathname.startsWith('/blogs/');
    if (item.id === 'explore') {
      return (
        pathname === '/pages/retailers' ||
        pathname === '/pages/reviews' ||
        pathname === '/pages/contact' ||
        pathname === '/pages/about'
      );
    }
    if (item.id === 'education') return pathname === '/pages/faq';
    return false;
  };

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && isLoggedIn && (
        <div className="mb-4 pb-4 block md:hidden border-b border-gray-200">
          <NavLink
            prefetch="intent"
            to="/account"
            className="py-2 font-bold text-[16px] tracking-wider text-black hover:text-[#fbac17] transition-colors"
            style={{ textDecoration: 'none' }}
            onClick={close}
          >
            <Suspense fallback="Log In">
              <Await resolve={isLoggedIn} errorElement="Sign in">
                {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Log In')}
              </Await>
            </Suspense>
          </NavLink>
        </div>
      )}
      {staticMenuItems.map((item) => {
        const hasSubItems = item.items && item.items.length > 0;
        const isExpanded = expandedItems.has(item.id);

        return (
          <div key={item.id} className={viewport === 'mobile' ? 'mb-0' : ''}>
            <NavLink
              className={({ isActive }) => {
                let shouldHighlight = false;
                if (!hasSubItems) shouldHighlight = isActive;

                const classes = `${viewport === 'desktop'
                  ? `font-semibold text-[14px] lg:text-[14px] tracking-widest transition-colors px-1 py-0.5 rounded ${shouldHighlight
                    ? 'text-[#fbac17] !important'
                    : 'text-black hover:text-[#fbac17]'
                  }`
                  : `block py-1 font-bold text-[14px] tracking-wider border-0 ${shouldHighlight
                    ? 'text-[#fbac17] !important'
                    : 'text-black'
                  }`
                  } ${hasSubItems ? 'has-submenu' : ''} ${isExpanded ? 'expanded' : ''}`;

                return classes;
              }}
              style={
                viewport === 'desktop'
                  ? { letterSpacing: '0.12em', textDecoration: 'none', fontSize: '14px' }
                  : { textDecoration: 'none' }
              }
              end
              onClick={
                hasSubItems && viewport === 'mobile'
                  ? (e) => toggleSubmenu(item.id, e)
                  : close
              }
              prefetch="intent"
              to={hasSubItems && viewport === 'mobile' ? '#' : item.url}
            >
              <div className="flex items-center justify-between">
                {item.title}
                {viewport === 'mobile' && hasSubItems && (
                  <svg
                    className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="6,9 12,15 18,9"></polyline>
                  </svg>
                )}
              </div>
            </NavLink>
            {viewport === 'mobile' && hasSubItems && isExpanded && (
              <div className="ml-4 mt-1 mb-2">
                {item.items.map((subItem: any) => {
                  const hasNestedItems = subItem.items && subItem.items.length > 0;
                  const isSubExpanded = expandedItems.has(subItem.id);

                  if (hasNestedItems) {
                    return (
                      <div key={subItem.id}>
                        <button
                          className={`flex items-center justify-between w-full py-1 font-bold text-[14px] tracking-wider text-left text-black`}
                          style={{ textDecoration: 'none' }}
                          onClick={(e) => toggleSubmenu(subItem.id, e)}
                        >
                          {subItem.title}
                          <svg
                            className={`w-3 h-3 transition-transform ${isSubExpanded ? 'rotate-180' : ''}`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="6,9 12,15 18,9"></polyline>
                          </svg>
                        </button>
                        {isSubExpanded && (
                          <div className="ml-4 mb-1">
                            {subItem.items.map((nestedItem: any) => (
                              <NavLink
                                key={nestedItem.id}
                                className={({ isActive }) =>
                                  `block py-0.5 text-[13px] tracking-wide ${isActive ? 'text-[#fbac17]' : 'text-black'}`
                                }
                                style={{ textDecoration: 'none' }}
                                onClick={close}
                                prefetch="intent"
                                to={nestedItem.url}
                              >
                                {nestedItem.title}
                              </NavLink>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <NavLink
                      key={subItem.id}
                      className={({ isActive }) =>
                        `block py-0.5 text-[14px] tracking-wide ${isActive ? 'text-[#fbac17]' : 'text-black'}`
                      }
                      style={{ textDecoration: 'none', fontSize: '14px' }}
                      onClick={close}
                      prefetch="intent"
                      to={subItem.url}
                    >
                      {subItem.title}
                    </NavLink>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
      {viewport === 'mobile' && <ShopByImages />}
    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav
      className="header-ctas text-black flex items-center gap-1 md:gap-3 lg:gap-4"
      role="navigation"
    >
      <div className="hidden md:block">
        <NavLink
          prefetch="intent"
          to="/account"
          className="text-black font-bold hover:text-gray-600 transition-colors text-xs md:text-sm lg:text-base"
          style={{ textDecoration: 'none' }}
        >
          <Suspense fallback="Log In">
            <Await resolve={isLoggedIn} errorElement="Sign in">
              {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Log In')}
            </Await>
          </Suspense>
        </NavLink>
      </div>
      <SearchToggle />
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const aside = useAside();

  return (
    <button
      className="flex items-center justify-center w-7 h-7 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 text-black hover:text-gray-600 transition-colors"
      onClick={() => aside.open('mobile')}
      aria-label="Open menu"
    >
      <img
        src={HamburgerIcon}
        alt="Menu"
        className="md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-11 xl:h-11"
        style={{filter: 'brightness(0)'}}
      />
    </button>
  );
}

function SearchToggle() {
  const aside = useAside();

  return (
    <button
      className="reset text-black hover:text-gray-600 transition-colors p-1"
      onClick={() => aside.open('search')}
    >
      <img
        src={SearchIcon}
        alt="Search"
        width="16"
        height="16"
        className="md:w-5 md:h-5"
        style={{filter: 'brightness(0)'}}
      />
    </button>
  );
}

function CartBadge({ count }: { count: number | null }) {
  const analytics = useAnalytics();
  const aside = useAside();
  const { publish, shop, cart, prevCart } = analytics;

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        aside.open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
      className="text-black font-semibold hover:text-gray-600 transition-colors relative"
    >
      {count !== null && count > 0 && (
        <span className="absolute -top-[6px] left-[4px] transform translate-x-1 text-black text-xs font-bold">
          {count}
        </span>
      )}
      <svg
        width="16"
        height="16"
        className="md:w-5 md:h-5"
        fill="none"
        stroke="black"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6"></path>
        <path d="M6 16v2"></path>
        <path d="M21 16v2"></path>
      </svg>
    </button>
  );
}

function CartToggle({ cart }: Pick<HeaderProps, 'cart'>) {
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
  return (
    <CartBadge count={getCartItemCount(cart as CartApiQueryFragment | null)} />
  );
}

function ShopByImages() {
  const [products, setProducts] = useState<ProductItemFragment[]>([]);
  const [loading, setLoading] = useState(true);
  const { close } = useAside();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/shop-all-products');
        const data = (await response.json()) as {
          products: ProductItemFragment[];
        };
        setProducts(data.products || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="shop-by-images mt-8">
        <h3 className="text-lg font-[900] mb-6 text-black tracking-wider">
          SHOP BY IMAGE
        </h3>
        <div className="flex gap-3 overflow-x-auto">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-32 h-96 bg-gray-200 animate-pulse flex-shrink-0" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="shop-by-images mt-8">
      <h3 className="text-lg font-[900] mb-6 text-black tracking-wider">
        SHOP BY IMAGE
      </h3>
      <div className="flex gap-3 overflow-x-auto">
        {products.slice(0, 6).map((product) => (
          <NavLink
            key={product.id}
            to={`/products/${product.handle}`}
            className="block hover:opacity-80 transition-opacity flex-shrink-0"
            onClick={close}
          >
            <img
              src={product.featuredImage?.url}
              alt={product.featuredImage?.altText || product.title}
              className="w-16 object-cover"
              style={{ height: '200px' }}
            />
          </NavLink>
        ))}
      </div>
    </div>
  );
}