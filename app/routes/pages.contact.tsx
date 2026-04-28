import { type LoaderFunctionArgs } from 'react-router';
import { type MetaFunction, Link } from 'react-router';
import { ShopifyContactForm } from '~/components/ShopifyContactForm';

export const meta: MetaFunction<typeof loader> = () => {
  return [
    { title: 'Contact Us | JACKET' },
    {
      name: 'description',
      content:
        "Get in touch with JACKET. We're here to help with any questions about our premium sunscreen products.",
    },
  ];
};

export async function loader(_args: LoaderFunctionArgs) {
  return {};
}

export default function Contact() {
  return (
    <div className="min-h-screen">
      {/* Top Section - Black Background */}
      <div className="bg-gray-100 relative overflow-hidden">
        <div className="mx-auto pt-12">
          <div className="flex flex-col lg:flex-row justify-between items-center text-white gap-4">
            {/* Left: Shopify contact form */}
            <div className="w-full lg:w-full px-4 md:px-8 lg:pl-16 xl:pl-28">
              <div className="text-center">
                <div className="inline-block text-left">
                  <h3 className="text-center text-[#FBAC18] text-xs md:text-[20px] uppercase font-bold mb-4">
                    Contact Us
                  </h3>
                  <h2 className="text-center text-black text-2xl lg:text-[38px] font-bold mb-6 md:mb-8 uppercase leading-tight">
                    Thanks for <br className="hidden lg:block" />
                    reaching out!
                  </h2>
                </div>
              </div>

              <div className="w-full md:max-w-full md:-mt-10 min-h-[600px]">
                <ShopifyContactForm className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Gold Background */}
      <div className="bg-[#FBAC18] py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-black text-4xl lg:text-5xl font-bold uppercase tracking-wide mb-8">
            JACKET FAQS AND FACTS
          </h2>
          <Link
            to="/pages/faq"
            className="inline-block bg-black text-white font-bold uppercase tracking-wide py-4 px-8 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-[#FBAC18] transition-colors"
          >
            LEARN MORE
          </Link>
        </div>
      </div>
    </div>
  );
}
