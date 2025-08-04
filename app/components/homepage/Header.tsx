import React, { useState } from 'react';

const MENU_ITEMS = [
  { label: 'HOME', href: '/' },
  { label: 'SHOP', href: '/collections' },
  { label: 'ABOUT', href: '/about' },
  { label: 'CONTACT', href: '/contact' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full z-40">
      <div className="flex justify-center items-center py-[15px] md:py-[15px] lg:py-[15px] bg-transparent">
        <div className="relative w-full max-w-[1430px] md:max-w-[1014px] lg:max-w-[1430px] mx-auto">
          {/* Overlay + Shadow + Background */}
          <div className="absolute top-0 left-0 w-full h-full rounded-[10px] shadow-[0_1px_4px_0_rgba(0,0,0,0.6)]" style={{ background: '#FBAC18' }} />
          {/* Content */}
          <div className="relative flex items-center justify-between h-[52.3px] md:h-[79.3px] px-4 md:px-8 lg:px-8">
            {/* Left: Logo */}
            <a href="/" className="flex items-center z-10">
              {/* Placeholder SVG logo */}
              <span className="block w-[120px] h-[32px] md:w-[160px] md:h-[40px] lg:w-[180px] lg:h-[48px] bg-white rounded flex items-center justify-center font-bold text-[#FBAC18] text-lg md:text-xl lg:text-2xl shadow-sm select-none">
                JACKET
              </span>
            </a>

            {/* Desktop/Tablet Menu */}
            <nav className="hidden md:flex gap-8 lg:gap-12 items-center z-10">
              {MENU_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-white font-semibold text-base lg:text-lg tracking-widest hover:text-black transition-colors px-2 py-1 rounded"
                  style={{ letterSpacing: '0.12em' }}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Desktop/Tablet Cart Icon (placeholder) */}
            <div className="hidden md:flex items-center z-10">
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 transition-colors">
                <svg width="20" height="20" fill="none" stroke="#FBAC18" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden flex items-center z-10"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Open menu"
            >
              <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>

            {/* Mobile Slide-out Menu */}
            {mobileOpen && (
              <>
                <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex flex-col">
                  <div className="bg-[#FBAC18] shadow-lg rounded-b-[10px] p-6 flex flex-col gap-6">
                    <div className="flex items-center justify-between mb-4">
                      <a href="/" className="flex items-center">
                        <span className="block w-[120px] h-[32px] bg-white rounded flex items-center justify-center font-bold text-[#FBAC18] text-lg shadow-sm select-none">
                          JACKET
                        </span>
                      </a>
                      <button
                        onClick={() => setMobileOpen(false)}
                        aria-label="Close menu"
                        className="ml-4"
                      >
                        <svg width="28" height="28" fill="none" stroke="#FBAC18" strokeWidth="2" viewBox="0 0 24 24">
                          <line x1="6" y1="6" x2="18" y2="18" />
                          <line x1="6" y1="18" x2="18" y2="6" />
                        </svg>
                      </button>
                    </div>
                    <nav className="flex flex-col gap-4">
                      {MENU_ITEMS.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="text-white font-semibold text-lg tracking-widest hover:text-black transition-colors px-2 py-2 rounded"
                          style={{ letterSpacing: '0.12em' }}
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </a>
                      ))}
                    </nav>
                    <div className="mt-6 flex items-center">
                      <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 transition-colors">
                        <svg width="20" height="20" fill="none" stroke="#FBAC18" strokeWidth="2" viewBox="0 0 24 24">
                          <circle cx="9" cy="21" r="1" />
                          <circle cx="20" cy="21" r="1" />
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  className="fixed inset-0 z-40 cursor-default"
                  style={{ background: 'transparent' }}
                  aria-label="Close menu overlay"
                  tabIndex={0}
                  onClick={() => setMobileOpen(false)}
                  onKeyDown={e => { if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') setMobileOpen(false); }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 