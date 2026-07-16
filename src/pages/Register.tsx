import React, { useState, useEffect } from 'react';
import { Check, ArrowLeft, ArrowRight, UploadCloud, Rocket, Copy, CheckCircle2 } from 'lucide-react';
import { getBusinesses, saveBusiness, addInvoice } from '../utils/stateManager';
import type { Business, BusinessCategory, SubscriptionPlan, BillingCycle } from '../types';
import './Register.css';

export default function Register() {
  const [step, setStep] = useState(1);
  const [loadingMsg, setLoadingMsg] = useState('');
  
  // Registration State
  const [category, setCategory] = useState<BusinessCategory>('Cafe');
  const [plan, setPlan] = useState<SubscriptionPlan>('Catalogue');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('Monthly');
  
  const [bizInfo, setBizInfo] = useState({
    name: '',
    city: '',
    contact: '',
    email: '',
    whatsapp: '',
    address: '',
    description: '',
  });

  const [servicesInput, setServicesInput] = useState([
    { name: 'Standard Service 1', price: 299, description: 'Basic onboarding service description' },
    { name: 'Premium Service 2', price: 899, description: 'Premium tier package service details' }
  ]);

  const [newBizId, setNewBizId] = useState('');

  // Handle URL redirects (e.g. from solutions click or pricing select)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('?')) {
      const query = hash.split('?')[1];
      const params = new URLSearchParams(query);
      
      const type = params.get('type') as BusinessCategory;
      if (type) setCategory(type);
      
      const p = params.get('plan') as SubscriptionPlan;
      if (p) {
        setPlan(p);
        setStep(2); // Jump past category selection
      }
      
      const cycle = params.get('cycle') as string;
      if (cycle === '3months') setBillingCycle('3-Months');
      if (cycle === '6months') setBillingCycle('6-Months');
    }
  }, []);

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBizInfo({
      ...bizInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleServiceChange = (index: number, field: string, val: string | number) => {
    const updated = [...servicesInput];
    updated[index] = {
      ...updated[index],
      [field]: val
    };
    setServicesInput(updated);
  };

  const addServiceField = () => {
    setServicesInput([...servicesInput, { name: '', price: 0, description: '' }]);
  };

  const removeServiceField = (index: number) => {
    if (servicesInput.length === 1) return;
    setServicesInput(servicesInput.filter((_, i) => i !== index));
  };

  // Automated Mock Verification & Deployment Loading Screen
  const runOnboardingVerification = () => {
    setStep(5);
    const messages = [
      "Securing dedicated hosting container...",
      "Generating SSL certificate keypairs...",
      "Setting up database tables and indexes...",
      "Initializing localized SEO keywords...",
      "Creating business listing in Syntro Partners...",
      "Configuring WhatsApp direct routing templates...",
      "Deploying digital assets successfully!"
    ];

    let currentMsgIdx = 0;
    setLoadingMsg(messages[0]);

    const interval = setInterval(() => {
      currentMsgIdx++;
      if (currentMsgIdx < messages.length) {
        setLoadingMsg(messages[currentMsgIdx]);
      } else {
        clearInterval(interval);
        finalizeBusinessRegistration();
      }
    }, 900);
  };

  // Save business to localStorage and generate invoice
  const finalizeBusinessRegistration = () => {
    const bizId = bizInfo.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    // Safety check if business already exists
    const finalId = getBusinesses().some(b => b.id === bizId) ? `${bizId}-${Date.now().toString().slice(-4)}` : bizId;

    // Standard color matching logo
    const colors: Record<BusinessCategory, string> = {
      Cafe: '%2378350f', Gym: '%231e293b', Salon: '%23db2777', Bakery: '%23ec4899', Parlour: '%239333ea', Clinic: '%230284c7', Restaurant: '%23b45309', Others: '%232563eb'
    };
    const logoColor = colors[category] || '%232563eb';
    
    const initials = bizInfo.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

    // Svg banner and logo mock data
    const makeSvgBanner = (title: string, subtitle: string, fromColor: string, toColor: string) => {
      const cleanFrom = fromColor.startsWith('%23') ? fromColor.replace('%23', '#') : fromColor;
      const cleanTo = toColor.startsWith('%23') ? toColor.replace('%23', '#') : toColor;
      const cleanTitleId = title.replace(/[^a-zA-Z0-9]/g, '');
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="500" viewBox="0 0 1200 500"><defs><linearGradient id="g_${cleanTitleId}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${cleanFrom}" /><stop offset="100%" stop-color="${cleanTo}" /></linearGradient></defs><rect width="100%" height="100%" fill="url(#g_${cleanTitleId})" /><text x="10%" y="45%" font-family="sans-serif" font-size="56" font-weight="bold" fill="white">${title}</text><text x="10%" y="60%" font-family="sans-serif" font-size="24" fill="white" fill-opacity="0.9">${subtitle}</text></svg>`;
      const base64 = btoa(encodeURIComponent(svg).replace(/%([0-9A-F]{2})/g, (_, p1) => {
        return String.fromCharCode(parseInt(p1, 16));
      }));
      return `data:image/svg+xml;base64,${base64}`;
    };

    const makeSvgLogo = (txt: string, bg: string) => {
      const cleanBg = bg.startsWith('%23') ? bg.replace('%23', '#') : bg;
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><rect width="100%" height="100%" rx="24" fill="${cleanBg}" /><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="38" font-weight="bold" fill="white">${txt}</text></svg>`;
      const base64 = btoa(encodeURIComponent(svg).replace(/%([0-9A-F]{2})/g, (_, p1) => {
        return String.fromCharCode(parseInt(p1, 16));
      }));
      return `data:image/svg+xml;base64,${base64}`;
    };

    const newBusiness: Business = {
      id: finalId,
      name: bizInfo.name,
      logo: makeSvgLogo(initials, logoColor),
      banner: makeSvgBanner(bizInfo.name, bizInfo.description.slice(0, 40), logoColor, '#4f46e5'),
      category,
      city: bizInfo.city,
      rating: 5.0,
      description: bizInfo.description || `Welcome to ${bizInfo.name}! We provide exceptional services customized to fit your needs.`,
      contact: bizInfo.contact,
      email: bizInfo.email,
      whatsapp: bizInfo.whatsapp.replace(/\D/g, ''), // Strip symbols
      address: bizInfo.address,
      mapsUrl: `https://maps.google.com/?q=${encodeURIComponent(bizInfo.city)}`,
      hours: {
        weekdays: '09:00 AM - 08:00 PM',
        weekends: '10:00 AM - 06:00 PM'
      },
      website: `https://${finalId}.syntro.tech`,
      socials: { instagram: finalId },
      gallery: [
        makeSvgBanner('Welcome', 'Browse our services', logoColor, '#475569')
      ],
      services: servicesInput.filter(s => s.name.trim() !== ''),
      reviews: [],
      offers: [
        { id: 'welcome', code: 'WELCOME10', title: '10% New Guest Discount', description: 'Get 10% off on your first booking with us!', discountValue: 10, isPercentage: true, active: true }
      ],
      plan,
      billingCycle,
      status: 'pending', // Starts pending, Admin Dashboard allows verifying it!
      createdDate: new Date().toISOString().split('T')[0]
    };

    saveBusiness(newBusiness);

    // Calculate billing amounts
    let billAmt = 0;
    const factor = billingCycle === 'Monthly' ? 1 : billingCycle === '3-Months' ? 3 : 6;
    const disc = billingCycle === 'Monthly' ? 1 : billingCycle === '3-Months' ? 0.95 : 0.90;
    
    if (plan === 'Catalogue') {
      billAmt = billingCycle === 'Monthly' ? 99 : billingCycle === '3-Months' ? 299 : 399;
    } else {
      const base = plan === 'Starter' ? 699 : plan === 'Business' ? 899 : 999;
      billAmt = Math.round(base * factor * disc);
    }

    addInvoice({
      businessId: finalId,
      businessName: bizInfo.name,
      amount: billAmt,
      planName: `${plan} Plan (${billingCycle})`,
      billingPeriod: `${new Date().toLocaleDateString()} - ${new Date(Date.now() + factor * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}`
    });

    setNewBizId(finalId);
    setStep(6);
  };

  const handleCopyLink = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied URL Link to Clipboard!');
  };

  const isInfoValid = bizInfo.name && bizInfo.city && bizInfo.contact && bizInfo.email && bizInfo.whatsapp && bizInfo.address;

  return (
    <div className="register-page animate-fade-in">
      <header className="page-header text-center">
        <div className="container">
          <h1 className="page-title">Onboard Your Business</h1>
          <p className="page-subtitle">Complete our step-by-step digital wizard to generate your catalogue and access dashboards.</p>
        </div>
      </header>

      <section className="section wizard-section">
        <div className="container max-width-md">
          {/* Progress Indicator */}
          {step <= 4 && (
            <div className="wizard-progress card glass">
              <div className="progress-steps">
                {['Industry', 'Plan', 'Profile Details', 'Set Pricing'].map((label, idx) => (
                  <div key={idx} className={`step-node ${step === idx + 1 ? 'active' : ''} ${step > idx + 1 ? 'completed' : ''}`}>
                    <div className="node-num">{step > idx + 1 ? <Check size={14} /> : idx + 1}</div>
                    <span className="node-lbl">{label}</span>
                  </div>
                ))}
              </div>
              <div className="progress-bar-track">
                <div className="progress-bar-fill" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
              </div>
            </div>
          )}

          {/* STEP 1: SELECT CATEGORY */}
          {step === 1 && (
            <div className="card wizard-step-card animate-fade-in">
              <h2 className="step-title">1. Select Your Business Category</h2>
              <p className="step-subtitle text-muted">We customize your dashboard tools, digital QR menus, and forms based on your selection.</p>
              
              <div className="category-select-grid">
                {[
                  { id: 'Cafe', label: 'Café & Bakery', icon: '☕' },
                  { id: 'Salon', label: 'Hair Salon', icon: '💇' },
                  { id: 'Gym', label: 'Fitness Gym', icon: '🏋️' },
                  { id: 'Parlour', label: 'Beauty Parlour', icon: '💄' },
                  { id: 'Restaurant', label: 'Restaurant', icon: '🍽' },
                  { id: 'Clinic', label: 'Medical Clinic', icon: '🦷' },
                  { id: 'Others', label: 'Other Services', icon: '🛍' }
                ].map(cat => (
                  <button 
                    key={cat.id} 
                    className={`cat-select-btn ${category === cat.id ? 'active' : ''}`}
                    onClick={() => setCategory(cat.id as BusinessCategory)}
                  >
                    <span className="cat-icon">{cat.icon}</span>
                    <span className="cat-lbl">{cat.label}</span>
                  </button>
                ))}
              </div>

              <div className="step-actions">
                <button className="btn btn-primary btn-block font-six" onClick={() => setStep(2)}>
                  <span>Continue to Plan Selection</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SELECT PLAN */}
          {step === 2 && (
            <div className="card wizard-step-card animate-fade-in">
              <h2 className="step-title">2. Select Subscription Level</h2>
              <p className="step-subtitle text-muted">Choose your digitizing plan. Price updates based on billing cycle.</p>
              
              <div className="cycle-selector-row">
                {[['Monthly', 'Standard rate'], ['3-Months', 'Save 5%'], ['6-Months', 'Save 10%']].map(([val, desc]) => (
                  <button 
                    key={val} 
                    className={`cycle-btn ${billingCycle === val ? 'active' : ''}`}
                    onClick={() => setBillingCycle(val as BillingCycle)}
                  >
                    <strong>{val}</strong>
                    <span className="cycle-desc">{desc}</span>
                  </button>
                ))}
              </div>

              <div className="plan-select-grid">
                {[
                  { id: 'Catalogue', name: 'Digital Catalogue', price: billingCycle === 'Monthly' ? '₹99' : billingCycle === '3-Months' ? '₹299' : '₹399', desc: 'Simple services landing page & WhatsApp chat hooks' },
                  { id: 'Starter', name: 'Starter Website', price: billingCycle === 'Monthly' ? '₹699' : billingCycle === '3-Months' ? '₹1992' : '₹3774', desc: '5 Pages responsive business site + hosting included' },
                  { id: 'Business', name: 'Business Website', price: billingCycle === 'Monthly' ? '₹899' : billingCycle === '3-Months' ? '₹2562' : '₹4854', desc: 'Adds appointment booking engine & owner dashboard' },
                  { id: 'Premium', name: 'Premium Website', price: billingCycle === 'Monthly' ? '₹999' : billingCycle === '3-Months' ? '₹2847' : '₹5394', desc: 'Adds customer logins, QR menu codes & ordering tracking' }
                ].map(p => (
                  <button 
                    key={p.id}
                    className={`plan-select-btn-item ${plan === p.id ? 'active' : ''}`}
                    onClick={() => setPlan(p.id as SubscriptionPlan)}
                  >
                    <div className="plan-select-header">
                      <span className="plan-name-lbl">{p.name}</span>
                      <span className="plan-price-lbl">{p.price}</span>
                    </div>
                    <p className="plan-desc-lbl text-muted">{p.desc}</p>
                  </button>
                ))}
              </div>

              <div className="step-actions flex-between-row">
                <button className="btn btn-secondary" onClick={() => setStep(1)}>
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
                <button className="btn btn-primary" onClick={() => setStep(3)}>
                  <span>Enter Profile Details</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: BUSINESS DETAILS */}
          {step === 3 && (
            <div className="card wizard-step-card animate-fade-in">
              <h2 className="step-title">3. Enter Business Profile Details</h2>
              <p className="step-subtitle text-muted">Provide contacts, location, and info that will appear on your public page.</p>
              
              <div className="form-group">
                <label className="form-label">Business Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  required
                  placeholder="e.g. Royal Barber Shop"
                  className="form-input"
                  value={bizInfo.name}
                  onChange={handleInfoChange}
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input 
                    type="text" 
                    name="city" 
                    required
                    placeholder="e.g. Bangalore"
                    className="form-input"
                    value={bizInfo.city}
                    onChange={handleInfoChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Contact Number *</label>
                  <input 
                    type="tel" 
                    name="contact" 
                    required
                    placeholder="e.g. +91 99000 88000"
                    className="form-input"
                    value={bizInfo.contact}
                    onChange={handleInfoChange}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input 
                    type="email" 
                    name="email" 
                    required
                    placeholder="e.g. info@royalbarber.local"
                    className="form-input"
                    value={bizInfo.email}
                    onChange={handleInfoChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">WhatsApp Number * (For leads)</label>
                  <input 
                    type="tel" 
                    name="whatsapp" 
                    required
                    placeholder="e.g. 919900088000 (with country code)"
                    className="form-input"
                    value={bizInfo.whatsapp}
                    onChange={handleInfoChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Complete Address *</label>
                <input 
                  type="text" 
                  name="address" 
                  required
                  placeholder="Shop No, Street, Landmark, Pincode"
                  className="form-input"
                  value={bizInfo.address}
                  onChange={handleInfoChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">About the Business</label>
                <textarea 
                  name="description" 
                  rows={3}
                  placeholder="Briefly describe your services, specialized styles, or cafe settings..."
                  className="form-input"
                  value={bizInfo.description}
                  onChange={handleInfoChange}
                ></textarea>
              </div>

              <div className="step-actions flex-between-row">
                <button className="btn btn-secondary" onClick={() => setStep(2)}>
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
                <button 
                  className="btn btn-primary" 
                  disabled={!isInfoValid}
                  onClick={() => setStep(4)}
                >
                  <span>Build Services & Pricing</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: SERVICES & PRICING INPUT */}
          {step === 4 && (
            <div className="card wizard-step-card animate-fade-in">
              <h2 className="step-title">4. Set Up Services & Pricing</h2>
              <p className="step-subtitle text-muted">List the initial services or menu products you offer and their rates.</p>
              
              <div className="services-list-container">
                {servicesInput.map((service, idx) => (
                  <div key={idx} className="service-row-item card">
                    <div className="service-row-header-fields grid-3">
                      <div className="form-group">
                        <label className="form-label">Item/Service Name *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. Haircut / Coffee Cappuccino" 
                          className="form-input"
                          value={service.name}
                          onChange={(e) => handleServiceChange(idx, 'name', e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Price (₹) *</label>
                        <input 
                          type="number" 
                          required
                          placeholder="e.g. 150" 
                          className="form-input"
                          value={service.price}
                          onChange={(e) => handleServiceChange(idx, 'price', parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div className="form-group select-remove-btn">
                        {servicesInput.length > 1 && (
                          <button className="btn btn-secondary btn-sm remove-row-btn" onClick={() => removeServiceField(idx)}>
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Brief Description</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Includes deep wash, blowdry, styling advice" 
                        className="form-input"
                        value={service.description}
                        onChange={(e) => handleServiceChange(idx, 'description', e.target.value)}
                      />
                    </div>
                  </div>
                ))}

                <button className="btn btn-secondary btn-sm add-row-btn-main" onClick={addServiceField}>
                  ➕ Add Another Service / Item
                </button>
              </div>

              <div className="step-actions flex-between-row">
                <button className="btn btn-secondary" onClick={() => setStep(3)}>
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
                <button className="btn btn-primary btn-glow pulse-glow" onClick={runOnboardingVerification}>
                  <span>Deploy Assets & Verify</span>
                  <Rocket size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: VERIFICATION ANIMATED LOADER */}
          {step === 5 && (
            <div className="card wizard-step-card text-center verification-loader-card animate-fade-in">
              <UploadCloud size={64} className="cloud-onboard-animate" />
              <h2 className="loader-title">Deploying Your Digital Footprint</h2>
              <div className="loader-subdomain font-monospace">{bizInfo.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.syntro.tech</div>
              
              <div className="loading-bar-wrapper">
                <div className="loading-bar-progress"></div>
              </div>
              
              <p className="loading-message-text">{loadingMsg}</p>
            </div>
          )}

          {/* STEP 6: REGISTRATION SUCCESS */}
          {step === 6 && (
            <div className="card wizard-step-card success-onboard-card animate-fade-in">
              <div className="success-banner text-center">
                <CheckCircle2 size={64} className="success-onboard-check" />
                <h2>Onboarding Completed Successfully!</h2>
                <p className="text-muted">Your business is registered, mock hosting is active, and your subscription invoice has been generated.</p>
              </div>

              <div className="registered-urls card bg-light">
                <div className="url-row">
                  <div>
                    <span className="url-label">Public Catalogue Link</span>
                    <strong className="url-val">http://localhost:3000/#/catalogue/{newBizId}</strong>
                  </div>
                  <button className="btn btn-secondary btn-sm btn-icon" onClick={() => handleCopyLink(`http://localhost:3000/#/catalogue/${newBizId}`)}>
                    <Copy size={14} />
                  </button>
                </div>

                <div className="url-row">
                  <div>
                    <span className="url-label">Business Owner Dashboard</span>
                    <strong className="url-val">http://localhost:3000/#/dashboard/{newBizId}</strong>
                  </div>
                  <button className="btn btn-secondary btn-sm btn-icon" onClick={() => handleCopyLink(`http://localhost:3000/#/dashboard/${newBizId}`)}>
                    <Copy size={14} />
                  </button>
                </div>
              </div>

              <div className="success-notes-box">
                <h4>🔒 Verification Notice</h4>
                <p>To prevent spam, your catalog starts in <strong>"Pending Verification"</strong> status. It will not show up in the public directory grid until verified. You can log in as <strong>Admin Dashboard Portal</strong> and approve it immediately!</p>
              </div>

              <div className="step-actions flex-between-row">
                <a href={`#/catalogue/${newBizId}`} className="btn btn-secondary">
                  View Live Catalogue
                </a>
                <a href={`#/dashboard/${newBizId}`} className="btn btn-primary">
                  <span>Enter Owner Dashboard</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
