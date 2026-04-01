/**
 * Shopify Forms `index.js` runs a one-shot bootstrap: fetch form_instances and mount
 * inline forms only if `[data-forms-id=forms-root-{id}]` exists at that moment.
 * After client navigation, the module stays cached — new containers never get picked up.
 * Importing `index.js` with a unique URL creates a fresh module graph and re-runs bootstrap.
 */
const SHOPIFY_FORMS_INDEX_BASE =
  'https://cdn.shopify.com/extensions/b7bffa7f-3cdd-4adf-8b5e-155850befa0b/forms-1629/assets/index.js';

export async function waitForFormEmbedCustomElement(
  maxMs = 10000,
): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < maxMs) {
    if (typeof customElements !== 'undefined' && customElements.get('form-embed')) {
      return;
    }
    await new Promise((r) => setTimeout(r, 50));
  }
}

export async function rebootstrapShopifyFormsApp(): Promise<void> {
  if (typeof window === 'undefined') return;
  await waitForFormEmbedCustomElement();
  const url = `${SHOPIFY_FORMS_INDEX_BASE}?hydrogen_rebootstrap=${Date.now()}`;
  await import(/* @vite-ignore */ url);
}
