import { useEffect, useState, useRef, useCallback } from 'react'
import { ArrowRight, Volume2, VolumeX } from 'lucide-react'
import './FlashScreen.css'

export default function FlashScreen({ onFinish, duration = 3000, autoTransition = true }) {
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const hasFinishedRef = useRef(false)
  const audioCtxRef = useRef(null)

  // Lightweight synthesized audio for sports stadium ambience
  function playIntroSound() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (!AudioContext) return
      const ctx = audioCtxRef.current || new AudioContext()
      audioCtxRef.current = ctx
      if (ctx.state === 'suspended') {
        ctx.resume()
      }

      // Deep sports sub bass hit
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(150, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(36, ctx.currentTime + 0.9)

      gain.gain.setValueAtTime(0.35, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 1.2)
    } catch {
      // Audio policy safe
    }
  }

  const handleComplete = useCallback(() => {
    if (hasFinishedRef.current) return
    hasFinishedRef.current = true
    setIsExiting(true)
    setTimeout(() => {
      if (typeof onFinish === 'function') {
        onFinish()
      }
    }, 450)
  }, [onFinish])

  useEffect(() => {
    if (soundEnabled) {
      playIntroSound()
    }
  }, [soundEnabled])

  useEffect(() => {
    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const pct = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(pct)

      if (elapsed >= duration && autoTransition) {
        clearInterval(interval)
        handleComplete()
      }
    }, 30)

    // Keyboard accessibility
    function handleKeyDown(e) {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        handleComplete()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      clearInterval(interval)
      window.removeEventListener('keydown', handleKeyDown)
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [duration, autoTransition, handleComplete])

  return (
    <div
      className={`sh-flash-screen ${isExiting ? 'sh-flash-exiting' : ''}`}
      onClick={handleComplete}
      role="banner"
      aria-label="Scoring Heroes Flash Screen"
    >
      {/* Desktop Ambient Stadium Backdrop */}
      <div className="sh-flash-desktop-backdrop">
        <img
          src="/splash-bg.jpg"
          alt=""
          aria-hidden="true"
          className="sh-flash-ambient-img"
        />
        <div className="sh-flash-ambient-blur" />
      </div>

      {/* Main Flash Stage / Mobile Frame */}
      <div className="sh-flash-phone-frame">
        {/* Background Stadium & Batsman Artwork */}
        <div className="sh-flash-bg-container">
          <img
            src="/splash-bg.jpg"
            alt="Scoring Heroes Batsman and Stadium"
            className="sh-flash-stadium-img"
          />
          <div className="sh-flash-vignette" />
          <div className="sh-flash-glow-left" />
          <div className="sh-flash-glow-right" />

          {/* Floating light sparks */}
          <div className="sh-flash-particles">
            {[...Array(12)].map((_, i) => (
              <span
                key={i}
                className="sh-flash-particle"
                style={{
                  left: `${(i * 8 + 5) % 96}%`,
                  width: `${(i % 3) * 2 + 2.5}px`,
                  height: `${(i % 3) * 2 + 2.5}px`,
                  background:
                    i % 2 === 0
                      ? 'radial-gradient(circle, #ff3b50, rgba(255, 59, 80, 0))'
                      : 'radial-gradient(circle, #38bdf8, rgba(56, 189, 248, 0))',
                  animationDelay: `${(i * 0.3).toFixed(2)}s`,
                  animationDuration: `${3 + (i % 3)}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Top Controls Bar */}
        <div className="sh-flash-top-bar">
          <button
            type="button"
            className="sh-flash-skip-btn"
            onClick={(e) => {
              e.stopPropagation()
              setSoundEnabled((prev) => !prev)
            }}
            title={soundEnabled ? 'Mute sound' : 'Enable sound'}
          >
            {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
            <span>{soundEnabled ? 'Sound On' : 'Sound Off'}</span>
          </button>

          <button
            type="button"
            className="sh-flash-skip-btn"
            onClick={handleComplete}
          >
            <span>Skip</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* Center 3D Helmet Logo & Typography */}
        <div className="sh-flash-center-hero">
          <div className="sh-flash-helmet-wrap">
            <div className="sh-flash-helmet-aura" />
            <img
              src="/helmet-logo.png"
              alt="Scoring Heroes Helmet"
              className="sh-flash-helmet-img"
            />
          </div>

          <div className="sh-flash-brand-text">
            <h1 className="sh-flash-title-scoring">SCORING</h1>
            <h2 className="sh-flash-title-heroes">HEROES</h2>
          </div>
        </div>

        {/* Bottom Batsman Silhouette Spacer & Loading Area */}
        <div className="sh-flash-bottom-area">
          <div className="sh-flash-loader-box">
            <div className="sh-flash-progress-track">
              <div
                className="sh-flash-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="sh-flash-status-text">
              <span>Entering Arena</span>
              <span style={{ color: '#ef4444' }}>•</span>
              <span>{progress}%</span>
            </div>
          </div>

          <div className="sh-flash-tap-cue" onClick={handleComplete}>
            Tap anywhere to enter
          </div>
        </div>
      </div>
    </div>
  )
}
