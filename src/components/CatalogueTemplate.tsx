import React, { useState } from 'react';
import { MapPin, Clock, ExternalLink, Calendar, Star, CheckCircle2, Tag, AlertCircle } from 'lucide-react';
import { getBusinessById, addBusinessReview, addLead } from '../utils/stateManager';
import type { Business } from '../types';
import './CatalogueTemplate.css';

interface CatalogueTemplateProps {
  businessId: string;
}

export default function CatalogueTemplate({ businessId }: CatalogueTemplateProps) {
  const [business, setBusiness] = useState<Business | undefined>(getBusinessById(businessId));
  
  // Interactive Review Form State
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Lead Booking State
  const [bookName, setBookName] = useState('');
  const [bookPhone, setBookPhone] = useState('');
  const [bookEmail, setBookEmail] = useState('');
  const [bookService, setBookService] = useState('');
  const [bookDate, setBookDate] = useState('');
  const [bookTime, setBookTime] = useState('');
  const [bookMessage, setBookMessage] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Food Ordering State (For Cafes/Bakeries)
  const [orderCart, setOrderCart] = useState<{ [itemName: string]: number }>({});
  const [orderName, setOrderName] = useState('');
  const [orderPhone, setOrderPhone] = useState('');
  const [orderEmail, setOrderEmail] = useState('');
  const [orderMessage, setOrderMessage] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Review Validation
  const [reviewError, setReviewError] = useState('');

  if (!business) {
    return (
      <div className="catalogue-container container text-center error-catalogue-box animate-fade-in" style={{ padding: '160px 24px' }}>
        <AlertCircle size={64} className="text-danger" style={{ marginBottom: '16px' }} />
        <h2>Digital Catalogue Not Found</h2>
        <p className="text-muted">The catalogue link you clicked does not exist or has been suspended.</p>
        <a href="#/partners" className="btn btn-primary" style={{ marginTop: '16px' }}>Return to Directory</a>
      </div>
    );
  }

  // Handle Review Submission
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) {
      setReviewError('Please fill out all review fields.');
      return;
    }
    
    try {
      addBusinessReview(business.id, {
        author: reviewAuthor,
        rating: reviewRating,
        comment: reviewComment
      });
      
      // Reload business from storage
      setBusiness(getBusinessById(business.id));
      setReviewAuthor('');
      setReviewComment('');
      setReviewRating(5);
      setReviewError('');
      setReviewSuccess(true);
      setTimeout(() => setReviewSuccess(false), 5000);
    } catch (err) {
      setReviewError('Error writing review.');
    }
  };

  // Handle Appointment Booking
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookName || !bookPhone || !bookEmail || !bookService || !bookDate) return;

    addLead({
      businessId: business.id,
      businessName: business.name,
      name: bookName,
      email: bookEmail,
      phone: bookPhone,
      message: bookMessage || `Booked appointment for ${bookService}.`,
      type: 'booking',
      serviceBooked: bookService,
      appointmentDate: bookDate,
      appointmentTime: bookTime || '09:00 AM'
    });

    setBookName('');
    setBookPhone('');
    setBookEmail('');
    setBookService('');
    setBookDate('');
    setBookTime('');
    setBookMessage('');
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 6000);
  };

  // Cart helper functions
  const updateCartQty = (itemName: string, delta: number) => {
    const current = orderCart[itemName] || 0;
    const next = current + delta;
    if (next <= 0) {
      const updated = { ...orderCart };
      delete updated[itemName];
      setOrderCart(updated);
    } else {
      setOrderCart({
        ...orderCart,
        [itemName]: next
      });
    }
  };

  const getCartTotal = () => {
    if (!business.menu) return 0;
    return Object.entries(orderCart).reduce((sum, [name, qty]) => {
      const item = business.menu?.find(m => m.name === name);
      return sum + (item ? item.price * qty : 0);
    }, 0);
  };

  // Handle Order Placement
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(orderCart).length === 0 || !orderName || !orderPhone || !orderEmail) return;

    const cartString = Object.entries(orderCart).map(([name, qty]) => `${qty}x ${name}`).join(', ');
    const total = getCartTotal();

    addLead({
      businessId: business.id,
      businessName: business.name,
      name: orderName,
      email: orderEmail,
      phone: orderPhone,
      message: orderMessage || `Placed order for items: ${cartString}`,
      type: 'order',
      orderItems: cartString,
      orderTotal: total
    });

    setOrderCart({});
    setOrderName('');
    setOrderPhone('');
    setOrderEmail('');
    setOrderMessage('');
    setOrderSuccess(true);
    setTimeout(() => setOrderSuccess(false), 6000);
  };

  // Get active menu categories
  const menuCategories = business.menu ? Array.from(new Set(business.menu.map(m => m.category))) : [];

  return (
    <div className="catalogue-view animate-fade-in">
      {/* Cover Banner */}
      <div className="catalogue-banner" style={{ backgroundImage: `url(${business.banner})` }}>
        {business.status === 'pending' && (
          <div className="catalogue-pending-alert">
            <AlertCircle size={16} />
            <span>PENDING VERIFICATION (Spam Prevention Check)</span>
          </div>
        )}
        <div className="banner-overlay"></div>
      </div>

      {/* Profile Header Details */}
      <div className="catalogue-header-row container">
        <div className="catalogue-profile-card card glass">
          <img src={business.logo} alt={business.name} className="catalogue-logo" />
          <div className="profile-details-info">
            <div className="profile-meta-top">
              <span className="badge badge-primary">{business.category}</span>
              <div className="profile-rating">
                <Star size={16} fill="#f59e0b" stroke="#f59e0b" />
                <span><strong>{business.rating}</strong> ({business.reviews.length} reviews)</span>
              </div>
            </div>
            <h1 className="profile-name">{business.name}</h1>
            <p className="profile-city text-muted">📍 {business.city}</p>
            <p className="profile-desc">{business.description}</p>
            
            <div className="profile-contacts-row">
              <a href={`tel:${business.contact}`} className="btn btn-secondary btn-sm">📞 Call Business</a>
              <a href={`https://wa.me/${business.whatsapp}?text=Hi%20${encodeURIComponent(business.name)},%20I%20found%20you%20on%20Syntro%20Tech!`} className="btn btn-primary btn-sm" target="_blank" rel="noreferrer">💬 WhatsApp Chat</a>
              {business.id && (
                <a href={`#/dashboard/${business.id}`} className="btn btn-accent btn-sm manage-btn" title="Manage business profile details">
                  ⚙️ Manage Business
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="catalogue-main-layout container">
        {/* LEFT COLUMN: Menus / Services / Gallery */}
        <div className="catalogue-left-column">
          
          {/* Active Promos & Offers */}
          {business.offers.filter(o => o.active).length > 0 && (
            <div className="card promo-card">
              <h3 className="section-small-title"><Tag size={18} /> Active Promotions & Coupons</h3>
              <div className="promos-grid">
                {business.offers.filter(o => o.active).map(offer => (
                  <div key={offer.id} className="promo-item card">
                    <span className="promo-code">{offer.code}</span>
                    <h4 className="promo-title">{offer.title}</h4>
                    <p className="promo-desc text-muted">{offer.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Business Hours & Map Location */}
          <div className="grid-2 hours-location-grid">
            <div className="card hours-card">
              <h3 className="section-small-title"><Clock size={18} /> Operating Hours</h3>
              <ul className="hours-list">
                <li><span>Weekdays:</span> <strong>{business.hours.weekdays}</strong></li>
                <li><span>Weekends:</span> <strong>{business.hours.weekends}</strong></li>
              </ul>
            </div>
            <div className="card location-card">
              <h3 className="section-small-title"><MapPin size={18} /> Location Address</h3>
              <p className="address-txt text-muted">{business.address}</p>
              <a href={business.mapsUrl} className="maps-link" target="_blank" rel="noreferrer">
                <span>View on Google Maps</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* DYNAMIC CONTENT: Menu (for eateries) vs Services (others) */}
          {business.menu && business.menu.length > 0 ? (
            <div className="card menu-card-section">
              <h3 className="section-small-title">🍽 Food & Drinks Menu</h3>
              {menuCategories.map(cat => (
                <div key={cat} className="menu-category-block">
                  <h4 className="menu-cat-title">{cat}</h4>
                  <div className="menu-items-list">
                    {business.menu?.filter(m => m.category === cat).map((item, idx) => (
                      <div key={idx} className="menu-item-row">
                        <div className="menu-item-info">
                          <div className="menu-item-name-row">
                            <strong>{item.name}</strong>
                            {item.isSpecial && <span className="special-tag-label">SPECIAL</span>}
                          </div>
                          <p className="text-muted">{item.description}</p>
                        </div>
                        <div className="menu-item-price-action">
                          <span className="price-label">₹{item.price}</span>
                          {(business.category === 'Cafe' || business.category === 'Bakery' || business.category === 'Restaurant') && (
                            <div className="qty-picker">
                              <button onClick={() => updateCartQty(item.name, -1)} disabled={!orderCart[item.name]} className="qty-btn">-</button>
                              <span className="qty-val">{orderCart[item.name] || 0}</span>
                              <button onClick={() => updateCartQty(item.name, 1)} className="qty-btn">+</button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card services-card-section">
              <h3 className="section-small-title">💇 Services & Prices</h3>
              <div className="services-grid-list">
                {business.services.map((ser, idx) => (
                  <div key={idx} className="service-item-card card bg-light">
                    <div className="service-card-top">
                      <h4>{ser.name}</h4>
                      <span className="service-price">₹{ser.price}</span>
                    </div>
                    <p className="text-muted">{ser.description}</p>
                    {ser.duration && <span className="service-duration">⏱ {ser.duration}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Photo Gallery */}
          {business.gallery.length > 0 && (
            <div className="card gallery-section-card">
              <h3 className="section-small-title">🖼 Photo Gallery</h3>
              <div className="gallery-layout-grid">
                {business.gallery.map((img, idx) => (
                  <div key={idx} className="gallery-photo-item" style={{ backgroundImage: `url(${img})` }}></div>
                ))}
              </div>
            </div>
          )}

          {/* Customer Reviews Section */}
          <div className="card reviews-section-card">
            <h3 className="section-small-title">⭐ Customer Reviews</h3>
            
            {/* Reviews List */}
            <div className="reviews-list-block">
              {business.reviews.length > 0 ? (
                business.reviews.map(rev => (
                  <div key={rev.id} className="review-comment-item border-bottom">
                    <div className="review-comment-header">
                      <strong>{rev.author}</strong>
                      <div className="rating-stars-row">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={14} fill={i < rev.rating ? '#f59e0b' : 'none'} stroke="#f59e0b" />
                        ))}
                      </div>
                      <span className="review-date text-muted">{rev.date}</span>
                    </div>
                    <p className="review-comment-txt">{rev.comment}</p>
                  </div>
                ))
              ) : (
                <p className="no-reviews-txt text-muted">No reviews yet. Be the first to share your experience!</p>
              )}
            </div>

            {/* Write a review form */}
            <form onSubmit={handleReviewSubmit} className="write-review-form border-top">
              <h4>Write a Review</h4>
              {reviewSuccess && <div className="badge badge-success review-success-banner">Review submitted successfully!</div>}
              {reviewError && <div className="badge badge-danger review-error-banner">{reviewError}</div>}
              
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Nikita Sen" 
                    className="form-input"
                    value={reviewAuthor}
                    onChange={(e) => setReviewAuthor(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Rating</label>
                  <select 
                    className="form-input"
                    value={reviewRating}
                    onChange={(e) => setReviewRating(parseInt(e.target.value))}
                  >
                    <option value={5}>5 Stars (Excellent)</option>
                    <option value={4}>4 Stars (Good)</option>
                    <option value={3}>3 Stars (Average)</option>
                    <option value={2}>2 Stars (Poor)</option>
                    <option value={1}>1 Star (Terrible)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Comment</label>
                <textarea 
                  rows={3} 
                  placeholder="Share details of your experience..." 
                  className="form-input"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-secondary btn-sm">Submit Feedback</button>
            </form>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Lead Gen widgets */}
        <div className="catalogue-right-column">
          
          {/* FOOD ORDERING WIDGET (Cafes/Bakeries/Restaurants) */}
          {business.menu && business.menu.length > 0 && (
            <div className="card booking-widget-card sticky-sidebar-card">
              <h3 className="widget-title">🛒 Place Your Order</h3>
              
              {Object.keys(orderCart).length > 0 ? (
                <form onSubmit={handleOrderSubmit} className="order-form">
                  <div className="cart-preview card bg-light">
                    <h4>Items Summary</h4>
                    <ul className="cart-items-list-preview">
                      {Object.entries(orderCart).map(([name, qty]) => {
                        const item = business.menu?.find(m => m.name === name);
                        return (
                          <li key={name} className="cart-preview-item">
                            <span>{qty}x {name}</span>
                            <strong>₹{item ? item.price * qty : 0}</strong>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="cart-total-preview border-top">
                      <span>Total Amount:</span>
                      <strong>₹{getCartTotal()}</strong>
                    </div>
                  </div>

                  {orderSuccess && (
                    <div className="order-success card glass text-center">
                      <CheckCircle2 size={32} className="text-success" style={{ margin: '0 auto 10px auto' }} />
                      <h4 className="text-success">Order Request Received!</h4>
                      <p className="text-muted" style={{ fontSize: '11px' }}>We will contact you via phone/WhatsApp to confirm preparation time and payment instructions.</p>
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label">Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Your Name" 
                      className="form-input form-input-sm"
                      value={orderName}
                      onChange={(e) => setOrderName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. +91 99000 88000" 
                      className="form-input form-input-sm"
                      value={orderPhone}
                      onChange={(e) => setOrderPhone(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. sameer@example.com" 
                      className="form-input form-input-sm"
                      value={orderEmail}
                      onChange={(e) => setOrderEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Delivery Note / Instructions</label>
                    <textarea 
                      rows={2} 
                      placeholder="e.g. Make it extra spicy / Eggless cake options" 
                      className="form-input form-input-sm"
                      value={orderMessage}
                      onChange={(e) => setOrderMessage(e.target.value)}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block btn-sm">
                    Confirm Order Request
                  </button>
                </form>
              ) : (
                <div className="empty-cart-state text-center">
                  <span className="empty-cart-icon">🛒</span>
                  <p className="text-muted">Your cart is empty. Click the <strong>+</strong> buttons next to menu items to choose food/drinks.</p>
                </div>
              )}
            </div>
          )}

          {/* APPOINTMENT BOOKING WIDGET (Salons/Gyms/Clinics/Others) */}
          {(!business.menu || business.menu.length === 0) && (
            <div className="card booking-widget-card sticky-sidebar-card">
              <h3 className="widget-title"><Calendar size={20} /> Reserve Appointment</h3>
              <p className="widget-helper text-muted">Select your service, choose a date, and book a slot instantly.</p>
              
              {bookingSuccess && (
                <div className="booking-success-box card glass text-center" style={{ marginBottom: '16px', borderColor: 'var(--success)' }}>
                  <CheckCircle2 size={32} className="text-success" style={{ margin: '0 auto 8px auto' }} />
                  <h4 className="text-success" style={{ fontSize: '14px' }}>Appointment Requested!</h4>
                  <p className="text-muted" style={{ fontSize: '11.5px', lineHeight: '1.4' }}>Your booking request has been sent. The business will contact you on WhatsApp to confirm your slot.</p>
                </div>
              )}

              <form onSubmit={handleBookingSubmit} className="booking-form-widget">
                <div className="form-group">
                  <label className="form-label">Choose Service *</label>
                  <select 
                    required
                    className="form-input form-input-sm"
                    value={bookService}
                    onChange={(e) => setBookService(e.target.value)}
                  >
                    <option value="">-- Select Service --</option>
                    {business.services.map((ser, i) => (
                      <option key={i} value={ser.name}>{ser.name} (₹{ser.price})</option>
                    ))}
                  </select>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Date *</label>
                    <input 
                      type="date" 
                      required
                      className="form-input form-input-sm"
                      value={bookDate}
                      onChange={(e) => setBookDate(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Preferred Time</label>
                    <input 
                      type="time" 
                      className="form-input form-input-sm"
                      value={bookTime}
                      onChange={(e) => setBookTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Name" 
                    className="form-input form-input-sm"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="e.g. +91 99000 88000" 
                    className="form-input form-input-sm"
                    value={bookPhone}
                    onChange={(e) => setBookPhone(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input 
                    type="email" 
                    required
                    placeholder="Email" 
                    className="form-input form-input-sm"
                    value={bookEmail}
                    onChange={(e) => setBookEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Notes for Staff (Optional)</label>
                  <textarea 
                    rows={2} 
                    placeholder="e.g. Hair length queries, specific preferences..." 
                    className="form-input form-input-sm"
                    value={bookMessage}
                    onChange={(e) => setBookMessage(e.target.value)}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-block btn-sm">
                  Request Appointment Slot
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
