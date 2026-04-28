import {type LoaderFunctionArgs} from 'react-router';
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
    answer: 'Ultraviolet rays damage the skin by creating free radicals that alter DNA. There are two types of UV rays that have adverse effects on the skin, with different results. UVA rays penetrate deep into the skin, causing premature aging, wrinkles and age spots. UVB rays primarily affect the outer layer, causing sunburn and contributing to skin cancer. Both types damage DNA and suppress the immune system, making the skin more vulnerable to various conditions.',
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
    answer: 'The JACKET SPF 50+ Mineral Stick Sunscreen is 100% natural and reef safe. Other JACKET sunscreens are Hawaii Act 104 compliant, which is a commonly used standard for evaluating reef-friendliness. Hawaii Act 104 bans sunscreens that contain Octinate and Oxybenzone, which are chemicals that are harmful to coral reefs and marine ecosystems.',
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
            {selectedFaq ? selectedFaq.question : (
              <>
                <span className="block lg:hidden text-[22px] -mb-4">Frequently Asked Questions</span>
                <span className="hidden lg:block text-[45px]">Frequently Asked Questions</span>
              </>
            )}
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