import { Link } from 'react-router';

export const CTASection = () => {
  return (
    <section className="w-full bg-[#FBAC18] py-6 md:py-8 lg:py-12 mb-4 md:mb-6 lg:mb-8">
      <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 xl:gap-14 justify-center items-center px-4 md:px-6 lg:px-8">
        <h2 className="text-black text-xl md:text-2xl lg:text-3xl font-bold text-center">
          DON&apos;T FORGET YOUR...
        </h2>
        <div className="flex justify-center w-full">
          <img
            src="/assets/cta.png"
            alt="JACKET Sunscreen"
            className="object-contain w-auto max-w-[250px] md:max-w-[350px] lg:max-w-none h-auto"
          />
        </div>
        <Link to="/collections/all" className="w-[70%] md:w-auto">
          <button className="w-full md:w-auto text-center bg-black text-white px-6 md:px-8 lg:px-[32px] py-3 md:py-4 lg:py-[14px] font-bold text-sm md:text-base lg:text-[15px] hover:bg-gray-800 transition-colors rounded-none">
            SHOP NOW
          </button>
        </Link>
      </div>
    </section>
  );
};
