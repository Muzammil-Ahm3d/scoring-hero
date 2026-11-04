import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ShoppingBag,
  ShieldCheck,
  Package,
  TrendingUp,
  DollarSign,
  Truck,
  Plus,
  CheckCircle2,
  Building,
  Boxes,
  ArrowRight,
  ExternalLink,
  Clock,
  Sparkles,
  Phone,
} from 'lucide-react'

export default function SellerDashboard({ user }) {
  const navigate = useNavigate()
  const details = user?.roleDetails || {}

  const [payoutRequested, setPayoutRequested] = useState(false)

  // Recent priority orders for quick action
  const recentOrders = [
    {
      id: 'ORD-8821',
      item: 'Apex Pro Grade 1 English Willow Bat',
      buyer: 'Rohit Sharma (State Squad)',
      amount: '₹14,500',
      status: 'Pending Packing',
      statusColor: '#ffc83d',
    },
    {
      id: 'ORD-8820',
      item: 'Box of 12 Match White Leather Balls (2x)',
      buyer: 'Marina Titans Academy',
      amount: '₹12,400',
      status: 'Packed Ready',
      statusColor: '#38bdf8',
    },
    {
      id: 'ORD-8819',
      item: 'Full Team Sublimation Jersey Kit (15 Sets)',
      buyer: 'Coastal Kings XI (Franchise)',
      amount: '₹22,900',
      status: 'Dispatched (Day 3/7)',
      statusColor: '#c084fc',
    },
  ]

  function handleInstantPayout() {
    setPayoutRequested(true)
    setTimeout(() => {
      setPayoutRequested(false)
      navigate('/app/seller?tab=payouts')
    }, 1200)
  }

  return (
    <div className="sh-dashboard-layout" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* ── 1. Merchant Hero Executive Card ── */}
      <section className="sh-dash-hero-card sh-dash-hero-card--seller">
        <div className="sh-dash-hero-top">
          <div className="sh-dash-avatar-box">
            <div className="sh-avatar-hex" style={{ background: 'rgba(0, 230, 118, 0.2)', borderColor: '#00e676' }}>
              <ShoppingBag size={24} color="#00e676" />
            </div>
            <div>
              <div className="sh-dash-hero-title-row">
                <h2>{details.businessName || 'Apex Willow & Pro Gear Co.'}</h2>
                <span className="sh-badge-chip" style={{ color: '#00e676', borderColor: 'rgba(0, 230, 118, 0.3)' }}>
                  GST VERIFIED FACTORY
                </span>
              </div>
              <p className="sh-dash-hero-sub">
                Founder: <strong>{user.fullName || user.nickname}</strong> • GSTIN: {details.gstNumber || '09AAACA1234F1Z8'}
              </p>
              <small style={{ color: 'var(--muted)', fontSize: 11 }}>
                Manufacturing: Meerut Sports Corridor, UP • Category: {details.category || 'English Willow Bats & Custom Kits'}
              </small>
            </div>
          </div>

          <div className="sh-dash-stat-pill" style={{ borderColor: 'rgba(0, 230, 118, 0.4)' }}>
            <strong style={{ color: '#00e676' }}>{details.escrowSettlementBalance || '₹1.82L'}</strong>
            <span>ESCROW READY</span>
          </div>
        </div>

        {/* 4 Core Merchant KPIs */}
        <div className="sh-player-stats-bar" style={{ marginTop: 14 }}>
          <div className="sh-stat-box" onClick={() => navigate('/app/seller?tab=inventory')} style={{ cursor: 'pointer' }}>
            <strong style={{ color: '#00e676' }}>{details.activeListings || 38}</strong>
            <span>Store Products</span>
          </div>
          <div className="sh-stat-box" onClick={() => navigate('/app/seller?tab=orders')} style={{ cursor: 'pointer' }}>
            <strong style={{ color: '#ffc83d' }}>{details.pendingOrders || 14}</strong>
            <span>Orders in Queue</span>
          </div>
          <div className="sh-stat-box" onClick={() => navigate('/app/seller?tab=payouts')} style={{ cursor: 'pointer' }}>
            <strong style={{ color: '#38bdf8' }}>₹14.77L</strong>
            <span>Gross Sales</span>
          </div>
          <div className="sh-stat-box">
            <strong>{details.averageRating || '4.9 ★'}</strong>
            <span>Verified Rating</span>
          </div>
        </div>
      </section>

      {/* ── 2. Primary 3-Portal Operational Navigation Buttons (Exact Match with Grounds & Academy) ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 10,
        }}
      >
        <button
          type="button"
          onClick={() => navigate('/app/seller?tab=inventory')}
          style={{
            padding: '16px 12px',
            borderRadius: 14,
            background: 'linear-gradient(135deg, rgba(0, 230, 118, 0.12), rgba(0, 176, 255, 0.06))',
            border: '1.5px solid rgba(0, 230, 118, 0.35)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
            textAlign: 'center',
            transition: 'all 0.2s ease',
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'rgba(0, 230, 118, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Boxes size={22} color="#00e676" />
          </div>
          <strong style={{ fontSize: 13, color: '#f8fafc' }}>Stock & Catalog</strong>
          <span style={{ fontSize: 10, color: 'var(--muted)' }}>38 SKUs • Restock</span>
        </button>

        <button
          type="button"
          onClick={() => navigate('/app/seller?tab=orders')}
          style={{
            padding: '16px 12px',
            borderRadius: 14,
            background: 'linear-gradient(135deg, rgba(0, 176, 255, 0.12), rgba(147, 51, 234, 0.06))',
            border: '1.5px solid rgba(0, 176, 255, 0.35)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
            textAlign: 'center',
            transition: 'all 0.2s ease',
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'rgba(0, 176, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Truck size={22} color="#38bdf8" />
          </div>
          <strong style={{ fontSize: 13, color: '#f8fafc' }}>Orders & Queue</strong>
          <span style={{ fontSize: 10, color: '#ffc83d' }}>14 Active • BlueDart Air</span>
        </button>

        <button
          type="button"
          onClick={() => navigate('/app/seller?tab=payouts')}
          style={{
            padding: '16px 12px',
            borderRadius: 14,
            background: 'linear-gradient(135deg, rgba(255, 200, 61, 0.12), rgba(0, 230, 118, 0.06))',
            border: '1.5px solid rgba(255, 200, 61, 0.35)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
            textAlign: 'center',
            transition: 'all 0.2s ease',
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'rgba(255, 200, 61, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <DollarSign size={22} color="#ffc83d" />
          </div>
          <strong style={{ fontSize: 13, color: '#f8fafc' }}>Escrow Payouts</strong>
          <span style={{ fontSize: 10, color: '#00e676' }}>₹1.82L Ready</span>
        </button>
      </div>

      {/* ── 3. Escrow Settlement Card ── */}
      <section className="panel" style={{ padding: '16px 18px' }}>
        <header style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <DollarSign size={18} color="#00e676" />
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 900, color: '#f8fafc' }}>
              RBI-Approved Merchant Escrow Account
            </h3>
          </div>
          <span className="pill" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676', fontWeight: 800 }}>
            T+2 AUTO-SETTLED
          </span>
        </header>

        <div style={{ background: 'rgba(255,255,255,0.02)', padding: 14, borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            <div>
              <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                AVAILABLE READY ESCROW BALANCE
              </span>
              <strong style={{ fontSize: 24, color: '#00e676', display: 'block', fontWeight: 900 }}>
                {details.escrowSettlementBalance || '₹1,82,400'}
              </strong>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>Verified Bank Account</span>
              <strong style={{ fontSize: 13, color: '#f4f7ff', display: 'block' }}>HDFC Bank •••• 4091 (Current)</strong>
            </div>
          </div>

          {payoutRequested ? (
            <div style={{ marginTop: 12, padding: 10, background: 'rgba(0,230,118,0.15)', color: '#00e676', borderRadius: 8, fontSize: 12, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <CheckCircle2 size={16} /> Opening Escrow Desk & Bank Disbursal...
            </div>
          ) : (
            <button
              type="button"
              className="btn btn--primary btn--sm"
              style={{ width: '100%', marginTop: 12, background: 'linear-gradient(135deg, #00e676, #00b0ff)', fontWeight: 900, color: '#020617' }}
              onClick={handleInstantPayout}
            >
              Request Bank Transfer Payout (₹1,82,400) →
            </button>
          )}
        </div>
      </section>

      {/* ── 4. Urgent Orders In Queue ── */}
      <section className="panel" style={{ padding: '16px 18px' }}>
        <header style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Package size={17} color="#3de0ff" />
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 900, color: '#f8fafc' }}>
              Orders Awaiting Dispatch & Packing
            </h3>
          </div>
          <button
            type="button"
            className="text-link"
            onClick={() => navigate('/app/seller?tab=orders')}
            style={{ fontSize: 12, color: '#38bdf8', fontWeight: 800, background: 'none', border: 'none', cursor: 'pointer' }}
          >
            All 14 orders →
          </button>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {recentOrders.map((o) => (
            <div
              key={o.id}
              onClick={() => navigate('/app/seller?tab=orders')}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 14px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.06)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <div>
                <strong style={{ fontSize: 13, color: '#f8fafc' }}>{o.item}</strong>
                <small style={{ display: 'block', color: 'var(--muted)', fontSize: 11, marginTop: 2 }}>
                  {o.id} • Buyer: <span style={{ color: '#cbd5e1' }}>{o.buyer}</span>
                </small>
              </div>
              <div style={{ textAlign: 'right' }}>
                <strong style={{ fontSize: 14, color: '#00e676' }}>{o.amount}</strong>
                <span
                  style={{
                    display: 'block',
                    fontSize: 10,
                    marginTop: 2,
                    padding: '2px 6px',
                    borderRadius: 4,
                    background: `${o.statusColor}22`,
                    color: o.statusColor,
                    fontWeight: 800,
                  }}
                >
                  {o.status.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. B2B Wholesale Deals Allotment ── */}
      <section
        className="panel"
        style={{ padding: '16px 18px', cursor: 'pointer' }}
        onClick={() => navigate('/app/seller?tab=inventory')}
      >
        <header style={{ marginBottom: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Building size={17} color="#00e676" />
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 900, color: '#f8fafc' }}>
              Academy & Franchise Wholesale Supply Contracts
            </h3>
          </div>
          <span style={{ fontSize: 12, color: '#00e676', fontWeight: 800 }}>Manage B2B Pricing →</span>
        </header>
        <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>
          3 bulk requests active: 50 custom academy jerseys from Marina Titans + 20 match tournament leather ball boxes.
        </p>
      </section>
    </div>
  )
}
