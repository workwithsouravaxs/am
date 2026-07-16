export type BusinessCategory = 'Gym' | 'Cafe' | 'Bakery' | 'Salon' | 'Parlour' | 'Restaurant' | 'Clinic' | 'Others';

export type SubscriptionPlan = 'Catalogue' | 'Starter' | 'Business' | 'Premium';

export type BillingCycle = 'Monthly' | '3-Months' | '6-Months';

export interface ServiceItem {
  name: string;
  price: number;
  description: string;
  duration?: string;
}

export interface MenuItem {
  name: string;
  price: number;
  description: string;
  category: string; // e.g. 'Specials', 'Beverages', 'Main Course', 'Desserts'
  isSpecial?: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface OfferItem {
  id: string;
  code: string;
  title: string;
  description: string;
  discountValue: number;
  isPercentage: boolean;
  active: boolean;
}

export type LeadType = 'inquiry' | 'booking' | 'order';
export type LeadStatus = 'pending' | 'resolved';

export interface LeadItem {
  id: string;
  businessId: string;
  businessName: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  type: LeadType;
  status: LeadStatus;
  
  // Specific to Booking
  serviceBooked?: string;
  appointmentDate?: string;
  appointmentTime?: string;
  
  // Specific to Order
  orderItems?: string;
  orderTotal?: number;
}

export interface InvoiceItem {
  id: string;
  businessId: string;
  businessName: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending';
  planName: string;
  billingPeriod: string;
}

export interface VisitorMetric {
  date: string;
  views: number;
}

export interface Business {
  id: string;
  name: string;
  logo: string;
  banner: string;
  category: BusinessCategory;
  city: string;
  rating: number;
  description: string;
  contact: string;
  email: string;
  whatsapp: string;
  address: string;
  mapsUrl: string;
  hours: {
    weekdays: string;
    weekends: string;
  };
  website: string;
  socials: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  gallery: string[];
  services: ServiceItem[];
  menu?: MenuItem[];
  reviews: ReviewItem[];
  offers: OfferItem[];
  plan: SubscriptionPlan;
  billingCycle: BillingCycle;
  status: 'active' | 'pending' | 'suspended';
  createdDate: string;
}

export interface GlobalAnalytics {
  totalSubscribers: number;
  mrr: number;
  catalogueCount: number;
  websiteCount: number;
  renewalRate: number;
  conversions: number;
  arpu: number;
}
