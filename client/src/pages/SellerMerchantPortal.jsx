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
        <div style={{ padding: '16px', maxWidth: 840, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Header Action Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
            <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>
              Official Merchant SKU Register
            </span>
          </div>

          <div
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              padding: '20px',
              borderRadius: 16,
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(0, 230, 118, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Plus size={22} color="#00e676" />
              </div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 900, color: '#f8fafc', margin: 0 }}>
                  Add Product to Store Catalog
                </h3>
                <small style={{ color: 'var(--muted)', fontSize: 12 }}>
                  Products are immediately synchronized to the consumer marketplace and B2B wholesale channels.
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
              style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
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
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    SKU CODE (STOCK KEEPING UNIT) *
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
                      fontSize: 13,
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
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
                      fontSize: 13,
                    }}
                  >
                    <option value="bats">English Willow Bats</option>
                    <option value="balls">Leather Match Balls</option>
                    <option value="protective">Protective Gear & Pads</option>
                    <option value="jerseys">Customised Team Jerseys</option>
                    <option value="bags">Kit Bags & Luggage</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    INITIAL STOCK UNITS *
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
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    MIN WHOLESALE BATCH QTY
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
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    RETAIL SELLING PRICE (₹) *
                  </label>
                  <input
                    name="retailPrice"
                    type="number"
                    min="100"
                    required
                    placeholder="e.g. 14500"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#00e676',
                      fontWeight: 700,
                      fontSize: 14,
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    ACADEMY & WHOLESALE B2B PRICE (₹)
                  </label>
                  <input
                    name="wholesalePrice"
                    type="number"
                    min="100"
                    placeholder="e.g. 11800 (Discounted for 5+ units)"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#38bdf8',
                      fontWeight: 700,
                      fontSize: 14,
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    GRADE & MATERIAL SPECIFICATION
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
                      fontSize: 13,
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    WEIGHT / SIZING
                  </label>
                  <input
                    name="weight"
                    placeholder="e.g. 1180g • Short Handle Adult"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#f8fafc',
                      fontSize: 13,
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '12px 18px',
                    borderRadius: 10,
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
                  }}
                >
                  <CheckCircle2 size={16} /> Save Product to Store Catalog
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddProductPage(false)}
                  style={{
                    padding: '12px 18px',
                    borderRadius: 10,
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#94a3b8',
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: 'pointer',
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
        <div style={{ padding: '16px', maxWidth: 840, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
            <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>
              Editing SKU: {editingProduct.sku}
            </span>
          </div>

          <div
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              padding: '20px',
              borderRadius: 16,
              border: '1px solid rgba(255, 255, 255, 0.08)',
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
              style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
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
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    CURRENT STOCK UNITS
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
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    RETAIL PRICE (₹)
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
                      fontWeight: 700,
                      fontSize: 14,
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    WHOLESALE B2B PRICE (₹)
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
                      fontWeight: 700,
                      fontSize: 14,
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
                    fontSize: 13,
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '12px 18px',
                    borderRadius: 10,
                    border: 'none',
                    background: 'linear-gradient(135deg, #00e676, #00b0ff)',
                    color: '#020617',
                    fontWeight: 900,
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  ✓ Save Updated Specifications
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  style={{
                    padding: '12px 18px',
                    borderRadius: 10,
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#94a3b8',
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: 'pointer',
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
        <div style={{ padding: '16px', maxWidth: 840, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Header Action Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
            <div style={{ display: 'flex', gap: 8 }}>
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
                  gap: 6,
                }}
              >
                <Printer size={14} /> Print / Save PDF
              </button>
            </div>
          </div>

          {/* Printable GST Tax Invoice Paper */}
          <div
            style={{
              background: '#090d16',
              border: '1.5px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 14,
              padding: '24px',
              color: '#f8fafc',
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
            }}
          >
            {/* Invoice Top Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: 16, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <span style={{ fontSize: 11, background: '#00e676', color: '#020617', fontWeight: 900, padding: '2px 8px', borderRadius: 4 }}>
                  ORIGINAL TAX INVOICE & PACKING SLIP
                </span>
                <h2 style={{ fontSize: 20, fontWeight: 900, margin: '6px 0 2px', color: '#f8fafc' }}>
                  {user?.roleDetails?.businessName || 'Apex Willow & Pro Gear Co.'}
                </h2>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                  GSTIN: <strong style={{ color: '#00e676' }}>09AAACA1234F1Z8</strong> • MSME Reg: UDYAM-UP-44-0019283
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                  Factory Outlet & Dispatch Center: Meerut Sports Corridor, Meerut 250001, UP
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>Invoice Number</div>
                <strong style={{ fontSize: 18, color: '#38bdf8' }}>INV-{o.id.replace('ORD-', '')}-2026</strong>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>Date of Issue: {o.date}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>Payment Mode: {o.paymentMode}</div>
              </div>
            </div>

            {/* Bill To & Ship To */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, background: 'rgba(255,255,255,0.02)', padding: 14, borderRadius: 10 }}>
              <div>
                <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
                  BUYER / BILL TO
                </span>
                <h4 style={{ fontSize: 15, fontWeight: 900, color: '#f8fafc', margin: '4px 0 2px' }}>
                  {o.buyerName}
                </h4>
                <div style={{ fontSize: 12, color: '#38bdf8' }}>{o.buyerType}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>Phone: {o.phone}</div>
              </div>

              <div>
                <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
                  DELIVERY DESTINATION & COURIER
                </span>
                <div style={{ fontSize: 13, color: '#f8fafc', marginTop: 4 }}>{o.address}</div>
                <div style={{ fontSize: 12, color: '#00e676', marginTop: 4 }}>
                  Logistics Partner: <strong>{o.courierPartner}</strong>
                </div>
                <div style={{ fontSize: 12, color: '#38bdf8' }}>
                  AWB / Tracking: <strong>{o.trackingId || 'Pending Allocation'}</strong>
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: 'var(--muted)', textAlign: 'left' }}>
                    <th style={{ padding: '8px 4px' }}>Item Description</th>
                    <th style={{ padding: '8px 4px' }}>HSN</th>
                    <th style={{ padding: '8px 4px', textAlign: 'center' }}>Qty</th>
                    <th style={{ padding: '8px 4px', textAlign: 'right' }}>Unit Price</th>
                    <th style={{ padding: '8px 4px', textAlign: 'right' }}>Total (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {o.items.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <td style={{ padding: '12px 4px' }}>
                        <strong style={{ color: '#f8fafc', display: 'block' }}>{item.title}</strong>
                        <small style={{ color: 'var(--muted)', fontSize: 11 }}>SKU: {item.sku}</small>
                      </td>
                      <td style={{ padding: '12px 4px', color: 'var(--muted)' }}>{o.hsnCode}</td>
                      <td style={{ padding: '12px 4px', textAlign: 'center' }}>{item.qty}</td>
                      <td style={{ padding: '12px 4px', textAlign: 'right' }}>₹{item.price.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 4px', textAlign: 'right', fontWeight: 700, color: '#00e676' }}>
                        ₹{(item.qty * item.price).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tax Calculation Box */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)' }}>
                  <span>Taxable Base Value:</span>
                  <span style={{ color: '#f8fafc' }}>₹{baseAmount.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)' }}>
                  <span>CGST ({gstRateVal * 50}%):</span>
                  <span style={{ color: '#f8fafc' }}>₹{cgst.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)' }}>
                  <span>SGST ({gstRateVal * 50}%):</span>
                  <span style={{ color: '#f8fafc' }}>₹{sgst.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: 6, display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 900 }}>
                  <span style={{ color: '#f8fafc' }}>Total Invoice Amount:</span>
                  <span style={{ color: '#00e676' }}>₹{o.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Declaration & Signature */}
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', maxWidth: 460 }}>
                This is a digitally certified Tax Invoice and Courier Packing Slip generated via Scoring Heroes Verified Merchant Escrow Infrastructure. Goods once sold are covered under 7-day manufacturer warranty.
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: '#00e676', fontWeight: 800 }}>✓ AUTHENTICATED MERCHANT</div>
                <strong style={{ fontSize: 12, color: '#f8fafc' }}>For Apex Willow & Pro Gear Co.</strong>
                <div style={{ fontSize: 10, color: 'var(--muted)' }}>Authorized Signatory</div>
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
      <Screen title="Create B2B Wholesale Order" back={false} padded={false}>
        <div style={{ padding: '16px', maxWidth: 840, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
            <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>
              Manual Direct Entry / Academy Bulk Invoice
            </span>
          </div>

          <div
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              padding: '20px',
              borderRadius: 16,
              border: '1px solid rgba(255, 255, 255, 0.08)',
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
              style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
            >
              <h3 style={{ fontSize: 17, fontWeight: 900, color: '#f8fafc', margin: 0 }}>
                Log New Order & Generate Escrow Invoice
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    BUYER / ACADEMY / TEAM NAME *
                  </label>
                  <input
                    name="buyerName"
                    required
                    placeholder="e.g. Marina Titans Cricket Academy"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#f8fafc',
                      fontSize: 13,
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    BUYER CLASSIFICATION
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
                      fontSize: 13,
                    }}
                  >
                    <option value="Academy Wholesale Partner">Academy Wholesale Partner</option>
                    <option value="Franchise Team Squad">Franchise Team Squad</option>
                    <option value="Individual Pro Athlete">Individual Pro Athlete</option>
                    <option value="School / College Sports Wing">School / College Sports Wing</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    PHONE NUMBER *
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
                      fontSize: 13,
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    CITY / STATE
                  </label>
                  <input
                    name="city"
                    defaultValue="Chennai, Tamil Nadu"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#f8fafc',
                      fontSize: 13,
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    PAYMENT MODE
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
                      fontSize: 13,
                    }}
                  >
                    <option value="Prepaid (UPI Auto-Escrow)">Prepaid (UPI Auto-Escrow)</option>
                    <option value="Corporate Bank NEFT">Corporate Bank NEFT</option>
                    <option value="Cash on Delivery (COD)">Cash on Delivery (COD)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  SELECT PRODUCT & QUANTITY
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 10 }}>
                  <select
                    name="productId"
                    style={{
                      padding: '10px 12px',
                      borderRadius: 8,
                      background: '#0f172a',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#f8fafc',
                      fontSize: 13,
                    }}
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title} (Stock: {p.stock} • Retail: ₹{p.retailPrice} • Wholesale: ₹{p.wholesalePrice})
                      </option>
                    ))}
                  </select>

                  <input
                    name="qty"
                    type="number"
                    min="1"
                    defaultValue="5"
                    style={{
                      padding: '10px 12px',
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#00e676',
                      fontWeight: 700,
                      fontSize: 13,
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  COMPLETE DELIVERY ADDRESS *
                </label>
                <textarea
                  name="address"
                  required
                  rows={2}
                  placeholder="Street, Academy ground location, Landmark, Pincode"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#f8fafc',
                    fontSize: 13,
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '12px 18px',
                    borderRadius: 10,
                    border: 'none',
                    background: 'linear-gradient(135deg, #00e676, #00b0ff)',
                    color: '#020617',
                    fontWeight: 900,
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  ✓ Submit & Queue Order for Packing
                </button>
                <button
                  type="button"
                  onClick={() => setShowManualOrderPage(false)}
                  style={{
                    padding: '12px 18px',
                    borderRadius: 10,
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#94a3b8',
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: 'pointer',
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
        <div style={{ padding: '16px', maxWidth: 840, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                gap: 6,
              }}
            >
              <Printer size={14} /> Print Audit Statement
            </button>
          </div>

          <div
            style={{
              background: '#090d16',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 14,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: 14 }}>
              <span style={{ fontSize: 11, background: '#38bdf8', color: '#020617', fontWeight: 900, padding: '2px 8px', borderRadius: 4 }}>
                OFFICIAL MERCHANT AUDIT REPORT
              </span>
              <h2 style={{ fontSize: 20, fontWeight: 900, color: '#f8fafc', margin: '6px 0 2px' }}>
                Monthly Merchant Tax & Escrow Reconciliation (October - November 2026)
              </h2>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                Merchant: <strong>Apex Willow & Pro Gear Co.</strong> • GSTIN: 09AAACA1234F1Z8
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 10 }}>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>GROSS SALES VOLUME</span>
                <h3 style={{ fontSize: 18, color: '#f8fafc', margin: '4px 0 0', fontWeight: 900 }}>
                  ₹14,77,100
                </h3>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 10 }}>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>5% PLATFORM ESCROW FEE</span>
                <h3 style={{ fontSize: 18, color: '#ffc83d', margin: '4px 0 0', fontWeight: 900 }}>
                  ₹73,855
                </h3>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 10 }}>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>NET TRANSFERRED TO BANK</span>
                <h3 style={{ fontSize: 18, color: '#00e676', margin: '4px 0 0', fontWeight: 900 }}>
                  ₹13,82,450
                </h3>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 10 }}>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>CURRENT READY ESCROW</span>
                <h3 style={{ fontSize: 18, color: '#38bdf8', margin: '4px 0 0', fontWeight: 900 }}>
                  ₹{readyEscrowBalance.toLocaleString('en-IN')}
                </h3>
              </div>
            </div>

            <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
              All transactions are settled under Reserve Bank of India (RBI) Merchant Escrow Directives. Funds are released within 7 days of verified courier delivery without buyer disputes.
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
      <div style={{ padding: '16px', maxWidth: 940, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
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
              padding: '10px 18px',
              borderRadius: 30,
              fontSize: 13,
              fontWeight: 800,
              zIndex: 9999,
              boxShadow: '0 8px 30px rgba(0, 230, 118, 0.35)',
              border: '1.5px solid #00e676',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Sparkles size={16} />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Back Button to Home Dashboard */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => navigate('/app')}
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

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                fontSize: 11,
                padding: '3px 8px',
                borderRadius: 6,
                background: 'rgba(0, 230, 118, 0.15)',
                color: '#00e676',
                fontWeight: 900,
                border: '1px solid rgba(0, 230, 118, 0.3)',
              }}
            >
              GST VERIFIED MERCHANT
            </span>
            <button
              type="button"
              onClick={() => navigate('/app/marketplace')}
              style={{
                padding: '6px 12px',
                borderRadius: 8,
                background: 'rgba(0, 176, 255, 0.15)',
                border: '1px solid rgba(0, 176, 255, 0.4)',
                color: '#38bdf8',
                fontSize: 11,
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <ExternalLink size={12} /> View Consumer Store
            </button>
          </div>
        </div>

        {/* 3-PORTAL NAVIGATION TABS */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 6,
            background: 'rgba(15, 23, 42, 0.75)',
            padding: 6,
            borderRadius: 14,
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('inventory')}
            style={{
              padding: '10px 8px',
              borderRadius: 10,
              border: 'none',
              background: currentTab === 'inventory' ? 'linear-gradient(135deg, #00e676, #00b0ff)' : 'transparent',
              color: currentTab === 'inventory' ? '#020617' : '#94a3b8',
              fontWeight: 900,
              fontSize: 12,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              transition: 'all 0.2s ease',
            }}
          >
            <Boxes size={15} /> Stock & Catalog
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            style={{
              padding: '10px 8px',
              borderRadius: 10,
              border: 'none',
              background: currentTab === 'orders' ? 'linear-gradient(135deg, #00e676, #00b0ff)' : 'transparent',
              color: currentTab === 'orders' ? '#020617' : '#94a3b8',
              fontWeight: 900,
              fontSize: 12,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              transition: 'all 0.2s ease',
            }}
          >
            <Truck size={15} /> Order Queue ({orders.filter((o) => o.orderStage !== 'delivered').length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('payouts')}
            style={{
              padding: '10px 8px',
              borderRadius: 10,
              border: 'none',
              background: currentTab === 'payouts' ? 'linear-gradient(135deg, #00e676, #00b0ff)' : 'transparent',
              color: currentTab === 'payouts' ? '#020617' : '#94a3b8',
              fontWeight: 900,
              fontSize: 12,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              transition: 'all 0.2s ease',
            }}
          >
            <DollarSign size={15} /> Escrow Payouts
          </button>
        </div>

        {/* =================================================================== */}
        {/* TAB 1: INVENTORY & CATALOG MANAGEMENT                               */}
        {/* =================================================================== */}
        {currentTab === 'inventory' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Header Controls: Search + Add Product */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                padding: '14px',
                borderRadius: 14,
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 900, color: '#f8fafc', margin: 0 }}>
                    Store Inventory Register ({filteredProducts.length} Products)
                  </h3>
                  <small style={{ color: 'var(--muted)', fontSize: 11 }}>
                    Live stock balances, B2B wholesale prices, and instant restock actions
                  </small>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddProductPage(true)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 10,
                    background: 'linear-gradient(135deg, #00e676, #00b0ff)',
                    border: 'none',
                    color: '#020617',
                    fontWeight: 900,
                    fontSize: 12,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <Plus size={16} /> + Add New Product
                </button>
              </div>

              {/* Search and Category Filters */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <div
                  style={{
                    flex: 1,
                    minWidth: 220,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    background: 'rgba(255, 255, 255, 0.04)',
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <Search size={15} color="#94a3b8" />
                  <input
                    type="text"
                    placeholder="Search by title, SKU, or willow grade..."
                    value={inventorySearch}
                    onChange={(e) => setInventorySearch(e.target.value)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#f8fafc',
                      fontSize: 12,
                      width: '100%',
                    }}
                  />
                </div>

                {/* Stock Status Pills */}
                <div style={{ display: 'flex', gap: 6 }}>
                  {[
                    { id: 'all', label: 'All Stock' },
                    { id: 'low', label: '⚠️ Low Stock (<= 4)' },
                    { id: 'out', label: '❌ Out of Stock' },
                    { id: 'in', label: '✓ Ample Stock' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setStockStatusFilter(s.id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 8,
                        fontSize: 11,
                        fontWeight: 800,
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
              </div>

              {/* Category Pills */}
              <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2, scrollbarWidth: 'none' }}>
                {[
                  { id: 'all', label: 'All Categories' },
                  { id: 'bats', label: '🏏 English Willow Bats' },
                  { id: 'balls', label: '🔴 Leather Balls' },
                  { id: 'protective', label: '🛡️ Protective Gear' },
                  { id: 'jerseys', label: '👕 Customised Jerseys' },
                  { id: 'bags', label: '🎒 Kit Bags' },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCategory(c.id)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 8,
                      fontSize: 11,
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

            {/* Product Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 12 }}>
              {filteredProducts.map((p) => {
                const isOutOfStock = p.stock === 0
                const isLowStock = p.stock > 0 && p.stock <= 4

                return (
                  <div
                    key={p.id}
                    style={{
                      background: 'rgba(15, 23, 42, 0.75)',
                      borderRadius: 14,
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: 12,
                    }}
                  >
                    <div>
                      {/* Top Row: SKU + Stock Status Pill */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 800 }}>
                          {p.sku}
                        </span>
                        <span
                          style={{
                            fontSize: 10,
                            padding: '2px 8px',
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
                          {isOutOfStock ? 'OUT OF STOCK' : isLowStock ? `LOW STOCK (${p.stock})` : `IN STOCK (${p.stock})`}
                        </span>
                      </div>

                      {/* Image & Title */}
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <div
                          style={{
                            width: 64,
                            height: 64,
                            borderRadius: 10,
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 4,
                          }}
                        >
                          <img
                            src={p.image}
                            alt={p.title}
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                          />
                        </div>

                        <div style={{ flex: 1 }}>
                          <strong style={{ fontSize: 14, color: '#f8fafc', display: 'block', lineHeight: 1.3 }}>
                            {p.title}
                          </strong>
                          <span style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginTop: 2 }}>
                            {p.grade}
                          </span>
                        </div>
                      </div>

                      {/* Pricing Breakdown: Retail vs Wholesale */}
                      <div
                        style={{
                          background: 'rgba(255, 255, 255, 0.02)',
                          padding: '10px 12px',
                          borderRadius: 8,
                          border: '1px solid rgba(255, 255, 255, 0.05)',
                          marginTop: 10,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div>
                          <span style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase' }}>Retail MRP</span>
                          <strong style={{ fontSize: 14, color: '#00e676', display: 'block' }}>
                            ₹{p.retailPrice.toLocaleString('en-IN')}
                          </strong>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: 10, color: '#38bdf8', textTransform: 'uppercase' }}>
                            Wholesale ({p.minWholesaleQty}+ Units)
                          </span>
                          <strong style={{ fontSize: 14, color: '#38bdf8', display: 'block' }}>
                            ₹{p.wholesalePrice.toLocaleString('en-IN')}
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* Stock Adjustment Action Controls */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 11, color: 'var(--muted)' }}>Stock:</span>
                        <strong style={{ fontSize: 13, color: '#f8fafc', minWidth: 24, textAlign: 'center' }}>
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
                            fontSize: 11,
                            fontWeight: 800,
                            cursor: 'pointer',
                          }}
                        >
                          +5 Restock
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => setEditingProduct(p)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 6,
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#f8fafc',
                          fontSize: 11,
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Stage Selector Header */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                padding: '14px',
                borderRadius: 14,
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 900, color: '#f8fafc', margin: 0 }}>
                    Order Dispatch & Fulfillment Pipeline
                  </h3>
                  <small style={{ color: 'var(--muted)', fontSize: 11 }}>
                    Process player and academy wholesale kit orders from packing to courier delivery
                  </small>
                </div>

                <button
                  type="button"
                  onClick={() => setShowManualOrderPage(true)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 10,
                    background: 'linear-gradient(135deg, #00e676, #00b0ff)',
                    border: 'none',
                    color: '#020617',
                    fontWeight: 900,
                    fontSize: 12,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <Plus size={16} /> + Create B2B Order
                </button>
              </div>

              {/* Stage Filter Buttons with Live Counts */}
              <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2, scrollbarWidth: 'none' }}>
                {[
                  { id: 'all', label: 'All Orders', count: orders.length },
                  { id: 'pending_packing', label: '📦 New / Packing', count: orders.filter((o) => o.orderStage === 'pending_packing').length },
                  { id: 'packed_ready', label: '🏷️ Packed Ready', count: orders.filter((o) => o.orderStage === 'packed_ready').length },
                  { id: 'dispatched', label: '🚚 Dispatched', count: orders.filter((o) => o.orderStage === 'dispatched').length },
                  { id: 'delivered', label: '✅ Delivered', count: orders.filter((o) => o.orderStage === 'delivered').length },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setOrderStageFilter(s.id)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: 10,
                      fontSize: 12,
                      fontWeight: 800,
                      whiteSpace: 'nowrap',
                      border: orderStageFilter === s.id ? '1.5px solid #00e676' : '1px solid rgba(255, 255, 255, 0.08)',
                      background: orderStageFilter === s.id ? 'rgba(0, 230, 118, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                      color: orderStageFilter === s.id ? '#00e676' : '#94a3b8',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <span>{s.label}</span>
                    <span
                      style={{
                        fontSize: 10,
                        padding: '1px 6px',
                        borderRadius: 6,
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

            {/* Orders Cards List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {filteredOrders.map((o) => (
                <div
                  key={o.id}
                  style={{
                    background: 'rgba(15, 23, 42, 0.75)',
                    borderRadius: 14,
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                  }}
                >
                  {/* Top Bar: Order ID, Date, Status */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 14, fontWeight: 900, color: '#f8fafc' }}>{o.id}</span>
                      <span style={{ fontSize: 11, color: 'var(--muted)' }}>• {o.date}</span>
                    </div>

                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <span
                        style={{
                          fontSize: 11,
                          padding: '3px 8px',
                          borderRadius: 6,
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
                          fontSize: 10,
                          padding: '3px 8px',
                          borderRadius: 6,
                          background: 'rgba(0, 230, 118, 0.1)',
                          color: '#00e676',
                          fontWeight: 800,
                        }}
                      >
                        🛡️ {o.escrowStatus}
                      </span>
                    </div>
                  </div>

                  {/* Buyer & Destination Details */}
                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      padding: '12px 14px',
                      borderRadius: 10,
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                      gap: 10,
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                        Buyer / Team Contact
                      </div>
                      <strong style={{ fontSize: 14, color: '#f8fafc', display: 'block', marginTop: 2 }}>
                        {o.buyerName}
                      </strong>
                      <div style={{ fontSize: 11, color: '#38bdf8' }}>{o.buyerType}</div>
                      <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                        📍 {o.address}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                        Logistics & Payment
                      </div>
                      <div style={{ fontSize: 12, color: '#f8fafc', marginTop: 2 }}>
                        Partner: <strong>{o.courierPartner}</strong>
                      </div>
                      <div style={{ fontSize: 12, color: o.trackingId ? '#00e676' : 'var(--muted)' }}>
                        AWB: <strong>{o.trackingId || 'To be generated on packing'}</strong>
                      </div>
                      <div style={{ fontSize: 12, color: '#ffc83d', marginTop: 2 }}>
                        Payment: <strong>{o.paymentMode}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Items Ordered List */}
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>
                      Items Ordered
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {o.items.map((it, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: 13,
                            padding: '6px 8px',
                            background: 'rgba(255, 255, 255, 0.02)',
                            borderRadius: 6,
                          }}
                        >
                          <div>
                            <span style={{ color: '#00e676', fontWeight: 800 }}>{it.qty}x</span>{' '}
                            <span style={{ color: '#f8fafc' }}>{it.title}</span>
                            <span style={{ fontSize: 11, color: 'var(--muted)', marginLeft: 6 }}>({it.sku})</span>
                          </div>
                          <strong style={{ color: '#f8fafc' }}>
                            ₹{(it.qty * it.price).toLocaleString('en-IN')}
                          </strong>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Row: Call, View Invoice, Stage Pipeline Trigger */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: 10,
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                      flexWrap: 'wrap',
                      gap: 8,
                    }}
                  >
                    <div style={{ display: 'flex', gap: 8 }}>
                      <a
                        href={`tel:${o.phone.replace(/[^0-9]/g, '')}`}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 8,
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#f8fafc',
                          fontSize: 11,
                          fontWeight: 700,
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 5,
                        }}
                      >
                        <Phone size={13} color="#00e676" /> Call Buyer ({o.phone})
                      </a>

                      <button
                        type="button"
                        onClick={() => setViewingInvoiceOrder(o)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 8,
                          background: 'rgba(0, 176, 255, 0.15)',
                          border: '1px solid rgba(0, 176, 255, 0.3)',
                          color: '#38bdf8',
                          fontSize: 11,
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 5,
                        }}
                      >
                        <FileText size={13} /> View GST Tax Invoice
                      </button>
                    </div>

                    {/* Step Advancement Buttons */}
                    <div>
                      {o.orderStage === 'pending_packing' && (
                        <button
                          type="button"
                          onClick={() => markOrderPacked(o.id)}
                          style={{
                            padding: '8px 14px',
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
                          }}
                        >
                          <Package size={13} /> 📦 Mark Packed & Ready for Pickup
                        </button>
                      )}

                      {o.orderStage === 'packed_ready' && (
                        <button
                          type="button"
                          onClick={() => markOrderDispatched(o.id)}
                          style={{
                            padding: '8px 14px',
                            borderRadius: 8,
                            background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
                            border: 'none',
                            color: '#020617',
                            fontWeight: 900,
                            fontSize: 11,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 5,
                          }}
                        >
                          <Truck size={13} /> 🚚 Assign Courier & Mark Dispatched
                        </button>
                      )}

                      {o.orderStage === 'dispatched' && (
                        <button
                          type="button"
                          onClick={() => markOrderDelivered(o.id)}
                          style={{
                            padding: '8px 14px',
                            borderRadius: 8,
                            background: 'linear-gradient(135deg, #00e676, #10b981)',
                            border: 'none',
                            color: '#020617',
                            fontWeight: 900,
                            fontSize: 11,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 5,
                          }}
                        >
                          <CheckCircle2 size={13} /> ✅ Mark Delivered & Release Escrow
                        </button>
                      )}

                      {o.orderStage === 'delivered' && (
                        <span style={{ fontSize: 11, color: '#00e676', fontWeight: 800 }}>
                          ✓ Order Completed & Settled
                        </span>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Escrow Formula Banner (Matches Grounds Transparent Math) */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(0, 230, 118, 0.1), rgba(0, 176, 255, 0.08))',
                padding: '16px',
                borderRadius: 14,
                border: '1.5px solid rgba(0, 230, 118, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <ShieldCheck size={20} color="#00e676" />
                <span style={{ fontSize: 12, fontWeight: 900, color: '#00e676', textTransform: 'uppercase' }}>
                  RBI-Compliant Merchant Escrow Formula
                </span>
              </div>

              <div
                style={{
                  fontSize: 14,
                  fontWeight: 900,
                  color: '#f8fafc',
                  background: 'rgba(0,0,0,0.3)',
                  padding: '10px 14px',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 8,
                }}
              >
                <span>Net Bank Payout</span>
                <span style={{ color: '#00e676' }}>=</span>
                <span>Gross Order Sales</span>
                <span style={{ color: '#ffc83d' }}>-</span>
                <span style={{ color: '#ffc83d' }}>Platform Fee (5%)</span>
                <span style={{ color: '#38bdf8' }}>-</span>
                <span style={{ color: '#38bdf8' }}>Courier Logistics</span>
              </div>

              <small style={{ color: 'var(--muted)', fontSize: 11 }}>
                Prepaid buyer funds are deposited directly into the merchant trust escrow. Once goods are delivered, funds transition to Ready Balance for 1-click instant bank disbursal.
              </small>
            </div>

            {/* KPI Cards Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              {/* Ready Escrow Balance */}
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.75)',
                  padding: '16px',
                  borderRadius: 14,
                  border: '1px solid rgba(0, 230, 118, 0.4)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Ready for Payout
                  </span>
                  <DollarSign size={16} color="#00e676" />
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 900, color: '#00e676', margin: '6px 0 2px' }}>
                  ₹{readyEscrowBalance.toLocaleString('en-IN')}
                </h3>
                <small style={{ color: 'var(--muted)', fontSize: 11 }}>Eligible for instant bank transfer</small>
              </div>

              {/* Pending in Escrow Holding */}
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.75)',
                  padding: '16px',
                  borderRadius: 14,
                  border: '1px solid rgba(255, 200, 61, 0.3)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                    In Transit / Escrow Holding
                  </span>
                  <Clock size={16} color="#ffc83d" />
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 900, color: '#ffc83d', margin: '6px 0 2px' }}>
                  ₹{pendingEscrowHolding.toLocaleString('en-IN')}
                </h3>
                <small style={{ color: 'var(--muted)', fontSize: 11 }}>7-day post-delivery release</small>
              </div>

              {/* Lifetime Disbursed */}
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.75)',
                  padding: '16px',
                  borderRadius: 14,
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Lifetime Bank Disbursals
                  </span>
                  <CheckCircle2 size={16} color="#38bdf8" />
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 900, color: '#f8fafc', margin: '6px 0 2px' }}>
                  ₹{lifetimeDisbursed.toLocaleString('en-IN')}
                </h3>
                <small style={{ color: 'var(--muted)', fontSize: 11 }}>Verified to HDFC Bank</small>
              </div>
            </div>

            {/* Bank Transfer Execution Desk */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                padding: '18px',
                borderRadius: 14,
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 14,
              }}
            >
              <div>
                <span style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  VERIFIED SETTLEMENT CURRENT ACCOUNT
                </span>
                <h4 style={{ fontSize: 16, fontWeight: 900, color: '#f8fafc', margin: '4px 0 2px' }}>
                  HDFC Bank •••• 4091 (Current Account)
                </h4>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                  Beneficiary: <strong>Apex Willow & Pro Gear Co.</strong> • IFSC: <strong>HDFC0001234</strong>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setShowTaxStatementPage(true)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: 10,
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#f8fafc',
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <FileText size={14} /> Tax Statement
                </button>

                <button
                  type="button"
                  disabled={payoutInProgress || readyEscrowBalance <= 0}
                  onClick={handleRequestPayout}
                  style={{
                    padding: '10px 20px',
                    borderRadius: 10,
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
                    gap: 8,
                    boxShadow: readyEscrowBalance > 0 ? '0 4px 16px rgba(0, 230, 118, 0.3)' : 'none',
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
              </div>
            </div>

            {/* Itemized Escrow Ledger */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                padding: '16px',
                borderRadius: 14,
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h4 style={{ fontSize: 14, fontWeight: 900, color: '#f8fafc', textTransform: 'uppercase', margin: 0 }}>
                  Escrow Transaction Ledger & Commission Log
                </h4>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>Live settlements feed</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {escrowLedger.map((row) => (
                  <div
                    key={row.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      padding: '12px 14px',
                      borderRadius: 10,
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: 8,
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <strong style={{ fontSize: 13, color: '#f8fafc' }}>{row.orderId}</strong>
                        <span style={{ fontSize: 11, color: 'var(--muted)' }}>• {row.date}</span>
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                        Buyer: <strong style={{ color: '#cbd5e1' }}>{row.buyer}</strong>
                      </div>
                      <div style={{ fontSize: 11, color: row.statusColor, marginTop: 2, fontWeight: 700 }}>
                        {row.status}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                        Gross: ₹{row.grossAmount.toLocaleString('en-IN')} | Fee (5%): -₹{row.platformFeeAmount} | Courier: -₹{row.courierFee}
                      </div>
                      <strong style={{ fontSize: 15, color: '#00e676', display: 'block', marginTop: 2 }}>
                        Net: ₹{row.netEscrowAmount.toLocaleString('en-IN')}
                      </strong>
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
