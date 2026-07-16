import React, { useState, useEffect } from 'react';
import { Dumbbell, Coffee, Scissors, Cake, Sparkles, Smile, ArrowRight, CheckCircle } from 'lucide-react';
import './Solutions.css';

type SolutionType = 'gym' | 'cafe' | 'salon' | 'bakery' | 'parlour' | 'clinic';

export default function Solutions() {
  const [activeTab, setActiveTab] = useState<SolutionType>('cafe');

  // Read URL query parameter if available to direct-select a tab (e.g. from footer links)
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash;
      if (hash.includes('?')) {
        const query = hash.split('?')[1];
        const params = new URLSearchParams(query);
        const type = params.get('type') as SolutionType;
        if (type && ['gym', 'cafe', 'salon', 'bakery', 'parlour', 'clinic'].includes(type)) {
          setActiveTab(type);
        }
      }
    };

    handleLocationChange();
    window.addEventListener('hashchange', handleLocationChange);
    return () => window.removeEventListener('hashchange', handleLocationChange);
  }, []);

  const solutions = {
    gym: {
      title: "Gyms & Fitness Studios",
      tagline: "Build a thriving fitness community with subscription tracking & workout logs",
      icon: <Dumbbell size={28} />,
      colorClass: "gym-theme",
      features: [
        { name: "Membership Registration", desc: "Let new members sign up, pay, and register their details online." },
        { name: "Subscription Tracking", desc: "Send automated reminders for package renewals and active plans." },
        { name: "Trainer Directories", desc: "List personal coaches, specialty certifications, and active slots." },
        { name: "Diet & Workout Builders", desc: "Share template charts for weight loss, strength gains, and nutrition." },
        { name: "Attendance Sheets", desc: "Keep count of daily footfalls and check-in times." }
      ],
      mockupQuote: "Since moving our gym listing to Syntro Tech, we onboarded 40 new members directly from our website booking forms.",
      quoteAuthor: "- Iron Temple Fitness"
    },
    cafe: {
      title: "Cafés & Eateries",
      tagline: "Keep your tables busy with QR digital menus & instant WhatsApp orders",
      icon: <Coffee size={28} />,
      colorClass: "cafe-theme",
      features: [
        { name: "Dynamic QR Menu", desc: "Generate a custom code that customers scan to view your real-time menu." },
        { name: "Weekly & Monthly Specials", desc: "Instantly update daily deals, seasonal cakes, or coffee of the day." },
        { name: "Table Booking System", desc: "Let diners reserve slots for lunch, dinner, or special workspace hours." },
        { name: "WhatsApp Direct Ordering", desc: "Orders arrive directly in your WhatsApp chat with address and quantity details." },
        { name: "Loyalty & Offer Banners", desc: "Embed coupon codes like 'BREW20' to reward returning guests." }
      ],
      mockupQuote: "We replaced printing paper menus entirely. Now we update specials in 10 seconds from our Business Dashboard.",
      quoteAuthor: "- Espresso House"
    },
    salon: {
      title: "Salons & Spas",
      tagline: "Organize appointments, staff rosters, and grooming rate lists in one dashboard",
      icon: <Scissors size={28} />,
      colorClass: "salon-theme",
      features: [
        { name: "Appointment Slot Booking", desc: "Allow clients to book their preferred date, time, and service." },
        { name: "Stylist & Staff Rosters", desc: "Assign customers to specific staff members based on calendar availability." },
        { name: "Digital Price List", desc: "Categorize haircuts, balayage coloring, shaving, and spa massages." },
        { name: "Client History Track", desc: "Keep notes on styling choices, skin types, and previous visits." },
        { name: "Package Discounts", desc: "Bundle services (e.g. Haircut + Spa + Facial) for premium bookings." }
      ],
      mockupQuote: "Double bookings have gone to zero! Our clients love booking hair treatments online without calling.",
      quoteAuthor: "- Glow & Style Salon"
    },
    bakery: {
      title: "Bakeries & Patisseries",
      tagline: "Showcase artisanal breads, custom cake designs, and accept online orders",
      icon: <Cake size={28} />,
      colorClass: "bakery-theme",
      features: [
        { name: "Product Catalogues", desc: "Display beautiful close-ups of pastries, tarts, sourdough, and cupcakes." },
        { name: "Custom Cake Orders", desc: "A tailored inquiry wizard for wedding tiers, custom themes, and birthday designs." },
        { name: "Delivery Configuration", desc: "Select local delivery boundaries and schedule pickup times." },
        { name: "Online Payment Enquiries", desc: "Accept UPI details, QR codes, and generate automated invoices." },
        { name: "Seasonal Gift Pack Banners", desc: "Launch special boxes for Diwali, Christmas, or corporate events." }
      ],
      mockupQuote: "Our custom theme-cake inquiries doubled. The dashboard helps us keep track of deliveries easily.",
      quoteAuthor: "- Sweet Treats Patisserie"
    },
    parlour: {
      title: "Beauty Parlours",
      tagline: "Market bridal cosmetics, skin treatments, and customized wellness packs",
      icon: <Sparkles size={28} />,
      colorClass: "parlour-theme",
      features: [
        { name: "Bridal Booking Wizard", desc: "Tailored multi-stage forms for events, makeup choices, and group settings." },
        { name: "Package Promos", desc: "Create beauty combos with visible before/after pricing charts." },
        { name: "Customer CRM", desc: "Store contact details, preferred skin serums, and anniversary milestones." },
        { name: "WhatsApp Notifications", desc: "Send direct SMS confirmation and slot details directly to customer phones." },
        { name: "Specialist Portfolios", desc: "Showcase photo grids of bridal work and hair transformations." }
      ],
      mockupQuote: "Having our portfolio, pricing, and reviews in one link makes sharing our work so professional.",
      quoteAuthor: "- Blush & Blooms Parlour"
    },
    clinic: {
      title: "Healthcare Clinics",
      tagline: "Simplify doctor appointments, consultation slots, and local visibility",
      icon: <Smile size={28} />,
      colorClass: "clinic-theme",
      features: [
        { name: "Doctor Slot Calendars", desc: "Patients select consultation times, check doctor availability, and book slots." },
        { name: "Specialist Cataloguing", desc: "List medical expertise, dental services, pediatric care, and orthopedic details." },
        { name: "FAQ & Prep Guidelines", desc: "List instructions for teeth cleaning, medical checkups, or surgery prep." },
        { name: "Google Map Access", desc: "Direct patients to your clinic coordinates with one click." },
        { name: "Contact Inquiry Forms", desc: "Patients can send files, ask questions, or request callback details." }
      ],
      mockupQuote: "Our dental clinic stands out on Google searches. Patients book appointments directly from the catalogue link.",
      quoteAuthor: "- Aura Dental Clinic"
    }
  };

  const tabs: { id: SolutionType; label: string; icon: React.ReactNode }[] = [
    { id: 'cafe', label: 'Cafés & Diners', icon: <Coffee size={18} /> },
    { id: 'salon', label: 'Salons & Spas', icon: <Scissors size={18} /> },
    { id: 'gym', label: 'Gyms & Fitness', icon: <Dumbbell size={18} /> },
    { id: 'bakery', label: 'Bakeries', icon: <Cake size={18} /> },
    { id: 'parlour', label: 'Beauty Parlours', icon: <Sparkles size={18} /> },
    { id: 'clinic', label: 'Medical Clinics', icon: <Smile size={18} /> }
  ];

  const current = solutions[activeTab];

  return (
    <div className="solutions-page animate-fade-in">
      <header className="page-header text-center">
        <div className="container">
          <span className="badge badge-primary">Tailored Configurations</span>
          <h1 className="page-title">Industry-Specific Business Systems</h1>
          <p className="page-subtitle">We build custom tools, layouts, and data managers designed around your specific service workflows.</p>
        </div>
      </header>

      <section className="section tab-section">
        <div className="container">
          {/* Tabs Navigation */}
          <div className="tabs-nav card glass">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Active Tab Panel */}
          <div className={`tab-panel card grid-2 ${current.colorClass}`}>
            <div className="panel-info">
              <div className="panel-badge-icon">
                {current.icon}
              </div>
              <h2 className="panel-title">{current.title}</h2>
              <p className="panel-tagline">{current.tagline}</p>
              
              <ul className="panel-features-list">
                {current.features.map((feat, index) => (
                  <li key={index} className="feature-item">
                    <CheckCircle className="check-icon" size={20} />
                    <div>
                      <h4>{feat.name}</h4>
                      <p className="text-muted">{feat.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="panel-action">
                <a href={`#/register?type=${activeTab}`} className="btn btn-primary">
                  <span>Launch Your {activeTab.toUpperCase()} System</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>

            <div className="panel-graphic">
              <div className="graphic-card card">
                <div className="graphic-header">
                  <div className="circle-dot"></div>
                  <div className="circle-dot"></div>
                  <div className="circle-dot"></div>
                  <span className="graphic-url">active-system.syntro.tech</span>
                </div>
                <div className="graphic-body text-center">
                  <div className="graphic-icon-wrap">
                    {current.icon}
                  </div>
                  <h3>Digital {current.title} System</h3>
                  <div className="graphic-status-badge">
                    <span className="dot-blink"></span>
                    <span>System Online & Calibrated</span>
                  </div>
                  <div className="graphic-stats-row">
                    <div className="g-stat">
                      <span className="g-stat-val">100%</span>
                      <span className="g-stat-lbl">Mobile Responsive</span>
                    </div>
                    <div className="g-stat">
                      <span className="g-stat-val">SSL</span>
                      <span className="g-stat-lbl">Secure Socket Layer</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="graphic-testimonial card glass">
                <p className="quote">"{current.mockupQuote}"</p>
                <p className="author">{current.quoteAuthor}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Standard Core Section */}
      <section className="section bg-light core-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Included In Every Subscribed System</h2>
            <p className="section-desc">Regardless of the plan you choose, your system always includes premium infrastructure support</p>
          </div>
          
          <div className="grid-3 core-grid">
            <div className="card core-card">
              <h4>🌐 Free Subdomain & SSL</h4>
              <p>Get a clean, secure HTTPS web address (e.g. mybiz.syntro.tech). Fully configured with free SSL certificates.</p>
            </div>
            <div className="card core-card">
              <h4>📱 100% Mobile Responsive</h4>
              <p>Designed to scale flawlessly on mobile screens, tablets, and desktop displays. Touch-friendly components.</p>
            </div>
            <div className="card core-card">
              <h4>💬 WhatsApp Integration</h4>
              <p>Allow users to tap buttons and text your business directly, sending pre-filled templates of their requests.</p>
            </div>
            <div className="card core-card">
              <h4>📍 Google Maps Coordinates</h4>
              <p>Pins your precise location in the contact cards, opening Google Maps navigation for patients or diners immediately.</p>
            </div>
            <div className="card core-card">
              <h4>⚙️ Cloud Hosting Included</h4>
              <p>No hosting setup or server payments. Your catalogue and dashboard are backed up on high-speed servers.</p>
            </div>
            <div className="card core-card">
              <h4>🔧 Unlimited Support & Updates</h4>
              <p>Change your items, upload files, get security patches, and receive expert guide support on demand.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
