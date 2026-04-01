import {redirect} from 'react-router';
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';

/**
 * Newsletter full-page route is disabled for now — redirect home.
 * Previous page implementation is preserved below in comments.
 */
export async function loader(_args: LoaderFunctionArgs) {
  return redirect('/');
}

export default function NewsletterSignupPage() {
  return null;
}

/*
import {Link, type MetaFunction} from 'react-router';
import {ShopifyNewsletterForm} from '~/components/homepage/ShopifyNewsletterForm';

export const meta: MetaFunction = () => {
  return [{title: 'Newsletter Signup | Jacket Sunscreen'}];
};

export default function NewsletterSignupPage() {
  return (
    <div className="px-4 py-12 md:px-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl mb-3">JACKET UP! Stay Protected & Save 15%</h1>
      <p className="text-sm md:text-base mb-6 text-gray-700">
        Join the JACKET Sunscreen community for first-order savings and early access to launches.
      </p>

      <ShopifyNewsletterForm className="w-full min-h-[460px] border border-gray-300 rounded-md bg-white p-3 md:p-4" />

      <div className="mt-6">
        <Link
          to="/"
          className="inline-block px-4 py-2 bg-[#FBAC18] text-black font-semibold hover:brightness-95 transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
*/
