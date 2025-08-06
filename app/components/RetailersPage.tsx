import {useState, useEffect, useRef} from 'react';
import {Loader} from '@googlemaps/js-api-loader';

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
  const [selectedRetailer, setSelectedRetailer] = useState<Retailer>(
    retailers[0],
  );
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      console.log('Initializing Google Maps...');
      const apiKey = import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg';
      console.log('Using API key:', apiKey ? 'Key provided' : 'No key found');
      
      const loader = new Loader({
        apiKey,
        version: 'weekly',
        libraries: ['places'],
      });

      try {
        const google = await loader.load();
        console.log('Google Maps loaded successfully');

        if (mapRef.current) {
          console.log('Map container found, creating map instance...');
          const mapInstance = new google.maps.Map(mapRef.current, {
            center: {lat: 26.4615, lng: -80.0728}, // Default to first retailer
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{visibility: 'off'}],
              },
            ],
          });

          setMap(mapInstance);
          console.log('Map instance created and set');

          // Create markers for all retailers
          const newMarkers = retailers.map((retailer) => {
            const marker = new google.maps.Marker({
              position: retailer.coordinates,
              map: mapInstance,
              title: retailer.name,
              icon: {
                url:
                  'data:image/svg+xml;charset=UTF-8,' +
                  encodeURIComponent(`
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="${retailer.isActive ? '#FBAC18' : '#666666'}" stroke="white" stroke-width="2"/>
                    <circle cx="12" cy="12" r="4" fill="white"/>
                  </svg>
                `),
                scaledSize: new google.maps.Size(24, 24),
                anchor: new google.maps.Point(12, 12),
              },
            });

            // Add click listener to marker
            marker.addListener('click', () => {
              setSelectedRetailer(retailer);
            });

            return marker;
          });

          setMarkers(newMarkers);
          console.log(`Created ${newMarkers.length} markers`);
        } else {
          console.error('Map container ref is null');
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initMap();
  }, [retailers]);

  useEffect(() => {
    if (map && selectedRetailer) {
      map.setCenter(selectedRetailer.coordinates);
      map.setZoom(15);
    }
  }, [selectedRetailer, map]);

  const handleRetailerClick = (retailer: Retailer) => {
    setSelectedRetailer(retailer);
  };

  const handleRetailerKeyDown = (
    event: React.KeyboardEvent,
    retailer: Retailer,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleRetailerClick(retailer);
    }
  };


  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <div className="py-4 text-center">
        <div className="bg-[#FBAC18] px-8 py-2 inline-block rounded">
          <div className="text-5xl font-normal text-white">RETAILERS</div>
        </div>
      </div>

      {/* Full Width Map Section */}
      <div className="w-full h-[500px] relative">
        <div ref={mapRef} className="w-full h-full absolute inset-0" />
      </div>

      {/* Retailers List Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {retailers.map((retailer) => (
            <button
              key={retailer.id}
              className={`w-full text-left p-6 rounded-lg transition-all duration-200 ${
                selectedRetailer?.id === retailer.id
                  ? 'bg-[#FBAC18] text-white shadow-lg'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => handleRetailerClick(retailer)}
              onKeyDown={(e) => handleRetailerKeyDown(e, retailer)}
              aria-pressed={selectedRetailer?.id === retailer.id}
            >
              <div className="space-y-3">
                <h3
                  className={`font-bold text-lg ${
                    selectedRetailer?.id === retailer.id
                      ? 'text-white'
                      : 'text-black'
                  }`}
                >
                  {retailer.name}
                </h3>
                <div
                  className={`text-sm ${
                    selectedRetailer?.id === retailer.id
                      ? 'text-white'
                      : 'text-gray-600'
                  }`}
                >
                  <p>{retailer.address}</p>
                  <p>{retailer.city}</p>
                </div>
               
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
