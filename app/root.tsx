import {Analytics, getShopAnalytics, useNonce, Script} from '@shopify/hydrogen';
import {type LoaderFunctionArgs} from 'react-router';
import {
  Outlet,
  useRouteError,
  isRouteErrorResponse,
  type ShouldRevalidateFunction,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from 'react-router';
import {Suspense, useEffect} from 'react';
import type {HeaderQuery} from 'storefrontapi.generated';
import favicon from '~/assets/favicon.svg';
import JacketFavicon from '~/assets/Jacket-Favicon.jpg';
import {FOOTER_QUERY, HEADER_QUERY} from '~/lib/fragments';
import resetStyles from '~/styles/reset.css?url';
import appStyles from '~/styles/app.css?url';
import {PageLayout} from './components/PageLayout';
import {GoogleTagManager} from '~/components/GoogleTagManager';
import React from 'react';

export type RootLoader = typeof loader;

/**
 * This is important to avoid re-fetching root queries on sub-navigations
 */
export const shouldRevalidate: ShouldRevalidateFunction = ({
  formMethod,
  currentUrl,
  nextUrl,
  defaultShouldRevalidate,
}) => {
  // revalidate when a mutation is performed e.g add to cart, login...
  if (formMethod && formMethod !== 'GET') return true;

  // revalidate when manually revalidating via useRevalidator
  if (currentUrl.toString() === nextUrl.toString()) return true;

  // Use defaultShouldRevalidate to ensure cart updates work properly
  return defaultShouldRevalidate;
};

/**
 * The main and reset stylesheets are added in the Layout component
 * to prevent a bug in development HMR updates.
 */
export function links() {
  return [
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {rel: 'icon', type: 'image/jpeg', href: JacketFavicon},
  ];
}

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  const {storefront, env} = args.context;

  let shop = null;
  try {
    const analyticsResult = getShopAnalytics({
      storefront,
      publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
    });
    shop =
      typeof analyticsResult?.then === 'function'
        ? await analyticsResult
        : analyticsResult;
  } catch (error) {
    console.error('Error loading shop analytics:', error);
  }

  return {
    ...deferredData,
    ...criticalData,
    publicStoreDomain: env.PUBLIC_STORE_DOMAIN,
    shop: shop,
    consent: {
      checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN,
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      withPrivacyBanner: false,
      country: args.context.storefront.i18n.country,
      language: args.context.storefront.i18n.language,
    },
  };
}

/**
 * Load data necessary for rendering content above the fold.
 */
async function loadCriticalData({context}: LoaderFunctionArgs) {
  const {storefront, env} = context;

  try {
    const [header] = await Promise.all([
      storefront.query(HEADER_QUERY, {
        cache: storefront.CacheLong(),
        variables: {
          headerMenuHandle: 'main-menu',
        },
      }),
    ]);

    return {header};
  } catch (error) {
    console.error('Error loading critical header data:', error);

    const fallbackHeader: HeaderQuery = {
      shop: {
        id: 'fallback-shop',
        name: 'Store',
        description: '',
        primaryDomain: {
          url: `https://${env?.PUBLIC_STORE_DOMAIN ?? 'example.myshopify.com'}`,
        },
        brand: null,
      },
      menu: {
        id: 'fallback-menu',
        items: [],
      },
    };

    return {header: fallbackHeader};
  }
}

/**
 * Load data for rendering content below the fold.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  const {storefront, customerAccount, cart} = context;

  const footer = storefront
    .query(FOOTER_QUERY, {
      cache: storefront.CacheLong(),
      variables: {
        footerMenuHandle: 'footer',
      },
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
  return {
    cart: cart.get(),
    isLoggedIn: customerAccount.isLoggedIn(),
    footer,
  };
}

export function Layout({children}: {children?: React.ReactNode}) {
  const nonce = useNonce();
  const data = useRouteLoaderData<RootLoader>('root');

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="stylesheet" href={resetStyles}></link>
        <link rel="stylesheet" href={appStyles}></link>
        <Meta />
        <Links />
        {/* @description Add Google Tag Manager script to head */}
        <Script
         nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KS2ZHPMR');`,
         }}
        ></Script>
         {/* --- PASTE META PIXEL CODE START --- */}
        {/* REMOVED Facebook Pixel <script> from head to avoid hydration mismatch */}
        {/* --- PASTE META PIXEL CODE END --- */}

        {/* This is the corrected placement for the Analytics Provider */}
        {data ? (
          <Analytics.Provider
            cart={data.cart}
            shop={data.shop}
            consent={data.consent}
          />
        ) : null}
      </head>
      <body suppressHydrationWarning>
        {/* Facebook Pixel client-only injection */}
        <FacebookPixel />
        {/* @description Add Google Tag Manager noscript iframe for users without JavaScript */}
        <noscript>
          <iframe
            title="Google Tag Manager"
            src="https://www.googletagmanager.com/ns.html?id=GTM-KS2ZHPMR"
            height="0"
            width="0"
            style={{
              display: 'none',
              visibility: 'hidden',
            }}
          ></iframe>
        </noscript>
        {/* The provider has been moved from here to the <head> */}
        <Suspense fallback={<div>Loading...</div>}>
          <PageLayout {...data}>{children}</PageLayout>
        </Suspense>
        {/* @description Initialize Google Tag Manager analytics integration */}
        <GoogleTagManager />

        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage = 'Unknown error';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  console.error('Root Error Boundary caught:', error);

  return (
    <div className="route-error">
      <h1>Oops</h1>
      <h2>{errorStatus}</h2>
      {errorMessage && (
        <fieldset>
          <pre>{errorMessage}</pre>
        </fieldset>
      )}
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Reload Page
      </button>
    </div>
  );
}

function FacebookPixel() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.fbq) return;
    (function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    if (window.fbq) {
      window.fbq('init', '612071937741103');
      window.fbq('track', 'PageView');
    }
  }, []);
  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src="https://www.facebook.com/tr?id=612071937741103&ev=PageView&noscript=1"
        alt=""
      />
    </noscript>
  );
}
