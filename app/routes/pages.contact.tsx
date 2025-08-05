import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {
  useLoaderData,
  type MetaFunction,
  Form,
  useActionData,
  useNavigation,
  Link,
} from 'react-router';
import {useEffect} from 'react';

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

export async function action({request, context}: LoaderFunctionArgs) {
  const formData = await request.formData();
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const message = formData.get('message') as string;
  const recaptchaToken = formData.get('g-recaptcha-response') as string;

  // Basic validation
  if (!firstName || !lastName || !email || !message) {
    return {error: 'Please fill in all required fields.'};
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {error: 'Please enter a valid email address.'};
  }

  if (!recaptchaToken) {
    return {error: 'Please complete the reCAPTCHA verification.'};
  }

  try {
    // Here you would typically send the form data to your backend
    // For Shopify, you might want to:
    // 1. Send to a webhook endpoint
    // 2. Create a customer metafield
    // 3. Send to an email service
    // 4. Create a draft order with the contact info

    // For now, we'll just log the data and return success
    console.log('Contact form submission:', {
      firstName,
      lastName,
      email,
      phone,
      message,
      recaptchaToken,
      timestamp: new Date().toISOString(),
    });

    return {success: "Thank you for your message! We'll get back to you soon."};
  } catch (error) {
    console.error('Contact form error:', error);
    return {error: 'Something went wrong. Please try again.'};
  }
}

export default function Contact() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  // Load reCAPTCHA script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector(
        'script[src="https://www.google.com/recaptcha/api.js"]',
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
        <div className="mx-auto py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row justify-between items-center text-white gap-12">
            {/* Left: Contact Form */}
            <div className="w-full lg:w-1/2 pl-28">
              <h3 className="text-[#FBAC18] text-sm text-center uppercase font-bold mb-2">
                Contact Us
              </h3>
              <h2 className="text-white text-4xl font-bold mb-8 uppercase leading-tight text-center">
                Thanks for <br className="hidden lg:block" />
                reaching out!
              </h2>
              <Form method="post" className="space-y-4 w-full">
                {actionData?.error && (
                  <p className="text-red-500 text-sm">{actionData.error}</p>
                )}
                {actionData?.success && (
                  <p className="text-green-500 text-sm">{actionData.success}</p>
                )}
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="FIRST NAME*"
                    required
                    className="w-1/2 border border-[#FBAC18] bg-transparent p-3 placeholder-white"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="LAST NAME*"
                    required
                    className="w-1/2 border border-[#FBAC18] bg-transparent p-3 placeholder-white"
                  />
                </div>
                <div className="flex gap-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="EMAIL*"
                    required
                    className="w-1/2 border border-[#FBAC18] bg-transparent p-3 placeholder-white"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="PHONE NUMBER*"
                    className="w-1/2 border border-[#FBAC18] bg-transparent p-3 placeholder-white"
                  />
                </div>
                <textarea
                  name="message"
                  placeholder="MESSAGE"
                  required
                  rows={4}
                  className="w-full border border-[#FBAC18] bg-transparent p-3 placeholder-white"
                />
                <div className="flex items-center gap-4">
                  <div
                    className="g-recaptcha"
                    data-sitekey="your-public-site-key-here"
                  ></div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#FBAC18] text-black font-bold py-2 px-6 mt-4 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'SUBMIT'}
                </button>
              </Form>
            </div>

            {/* Right: Product Images */}
            <div className="w-full lg:w-1/2 relative">
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
