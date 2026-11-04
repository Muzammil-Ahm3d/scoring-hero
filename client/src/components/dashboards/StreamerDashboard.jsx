import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Video,
  Radio,
  Eye,
  Tv,
  CheckCircle2,
  Sliders,
  Play,
  Layers,
  Settings,
  Shield,
  Zap,
} from 'lucide-react'

export default function StreamerDashboard({ user }) {
  const navigate = useNavigate()
  const details = user?.roleDetails || {}

  const [isLive, setIsLive] = useState(false)
  const [streamHealth, setStreamHealth] = useState('Excellent • 60 FPS (1080p)')

  return (
    <div className="sh-dashboard-layout">
      {/* Streamer Hero Card */}
      <section className="sh-dash-hero-card sh-dash-hero-card--streamer" style={{ borderLeft: '4px solid #e10613' }}>
        <div className="sh-dash-hero-top">
          <div className="sh-dash-avatar-box">
            <div className="sh-avatar-hex" style={{ background: 'rgba(225, 6, 19, 0.2)', borderColor: '#e10613' }}>
              <Video size={24} color="#e10613" />
            </div>
            <div>
              <div className="sh-dash-hero-title-row">
                <h2>{details.channelName || 'ScoringCast Live Studio'}</h2>
                <span className="sh-badge-chip" style={{ color: '#e10613', borderColor: '#e1061355' }}>
                  LIVE BROADCASTER
                </span>
              </div>
              <p className="sh-dash-hero-sub">
                Broadcaster: <strong>{user?.nickname || 'Streamer_Karan'}</strong> • {details.broadcastTier || 'Pro Broadcast Rig'}
              </p>
              <small style={{ color: 'var(--muted)', fontSize: 11 }}>
                Location: {user?.city || 'Mumbai'} • Quality: {details.quality || '1080p 60fps'}
              </small>
            </div>
          </div>

          <div className="sh-dash-stat-pill" style={{ borderColor: '#e1061355' }}>
            <strong style={{ color: '#e10613' }}>{details.totalViewers || '48.2K'}</strong>
            <span>TOTAL REACH</span>
          </div>
        </div>

        {/* Streamer Status Bar */}
        <div className="sh-player-stats-bar" style={{ marginTop: 14 }}>
          <div className="sh-stat-box">
            <strong style={{ color: '#e10613' }}>{details.activeStreams || 2}</strong>
            <span>Active Feeds</span>
          </div>
          <div className="sh-stat-box">
            <strong style={{ color: '#00e676' }}>{streamHealth}</strong>
            <span>Stream Health</span>
          </div>
          <div className="sh-stat-box">
            <strong style={{ color: '#ffc83d' }}>{details.subscribers || '12.4K'}</strong>
            <span>Subscribers</span>
          </div>
          <div className="sh-stat-box">
            <strong>4K Drone</strong>
            <span>Boundary Link</span>
          </div>
        </div>
      </section>

      {/* Quick Action Shortcuts */}
      <div className="sh-quick-actions-grid">
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/streamer?tab=ingest')}>
          <div className="sh-action-icon" style={{ background: 'rgba(225,6,19,0.15)', color: '#e10613' }}>
            <Radio size={18} />
          </div>
          <span>Stream Ingest</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/streamer?tab=overlays')}>
          <div className="sh-action-icon" style={{ background: 'rgba(61,224,255,0.15)', color: '#3de0ff' }}>
            <Tv size={18} />
          </div>
          <span>TV Overlays</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/streamer?tab=clips')}>
          <div className="sh-action-icon" style={{ background: 'rgba(255,200,61,0.15)', color: '#ffc83d' }}>
            <Video size={18} />
          </div>
          <span>Clip Desk</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/streamer?tab=revenue')}>
          <div className="sh-action-icon" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676' }}>
            <Zap size={18} />
          </div>
          <span>Stream P&L</span>
        </button>
      </div>

      {/* Stream Control Room */}
      <section className="panel" style={{ padding: '14px 16px' }}>
        <header style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Radio size={18} color="#e10613" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Stream Control Room & Ingest Feed</h3>
          </div>
          <button
            type="button"
            className="btn btn--secondary btn--sm"
            onClick={() => navigate('/app/streamer')}
          >
            Open Broadcast Desk ↗
          </button>
        </header>

        <div style={{ background: 'rgba(255,255,255,0.02)', padding: 12, borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>RTMP INGEST SERVER</span>
              <code style={{ fontSize: 12, color: '#3de0ff', display: 'block' }}>rtmp://live.scoringheroes.com/app/live</code>
            </div>
            <button
              type="button"
              className="btn btn--sm"
              style={{ background: isLive ? '#ff2d3a' : '#00e676', color: '#020617', fontWeight: 'bold' }}
              onClick={() => setIsLive(!isLive)}
            >
              {isLive ? 'Stop Broadcast' : 'Go Live Now'}
            </button>
          </div>
          <small style={{ color: 'var(--muted)', fontSize: 11 }}>
            Stream Key: <strong style={{ color: '#ffc83d' }}>sh_live_sec_884920412</strong> • Target: Scoring Heroes App + YouTube + Facebook Live
          </small>
        </div>
      </section>
    </div>
  )
}
