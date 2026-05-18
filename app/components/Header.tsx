import { Suspense, useState, useEffect, useRef } from 'react';
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
import SearchIcon from "../assets/SearchIcon.svg";

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

// ── Desktop mega menu data ────────────────────────────────────────────────────

const shopColumns = [
  {
    id: 'sunscreen',
    title: 'SUNSCREEN',
    items: [
      { title: 'SPF 50+ Face and Body', url: '/products/spf-50-anti-aging-sunscreen', badge: 'BESTSELLER' as const },
      { title: 'SPF 30+ Spray', url: '/products/jacket-spray-sunscreen', badge: undefined },
      { title: 'SPF 50+ Mineral Stick', url: '/products/spf-50-mineral-stick-sunscreen', badge: undefined },
      { title: 'SPF 40+ Tinted Moisturizer', url: '/products/jacket-spf-40-tinted-moisturizer', badge: 'BESTSELLER' as const },
      { title: 'SPF 15 Lip Balm', url: '/products/lip-balm-by-jacket', badge: undefined },
    ],
  },
  {
    id: 'skincare',
    title: 'SKINCARE',
    items: [
      { title: 'Refresh Hydrating Serum', url: '/products/refresh-by-jacket', badge: undefined },
      { title: 'Refine Face Wash', url: '/products/refine-by-jacket', badge: undefined },
      { title: 'Platinum Peptide Cream', url: '/products/platinum-peptide-by-jacket-1', badge: 'NEW' as const },
      { title: 'Radiance Brightening Solution', url: '/products/radiance-accelerated-brightening-solution', badge: undefined },
    ],
  },
  {
    id: 'bundles',
    title: 'BUNDLES',
    items: [
      { title: 'Sun Day Essentials', url: '/products/sun-day-essentials-bundle', badge: undefined },
      { title: 'Wrinkle Reducer', url: '/products/wrinkle-reducer-bundle', badge: undefined },
      { title: 'Outdoor Beauty System', url: '/products/outdoor-beauty-system-bundle', badge: undefined },
    ],
  },
  {
    id: 'apparel',
    title: 'APPAREL',
    items: [
      { title: 'UPF 50+ Shirt', url: '/products/jacket-l-s-hooded-performance-shirt', badge: undefined },
      { title: 'Straw Sun Hat', url: '/products/jacket-lifeguard-hat-black-patch', badge: undefined },
      { title: 'Snapback Rope Hat', url: '/products/jacket-rope-snapback-hat-white', badge: undefined },
    ],
  },
];

const exploreItems = [
  { title: 'RETAILERS', url: '/pages/retailers' },
  { title: 'REVIEWS', url: '/pages/reviews' },
  { title: 'CONTACT', url: '/pages/contact' },
  { title: 'ABOUT', url: '/pages/about' },
];

const educationItems = [
  { title: 'FAQ', url: '/pages/faq' },
  { title: 'BLOG', url: '/blog' },
];

// ── Mobile menu items ─────────────────────────────────────────────────────────

const staticMenuItems = [
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

// ── Badge ─────────────────────────────────────────────────────────────────────

function Badge({ type }: { type: 'BESTSELLER' | 'NEW' }) {
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 text-[9px] font-bold tracking-wide rounded-sm flex-shrink-0 bg-[#FBAC1F] text-black">
      {type}
    </span>
  );
}

// ── Small dropdown (Explore / Education) ─────────────────────────────────────

function SmallDropdown({
  items,
  onMouseEnter,
  onMouseLeave,
  onLinkClick,
}: {
  items: { title: string; url: string }[];
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onLinkClick: () => void;
}) {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 top-full mt-1 bg-white border-t-2 border-[#fbac17] z-50 rounded-b-md"
      style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.10)', minWidth: '180px' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="py-2">
        {items.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            prefetch="intent"
            onClick={onLinkClick}
            className="block px-5 py-2 text-[14px] font-semibold tracking-[0.1em] text-black hover:text-[#fbac17] transition-colors"
            style={{ textDecoration: 'none' }}
          >
            {item.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

// ── Desktop nav ───────────────────────────────────────────────────────────────

function DesktopNav({
  activeDropdown,
  onEnter,
  onLeave,
  onLinkClick,
}: {
  activeDropdown: string | null;
  onEnter: (id: string) => void;
  onLeave: () => void;
  onLinkClick: () => void;
}) {
  // SHOP: yellow underline indicator + pb-1
  const shopBtnClass = (active: boolean) =>
    `flex items-center gap-1 font-semibold transition-colors pb-1 bg-transparent cursor-pointer ${
      active ? 'text-[#fbac17]' : 'text-black hover:text-[#fbac17]'
    }`;

  // FIX 3: added pb-1 so EXPLORE/EDUCATION sit at the same vertical position as SHOP
  const linkBtnClass = (active: boolean) =>
    `flex items-center gap-1 font-semibold transition-colors pb-1 bg-transparent cursor-pointer ${
      active ? 'text-[#fbac17]' : 'text-black hover:text-[#fbac17]'
    }`;

  return (
    <div className="flex items-center gap-8 lg:gap-10">

      {/* SHOP */}
      <div className="relative" onMouseEnter={() => onEnter('shop')} onMouseLeave={onLeave}>
        <button
          className={shopBtnClass(activeDropdown === 'shop')}
          style={{ fontFamily: 'inherit', fontSize: '16px', letterSpacing: '0.12em' }}
        >
          SHOP
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            className={`transition-transform duration-200 ${activeDropdown === 'shop' ? 'rotate-180' : ''}`}>
            <polyline points="6,9 12,15 18,9" />
          </svg>
        </button>
      </div>

      {/* EXPLORE */}
      <div className="relative" onMouseEnter={() => onEnter('explore')} onMouseLeave={onLeave}>
        <button
          className={linkBtnClass(activeDropdown === 'explore')}
          style={{ fontFamily: 'inherit', fontSize: '16px', letterSpacing: '0.12em' }}
        >
          EXPLORE
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            className={`transition-transform duration-200 ${activeDropdown === 'explore' ? 'rotate-180' : ''}`}>
            <polyline points="6,9 12,15 18,9" />
          </svg>
        </button>
        {activeDropdown === 'explore' && (
          <SmallDropdown
            items={exploreItems}
            onMouseEnter={() => onEnter('explore')}
            onMouseLeave={onLeave}
            onLinkClick={onLinkClick}
          />
        )}
      </div>

      {/* EDUCATION */}
      <div className="relative" onMouseEnter={() => onEnter('education')} onMouseLeave={onLeave}>
        <button
          className={linkBtnClass(activeDropdown === 'education')}
          style={{ fontFamily: 'inherit', fontSize: '16px', letterSpacing: '0.12em' }}
        >
          EDUCATION
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            className={`transition-transform duration-200 ${activeDropdown === 'education' ? 'rotate-180' : ''}`}>
            <polyline points="6,9 12,15 18,9" />
          </svg>
        </button>
        {activeDropdown === 'education' && (
          <SmallDropdown
            items={educationItems}
            onMouseEnter={() => onEnter('education')}
            onMouseLeave={onLeave}
            onLinkClick={onLinkClick}
          />
        )}
      </div>

    </div>
  );
}

// ── Header ────────────────────────────────────────────────────────────────────

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const { shop, menu } = header;
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnter = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(id);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const closeMegaMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(null);
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`w-full z-40 transition-all duration-300 ${
        isScrolled ? 'fixed top-0 left-0 right-0' : 'relative'
      }`}
    >
      <div className="relative w-full mx-auto">
        {/* Background */}
        <div
          className="absolute top-0 left-0 w-full h-full transition-opacity duration-300"
          style={{ background: '#FFFFFF', opacity: isScrolled ? 0.8 : 1 }}
        />

        {/* Nav bar */}
        <div className="relative flex items-center justify-between h-[44px] md:h-[56px] lg:h-[77px] px-3 md:px-8 lg:px-12 xl:px-16">

          {/* LEFT: Hamburger (mobile) + Logo (desktop) */}
          <div className="flex items-center z-10 flex-shrink-0">
            <div className="md:hidden">
              <HeaderMenuMobileToggle />
            </div>
            <div className="hidden md:block">
              <NavLink
                prefetch="intent"
                to="/"
                onClick={handleLogoClick}
                className="flex items-center select-none"
                style={{ textDecoration: 'none' }}
                end
              >
                <img
                  src="/images/JACKET%20Logo_Black.svg"
                  alt="Logo"
                  className="block h-[160px] lg:h-[200px] xl:h-[230px] object-contain"
                />
              </NavLink>
            </div>
          </div>

          {/* Mobile: Logo centered absolutely */}
          <div className="md:hidden absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <NavLink
              prefetch="intent"
              to="/"
              onClick={handleLogoClick}
              className="flex items-center select-none"
              style={{ textDecoration: 'none' }}
              end
            >
              <img
                src="/images/JACKET%20Logo_Black.svg"
                alt="Logo"
                className="block h-[140px] object-contain mt-3"
              />
            </NavLink>
          </div>

          {/* CENTER: Desktop nav — absolutely centered */}
          <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none z-10">
            <div className="pointer-events-auto">
              <DesktopNav
                activeDropdown={activeDropdown}
                onEnter={handleEnter}
                onLeave={handleLeave}
                onLinkClick={closeMegaMenu}
              />
            </div>
          </div>

          {/* RIGHT: CTAs */}
          <div className="flex items-center z-10 flex-shrink-0 gap-1 md:gap-3 lg:gap-4">
            <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
          </div>

        </div>
      </div>

      {/* SHOP Mega Menu */}
      {activeDropdown === 'shop' && (
        <div
          className="hidden md:block absolute left-0 right-0 top-full bg-white z-30 border-t-2 border-[#fbac17]"
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
          onMouseEnter={() => handleEnter('shop')}
          onMouseLeave={handleLeave}
        >
          <div className="max-w-7xl mx-auto px-8 lg:px-12 py-8 lg:py-10">

            {/* 4 columns */}
            <div className="grid grid-cols-4 gap-8 lg:gap-12 mb-8">
              {shopColumns.map((col) => (
                <div key={col.id}>
                  <p className="text-[13px] font-bold tracking-[0.14em] text-[#fbac17] mb-4 uppercase">
                    {col.title}
                  </p>
                  <div className="flex flex-col gap-3">
                    {col.items.map((item) => (
                      // FIX 2: flex-col so badge sits below text — text never wraps due to competing width
                      <NavLink
                        key={item.url}
                        to={item.url}
                        prefetch="intent"
                        onClick={closeMegaMenu}
                        className="flex items-center gap-2 text-[14px] text-black hover:text-[#fbac17] transition-colors"
                        style={{ textDecoration: 'none' }}
                       >
                      {item.title}
                      {item.badge && <Badge type={item.badge} />}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* SHOP ALL — bottom */}
            <div className="pt-6 border-t border-gray-100">
              <NavLink
                to="/collections/shop-all"
                prefetch="intent"
                onClick={closeMegaMenu}
                className="inline-block bg-black text-white text-[13px] font-bold tracking-[0.1em] px-6 py-2.5 hover:bg-[#fbac17] hover:text-black transition-colors"
                style={{ textDecoration: 'none' }}
              >
                SHOP ALL
              </NavLink>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}

// ── HeaderMenu (mobile drawer) ────────────────────────────────────────────────

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
  const { close } = useAside();
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

  return (
    <nav className="flex flex-col" role="navigation">
      {viewport === 'mobile' && isLoggedIn && (
        <div className="mb-4 pb-4 border-b border-gray-200">
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
          <div key={item.id} className="mb-0">
            <NavLink
              className={() =>
                `block py-1 font-bold text-[14px] tracking-wider text-black ${hasSubItems ? 'has-submenu' : ''}`
              }
              style={{ textDecoration: 'none' }}
              end
              onClick={hasSubItems ? (e) => toggleSubmenu(item.id, e) : close}
              prefetch="intent"
              to={hasSubItems ? '#' : item.url}
            >
              <div className="flex items-center justify-between">
                {item.title}
                {hasSubItems && (
                  <svg
                    className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  >
                    <polyline points="6,9 12,15 18,9" />
                  </svg>
                )}
              </div>
            </NavLink>
            {hasSubItems && isExpanded && (
              <div className="ml-4 mt-1 mb-2">
                {item.items.map((subItem: any) => {
                  const hasNestedItems = subItem.items && subItem.items.length > 0;
                  const isSubExpanded = expandedItems.has(subItem.id);
                  if (hasNestedItems) {
                    return (
                      <div key={subItem.id}>
                        <button
                          className="flex items-center justify-between w-full py-1 font-bold text-[14px] tracking-wider text-left text-black"
                          onClick={(e) => toggleSubmenu(subItem.id, e)}
                        >
                          {subItem.title}
                          <svg
                            className={`w-3 h-3 transition-transform ${isSubExpanded ? 'rotate-180' : ''}`}
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                          >
                            <polyline points="6,9 12,15 18,9" />
                          </svg>
                        </button>
                        {isSubExpanded && (
                          <div className="ml-4 mb-1">
                            {subItem.items.map((nestedItem: any) => (
                              <NavLink
                                key={nestedItem.id}
                                className={({ isActive }) =>
                                  `block py-0.5 text-[14px] tracking-wide ${isActive ? 'text-[#fbac17]' : 'text-black'}`
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
                      style={{ textDecoration: 'none' }}
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
    </nav>
  );
}

// ── CTAs ──────────────────────────────────────────────────────────────────────

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav className="header-ctas text-black flex items-center gap-1 md:gap-3 lg:gap-4" role="navigation">
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
      className="flex items-center justify-center w-7 h-7 md:w-12 md:h-12 text-black hover:text-gray-600 transition-colors"
      onClick={() => aside.open('mobile')}
      aria-label="Open menu"
    >
      <img
        src={HamburgerIcon}
        alt="Menu"
        className="md:w-8 md:h-8"
        style={{ filter: 'brightness(0)' }}
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
        style={{ filter: 'brightness(0)' }}
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
        width="16" height="16" className="md:w-5 md:h-5"
        fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6" />
        <path d="M6 16v2" />
        <path d="M21 16v2" />
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
  return <CartBadge count={getCartItemCount(cart as CartApiQueryFragment | null)} />;
}