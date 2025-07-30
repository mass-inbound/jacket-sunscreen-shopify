import React from 'react';

interface AnnouncementBarProps {
  message?: string;
}

export function AnnouncementBar({ message = "Free shipping for orders over $60" }: AnnouncementBarProps) {
  return (
    <div className="w-full bg-[#1B1A1B] text-white">
      <div className="flex justify-center items-center py-2.5 px-2.5">
        <p className="text-center text-sm font-normal leading-[1.21] font-inter">
          {message}
        </p>
      </div>
    </div>
  );
} 