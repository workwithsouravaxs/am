import React, { useState } from 'react';
import { LayoutDashboard, CheckSquare, Users, FileText, TrendingUp, DollarSign, Check, ExternalLink } from 'lucide-react';
import { getBusinesses, getLeads, getInvoices, getGlobalAnalytics, saveBusiness, updateLeadStatus, addInvoice } from '../utils/stateManager';
import type { Business, LeadItem, InvoiceItem } from '../types';
import './AdminDashboard.css';

type AdminTab = 'analytics' | 'listings' | 'leads' | 'invoices';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>('listings');
  
  // Storage states
  const [businesses, setBusinesses] = useState<Business[]>(getBusinesses());
  const [leads, setLeads] = useState<LeadItem[]>(getLeads());
  const [invoices, setInvoices] = useState<InvoiceItem[]>(getInvoices());
  const [analytics, setAnalytics] = useState(getGlobalAnalytics());

  // Invoice creator form state
  const [invBusinessId, setInvBusinessId] = useState('');
  const [invAmount, setInvAmount] = useState(99);
  const [invPlan, setInvPlan] = useState('Digital Catalogue');
  const [showInvForm, setShowInvForm] = useState(false);

  // Reloads all states
  const refreshState = () => {
    setBusinesses(getBusinesses());
    setLeads(getLeads());
    setInvoices(getInvoices());
    setAnalytics(getGlobalAnalytics());
  };

  // Verify/Approve Business
  const handleVerifyBusiness = (bizId: string) => {
    const biz = businesses.find(b => b.id === bizId);
    if (biz) {
      biz.status = 'active';
      saveBusiness(biz);
      refreshState();
    }
  };

  // Suspend/Deactivate Business
  const handleSuspendBusiness = (bizId: string) => {
    const biz = businesses.find(b => b.id === bizId);
    if (biz) {
      biz.status = biz.status === 'suspended' ? 'active' : 'suspended';
      saveBusiness(biz);
      refreshState();
    }
  };

  // Resolve Lead Inquiries
  const handleResolveLead = (leadId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'resolved' ? 'pending' : 'resolved';
    updateLeadStatus(leadId, nextStatus);
    refreshState();
  };

  // Manual Invoice Generation
  const handleGenerateInvoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invBusinessId) return;

    const biz = businesses.find(b => b.id === invBusinessId);
    if (biz) {
      addInvoice({
        businessId: invBusinessId,
        businessName: biz.name,
        amount: invAmount,
        planName: invPlan,
        billingPeriod: `Billing: ${new Date().toLocaleDateString()} - Monthly renewal`
      });
      refreshState();
      setInvBusinessId('');
      setInvAmount(99);
      setInvPlan('Digital Catalogue');
      setShowInvForm(false);
    }
  };

  return (
    <div className="admin-dashboard-page animate-fade-in">
      <header className="page-header admin-header text-center">
        <div className="container">
          <span className="badge badge-warning">🛡 Administrative Portal</span>
          <h1 className="page-title">Syntro Tech Core Dashboard</h1>
          <p className="page-subtitle">Track conversions, manage business registrations, handle client leads, and monitor MRR invoices.</p>
        </div>
      </header>

      <section className="section dashboard-content-section">
        <div className="container dashboard-grid">
          
          {/* SIDEBAR NAVIGATION */}
          <div className="dashboard-sidebar card glass">
            <h3 className="sidebar-title">Manage Controls</h3>
            <ul className="sidebar-links">
              <li>
                <button 
                  className={`sidebar-tab-btn ${activeTab === 'listings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('listings')}
                >
                  <Users size={18} />
                  <span>Business Directory</span>
                  {businesses.filter(b => b.status === 'pending').length > 0 && (
                    <span className="count-badge-sidebar badge-warn">{businesses.filter(b => b.status === 'pending').length}</span>
                  )}
                </button>
              </li>
              <li>
                <button 
                  className={`sidebar-tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
                  onClick={() => setActiveTab('analytics')}
                >
                  <LayoutDashboard size={18} />
                  <span>Global Analytics</span>
                </button>
              </li>
              <li>
                <button 
                  className={`sidebar-tab-btn ${activeTab === 'leads' ? 'active' : ''}`}
                  onClick={() => setActiveTab('leads')}
                >
                  <CheckSquare size={18} />
                  <span>Collected Leads</span>
                  {leads.filter(l => l.status === 'pending').length > 0 && (
                    <span className="count-badge-sidebar">{leads.filter(l => l.status === 'pending').length}</span>
                  )}
                </button>
              </li>
              <li>
                <button 
                  className={`sidebar-tab-btn ${activeTab === 'invoices' ? 'active' : ''}`}
                  onClick={() => setActiveTab('invoices')}
                >
                  <FileText size={18} />
                  <span>Sub Invoices</span>
                </button>
              </li>
            </ul>
          </div>

          {/* MAIN WORK AREA */}
          <div className="dashboard-main-area">
            
            {/* TAB CONTENT: ANALYTICS */}
            {activeTab === 'analytics' && (
              <div className="tab-pane-content animate-fade-in">
                {/* Metric cards */}
                <div className="grid-3 admin-metric-cards">
                  <div className="card metric-card">
                    <div className="metric-header-row">
                      <DollarSign size={20} className="met-icon blue" />
                      <span className="met-lbl">Monthly Recurring Revenue (MRR)</span>
                    </div>
                    <h2 className="met-val">₹{analytics.mrr.toLocaleString()}</h2>
                    <p className="met-footer text-success">🟢 Active billing pools</p>
                  </div>

                  <div className="card metric-card">
                    <div className="metric-header-row">
                      <Users size={20} className="met-icon green" />
                      <span className="met-lbl">Subscribed Businesses</span>
                    </div>
                    <h2 className="met-val">{analytics.totalSubscribers}</h2>
                    <p className="met-footer text-muted">
                      ({analytics.catalogueCount} Catalogue, {analytics.websiteCount} Sites)
                    </p>
                  </div>

                  <div className="card metric-card">
                    <div className="metric-header-row">
                      <TrendingUp size={20} className="met-icon orange" />
                      <span className="met-lbl">Average Revenue per Cust (ARPU)</span>
                    </div>
                    <h2 className="met-val">₹{analytics.arpu}</h2>
                    <p className="met-footer text-success">📈 Growth: {analytics.renewalRate}% renewal rate</p>
                  </div>
                </div>

                {/* Subscriptions breakdown */}
                <div className="card analytics-chart-card" style={{ marginTop: '24px' }}>
                  <h3>Dynamic Plan Ratios</h3>
                  <div className="chart-bar-layout">
                    <div className="chart-bar-segment catalogue-fill" style={{ width: `${(analytics.catalogueCount / (analytics.totalSubscribers || 1)) * 100}%` }} title="Catalogue Plans">
                      Catalogue ({Math.round((analytics.catalogueCount / (analytics.totalSubscribers || 1)) * 100)}%)
                    </div>
                    <div className="chart-bar-segment website-fill" style={{ width: `${(analytics.websiteCount / (analytics.totalSubscribers || 1)) * 100}%` }} title="Website Plans">
                      Websites ({Math.round((analytics.websiteCount / (analytics.totalSubscribers || 1)) * 100)}%)
                    </div>
                  </div>
                  <div className="chart-legends">
                    <span className="legend-dot catalogue-dot"></span> <span>₹99-₹399 Catalogue Tier</span>
                    <span className="legend-dot website-dot"></span> <span>₹699-₹999 Website Custom Tier</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: BUSINESS LISTINGS */}
            {activeTab === 'listings' && (
              <div className="tab-pane-content card animate-fade-in">
                <div className="table-header-action-row">
                  <h3>Registered Partner Brands</h3>
                </div>

                <div className="table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Brand Details</th>
                        <th>Location</th>
                        <th>Active Tier</th>
                        <th>Verification Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {businesses.map(biz => (
                        <tr key={biz.id}>
                          <td>
                            <div className="table-biz-cell">
                              <img src={biz.logo} alt={biz.name} className="table-biz-logo" />
                              <div>
                                <strong>{biz.name}</strong>
                                <span className="table-biz-category">{biz.category}</span>
                              </div>
                            </div>
                          </td>
                          <td>{biz.city}</td>
                          <td>
                            <div className="table-plan-cell">
                              <strong>{biz.plan}</strong>
                              <span className="text-muted" style={{ fontSize: '11px' }}>{biz.billingCycle}</span>
                            </div>
                          </td>
                          <td>
                            {biz.status === 'active' ? (
                              <span className="badge badge-success">ACTIVE & LIVE</span>
                            ) : biz.status === 'pending' ? (
                              <span className="badge badge-warning">PENDING APPROVAL</span>
                            ) : (
                              <span className="badge badge-danger">SUSPENDED</span>
                            )}
                          </td>
                          <td>
                            <div className="table-actions-row">
                              {biz.status === 'pending' && (
                                <button 
                                  onClick={() => handleVerifyBusiness(biz.id)} 
                                  className="action-icon-btn check-btn"
                                  title="Approve & Verify Brand"
                                >
                                  <Check size={14} /> Verify
                                </button>
                              )}
                              <button 
                                onClick={() => handleSuspendBusiness(biz.id)} 
                                className={`action-icon-btn ${biz.status === 'suspended' ? 'activate-btn' : 'suspend-btn'}`}
                                title={biz.status === 'suspended' ? 'Activate Brand' : 'Suspend Brand'}
                              >
                                {biz.status === 'suspended' ? 'Activate' : 'Suspend'}
                              </button>
                              <a href={`#/catalogue/${biz.id}`} className="action-icon-btn view-btn" target="_blank" rel="noreferrer">
                                <ExternalLink size={12} /> Live Site
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB CONTENT: LEAD TRACKER */}
            {activeTab === 'leads' && (
              <div className="tab-pane-content card animate-fade-in">
                <div className="table-header-action-row">
                  <h3>Globally Collected Leads & Inquiries</h3>
                </div>

                <div className="table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Sender Details</th>
                        <th>Business Target</th>
                        <th>Inquiry Type</th>
                        <th>Message Content / Details</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map(lead => (
                        <tr key={lead.id}>
                          <td>
                            <div className="table-lead-sender">
                              <strong>{lead.name}</strong>
                              <span>📞 {lead.phone}</span>
                              <span className="text-muted" style={{ fontSize: '11px' }}>{lead.date}</span>
                            </div>
                          </td>
                          <td>
                            <a href={`#/catalogue/${lead.businessId}`} className="lead-biz-link" target="_blank" rel="noreferrer">
                              {lead.businessName}
                            </a>
                          </td>
                          <td>
                            {lead.type === 'booking' ? (
                              <span className="badge badge-primary">📅 APPOINTMENT</span>
                            ) : lead.type === 'order' ? (
                              <span className="badge badge-success">🛒 ORDER REQ</span>
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
                                  <span>Items: <strong>{lead.orderItems}</strong></span>
                                  <span>Total: <strong>₹{lead.orderTotal}</strong></span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td>
                            <button 
                              onClick={() => handleResolveLead(lead.id, lead.status)}
                              className={`action-icon-btn ${lead.status === 'resolved' ? 'resolved-btn' : 'resolve-pending-btn'}`}
                            >
                              {lead.status === 'resolved' ? '✓ Resolved' : 'Mark Resolved'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB CONTENT: INVOICES */}
            {activeTab === 'invoices' && (
              <div className="tab-pane-content card animate-fade-in">
                <div className="table-header-action-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3>Billing & Invoices</h3>
                  <button className="btn btn-primary btn-sm" onClick={() => setShowInvForm(!showInvForm)}>
                    {showInvForm ? 'Cancel' : '➕ Create Manual Invoice'}
                  </button>
                </div>

                {/* Manual invoice form */}
                {showInvForm && (
                  <form onSubmit={handleGenerateInvoiceSubmit} className="manual-invoice-form card bg-light animate-fade-in">
                    <h4>Generate Subscription Invoice</h4>
                    <div className="grid-3" style={{ marginTop: '14px' }}>
                      <div className="form-group">
                        <label className="form-label">Select Business *</label>
                        <select 
                          required
                          className="form-input form-input-sm"
                          value={invBusinessId}
                          onChange={(e) => setInvBusinessId(e.target.value)}
                        >
                          <option value="">-- Choose Business --</option>
                          {businesses.map(b => (
                            <option key={b.id} value={b.id}>{b.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Invoice Amount (₹) *</label>
                        <input 
                          type="number" 
                          required
                          className="form-input form-input-sm"
                          value={invAmount}
                          onChange={(e) => setInvAmount(parseInt(e.target.value) || 0)}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Plan Name / Reference *</label>
                        <input 
                          type="text" 
                          required
                          className="form-input form-input-sm"
                          value={invPlan}
                          onChange={(e) => setInvPlan(e.target.value)}
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-sm">Generate Paid Invoice</button>
                  </form>
                )}

                <div className="table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Invoice Number</th>
                        <th>Business Partner</th>
                        <th>Reference Plan</th>
                        <th>Created Date</th>
                        <th>Amount Paid</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map(inv => (
                        <tr key={inv.id}>
                          <td><strong>{inv.id}</strong></td>
                          <td>{inv.businessName}</td>
                          <td>{inv.planName}</td>
                          <td>{inv.date}</td>
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
