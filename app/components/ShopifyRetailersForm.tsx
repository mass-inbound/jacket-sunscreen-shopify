import {useEffect, useRef} from 'react';
import {ShopifyForm as ShopifyFormsEmbed} from 'shopify-hydrogen-form-embed';
import {rebootstrapShopifyFormsApp} from '~/lib/shopify-forms-rebootstrap';

const SHOPIFY_FORMS_SHOP_URL = 'jacket-sunscreen.myshopify.com';
/** Retailers signup form in Shopify Admin → Apps → Forms */
const SHOPIFY_RETAILERS_FORM_ID = '1014399';

type ShopifyRetailersFormProps = {
  className?: string;
};

export function ShopifyRetailersForm({className = ''}: ShopifyRetailersFormProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      });
      if (cancelled) return;

      await new Promise((r) => setTimeout(r, 1200));
      if (cancelled) return;

      const embeds = Array.from(
        containerRef.current?.querySelectorAll('form-embed') ?? [],
      );

      if (embeds.length > 1) {
        embeds.slice(1).forEach((node) => node.remove());
        return;
      }

      if (embeds.length === 1) return;

      try {
        await rebootstrapShopifyFormsApp();
      } catch (e) {
        console.error('[ShopifyRetailersForm] Forms rebootstrap failed:', e);
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <ShopifyFormsEmbed
        key={SHOPIFY_RETAILERS_FORM_ID}
        shopUrl={SHOPIFY_FORMS_SHOP_URL}
        formId={SHOPIFY_RETAILERS_FORM_ID}
        formStyle={`
          .form-container {
            border-radius: 8px;
          }
          button {
            background-color: #FBAC18;
            color: #000000;
            border-radius: 0;
            border: none;
            font-weight: 700;
          }
          button:hover {
            filter: brightness(0.95);
          }
        `}
        formProps={{
          'data-forms-padding-top': '16',
          'data-forms-padding-bottom': '16',
          'data-forms-padding-left': '12',
          'data-forms-padding-right': '12',
          'data-forms-text-color': '#202020',
          'data-forms-button-background-color': '#FBAC18',
          'data-forms-button-label-color': '#000000',
          'data-forms-background-color': '#FFFFFF',
        }}
      />
    </div>
  );
}