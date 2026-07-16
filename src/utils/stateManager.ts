import type { Business, LeadItem, InvoiceItem, GlobalAnalytics, VisitorMetric, ReviewItem, OfferItem } from '../types';
import { MOCK_BUSINESSES, MOCK_LEADS, MOCK_INVOICES } from '../data/mockData';

const KEYS = {
  BUSINESSES: 'syntro_businesses',
  LEADS: 'syntro_leads',
  INVOICES: 'syntro_invoices',
};

// Initialize localStorage if empty or if containing legacy SVG banners
export const initializeStorage = (): void => {
  const stored = localStorage.getItem(KEYS.BUSINESSES);
  const needsReset = !stored || stored.includes('data:image/svg+xml;utf8');
  if (needsReset) {
    localStorage.setItem(KEYS.BUSINESSES, JSON.stringify(MOCK_BUSINESSES));
  }
  if (!localStorage.getItem(KEYS.LEADS)) {
    localStorage.setItem(KEYS.LEADS, JSON.stringify(MOCK_LEADS));
  }
  if (!localStorage.getItem(KEYS.INVOICES)) {
    localStorage.setItem(KEYS.INVOICES, JSON.stringify(MOCK_INVOICES));
  }
};

// Business operations
export const getBusinesses = (): Business[] => {
  initializeStorage();
  const raw = localStorage.getItem(KEYS.BUSINESSES);
  return raw ? JSON.parse(raw) : [];
};

export const getBusinessById = (id: string): Business | undefined => {
  const businesses = getBusinesses();
  return businesses.find(b => b.id === id);
};

export const saveBusiness = (business: Business): void => {
  const businesses = getBusinesses();
  const index = businesses.findIndex(b => b.id === business.id);
  if (index !== -1) {
    businesses[index] = business;
  } else {
    businesses.push(business);
  }
  localStorage.setItem(KEYS.BUSINESSES, JSON.stringify(businesses));
};

// Lead operations
export const getLeads = (): LeadItem[] => {
  initializeStorage();
  const raw = localStorage.getItem(KEYS.LEADS);
  return raw ? JSON.parse(raw) : [];
};

export const getLeadsForBusiness = (businessId: string): LeadItem[] => {
  const leads = getLeads();
  return leads.filter(l => l.businessId === businessId);
};

export const addLead = (lead: Omit<LeadItem, 'id' | 'date' | 'status'>): LeadItem => {
  const leads = getLeads();
  const formattedDate = new Date().toLocaleString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  
  const newLead: LeadItem = {
    ...lead,
    id: `lead-${Date.now()}`,
    date: formattedDate,
    status: 'pending',
  };
  
  leads.unshift(newLead);
  localStorage.setItem(KEYS.LEADS, JSON.stringify(leads));
  return newLead;
};

export const updateLeadStatus = (leadId: string, status: 'pending' | 'resolved'): void => {
  const leads = getLeads();
  const index = leads.findIndex(l => l.id === leadId);
  if (index !== -1) {
    leads[index].status = status;
    localStorage.setItem(KEYS.LEADS, JSON.stringify(leads));
  }
};

// Invoice operations
export const getInvoices = (): InvoiceItem[] => {
  initializeStorage();
  const raw = localStorage.getItem(KEYS.INVOICES);
  return raw ? JSON.parse(raw) : [];
};

export const getInvoicesForBusiness = (businessId: string): InvoiceItem[] => {
  const invoices = getInvoices();
  return invoices.filter(i => i.businessId === businessId);
};

export const addInvoice = (invoice: Omit<InvoiceItem, 'id' | 'date' | 'status'>): InvoiceItem => {
  const invoices = getInvoices();
  const newInvoice: InvoiceItem = {
    ...invoice,
    id: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split('T')[0],
    status: 'paid',
  };
  
  invoices.unshift(newInvoice);
  localStorage.setItem(KEYS.INVOICES, JSON.stringify(invoices));
  return newInvoice;
};

// Add review to a business
export const addBusinessReview = (businessId: string, review: Omit<ReviewItem, 'id' | 'date'>): ReviewItem => {
  const business = getBusinessById(businessId);
  if (!business) throw new Error('Business not found');
  
  const newReview: ReviewItem = {
    ...review,
    id: `rev-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
  };
  
  business.reviews.unshift(newReview);
  
  // Recalculate average rating
  const totalRating = business.reviews.reduce((sum, r) => sum + r.rating, 0);
  business.rating = parseFloat((totalRating / business.reviews.length).toFixed(1));
  
  saveBusiness(business);
  return newReview;
};

// Add offer/coupon to a business
export const addBusinessOffer = (businessId: string, offer: Omit<OfferItem, 'id' | 'active'>): OfferItem => {
  const business = getBusinessById(businessId);
  if (!business) throw new Error('Business not found');
  
  const newOffer: OfferItem = {
    ...offer,
    id: `off-${Date.now()}`,
    active: true,
  };
  
  business.offers.unshift(newOffer);
  saveBusiness(business);
  return newOffer;
};

// Toggle offer status
export const toggleOfferStatus = (businessId: string, offerId: string): void => {
  const business = getBusinessById(businessId);
  if (!business) return;
  
  const offer = business.offers.find(o => o.id === offerId);
  if (offer) {
    offer.active = !offer.active;
    saveBusiness(business);
  }
};

// Get Visitor Analytics for a business
export const getVisitorAnalytics = (businessId: string): VisitorMetric[] => {
  // Generate stable mock visitors based on business name
  const metrics: VisitorMetric[] = [];
  const days = 7;
  const hash = businessId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateString = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
    
    // Pseudo-random view count based on date index and business hash
    const baseViews = 20 + (hash % 50);
    const dailyFluctuation = Math.sin(i + (hash % 10)) * 15;
    const views = Math.max(5, Math.round(baseViews + dailyFluctuation));
    
    metrics.push({ date: dateString, views });
  }
  return metrics;
};

// Calculate global admin metrics
export const getGlobalAnalytics = (): GlobalAnalytics => {
  const businesses = getBusinesses();
  const leads = getLeads();
  
  const activeSubs = businesses.filter(b => b.status === 'active');
  const totalSubscribers = activeSubs.length;
  
  // Calculate MRR
  let mrr = 0;
  activeSubs.forEach(b => {
    let multiplier = 1;
    if (b.billingCycle === '3-Months') multiplier = 1 / 3;
    if (b.billingCycle === '6-Months') multiplier = 1 / 6;
    
    let rate = 0;
    if (b.plan === 'Catalogue') {
      // Pricing: 99/mo, 299/3mo, 399/6mo
      if (b.billingCycle === 'Monthly') rate = 99;
      else if (b.billingCycle === '3-Months') rate = 299 * multiplier;
      else if (b.billingCycle === '6-Months') rate = 399 * multiplier;
    } else if (b.plan === 'Starter') {
      rate = 699;
    } else if (b.plan === 'Business') {
      rate = 899;
    } else if (b.plan === 'Premium') {
      rate = 999;
    }
    mrr += Math.round(rate);
  });
  
  const catalogueCount = activeSubs.filter(b => b.plan === 'Catalogue').length;
  const websiteCount = activeSubs.filter(b => b.plan !== 'Catalogue').length;
  
  // Mock constant metrics that make the dashboard feel complete
  const renewalRate = 94.5;
  const conversions = Math.round((leads.length / (totalSubscribers * 12 + 1)) * 100);
  const arpu = totalSubscribers > 0 ? Math.round(mrr / totalSubscribers) : 0;
  
  return {
    totalSubscribers,
    mrr,
    catalogueCount,
    websiteCount,
    renewalRate,
    conversions: Math.min(100, Math.max(1, conversions)),
    arpu,
  };
};
