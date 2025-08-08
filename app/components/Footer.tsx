import {Suspense} from 'react';
import {Await, NavLink} from 'react-router';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => (
          <footer className="w-full bg-[#1B1A1B] text-white">
            <div className="mx-auto relative">
              {/* Main Content */}
              <div className="flex flex-col lg:flex-row lg:justify-between py-8 md:py-16 lg:py-[93px] px-4 md:px-8 lg:px-28 pb-8 md:pb-16 lg:pb-[92.41px]">
                {/* Left Column */}
                <div className="flex flex-col w-full lg:w-auto mb-8 lg:mb-0">
                  {/* Top Section with Navigation Links and Contact Info */}
                  <div className="flex flex-col md:flex-row px-0 md:px-[43px] py-4 md:py-[33px] justify-center pb-4 md:pb-[32px]">
                    {/* Navigation Links - Two Columns */}
                    <div className="flex flex-col sm:flex-row gap-8 md:gap-[70px] mb-6 md:mb-0">
                      {/* Left Column of Links */}
                      <div className="flex flex-col gap-3 md:gap-[16px] w-full sm:w-[48px]">
                        <NavLink to="/" className="text-sm md:text-[16px] leading-[2.5em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                          Home
                        </NavLink>
                        <NavLink to="/pages/about" className="text-sm md:text-[16px] leading-[2.5em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                          About
                        </NavLink>
                        <NavLink to="/pages/faq" className="text-sm md:text-[16px] leading-[2.5em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                          FAQ
                        </NavLink>
                      </div>
                      {/* Right Column of Links */}
                      <div className="flex flex-col gap-3 md:gap-[16px] w-full sm:w-[61px]">
                        <NavLink to="/collections/all" className="text-sm md:text-[16px] leading-[2.5em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                          Shop
                        </NavLink>
                        <NavLink to="/pages/contact" className="text-sm md:text-[16px] leading-[2.5em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                          Contact
                        </NavLink>
                        <NavLink to="/cart" className="text-sm md:text-[16px] leading-[2.5em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                          Cart
                        </NavLink>
                      </div>
                    </div>

                    {/* Vertical Separator Line - Hidden on mobile */}
                    <div className="hidden md:block w-[3px] bg-[#FBAC18] mx-8 rounded-none"></div>

                    {/* Contact Info and Policy Links */}
                    <div className="flex flex-col gap-4 md:gap-[18px]">
                      {/* Contact Info */}
                      <div className="flex flex-col gap-2 md:gap-[0px]">
                        <a href="mailto:info@jacketsunscreen.com" className="text-sm md:text-[16px] leading-[1.6em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                          info@jacketsunscreen.com
                        </a>
                        <a href="tel:561.272.6000" className="text-sm md:text-[16px] leading-[1.6em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                          561.272.6000
                        </a>
                      </div>

                      {/* Policy Links */}
                      <div className="flex flex-col gap-3 md:gap-[16px]">
                        <NavLink to="/policies/privacy-policy" className="text-sm md:text-[16px] leading-[2.5em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                          Privacy Policy
                        </NavLink>
                        <NavLink to="/policies/shipping-policy" className="text-sm md:text-[16px] leading-[2.5em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                          Shipping & Returns
                        </NavLink>
                      </div>
                    </div>
                  </div>

                  {/* Social Media Icons */}
                  <div className="px-0 md:px-[43px] pb-4 md:pb-[33px]">
                    <div className="flex gap-3 md:gap-[10px] w-full md:w-[186px] h-auto md:h-[39px] justify-center md:justify-start">
                      <a href="https://www.instagram.com/jacketsunscreen/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-[39px] md:h-[39px] hover:opacity-80 transition-opacity">
                        <img src="/images/instagram-icon.svg" alt="Instagram" className="w-full h-full" />
                      </a>
                      <a href="https://www.facebook.com/JacketSunscreenOfficial" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-[39px] md:h-[39px] hover:opacity-80 transition-opacity">
                        <img src="/images/facebook-icon.svg" alt="Facebook" className="w-full h-full" />
                      </a>
                      <a href="https://www.tiktok.com/@jacketsunscreen" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-[39px] md:h-[39px] hover:opacity-80 transition-opacity">
                        <img src="/images/tiktok-icon.svg" alt="TikTok" className="w-full h-full" />
                      </a>
                      <a href="https://x.com/JACKET_SPF" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-[39px] md:h-[39px] hover:opacity-80 transition-opacity">
                        <img src="/images/twitter-icon.svg" alt="Twitter" className="w-full h-full" />
                      </a>
                    </div>
                  </div>

                  {/* Copyright */}
                  <div className="px-0 md:px-[43px] text-center md:text-left">
                    <p className="text-xs md:text-[14px] leading-[1.4em] font-normal text-white">
                      © 2025 by JACKET. All Rights Reserved.
                    </p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col w-full lg:w-auto">
                  {/* Logo and Tagline on same line */}
                  <div className="flex flex-col md:flex-row lg:flex-row items-center gap-2 md:gap-6 lg:gap-3 justify-center lg:justify-start pt-4 md:pt-[41px] pb-4 md:pb-[20px]">
                    {/* Logo */}
                    <div className="w-32 h-12 md:w-[159px] md:h-[57px] flex-shrink-0">
                      <img src="/images/jacket-logo.png" alt="JACKET Sunscreen" className="w-full h-full object-cover" />
                    </div>
                    
                    {/* Tagline */}
                    <div className="text-center md:text-left lg:text-left">
                      <h6 className="text-xs md:text-[13px] leading-[1.4em] font-bold text-white whitespace-nowrap">
                        MAXIMIZE THE ACTION. 
                      </h6>
                      <h6 className="text-xs md:text-[13px] leading-[1.4em] font-bold text-white whitespace-nowrap">
                      MINIMIZE THE RISK.
                      </h6>
                    </div>
                  </div>
                  
                  {/* Newsletter Signup */}
                  <div className="p-4 md:p-[24px]">
                    <form className="w-full max-w-[303.75px] mx-auto lg:mx-0">
                      <div className="flex items-end pb-2 md:pb-[8px] h-auto md:h-[27.59px]">
                        <label htmlFor="newsletter-email" className="text-sm md:text-[14px] leading-[1.4em] font-normal text-white">
                          Email
                        </label>
                      </div>
                      <div className="flex w-full items-center gap-2">
                        <input 
                          id="newsletter-email"
                          type="email" 
                          className="flex-1 h-10 md:h-[40px] bg-transparent text-white placeholder-white/70 outline-none px-2 md:px-3 border-2 md:border-[3px] border-[#FBAC18] rounded-[4px]"
                          placeholder="Enter your email"
                        />
                        <button 
                          type="submit"
                          className="bg-[#FBAC18] text-white font-bold px-3 md:px-[12px] py-2 md:py-[11px] text-sm md:text-[15px] leading-[1.2em] hover:bg-[#e69c15] transition-colors rounded-none whitespace-nowrap h-10 md:h-[40px]"
                        >
                          SIGN UP
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        )}
      </Await>
    </Suspense>
  );
}

function FooterMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  menu: FooterQuery['menu'];
  primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
  publicStoreDomain: string;
}) {
  return (
    <nav className="footer-menu" role="navigation">
      {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
        if (!item.url) return null;
        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');
        return isExternal ? (
          <a href={url} key={item.id} rel="noopener noreferrer" target="_blank">
            {item.title}
          </a>
        ) : (
          <NavLink
            end
            key={item.id}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'white',
  };
}
