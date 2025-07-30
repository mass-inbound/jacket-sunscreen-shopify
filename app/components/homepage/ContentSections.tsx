import React from 'react';

interface ContentSectionProps {
  title?: string;
  description?: string;
  imagePosition?: 'left' | 'right';
  imageUrl?: string;
  backgroundColor?: string;
}

export function ContentSections() {
  return (
    <section className="w-full bg-white py-[12px]">
      <div className="max-w-[1430px] mx-auto bg-white rounded-lg relative">
        {/* Section 1 */}
        <div className="flex items-center py-[31px] px-[595px]">
          <div className="w-[595px] h-[503px] bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-600">Content Image 1</span>
          </div>
          <div className="flex-1 pl-[595px]">
            <div className="w-[595px]">
              <h3 className="text-2xl font-bold text-[#1B1A1B] mb-4">
                Section Title 1
              </h3>
              <p className="text-base text-[#1B1A1B] leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="flex items-center py-[26px] px-[595px]">
          <div className="flex-1 pr-[595px]">
            <div className="w-[595px]">
              <h3 className="text-2xl font-bold text-[#1B1A1B] mb-4">
                Section Title 2
              </h3>
              <p className="text-base text-[#1B1A1B] leading-relaxed">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
          <div className="w-[595px] h-[517px] bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-600">Content Image 2</span>
          </div>
        </div>

        {/* Section 3 */}
        <div className="flex items-center py-[26px] px-[595px]">
          <div className="w-[595px] h-[464px] bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-600">Content Image 3</span>
          </div>
          <div className="flex-1 pl-[595px]">
            <div className="w-[595px]">
              <h3 className="text-2xl font-bold text-[#1B1A1B] mb-4">
                Section Title 3
              </h3>
              <p className="text-base text-[#1B1A1B] leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="flex items-center py-[26px] px-[595px]">
          <div className="flex-1 pr-[595px]">
            <div className="w-[595px]">
              <h3 className="text-2xl font-bold text-[#1B1A1B] mb-4">
                Section Title 4
              </h3>
              <p className="text-base text-[#1B1A1B] leading-relaxed">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
          <div className="w-[595px] h-[455px] bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-600">Content Image 4</span>
          </div>
        </div>

        {/* Section 5 */}
        <div className="flex items-center py-[28px] px-[595px]">
          <div className="w-[595px] h-[508px] bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-600">Content Image 5</span>
          </div>
          <div className="flex-1 pl-[595px]">
            <div className="w-[595px]">
              <h3 className="text-2xl font-bold text-[#1B1A1B] mb-4">
                Section Title 5
              </h3>
              <p className="text-base text-[#1B1A1B] leading-relaxed">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 