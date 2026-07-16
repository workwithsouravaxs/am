import { Target, Eye, ShieldCheck, Heart, Users } from 'lucide-react';
import './About.css';

export default function About() {
  const values = [
    {
      icon: <Heart size={24} className="value-icon-color" />,
      title: "Local-First Partnership",
      desc: "We don't treat businesses as ticket numbers. We act as their virtual CTO, managing hosting, domains, layouts, and updates so they can focus on their customers."
    },
    {
      icon: <ShieldCheck size={24} className="value-icon-color" />,
      title: "Absolute Affordability",
      desc: "Developing custom websites costs ₹20,000 to ₹80,000 upfront. We pack high-end systems into a transparent, low-cost monthly subscription starting at ₹99."
    },
    {
      icon: <Users size={24} className="value-icon-color" />,
      title: "No-Code Onboarding",
      desc: "Local owners don't have time to write code or configure hosting. Our wizards handle setup automatically, generating custom digital landing pages in minutes."
    }
  ];

  return (
    <div className="about-page animate-fade-in">
      <header className="page-header text-center">
        <div className="container">
          <span className="badge badge-primary">Our Story</span>
          <h1 className="page-title">Digitizing the Local Economy</h1>
          <p className="page-subtitle">We build professional digital footprints for gyms, cafés, salons, bakeries, and clinics without high upfront costs.</p>
        </div>
      </header>

      {/* Corporate Story */}
      <section className="section story-section">
        <div className="container grid-2 align-center">
          <div className="story-content">
            <h2>Making Digital Infrastructure Democratic</h2>
            <p>
              Every year, thousands of local shops, cafés, and salons lose customers because they lack an online presence. While large corporate chains spend millions on custom apps and SEO optimization, independent owners are left with paper menus, phone-book logs, and high upfront developer quotes.
            </p>
            <p>
              Syntro Tech was founded to bridge this digital divide. We believe that professional web templates, booking engines, and analytics shouldn't be luxury assets. By creating a shared subscription model, we make it possible for any local owner to go digital instantly.
            </p>
            <div className="story-metrics">
              <div className="s-metric">
                <span className="s-val">2026</span>
                <span className="s-lbl">Founded</span>
              </div>
              <div className="s-metric">
                <span className="s-val">100%</span>
                <span className="s-lbl">Indian Owned</span>
              </div>
            </div>
          </div>
          
          <div className="story-graphics">
            <div className="card mission-card">
              <div className="mission-row">
                <div className="m-icon-wrap"><Target size={24} /></div>
                <div>
                  <h3>Our Mission</h3>
                  <p className="text-muted">To digitize 10,000+ local businesses across India, improving their local discoverability, lead collection, and daily booking flow.</p>
                </div>
              </div>
              
              <div className="mission-row">
                <div className="m-icon-wrap"><Eye size={24} /></div>
                <div>
                  <h3>Our Vision</h3>
                  <p className="text-muted">To become the trusted digital operating system for small neighborhood brands, making tech setups simple and affordable.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section bg-light values-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>The Principles that Guide Us</h2>
            <p className="section-desc">We build tools with integrity, keeping our neighborhood partners at the center of everything we do</p>
          </div>
          
          <div className="grid-3 values-grid">
            {values.map((val, idx) => (
              <div key={idx} className="card value-card text-center">
                <div className="value-icon-circle">
                  {val.icon}
                </div>
                <h3>{val.title}</h3>
                <p className="text-muted">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
