import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  Megaphone,
  BarChart3,
  Layers,
  Wallet,
  TrendingUp,
  Eye,
  MousePointer,
  Target,
  Plus,
  Play,
  Pause,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  FileText,
  Printer,
  Sparkles,
  Download,
  Upload,
  Globe,
  Tv,
  Smartphone,
  Calendar,
  Clock,
  Zap,
  Shield,
  CreditCard,
  Building,
  ArrowUpRight,
  ChevronRight,
  Sliders,
  DollarSign,
  Tag,
  Award,
} from 'lucide-react'
import Screen from '../components/Screen'
import { useAuth } from '../context/AuthContext'
import './SponsorPortal.css'

export default function SponsorPortal() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') || 'campaigns'

  // ---- WALLET STATE ----
  const [walletBalance, setWalletBalance] = useState(84500)

  // ---- CAMPAIGNS STATE ----
  const [campaigns, setCampaigns] = useState([
    {
      id: 'CMP-881',
      title: 'Digital Scorecard Top Banner (All Chennai Matches)',
      format: 'Scorecard Banner (320x50)',
      target: 'Tamil Nadu & Karnataka • Cricket Fans 18-35',
      budget: 50000,
      spent: 35000,
      impressions: 840000,
      clicks: 35280,
      ctr: '4.2%',
      status: 'Live & Delivering',
      startDate: '20 Oct 2026',
      endDate: '15 Nov 2026',
      creativeUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&fit=crop&q=60',
    },
    {
      id: 'CMP-882',
      title: 'Tournament Title Sponsor: Chennai Street Premier Cup',
      format: 'Full Broadcast Rig & Boundary Hoarding',
      target: 'All Platform Viewers • All Matches',
      budget: 75000,
      spent: 50000,
      impressions: 580000,
      clicks: 19720,
      ctr: '3.4%',
      status: 'Live & Delivering',
      startDate: '25 Oct 2026',
      endDate: '20 Nov 2026',
      creativeUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&auto=format&fit=crop&q=60',
    },
    {
      id: 'CMP-883',
      title: 'Post-Match Highlights Video Pre-Roll (15s)',
      format: 'Video Pre-Roll (1080p)',
      target: 'Mobile App Athletes & Fans',
      budget: 40000,
      spent: 0,
      impressions: 0,
      clicks: 0,
      ctr: '0.0%',
      status: 'Scheduled',
      startDate: '10 Nov 2026',
      endDate: '30 Nov 2026',
      creativeUrl: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=600&auto=format&fit=crop&q=60',
    },
  ])

  // ---- CREATIVES LIBRARY ----
  const [creatives, setCreatives] = useState([
    {
      id: 'CRT-01',
      name: 'Velocity High Protein Isolate — Scorecard Banner',
      dimensions: '320x50 & 728x90',
      type: 'Digital Banner',
      activeIn: 'CMP-881',
      clicks: '35.2K',
      thumbnail: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&auto=format&fit=crop&q=60',
    },
    {
      id: 'CRT-02',
      name: 'Broadcast Stream Corner Watermark Bug',
      dimensions: '250x60 PNG Transparent',
      type: 'Stream Bug',
      activeIn: 'CMP-882',
      clicks: '19.7K',
      thumbnail: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&auto=format&fit=crop&q=60',
    },
    {
      id: 'CRT-03',
      name: 'Boundary Perimeter Hoarding Vector Design',
      dimensions: '20ft x 3ft Vector Print',
      type: 'Physical Hoarding',
      activeIn: 'CMP-882',
      clicks: '580K Views',
      thumbnail: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=400&auto=format&fit=crop&q=60',
    },
    {
      id: 'CRT-04',
      name: '15-Second HD Video Pre-Roll: Fuel Your Cricket',
      dimensions: '1920x1080 60FPS MP4',
      type: 'Video Pre-Roll',
      activeIn: 'CMP-883 (Pending)',
      clicks: 'Scheduled',
      thumbnail: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=400&auto=format&fit=crop&q=60',
    },
  ])

  // ---- TRANSACTIONS & INVOICES ----
  const [transactions, setTransactions] = useState([
    { id: 'TXN-SP-901', description: 'Wallet Top-Up via HDFC NetBanking', amount: 50000, type: 'credit', date: '01 Nov 2026', invoiceId: 'INV-SP-801' },
    { id: 'TXN-SP-902', description: 'Campaign Spend Deduction: CMP-881 Scorecard Banner', amount: 35000, type: 'debit', date: '28 Oct 2026', invoiceId: 'INV-SP-802' },
    { id: 'TXN-SP-903', description: 'Campaign Spend Deduction: CMP-882 Title Sponsorship', amount: 50000, type: 'debit', date: '25 Oct 2026', invoiceId: 'INV-SP-803' },
    { id: 'TXN-SP-904', description: 'Initial Brand Partner Wallet Top-Up via UPI', amount: 100000, type: 'credit', date: '20 Oct 2026', invoiceId: 'INV-SP-804' },
  ])

  // Filter state for campaigns tab
  const [campaignFilter, setCampaignFilter] = useState('All')

  // Dedicated Sub-Pages (Strictly Zero Modals)
  const [showNewCampaignPage, setShowNewCampaignPage] = useState(false)
  const [showReportPage, setShowReportPage] = useState(false)
  const [showUploadCreativePage, setShowUploadCreativePage] = useState(false)
  const [showTopUpPage, setShowTopUpPage] = useState(false)
  const [viewingInvoice, setViewingInvoice] = useState(null)

  // Toast feedback
  const [toastMessage, setToastMessage] = useState('')

  function showToast(msg) {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3000)
  }

  // Toggle Campaign Status (Pause / Resume)
  function handleToggleCampaign(id) {
    setCampaigns(prev => prev.map(c => {
      if (c.id === id) {
        const isLive = c.status === 'Live & Delivering'
        const nextStatus = isLive ? 'Paused' : 'Live & Delivering'
        showToast(`Campaign ${c.id} is now ${nextStatus}`)
        return { ...c, status: nextStatus }
      }
      return c
    }))
  }

  // =========================================================================
  // SUB-PAGE 1: LAUNCH NEW AD CAMPAIGN
  // =========================================================================
  if (showNewCampaignPage) {
    return (
      <Screen title="Launch New Ad Campaign" back={() => setShowNewCampaignPage(false)} padded={false}>
        <div className="sponsor-subpage">
          <div className="subpage-header-row">
            <button className="btn btn--secondary btn--sm" onClick={() => setShowNewCampaignPage(false)}>
              ← Back
            </button>
            <span className="pill" style={{ background: 'rgba(255,214,0,0.15)', color: '#ffd600', fontWeight: 800 }}>
              CAMPAIGN SETUP
            </span>
          </div>

          <div className="sp-card">
            <h2 className="sp-card-title">Configure Tournament Brand Campaign</h2>
            <p className="sp-card-sub">
              Target cricket fans and registered tournament athletes across live digital scorecards, broadcast streams, and highlight reels.
            </p>

            <label className="sp-label">Campaign Title</label>
            <input className="sp-input" placeholder="e.g. Energy Drink Flash Sale — State Finals" id="cmp-name" defaultValue="Energy Drink Flash Sale — State Finals" />

            <label className="sp-label" style={{ marginTop: 12 }}>Ad Format & Placement</label>
            <select className="sp-input" id="cmp-fmt">
              <option>Digital Scorecard Sticky Banner (320x50 / 728x90)</option>
              <option>Live Stream TV Broadcast Bug (Top-Right Watermark)</option>
              <option>15-Second Match Break Video Pre-Roll</option>
              <option>Boundary Perimeter Hoarding (20x3ft Physical + Stream)</option>
              <option>Player of the Match Co-Branded Award</option>
            </select>

            <label className="sp-label" style={{ marginTop: 12 }}>Target Geographic Region</label>
            <select className="sp-input" id="cmp-geo">
              <option>All India Cricket Tournaments (National Reach)</option>
              <option>Tamil Nadu & Karnataka (Chennai, Bangalore, Coimbatore)</option>
              <option>Maharashtra & Goa (Mumbai, Pune, Nagpur)</option>
              <option>North Zone (Delhi NCR, Punjab, Haryana)</option>
            </select>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
              <div>
                <label className="sp-label">Total Campaign Budget (₹)</label>
                <input className="sp-input" type="number" id="cmp-bud" defaultValue="35000" />
              </div>
              <div>
                <label className="sp-label">Daily Spend Cap (₹)</label>
                <input className="sp-input" type="number" id="cmp-cap" defaultValue="5000" />
              </div>
            </div>

            <label className="sp-label" style={{ marginTop: 12 }}>Target Destination URL (Where clicks lead)</label>
            <input className="sp-input" placeholder="https://velocitysports.in/cricket-offer" defaultValue="https://velocitysports.in/cricket-offer" />

            <div className="wallet-check-bar" style={{ marginTop: 16 }}>
              <Wallet size={16} color="#ffd600" />
              <span>Available Ad Wallet: <strong>₹{walletBalance.toLocaleString()}</strong></span>
            </div>

            <button
              type="button"
              className="btn btn--primary"
              style={{ width: '100%', marginTop: 16, padding: 14, fontWeight: 800 }}
              onClick={() => {
                const bud = 35000
                if (walletBalance < bud) {
                  return alert('Insufficient ad wallet balance. Please top up your wallet.')
                }
                const newCmp = {
                  id: `CMP-${Math.floor(100 + Math.random() * 900)}`,
                  title: 'Energy Drink Flash Sale — State Finals',
                  format: 'Digital Scorecard Sticky Banner',
                  target: 'Tamil Nadu & Karnataka • Cricket Fans 18-35',
                  budget: bud,
                  spent: 0,
                  impressions: 0,
                  clicks: 0,
                  ctr: '0.0%',
                  status: 'Live & Delivering',
                  startDate: 'Today',
                  endDate: '30 Nov 2026',
                  creativeUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&fit=crop&q=60',
                }
                setCampaigns([newCmp, ...campaigns])
                setWalletBalance(b => b - bud)
                setShowNewCampaignPage(false)
                showToast('Campaign launched! Delivering across live tournament scorecards.')
              }}
            >
              🚀 Launch Campaign Live
            </button>
          </div>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // SUB-PAGE 2: COMPREHENSIVE CAMPAIGN PERFORMANCE & ROI REPORT
  // =========================================================================
  if (showReportPage) {
    return (
      <Screen title="Campaign Performance & ROI Audit" back={() => setShowReportPage(false)} padded={false}>
        <div className="sponsor-subpage">
          <div className="subpage-header-row">
            <button className="btn btn--secondary btn--sm" onClick={() => setShowReportPage(false)}>
              ← Back
            </button>
            <button className="btn btn--secondary btn--sm" onClick={() => window.print()}>
              <Printer size={14} /> Print Audit
            </button>
          </div>

          <div className="sp-card printable-invoice">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 18, color: '#f8fafc' }}>Velocity Sports Nutrition</h2>
                <span style={{ fontSize: 11, color: '#ffd600', fontWeight: 700 }}>OFFICIAL BRAND SPONSOR AUDIT</span>
              </div>
              <span className="pill" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676', fontWeight: 800 }}>
                AUDITED & VERIFIED
              </span>
            </div>

            <hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '14px 0' }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 14 }}>
              <div className="report-metric-box">
                <span>TOTAL IMPRESSIONS</span>
                <strong>1,420,000</strong>
              </div>
              <div className="report-metric-box">
                <span>VERIFIED CLICKS</span>
                <strong>55,000</strong>
              </div>
              <div className="report-metric-box">
                <span>AVERAGE CTR</span>
                <strong style={{ color: '#00e676' }}>3.82%</strong>
              </div>
            </div>

            <h4 style={{ color: '#f8fafc', fontSize: 13, margin: '16px 0 8px' }}>Audited Match Placements Breakdown</h4>
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>Placement Channel</th>
                  <th>Impressions</th>
                  <th>Clicks</th>
                  <th style={{ textAlign: 'right' }}>CTR</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Live Mobile Scorecard Banner (320x50)</td>
                  <td>840,000</td>
                  <td>35,280</td>
                  <td style={{ textAlign: 'right', color: '#00e676', fontWeight: 700 }}>4.2%</td>
                </tr>
                <tr>
                  <td>Broadcast Live Stream TV Bug (Corner Logo)</td>
                  <td>380,000</td>
                  <td>12,920</td>
                  <td style={{ textAlign: 'right', color: '#00e676', fontWeight: 700 }}>3.4%</td>
                </tr>
                <tr>
                  <td>Boundary Hoardings & Perimeter Signs</td>
                  <td>200,000</td>
                  <td>6,800</td>
                  <td style={{ textAlign: 'right', color: '#00e676', fontWeight: 700 }}>3.4%</td>
                </tr>
                <tr className="invoice-total-row">
                  <td>Total Brand Value Generated</td>
                  <td colSpan="3" style={{ textAlign: 'right', color: '#ffd600', fontWeight: 800 }}>
                    ₹4,05,600 (Est. 4.8x ROI)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // SUB-PAGE 3: UPLOAD CREATIVE BANNER ASSET
  // =========================================================================
  if (showUploadCreativePage) {
    return (
      <Screen title="Upload Creative Asset" back={() => setShowUploadCreativePage(false)} padded={false}>
        <div className="sponsor-subpage">
          <div className="subpage-header-row">
            <button className="btn btn--secondary btn--sm" onClick={() => setShowUploadCreativePage(false)}>
              ← Back
            </button>
            <span className="pill" style={{ background: 'rgba(56,189,248,0.15)', color: '#38bdf8', fontWeight: 800 }}>
              ASSET SPEC
            </span>
          </div>

          <div className="sp-card">
            <h2 className="sp-card-title">Upload Brand Creative Banner / Video</h2>
            <p className="sp-card-sub">
              Upload high-resolution transparent logos, scoreboard sticky banners, or 60fps MP4 stinger video ads.
            </p>

            <label className="sp-label">Creative Name</label>
            <input className="sp-input" placeholder="e.g. Velocity Energy Drink Summer Campaign" defaultValue="Velocity Energy Drink Summer Campaign" />

            <label className="sp-label" style={{ marginTop: 12 }}>Creative Format</label>
            <select className="sp-input">
              <option>Mobile Scorecard Banner (320x50 PNG / JPG)</option>
              <option>Desktop Scorecard Leaderboard (728x90 PNG / JPG)</option>
              <option>Broadcast Watermark Bug (250x60 Transparent PNG)</option>
              <option>HD 1080p Video Pre-Roll (15s MP4 60FPS)</option>
              <option>Boundary Hoarding Print Vector (20ft x 3ft PDF/EPS)</option>
            </select>

            <label className="sp-label" style={{ marginTop: 12 }}>Target CTA Action</label>
            <select className="sp-input">
              <option>Shop Online (External Store Link)</option>
              <option>Exclusive Coupon Code (In-App Reveal)</option>
              <option>Brand Video Watch (App Reels)</option>
            </select>

            {/* Simulated file dropzone */}
            <div className="upload-dropzone" style={{ marginTop: 14 }}>
              <Upload size={32} color="#ffd600" />
              <strong style={{ color: '#f8fafc', fontSize: 13, display: 'block', marginTop: 8 }}>
                Tap to Select Graphic Banner or Video File
              </strong>
              <small style={{ color: '#94a3b8' }}>PNG, JPG, SVG, MP4 up to 50MB</small>
            </div>

            <button
              type="button"
              className="btn btn--primary"
              style={{ width: '100%', marginTop: 20, padding: 14 }}
              onClick={() => {
                const newAsset = {
                  id: `CRT-0${creatives.length + 1}`,
                  name: 'Velocity Energy Drink Summer Campaign',
                  dimensions: '320x50 & 728x90',
                  type: 'Digital Banner',
                  activeIn: 'Ready for Assignment',
                  clicks: '0 Clicks',
                  thumbnail: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&auto=format&fit=crop&q=60',
                }
                setCreatives([newAsset, ...creatives])
                setShowUploadCreativePage(false)
                showToast('Creative asset uploaded and approved by Ad Standards!')
              }}
            >
              Upload & Save Asset
            </button>
          </div>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // SUB-PAGE 4: TOP-UP AD WALLET
  // =========================================================================
  if (showTopUpPage) {
    return (
      <Screen title="Top-Up Ad Wallet" back={() => setShowTopUpPage(false)} padded={false}>
        <div className="sponsor-subpage">
          <div className="subpage-header-row">
            <button className="btn btn--secondary btn--sm" onClick={() => setShowTopUpPage(false)}>
              ← Back
            </button>
            <span className="pill" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676', fontWeight: 800 }}>
              INSTANT DEPOSIT
            </span>
          </div>

          <div className="sp-card">
            <h2 className="sp-card-title">Add Funds to Prepaid Ad Wallet</h2>
            <div className="payout-balance-box">
              <span style={{ fontSize: 12, color: '#94a3b8' }}>CURRENT WALLET BALANCE</span>
              <strong style={{ fontSize: 32, color: '#ffd600', display: 'block', margin: '4px 0' }}>
                ₹{walletBalance.toLocaleString()}
              </strong>
              <small style={{ color: '#00e676' }}>100% Tax Deductible (18% GST Invoiced)</small>
            </div>

            <label className="sp-label" style={{ marginTop: 16 }}>Select Deposit Amount</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 12 }}>
              {[25000, 50000, 100000].map(amt => (
                <button
                  key={amt}
                  type="button"
                  className="btn btn--secondary"
                  style={{ fontSize: 13, fontWeight: 800, padding: 12 }}
                  onClick={() => {
                    setWalletBalance(b => b + amt)
                    setTransactions([
                      {
                        id: `TXN-SP-${Math.floor(100 + Math.random() * 900)}`,
                        description: `Ad Wallet Deposit via NetBanking`,
                        amount: amt,
                        type: 'credit',
                        date: 'Today',
                        invoiceId: `INV-SP-${Math.floor(100 + Math.random() * 900)}`,
                      },
                      ...transactions,
                    ])
                    setShowTopUpPage(false)
                    showToast(`Successfully added ₹${amt.toLocaleString()} to your Ad Wallet!`)
                  }}
                >
                  + ₹{(amt / 1000)}K
                </button>
              ))}
            </div>

            <label className="sp-label">Payment Method</label>
            <div className="bank-account-tile" style={{ marginBottom: 16 }}>
              <CreditCard size={18} color="#00e676" />
              <div>
                <strong style={{ fontSize: 13, color: '#f8fafc', display: 'block' }}>Corporate NetBanking / UPI QR</strong>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>Instant credit with zero transaction surcharge</span>
              </div>
            </div>

            <button
              type="button"
              className="btn btn--primary"
              style={{ width: '100%', padding: 14 }}
              onClick={() => {
                setWalletBalance(b => b + 50000)
                setShowTopUpPage(false)
                showToast('Successfully added ₹50,000 to your Ad Wallet!')
              }}
            >
              Deposit ₹50,000 (Recommended)
            </button>
          </div>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // SUB-PAGE 5: OFFICIAL GST TAX INVOICE
  // =========================================================================
  if (viewingInvoice) {
    return (
      <Screen title="GST Tax Invoice" back={() => setViewingInvoice(null)} padded={false}>
        <div className="sponsor-subpage">
          <div className="subpage-header-row">
            <button className="btn btn--secondary btn--sm" onClick={() => setViewingInvoice(null)}>
              ← Back
            </button>
            <button className="btn btn--secondary btn--sm" onClick={() => window.print()}>
              <Printer size={14} /> Print Invoice
            </button>
          </div>

          <div className="sp-card printable-invoice">
            <div className="invoice-header">
              <div>
                <h2 style={{ margin: 0, fontSize: 18, color: '#f8fafc' }}>Scoring Heroes Advertising Media</h2>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>GSTIN: 27AABCS8849L1Z5 • Mumbai, MH</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="pill" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676', fontWeight: 800 }}>PAID</span>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>Invoice: {viewingInvoice.invoiceId}</div>
              </div>
            </div>

            <hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '14px 0' }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
              <div>
                <span style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase' }}>Billed To (Advertiser)</span>
                <strong style={{ fontSize: 13, color: '#f8fafc', display: 'block' }}>Velocity Sports Nutrition & Media</strong>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>GSTIN: 33AAACV9841K1Z3</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase' }}>Transaction Date</span>
                <strong style={{ fontSize: 13, color: '#f8fafc', display: 'block' }}>{viewingInvoice.date}</strong>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>Ref: {viewingInvoice.id}</span>
              </div>
            </div>

            <table className="invoice-table">
              <thead>
                <tr>
                  <th>Item Description</th>
                  <th style={{ textAlign: 'right' }}>Taxable Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{viewingInvoice.description} (SAC Code: 998361 - Ad Services)</td>
                  <td style={{ textAlign: 'right' }}>₹{(viewingInvoice.amount * 0.8475).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>CGST (9%)</td>
                  <td style={{ textAlign: 'right' }}>₹{(viewingInvoice.amount * 0.07625).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>SGST (9%)</td>
                  <td style={{ textAlign: 'right' }}>₹{(viewingInvoice.amount * 0.07625).toFixed(2)}</td>
                </tr>
                <tr className="invoice-total-row">
                  <td>Total Invoiced & Settled</td>
                  <td style={{ textAlign: 'right', color: '#ffd600', fontWeight: 800 }}>
                    ₹{viewingInvoice.amount.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // MAIN BRAND SPONSOR PORTAL
  // =========================================================================
  const filteredCampaigns = campaignFilter === 'All'
    ? campaigns
    : campaigns.filter(c => c.status.toLowerCase().includes(campaignFilter.toLowerCase()))

  return (
    <Screen
      title="Brand Campaign Hub & Sponsor Desk"
      back={() => navigate('/app')}
      padded={false}
      right={
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Wallet size={16} color="#ffd600" />
          <span style={{ fontSize: 12, fontWeight: 800, color: '#ffd600' }}>
            ₹{walletBalance.toLocaleString()}
          </span>
        </div>
      }
    >
      <div className="sponsor-portal-page">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="streamer-toast" style={{ borderColor: '#ffd600' }}>
            <CheckCircle2 size={16} color="#ffd600" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Sponsor Brand Hero Card */}
        <section className="sponsor-hero-card">
          <div className="sponsor-hero-top">
            <div className="sponsor-brand-avatar">
              <Megaphone size={24} color="#ffd600" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <h1 className="sponsor-brand-title">Velocity Sports Nutrition</h1>
                <span className="sh-badge-chip" style={{ color: '#ffd600', borderColor: 'rgba(255,214,0,0.3)' }}>
                  OFFICIAL TITLE SPONSOR
                </span>
              </div>
              <p className="sponsor-brand-sub">
                Advertiser: <strong>Vikramaditya Rao</strong> • HQ: Mumbai, India
              </p>
            </div>

            {/* Quick Top-Up CTA */}
            <button
              type="button"
              className="wallet-topup-btn"
              onClick={() => setShowTopUpPage(true)}
            >
              + Top-Up Ad Wallet
            </button>
          </div>

          {/* KPI Analytics Bar */}
          <div className="sponsor-telemetry-grid">
            <div className="telemetry-box">
              <span className="telemetry-label">IMPRESSIONS</span>
              <strong className="telemetry-val" style={{ color: '#ffd600' }}>1.42M</strong>
            </div>
            <div className="telemetry-box">
              <span className="telemetry-label">AVG CTR</span>
              <strong className="telemetry-val" style={{ color: '#00e676' }}>3.82%</strong>
            </div>
            <div className="telemetry-box">
              <span className="telemetry-label">EST. ROI</span>
              <strong className="telemetry-val" style={{ color: '#38bdf8' }}>4.8x</strong>
            </div>
            <div className="telemetry-box">
              <span className="telemetry-label">CAMPAIGNS</span>
              <strong className="telemetry-val" style={{ color: '#f8fafc' }}>{campaigns.length} Active</strong>
            </div>
          </div>
        </section>

        {/* 4 Dedicated Tabs Navigation */}
        <div className="sponsor-tabs-bar">
          {[
            { id: 'campaigns', label: 'Ad Campaigns', icon: Megaphone },
            { id: 'analytics', label: 'ROI Analytics', icon: BarChart3 },
            { id: 'creatives', label: 'Brand Assets', icon: Layers },
            { id: 'wallet', label: 'Ad Wallet & Tax', icon: Wallet },
          ].map(tab => {
            const Icon = tab.icon
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                className={`sponsor-tab-btn ${active ? 'active' : ''}`}
                onClick={() => setSearchParams({ tab: tab.id })}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* ===================================================================
            TAB 1: 📢 ACTIVE AD CAMPAIGNS
           =================================================================== */}
        {activeTab === 'campaigns' && (
          <div className="sponsor-tab-content">
            {/* Top Action Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {['All', 'Live', 'Scheduled'].map(f => (
                  <button
                    key={f}
                    type="button"
                    className={`pill ${campaignFilter === f ? 'is-active' : ''}`}
                    style={{
                      background: campaignFilter === f ? '#ffd600' : 'rgba(255,255,255,0.05)',
                      color: campaignFilter === f ? '#0a1628' : '#94a3b8',
                      cursor: 'pointer',
                      fontWeight: campaignFilter === f ? 800 : 600,
                      fontSize: 11,
                    }}
                    onClick={() => setCampaignFilter(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="btn btn--primary btn--sm"
                style={{ background: '#ffd600', color: '#0a1628', fontWeight: 800, padding: '7px 14px' }}
                onClick={() => setShowNewCampaignPage(true)}
              >
                + New Campaign
              </button>
            </div>

            {/* Campaigns Feed List */}
            <div className="campaigns-feed-list">
              {filteredCampaigns.map(cmp => {
                const isLive = cmp.status === 'Live & Delivering'
                const spentPct = Math.min(100, Math.round((cmp.spent / cmp.budget) * 100))

                return (
                  <div key={cmp.id} className="campaign-card">
                    <div className="cmp-header">
                      <div>
                        <span className="cmp-id-pill">{cmp.id}</span>
                        <strong className="cmp-title">{cmp.title}</strong>
                      </div>
                      <span
                        className="pill"
                        style={{
                          background: isLive ? 'rgba(0,230,118,0.15)' : 'rgba(255,214,0,0.15)',
                          color: isLive ? '#00e676' : '#ffd600',
                          fontSize: 10,
                          fontWeight: 800,
                        }}
                      >
                        {cmp.status}
                      </span>
                    </div>

                    <div className="cmp-meta-grid">
                      <div>
                        <span className="cmp-meta-label">FORMAT</span>
                        <span className="cmp-meta-val">{cmp.format}</span>
                      </div>
                      <div>
                        <span className="cmp-meta-label">AUDIENCE TARGET</span>
                        <span className="cmp-meta-val">{cmp.target}</span>
                      </div>
                      <div>
                        <span className="cmp-meta-label">IMPRESSIONS</span>
                        <span className="cmp-meta-val" style={{ color: '#ffd600', fontWeight: 800 }}>
                          {cmp.impressions.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="cmp-meta-label">CLICKS / CTR</span>
                        <span className="cmp-meta-val" style={{ color: '#00e676', fontWeight: 800 }}>
                          {cmp.clicks.toLocaleString()} ({cmp.ctr})
                        </span>
                      </div>
                    </div>

                    {/* Spend Progress Bar */}
                    <div style={{ marginTop: 10 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                        <span style={{ color: '#94a3b8' }}>Budget Spent: ₹{cmp.spent.toLocaleString()} / ₹{cmp.budget.toLocaleString()}</span>
                        <span style={{ color: '#ffd600', fontWeight: 700 }}>{spentPct}%</span>
                      </div>
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${spentPct}%`, background: '#ffd600' }} />
                      </div>
                    </div>

                    <div className="cmp-actions-row">
                      <button
                        type="button"
                        className="btn btn--secondary btn--sm"
                        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                        onClick={() => handleToggleCampaign(cmp.id)}
                      >
                        {isLive ? <Pause size={13} /> : <Play size={13} />}
                        <span>{isLive ? 'Pause Delivery' : 'Resume Campaign'}</span>
                      </button>
                      <button
                        type="button"
                        className="btn btn--secondary btn--sm"
                        onClick={() => setShowReportPage(true)}
                      >
                        <BarChart3 size={13} /> Analytics
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 2: 📊 LIVE IMPRESSION & CTR ANALYTICS
           =================================================================== */}
        {activeTab === 'analytics' && (
          <div className="sponsor-tab-content">
            {/* Top Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#38bdf8' }}>REAL-TIME ATTRIBUTION & ROI</span>
              <button className="btn btn--secondary btn--sm" onClick={() => setShowReportPage(true)}>
                <FileText size={13} /> Full Audit Report
              </button>
            </div>

            {/* 4 Analytics KPI Cards */}
            <div className="analytics-kpi-grid">
              <div className="ana-kpi-card highlight">
                <span className="ana-kpi-label">TOTAL IMPRESSIONS</span>
                <strong className="ana-kpi-val" style={{ color: '#ffd600' }}>1,420,000</strong>
                <span className="ana-kpi-sub">Across 42 Live Matches</span>
              </div>
              <div className="ana-kpi-card">
                <span className="ana-kpi-label">VERIFIED CLICKS</span>
                <strong className="ana-kpi-val" style={{ color: '#00e676' }}>55,000</strong>
                <span className="ana-kpi-sub">Avg CPC: ₹1.80</span>
              </div>
              <div className="ana-kpi-card">
                <span className="ana-kpi-label">PLATFORM AVG CTR</span>
                <strong className="ana-kpi-val" style={{ color: '#38bdf8' }}>3.82%</strong>
                <span className="ana-kpi-sub">2.4x Industry Benchmark</span>
              </div>
              <div className="ana-kpi-card">
                <span className="ana-kpi-label">ESTIMATED BRAND VALUE</span>
                <strong className="ana-kpi-val" style={{ color: '#f8fafc' }}>₹4,05,600</strong>
                <span className="ana-kpi-sub">4.8x Direct Sales ROI</span>
              </div>
            </div>

            {/* 7-Day Matchday Impression Chart (Interactive CSS Bars) */}
            <div className="sp-card">
              <h3 className="sp-card-title">7-Day Tournament Matchday Volume</h3>
              <p className="sp-card-sub">Daily impressions delivered across live scorecards and video streams.</p>

              <div className="chart-bar-container">
                {[
                  { day: 'Mon', count: '120K', height: '35%' },
                  { day: 'Tue', count: '145K', height: '42%' },
                  { day: 'Wed', count: '180K', height: '52%' },
                  { day: 'Thu', count: '160K', height: '46%' },
                  { day: 'Fri (Q/F)', count: '290K', height: '70%', highlight: true },
                  { day: 'Sat (S/F)', count: '420K', height: '90%', highlight: true },
                  { day: 'Sun (Final)', count: '580K', height: '100%', highlight: true },
                ].map((bar, i) => (
                  <div key={i} className="chart-bar-col">
                    <span className="chart-bar-val">{bar.count}</span>
                    <div className="chart-bar-track">
                      <div
                        className={`chart-bar-fill ${bar.highlight ? 'peak' : ''}`}
                        style={{ height: bar.height }}
                      />
                    </div>
                    <span className="chart-bar-day">{bar.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Audience Demographics & Geography */}
            <div className="sp-card">
              <h3 className="sp-card-title">Audience Age & Geographic Hubs</h3>
              <div className="demographics-grid">
                <div>
                  <span className="sp-label">AGE BREAKDOWN</span>
                  <div className="demo-row"><span>18–24 yrs</span><strong style={{ color: '#ffd600' }}>42%</strong></div>
                  <div className="demo-row"><span>25–34 yrs</span><strong style={{ color: '#ffd600' }}>38%</strong></div>
                  <div className="demo-row"><span>35–49 yrs</span><strong style={{ color: '#ffd600' }}>14%</strong></div>
                  <div className="demo-row"><span>50+ yrs</span><strong style={{ color: '#ffd600' }}>6%</strong></div>
                </div>
                <div>
                  <span className="sp-label">TOP CRICKET HUBS</span>
                  <div className="demo-row"><span>Chennai</span><strong style={{ color: '#00e676' }}>34%</strong></div>
                  <div className="demo-row"><span>Mumbai</span><strong style={{ color: '#00e676' }}>28%</strong></div>
                  <div className="demo-row"><span>Bengaluru</span><strong style={{ color: '#00e676' }}>20%</strong></div>
                  <div className="demo-row"><span>Hyderabad</span><strong style={{ color: '#00e676' }}>12%</strong></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 3: 🎨 CREATIVE BANNER & ASSET MANAGER
           =================================================================== */}
        {activeTab === 'creatives' && (
          <div className="sponsor-tab-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div>
                <h3 className="sp-card-title" style={{ margin: 0 }}>Approved Brand Creatives ({creatives.length})</h3>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>Delivering on scorecards, live streams & ground hoardings</span>
              </div>
              <button
                type="button"
                className="btn btn--primary btn--sm"
                style={{ background: '#ffd600', color: '#0a1628', fontWeight: 800, padding: '7px 14px' }}
                onClick={() => setShowUploadCreativePage(true)}
              >
                + Upload Creative
              </button>
            </div>

            {/* Live Interactive Placement Simulator */}
            <div className="sp-card" style={{ padding: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#ffd600' }}>LIVE SCORECARD BANNER MOCKUP</span>
                <span className="pill" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676', fontSize: 10 }}>ACTIVE</span>
              </div>

              {/* Scorecard ad banner mockup */}
              <div className="mockup-scorecard-ad">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Zap size={16} color="#ffd600" />
                  <div>
                    <strong style={{ fontSize: 12, color: '#ffd600', display: 'block' }}>VELOCITY NUTRITION</strong>
                    <span style={{ fontSize: 10, color: '#cbd5e1' }}>Official Energy Partner • Flat 20% Off: CRICKET20</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn--sm"
                  style={{ background: '#ffd600', color: '#0a1628', fontWeight: 800, fontSize: 10, padding: '4px 10px' }}
                  onClick={() => showToast('Test click logged in attribution tracker!')}
                >
                  SHOP NOW ↗
                </button>
              </div>
            </div>

            {/* Creatives Grid */}
            <div className="creatives-grid">
              {creatives.map(crt => (
                <div key={crt.id} className="creative-card">
                  <div className="creative-thumb">
                    <img src={crt.thumbnail} alt={crt.name} />
                    <span className="crt-type-badge">{crt.type}</span>
                  </div>
                  <div className="creative-body">
                    <strong className="crt-name">{crt.name}</strong>
                    <span className="crt-dim">{crt.dimensions}</span>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11 }}>
                      <span style={{ color: '#00e676', fontWeight: 700 }}>{crt.clicks}</span>
                      <span style={{ color: '#94a3b8' }}>{crt.activeIn}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 4: 💳 AD WALLET, BILLING & TAX INVOICES
           =================================================================== */}
        {activeTab === 'wallet' && (
          <div className="sponsor-tab-content">
            {/* Wallet Hero Card */}
            <div className="sp-card" style={{ background: 'linear-gradient(135deg, rgba(255,214,0,0.1), rgba(255,255,255,0.02))', borderColor: 'rgba(255,214,0,0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 700 }}>
                    PREPAID AD BALANCE
                  </span>
                  <strong style={{ fontSize: 34, color: '#ffd600', display: 'block', margin: '4px 0', letterSpacing: -0.5 }}>
                    ₹{walletBalance.toLocaleString()}
                  </strong>
                  <span style={{ fontSize: 12, color: '#00e676' }}>✓ 100% Tax Deductible (18% Input GST Eligible)</span>
                </div>
                <button
                  type="button"
                  className="btn btn--primary"
                  style={{ background: '#ffd600', color: '#0a1628', fontWeight: 800, padding: '10px 18px' }}
                  onClick={() => setShowTopUpPage(true)}
                >
                  + Top-Up Wallet
                </button>
              </div>

              {/* Quick Preset Buttons */}
              <div style={{ display: 'flex', gap: 6, marginTop: 14 }}>
                {[25000, 50000, 100000].map(amt => (
                  <button
                    key={amt}
                    type="button"
                    className="btn btn--secondary btn--sm"
                    style={{ flex: 1, fontSize: 11, fontWeight: 700 }}
                    onClick={() => {
                      setWalletBalance(b => b + amt)
                      setTransactions([
                        {
                          id: `TXN-SP-${Math.floor(100 + Math.random() * 900)}`,
                          description: `Ad Wallet Deposit via NetBanking`,
                          amount: amt,
                          type: 'credit',
                          date: 'Today',
                          invoiceId: `INV-SP-${Math.floor(100 + Math.random() * 900)}`,
                        },
                        ...transactions,
                      ])
                      showToast(`Added ₹${amt.toLocaleString()} to your Ad Wallet!`)
                    }}
                  >
                    + ₹{(amt / 1000)}K
                  </button>
                ))}
              </div>
            </div>

            {/* Transactions & GST Invoices Ledger */}
            <div className="sp-card">
              <h3 className="sp-card-title">Billing & GST Invoices Ledger</h3>
              <p className="sp-card-sub">Itemized campaign deductions, prepaid deposits, and downloadable GST tax receipts.</p>

              <div className="transactions-list">
                {transactions.map(txn => {
                  const isCredit = txn.type === 'credit'
                  return (
                    <div key={txn.id} className="txn-row">
                      <div className="txn-info">
                        <div className={`txn-icon ${isCredit ? 'credit' : 'debit'}`}>
                          {isCredit ? <ArrowUpRight size={16} /> : <Tag size={16} />}
                        </div>
                        <div>
                          <strong style={{ fontSize: 13, color: '#f8fafc', display: 'block' }}>{txn.description}</strong>
                          <span style={{ fontSize: 11, color: '#94a3b8' }}>{txn.id} • {txn.date}</span>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <strong
                          style={{
                            fontSize: 14,
                            fontWeight: 800,
                            color: isCredit ? '#00e676' : '#f8fafc',
                            display: 'block',
                          }}
                        >
                          {isCredit ? '+' : '-'}₹{txn.amount.toLocaleString()}
                        </strong>
                        <button
                          type="button"
                          className="btn btn--secondary btn--sm"
                          style={{ marginTop: 4, fontSize: 10, padding: '2px 8px' }}
                          onClick={() => setViewingInvoice(txn)}
                        >
                          <FileText size={11} /> GST Invoice
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </Screen>
  )
}
