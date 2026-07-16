import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Solutions from './pages/Solutions';
import Pricing from './pages/Pricing';
import Partners from './pages/Partners';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/Register';
import BusinessDashboard from './pages/BusinessDashboard';
import CatalogueTemplate from './components/CatalogueTemplate';
import { initializeStorage } from './utils/stateManager';

export default function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');

  useEffect(() => {
    // Populate localStorage with starting mock database on first load
    initializeStorage();

    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
      window.scrollTo(0, 0); // Scroll to top on navigation
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Parse path and dynamic parameters (e.g. #/catalogue/espresso-house)
  const getRoute = () => {
    const rawPath = currentHash.split('?')[0]; // Remove query params for routing
    const parts = rawPath.split('/');
    
    const view = parts[1] || '';
    const param = parts[2] || '';

    return { rawPath, view, param };
  };

  const { rawPath, view, param } = getRoute();

  // Render correct page view
  const renderContent = () => {
    if (rawPath === '#/' || rawPath === '') {
      return <Home />;
    }
    
    switch (view) {
      case 'solutions':
        return <Solutions />;
      case 'pricing':
        return <Pricing />;
      case 'partners':
        return <Partners />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'register':
        return <Register />;
      case 'catalogue':
        return <CatalogueTemplate businessId={param} />;
      case 'dashboard':
        return <BusinessDashboard businessId={param} />;
      default:
        return <Home />;
    }
  };

  // Skip main header/footer wrapper for dashboard views to give a clean layout
  const isDashboardView = view === 'dashboard';

  return (
    <div className="app-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isDashboardView && <Navbar />}
      
      <main className="main-content" style={{ flexGrow: 1 }}>
        {renderContent()}
      </main>
      
      {!isDashboardView && <Footer />}
      
      {/* Floating WhatsApp Support Button */}
      {!isDashboardView && (
        <a 
          href="https://wa.me/917794885877" 
          target="_blank" 
          rel="noopener noreferrer"
          className="whatsapp-float-btn"
          title="Chat with support on WhatsApp"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#25d366',
            color: 'white',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
            zIndex: 9999
          }}
        >
          <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.714-1.464L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.792 1.453 5.424.003 9.837-4.407 9.84-9.83.002-2.628-1.02-5.1-2.88-6.96C16.48 1.96 14.017.939 12.01.939c-5.429 0-9.843 4.41-9.845 9.835-.001 1.63.457 3.22 1.323 4.62l-1.006 3.673 3.765-.987-.19.112zM17.13 14.545c-.282-.14-.1.666-.356.666a1.14 1.14 0 0 1-.84-.367c-.208-.204-1.748-1.226-2.52-1.9-.434-.378-.71-.57-.962-.876-.252-.307-.05-.53.15-.733l.63-.63a2.535 2.535 0 0 0 .34-.486c.075-.152.038-.285-.019-.398-.057-.113-.509-1.223-.697-1.678-.184-.442-.366-.381-.504-.388-.13-.007-.278-.008-.426-.008a.82.82 0 0 0-.594.277c-.204.22-.78.761-.78 1.854 0 1.094.796 2.15 1.092 2.545.03.04.148.225.378.484.77.868 1.706 1.5 2.825 1.952.885.358 1.442.367 1.962.29.577-.085 1.776-.726 2.027-1.428.252-.7.252-1.302.176-1.427-.076-.127-.278-.202-.56-.343z"/>
          </svg>
        </a>
      )}
      
      {/* Small floating quick back-link for Admin/Business dashboards */}
      {isDashboardView && (
        <a 
          href="#/" 
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#0f172a',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '9999px',
            fontWeight: '600',
            fontSize: '13px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
            textDecoration: 'none',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid rgba(255,255,255,0.15)'
          }}
        >
          <span>⬅ Return to Public Site</span>
        </a>
      )}
    </div>
  );
}
