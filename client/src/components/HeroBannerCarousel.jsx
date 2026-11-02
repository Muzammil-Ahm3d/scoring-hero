import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './HeroBannerCarousel.css'

const HOME_BANNER_SLIDES = [
  {
    id: 'world-live',
    image: '/market/banner-world.png',
    alt: 'ICC World T20 & Live National Matches - Real-time AI Radar & Match Hub',
    category: 'world',
    to: '/app/matches',
    title: 'Live World Matches',
  },
  {
    id: 'news-scouting',
    image: '/market/banner-news.png',
    alt: 'National Talent Scouting Trials & Academy Scholarships 2026',
    category: 'news',
    to: '/app/epaper',
    title: 'Official News & Scholarships',
  },
  {
    id: 'gear-store',
    image: '/market/banner-hero.png',
    alt: 'Pro Store Mega Deals - Grade 1 English Willow Bats & Match Gear',
    category: 'shop',
    to: '/app/marketplace',
    title: 'Pro Store Mega Offers',
  },
  {
    id: 'video-highlights',
    image: '/market/banner-videos.png',
    alt: '4K Match Replays & AI Hawk-Eye Ball Trajectory Hub',
    category: 'videos',
    to: '/app/highlights',
    title: '4K Videos & Replays',
  },
]

const QUICK_FILTERS = [
  { id: 'all', label: '🔥 All Updates', slideIndex: 0 },
  { id: 'world', label: '⚡ World Live', slideIndex: 0 },
  { id: 'news', label: '📢 News', slideIndex: 1 },
  { id: 'shop', label: '🛍️ Gear Offers', slideIndex: 2 },
  { id: 'videos', label: '🎥 Videos', slideIndex: 3 },
]

export default function HeroBannerCarousel() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  // Auto-advance carousel every 4 seconds when not hovered/touched
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HOME_BANNER_SLIDES.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [isPaused])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HOME_BANNER_SLIDES.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HOME_BANNER_SLIDES.length) % HOME_BANNER_SLIDES.length)
  }

  const handleTouchStart = (e) => {
    setIsPaused(true)
    touchStartX.current = e.touches[0].clientX
    touchEndX.current = e.touches[0].clientX
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

  return (
    <div
      className="sh-hero-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Quick Category Filter Pills */}
      <div className="sh-hero-filters" role="tablist">
        {QUICK_FILTERS.map((filter) => {
          const isActive =
            filter.id === 'all'
              ? currentSlide === 0
              : currentSlide === filter.slideIndex
          return (
            <button
              key={filter.id}
              type="button"
              className={`sh-hero-filter-pill ${isActive ? 'is-active' : ''}`}
              onClick={() => setCurrentSlide(filter.slideIndex)}
            >
              {filter.label}
            </button>
          )
        })}
      </div>

      {/* Proper Image Banner Carousel (matching the shop page carousel design) */}
      <div
        className="sh-hero-banner-frame"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="sh-hero-banner-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {HOME_BANNER_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className="sh-hero-banner-slide"
              onClick={() => navigate(slide.to)}
              title={slide.title}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') navigate(slide.to)
              }}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="sh-hero-banner-img"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>

        {/* Sleek bottom indicator dots */}
        <div className="sh-hero-banner-dots">
          {HOME_BANNER_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              className={`sh-hero-banner-dot ${currentSlide === idx ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                setCurrentSlide(idx)
              }}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
