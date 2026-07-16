import type { Business, LeadItem, InvoiceItem } from '../types';

// Helper to generate a clean, colorful SVG banner with gradient
export const makeSvgBanner = (title: string, subtitle: string, fromColor: string, toColor: string) => {
  const cleanFrom = fromColor.startsWith('%23') ? fromColor.replace('%23', '#') : fromColor;
  const cleanTo = toColor.startsWith('%23') ? toColor.replace('%23', '#') : toColor;
  const cleanTitleId = title.replace(/[^a-zA-Z0-9]/g, '');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="500" viewBox="0 0 1200 500">
    <defs>
      <linearGradient id="g_${cleanTitleId}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${cleanFrom}" />
        <stop offset="100%" stop-color="${cleanTo}" />
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#g_${cleanTitleId})" />
    <rect width="100%" height="100%" fill="url(#grid)" />
    <circle cx="900" cy="250" r="180" fill="white" fill-opacity="0.03" />
    <circle cx="200" cy="350" r="100" fill="white" fill-opacity="0.02" />
    <text x="10%" y="45%" font-family="sans-serif" font-size="56" font-weight="800" fill="#ffffff">${title}</text>
    <text x="10%" y="60%" font-family="sans-serif" font-size="24" fill="#eff6ff" fill-opacity="0.9">${subtitle}</text>
  </svg>`;
  const base64 = btoa(encodeURIComponent(svg).replace(/%([0-9A-F]{2})/g, (_, p1) => {
    return String.fromCharCode(parseInt(p1, 16));
  }));
  return `data:image/svg+xml;base64,${base64}`;
};

// Helper to generate a clean SVG logo with initials
const makeSvgLogo = (initials: string, bgColor: string, textColor: string = '#ffffff') => {
  const cleanBg = bgColor.startsWith('%23') ? bgColor.replace('%23', '#') : bgColor;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
    <rect width="100%" height="100%" rx="24" fill="${cleanBg}" />
    <circle cx="60" cy="60" r="45" fill="white" fill-opacity="0.1" />
    <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="38" font-weight="bold" fill="${textColor}">${initials}</text>
  </svg>`;
  const base64 = btoa(encodeURIComponent(svg).replace(/%([0-9A-F]{2})/g, (_, p1) => {
    return String.fromCharCode(parseInt(p1, 16));
  }));
  return `data:image/svg+xml;base64,${base64}`;
};

export const MOCK_BUSINESSES: Business[] = [
  {
    id: 'espresso-house',
    name: 'Espresso House & Café',
    category: 'Cafe',
    logo: makeSvgLogo('EH', '%2378350f'),
    banner: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop&q=80',
    city: 'Bangalore',
    rating: 4.8,
    description: 'Brewing happiness daily! Espresso House is your local destination for premium single-origin coffees, handcrafted espresso beverages, freshly baked croissants, and healthy breakfast selections. Perfect for remote work, friendly chats, or quiet reading.',
    contact: '+91 98765 43210',
    email: 'hello@espressohouse.local',
    whatsapp: '919876543210',
    address: '12th Main Road, HAL 2nd Stage, Indiranagar, Bangalore - 560038',
    mapsUrl: 'https://maps.google.com/?q=Indiranagar,Bangalore',
    hours: {
      weekdays: '08:00 AM - 10:00 PM',
      weekends: '07:30 AM - 11:00 PM'
    },
    website: 'https://espressohouse.syntro.tech',
    socials: {
      instagram: 'espressohouse_blr',
      facebook: 'espressohouseblr'
    },
    gallery: [
      'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=800&auto=format&fit=crop&q=80'
    ],
    services: [
      { name: 'Coffee Tasting Workshop', price: 499, description: 'Learn to distinguish flavors, origins, and brewing profiles with our head barista.' },
      { name: 'Private Workspace Slot (3 hrs)', price: 290, description: 'Dedicated high-speed Wi-Fi, ergonomic desk, and a complimentary beverage of choice.' },
      { name: 'Cafe Venue Booking (per hour)', price: 2500, description: 'Host intimate gatherings, poetry readings, or small workshops in our cozy setup.' }
    ],
    menu: [
      { name: 'Signature Double Espresso', price: 140, description: 'Robust, full-bodied single origin shot with thick crema.', category: 'Beverages', isSpecial: true },
      { name: 'Hazelnut Latte Macchiato', price: 190, description: 'Freshly steamed milk with hazelnut syrup, marked with espresso.', category: 'Beverages' },
      { name: 'Himalayan Cold Brew', price: 170, description: 'Smooth, 18-hour slow-steeped cold coffee served over ice.', category: 'Beverages', isSpecial: true },
      { name: 'Almond Butter Croissant', price: 150, description: 'Flaky, buttery pastry filled with sweet almond frangipane.', category: 'Desserts', isSpecial: true },
      { name: 'Blueberry Cheesecake Slice', price: 220, description: 'Rich cream cheese on a graham biscuit base, topped with blueberry compote.', category: 'Desserts' },
      { name: 'Smashed Avocado Toast', price: 240, description: 'Fresh sourdough topped with seasoned avocado, cherry tomatoes, and feta cheese.', category: 'Main Course' },
      { name: 'Grilled Pesto Chicken Sandwich', price: 210, description: 'Sautéed chicken, house-made basil pesto, mozzarella in artisanal focaccia.', category: 'Main Course' }
    ],
    reviews: [
      { id: '1', author: 'Aryan Sharma', rating: 5, comment: 'The Himalayan Cold Brew is outstanding! Extremely cozy atmosphere and helpful staff.', date: '2026-07-10' },
      { id: '2', author: 'Nisha Rao', rating: 4, comment: 'Great place to work from. Wi-Fi is fast. Croissants are delicious but sell out quickly.', date: '2026-07-14' }
    ],
    offers: [
      { id: '1', code: 'BREWFIRST', title: 'Buy 1 Get 1 Free', description: 'Get a free cappuccino or espresso on your first visit.', discountValue: 100, isPercentage: true, active: true },
      { id: '2', code: 'COFFEEWORK', title: '15% Off Workspace Booking', description: 'Get 15% discount on private desk bookings during weekdays.', discountValue: 15, isPercentage: true, active: true }
    ],
    plan: 'Premium',
    billingCycle: 'Monthly',
    status: 'active',
    createdDate: '2026-05-01'
  },
  {
    id: 'iron-temple-gym',
    name: 'Iron Temple Fitness Gym',
    category: 'Gym',
    logo: makeSvgLogo('IT', '%231e293b'),
    banner: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80',
    city: 'Mumbai',
    rating: 4.9,
    description: 'Welcome to Iron Temple Gym, the ultimate fitness hub in Mumbai. Equipt with premium strength training machines, heavy cardio grids, personal trainers, and clean shower rooms. We focus on strength conditioning, body transformation, and general health.',
    contact: '+91 99999 88888',
    email: 'info@irontemple.local',
    whatsapp: '919999988888',
    address: 'A-Wing, 3rd Floor, Commercial Plaza, Link Road, Andheri West, Mumbai - 400053',
    mapsUrl: 'https://maps.google.com/?q=Andheri+West,Mumbai',
    hours: {
      weekdays: '05:00 AM - 10:00 PM',
      weekends: '06:00 AM - 06:00 PM'
    },
    website: 'https://irontemple.syntro.tech',
    socials: {
      instagram: 'irontemple_mumbai',
      facebook: 'irontemplemumbai'
    },
    gallery: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&auto=format&fit=crop&q=80'
    ],
    services: [
      { name: '1-Month General Membership', price: 1800, description: 'Full access to gym floor, lockers, steam room and cardio equipment.' },
      { name: '3-Month Standard Membership', price: 4500, description: 'Includes gym access, biometric screening, and 2 general trainer sessions.' },
      { name: 'Personal Training Program (12 Sessions)', price: 7999, description: '1-on-1 coaching, custom workout plans, nutritional tracking, and biweekly follow-ups.' },
      { name: 'Customized Diet & Workout Chart', price: 999, description: 'A detailed plan created by our nutritionist based on your BMI and goal.' }
    ],
    reviews: [
      { id: '1', author: 'Kabir Malhotra', rating: 5, comment: 'Best strength equipment in Mumbai. Highly professional trainers who actually pay attention.', date: '2026-07-08' },
      { id: '2', author: 'Sarah Fernandez', rating: 5, comment: 'Super clean, sanitizers everywhere, and excellent music! Makes working out so motivating.', date: '2026-07-12' }
    ],
    offers: [
      { id: '1', code: 'TEMPLE100', title: 'Flat ₹500 Off', description: 'Get flat ₹500 discount on your first 3-month membership signup.', discountValue: 500, isPercentage: false, active: true },
      { id: '2', code: 'FITCOUPLE', title: '20% Couples Discount', description: 'Join together and receive a 20% discount on standard annual passes.', discountValue: 20, isPercentage: true, active: true }
    ],
    plan: 'Business',
    billingCycle: '3-Months',
    status: 'active',
    createdDate: '2026-06-05'
  },
  {
    id: 'glow-style-salon',
    name: 'Glow & Style Unisex Salon',
    category: 'Salon',
    logo: makeSvgLogo('GS', '%23db2777'),
    banner: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1200&auto=format&fit=crop&q=80',
    city: 'Delhi',
    rating: 4.7,
    description: 'Pamper yourself at Delhi\'s premier unisex salon. Offering state-of-the-art hair styling, coloring, keratin treatments, aesthetic facials, pedicures, and professional bridal packages. Our expert stylists carry years of experience and use only premium dermatological products.',
    contact: '+91 91234 56789',
    email: 'appointments@glowstyle.local',
    whatsapp: '919123456789',
    address: 'C-24, Ground Floor, Greater Kailash-I, New Delhi - 110048',
    mapsUrl: 'https://maps.google.com/?q=Greater+Kailash,Delhi',
    hours: {
      weekdays: '10:00 AM - 08:30 PM',
      weekends: '09:30 AM - 09:00 PM'
    },
    website: 'https://glowstyle.syntro.tech',
    socials: {
      instagram: 'glowstyle_gk',
      facebook: 'glowstylegk'
    },
    gallery: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1605497746444-ac9da58d7d9a?w=800&auto=format&fit=crop&q=80'
    ],
    services: [
      { name: 'Men\'s Designer Haircut & Styling', price: 450, description: 'Haircut, deep conditioning wash, blowdry, and professional styling.' },
      { name: 'Women\'s Styling & Balayage Color', price: 3499, description: 'Premium L\'Oreal hair coloring, styling advice, wash, and blowdry.' },
      { name: 'HydraFacial Glow Treatment (60 mins)', price: 1999, description: 'Deep exfoliation, blackhead extraction, serum hydration, and cold therapy.' },
      { name: 'Luxury Pedicure & Manicure Set', price: 1200, description: 'Organic herbal scrub, soothing massage, nail shaping, and choice of polish.' }
    ],
    reviews: [
      { id: '1', author: 'Pooja Bhatia', rating: 5, comment: 'Loved my haircut by Raj! Very understanding stylist. The salon hygiene is top-notch.', date: '2026-07-05' },
      { id: '2', author: 'Rohan Mehra', rating: 4, comment: 'Quick service for men\'s haircuts. Strongly recommend making an appointment beforehand.', date: '2026-07-15' }
    ],
    offers: [
      { id: '1', code: 'GLOWGLAM', title: '15% Off Facial Services', description: 'Get 15% discount on HydraFacials and luxury glow therapies.', discountValue: 15, isPercentage: true, active: true },
      { id: '2', code: 'SALON10', title: 'Flat ₹100 Off', description: 'Get ₹100 off on any service above ₹500. Valid Monday to Thursday.', discountValue: 100, isPercentage: false, active: true }
    ],
    plan: 'Premium',
    billingCycle: '6-Months',
    status: 'active',
    createdDate: '2026-04-12'
  },
  {
    id: 'sweet-treats-bakery',
    name: 'Sweet Treats Patisserie',
    category: 'Bakery',
    logo: makeSvgLogo('ST', '%23ec4899'),
    banner: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?w=1200&auto=format&fit=crop&q=80',
    city: 'Pune',
    rating: 4.6,
    description: 'A slice of heaven in Pune! Sweet Treats specializes in bespoke birthday cakes, tier-cake designs, French macarons, eggless pastries, and fresh sourdough breads. We take custom orders for weddings, baby showers, corporate events, and theme parties.',
    contact: '+91 97654 32109',
    email: 'orders@sweettreats.local',
    whatsapp: '919765432109',
    address: 'Shop No. 5, Boulevard Square, Koregaon Park, Pune - 411001',
    mapsUrl: 'https://maps.google.com/?q=Koregaon+Park,Pune',
    hours: {
      weekdays: '09:00 AM - 09:30 PM',
      weekends: '09:00 AM - 10:30 PM'
    },
    website: 'https://sweettreats.syntro.tech',
    socials: {
      instagram: 'sweettreats_kp'
    },
    gallery: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=80'
    ],
    services: [
      { name: 'Custom Cake Consult (30 mins)', price: 300, description: 'Talk to our chief chef to design, flavor-map, and sketch your dream event cake.' },
      { name: 'Kids Birthday Theme Baking (2kg+)', price: 2800, description: 'A custom, handcrafted theme cake (fondant/whipped cream) with customized topper.' },
      { name: 'Macaron Gift Box Delivery', price: 750, description: 'A beautiful gift box containing 12 assorted French macarons (eggless optional).' }
    ],
    menu: [
      { name: 'Belgium Chocolate Fudge Cake (500g)', price: 600, description: 'Layers of moist chocolate sponge with premium Belgian fudge icing.', category: 'Cakes', isSpecial: true },
      { name: 'Red Velvet Cream Cheese Pastry', price: 120, description: 'Velvety red sponge with tangy sweet cream cheese layers.', category: 'Cakes' },
      { name: 'Assorted Macarons Box (6 Pcs)', price: 380, description: 'Rose, pistachio, salted caramel, dark chocolate, lemon, and vanilla.', category: 'Desserts', isSpecial: true },
      { name: 'Nutella Stuffed Cookie', price: 90, description: 'Warm, chunky chocolate chip cookie with a molten Nutella center.', category: 'Desserts' },
      { name: 'Artisanal Country Sourdough', price: 140, description: 'Slow-fermented wild yeast bread with a crusty exterior and chewy crumb.', category: 'Breads', isSpecial: true },
      { name: 'Cheese Garlic Pull-apart Bread', price: 160, description: 'Freshly baked bread loaded with mozzarella, garlic butter, and herbs.', category: 'Breads' }
    ],
    reviews: [
      { id: '1', author: 'Varun Joshi', rating: 4, comment: 'Ordered my daughter\'s birthday cake from here. It was beautiful and taste was excellent!', date: '2026-07-02' },
      { id: '2', author: 'Ananya Sen', rating: 5, comment: 'Best macarons in Pune! Melt in the mouth. Will definitely order again.', date: '2026-07-13' }
    ],
    offers: [
      { id: '1', code: 'CAKE2026', title: '10% Off Cakes', description: 'Get 10% off on all pre-ordered cakes above 1kg.', discountValue: 10, isPercentage: true, active: true },
      { id: '2', code: 'SWEET15', title: 'Flat ₹150 Off', description: 'Flat ₹150 off on orders above ₹1000.', discountValue: 150, isPercentage: false, active: true }
    ],
    plan: 'Catalogue',
    billingCycle: 'Monthly',
    status: 'active',
    createdDate: '2026-06-20'
  }
];

export const MOCK_LEADS: LeadItem[] = [
  {
    id: 'lead-1',
    businessId: 'glow-style-salon',
    businessName: 'Glow & Style Unisex Salon',
    name: 'Meera Iyer',
    email: 'meera.iyer@gmail.local',
    phone: '+91 98888 77777',
    message: 'Looking to book a HydraFacial slot for Saturday afternoon around 2 PM. Please confirm availability.',
    date: '2026-07-15 11:30 AM',
    type: 'booking',
    status: 'pending',
    serviceBooked: 'HydraFacial Glow Treatment (60 mins)',
    appointmentDate: '2026-07-18',
    appointmentTime: '02:00 PM'
  },
  {
    id: 'lead-2',
    businessId: 'espresso-house',
    businessName: 'Espresso House & Café',
    name: 'Vikram Seth',
    email: 'vikram.seth@yahoo.local',
    phone: '+91 96666 55555',
    message: 'Need to order 5 Avocado Toasts and 5 Iced Lattes for an office meeting delivery at 4 PM.',
    date: '2026-07-16 10:15 AM',
    type: 'order',
    status: 'pending',
    orderItems: '5x Smashed Avocado Toast, 5x Himalayan Cold Brew',
    orderTotal: 2050
  },
  {
    id: 'lead-3',
    businessId: 'iron-temple-gym',
    businessName: 'Iron Temple Fitness Gym',
    name: 'Amit Patel',
    email: 'amit.patel@gmail.local',
    phone: '+91 97777 66666',
    message: 'I want to know if personal training fees can be paid in monthly installments or if I need to pay all at once.',
    date: '2026-07-14 05:45 PM',
    type: 'inquiry',
    status: 'resolved'
  },
  {
    id: 'lead-4',
    businessId: 'glow-style-salon',
    businessName: 'Glow & Style Unisex Salon',
    name: 'Riddhi Shah',
    email: 'riddhi@outlook.local',
    phone: '+91 95555 44444',
    message: 'Can I get a stylist who is specialized in hair balayage? Booking for hair styling.',
    date: '2026-07-16 09:00 AM',
    type: 'booking',
    status: 'pending',
    serviceBooked: 'Women\'s Styling & Balayage Color',
    appointmentDate: '2026-07-20',
    appointmentTime: '11:00 AM'
  }
];

export const MOCK_INVOICES: InvoiceItem[] = [
  {
    id: 'INV-2026-001',
    businessId: 'espresso-house',
    businessName: 'Espresso House & Café',
    amount: 999,
    date: '2026-07-01',
    status: 'paid',
    planName: 'Premium Website Plan',
    billingPeriod: 'July 1, 2026 - August 1, 2026'
  },
  {
    id: 'INV-2026-002',
    businessId: 'iron-temple-gym',
    businessName: 'Iron Temple Fitness Gym',
    amount: 2697, // 899 * 3
    date: '2026-06-05',
    status: 'paid',
    planName: 'Business Website Plan (3 Months)',
    billingPeriod: 'June 5, 2026 - September 5, 2026'
  },
  {
    id: 'INV-2026-003',
    businessId: 'glow-style-salon',
    businessName: 'Glow & Style Unisex Salon',
    amount: 5994, // 999 * 6
    date: '2026-07-12',
    status: 'paid',
    planName: 'Premium Website Plan (6 Months)',
    billingPeriod: 'July 12, 2026 - January 12, 2027'
  },
  {
    id: 'INV-2026-004',
    businessId: 'sweet-treats-bakery',
    businessName: 'Sweet Treats Patisserie',
    amount: 99,
    date: '2026-06-20',
    status: 'paid',
    planName: 'Digital Catalogue Plan',
    billingPeriod: 'June 20, 2026 - July 20, 2026'
  }
];
