import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    const handleHash = () => {
      setActiveHash(window.location.hash || '#/');
      setIsOpen(false); // Close menu on navigation
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHash);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHash);
    };
  }, []);

  const navLinks = [
    { label: 'Home', hash: '#/' },
    { label: 'Solutions', hash: '#/solutions' },
    { label: 'Pricing', hash: '#/pricing' },
    { label: 'Partner Directory', hash: '#/partners' },
    { label: 'About Us', hash: '#/about' },
    { label: 'Contact', hash: '#/contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Brand Logo */}
        <a href="#/" className="logo-container">
          <span className="logo-icon">S</span>
          <span className="logo-text">Syntro<span className="accent-text">Tech</span></span>
        </a>

        {/* Desktop Navigation */}
        <div className="desktop-nav">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.hash}>
                <a 
                  href={link.hash} 
                  className={`nav-link ${activeHash === link.hash ? 'active' : ''}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <a href="#/register" className="btn btn-primary btn-sm btn-glow">
              <span>Register Business</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="mobile-toggle" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          {navLinks.map((link) => (
            <li key={link.hash}>
              <a 
                href={link.hash} 
                className={`mobile-nav-link ${activeHash === link.hash ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mobile-action-li">
            <a href="#/register" className="btn btn-primary btn-block" onClick={() => setIsOpen(false)}>
              <span>Register Business</span>
              <ArrowRight size={14} />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
