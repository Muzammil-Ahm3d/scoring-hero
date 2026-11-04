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
  Eye,
  Copy,
  Link as LinkIcon,
  Image as ImageIcon,
  Check,
} from 'lucide-react'
import Screen from '../components/Screen'
import { useAuth } from '../context/AuthContext'
import './SellerMerchantPortal.css'

// =========================================================================
// CONFIGURATIONS: DYNAMIC CATEGORY SPECS & PRESET ASSETS
// =========================================================================

export const PRESET_GEAR_IMAGES = [
  { id: 'bat', label: 'Cricket Bat', url: '/market/bat-pro.png' },
  { id: 'ball', label: 'Match Ball', url: '/market/ball-pro.png' },
  { id: 'pads', label: 'Batting Pads', url: '/market/pads-pro.png' },
  { id: 'gloves', label: 'Gloves', url: '/market/gloves-pro.png' },
  { id: 'helmet', label: 'Pro Helmet', url: '/market/helmet-pro.png' },
  { id: 'jersey', label: 'Team Jersey', url: '/market/jersey-pro.png' },
  { id: 'kitbag', label: 'Kit Bag', url: '/market/kitbag-pro.png' },
]

export const CATEGORY_SPECS_CONFIG = {
  bats: {
    label: 'English Willow Bats',
    defaultImg: '/market/bat-pro.png',
    fields: [
      { key: 'Willow Grade', label: 'Willow Grade', default: 'Grade 1 English Willow (Air Dried)' },
      { key: 'Blade Size', label: 'Blade Size', default: 'Full Size (Men’s Short Handle)' },
      { key: 'Weight Range', label: 'Weight Range', default: '1175g - 1195g (Light Pick-up)' },
      { key: 'Handle', label: 'Handle Type', default: '12-Piece Multi-Cane Semi-Oval Handle' },
      { key: 'Profile', label: 'Spine & Profile', default: 'Full Spine with Extended Sweet Spot' },
      { key: 'Warranty', label: 'Warranty Period', default: '1 Year Manufacturer Handle Warranty' },
    ],
  },
  balls: {
    label: 'Leather Match Balls',
    defaultImg: '/market/ball-pro.png',
    fields: [
      { key: 'Construction', label: 'Leather Construction', default: '4-Piece Hand-Stitched Leather' },
      { key: 'Core', label: 'Core Material', default: 'Compressed Portuguese Cork & Wool' },
      { key: 'Weight', label: 'Ball Weight', default: '156g - 163g (Standard Men’s Match)' },
      { key: 'Certification', label: 'League Certification', default: 'BCCI & MCA League Approved' },
      { key: 'OversDurability', label: 'Overs Durability', default: '50+ Overs Guaranteed Seam Shape' },
    ],
  },
  jerseys: {
    label: 'Team Jerseys',
    defaultImg: '/market/jersey-pro.png',
    fields: [
      { key: 'Fabric', label: 'Fabric Quality', default: '180 GSM Micro Interlock Jacquard Poly' },
      { key: 'Fit', label: 'Fit Type', default: 'Athletic Semi-Fitted' },
      { key: 'Technology', label: 'Moisture Technology', default: 'Hydro-Wick Moisture Absorption' },
      { key: 'Customization', label: 'Customization', default: 'Free Back Name & Squad Number' },
      { key: 'WashCare', label: 'Wash Care', default: 'Machine wash cold · Fast drying' },
    ],
  },
  pads: {
    label: 'Batting Pads',
    defaultImg: '/market/pads-pro.png',
    fields: [
      { key: 'Facing', label: 'Facing Material', default: 'Premium Grain PU (Wipe Clean)' },
      { key: 'InternalPadding', label: 'Internal Padding', default: 'High-Density Cane & Sponge Foam' },
      { key: 'KneeCup', label: 'Knee Cup Locator', default: 'Thermoformed 3D Contoured Locator' },
      { key: 'Weight', label: 'Pad Weight', default: '810g per pad (Super lightweight)' },
    ],
  },
  helmets: {
    label: 'Pro Helmets',
    defaultImg: '/market/helmet-pro.png',
    fields: [
      { key: 'Grille', label: 'Face Grille', default: 'Grade 5 Titanium (Anti-Glare Coating)' },
      { key: 'Shell', label: 'Outer Shell', default: 'High-Density Injection Moulded ABS' },
      { key: 'Liner', label: 'Impact Liner', default: 'Multi-Density Impact Absorbing EPS' },
      { key: 'SafetyRating', label: 'Safety Certification', default: 'BS 7928:2013 Certified' },
    ],
  },
  gloves: {
    label: 'Batting Gloves',
    defaultImg: '/market/gloves-pro.png',
    fields: [
      { key: 'Palm', label: 'Palm Leather', default: 'English Pittards Sheepskin Leather' },
      { key: 'FingerPadding', label: 'Finger Shielding', default: 'High-Density Foam with Fiber Inserts' },
      { key: 'ThumbDesign', label: 'Thumb Protection', default: 'Two-Piece Split Thumb with Fiber Shield' },
      { key: 'WristClosure', label: 'Wrist Closure', default: '50mm Elasticated Towelling Band' },
    ],
  },
  kitbags: {
    label: 'Kit Bags & Luggage',
    defaultImg: '/market/kitbag-pro.png',
    fields: [
      { key: 'Dimensions', label: 'Dimensions', default: '96cm x 40cm x 38cm (Extra Large)' },
      { key: 'Material', label: 'Fabric / Material', default: '1680D Ballistic Cordura Nylon' },
      { key: 'Wheels', label: 'Wheel Mechanism', default: 'Dual All-Terrain Tractor Wheels' },
      { key: 'Capacity', label: 'Storage Capacity', default: 'Full Senior Cricket Kit + 3 Bats' },
      { key: 'Zippers', label: 'Zipper Grade', default: 'Heavy-Duty #10 Industrial Coil Zips' },
    ],
  },
}

export const COURIER_PRESETS = [
  { name: 'BlueDart Express Air', trackingPrefix: 'BLUEDART-', trackUrl: 'https://www.bluedart.com/tracking' },
  { name: 'Delhivery Surface Logistics', trackingPrefix: 'DEL-', trackUrl: 'https://www.delhivery.com/track/package/' },
  { name: 'DTDC Priority Air', trackingPrefix: 'DTDC-', trackUrl: 'https://www.dtdc.in/tracking' },
  { name: 'India Post Speed Post', trackingPrefix: 'EM', trackUrl: 'https://www.indiapost.gov.in/' },
  { name: 'FedEx India Express', trackingPrefix: 'FDX-', trackUrl: 'https://www.fedex.com/tracking' },
  { name: 'Shadowfax Express', trackingPrefix: 'SFX-', trackUrl: 'https://tracker.shadowfax.in/' },
]

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
    setTimeout(() => setToastMsg(''), 3000)
  }

  // =========================================================================
  // SUB-PAGE STATES (Strictly Dedicated Pages, ZERO POPUPS / MODALS)
  // =========================================================================
  const [showAddProductPage, setShowAddProductPage] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [viewingOrder, setViewingOrder] = useState(null)
  const [assigningCourierOrder, setAssigningCourierOrder] = useState(null)
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
      mrp: 18999,
      retailPrice: 14500,
      wholesalePrice: 11800,
      minWholesaleQty: 5,
      status: 'in_stock',
      salesCount: 84,
      specs: {
        'Willow Grade': 'Grade 1 English Willow (Air Dried)',
        'Blade Size': 'Full Size (Men’s Short Handle)',
        'Weight Range': '1175g - 1195g (Light Pick-up)',
        'Handle': '12-Piece Multi-Cane Semi-Oval Handle',
        'Profile': 'Full Spine with Extended Sweet Spot',
        'Warranty': '1 Year Manufacturer Handle Warranty',
      },
      highlights: 'Selected first-grade English Willow, 8-10 straight grains, fitted toe guard and scuff sheet included.',
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
      mrp: 9999,
      retailPrice: 7800,
      wholesalePrice: 6200,
      minWholesaleQty: 3,
      status: 'in_stock',
      salesCount: 142,
      specs: {
        'Construction': '4-Piece Hand-Stitched Leather',
        'Core': 'Compressed Portuguese Cork & Wool',
        'Weight': '156g - 163g (Standard Men’s Match)',
        'Certification': 'BCCI & MCA League Approved',
        'OversDurability': '50+ Overs Guaranteed Seam Shape',
      },
      highlights: 'BCCI tournament approved, alum tanned steerhide leather with linen seam.',
    },
    {
      id: 'prod-3',
      sku: 'SKU-PAD-CLB-04',
      title: 'Titan Test Ultralight Moulded Batting Pads',
      category: 'pads',
      categoryLabel: 'Protective Gear',
      image: '/market/pads-pro.png',
      grade: 'High-Density Foam & Gel Knee Cup',
      weight: 'Men’s Right & Left Hand',
      stock: 3,
      mrp: 5499,
      retailPrice: 4200,
      wholesalePrice: 3400,
      minWholesaleQty: 6,
      status: 'low_stock',
      salesCount: 65,
      specs: {
        'Facing': 'Premium Grain PU (Wipe Clean)',
        'InternalPadding': 'High-Density Cane & Sponge Foam',
        'KneeCup': 'Thermoformed 3D Contoured Locator',
        'Weight': '810g per pad (Super lightweight)',
      },
      highlights: '7-cane reinforced construction, pre-curved knee cup, 50mm padded velcro straps.',
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
      mrp: 28000,
      retailPrice: 22500,
      wholesalePrice: 18000,
      minWholesaleQty: 1,
      status: 'in_stock',
      salesCount: 39,
      specs: {
        'Fabric': '180 GSM Micro Interlock Jacquard Poly',
        'Fit': 'Athletic Semi-Fitted',
        'Technology': 'Hydro-Wick Moisture Absorption',
        'Customization': 'Free Back Name & Squad Number',
        'WashCare': 'Machine wash cold · Fast drying',
      },
      highlights: 'Full digital sublimation with zero fading, customized with player name and team crest.',
    },
    {
      id: 'prod-5',
      sku: 'SKU-GLV-PRO-07',
      title: 'Pro Impact Pittards Leather Batting Gloves',
      category: 'gloves',
      categoryLabel: 'Protective Gear',
      image: '/market/gloves-pro.png',
      grade: 'Premium Pittards Sheepskin & Split Fingers',
      weight: 'Adult Men Right Hand',
      stock: 2,
      mrp: 4199,
      retailPrice: 3100,
      wholesalePrice: 2500,
      minWholesaleQty: 8,
      status: 'low_stock',
      salesCount: 78,
      specs: {
        'Palm': 'English Pittards Sheepskin Leather',
        'FingerPadding': 'High-Density Foam with Fiber Inserts',
        'ThumbDesign': 'Two-Piece Split Thumb with Fiber Shield',
        'WristClosure': '50mm Elasticated Towelling Band',
      },
      highlights: 'Soft Pittards sheepskin palm, multi-split sausage fingers, fiber shield on leading fingers.',
    },
    {
      id: 'prod-6',
      sku: 'SKU-HLM-CRB-02',
      title: 'Titan Carbon-Titanium Grille Cricket Helmet',
      category: 'helmets',
      categoryLabel: 'Protective Gear',
      image: '/market/helmet-pro.png',
      grade: 'BS 7928:2013 Certified Multi-Impact Shell',
      weight: 'Medium (58-61cm)',
      stock: 0,
      mrp: 7499,
      retailPrice: 5600,
      wholesalePrice: 4600,
      minWholesaleQty: 4,
      status: 'out_of_stock',
      salesCount: 52,
      specs: {
        'Grille': 'Grade 5 Titanium (Anti-Glare Coating)',
        'Shell': 'High-Density Injection Moulded ABS',
        'Liner': 'Multi-Density Impact Absorbing EPS',
        'SafetyRating': 'BS 7928:2013 Certified',
      },
      highlights: 'Aerospace titanium grille, twin air ventilation vents, micro-dial rear fit adjuster.',
    },
    {
      id: 'prod-7',
      sku: 'SKU-BAG-WHL-09',
      title: 'Heavy-Duty 120L Pro Wheelie Tournament Kit Bag',
      category: 'kitbags',
      categoryLabel: 'Kit Bags & Luggage',
      image: '/market/kitbag-pro.png',
      grade: '1680D Ballistic Nylon with Bat Caves',
      weight: '120 Liters Heavy Duty',
      stock: 14,
      mrp: 8499,
      retailPrice: 6200,
      wholesalePrice: 4900,
      minWholesaleQty: 3,
      status: 'in_stock',
      salesCount: 46,
      specs: {
        'Dimensions': '96cm x 40cm x 38cm (Extra Large)',
        'Material': '1680D Ballistic Cordura Nylon',
        'Wheels': 'Dual All-Terrain Tractor Wheels',
        'Capacity': 'Full Senior Cricket Kit + 3 Bats',
        'Zippers': 'Heavy-Duty #10 Industrial Coil Zips',
      },
      highlights: 'Reinforced tractor wheels, 3 padded bat sleeves, ventilated shoe tunnel, thermal cooler pocket.',
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
          mrp: 18999,
          image: '/market/bat-pro.png',
          spec: 'Full Size Short Handle · 1180g (Grade 1)',
        },
      ],
      totalAmount: 14500,
      paymentMode: 'Prepaid (UPI Auto-Escrow)',
      escrowStatus: 'Secured in Escrow',
      orderStage: 'pending_packing',
      stageLabel: 'New / Pending Packing',
      courierPartner: 'BlueDart Express Air',
      trackingId: '',
      trackingLink: '',
      dispatchedAt: '',
      estimatedDelivery: '07 Nov 2026',
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
          mrp: 7800,
          image: '/market/ball-pro.png',
          spec: 'Alum Tanned 4-Piece Leather • 156g',
        },
      ],
      totalAmount: 12400,
      paymentMode: 'Prepaid B2B (Corporate UPI)',
      escrowStatus: 'Secured in Escrow',
      orderStage: 'packed_ready',
      stageLabel: 'Packed / Ready for Pickup',
      courierPartner: 'Delhivery Surface Logistics',
      trackingId: 'DEL-992014-CH',
      trackingLink: 'https://www.delhivery.com/track/package/DEL-992014-CH',
      dispatchedAt: '',
      estimatedDelivery: '06 Nov 2026',
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
          mrp: 22500,
          image: '/market/jersey-pro.png',
          spec: '100% Moisture-Wicking Poly Interlock',
        },
        {
          title: 'Heavy-Duty 120L Pro Wheelie Tournament Kit Bag',
          sku: 'SKU-BAG-WHL-09',
          qty: 1,
          price: 4900,
          mrp: 6200,
          image: '/market/kitbag-pro.png',
          spec: '1680D Ballistic Cordura Nylon',
        },
      ],
      totalAmount: 22900,
      paymentMode: 'Prepaid (Bank NEFT Direct)',
      escrowStatus: 'Escrow Holding (Day 3/7)',
      orderStage: 'dispatched',
      stageLabel: 'Dispatched / In Transit',
      courierPartner: 'BlueDart Air Cargo',
      trackingId: 'BLUEDART-882194-IN',
      trackingLink: 'https://www.bluedart.com/tracking/BLUEDART-882194-IN',
      dispatchedAt: '02 Nov 2026, 03:00 PM',
      estimatedDelivery: '05 Nov 2026',
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
          mrp: 5499,
          image: '/market/pads-pro.png',
          spec: 'High-Density Foam & Gel Knee Cup',
        },
        {
          title: 'Pro Impact Pittards Leather Batting Gloves',
          sku: 'SKU-GLV-PRO-07',
          qty: 1,
          price: 3100,
          mrp: 4199,
          image: '/market/gloves-pro.png',
          spec: 'Premium Pittards Sheepskin & Split Fingers',
        },
      ],
      totalAmount: 7300,
      paymentMode: 'Prepaid (Credit Card)',
      escrowStatus: 'Released to Ready Balance',
      orderStage: 'delivered',
      stageLabel: 'Delivered',
      courierPartner: 'DTDC Priority Air',
      trackingId: 'DTDC-440182-HYD',
      trackingLink: 'https://www.dtdc.in/tracking/DTDC-440182-HYD',
      dispatchedAt: '31 Oct 2026, 04:30 PM',
      estimatedDelivery: '02 Nov 2026',
      deliveredAt: '02 Nov 2026, 12:40 PM',
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

  // Copy customer address helper
  const copyAddressToClipboard = (order) => {
    const fullText = `${order.buyerName}\nPhone: ${order.phone}\n${order.address}`
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(fullText)
    }
    triggerToast(`Customer address copied for ${order.buyerName}!`)
  }

  // Milestone Checks Helper
  const getMilestoneChecks = (ord) => {
    if (ord.milestoneChecks) return ord.milestoneChecks
    return {
      placed: true,
      packed: ord.orderStage === 'packed_ready' || ord.orderStage === 'dispatched' || ord.orderStage === 'delivered',
      dispatched: ord.orderStage === 'dispatched' || ord.orderStage === 'delivered',
      out_delivery: Boolean(ord.outForDelivery) || ord.orderStage === 'delivered',
      delivered: ord.orderStage === 'delivered',
    }
  }

  // Interactive Vendor Milestone Check Mark Updater
  const toggleMilestone = (orderId, milestoneId) => {
    if (milestoneId === 'placed') {
      triggerToast('Order Placed is verified upon customer checkout & escrow lock.')
      return
    }

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const currentChecks = getMilestoneChecks(ord)
          const willBeChecked = !currentChecks[milestoneId]
          const updatedChecks = { ...currentChecks }

          if (willBeChecked) {
            if (milestoneId === 'packed') {
              updatedChecks.packed = true
            } else if (milestoneId === 'dispatched') {
              updatedChecks.packed = true
              updatedChecks.dispatched = true
              if (!ord.trackingId) {
                ord.courierPartner = ord.courierPartner || 'BlueDart Express Air'
                ord.trackingId = `BLUEDART-${Math.floor(100000 + Math.random() * 900000)}`
                ord.trackingLink = ord.trackingLink || `https://www.bluedart.com/tracking/${ord.trackingId}`
              }
            } else if (milestoneId === 'out_delivery') {
              updatedChecks.packed = true
              updatedChecks.dispatched = true
              updatedChecks.out_delivery = true
              if (!ord.trackingId) {
                ord.courierPartner = ord.courierPartner || 'BlueDart Express Air'
                ord.trackingId = `BLUEDART-${Math.floor(100000 + Math.random() * 900000)}`
                ord.trackingLink = ord.trackingLink || `https://www.bluedart.com/tracking/${ord.trackingId}`
              }
            } else if (milestoneId === 'delivered') {
              updatedChecks.packed = true
              updatedChecks.dispatched = true
              updatedChecks.out_delivery = true
              updatedChecks.delivered = true
            }
          } else {
            if (milestoneId === 'packed') {
              updatedChecks.packed = false
              updatedChecks.dispatched = false
              updatedChecks.out_delivery = false
              updatedChecks.delivered = false
            } else if (milestoneId === 'dispatched') {
              updatedChecks.dispatched = false
              updatedChecks.out_delivery = false
              updatedChecks.delivered = false
            } else if (milestoneId === 'out_delivery') {
              updatedChecks.out_delivery = false
              updatedChecks.delivered = false
            } else if (milestoneId === 'delivered') {
              updatedChecks.delivered = false
            }
          }

          let newStage = 'pending_packing'
          let newLabel = 'New / Pending Packing'
          let newEscrow = 'Secured in Escrow'

          if (updatedChecks.delivered) {
            newStage = 'delivered'
            newLabel = 'Delivered & Settled'
            newEscrow = 'Released to Ready Balance'
          } else if (updatedChecks.out_delivery) {
            newStage = 'dispatched'
            newLabel = 'Out for Delivery'
            newEscrow = 'Escrow Holding (In Transit)'
          } else if (updatedChecks.dispatched) {
            newStage = 'dispatched'
            newLabel = 'Dispatched / In Transit'
            newEscrow = 'Escrow Holding (In Transit)'
          } else if (updatedChecks.packed) {
            newStage = 'packed_ready'
            newLabel = 'Packed / Ready for Pickup'
            newEscrow = 'Secured in Escrow'
          }

          const nowTime = 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          const updatedOrder = {
            ...ord,
            milestoneChecks: updatedChecks,
            orderStage: newStage,
            stageLabel: newLabel,
            escrowStatus: newEscrow,
            outForDelivery: updatedChecks.out_delivery,
            packedAt: updatedChecks.packed ? (ord.packedAt || nowTime) : '',
            dispatchedAt: updatedChecks.dispatched ? (ord.dispatchedAt || nowTime) : '',
            deliveredAt: updatedChecks.delivered ? (ord.deliveredAt || nowTime) : '',
          }

          if (viewingOrder && viewingOrder.id === orderId) {
            setViewingOrder(updatedOrder)
          }

          const milestoneNames = {
            packed: 'Packed & Labelled',
            dispatched: 'In Transit',
            out_delivery: 'Out for Delivery',
            delivered: 'Delivered & Settled',
          }

          triggerToast(
            willBeChecked
              ? `✓ Milestone "${milestoneNames[milestoneId]}" marked as complete!`
              : `Milestone "${milestoneNames[milestoneId]}" unchecked.`
          )

          return updatedOrder
        }
        return ord
      })
    )
  }

  // Order Stage Updaters
  const markOrderPacked = (orderId) => {
    toggleMilestone(orderId, 'packed')
  }

  const markOrderDelivered = (orderId) => {
    toggleMilestone(orderId, 'delivered')
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
  // SUB-PAGE 1: DEDICATED ORDER DETAILS PAGE (WITH MILESTONE TRACKING)
  // =========================================================================
  if (viewingOrder) {
    const o = viewingOrder
    const checks = getMilestoneChecks(o)

    const milestones = [
      {
        id: 'placed',
        stepNum: 1,
        label: '1. Order Placed',
        status: 'complete',
        isComplete: true,
        time: o.date,
        desc: 'Prepaid & Escrow Locked',
        sub: 'Verified (UPI Auto-Escrow)',
      },
      {
        id: 'packed',
        stepNum: 2,
        label: '2. Packed & Labelled',
        status: checks.packed ? 'complete' : !checks.packed ? 'active' : 'pending',
        isComplete: Boolean(checks.packed),
        time: o.packedAt || (checks.packed ? 'Packed' : 'Pending packaging'),
        desc: 'Inspected with GST invoice slip',
        sub: checks.packed ? `Packed & sealed (${o.packedAt || 'Today'})` : 'Click check mark to confirm packing',
      },
      {
        id: 'dispatched',
        stepNum: 3,
        label: '3. In Transit',
        status: checks.dispatched ? 'complete' : (checks.packed && !checks.dispatched) ? 'active' : 'pending',
        isComplete: Boolean(checks.dispatched),
        time: o.dispatchedAt || (checks.dispatched ? 'Dispatched' : 'Courier assignment pending'),
        desc: o.courierPartner || 'Logistics handover',
        sub: checks.dispatched ? `With ${o.courierPartner || 'Carrier'} · AWB: ${o.trackingId || 'Assigned'}` : 'Click check mark or assign courier',
      },
      {
        id: 'out_delivery',
        stepNum: 4,
        label: '4. Out for Delivery',
        status: checks.out_delivery ? 'complete' : (checks.dispatched && !checks.out_delivery) ? 'active' : 'pending',
        isComplete: Boolean(checks.out_delivery),
        time: o.estimatedDelivery ? `ETA: ${o.estimatedDelivery}` : 'Pending dispatch',
        desc: 'Final local delivery courier hub',
        sub: checks.out_delivery ? 'Package reached buyer local delivery hub' : 'Pending in-transit completion',
      },
      {
        id: 'delivered',
        stepNum: 5,
        label: '5. Delivered & Settled',
        status: checks.delivered ? 'complete' : (checks.out_delivery && !checks.delivered) ? 'active' : 'pending',
        isComplete: Boolean(checks.delivered),
        time: o.deliveredAt || (checks.delivered ? 'Delivered' : 'Escrow auto-releases on delivery'),
        desc: checks.delivered ? 'Funds added to ready balance' : '7-day buyer warranty window',
        sub: checks.delivered ? `Delivered successfully (${o.deliveredAt || 'Today'})` : 'Click check mark to release escrow to bank balance',
      },
    ]

    return (
      <Screen title={`Order Details · ${o.id}`} back={false} padded={false}>
        <div className="seller-portal-container">
          {/* Top Bar with Back Button */}
          <div className="seller-top-bar">
            <button
              type="button"
              onClick={() => setViewingOrder(null)}
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
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span
                style={{
                  fontSize: 10,
                  padding: '3px 8px',
                  borderRadius: 6,
                  fontWeight: 900,
                  background: 'rgba(0, 230, 118, 0.15)',
                  color: '#00e676',
                  border: '1px solid rgba(0, 230, 118, 0.3)',
                }}
              >
                🛡️ Escrow Secured
              </span>
              <button
                type="button"
                onClick={() => setViewingInvoiceOrder(o)}
                style={{
                  padding: '5px 10px',
                  borderRadius: 6,
                  background: 'rgba(0, 176, 255, 0.15)',
                  border: '1px solid rgba(0, 176, 255, 0.3)',
                  color: '#38bdf8',
                  fontSize: 11,
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <FileText size={12} /> Invoice
              </button>
            </div>
          </div>

          {/* Section 1: Milestone Progress Stepper with Vendor Check Mark Controls */}
          <div className="detail-section-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 className="detail-section-title">
                <Clock size={14} color="#00e676" /> Order Fulfillment Milestones
              </h4>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 900,
                  padding: '2px 8px',
                  borderRadius: 6,
                  background:
                    o.orderStage === 'pending_packing'
                      ? 'rgba(255, 200, 61, 0.15)'
                      : o.orderStage === 'packed_ready'
                      ? 'rgba(56, 189, 248, 0.15)'
                      : o.orderStage === 'dispatched'
                      ? 'rgba(192, 132, 252, 0.15)'
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
                {o.stageLabel}
              </span>
            </div>

            {/* Stepper Graphic with Clickable Milestone Circles */}
            <div className="milestone-stepper">
              {milestones.map((m, idx) => (
                <div key={m.id} className="milestone-step-item">
                  {idx > 0 && (
                    <div
                      className={`milestone-line ${
                        milestones[idx].isComplete ? 'is-complete' : ''
                      }`}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => toggleMilestone(o.id, m.id)}
                    className={`milestone-circle ${
                      m.isComplete
                        ? 'is-complete'
                        : m.status === 'active'
                        ? 'is-active'
                        : 'is-pending'
                    }`}
                    title={
                      m.id === 'placed'
                        ? 'Order Placed (Verified by customer payment)'
                        : m.isComplete
                        ? `Click to uncheck "${m.label.split('. ')[1]}"`
                        : `Click to mark "${m.label.split('. ')[1]}" as complete`
                    }
                  >
                    {m.isComplete ? <Check size={14} strokeWidth={3} /> : m.stepNum}
                  </button>
                  <div
                    onClick={() => toggleMilestone(o.id, m.id)}
                    className="milestone-label"
                    style={{
                      color:
                        m.isComplete
                          ? '#00e676'
                          : m.status === 'active'
                          ? '#38bdf8'
                          : '#64748b',
                    }}
                    title="Click to toggle milestone"
                  >
                    {m.label.split('. ')[1]}
                  </div>
                </div>
              ))}
            </div>

            {/* Vendor Interactive Milestone Checklist */}
            <div className="vendor-milestone-checklist">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <span style={{ fontSize: 11, fontWeight: 900, color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.4px', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle2 size={13} color="#00e676" /> Vendor Milestone Check Marks
                </span>
                <span style={{ fontSize: 10, color: '#38bdf8', fontWeight: 700 }}>
                  Tap circles above or buttons below to update
                </span>
              </div>

              {milestones.map((m) => (
                <div
                  key={m.id}
                  className={`vendor-milestone-row ${m.isComplete ? 'is-complete' : ''}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, flex: 1 }}>
                    <button
                      type="button"
                      onClick={() => toggleMilestone(o.id, m.id)}
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 6,
                        border: m.isComplete ? '1.5px solid #00e676' : '1.5px solid rgba(255, 255, 255, 0.2)',
                        background: m.isComplete ? '#00e676' : 'rgba(255, 255, 255, 0.03)',
                        color: '#020617',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: m.id === 'placed' ? 'default' : 'pointer',
                        flexShrink: 0,
                      }}
                      title={m.isComplete ? 'Click to uncheck' : 'Click to check'}
                    >
                      {m.isComplete && <Check size={14} strokeWidth={3} />}
                    </button>

                    <div style={{ minWidth: 0, flex: 1 }}>
                      <strong style={{ fontSize: 12, color: m.isComplete ? '#00e676' : '#f8fafc', display: 'block', lineHeight: 1.3 }}>
                        {m.label}
                      </strong>
                      <span style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginTop: 1 }}>
                        {m.sub}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {m.id === 'placed' ? (
                      <span style={{ fontSize: 10, color: '#00e676', fontWeight: 800, padding: '4px 8px', background: 'rgba(0, 230, 118, 0.1)', borderRadius: 6 }}>
                        ✓ Verified
                      </span>
                    ) : m.id === 'dispatched' && !m.isComplete ? (
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button
                          type="button"
                          onClick={() => toggleMilestone(o.id, m.id)}
                          className="vendor-milestone-toggle-btn is-unchecked"
                        >
                          ✓ Mark Dispatched
                        </button>
                        <button
                          type="button"
                          onClick={() => setAssigningCourierOrder(o)}
                          style={{
                            padding: '6px 10px',
                            borderRadius: 7,
                            background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
                            color: '#020617',
                            fontWeight: 900,
                            fontSize: 10,
                            border: 'none',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          <Truck size={11} /> Shipping Form
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => toggleMilestone(o.id, m.id)}
                        className={`vendor-milestone-toggle-btn ${m.isComplete ? 'is-checked' : 'is-unchecked'}`}
                      >
                        {m.isComplete ? (
                          <>
                            <Check size={12} strokeWidth={3} /> Checked (Click to Undo)
                          </>
                        ) : (
                          `Mark ${m.label.split('. ')[1]}`
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Current Step Description Card */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '10px 12px',
                borderRadius: 8,
                fontSize: 12,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--muted)', fontSize: 11 }}>CURRENT LOGISTICS STATUS</span>
                <span style={{ color: '#00e676', fontWeight: 800, fontSize: 11 }}>Live Synchronized</span>
              </div>
              <strong style={{ color: '#f8fafc', fontSize: 13 }}>
                {o.orderStage === 'pending_packing' && 'Order received and confirmed. Please inspect and pack the items.'}
                {o.orderStage === 'packed_ready' && 'Package is sealed with invoice. Assign courier partner to generate AWB & tracking.'}
                {o.orderStage === 'dispatched' && (o.outForDelivery ? 'Package has reached destination local hub and is out for delivery.' : `Handed over to ${o.courierPartner}. In transit to destination.`)}
                {o.orderStage === 'delivered' && 'Delivered successfully. Payment released to bank ready balance.'}
              </strong>
            </div>
          </div>

          {/* Section 2: Customer Details with Easy Copy Address */}
          <div className="detail-section-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
              <h4 className="detail-section-title">
                <Building size={14} color="#38bdf8" /> Customer & Delivery Address
              </h4>
              <button
                type="button"
                onClick={() => copyAddressToClipboard(o)}
                className="copy-address-btn"
              >
                <Copy size={13} /> Copy Full Address
              </button>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 12,
                background: 'rgba(255, 255, 255, 0.02)',
                padding: '12px',
                borderRadius: 10,
                border: '1px solid rgba(255, 255, 255, 0.04)',
              }}
            >
              <div>
                <span style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 800 }}>
                  BUYER CONTACT
                </span>
                <strong style={{ fontSize: 15, color: '#f8fafc', display: 'block', marginTop: 3 }}>
                  {o.buyerName}
                </strong>
                <span style={{ fontSize: 11, color: '#38bdf8', fontWeight: 700 }}>{o.buyerType}</span>
                <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <a
                    href={`tel:${o.phone.replace(/[^0-9]/g, '')}`}
                    style={{
                      padding: '5px 10px',
                      borderRadius: 6,
                      background: 'rgba(0, 230, 118, 0.15)',
                      border: '1px solid rgba(0, 230, 118, 0.3)',
                      color: '#00e676',
                      fontSize: 11,
                      fontWeight: 800,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <Phone size={12} /> {o.phone}
                  </a>
                </div>
              </div>

              <div>
                <span style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 800 }}>
                  SHIPPING DESTINATION
                </span>
                <p style={{ margin: '3px 0 0', fontSize: 13, color: '#cbd5e1', lineHeight: 1.4 }}>
                  📍 {o.address}
                </p>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>
                  Destination Region: <strong style={{ color: '#f8fafc' }}>{o.city}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Ordered Products & Details */}
          <div className="detail-section-card">
            <h4 className="detail-section-title">
              <Package size={14} color="#00e676" /> Product Details & Specifications
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {o.items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    gap: 12,
                    alignItems: 'center',
                    background: 'rgba(255, 255, 255, 0.02)',
                    padding: '12px',
                    borderRadius: 10,
                    border: '1px solid rgba(255, 255, 255, 0.04)',
                  }}
                >
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
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={item.image || '/market/bat-pro.png'}
                      alt={item.title}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                      <div>
                        <strong style={{ fontSize: 14, color: '#f8fafc', display: 'block', lineHeight: 1.3 }}>
                          {item.title}
                        </strong>
                        <span style={{ fontSize: 11, color: '#38bdf8', fontWeight: 700 }}>
                          {item.sku}
                        </span>
                      </div>
                      <strong style={{ fontSize: 14, color: '#00e676', whiteSpace: 'nowrap' }}>
                        ₹{(item.qty * item.price).toLocaleString('en-IN')}
                      </strong>
                    </div>

                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>
                      {item.spec || 'Professional Tournament Equipment'}
                    </div>

                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 6, fontSize: 11 }}>
                      <span style={{ color: 'var(--muted)' }}>Quantity: <strong style={{ color: '#f8fafc' }}>{item.qty} Unit(s)</strong></span>
                      <span style={{ color: 'var(--muted)' }}>•</span>
                      <span style={{ color: 'var(--muted)' }}>Rate: <strong style={{ color: '#cbd5e1' }}>₹{item.price.toLocaleString('en-IN')} each</strong></span>
                      {item.mrp && item.mrp > item.price && (
                        <span className="price-mrp-cut">₹{item.mrp.toLocaleString('en-IN')}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Price Breakdown Footer */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '10px 14px',
                  borderRadius: 10,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>Total Payable</span>
                  <div style={{ fontSize: 11, color: '#ffc83d', fontWeight: 700 }}>{o.paymentMode}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>Includes {o.gstRate}</div>
                  <strong style={{ fontSize: 18, color: '#00e676' }}>
                    ₹{o.totalAmount.toLocaleString('en-IN')}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Courier Logistics & Live Tracking Link */}
          <div className="detail-section-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
              <h4 className="detail-section-title">
                <Truck size={14} color="#818cf8" /> Courier & Shipping Logistics
              </h4>
              <button
                type="button"
                onClick={() => setAssigningCourierOrder(o)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 7,
                  background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
                  border: 'none',
                  color: '#020617',
                  fontSize: 11,
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                <Truck size={12} /> {o.trackingId ? 'Update Shipping' : 'Assign Courier Details'}
              </button>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 10,
                background: 'rgba(255, 255, 255, 0.02)',
                padding: '12px',
                borderRadius: 10,
                border: '1px solid rgba(255, 255, 255, 0.04)',
              }}
            >
              <div>
                <span style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 800 }}>
                  COURIER / CARGO PARTNER
                </span>
                <strong style={{ fontSize: 14, color: '#f8fafc', display: 'block', marginTop: 2 }}>
                  {o.courierPartner || 'Not Allocated Yet'}
                </strong>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>
                  {o.dispatchedAt ? `Dispatched on ${o.dispatchedAt}` : 'Ready for pickup from merchant warehouse'}
                </span>
              </div>

              <div>
                <span style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 800 }}>
                  AWB / TRACKING ID
                </span>
                <strong style={{ fontSize: 14, color: o.trackingId ? '#00e676' : '#ffc83d', display: 'block', marginTop: 2 }}>
                  {o.trackingId || 'Pending Courier Handover'}
                </strong>
                {o.trackingLink ? (
                  <a
                    href={o.trackingLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontSize: 11,
                      color: '#38bdf8',
                      fontWeight: 800,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      marginTop: 4,
                      textDecoration: 'underline',
                    }}
                  >
                    <ExternalLink size={11} /> Track on Official Carrier Portal ↗
                  </a>
                ) : (
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>
                    Fill shipping form to generate live tracking link
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Section 5: Stage Action Execution Bar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
            {o.orderStage === 'pending_packing' && (
              <button
                type="button"
                className="seller-order-main-cta"
                onClick={() => markOrderPacked(o.id)}
                style={{ background: 'linear-gradient(135deg, #00e676, #00b0ff)', padding: '14px' }}
              >
                <Package size={16} /> 📦 Mark Packed & Ready for Pickup
              </button>
            )}

            {o.orderStage === 'packed_ready' && (
              <button
                type="button"
                className="seller-order-main-cta"
                onClick={() => setAssigningCourierOrder(o)}
                style={{ background: 'linear-gradient(135deg, #38bdf8, #818cf8)', padding: '14px' }}
              >
                <Truck size={16} /> 🚚 Assign Courier & Shipping Details
              </button>
            )}

            {o.orderStage === 'dispatched' && (
              <button
                type="button"
                className="seller-order-main-cta"
                onClick={() => markOrderDelivered(o.id)}
                style={{ background: 'linear-gradient(135deg, #00e676, #10b981)', padding: '14px' }}
              >
                <CheckCircle2 size={16} /> ✅ Mark Delivered & Release Escrow Funds
              </button>
            )}

            {o.orderStage === 'delivered' && (
              <div
                style={{
                  textAlign: 'center',
                  padding: '12px',
                  background: 'rgba(0, 230, 118, 0.1)',
                  borderRadius: 10,
                  fontSize: 13,
                  color: '#00e676',
                  fontWeight: 900,
                  border: '1px solid rgba(0, 230, 118, 0.3)',
                }}
              >
                ✓ Order Completed & Escrow Proceeds Released to Ready Balance
              </div>
            )}
          </div>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // SUB-PAGE 2: DEDICATED ASSIGN COURIER & SHIPPING DETAILS PAGE (NO SIMULATION)
  // =========================================================================
  if (assigningCourierOrder) {
    const o = assigningCourierOrder

    return (
      <Screen title={`Assign Courier · ${o.id}`} back={false} padded={false}>
        <div className="seller-portal-container">
          <div className="seller-top-bar">
            <button
              type="button"
              onClick={() => setAssigningCourierOrder(null)}
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
              Order Destination: {o.city}
            </span>
          </div>

          <div className="detail-section-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: 'rgba(56, 189, 248, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Truck size={20} color="#38bdf8" />
              </div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 900, color: '#f8fafc', margin: 0 }}>
                  Assign Cargo & Dispatch Details
                </h3>
                <small style={{ color: 'var(--muted)', fontSize: 11 }}>
                  Information will be sent to {o.buyerName} via Email & Application update.
                </small>
              </div>
            </div>

            {/* Quick Courier Partner Presets */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>
                SELECT LOGISTICS CARRIER
              </label>
              <div className="seller-scroll-filters">
                {COURIER_PRESETS.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => {
                      const partnerInput = document.getElementById('courierPartnerInput')
                      const awbInput = document.getElementById('trackingIdInput')
                      const linkInput = document.getElementById('trackingLinkInput')
                      if (partnerInput) partnerInput.value = p.name
                      const randAwb = `${p.trackingPrefix}${Math.floor(100000 + Math.random() * 900000)}`
                      if (awbInput && !awbInput.value) awbInput.value = randAwb
                      if (linkInput) linkInput.value = `${p.trackUrl}${randAwb}`
                    }}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#cbd5e1',
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    🚚 {p.name}
                  </button>
                ))}
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                const form = e.target
                const partner = form.courierPartner.value.trim()
                const trackingId = form.trackingId.value.trim()
                const trackingLink = form.trackingLink.value.trim()
                const dispatchDate = form.dispatchDate.value
                const etaDate = form.etaDate.value
                const notes = form.notes.value.trim()

                setOrders((prev) =>
                  prev.map((ord) => {
                    if (ord.id === o.id) {
                      const updated = {
                        ...ord,
                        courierPartner: partner,
                        trackingId: trackingId,
                        trackingLink: trackingLink || `https://track.${partner.toLowerCase().replace(/[^a-z]/g, '')}.com/${trackingId}`,
                        dispatchedAt: dispatchDate || 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        estimatedDelivery: etaDate || 'In 3 Business Days',
                        shippingNotes: notes,
                        orderStage: 'dispatched',
                        stageLabel: 'Dispatched / In Transit',
                        escrowStatus: 'Escrow Holding (In Transit)',
                        milestoneChecks: {
                          placed: true,
                          packed: true,
                          dispatched: true,
                          out_delivery: Boolean(ord.milestoneChecks?.out_delivery),
                          delivered: false,
                        },
                      }
                      if (viewingOrder && viewingOrder.id === ord.id) {
                        setViewingOrder(updated)
                      }
                      return updated
                    }
                    return ord
                  })
                )

                setAssigningCourierOrder(null)
                triggerToast(`Courier assigned! AWB: ${trackingId}. Customer notified via App & Email.`)
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 6 }}
            >
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  CARRIER / COURIER NAME *
                </label>
                <input
                  id="courierPartnerInput"
                  name="courierPartner"
                  required
                  defaultValue={o.courierPartner || 'BlueDart Express Air'}
                  placeholder="e.g. BlueDart, Delhivery, DTDC, FedEx"
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
                    AWB / TRACKING ID *
                  </label>
                  <input
                    id="trackingIdInput"
                    name="trackingId"
                    required
                    defaultValue={o.trackingId || `BLUEDART-${Math.floor(100000 + Math.random() * 900000)}`}
                    placeholder="e.g. BLUEDART-882194-IN"
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
                    ESTIMATED DELIVERY DATE
                  </label>
                  <input
                    name="etaDate"
                    type="date"
                    defaultValue={new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0]}
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
                  LIVE CARRIER TRACKING LINK / URL *
                </label>
                <input
                  id="trackingLinkInput"
                  name="trackingLink"
                  required
                  defaultValue={o.trackingLink || 'https://www.bluedart.com/tracking'}
                  placeholder="e.g. https://www.bluedart.com/tracking/BLUEDART-882194-IN"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#38bdf8',
                    fontSize: 12,
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  DISPATCH DATE
                </label>
                <input
                  name="dispatchDate"
                  defaultValue={`Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
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
                  PACKAGE WEIGHT & DISPATCH NOTES (OPTIONAL)
                </label>
                <input
                  name="notes"
                  placeholder="e.g. 1.8 kg • Bubble wrapped bat tube with fragile sticker"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#cbd5e1',
                    fontSize: 12,
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Email & App Notification Notice */}
              <div
                style={{
                  background: 'rgba(56, 189, 248, 0.08)',
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  fontSize: 11,
                  color: '#94a3b8',
                }}
              >
                <strong style={{ color: '#38bdf8' }}>Automated Customer Alert:</strong> When submitted, an update email and in-app milestone notification with the direct tracking link will be dispatched immediately to{' '}
                <strong style={{ color: '#f8fafc' }}>{o.buyerName}</strong>.
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '12px 18px',
                    borderRadius: 9,
                    border: 'none',
                    background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
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
                  <Send size={15} /> Confirm Dispatch & Notify Customer
                </button>
                <button
                  type="button"
                  onClick={() => setAssigningCourierOrder(null)}
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
  // SUB-PAGE 3: ADD NEW PRODUCT TO CATALOG (DYNAMIC SPECS, IMAGE SELECTOR, MRP DISCOUNT)
  // =========================================================================
  if (showAddProductPage) {
    return <AddProductScreen onClose={() => setShowAddProductPage(false)} onAdd={(p) => {
      setProducts((prev) => [p, ...prev])
      setShowAddProductPage(false)
      triggerToast(`Added "${p.title}" to store catalog!`)
    }} />
  }

  // =========================================================================
  // SUB-PAGE 4: EDIT PRODUCT SPECIFICATIONS (DYNAMIC SPECS, IMAGE SELECTOR, MRP DISCOUNT)
  // =========================================================================
  if (editingProduct) {
    return (
      <EditProductScreen
        product={editingProduct}
        onClose={() => setEditingProduct(null)}
        onSave={(updated) => {
          setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
          setEditingProduct(null)
          triggerToast(`Updated specs for "${updated.title}"!`)
        }}
      />
    )
  }

  // =========================================================================
  // SUB-PAGE 5: OFFICIAL GST TAX INVOICE & PACKING SLIP
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

            <div style={{ background: 'rgba(255,255,255,0.02)', padding: 10, borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <span style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase' }}>BILL TO:</span>
                  <strong style={{ display: 'block', color: '#f8fafc', fontSize: 13 }}>{o.buyerName}</strong>
                  <div style={{ color: '#94a3b8', fontSize: 11 }}>{o.buyerType}</div>
                  <div style={{ color: '#94a3b8', fontSize: 11 }}>{o.phone}</div>
                </div>
                <div>
                  <span style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase' }}>SHIPPING DESTINATION:</span>
                  <div style={{ color: '#f8fafc', fontSize: 12, maxWidth: 320 }}>{o.address}</div>
                  <div style={{ color: '#38bdf8', fontSize: 11, marginTop: 2 }}>AWB: {o.trackingId || 'Pending allocation'}</div>
                </div>
              </div>
            </div>

            <div className="seller-invoice-table-wrap">
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--muted)', fontSize: 10 }}>
                    <th style={{ padding: '8px 4px' }}>ITEM & SKU</th>
                    <th style={{ padding: '8px 4px' }}>HSN</th>
                    <th style={{ padding: '8px 4px', textAlign: 'center' }}>QTY</th>
                    <th style={{ padding: '8px 4px', textAlign: 'right' }}>RATE</th>
                    <th style={{ padding: '8px 4px', textAlign: 'right' }}>TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {o.items.map((it, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '8px 4px' }}>
                        <strong style={{ color: '#f8fafc' }}>{it.title}</strong>
                        <div style={{ fontSize: 10, color: 'var(--muted)' }}>{it.sku}</div>
                      </td>
                      <td style={{ padding: '8px 4px', color: '#94a3b8' }}>{o.hsnCode}</td>
                      <td style={{ padding: '8px 4px', textAlign: 'center', color: '#00e676', fontWeight: 800 }}>{it.qty}</td>
                      <td style={{ padding: '8px 4px', textAlign: 'right', color: '#f8fafc' }}>₹{it.price.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '8px 4px', textAlign: 'right', color: '#00e676', fontWeight: 800 }}>
                        ₹{(it.qty * it.price).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 10 }}>
              <div style={{ minWidth: 200, display: 'flex', flexDirection: 'column', gap: 4, fontSize: 11 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)' }}>
                  <span>Taxable Base Value:</span>
                  <span>₹{baseAmount.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)' }}>
                  <span>CGST (Half):</span>
                  <span>₹{cgst.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)' }}>
                  <span>SGST (Half):</span>
                  <span>₹{sgst.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#00e676', fontWeight: 900, fontSize: 13, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 4 }}>
                  <span>Grand Total (INR):</span>
                  <span>₹{o.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // SUB-PAGE 6: QUEUE B2B MANUAL ORDER FOR PACKING
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
              Direct Academy & Franchise Booking
            </span>
          </div>

          <div className="detail-section-card">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const form = e.target
                const buyerName = form.buyerName.value
                const buyerType = form.buyerType.value
                const phone = form.phone.value
                const city = form.city.value
                const address = form.address.value
                const paymentMode = form.paymentMode.value
                const productId = form.productId.value
                const qty = Number(form.qty.value)

                const selectedProd = products.find((p) => p.id === productId) || products[0]
                const itemTotal = qty * selectedProd.wholesalePrice

                const newOrder = {
                  id: `ORD-${Math.floor(8822 + Math.random() * 1000)}`,
                  date: 'Today, Just now',
                  buyerName,
                  buyerType,
                  phone,
                  city,
                  address,
                  items: [
                    {
                      title: selectedProd.title,
                      sku: selectedProd.sku,
                      qty,
                      price: selectedProd.wholesalePrice,
                      mrp: selectedProd.mrp,
                      image: selectedProd.image,
                      spec: selectedProd.grade,
                    },
                  ],
                  totalAmount: itemTotal,
                  paymentMode,
                  escrowStatus: 'Secured in Escrow',
                  orderStage: 'pending_packing',
                  stageLabel: 'New / Pending Packing',
                  courierPartner: 'BlueDart Express Air',
                  trackingId: '',
                  trackingLink: '',
                  hsnCode: '9506.99.10',
                  gstRate: '12% GST',
                }

                setOrders((prev) => [newOrder, ...prev])
                setShowManualOrderPage(false)
                triggerToast(`B2B Order ${newOrder.id} queued for packing!`)
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              <h3 style={{ fontSize: 15, fontWeight: 900, color: '#f8fafc', margin: 0 }}>
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
  // SUB-PAGE 7: MONTHLY TAX & ESCROW STATEMENT
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

          <div className="detail-section-card">
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
                <span style={{ fontSize: 10, color: 'var(--muted)' }}>GST COLLECTED (12%)</span>
                <strong style={{ fontSize: 15, color: '#00e676', display: 'block', marginTop: 2 }}>₹1.58L</strong>
              </div>
            </div>
          </div>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // MAIN SELLER PORTAL SCREEN (3 TABS: CATALOG, ORDERS, PAYOUTS)
  // =========================================================================
  return (
    <Screen title="Merchant Operations" back={false} padded={false}>
      <div className="seller-portal-container">
        {/* Toast */}
        {toastMsg && (
          <div
            style={{
              position: 'fixed',
              top: 18,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg, #00e676, #00b0ff)',
              color: '#020617',
              padding: '10px 18px',
              borderRadius: 30,
              fontSize: 12,
              fontWeight: 900,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 8px 24px rgba(0, 230, 118, 0.4)',
              zIndex: 9999,
              maxWidth: '90%',
            }}
          >
            <Sparkles size={14} />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Back Button & Top Bar */}
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

        {/* 3-PORTAL NAVIGATION TABS */}
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
            {/* Header Controls */}
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

              {/* Stock Status Pills */}
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

              {/* Category Pills */}
              <div className="seller-scroll-filters">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'bats', label: '🏏 Willow Bats' },
                  { id: 'balls', label: '🔴 Match Balls' },
                  { id: 'pads', label: '🛡️ Pads' },
                  { id: 'gloves', label: '🧤 Gloves' },
                  { id: 'helmets', label: '🪖 Helmets' },
                  { id: 'jerseys', label: '👕 Jerseys' },
                  { id: 'kitbags', label: '🎒 Kit Bags' },
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

            {/* Product Cards Grid with Strikethrough MRP and Discount % */}
            <div className="seller-product-grid">
              {filteredProducts.map((p) => {
                const isOutOfStock = p.stock === 0
                const isLowStock = p.stock > 0 && p.stock <= 4
                const discountPct = p.mrp && p.mrp > p.retailPrice ? Math.round(((p.mrp - p.retailPrice) / p.mrp) * 100) : 0

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
                            width: 60,
                            height: 60,
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

                      {/* Pricing Breakdown: Strikethrough MRP vs Discounted Selling Price */}
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
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontSize: 9, color: 'var(--muted)', textTransform: 'uppercase' }}>Customer Price</span>
                            {discountPct > 0 && (
                              <span className="price-discount-badge">{discountPct}% OFF</span>
                            )}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 2 }}>
                            <strong style={{ fontSize: 14, color: '#00e676' }}>
                              ₹{p.retailPrice.toLocaleString('en-IN')}
                            </strong>
                            {p.mrp && p.mrp > p.retailPrice && (
                              <span className="price-mrp-cut">₹{p.mrp.toLocaleString('en-IN')}</span>
                            )}
                          </div>
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
                          padding: '5px 12px',
                          borderRadius: 6,
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
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
        {/* TAB 2: ORDER DISPATCH PIPELINE (STREAMLINED & SCANNABLE WITH VIEW)  */}
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

            {/* Streamlined Scannable Orders List (Low content clutter, high usability) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
              {filteredOrders.map((o) => {
                const firstItem = o.items[0] || {}

                return (
                  <div key={o.id} className="seller-order-card">
                    {/* Top Row: Order ID, Date, Status Pill & Escrow Tag */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <strong style={{ fontSize: 13, color: '#f8fafc' }}>{o.id}</strong>
                        <span style={{ fontSize: 11, color: 'var(--muted)' }}>• {o.date.split(',')[0]}</span>
                      </div>

                      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                        <span
                          style={{
                            fontSize: 9,
                            padding: '2px 7px',
                            borderRadius: 5,
                            fontWeight: 900,
                            background:
                              o.orderStage === 'pending_packing'
                                ? 'rgba(255, 200, 61, 0.15)'
                                : o.orderStage === 'packed_ready'
                                ? 'rgba(56, 189, 248, 0.15)'
                                : o.orderStage === 'dispatched'
                                ? 'rgba(192, 132, 252, 0.15)'
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

                    {/* Middle Summary Row: Product Thumbnail, Title, Buyer & Price */}
                    <div className="order-queue-summary">
                      <div className="order-queue-thumb">
                        <img
                          src={firstItem.image || '/market/bat-pro.png'}
                          alt={firstItem.title}
                        />
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <strong style={{ fontSize: 13, color: '#f8fafc', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {firstItem.qty}x {firstItem.title}
                          {o.items.length > 1 ? ` (+${o.items.length - 1} more)` : ''}
                        </strong>
                        <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                          Buyer: <strong style={{ color: '#cbd5e1' }}>{o.buyerName}</strong> • {o.city}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <strong style={{ fontSize: 14, color: '#00e676', display: 'block' }}>
                          ₹{o.totalAmount.toLocaleString('en-IN')}
                        </strong>
                        <span style={{ fontSize: 10, color: 'var(--muted)' }}>
                          {o.paymentMode.includes('UPI') ? 'UPI' : o.paymentMode.includes('B2B') ? 'B2B' : 'Prepaid'}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons Row: Prominent [View Details] + Workflow CTA */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: 8 }}>
                      <button
                        type="button"
                        onClick={() => setViewingOrder(o)}
                        style={{
                          padding: '9px 12px',
                          borderRadius: 8,
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: '#f8fafc',
                          fontSize: 12,
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 6,
                        }}
                      >
                        <Eye size={14} color="#38bdf8" /> View Details
                      </button>

                      {o.orderStage === 'pending_packing' && (
                        <button
                          type="button"
                          className="seller-order-main-cta"
                          onClick={() => markOrderPacked(o.id)}
                          style={{ background: 'linear-gradient(135deg, #00e676, #00b0ff)' }}
                        >
                          <Package size={14} /> 📦 Mark Packed
                        </button>
                      )}

                      {o.orderStage === 'packed_ready' && (
                        <button
                          type="button"
                          className="seller-order-main-cta"
                          onClick={() => setAssigningCourierOrder(o)}
                          style={{ background: 'linear-gradient(135deg, #38bdf8, #818cf8)' }}
                        >
                          <Truck size={14} /> 🚚 Assign Courier
                        </button>
                      )}

                      {o.orderStage === 'dispatched' && (
                        <button
                          type="button"
                          className="seller-order-main-cta"
                          onClick={() => markOrderDelivered(o.id)}
                          style={{ background: 'linear-gradient(135deg, #00e676, #10b981)' }}
                        >
                          <CheckCircle2 size={14} /> ✅ Mark Delivered
                        </button>
                      )}

                      {o.orderStage === 'delivered' && (
                        <div
                          style={{
                            textAlign: 'center',
                            padding: '8px',
                            background: 'rgba(0, 230, 118, 0.1)',
                            borderRadius: 8,
                            fontSize: 11,
                            color: '#00e676',
                            fontWeight: 800,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          ✓ Settled
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
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

            {/* KPI Cards */}
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

// =========================================================================
// SUB-COMPONENT: ADD PRODUCT SCREEN (DYNAMIC SPECS, IMAGE SELECTOR, MRP DISCOUNT)
// =========================================================================
function AddProductScreen({ onClose, onAdd }) {
  const [cat, setCat] = useState('bats')
  const [selectedImg, setSelectedImg] = useState('/market/bat-pro.png')
  const [mrpVal, setMrpVal] = useState(18999)
  const [sellingPriceVal, setSellingPriceVal] = useState(14500)

  const activeConfig = CATEGORY_SPECS_CONFIG[cat] || CATEGORY_SPECS_CONFIG.bats
  const discountPct = mrpVal > sellingPriceVal ? Math.round(((mrpVal - sellingPriceVal) / mrpVal) * 100) : 0

  return (
    <Screen title="Add New Product" back={false} padded={false}>
      <div className="seller-portal-container">
        <div className="seller-top-bar">
          <button
            type="button"
            onClick={onClose}
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

        <div className="detail-section-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(0, 230, 118, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Plus size={20} color="#00e676" />
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 900, color: '#f8fafc', margin: 0 }}>
                Add Product to Store Catalog
              </h3>
              <small style={{ color: 'var(--muted)', fontSize: 11 }}>
                Synchronized immediately to Marketplace and B2B channels with customer specs.
              </small>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              const form = e.target
              const title = form.title.value.trim()
              const sku = form.sku.value.trim() || `SKU-PRO-${Math.floor(1000 + Math.random() * 9000)}`
              const mrp = Number(form.mrp.value)
              const retailPrice = Number(form.retailPrice.value)
              const wholesalePrice = Number(form.wholesalePrice.value) || Math.round(retailPrice * 0.8)
              const stock = Number(form.stock.value)
              const image = form.image.value.trim() || selectedImg

              // Collect dynamic category specs
              const specs = {}
              activeConfig.fields.forEach((f) => {
                if (form[f.key]) {
                  specs[f.key] = form[f.key].value.trim()
                }
              })

              const newProd = {
                id: `prod-${Date.now()}`,
                sku,
                title,
                category: cat,
                categoryLabel: activeConfig.label,
                image,
                grade: specs['Willow Grade'] || specs['Construction'] || specs['Fabric'] || specs['Facing'] || 'Pro Tournament Grade',
                weight: specs['Weight Range'] || specs['Weight'] || specs['Blade Size'] || 'Standard',
                stock,
                mrp,
                retailPrice,
                wholesalePrice,
                minWholesaleQty: Number(form.minWholesale.value) || 5,
                status: stock === 0 ? 'out_of_stock' : stock <= 4 ? 'low_stock' : 'in_stock',
                salesCount: 0,
                specs,
                highlights: form.highlights?.value || 'Authentic match certified sports equipment.',
              }

              onAdd(newProd)
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
          >
            {/* Category Selector */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                PRODUCT CATEGORY *
              </label>
              <select
                name="category"
                value={cat}
                onChange={(e) => {
                  const newCat = e.target.value
                  setCat(newCat)
                  if (CATEGORY_SPECS_CONFIG[newCat]) {
                    setSelectedImg(CATEGORY_SPECS_CONFIG[newCat].defaultImg)
                  }
                }}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 8,
                  background: '#0f172a',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#00e676',
                  fontWeight: 800,
                  fontSize: 13,
                  boxSizing: 'border-box',
                }}
              >
                <option value="bats">🏏 English Willow Bats</option>
                <option value="balls">🔴 Leather Match Balls</option>
                <option value="pads">🛡️ Batting Pads</option>
                <option value="gloves">🧤 Batting Gloves</option>
                <option value="helmets">🪖 Pro Helmets</option>
                <option value="jerseys">👕 Custom Team Jerseys</option>
                <option value="kitbags">🎒 Kit Bags & Luggage</option>
              </select>
            </div>

            {/* Product Image Selector */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                padding: '12px',
                borderRadius: 10,
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>
                PRODUCT IMAGE SELECTOR (PRESETS OR CUSTOM URL) *
              </label>

              {/* Image Preview + Preset Chips */}
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 10,
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1.5px solid #00e676',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 4,
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={selectedImg}
                    alt="Preview"
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: 11, color: '#f8fafc', fontWeight: 800 }}>Select Authentic Equipment Preset:</span>
                  <div className="image-preset-grid" style={{ marginTop: 6 }}>
                    {PRESET_GEAR_IMAGES.map((imgItem) => (
                      <button
                        key={imgItem.id}
                        type="button"
                        onClick={() => setSelectedImg(imgItem.url)}
                        className={`image-preset-btn ${selectedImg === imgItem.url ? 'is-selected' : ''}`}
                      >
                        <img src={imgItem.url} alt={imgItem.label} />
                        <span style={{ fontSize: 9, color: '#94a3b8', whiteSpace: 'nowrap' }}>{imgItem.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Custom Image URL input */}
              <input
                name="image"
                value={selectedImg}
                onChange={(e) => setSelectedImg(e.target.value)}
                placeholder="Or paste external image URL (https://... or /market/...)"
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: 8,
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#38bdf8',
                  fontSize: 11,
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Product Title & SKU */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                PRODUCT TITLE *
              </label>
              <input
                name="title"
                required
                placeholder="e.g. Apex Pro Player English Willow Cricket Bat"
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
                  defaultValue={`SKU-${cat.toUpperCase().slice(0, 3)}-${Math.floor(100 + Math.random() * 900)}`}
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
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            {/* Pricing Section with Strikethrough MRP and Discount Calculation */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                padding: '12px',
                borderRadius: 10,
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#f8fafc' }}>PRICING & DISCOUNT STRUCTURE</span>
                {discountPct > 0 && (
                  <span className="price-discount-badge">{discountPct}% OFF FOR CUSTOMERS</span>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    ACTUAL MRP (₹, STRIKETHROUGH) *
                  </label>
                  <input
                    name="mrp"
                    type="number"
                    min="100"
                    required
                    value={mrpVal}
                    onChange={(e) => setMrpVal(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#94a3b8',
                      textDecoration: 'line-through',
                      fontWeight: 800,
                      fontSize: 13,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    DISCOUNTED PRICE (₹) *
                  </label>
                  <input
                    name="retailPrice"
                    type="number"
                    min="100"
                    required
                    value={sellingPriceVal}
                    onChange={(e) => setSellingPriceVal(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#00e676',
                      fontWeight: 900,
                      fontSize: 13,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    WHOLESALE RATE (₹, 5+)
                  </label>
                  <input
                    name="wholesalePrice"
                    type="number"
                    min="100"
                    defaultValue={Math.round(sellingPriceVal * 0.8)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#38bdf8',
                      fontWeight: 900,
                      fontSize: 13,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              {/* Customer Display Live Badge Preview */}
              <div style={{ marginTop: 8, fontSize: 11, color: 'var(--muted)' }}>
                Customer Display: <span className="price-mrp-cut">₹{mrpVal.toLocaleString('en-IN')}</span>{' '}
                <strong style={{ color: '#00e676', fontSize: 13 }}>₹{sellingPriceVal.toLocaleString('en-IN')}</strong>{' '}
                {discountPct > 0 && (
                  <span style={{ color: '#38bdf8', fontWeight: 800 }}>
                    (Customer saves ₹{(mrpVal - sellingPriceVal).toLocaleString('en-IN')})
                  </span>
                )}
              </div>
            </div>

            {/* Dynamic Category Technical Specifications */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                padding: '12px',
                borderRadius: 10,
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#f8fafc' }}>
                  DYNAMIC TECHNICAL SPECIFICATIONS ({activeConfig.label.toUpperCase()})
                </span>
                <span style={{ fontSize: 10, color: 'var(--muted)' }}>Displayed on customer product page</span>
              </div>

              <div className="dynamic-spec-grid">
                {activeConfig.fields.map((f) => (
                  <div key={f.key}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                      {f.label.toUpperCase()}
                    </label>
                    <input
                      name={f.key}
                      defaultValue={f.default}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#f8fafc',
                        fontSize: 12,
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Key Highlights */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                KEY EQUIPMENT HIGHLIGHTS
              </label>
              <textarea
                name="highlights"
                rows={2}
                defaultValue="Selected Grade 1 materials, calibrated balance, high-density impact absorption, factory inspected."
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: 8,
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#cbd5e1',
                  fontSize: 12,
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
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
                }}
              >
                <CheckCircle2 size={16} /> Save Product to Store Catalog
              </button>
              <button
                type="button"
                onClick={onClose}
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
// SUB-COMPONENT: EDIT PRODUCT SCREEN (DYNAMIC SPECS, IMAGE SELECTOR, MRP DISCOUNT)
// =========================================================================
function EditProductScreen({ product, onClose, onSave }) {
  const [cat, setCat] = useState(product.category || 'bats')
  const [selectedImg, setSelectedImg] = useState(product.image || '/market/bat-pro.png')
  const [mrpVal, setMrpVal] = useState(product.mrp || Math.round(product.retailPrice * 1.3))
  const [sellingPriceVal, setSellingPriceVal] = useState(product.retailPrice || 4999)

  const activeConfig = CATEGORY_SPECS_CONFIG[cat] || CATEGORY_SPECS_CONFIG.bats
  const discountPct = mrpVal > sellingPriceVal ? Math.round(((mrpVal - sellingPriceVal) / mrpVal) * 100) : 0

  return (
    <Screen title={`Edit ${product.sku}`} back={false} padded={false}>
      <div className="seller-portal-container">
        <div className="seller-top-bar">
          <button
            type="button"
            onClick={onClose}
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
            {product.sku}
          </span>
        </div>

        <div className="detail-section-card">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const form = e.target
              const updatedTitle = form.title.value.trim()
              const updatedStock = Number(form.stock.value)
              const updatedMrp = Number(form.mrp.value)
              const updatedRetail = Number(form.retailPrice.value)
              const updatedWholesale = Number(form.wholesalePrice.value)
              const updatedImage = form.image.value.trim() || selectedImg

              // Collect dynamic category specs
              const updatedSpecs = { ...(product.specs || {}) }
              activeConfig.fields.forEach((f) => {
                if (form[f.key]) {
                  updatedSpecs[f.key] = form[f.key].value.trim()
                }
              })

              const updatedObj = {
                ...product,
                title: updatedTitle,
                category: cat,
                categoryLabel: activeConfig.label,
                image: updatedImage,
                stock: updatedStock,
                status: updatedStock === 0 ? 'out_of_stock' : updatedStock <= 4 ? 'low_stock' : 'in_stock',
                mrp: updatedMrp,
                retailPrice: updatedRetail,
                wholesalePrice: updatedWholesale,
                grade: updatedSpecs['Willow Grade'] || updatedSpecs['Construction'] || updatedSpecs['Fabric'] || updatedSpecs['Facing'] || product.grade,
                weight: updatedSpecs['Weight Range'] || updatedSpecs['Weight'] || updatedSpecs['Blade Size'] || product.weight,
                specs: updatedSpecs,
                highlights: form.highlights?.value || product.highlights,
              }

              onSave(updatedObj)
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
          >
            {/* Category Selector */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                PRODUCT CATEGORY *
              </label>
              <select
                name="category"
                value={cat}
                onChange={(e) => {
                  const newCat = e.target.value
                  setCat(newCat)
                  if (CATEGORY_SPECS_CONFIG[newCat] && selectedImg.startsWith('/market/')) {
                    setSelectedImg(CATEGORY_SPECS_CONFIG[newCat].defaultImg)
                  }
                }}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 8,
                  background: '#0f172a',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#00e676',
                  fontWeight: 800,
                  fontSize: 13,
                  boxSizing: 'border-box',
                }}
              >
                <option value="bats">🏏 English Willow Bats</option>
                <option value="balls">🔴 Leather Match Balls</option>
                <option value="pads">🛡️ Batting Pads</option>
                <option value="gloves">🧤 Batting Gloves</option>
                <option value="helmets">🪖 Pro Helmets</option>
                <option value="jerseys">👕 Custom Team Jerseys</option>
                <option value="kitbags">🎒 Kit Bags & Luggage</option>
              </select>
            </div>

            {/* Product Image Changing Section (Requested by User) */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                padding: '12px',
                borderRadius: 10,
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: '#f8fafc', textTransform: 'uppercase' }}>
                  CHANGE PRODUCT IMAGE *
                </label>
                <span style={{ fontSize: 10, color: '#38bdf8' }}>Click preset or paste URL below</span>
              </div>

              {/* Image Preview + Preset Chips */}
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
                <div
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: 10,
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1.5px solid #00e676',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 4,
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={selectedImg}
                    alt="Current Image"
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="image-preset-grid">
                    {PRESET_GEAR_IMAGES.map((imgItem) => (
                      <button
                        key={imgItem.id}
                        type="button"
                        onClick={() => setSelectedImg(imgItem.url)}
                        className={`image-preset-btn ${selectedImg === imgItem.url ? 'is-selected' : ''}`}
                      >
                        <img src={imgItem.url} alt={imgItem.label} />
                        <span style={{ fontSize: 9, color: '#94a3b8', whiteSpace: 'nowrap' }}>{imgItem.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* URL Field */}
              <input
                name="image"
                value={selectedImg}
                onChange={(e) => setSelectedImg(e.target.value)}
                placeholder="Or paste external image URL (https://... or /market/...)"
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: 8,
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#38bdf8',
                  fontSize: 11,
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Product Title */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                PRODUCT TITLE
              </label>
              <input
                name="title"
                defaultValue={product.title}
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

            {/* Stock Units */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  STOCK UNITS
                </label>
                <input
                  name="stock"
                  type="number"
                  min="0"
                  defaultValue={product.stock}
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
                  defaultValue={product.minWholesaleQty || 5}
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

            {/* Pricing Section with Strikethrough Actual MRP and Discount */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                padding: '12px',
                borderRadius: 10,
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#f8fafc' }}>PRICING & DISCOUNT STRUCTURE</span>
                {discountPct > 0 && (
                  <span className="price-discount-badge">{discountPct}% OFF FOR CUSTOMERS</span>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    ACTUAL MRP (₹, STRIKETHROUGH) *
                  </label>
                  <input
                    name="mrp"
                    type="number"
                    min="100"
                    required
                    value={mrpVal}
                    onChange={(e) => setMrpVal(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#94a3b8',
                      textDecoration: 'line-through',
                      fontWeight: 800,
                      fontSize: 13,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    DISCOUNTED PRICE (₹) *
                  </label>
                  <input
                    name="retailPrice"
                    type="number"
                    min="100"
                    required
                    value={sellingPriceVal}
                    onChange={(e) => setSellingPriceVal(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#00e676',
                      fontWeight: 900,
                      fontSize: 13,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    WHOLESALE RATE (₹, 5+)
                  </label>
                  <input
                    name="wholesalePrice"
                    type="number"
                    min="100"
                    defaultValue={product.wholesalePrice}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#38bdf8',
                      fontWeight: 900,
                      fontSize: 13,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              {/* Customer Display Live Badge Preview */}
              <div style={{ marginTop: 8, fontSize: 11, color: 'var(--muted)' }}>
                Customer View: <span className="price-mrp-cut">₹{mrpVal.toLocaleString('en-IN')}</span>{' '}
                <strong style={{ color: '#00e676', fontSize: 13 }}>₹{sellingPriceVal.toLocaleString('en-IN')}</strong>{' '}
                {discountPct > 0 && (
                  <span style={{ color: '#38bdf8', fontWeight: 800 }}>
                    (Customer saves ₹{(mrpVal - sellingPriceVal).toLocaleString('en-IN')})
                  </span>
                )}
              </div>
            </div>

            {/* Dynamic Category Technical Specifications */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                padding: '12px',
                borderRadius: 10,
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#f8fafc' }}>
                  DYNAMIC TECHNICAL SPECIFICATIONS ({activeConfig.label.toUpperCase()})
                </span>
                <span style={{ fontSize: 10, color: 'var(--muted)' }}>Shown to customer on product page</span>
              </div>

              <div className="dynamic-spec-grid">
                {activeConfig.fields.map((f) => {
                  const currentVal = product.specs?.[f.key] || f.default

                  return (
                    <div key={f.key}>
                      <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                        {f.label.toUpperCase()}
                      </label>
                      <input
                        name={f.key}
                        defaultValue={currentVal}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: 8,
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#f8fafc',
                          fontSize: 12,
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Highlights */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                KEY EQUIPMENT HIGHLIGHTS
              </label>
              <textarea
                name="highlights"
                rows={2}
                defaultValue={product.highlights || 'Selected Grade 1 materials, calibrated balance, high-density impact absorption.'}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: 8,
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#cbd5e1',
                  fontSize: 12,
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
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
                }}
              >
                ✓ Save Updated Specifications
              </button>
              <button
                type="button"
                onClick={onClose}
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
