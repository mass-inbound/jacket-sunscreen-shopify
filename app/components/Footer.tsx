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
              {/* Mobile Layout */}
              <div className="block lg:hidden w-full max-w-[320px] mx-auto">
                {/* Logo and Tagline Section */}
                <div className="flex flex-col items-center pt-[11px] pb-[17px]">
                  <div className="w-[159px] h-[57px] mb-[10px]">
                    <img src="/images/jacket-logo.png" alt="JACKET Sunscreen" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-center">
                    <h6 className="text-[12px] leading-[1.4em] font-bold text-white">
                      MAXIMIZE THE ACTION. MINIMIZE THE RISK.
                    </h6>
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="px-[11px] pb-[24px]">
                  <div className="px-[24px] w-full max-w-[296px]">
                    <form className="w-full">
                      <div className="flex flex-col gap-[8px]">
                        <label htmlFor="newsletter-email" className="text-[14px] leading-[1.4em] font-normal text-white">
                          Email
                        </label>
                        <div className="flex flex-col gap-[24px]">
                          <div className="border-[3px] border-[#FBAC18] rounded-[4px] p-[3px] pr-[15px] pl-[3px]">
                            <input 
                              id="newsletter-email"
                              type="email" 
                              className="w-full h-[40px] bg-transparent text-white placeholder-white/70 outline-none"
                              placeholder="Enter your email"
                            />
                          </div>
                          <div className="px-[42px] flex justify-center">
                            <button 
                              type="submit"
                              className="bg-[#FBAC18] text-white font-normal px-[8px] py-[11px] text-[15px] leading-[1.2em] hover:bg-[#e69c15] transition-colors rounded-none whitespace-nowrap"
                            >
                              SIGN UP
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Navigation and Content Section */}
                <div className="relative h-[315px]">
                  {/* Left Column - Home/About/FAQ */}
                  <div className="absolute left-[26px] top-[26px] w-[72px]">
                    <div className="flex flex-col gap-0">
                      <NavLink to="/" className="text-[12px] leading-[2.5em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                        Home
                      </NavLink>
                      <NavLink to="/pages/about" className="text-[12px] leading-[2.5em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                        About
                      </NavLink>
                      <NavLink to="/pages/faq" className="text-[12px] leading-[2.5em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                        FAQ
                      </NavLink>
                    </div>
                  </div>

                  {/* Second Column - Privacy/Shipping */}
                  <div className="absolute left-[98px] top-[26px] w-[87px]">
                    <div className="flex flex-col gap-0">
                      <NavLink to="/policies/privacy-policy" className="text-[12px] leading-[2.5em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                        Privacy Policy
                      </NavLink>
                      <NavLink to="/policies/shipping-policy" className="text-[12px] leading-[2.5em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                        Shipping & Returns
                      </NavLink>
                    </div>
                  </div>

                  {/* Vertical Separator Line */}
                  <div className="absolute left-[191px] top-[36px] w-[13px] h-[129px] border-l-[3px] border-[#FBAC18]"></div>

                  {/* Right Column - Shop/Blog/Contact/Cart */}
                  <div className="absolute left-[240px] top-[26px] w-[51px]">
                    <div className="flex flex-col gap-0">
                      <NavLink to="/collections/all" className="text-[12px] leading-[2.5em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                        Shop
                      </NavLink>
                      <NavLink to="/pages/blog" className="text-[12px] leading-[2.5em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                        Blog
                      </NavLink>
                      <NavLink to="/pages/contact" className="text-[12px] leading-[2.5em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                        Contact
                      </NavLink>
                      <NavLink to="/cart" className="text-[12px] leading-[2.5em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                        Cart
                      </NavLink>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="absolute left-[19px] top-[177px] w-[160px]">
                    <div className="flex flex-col gap-0">
                      <a href="mailto:info@jacketsunscreen.com" className="text-[12px] leading-[1.6em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                        info@jacketsunscreen.com
                      </a>
                      <a href="tel:561.272.6000" className="text-[12px] leading-[1.6em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                        561.272.6000
                      </a>
                    </div>
                  </div>

                  {/* Social Media Icons */}
                  <div className="absolute left-[66px] top-[251px] w-[186px] h-[39px]">
                    <div className="flex gap-[10px] w-full h-full">
                      <a href="https://www.instagram.com/jacketsunscreen/" target="_blank" rel="noopener noreferrer" className="w-[39px] h-[39px] hover:opacity-80 transition-opacity">
                        <img src="/images/instagram-icon.svg" alt="Instagram" className="w-full h-full" />
                      </a>
                      <a href="https://www.facebook.com/JacketSunscreenOfficial" target="_blank" rel="noopener noreferrer" className="w-[39px] h-[39px] hover:opacity-80 transition-opacity">
                        <img src="/images/facebook-icon.svg" alt="Facebook" className="w-full h-full" />
                      </a>
                      <a href="https://www.tiktok.com/@jacketsunscreen" target="_blank" rel="noopener noreferrer" className="w-[39px] h-[39px] hover:opacity-80 transition-opacity">
                        <img src="/images/tiktok-icon.svg" alt="TikTok" className="w-full h-full" />
                      </a>
                      <a href="https://x.com/JACKET_SPF" target="_blank" rel="noopener noreferrer" className="w-[39px] h-[39px] hover:opacity-80 transition-opacity">
                        <img src="/images/twitter-icon.svg" alt="Twitter" className="w-full h-full" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Copyright */}
                <div className="px-[20px] pb-[39px]">
                  <div className="text-center">
                    <p className="text-[11px] leading-[1.4em] font-normal text-white">
                      © 2025 by JACKET. All Rights Reserved.
                    </p>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:block">
                <div className="flex justify-center py-[93px] px-[22px] pb-[92.41px]">
                  <div className="w-[980px] flex">
                    {/* Left Column */}
                    <div className="relative w-[520px] h-[314.59px]">
                      {/* Home/About/FAQ Navigation */}
                      <div className="absolute left-[43px] top-[33px] w-[130px]">
                        <div className="flex flex-col gap-0 pb-[32px]">
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
                      </div>

                      {/* Contact Info */}
                      <div className="absolute left-[302px] top-[40px] w-[219px]">
                        <div className="flex flex-col gap-[-0.99px] pb-[18.81px]">
                          <div className="pb-[0.59px]">
                            <a href="mailto:info@jacketsunscreen.com" className="text-[16px] leading-[1.6em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                              info@jacketsunscreen.com
                            </a>
                          </div>
                          <div className="pb-[0.59px]">
                            <a href="tel:561.272.6000" className="text-[16px] leading-[1.6em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                              561.272.6000
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Vertical Separator Line */}
                      <div className="absolute left-[276.5px] top-[31.5px] w-[7px] h-[154px] border-l-[3px] border-[#FBAC18]"></div>

                      {/* Privacy/Shipping Policy Links */}
                      <div className="absolute left-[302px] top-[105px] w-[159px]">
                        <div className="flex flex-col gap-0 pb-[36px]">
                          <NavLink to="/policies/privacy-policy" className="text-[16px] leading-[2.5em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                            Privacy Policy
                          </NavLink>
                          <NavLink to="/policies/shipping-policy" className="text-[16px] leading-[2.5em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                            Shipping & Returns
                          </NavLink>
                        </div>
                      </div>

                      {/* Shop/Blog/Contact/Cart Navigation */}
                      <div className="absolute left-[173px] top-[33px] w-[69px]">
                        <div className="flex flex-col gap-0 pb-[28px]">
                          <NavLink to="/collections/all" className="text-[16px] leading-[2.5em] font-normal text-white hover:text-[#FBAC18] transition-colors">
                            Shop
                          </NavLink>
                          <NavLink to="/pages/blog" className="text-[16px] leading-[2.5em] font-normal text-white hover:text-[#FBAC18] transition-colors">
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

                      {/* Social Media Icons */}
                      <div className="absolute left-[43px] top-[221px] w-[186px] h-[39px]">
                        <div className="flex gap-[10px] w-full h-full pb-[33px]">
                          <a href="https://www.instagram.com/jacketsunscreen/" target="_blank" rel="noopener noreferrer" className="w-[39px] h-[39px] hover:opacity-80 transition-opacity">
                            <img src="/images/instagram-icon.svg" alt="Instagram" className="w-full h-full" />
                          </a>
                          <a href="https://www.facebook.com/JacketSunscreenOfficial" target="_blank" rel="noopener noreferrer" className="w-[39px] h-[39px] hover:opacity-80 transition-opacity">
                            <img src="/images/facebook-icon.svg" alt="Facebook" className="w-full h-full" />
                          </a>
                          <a href="https://www.tiktok.com/@jacketsunscreen" target="_blank" rel="noopener noreferrer" className="w-[39px] h-[39px] hover:opacity-80 transition-opacity">
                            <img src="/images/tiktok-icon.svg" alt="TikTok" className="w-full h-full" />
                          </a>
                          <a href="https://x.com/JACKET_SPF" target="_blank" rel="noopener noreferrer" className="w-[39px] h-[39px] hover:opacity-80 transition-opacity">
                            <img src="/images/twitter-icon.svg" alt="Twitter" className="w-full h-full" />
                          </a>
                        </div>
                      </div>

                      {/* Copyright */}
                      <div className="absolute left-[12px] top-[292px] w-[499px]">
                        <p className="text-[14px] leading-[1.4em] font-normal text-white pb-[2px]">
                          © 2025 by JACKET. All Rights Reserved.
                        </p>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="relative w-[460px] h-[314px]">
                      {/* Logo */}
                      <div className="absolute left-[57px] top-[41px] w-[159px] h-[57px]">
                        <img src="/images/jacket-logo.png" alt="JACKET Sunscreen" className="w-full h-full object-cover" />
                      </div>
                      
                      {/* Tagline */}
                      <div className="absolute left-[237px] top-[51px] w-[198px]">
                        <h6 className="text-[13px] leading-[1.4em] font-bold text-white pb-[11px]">
                          MAXIMIZE THE ACTION.<br />
                          MINIMIZE THE RISK.
                        </h6>
                      </div>
                      
                      {/* Newsletter Signup */}
                      <div className="absolute left-0 top-[98.41px] w-[461px]">
                        <div className="p-[24px] pb-[10px]">
                          <form className="w-full max-w-[413px]">
                            <div className="flex items-end pb-[8px] h-[27.59px]">
                              <label htmlFor="newsletter-email-desktop" className="text-[14px] leading-[1.4em] font-normal text-white">
                                Email
                              </label>
                            </div>
                            <div className="flex w-full items-center h-[46px]">
                              <div className="flex-1 border-[3px] border-[#FBAC18] rounded-[4px] p-[3px] pr-[15px] pl-[3px] mr-[24px]">
                                <input 
                                  id="newsletter-email-desktop"
                                  type="email" 
                                  className="w-full h-[40px] bg-transparent text-white placeholder-white/70 outline-none"
                                  placeholder="Enter your email"
                                />
                              </div>
                              <button 
                                type="submit"
                                className="bg-[#FBAC18] text-white font-normal px-[4.25px] py-[11px] text-[15px] leading-[1.2em] hover:bg-[#e69c15] transition-colors rounded-none whitespace-nowrap h-[40px] w-[85.25px] flex items-center justify-center"
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
