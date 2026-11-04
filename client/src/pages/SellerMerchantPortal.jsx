import { useState, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  Package,
  ShoppingBag,
  Truck,
  DollarSign,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  Phone,
  FileText,
  Printer,
  ChevronRight,
  Sparkles,
  Download,
  Building,
  ShieldCheck,
  RotateCcw,
  Tag,
  Boxes,
  Send,
  SlidersHorizontal,
  ExternalLink,
} from 'lucide-react'
import Screen from '../components/Screen'
import { useAuth } from '../context/AuthContext'
import './SellerMerchantPortal.css'

export default function SellerMerchantPortal() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { user } = useAuth()

  // Active Tab from query param (default: 'inventory')
  const currentTab = searchParams.get('tab') || 'inventory'
  const setActiveTab = (tab) => {
    setSearchParams({ tab })
  }

  // --- FLOATING TOAST NOTIFICATION ---
  const [toastMsg, setToastMsg] = useState('')
  const triggerToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 2800)
  }

  // =========================================================================
  // SUB-PAGE STATES (Strictly Dedicated Pages, ZERO POPUPS / MODALS)
  // =========================================================================
  const [showAddProductPage, setShowAddProductPage] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [viewingInvoiceOrder, setViewingInvoiceOrder] = useState(null)
  const [showManualOrderPage, setShowManualOrderPage] = useState(false)
  const [showTaxStatementPage, setShowTaxStatementPage] = useState(false)

  // =========================================================================
  // 1. INVENTORY & CATALOG STATE
  // =========================================================================
  const [inventorySearch, setInventorySearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [stockStatusFilter, setStockStatusFilter] = useState('all')

  const [products, setProducts] = useState([
    {
      id: 'prod-1',
      sku: 'SKU-BAT-ENG-01',
      title: 'Apex Pro Grade 1 English Willow Cricket Bat',
      category: 'bats',
      categoryLabel: 'English Willow Bats',
      image: '/market/bat-pro.png',
      grade: 'Grade 1 Hand-Crafted English Willow',
      weight: '1180g (Short Handle)',
      stock: 12,
      retailPrice: 14500,
      wholesalePrice: 11800,
      minWholesaleQty: 5,
      status: 'in_stock',
      salesCount: 84,
    },
    {
      id: 'prod-2',
      sku: 'SKU-BAL-WHT-12',
      title: 'Match Pro White Leather Balls (Box of 12)',
      category: 'balls',
      categoryLabel: 'Leather Match Balls',
      image: '/market/ball-pro.png',
      grade: 'Alum Tanned 4-Piece Leather • 156g',
      weight: 'Box of 12 Balls',
      stock: 24,
      retailPrice: 7800,
      wholesalePrice: 6200,
      minWholesaleQty: 3,
      status: 'in_stock',
      salesCount: 142,
    },
    {
      id: 'prod-3',
      sku: 'SKU-PAD-CLB-04',
      title: 'Titan Test Ultralight Moulded Batting Pads',
      category: 'protective',
      categoryLabel: 'Protective Gear',
      image: '/market/pads-pro.png',
      grade: 'High-Density Foam & Gel Knee Cup',
      weight: 'Men’s Right & Left Hand',
      stock: 3,
      retailPrice: 4200,
      wholesalePrice: 3400,
      minWholesaleQty: 6,
      status: 'low_stock',
      salesCount: 65,
    },
    {
      id: 'prod-4',
      sku: 'SKU-JER-SUB-15',
      title: 'Full Team Sublimation Pro Jersey Kit (15 Sets)',
      category: 'jerseys',
      categoryLabel: 'Customised Jerseys',
      image: '/market/jersey-pro.png',
      grade: '100% Moisture-Wicking Poly Interlock',
      weight: 'Custom S, M, L, XL with Player Names',
      stock: 8,
      retailPrice: 22500,
      wholesalePrice: 18000,
      minWholesaleQty: 1,
      status: 'in_stock',
      salesCount: 39,
    },
    {
      id: 'prod-5',
      sku: 'SKU-GLV-PRO-07',
      title: 'Pro Impact Pittards Leather Batting Gloves',
      category: 'protective',
      categoryLabel: 'Protective Gear',
      image: '/market/gloves-pro.png',
      grade: 'Premium Pittards Sheepskin & Split Fingers',
      weight: 'Adult Men Right Hand',
      stock: 2,
      retailPrice: 3100,
      wholesalePrice: 2500,
      minWholesaleQty: 8,
      status: 'low_stock',
      salesCount: 78,
    },
    {
      id: 'prod-6',
      sku: 'SKU-HLM-CRB-02',
      title: 'Titan Carbon-Titanium Grille Cricket Helmet',
      category: 'protective',
      categoryLabel: 'Protective Gear',
      image: '/market/helmet-pro.png',
      grade: 'BS 7928:2013 Certified Multi-Impact Shell',
      weight: 'Medium (58-61cm)',
      stock: 0,
      retailPrice: 5600,
      wholesalePrice: 4600,
      minWholesaleQty: 4,
      status: 'out_of_stock',
      salesCount: 52,
    },
    {
      id: 'prod-7',
      sku: 'SKU-BAG-WHL-09',
      title: 'Heavy-Duty 120L Pro Wheelie Tournament Kit Bag',
      category: 'bags',
      categoryLabel: 'Kit Bags & Luggage',
      image: '/market/kitbag-pro.png',
      grade: '1680D Ballistic Nylon with Bat Caves',
      weight: '120 Liters Heavy Duty',
      stock: 14,
      retailPrice: 6200,
      wholesalePrice: 4900,
      minWholesaleQty: 3,
      status: 'in_stock',
      salesCount: 46,
    },
  ])

  // Filtered Inventory List
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(inventorySearch.toLowerCase()) ||
        p.sku.toLowerCase().includes(inventorySearch.toLowerCase()) ||
        p.grade.toLowerCase().includes(inventorySearch.toLowerCase())

      const matchesCat = selectedCategory === 'all' || p.category === selectedCategory

      const matchesStock =
        stockStatusFilter === 'all' ||
        (stockStatusFilter === 'low' && p.stock <= 4 && p.stock > 0) ||
        (stockStatusFilter === 'out' && p.stock === 0) ||
        (stockStatusFilter === 'in' && p.stock > 4)

      return matchesSearch && matchesCat && matchesStock
    })
  }, [products, inventorySearch, selectedCategory, stockStatusFilter])

  // Quick Stock Adjustment
  const adjustStock = (id, delta) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newStock = Math.max(0, p.stock + delta)
          const newStatus = newStock === 0 ? 'out_of_stock' : newStock <= 4 ? 'low_stock' : 'in_stock'
          return { ...p, stock: newStock, status: newStatus }
        }
        return p
      })
    )
    triggerToast(delta > 0 ? `Restocked +${delta} units!` : `Decreased ${Math.abs(delta)} unit.`)
  }

  // =========================================================================
  // 2. ORDER FULFILLMENT QUEUE STATE
  // =========================================================================
  const [orderStageFilter, setOrderStageFilter] = useState('all')

  const [orders, setOrders] = useState([
    {
      id: 'ORD-8821',
      date: '04 Nov 2026, 10:15 AM',
      buyerName: 'Rohit Sharma',
      buyerType: 'Registered Athlete (State Squad)',
      phone: '+91 98401 11223',
      city: 'Mumbai, Maharashtra',
      address: 'Apt 14B, Sea View Tower, Bandra West, Mumbai 400050',
      items: [
        {
          title: 'Apex Pro Grade 1 English Willow Cricket Bat',
          sku: 'SKU-BAT-ENG-01',
          qty: 1,
          price: 14500,
        },
      ],
      totalAmount: 14500,
      paymentMode: 'Prepaid (UPI Auto-Escrow)',
      escrowStatus: 'Secured in Escrow',
      orderStage: 'pending_packing',
      stageLabel: 'New / Pending Packing',
      courierPartner: 'BlueDart Express Air',
      trackingId: '',
      hsnCode: '9506.99.10',
      gstRate: '12% GST',
    },
    {
      id: 'ORD-8820',
      date: '03 Nov 2026, 04:30 PM',
      buyerName: 'Marina Titans Cricket Academy',
      buyerType: 'Certified Academy (Director: Arjun Verma)',
      phone: '+91 98402 33445',
      city: 'Chennai, Tamil Nadu',
      address: 'Marina Sports Complex Ground 2, Kamarajar Salai, Chennai 600005',
      items: [
        {
          title: 'Match Pro White Leather Balls (Box of 12)',
          sku: 'SKU-BAL-WHT-12',
          qty: 2,
          price: 6200,
        },
      ],
      totalAmount: 12400,
      paymentMode: 'Prepaid B2B (Corporate UPI)',
      escrowStatus: 'Secured in Escrow',
      orderStage: 'packed_ready',
      stageLabel: 'Packed / Ready for Pickup',
      courierPartner: 'Delhivery Surface Logistics',
      trackingId: 'DEL-992014-CH',
      hsnCode: '9506.99.20',
      gstRate: '12% GST',
    },
    {
      id: 'ORD-8819',
      date: '02 Nov 2026, 11:45 AM',
      buyerName: 'Coastal Kings XI Franchise',
      buyerType: 'Franchise Team (Manager: Vikram Rathore)',
      phone: '+91 98403 77889',
      city: 'Bengaluru, Karnataka',
      address: 'Clubhouse Suite 402, High Performance Arena, Koramangala, Bengaluru 560034',
      items: [
        {
          title: 'Full Team Sublimation Pro Jersey Kit (15 Sets)',
          sku: 'SKU-JER-SUB-15',
          qty: 1,
          price: 18000,
        },
        {
          title: 'Heavy-Duty 120L Pro Wheelie Tournament Kit Bag',
          sku: 'SKU-BAG-WHL-09',
          qty: 1,
          price: 4900,
        },
      ],
      totalAmount: 22900,
      paymentMode: 'Prepaid (Bank NEFT Direct)',
      escrowStatus: 'Escrow Holding (Day 3/7)',
      orderStage: 'dispatched',
      stageLabel: 'Dispatched / In Transit',
      courierPartner: 'BlueDart Air Cargo',
      trackingId: 'BLUEDART-882194-IN',
      hsnCode: '6109.90.10',
      gstRate: '5% GST (Apparel)',
    },
    {
      id: 'ORD-8818',
      date: '31 Oct 2026, 02:15 PM',
      buyerName: 'Dev Anand',
      buyerType: 'Player (U-16 Academy Batch)',
      phone: '+91 98404 44556',
      city: 'Hyderabad, Telangana',
      address: 'Plot 45, Jubilee Hills Road No. 10, Hyderabad 500033',
      items: [
        {
          title: 'Titan Test Ultralight Moulded Batting Pads',
          sku: 'SKU-PAD-CLB-04',
          qty: 1,
          price: 4200,
        },
        {
          title: 'Pro Impact Pittards Leather Batting Gloves',
          sku: 'SKU-GLV-PRO-07',
          qty: 1,
          price: 3100,
        },
      ],
      totalAmount: 7300,
      paymentMode: 'Prepaid (Credit Card)',
      escrowStatus: 'Released to Ready Balance',
      orderStage: 'delivered',
      stageLabel: 'Delivered',
      courierPartner: 'DTDC Priority Air',
      trackingId: 'DTDC-440182-HYD',
      hsnCode: '9506.99.10',
      gstRate: '12% GST',
    },
  ])

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (orderStageFilter === 'all') return true
      return o.orderStage === orderStageFilter
    })
  }, [orders, orderStageFilter])

  // Order Stage Updaters
  const markOrderPacked = (orderId) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              orderStage: 'packed_ready',
              stageLabel: 'Packed / Ready for Pickup',
              trackingId: o.trackingId || `SH-PKG-${Date.now().toString().slice(-6)}`,
            }
          : o
      )
    )
    triggerToast(`Order ${orderId} marked PACKED and assigned for courier pickup!`)
  }

  const markOrderDispatched = (orderId) => {
    const defaultAwb = `BLUEDART-${Math.floor(100000 + Math.random() * 900000)}`
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              orderStage: 'dispatched',
              stageLabel: 'Dispatched / In Transit',
              trackingId: o.trackingId || defaultAwb,
              escrowStatus: 'Escrow Holding (Day 1/7)',
            }
          : o
      )
    )
    triggerToast(`Order ${orderId} DISPATCHED! Tracking: ${defaultAwb}`)
  }

  const markOrderDelivered = (orderId) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              orderStage: 'delivered',
              stageLabel: 'Delivered',
              escrowStatus: 'Released to Ready Balance',
            }
          : o
      )
    )
    triggerToast(`Order ${orderId} marked DELIVERED! Escrow proceeds released to ready balance.`)
  }

  // =========================================================================
  // 3. ESCROW SETTLEMENTS & PAYOUTS STATE
  // =========================================================================
  const [readyEscrowBalance, setReadyEscrowBalance] = useState(182400)
  const [pendingEscrowHolding, setPendingEscrowHolding] = useState(46200)
  const [lifetimeDisbursed, setLifetimeDisbursed] = useState(1248500)
  const [payoutInProgress, setPayoutInProgress] = useState(false)

  const [escrowLedger, setEscrowLedger] = useState([
    {
      id: 'ESC-9924',
      date: '04 Nov 2026',
      orderId: 'ORD-8821',
      buyer: 'Rohit Sharma',
      grossAmount: 14500,
      platformFeeRate: '5%',
      platformFeeAmount: 725,
      courierFee: 250,
      netEscrowAmount: 13525,
      status: 'Escrow Holding (Awaiting Dispatch)',
      statusColor: '#ffc83d',
    },
    {
      id: 'ESC-9923',
      date: '03 Nov 2026',
      orderId: 'ORD-8820',
      buyer: 'Marina Titans Academy',
      grossAmount: 12400,
      platformFeeRate: '5%',
      platformFeeAmount: 620,
      courierFee: 300,
      netEscrowAmount: 11480,
      status: 'Escrow Holding (Packed Ready)',
      statusColor: '#ffc83d',
    },
    {
      id: 'ESC-9922',
      date: '02 Nov 2026',
      orderId: 'ORD-8819',
      buyer: 'Coastal Kings XI',
      grossAmount: 22900,
      platformFeeRate: '5%',
      platformFeeAmount: 1145,
      courierFee: 450,
      netEscrowAmount: 21305,
      status: 'Escrow Holding (Transit Day 3/7)',
      statusColor: '#38bdf8',
    },
    {
      id: 'ESC-9921',
      date: '31 Oct 2026',
      orderId: 'ORD-8818',
      buyer: 'Dev Anand',
      grossAmount: 7300,
      platformFeeRate: '5%',
      platformFeeAmount: 365,
      courierFee: 180,
      netEscrowAmount: 6755,
      status: 'Ready for Bank Payout',
      statusColor: '#00e676',
    },
    {
      id: 'ESC-9920',
      date: '28 Oct 2026',
      orderId: 'ORD-8812',
      buyer: 'Apex High School Cricket Wing',
      grossAmount: 48000,
      platformFeeRate: '5%',
      platformFeeAmount: 2400,
      courierFee: 850,
      netEscrowAmount: 44750,
      status: 'Disbursed to Bank (Ref: NEFT-78819)',
      statusColor: '#94a3b8',
    },
  ])

  // Instant Bank Payout Action
  const handleRequestPayout = () => {
    if (readyEscrowBalance <= 0) {
      triggerToast('No eligible escrow balance ready for payout right now.')
      return
    }
    setPayoutInProgress(true)
    const amountToWithdraw = readyEscrowBalance
    const refCode = `NEFT-SH-${Math.floor(100000 + Math.random() * 900000)}`

    setTimeout(() => {
      setReadyEscrowBalance(0)
      setLifetimeDisbursed((prev) => prev + amountToWithdraw)
      setEscrowLedger((prev) => [
        {
          id: `ESC-WD-${Date.now().toString().slice(-4)}`,
          date: '04 Nov 2026',
          orderId: 'Direct Escrow Withdrawal',
          buyer: 'HDFC Bank Current Acct •••• 4091',
          grossAmount: amountToWithdraw,
          platformFeeRate: '0%',
          platformFeeAmount: 0,
          courierFee: 0,
          netEscrowAmount: amountToWithdraw,
          status: `Disbursed to Bank (Ref: ${refCode})`,
          statusColor: '#00e676',
        },
        ...prev,
      ])
      setPayoutInProgress(false)
      triggerToast(`Bank Transfer of ₹${amountToWithdraw.toLocaleString('en-IN')} initiated! Ref: ${refCode}`)
    }, 1000)
  }

  // =========================================================================
  // DEDICATED SUB-PAGE 1: ADD NEW PRODUCT TO CATALOG (NO POPUP)
  // =========================================================================
  if (showAddProductPage) {
    return (
      <Screen title="Add New Product" back={false} padded={false}>
        <div className="seller-portal-container">
          <div className="seller-top-bar">
            <button
              type="button"
              onClick={() => setShowAddProductPage(false)}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#f8fafc',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ← Back
            </button>
            <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700 }}>
              Official SKU Register
            </span>
          </div>

          <div
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              padding: '16px',
              borderRadius: 14,
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxSizing: 'border-box',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(0, 230, 118, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Plus size={20} color="#00e676" />
              </div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 900, color: '#f8fafc', margin: 0 }}>
                  Add Product to Store Catalog
                </h3>
                <small style={{ color: 'var(--muted)', fontSize: 11 }}>
                  Synchronized immediately to Marketplace and B2B channels.
                </small>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                const form = e.target
                const newTitle = form.title.value
                const newCat = form.category.value
                const newSku = form.sku.value || `SKU-${Date.now().toString().slice(-6)}`
                const newRetail = Number(form.retailPrice.value)
                const newWholesale = Number(form.wholesalePrice.value) || Math.round(newRetail * 0.8)
                const newStock = Number(form.stock.value)
                const newGrade = form.grade.value

                const catLabels = {
                  bats: 'English Willow Bats',
                  balls: 'Leather Match Balls',
                  protective: 'Protective Gear',
                  jerseys: 'Customised Jerseys',
                  bags: 'Kit Bags & Luggage',
                }

                const catImages = {
                  bats: '/market/bat-pro.png',
                  balls: '/market/ball-pro.png',
                  protective: '/market/pads-pro.png',
                  jerseys: '/market/jersey-pro.png',
                  bags: '/market/kitbag-pro.png',
                }

                const newProdObj = {
                  id: `prod-${Date.now()}`,
                  sku: newSku,
                  title: newTitle,
                  category: newCat,
                  categoryLabel: catLabels[newCat] || 'Sports Gear',
                  image: catImages[newCat] || '/market/bat-pro.png',
                  grade: newGrade || 'Standard Professional Grade',
                  weight: form.weight.value || 'Standard Pro',
                  stock: newStock,
                  retailPrice: newRetail,
                  wholesalePrice: newWholesale,
                  minWholesaleQty: Number(form.minWholesale.value) || 5,
                  status: newStock === 0 ? 'out_of_stock' : newStock <= 4 ? 'low_stock' : 'in_stock',
                  salesCount: 0,
                }

                setProducts((prev) => [newProdObj, ...prev])
                setShowAddProductPage(false)
                triggerToast(`Added "${newTitle}" to store catalog!`)
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', boxSizing: 'border-box' }}
            >
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  PRODUCT TITLE *
                </label>
                <input
                  name="title"
                  required
                  placeholder="e.g. Apex Pro Player English Willow Bat"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#f8fafc',
                    fontSize: 13,
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    SKU CODE *
                  </label>
                  <input
                    name="sku"
                    required
                    defaultValue={`SKU-PRO-${Math.floor(1000 + Math.random() * 9000)}`}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#f8fafc',
                      fontSize: 12,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    CATEGORY *
                  </label>
                  <select
                    name="category"
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      background: '#0f172a',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#f8fafc',
                      fontSize: 12,
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="bats">English Willow Bats</option>
                    <option value="balls">Leather Match Balls</option>
                    <option value="protective">Protective Gear & Pads</option>
                    <option value="jerseys">Customised Team Jerseys</option>
                    <option value="bags">Kit Bags & Luggage</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    INITIAL STOCK *
                  </label>
                  <input
                    name="stock"
                    type="number"
                    min="0"
                    defaultValue="15"
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#f8fafc',
                      fontSize: 13,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    MIN WHOLESALE QTY
                  </label>
                  <input
                    name="minWholesale"
                    type="number"
                    min="1"
                    defaultValue="5"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#f8fafc',
                      fontSize: 13,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    RETAIL PRICE (₹) *
                  </label>
                  <input
                    name="retailPrice"
                    type="number"
                    min="100"
                    required
                    placeholder="14500"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#00e676',
                      fontWeight: 800,
                      fontSize: 13,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    WHOLESALE PRICE (₹)
                  </label>
                  <input
                    name="wholesalePrice"
                    type="number"
                    min="100"
                    placeholder="11800"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#38bdf8',
                      fontWeight: 800,
                      fontSize: 13,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  GRADE & SPECIFICATION
                </label>
                <input
                  name="grade"
                  placeholder="e.g. Grade 1 English Willow • 8-10 Grains"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#f8fafc',
                    fontSize: 12,
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '12px 18px',
                    borderRadius: 9,
                    border: 'none',
                    background: 'linear-gradient(135deg, #00e676, #00b0ff)',
                    color: '#020617',
                    fontWeight: 900,
                    fontSize: 13,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    boxSizing: 'border-box',
                  }}
                >
                  <CheckCircle2 size={16} /> Save Product to Store Catalog
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddProductPage(false)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: 9,
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#94a3b8',
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // DEDICATED SUB-PAGE 2: EDIT PRODUCT SPECIFICATIONS (NO POPUP)
  // =========================================================================
  if (editingProduct) {
    return (
      <Screen title="Edit Product Specs" back={false} padded={false}>
        <div className="seller-portal-container">
          <div className="seller-top-bar">
            <button
              type="button"
              onClick={() => setEditingProduct(null)}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#f8fafc',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ← Back
            </button>
            <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700 }}>
              {editingProduct.sku}
            </span>
          </div>

          <div
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              padding: '16px',
              borderRadius: 14,
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxSizing: 'border-box',
              width: '100%',
            }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const form = e.target
                const updatedTitle = form.title.value
                const updatedRetail = Number(form.retailPrice.value)
                const updatedWholesale = Number(form.wholesalePrice.value)
                const updatedStock = Number(form.stock.value)
                const updatedGrade = form.grade.value

                setProducts((prev) =>
                  prev.map((p) =>
                    p.id === editingProduct.id
                      ? {
                          ...p,
                          title: updatedTitle,
                          retailPrice: updatedRetail,
                          wholesalePrice: updatedWholesale,
                          stock: updatedStock,
                          status: updatedStock === 0 ? 'out_of_stock' : updatedStock <= 4 ? 'low_stock' : 'in_stock',
                          grade: updatedGrade,
                        }
                      : p
                  )
                )
                setEditingProduct(null)
                triggerToast(`Updated specs for "${updatedTitle}"!`)
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', boxSizing: 'border-box' }}
            >
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  PRODUCT TITLE
                </label>
                <input
                  name="title"
                  defaultValue={editingProduct.title}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#f8fafc',
                    fontSize: 13,
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    STOCK UNITS
                  </label>
                  <input
                    name="stock"
                    type="number"
                    min="0"
                    defaultValue={editingProduct.stock}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#f8fafc',
                      fontSize: 13,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    RETAIL (₹)
                  </label>
                  <input
                    name="retailPrice"
                    type="number"
                    min="100"
                    defaultValue={editingProduct.retailPrice}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#00e676',
                      fontWeight: 800,
                      fontSize: 13,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    WHOLESALE (₹)
                  </label>
                  <input
                    name="wholesalePrice"
                    type="number"
                    min="100"
                    defaultValue={editingProduct.wholesalePrice}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#38bdf8',
                      fontWeight: 800,
                      fontSize: 13,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  GRADE & SPECIFICATION
                </label>
                <input
                  name="grade"
                  defaultValue={editingProduct.grade}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#f8fafc',
                    fontSize: 12,
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '12px 18px',
                    borderRadius: 9,
                    border: 'none',
                    background: 'linear-gradient(135deg, #00e676, #00b0ff)',
                    color: '#020617',
                    fontWeight: 900,
                    fontSize: 13,
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                  }}
                >
                  ✓ Save Updated Specifications
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: 9,
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#94a3b8',
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // DEDICATED SUB-PAGE 3: OFFICIAL GST PACKING SLIP & TAX INVOICE (NO POPUP)
  // =========================================================================
  if (viewingInvoiceOrder) {
    const o = viewingInvoiceOrder
    const gstRateVal = o.gstRate.includes('5%') ? 0.05 : 0.12
    const baseAmount = Math.round(o.totalAmount / (1 + gstRateVal))
    const totalGst = o.totalAmount - baseAmount
    const cgst = Math.round(totalGst / 2)
    const sgst = totalGst - cgst

    return (
      <Screen title={`Invoice ${o.id}`} back={false} padded={false}>
        <div className="seller-portal-container">
          <div className="seller-top-bar">
            <button
              type="button"
              onClick={() => setViewingInvoiceOrder(null)}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#f8fafc',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              style={{
                padding: '8px 14px',
                borderRadius: 8,
                background: 'linear-gradient(135deg, #00e676, #00b0ff)',
                border: 'none',
                color: '#020617',
                fontWeight: 900,
                fontSize: 12,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <Printer size={14} /> Print / Save
            </button>
          </div>

          {/* Printable GST Tax Invoice Paper */}
          <div className="seller-invoice-paper">
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: 12, flexWrap: 'wrap', gap: 10 }}>
              <div>
                <span style={{ fontSize: 10, background: '#00e676', color: '#020617', fontWeight: 900, padding: '2px 6px', borderRadius: 4 }}>
                  TAX INVOICE & PACKING SLIP
                </span>
                <h3 style={{ fontSize: 17, fontWeight: 900, margin: '6px 0 2px', color: '#f8fafc' }}>
                  {user?.roleDetails?.businessName || 'Apex Willow & Pro Gear Co.'}
                </h3>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                  GSTIN: <strong style={{ color: '#00e676' }}>09AAACA1234F1Z8</strong>
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>Invoice ID</div>
                <strong style={{ fontSize: 15, color: '#38bdf8' }}>INV-{o.id.replace('ORD-', '')}-2026</strong>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>Date: {o.date.split(',')[0]}</div>
              </div>
            </div>

            {/* Bill To & Destination */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: 10, borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12 }}>
              <div>
                <span style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>BILL TO:</span>
                <strong style={{ display: 'block', color: '#f8fafc' }}>{o.buyerName}</strong>
                <span style={{ color: '#38bdf8', fontSize: 11 }}>{o.buyerType}</span> • <span style={{ color: 'var(--muted)', fontSize: 11 }}>{o.phone}</span>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 6 }}>
                <span style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>DELIVER TO:</span>
                <div style={{ color: '#cbd5e1', fontSize: 11 }}>{o.address}</div>
                <div style={{ color: '#00e676', fontSize: 11, marginTop: 2 }}>
                  Courier: <strong>{o.courierPartner}</strong> ({o.trackingId || 'Pending Allocation'})
                </div>
              </div>
            </div>

            {/* Line Items Table with horizontal overflow protection */}
            <div className="seller-invoice-table-wrap">
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, minWidth: 280 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: 'var(--muted)', textAlign: 'left' }}>
                    <th style={{ padding: '6px 4px' }}>Item</th>
                    <th style={{ padding: '6px 4px', textAlign: 'center' }}>Qty</th>
                    <th style={{ padding: '6px 4px', textAlign: 'right' }}>Total (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {o.items.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <td style={{ padding: '8px 4px' }}>
                        <strong style={{ color: '#f8fafc', display: 'block' }}>{item.title}</strong>
                        <small style={{ color: 'var(--muted)', fontSize: 10 }}>HSN: {o.hsnCode}</small>
                      </td>
                      <td style={{ padding: '8px 4px', textAlign: 'center' }}>{item.qty}</td>
                      <td style={{ padding: '8px 4px', textAlign: 'right', fontWeight: 800, color: '#00e676' }}>
                        ₹{(item.qty * item.price).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tax Total Box */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: 10, borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)' }}>
                <span>Taxable Value:</span>
                <span style={{ color: '#f8fafc' }}>₹{baseAmount.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)' }}>
                <span>Total GST ({o.gstRate}):</span>
                <span style={{ color: '#f8fafc' }}>₹{totalGst.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: 6, display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 900 }}>
                <span style={{ color: '#f8fafc' }}>Total Invoice Amount:</span>
                <span style={{ color: '#00e676' }}>₹{o.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // DEDICATED SUB-PAGE 4: CREATE MANUAL / WHOLESALE B2B ORDER (NO POPUP)
  // =========================================================================
  if (showManualOrderPage) {
    return (
      <Screen title="Create B2B Order" back={false} padded={false}>
        <div className="seller-portal-container">
          <div className="seller-top-bar">
            <button
              type="button"
              onClick={() => setShowManualOrderPage(false)}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#f8fafc',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ← Back
            </button>
            <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700 }}>
              B2B Wholesale Invoice
            </span>
          </div>

          <div
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              padding: '16px',
              borderRadius: 14,
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxSizing: 'border-box',
              width: '100%',
            }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const form = e.target
                const buyer = form.buyerName.value
                const phone = form.phone.value
                const address = form.address.value
                const selectedProdId = form.productId.value
                const qty = Number(form.qty.value)
                const targetProd = products.find((p) => p.id === selectedProdId) || products[0]
                const unitPrice = qty >= targetProd.minWholesaleQty ? targetProd.wholesalePrice : targetProd.retailPrice
                const total = unitPrice * qty

                const newOrder = {
                  id: `ORD-${Math.floor(8822 + Math.random() * 500)}`,
                  date: '04 Nov 2026, Just now',
                  buyerName: buyer,
                  buyerType: form.buyerType.value,
                  phone: phone,
                  city: form.city.value,
                  address: address,
                  items: [
                    {
                      title: targetProd.title,
                      sku: targetProd.sku,
                      qty: qty,
                      price: unitPrice,
                    },
                  ],
                  totalAmount: total,
                  paymentMode: form.paymentMode.value,
                  escrowStatus: 'Secured in Escrow',
                  orderStage: 'pending_packing',
                  stageLabel: 'New / Pending Packing',
                  courierPartner: 'BlueDart Express Air',
                  trackingId: '',
                  hsnCode: '9506.99.10',
                  gstRate: '12% GST',
                }

                setOrders((prev) => [newOrder, ...prev])
                adjustStock(targetProd.id, -qty)
                setShowManualOrderPage(false)
                triggerToast(`Created B2B Order ${newOrder.id} for ${buyer}!`)
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', boxSizing: 'border-box' }}
            >
              <h3 style={{ fontSize: 16, fontWeight: 900, color: '#f8fafc', margin: 0 }}>
                Queue B2B Order for Packing
              </h3>

              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  BUYER / ACADEMY NAME *
                </label>
                <input
                  name="buyerName"
                  required
                  placeholder="e.g. Marina Titans Academy"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#f8fafc',
                    fontSize: 13,
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    BUYER TYPE
                  </label>
                  <select
                    name="buyerType"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      background: '#0f172a',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#f8fafc',
                      fontSize: 12,
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="Academy Wholesale Partner">Academy Partner</option>
                    <option value="Franchise Team Squad">Franchise Squad</option>
                    <option value="Individual Pro Athlete">Pro Athlete</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    PHONE *
                  </label>
                  <input
                    name="phone"
                    required
                    defaultValue="+91 "
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#f8fafc',
                      fontSize: 12,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  PRODUCT & UNITS
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 8 }}>
                  <select
                    name="productId"
                    style={{
                      padding: '10px 8px',
                      borderRadius: 8,
                      background: '#0f172a',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#f8fafc',
                      fontSize: 12,
                      boxSizing: 'border-box',
                      minWidth: 0,
                    }}
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title.slice(0, 32)}... (₹{p.wholesalePrice})
                      </option>
                    ))}
                  </select>

                  <input
                    name="qty"
                    type="number"
                    min="1"
                    defaultValue="5"
                    style={{
                      padding: '10px 8px',
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#00e676',
                      fontWeight: 800,
                      fontSize: 13,
                      boxSizing: 'border-box',
                      textAlign: 'center',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    CITY
                  </label>
                  <input
                    name="city"
                    defaultValue="Chennai, TN"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#f8fafc',
                      fontSize: 12,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    PAYMENT
                  </label>
                  <select
                    name="paymentMode"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      background: '#0f172a',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#f8fafc',
                      fontSize: 12,
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="Prepaid (UPI Auto-Escrow)">UPI Escrow</option>
                    <option value="Corporate Bank NEFT">Bank NEFT</option>
                    <option value="Cash on Delivery (COD)">COD</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  DELIVERY ADDRESS *
                </label>
                <textarea
                  name="address"
                  required
                  rows={2}
                  placeholder="Ground / Academy location, Pincode"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#f8fafc',
                    fontSize: 12,
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '12px 18px',
                    borderRadius: 9,
                    border: 'none',
                    background: 'linear-gradient(135deg, #00e676, #00b0ff)',
                    color: '#020617',
                    fontWeight: 900,
                    fontSize: 13,
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                  }}
                >
                  ✓ Submit & Queue Order for Packing
                </button>
                <button
                  type="button"
                  onClick={() => setShowManualOrderPage(false)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: 9,
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#94a3b8',
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // DEDICATED SUB-PAGE 5: MONTHLY TAX & ESCROW STATEMENT (NO POPUP)
  // =========================================================================
  if (showTaxStatementPage) {
    return (
      <Screen title="Merchant Tax Statement" back={false} padded={false}>
        <div className="seller-portal-container">
          <div className="seller-top-bar">
            <button
              type="button"
              onClick={() => setShowTaxStatementPage(false)}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#f8fafc',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              style={{
                padding: '8px 14px',
                borderRadius: 8,
                background: 'linear-gradient(135deg, #00e676, #00b0ff)',
                border: 'none',
                color: '#020617',
                fontWeight: 900,
                fontSize: 12,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <Printer size={14} /> Print Audit
            </button>
          </div>

          <div
            style={{
              background: '#090d16',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 14,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              boxSizing: 'border-box',
              width: '100%',
            }}
          >
            <div>
              <span style={{ fontSize: 10, background: '#38bdf8', color: '#020617', fontWeight: 900, padding: '2px 6px', borderRadius: 4 }}>
                MERCHANT AUDIT REPORT
              </span>
              <h3 style={{ fontSize: 16, fontWeight: 900, color: '#f8fafc', margin: '6px 0 2px' }}>
                Monthly Merchant Tax & Escrow Reconciliation
              </h3>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                Apex Willow & Pro Gear Co. • GSTIN: 09AAACA1234F1Z8
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: 10, borderRadius: 8 }}>
                <span style={{ fontSize: 10, color: 'var(--muted)' }}>GROSS SALES</span>
                <strong style={{ fontSize: 15, color: '#f8fafc', display: 'block', marginTop: 2 }}>₹14.77L</strong>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: 10, borderRadius: 8 }}>
                <span style={{ fontSize: 10, color: 'var(--muted)' }}>5% ESCROW FEE</span>
                <strong style={{ fontSize: 15, color: '#ffc83d', display: 'block', marginTop: 2 }}>₹73,855</strong>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: 10, borderRadius: 8 }}>
                <span style={{ fontSize: 10, color: 'var(--muted)' }}>NET TO BANK</span>
                <strong style={{ fontSize: 15, color: '#00e676', display: 'block', marginTop: 2 }}>₹13.82L</strong>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: 10, borderRadius: 8 }}>
                <span style={{ fontSize: 10, color: 'var(--muted)' }}>READY ESCROW</span>
                <strong style={{ fontSize: 15, color: '#38bdf8', display: 'block', marginTop: 2 }}>
                  ₹{readyEscrowBalance.toLocaleString('en-IN')}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // MAIN PORTAL VIEW (3 TABS: INVENTORY, ORDERS, ESCROW PAYOUTS)
  // =========================================================================
  return (
    <Screen title="Merchant Operations" back={false} padded={false}>
      <div className="seller-portal-container">
        {/* Floating Toast Notification */}
        {toastMsg && (
          <div
            style={{
              position: 'fixed',
              top: 18,
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#020617',
              color: '#00e676',
              padding: '8px 16px',
              borderRadius: 30,
              fontSize: 12,
              fontWeight: 800,
              zIndex: 9999,
              boxShadow: '0 8px 30px rgba(0, 230, 118, 0.35)',
              border: '1.5px solid #00e676',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              maxWidth: '90%',
              textAlign: 'center',
            }}
          >
            <Sparkles size={14} />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Back Button & Top Bar — Clean and Responsive */}
        <div className="seller-top-bar">
          <button
            type="button"
            onClick={() => navigate('/app')}
            style={{
              padding: '7px 14px',
              borderRadius: 8,
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#f8fafc',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            ← Back
          </button>

          <div className="seller-badge-group">
            <span
              style={{
                fontSize: 10,
                padding: '3px 6px',
                borderRadius: 6,
                background: 'rgba(0, 230, 118, 0.15)',
                color: '#00e676',
                fontWeight: 900,
                border: '1px solid rgba(0, 230, 118, 0.3)',
                whiteSpace: 'nowrap',
              }}
            >
              ✓ GST VERIFIED
            </span>
            <button
              type="button"
              onClick={() => navigate('/app/marketplace')}
              style={{
                padding: '4px 8px',
                borderRadius: 6,
                background: 'rgba(0, 176, 255, 0.15)',
                border: '1px solid rgba(0, 176, 255, 0.4)',
                color: '#38bdf8',
                fontSize: 10,
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                whiteSpace: 'nowrap',
              }}
            >
              <ExternalLink size={10} /> Store
            </button>
          </div>
        </div>

        {/* 3-PORTAL NAVIGATION TABS — 100% Fit on Mobile */}
        <div className="seller-tab-bar">
          <button
            type="button"
            onClick={() => setActiveTab('inventory')}
            className={`seller-tab-btn ${currentTab === 'inventory' ? 'is-active' : ''}`}
          >
            <Boxes size={15} />
            <span>Catalog</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`seller-tab-btn ${currentTab === 'orders' ? 'is-active' : ''}`}
          >
            <Truck size={15} />
            <span>Orders ({orders.filter((o) => o.orderStage !== 'delivered').length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('payouts')}
            className={`seller-tab-btn ${currentTab === 'payouts' ? 'is-active' : ''}`}
          >
            <DollarSign size={15} />
            <span>Payouts</span>
          </button>
        </div>

        {/* =================================================================== */}
        {/* TAB 1: INVENTORY & CATALOG MANAGEMENT                               */}
        {/* =================================================================== */}
        {currentTab === 'inventory' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
            {/* Header Controls: Search + Add Product */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                padding: '12px',
                borderRadius: 14,
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                boxSizing: 'border-box',
                width: '100%',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 900, color: '#f8fafc', margin: 0 }}>
                    Store Inventory ({filteredProducts.length})
                  </h3>
                  <small style={{ color: 'var(--muted)', fontSize: 11 }}>
                    Live stock balances & restock triggers
                  </small>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddProductPage(true)}
                  style={{
                    padding: '7px 14px',
                    borderRadius: 8,
                    background: 'linear-gradient(135deg, #00e676, #00b0ff)',
                    border: 'none',
                    color: '#020617',
                    fontWeight: 900,
                    fontSize: 11,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Plus size={14} /> + Add Product
                </button>
              </div>

              {/* Search Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(255, 255, 255, 0.04)',
                  padding: '8px 10px',
                  borderRadius: 8,
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                <Search size={14} color="#94a3b8" />
                <input
                  type="text"
                  placeholder="Search title, SKU, or willow grade..."
                  value={inventorySearch}
                  onChange={(e) => setInventorySearch(e.target.value)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#f8fafc',
                    fontSize: 12,
                    width: '100%',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Stock Status Pills — Horizontally Scrollable on Mobile */}
              <div className="seller-scroll-filters">
                {[
                  { id: 'all', label: 'All Stock' },
                  { id: 'low', label: '⚠️ Low Stock (<= 4)' },
                  { id: 'out', label: '❌ Out of Stock' },
                  { id: 'in', label: '✓ In Stock' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setStockStatusFilter(s.id)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: 7,
                      fontSize: 10,
                      fontWeight: 800,
                      whiteSpace: 'nowrap',
                      border: stockStatusFilter === s.id ? '1px solid #00b0ff' : '1px solid rgba(255, 255, 255, 0.08)',
                      background: stockStatusFilter === s.id ? 'rgba(0, 176, 255, 0.2)' : 'rgba(255, 255, 255, 0.02)',
                      color: stockStatusFilter === s.id ? '#38bdf8' : '#94a3b8',
                      cursor: 'pointer',
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Category Pills — Horizontally Scrollable on Mobile */}
              <div className="seller-scroll-filters">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'bats', label: '🏏 Willow Bats' },
                  { id: 'balls', label: '🔴 Match Balls' },
                  { id: 'protective', label: '🛡️ Pads & Gear' },
                  { id: 'jerseys', label: '👕 Jerseys' },
                  { id: 'bags', label: '🎒 Kit Bags' },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCategory(c.id)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: 7,
                      fontSize: 10,
                      fontWeight: 800,
                      whiteSpace: 'nowrap',
                      border: selectedCategory === c.id ? '1px solid #00e676' : '1px solid rgba(255, 255, 255, 0.08)',
                      background: selectedCategory === c.id ? 'rgba(0, 230, 118, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                      color: selectedCategory === c.id ? '#00e676' : '#94a3b8',
                      cursor: 'pointer',
                    }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Cards Grid — Single Column on Mobile */}
            <div className="seller-product-grid">
              {filteredProducts.map((p) => {
                const isOutOfStock = p.stock === 0
                const isLowStock = p.stock > 0 && p.stock <= 4

                return (
                  <div key={p.id} className="seller-product-card">
                    <div>
                      {/* Top Row: SKU + Stock Status Pill */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 800 }}>
                          {p.sku}
                        </span>
                        <span
                          style={{
                            fontSize: 10,
                            padding: '2px 7px',
                            borderRadius: 6,
                            fontWeight: 900,
                            background: isOutOfStock
                              ? 'rgba(239, 68, 68, 0.15)'
                              : isLowStock
                              ? 'rgba(255, 200, 61, 0.15)'
                              : 'rgba(0, 230, 118, 0.15)',
                            color: isOutOfStock ? '#ef4444' : isLowStock ? '#ffc83d' : '#00e676',
                          }}
                        >
                          {isOutOfStock ? 'OUT OF STOCK' : isLowStock ? `LOW (${p.stock})` : `IN STOCK (${p.stock})`}
                        </span>
                      </div>

                      {/* Image & Title */}
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <div
                          style={{
                            width: 56,
                            height: 56,
                            borderRadius: 10,
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 4,
                            flexShrink: 0,
                          }}
                        >
                          <img
                            src={p.image}
                            alt={p.title}
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                          />
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <strong style={{ fontSize: 13, color: '#f8fafc', display: 'block', lineHeight: 1.3 }}>
                            {p.title}
                          </strong>
                          <span style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {p.grade}
                          </span>
                        </div>
                      </div>

                      {/* Pricing Breakdown: Retail vs Wholesale */}
                      <div
                        style={{
                          background: 'rgba(255, 255, 255, 0.02)',
                          padding: '8px 10px',
                          borderRadius: 8,
                          border: '1px solid rgba(255, 255, 255, 0.05)',
                          marginTop: 10,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div>
                          <span style={{ fontSize: 9, color: 'var(--muted)', textTransform: 'uppercase' }}>Retail MRP</span>
                          <strong style={{ fontSize: 13, color: '#00e676', display: 'block' }}>
                            ₹{p.retailPrice.toLocaleString('en-IN')}
                          </strong>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: 9, color: '#38bdf8', textTransform: 'uppercase' }}>
                            Wholesale (5+)
                          </span>
                          <strong style={{ fontSize: 13, color: '#38bdf8', display: 'block' }}>
                            ₹{p.wholesalePrice.toLocaleString('en-IN')}
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* Stock Adjustment Controls */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 11, color: 'var(--muted)' }}>Stock:</span>
                        <strong style={{ fontSize: 13, color: '#f8fafc', minWidth: 20, textAlign: 'center' }}>
                          {p.stock}
                        </strong>
                        <button
                          type="button"
                          onClick={() => adjustStock(p.id, -1)}
                          style={{
                            padding: '4px 8px',
                            borderRadius: 6,
                            background: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            color: '#cbd5e1',
                            fontSize: 11,
                            fontWeight: 800,
                            cursor: 'pointer',
                          }}
                        >
                          -1
                        </button>
                        <button
                          type="button"
                          onClick={() => adjustStock(p.id, 5)}
                          style={{
                            padding: '4px 8px',
                            borderRadius: 6,
                            background: 'rgba(0, 230, 118, 0.15)',
                            border: '1px solid rgba(0, 230, 118, 0.3)',
                            color: '#00e676',
                            fontSize: 10,
                            fontWeight: 800,
                            cursor: 'pointer',
                          }}
                        >
                          +5
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => setEditingProduct(p)}
                        style={{
                          padding: '5px 10px',
                          borderRadius: 6,
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#f8fafc',
                          fontSize: 10,
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        ✏️ Edit Specs
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 2: ORDER FULFILLMENT QUEUE & PIPELINE                           */}
        {/* =================================================================== */}
        {currentTab === 'orders' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
            {/* Stage Selector Header */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                padding: '12px',
                borderRadius: 14,
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                boxSizing: 'border-box',
                width: '100%',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 900, color: '#f8fafc', margin: 0 }}>
                    Order Dispatch Pipeline
                  </h3>
                  <small style={{ color: 'var(--muted)', fontSize: 11 }}>
                    Packing, courier tracking & escrow clearance
                  </small>
                </div>

                <button
                  type="button"
                  onClick={() => setShowManualOrderPage(true)}
                  style={{
                    padding: '7px 14px',
                    borderRadius: 8,
                    background: 'linear-gradient(135deg, #00e676, #00b0ff)',
                    border: 'none',
                    color: '#020617',
                    fontWeight: 900,
                    fontSize: 11,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Plus size={14} /> + B2B Order
                </button>
              </div>

              {/* Stage Filter Buttons with Live Counts */}
              <div className="seller-scroll-filters">
                {[
                  { id: 'all', label: 'All', count: orders.length },
                  { id: 'pending_packing', label: '📦 Packing', count: orders.filter((o) => o.orderStage === 'pending_packing').length },
                  { id: 'packed_ready', label: '🏷️ Ready', count: orders.filter((o) => o.orderStage === 'packed_ready').length },
                  { id: 'dispatched', label: '🚚 In Transit', count: orders.filter((o) => o.orderStage === 'dispatched').length },
                  { id: 'delivered', label: '✅ Delivered', count: orders.filter((o) => o.orderStage === 'delivered').length },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setOrderStageFilter(s.id)}
                    style={{
                      padding: '6px 10px',
                      borderRadius: 8,
                      fontSize: 11,
                      fontWeight: 800,
                      whiteSpace: 'nowrap',
                      border: orderStageFilter === s.id ? '1.5px solid #00e676' : '1px solid rgba(255, 255, 255, 0.08)',
                      background: orderStageFilter === s.id ? 'rgba(0, 230, 118, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                      color: orderStageFilter === s.id ? '#00e676' : '#94a3b8',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <span>{s.label}</span>
                    <span
                      style={{
                        fontSize: 9,
                        padding: '1px 5px',
                        borderRadius: 5,
                        background: orderStageFilter === s.id ? '#00e676' : 'rgba(255, 255, 255, 0.1)',
                        color: orderStageFilter === s.id ? '#020617' : '#cbd5e1',
                        fontWeight: 900,
                      }}
                    >
                      {s.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Cards List — 100% Fit, Zero Cut-offs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
              {filteredOrders.map((o) => (
                <div key={o.id} className="seller-order-card">
                  {/* Top Bar: Order ID, Date, Status */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <strong style={{ fontSize: 13, color: '#f8fafc' }}>{o.id}</strong>
                      <span style={{ fontSize: 10, color: 'var(--muted)' }}>• {o.date.split(',')[0]}</span>
                    </div>

                    <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                      <span
                        style={{
                          fontSize: 9,
                          padding: '2px 6px',
                          borderRadius: 5,
                          fontWeight: 900,
                          background:
                            o.orderStage === 'pending_packing'
                              ? 'rgba(255, 200, 61, 0.15)'
                              : o.orderStage === 'packed_ready'
                              ? 'rgba(0, 176, 255, 0.15)'
                              : o.orderStage === 'dispatched'
                              ? 'rgba(147, 51, 234, 0.15)'
                              : 'rgba(0, 230, 118, 0.15)',
                          color:
                            o.orderStage === 'pending_packing'
                              ? '#ffc83d'
                              : o.orderStage === 'packed_ready'
                              ? '#38bdf8'
                              : o.orderStage === 'dispatched'
                              ? '#c084fc'
                              : '#00e676',
                        }}
                      >
                        {o.stageLabel.toUpperCase()}
                      </span>

                      <span
                        style={{
                          fontSize: 9,
                          padding: '2px 6px',
                          borderRadius: 5,
                          background: 'rgba(0, 230, 118, 0.1)',
                          color: '#00e676',
                          fontWeight: 800,
                        }}
                      >
                        🛡️ Escrow
                      </span>
                    </div>
                  </div>

                  {/* Buyer & Logistics Info (Stacked into clean full-width cards on mobile) */}
                  <div className="seller-order-info-grid">
                    <div>
                      <span style={{ fontSize: 9, color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 800 }}>
                        BUYER CONTACT
                      </span>
                      <strong style={{ fontSize: 13, color: '#f8fafc', display: 'block', marginTop: 2 }}>
                        {o.buyerName}
                      </strong>
                      <div style={{ fontSize: 11, color: '#38bdf8' }}>{o.buyerType}</div>
                      <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 2 }}>
                        📍 {o.address}
                      </div>
                    </div>

                    <div>
                      <span style={{ fontSize: 9, color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 800 }}>
                        LOGISTICS & PAYMENT
                      </span>
                      <div style={{ fontSize: 11, color: '#f8fafc', marginTop: 2 }}>
                        Partner: <strong>{o.courierPartner}</strong>
                      </div>
                      <div style={{ fontSize: 11, color: o.trackingId ? '#00e676' : 'var(--muted)' }}>
                        AWB: <strong>{o.trackingId || 'Pending Allocation'}</strong>
                      </div>
                      <div style={{ fontSize: 11, color: '#ffc83d', marginTop: 2 }}>
                        Payment: <strong>{o.paymentMode}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Items Ordered List */}
                  <div>
                    <div style={{ fontSize: 9, color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 800, marginBottom: 4 }}>
                      Items Ordered
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {o.items.map((it, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: 12,
                            padding: '6px 8px',
                            background: 'rgba(255, 255, 255, 0.02)',
                            borderRadius: 6,
                          }}
                        >
                          <div>
                            <span style={{ color: '#00e676', fontWeight: 800 }}>{it.qty}x</span>{' '}
                            <span style={{ color: '#f8fafc' }}>{it.title}</span>
                          </div>
                          <strong style={{ color: '#f8fafc', whiteSpace: 'nowrap', marginLeft: 8 }}>
                            ₹{(it.qty * it.price).toLocaleString('en-IN')}
                          </strong>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Action Controls: Stacks cleanly, NO clipping! */}
                  <div className="seller-order-actions-box">
                    <div className="seller-order-btn-pair">
                      <a
                        href={`tel:${o.phone.replace(/[^0-9]/g, '')}`}
                        style={{
                          padding: '8px 10px',
                          borderRadius: 8,
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#f8fafc',
                          fontSize: 11,
                          fontWeight: 700,
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 5,
                          boxSizing: 'border-box',
                        }}
                      >
                        <Phone size={13} color="#00e676" /> Call Buyer
                      </a>

                      <button
                        type="button"
                        onClick={() => setViewingInvoiceOrder(o)}
                        style={{
                          padding: '8px 10px',
                          borderRadius: 8,
                          background: 'rgba(0, 176, 255, 0.15)',
                          border: '1px solid rgba(0, 176, 255, 0.3)',
                          color: '#38bdf8',
                          fontSize: 11,
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 5,
                          boxSizing: 'border-box',
                        }}
                      >
                        <FileText size={13} /> View Invoice
                      </button>
                    </div>

                    {/* Step Advancement CTA — Full Width on Mobile */}
                    <div>
                      {o.orderStage === 'pending_packing' && (
                        <button
                          type="button"
                          className="seller-order-main-cta"
                          onClick={() => markOrderPacked(o.id)}
                          style={{ background: 'linear-gradient(135deg, #00e676, #00b0ff)' }}
                        >
                          <Package size={14} /> 📦 Mark Packed & Ready for Pickup
                        </button>
                      )}

                      {o.orderStage === 'packed_ready' && (
                        <button
                          type="button"
                          className="seller-order-main-cta"
                          onClick={() => markOrderDispatched(o.id)}
                          style={{ background: 'linear-gradient(135deg, #38bdf8, #818cf8)' }}
                        >
                          <Truck size={14} /> 🚚 Assign Courier & Mark Dispatched
                        </button>
                      )}

                      {o.orderStage === 'dispatched' && (
                        <button
                          type="button"
                          className="seller-order-main-cta"
                          onClick={() => markOrderDelivered(o.id)}
                          style={{ background: 'linear-gradient(135deg, #00e676, #10b981)' }}
                        >
                          <CheckCircle2 size={14} /> ✅ Mark Delivered & Release Escrow
                        </button>
                      )}

                      {o.orderStage === 'delivered' && (
                        <div style={{ textAlign: 'center', padding: '6px', background: 'rgba(0, 230, 118, 0.1)', borderRadius: 7, fontSize: 11, color: '#00e676', fontWeight: 800 }}>
                          ✓ Order Completed & Escrow Settled
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 3: ESCROW SETTLEMENTS & PAYOUTS                                 */}
        {/* =================================================================== */}
        {currentTab === 'payouts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
            {/* Escrow Formula Banner */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(0, 230, 118, 0.1), rgba(0, 176, 255, 0.08))',
                padding: '12px 14px',
                borderRadius: 14,
                border: '1.5px solid rgba(0, 230, 118, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                boxSizing: 'border-box',
                width: '100%',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <ShieldCheck size={18} color="#00e676" />
                <span style={{ fontSize: 11, fontWeight: 900, color: '#00e676', textTransform: 'uppercase' }}>
                  Merchant Escrow Settlement Math
                </span>
              </div>

              <div
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  color: '#f8fafc',
                  background: 'rgba(0,0,0,0.3)',
                  padding: '8px 10px',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 6,
                }}
              >
                <span>Payout</span>
                <span style={{ color: '#00e676' }}>=</span>
                <span>Gross</span>
                <span style={{ color: '#ffc83d' }}>-</span>
                <span style={{ color: '#ffc83d' }}>Fee (5%)</span>
                <span style={{ color: '#38bdf8' }}>-</span>
                <span style={{ color: '#38bdf8' }}>Courier</span>
              </div>

              <small style={{ color: 'var(--muted)', fontSize: 10 }}>
                Directly settled via RBI Merchant Escrow. Funds are released immediately upon verified delivery.
              </small>
            </div>

            {/* KPI Cards — Responsive Grid */}
            <div className="seller-kpi-grid">
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.75)',
                  padding: '14px',
                  borderRadius: 12,
                  border: '1px solid rgba(0, 230, 118, 0.4)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Ready for Payout
                  </span>
                  <DollarSign size={15} color="#00e676" />
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 900, color: '#00e676', margin: '4px 0 2px' }}>
                  ₹{readyEscrowBalance.toLocaleString('en-IN')}
                </h3>
                <small style={{ color: 'var(--muted)', fontSize: 10 }}>Instant bank transfer ready</small>
              </div>

              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.75)',
                  padding: '14px',
                  borderRadius: 12,
                  border: '1px solid rgba(255, 200, 61, 0.3)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Escrow Holding
                  </span>
                  <Clock size={15} color="#ffc83d" />
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 900, color: '#ffc83d', margin: '4px 0 2px' }}>
                  ₹{pendingEscrowHolding.toLocaleString('en-IN')}
                </h3>
                <small style={{ color: 'var(--muted)', fontSize: 10 }}>In transit buffer</small>
              </div>

              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.75)',
                  padding: '14px',
                  borderRadius: 12,
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Lifetime Payouts
                  </span>
                  <CheckCircle2 size={15} color="#38bdf8" />
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 900, color: '#f8fafc', margin: '4px 0 2px' }}>
                  ₹{lifetimeDisbursed.toLocaleString('en-IN')}
                </h3>
                <small style={{ color: 'var(--muted)', fontSize: 10 }}>Disbursed to HDFC Bank</small>
              </div>
            </div>

            {/* Bank Transfer Execution Desk */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                padding: '14px',
                borderRadius: 14,
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                boxSizing: 'border-box',
                width: '100%',
              }}
            >
              <div>
                <span style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 800 }}>
                  SETTLEMENT CURRENT ACCOUNT
                </span>
                <strong style={{ fontSize: 14, color: '#f8fafc', display: 'block', marginTop: 2 }}>
                  HDFC Bank •••• 4091 (Current)
                </strong>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                  Beneficiary: <strong>Apex Willow & Pro Gear Co.</strong>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button
                  type="button"
                  disabled={payoutInProgress || readyEscrowBalance <= 0}
                  onClick={handleRequestPayout}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 9,
                    border: 'none',
                    background:
                      readyEscrowBalance > 0
                        ? 'linear-gradient(135deg, #00e676, #00b0ff)'
                        : 'rgba(255, 255, 255, 0.1)',
                    color: readyEscrowBalance > 0 ? '#020617' : '#94a3b8',
                    fontWeight: 900,
                    fontSize: 13,
                    cursor: readyEscrowBalance > 0 ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    boxSizing: 'border-box',
                  }}
                >
                  <DollarSign size={16} />
                  <span>
                    {payoutInProgress
                      ? 'Processing NEFT...'
                      : readyEscrowBalance > 0
                      ? `Request Instant Payout (₹${readyEscrowBalance.toLocaleString('en-IN')})`
                      : 'No Balance Ready'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowTaxStatementPage(true)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: 9,
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#f8fafc',
                    fontWeight: 700,
                    fontSize: 11,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 5,
                    boxSizing: 'border-box',
                  }}
                >
                  <FileText size={13} /> View Audit Statement
                </button>
              </div>
            </div>

            {/* Itemized Escrow Ledger */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                padding: '14px',
                borderRadius: 14,
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxSizing: 'border-box',
                width: '100%',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <h4 style={{ fontSize: 13, fontWeight: 900, color: '#f8fafc', textTransform: 'uppercase', margin: 0 }}>
                  Escrow Commission Log
                </h4>
                <span style={{ fontSize: 10, color: 'var(--muted)' }}>Live settlements</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {escrowLedger.map((row) => (
                  <div
                    key={row.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      padding: '10px 12px',
                      borderRadius: 8,
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                      boxSizing: 'border-box',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: 12, color: '#f8fafc' }}>{row.orderId}</strong>
                      <strong style={{ fontSize: 13, color: '#00e676' }}>
                        Net: ₹{row.netEscrowAmount.toLocaleString('en-IN')}
                      </strong>
                    </div>

                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                      Buyer: <span style={{ color: '#cbd5e1' }}>{row.buyer}</span> • {row.date}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10 }}>
                      <span style={{ color: 'var(--muted)' }}>Fee (5%): -₹{row.platformFeeAmount}</span>
                      <span style={{ color: row.statusColor, fontWeight: 700 }}>{row.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Screen>
  )
}
