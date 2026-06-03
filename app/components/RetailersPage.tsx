import {ShopifyRetailersForm} from '~/components/ShopifyRetailersForm';

const retailers = [
  { id: 1, name: 'Balshi Dermatology & Cosmetic Surgery', address: '4665 W. Atlantic Avenue', city: 'Delray Beach, Florida' },
  { id: 2, name: 'Beyond Skin & Wellness', address: '606 S.E. Third Avenue', city: 'Ocala, Florida' },
  { id: 3, name: 'Cheeca Lodge & Spa', address: '81801 Overseas Highway', city: 'Islamorada, Florida' },
  { id: 4, name: 'Hilton West Palm Beach', address: '600 Okeechobee Boulevard', city: 'West Palm Beach, Florida' },
  { id: 5, name: 'Isla Bella Beach Resort & Spa', address: '1 Knights Key Boulevard', city: 'Marathon, Florida' },
  { id: 6, name: 'Keys Boating Center', address: '90800 Overseas Highway', city: 'Tavernier, Florida' },
  { id: 7, name: 'Lighthouse Point Tennis Center', address: '3500 N.E. 27th Avenue', city: 'Lighthouse Point, Florida' },
  { id: 8, name: 'Lotus Palm Racquet Center', address: '20465 Golf Course Road', city: 'Boca Raton, Florida' },
  { id: 9, name: 'Love Shack', address: '411 E. Atlantic Avenue', city: 'Delray Beach, Florida' },
  { id: 10, name: 'Mane FX Hair Gallery', address: '350 Belleville Turnpike', city: 'Kearny, New Jersey' },
  { id: 11, name: 'Paradise Tackle', address: '32330 S.W. 204th Avenue', city: 'Homestead, Florida' },
  { id: 12, name: 'Royal Palm Golf Club', address: '405 Forest Hills Boulevard', city: 'Naples, Florida' },
  { id: 13, name: 'Saltwater Brewery', address: '1701 W. Atlantic Avenue', city: 'Delray Beach, Florida' },
  { id: 14, name: 'Skyway Golf Course', address: '515 Duncan Avenue', city: 'Jersey City, New Jersey' },
  { id: 15, name: 'Snappy Turtle', address: '1100 E. Atlantic Avenue', city: 'Delray Beach, Florida' },
  { id: 16, name: 'Soccer Post', address: '256 Kearny Avenue', city: 'Kearny, New Jersey' },
  { id: 17, name: 'Surf District Surf Shop', address: '220 N.E. 1st Street', city: 'Delray Beach, Florida' },
  { id: 18, name: 'Tesoro Club', address: '2000 S.E. Via Tesoro', city: 'Port St. Lucie, Florida' },
  { id: 19, name: 'The Club at Quail Ridge', address: '3715 Golf Road', city: 'Boynton Beach, Florida' },
  { id: 20, name: 'The Park West Palm', address: '7301 Georgia Avenue', city: 'West Palm Beach, Florida' },
  { id: 21, name: 'True Value of Boca Raton', address: '399 N.E. Spanish River Boulevard', city: 'Boca Raton, Florida' },
  { id: 22, name: 'Two Conchs Sportfishing', address: '11499-B Overseas Highway', city: 'Marathon, Florida' },
  { id: 23, name: 'Valencia Grand Racquet Club & Pro Shop', address: '9250 Maple Valley Road', city: 'Boynton Beach, Florida' },
  { id: 24, name: 'Valencia Sound Racquet Club', address: '12690 Salty Springs Avenue', city: 'Boynton Beach, Florida' },
  { id: 25, name: 'Westchester Country Club', address: '12250 Westchester Club Drive', city: 'Boynton Beach, Florida' },
];

export function RetailersPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* Header Section */}
      <div className="py-8 text-center">
        <div className="bg-[#FBAC18] px-8 py-2 inline-block rounded mb-4">
          <div className="text-3xl md:text-5xl font-normal text-white">RETAILERS</div>
        </div>
        <p className="text-base font-normal text-gray-700 mt-4">
          Thank you to all of our retail partners. We appreciate your support.
        </p>
      </div>

      {/* Retailers Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {retailers.map((retailer) => (
            <div
              key={retailer.id}
              className="w-full p-4 md:p-6 bg-[#FBAC18] rounded-lg text-center"
            >
              <div className="space-y-2">
                <h3 className="font-bold text-sm md:text-base text-black">
                  {retailer.name}
                </h3>
                <div className="text-xs md:text-sm font-normal text-black">
                  <p>{retailer.address}</p>
                  <p>{retailer.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Become a Retailer Form */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold uppercase text-black mb-2">
            Become a Retailer
          </h2>
          <p className="text-base font-normal text-gray-600 mb-8">
            Interested in selling JACKET products?
          </p>
          <ShopifyRetailersForm className="w-full" />
        </div>
      </div>

    </div>
  );
}