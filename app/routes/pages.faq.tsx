import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction, useSearchParams, useNavigate} from 'react-router';
import {useState, useEffect} from 'react';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [
    {title: 'FAQ | JACKET'},
    {
      name: 'description',
      content:
        'Frequently asked questions about JACKET sunscreen. Learn about SPF, skin protection, and our premium sunscreen products.',
    },
  ];
};

export async function loader(args: LoaderFunctionArgs) {
  return {};
}

// FAQ Data - Easily replaceable
const faqData = [
  {
    id: 1,
    question: 'What does SPF mean?',
    answer: `Sun Protection Factor (SPF) is a measurement that indicates the amount of ultraviolet radiation required to burn an area of skin protected by sunscreen. The higher the SPF number, the stronger the protection against those rays. When you hear "broad spectrum," that means it protects against both UVA and UVB rays.

UVA rays have longer wavelengths and are associated with skin aging issues, whereas UVB rays have shorter wavelengths and contribute to skin burning. Both UVA and UVB rays cause damage to skin cells and can lead to skin cancer and a variety of other conditions.

JACKET is a zinc-enriched, broad spectrum, SPF 50+ sunscreen that blocks 98% of UVA and UVB rays. No sunscreen or SPF rating provides 100% UV protection.

The American Academy of Dermatology recommends that everyone, regardless of age, gender or skin tone, use sunscreen that meets the following minimum criteria:

• Broad-spectrum protection
• SPF 30 or higher  
• Water resistance`,
    isOpen: true, // First item open by default
  },
  {
    id: 2,
    question: 'Is JACKET water resistant?',
    answer: 'Yes, JACKET is water resistant for up to 80 minutes. This means it maintains its SPF protection while swimming or sweating. However, it\'s important to reapply after towel drying, swimming, or excessive sweating to maintain optimal protection.',
    isOpen: false,
  },
  {
    id: 3,
    question: 'Does JACKET clog pores?',
    answer: 'No, JACKET is specifically formulated to be non-comedogenic, meaning it won\'t clog pores. Our zinc-based formula is lightweight and breathable, making it suitable for all skin types, including acne-prone skin.',
    isOpen: false,
  },
  {
    id: 4,
    question: 'How do UV rays affect the skin?',
    answer: 'UV rays damage the skin in multiple ways. UVA rays penetrate deep into the skin, causing premature aging, wrinkles, and age spots. UVB rays primarily affect the outer layer, causing sunburn and contributing to skin cancer. Both types can damage DNA and suppress the immune system, making the skin more vulnerable to various conditions.',
    isOpen: false,
  },
  {
    id: 5,
    question: 'Is wearing sunscreen really that important?',
    answer: 'Absolutely! Sunscreen is crucial for protecting your skin from harmful UV radiation that can cause sunburn, premature aging, and skin cancer. Daily sunscreen use, even on cloudy days, is the most effective way to prevent these issues and maintain healthy, youthful skin.',
    isOpen: false,
  },
  {
    id: 6,
    question: 'Is JACKET good for sensitive skin?',
    answer: 'Yes, JACKET is excellent for sensitive skin. Our zinc-based formula is gentle and hypoallergenic, making it suitable for even the most sensitive skin types. It\'s free from common irritants and provides effective protection without causing irritation.',
    isOpen: false,
  },
  {
    id: 7,
    question: 'Is JACKET good for dry skin?',
    answer: 'Yes, JACKET is beneficial for dry skin. Our formula includes moisturizing ingredients that help hydrate the skin while providing sun protection. The zinc-based formula is gentle and won\'t strip natural oils from dry skin.',
    isOpen: false,
  },
  {
    id: 8,
    question: 'Is JACKET good for oily skin?',
    answer: 'Yes, JACKET works well for oily skin. Our lightweight, non-greasy formula absorbs quickly without leaving a heavy residue. The zinc-based formula helps control excess oil while providing effective sun protection.',
    isOpen: false,
  },
  {
    id: 9,
    question: 'Is JACKET good for kids?',
    answer: 'Yes, JACKET is safe and effective for children. Our gentle, zinc-based formula is suitable for kids\' sensitive skin. However, we recommend consulting with a pediatrician before using any sunscreen on infants under 6 months old.',
    isOpen: false,
  },
  {
    id: 10,
    question: 'Is JACKET good for men?',
    answer: 'Absolutely! JACKET is designed for all skin types and genders. Our lightweight, non-greasy formula is perfect for men who want effective sun protection without the heavy, sticky feel of traditional sunscreens.',
    isOpen: false,
  },
  {
    id: 11,
    question: 'What type of sunscreen is JACKET?',
    answer: 'JACKET is a mineral (physical) sunscreen that uses zinc oxide as its primary active ingredient. Mineral sunscreens work by sitting on top of the skin and reflecting UV rays, unlike chemical sunscreens that absorb into the skin. This makes JACKET gentle, effective, and suitable for all skin types.',
    isOpen: false,
  },
  {
    id: 12,
    question: 'Can JACKET be used daily?',
    answer: 'Yes, JACKET is designed for daily use. In fact, daily sunscreen application is recommended by dermatologists to protect against UV damage, premature aging, and skin cancer. JACKET\'s gentle formula makes it suitable for everyday use.',
    isOpen: false,
  },
  {
    id: 13,
    question: 'Is JACKET really an anti-aging sunscreen?',
    answer: 'Yes, JACKET provides anti-aging benefits by protecting against UVA rays, which are the primary cause of premature aging, wrinkles, and age spots. Our broad-spectrum SPF 50+ protection helps prevent photoaging and maintains youthful skin.',
    isOpen: false,
  },
  {
    id: 14,
    question: 'Is JACKET reef safe?',
    answer: 'Yes, JACKET is reef safe. Our zinc-based formula doesn\'t contain oxybenzone or octinoxate, which are harmful to coral reefs. We\'re committed to protecting both your skin and the environment.',
    isOpen: false,
  },
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([1]); // First item open by default
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Check if we're viewing a specific FAQ
  const faqId = searchParams.get('id');
  const selectedFaq = faqId ? faqData.find(item => item.id === parseInt(faqId)) : null;

  // If viewing individual FAQ, ensure it's in openItems
  useEffect(() => {
    if (selectedFaq) {
      setOpenItems([selectedFaq.id]);
    }
  }, [selectedFaq]);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleLinkClick = (id: number) => {
    navigate(`/pages/faq?id=${id}`);
  };

  const handleBackToAll = () => {
    navigate('/pages/faq');
  };

  const copyToClipboard = async (id: number) => {
    const url = `${window.location.origin}/pages/faq?id=${id}`;
    try {
      await navigator.clipboard.writeText(url);
      // You could add a toast notification here if desired
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16 lg:py-24">
        {/* Header */}
        <div className="text-center mb-16">
          {selectedFaq && (
            <button
              onClick={handleBackToAll}
              className="mb-8 inline-flex items-center text-black hover:text-[#FBAC18] transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to All FAQs
            </button>
          )}
          <h1 className="text-5xl lg:text-6xl font-bold text-black uppercase tracking-wide">
            {selectedFaq ? selectedFaq.question : 'Frequently Asked Questions'}
          </h1>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-0">
            {(selectedFaq ? [selectedFaq] : faqData).map((item) => (
              <div key={item.id} className="border-b-4 border-[#FBAC18]">
                {/* Question Button */}
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full flex items-center justify-between py-5 px-0 text-left hover:bg-gray-50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-black pr-4">
                    {item.question}
                  </h2>
                  <div className="flex-shrink-0">
                    <svg
                      className={`w-6 h-6 text-black transition-transform duration-200 ${
                        openItems.includes(item.id) ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                {/* Answer Content */}
                {openItems.includes(item.id) && (
                  <div className="pb-8">
                    <div className="prose prose-lg max-w-none">
                      {item.answer.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="text-base leading-relaxed text-black mb-4 last:mb-0">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    
                    {/* Social Media Icons - Show for every answer */}
                    <div className="flex items-center gap-4 mt-6">
                      {/* Facebook */}
                      <a href="https://www.facebook.com/JacketSunscreenOfficial" target="_blank" rel="noopener noreferrer" className="w-6 h-6 flex items-center justify-center text-black hover:text-[#FBAC18] transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                      
                      {/* Twitter/X */}
                      <a href="https://x.com/JACKET_SPF" target="_blank" rel="noopener noreferrer" className="w-6 h-6 flex items-center justify-center text-black hover:text-[#FBAC18] transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                      
                      {/* LinkedIn */}
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-6 h-6 flex items-center justify-center text-black hover:text-[#FBAC18] transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                      
                      {/* Link/Chain */}
                      <button 
                        onClick={() => copyToClipboard(item.id)}
                        className="w-6 h-6 flex items-center justify-center text-black hover:text-[#FBAC18] transition-colors"
                        title="Copy link to this FAQ"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 