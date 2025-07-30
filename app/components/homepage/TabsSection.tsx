import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsSectionProps {
  title?: string;
  tabs?: Tab[];
}

export function TabsSection({ 
  title = "Learn More About JACKET",
  tabs = []
}: TabsSectionProps) {
  const [activeTab, setActiveTab] = useState('what-is-jacket');

  const defaultTabs: Tab[] = [
    {
      id: 'what-is-jacket',
      label: 'WHAT IS JACKET?',
      content: (
        <div className="text-center max-w-[732px] mx-auto">
          <div className="mb-[14px]">
            <h5 className="text-xl font-bold text-[#1B1A1B] mb-4">
              What is JACKET?
            </h5>
          </div>
          <div className="text-[14px] leading-[1.4] text-[#1B1A1B]">
            <p className="mb-4">
              JACKET is a dermatologist-developed, anti-aging sunscreen. Featuring a patented formula enriched with zinc
            </p>
            <p>
              and natural antioxidants, JACKET delivers maximum broad-spectrum protection and also repairs sun-damaged skin. It&apos;s the only sunscreen that fades dark spots and smooths wrinkles while worn. An SPF 50+ sunscreen, JACKET blocks 98% of both UVA and UVB ultraviolet rays, and is water and sweat resistant for up to 80 minutes.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'why-jacket',
      label: 'WHY JACKET?',
      content: (
        <div className="text-center max-w-[732px] mx-auto">
          <div className="mb-[14px]">
            <h5 className="text-xl font-bold text-[#1B1A1B] mb-4">
              Why Choose JACKET?
            </h5>
          </div>
          <div className="text-[14px] leading-[1.4] text-[#1B1A1B]">
            <p className="mb-4">
              JACKET stands out from other sunscreens with its unique anti-aging properties and superior protection.
            </p>
            <p>
              Our patented formula not only protects your skin from harmful UV rays but also actively repairs existing damage while you wear it. This dual-action approach makes JACKET the only sunscreen that works to improve your skin&apos;s appearance from the moment you apply it.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'only-jacket',
      label: 'ONLY JACKET!',
      content: (
        <div className="text-center max-w-[732px] mx-auto">
          <div className="mb-[14px]">
            <h5 className="text-xl font-bold text-[#1B1A1B] mb-4">
              Only JACKET!
            </h5>
          </div>
          <div className="text-[14px] leading-[1.4] text-[#1B1A1B]">
            <p className="mb-4">
              There&apos;s only one sunscreen that offers this level of protection and repair.
            </p>
            <p>
              JACKET is the only sunscreen that combines SPF 50+ protection with active skin repair. While other sunscreens only protect, JACKET protects AND repairs, making it the ultimate choice for anyone who wants to maintain healthy, youthful skin.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'jacket-up',
      label: 'JACKET UP!',
      content: (
        <div className="text-center max-w-[732px] mx-auto">
          <div className="mb-[14px]">
            <h5 className="text-xl font-bold text-[#1B1A1B] mb-4">
              JACKET UP!
            </h5>
          </div>
          <div className="text-[14px] leading-[1.4] text-[#1B1A1B]">
            <p className="mb-4">
              Ready to experience the difference?
            </p>
            <p>
              Join thousands of customers who have already discovered the JACKET difference. Start protecting and repairing your skin today with the only sunscreen that does both.
            </p>
          </div>
        </div>
      )
    }
  ];

  const displayTabs = tabs.length > 0 ? tabs : defaultTabs;
  const activeContent = displayTabs.find(tab => tab.id === activeTab)?.content;

  return (
    <section className="w-full bg-white py-[22px] px-[190px]">
      <div className="max-w-[1060px] mx-auto">
        <div className="space-y-3">
          {/* Tab Buttons */}
          <div className="flex justify-center items-center gap-3 flex-wrap">
            {displayTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-[30px] py-[6px] rounded-[4px] font-semibold text-[16px] leading-[1.5] transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#1B1A1B] text-white'
                    : 'bg-[#FBAC18] text-[#1B1A1B] hover:bg-[#e69c15]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-[3px] p-[88px]">
            <div className="flex justify-center items-center">
              {activeContent}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 