import { useState } from 'react';

interface TabData {
  id: string;
  label: string;
  heading: string;
  description: string;
}

const tabsData: TabData[] = [
  {
    id: 'what-is-jacket',
    label: 'WHAT IS JACKET?',
    heading: 'ANTI-AGING SUNSCREEN',
    description: 'JACKET is a dermatologist-developed, anti-aging sunscreen. Featuring a patented formula enriched with zinc and natural antioxidants, JACKET delivers maximum broad-spectrum protection and also repairs sun-damaged skin. It\'s the only sunscreen that fades dark spots and smooths wrinkles while worn. An SPF 50+ sunscreen, JACKET blocks 98% of both UVA and UVB ultraviolet rays, and is water and sweat resistant for up to 80 minutes.'
  },
  {
    id: 'why-jacket',
    label: 'WHY JACKET?',
    heading: 'SUPERIOR PROTECTION',
    description: 'JACKET stands apart from ordinary sunscreens with its advanced formula that not only protects but actively repairs. Our patented blend of zinc oxide and natural antioxidants provides unmatched broad-spectrum protection while simultaneously addressing existing sun damage. Unlike traditional sunscreens that merely block UV rays, JACKET works to reverse the signs of aging caused by sun exposure, making it the smart choice for anyone serious about skin health.'
  },
  {
    id: 'only-jacket',
    label: 'ONLY JACKET!',
    heading: 'UNIQUE FORMULATION',
    description: 'There\'s only one JACKET - and for good reason. Our exclusive formula combines the highest quality ingredients with cutting-edge dermatological science. The patented antioxidant blend works synergistically with zinc oxide to provide protection that goes beyond the surface. JACKET is the only sunscreen clinically proven to fade dark spots and smooth wrinkles while you wear it, making it truly revolutionary in the world of sun protection.'
  },
  {
    id: 'jacket-up',
    label: 'JACKET UP!',
    heading: 'ELEVATE YOUR PROTECTION',
    description: 'Ready to take your sun protection to the next level? JACKET UP! means choosing the best for your skin. Our SPF 50+ formula provides maximum protection while our anti-aging technology works to repair and rejuvenate. Water and sweat resistant for up to 80 minutes, JACKET keeps you protected during all your outdoor activities. Don\'t just protect your skin - transform it with JACKET.'
  }
];

export function InfoTabsSection() {
  const [activeTab, setActiveTab] = useState('what-is-jacket');

  const activeTabData = tabsData.find(tab => tab.id === activeTab);

  return (
    <section className="py-16 mt-10 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-3">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-3">
            {tabsData.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-8 py-2 rounded text-sm font-semibold transition-all duration-200
                  ${activeTab === tab.id 
                    ? 'bg-black text-white' 
                    : 'bg-[#FBAC18] text-black hover:bg-[#e69b15]'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-sm p-16 md:p-20 lg:p-24 h-[400px] md:h-[450px] lg:h-[500px]">
            <div className="max-w-4xl mx-auto text-center h-full flex flex-col justify-center">
              {activeTabData && (
                <>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6">
                    {activeTabData.heading}
                  </h2>
                  <p className="text-sm md:text-base leading-relaxed text-black max-w-3xl mx-auto">
                    {activeTabData.description}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 