import {useState} from 'react';

interface Retailer {
  id: number;
  name: string;
  address: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  isActive: boolean;
}

interface RetailersPageProps {
  retailers: Retailer[];
}

export function RetailersPage({retailers}: RetailersPageProps) {
  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <div className="py-4 text-center">
        <div className="bg-[#FBAC18] px-8 py-2 inline-block rounded">
          <div className="text-5xl font-normal text-white">RETAILERS</div>
        </div>
      </div>

      {/* Full Width Map Section */}
      <div className="w-[100%] xl:w-[60%] md:h-[800px] h-[400px] px-1 mx-auto flex justify-center relative overflow-hidden">
        <iframe 
          title="Store Locations Map"
          src="https://www.google.com/maps/d/u/0/embed?mid=1YbXA4l3dCpjwHq5IPx3BvzeG4SbEzQg&ehbc=2E312F&theme=dark&z=9&gestureHandling=cooperative"
          width="100%" 
          // height="100%" 
          style={{ border: 0, marginTop: '-100px' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Retailers List Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {retailers.map((retailer) => (
            <div
              key={retailer.id}
              className="w-full p-6 bg-[#FBAC18] rounded-lg text-center"
            >
              <div className="space-y-3">
                <h3 className="font-bold text-lg text-black">
                  {retailer.name}
                </h3>
                <div className="text-sm text-black">
                  <p>{retailer.address}</p>
                  <p>{retailer.city}</p>
                </div>
                <div className="flex items-center gap-2">
                 
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
