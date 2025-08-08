import {Suspense, useId} from 'react';
import React from 'react';
import { Await, Link } from 'react-router';
import type {
  CartApiQueryFragment,
  FooterQuery,
  HeaderQuery,
} from 'storefrontapi.generated';
import {Aside, useAside} from '~/components/Aside';
import {CartMain} from '~/components/CartMain';
import {Footer} from '~/components/Footer';
import {Header, HeaderMenu} from '~/components/Header';
import {AnnouncementBar} from '~/components/homepage/AnnouncementBar';
import {
  SEARCH_ENDPOINT,
  SearchFormPredictive,
} from '~/components/SearchFormPredictive';
import {SearchResultsPredictive} from '~/components/SearchResultsPredictive';
import {getCartItemCount} from '~/lib/inventory';

interface PageLayoutProps {
  cart: Promise<CartApiQueryFragment | null>;
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  children?: React.ReactNode;
}

export function PageLayout({
  cart,
  children = null,
  footer,
  header,
  isLoggedIn,
  publicStoreDomain,
}: PageLayoutProps) {
  return (
    <ErrorBoundary>
      <Aside.Provider>
        <CartAside cart={cart} />
        <SearchAside />
        <MobileMenuAside header={header} publicStoreDomain={publicStoreDomain} />
        <AnnouncementBar />
        {header && (
          <Header
            header={header}
            cart={cart}
            isLoggedIn={isLoggedIn}
            publicStoreDomain={publicStoreDomain}
          />
        )}
        <main>{children}</main>
        <Footer
          footer={footer}
          header={header}
          publicStoreDomain={publicStoreDomain}
        />
      </Aside.Provider>
    </ErrorBoundary>
  );
}

// Simple Error Boundary Component
class ErrorBoundary extends React.Component<
  {children: React.ReactNode},
  {hasError: boolean}
> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error: Error) {
    console.error('PageLayout Error Boundary:', error);
    return {hasError: true};
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('PageLayout Error Boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">Something went wrong</h2>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#FBAC18] text-white rounded hover:bg-[#e69b15]"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function CartAside({cart}: {cart: PageLayoutProps['cart']}) {
  return (
    <Suspense fallback={null}>
      <Await resolve={cart}>
        {(cart) => {
          const itemCount = getCartItemCount(cart);
          return (
            <Aside type="cart" heading="CART" cart={cart}>
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <CartMain cart={cart} layout="aside" />
                </div>
              </div>
            </Aside>
          );
        }}
      </Await>
    </Suspense>
  );
}

function SearchAside() {
  const queriesDatalistId = useId();
  return (
    <Aside type="search" heading="Search Products">
      <div className="predictive-search h-full flex flex-col">
        {/* Enhanced Search Input */}
        <div className="p-6 border-b border-gray-200">
          <SearchFormPredictive>
            {({fetchResults, goToSearch, inputRef, fetcher}) => (
              <div className="relative">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    name="q"
                    onChange={fetchResults}
                    onFocus={fetchResults}
                    placeholder="Search for products..."
                    ref={inputRef}
                    type="search"
                    list={queriesDatalistId}
                    className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-[#FBAC18] focus:border-[#FBAC18] transition-colors duration-200"
                    autoComplete="off"
                  />
                  {fetcher.state === 'loading' && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#FBAC18]"></div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </SearchFormPredictive>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto">
          <SearchResultsPredictive>
            {({items, total, term, state, closeSearch}) => {
              const {products, queries} = items;

              if (state === 'loading' && term.current) {
                return (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FBAC18] mb-4"></div>
                    <p className="text-gray-500">Searching products...</p>
                  </div>
                );
              }

              if (!term.current) {
                return (
                  <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                    <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Search Products</h3>
                    <p className="text-gray-500">Start typing to find your perfect products</p>
                  </div>
                );
              }

              if (!total) {
                return (
                  <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                    <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.1-5.5-2.709" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Products Found</h3>
                    <p className="text-gray-500">
                      No results found for <span className="font-medium">&ldquo;{term.current}&rdquo;</span>
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Try adjusting your search terms</p>
                  </div>
                );
              }

              return (
                <div className="py-4">
                  <SearchResultsPredictive.Queries
                    queries={queries}
                    queriesDatalistId={queriesDatalistId}
                  />
                  
                  {products.length > 0 && (
                    <SearchResultsPredictive.Products
                      products={products}
                      closeSearch={closeSearch}
                      term={term}
                    />
                  )}
                </div>
              );
            }}
          </SearchResultsPredictive>
        </div>
      </div>
    </Aside>
  );
}

function MobileMenuAside({
  header,
  publicStoreDomain,
}: {
  header: PageLayoutProps['header'];
  publicStoreDomain: PageLayoutProps['publicStoreDomain'];
}) {
  return (
    header.menu &&
    header.shop.primaryDomain?.url && (
      <Aside type="mobile" heading="MENU">
        <HeaderMenu
          menu={header.menu}
          viewport="mobile"
          primaryDomainUrl={header.shop.primaryDomain.url}
          publicStoreDomain={publicStoreDomain}
        />
      </Aside>
    )
  );
}
