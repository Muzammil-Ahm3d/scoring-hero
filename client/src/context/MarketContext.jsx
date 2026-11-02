import { createContext, useContext, useState, useEffect } from 'react'
import { PRODUCTS } from '../data/sportsMarketplaceData'

const MarketContext = createContext()

export function MarketProvider({ children }) {
  // ── CART STATE ──
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('sh_cart')
      if (saved) return JSON.parse(saved)
    } catch {
      // fallback
    }
    return [
      {
        id: 'pro-bat-1',
        name: 'SS Master Pro Grade 1 English Willow',
        price: 4999,
        mrp: 8999,
        qty: 1,
        image: '/market/bat-pro.png',
        variant: '1180g - 1190g (Standard Match)',
      },
      {
        id: 'team-jersey-1',
        name: 'SH Heroes Pro Team Jersey',
        price: 899,
        mrp: 1499,
        qty: 1,
        image: '/market/jersey-pro.png',
        variant: 'L (Chest 42")',
      },
    ]
  })

  // ── WISHLIST STATE ──
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('sh_wishlist')
      if (saved) return JSON.parse(saved)
    } catch {
      // fallback
    }
    return ['pro-bat-1', 'match-ball-1', 'helmet-1']
  })

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('sh_cart', JSON.stringify(cart))
    } catch {
      // ignore
    }
  }, [cart])

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem('sh_wishlist', JSON.stringify(wishlist))
    } catch {
      // ignore
    }
  }, [wishlist])

  // Calculations
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const cartGst = Math.round(cartSubtotal * 0.12)
  const cartDelivery = cartSubtotal > 1500 || cartSubtotal === 0 ? 0 : 99
  const cartGrandTotal = cartSubtotal > 0 ? cartSubtotal + cartGst + cartDelivery : 0
  const wishlistCount = wishlist.length

  // Cart actions
  const addToCart = (product, variantLabel = '', qty = 1) => {
    const defaultVariant =
      variantLabel || (product.variants ? product.variants[0]?.label : '') || ''
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id && i.variant === defaultVariant)
      if (existing) {
        return prev.map((i) =>
          i.id === product.id && i.variant === defaultVariant ? { ...i, qty: i.qty + qty } : i
        )
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          mrp: product.mrp,
          qty,
          image: product.image,
          variant: defaultVariant,
        },
      ]
    })
  }

  const updateCartQty = (id, variant, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id && (variant === undefined || item.variant === variant)) {
            const newQty = item.qty + delta
            return newQty > 0 ? { ...item, qty: newQty } : null
          }
          return item
        })
        .filter(Boolean)
    )
  }

  const removeFromCart = (id, variant) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && (variant === undefined || item.variant === variant)))
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartQty = (productId) => {
    const items = cart.filter((i) => i.id === productId)
    return items.reduce((sum, i) => sum + i.qty, 0)
  }

  // Wishlist actions
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId)
      }
      return [...prev, productId]
    })
  }

  const isInWishlist = (productId) => wishlist.includes(productId)

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((id) => id !== productId))
  }

  const moveToCart = (productId) => {
    const prod = PRODUCTS.find((p) => p.id === productId)
    if (prod) {
      addToCart(prod, '', 1)
      removeFromWishlist(productId)
    }
  }

  const moveToWishlist = (cartItem) => {
    removeFromCart(cartItem.id, cartItem.variant)
    if (!wishlist.includes(cartItem.id)) {
      setWishlist((prev) => [...prev, cartItem.id])
    }
  }

  return (
    <MarketContext.Provider
      value={{
        cart,
        cartCount,
        cartSubtotal,
        cartGst,
        cartDelivery,
        cartGrandTotal,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        getCartQty,
        wishlist,
        wishlistCount,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        moveToCart,
        moveToWishlist,
      }}
    >
      {children}
    </MarketContext.Provider>
  )
}

export function useMarket() {
  const ctx = useContext(MarketContext)
  if (!ctx) {
    throw new Error('useMarket must be used within a MarketProvider')
  }
  return ctx
}
