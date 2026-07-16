import { useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, Award, Rocket, ShieldCheck, HeartHandshake, Zap, Star } from 'lucide-react';
import { getBusinesses } from '../utils/stateManager';
import './Home.css';

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const featuredBusinesses = getBusinesses().slice(0, 3); // Get first 3 featured partners

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How does the subscription work? Are there any hidden fees?",
      a: "It is simple! You choose a plan (from ₹99/mo for Catalogues, up to ₹999/mo for Premium Custom Websites) and pay monthly. There are zero setup charges, zero hidden maintenance fees, and hosting is completely free. Cancel anytime."
    },
    {
      q: "Do I get a custom domain name with my website?",
      a: "Yes! Starter, Business, and Premium website plans include domain setup guidance, SSL certificates, and search engine optimization. Catalogue plans run on a professional Syntro Tech subdomain (e.g., yourname.syntro.tech)."
    },
    {
      q: "How long does it take to get my website live?",
      a: "Our onboarding is automated. Once you register, select your plan, and input your services/pricing in your dashboard, your digital catalogue goes live instantly. For custom website plans, our team reviews details and deploys within 48-72 hours."
    },
    {
      q: "Can I change my services, hours, or upload new photos later?",
      a: "Absolutely! You receive an automated Business Dashboard login. You can log in at any time to edit your contact info, change operating hours, add daily specials, edit service menus, upload gallery photos, and check leads instantly."
    },
    {
      q: "What systems are available for my specific business type?",
      a: "We customize features! Cafes/Restaurants get QR digital menus and table booking engines; Salons/Parlours get appointment calendars and stylist schedules; Gyms get membership counters and attendance sheets; and Retailers get digital shop-catalogues."
    }
  ];

  const categories = [
    { name: 'Cafés & Diners', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=200&h=200&fit=crop&q=80', code: 'Cafe', desc: 'QR menus & orders' },
    { name: 'Salons & Spas', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&h=200&fit=crop&q=80', code: 'Salon', desc: 'Stylist bookings' },
    { name: 'Gyms & Studios', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=200&h=200&fit=crop&q=80', code: 'Gym', desc: 'Membership tracker' },
    { name: 'Bakeries & Sweets', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop&q=80', code: 'Bakery', desc: 'Theme cake ordering' },
    { name: 'Aesthetic Parlours', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop&q=80', code: 'Parlour', desc: 'Beauty packages' },
    { name: 'Restaurants', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop&q=80', code: 'Restaurant', desc: 'Daily special menus' },
    { name: 'Clinics & Care', image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=200&h=200&fit=crop&q=80', code: 'Clinic', desc: 'Patient booking slots' },
    { name: 'Other Services', image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=200&h=200&fit=crop&q=80', code: 'Others', desc: 'Service cataloguing' }
  ];

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <header className="hero">
        <div className="container hero-container grid-2">
          <div className="hero-content">
            <div className="badge badge-primary pulse-glow-subtle">✨ Digitizing Local Businesses</div>
            <h1 className="hero-title">
              Get Your Business Online for Just <span className="text-primary-gradient">₹99/Month</span>
            </h1>
            <p className="hero-subtitle">
              Stop paying ₹20,000–₹80,000 upfront. Get a beautiful digital catalogue, booking systems, marketing tools, and a professional website in one affordable monthly subscription.
            </p>
            <div className="hero-actions">
              <a href="#/register" className="btn btn-primary btn-lg">
                <span>Start Free Onboarding</span>
                <ArrowRight size={18} />
              </a>
              <a href="#/pricing" className="btn btn-secondary btn-lg">
                <span>Compare Plans</span>
              </a>
            </div>
            
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-num">500+</span>
                <span className="stat-lbl">Businesses Digitized</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-num">98%</span>
                <span className="stat-lbl">Renewal Rate</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-num">₹10L+</span>
                <span className="stat-lbl">Leads Generated</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="mockup-frame">
              <div className="mockup-header">
                <div className="mockup-dots"><span className="dot"></span><span className="dot"></span><span className="dot"></span></div>
                <div className="mockup-search">yourbusiness.syntro.tech</div>
              </div>
              <div className="mockup-body">
                <div className="mockup-hero">
                  <div className="mockup-name">Glow & Style Salon</div>
                  <div className="mockup-desc">Premium Hair Care & Aesthetic Beauty</div>
                  <div className="mockup-rating">⭐⭐⭐⭐⭐ (4.7)</div>
                </div>
                <div className="mockup-content">
                  <div className="mockup-widget">
                    <div className="widget-header">💇 Special Hair Styling</div>
                    <div className="widget-price">₹450</div>
                    <button className="widget-btn" onClick={() => window.location.hash = '#/catalogue/glow-style-salon'}>Book Slot</button>
                  </div>
                  <div className="mockup-widget">
                    <div className="widget-header">✨ HydraFacial Glow</div>
                    <div className="widget-price">₹1,999</div>
                    <button className="widget-btn" onClick={() => window.location.hash = '#/catalogue/glow-style-salon'}>Book Slot</button>
                  </div>
                </div>
                <div className="mockup-footer">
                  <span>🟢 Call Us</span>
                  <span>💬 WhatsApp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Categories Grid */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Digitizing All Local Segments</h2>
            <p className="section-desc">Tailored digital systems and layout assets designed to match your specific industry operations</p>
          </div>
          <div className="grid-4 category-grid">
            {categories.map((cat, idx) => (
              <a 
                href={`#/partners?category=${cat.code}`} 
                key={idx} 
                className="card card-hover category-card text-center"
              >
                <div className="category-img-wrapper">
                  <img src={cat.image} alt={cat.name} className="category-image" />
                </div>
                <h3 className="category-name">{cat.name}</h3>
                <p className="category-desc text-muted">{cat.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Why Businesses Partner with Us</h2>
            <p className="section-desc">We represent more than a website builder—we are your dedicated full-service digital partner</p>
          </div>
          <div className="grid-3 feature-grid">
            <div className="card feature-card">
              <div className="feature-icon-wrapper blue-icon">
                <Rocket size={24} />
              </div>
              <h3>Zero High Capital Costs</h3>
              <p>No heavy upfront investment. Subscribe monthly for what you actually use and keep your cash flow healthy.</p>
            </div>
            
            <div className="card feature-card">
              <div className="feature-icon-wrapper green-icon">
                <Zap size={24} />
              </div>
              <h3>Instant Automation</h3>
              <p>Get listed in our directory and have your QR menus, calendar appointments, and client booking links active on day one.</p>
            </div>

            <div className="card feature-card">
              <div className="feature-icon-wrapper purple-icon">
                <Award size={24} />
              </div>
              <h3>SEO & Google Discovery</h3>
              <p>Clean HTML structure, optimized tags, and mobile responsive coding ensure you show up high on local Google searches.</p>
            </div>

            <div className="card feature-card">
              <div className="feature-icon-wrapper orange-icon">
                <ShieldCheck size={24} />
              </div>
              <h3>SSL & Secure Hosting</h3>
              <p>Every website and catalogue comes with secure HTTPS protocol and unlimited updates. We handle the IT so you handle customers.</p>
            </div>

            <div className="card feature-card">
              <div className="feature-icon-wrapper red-icon">
                <HeartHandshake size={24} />
              </div>
              <h3>WhatsApp Integration</h3>
              <p>Let customers contact you, ask questions, or order directly onto your WhatsApp number with clean auto-messages.</p>
            </div>

            <div className="card feature-card">
              <div className="feature-icon-wrapper sky-icon">
                <CheckCircle2 size={24} />
              </div>
              <h3>Owner Admin Dashboards</h3>
              <p>Change menus, update prices, view incoming visitor analytics, edit working hours, and download subscription invoices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Businesses Showcase */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Active Partner Directory</h2>
            <p className="section-desc">Check out some local businesses that successfully digitized their operations with our platform</p>
          </div>
          <div className="grid-3 showcase-grid">
            {featuredBusinesses.map((biz) => (
              <div key={biz.id} className="card card-hover showcase-card">
                <div className="showcase-banner" style={{ backgroundImage: `url(${biz.banner})` }}>
                  <span className="showcase-category badge badge-primary">{biz.category}</span>
                </div>
                <div className="showcase-content">
                  <div className="showcase-header">
                    <img src={biz.logo} alt={biz.name} className="showcase-logo" />
                    <div>
                      <h3 className="showcase-name">{biz.name}</h3>
                      <p className="showcase-location text-muted">{biz.city}</p>
                    </div>
                  </div>
                  <p className="showcase-desc">{biz.description.slice(0, 110)}...</p>
                  
                  <div className="showcase-meta">
                    <div className="showcase-rating">
                      <Star size={16} fill="#f59e0b" stroke="#f59e0b" />
                      <span>{biz.rating} ({biz.reviews.length} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="showcase-actions">
                    <a href={`#/catalogue/${biz.id}`} className="btn btn-primary btn-block">
                      <span>View Live Catalogue</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center view-all-partners">
            <a href="#/partners" className="btn btn-secondary">
              <span>Browse All Partner Businesses</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Success Stories</h2>
            <p className="section-desc">Hear what local business owners say about their digitizing journey with Syntro Tech</p>
          </div>
          <div className="grid-2 testimonial-grid">
            <div className="card testimonial-card">
              <p className="testimonial-text">
                "We were quoted ₹35,000 for a website which we couldn't afford during our café startup. For just ₹99/month, Syntro Tech gave us a gorgeous menu page. Customers scan the QR on our tables, book reservations, and order on WhatsApp. It revolutionized our service!"
              </p>
              <div className="testimonial-owner">
                <div className="owner-avatar EH-avatar">EH</div>
                <div>
                  <h4 className="owner-name">Rohan & Sameer</h4>
                  <p className="owner-biz text-muted">Founders, Espresso House & Café</p>
                </div>
              </div>
            </div>
            
            <div className="card testimonial-card">
              <p className="testimonial-text">
                "Our salon appointments were a mess of calls, notes, and lost details. Since subscribing to the Business Plan, clients book their slots directly online. We can see appointments, manage hair stylist rosters, and our Google visibility increased. Best business decision ever."
              </p>
              <div className="testimonial-owner">
                <div className="owner-avatar GS-avatar">GS</div>
                <div>
                  <h4 className="owner-name">Rajesh Sen</h4>
                  <p className="owner-biz text-muted">Owner, Glow & Style Salon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="section bg-light">
        <div className="container max-width-md">
          <div className="section-header text-center">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-desc">Got questions about plans, setups, or customization? We have answers.</p>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className={`faq-item card ${activeFaq === index ? 'active' : ''}`} onClick={() => toggleFaq(index)}>
                <div className="faq-question">
                  <h3>{faq.q}</h3>
                  <ChevronDown className="faq-chevron" size={20} />
                </div>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Block */}
      <section className="section cta-section">
        <div className="container text-center cta-container card glass-dark">
          <h2 className="cta-title">Take Your Local Business to the Next Level</h2>
          <p className="cta-desc">
            Instantly set up booking calendars, upload catalogs, display pricing, and collect leads. Select the ideal plan for your brand size today.
          </p>
          <div className="cta-buttons">
            <a href="#/register" className="btn btn-primary btn-lg">Get Onboarded Now</a>
            <a href="#/pricing" className="btn btn-secondary btn-lg btn-white">View Pricing Chart</a>
          </div>
        </div>
      </section>
    </div>
  );
}
