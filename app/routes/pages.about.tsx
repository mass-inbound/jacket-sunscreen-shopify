import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from 'react-router';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [
    {title: 'About | JACKET'},
    {
      name: 'description',
      content:
        'Learn more about JACKET sunscreen, our mission, and our commitment to premium sun protection.',
    },
  ];
};

export async function loader(args: LoaderFunctionArgs) {
  return {};
}

export default function About() {
  return (
    <div className="bg-white">
        {/*banner*/}
        <div className="relative">
        <img
                src="/assets/about1.png"
                alt="JACKET Sunscreen"
                className="w-full h-[300px] md:h-[400px] lg:h-auto object-cover rounded-none"
              />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-black px-4">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1 md:mb-2 uppercase">
              YOU WERE MADE FOR
            </h2>
            <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1 md:mb-2 uppercase">
              THIS.
            </h3>
            <h4 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold uppercase">
              SO IS JACKET
            </h4>
          </div>
        </div>
        </div>
        {/* content 1 */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16 xl:py-24">
        <div className="flex flex-col md:flex-row gap-8 md:gap-10 lg:gap-12">
          {/* Left Column - Text Content */}
          <div className="flex-1 lg:max-w-2xl">
            <div className="space-y-4 md:space-y-6">
              {/* Main Heading */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-black leading-tight">
                THE GOLD STANDARD
              </h1>

              {/* Text Content */}
              <div className="space-y-3 md:space-y-4 text-sm md:text-base leading-relaxed text-black">
                <p>
                  JACKET is a sunscreen company for those who care enough to invest in their skin. 
                  Created in 2017 by a South Florida dermatologist and cosmetic surgeon, JACKET is 
                  a small-batch sunscreen featuring exclusive premium-grade ingredients and antioxidants 
                  that deliver maximum protection, patented anti-aging benefits, and ultimate performance.
                </p>

                <p>
                  As a Florida company, we love living in the sunshine. We also understand the challenges 
                  that presents to our skin, such as premature aging and skin cancer. We’re also aware of 
                  the many (bad) excuses for not wearing sunscreen — oily, greasy, smelly, sticky, breakouts, etc.
                </p>

                <p>
                  Born and Bottled in The Sunshine State, JACKET eliminates those excuses by offering weightless, gentle formulas that are easy and comfortable to wear, defend against harmful UV rays, and also heal and repair damaged skin by acting at the cellular level to clean up DNA-altering free radicals, allowing you to maximize the action, minimize the risk, and truly embrace the SPF Life+Style.
                </p>

                <p>
                  Comfort and confidence without compromise.
                </p>

              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="flex-1 lg:max-w-2xl hidden md:block">
            <div className="w-full h-full">
              <img
                src="/assets/about2.png"
                alt="JACKET Sunscreen"
                className="w-full h-auto object-cover rounded-none"
              />
            </div>
          </div>
        </div>
      </div>
      {/* content 2 */}
      <div className='bg-[#FBAC18] flex justify-center items-center'>
      <img
                src="/assets/about3.png"
                alt="JACKET Sunscreen"
                className="object-cover rounded-none max-w-4xl h-[200px] md:h-[300px] lg:h-auto"
              />
      </div>
      {/* content 3 */}
       <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16 xl:py-24">
         <div className="flex flex-col md:flex-row gap-8 md:gap-10 lg:gap-12">
           {/* Left Column - Image */}
           <div className="flex-1 lg:max-w-md">
             <img
               src="/assets/about1-color.png"
               alt="Dr. Thomas Balshi"
               className="w-full h-auto object-cover rounded-none"
             />
           </div>
           
           {/* Right Column - Text Content */}
           <div className="flex-1 lg:max-w-2xl">
             <div className="space-y-4 md:space-y-6">
               {/* Heading */}
               <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-black leading-tight">
                 FOR THE DOCTOR BEHIND<br className="hidden md:block" />
                 JACKET, SUNSCREEN IS<br className="hidden md:block" />
                 PERSONAL
               </h2>
               
               {/* Body Text */}
               <div className="space-y-3 md:space-y-4 text-sm md:text-base leading-relaxed text-black">
                 <p>
                   JACKET was created by Dr. Thomas Balshi, MD, a dermatologist and founder of Balshi Dermatology & Cosmetic Surgery in Delray Beach, Florida. As a South Floridian, Dr. Balshi has spent the majority of his life in the sunshine. In fact, that relationship ultimately fueled him to develop JACKET sunscreen.
                 </p>
                 
                 <p>
                   Thomas Balshi is not only a dermatologist, he&apos;s an avid golfer and outdoors enthusiast, just like those who JACKET was created for. When it comes to protecting and repairing your skin, Dr. Balshi understands the needs and concerns from both the health, safety and medical side as well as the functionality side of sunscreen. If JACKET didn&apos;t work for him, we wouldn&apos;t share it with you.
                 </p>
               </div>
             </div>
           </div>
         </div>
       </div>
      
    </div>
  );
}
