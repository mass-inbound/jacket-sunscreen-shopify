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
    heading: 'THE NEW FACE OF SUNSCREEN',
    description: 'JACKET is a small-batch, dermatologist-developed sunscreen with an exclusive collection of antioxidants and vitamins that defend against harmful UV rays and help reverse existing sun damage and signs of premature aging. The weightless formula naturally hydrates, promotes collagen production, cleans up free radicals, improves blemishes and irritation, fades dark spots and smooths wrinkles. JACKET won’t clog pores and is safe and effective for all skin types, including those with sensitivities.'
  },
  {
    id: 'why-jacket',
    label: 'WHY JACKET?',
    heading: 'COMFORT AND CONFIDENCE WITHOUT COMPROMISE',
    description: 'Unlike most sunscreens, JACKET does more than prevent sunburns. JACKET acts at the cellular level to clean up free radicals caused by UV rays that alter skin’s DNA and result in skin cancer and premature aging. JACKET is not oily or greasy and won’t leave a white cast, allowing you to enjoy maximum broad-spectrum protection (also blocks blue light) without looking, feeling or smelling like you’re wearing sunscreen — making it ideal for everyday use, including under makeup.'
  },
  {
    id: 'only-jacket',
    label: 'ONLY JACKET!',
    heading: 'INVEST IN YOUR SKIN',
    description: 'All sunscreens are not the same. When it comes to your skin and health, never settle. JACKET is The Gold Standard for sunscreen, pairing dermatologist-selected ingredients and antioxidants that not only protect against harmful UV rays but also heal and repair damaged skin. Does your sunscreen do that? The result is healthier skin that keeps you looking and feeling your best. Give your skin the care it deserves.'
  },
  {
    id: 'jacket-up',
    label: 'JACKET UP!',
    heading: 'IT’S ALWAYS JACKET WEATHER',
    description: 'There are plenty of (bad) excuses for not wearing sunscreen. Greasy. Smelly. Sticky. Breakouts. JACKET eliminates all of them. JACKET is easy to apply, pleasant to wear and non-fragrant other than the mild, refreshing lemongrass scent that is also a natural insect repellant. Sunscreen absolutely belongs in your daily skincare routine. Not simply for an improved appearance, but because it can save your life. Maximize the action. Minimize the risk.'
  }
];

export function InfoTabsSection() {
  const [activeTab, setActiveTab] = useState('what-is-jacket');

  const activeTabData = tabsData.find(tab => tab.id === activeTab);

  return (
    <section className="pt-8 md:pt-12 lg:pt-16 mt-4 md:mt-6 lg:mt-10 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col">
          {/* Tab Navigation */}
          <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-4 mb-4 w-full">
            {tabsData.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  w-full md:w-auto px-3 md:px-6 lg:px-8 py-2 rounded text-xs md:text-sm font-semibold transition-all duration-200 min-h-[40px] md:min-h-auto
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
          <div className="bg-white rounded-sm p-6 md:p-12 lg:p-12 xl:p-12 2xl:p-12 min-h-[300px] md:min-h-[350px] lg:min-h-[300px] xl:min-h-[300px] 2xl:min-h-[300px]">
            <div className="max-w-4xl mx-auto text-center h-full flex flex-col justify-center">
              {activeTabData && (
                <>
                  <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-black mb-4 md:mb-6">
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