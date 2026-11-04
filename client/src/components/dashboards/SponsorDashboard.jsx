import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Megaphone,
  Eye,
  MousePointer,
  BarChart3,
  TrendingUp,
  Award,
  Wallet,
  Plus,
  Tv,
  Newspaper,
  CheckCircle2,
  Zap,
} from 'lucide-react'

export default function SponsorDashboard({ user }) {
  const navigate = useNavigate()
  const details = user?.roleDetails || {}

  const [campaigns, setCampaigns] = useState([
    {
      id: 'cmp-1',
      title: 'Digital Scorecard Top Banner (All Chennai Matches)',
      impressions: '840,000',
      ctr: '4.2%',
      status: 'Live & Delivering',
      cost: '₹35,000',
    },
    {
      id: 'cmp-2',
      title: 'Tournament Title Sponsor: Chennai Street Cup',
      impressions: '580,000',
      ctr: '3.4%',
      status: 'Active',
      cost: '₹50,000',
    },
  ])

  return (
    <div className="sh-dashboard-layout">
      {/* Sponsor Hero Card */}
      <section className="sh-dash-hero-card sh-dash-hero-card--sponsor">
        <div className="sh-dash-hero-top">
          <div className="sh-dash-avatar-box">
            <div className="sh-avatar-hex" style={{ background: 'rgba(255, 214, 0, 0.2)', borderColor: '#ffd600' }}>
              <Megaphone size={24} color="#ffd600" />
            </div>
            <div>
              <div className="sh-dash-hero-title-row">
                <h2>{details.companyName || 'Velocity Sports Nutrition'}</h2>
                <span className="sh-badge-chip" style={{ color: '#ffd600', borderColor: '#ffd60055' }}>
                  BRAND SPONSOR
                </span>
              </div>
              <p className="sh-dash-hero-sub">
                Advertiser: <strong>{user.nickname}</strong> • Headquarters: {user.city}
              </p>
              <small style={{ color: 'var(--muted)', fontSize: 11 }}>
                Target Sport: Cricket First • Brand Tier: Official Platform Sponsor
              </small>
            </div>
          </div>

          <div className="sh-dash-stat-pill" style={{ borderColor: '#ffd60055' }}>
            <strong style={{ color: '#ffd600' }}>{details.walletBalance || '₹84,500'}</strong>
            <span>AD BALANCE</span>
          </div>
        </div>

        {/* Live Impression & ROI Metrics */}
        <div className="sh-player-stats-bar" style={{ marginTop: 14 }}>
          <div className="sh-stat-box">
            <strong style={{ color: '#ffd600' }}>{details.totalImpressions || '1.42M'}</strong>
            <span>Impressions</span>
          </div>
          <div className="sh-stat-box">
            <strong style={{ color: '#00e676' }}>{details.clickThroughRate || '3.8%'}</strong>
            <span>Avg CTR</span>
          </div>
          <div className="sh-stat-box">
            <strong>{details.activeCampaigns || 2}</strong>
            <span>Live Campaigns</span>
          </div>
          <div className="sh-stat-box">
            <strong>4.8x</strong>
            <span>Est. Brand ROI</span>
          </div>
        </div>
      </section>

      {/* Quick Action Shortcuts (Allocated Features) */}
      <div className="sh-quick-actions-grid">
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/sponsor?tab=campaigns')}>
          <div className="sh-action-icon" style={{ background: 'rgba(255,214,0,0.15)', color: '#ffd600' }}>
            <Megaphone size={18} />
          </div>
          <span>Campaigns</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/sponsor?tab=creatives')}>
          <div className="sh-action-icon" style={{ background: 'rgba(61,224,255,0.15)', color: '#3de0ff' }}>
            <Newspaper size={18} />
          </div>
          <span>Creatives</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/sponsor?tab=wallet')}>
          <div className="sh-action-icon" style={{ background: 'rgba(255,45,58,0.15)', color: '#ff2d3a' }}>
            <Tv size={18} />
          </div>
          <span>Ad Wallet</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/sponsor?tab=analytics')}>
          <div className="sh-action-icon" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676' }}>
            <BarChart3 size={18} />
          </div>
          <span>ROI Stats</span>
        </button>
      </div>

      {/* Interactive Ad Slot Previewer */}
      <section className="panel" style={{ padding: '14px 16px' }}>
        <header style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Tv size={17} color="#ffd600" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Brand Ad Slot Placement Preview</h3>
          </div>
          <span className="pill" style={{ background: 'rgba(255,214,0,0.15)', color: '#ffd600' }}>
            LIVE MOCKUP
          </span>
        </header>

        <div style={{ padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 10, border: '1px solid rgba(255,214,0,0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <strong style={{ fontSize: 12, color: '#f4f7ff' }}>Velocity Sports Nutrition • Live Stream Overlay</strong>
            <span style={{ fontSize: 10, color: '#00e676', fontWeight: 'bold' }}>Active on 14 Matches</span>
          </div>
          <div style={{ height: 48, background: 'linear-gradient(90deg, #111e38, #1a2f58)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontSize: 12, fontWeight: 'bold', color: '#ffd600', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Zap size={14} color="#ffd600" /> VELOCITY NUTRITION
            </span>
            <span style={{ fontSize: 11, color: '#f4f7ff' }}>Official Energy Drink Partner • Flat 20% Off</span>
            <span className="pill" style={{ background: '#ffd600', color: '#020617', fontSize: 9 }}>TAP TO SHOP</span>
          </div>
        </div>
      </section>

      {/* Active Ad Campaigns (Core requirement) */}
      <section className="panel" style={{ padding: '14px 16px' }}>
        <header style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <BarChart3 size={18} color="#ffd600" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Active Brand Campaigns</h3>
          </div>
          <button type="button" className="text-link" onClick={() => navigate('/app/sponsor?tab=campaigns')}>
            + New Campaign
          </button>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {campaigns.map((c) => (
            <div
              key={c.id}
              style={{
                padding: 12,
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,214,0,0.2)',
                borderRadius: 10,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: 13 }}>{c.title}</strong>
                <span className="pill" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676', fontSize: 10 }}>
                  {c.status}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12, color: 'var(--muted)' }}>
                <span>Impressions: <strong style={{ color: '#ffd600' }}>{c.impressions}</strong></span>
                <span>CTR: <strong style={{ color: '#00e676' }}>{c.ctr}</strong></span>
                <span>Budget: <strong style={{ color: '#f4f7ff' }}>{c.cost}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sports E-Paper Sponsor Page Feature Allotment */}
      <section className="panel" style={{ padding: '14px 16px', cursor: 'pointer' }} onClick={() => navigate('/app/epaper')}>
        <header style={{ marginBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Newspaper size={17} color="#00e676" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Sports E-Paper Digital Billboard Ads</h3>
          </div>
          <span className="text-link">View ad slots →</span>
        </header>
        <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>
          Book full-page back covers or scoreboard masthead sponsor banners reaching 250,000+ daily cricket readers.
        </p>
      </section>
    </div>
  )
}
