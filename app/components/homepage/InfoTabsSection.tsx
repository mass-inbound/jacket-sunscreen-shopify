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
    heading: 'OUTDOOR BEAUTY SYSTEM',
    description: 'JACKET is Sunscreen + Skincare that Protects, Repairs and Hydrates with a premium on Wearability. Our dermatologist-developed, bio-stimulating formulas contain antioxidants and medical-grade ingredients that deliver maximum protection and ultimate performance, working at the cellular level to repair damaged skin and reverse signs of premature aging. JACKET also promotes Collagen production, the protein responsible for maintaining tone, texture, elasticity and overall skin health. Weightless, invisible-finish sunscreens are non-greasy, won’t clog pores or cause breakouts, and are recommended for sensitive skin.'
  },
  {
    id: 'why-jacket',
    label: 'MAXIMUM PROTECTION',
    heading: 'EVERY DAY IS SUNDAY',
    description: 'Wearing broad spectrum, water resistant, SPF 30 (or higher) sunscreen every day reduces the risk of developing Melanoma, the deadliest form of skin cancer, by 50 percent. JACKET sunscreens are broad spectrum, blocking both UVA and UVB rays as well as Blue Light, all of which contribute to skin damage such as sunburns, hyperpigmentation, premature aging and cancer. Our sunscreens range from SPF 30 to SPF 50, are water and sweat resistant for 80 minutes, and do not require frequent reapplication, making them ideal for daily skincare routines or outdoor adventures.'
  },
  {
    id: 'only-jacket',
    label: 'ANTI-AGING ANTIOXIDANTS',
    heading: 'THE NEW FACE OF SUNSCREEN',
    description: 'Damage from UV rays and environmental stressors can occur at any age but becomes increasingly visible starting in your mid-20s, when natural Collagen production begins to decrease. JACKET features antioxidants that neutralize DNA-altering free radicals, helping to both prevent and correct premature aging. Our sunscreens smooth fine lines and wrinkles, reduce hyperpigmentation, calm and soothe irritation and inflammation, heal and hide blemishes and scarring, and support and strengthen the moisture barrier. JACKET is also the best sunscreen for improving Melasma.'
  },
  {
    id: 'jacket-up',
    label: 'DERMATOLOGIST DEVELOPED',
    heading: 'BORN IN THE SUNSHINE STATE',
    description: 'Have you noticed how many sunscreen brands say they are #1 among dermatologists? Makes you wonder just how credible those claims are. JACKET formulas were developed (not just approved, recommended, etc.) by Dr. Thomas Balshi, MD, a dermatologist and cosmetic surgeon in South Florida. Dr. Balshi sought a product that protected, nourished and repaired damaged skin without looking, feeling or smelling like you are wearing sunscreen. He couldn’t find one, so he created it. Our dermatologist has a name and a face, and he, his family and his patients wear JACKET daily.'
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