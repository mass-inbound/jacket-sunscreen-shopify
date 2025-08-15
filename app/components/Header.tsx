import {Suspense, useState, useEffect} from 'react';
import { Await, NavLink, useAsyncValue, useLocation } from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment, CollectionFragment, ProductItemFragment} from 'storefrontapi.generated';
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
      <div className={`flex px-2 md:px-2 justify-center items-center py-2 md:py-[15px] ${isScrolled ? 'pt-4 md:pt-[40px]' : ''} bg-transparent`}>
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
          <div className="relative flex items-center justify-between h-[44px] md:h-[52.3px] lg:h-[79.3px] px-24 md:px-32 lg:px-48 xl:px-64">
            {/* Left: Mobile Menu Toggle */}
            <div className="flex items-center z-10">
              <HeaderMenuMobileToggle />
            </div>
            
            {/* Center: Logo - Absolutely positioned for true center */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <NavLink prefetch="intent" to="/" className="flex items-center select-none" style={{ textDecoration: 'none' }} end>
                <img 
                  src="/assets/logo2.png" 
                  alt="Logo" 
                  className="block w-[100px] h-[28px] md:w-[120px] md:h-[32px] lg:w-[160px] lg:h-[40px] xl:w-[180px] xl:h-[48px] object-contain"
                />
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
  const className = `header-menu-${viewport} ${viewport === 'desktop' ? 'hidden md:flex gap-4 lg:gap-6 items-center z-10' : 'flex flex-col'} `;
  const {close} = useAside();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [products, setProducts] = useState<ProductItemFragment[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const location = useLocation();

  // Fetch products dynamically from nav-menu-products collection
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/nav-menu-products');
        const data = await response.json() as {products: ProductItemFragment[]};
        setProducts(data.products || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  // Generate dynamic shop items from nav-menu-products collection
  const generateShopItems = () => {
    if (productsLoading) {
      return [
        { id: 'shop-all', title: 'SHOP ALL', url: '/collections/all' }
      ];
    }

    const shopItems = [
      { id: 'shop-all', title: 'SHOP ALL', url: '/collections/all' }
    ];

    // Add dynamic products from nav-menu-products collection
    products.forEach((product) => {
      shopItems.push({
        id: product.handle,
        title: product.title.toUpperCase(),
        url: `/products/${product.handle}`
      });
    });

    // Add EXTRAS as the last item
    shopItems.push({
      id: 'extras',
      title: 'EXTRAS',
      url: '/collections/extras'
    });

    return shopItems;
  };

  // Static menu items with dynamic shop items
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
      url: '/collections/all',
      items: generateShopItems()
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

  // Function to check if a menu item should be active based on current location
  const isMenuItemActive = (item: any, pathname: string) => {
    if (item.id === 'home' && pathname === '/') {
      return true;
    }
    if (item.id === 'shop') {
      // Shop is active for /collections/all, /collections/extras, or any /products/* route
      return pathname === '/collections/all' || 
             pathname === '/collections/extras' || 
             pathname.startsWith('/products/');
    }
    if (item.id === 'explore') {
      // Explore is active for any of its submenu items
      return pathname === '/pages/retailers' || 
             pathname === '/pages/reviews' || 
             pathname === '/pages/contact' || 
             pathname === '/pages/about';
    }
    if (item.id === 'education') {
      // Education is active for FAQ
      return pathname === '/pages/faq';
    }
    return false;
  };

  return (
    <nav className={className} role="navigation">
      {staticMenuItems.map((item) => {
        const hasSubItems = item.items && item.items.length > 0;
        const isExpanded = expandedItems.has(item.id);
        
        return (
          <div key={item.id} className={viewport === 'mobile' ? 'mb-0' : ''}>
            <NavLink
              className={({ isActive }) => {
                // For parent items with submenus, never highlight them
                // For direct menu items without submenus, use normal isActive
                let shouldHighlight = false;
                if (!hasSubItems) {
                  shouldHighlight = isActive;
                }
                // Note: Parent items with submenus will never be highlighted
                
                const classes = `${viewport === 'desktop' 
                  ? `font-semibold text-[14px] lg:text-[14px] tracking-widest transition-colors px-1 py-0.5 rounded ${
                      shouldHighlight 
                        ? 'text-[#fbac17] !important' 
                        : 'text-white hover:text-black'
                    }` 
                  : `block py-1 font-bold text-[14px] tracking-wider border-0 ${
                      shouldHighlight 
                        ? 'text-[#fbac17] !important' 
                        : 'text-black'
                    }`
                } ${hasSubItems ? 'has-submenu' : ''} ${isExpanded ? 'expanded' : ''}`;
                
                return classes;
              }}
              style={viewport === 'desktop' ? { letterSpacing: '0.12em', textDecoration: 'none' , fontSize:"14px"} : { textDecoration: 'none' }}
              end
              onClick={hasSubItems && viewport === 'mobile' ? (e) => toggleSubmenu(item.id, e) : close}
              prefetch="intent"
              to={hasSubItems && viewport === 'mobile' ? '#' : item.url}
            >
              <div className="flex items-center justify-between">
                {item.title}
                {viewport === 'mobile' && hasSubItems && (
                  <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6,9 12,15 18,9"></polyline>
                  </svg>
                )}
              </div>
            </NavLink>
            {viewport === 'mobile' && hasSubItems && isExpanded && (
              <div className="ml-4 mt-1 mb-2">
                {item.items.map((subItem) => (
                  <NavLink
                    key={subItem.id}
                    className={({ isActive }) => {
                      
                      return `block py-0.5 text-[14px] tracking-wide ${
                        isActive 
                          ? 'text-[#fbac17]' 
                          : 'text-black'
                      }`;
                    }}
                    style={{ textDecoration: 'none', fontSize: '14px' }}
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
      {viewport === 'mobile' && <ShopByImages />}
    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav className="header-ctas text-white flex items-center gap-2 md:gap-3 lg:gap-4" role="navigation">
      <NavLink 
        prefetch="intent" 
        to="/account" 
        className="text-white font-bold hover:text-gray-200 transition-colors text-xs md:text-sm lg:text-base"
        style={{ textDecoration: 'none' }}
      >
        <Suspense fallback="Log In">
          <Await resolve={isLoggedIn} errorElement="Sign in">
            {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Log In')}
          </Await>
        </Suspense>
      </NavLink>
      <SearchToggle />
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const aside = useAside(); // Remove try-catch, let it throw if context is missing
  
  return (
    <button
      className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 text-black hover:text-gray-600 transition-colors"
      onClick={() => aside.open('mobile')}
      aria-label="Open menu"
    >
      <img src="/assets/sandIcon.svg" alt="Menu" width="24" height="24" className="md:w-7 md:h-7" />
    </button>
  );
}

function SearchToggle() {
  const aside = useAside(); // Remove try-catch, let it throw if context is missing
  
  return (
    <button className="reset text-black hover:text-gray-600 transition-colors p-1" onClick={() => aside.open('search')}>
      <img src="/assets/searchIcon.svg" alt="Search" width="18" height="18" className="md:w-5 md:h-5" />
    </button>
  );
}

function CartBadge({count}: {count: number | null}) {
  const analytics = useAnalytics();
  const aside = useAside(); // Remove try-catch, let it throw if context is missing

  const {publish, shop, cart, prevCart} = analytics;

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
          <span className="absolute -top-[8px] left-[5px] transform translate-x-1 text-black text-xs font-bold">
            {count}
          </span>
        )}
      <svg width="18" height="18" className="md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6"></path>
        <path d="M6 16v2"></path>
        <path d="M21 16v2"></path>
      </svg>
     
     
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


// Add ShopByImages component
function ShopByImages() {
  const [products, setProducts] = useState<ProductItemFragment[]>([]);
  const [loading, setLoading] = useState(true);
  const {close} = useAside();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/nav-menu-products');
        const data = await response.json() as {products: ProductItemFragment[]};
        // Use products in the order they appear in the collection (no sorting)
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
        <h3 className="text-lg font-[900] mb-6 text-black tracking-wider">SHOP BY IMAGE</h3>
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
      <h3 className="text-lg font-[900] mb-6 text-black tracking-wider">SHOP BY IMAGE</h3>
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
