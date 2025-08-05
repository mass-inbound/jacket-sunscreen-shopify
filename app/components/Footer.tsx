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
            <div className="max-w-[1230px] mx-auto relative">
              {/* Content */}
              <div className="flex flex-col items-center py-[93px] pb-[92.41px]">
                <div className="max-w-[1230px] mx-auto">
                  <div className="flex justify-between items-start">
                    {/* Left Column */}
                    <div className="flex flex-col">
                      <div className="w-[499px]">
                        {/* Horizontal Border */}
                        <div className="w-[0.01px] h-[221px] px-[276.5px] py-[30.5px]">
                          <div className="w-[7px] h-[154px] bg-[#FBAC18]"></div>
                        </div>
                        
                        {/* Social Media Icons */}
                        <div className="w-[186px] h-[72px] px-[43px] pb-[33px]">
                          <div className="flex gap-[10px]">
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
                        <div className="px-[12px] pb-[2px]">
                          <div className="w-[499px]">
                            <p className="text-[14px] leading-[1.4] font-normal text-white">
                              © 2025 by JACKET. All Rights Reserved.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col">
                      <div className="w-[519.8px]">
                        {/* Logo and Tagline */}
                        <div className="px-[58.8px] pt-[41px] pb-[0px]">
                          <div className="w-[217.8px] h-[98px]">
                            <img src="/images/jacket-logo.png" alt="JACKET Sunscreen" className="w-[159px] h-[57px] object-cover" />
                          </div>
                        </div>
                        
                        {/* Tagline */}
                        <div className="px-[58.8px] pt-[51px] pb-[11px]">
                          <div className="w-[256.8px]">
                            <h6 className="text-[13px] leading-[1.4] font-bold text-white">
                              MAXIMIZE THE ACTION.<br />
                              MINIMIZE THE RISK.
                            </h6>
                          </div>
                        </div>
                        
                        {/* Newsletter Signup */}
                        <div className="px-[58.8px] pb-[10px]">
                          <div className="w-[519.8px]">
                            <div className="w-[461px] p-[24px]">
                              <form className="w-full h-[73.59px]">
                                <div className="flex items-end pb-[8px] w-[303.75px] h-[27.59px]">
                                  <label htmlFor="newsletter-email" className="text-[14px] leading-[1.4] font-normal text-white">
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
                                    className="bg-[#FBAC18] text-[#1B1A1B] px-[4.25px] py-[11px] text-[15px] leading-[1.2] font-normal hover:bg-[#e69c15] transition-colors"
                                  >
                                    SIGN UP
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="flex gap-[34px] mt-[30px]">
                  <div className="flex flex-col gap-[16px] w-[48px]">
                    <NavLink to="/" className="text-[16.31px] leading-[1.349] font-bold text-white hover:text-[#FBAC18] transition-colors">
                      Home
                    </NavLink>
                    <NavLink to="/pages/about" className="text-[16.31px] leading-[1.349] font-bold text-white hover:text-[#FBAC18] transition-colors">
                      About
                    </NavLink>
                    <NavLink to="/pages/faq" className="text-[16.31px] leading-[1.349] font-bold text-white hover:text-[#FBAC18] transition-colors">
                      FAQ
                    </NavLink>
                  </div>
                  <div className="flex flex-col gap-[16px] w-[61px]">
                    <NavLink to="/shop" className="text-[16.31px] leading-[1.349] font-bold text-white hover:text-[#FBAC18] transition-colors">
                      Shop
                    </NavLink>
                    <NavLink to="/blog" className="text-[16.31px] leading-[1.349] font-bold text-white hover:text-[#FBAC18] transition-colors">
                      Blog
                    </NavLink>
                    <NavLink to="/pages/contact" className="text-[16.31px] leading-[1.349] font-bold text-white hover:text-[#FBAC18] transition-colors">
                      Contact
                    </NavLink>
                    <NavLink to="/cart" className="text-[16.31px] leading-[1.349] font-bold text-white hover:text-[#FBAC18] transition-colors">
                      Cart
                    </NavLink>
                  </div>
                </div>
              </div>

              {/* Save 15% Badge */}
              <div className="absolute bottom-[24px] left-[24px] bg-[#FBAC18] text-[#1B1A1B] px-[40px] py-[8px] rounded-[10px] font-bold text-[40px] leading-[1.4]">
                SAVE 15%
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
