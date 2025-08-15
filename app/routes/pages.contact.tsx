import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {
  useLoaderData,
  type MetaFunction,
  Link,
} from 'react-router';
import {useEffect} from 'react';

// Extend window type for JotForm
declare global {
  interface Window {
    jotformEmbedHandler?: (selector: string, baseUrl: string) => void;
  }
}

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [
    {title: 'Contact Us | JACKET'},
    {
      name: 'description',
      content:
        "Get in touch with JACKET. We're here to help with any questions about our premium sunscreen products.",
    },
  ];
};

export async function loader(args: LoaderFunctionArgs) {
  return {};
}

export default function Contact() {
  // Load JotForm scripts
  useEffect(() => {
    // Load JotForm embed handler script
    const script = document.createElement('script');
    script.src = 'https://forms.inboundrequest.com/s/umd/latest/for-form-embed-handler.js';
    script.async = true;
    document.head.appendChild(script);

    // Initialize JotForm handler after script loads
    script.onload = () => {
      if (window.jotformEmbedHandler) {
        window.jotformEmbedHandler("iframe[id='JotFormIFrame-252173395609059']", "https://forms.inboundrequest.com/");
      }
    };

    return () => {
      const existingScript = document.querySelector(
        'script[src="https://forms.inboundrequest.com/s/umd/latest/for-form-embed-handler.js"]',
      );
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Top Section - Black Background */}
      <div className="bg-black relative overflow-hidden">
        <div className="mx-auto pt-12">
          <div className="flex flex-col lg:flex-row justify-between items-center text-white gap-4">
            {/* Left: Contact Form */}
            <div className="w-full lg:w-1/2 px-4 md:px-8 lg:pl-16 xl:pl-28">
            <div className="text-center">
              <div className="inline-block text-left">
                <h3 className="text-[#FBAC18] text-xs md:text-[20px] uppercase font-bold mb-2">
                  Contact Us
                </h3>
                <h2 className="text-white text-2xl md:[45px] lg:text-[45px] font-bold mb-6 md:mb-8 uppercase leading-tight">
                  Thanks for <br className="hidden lg:block" />
                  reaching out!
                </h2>
              </div>
              </div>
              {/* JotForm Iframe with Custom Styling */}
              <div className="md:max-w-[750px] -mt-10">
                <iframe
                  id="JotFormIFrame-252173395609059"
                  title="Contact Form"
                  onLoad={() => window.parent.scrollTo(0,0)}
                  allow="geolocation; microphone; camera; fullscreen; payment"
                  src="https://forms.inboundrequest.com/252173395609059"
                 
                  style={{
                    minWidth: '100%',
                    maxWidth: '100%',
                    height: '600px',
                    
                  }}
                  scrolling="no"
                />
              </div>
            </div>

            {/* Right: Product Images */}
            <div className="w-full lg:w-1/2 relative hidden lg:block">
                <img
                  src="/assets/contact1.png"
                  alt="Jacket Product 1"
                className="absolute -top-[18.5rem] -right-1"
                />
             
                <img
                  src="/assets/contact3.png"
                  alt="Jacket Product 3"
                className="absolute top-40 -right-1"
                />
                <img
                  src="/assets/contact2.png"
                  alt="Jacket Product 2"
                className="absolute -top-28 -right-1"
                />
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
