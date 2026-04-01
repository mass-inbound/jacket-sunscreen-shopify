import {useEffect, useState} from 'react';

/**
 * Shopify Forms embed only retries ~500ms for `window.Shopify.customerPrivacy`.
 * On SPA navigation that object often appears later, so we wait before mounting the embed.
 */
function isShopifyFormsRuntimeReady(): boolean {
  if (typeof window === 'undefined') return false;
  const shopify = (
    window as unknown as {
      Shopify?: {customerPrivacy?: unknown} | null;
    }
  ).Shopify;
  return (
    typeof shopify === 'object' &&
    shopify !== null &&
    'customerPrivacy' in shopify
  );
}

const POLL_MS = 100;
const MAX_ATTEMPTS = 120; // 12s

export function useShopifyFormsRuntimeReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isShopifyFormsRuntimeReady()) {
      setReady(true);
      return;
    }

    let attempts = 0;
    const id = window.setInterval(() => {
      attempts += 1;
      if (isShopifyFormsRuntimeReady() || attempts >= MAX_ATTEMPTS) {
        window.clearInterval(id);
        setReady(true);
      }
    }, POLL_MS);

    return () => window.clearInterval(id);
  }, []);

  return ready;
}
