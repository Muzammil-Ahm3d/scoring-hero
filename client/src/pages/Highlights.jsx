import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  Video,
  Play,
  Pause,
  Sparkles,
  Share2,
  Flame,
  Zap,
  RotateCcw,
  Sliders,
  CheckCircle2,
  TrendingUp,
  Layers,
  Film,
  Camera,
  Scissors,
} from 'lucide-react'
import Screen from '../components/Screen'
import { HIGHLIGHT_CLIPS } from '../data/highlightsData'

export default function Highlights() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const clipParam = Number(searchParams.get('clip')) || 3
  const [selectedClip, setSelectedClip] = useState(clipParam)

  useEffect(() => {
    const p = Number(searchParams.get('clip'))
    if (p) setSelectedClip(p)
  }, [searchParams])

  // Feature 10.4 & 10.9 Mode: 'natural' | 'cinematic'
  const [highlightMode, setHighlightMode] = useState('cinematic')
  // Replay State
  const [isPlaying, setIsPlaying] = useState(true)
  // Generation state
  const [isGenerating, setIsGenerating] = useState(false)
  const [broadcastDone, setBroadcastDone] = useState(false)

  const clips = HIGHLIGHT_CLIPS

  const currentClip = clips.find((c) => c.id === selectedClip) || clips[0]

  const handleGenerateHighlight = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setBroadcastDone(true)
      setTimeout(() => setBroadcastDone(false), 4000)
    }, 1200)
  }

  return (
    <Screen
      back
      title="Video Highlights"
      subtitle="AI Event Detection & Ball Tracking"
    >
      <div className="highlights-page">
        {/* Main Interactive Stage (Screen as blueprint) */}
        <div className="highlight-stage-card">
          {/* Header banner */}
          <div className="stage-top-meta">
            <span className="stage-system-title">
              {currentClip.category === 'wicket'
                ? 'WICKET ANIMATION SYSTEM'
                : currentClip.category === 'milestone'
                ? 'MILESTONE HIGHLIGHT SYSTEM'
                : currentClip.category === 'partnership'
                ? 'PARTNERSHIP HIGHLIGHT SYSTEM'
                : 'BALL TRAJECTORY TRACKING SYSTEM'}
            </span>
            <span className="stage-event-badge">{currentClip.eventTag}</span>
          </div>

          {/* Synthetic Cricket Pitch Canvas / Replay Viewer */}
          <div className="synthetic-pitch-viewport">
            {/* Distance & Height Overlay (Feature 10.3) */}
            {currentClip.metrics.distance && (
              <div className="stat-floating-bubble">
                <span className="metric-primary">{currentClip.metrics.distance}</span>
                <span className="metric-dot">•</span>
                <span className="metric-secondary">{currentClip.metrics.height}</span>
              </div>
            )}

            {currentClip.category === 'wicket' && (
              <div className="stat-floating-bubble stat-floating-bubble--wicket">
                <span className="metric-primary">WICKET DETECTED</span>
                <span className="metric-dot">•</span>
                <span className="metric-secondary">{currentClip.metrics.speed}</span>
              </div>
            )}

            {currentClip.category === 'milestone' && (
              <div className="stat-floating-bubble stat-floating-bubble--milestone">
                <span className="metric-primary">50 RUNS UNLOCKED</span>
                <span className="metric-dot">•</span>
                <span className="metric-secondary">SR {currentClip.metrics.strikeRate}</span>
              </div>
            )}

            {/* SVG Visual Pitch, Bat, Wickets, and Ball Trajectory Arc (Feature 10.2) */}
            <svg viewBox="0 0 320 220" className="pitch-svg-canvas">
              {/* Pitch turf grass */}
              <rect x="50" y="140" width="220" height="70" rx="6" fill="#1b5e20" opacity="0.85" />
              <rect x="54" y="144" width="212" height="62" rx="4" fill="#2e7d32" opacity="0.6" />
              {/* Crease markings */}
              <line x1="80" y1="144" x2="80" y2="206" stroke="#ffffff" strokeWidth="2" opacity="0.7" />
              <line x1="240" y1="144" x2="240" y2="206" stroke="#ffffff" strokeWidth="2" opacity="0.7" />
              <line x1="160" y1="144" x2="160" y2="206" stroke="#ffffff" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />

              {/* Batsman Bat representation */}
              <g transform="translate(72, 85) rotate(-22)">
                <rect x="0" y="0" width="9" height="50" rx="3" fill="#ffb300" stroke="#ffe082" strokeWidth="1.5" />
                <rect x="2.5" y="50" width="4" height="24" rx="2" fill="#8d6e63" />
              </g>

              {/* Stumps */}
              <g transform="translate(68, 126)">
                <line x1="0" y1="0" x2="0" y2="26" stroke="#ffd54f" strokeWidth="3" />
                <line x1="5" y1="0" x2="5" y2="26" stroke="#ffd54f" strokeWidth="3" />
                <line x1="10" y1="0" x2="10" y2="26" stroke="#ffd54f" strokeWidth="3" />
                <line x1="-2" y1="0" x2="12" y2="0" stroke="#ffca28" strokeWidth="2" />
                {currentClip.category === 'wicket' && (
                  <line x1="10" y1="0" x2="18" y2="-12" stroke="#ff3d00" strokeWidth="3" className="stump-flying" />
                )}
              </g>

              {/* Trajectory Parabolic Curve (Feature 10.2 Ball Trajectory Tracking System) */}
              {currentClip.category !== 'wicket' ? (
                <>
                  <path
                    d="M 80 120 Q 165 20, 260 115"
                    fill="none"
                    stroke={highlightMode === 'cinematic' ? '#ff3b30' : '#ffffff'}
                    strokeWidth={highlightMode === 'cinematic' ? '3.5' : '2'}
                    strokeDasharray={highlightMode === 'cinematic' ? 'none' : '4 4'}
                    className="trajectory-path"
                  />
                  {/* Trajectory Key Points */}
                  <circle cx="115" cy="70" r="3.5" fill="#ff3b30" />
                  <circle cx="165" cy="40" r="4.5" fill="#ffd600" />
                  <circle cx="215" cy="65" r="3.5" fill="#ff3b30" />
                  {/* Glowing Ball with Glow Trail in Cinematic Mode */}
                  <circle
                    cx="260"
                    cy="115"
                    r="8"
                    fill="#ffffff"
                    stroke="#ff1744"
                    strokeWidth="3"
                    className={highlightMode === 'cinematic' ? 'ball-cinematic-glow' : ''}
                  />
                </>
              ) : (
                <>
                  {/* In-dipping Yorker ball path */}
                  <path
                    d="M 240 70 Q 150 110, 78 135"
                    fill="none"
                    stroke="#3de0ff"
                    strokeWidth="3"
                    strokeDasharray="3 3"
                  />
                  <circle cx="78" cy="135" r="7" fill="#ffffff" stroke="#ff3d00" strokeWidth="2.5" />
                </>
              )}
            </svg>

            {/* Play/Pause Watermark Overlay */}
            <button
              type="button"
              className="center-play-trigger"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause size={24} fill="#ffffff" /> : <Play size={24} fill="#ffffff" />}
            </button>
          </div>

          {/* Mode Switcher: Natural vs Cinematic (Feature 10.4 & 10.9) */}
          <div className="mode-toggle-bar">
            <span className="mode-label">REPLAY STYLE</span>
            <div className="mode-switch-group">
              <button
                type="button"
                className={`mode-btn ${highlightMode === 'natural' ? 'is-active' : ''}`}
                onClick={() => setHighlightMode('natural')}
              >
                NATURAL
              </button>
              <button
                type="button"
                className={`mode-btn mode-btn--cinematic ${highlightMode === 'cinematic' ? 'is-active' : ''}`}
                onClick={() => setHighlightMode('cinematic')}
              >
                <Sparkles size={12} /> CINEMATIC
              </button>
            </div>
          </div>

          {/* Clip Timeline Selector (Points 1 to 6 as blueprint) */}
          <div className="clip-timeline-section">
            <span className="timeline-heading">CLIP TIMELINE</span>
            <div className="clip-pills-row">
              {clips.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`timeline-num-btn ${selectedClip === c.id ? 'is-active' : ''}`}
                  onClick={() => setSelectedClip(c.id)}
                >
                  {c.id}
                </button>
              ))}
            </div>
          </div>

          {/* Big Action Button (Feature 10.1 & 10.8) */}
          <button
            type="button"
            className="btn btn--primary btn--full highlight-generate-btn"
            onClick={handleGenerateHighlight}
            disabled={isGenerating}
          >
            {isGenerating ? 'AI Rendering & Syncing Clip...' : 'GENERATE HIGHLIGHT'}
          </button>

          {broadcastDone && (
            <div className="highlight-success-toast">
              <CheckCircle2 size={16} color="#00e676" />
              <span>Highlight exported to Community Feed and ready for IG/X share!</span>
            </div>
          )}
        </div>

        {/* Feature 10.10 Social Integration for Highlights */}
        <div className="panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <h4 style={{ margin: 0, fontSize: 14 }}>Connected Highlight Sharing</h4>
            <span className="pill">One-Tap Sync</span>
          </div>
          <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 10px' }}>
            Auto-generate reels & short clips for player profile, Community buzz, and social channels.
          </p>
          <div className="social-action-chips">
            <button
              type="button"
              className="social-chip"
              onClick={() => navigate('/app/community')}
            >
              <Share2 size={14} color="var(--red-2)" /> Share to SH Community
            </button>
          </div>
        </div>

        {/* Key Moments Playlist */}
        <div className="panel">
          <h4 style={{ margin: '0 0 10px', fontSize: 14 }}>Key Match Replays</h4>
          <div className="clips-quick-list">
            {clips.map((c) => (
              <div
                key={c.id}
                className={`clip-item-card ${selectedClip === c.id ? 'is-selected' : ''}`}
                onClick={() => setSelectedClip(c.id)}
                role="button"
                tabIndex={0}
              >
                <div className="clip-thumb-indicator">
                  <Film size={16} color={selectedClip === c.id ? 'var(--red-2)' : 'var(--muted)'} />
                  <span>#{c.id}</span>
                </div>
                <div className="clip-meta-content">
                  <strong>{c.title}</strong>
                  <span>Ball {c.ball} • {c.subtitle}</span>
                </div>
                <span className="clip-badge-tag">{c.eventTag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Screen>
  )
}
