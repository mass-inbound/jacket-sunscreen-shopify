import { useState } from "react";

type FeatureRow = {
  label: string;
  rightText: string;
  rightHas: boolean;
};

function GoldCheckIcon() {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#FBAC18] text-black">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-3.5 w-3.5"
      >
        <path
          fillRule="evenodd"
          d="M16.707 6.293a1 1 0 0 1 0 1.414l-6.25 6.25a1 1 0 0 1-1.414 0l-3.25-3.25A1 1 0 1 1 7.207 9.543l2.543 2.543 5.543-5.543a1 1 0 0 1 1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}

function GreyCheckIcon() {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-neutral-300 text-neutral-700">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-3.5 w-3.5"
      >
        <path
          fillRule="evenodd"
          d="M16.707 6.293a1 1 0 0 1 0 1.414l-6.25 6.25a1 1 0 0 1-1.414 0l-3.25-3.25A1 1 0 1 1 7.207 9.543l2.543 2.543 5.543-5.543a1 1 0 0 1 1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}

function GreyCrossIcon() {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-neutral-300 text-neutral-700">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-3.5 w-3.5"
      >
        <path d="M6.225 4.811a1 1 0 0 1 1.414 0L10 7.172l2.361-2.361a1 1 0 1 1 1.414 1.414L11.414 8.586l2.361 2.361a1 1 0 0 1-1.414 1.414L10 10l-2.361 2.361a1 1 0 1 1-1.414-1.414L8.586 8.586 6.225 6.225a1 1 0 0 1 0-1.414z" />
      </svg>
    </span>
  );
}

const initialRows: FeatureRow[] = [
  { label: "SPF 50 Defense", rightText: "No SPF 50 Defense", rightHas: false },
  { label: "Broad Spectrum", rightText: "Broad Spectrum", rightHas: true },
  { label: "Blocks Blue Light", rightText: "Blocks Blue Light", rightHas: false },
  { label: "Water Resistant", rightText: "Water Resistant", rightHas: true },
  { label: "Sweat Resistant", rightText: "Sweat Resistant", rightHas: false },
  { label: "Zinc Enriched", rightText: "Zinc Enriched", rightHas: true },
  { label: "Antioxidant Infused", rightText: "Antioxidant Infused", rightHas: false },
  { label: "Contains Ascorbic Acid", rightText: "Contains Ascorbic Acid", rightHas: false },
  { label: "Dermatologist Developed", rightText: "Dermatologist Developed", rightHas: false },
  { label: "Lightweight Formula", rightText: "Lightweight Formula", rightHas: false },
];

const moreRows: FeatureRow[] = [
  { label: "Premium Ingredients", rightText: "Premium Ingredients", rightHas: false },
  { label: "Reverses Signs of Premature Aging", rightText: "Reverses Signs of Premature Aging", rightHas: false },
  { label: "Repairs Damaged Skin", rightText: "Repairs Damaged Skin", rightHas: false },
  { label: "Promotes Collagen Production", rightText: "Promotes Collagen Production", rightHas: false },
  { label: "Clears Up Free Radicals", rightText: "Clears Up Free Radicals", rightHas: false },
  { label: "Smooths Wrinkles and Fine Lines", rightText: "Smooths Wrinkles and Fine Lines", rightHas: false },
  { label: "Fades Age/Dark Spots", rightText: "Fades Age/Dark Spots", rightHas: false },
  { label: "Reduces Hyperpigmentation", rightText: "Reduces Hyperpigmentation", rightHas: false },
  { label: "Improves Melasma", rightText: "Improves Melasma", rightHas: false },
  { label: "Non-Greasy or Oily", rightText: "Non-Greasy or Oily", rightHas: false },
  { label: "Non-Comedogenic", rightText: "Non-Comedogenic", rightHas: true },
  { label: "Safe and Effective for Sensitive Skin", rightText: "Safe and Effective for Sensitive Skin", rightHas: false },
  { label: "Protects Natural Moisture Barrier", rightText: "Protects Natural Moisture Barrier", rightHas: true },
  { label: "Naturally Hydrates", rightText: "Naturally Hydrates", rightHas: true },
  { label: "No White Cast or Residue", rightText: "No White Cast or Residue", rightHas: false },
  { label: "Artificial-Fragrance Free", rightText: "Artificial-Fragrance Free", rightHas: true },
  { label: "Mild, Natural Lemongrass Scent", rightText: "Mild, Natural Lemongrass Scent", rightHas: true },
  { label: "Naturally Repels Insects", rightText: "Naturally Repels Insects", rightHas: false },
  { label: "Easy to Conceal Under Makeup", rightText: "Easy to Conceal Under Makeup", rightHas: true },
  { label: "Ideal for Daily Use", rightText: "Ideal for Daily Use", rightHas: true },
  { label: "Hawaii Act 104 Compliant", rightText: "Hawaii Act 104 Compliant", rightHas: true },
  { label: "PABA Free", rightText: "PABA Free", rightHas: true },
  { label: "Paraben Free", rightText: "Paraben Free", rightHas: true },
  { label: "Phthalate Free", rightText: "Phthalate Free", rightHas: true },
  { label: "Sulfate Free", rightText: "Sulfate Free", rightHas: true },
  { label: "Animal Cruelty Free", rightText: "Animal Cruelty Free", rightHas: true },
  { label: "Small Batch Production", rightText: "Small Batch Production", rightHas: true },
  { label: "Made in Florida", rightText: "Made in China", rightHas: false },
];

export function ComparisonChart() {
  const [expanded, setExpanded] = useState(false);
  const rows = expanded ? [...initialRows, ...moreRows] : initialRows;

  return (
    <section className="w-full bg-[#FFFCF7] py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-28 text-center">
          <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
            <span className="bg-[#FBAC18] px-2 py-1 rounded font-black text-black">
              JACKET
            </span>
            <span className="ml-2">: The Gold Standard</span>
          </h2>
          <p className="mt-3 text-sm font-normal text-black">
        Compare our features and see why we set the standard in performance and quality.
          </p>
        </div>

        <div className="relative">
          {/* Floating images */}
          <div className="">
            <div className=" absolute -top-20 left-0 z-30 hidden md:flex w-1/2 justify-end -space-x-4 md:-space-x-16 ">
              <img src="/assets/table-a-1.png" alt="Table A 1" className="h-28  object-contain"/>
              <img src="/assets/table-a-2.png" alt="Table A 2" className="h-28 object-contain" />
              <img src="/assets/table-a-3.png" alt="Table A 3" className="h-16  mt-[47px] object-contain" />
            </div>
            <div className="absolute -top-20 right-0 z-30 hidden md:flex w-1/2 justify-end pr-5">
              <img src="/assets/table-b-1.png" alt="Table B 1" className="h-28 -mr-[30px] object-contain" />
              <img src="/assets/table-b-2.png" alt="Table B 2" className="h-28  md:-ml-16 object-contain" />
              <img src="/assets/table-b-3.png" alt="Table B 3" className="h-16 ml-[-45px] mt-[42px] object-contain" />
            </div>
          </div>

          {/* Bordered, rounded table wrapper */}
          <div className="rounded-lg border border-[#121212] bg-white shadow">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="w-1/2 bg-[#FBAC18] px-2 pr-4 md:px-4 md:pr-36 py-2 md:py-3 text-left text-xs md:text-sm font-bold text-black md:text-base rounded-tl-lg">
                    JACKET SUNSCREEN
                  </th>
                  <th className="w-1/2 bg-black px-2 pr-4 md:px-4 md:pr-36 py-2 md:py-3 text-left text-xs md:text-sm font-bold text-white md:text-base rounded-tr-lg">
                    OTHER SUNSCREENS
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-t border-[#121212]">
                    <td className="bg-[#FFF8EB] px-2 md:px-4 py-2 md:py-3 text-[10px] md:text-[11px] font-bold">
                      <div className="flex items-center gap-2 md:gap-3 text-neutral-900">
                        <GoldCheckIcon />
                        <span>{row.label}</span>
                      </div>
                    </td>
                    <td className="bg-[#E0E0E0] px-2 md:px-4 py-2 md:py-3 text-[10px] md:text-[11px] font-bold">
                      <div
                        className={`flex items-center gap-2 md:gap-3 text-neutral-700 ${
                          row.rightHas ? "opacity-100" : "opacity-60"
                        }`}
                      >
                        {row.rightHas ? <GreyCheckIcon /> : <GreyCrossIcon />}
                        <span>{row.rightText}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              </table>
            </div>
            {/* See More Button inside wrapper so border encloses it */}
            <div className="flex items-center justify-center border-t border-neutral-200 bg-white p-3 rounded-b-lg">
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="text-[10px] font-semibold text-neutral-900 md:text-base"
              >
                {expanded ? "See Less" : "See More"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ComparisonChart;
