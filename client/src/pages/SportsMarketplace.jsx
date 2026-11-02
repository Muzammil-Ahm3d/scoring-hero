import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ShoppingBag,
  ShoppingCart,
  ShieldCheck,
  CheckCircle2,
  Truck,
  Layers,
  Store,
  Sparkles,
  Plus,
  Minus,
  Search,
  RotateCcw,
  Clock,
  Check,
  X,
  MessageCircle,
  CreditCard,
  ChevronRight,
  Heart,
  Star,
  SlidersHorizontal,
} from 'lucide-react'
import Screen from '../components/Screen'
import { useMarket } from '../context/MarketContext'
import { CATEGORIES, BANNER_SLIDES, PRODUCTS } from '../data/sportsMarketplaceData'
import './SportsMarketplace.css'

export default function SportsMarketplace() {
  const navigate = useNavigate()
  const {
    cartCount,
    wishlistCount,
    addToCart: marketAddToCart,
    updateCartQty: marketUpdateCartQty,
    toggleWishlist: marketToggleWishlist,
    isInWishlist,
    getCartQty,
  } = useMarket()

  const [activeTab, setActiveTab] = useState('store')
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [toastMsg, setToastMsg] = useState('')

  // --- BANNER CAROUSEL STATE ---
  const [bannerIndex, setBannerIndex] = useState(0)
  const touchStartXRef = useRef(0)

  // Auto-advance banner every 3.8s
  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % BANNER_SLIDES.length)
    }, 3800)
    return () => clearInterval(timer)
  }, [])

  const handleBannerTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX
  }

  const handleBannerTouchEnd = (e) => {
    const diff = touchStartXRef.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setBannerIndex((prev) => (prev + 1) % BANNER_SLIDES.length)
      } else {
        setBannerIndex((prev) => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length)
      }
    }
  }

  const triggerToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 2500)
  }

  const toggleWishlist = (id, e) => {
    if (e) e.stopPropagation()
    const currentlyFav = isInWishlist(id)
    marketToggleWishlist(id)
    triggerToast(currentlyFav ? 'Removed from Wishlist' : 'Saved to Wishlist')
  }

  const addToCart = (product, e) => {
    if (e) e.stopPropagation()
    marketAddToCart(product, '', 1)
    triggerToast(`Added ${product.name.split(' ')[0]} to cart`)
  }

  const updateCartQty = (id, delta, e) => {
    if (e) e.stopPropagation()
    marketUpdateCartQty(id, undefined, delta)
  }

  // --- CUSTOM JERSEY STATE ---
  const [playerName, setPlayerName] = useState('ROHIT')
  const [jerseyNumber, setJerseyNumber] = useState('15')
  const [teamName, setTeamName] = useState('SH HEROES')
  const [jerseyColor, setJerseyColor] = useState('blue')

  const colorPalettes = [
    { id: 'blue', name: 'Royal Blue', primary: '#1d6dff', secondary: '#3de0ff', bg: '#0b1f54' },
    { id: 'red', name: 'Crimson Red', primary: '#e10613', secondary: '#ff6b77', bg: '#450a0f' },
    { id: 'gold', name: 'Gold', primary: '#f59e0b', secondary: '#fde047', bg: '#452b05' },
    { id: 'green', name: 'Emerald', primary: '#10b981', secondary: '#6ee7b7', bg: '#064e3b' },
  ]
  const currentColor = colorPalettes.find((c) => c.id === jerseyColor) || colorPalettes[0]

  // Filtered products
  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCat = activeCategory === 'all' || p.category === activeCategory
    const matchesQuery =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesQuery
  })

  return (
    <Screen
      back
      title="Sports Marketplace"
      padded={false}
      right={
        <div className="pd-header-actions">
          <button
            type="button"
            className="topbar__action-btn"
            onClick={() => navigate('/app/marketplace/wishlist')}
            aria-label="Wishlist"
            title="View Wishlist"
          >
            <Heart size={18} />
            {wishlistCount > 0 && <span className="topbar__badge">{wishlistCount}</span>}
          </button>
          <button
            type="button"
            className="topbar__action-btn"
            onClick={() => navigate('/app/marketplace/cart')}
            aria-label="Shopping Cart"
            title="View Shopping Cart"
          >
            <ShoppingCart size={18} />
            {cartCount > 0 && <span className="topbar__badge">{cartCount}</span>}
          </button>
        </div>
      }
    >
      <div className="sh-market-container">
        {/* Toast Feedback */}
        {toastMsg && (
          <div className="market-floating-toast">
            <Sparkles size={14} color="#ffc83d" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* ── 1. Clean Integrated Search Bar ── */}
        <div className="sh-market-search-row">
          <div className="sh-market-search-box">
            <Search size={16} color="#94a3b8" />
            <input
              type="text"
              placeholder="Search bats, jerseys, gear, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="sh-market-clear-btn"
                onClick={() => setSearchQuery('')}
              >
                <X size={14} />
              </button>
            )}
          </div>

          <button
            type="button"
            className="sh-market-filter-btn"
            onClick={() => {
              setActiveCategory('all')
              triggerToast('Reset filter: All Gear')
            }}
            title="Filter Categories"
          >
            <SlidersHorizontal size={17} />
          </button>
        </div>

        {/* ── 2. Marketplace Navigation Pills ── */}
        <div className="sh-market-tabs-row" role="tablist">
          <button
            type="button"
            className={`sh-market-tab-btn ${activeTab === 'store' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('store')}
          >
            <Store size={13} />
            <span>Factory Store</span>
          </button>
          <button
            type="button"
            className={`sh-market-tab-btn ${activeTab === 'jersey' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('jersey')}
          >
            <Sparkles size={13} />
            <span>Custom Jersey</span>
          </button>
          <button
            type="button"
            className={`sh-market-tab-btn ${activeTab === 'used' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('used')}
          >
            <RotateCcw size={13} />
            <span>Pre-Owned (OLX)</span>
          </button>
          <button
            type="button"
            className={`sh-market-tab-btn ${activeTab === 'bulk' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('bulk')}
          >
            <Layers size={13} />
            <span>Bulk Squad</span>
          </button>
          <button
            type="button"
            className={`sh-market-tab-btn ${activeTab === 'tracking' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('tracking')}
          >
            <Truck size={13} />
            <span>Track Order</span>
          </button>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* TAB 1: MAIN FACTORY STORE                                          */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'store' && (
          <>
            {/* ── 3. Crisp Hero Banner Carousel (No Mask, No Overlaid Text) ── */}
            <div
              className="sh-market-banner-carousel"
              onTouchStart={handleBannerTouchStart}
              onTouchEnd={handleBannerTouchEnd}
            >
              <div
                className="sh-market-banner-track"
                style={{ transform: `translateX(-${bannerIndex * 100}%)` }}
              >
                {BANNER_SLIDES.map((slide) => (
                  <div
                    key={slide.id}
                    className="sh-market-banner-slide"
                    onClick={() => {
                      setActiveCategory(slide.category)
                      triggerToast(`Filtered: ${slide.category.toUpperCase()}`)
                    }}
                  >
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className="sh-market-banner-img"
                    />
                  </div>
                ))}
              </div>

              {/* Sleek bottom indicator dots */}
              <div className="sh-market-banner-dots">
                {BANNER_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    className={`sh-market-banner-dot ${bannerIndex === idx ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setBannerIndex(idx)
                    }}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* ── 4. Circular Categories Selection ── */}
            <div className="sh-market-section-head">
              <h3 className="sh-market-section-title">Categories</h3>
              <button
                type="button"
                className="sh-market-view-all-link"
                onClick={() => setActiveCategory('all')}
              >
                View all
              </button>
            </div>

            <div className="sh-market-categories-scroll">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    className={`sh-market-cat-item ${isActive ? 'is-active' : ''}`}
                    onClick={() => {
                      setActiveCategory(cat.id)
                      triggerToast(`Filtered: ${cat.name}`)
                    }}
                  >
                    <div className="sh-market-cat-circle">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="sh-market-cat-img"
                      />
                    </div>
                    <span className="sh-market-cat-label">{cat.name}</span>
                  </button>
                )
              })}
            </div>

            {/* ── 5. Product Grid (2 Columns with Real Photos) ── */}
            <div className="sh-market-section-head">
              <h3 className="sh-market-section-title">
                {activeCategory === 'all'
                  ? 'Featured Equipment'
                  : CATEGORIES.find((c) => c.id === activeCategory)?.name || 'Products'}
                <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500, marginLeft: 6 }}>
                  ({filteredProducts.length})
                </span>
              </h3>
              {activeCategory !== 'all' && (
                <button
                  type="button"
                  className="sh-market-view-all-link"
                  onClick={() => setActiveCategory('all')}
                >
                  Clear Filter
                </button>
              )}
            </div>

            <div className="sh-market-products-grid">
              {filteredProducts.map((p) => {
                const isFav = isInWishlist(p.id)
                const qtyInCart = getCartQty(p.id)

                return (
                  <div
                    key={p.id}
                    className="sh-market-product-card"
                    onClick={() => navigate(`/app/marketplace/product/${p.id}`)}
                  >
                    {/* Top Row: Discount & Heart */}
                    <div className="sh-product-top-row">
                      <span className="sh-product-discount-pill">{p.discount}</span>
                      <button
                        type="button"
                        className={`sh-product-wishlist-btn ${isFav ? 'active' : ''}`}
                        onClick={(e) => toggleWishlist(p.id, e)}
                        aria-label="Wishlist"
                      >
                        <Heart size={13} fill={isFav ? '#ff3b50' : 'none'} />
                      </button>
                    </div>

                    {/* Real Product Image */}
                    <div className="sh-product-img-box">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="sh-product-real-img"
                      />
                    </div>

                    {/* Rating */}
                    <div className="sh-product-rating-row">
                      <Star size={10} fill="#f59e0b" color="#f59e0b" />
                      <span>{p.rating}</span>
                      <span className="sh-product-rating-count">({p.reviews})</span>
                    </div>

                    {/* Title & Spec */}
                    <h4 className="sh-product-title">{p.name}</h4>
                    <span className="sh-product-spec">{p.spec}</span>

                    {/* Price & Add */}
                    <div className="sh-product-bottom-row">
                      <div className="sh-product-pricing">
                        <span className="sh-product-price">₹{p.price.toLocaleString('en-IN')}</span>
                        <span className="sh-product-mrp">₹{p.mrp.toLocaleString('en-IN')}</span>
                      </div>

                      {qtyInCart > 0 ? (
                        <div className="sh-product-stepper">
                          <button
                            type="button"
                            className="sh-product-step-btn"
                            onClick={(e) => updateCartQty(p.id, -1, e)}
                          >
                            <Minus size={9} />
                          </button>
                          <span className="sh-product-step-qty">{qtyInCart}</span>
                          <button
                            type="button"
                            className="sh-product-step-btn"
                            onClick={(e) => updateCartQty(p.id, 1, e)}
                          >
                            <Plus size={9} />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="sh-product-add-btn"
                          onClick={(e) => addToCart(p, e)}
                        >
                          <Plus size={12} />
                          <span>ADD</span>
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* TAB 2: CUSTOM JERSEY STUDIO                                        */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'jersey' && (
          <div className="jersey-studio-container">
            <div
              className="jersey-live-stage"
              style={{
                background: `radial-gradient(circle at center, ${currentColor.bg} 0%, #07122e 80%)`,
              }}
            >
              <div className="jersey-live-graphic">
                <svg width="180" height="160" viewBox="0 0 140 130" fill="none">
                  <path
                    d="M40 20 L20 45 L35 55 L45 42 L45 115 L95 115 L95 42 L105 55 L120 45 L100 20 L80 32 Q70 38 60 32 Z"
                    fill={currentColor.primary}
                    stroke={currentColor.secondary}
                    strokeWidth="3"
                  />
                  <path d="M60 20 Q70 28 80 20" stroke="#ffffff" strokeWidth="2.5" fill="none" />
                  <text
                    x="70"
                    y="58"
                    fill="#ffffff"
                    fontSize="9.5"
                    fontWeight="900"
                    letterSpacing="1"
                    textAnchor="middle"
                  >
                    {teamName || 'SH HEROES'}
                  </text>
                  <text
                    x="70"
                    y="88"
                    fill="#ffffff"
                    fontSize="28"
                    fontWeight="900"
                    fontFamily="Outfit, sans-serif"
                    textAnchor="middle"
                  >
                    {jerseyNumber || '15'}
                  </text>
                  <text
                    x="70"
                    y="104"
                    fill={currentColor.secondary}
                    fontSize="7.5"
                    fontWeight="800"
                    letterSpacing="1.5"
                    textAnchor="middle"
                  >
                    {playerName || 'PLAYER'}
                  </text>
                </svg>
              </div>

              <div className="jersey-preview-status">
                <CheckCircle2 size={12} color="#10b981" />
                <span>DIRECT SUBLIMATION PRINT • MOISTURE-WICK POLY</span>
              </div>
            </div>

            <div className="jersey-control-section">
              <label className="control-label">SELECT JERSEY COLOR THEME</label>
              <div className="jersey-palette-grid">
                {colorPalettes.map((c) => (
                  <button
                    key={c.id}
                    className={`palette-btn ${jerseyColor === c.id ? 'active' : ''}`}
                    style={{ background: c.primary }}
                    onClick={() => {
                      setJerseyColor(c.id)
                      triggerToast(`Applied ${c.name} Theme`)
                    }}
                  >
                    {jerseyColor === c.id && <Check size={14} color="#fff" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="jersey-inputs-grid">
              <div className="input-group">
                <label>Player Name on Back</label>
                <input
                  type="text"
                  maxLength={12}
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value.toUpperCase())}
                  placeholder="ROHIT"
                />
              </div>
              <div className="input-group">
                <label>Jersey Number</label>
                <input
                  type="number"
                  min={1}
                  max={99}
                  value={jerseyNumber}
                  onChange={(e) => setJerseyNumber(e.target.value)}
                  placeholder="15"
                />
              </div>
            </div>

            <div className="jersey-action-card">
              <div className="jersey-price-box">
                <span className="jersey-main-price">₹899</span>
                <span className="jersey-mrp-price">₹1,499</span>
                <span className="jersey-discount-tag">40% OFF FACTORY DIRECT</span>
              </div>

              <div className="jersey-action-buttons">
                <button
                  className="market-red-cta-btn"
                  onClick={() => {
                    addToCart({
                      id: `custom-jersey-${Date.now()}`,
                      name: `Custom Jersey (${playerName} #${jerseyNumber})`,
                      price: 899,
                      image: '/market/jersey-pro.png',
                    })
                    setIsCartOpen(true)
                  }}
                >
                  <ShoppingCart size={16} />
                  <span>ADD CUSTOM JERSEY TO CART</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* TAB 3: PRE-OWNED (OLX STYLE)                                       */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'used' && (
          <div>
            <div className="used-info-banner">
              <RotateCcw size={20} color="#3de0ff" />
              <div>
                <div style={{ fontWeight: 800, fontSize: 13, color: '#fff' }}>
                  VERIFIED PRE-OWNED ATHLETE CRICKET GEAR
                </div>
                <div style={{ fontSize: 11, color: '#9aa8c7', marginTop: 2 }}>
                  Pre-knocked bats & gear authenticated by club captains
                </div>
              </div>
            </div>

            <div className="used-products-list">
              {[
                {
                  id: 'used-bat-1',
                  name: 'Kookaburra Kahuna Bat (Match Knocked)',
                  price: 2199,
                  originalMrp: 6500,
                  condition: 'Like New • Knocked in Nets',
                  seller: 'Arjun R. (Coastal Kings Club)',
                  location: 'Chennai Central',
                  image: '/market/bat-pro.png',
                  usage: '1 Season Used',
                },
                {
                  id: 'used-kitbag-1',
                  name: 'SS Premium Wheelie Kit Bag (Full Size)',
                  price: 1450,
                  originalMrp: 3400,
                  condition: 'Gently Used • All Zippers Good',
                  seller: 'Karan S. (City Academy)',
                  location: 'Adyar, Chennai',
                  image: '/market/kitbag-pro.png',
                  usage: '6 Months Used',
                },
              ].map((item) => (
                <div key={item.id} className="used-item-card">
                  <div className="used-item-top">
                    <span className="used-condition-badge">{item.condition}</span>
                    <span className="used-time-tag">{item.usage}</span>
                  </div>

                  <div className="used-item-main">
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: 44, height: 44, objectFit: 'contain' }}
                    />
                    <div className="used-details">
                      <h4 className="used-title">{item.name}</h4>
                      <div className="used-seller-row">
                        <CheckCircle2 size={12} color="#10b981" />
                        <span>{item.seller}</span>
                        <span className="seller-dot">•</span>
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="used-item-bottom">
                    <div className="used-pricing">
                      <span className="used-price">₹{item.price.toLocaleString('en-IN')}</span>
                      <span className="used-mrp">₹{item.originalMrp.toLocaleString('en-IN')}</span>
                      <span className="used-save-pill">Save 60%+</span>
                    </div>

                    <div className="used-action-btns">
                      <button
                        className="used-chat-btn"
                        onClick={() => triggerToast(`Connecting with ${item.seller.split(' ')[0]}...`)}
                      >
                        <MessageCircle size={14} />
                        <span>Chat</span>
                      </button>
                      <button
                        className="used-buy-btn"
                        onClick={() => addToCart(item)}
                      >
                        BUY NOW
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* TAB 4: BULK SQUAD ORDERS                                           */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'bulk' && (
          <div className="bulk-order-container">
            <div className="bulk-header-card">
              <Layers size={24} color="#ff3b50" />
              <div>
                <h3 style={{ margin: 0, fontSize: 15, color: '#fff' }}>ACADEMY & SQUAD BUNDLE PORTAL</h3>
                <p style={{ margin: '3px 0 0', fontSize: 11, color: '#9aa8c7' }}>
                  Wholesale team kit manufacturing with custom player names, numbers, and sponsor crests
                </p>
              </div>
            </div>

            <button
              className="market-red-cta-btn"
              style={{ marginTop: 14 }}
              onClick={() => {
                addToCart({
                  id: 'bulk-squad-sample',
                  name: 'Full Squad Bundle (18 Kits Custom Sublimation)',
                  price: 16200,
                  image: '/market/jersey-pro.png',
                })
                setIsCartOpen(true)
              }}
            >
              <ShoppingCart size={16} />
              <span>CONFIRM 18 SQUAD KITS ORDER (₹16,200)</span>
            </button>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* TAB 5: ORDER TRACKING                                              */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'tracking' && (
          <div className="order-tracking-card">
            <div className="order-tracking-header">
              <div>
                <span className="order-id-badge">ACTIVE SHIPMENT #SH-2048</span>
                <h3 style={{ margin: '6px 0 2px', fontSize: 15, color: '#fff' }}>
                  Team Squad Equipment & Bats
                </h3>
                <div style={{ fontSize: 11, color: '#9aa8c7' }}>Ordered on 14 July • Express Air</div>
              </div>
              <span className="order-status-pill in-transit">IN TRANSIT</span>
            </div>

            <div className="logistics-details-box">
              <div className="logistics-item">
                <Truck size={14} color="#3de0ff" />
                <div>
                  <div className="logistics-label">COURIER PARTNER</div>
                  <div className="logistics-val">BlueDart Express (Air Cargo)</div>
                </div>
              </div>
              <div className="logistics-item">
                <Clock size={14} color="#10b981" />
                <div>
                  <div className="logistics-label">ESTIMATED DELIVERY</div>
                  <div className="logistics-val">Tomorrow, before 6:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Screen>
  )
}
