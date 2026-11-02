import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ShoppingCart,
  Heart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  Tag,
  CheckCircle2,
  Sparkles,
  MapPin,
  Lock,
} from 'lucide-react'
import Screen from '../components/Screen'
import { useMarket } from '../context/MarketContext'
import './CartPage.css'

export default function CartPage() {
  const navigate = useNavigate()
  const {
    cart,
    cartCount,
    cartSubtotal,
    cartGst,
    cartDelivery,
    cartGrandTotal,
    updateCartQty,
    removeFromCart,
    clearCart,
    moveToWishlist,
    wishlistCount,
  } = useMarket()

  const [toastMsg, setToastMsg] = useState('')
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState('')

  const triggerToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 2500)
  }

  // Free shipping threshold is 1500
  const freeShipThreshold = 1500
  const amountNeeded = Math.max(0, freeShipThreshold - cartSubtotal)
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShipThreshold) * 100))

  // Coupon discount calculation
  const couponDiscount = appliedCoupon ? Math.round(cartSubtotal * appliedCoupon.rate) : 0
  const finalPayable = Math.max(0, cartGrandTotal - couponDiscount)

  const handleApplyCoupon = (e) => {
    e.preventDefault()
    const code = couponCode.trim().toUpperCase()
    if (!code) return

    if (code === 'HERO10' || code === 'FIRST10') {
      setAppliedCoupon({ code, rate: 0.1, label: '10% Extra Off' })
      triggerToast('Coupon HERO10 applied: 10% Extra Savings!')
    } else if (code === 'HERO20' || code === 'SUPER20') {
      setAppliedCoupon({ code, rate: 0.2, label: '20% Mega Off' })
      triggerToast('Coupon applied: 20% Mega Savings!')
    } else {
      triggerToast('Invalid coupon. Try HERO10 or SUPER20')
    }
  }

  const handleCheckout = () => {
    const generatedId = `SH-${Math.floor(100000 + Math.random() * 900000)}`
    setOrderId(generatedId)
    setIsOrderPlaced(true)
    clearCart()
  }

  return (
    <Screen
      back
      title={`My Cart (${cartCount})`}
      padded={false}
      right={
        <button
          type="button"
          className="topbar__action-btn"
          onClick={() => navigate('/app/marketplace/wishlist')}
          aria-label="Wishlist"
          title="View Wishlist"
        >
          <Heart size={19} />
          {wishlistCount > 0 && <span className="topbar__badge">{wishlistCount}</span>}
        </button>
      }
    >
      <div className="cart-page-container">
        {/* Floating Toast */}
        {toastMsg && (
          <div className="cart-floating-toast">
            <Sparkles size={14} color="#ffc83d" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* ── ORDER SUCCESS MODAL OVERLAY ── */}
        {isOrderPlaced && (
          <div className="cart-success-overlay">
            <div className="cart-success-modal">
              <div className="cart-success-icon-wrap">
                <CheckCircle2 size={54} color="#10b981" />
              </div>
              <h2 className="cart-success-title">Order Confirmed!</h2>
              <p className="cart-success-order-num">Order ID: #{orderId}</p>
              <p className="cart-success-desc">
                Your sports equipment order has been confirmed and forwarded directly to the factory dispatch hub.
              </p>
              <div className="cart-success-details">
                <div className="cart-success-detail-row">
                  <span>Estimated Delivery</span>
                  <strong>Within 48 Hours</strong>
                </div>
                <div className="cart-success-detail-row">
                  <span>Payment Mode</span>
                  <strong>Direct Factory Cash / UPI on Delivery</strong>
                </div>
              </div>
              <button
                type="button"
                className="cart-success-btn"
                onClick={() => navigate('/app/marketplace')}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}

        {cart.length === 0 && !isOrderPlaced ? (
          <div className="cart-empty-state">
            <div className="cart-empty-icon-wrap">
              <ShoppingCart size={48} color="#94a3b8" />
            </div>
            <h3 className="cart-empty-title">Your Cart is Empty</h3>
            <p className="cart-empty-desc">
              Looks like you haven't added any gear yet. Discover tournament bats, pro team jerseys, and match balls directly from factory outlets!
            </p>
            <button
              type="button"
              className="cart-empty-btn"
              onClick={() => navigate('/app/marketplace')}
            >
              <span>Explore Factory Store</span>
              <ArrowRight size={15} />
            </button>
          </div>
        ) : (
          <>
            {/* ── 1. Free Delivery Progress Banner ── */}
            <div className="cart-delivery-card">
              <div className="cart-delivery-head">
                <div className="cart-delivery-title-box">
                  <Truck size={17} color={amountNeeded === 0 ? '#10b981' : '#38bdf8'} />
                  <span>
                    {amountNeeded === 0 ? (
                      <strong>🎉 Congratulations! Free Delivery Unlocked</strong>
                    ) : (
                      <>
                        Add <strong>₹{amountNeeded.toLocaleString('en-IN')}</strong> more for{' '}
                        <strong>FREE Express Delivery</strong>
                      </>
                    )}
                  </span>
                </div>
                <span className="cart-delivery-percent">{progressPercent}%</span>
              </div>
              <div className="cart-progress-bar-bg">
                <div
                  className="cart-progress-bar-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* ── 2. Cart Items List ── */}
            <div className="cart-items-section">
              <h3 className="cart-section-title">Equipment In Cart ({cartCount})</h3>
              <div className="cart-items-list">
                {cart.map((item, idx) => {
                  const itemTotal = item.price * item.qty
                  return (
                    <div key={`${item.id}-${idx}`} className="cart-item-card">
                      {/* Product Image Frame */}
                      <div
                        className="cart-item-img-box"
                        onClick={() => navigate(`/app/marketplace/product/${item.id}`)}
                      >
                        <img src={item.image} alt={item.name} className="cart-item-img" />
                      </div>

                      {/* Item Details */}
                      <div className="cart-item-info">
                        <div className="cart-item-head">
                          <h4
                            className="cart-item-name"
                            onClick={() => navigate(`/app/marketplace/product/${item.id}`)}
                          >
                            {item.name}
                          </h4>
                          <button
                            type="button"
                            className="cart-item-trash-btn"
                            onClick={() => {
                              removeFromCart(item.id, item.variant)
                              triggerToast(`Removed ${item.name.split(' ')[0]} from cart`)
                            }}
                            title="Remove item"
                            aria-label="Remove item"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        {item.variant && (
                          <span className="cart-item-variant">{item.variant}</span>
                        )}

                        <div className="cart-item-bottom">
                          <div className="cart-item-price-block">
                            <span className="cart-item-price">
                              ₹{itemTotal.toLocaleString('en-IN')}
                            </span>
                            {item.qty > 1 && (
                              <span className="cart-item-unit-price">
                                (₹{item.price.toLocaleString('en-IN')} each)
                              </span>
                            )}
                          </div>

                          {/* Stepper */}
                          <div className="cart-item-stepper">
                            <button
                              type="button"
                              onClick={() => updateCartQty(item.id, item.variant, -1)}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={11} />
                            </button>
                            <span>{item.qty}</span>
                            <button
                              type="button"
                              onClick={() => updateCartQty(item.id, item.variant, 1)}
                              aria-label="Increase quantity"
                            >
                              <Plus size={11} />
                            </button>
                          </div>
                        </div>

                        {/* Save to Wishlist */}
                        <button
                          type="button"
                          className="cart-item-save-wishlist"
                          onClick={() => {
                            moveToWishlist(item)
                            triggerToast(`Moved ${item.name.split(' ')[0]} to Wishlist`)
                          }}
                        >
                          <Heart size={11} />
                          <span>Move to Wishlist</span>
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* ── 3. Delivery Address Preview Card ── */}
            <div className="cart-address-card">
              <div className="cart-address-head">
                <div className="cart-address-title">
                  <MapPin size={16} color="#e10613" />
                  <span>Delivery Address</span>
                </div>
                <span className="cart-address-tag">Home</span>
              </div>
              <p className="cart-address-text">
                Sports Academy Ground Campus, Sector 4, Chennai - 600028
              </p>
              <div className="cart-address-note">
                <ShieldCheck size={13} color="#10b981" />
                <span>Verified Express Route · Dispatched within 24 Hours</span>
              </div>
            </div>

            {/* ── 4. Apply Coupon Box ── */}
            <div className="cart-coupon-card">
              <form onSubmit={handleApplyCoupon} className="cart-coupon-form">
                <Tag size={16} color="#38bdf8" />
                <input
                  type="text"
                  placeholder="Enter Sports Voucher (e.g. HERO10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button type="submit" className="cart-coupon-btn">
                  Apply
                </button>
              </form>
              {appliedCoupon && (
                <div className="cart-coupon-applied">
                  <CheckCircle2 size={13} color="#10b981" />
                  <span>
                    Voucher <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.label})
                  </span>
                </div>
              )}
            </div>

            {/* ── 5. Detailed Bill Summary ── */}
            <div className="cart-bill-card">
              <h3 className="cart-section-title">Price Breakdown</h3>
              <div className="cart-bill-rows">
                <div className="cart-bill-row">
                  <span>Item Total (Subtotal)</span>
                  <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {appliedCoupon && (
                  <div className="cart-bill-row text-savings">
                    <span>Coupon Discount</span>
                    <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="cart-bill-row">
                  <span>GST (12% Sports Equipment)</span>
                  <span>₹{cartGst.toLocaleString('en-IN')}</span>
                </div>
                <div className="cart-bill-row">
                  <span>Express Delivery Charges</span>
                  <span className={cartDelivery === 0 ? 'text-savings' : ''}>
                    {cartDelivery === 0 ? 'FREE' : `₹${cartDelivery}`}
                  </span>
                </div>
                <div className="cart-bill-divider" />
                <div className="cart-bill-total-row">
                  <span>Total Amount Payable</span>
                  <span className="cart-bill-final-price">
                    ₹{finalPayable.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* ── 6. Fixed Bottom Checkout Bar ── */}
            <div className="cart-sticky-foot">
              <div className="cart-foot-content">
                <div className="cart-foot-total-col">
                  <span className="cart-foot-label">Total Payable</span>
                  <span className="cart-foot-price">
                    ₹{finalPayable.toLocaleString('en-IN')}
                  </span>
                </div>
                <button
                  type="button"
                  className="cart-checkout-btn"
                  onClick={handleCheckout}
                >
                  <Lock size={15} />
                  <span>1-Click Secure Checkout</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </Screen>
  )
}
