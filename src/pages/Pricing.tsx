import { useState } from 'react';
import { Check, X } from 'lucide-react';
import './Pricing.css';

type BillingCycle = 'monthly' | '3months' | '6months';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

  // Calculates prices based on cycle
  const getCataloguePrice = () => {
    if (billingCycle === 'monthly') return { price: 99, label: '/month' };
    if (billingCycle === '3months') return { price: 299, label: '/3 months' };
    return { price: 399, label: '/6 months' };
  };

  const getWebsitePrice = (base: number) => {
    // 699, 899, 999 are monthly costs. If longer cycles, we offer slight mock discount or standard mapping
    const multiplier = billingCycle === 'monthly' ? 1 : billingCycle === '3months' ? 3 : 6;
    let discount = 1;
    if (billingCycle === '3months') discount = 0.95; // 5% off
    if (billingCycle === '6months') discount = 0.90; // 10% off
    
    return {
      price: Math.round(base * multiplier * discount),
      label: billingCycle === 'monthly' ? '/month' : billingCycle === '3months' ? '/3 months' : '/6 months'
    };
  };

  const cataloguePrice = getCataloguePrice();
  const starterPrice = getWebsitePrice(699);
  const businessPrice = getWebsitePrice(899);
  const premiumPrice = getWebsitePrice(999);

  const addOns = [
    { title: "Logo Design & Identity", price: "₹2,500", type: "One-time", desc: "Professional high-res vector logo, color sheets, and brand assets." },
    { title: "Meta Ads Management", price: "₹4,999/mo", type: "Subscription", desc: "Facebook & Instagram campaign design, local targeting, and lead tracking." },
    { title: "Google Maps & Local SEO", price: "₹1,999", type: "One-time", desc: "Optimizing Google Business profile, citation building, and review hooks." },
    { title: "Social Media Packages", price: "₹5,999/mo", type: "Subscription", desc: "12 custom graphic posts, 4 short reels/videos, and comment management." },
    { title: "AI Chatbot Assistant", price: "₹499/mo", type: "Subscription", desc: "Automated customer chat responder for bookings, hours, and menus." },
    { title: "WhatsApp Automation", price: "₹999/mo", type: "Subscription", desc: "Broadcast offers, automated scheduling alerts, and review collection." }
  ];

  return (
    <div className="pricing-page animate-fade-in">
      <header className="page-header text-center">
        <div className="container">
          <span className="badge badge-primary">Flexible Plans</span>
          <h1 className="page-title">Compare Subscription Models</h1>
          <p className="page-subtitle">Choose the perfect plan to take your offline business digital. Upgrade or cancel at any time.</p>
          
          {/* Billing Cycle Switch */}
          <div className="billing-switch-wrapper">
            <div className="billing-switch">
              <button 
                className={`switch-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
                onClick={() => setBillingCycle('monthly')}
              >
                Monthly
              </button>
              <button 
                className={`switch-btn ${billingCycle === '3months' ? 'active' : ''}`}
                onClick={() => setBillingCycle('3months')}
              >
                3 Months <span className="switch-discount">5% Off</span>
              </button>
              <button 
                className={`switch-btn ${billingCycle === '6months' ? 'active' : ''}`}
                onClick={() => setBillingCycle('6months')}
              >
                6 Months <span className="switch-discount">10% Off</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Pricing Grid */}
      <section className="section plan-section">
        <div className="container">
          <div className="grid-4 plans-grid">
            
            {/* Catalogue Plan */}
            <div className="card plan-card">
              <span className="plan-badge">Basic Listing</span>
              <h3 className="plan-name">Digital Catalogue</h3>
              <p className="plan-desc">A beautiful landing page showcasing your business logo, services, prices, and map coordinates.</p>
              
              <div className="plan-price-block">
                <span className="price-symbol">₹</span>
                <span className="price-val">{cataloguePrice.price}</span>
                <span className="price-lbl">{cataloguePrice.label}</span>
              </div>
              
              <ul className="plan-features">
                <li><Check size={16} className="text-success" /> <span>Business Name & Info</span></li>
                <li><Check size={16} className="text-success" /> <span>Logo & Header Cover</span></li>
                <li><Check size={16} className="text-success" /> <span>Services & Price List</span></li>
                <li><Check size={16} className="text-success" /> <span>Hours & Map Coordinates</span></li>
                <li><Check size={16} className="text-success" /> <span>WhatsApp & Call Buttons</span></li>
                <li><Check size={16} className="text-success" /> <span>Basic Reviews & Gallery</span></li>
                <li className="disabled"><X size={16} className="text-danger" /> <span>Custom Domain (.com/.in)</span></li>
                <li className="disabled"><X size={16} className="text-danger" /> <span>Appointment Calendar Engine</span></li>
                <li className="disabled"><X size={16} className="text-danger" /> <span>Admin dashboard login</span></li>
              </ul>
              
              <a href={`#/register?plan=Catalogue&cycle=${billingCycle}`} className="btn btn-secondary btn-block plan-btn">
                Subscribe Now
              </a>
            </div>

            {/* Starter Website */}
            <div className="card plan-card">
              <span className="plan-badge">Independent Brand</span>
              <h3 className="plan-name">Starter Website</h3>
              <p className="plan-desc">A full responsive multi-page website containing forms, WhatsApp tags, and basic templates.</p>
              
              <div className="plan-price-block">
                <span className="price-symbol">₹</span>
                <span className="price-val">{starterPrice.price}</span>
                <span className="price-lbl">{starterPrice.label}</span>
              </div>
              
              <ul className="plan-features">
                <li><Check size={16} className="text-success" /> <span>5 Custom Pages website</span></li>
                <li><Check size={16} className="text-success" /> <span>Mobile Responsive Build</span></li>
                <li><Check size={16} className="text-success" /> <span>Contact Inquiry Form</span></li>
                <li><Check size={16} className="text-success" /> <span>WhatsApp Chat Integrations</span></li>
                <li><Check size={16} className="text-success" /> <span>Hosting & SSL Included</span></li>
                <li><Check size={16} className="text-success" /> <span>SEO-friendly tags</span></li>
                <li><Check size={16} className="text-success" /> <span>Domain Setup Assistance</span></li>
                <li className="disabled"><X size={16} className="text-danger" /> <span>Booking Engine Calendar</span></li>
                <li className="disabled"><X size={16} className="text-danger" /> <span>Advanced Owner Dashboard</span></li>
              </ul>
              
              <a href={`#/register?plan=Starter&cycle=${billingCycle}`} className="btn btn-secondary btn-block plan-btn">
                Subscribe Now
              </a>
            </div>

            {/* Business Website - Recommend */}
            <div className="card plan-card featured-plan">
              <div className="featured-badge">MOST POPULAR</div>
              <span className="plan-badge">Automated Growth</span>
              <h3 className="plan-name">Business Website</h3>
              <p className="plan-desc">Perfect for salons, spas, gyms, and clinics requiring calendar slots and staff rosters.</p>
              
              <div className="plan-price-block">
                <span className="price-symbol">₹</span>
                <span className="price-val">{businessPrice.price}</span>
                <span className="price-lbl">{businessPrice.label}</span>
              </div>
              
              <ul className="plan-features">
                <li><Check size={16} className="text-success" /> <span>Everything in Starter Plan</span></li>
                <li><Check size={16} className="text-success" /> <span>Appointment Booking Calendar</span></li>
                <li><Check size={16} className="text-success" /> <span>Stylist / Trainer Rosters</span></li>
                <li><Check size={16} className="text-success" /> <span>Active Offers & Coupons</span></li>
                <li><Check size={16} className="text-success" /> <span>Full Owner Dashboard Portal</span></li>
                <li><Check size={16} className="text-success" /> <span>Lead Tracking Database</span></li>
                <li><Check size={16} className="text-success" /> <span>Customer Review Manager</span></li>
                <li><Check size={16} className="text-success" /> <span>Monthly SEO Reports</span></li>
                <li className="disabled"><X size={16} className="text-danger" /> <span>Customer Login Area</span></li>
              </ul>
              
              <a href={`#/register?plan=Business&cycle=${billingCycle}`} className="btn btn-primary btn-block plan-btn">
                Subscribe Now
              </a>
            </div>

            {/* Premium Website */}
            <div className="card plan-card">
              <span className="plan-badge">Complete Enterprise</span>
              <h3 className="plan-name">Premium Website</h3>
              <p className="plan-desc">For cafes, bakeries, or larger brands needing customer logins, orders, and custom reports.</p>
              
              <div className="plan-price-block">
                <span className="price-symbol">₹</span>
                <span className="price-val">{premiumPrice.price}</span>
                <span className="price-lbl">{premiumPrice.label}</span>
              </div>
              
              <ul className="plan-features">
                <li><Check size={16} className="text-success" /> <span>Everything in Business Plan</span></li>
                <li><Check size={16} className="text-success" /> <span>Online Ordering & QR Menus</span></li>
                <li><Check size={16} className="text-success" /> <span>Secure Customer Login Area</span></li>
                <li><Check size={16} className="text-success" /> <span>CRM Database & Marketing</span></li>
                <li><Check size={16} className="text-success" /> <span>Custom Coupons & Promos</span></li>
                <li><Check size={16} className="text-success" /> <span>Staff Attendance Records</span></li>
                <li><Check size={16} className="text-success" /> <span>Priority Tech Support</span></li>
                <li><Check size={16} className="text-success" /> <span>Analytics Panel Updates</span></li>
                <li><Check size={16} className="text-success" /> <span>Invoice Automation</span></li>
              </ul>
              
              <a href={`#/register?plan=Premium&cycle=${billingCycle}`} className="btn btn-secondary btn-block plan-btn">
                Subscribe Now
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Compare Table */}
      <section className="section bg-light compare-section">
        <div className="container max-width-md">
          <div className="section-header text-center">
            <h2>Detailed Plan Comparison</h2>
            <p className="section-desc">Pick the ideal plan for your current business scale and grow smoothly</p>
          </div>
          
          <div className="card compare-table-card">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Features</th>
                  <th>Catalogue</th>
                  <th>Starter</th>
                  <th>Business</th>
                  <th>Premium</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Monthly Price (Base)</td>
                  <td>₹99</td>
                  <td>₹699</td>
                  <td>₹899</td>
                  <td>₹999</td>
                </tr>
                <tr>
                  <td>Pages</td>
                  <td>1 Landing Page</td>
                  <td>5 Pages</td>
                  <td>Up to 10 Pages</td>
                  <td>Unlimited</td>
                </tr>
                <tr>
                  <td>Mobile Responsive</td>
                  <td><Check size={18} className="text-success" /></td>
                  <td><Check size={18} className="text-success" /></td>
                  <td><Check size={18} className="text-success" /></td>
                  <td><Check size={18} className="text-success" /></td>
                </tr>
                <tr>
                  <td>WhatsApp Booking/Chat</td>
                  <td><Check size={18} className="text-success" /></td>
                  <td><Check size={18} className="text-success" /></td>
                  <td><Check size={18} className="text-success" /></td>
                  <td><Check size={18} className="text-success" /></td>
                </tr>
                <tr>
                  <td>Gallery & Reviews</td>
                  <td>Basic</td>
                  <td>Standard</td>
                  <td>Interactive</td>
                  <td>Interactive</td>
                </tr>
                <tr>
                  <td>Domain & SSL</td>
                  <td>Subdomain</td>
                  <td>Custom Domain*</td>
                  <td>Custom Domain*</td>
                  <td>Custom Domain*</td>
                </tr>
                <tr>
                  <td>Admin Panel Access</td>
                  <td><X size={18} className="text-danger" /></td>
                  <td><X size={18} className="text-danger" /></td>
                  <td><Check size={18} className="text-success" /></td>
                  <td><Check size={18} className="text-success" /></td>
                </tr>
                <tr>
                  <td>Appointment Calendar</td>
                  <td><X size={18} className="text-danger" /></td>
                  <td><X size={18} className="text-danger" /></td>
                  <td><Check size={18} className="text-success" /></td>
                  <td><Check size={18} className="text-success" /></td>
                </tr>
                <tr>
                  <td>QR Menus & Ordering</td>
                  <td><X size={18} className="text-danger" /></td>
                  <td><X size={18} className="text-danger" /></td>
                  <td><X size={18} className="text-danger" /></td>
                  <td><Check size={18} className="text-success" /></td>
                </tr>
                <tr>
                  <td>Priority Tech Support</td>
                  <td>Email</td>
                  <td>Standard</td>
                  <td>24/7 Chat</td>
                  <td>Dedicated Manager</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Add-on Services Section */}
      <section className="section addons-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Power Up with Add-on Services</h2>
            <p className="section-desc">Accelerate your brand growth with professional design, marketing setups, and AI automations</p>
          </div>
          <div className="grid-3 addons-grid">
            {addOns.map((add, index) => (
              <div key={index} className="card addon-card card-hover">
                <span className="addon-type badge badge-primary">{add.type}</span>
                <h3 className="addon-title">{add.title}</h3>
                <div className="addon-price">{add.price}</div>
                <p className="addon-desc text-muted">{add.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
