import React, { useState, useEffect } from 'react';
import { Calendar, Trash2, Tag, FileText, TrendingUp, Users, ClipboardList, Settings2 } from 'lucide-react';
import { getBusinessById, saveBusiness, getLeadsForBusiness, getInvoicesForBusiness, getVisitorAnalytics, addBusinessOffer, toggleOfferStatus, updateLeadStatus } from '../utils/stateManager';
import type { Business, ServiceItem, MenuItem, LeadItem, InvoiceItem } from '../types';
import './BusinessDashboard.css';

interface BusinessDashboardProps {
  businessId: string;
}

type OwnerTab = 'overview' | 'profile' | 'items' | 'offers' | 'leads' | 'invoices';

export default function BusinessDashboard({ businessId }: BusinessDashboardProps) {
  const [business, setBusiness] = useState<Business | undefined>(getBusinessById(businessId));
  const [activeTab, setActiveTab] = useState<OwnerTab>('overview');

  // Lead and invoice lists
  const [leads, setLeads] = useState<LeadItem[]>(getLeadsForBusiness(businessId));
  const [invoices, setInvoices] = useState<InvoiceItem[]>(getInvoicesForBusiness(businessId));
  const visitorData = getVisitorAnalytics(businessId);

  // Form states for adding service/menu item
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState(0);
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemCat, setNewItemCat] = useState('General'); // Café category
  const [newItemSpecial, setNewItemSpecial] = useState(false);

  // Form states for coupon offer
  const [newOfferCode, setNewOfferCode] = useState('');
  const [newOfferTitle, setNewOfferTitle] = useState('');
  const [newOfferDesc, setNewOfferDesc] = useState('');
  const [newOfferVal, setNewOfferVal] = useState(10);
  const [newOfferPercent, setNewOfferPercent] = useState(true);

  // Profile Edit State
  const [editDesc, setEditDesc] = useState(business?.description || '');
  const [editPhone, setEditPhone] = useState(business?.contact || '');
  const [editEmail, setEditEmail] = useState(business?.email || '');
  const [editAddress, setEditAddress] = useState(business?.address || '');
  const [editWeekdays, setEditWeekdays] = useState(business?.hours.weekdays || '');
  const [editWeekends, setEditWeekends] = useState(business?.hours.weekends || '');
  const [profileSaved, setProfileSaved] = useState(false);

  useEffect(() => {
    // Sync states if businessId changes
    const biz = getBusinessById(businessId);
    setBusiness(biz);
    if (biz) {
      setEditDesc(biz.description);
      setEditPhone(biz.contact);
      setEditEmail(biz.email);
      setEditAddress(biz.address);
      setEditWeekdays(biz.hours.weekdays);
      setEditWeekends(biz.hours.weekends);
      setLeads(getLeadsForBusiness(businessId));
      setInvoices(getInvoicesForBusiness(businessId));
    }
  }, [businessId]);

  if (!business) {
    return (
      <div className="dashboard-container container text-center error-dashboard-box animate-fade-in" style={{ padding: '160px 24px' }}>
        <h2>Business Profile Not Found</h2>
        <p className="text-muted">You are attempting to access a dashboard for an invalid account registry.</p>
        <a href="#/" className="btn btn-primary" style={{ marginTop: '16px' }}>Return to Homepage</a>
      </div>
    );
  }

  const refreshLocalState = () => {
    const updated = getBusinessById(businessId);
    setBusiness(updated);
    setLeads(getLeadsForBusiness(businessId));
    setInvoices(getInvoicesForBusiness(businessId));
  };

  // Update Profile details
  const handleSaveProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedBiz: Business = {
      ...business,
      description: editDesc,
      contact: editPhone,
      email: editEmail,
      address: editAddress,
      hours: {
        weekdays: editWeekdays,
        weekends: editWeekends
      }
    };
    saveBusiness(updatedBiz);
    setProfileSaved(true);
    refreshLocalState();
    setTimeout(() => setProfileSaved(false), 4000);
  };

  // Add Service or Menu Item
  const handleAddItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || newItemPrice <= 0) return;

    if (business.menu) {
      // Café / Bakery menu system
      const newItem: MenuItem = {
        name: newItemName,
        price: newItemPrice,
        description: newItemDesc,
        category: newItemCat,
        isSpecial: newItemSpecial
      };
      business.menu.push(newItem);
    } else {
      // General salon / gym services
      const newItem: ServiceItem = {
        name: newItemName,
        price: newItemPrice,
        description: newItemDesc
      };
      business.services.push(newItem);
    }

    saveBusiness(business);
    refreshLocalState();

    // Reset Form
    setNewItemName('');
    setNewItemPrice(0);
    setNewItemDesc('');
    setNewItemCat('General');
    setNewItemSpecial(false);
  };

  // Delete Service or Menu Item
  const handleDeleteItem = (index: number, isMenu: boolean) => {
    if (isMenu && business.menu) {
      business.menu.splice(index, 1);
    } else {
      business.services.splice(index, 1);
    }
    saveBusiness(business);
    refreshLocalState();
  };

  // Add Promotion Offer Coupon
  const handleAddOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOfferCode || !newOfferTitle) return;

    addBusinessOffer(business.id, {
      code: newOfferCode.toUpperCase().replace(/\s+/g, ''),
      title: newOfferTitle,
      description: newOfferDesc,
      discountValue: newOfferVal,
      isPercentage: newOfferPercent
    });

    refreshLocalState();
    setNewOfferCode('');
    setNewOfferTitle('');
    setNewOfferDesc('');
    setNewOfferVal(10);
  };

  // Toggle Offer state
  const handleToggleOffer = (offerId: string) => {
    toggleOfferStatus(business.id, offerId);
    refreshLocalState();
  };

  // Resolve booking appointment
  const handleResolveBooking = (leadId: string) => {
    updateLeadStatus(leadId, 'resolved');
    refreshLocalState();
  };

  // Calculate stats
  const totalViews = visitorData.reduce((sum, v) => sum + v.views, 0);
  const conversionRate = leads.length > 0 ? ((leads.length / (totalViews || 1)) * 100).toFixed(1) : '0';

  return (
    <div className="business-dashboard animate-fade-in">
      <header className="page-header owner-header text-center">
        <div className="container">
          <span className="badge badge-primary">💼 Business Console</span>
          <h1 className="page-title">{business.name} Panel</h1>
          <p className="page-subtitle">Update operating metrics, edit service item menus, configure coupons, and handle client bookings.</p>
        </div>
      </header>

      <section className="section owner-dashboard-section">
        <div className="container dashboard-grid">
          
          {/* Owner Navigation Sidebar */}
          <div className="dashboard-sidebar card glass">
            <div className="sidebar-biz-header">
              <img src={business.logo} alt={business.name} className="sidebar-biz-logo" />
              <h3>{business.name.slice(0, 16)}...</h3>
              <span className="badge badge-primary">{business.plan} Plan</span>
            </div>
            
            <ul className="sidebar-links">
              <li>
                <button className={`sidebar-tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
                  <TrendingUp size={18} />
                  <span>Overview Stats</span>
                </button>
              </li>
              <li>
                <button className={`sidebar-tab-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
                  <Settings2 size={18} />
                  <span>Edit Profile Info</span>
                </button>
              </li>
              <li>
                <button className={`sidebar-tab-btn ${activeTab === 'items' ? 'active' : ''}`} onClick={() => setActiveTab('items')}>
                  <ClipboardList size={18} />
                  <span>Manage Catalog</span>
                </button>
              </li>
              <li>
                <button className={`sidebar-tab-btn ${activeTab === 'offers' ? 'active' : ''}`} onClick={() => setActiveTab('offers')}>
                  <Tag size={18} />
                  <span>Promo Codes</span>
                </button>
              </li>
              <li>
                <button className={`sidebar-tab-btn ${activeTab === 'leads' ? 'active' : ''}`} onClick={() => setActiveTab('leads')}>
                  <Calendar size={18} />
                  <span>Customer Bookings</span>
                  {leads.filter(l => l.status === 'pending').length > 0 && (
                    <span className="count-badge-sidebar">{leads.filter(l => l.status === 'pending').length}</span>
                  )}
                </button>
              </li>
              <li>
                <button className={`sidebar-tab-btn ${activeTab === 'invoices' ? 'active' : ''}`} onClick={() => setActiveTab('invoices')}>
                  <FileText size={18} />
                  <span>Subscription Bills</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Main Console Area */}
          <div className="dashboard-main-area">
            
            {/* OVERVIEW PANEL */}
            {activeTab === 'overview' && (
              <div className="tab-pane-content animate-fade-in">
                {/* Stats cards */}
                <div className="grid-3 owner-metric-cards">
                  <div className="card metric-card">
                    <div className="metric-header-row">
                      <Users size={20} className="met-icon blue" />
                      <span className="met-lbl">7-Day Page Views</span>
                    </div>
                    <h2 className="met-val">{totalViews}</h2>
                    <p className="met-footer text-muted">🟢 Dynamic local clicks</p>
                  </div>

                  <div className="card metric-card">
                    <div className="metric-header-row">
                      <ClipboardList size={20} className="met-icon green" />
                      <span className="met-lbl">Total Leads Collected</span>
                    </div>
                    <h2 className="met-val">{leads.length}</h2>
                    <p className="met-footer text-muted">
                      ({leads.filter(l => l.status === 'pending').length} Action pending)
                    </p>
                  </div>

                  <div className="card metric-card">
                    <div className="metric-header-row">
                      <TrendingUp size={20} className="met-icon orange" />
                      <span className="met-lbl">Conversion Efficiency</span>
                    </div>
                    <h2 className="met-val">{conversionRate}%</h2>
                    <p className="met-footer text-success">📈 Ratio: Views to Inquiries</p>
                  </div>
                </div>

                {/* Visitor Chart Graph Mock */}
                <div className="card visitor-chart-card" style={{ marginTop: '24px' }}>
                  <h3>Weekly Visitor Activity (Page Views)</h3>
                  <div className="chart-bar-graph">
                    {visitorData.map((data, idx) => (
                      <div key={idx} className="graph-col">
                        <div className="graph-bar-fill" style={{ height: `${(data.views / 80) * 100}%` }}>
                          <span className="graph-tooltip-val">{data.views}</span>
                        </div>
                        <span className="graph-label-date">{data.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* EDIT PROFILE PANEL */}
            {activeTab === 'profile' && (
              <div className="tab-pane-content card animate-fade-in">
                <h3>Edit Profile Information</h3>
                <p className="text-muted" style={{ fontSize: '13px', marginBottom: '20px' }}>Modify the contacts, address, and profile writeup shown in your catalogue.</p>
                
                {profileSaved && (
                  <div className="badge badge-success" style={{ marginBottom: '16px', display: 'block', padding: '12px' }}>
                    ✔ Business Profile updated successfully! Live page updated.
                  </div>
                )}

                <form onSubmit={handleSaveProfileSubmit} className="profile-edit-form">
                  <div className="form-group">
                    <label className="form-label">Business Description</label>
                    <textarea 
                      rows={3} 
                      className="form-input"
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">Contact Call Number</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input 
                        type="email" 
                        className="form-input" 
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Location Address</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                    />
                  </div>

                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">Weekday Hours</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={editWeekdays}
                        onChange={(e) => setEditWeekdays(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Weekend Hours</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={editWeekends}
                        onChange={(e) => setEditWeekends(e.target.value)}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary">Save Profile Changes</button>
                </form>
              </div>
            )}

            {/* MANAGE CATALOG/ITEMS PANEL */}
            {activeTab === 'items' && (
              <div className="tab-pane-content animate-fade-in">
                {/* Add new item form */}
                <div className="card">
                  <h3>Add Catalogue Item / Service</h3>
                  <form onSubmit={handleAddItemSubmit} className="add-item-form" style={{ marginTop: '16px' }}>
                    <div className="grid-3">
                      <div className="form-group">
                        <label className="form-label">Item Name *</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="e.g. Mocha Fudge Latte" 
                          className="form-input form-input-sm"
                          value={newItemName}
                          onChange={(e) => setNewItemName(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Price (₹) *</label>
                        <input 
                          type="number" 
                          required 
                          placeholder="e.g. 180" 
                          className="form-input form-input-sm"
                          value={newItemPrice}
                          onChange={(e) => setNewItemPrice(parseInt(e.target.value) || 0)}
                        />
                      </div>
                      
                      {business.menu ? (
                        <div className="form-group">
                          <label className="form-label">Category *</label>
                          <select 
                            className="form-input form-input-sm"
                            value={newItemCat}
                            onChange={(e) => setNewItemCat(e.target.value)}
                          >
                            <option value="Beverages">Beverages</option>
                            <option value="Main Course">Main Course</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Breads">Artisanal Breads</option>
                          </select>
                        </div>
                      ) : (
                        <div className="form-group select-remove-btn" style={{ paddingBottom: '20px' }}>
                          {/* Filler */}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Item Description</label>
                      <input 
                        type="text" 
                        placeholder="Brief listing details..." 
                        className="form-input form-input-sm"
                        value={newItemDesc}
                        onChange={(e) => setNewItemDesc(e.target.value)}
                      />
                    </div>

                    {business.menu && (
                      <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input 
                          type="checkbox" 
                          id="special-checkbox"
                          checked={newItemSpecial}
                          onChange={(e) => setNewItemSpecial(e.target.checked)}
                        />
                        <label htmlFor="special-checkbox" className="form-label" style={{ margin: 0 }}>Mark as Chef Special</label>
                      </div>
                    )}

                    <button type="submit" className="btn btn-primary btn-sm">Add Item to Live Listing</button>
                  </form>
                </div>

                {/* Items listing table */}
                <div className="card">
                  <h3>Active Catalog Offerings</h3>
                  
                  {business.menu ? (
                    <div className="table-wrapper" style={{ marginTop: '16px' }}>
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Item Name</th>
                            <th>Menu Category</th>
                            <th>Pricing</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {business.menu.map((item, idx) => (
                            <tr key={idx}>
                              <td>
                                <strong>{item.name}</strong>
                                {item.isSpecial && <span className="special-tag-label" style={{ marginLeft: '8px' }}>SPECIAL</span>}
                              </td>
                              <td>{item.category}</td>
                              <td><strong>₹{item.price}</strong></td>
                              <td>
                                <button className="action-icon-btn suspend-btn" onClick={() => handleDeleteItem(idx, true)}>
                                  <Trash2 size={12} /> Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="table-wrapper" style={{ marginTop: '16px' }}>
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Service Name</th>
                            <th>Pricing</th>
                            <th>Description</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {business.services.map((ser, idx) => (
                            <tr key={idx}>
                              <td><strong>{ser.name}</strong></td>
                              <td><strong>₹{ser.price}</strong></td>
                              <td>{ser.description}</td>
                              <td>
                                <button className="action-icon-btn suspend-btn" onClick={() => handleDeleteItem(idx, false)}>
                                  <Trash2 size={12} /> Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* OFFERS & PROMOS PANEL */}
            {activeTab === 'offers' && (
              <div className="tab-pane-content animate-fade-in">
                {/* Create coupon form */}
                <div className="card">
                  <h3>Generate New Coupon Code</h3>
                  <form onSubmit={handleAddOfferSubmit} className="add-offer-form" style={{ marginTop: '16px' }}>
                    <div className="grid-3">
                      <div className="form-group">
                        <label className="form-label">Coupon Code *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. DIWALI50" 
                          className="form-input form-input-sm"
                          value={newOfferCode}
                          onChange={(e) => setNewOfferCode(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Discount Value *</label>
                        <input 
                          type="number" 
                          required
                          className="form-input form-input-sm"
                          value={newOfferVal}
                          onChange={(e) => setNewOfferVal(parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Discount Type *</label>
                        <select 
                          className="form-input form-input-sm"
                          value={newOfferPercent ? 'percent' : 'flat'}
                          onChange={(e) => setNewOfferPercent(e.target.value === 'percent')}
                        >
                          <option value="percent">Percentage (%) Off</option>
                          <option value="flat">Flat Amount (₹) Off</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Offer Headline *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. Save flat ₹150 on bill" 
                          className="form-input form-input-sm"
                          value={newOfferTitle}
                          onChange={(e) => setNewOfferTitle(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Description / Guidelines</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Valid on bookings above ₹1000..." 
                          className="form-input form-input-sm"
                          value={newOfferDesc}
                          onChange={(e) => setNewOfferDesc(e.target.value)}
                        />
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-sm">Launch Promo Code</button>
                  </form>
                </div>

                {/* Coupons active listings */}
                <div className="card">
                  <h3>Active Coupon codes</h3>
                  <div className="table-wrapper" style={{ marginTop: '16px' }}>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Promo Code</th>
                          <th>Headline & Rules</th>
                          <th>Value</th>
                          <th>Activity Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {business.offers.map(offer => (
                          <tr key={offer.id}>
                            <td><span className="promo-code">{offer.code}</span></td>
                            <td>
                              <strong>{offer.title}</strong>
                              <p className="text-muted" style={{ fontSize: '11px', margin: 0 }}>{offer.description}</p>
                            </td>
                            <td>{offer.isPercentage ? `${offer.discountValue}%` : `₹${offer.discountValue}`}</td>
                            <td>
                              <button 
                                className={`action-icon-btn ${offer.active ? 'suspend-btn' : 'check-btn'}`}
                                onClick={() => handleToggleOffer(offer.id)}
                              >
                                {offer.active ? 'Disable Coupon' : 'Enable Coupon'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* LEADS & BOOKINGS PANEL */}
            {activeTab === 'leads' && (
              <div className="tab-pane-content card animate-fade-in">
                <h3>Appointment Bookings & Order Leads</h3>
                <p className="text-muted" style={{ fontSize: '13px', marginBottom: '20px' }}>Review leads submitted by clients on your page. Mark slots complete once service is resolved.</p>
                
                <div className="table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Customer</th>
                        <th>Type</th>
                        <th>Request Details</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.length > 0 ? (
                        leads.map(lead => (
                          <tr key={lead.id}>
                            <td>
                              <div className="table-lead-sender">
                                <strong>{lead.name}</strong>
                                <span>📞 {lead.phone}</span>
                                <span className="text-muted" style={{ fontSize: '11px' }}>{lead.date}</span>
                              </div>
                            </td>
                            <td>
                              {lead.type === 'booking' ? (
                                <span className="badge badge-primary">📅 BOOKING</span>
                              ) : lead.type === 'order' ? (
                                <span className="badge badge-success">🛒 ORDER</span>
                              ) : (
                                <span className="badge badge-warning">💬 INQUIRY</span>
                              )}
                            </td>
                            <td>
                              <div className="lead-msg-cell">
                                <p className="lead-msg-txt">"{lead.message}"</p>
                                {lead.serviceBooked && (
                                  <div className="lead-meta-sub">
                                    <span>Service: <strong>{lead.serviceBooked}</strong></span>
                                    <span>Date/Time: <strong>{lead.appointmentDate} @ {lead.appointmentTime}</strong></span>
                                  </div>
                                )}
                                {lead.orderItems && (
                                  <div className="lead-meta-sub">
                                    <span>Cart: <strong>{lead.orderItems}</strong></span>
                                    <span>Total: <strong>₹{lead.orderTotal}</strong></span>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td>
                              {lead.status === 'resolved' ? (
                                <span className="badge badge-success">COMPLETED</span>
                              ) : (
                                <span className="badge badge-warning">ACTION PENDING</span>
                              )}
                            </td>
                            <td>
                              {lead.status === 'pending' ? (
                                <button className="action-icon-btn check-btn" onClick={() => handleResolveBooking(lead.id)}>
                                  Mark Completed
                                </button>
                              ) : (
                                <span className="text-muted" style={{ fontSize: '12px' }}>Resolved</span>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="text-center" style={{ padding: '40px 0' }}>
                            <p className="text-muted">No appointments or orders collected yet.</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SUBSCRIPTION INVOICES */}
            {activeTab === 'invoices' && (
              <div className="tab-pane-content card animate-fade-in">
                <h3>Subscription Payments & Invoices</h3>
                <p className="text-muted" style={{ fontSize: '13px', marginBottom: '20px' }}>Download or view invoices generated for your monthly Syntro Tech platform subscription.</p>

                <div className="table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Invoice ID</th>
                        <th>Reference Plan</th>
                        <th>Billing Period</th>
                        <th>Paid Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map(inv => (
                        <tr key={inv.id}>
                          <td><strong>{inv.id}</strong></td>
                          <td>{inv.planName}</td>
                          <td>{inv.billingPeriod}</td>
                          <td><strong>₹{inv.amount}</strong></td>
                          <td><span className="badge badge-success">PAID</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}
