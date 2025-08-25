import React from 'react';
import contentSectionsData from './ContentSections.data';
import { ContentSection } from './ContentSection';

export function ContentSections() {
  return (
    <section className="w-full bg-white py-3 md:py-[12px]">
      <div className="mx-auto bg-white relative md:px-2 xl:px-20">
        {contentSectionsData.map((section) => (
          <ContentSection key={section.id} section={section} />
        ))}
      </div>
    </section>
  );
}

export default ContentSections;


