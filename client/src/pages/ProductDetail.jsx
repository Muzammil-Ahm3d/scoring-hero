import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Heart,
  ShoppingCart,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  Sparkles,
  Share2,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Check,
  Package,
} from 'lucide-react'
import Screen from '../components/Screen'
import { useMarket } from '../context/MarketContext'
import { PRODUCTS } from '../data/sportsMarketplaceData'
import './ProductDetail.css'

export default function ProductDetail() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const {
    cartCount,
    wishlistCount,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useMarket()

  // Find product from shared catalog
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0]

  // Image gallery state
  const [activeImage, setActiveImage] = useState(product.image)
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants ? product.variants[0]?.id : null
  )
  const [quantity, setQuantity] = useState(1)
  const [toastMsg, setToastMsg] = useState('')

  const isFav = isInWishlist(product.id)

  // Ensure Product Details page starts from the very top (0px)
  useEffect(() => {
    setActiveImage(product.image)
    setSelectedVariant(product.variants ? product.variants[0]?.id : null)
    setQuantity(1)
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    const screenBodies = document.querySelectorAll('.screen__body')
    screenBodies.forEach((b) => {
      b.scrollTop = 0
    })
  }, [productId, product])

  const triggerToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 2500)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} on Scoring Heroes Sports Marketplace!`,
          url: window.location.href,
        })
      } catch {
        // user cancelled or not allowed
      }
    } else {
      navigator.clipboard?.writeText?.(window.location.href)
      triggerToast('Link copied to clipboard!')
    }
  }

  const handleAddToCart = (e) => {
    if (e) e.stopPropagation()
    const chosenVariantLabel =
      product.variants?.find((v) => v.id === selectedVariant)?.label || ''
    addToCart(product, chosenVariantLabel, quantity)
    triggerToast(`Added ${quantity} × ${product.name.split(' ')[0]} to cart`)
  }

  const handleBuyNow = () => {
    const chosenVariantLabel =
      product.variants?.find((v) => v.id === selectedVariant)?.label || ''
    addToCart(product, chosenVariantLabel, quantity)
    navigate('/app/marketplace/cart')
  }

  // Suggested products list
  const suggestedProducts = PRODUCTS.filter((p) => {
    if (p.id === product.id) return false
    if (product.suggestedIds && product.suggestedIds.includes(p.id)) return true
    return p.category === product.category
  }).slice(0, 4)

  const savingsAmount = product.mrp - product.price

  return (
    <Screen
      back
      title={product.brand.split(' ')[0] + ' Store'}
      padded={false}
      right={
        <div className="pd-header-actions">
          <button
            type="button"
            className="pd-header-btn"
            onClick={handleShare}
            aria-label="Share Product"
            title="Share Product"
          >
            <Share2 size={17} />
          </button>
          <button
            type="button"
            className={`pd-header-btn ${isFav ? 'active' : ''}`}
            onClick={() => {
              toggleWishlist(product.id)
              triggerToast(isFav ? 'Removed from Wishlist' : 'Saved to Wishlist')
            }}
            aria-label="Wishlist"
            title="Wishlist"
          >
            <Heart
              size={17}
              fill={isFav ? '#ff3b50' : 'none'}
              color={isFav ? '#ff3b50' : '#cbd5e1'}
            />
            {wishlistCount > 0 && <span className="pd-header-badge">{wishlistCount}</span>}
          </button>
          <button
            type="button"
            className="pd-header-btn pd-cart-btn"
            onClick={() => navigate('/app/marketplace/cart')}
            aria-label="Shopping Cart"
            title="Shopping Cart"
          >
            <ShoppingCart size={17} />
            {cartCount > 0 && <span className="pd-header-badge">{cartCount}</span>}
          </button>
        </div>
      }
    >
      <div className="pd-page-container">
        {/* Floating Toast Notification */}
        {toastMsg && (
          <div className="pd-floating-toast">
            <Sparkles size={14} color="#ffc83d" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* ── 1. Compact Hero Image Showcase (Clean White Background, Balanced Height) ── */}
        <div className="pd-gallery-section">
          <div className="pd-main-img-box">
            <span className="pd-discount-badge">{product.discount}</span>
            <span className="pd-verified-badge">
              <ShieldCheck size={12} color="#38bdf8" />
              <span>Certified Original</span>
            </span>
            <img
              src={activeImage}
              alt={product.name}
              className="pd-main-img"
            />
          </div>

          {/* Gallery Thumbnails Strip */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="pd-thumbs-strip">
              {product.gallery.map((thumbUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`pd-thumb-btn ${activeImage === thumbUrl ? 'is-active' : ''}`}
                  onClick={() => setActiveImage(thumbUrl)}
                >
                  <img src={thumbUrl} alt={`Angle ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── 2. Product Title & Brand Info ── */}
        <div className="pd-info-card">
          <div className="pd-brand-row">
            <span className="pd-brand-tag">{product.brand}</span>
            <span className="pd-stock-pill">
              <span className="pd-stock-dot" /> In Stock · Factory Hub
            </span>
          </div>

          <h1 className="pd-product-title">{product.name}</h1>
          <p className="pd-spec-line">{product.spec}</p>

          {/* Rating & Reviews */}
          <div className="pd-rating-block">
            <div className="pd-rating-pill">
              <Star size={11} fill="#f59e0b" color="#f59e0b" />
              <span>{product.rating}</span>
            </div>
            <span className="pd-review-count">{product.reviews} Player Reviews</span>
            <span className="pd-verified-buyers">· 100% Verified Match Buyers</span>
          </div>

          {/* Pricing Row */}
          <div className="pd-pricing-box">
            <div className="pd-price-main-row">
              <span className="pd-current-price">₹{product.price.toLocaleString('en-IN')}</span>
              <span className="pd-mrp-price">₹{product.mrp.toLocaleString('en-IN')}</span>
              <span className="pd-discount-tag">{product.discount}</span>
            </div>
            <div className="pd-savings-pill">
              You Save ₹{savingsAmount.toLocaleString('en-IN')} (Direct Factory Price)
            </div>
            <div className="pd-tax-note">Inclusive of GST · Free Shipping on orders over ₹1,500</div>
          </div>
        </div>

        {/* ── 3. Interactive Variant Selector ── */}
        {product.variants && product.variants.length > 0 && (
          <div className="pd-section-card">
            <h3 className="pd-section-title">{product.variantLabel || 'Select Variant'}</h3>
            <div className="pd-variants-grid">
              {product.variants.map((v) => {
                const isSelected = selectedVariant === v.id
                return (
                  <button
                    key={v.id}
                    type="button"
                    className={`pd-variant-btn ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => {
                      setSelectedVariant(v.id)
                      triggerToast(`Selected: ${v.label}`)
                    }}
                  >
                    <span>{v.label}</span>
                    {isSelected && <Check size={13} className="pd-variant-check" />}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* ── 4. Key Highlights & Bullet Points ── */}
        <div className="pd-section-card">
          <h3 className="pd-section-title">Key Equipment Highlights</h3>
          <p className="pd-short-desc">{product.shortDesc}</p>
          <div className="pd-highlights-list">
            {product.highlights.map((item, idx) => (
              <div key={idx} className="pd-highlight-item">
                <CheckCircle2 size={14} color="#10b981" className="pd-hl-icon" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 5. Detailed Specifications Table ── */}
        {product.specs && (
          <div className="pd-section-card">
            <h3 className="pd-section-title">Technical Specifications</h3>
            <div className="pd-specs-table">
              {Object.entries(product.specs).map(([key, val], idx) => (
                <div key={idx} className="pd-spec-row">
                  <span className="pd-spec-key">{key}</span>
                  <span className="pd-spec-val">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 6. Quality & Delivery Assurance Strip ── */}
        <div className="pd-assurance-grid">
          <div className="pd-assurance-item">
            <ShieldCheck size={18} color="#3de0ff" />
            <div>
              <strong>100% Genuine</strong>
              <span>Direct factory seal & barcode</span>
            </div>
          </div>
          <div className="pd-assurance-item">
            <Truck size={18} color="#10b981" />
            <div>
              <strong>Fast Dispatch</strong>
              <span>Ships within 24 hours</span>
            </div>
          </div>
          <div className="pd-assurance-item">
            <RotateCcw size={18} color="#ffc83d" />
            <div>
              <strong>7-Day Replacement</strong>
              <span>Hassle-free manufacturing warranty</span>
            </div>
          </div>
          <div className="pd-assurance-item">
            <Package size={18} color="#ff2d3a" />
            <div>
              <strong>Pro Packaging</strong>
              <span>Impact-proof air tube shipping</span>
            </div>
          </div>
        </div>

        {/* ── 7. SUGGESTED PRODUCTS SECTION ── */}
        <div className="pd-suggested-section">
          <div className="pd-suggested-head">
            <div>
              <h3 className="pd-suggested-title">Suggested Products</h3>
              <p className="pd-suggested-sub">Frequently bought together to complete your kit</p>
            </div>
            <button
              type="button"
              className="pd-suggested-all-btn"
              onClick={() => navigate('/app/marketplace')}
            >
              <span>Explore All</span>
              <ChevronRight size={13} />
            </button>
          </div>

          <div className="pd-suggested-grid">
            {suggestedProducts.map((sp) => (
              <div
                key={sp.id}
                className="pd-suggested-card"
                onClick={() => navigate(`/app/marketplace/product/${sp.id}`)}
              >
                <div className="pd-suggested-img-wrap">
                  <span className="pd-suggested-discount">{sp.discount}</span>
                  <img src={sp.image} alt={sp.name} className="pd-suggested-img" />
                </div>
                <div className="pd-suggested-info">
                  <div className="pd-suggested-rating">
                    <Star size={9} fill="#f59e0b" color="#f59e0b" />
                    <span>{sp.rating}</span>
                  </div>
                  <h4 className="pd-suggested-name">{sp.name}</h4>
                  <div className="pd-suggested-price-row">
                    <span className="pd-suggested-price">₹{sp.price.toLocaleString('en-IN')}</span>
                    <span className="pd-suggested-mrp">₹{sp.mrp.toLocaleString('en-IN')}</span>
                  </div>
                  <button
                    type="button"
                    className="pd-suggested-add-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/app/marketplace/product/${sp.id}`)
                    }}
                  >
                    <span>View Equipment</span>
                    <ArrowRight size={11} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 8. Floating Bottom Sticky Action Bar ── */}
      <div className="pd-sticky-foot">
        <div className="pd-foot-content">
          <div className="pd-foot-qty-row">
            <span className="pd-foot-qty-label">Quantity</span>
            <div className="pd-foot-stepper">
              <button
                type="button"
                className="pd-foot-step-btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Minus size={13} />
              </button>
              <span className="pd-foot-step-val">{quantity}</span>
              <button
                type="button"
                className="pd-foot-step-btn"
                onClick={() => setQuantity((q) => q + 1)}
              >
                <Plus size={13} />
              </button>
            </div>
          </div>

          <div className="pd-foot-buttons-row">
            <button
              type="button"
              className="pd-foot-cart-btn"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={15} />
              <span>Add to Cart</span>
            </button>
            <button
              type="button"
              className="pd-foot-buy-btn"
              onClick={handleBuyNow}
            >
              <span>Buy Now · ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
            </button>
          </div>
        </div>
      </div>
    </Screen>
  )
}
