import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  Video,
  Radio,
  Tv,
  PlaySquare,
  DollarSign,
  Copy,
  Check,
  Play,
  Square,
  Layers,
  Sparkles,
  Scissors,
  Share2,
  Download,
  Upload,
  Globe,
  Shield,
  Zap,
  Eye,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Sliders,
  Settings,
  Flame,
  Award,
  Clock,
  Camera,
  RefreshCw,
  FileText,
  Printer,
  Smartphone,
  Cpu,
} from 'lucide-react'
import Screen from '../components/Screen'
import { useAuth } from '../context/AuthContext'
import './StreamerPortal.css'

export default function StreamerPortal() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') || 'ingest'

  // ---- LIVE BROADCAST STATE ----
  const [isOnAir, setIsOnAir] = useState(false)
  const [viewersCount, setViewersCount] = useState(3840)
  const [copiedKey, setCopiedKey] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState(false)
  const [showStreamKey, setShowStreamKey] = useState(false)

  // Camera Ingest Feed Switching
  const [activeCamera, setActiveCamera] = useState('cam1') // cam1 | cam2 | cam3 | cam4

  // Multi-destination simulcast toggles
  const [destinations, setDestinations] = useState({
    appLive: true,
    youtube: true,
    facebook: false,
    twitch: false,
  })

  // Overlays state
  const [overlays, setOverlays] = useState({
    lowerThird: true,
    milestoneBanner: false,
    wicketAlert: false,
    boundaryStinger: false,
    sponsorWatermark: true,
    drsPending: false,
  })

  const [activeTheme, setActiveTheme] = useState('crimson') // crimson | cyan | gold

  // Clips state
  const [clips, setClips] = useState([
    {
      id: 'clip_01',
      title: 'Monstrous 105m Six over Long-On by Rohit',
      event: 'SIX',
      duration: '0:28',
      time: '14 mins ago',
      views: '12.4K',
      published: true,
      thumbnail: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 'clip_02',
      title: 'Vikram shatters off-stump with 142kph in-swinger',
      event: 'WICKET',
      duration: '0:22',
      time: '28 mins ago',
      views: '8.9K',
      published: true,
      thumbnail: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 'clip_03',
      title: 'Sensational full-stretch diving catch at Point',
      event: 'SUPER CATCH',
      duration: '0:19',
      time: '45 mins ago',
      views: '5.1K',
      published: false,
      thumbnail: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=500&auto=format&fit=crop&q=60',
    },
  ])

  // Dedicated sub-pages (NO modals!)
  const [showAddDestinationPage, setShowAddDestinationPage] = useState(false)
  const [showHardwareGuidePage, setShowHardwareGuidePage] = useState(false)
  const [showThemeCustomizePage, setShowThemeCustomizePage] = useState(false)
  const [showMontageCreatorPage, setShowMontageCreatorPage] = useState(false)
  const [showWithdrawPayoutPage, setShowWithdrawPayoutPage] = useState(false)
  const [showAddContractPage, setShowAddContractPage] = useState(false)
  const [viewingClip, setViewingClip] = useState(null)
  const [clipSpeed, setClipSpeed] = useState(1.0)
  const [viewingInvoice, setViewingInvoice] = useState(null)

  // Tournament Production Contracts
  const [contracts, setContracts] = useState([
    { id: 'INV-BR-881', client: 'Mumbai Corporate Premier League', amount: 35000, date: '02 Nov 2026', description: 'Semi-Final & Final 4K Broadcast Coverage', status: 'Paid via Escrow' },
    { id: 'INV-BR-882', client: 'Apex Cricket Trophy Season 4', amount: 30000, date: '28 Oct 2026', description: 'Round Robin Multi-Cam Stream Package', status: 'Paid via Escrow' },
    { id: 'INV-BR-883', client: 'BCCI U-19 Invitational Trophy', amount: 45000, date: '10 Nov 2026', description: '5-Day Multi-Cam HD Coverage + Drone Rig', status: 'Advance Confirmed (₹20,000)' },
  ])

  // Live Score Sync with LiveScorer
  const [liveMatchScore, setLiveMatchScore] = useState({
    team: 'Scoring XI',
    score: '106/3',
    overs: '10.3',
    striker: { name: 'Rohit *', runs: 42, balls: 18 },
    nonStriker: { name: 'Karan', runs: 18, balls: 10 },
    bowler: { name: 'Vikram', figures: '1.3-0-21-1' }
  })

  // Feedback toast
  const [toastMessage, setToastMessage] = useState('')

  // Dynamic overlay reaction to live match events
  useEffect(() => {
    try {
      const commStr = localStorage.getItem('scoringheros_live_commentary')
      if (commStr) {
        const commArr = JSON.parse(commStr)
        if (commArr && commArr.length > 0) {
          const latest = commArr[0]
          if (latest.event === 'WICKET') {
            setOverlays(prev => ({ ...prev, wicketAlert: true }))
            setTimeout(() => setOverlays(prev => ({ ...prev, wicketAlert: false })), 4000)
          } else if (latest.event === 'BOUNDARY' || latest.event === 'SIX') {
            setOverlays(prev => ({ ...prev, boundaryStinger: true }))
            setTimeout(() => setOverlays(prev => ({ ...prev, boundaryStinger: false })), 4000)
          }
        }
      }
    } catch (e) {}
  }, [])

  function showToast(msg) {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3000)
  }

  // Copy helper
  function handleCopy(text, type) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
      if (type === 'key') {
        setCopiedKey(true)
        setTimeout(() => setCopiedKey(false), 2000)
      } else {
        setCopiedUrl(true)
        setTimeout(() => setCopiedUrl(false), 2000)
      }
      showToast(`Copied ${type === 'key' ? 'Stream Key' : 'Ingest URL'} to clipboard!`)
    }
  }

  // Generate instant clip
  function handleInstantClip(eventType) {
    const newClip = {
      id: `clip_${Date.now()}`,
      title: `Live Match ${eventType}: Dynamic Replay Clip`,
      event: eventType,
      duration: '0:30',
      time: 'Just now',
      views: '0',
      published: false,
      thumbnail: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&auto=format&fit=crop&q=60',
    }
    setClips([newClip, ...clips])
    showToast(`Captured 30s ${eventType} Highlight! Added to clipping desk.`)
  }

  function handlePublishClip(id) {
    setClips(clips.map(c => c.id === id ? { ...c, published: true, views: '1.2K' } : c))
    showToast('Published highlight directly to Match Reels and Fan Feed!')
  }

  // =========================================================================
  // SUB-PAGE 1: CONFIGURE NEW RTMP SIMULCAST DESTINATION
  // =========================================================================
  if (showAddDestinationPage) {
    return (
      <Screen title="Add RTMP Destination" back={() => setShowAddDestinationPage(false)} padded={false}>
        <div className="streamer-subpage">
          <div className="subpage-header-row">
            <button className="btn btn--secondary btn--sm" onClick={() => setShowAddDestinationPage(false)}>
              ← Back
            </button>
            <span className="pill" style={{ background: 'rgba(56,189,248,0.15)', color: '#38bdf8', fontWeight: 800 }}>
              SIMULCAST CONFIG
            </span>
          </div>

          <div className="sp-card">
            <h2 className="sp-card-title">Add Custom RTMP / SRT Broadcast Endpoint</h2>
            <p className="sp-card-sub">
              Stream simultaneously to your own CDN, private sports club portal, or alternate social channels without increasing upload bandwidth.
            </p>

            <label className="sp-label">Destination Platform Name</label>
            <input className="sp-input" placeholder="e.g. Club Regional Portal, Twitch, Kick" defaultValue="Custom Sports CDN" />

            <label className="sp-label" style={{ marginTop: 12 }}>Server URL (RTMP / RTMPS / SRT)</label>
            <input className="sp-input" placeholder="rtmp://live.customcdn.com/live" defaultValue="rtmp://live.customcdn.com/live" />

            <label className="sp-label" style={{ marginTop: 12 }}>Stream Key (Secret)</label>
            <input className="sp-input" type="password" placeholder="Enter remote stream key" defaultValue="live_sc_9948201248" />

            <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
              <button
                className="btn btn--primary"
                style={{ flex: 1, padding: 14 }}
                onClick={() => {
                  setDestinations(d => ({ ...d, twitch: true }))
                  setShowAddDestinationPage(false)
                  showToast('Custom RTMP Destination activated for live simulcast!')
                }}
              >
                Save & Enable Simulcast
              </button>
            </div>
          </div>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // SUB-PAGE 2: HARDWARE SETUP & OBS / VMix INTEGRATION GUIDE
  // =========================================================================
  if (showHardwareGuidePage) {
    return (
      <Screen title="OBS & Hardware Integration" back={() => setShowHardwareGuidePage(false)} padded={false}>
        <div className="streamer-subpage">
          <div className="subpage-header-row">
            <button className="btn btn--secondary btn--sm" onClick={() => setShowHardwareGuidePage(false)}>
              ← Back
            </button>
            <span className="pill" style={{ background: 'rgba(225,6,19,0.15)', color: '#e10613', fontWeight: 800 }}>
              HARDWARE SPEC
            </span>
          </div>

          <div className="sp-card">
            <h2 className="sp-card-title">Broadcast Production Rig Setup</h2>
            <p className="sp-card-sub">Recommended hardware encoder and software settings for 1080p 60FPS ultra-low latency sports broadcasting.</p>

            <div className="hw-guide-step">
              <div className="hw-step-badge">1</div>
              <div>
                <strong style={{ color: '#f8fafc', fontSize: 14 }}>OBS Studio / vMix Stream Settings</strong>
                <p style={{ margin: '4px 0 0', fontSize: 12, color: '#94a3b8' }}>
                  Service: Custom... | Server: <code style={{ color: '#38bdf8' }}>rtmp://live.scoringheroes.com/app/live</code> | Key: Paste your private key.
                </p>
              </div>
            </div>

            <div className="hw-guide-step">
              <div className="hw-step-badge">2</div>
              <div>
                <strong style={{ color: '#f8fafc', fontSize: 14 }}>Video Encoder & Bitrate Configuration</strong>
                <p style={{ margin: '4px 0 0', fontSize: 12, color: '#94a3b8' }}>
                  Encoder: <strong>NVIDIA NVENC H.264 (CBR)</strong> | Bitrate: <strong>6,500 - 8,000 kbps</strong> | Keyframe Interval: <strong>2.0 seconds</strong> | Profile: <strong>High</strong>.
                </p>
              </div>
            </div>

            <div className="hw-guide-step">
              <div className="hw-step-badge">3</div>
              <div>
                <strong style={{ color: '#f8fafc', fontSize: 14 }}>Browser Source TV Score Overlay (Transparent)</strong>
                <p style={{ margin: '4px 0 0', fontSize: 12, color: '#94a3b8' }}>
                  Add a <strong>Browser Source</strong> in OBS: URL: <code style={{ color: '#00e676' }}>https://scoringheroes.com/overlay/live</code> | Width: <strong>1920</strong> | Height: <strong>1080</strong>.
                </p>
              </div>
            </div>

            <button className="btn btn--secondary" style={{ width: '100%', marginTop: 16 }} onClick={() => setShowHardwareGuidePage(false)}>
              Done Reading Guide
            </button>
          </div>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // SUB-PAGE 3: CUSTOMIZE TV GRAPHICS THEME
  // =========================================================================
  if (showThemeCustomizePage) {
    return (
      <Screen title="Customize TV Graphics Theme" back={() => setShowThemeCustomizePage(false)} padded={false}>
        <div className="streamer-subpage">
          <div className="subpage-header-row">
            <button className="btn btn--secondary btn--sm" onClick={() => setShowThemeCustomizePage(false)}>
              ← Back
            </button>
            <span className="pill" style={{ background: 'rgba(255,200,61,0.15)', color: '#ffc83d', fontWeight: 800 }}>
              TV OVERLAY DESIGN
            </span>
          </div>

          <div className="sp-card">
            <h2 className="sp-card-title">Broadcast Graphics Color Palette</h2>
            <p className="sp-card-sub">Select the primary television overlay graphics package applied across lower-thirds, stinger animations, and scorecards.</p>

            <div className="theme-select-grid">
              {[
                { id: 'crimson', name: 'ScoringCast Crimson Pro', primary: '#e10613', secondary: '#182b4d' },
                { id: 'cyan', name: 'Electric Cyan IPL Edition', primary: '#00e5ff', secondary: '#092540' },
                { id: 'gold', name: 'Grand Trophy Gold Heritage', primary: '#f59e0b', secondary: '#2e1c0c' },
              ].map(t => (
                <div
                  key={t.id}
                  className={`theme-card ${activeTheme === t.id ? 'active' : ''}`}
                  onClick={() => setActiveTheme(t.id)}
                >
                  <div className="theme-color-preview" style={{ background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})` }} />
                  <div>
                    <strong style={{ fontSize: 13, color: '#f8fafc', display: 'block' }}>{t.name}</strong>
                    <span style={{ fontSize: 11, color: '#94a3b8' }}>Accent: {t.primary}</span>
                  </div>
                  {activeTheme === t.id && <CheckCircle2 size={18} color="#00e676" style={{ marginLeft: 'auto' }} />}
                </div>
              ))}
            </div>

            <label className="sp-label" style={{ marginTop: 16 }}>Persistent Sponsor Watermark Bug</label>
            <select className="sp-input">
              <option>SS Sunridges Willow Bats (Verified Brand Partner)</option>
              <option>MRF Pace Foundation</option>
              <option>Tournament Official Sponsor</option>
              <option>None (Clean Feed)</option>
            </select>

            <button
              className="btn btn--primary"
              style={{ width: '100%', marginTop: 20, padding: 14 }}
              onClick={() => {
                setShowThemeCustomizePage(false)
                showToast('Broadcast TV Theme updated live across all connected displays!')
              }}
            >
              Apply Theme Live
            </button>
          </div>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // SUB-PAGE 4: HIGHLIGHT REEL CREATOR & MONTAGE PUBLISHER
  // =========================================================================
  if (showMontageCreatorPage) {
    return (
      <Screen title="Create Highlight Reel Montage" back={() => setShowMontageCreatorPage(false)} padded={false}>
        <div className="streamer-subpage">
          <div className="subpage-header-row">
            <button className="btn btn--secondary btn--sm" onClick={() => setShowMontageCreatorPage(false)}>
              ← Back
            </button>
            <span className="pill" style={{ background: 'rgba(167,139,250,0.15)', color: '#a78bfa', fontWeight: 800 }}>
              MONTAGE STUDIO
            </span>
          </div>

          <div className="sp-card">
            <h2 className="sp-card-title">Assemble Multi-Clip Match Highlights</h2>
            <p className="sp-card-sub">Select captured match moments to compile into an automated 60-second video reel for YouTube Shorts, Reels, and app feeds.</p>

            <label className="sp-label">Reel Title</label>
            <input className="sp-input" defaultValue="Top 5 Best Boundaries & Wickets: Scoring XI vs Warriors XI" />

            <label className="sp-label" style={{ marginTop: 12 }}>Select Clips to Include</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 6 }}>
              {clips.map(c => (
                <label key={c.id} className="montage-clip-row">
                  <input type="checkbox" defaultChecked />
                  <span className="event-pill" style={{ background: c.event === 'SIX' ? '#651fff' : '#e10613' }}>{c.event}</span>
                  <span style={{ fontSize: 13, color: '#f8fafc', flex: 1 }}>{c.title}</span>
                  <span style={{ fontSize: 11, color: '#94a3b8' }}>{c.duration}</span>
                </label>
              ))}
            </div>

            <label className="sp-label" style={{ marginTop: 14 }}>Audio Stinger / Voice Track</label>
            <select className="sp-input">
              <option>Live AI English Commentary Desk Mix</option>
              <option>Stadium Roar & Crowd Ambiance Only</option>
              <option>High-Energy Electronic Sports Theme</option>
            </select>

            <button
              className="btn btn--primary"
              style={{ width: '100%', marginTop: 20, padding: 14 }}
              onClick={() => {
                setShowMontageCreatorPage(false)
                showToast('Montage rendered and published to Match Video Reels!')
              }}
            >
              Export & Publish Reel (60FPS 1080p)
            </button>
          </div>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // SUB-PAGE 5: WITHDRAW BROADCASTER PAYOUT
  // =========================================================================
  if (showWithdrawPayoutPage) {
    return (
      <Screen title="Broadcaster Payout Settlement" back={() => setShowWithdrawPayoutPage(false)} padded={false}>
        <div className="streamer-subpage">
          <div className="subpage-header-row">
            <button className="btn btn--secondary btn--sm" onClick={() => setShowWithdrawPayoutPage(false)}>
              ← Back
            </button>
            <span className="pill" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676', fontWeight: 800 }}>
              ESCROW SETTLEMENT
            </span>
          </div>

          <div className="sp-card">
            <h2 className="sp-card-title">Withdraw Streamer Earnings to Bank</h2>
            <div className="payout-balance-box">
              <span style={{ fontSize: 12, color: '#94a3b8' }}>AVAILABLE TO WITHDRAW</span>
              <strong style={{ fontSize: 32, color: '#00e676', display: 'block', margin: '4px 0' }}>₹87,600</strong>
              <small style={{ color: '#38bdf8' }}>Includes Matchday Contracts & Verified Super Chat Tips</small>
            </div>

            <label className="sp-label" style={{ marginTop: 16 }}>Transfer Amount (₹)</label>
            <input className="sp-input" type="number" defaultValue="87600" />

            <label className="sp-label" style={{ marginTop: 12 }}>Receiving Bank Account (Verified KYC)</label>
            <div className="bank-account-tile">
              <Shield size={18} color="#00e676" />
              <div>
                <strong style={{ fontSize: 13, color: '#f8fafc', display: 'block' }}>HDFC Bank • Current A/C</strong>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>A/C: *******8849 • IFSC: HDFC0001248 (Karan Mehra Broadcasts)</span>
              </div>
            </div>

            <button
              className="btn btn--primary"
              style={{ width: '100%', marginTop: 20, padding: 14 }}
              onClick={() => {
                setShowWithdrawPayoutPage(false)
                showToast('Withdrawal initiated! ₹87,600 credited via IMPS to your verified bank account.')
              }}
            >
              Confirm Instant Transfer (IMPS)
            </button>
          </div>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // SUB-PAGE 6: OFFICIAL BROADCASTER INVOICE
  // =========================================================================
  if (viewingInvoice) {
    return (
      <Screen title="Production Invoice" back={() => setViewingInvoice(null)} padded={false}>
        <div className="streamer-subpage">
          <div className="subpage-header-row">
            <button className="btn btn--secondary btn--sm" onClick={() => setViewingInvoice(null)}>
              ← Back
            </button>
            <button className="btn btn--secondary btn--sm" onClick={() => window.print()}>
              <Printer size={14} /> Print
            </button>
          </div>

          <div className="sp-card printable-invoice">
            <div className="invoice-header">
              <div>
                <h2 style={{ margin: 0, fontSize: 18, color: '#f8fafc' }}>ScoringCast Live Studios</h2>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>GSTIN: 27AABCS8849L1Z5 • Mumbai, MH</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="pill" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676', fontWeight: 800 }}>PAID</span>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>Invoice: {viewingInvoice.id}</div>
              </div>
            </div>

            <hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '14px 0' }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
              <div>
                <span style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase' }}>Client Tournament</span>
                <strong style={{ fontSize: 13, color: '#f8fafc', display: 'block' }}>{viewingInvoice.client}</strong>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase' }}>Match Date</span>
                <strong style={{ fontSize: 13, color: '#f8fafc', display: 'block' }}>{viewingInvoice.date}</strong>
              </div>
            </div>

            <table className="invoice-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th style={{ textAlign: 'right' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{viewingInvoice.description} (4K Multi-Cam + Overlays)</td>
                  <td style={{ textAlign: 'right' }}>₹{viewingInvoice.amount.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>18% GST (Broadcast Production Services)</td>
                  <td style={{ textAlign: 'right' }}>₹{(viewingInvoice.amount * 0.18).toLocaleString()}</td>
                </tr>
                <tr className="invoice-total-row">
                  <td>Total Settled via Escrow</td>
                  <td style={{ textAlign: 'right', color: '#00e676', fontWeight: 800 }}>
                    ₹{(viewingInvoice.amount * 1.18).toLocaleString()}
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
  // SUB-PAGE 7: WATCH REPLAY CLIP & SLOW-MOTION REVIEW
  // =========================================================================
  if (viewingClip) {
    return (
      <Screen title={viewingClip.title} back={() => setViewingClip(null)} padded={false}>
        <div className="streamer-subpage">
          <div className="subpage-header-row">
            <button className="btn btn--secondary btn--sm" onClick={() => setViewingClip(null)}>
              ← Back to Clip Desk
            </button>
            <span className="pill" style={{ background: 'rgba(101,31,255,0.15)', color: '#c084fc', fontWeight: 800 }}>
              {viewingClip.event} • {viewingClip.duration}
            </span>
          </div>

          <div className="sp-card" style={{ padding: 10 }}>
            {/* 16:9 Video Player View */}
            <div className="program-screen-canvas" style={{ marginBottom: 12 }}>
              <img src={viewingClip.thumbnail} alt={viewingClip.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(225,6,19,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Play size={24} fill="#fff" color="#fff" style={{ marginLeft: 3 }} />
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: 8, left: 8, background: 'rgba(0,0,0,0.7)', padding: '2px 8px', borderRadius: 4, fontSize: 10, color: '#00e676', fontWeight: 800 }}>
                HD 60FPS • SPEED: {clipSpeed}x
              </div>
            </div>

            {/* Playback speed controls */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
              {[0.25, 0.5, 1.0, 2.0].map(s => (
                <button
                  key={s}
                  type="button"
                  className={`btn btn--sm ${clipSpeed === s ? 'btn--primary' : 'btn--secondary'}`}
                  style={{ flex: 1, fontSize: 11, padding: '6px 0', border: clipSpeed === s ? 'none' : '1px solid rgba(255,255,255,0.1)' }}
                  onClick={() => setClipSpeed(s)}
                >
                  {s}x {s < 1 ? 'Slow-Mo' : ''}
                </button>
              ))}
            </div>

            <h3 style={{ fontSize: 16, color: '#f8fafc', margin: '0 0 6px' }}>{viewingClip.title}</h3>
            <p style={{ fontSize: 12, color: '#94a3b8', margin: '0 0 14px', lineHeight: 1.5 }}>
              Captured live from Cam 1 (Center Pavilion 1080p60). Synced with broadcast graphics and AI commentary audio desk.
            </p>

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                type="button"
                className="btn btn--primary"
                style={{ flex: 1, padding: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                onClick={() => {
                  handlePublishClip(viewingClip.id)
                  setViewingClip(null)
                }}
              >
                <Share2 size={15} /> Publish to Match Reels
              </button>
              <button
                type="button"
                className="btn btn--secondary"
                style={{ padding: 12 }}
                onClick={() => showToast('High-Definition 1080p MP4 downloaded to local drive!')}
              >
                <Download size={15} />
              </button>
            </div>
          </div>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // SUB-PAGE 8: BOOK NEW BROADCAST CONTRACT
  // =========================================================================
  if (showAddContractPage) {
    return (
      <Screen title="Book Broadcast Contract" back={() => setShowAddContractPage(false)} padded={false}>
        <div className="streamer-subpage">
          <div className="subpage-header-row">
            <button className="btn btn--secondary btn--sm" onClick={() => setShowAddContractPage(false)}>
              ← Back
            </button>
            <span className="pill" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676', fontWeight: 800 }}>
              PRODUCTION CONTRACT
            </span>
          </div>

          <div className="sp-card">
            <h2 className="sp-card-title">Book New Tournament Broadcast Contract</h2>
            <p className="sp-card-sub">
              Issue an official matchday streaming agreement with automated escrow fee protection.
            </p>

            <label className="sp-label">Tournament / League Name</label>
            <input className="sp-input" placeholder="e.g. State T20 Championship 2026" defaultValue="State T20 Championship 2026" />

            <label className="sp-label" style={{ marginTop: 12 }}>Organizer / Client Name</label>
            <input className="sp-input" placeholder="e.g. Tamil Nadu Cricket League Committee" defaultValue="Tamil Nadu Cricket League Committee" />

            <label className="sp-label" style={{ marginTop: 12 }}>Broadcast Production Package</label>
            <select className="sp-input">
              <option>Full Multi-Cam Rig + 4K Drone + TV Overlays (₹45,000 / match)</option>
              <option>Standard 2-Cam Pavilion & Pitch Rig (₹25,000 / match)</option>
              <option>Single Camera Webcast + Live AI Commentary (₹15,000 / match)</option>
            </select>

            <label className="sp-label" style={{ marginTop: 12 }}>Agreed Production Fee (₹)</label>
            <input className="sp-input" type="number" defaultValue="45000" />

            <label className="sp-label" style={{ marginTop: 12 }}>Match Date & Stadium Venue</label>
            <input className="sp-input" placeholder="e.g. 15 Nov 2026 • Main Oval Stadium" defaultValue="15 Nov 2026 • Main Oval Stadium" />

            <button
              type="button"
              className="btn btn--primary"
              style={{ width: '100%', marginTop: 20, padding: 14 }}
              onClick={() => {
                const newContract = {
                  id: `INV-BR-${Math.floor(100 + Math.random() * 900)}`,
                  client: 'State T20 Championship 2026',
                  amount: 45000,
                  date: '15 Nov 2026',
                  description: 'Full Multi-Cam Rig + 4K Drone + TV Overlays',
                  status: 'Advance Confirmed (Escrow)',
                }
                setContracts([newContract, ...contracts])
                setShowAddContractPage(false)
                showToast('Broadcast contract booked and locked in Escrow!')
              }}
            >
              Confirm & Book Contract
            </button>
          </div>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // MAIN BROADCAST PRODUCTION CONTROL ROOM
  // =========================================================================
  return (
    <Screen
      title="Live Streamer & Broadcast Desk"
      back={() => navigate('/app')}
      padded={false}
      right={
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span
            className="pulse-badge"
            style={{
              background: isOnAir ? '#e10613' : '#475569',
              boxShadow: isOnAir ? '0 0 10px #e10613' : 'none',
            }}
          />
          <span style={{ fontSize: 11, fontWeight: 800, color: isOnAir ? '#ef4444' : '#94a3b8' }}>
            {isOnAir ? 'ON AIR' : 'STANDBY'}
          </span>
        </div>
      }
    >
      <div className="streamer-portal-page">

        {/* Feedback Toast */}
        {toastMessage && (
          <div className="streamer-toast">
            <CheckCircle2 size={16} color="#00e676" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Master Broadcaster Control Banner */}
        <section className="streamer-hero-card">
          <div className="streamer-hero-top">
            <div className="streamer-brand-avatar">
              <Video size={24} color="#e10613" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <h1 className="streamer-brand-title">ScoringCast Live Studio</h1>
                <span className="sh-badge-chip" style={{ color: '#e10613', borderColor: 'rgba(225,6,19,0.3)' }}>
                  OFFICIAL BROADCASTER
                </span>
              </div>
              <p className="streamer-brand-sub">
                Lead Director: <strong>Karan Mehra</strong> • Multi-Cam Rig + 4K Drone
              </p>
            </div>

            {/* Master GO LIVE / STOP Button */}
            <button
              className={`master-broadcast-btn ${isOnAir ? 'live' : 'standby'}`}
              onClick={() => {
                const nextState = !isOnAir
                setIsOnAir(nextState)
                if (nextState) {
                  showToast('🔴 YOU ARE LIVE ON AIR! Transmitting to Scoring Heroes App & YouTube.')
                } else {
                  showToast('⏹ Broadcast ended. Stream archive saved to Cloud storage.')
                }
              }}
            >
              {isOnAir ? (
                <>
                  <Square size={16} fill="#fff" /> Stop Broadcast
                </>
              ) : (
                <>
                  <Play size={16} fill="#0a1628" /> Go Live Now
                </>
              )}
            </button>
          </div>

          {/* Telemetry Bar */}
          <div className="streamer-telemetry-grid">
            <div className="telemetry-box">
              <span className="telemetry-label">VIEWERS</span>
              <strong className="telemetry-val" style={{ color: '#38bdf8' }}>
                {isOnAir ? viewersCount.toLocaleString() : '0'}
              </strong>
            </div>
            <div className="telemetry-box">
              <span className="telemetry-label">BITRATE</span>
              <strong className="telemetry-val" style={{ color: isOnAir ? '#00e676' : '#94a3b8' }}>
                {isOnAir ? '6,850 kbps' : 'Idle'}
              </strong>
            </div>
            <div className="telemetry-box">
              <span className="telemetry-label">FPS / RES</span>
              <strong className="telemetry-val" style={{ color: '#f8fafc' }}>
                60 FPS • 1080p
              </strong>
            </div>
            <div className="telemetry-box">
              <span className="telemetry-label">DROPPED</span>
              <strong className="telemetry-val" style={{ color: '#00e676' }}>
                0.02%
              </strong>
            </div>
          </div>
        </section>

        {/* 4 Dedicated Tabs Navigation */}
        <div className="streamer-tabs-bar">
          {[
            { id: 'ingest', label: 'Ingest & Rig', icon: Radio },
            { id: 'overlays', label: 'TV Overlays', icon: Tv },
            { id: 'clips', label: 'Clip Desk', icon: Scissors },
            { id: 'revenue', label: 'Earnings & P&L', icon: DollarSign },
          ].map(tab => {
            const Icon = tab.icon
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                className={`streamer-tab-btn ${active ? 'active' : ''}`}
                onClick={() => setSearchParams({ tab: tab.id })}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* ===================================================================
            TAB 1: 📡 LIVE INGEST & STREAM KEYS
           =================================================================== */}
        {activeTab === 'ingest' && (
          <div className="streamer-tab-content">
            {/* Stream Keys Box */}
            <div className="sp-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Radio size={16} color="#e10613" />
                  <h3 className="sp-card-title" style={{ margin: 0 }}>RTMP Ingest Credentials</h3>
                </div>
                <button className="btn btn--secondary btn--sm" onClick={() => setShowHardwareGuidePage(true)}>
                  <Cpu size={13} /> OBS Guide
                </button>
              </div>

              {/* RTMP Server URL */}
              <label className="sp-label">Primary RTMP Ingest URL</label>
              <div className="copy-input-row">
                <input
                  className="sp-input"
                  readOnly
                  value="rtmp://live.scoringheroes.com/app/live"
                />
                <button
                  className="copy-btn"
                  onClick={() => handleCopy('rtmp://live.scoringheroes.com/app/live', 'url')}
                >
                  {copiedUrl ? <Check size={14} color="#00e676" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Stream Key */}
              <label className="sp-label" style={{ marginTop: 10 }}>
                Broadcast Stream Key (Keep Secret)
              </label>
              <div className="copy-input-row">
                <input
                  className="sp-input"
                  type={showStreamKey ? 'text' : 'password'}
                  readOnly
                  value="sh_live_sec_884920412"
                />
                <button
                  className="btn btn--secondary btn--sm"
                  style={{ padding: '0 8px', fontSize: 11 }}
                  onClick={() => setShowStreamKey(!showStreamKey)}
                >
                  {showStreamKey ? 'Hide' : 'Show'}
                </button>
                <button
                  className="copy-btn"
                  onClick={() => handleCopy('sh_live_sec_884920412', 'key')}
                >
                  {copiedKey ? <Check size={14} color="#00e676" /> : <Copy size={14} />}
                </button>
              </div>

              <div style={{ marginTop: 10, fontSize: 11, color: '#94a3b8', display: 'flex', gap: 4, alignItems: 'center' }}>
                <Shield size={12} color="#00e676" />
                <span>SSL Encrypted Ingest • SRT Low Latency Port: 9000</span>
              </div>
            </div>

            {/* Multi-Camera Program Switcher */}
            <div className="sp-card">
              <h3 className="sp-card-title">Multi-Camera Program Switcher</h3>
              <p className="sp-card-sub">Select the active live camera angle feeding the master broadcast program output.</p>

              <div className="cam-switcher-grid">
                {[
                  { id: 'cam1', name: 'Center Pavilion Cam 1', tag: 'Main Angle', fps: '60 FPS', res: '1080p' },
                  { id: 'cam2', name: 'Slip & Wicketkeeper Cam 2', tag: 'Action Low', fps: '60 FPS', res: '1080p' },
                  { id: 'cam3', name: '4K Boundary Drone Cam 3', tag: 'Aerial', fps: '60 FPS', res: '4K UHD' },
                  { id: 'cam4', name: 'Dugout & Ambience Cam 4', tag: 'Bench Mic', fps: '30 FPS', res: '1080p' },
                ].map(c => {
                  const isActive = activeCamera === c.id
                  return (
                    <div
                      key={c.id}
                      className={`cam-card ${isActive ? 'active' : ''}`}
                      onClick={() => {
                        setActiveCamera(c.id)
                        showToast(`Switched active live broadcast to ${c.name}`)
                      }}
                    >
                      <div className="cam-header">
                        <Camera size={14} color={isActive ? '#e10613' : '#94a3b8'} />
                        <span className="cam-tag">{c.tag}</span>
                        {isActive && <span className="cam-live-dot" />}
                      </div>
                      <strong className="cam-title">{c.name}</strong>
                      <span className="cam-meta">{c.res} • {c.fps}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Simulcast Destinations */}
            <div className="sp-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h3 className="sp-card-title" style={{ margin: 0 }}>Multi-Destination Simulcast</h3>
                <button className="btn btn--secondary btn--sm" onClick={() => setShowAddDestinationPage(true)}>
                  + Add Destination
                </button>
              </div>

              <div className="destinations-list">
                <div className="dest-row">
                  <div className="dest-info">
                    <Globe size={18} color="#00e676" />
                    <div>
                      <strong style={{ fontSize: 13, color: '#f8fafc' }}>Scoring Heroes Mobile App & Web</strong>
                      <span style={{ fontSize: 11, color: '#94a3b8', display: 'block' }}>Primary App Live Stream (HLS + WebRTC)</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={destinations.appLive}
                    onChange={e => setDestinations({ ...destinations, appLive: e.target.checked })}
                  />
                </div>

                <div className="dest-row">
                  <div className="dest-info">
                    <Video size={18} color="#ef4444" />
                    <div>
                      <strong style={{ fontSize: 13, color: '#f8fafc' }}>YouTube Live RTMP</strong>
                      <span style={{ fontSize: 11, color: '#94a3b8', display: 'block' }}>Connected: ScoringCast Cricket Live</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={destinations.youtube}
                    onChange={e => setDestinations({ ...destinations, youtube: e.target.checked })}
                  />
                </div>

                <div className="dest-row">
                  <div className="dest-info">
                    <Share2 size={18} color="#3b82f6" />
                    <div>
                      <strong style={{ fontSize: 13, color: '#f8fafc' }}>Facebook Live</strong>
                      <span style={{ fontSize: 11, color: '#94a3b8', display: 'block' }}>Target: Scoring Heroes Official Page</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={destinations.facebook}
                    onChange={e => setDestinations({ ...destinations, facebook: e.target.checked })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 2: 📺 LIVE MATCH GRAPHICS & TV OVERLAYS
           =================================================================== */}
        {activeTab === 'overlays' && (
          <div className="streamer-tab-content">
            {/* Live Program Monitor Simulator with Overlays */}
            <div className="sp-card" style={{ padding: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, padding: '0 4px' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#38bdf8' }}>MASTER PROGRAM PREVIEW (1080p)</span>
                <button className="btn btn--secondary btn--sm" onClick={() => setShowThemeCustomizePage(true)}>
                  <Sliders size={12} /> Theme Colors
                </button>
              </div>

              {/* 16:9 Screen Canvas */}
              <div className="program-screen-canvas">
                {/* Simulated Stadium Ground */}
                <div className="program-bg-img" />

                {/* Camera watermark */}
                <div className="program-cam-badge">
                  CAM: {activeCamera.toUpperCase()} • 60 FPS
                </div>

                {/* Persistent Sponsor Bug */}
                {overlays.sponsorWatermark && (
                  <div className="program-sponsor-bug">
                    <span>MATCH SPONSOR</span>
                    <strong>SUNRIDGES SS</strong>
                  </div>
                )}

                {/* Wicket Alert Animation */}
                {overlays.wicketAlert && (
                  <div className="program-wicket-flash">
                    <Flame size={20} color="#fff" />
                    <span>WICKET! CLEAN BOWLED!</span>
                  </div>
                )}

                {/* Milestone 50/100 Banner */}
                {overlays.milestoneBanner && (
                  <div className="program-milestone-banner">
                    <Award size={18} color="#f59e0b" />
                    <div>
                      <strong>FIFTY! 50* FOR ROHIT!</strong>
                      <small>32 balls • 5x4s, 3x6s • SR 156.2</small>
                    </div>
                  </div>
                )}

                {/* DRS Pending */}
                {overlays.drsPending && (
                  <div className="program-drs-banner">
                    ⚡ THIRD UMPIRE REVIEW PENDING • ULTRAEDGE SYNC
                  </div>
                )}

                {/* Lower-Third TV Scoreboard Bar */}
                {overlays.lowerThird && (
                  <div className={`program-lower-third ${activeTheme}`}>
                    <div className="lt-team-box">
                      <span className="lt-team-title">Scoring XI</span>
                      <strong className="lt-team-score">106/3</strong>
                      <span className="lt-overs">10.3 ov</span>
                    </div>

                    <div className="lt-batsman-box">
                      <div>
                        <strong>Rohit *</strong>
                        <span>42 (18)</span>
                      </div>
                      <div>
                        <span>Karan</span>
                        <span>18 (10)</span>
                      </div>
                    </div>

                    <div className="lt-bowler-box">
                      <span>BOWLER</span>
                      <strong>Vikram 1.3-0-21-1</strong>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Overlays Switchboard Controls */}
            <div className="sp-card">
              <h3 className="sp-card-title">TV Broadcast Overlays Switchboard</h3>
              <p className="sp-card-sub">Toggle on-air broadcast television graphics with zero latency.</p>

              <div className="overlay-toggle-list">
                <div className="overlay-toggle-item">
                  <div>
                    <strong style={{ fontSize: 13, color: '#f8fafc' }}>Lower-Third Score Bar</strong>
                    <span style={{ fontSize: 11, color: '#94a3b8', display: 'block' }}>Real-time team total, batsman runs/balls, bowler figures</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={overlays.lowerThird}
                    onChange={e => setOverlays({ ...overlays, lowerThird: e.target.checked })}
                  />
                </div>

                <div className="overlay-toggle-item">
                  <div>
                    <strong style={{ fontSize: 13, color: '#f8fafc' }}>Batsman Milestone Banner (50 / 100)</strong>
                    <span style={{ fontSize: 11, color: '#94a3b8', display: 'block' }}>Flash gold celebratory banner on boundary milestone</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={overlays.milestoneBanner}
                    onChange={e => setOverlays({ ...overlays, milestoneBanner: e.target.checked })}
                  />
                </div>

                <div className="overlay-toggle-item">
                  <div>
                    <strong style={{ fontSize: 13, color: '#f8fafc' }}>Wicket Alert Flash Card</strong>
                    <span style={{ fontSize: 11, color: '#94a3b8', display: 'block' }}>Red alert stinger banner upon dismissal</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={overlays.wicketAlert}
                    onChange={e => setOverlays({ ...overlays, wicketAlert: e.target.checked })}
                  />
                </div>

                <div className="overlay-toggle-item">
                  <div>
                    <strong style={{ fontSize: 13, color: '#f8fafc' }}>Sponsor Watermark Logo</strong>
                    <span style={{ fontSize: 11, color: '#94a3b8', display: 'block' }}>Persistent tournament title brand bug in top-right</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={overlays.sponsorWatermark}
                    onChange={e => setOverlays({ ...overlays, sponsorWatermark: e.target.checked })}
                  />
                </div>

                <div className="overlay-toggle-item">
                  <div>
                    <strong style={{ fontSize: 13, color: '#f8fafc' }}>DRS / Third Umpire Review Pending</strong>
                    <span style={{ fontSize: 11, color: '#94a3b8', display: 'block' }}>Decision pending banner with DRS timer</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={overlays.drsPending}
                    onChange={e => setOverlays({ ...overlays, drsPending: e.target.checked })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 3: ✂️ INSTANT MATCH CLIPS & HIGHLIGHT REELS
           =================================================================== */}
        {activeTab === 'clips' && (
          <div className="streamer-tab-content">
            {/* Quick 1-Tap Clip Actions */}
            <div className="sp-card">
              <h3 className="sp-card-title">Instant Live Clipping Desk</h3>
              <p className="sp-card-sub">Extract the last 30-60 seconds of video directly into high-res highlight reels.</p>

              <div className="quick-clip-grid">
                <button className="quick-clip-btn six" onClick={() => handleInstantClip('SIX')}>
                  <Zap size={16} />
                  <span>Clip Last 30s (Six)</span>
                </button>
                <button className="quick-clip-btn wicket" onClick={() => handleInstantClip('WICKET')}>
                  <Flame size={16} />
                  <span>Clip Wicket Fall</span>
                </button>
                <button className="quick-clip-btn catch" onClick={() => handleInstantClip('SUPER CATCH')}>
                  <Award size={16} />
                  <span>Clip Diving Catch</span>
                </button>
                <button className="quick-clip-btn general" onClick={() => handleInstantClip('BOUNDARY')}>
                  <Scissors size={16} />
                  <span>Clip Last 60s Reel</span>
                </button>
              </div>

              <div style={{ marginTop: 14 }}>
                <button
                  className="btn btn--secondary"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                  onClick={() => setShowMontageCreatorPage(true)}
                >
                  <Sparkles size={14} color="#a78bfa" /> Create Multi-Clip Highlight Montage
                </button>
              </div>
            </div>

            {/* Captured Clips Feed */}
            <div className="sp-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h3 className="sp-card-title" style={{ margin: 0 }}>Recorded Match Highlights ({clips.length})</h3>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>Auto-Synced to Cloud</span>
              </div>

              <div className="clips-feed-list">
                {clips.map(clip => (
                  <div key={clip.id} className="clip-card" style={{ cursor: 'pointer' }} onClick={() => setViewingClip(clip)}>
                    <div className="clip-thumb-box">
                      <img src={clip.thumbnail} alt={clip.title} />
                      <span className="clip-duration">{clip.duration}</span>
                      <span className={`clip-event-pill ${clip.event.toLowerCase().replace(' ', '-')}`}>
                        {clip.event}
                      </span>
                    </div>

                    <div className="clip-details">
                      <strong className="clip-title">{clip.title}</strong>
                      <div className="clip-meta">
                        <Clock size={11} /> {clip.time} • <Eye size={11} /> {clip.views} views
                      </div>

                      <div className="clip-actions">
                        {clip.published ? (
                          <span className="published-pill">
                            <CheckCircle2 size={12} /> Published on Reels
                          </span>
                        ) : (
                          <button
                            type="button"
                            className="btn btn--primary btn--sm"
                            style={{ padding: '6px 12px', fontSize: 11 }}
                            onClick={(e) => {
                              e.stopPropagation()
                              handlePublishClip(clip.id)
                            }}
                          >
                            🚀 Publish to Reels
                          </button>
                        )}
                        <button
                          type="button"
                          className="btn btn--secondary btn--sm"
                          style={{ padding: '6px 10px', fontSize: 11 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            showToast('Clip downloaded in 1080p MP4!')
                          }}
                        >
                          <Download size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 4: 💸 STREAM MONETIZATION, TIPS & REVENUE
           =================================================================== */}
        {activeTab === 'revenue' && (
          <div className="streamer-tab-content">
            {/* Broadcaster P&L Banner */}
            <div className="pnl-formula-banner">
              <span className="pnl-formula-label">BROADCASTER P&L MATH</span>
              <p className="pnl-formula-text">
                Net Profit = (Match Production Contracts + Super Chat Tips + Sponsor Ads) - Cloud CDN Costs
              </p>
            </div>

            {/* Financial KPI Cards */}
            <div className="revenue-kpi-grid">
              <div className="rev-kpi-card highlight">
                <span className="rev-kpi-label">TOTAL MONTHLY INFLOW</span>
                <strong className="rev-kpi-val" style={{ color: '#00e676' }}>₹92,400</strong>
                <span className="rev-kpi-sub">+18.4% vs last month</span>
              </div>
              <div className="rev-kpi-card">
                <span className="rev-kpi-label">MATCH CONTRACTS</span>
                <strong className="rev-kpi-val" style={{ color: '#38bdf8' }}>₹65,000</strong>
                <span className="rev-kpi-sub">4 Tournaments Covered</span>
              </div>
              <div className="rev-kpi-card">
                <span className="rev-kpi-label">FAN SUPER CHATS</span>
                <strong className="rev-kpi-val" style={{ color: '#ffc83d' }}>₹18,200</strong>
                <span className="rev-kpi-sub">142 Viewer Tips</span>
              </div>
              <div className="rev-kpi-card">
                <span className="rev-kpi-label">CLOUD CDN OUTFLOW</span>
                <strong className="rev-kpi-val" style={{ color: '#ef4444' }}>-₹4,800</strong>
                <span className="rev-kpi-sub">SRT / HLS Ingest Cost</span>
              </div>
            </div>

            {/* Quick Withdraw CTA */}
            <div className="withdraw-cta-box">
              <div>
                <strong style={{ fontSize: 14, color: '#f8fafc', display: 'block' }}>
                  Available Escrow Balance: ₹87,600
                </strong>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>Verified Current Bank Account linked</span>
              </div>
              <button className="btn btn--primary" onClick={() => setShowWithdrawPayoutPage(true)}>
                Withdraw Payout
              </button>
            </div>

            {/* Live Super Chat Feed */}
            <div className="sp-card">
              <h3 className="sp-card-title">Live Fan Super Chats & Tips</h3>
              <p className="sp-card-sub">Real-time viewer cheers and donations during live cricket streams.</p>

              <div className="super-chat-list">
                {[
                  { name: 'Kunal Sharma', amount: '₹500', comment: 'What a delivery by Vikram! Pure pace!', time: '12m ago', color: '#ffc83d' },
                  { name: 'Aditya Cricket Club', amount: '₹1,000', comment: 'Superb 60fps quality broadcast Karan!', time: '24m ago', color: '#00e676' },
                  { name: 'Sneha Patel', amount: '₹200', comment: 'Come on Rohit! Score that fifty!', time: '40m ago', color: '#38bdf8' },
                ].map((sc, i) => (
                  <div key={i} className="super-chat-card">
                    <div className="sc-header">
                      <strong style={{ color: '#f8fafc', fontSize: 13 }}>{sc.name}</strong>
                      <span className="sc-amount" style={{ color: sc.color }}>{sc.amount}</span>
                    </div>
                    <p className="sc-comment">"{sc.comment}"</p>
                    <span className="sc-time">{sc.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Match Production Contracts Ledger */}
            <div className="sp-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <h3 className="sp-card-title" style={{ margin: 0 }}>Tournament Production Contracts ({contracts.length})</h3>
                  <span style={{ fontSize: 11, color: '#94a3b8' }}>Secured by Automated Escrow Milestone Agreement</span>
                </div>
                <button
                  type="button"
                  className="btn btn--secondary btn--sm"
                  onClick={() => setShowAddContractPage(true)}
                >
                  + Book Contract
                </button>
              </div>
              <div className="contracts-table">
                {contracts.map((inv) => (
                  <div key={inv.id} className="contract-row">
                    <div>
                      <strong style={{ fontSize: 13, color: '#f8fafc', display: 'block' }}>{inv.client}</strong>
                      <span style={{ fontSize: 11, color: '#94a3b8' }}>{inv.id} • {inv.date}</span>
                      <small style={{ fontSize: 10, color: '#38bdf8', display: 'block' }}>{inv.status || 'Active Production'}</small>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <strong style={{ fontSize: 14, color: '#00e676', display: 'block' }}>₹{inv.amount.toLocaleString()}</strong>
                      <button
                        type="button"
                        className="btn btn--secondary btn--sm"
                        style={{ marginTop: 4, fontSize: 10, padding: '2px 8px' }}
                        onClick={() => setViewingInvoice(inv)}
                      >
                        <FileText size={11} /> Invoice
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Screen>
  )
}
