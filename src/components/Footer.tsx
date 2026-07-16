import { Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        {/* Info Column */}
        <div className="footer-col info-col">
          <a href="#/" className="footer-logo">
            <span className="logo-icon">S</span>
            <span className="logo-text">Syntro<span className="accent-text">Tech</span></span>
          </a>
          <p className="footer-desc">
            Empowering local businesses with high-end websites, digital catalogues, appointment engines, and management software—at an affordable monthly subscription.
          </p>
          <div className="footer-socials">
            <a href="https://instagram.com" className="social-icon" target="_blank" rel="noreferrer">Ig</a>
            <a href="https://facebook.com" className="social-icon" target="_blank" rel="noreferrer">Fb</a>
            <a href="https://twitter.com" className="social-icon" target="_blank" rel="noreferrer">Tw</a>
            <a href="https://linkedin.com" className="social-icon" target="_blank" rel="noreferrer">In</a>
          </div>
        </div>

        {/* Links: Solutions */}
        <div className="footer-col">
          <h3 className="footer-title">Solutions For</h3>
          <ul className="footer-links">
            <li><a href="#/solutions?type=gym">🏋️ Gyms & Fitness</a></li>
            <li><a href="#/solutions?type=cafe">☕ Cafés & Eateries</a></li>
            <li><a href="#/solutions?type=salon">💇 Salons & Spas</a></li>
            <li><a href="#/solutions?type=bakery">🍰 Bakeries & Sweets</a></li>
            <li><a href="#/solutions?type=restaurant">🍽 Restaurants</a></li>
            <li><a href="#/solutions?type=clinic">🦷 Medical Clinics</a></li>
          </ul>
        </div>

        {/* Links: Pricing & Navigation */}
        <div className="footer-col">
          <h3 className="footer-title">Platform</h3>
          <ul className="footer-links">
            <li><a href="#/pricing">Plans & Pricing</a></li>
            <li><a href="#/partners">Partner Directory</a></li>
            <li><a href="#/about">Our Story & Vision</a></li>
            <li><a href="#/contact">Get in Touch</a></li>
            <li><a href="#/register">Register Business</a></li>
          </ul>
        </div>

        {/* Links: Contact */}
        <div className="footer-col contact-col">
          <h3 className="footer-title">Contact Us</h3>
          <ul className="footer-contact-list">
            <li>
              <Phone size={18} className="contact-icon" />
              <span>+91 77948 85877</span>
            </li>
            <li>
              <Mail size={18} className="contact-icon" />
              <span>support@syntrotech.local</span>
            </li>
            <li>
              <MapPin size={18} className="contact-icon" strokeWidth={1.5} />
              <span>Innovator Tower, Outer Ring Rd, Gachibowli, Hyderabad, Telangana 500032</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-container">
          <p className="copyright">&copy; {new Date().getFullYear()} Syntro Tech. All rights reserved.</p>
          <div className="bottom-links">
            <a href="#/">Privacy Policy</a>
            <a href="#/">Terms of Service</a>
            <a href="#/">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
