import { useState, useEffect } from 'react';
import { Search, MapPin, Filter, Star, RefreshCw } from 'lucide-react';
import { getBusinesses } from '../utils/stateManager';
import './Partners.css';

export default function Partners() {
  const businesses = getBusinesses();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('rating'); // 'rating' | 'newest'

  // Load queries from URL if any (e.g., clicked a category on the homepage)
  useEffect(() => {
    const handleUrlParams = () => {
      const hash = window.location.hash;
      if (hash.includes('?')) {
        const query = hash.split('?')[1];
        const params = new URLSearchParams(query);
        const cat = params.get('category');
        const city = params.get('city');
        
        if (cat) setSelectedCategory(cat);
        if (city) setSelectedCity(city);
      }
    };

    handleUrlParams();
    window.addEventListener('hashchange', handleUrlParams);
    return () => window.removeEventListener('hashchange', handleUrlParams);
  }, []);

  // Filter & Sort Logic
  const filteredBusinesses = businesses
    .filter(biz => {
      const matchesSearch = biz.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            biz.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCity = selectedCity === 'All' || biz.city.toLowerCase() === selectedCity.toLowerCase();
      
      const matchesCategory = selectedCategory === 'All' || biz.category.toLowerCase() === selectedCategory.toLowerCase();
      
      // Only show active businesses in public directory
      const matchesStatus = biz.status === 'active';
      
      return matchesSearch && matchesCity && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      // Sort by newest created date (higher string value for date splits)
      return b.createdDate.localeCompare(a.createdDate);
    });

  // Extract list of cities dynamically
  const cities = ['All', ...Array.from(new Set(businesses.map(b => b.city)))];
  
  // Categories options
  const categories = [
    { label: 'All Segments', val: 'All' },
    { label: '🏋️ Gyms & Fitness', val: 'Gym' },
    { label: '☕ Cafés & Diners', val: 'Cafe' },
    { label: '🍰 Bakeries', val: 'Bakery' },
    { label: '💇 Salons & Spas', val: 'Salon' },
    { label: '💄 Beauty Parlours', val: 'Parlour' },
    { label: '🍽 Restaurants', val: 'Restaurant' },
    { label: '🦷 Clinics', val: 'Clinic' },
    { label: '🛍 Others', val: 'Others' }
  ];

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCity('All');
    setSelectedCategory('All');
    setSortBy('rating');
    window.location.hash = '#/partners'; // Clear URL query params
  };

  return (
    <div className="partners-page animate-fade-in">
      <header className="page-header text-center">
        <div className="container">
          <span className="badge badge-primary">Active Directory</span>
          <h1 className="page-title">Discover Our Partner Businesses</h1>
          <p className="page-subtitle">Browse and connect with verified local gyms, cafés, salons, clinics, and service providers.</p>
        </div>
      </header>

      <section className="section directory-section">
        <div className="container">
          
          {/* Filter Bar Dashboard */}
          <div className="filter-bar-card card glass">
            <div className="filter-search-group">
              <Search className="search-icon" size={20} />
              <input 
                type="text" 
                placeholder="Search by business name or keywords..." 
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-dropdowns">
              <div className="select-wrap">
                <MapPin className="select-icon" size={16} />
                <select 
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="filter-select"
                >
                  <option value="All">All Cities</option>
                  {cities.filter(c => c !== 'All').map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="select-wrap">
                <Filter className="select-icon" size={16} />
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="filter-select"
                >
                  {categories.map(cat => (
                    <option key={cat.val} value={cat.val}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div className="select-wrap font-six">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select sorting-select"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="newest">New Listings</option>
                </select>
              </div>

              {(searchTerm || selectedCity !== 'All' || selectedCategory !== 'All' || sortBy !== 'rating') && (
                <button className="btn btn-secondary btn-sm reset-btn" onClick={resetFilters}>
                  <RefreshCw size={14} />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Directory Count Header */}
          <div className="directory-header-row">
            <h3 className="directory-count">
              Showing {filteredBusinesses.length} {filteredBusinesses.length === 1 ? 'Business' : 'Businesses'}
            </h3>
          </div>

          {/* Businesses Grid */}
          {filteredBusinesses.length > 0 ? (
            <div className="grid-3 partners-grid">
              {filteredBusinesses.map(biz => (
                <div key={biz.id} className="card card-hover partner-dir-card">
                  <div className="dir-card-banner" style={{ backgroundImage: `url(${biz.banner})` }}>
                    <span className="dir-card-badge-plan badge badge-primary">{biz.plan}</span>
                  </div>
                  <div className="dir-card-content">
                    <div className="dir-card-header">
                      <img src={biz.logo} alt={biz.name} className="dir-card-logo" />
                      <div>
                        <span className="dir-card-category-badge">{biz.category}</span>
                        <h3 className="dir-card-name">{biz.name}</h3>
                      </div>
                    </div>
                    
                    <p className="dir-card-desc">{biz.description.slice(0, 120)}...</p>
                    
                    <div className="dir-card-meta">
                      <div className="dir-card-rating">
                        <Star size={16} fill="#f59e0b" stroke="#f59e0b" />
                        <span>{biz.rating} ({biz.reviews.length})</span>
                      </div>
                      
                      <div className="dir-card-location">
                        <MapPin size={16} />
                        <span>{biz.city}</span>
                      </div>
                    </div>

                    <div className="dir-card-actions">
                      <a href={`#/catalogue/${biz.id}`} className="btn btn-primary btn-block">
                        View Live Catalogue
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center no-results-card">
              <span className="no-results-icon">🔎</span>
              <h3>No Businesses Found</h3>
              <p className="text-muted">We couldn't find any partners matching your search terms or filters. Try adjusting your selections.</p>
              <button className="btn btn-primary" onClick={resetFilters}>Clear All Filters</button>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
