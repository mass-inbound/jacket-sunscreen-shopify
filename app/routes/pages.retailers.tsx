import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from 'react-router';
import {RetailersPage} from '~/components/RetailersPage';

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;

  return {
    retailers: [
      {
        id: 1,
        name: 'Balshi Dermatology & Cosmetic Surgery',
        address: '4665 W. Atlantic Avenue',
        city: 'Delray Beach, Florida',
        coordinates: {lat: 26.4615, lng: -80.0728},
        isActive: true
      },
      {
        id: 2,
        name: 'Hilton West Palm Beach',
        address: '600 Okeechobee Boulevard',
        city: 'West Palm Beach, Florida',
        coordinates: {lat: 26.7153, lng: -80.0534},
        isActive: false
      },
      {
        id: 3,
        name: 'Isla Bella Beach Resort',
        address: '1 Knights Key Boulevard',
        city: 'Marathon, Florida',
        coordinates: {lat: 24.7136, lng: -81.0892},
        isActive: false
      },
      {
        id: 4,
        name: 'Lighthouse Point Tennis Center',
        address: '3500 N.E. 27th Avenue',
        city: 'Lighthouse Point, Florida',
        coordinates: {lat: 26.2759, lng: -80.0873},
        isActive: false
      },
      {
        id: 5,
        name: 'Cheeca Lodge & Spa',
        address: '81801 Overseas Highway',
        city: 'Islamorada, Florida',
        coordinates: {lat: 24.9241, lng: -80.6278},
        isActive: false
      },
      {
        id: 6,
        name: 'Lotus Palm Racquet Center',
        address: '20465 Golf Course Road',
        city: 'Boca Raton, Florida',
        coordinates: {lat: 26.3683, lng: -80.1289},
        isActive: false
      },
      {
        id: 7,
        name: 'Love Shack',
        address: '411 E. Atlantic Avenue',
        city: 'Delray Beach, Florida',
        coordinates: {lat: 26.4615, lng: -80.0728},
        isActive: false
      },
      {
        id: 8,
        name: 'Snappy Turtle',
        address: '1100 E. Atlantic Avenue',
        city: 'Delray Beach, Florida',
        coordinates: {lat: 26.4615, lng: -80.0728},
        isActive: false
      },
      {
        id: 9,
        name: 'Surf District Surf Shop',
        address: '220 N.E. 1st Street',
        city: 'Delray Beach, Florida',
        coordinates: {lat: 26.4615, lng: -80.0728},
        isActive: false
      },
      {
        id: 10,
        name: 'Tesoro Club',
        address: '2000 S.E. Via Tesoro',
        city: 'Port St. Lucie, Florida',
        coordinates: {lat: 27.2738, lng: -80.3584},
        isActive: false
      },
      {
        id: 11,
        name: 'The Club at Quail Ridge',
        address: '3715 Golf Road',
        city: 'Boynton Beach, Florida',
        coordinates: {lat: 26.5317, lng: -80.0905},
        isActive: false
      },
      {
        id: 12,
        name: 'The Park West Palm',
        address: '7301 Georgia Avenue',
        city: 'West Palm Beach, Florida',
        coordinates: {lat: 26.7153, lng: -80.0534},
        isActive: false
      },
      {
        id: 13,
        name: 'True Value of Boca Raton',
        address: '399 N.E Spanish River Boulevard',
        city: 'Boca Raton, Florida',
        coordinates: {lat: 26.3683, lng: -80.1289},
        isActive: false
      },
      {
        id: 14,
        name: 'Two Conchs Sportfishing',
        address: '11499-B Overseas Highway',
        city: 'Marathon, Florida',
        coordinates: {lat: 24.7136, lng: -81.0892},
        isActive: false
      },
      {
        id: 15,
        name: 'Valencia Grand Racquet Club & Pro Shop',
        address: '9250 Maple Valley Road',
        city: 'Boynton Beach, Florida',
        coordinates: {lat: 26.5317, lng: -80.0905},
        isActive: false
      },
      {
        id: 16,
        name: 'Valencia Sound Racquet Club',
        address: '12690 Salty Springs Avenue',
        city: 'Boynton Beach, Florida',
        coordinates: {lat: 26.5317, lng: -80.0905},
        isActive: false
      },
      {
        id: 17,
        name: 'Westchester Country Club',
        address: '12250 Westchester Club Drive',
        city: 'Boynton Beach, Florida',
        coordinates: {lat: 26.5317, lng: -80.0905},
        isActive: false
      }
    ]
  };
}

export default function RetailersPageRoute() {
  const {retailers} = useLoaderData<typeof loader>();

  return <RetailersPage retailers={retailers} />;
} 