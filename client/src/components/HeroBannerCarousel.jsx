import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Trophy,
  Megaphone,
  ShoppingBag,
  PlaySquare,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Radio,
  Flame,
  CheckCircle2,
} from 'lucide-react'
import './HeroBannerCarousel.css'

const HERO_SLIDES = [
  {
    id: 'world-updates',
    category: 'LIVE WORLD & NATIONAL SPORTS',
    categoryColor: '#ef4444',
    badgeText: 'LIVE MATCH',
    badgePulse: true,
    title: 'ICC World T20 & National Pro League 2026',
    subtitle: 'India vs Australia Super 8 decider live at 7:30 PM IST · Real-time ball trajectory AI radar & pitch heatmaps.',
    ticker: {
      team1: 'IND 192/4 (18.5 ov)',
      team2: 'AUS 188/8 (20 ov)',
      status: '⚡ Target: 4 runs needed in 7 balls · Req RR: 3.4',
    },
    primaryBtn: { label: 'Match Center', to: '/app/matches', icon: Trophy },
    secondaryBtn: { label: 'Live Scorer', to: '/app/scorer' },
    bgClass: 'hero-slide--cricket',
  },
  {
    id: 'admin-news',
    category: 'ADMIN OFFICIAL BULLETIN',
    categoryColor: '#3b82f6',
    badgeText: 'VERIFIED NOTICE',
    badgePulse: false,
    title: 'National Talent Scouting & Academy Scholarships 2026',
    subtitle: 'Official Selection Trials for U17 & U23 across 14 state venues. Anti-fraud verified athlete profiles receive direct trial invites!',
    highlights: [
      '🏅 250+ Direct Academy Scholarships',
      '🛡️ Aadhaar Verified Anti-Fraud Profiles Only',
      '📅 State Trials Start: Nov 15, 2026',
    ],
    primaryBtn: { label: 'Read Bulletin', to: '/app/epaper', icon: Megaphone },
    secondaryBtn: { label: 'Verify Aadhaar', to: '/app/aadhaar' },
    bgClass: 'hero-slide--admin',
  },
  {
    id: 'store-offers',
    category: 'PRO STORE MEGA OFFERS',
    categoryColor: '#10b981',
    badgeText: 'UP TO 40% OFF',
    badgePulse: false,
    title: 'Grade 1 English Willow Bats, Kits & Team Jerseys',
    subtitle: 'Gear up with match-ready SS/SG bats, carbon pads, and official team sublimation jerseys.',
    highlights: [
      '🏏 Grade 1 Hand-Crafted Willow Bats from ₹3,499',
      '👕 Custom Sublimated Team Jerseys @ ₹699',
      '🚚 Free All-India Express Dispatch > ₹2,999',
    ],
    primaryBtn: { label: 'Shop Gear Deals', to: '/app/marketplace', icon: ShoppingBag },
    secondaryBtn: { label: '3D Team Jersey', to: '/app/avatar/jersey' },
    bgClass: 'hero-slide--offers',
  },
  {
    id: 'video-highlights',
    category: '4K VIDEOS & REPLAYS',
    categoryColor: '#a855f7',
    badgeText: 'TRENDING REELS',
    badgePulse: false,
    title: 'Watch 4K Match Replays & AI Ball Trajectories',
    subtitle: 'Stream instant multi-angle boundary reels, yorker compilations, and AI match predictive simulations updated hourly.',
    highlights: [
      '🔥 Super 8 Final Over Thriller Highlights',
      '⚡ AI Hawk-Eye Ball Trajectory Analysis',
      '🎙️ Multi-lingual AI Audio Commentary',
    ],
    primaryBtn: { label: 'Watch Video Hub', to: '/app/highlights', icon: PlaySquare },
    secondaryBtn: { label: 'AI Simulations', to: '/app/aimatch' },
    bgClass: 'hero-slide--videos',
  },
]

const QUICK_FILTERS = [
  { id: 'all', label: '🔥 All Updates', index: 0 },
  { id: 'world', label: '⚡ World Live', index: 0 },
  { id: 'news', label: '📢 News', index: 1 },
  { id: 'shop', label: '🛍️ Gear Offers', index: 2 },
  { id: 'videos', label: '🎥 Videos', index: 3 },
]

export default function HeroBannerCarousel() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  // Auto-advance carousel every 4.5 seconds when not hovered/touched
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 4500)

    return () => clearInterval(timer)
  }, [isPaused])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
  }

  const handleTouchStart = (e) => {
    setIsPaused(true)
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    setIsPaused(false)
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
  }

  const slide = HERO_SLIDES[currentSlide]

  return (
    <div
      className="sh-hero-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Quick Category Filter Pills */}
      <div className="sh-hero-filters" role="tablist">
        {QUICK_FILTERS.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className={`sh-hero-filter-pill ${currentSlide === filter.index ? 'is-active' : ''}`}
            onClick={() => setCurrentSlide(filter.index)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Main Banner Card */}
      <div className={`sh-hero-card ${slide.bgClass}`}>
        {/* Card Header Tag & Badge */}
        <div className="sh-hero-card__header">
          <span className="sh-hero-card__category" style={{ color: slide.categoryColor }}>
            {slide.category}
          </span>
          <span className={`sh-hero-card__badge ${slide.badgePulse ? 'is-live' : ''}`}>
            {slide.badgePulse && <span className="sh-hero-live-dot" />}
            {slide.badgeText}
          </span>
        </div>

        {/* Card Title & Description */}
        <h2 className="sh-hero-card__title">{slide.title}</h2>
        <p className="sh-hero-card__subtitle">{slide.subtitle}</p>

        {/* Dynamic Metric Box or Key Highlights */}
        {slide.ticker ? (
          <div className="sh-hero-ticker">
            <div className="sh-hero-ticker__scores">
              <span className="sh-hero-ticker__team">{slide.ticker.team1}</span>
              <span className="sh-hero-ticker__vs">vs</span>
              <span className="sh-hero-ticker__team">{slide.ticker.team2}</span>
            </div>
            <div className="sh-hero-ticker__status">{slide.ticker.status}</div>
          </div>
        ) : slide.highlights ? (
          <div className="sh-hero-highlights">
            {slide.highlights.map((item, idx) => (
              <div key={idx} className="sh-hero-highlight-item">
                <CheckCircle2 size={13} className="sh-hero-check-icon" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        ) : null}

        {/* Call to Actions */}
        <div className="sh-hero-card__actions">
          <button
            type="button"
            className="sh-hero-btn sh-hero-btn--primary"
            onClick={() => navigate(slide.primaryBtn.to)}
          >
            {slide.primaryBtn.icon && <slide.primaryBtn.icon size={15} />}
            <span>{slide.primaryBtn.label}</span>
            <ArrowRight size={14} />
          </button>

          {slide.secondaryBtn && (
            <button
              type="button"
              className="sh-hero-btn sh-hero-btn--secondary"
              onClick={() => navigate(slide.secondaryBtn.to)}
            >
              <span>{slide.secondaryBtn.label}</span>
            </button>
          )}
        </div>

        {/* Arrow Navigation */}
        <button
          type="button"
          className="sh-hero-nav-arrow sh-hero-nav-arrow--prev"
          onClick={prevSlide}
          aria-label="Previous Slide"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          type="button"
          className="sh-hero-nav-arrow sh-hero-nav-arrow--next"
          onClick={nextSlide}
          aria-label="Next Slide"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Slide Dots Indicator */}
      <div className="sh-hero-dots" role="tablist" aria-label="Slide indicators">
        {HERO_SLIDES.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            className={`sh-hero-dot ${idx === currentSlide ? 'is-active' : ''}`}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
