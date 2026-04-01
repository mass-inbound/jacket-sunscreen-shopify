import {useEffect} from 'react';
import {ShopifyForm as ShopifyFormsEmbed} from 'shopify-hydrogen-form-embed';
import {rebootstrapShopifyFormsApp} from '~/lib/shopify-forms-rebootstrap';

const SHOPIFY_FORMS_SHOP_URL = 'jacket-sunscreen.myshopify.com';
/** Contact form in Shopify Admin → Apps → Forms */
const SHOPIFY_CONTACT_FORM_ID = '935780';

type ShopifyContactFormProps = {
  className?: string;
};

export function ShopifyContactForm({className = ''}: ShopifyContactFormProps) {
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      });
      if (cancelled) return;
      try {
        await rebootstrapShopifyFormsApp();
      } catch (e) {
        console.error('[ShopifyContactForm] Forms rebootstrap failed:', e);
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className={className}>
      <ShopifyFormsEmbed
        key={SHOPIFY_CONTACT_FORM_ID}
        shopUrl={SHOPIFY_FORMS_SHOP_URL}
        formId={SHOPIFY_CONTACT_FORM_ID}
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
