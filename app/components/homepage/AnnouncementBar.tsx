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

function AnnouncementBarContent({ message = "Free shipping for orders over $60", cart }: AnnouncementBarContentProps) {
  // Get cart total amount
  const cartTotal = parseFloat(cart?.cost?.subtotalAmount?.amount || '0');
  const freeShippingThreshold = 60;
  const hasQualifiedForFreeShipping = cartTotal >= freeShippingThreshold;

  // Function to highlight monetary amounts in the message
  const highlightAmount = (text: string) => {
    // Regex to match dollar amounts like $60, $100, etc.
    const amountRegex = /(\$\d+(?:\.\d{2})?)/g;
    
    const parts = text.split(amountRegex);
    
    return parts.map((part, index) => {
      if (amountRegex.test(part)) {
        return (
          <span key={index} style={{ color: '#fbac18' }}>
            {part}
          </span>
        );
      }
      return part;
    });
  };

  // Determine which message to show
  const displayMessage = hasQualifiedForFreeShipping 
    ? "Congratulations! You've got free shipping!" 
    : message;

  return (
    <div className="w-full bg-[#1B1A1B] text-white">
      <div className="flex justify-center items-center py-2.5 px-2.5">
        <p className="text-center text-sm font-normal leading-[1.21] font-inter">
          {hasQualifiedForFreeShipping ? (
            displayMessage
          ) : (
            highlightAmount(displayMessage)
          )}
        </p>
      </div>
    </div>
  );
}

export function AnnouncementBar({ message = "Free shipping for orders over $60", cart }: AnnouncementBarProps) {
  if (!cart) {
    // Fallback for when cart is not provided
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