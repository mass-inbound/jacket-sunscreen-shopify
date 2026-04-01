import {ShopifyForm as ShopifyFormsEmbed} from 'shopify-hydrogen-form-embed';
import {useShopifyFormsRuntimeReady} from '~/hooks/useShopifyFormsRuntimeReady';

type ShopifyNewsletterFormProps = {
  className?: string;
  compact?: boolean;
};

const SHOPIFY_FORMS_SHOP_URL: string = 'jacket-sunscreen.myshopify.com';
const PLACEHOLDER_FORM_ID = 'SHOPIFY_FORM_ID';
const SHOPIFY_NEWSLETTER_FORM_ID: string = '935259';

export function ShopifyNewsletterForm({
  className = '',
  compact = false,
}: ShopifyNewsletterFormProps) {
  const runtimeReady = useShopifyFormsRuntimeReady();

  const formNotConfigured =
    !SHOPIFY_NEWSLETTER_FORM_ID ||
    SHOPIFY_NEWSLETTER_FORM_ID === PLACEHOLDER_FORM_ID;

  if (formNotConfigured) {
    return (
      <div
        className={`border border-yellow-400 bg-yellow-50 text-yellow-900 p-4 rounded-md ${className}`}
      >
        Set your Shopify Forms ID in
        <code> app/components/homepage/ShopifyNewsletterForm.tsx </code>
        by updating <code>SHOPIFY_NEWSLETTER_FORM_ID</code>.
      </div>
    );
  }

  return (
    <div className={className}>
      {!runtimeReady ? (
        <div className="flex min-h-[200px] items-center justify-center text-sm text-gray-500">
          Loading…
        </div>
      ) : (
        <ShopifyFormsEmbed
          key={SHOPIFY_NEWSLETTER_FORM_ID}
          shopUrl={SHOPIFY_FORMS_SHOP_URL}
          formId={SHOPIFY_NEWSLETTER_FORM_ID}
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
          'data-forms-padding-top': compact ? '8' : '16',
          'data-forms-padding-bottom': compact ? '8' : '16',
          'data-forms-padding-left': compact ? '0' : '12',
          'data-forms-padding-right': compact ? '0' : '12',
          'data-forms-text-color': compact ? '#FFFFFF' : '#202020',
          'data-forms-button-background-color': '#FBAC18',
          'data-forms-button-label-color': '#000000',
          'data-forms-background-color': compact ? '#1B1A1B' : '#FFFFFF',
        }}
        />
      )}
    </div>
  );
}