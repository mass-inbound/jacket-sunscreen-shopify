import { Link } from 'react-router';

export const CTASection = () => {
  return (
    <section className="w-full bg-[#FBAC18] py-12 mb-8">
      <div className="flex flex-col gap-14 justify-center items-center">
        <h2 className="text-black text-3xl font-bold">
          DON&apos;T FORGET YOUR...
        </h2>
        <img
          src="/assets/cta.png"
          alt="JACKET Sunscreen"
          className="object-contain lg:w-auto"
        />
        <Link to="/collections/all">
          <button className="bg-black  text-white px-[32px] py-[14px] font-bold text-[13px] lg:text-[15px]">
            SHOP NOW
          </button>
        </Link>
      </div>
    </section>
  );
};
