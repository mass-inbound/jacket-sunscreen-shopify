import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from 'react-router';
import {ReviewsSection} from '../components/ReviewsSection';

export const meta: MetaFunction = () => {
  return [{title: 'Customer Reviews | Jacket Sunscreen'}];
};

export async function loader(args: LoaderFunctionArgs) {
  // This is where you would fetch reviews from Shopify or your preferred review system
  // For now, we'll use static data that can be easily replaced with dynamic data later
  
  const reviews = [
    {
      id: '1',
      rating: 5,
      title: 'New favorite sunscreen for my face!',
      content: 'I was raised in the beaches of Puerto Rico, and because of that, now that I\'m older I\'ve had a couple of skin cancers removed. My dermatologist had recommended using pure zinc oxide sunscreen only, but they pretty much left me looking like a mime. I found JACKET, and this was a blessing! It\'s a strong sunscreen, doesn\'t feel oily, and doesn\'t leave any white residue on my face, even though it has a good zinc oxide content. It\'s 4 ounces, which allows me to bring it with me when I travel. And the fact that it has age spot remover is a bonus! I highly recommend it and will continue using it.',
      author: 'José Alvarez',
      verified: true
    },
    {
      id: '2',
      rating: 5,
      title: 'Lightweight and absorbs well',
      content: 'This sunscreen is effective at SPF 50 but, best of all, it is lightweight and absorbs easily into the skin. I\'m on my second tube. I do a lot of outdoor work and this has protected me from sunburn in the hot Texas sun. Recommend it highly.',
      author: 'Ellen Squier',
      verified: true
    },
    {
      id: '3',
      rating: 5,
      title: 'Best sun protection',
      content: 'It goes on smoothly and smells like lemongrass.',
      author: 'Bette Jo Poser',
      verified: true
    },
    {
      id: '4',
      rating: 5,
      title: 'Smells so good!',
      content: 'It smells just like Celestial Seasons green tea. It\'s so good I wish I could have it as a normal lotion. It protects me well and stays put. I don\'t have issues with it running into my eyes and burning. I go on 40-minute walks daily, mostly in the sun, and haven\'t noticed my skin getting any darker. My skin feels softer and I\'m not breaking out like I normally would with sunscreen.',
      author: 'Zamia',
      verified: true
    },
    {
      id: '5',
      rating: 5,
      title: 'No white residue left behind',
      content: 'I\'ve been searching for a luxury sunscreen for years that actually works and doesn\'t leave me looking white like a clown. JACKET has zinc oxide as a physical blocker but also biodegradable blockers that make it SPF 50+. It\'s not thick, has a pleasant scent, and helps fade age spots. I\'m on my second tube. Highly recommended.',
      author: 'Daniel Feinstein',
      verified: true
    },
    {
      id: '6',
      rating: 5,
      title: '"It\'s like nothing… just a light lemony scent."',
      content: 'Brought my new tube on a camping trip and got a chance to use it on some surprisingly sunny fall days. It went on easily and disappeared like a good lotion would. No greasy feeling (which is why I usually avoid sunscreen), and just a nice, light, citrusy smell.',
      author: 'B. Friest',
      verified: true
    },
    {
      id: '7',
      rating: 5,
      title: 'Finally, I found a sunscreen that works for me.',
      content: 'I live in Florida and vacation in the islands every year. Most sunscreens are greasy, but this one is amazing. I can wear makeup over it and don\'t even notice it\'s there. The citrus scent is a plus. I finally found my "go-to" lotion.',
      author: 'Damian B.',
      verified: true
    },
    {
      id: '8',
      rating: 5,
      title: 'Wonderful and toxin-free',
      content: 'This sunscreen is fabulous. It goes on smooth, blends in really well, and doesn\'t leave a white cast.',
      author: 'Kassidy H.',
      verified: true
    },
    {
      id: '9',
      rating: 5,
      title: 'Amazing product!',
      content: 'I absolutely love this sunscreen! It\'s light, doesn\'t leave residue or streaks, and smells great!',
      author: 'Patricia Streff',
      verified: true
    },
    {
      id: '10',
      rating: 5,
      title: 'Solid product; my go-to sunscreen',
      content: 'This is my second purchase. It goes on thick, protects well, isn\'t overly fragrant, and lasts all day. I even used it during a 200-mile bicycle trip—it held up great.',
      author: 'William W. Long',
      verified: true
    },
    {
      id: '11',
      rating: 5,
      title: 'Creamy, absorbing sunblock with pluses',
      content: 'I\'ve been using this daily. It helps with age spots and doesn\'t make me break out. I use it after serum and in place of moisturizer. It absorbs well, and my skin looks better lately.',
      author: 'RenFris',
      verified: true
    },
    {
      id: '12',
      rating: 5,
      title: 'I love this sunscreen',
      content: 'It doesn\'t smell too sunscreen-y, blends in smoothly with no white cast (which is rare for physical sunscreens, especially for Black skin). I love the combo of physical and chemical protection. Glad I gave it a try!',
      author: 'Amazon Customer',
      verified: true
    },
    {
      id: '13',
      rating: 5,
      title: 'No white, works great, our favorite',
      content: 'Goes on white but melts in seconds. Very water/sweat-proof. Mixes great with makeup. No whiteheads like I get from other brands.',
      author: 'Lisa Z.',
      verified: true
    },
    {
      id: '14',
      rating: 5,
      title: 'Very good!',
      content: 'This sunscreen is non-greasy, has a matte finish, no white cast, and washes off nicely. No breakouts either. Great for daily summer use.',
      author: 'Lana',
      verified: true
    },
    {
      id: '15',
      rating: 5,
      title: 'The best sunscreen ever',
      content: 'No sticky feeling, amazing scent, super hydrating—so much that I could skip moisturizer. This is the one I\'ve been looking for.',
      author: 'Denise P.',
      verified: true
    },
    {
      id: '16',
      rating: 5,
      title: '👌🏾👌🏾👌🏾',
      content: 'I\'m a Black woman with oily, acne-prone skin and this sunscreen works great. It blends well, doesn\'t make me oily, and smells amazing. Works perfectly with my moisturizer. Will repurchase for sure!',
      author: 'Trudie',
      verified: true
    },
    {
      id: '17',
      rating: 5,
      title: 'What a fantastic product!!!!',
      content: 'As an avid surfer and beach volleyball player, I\'m in the sun all day. I hate oily, sticky sunscreens—this one is light, effective, and made with ingredients like green tea, cucumber, and lemongrass. This is the only sunscreen I\'ll use now.',
      author: 'Amazon Customer',
      verified: true
    },
    {
      id: '18',
      rating: 5,
      title: 'The best sunscreen ever!!!',
      content: 'JACKET totally exceeded my expectations. Not greasy, absorbs quickly, and feels amazing on the skin. I paddleboarded for 3 hours —SPF 50+ = No burn! Love the added skin-loving ingredients too.',
      author: 'Jorge Landetta',
      verified: true
    },
    {
      id: '19',
      rating: 5,
      title: 'Superb protection, top-quality ingredients',
      content: 'JACKET SPF 50+ is hands-down the best I\'ve tried. Played 36 holes of golf with just one application. Sweat-proof, non-greasy, and packed with soothing antioxidants. Fades age spots too. I\'ll be buying again!',
      author: 'Kindle Customer',
      verified: true
    },
    {
      id: '20',
      rating: 5,
      title: 'Amazing product',
      content: 'I live in Florida and participate in many outdoor sports — mountain biking, running, fishing, using my waverunner. This sunblock goes on smoothly and absorbs quickly. It is not at all greasy. It appears to last many hours and effectively blocks the sun. I always seem to get some "breakthrough" burn with my other sport sunblock. This has not happened with JACKET. It also leaves my skin very soft for many hours after use. It appears to be very resistant to saltwater and keeps working. Highly recommend.',
      author: 'Dr. J',
      verified: true
    },
    {
      id: '21',
      rating: 5,
      title: 'Favorite sunscreen at the surf camp',
      content: 'I tried JACKET on a recent trip to a surf camp in Mexico, and everyone was stealing my sunscreen. First, it works—several hours in the water and sun, and no burn. Second, it isn\'t thick and gross. Third, it smells great and my skin feels better after using it. I\'m planning on using it daily.',
      author: 'Harold',
      verified: true
    },
    {
      id: '22',
      rating: 5,
      title: 'Great!',
      content: 'Absolutely no complaints. Good, lightweight product. No white sheen and I felt protected. Will buy again.',
      author: 'Elle',
      verified: true
    },
    {
      id: '23',
      rating: 5,
      title: 'Love this sunscreen! Highly recommended!',
      content: 'I have really sensitive skin and often break out from sunscreens. JACKET is lightweight, doesn\'t leave a white cast, and offers UVA/UVB protection with SPF 50. Water resistant, too! Great ingredients. Highly recommended.',
      author: 'Caroline',
      verified: true
    },
    {
      id: '24',
      rating: 5,
      title: 'Skin lover\'s dream for this Florida girl!',
      content: 'I live on the beach and NEED a seriously good sunscreen. The new JACKET formula is perfect—even for driving! I love that it has quality ingredients and no bad stuff.',
      author: 'Nancy Weissman',
      verified: true
    },
    {
      id: '25',
      rating: 5,
      title: 'Sensitive Skin',
      content: 'Most sunblocks make me greasy or break me out. JACKET spreads well, absorbs nicely, and works even in the water. Reordered already.',
      author: 'Jasen Pedersen',
      verified: true
    },
    {
      id: '26',
      rating: 5,
      title: 'Best sunblock for sensitive skin',
      content: 'I\'ve had skin cancer and wear sunscreen daily. This one smells great, isn\'t messy or oily, absorbs easily, and truly prevents sunburn.',
      author: 'Richard Goldberg',
      verified: true
    },
    {
      id: '27',
      rating: 5,
      title: 'Best I\'ve tried',
      content: 'This is the first barrier sunscreen I\'ve liked. High SPF, lightweight feel, doesn\'t settle into wrinkles or leave a white film.',
      author: 'Huellas',
      verified: true
    },
    {
      id: '28',
      rating: 5,
      title: 'Picky shopper, my go-to sunscreen',
      content: 'Superior quality! Smooth texture, subtle scent, no ghost face. My new favorite high-SPF sunscreen.',
      author: 'Jude',
      verified: true
    },
    {
      id: '29',
      rating: 5,
      title: 'Buy it and try it',
      content: 'Sweat-proof and eye-safe—perfect for Texas heat during runs. My go-to sunscreen now.',
      author: 'Nicholas M.',
      verified: true
    },
    {
      id: '30',
      rating: 5,
      title: 'Best anti-aging sunscreen. Absolutely #1.',
      content: 'My age spots faded after two weeks! I love this sunscreen and its skin-boosting ingredients.',
      author: 'Juan S.',
      verified: true
    },
    {
      id: '31',
      rating: 5,
      title: 'So impressed!',
      content: 'My husband works outdoors in Florida. No sunburn since using JACKET, and he likes the scent too!',
      author: 'Danielle',
      verified: true
    },
    {
      id: '32',
      rating: 5,
      title: 'Best sunblock I\'ve found so far',
      content: 'Way better than Sun Bum. Not greasy, doesn\'t feel like a zinc blanket, and great for active use.',
      author: 'Christopher Jensen',
      verified: true
    },
    {
      id: '33',
      rating: 5,
      title: 'Best sunscreen',
      content: 'My dermatologist introduced me to JACKET. No breakouts, smooth skin, excellent protection.',
      author: 'Frank Freire',
      verified: true
    },
    {
      id: '34',
      rating: 5,
      title: 'Better than Shiseido',
      content: 'With JACKET, I can finally go to the beach without irritation or white streaks. Calming, blends well, and doesn\'t sting the eyes.',
      author: 'Aimee',
      verified: true
    },
    {
      id: '35',
      rating: 5,
      title: 'Perfect',
      content: 'I usually use another brand, but this one smells better, feels better, and works just as well—if not better.',
      author: 'Anonymous',
      verified: true
    },
    {
      id: '36',
      rating: 5,
      title: 'Great sunscreen for face',
      content: 'Hard to find oxybenzone-free sunscreen that actually works. Lightweight and gentle on sensitive skin.',
      author: 'AbiLyn',
      verified: true
    },
    {
      id: '37',
      rating: 5,
      title: 'Effective and worth buying',
      content: 'I\'m outside all the time, plus I ride a motorcycle. Stays on well even when sweating.',
      author: 'Russ M.',
      verified: true
    },
    {
      id: '38',
      rating: 5,
      title: 'Great',
      content: 'No strong scent or greasy feel. Absorbs easily and leaves skin smooth.',
      author: 'Nissy J.',
      verified: true
    },
    {
      id: '39',
      rating: 5,
      title: 'Extremely water-resistant; great formula',
      content: 'Provides full coverage, truly water resistant, and smells amazing. Works great even when tanning.',
      author: 'Natalia',
      verified: true
    },
    {
      id: '40',
      rating: 5,
      title: 'No sunburn going in and out of water',
      content: 'Used by my grandkids on vacation—no sunburn despite hours in and out of the water.',
      author: 'N. Thomas',
      verified: true
    },
    {
      id: '41',
      rating: 5,
      title: 'Awesome sunscreen!',
      content: 'Used it snorkeling in Grand Cayman. No sunburn. Works well under makeup too.',
      author: 'Tracy Leder',
      verified: true
    },
    {
      id: '42',
      rating: 5,
      title: 'I never liked sunscreen until now',
      content: 'Subtle citrus scent, no greasy feel, no white cast, and makes my skin velvety soft. Love it.',
      author: 'E.B.',
      verified: true
    },
    {
      id: '43',
      rating: 5,
      title: 'Awesome product',
      content: 'Outdoors a lot—this is my go-to sunblock. Smooth, lasting protection.',
      author: 'Robert Iannarone',
      verified: true
    },
    {
      id: '44',
      rating: 5,
      title: 'Best sunscreen ever!',
      content: 'Not greasy, feels great on the skin, and holds up during sports.',
      author: 'Zachary Kaplan',
      verified: true
    },
    {
      id: '45',
      rating: 5,
      title: 'Excellent sunscreen product',
      content: 'Easy to apply, lasts long, and isn\'t greasy. My go-to now!',
      author: 'Lawrence Frankel',
      verified: true
    },
    {
      id: '46',
      rating: 5,
      title: 'Love this',
      content: 'Best non-greasy sunscreen I\'ve used. Had to repurchase.',
      author: 'Stacy O\'Nell',
      verified: true
    },
    {
      id: '47',
      rating: 5,
      title: 'Works great, awesome sunblock!',
      content: 'Wore it for 8 hours—no sunburn and no stinging eyes like other brands.',
      author: 'Charles S.',
      verified: true
    },
    {
      id: '48',
      rating: 5,
      title: 'Feels nice',
      content: 'Non-greasy, lightweight, and great for sensitive skin.',
      author: 'Brian',
      verified: true
    },
    {
      id: '49',
      rating: 5,
      title: 'Love this stuff',
      content: 'Easy to apply, not heavy, and doesn\'t clog pores.',
      author: 'Kerry S.',
      verified: true
    },
    {
      id: '50',
      rating: 5,
      title: 'Excellent Product',
      content: 'Best natural sunscreen I\'ve used. I\'ll never switch again.',
      author: 'Pen Name',
      verified: true
    },
    {
      id: '51',
      rating: 5,
      title: 'Don\'t like greasy sunblock? Me either.',
      content: 'Not greasy, great sun protection—one of the best I\'ve tried.',
      author: 'Jessica Kim Yang',
      verified: true
    },
    {
      id: '52',
      rating: 5,
      title: 'Works perfect',
      content: 'Perfect! In love with this product.',
      author: 'Costleila',
      verified: true
    },
    {
      id: '53',
      rating: 5,
      title: 'Amazing',
      content: 'This product is amazing!',
      author: 'Jaé',
      verified: true
    },
    {
      id: '54',
      rating: 5,
      title: 'Very effective and natural ingredients',
      content: 'Never irritated my acne-prone skin. Reef-safe and great for the whole family.',
      author: 'Chris Harden',
      verified: true
    },
    {
      id: '55',
      rating: 5,
      title: 'Best sunscreen ever!',
      content: 'Finally, a sunblock with anti-aging ingredients and SPF 50! I\'ve sent it to friends—they love it too.',
      author: 'John S.',
      verified: true
    },
    {
      id: '56',
      rating: 5,
      title: 'Superior product',
      content: 'As a physician, I highly recommend this. Best results I\'ve seen in a sunscreen.',
      author: 'Nasser Nasseri, MD',
      verified: true
    },
    {
      id: '57',
      rating: 5,
      title: 'Best sunblock',
      content: 'Doesn\'t run into eyes and provides great protection in Florida heat.',
      author: 'Sam',
      verified: true
    },
    {
      id: '58',
      rating: 5,
      title: 'Must-have for South Florida',
      content: 'Ultra-protective and non-greasy. We use it every weekend at the beach.',
      author: 'Victoria',
      verified: true
    },
    {
      id: '59',
      rating: 5,
      title: '#1',
      content: 'Best sunscreen out there. Doesn\'t wear off, even during runs.',
      author: 'Ryan',
      verified: true
    },
    {
      id: '60',
      rating: 5,
      title: 'Feels great',
      content: 'Great protection and lightweight feel.',
      author: 'Gary C.',
      verified: true
    },
    {
      id: '61',
      rating: 5,
      title: 'Smells good',
      content: 'Using daily on arms for sun protection and vitamins. May help with sun spots.',
      author: 'Tom K.',
      verified: true
    },
    {
      id: '62',
      rating: 5,
      title: 'Works great',
      content: 'Lightweight, moisturizing, and lasts long. Love the ingredients.',
      author: 'Paula Nuñez',
      verified: true
    },
    {
      id: '63',
      rating: 5,
      title: 'Smooth and clear',
      content: 'I\'m a hiker in Phoenix. This sunscreen glides on, rubs in clear, and works great under makeup.',
      author: 'Colleen K.',
      verified: true
    },
    {
      id: '64',
      rating: 5,
      title: 'Does not irritate, great for acne-prone skin',
      content: 'No breakouts or white residue. Actually soothes my sensitive skin.',
      author: 'VRK',
      verified: true
    },
    {
      id: '65',
      rating: 5,
      title: 'Me encantó! (I love it!)',
      content: 'No deja blanca la cara. (Doesn\'t leave your face white.)',
      author: 'Anonymous',
      verified: true
    },
    {
      id: '66',
      rating: 5,
      title: 'Good for our skin? I\'ll take it!',
      content: 'Light smell, not too thick, and safe for my 2-year-old. Whole family can use it!',
      author: 'Daisy',
      verified: true
    },
    {
      id: '67',
      rating: 5,
      title: 'JACKET Lip Balm is the bomb!',
      content: 'No burnt lips after skiing! Best chapstick with sunscreen I\'ve used.',
      author: 'Tasia B.',
      verified: true
    },
    {
      id: '68',
      rating: 5,
      title: 'I\'m addicted!',
      content: 'Smooth, non-greasy, protective, and perfect for the golf course. I\'m hooked!',
      author: 'Steve McMillan, The Golfing Dad\'s Tavern',
      verified: true
    },
    {
      id: '69',
      rating: 5,
      title: 'Off road… JACKET on!',
      content: 'Goes on easy, not oily, and lets skin breathe. Great for high-sun activities.',
      author: 'Jason',
      verified: true
    }
  ];

  return {
    reviews,
    // Add pagination info if needed
    pagination: {
      hasNextPage: false,
      hasPreviousPage: false,
      currentPage: 1,
      totalPages: 1
    }
  };
}

export default function ReviewsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="reviews-page">
      <ReviewsSection reviews={data.reviews} />
    </div>
  );
} 