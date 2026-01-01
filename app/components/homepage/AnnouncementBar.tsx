import React, { Suspense } from 'react';
import { Await } from 'react-router';
import type {CartApiQueryFragment} from 'storefrontapi.generated';

interface AnnouncementBarProps {
  message?: string;
  cart?: Promise<CartApiQueryFragment | null>;
}

interface AnnouncementBarContentProps {
  message?: string;
  cart: CartApiQueryFragment | null;
}

function AnnouncementBarContent({
  message = "New Year Savings - 50% Off Sitewide!",
  cart
}: AnnouncementBarContentProps) {

  const highlightAmount = (text: string) => {
    const highlightRegex = /(\$\d+(?:\.\d{2})?|\d+%)/g;

    const parts = text.split(highlightRegex);

    return parts.map((part, index) => {
      if (part.match(highlightRegex)) {
        return (
          <span key={index} style={{ color: '#fbac18' }}>
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="w-full bg-[#1B1A1B] text-white">
      <div className="flex justify-center items-center py-2.5 px-2.5">
        <p className="text-center text-sm font-normal leading-[1.21] font-inter">
          {highlightAmount(message)}
        </p>
      </div>
    </div>
  );
}


export function AnnouncementBar({
  message = "New Year Savings - 50% Off Sitewide!",
  cart
}: AnnouncementBarProps) {
  if (!cart) {
    return <AnnouncementBarContent message={message} cart={null} />;
  }

  return (
    <Suspense fallback={<AnnouncementBarContent message={message} cart={null} />}>
      <Await resolve={cart}>
        {(resolvedCart) => (
          <AnnouncementBarContent message={message} cart={resolvedCart} />
        )}
      </Await>
    </Suspense>
  );
}
