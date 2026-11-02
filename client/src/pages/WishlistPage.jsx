import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowRight,
  Star,
  ShieldCheck,
  Package,
  Sparkles,
} from 'lucide-react'
import Screen from '../components/Screen'
import { useMarket } from '../context/MarketContext'
import { PRODUCTS } from '../data/sportsMarketplaceData'
import './WishlistPage.css'

export default function WishlistPage() {
  const navigate = useNavigate()
  const { wishlist, wishlistCount, removeFromWishlist, moveToCart, cartCount } = useMarket()
  const [toastMsg, setToastMsg] = useState('')

  const triggerToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 2200)
  }

  // Find product details for all IDs in wishlist
  const wishlistProducts = wishlist
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean)

  const handleMoveToCart = (p) => {
    moveToCart(p.id)
    triggerToast(`Moved ${p.name.split(' ')[0]} to Cart`)
  }

  const handleRemove = (id, name) => {
    removeFromWishlist(id)
    triggerToast(`Removed ${name.split(' ')[0]} from Wishlist`)
  }

  return (
    <Screen
      back
      title={`My Wishlist (${wishlistCount})`}
      padded={false}
      right={
        <button
          type="button"
          className="topbar__action-btn"
          onClick={() => navigate('/app/marketplace/cart')}
          aria-label="Shopping Cart"
          title="View Shopping Cart"
        >
          <ShoppingCart size={19} />
          {cartCount > 0 && <span className="topbar__badge">{cartCount}</span>}
        </button>
      }
    >
      <div className="wl-page-container">
        {/* Floating Toast */}
        {toastMsg && (
          <div className="wl-floating-toast">
            <Sparkles size={14} color="#ffc83d" />
            <span>{toastMsg}</span>
          </div>
        )}

        {wishlistProducts.length === 0 ? (
          <div className="wl-empty-state">
            <div className="wl-empty-icon-wrap">
              <Heart size={48} color="#e10613" />
            </div>
            <h3 className="wl-empty-title">Your Wishlist is Empty</h3>
            <p className="wl-empty-desc">
              Explore our factory outlet and save your favorite bats, jerseys, and pro match equipment for later!
            </p>
            <button
              type="button"
              className="wl-empty-btn"
              onClick={() => navigate('/app/marketplace')}
            >
              <span>Explore Factory Store</span>
              <ArrowRight size={15} />
            </button>
          </div>
        ) : (
          <div className="wl-items-grid">
            {wishlistProducts.map((p) => (
              <div
                key={p.id}
                className="wl-card"
                onClick={() => navigate(`/app/marketplace/product/${p.id}`)}
              >
                {/* Product Image Frame with Clean Background */}
                <div className="wl-img-box">
                  <span className="wl-discount-pill">{p.discount}</span>
                  <button
                    type="button"
                    className="wl-remove-icon-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemove(p.id, p.name)
                    }}
                    title="Remove from wishlist"
                    aria-label="Remove item"
                  >
                    <Trash2 size={14} />
                  </button>
                  <img src={p.image} alt={p.name} className="wl-prod-img" />
                </div>

                {/* Info Block */}
                <div className="wl-card-content">
                  <div className="wl-brand-row">
                    <span className="wl-brand-tag">{p.brand}</span>
                    <span className="wl-rating">
                      <Star size={10} fill="#f59e0b" color="#f59e0b" />
                      <span>{p.rating}</span>
                    </span>
                  </div>

                  <h4 className="wl-prod-title">{p.name}</h4>
                  <p className="wl-prod-spec">{p.spec}</p>

                  <div className="wl-price-row">
                    <span className="wl-price">₹{p.price.toLocaleString('en-IN')}</span>
                    <span className="wl-mrp">₹{p.mrp.toLocaleString('en-IN')}</span>
                  </div>

                  {/* Actions: Move to Cart & Remove */}
                  <div className="wl-action-buttons">
                    <button
                      type="button"
                      className="wl-move-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleMoveToCart(p)
                      }}
                    >
                      <ShoppingCart size={13} />
                      <span>Move to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Screen>
  )
}
