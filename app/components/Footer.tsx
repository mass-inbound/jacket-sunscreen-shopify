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
            <div className="max-w-[980px] mx-auto relative">
              {/* Main Content */}
              <div className="flex py-[93px] pb-[92.41px]">
                {/* Left Column */}
                <div className="flex flex-col w-[499px]">
                  {/* Top Section with Navigation Links and Contact Info */}
                  <div className="flex px-[43px] py-[33px] pb-[32px]">
                    {/* Navigation Links - Two Columns */}
                    <div className="flex gap-[34px]">
                      {/* Left Column of Links */}
                      <div className="flex flex-col gap-[16px] w-[48px]">
                        <NavLink to="/" className="text-[16px] leading-[2.5em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                          Home
                        </NavLink>
                        <NavLink to="/pages/about" className="text-[16px] leading-[2.5em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                          About
                        </NavLink>
                        <NavLink to="/pages/faq" className="text-[16px] leading-[2.5em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                          FAQ
                        </NavLink>
                      </div>
                      {/* Right Column of Links */}
                      <div className="flex flex-col gap-[16px] w-[61px]">
                        <NavLink to="/shop" className="text-[16px] leading-[2.5em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                          Shop
                        </NavLink>
                        <NavLink to="/blog" className="text-[16px] leading-[2.5em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                          Blog
                        </NavLink>
                        <NavLink to="/pages/contact" className="text-[16px] leading-[2.5em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                          Contact
                        </NavLink>
                        <NavLink to="/cart" className="text-[16px] leading-[2.5em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                          Cart
                        </NavLink>
                      </div>
                    </div>

                    {/* Vertical Separator Line */}
                    <div className="w-[1px] h-[120px] bg-[#FBAC18] mx-[40px]"></div>

                    {/* Contact Info and Policy Links */}
                    <div className="flex flex-col gap-[18px]">
                      {/* Contact Info */}
                      <div className="flex flex-col gap-[0px]">
                        <a href="mailto:info@jacketsunscreen.com" className="text-[16px] leading-[1.6em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                          info@jacketsunscreen.com
                        </a>
                        <a href="tel:561.272.6000" className="text-[16px] leading-[1.6em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                          561.272.6000
                        </a>
                      </div>

                      {/* Policy Links */}
                      <div className="flex flex-col gap-[16px]">
                        <NavLink to="/policies/privacy-policy" className="text-[16px] leading-[2.5em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                          Privacy Policy
                        </NavLink>
                        <NavLink to="/policies/shipping-policy" className="text-[16px] leading-[2.5em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                          Shipping & Returns
                        </NavLink>
                      </div>
                    </div>
                  </div>

                  {/* Social Media Icons */}
                  <div className="px-[43px] pb-[33px]">
                    <div className="flex gap-[10px] w-[186px] h-[39px]">
                      <a href="https://instagram.com/jacketsunscreen" className="w-[39px] h-[39px] hover:opacity-80 transition-opacity">
                        <img src="/images/instagram-icon.svg" alt="Instagram" className="w-full h-full" />
                      </a>
                      <a href="https://facebook.com/jacketsunscreen" className="w-[39px] h-[39px] hover:opacity-80 transition-opacity">
                        <img src="/images/facebook-icon.svg" alt="Facebook" className="w-full h-full" />
                      </a>
                      <a href="https://tiktok.com/@jacketsunscreen" className="w-[39px] h-[39px] hover:opacity-80 transition-opacity">
                        <img src="/images/tiktok-icon.svg" alt="TikTok" className="w-full h-full" />
                      </a>
                      <a href="https://twitter.com/jacketsunscreen" className="w-[39px] h-[39px] hover:opacity-80 transition-opacity">
                        <img src="/images/twitter-icon.svg" alt="Twitter" className="w-full h-full" />
                      </a>
                    </div>
                  </div>

                  {/* Copyright */}
                  <div className="px-[43px]">
                    <p className="text-[14px] leading-[1.4em] font-normal text-white">
                      © 2025 by JACKET. All Rights Reserved.
                    </p>
                  </div>
                </div>

                {/* Vertical Golden Line Separator */}
                <div className="w-[1px] h-full bg-[#FBAC18] mx-[40px]"></div>

                {/* Right Column */}
                <div className="flex flex-col w-[461px]">
                  {/* Logo */}
                  <div className="pt-[41px] pb-[20px]">
                    <div className="w-[159px] h-[57px]">
                      <img src="/images/jacket-logo.png" alt="JACKET Sunscreen" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  
                  {/* Tagline */}
                  <div className="pb-[30px]">
                    <div className="w-[198px]">
                      <h6 className="text-[13px] leading-[1.4em] font-bold text-white">
                        MAXIMIZE THE ACTION.<br />
                        MINIMIZE THE RISK.
                      </h6>
                    </div>
                  </div>
                  
                  {/* Newsletter Signup */}
                  <div className="w-[461px] p-[24px]">
                    <form className="w-full h-[73.59px]">
                      <div className="flex items-end pb-[8px] w-[303.75px] h-[27.59px]">
                        <label htmlFor="newsletter-email" className="text-[14px] leading-[1.4em] font-normal text-white">
                          Email
                        </label>
                      </div>
                      <div className="flex items-center border-[3px] border-[#FBAC18] rounded-[4px] p-[3px_15px_3px_3px] w-[303.75px]">
                        <input 
                          id="newsletter-email"
                          type="email" 
                          className="flex-1 h-[40px] bg-transparent text-white placeholder-white/70 outline-none"
                          placeholder="Enter your email"
                        />
                        <button 
                          type="submit"
                          className="bg-[#FBAC18] text-[#1B1A1B] px-[4.25px] py-[11px] text-[15px] leading-[1.2em] font-normal hover:bg-[#e69c15] transition-colors"
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
