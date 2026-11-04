import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
  CheckCircle2,
  FileText,
  Download,
  Phone,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Settings,
  Sun,
  Moon,
  Plus,
  QrCode,
  X,
  AlertTriangle,
  ArrowUpRight,
  Printer,
  Share2,
  Check,
  Building,
} from 'lucide-react'
import Screen from '../components/Screen'

export default function GroundSlotBooking() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  // Tab: 'slots' | 'staff' | 'accounts'
  const tabParam = searchParams.get('tab')
  const modeParam = searchParams.get('mode')
  const sysParam = Number(searchParams.get('sys'))

  // Resolve active tab from URL params cleanly
  const resolveInitialTab = () => {
    if (tabParam === 'staff' || modeParam === 'stadium' && (sysParam === 2 || sysParam === 3 || sysParam === 4)) return 'staff'
    if (tabParam === 'accounts' || modeParam === 'stadium' && (sysParam === 5 || sysParam === 6 || sysParam === 7 || sysParam === 10)) return 'accounts'
    return 'slots'
  }

  const [activeTab, setActiveTab] = useState(resolveInitialTab)
  const [toastMsg, setToastMsg] = useState('')

  useEffect(() => {
    const t = searchParams.get('tab')
    const m = searchParams.get('mode')
    const s = Number(searchParams.get('sys'))
    if (t === 'slots' || t === 'staff' || t === 'accounts') {
      setActiveTab(t)
    } else if (m === 'stadium' && (s === 2 || s === 3 || s === 4)) {
      setActiveTab('staff')
    } else if (m === 'stadium' && (s === 5 || s === 6 || s === 7 || s === 10)) {
      setActiveTab('accounts')
    } else if (m === 'slots') {
      setActiveTab('slots')
    }
  }, [searchParams])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSearchParams({ tab })
  }

  const triggerToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 3000)
  }

  // =========================================================================
  // 1. VENUES / PITCHES MASTER STATE
  // =========================================================================
  const venues = [
    {
      id: 'p1',
      name: 'Main Stadium Oval',
      pitchType: 'Red Soil International Wicket',
      capacity: '50,000 Seats',
      lights: true,
      standardRate: 4500,
      icon: '🏟️',
      description: 'Championship turf with 4 high-mast floodlights & digital LED perimeter',
    },
    {
      id: 'p2',
      name: 'Practice Turf 2',
      pitchType: 'Black Soil Grass Pitch',
      capacity: 'Open Pavilion (500)',
      lights: false,
      standardRate: 3000,
      icon: '🌱',
      description: 'Natural bounce grass wicket for 25-over practice & tournament friendlies',
    },
    {
      id: 'p3',
      name: 'Astroturf Box Arena',
      pitchType: 'Covered High-Density Astroturf',
      capacity: 'Gallery (200)',
      lights: true,
      standardRate: 2500,
      icon: '🥅',
      description: 'Enclosed cage box cricket with super-bright floodlights & netting',
    },
    {
      id: 'p4',
      name: 'Nets Arena (Pitches A & B)',
      pitchType: 'Twin Practice Turf Nets',
      capacity: 'Squad Nets',
      lights: true,
      standardRate: 1500,
      icon: '🏏',
      description: 'Dedicated bowling machine lane & two professional coaching nets',
    },
  ]

  const [selectedPitchId, setSelectedPitchId] = useState('p1')
  const activePitch = venues.find((v) => v.id === selectedPitchId) || venues[0]

  // Selected Day Picker (July 2026)
  const [selectedDay, setSelectedDay] = useState(12)

  // =========================================================================
  // 2. SLOTS STATE (Includes booked customer details, timings, tariff)
  // =========================================================================
  const [slots, setSlots] = useState([
    {
      id: 's1',
      pitchId: 'p1',
      day: 12,
      time: '06:00 AM - 09:00 AM',
      title: 'Morning Practice Match',
      teamA: 'Scoring Heroes Academy',
      teamB: 'Marina Strikers',
      matchType: '25-Over Practice Match',
      customerName: 'Dev Anand',
      customerPhone: '+91 98765 43210',
      status: 'booked',
      price: 4500,
      paid: true,
      paymentMode: 'UPI QR',
      floodlight: false,
    },
    {
      id: 's2',
      pitchId: 'p1',
      day: 12,
      time: '09:30 AM - 12:30 PM',
      title: 'Corporate League Trophy',
      teamA: 'Coastal Kings XI',
      teamB: 'City Tigers Club',
      matchType: 'Corporate T20 Trophy',
      customerName: 'Rajesh Kumar',
      customerPhone: '+91 98409 98877',
      status: 'booked',
      price: 5000,
      paid: true,
      paymentMode: 'UPI QR',
      floodlight: false,
    },
    {
      id: 's3',
      pitchId: 'p1',
      day: 12,
      time: '01:00 PM - 04:00 PM',
      title: 'Pitch Maintenance & Roller Work',
      teamA: 'Curator Crew',
      teamB: 'Heavy Roller Service',
      matchType: 'Curator Maintenance',
      customerName: 'Murugan S. (Head Curator)',
      customerPhone: '+91 98401 23456',
      status: 'maintenance',
      price: 0,
      paid: false,
      paymentMode: '-',
      floodlight: false,
    },
    {
      id: 's4',
      pitchId: 'p1',
      day: 12,
      time: '04:30 PM - 07:30 PM',
      title: 'Evening Sunset Match',
      teamA: '',
      teamB: '',
      matchType: 'T20 Match Slot',
      customerName: '',
      customerPhone: '',
      status: 'available',
      price: 4500,
      paid: false,
      paymentMode: '',
      floodlight: false,
    },
    {
      id: 's5',
      pitchId: 'p1',
      day: 12,
      time: '08:00 PM - 11:30 PM',
      title: 'Prime Night Floodlight T20',
      teamA: 'Velocity Super Strikers',
      teamB: 'Bay Thunderbolts',
      matchType: 'Floodlit Championship Cup',
      customerName: 'Sunil Manohar',
      customerPhone: '+91 97890 12345',
      status: 'booked',
      price: 6500,
      paid: true,
      paymentMode: 'Bank Transfer (NEFT)',
      floodlight: true,
    },
    // Practice Turf 2 Slots
    {
      id: 's6',
      pitchId: 'p2',
      day: 12,
      time: '07:00 AM - 10:00 AM',
      title: 'Club Division 3 League',
      teamA: 'Royals Cricket Club',
      teamB: 'Spartans XI',
      matchType: 'TNCA League Fixture',
      customerName: 'Karthik Subbaraj',
      customerPhone: '+91 98412 34567',
      status: 'booked',
      price: 3000,
      paid: true,
      paymentMode: 'Cash on Ground',
      floodlight: false,
    },
    {
      id: 's7',
      pitchId: 'p2',
      day: 12,
      time: '10:30 AM - 01:30 PM',
      title: 'Morning Turf Session',
      teamA: '',
      teamB: '',
      matchType: 'Turf Match Slot',
      customerName: '',
      customerPhone: '',
      status: 'available',
      price: 3000,
      paid: false,
      paymentMode: '',
      floodlight: false,
    },
    {
      id: 's8',
      pitchId: 'p2',
      day: 12,
      time: '03:00 PM - 06:00 PM',
      title: 'Afternoon Turf Match',
      teamA: '',
      teamB: '',
      matchType: 'Turf Match Slot',
      customerName: '',
      customerPhone: '',
      status: 'available',
      price: 3000,
      paid: false,
      paymentMode: '',
      floodlight: false,
    },
    // Astroturf Box Arena Slots
    {
      id: 's9',
      pitchId: 'p3',
      day: 12,
      time: '06:00 PM - 08:00 PM',
      title: 'Tech Box 8s Challenge',
      teamA: 'Tech Titans Box XI',
      teamB: 'Marina Velocity Box',
      matchType: 'Box Cricket Tournament',
      customerName: 'Gautam Siddharth',
      customerPhone: '+91 98407 76655',
      status: 'booked',
      price: 2500,
      paid: true,
      paymentMode: 'UPI QR',
      floodlight: true,
    },
    {
      id: 's10',
      pitchId: 'p3',
      day: 12,
      time: '08:00 PM - 10:00 PM',
      title: 'Night Box Cricket Slot',
      teamA: '',
      teamB: '',
      matchType: 'Box Cricket Slot',
      customerName: '',
      customerPhone: '',
      status: 'available',
      price: 2500,
      paid: false,
      paymentMode: '',
      floodlight: true,
    },
    // Nets Arena Slots
    {
      id: 's11',
      pitchId: 'p4',
      day: 12,
      time: '06:00 AM - 08:00 AM',
      title: 'Bowling Machine Net Practice',
      teamA: 'Pace Bowling Academy',
      teamB: 'Batting Clinic',
      matchType: 'Automated Net Session',
      customerName: 'Coach Ramanathan',
      customerPhone: '+91 98840 11223',
      status: 'booked',
      price: 1500,
      paid: true,
      paymentMode: 'UPI QR',
      floodlight: false,
    },
    {
      id: 's12',
      pitchId: 'p4',
      day: 12,
      time: '04:00 PM - 06:00 PM',
      title: 'Evening Nets Session',
      teamA: '',
      teamB: '',
      matchType: 'Net Practice',
      customerName: '',
      customerPhone: '',
      status: 'available',
      price: 1500,
      paid: false,
      paymentMode: '',
      floodlight: false,
    },
  ])

  // =========================================================================
  // 3. STAFF OPS STATE (Roster, Attendance, Payroll Reminders)
  // =========================================================================
  const [staffList, setStaffList] = useState([
    {
      id: 1,
      name: 'Murugan S.',
      role: 'Head Pitch Curator',
      phone: '+91 98401 23456',
      zone: 'Main Stadium Oval & Pitch Square',
      shift: 'Morning (05:30 AM - 02:00 PM)',
      salary: 28000,
      attendance: 'present', // 'present' | 'late' | 'absent' | 'half'
      salaryStatus: 'Paid for Oct',
      lastTxnId: 'SHP-9021',
      isDue: false,
    },
    {
      id: 2,
      name: 'Rajesh K.',
      role: 'Ground Superintendent & Facility Manager',
      phone: '+91 98402 34567',
      zone: 'All Grounds & Net Arena',
      shift: 'Full Day (07:00 AM - 05:00 PM)',
      salary: 32000,
      attendance: 'present',
      salaryStatus: 'Paid for Oct',
      lastTxnId: 'SHP-9022',
      isDue: false,
    },
    {
      id: 3,
      name: 'Sundar V.',
      role: 'Chief Electrician & Floodlight Operator',
      phone: '+91 98403 45678',
      zone: '4 High-Mast Towers & Generator House',
      shift: 'Evening & Night (03:00 PM - 11:30 PM)',
      salary: 22000,
      attendance: 'present',
      salaryStatus: 'Paid for Oct',
      lastTxnId: 'SHP-9023',
      isDue: false,
    },
    {
      id: 4,
      name: 'Karthik R.',
      role: 'Pitch Watering & Net Caretaker',
      phone: '+91 98404 56789',
      zone: 'Practice Turf 2 & Nets A, B',
      shift: 'Morning (06:00 AM - 03:00 PM)',
      salary: 18000,
      attendance: 'present',
      salaryStatus: 'Pending (₹18,000 Due)',
      lastTxnId: '',
      isDue: true,
    },
    {
      id: 5,
      name: 'Babu P.',
      role: 'Security Supervisor & Turnstile Marshal',
      phone: '+91 98405 67890',
      zone: 'Gate 1 & 2 Stadium Turnstiles',
      shift: '12-Hour Night Shift (07:00 PM - 07:00 AM)',
      salary: 20000,
      attendance: 'present',
      salaryStatus: 'Paid for Oct',
      lastTxnId: 'SHP-9024',
      isDue: false,
    },
  ])

  // Attendance toggling
  const setStaffAttendance = (id, status) => {
    setStaffList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, attendance: status } : s))
    )
    triggerToast(`Attendance updated for staff member!`)
  }

  // Mark all present
  const markAllStaffPresent = () => {
    setStaffList((prev) => prev.map((s) => ({ ...s, attendance: 'present' })))
    triggerToast('All 5 staff members marked PRESENT for today!')
  }

  // Disburse single salary
  const disburseSalary = (staff) => {
    setStaffList((prev) =>
      prev.map((s) =>
        s.id === staff.id
          ? {
              ...s,
              salaryStatus: 'Paid (Just Disbursed)',
              lastTxnId: `SHP-${Math.floor(1000 + Math.random() * 9000)}`,
              isDue: false,
            }
          : s
      )
    )

    // Add debit to ledger
    setTransactions((prev) => [
      {
        id: `t-${Date.now()}`,
        date: '04 Nov 2026',
        desc: `Staff Salary Disbursed: ${staff.name} (${staff.role})`,
        category: 'Staff Payroll',
        type: 'debit',
        amount: staff.salary,
        mode: 'Direct Bank NEFT',
        ref: `SAL-${Date.now().toString().slice(-5)}`,
      },
      ...prev,
    ])

    triggerToast(`₹${staff.salary.toLocaleString()} disbursed to ${staff.name}! Recorded in Accounts ledger.`)
  }

  // Disburse all pending salaries
  const disburseAllPending = () => {
    const pendingStaff = staffList.filter((s) => s.isDue)
    if (pendingStaff.length === 0) {
      triggerToast('All staff salaries are already up to date!')
      return
    }

    pendingStaff.forEach((s) => disburseSalary(s))
    triggerToast(`Disbursed all pending staff salaries successfully!`)
  }

  // =========================================================================
  // 4. FINANCIAL ACCOUNTS & PROFIT/LOSS STATE
  // =========================================================================
  const [transactions, setTransactions] = useState([
    {
      id: 't1',
      date: '04 Nov 2026',
      desc: 'Slot Booking: Coastal Kings vs City Tigers',
      category: 'Slot Revenue',
      type: 'credit',
      amount: 5000,
      mode: 'UPI QR',
      ref: 'TXN-90214',
    },
    {
      id: 't2',
      date: '03 Nov 2026',
      desc: 'Floodlight Prime Night Match: Velocity Super Strikers',
      category: 'Slot Revenue',
      type: 'credit',
      amount: 6500,
      mode: 'NEFT Transfer',
      ref: 'TXN-90211',
    },
    {
      id: 't3',
      date: '02 Nov 2026',
      desc: 'TNCA District Championship Ground Lease (Day 1 of 3)',
      category: 'Tournament Lease',
      type: 'credit',
      amount: 45000,
      mode: 'Bank Transfer',
      ref: 'TXN-89842',
    },
    {
      id: 't4',
      date: '01 Nov 2026',
      desc: 'Boundary LED Billboard Advertising (30-Day Contract)',
      category: 'Perimeter Ads',
      type: 'credit',
      amount: 50000,
      mode: 'Corporate Cheque',
      ref: 'TXN-89720',
    },
    {
      id: 't5',
      date: '01 Nov 2026',
      desc: 'Staff Salary Disbursal: Rajesh K. (Ground Superintendent)',
      category: 'Staff Payroll',
      type: 'debit',
      amount: 32000,
      mode: 'Bank NEFT',
      ref: 'SAL-9022',
    },
    {
      id: 't6',
      date: '01 Nov 2026',
      desc: 'Staff Salary Disbursal: Murugan S. (Head Curator)',
      category: 'Staff Payroll',
      type: 'debit',
      amount: 28000,
      mode: 'Bank NEFT',
      ref: 'SAL-9021',
    },
    {
      id: 't7',
      date: '30 Oct 2026',
      desc: 'High-Mast Floodlight Electricity Utility Bill (Oct)',
      category: 'Electricity & Utilities',
      type: 'debit',
      amount: 34000,
      mode: 'Online EB Portal',
      ref: 'UTIL-7741',
    },
    {
      id: 't8',
      date: '28 Oct 2026',
      desc: 'Pitch Clay & Red Soil Truck Delivery (25 Metric Tons)',
      category: 'Pitch Maintenance',
      type: 'debit',
      amount: 16000,
      mode: 'Bank Transfer',
      ref: 'SOIL-4412',
    },
    {
      id: 't9',
      date: '27 Oct 2026',
      desc: 'Heavy Roller & Lawn Mower High-Speed Diesel Fuel (100L)',
      category: 'Diesel & Machinery',
      type: 'debit',
      amount: 10000,
      mode: 'Fuel Card / Cash',
      ref: 'FUEL-1902',
    },
  ])

  // Calculate dynamic P&L
  const totalInflow = transactions
    .filter((t) => t.type === 'credit')
    .reduce((acc, t) => acc + t.amount, 0)

  const totalOutflow = transactions
    .filter((t) => t.type === 'debit')
    .reduce((acc, t) => acc + t.amount, 0)

  const netProfit = totalInflow - totalOutflow
  const profitMargin = totalInflow > 0 ? ((netProfit / totalInflow) * 100).toFixed(1) : 0

  // =========================================================================
  // 5. MODAL STATES
  // =========================================================================
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showGatePassModal, setShowGatePassModal] = useState(null)
  const [showAddStaffModal, setShowAddStaffModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [showStatementModal, setShowStatementModal] = useState(false)

  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    pitchId: 'p1',
    day: 12,
    startTime: '06:00 AM',
    endTime: '09:00 AM',
    customerName: '',
    customerPhone: '',
    teamA: '',
    teamB: '',
    matchType: 'T20 Match Challenge',
    floodlight: false,
    price: 4500,
    paymentMode: 'UPI QR',
  })

  // Staff Form State
  const [staffForm, setStaffForm] = useState({
    name: '',
    role: 'Assistant Pitch Curator',
    phone: '',
    zone: 'Main Stadium Oval',
    shift: 'Morning (06:00 AM - 02:00 PM)',
    salary: 20000,
  })

  // Expense Form State
  const [expenseForm, setExpenseForm] = useState({
    category: 'Pitch Maintenance',
    desc: '',
    amount: '',
    mode: 'UPI / Online',
  })

  // Handle slot reservation
  const handleCreateBooking = (e) => {
    e.preventDefault()
    if (!bookingForm.customerName || !bookingForm.customerPhone) {
      alert('Please enter customer name and phone number!')
      return
    }

    const newSlot = {
      id: `s-${Date.now()}`,
      pitchId: bookingForm.pitchId,
      day: Number(bookingForm.day),
      time: `${bookingForm.startTime} - ${bookingForm.endTime}`,
      title: `${bookingForm.teamA || 'Match'} vs ${bookingForm.teamB || 'Opponent'}`,
      teamA: bookingForm.teamA || 'Team Alpha',
      teamB: bookingForm.teamB || 'Team Beta',
      matchType: bookingForm.matchType,
      customerName: bookingForm.customerName,
      customerPhone: bookingForm.customerPhone,
      status: 'booked',
      price: Number(bookingForm.price),
      paid: true,
      paymentMode: bookingForm.paymentMode,
      floodlight: bookingForm.floodlight,
    }

    // Add to slot list
    setSlots((prev) => [newSlot, ...prev])

    // Record credit in Accounts
    setTransactions((prev) => [
      {
        id: `t-${Date.now()}`,
        date: `${bookingForm.day} Jul 2026`,
        desc: `Slot Booking: ${newSlot.title} (${newSlot.time})`,
        category: 'Slot Revenue',
        type: 'credit',
        amount: Number(bookingForm.price),
        mode: bookingForm.paymentMode,
        ref: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      },
      ...prev,
    ])

    setShowBookingModal(false)
    setShowGatePassModal(newSlot)
    triggerToast(`Slot booked successfully for ${bookingForm.customerName}!`)
  }

  // Handle Add Staff
  const handleCreateStaff = (e) => {
    e.preventDefault()
    if (!staffForm.name || !staffForm.phone) {
      alert('Please enter staff name and phone number!')
      return
    }

    const newMember = {
      id: Date.now(),
      name: staffForm.name,
      role: staffForm.role,
      phone: staffForm.phone,
      zone: staffForm.zone,
      shift: staffForm.shift,
      salary: Number(staffForm.salary) || 20000,
      attendance: 'present',
      salaryStatus: 'Pending (New Joining)',
      lastTxnId: '',
      isDue: true,
    }

    setStaffList((prev) => [...prev, newMember])
    setShowAddStaffModal(false)
    setStaffForm({
      name: '',
      role: 'Assistant Pitch Curator',
      phone: '',
      zone: 'Main Stadium Oval',
      shift: 'Morning (06:00 AM - 02:00 PM)',
      salary: 20000,
    })
    triggerToast(`Added ${newMember.name} to ground staff roster!`)
  }

  // Handle Add Expense
  const handleCreateExpense = (e) => {
    e.preventDefault()
    if (!expenseForm.desc || !expenseForm.amount) {
      alert('Please enter description and amount!')
      return
    }

    const newExp = {
      id: `t-${Date.now()}`,
      date: '04 Nov 2026',
      desc: expenseForm.desc,
      category: expenseForm.category,
      type: 'debit',
      amount: Number(expenseForm.amount),
      mode: expenseForm.mode,
      ref: `EXP-${Math.floor(1000 + Math.random() * 9000)}`,
    }

    setTransactions((prev) => [newExp, ...prev])
    setShowAddExpenseModal(false)
    setExpenseForm({
      category: 'Pitch Maintenance',
      desc: '',
      amount: '',
      mode: 'UPI / Online',
    })
    triggerToast(`Expense of ₹${newExp.amount.toLocaleString()} logged in Accounts!`)
  }

  // Filter slots for current venue and day
  const filteredSlots = slots.filter(
    (s) => s.pitchId === selectedPitchId && s.day === selectedDay
  )

  return (
    <Screen
      back
      title="Ground & Stadium Management"
      subtitle="Pitch Bookings, Staff Attendance & Financial Accounts"
    >
      <div style={{ paddingBottom: 80 }}>
        {/* Toast Alert */}
        {toastMsg && (
          <div
            style={{
              padding: '10px 14px',
              borderRadius: 10,
              background: 'rgba(0, 230, 118, 0.15)',
              border: '1px solid #00e676',
              color: '#00e676',
              fontSize: 13,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 12,
            }}
          >
            <CheckCircle2 size={18} />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* =========================================================================
            PRIMARY 3-PORTAL NAVIGATION TABS (Strictly Clean & Direct)
        ========================================================================= */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 6,
            background: 'rgba(15, 23, 42, 0.8)',
            padding: 4,
            borderRadius: 12,
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: 14,
          }}
        >
          <button
            type="button"
            onClick={() => handleTabChange('slots')}
            style={{
              padding: '10px 8px',
              borderRadius: 9,
              border: 'none',
              background: activeTab === 'slots' ? 'linear-gradient(135deg, #00b0ff, #0081cb)' : 'transparent',
              color: activeTab === 'slots' ? '#020617' : '#94a3b8',
              fontSize: 12,
              fontWeight: 900,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              transition: 'all 0.15s ease',
            }}
          >
            <Calendar size={15} />
            <span>Slots & Bookings</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('staff')}
            style={{
              padding: '10px 8px',
              borderRadius: 9,
              border: 'none',
              background: activeTab === 'staff' ? 'linear-gradient(135deg, #ffc83d, #e6a817)' : 'transparent',
              color: activeTab === 'staff' ? '#020617' : '#94a3b8',
              fontSize: 12,
              fontWeight: 900,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              transition: 'all 0.15s ease',
            }}
          >
            <Users size={15} />
            <span>Staff & Attendance</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('accounts')}
            style={{
              padding: '10px 8px',
              borderRadius: 9,
              border: 'none',
              background: activeTab === 'accounts' ? 'linear-gradient(135deg, #00e676, #00a854)' : 'transparent',
              color: activeTab === 'accounts' ? '#020617' : '#94a3b8',
              fontSize: 12,
              fontWeight: 900,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              transition: 'all 0.15s ease',
            }}
          >
            <DollarSign size={15} />
            <span>Accounts & P&L</span>
          </button>
        </div>

        {/* =========================================================================
            TAB 1: PITCH SLOTS & BOOKINGS (Real Venue Selection & Slot Management)
        ========================================================================= */}
        {activeTab === 'slots' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* 1. VENUE / PITCH SELECTOR FIRST */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                padding: '14px',
                borderRadius: 14,
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div>
                  <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Step 1: Select Venue / Pitch
                  </span>
                  <h3 style={{ fontSize: 16, fontWeight: 900, color: '#f8fafc', margin: '2px 0 0' }}>
                    {activePitch.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setBookingForm((prev) => ({
                      ...prev,
                      pitchId: selectedPitchId,
                      day: selectedDay,
                      price: activePitch.standardRate,
                    }))
                    setShowBookingModal(true)
                  }}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 10,
                    border: 'none',
                    background: 'linear-gradient(135deg, #00b0ff, #00e676)',
                    color: '#020617',
                    fontWeight: 900,
                    fontSize: 12,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <Plus size={16} /> + Book New Slot
                </button>
              </div>

              {/* 4 Venues Pills */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                {venues.map((v) => {
                  const isSel = selectedPitchId === v.id
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedPitchId(v.id)}
                      style={{
                        padding: '10px 12px',
                        borderRadius: 10,
                        border: isSel ? '1.5px solid #00b0ff' : '1px solid rgba(255, 255, 255, 0.08)',
                        background: isSel ? 'rgba(0, 176, 255, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                        color: '#f8fafc',
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 15 }}>{v.icon}</span>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 800,
                            color: isSel ? '#00b0ff' : '#94a3b8',
                          }}
                        >
                          ₹{v.standardRate.toLocaleString()}
                        </span>
                      </div>
                      <strong style={{ fontSize: 13, color: isSel ? '#38bdf8' : '#f8fafc' }}>{v.name}</strong>
                      <small style={{ fontSize: 10, color: 'var(--muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {v.pitchType}
                      </small>
                    </button>
                  )
                })}
              </div>

              {/* Venue Specs Strip */}
              <div
                style={{
                  marginTop: 10,
                  padding: '8px 12px',
                  background: 'rgba(0, 176, 255, 0.06)',
                  borderRadius: 8,
                  border: '1px dashed rgba(0, 176, 255, 0.25)',
                  fontSize: 11,
                  color: '#94a3b8',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 6,
                }}
              >
                <span>📍 <strong>Specs:</strong> {activePitch.description}</span>
                <span style={{ color: activePitch.lights ? '#00e676' : '#ffc83d', fontWeight: 800 }}>
                  {activePitch.lights ? '⚡ 4-Tower Floodlights Ready' : '☀️ Daylight Fixtures Only'}
                </span>
              </div>
            </div>

            {/* 2. DATE SELECTOR (JULY 2026) */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                padding: '12px 14px',
                borderRadius: 14,
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Calendar size={16} color="#38bdf8" />
                  <strong style={{ fontSize: 13, color: '#f8fafc' }}>July 2026 Match Schedule</strong>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: 6,
                    background: 'rgba(0, 230, 118, 0.15)',
                    color: '#00e676',
                  }}
                >
                  Selected Date: July {selectedDay}, 2026
                </span>
              </div>

              {/* Day Scroll Bar */}
              <div
                style={{
                  display: 'flex',
                  gap: 6,
                  overflowX: 'auto',
                  scrollbarWidth: 'none',
                  paddingBottom: 4,
                }}
              >
                {[10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((d) => {
                  const isSel = selectedDay === d
                  const daySlots = slots.filter((s) => s.pitchId === selectedPitchId && s.day === d)
                  const bookedCount = daySlots.filter((s) => s.status === 'booked').length

                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setSelectedDay(d)}
                      style={{
                        minWidth: 54,
                        padding: '8px 6px',
                        borderRadius: 10,
                        border: isSel ? '1.5px solid #00b0ff' : '1px solid rgba(255, 255, 255, 0.08)',
                        background: isSel ? 'linear-gradient(135deg, #00b0ff, #0284c7)' : 'rgba(255, 255, 255, 0.03)',
                        color: isSel ? '#020617' : '#f8fafc',
                        cursor: 'pointer',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <span style={{ fontSize: 10, fontWeight: 700, opacity: 0.8 }}>
                        {d === 12 ? 'TODAY' : `DAY`}
                      </span>
                      <strong style={{ fontSize: 16, fontWeight: 900 }}>{d}</strong>
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 800,
                          color: isSel ? '#020617' : bookedCount > 0 ? '#00e676' : '#94a3b8',
                        }}
                      >
                        {bookedCount > 0 ? `${bookedCount} Booked` : 'Open'}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 3. SLOTS ROSTER FOR SELECTED VENUE & DATE */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 900, color: '#f8fafc', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Available & Booked Slots ({filteredSlots.length})
                </span>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>
                  {activePitch.name} • July {selectedDay}
                </span>
              </div>

              {filteredSlots.length === 0 ? (
                <div
                  style={{
                    padding: 30,
                    textAlign: 'center',
                    background: 'rgba(15, 23, 42, 0.6)',
                    borderRadius: 14,
                    border: '1px dashed rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <p style={{ color: 'var(--muted)', margin: '0 0 12px' }}>
                    No slots scheduled on this date for {activePitch.name}.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setBookingForm((prev) => ({
                        ...prev,
                        pitchId: selectedPitchId,
                        day: selectedDay,
                        price: activePitch.standardRate,
                      }))
                      setShowBookingModal(true)
                    }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 10,
                      background: '#00b0ff',
                      color: '#020617',
                      fontWeight: 900,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    + Book First Slot For This Day
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {filteredSlots.map((slot) => {
                    const isBooked = slot.status === 'booked'
                    const isMaint = slot.status === 'maintenance'

                    return (
                      <div
                        key={slot.id}
                        style={{
                          padding: '14px',
                          borderRadius: 14,
                          background: isBooked
                            ? 'rgba(15, 23, 42, 0.85)'
                            : isMaint
                            ? 'rgba(255, 200, 61, 0.06)'
                            : 'rgba(0, 230, 118, 0.05)',
                          border: isBooked
                            ? '1px solid rgba(255, 59, 80, 0.35)'
                            : isMaint
                            ? '1px solid rgba(255, 200, 61, 0.35)'
                            : '1px solid rgba(0, 230, 118, 0.3)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 10,
                        }}
                      >
                        {/* Top Timing & Status Row */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div
                              style={{
                                padding: '4px 8px',
                                borderRadius: 6,
                                background: 'rgba(255, 255, 255, 0.08)',
                                color: '#f8fafc',
                                fontSize: 12,
                                fontWeight: 900,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4,
                              }}
                            >
                              <Clock size={14} color="#38bdf8" />
                              <span>{slot.time}</span>
                            </div>

                            {slot.floodlight && (
                              <span
                                style={{
                                  fontSize: 10,
                                  fontWeight: 800,
                                  color: '#ffc83d',
                                  background: 'rgba(255, 200, 61, 0.15)',
                                  padding: '2px 6px',
                                  borderRadius: 4,
                                }}
                              >
                                ⚡ FLOODLIGHTS
                              </span>
                            )}
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: 14, fontWeight: 900, color: '#f8fafc' }}>
                              ₹{slot.price.toLocaleString()}
                            </span>
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 900,
                                padding: '3px 8px',
                                borderRadius: 6,
                                textTransform: 'uppercase',
                                background: isBooked
                                  ? 'rgba(255, 59, 80, 0.2)'
                                  : isMaint
                                  ? 'rgba(255, 200, 61, 0.2)'
                                  : 'rgba(0, 230, 118, 0.2)',
                                color: isBooked ? '#ff3b50' : isMaint ? '#ffc83d' : '#00e676',
                                border: isBooked
                                  ? '1px solid #ff3b50'
                                  : isMaint
                                  ? '1px solid #ffc83d'
                                  : '1px solid #00e676',
                              }}
                            >
                              {slot.status}
                            </span>
                          </div>
                        </div>

                        {/* Customer & Match Details when BOOKED */}
                        {isBooked && (
                          <div
                            style={{
                              padding: '10px 12px',
                              borderRadius: 10,
                              background: 'rgba(255, 255, 255, 0.03)',
                              border: '1px solid rgba(255, 255, 255, 0.06)',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 6,
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div>
                                <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>Booked By:</span>
                                <strong style={{ fontSize: 13, color: '#f8fafc', marginLeft: 6 }}>
                                  {slot.customerName}
                                </strong>
                              </div>
                              <span style={{ fontSize: 11, color: '#38bdf8', fontWeight: 700 }}>
                                {slot.customerPhone}
                              </span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
                              <div style={{ fontSize: 12, color: '#f8fafc' }}>
                                🏏 <strong>{slot.teamA}</strong> vs <strong>{slot.teamB}</strong>
                              </div>
                              <span style={{ fontSize: 10, color: 'var(--muted)', background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: 4 }}>
                                {slot.matchType}
                              </span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                              <span>Payment: <strong style={{ color: '#00e676' }}>{slot.paymentMode} (Paid)</strong></span>
                              <span>Venue: {activePitch.name}</span>
                            </div>
                          </div>
                        )}

                        {/* When MAINTENANCE */}
                        {isMaint && (
                          <div style={{ fontSize: 12, color: '#ffc83d', padding: '6px 10px', background: 'rgba(255, 200, 61, 0.08)', borderRadius: 8 }}>
                            ⚙️ <strong>Curator Note:</strong> Pitch rolling, moisture replenishment & boundary marking scheduled.
                          </div>
                        )}

                        {/* When AVAILABLE */}
                        {!isBooked && !isMaint && (
                          <div style={{ fontSize: 12, color: '#94a3b8' }}>
                            ✅ Available for reservation by tournament organizers, clubs, or walk-in teams.
                          </div>
                        )}

                        {/* Action Buttons Row */}
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 2 }}>
                          {isBooked && (
                            <>
                              <a
                                href={`tel:${slot.customerPhone}`}
                                style={{
                                  padding: '7px 12px',
                                  borderRadius: 8,
                                  background: 'rgba(0, 176, 255, 0.15)',
                                  border: '1px solid rgba(0, 176, 255, 0.3)',
                                  color: '#00b0ff',
                                  fontSize: 11,
                                  fontWeight: 800,
                                  textDecoration: 'none',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 5,
                                }}
                              >
                                <Phone size={13} /> Call Customer
                              </a>

                              <button
                                type="button"
                                onClick={() => setShowGatePassModal(slot)}
                                style={{
                                  padding: '7px 12px',
                                  borderRadius: 8,
                                  background: 'linear-gradient(135deg, #00e676, #00b0ff)',
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
                                <QrCode size={13} /> View Gate Pass
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Cancel booking for ${slot.customerName}?`)) {
                                    setSlots((prev) =>
                                      prev.map((s) =>
                                        s.id === slot.id
                                          ? {
                                              ...s,
                                              status: 'available',
                                              customerName: '',
                                              customerPhone: '',
                                              teamA: '',
                                              teamB: '',
                                              paid: false,
                                            }
                                          : s
                                      )
                                    )
                                    triggerToast('Booking cancelled & slot reopened.')
                                  }
                                }}
                                style={{
                                  padding: '7px 10px',
                                  borderRadius: 8,
                                  background: 'rgba(255, 59, 80, 0.12)',
                                  border: '1px solid rgba(255, 59, 80, 0.3)',
                                  color: '#ff3b50',
                                  fontSize: 11,
                                  fontWeight: 800,
                                  cursor: 'pointer',
                                }}
                              >
                                Cancel
                              </button>
                            </>
                          )}

                          {!isBooked && !isMaint && (
                            <button
                              type="button"
                              onClick={() => {
                                setBookingForm((prev) => ({
                                  ...prev,
                                  pitchId: slot.pitchId,
                                  day: slot.day,
                                  startTime: slot.time.split(' - ')[0],
                                  endTime: slot.time.split(' - ')[1],
                                  price: slot.price,
                                }))
                                setShowBookingModal(true)
                              }}
                              style={{
                                padding: '8px 14px',
                                borderRadius: 8,
                                background: '#00e676',
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
                              <Plus size={14} /> Book This Slot
                            </button>
                          )}

                          {isMaint && (
                            <button
                              type="button"
                              onClick={() => {
                                setSlots((prev) =>
                                  prev.map((s) => (s.id === slot.id ? { ...s, status: 'available' } : s))
                                )
                                triggerToast('Pitch marked READY & available for booking!')
                              }}
                              style={{
                                padding: '8px 14px',
                                borderRadius: 8,
                                background: '#ffc83d',
                                border: 'none',
                                color: '#020617',
                                fontSize: 11,
                                fontWeight: 900,
                                cursor: 'pointer',
                              }}
                            >
                              ✓ Mark Pitch Ready
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: STAFF OPS & ATTENDANCE (Real Roster, Shifts, Pay & Reminders)
        ========================================================================= */}
        {activeTab === 'staff' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Staff Attendance Summary & Quick Action */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                padding: '14px',
                borderRadius: 14,
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Daily Attendance Tracker
                  </span>
                  <h3 style={{ fontSize: 16, fontWeight: 900, color: '#f8fafc', margin: '2px 0 0' }}>
                    Today: Wednesday, 4 Nov 2026
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddStaffModal(true)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 10,
                    border: 'none',
                    background: 'linear-gradient(135deg, #ffc83d, #e6a817)',
                    color: '#020617',
                    fontWeight: 900,
                    fontSize: 12,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <Plus size={16} /> + Add New Staff
                </button>
              </div>

              {/* 3 Metric Summary Boxes */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 12 }}>
                <div style={{ padding: '10px', background: 'rgba(0, 230, 118, 0.08)', borderRadius: 10, border: '1px solid rgba(0, 230, 118, 0.25)', textAlign: 'center' }}>
                  <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>PRESENT TODAY</span>
                  <strong style={{ fontSize: 18, color: '#00e676', display: 'block', marginTop: 2 }}>
                    {staffList.filter((s) => s.attendance === 'present').length} / {staffList.length}
                  </strong>
                </div>

                <div style={{ padding: '10px', background: 'rgba(255, 200, 61, 0.08)', borderRadius: 10, border: '1px solid rgba(255, 200, 61, 0.25)', textAlign: 'center' }}>
                  <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>LATE / HALF</span>
                  <strong style={{ fontSize: 18, color: '#ffc83d', display: 'block', marginTop: 2 }}>
                    {staffList.filter((s) => s.attendance === 'late' || s.attendance === 'half').length}
                  </strong>
                </div>

                <div style={{ padding: '10px', background: 'rgba(255, 59, 80, 0.08)', borderRadius: 10, border: '1px solid rgba(255, 59, 80, 0.25)', textAlign: 'center' }}>
                  <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>ABSENT</span>
                  <strong style={{ fontSize: 18, color: '#ff3b50', display: 'block', marginTop: 2 }}>
                    {staffList.filter((s) => s.attendance === 'absent').length}
                  </strong>
                </div>
              </div>

              <button
                type="button"
                onClick={markAllStaffPresent}
                style={{
                  width: '100%',
                  padding: '9px',
                  borderRadius: 8,
                  background: 'rgba(0, 230, 118, 0.15)',
                  border: '1px solid rgba(0, 230, 118, 0.35)',
                  color: '#00e676',
                  fontWeight: 800,
                  fontSize: 12,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                <Check size={16} /> Mark All Present For Today
              </button>
            </div>

            {/* Payroll Due Reminder Card */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(255, 200, 61, 0.12), rgba(255, 59, 80, 0.06))',
                padding: '14px',
                borderRadius: 14,
                border: '1px solid rgba(255, 200, 61, 0.35)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 10,
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <AlertTriangle size={16} color="#ffc83d" />
                  <strong style={{ fontSize: 13, color: '#f8fafc' }}>
                    Monthly Payroll Due In 2 Days (Nov 5)
                  </strong>
                </div>
                <small style={{ color: '#94a3b8', fontSize: 11, display: 'block', marginTop: 2 }}>
                  1 Pending Disbursal: ₹18,000 (Karthik R. - Pitch Watering Attendant)
                </small>
              </div>

              <button
                type="button"
                onClick={disburseAllPending}
                style={{
                  padding: '8px 14px',
                  borderRadius: 10,
                  border: 'none',
                  background: '#ffc83d',
                  color: '#020617',
                  fontWeight: 900,
                  fontSize: 12,
                  cursor: 'pointer',
                }}
              >
                Disburse Pending (₹18,000)
              </button>
            </div>

            {/* Staff Roster Cards */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 900, color: '#f8fafc', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Staff Roster & Pay Ledger ({staffList.length})
                </span>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>Live Attendance</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {staffList.map((st) => (
                  <div
                    key={st.id}
                    style={{
                      padding: '14px',
                      borderRadius: 14,
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 10,
                    }}
                  >
                    {/* Name & Role Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h4 style={{ fontSize: 15, fontWeight: 900, color: '#f8fafc', margin: '0 0 2px' }}>
                          {st.name}
                        </h4>
                        <span style={{ fontSize: 12, color: '#38bdf8', fontWeight: 700 }}>
                          {st.role}
                        </span>
                        <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                          📍 {st.zone} • 🕒 {st.shift}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <strong style={{ fontSize: 14, color: '#f8fafc', display: 'block' }}>
                          ₹{st.salary.toLocaleString()}/mo
                        </strong>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 800,
                            color: st.isDue ? '#ffc83d' : '#00e676',
                          }}
                        >
                          {st.salaryStatus}
                        </span>
                      </div>
                    </div>

                    {/* Attendance Marking Buttons */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 10px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: 10,
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        flexWrap: 'wrap',
                        gap: 6,
                      }}
                    >
                      <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700 }}>
                        Mark Attendance:
                      </span>

                      <div style={{ display: 'flex', gap: 4 }}>
                        {[
                          { key: 'present', label: 'Present', color: '#00e676' },
                          { key: 'late', label: 'Late', color: '#ffc83d' },
                          { key: 'half', label: 'Half Day', color: '#38bdf8' },
                          { key: 'absent', label: 'Absent', color: '#ff3b50' },
                        ].map((btn) => {
                          const active = st.attendance === btn.key
                          return (
                            <button
                              key={btn.key}
                              type="button"
                              onClick={() => setStaffAttendance(st.id, btn.key)}
                              style={{
                                padding: '4px 8px',
                                borderRadius: 6,
                                border: active ? `1px solid ${btn.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                                background: active ? `${btn.color}25` : 'transparent',
                                color: active ? btn.color : '#94a3b8',
                                fontSize: 11,
                                fontWeight: 800,
                                cursor: 'pointer',
                              }}
                            >
                              {btn.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Direct Contact & Pay Buttons */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <a
                        href={`tel:${st.phone}`}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 8,
                          background: 'rgba(0, 176, 255, 0.12)',
                          border: '1px solid rgba(0, 176, 255, 0.25)',
                          color: '#00b0ff',
                          fontSize: 11,
                          fontWeight: 800,
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 5,
                        }}
                      >
                        <Phone size={13} /> {st.phone}
                      </a>

                      {st.isDue ? (
                        <button
                          type="button"
                          onClick={() => disburseSalary(st)}
                          style={{
                            padding: '6px 14px',
                            borderRadius: 8,
                            background: 'linear-gradient(135deg, #00e676, #00b0ff)',
                            border: 'none',
                            color: '#020617',
                            fontSize: 11,
                            fontWeight: 900,
                            cursor: 'pointer',
                          }}
                        >
                          💸 Pay ₹{st.salary.toLocaleString()} Now
                        </button>
                      ) : (
                        <span style={{ fontSize: 11, color: '#00e676', fontWeight: 700 }}>
                          ✓ Disbursed (Ref: {st.lastTxnId})
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: FINANCIAL ACCOUNTS & PROFIT/LOSS (Clear Formula, Ledger, Expenses)
        ========================================================================= */}
        {activeTab === 'accounts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* 1. TRANSPARENT P&L MATH & FORMULA CARD */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(0, 230, 118, 0.05))',
                padding: '16px',
                borderRadius: 14,
                border: '1px solid rgba(0, 230, 118, 0.3)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Stadium Financial Audit
                  </span>
                  <h3 style={{ fontSize: 17, fontWeight: 900, color: '#f8fafc', margin: '2px 0 0' }}>
                    Profit & Loss Calculation
                  </h3>
                </div>

                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    type="button"
                    onClick={() => setShowAddExpenseModal(true)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 10,
                      border: 'none',
                      background: 'rgba(255, 59, 80, 0.2)',
                      border: '1px solid #ff3b50',
                      color: '#ff3b50',
                      fontWeight: 800,
                      fontSize: 11,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <Plus size={14} /> + Record Expense
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowStatementModal(true)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 10,
                      border: 'none',
                      background: 'rgba(0, 176, 255, 0.15)',
                      border: '1px solid #00b0ff',
                      color: '#00b0ff',
                      fontWeight: 800,
                      fontSize: 11,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <Download size={14} /> Statement
                  </button>
                </div>
              </div>

              {/* Math Equation Formula Banner */}
              <div
                style={{
                  padding: '8px 12px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  borderRadius: 8,
                  marginBottom: 14,
                  fontSize: 11,
                  color: '#94a3b8',
                  fontFamily: 'monospace',
                }}
              >
                <strong>Formula:</strong> Net Profit = Ground Inflow (Bookings + Leases + Ads) − Operational Costs (Payroll + Power + Fuel + Soil)
              </div>

              {/* 3 Metric Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                <div style={{ padding: '12px 10px', background: 'rgba(0, 230, 118, 0.1)', borderRadius: 10, border: '1px solid rgba(0, 230, 118, 0.3)', textAlign: 'center' }}>
                  <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>TOTAL INFLOW</span>
                  <strong style={{ fontSize: 16, color: '#00e676', display: 'block', marginTop: 2 }}>
                    ₹{totalInflow.toLocaleString()}
                  </strong>
                  <small style={{ fontSize: 9, color: '#64748b' }}>Revenue Recorded</small>
                </div>

                <div style={{ padding: '12px 10px', background: 'rgba(255, 59, 80, 0.1)', borderRadius: 10, border: '1px solid rgba(255, 59, 80, 0.3)', textAlign: 'center' }}>
                  <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>TOTAL EXPENSES</span>
                  <strong style={{ fontSize: 16, color: '#ff3b50', display: 'block', marginTop: 2 }}>
                    ₹{totalOutflow.toLocaleString()}
                  </strong>
                  <small style={{ fontSize: 9, color: '#64748b' }}>Staff, Power, Soil</small>
                </div>

                <div style={{ padding: '12px 10px', background: 'rgba(0, 176, 255, 0.1)', borderRadius: 10, border: '1px solid rgba(0, 176, 255, 0.3)', textAlign: 'center' }}>
                  <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>NET PROFIT</span>
                  <strong style={{ fontSize: 16, color: netProfit >= 0 ? '#38bdf8' : '#ff3b50', display: 'block', marginTop: 2 }}>
                    {netProfit >= 0 ? `+₹${netProfit.toLocaleString()}` : `-₹${Math.abs(netProfit).toLocaleString()}`}
                  </strong>
                  <small style={{ fontSize: 9, color: '#00e676', fontWeight: 800 }}>
                    {profitMargin}% Margin
                  </small>
                </div>
              </div>
            </div>

            {/* Inflow vs Outflow Category Breakdown */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                padding: '14px',
                borderRadius: 14,
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <h4 style={{ fontSize: 13, fontWeight: 900, color: '#f8fafc', textTransform: 'uppercase', margin: '0 0 10px' }}>
                Operational Cost Breakdown
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                <div style={{ padding: '10px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                    <span style={{ color: 'var(--muted)' }}>Staff Salaries</span>
                    <strong style={{ color: '#ff3b50' }}>₹82,000</strong>
                  </div>
                  <div style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, marginTop: 6 }}>
                    <div style={{ width: '58%', height: '100%', background: '#ff3b50', borderRadius: 2 }} />
                  </div>
                </div>

                <div style={{ padding: '10px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                    <span style={{ color: 'var(--muted)' }}>Floodlight Electricity</span>
                    <strong style={{ color: '#ff3b50' }}>₹34,000</strong>
                  </div>
                  <div style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, marginTop: 6 }}>
                    <div style={{ width: '24%', height: '100%', background: '#ffc83d', borderRadius: 2 }} />
                  </div>
                </div>

                <div style={{ padding: '10px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                    <span style={{ color: 'var(--muted)' }}>Red Soil & Grass Seeds</span>
                    <strong style={{ color: '#ff3b50' }}>₹16,000</strong>
                  </div>
                  <div style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, marginTop: 6 }}>
                    <div style={{ width: '11%', height: '100%', background: '#00b0ff', borderRadius: 2 }} />
                  </div>
                </div>

                <div style={{ padding: '10px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                    <span style={{ color: 'var(--muted)' }}>Roller Diesel Fuel</span>
                    <strong style={{ color: '#ff3b50' }}>₹10,000</strong>
                  </div>
                  <div style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, marginTop: 6 }}>
                    <div style={{ width: '7%', height: '100%', background: '#e879f9', borderRadius: 2 }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Real Itemized Credit / Debit Ledger */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 900, color: '#f8fafc', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Itemized Transaction Ledger ({transactions.length})
                </span>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>Live Audit Trail</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {transactions.map((tx) => {
                  const isCredit = tx.type === 'credit'
                  return (
                    <div
                      key={tx.id}
                      style={{
                        padding: '12px 14px',
                        borderRadius: 12,
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 10,
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <strong style={{ fontSize: 13, color: '#f8fafc' }}>{tx.desc}</strong>
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                          <span>{tx.date}</span> • <span style={{ color: '#38bdf8' }}>{tx.category}</span> • <span>{tx.mode}</span> (Ref: {tx.ref})
                        </div>
                      </div>

                      <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <strong
                          style={{
                            fontSize: 15,
                            fontWeight: 900,
                            color: isCredit ? '#00e676' : '#ff3b50',
                          }}
                        >
                          {isCredit ? `+₹${tx.amount.toLocaleString()}` : `-₹${tx.amount.toLocaleString()}`}
                        </strong>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 800,
                            display: 'block',
                            color: isCredit ? '#00e676' : '#ff3b50',
                          }}
                        >
                          {isCredit ? 'INFLOW' : 'OUTFLOW'}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODAL 1: WALK-IN / NEW SLOT BOOKING FORM
        ========================================================================= */}
        {showBookingModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: 480,
                maxHeight: '90vh',
                overflowY: 'auto',
                background: '#0b1329',
                borderRadius: 16,
                border: '1px solid rgba(0, 176, 255, 0.4)',
                padding: 20,
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h3 style={{ fontSize: 17, fontWeight: 900, color: '#f8fafc', margin: 0 }}>
                  📅 Book Pitch Slot
                </h3>
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 18 }}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateBooking} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* 1. Select Venue */}
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' }}>
                    Venue / Pitch
                  </label>
                  <select
                    value={bookingForm.pitchId}
                    onChange={(e) => {
                      const sel = venues.find((v) => v.id === e.target.value)
                      setBookingForm((prev) => ({
                        ...prev,
                        pitchId: e.target.value,
                        price: sel ? sel.standardRate : prev.price,
                      }))
                    }}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#f8fafc',
                      fontSize: 13,
                      marginTop: 4,
                    }}
                  >
                    {venues.map((v) => (
                      <option key={v.id} value={v.id} style={{ background: '#0b1329', color: '#fff' }}>
                        {v.name} ({v.pitchType}) — ₹{v.standardRate.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Date & Timing */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Day (July)</label>
                    <input
                      type="number"
                      min="1"
                      max="31"
                      value={bookingForm.day}
                      onChange={(e) => setBookingForm({ ...bookingForm, day: Number(e.target.value) })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#f8fafc',
                        fontSize: 13,
                        marginTop: 4,
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Start Time</label>
                    <input
                      type="text"
                      value={bookingForm.startTime}
                      onChange={(e) => setBookingForm({ ...bookingForm, startTime: e.target.value })}
                      placeholder="06:00 AM"
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#f8fafc',
                        fontSize: 13,
                        marginTop: 4,
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>End Time</label>
                    <input
                      type="text"
                      value={bookingForm.endTime}
                      onChange={(e) => setBookingForm({ ...bookingForm, endTime: e.target.value })}
                      placeholder="09:00 AM"
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#f8fafc',
                        fontSize: 13,
                        marginTop: 4,
                      }}
                    />
                  </div>
                </div>

                {/* 3. Customer Info */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Customer Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={bookingForm.customerName}
                      onChange={(e) => setBookingForm({ ...bookingForm, customerName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#f8fafc',
                        fontSize: 13,
                        marginTop: 4,
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="9876543210"
                      value={bookingForm.customerPhone}
                      onChange={(e) => setBookingForm({ ...bookingForm, customerPhone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#f8fafc',
                        fontSize: 13,
                        marginTop: 4,
                      }}
                    />
                  </div>
                </div>

                {/* 4. Teams & Format */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Team A Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Marina Super Kings"
                      value={bookingForm.teamA}
                      onChange={(e) => setBookingForm({ ...bookingForm, teamA: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#f8fafc',
                        fontSize: 13,
                        marginTop: 4,
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Team B Name</label>
                    <input
                      type="text"
                      placeholder="e.g. City Tigers Club"
                      value={bookingForm.teamB}
                      onChange={(e) => setBookingForm({ ...bookingForm, teamB: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#f8fafc',
                        fontSize: 13,
                        marginTop: 4,
                      }}
                    />
                  </div>
                </div>

                {/* 5. Floodlights & Tariff */}
                <div
                  style={{
                    padding: '10px 12px',
                    borderRadius: 10,
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <strong style={{ fontSize: 13, color: '#f8fafc', display: 'block' }}>
                      ⚡ Night Floodlights Required?
                    </strong>
                    <small style={{ color: 'var(--muted)', fontSize: 10 }}>Adds +₹1,500 lighting fee</small>
                  </div>

                  <input
                    type="checkbox"
                    checked={bookingForm.floodlight}
                    onChange={(e) => {
                      const fl = e.target.checked
                      setBookingForm((prev) => ({
                        ...prev,
                        floodlight: fl,
                        price: fl ? prev.price + 1500 : Math.max(1000, prev.price - 1500),
                      }))
                    }}
                    style={{ width: 20, height: 20, cursor: 'pointer' }}
                  />
                </div>

                {/* 6. Price & Payment Mode */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Total Tariff (₹)</label>
                    <input
                      type="number"
                      value={bookingForm.price}
                      onChange={(e) => setBookingForm({ ...bookingForm, price: Number(e.target.value) })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid #00e676',
                        color: '#00e676',
                        fontWeight: 900,
                        fontSize: 14,
                        marginTop: 4,
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Payment Mode</label>
                    <select
                      value={bookingForm.paymentMode}
                      onChange={(e) => setBookingForm({ ...bookingForm, paymentMode: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#f8fafc',
                        fontSize: 13,
                        marginTop: 4,
                      }}
                    >
                      <option value="UPI QR">UPI QR Scan</option>
                      <option value="Cash on Ground">Cash on Ground</option>
                      <option value="Bank NEFT">Bank NEFT / IMPS</option>
                      <option value="Pay on Arrival">Pay on Arrival</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    marginTop: 10,
                    padding: '12px',
                    borderRadius: 10,
                    border: 'none',
                    background: 'linear-gradient(135deg, #00b0ff, #00e676)',
                    color: '#020617',
                    fontWeight: 900,
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  ✓ Confirm Booking & Generate Gate Pass
                </button>
              </form>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODAL 2: DIGITAL GATE PASS (Printable QR Ticket)
        ========================================================================= */}
        {showGatePassModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: 420,
                background: '#0b1329',
                borderRadius: 16,
                border: '1px solid rgba(0, 230, 118, 0.4)',
                padding: 20,
                textAlign: 'center',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span
                  style={{
                    padding: '3px 8px',
                    borderRadius: 6,
                    background: 'rgba(0, 176, 255, 0.15)',
                    color: '#00b0ff',
                    fontSize: 11,
                    fontWeight: 800,
                  }}
                >
                  STADIUM OFFICIAL ENTRY PASS
                </span>
                <button
                  type="button"
                  onClick={() => setShowGatePassModal(null)}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 18 }}
                >
                  ✕
                </button>
              </div>

              {/* QR Box */}
              <div
                style={{
                  width: 140,
                  height: 140,
                  margin: '0 auto 12px',
                  background: '#fff',
                  padding: 10,
                  borderRadius: 12,
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <QrCode size={110} color="#020617" />
              </div>

              <h3 style={{ fontSize: 17, fontWeight: 900, color: '#f8fafc', margin: '0 0 2px' }}>
                {showGatePassModal.teamA} vs {showGatePassModal.teamB || 'Practice'}
              </h3>
              <span style={{ fontSize: 12, color: '#00e676', fontWeight: 800 }}>
                {venues.find((v) => v.id === showGatePassModal.pitchId)?.name || 'Main Stadium Oval'}
              </span>

              <div
                style={{
                  marginTop: 12,
                  padding: '10px 12px',
                  borderRadius: 10,
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  textAlign: 'left',
                  fontSize: 11,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>Time Slot:</span>
                  <strong style={{ color: '#f8fafc' }}>{showGatePassModal.time}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>Booked By:</span>
                  <strong style={{ color: '#f8fafc' }}>{showGatePassModal.customerName} ({showGatePassModal.customerPhone})</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>Tariff Paid:</span>
                  <strong style={{ color: '#00e676' }}>₹{showGatePassModal.price?.toLocaleString()} ({showGatePassModal.paymentMode})</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>Security Check:</span>
                  <strong style={{ color: '#38bdf8' }}>Gate 1 Main Turnstile Access</strong>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                <button
                  type="button"
                  onClick={() => {
                    window.print()
                  }}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#f8fafc',
                    fontWeight: 800,
                    fontSize: 12,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  <Printer size={15} /> Print Pass
                </button>

                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(
                      `*STADIUM GATE PASS*\nMatch: ${showGatePassModal.teamA} vs ${showGatePassModal.teamB}\nTime: ${showGatePassModal.time}\nPitch: Main Stadium Oval\nPass ID: GP-${Date.now().toString().slice(-6)}`
                    )
                    triggerToast('Gate pass link copied to clipboard!')
                  }}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: 8,
                    background: '#00e676',
                    border: 'none',
                    color: '#020617',
                    fontWeight: 900,
                    fontSize: 12,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  <Share2 size={15} /> Share with Captain
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODAL 3: ADD NEW STAFF
        ========================================================================= */}
        {showAddStaffModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: 440,
                background: '#0b1329',
                borderRadius: 16,
                border: '1px solid rgba(255, 200, 61, 0.4)',
                padding: 20,
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h3 style={{ fontSize: 17, fontWeight: 900, color: '#f8fafc', margin: 0 }}>
                  👷 Add Staff Member
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAddStaffModal(false)}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 18 }}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateStaff} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senthil Nathan"
                    value={staffForm.name}
                    onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#f8fafc',
                      fontSize: 13,
                      marginTop: 4,
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Role</label>
                    <select
                      value={staffForm.role}
                      onChange={(e) => setStaffForm({ ...staffForm, role: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#f8fafc',
                        fontSize: 13,
                        marginTop: 4,
                      }}
                    >
                      <option value="Assistant Pitch Curator">Assistant Curator</option>
                      <option value="Floodlight Electrician">Electrician / Tech</option>
                      <option value="Gate Security Marshal">Gate Security</option>
                      <option value="Turf Watering Crew">Watering & Net Crew</option>
                      <option value="Pavilion Housekeeper">Housekeeping</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="9876543210"
                      value={staffForm.phone}
                      onChange={(e) => setStaffForm({ ...staffForm, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#f8fafc',
                        fontSize: 13,
                        marginTop: 4,
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Shift</label>
                    <select
                      value={staffForm.shift}
                      onChange={(e) => setStaffForm({ ...staffForm, shift: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#f8fafc',
                        fontSize: 13,
                        marginTop: 4,
                      }}
                    >
                      <option value="Morning (05:30 AM - 02:00 PM)">Morning Shift</option>
                      <option value="Full Day (07:00 AM - 05:00 PM)">Full Day Shift</option>
                      <option value="Evening (03:00 PM - 11:30 PM)">Evening Shift</option>
                      <option value="Night (07:00 PM - 07:00 AM)">Night Shift</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Monthly Pay (₹)</label>
                    <input
                      type="number"
                      required
                      value={staffForm.salary}
                      onChange={(e) => setStaffForm({ ...staffForm, salary: Number(e.target.value) })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#ffc83d',
                        fontWeight: 900,
                        fontSize: 13,
                        marginTop: 4,
                      }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    marginTop: 10,
                    padding: '12px',
                    borderRadius: 10,
                    border: 'none',
                    background: '#ffc83d',
                    color: '#020617',
                    fontWeight: 900,
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  ✓ Add Staff to Roster
                </button>
              </form>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODAL 4: RECORD NEW EXPENSE
        ========================================================================= */}
        {showAddExpenseModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: 440,
                background: '#0b1329',
                borderRadius: 16,
                border: '1px solid rgba(255, 59, 80, 0.4)',
                padding: 20,
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h3 style={{ fontSize: 17, fontWeight: 900, color: '#f8fafc', margin: 0 }}>
                  💸 Record Operational Expense
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAddExpenseModal(false)}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 18 }}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateExpense} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Expense Category</label>
                  <select
                    value={expenseForm.category}
                    onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#f8fafc',
                      fontSize: 13,
                      marginTop: 4,
                    }}
                  >
                    <option value="Pitch Maintenance">Pitch Red Soil & Grass Maintenance</option>
                    <option value="Electricity & Utilities">Floodlight & Utility Power Bill</option>
                    <option value="Diesel & Machinery">Roller Diesel Fuel & Machine Service</option>
                    <option value="Equipment Repair">Stump / Net / Sight Screen Repair</option>
                    <option value="Staff Payroll">Staff Salary & Contractor Wage</option>
                    <option value="Water Supply">Water Tanker & Irrigation Supply</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Description / Particulars *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 50 Litres Diesel for Pitch Heavy Roller"
                    value={expenseForm.desc}
                    onChange={(e) => setExpenseForm({ ...expenseForm, desc: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#f8fafc',
                      fontSize: 13,
                      marginTop: 4,
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Amount (₹) *</label>
                    <input
                      type="number"
                      required
                      placeholder="5000"
                      value={expenseForm.amount}
                      onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid #ff3b50',
                        color: '#ff3b50',
                        fontWeight: 900,
                        fontSize: 14,
                        marginTop: 4,
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Payment Mode</label>
                    <select
                      value={expenseForm.mode}
                      onChange={(e) => setExpenseForm({ ...expenseForm, mode: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#f8fafc',
                        fontSize: 13,
                        marginTop: 4,
                      }}
                    >
                      <option value="UPI / Online">UPI / QR Transfer</option>
                      <option value="Bank NEFT">Bank NEFT</option>
                      <option value="Cash / Petty Cash">Cash / Petty Cash</option>
                      <option value="Cheque">Bank Cheque</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    marginTop: 10,
                    padding: '12px',
                    borderRadius: 10,
                    border: 'none',
                    background: '#ff3b50',
                    color: '#fff',
                    fontWeight: 900,
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  ✓ Deduct & Save in Accounts Ledger
                </button>
              </form>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODAL 5: STATEMENT DOWNLOAD / AUDIT PREVIEW
        ========================================================================= */}
        {showStatementModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: 460,
                maxHeight: '90vh',
                overflowY: 'auto',
                background: '#0b1329',
                borderRadius: 16,
                border: '1px solid rgba(0, 176, 255, 0.4)',
                padding: 20,
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h3 style={{ fontSize: 17, fontWeight: 900, color: '#f8fafc', margin: 0 }}>
                  📄 Monthly Financial Statement
                </h3>
                <button
                  type="button"
                  onClick={() => setShowStatementModal(false)}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 18 }}
                >
                  ✕
                </button>
              </div>

              <div
                style={{
                  padding: '14px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: 12,
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>Period:</span>
                  <strong style={{ color: '#f8fafc' }}>01 Oct 2026 – 04 Nov 2026</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>Facility:</span>
                  <strong style={{ color: '#f8fafc' }}>SH Sports Stadium Complex (4 Pitches)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>Gross Inflow:</span>
                  <strong style={{ color: '#00e676' }}>+₹{totalInflow.toLocaleString()}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>Total Outflow:</span>
                  <strong style={{ color: '#ff3b50' }}>-₹{totalOutflow.toLocaleString()}</strong>
                </div>
                <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '4px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#f8fafc', fontWeight: 800 }}>Net Operational Profit:</span>
                  <strong style={{ color: '#00e676' }}>+₹{netProfit.toLocaleString()}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <button
                  type="button"
                  onClick={() => {
                    window.print()
                  }}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#f8fafc',
                    fontWeight: 800,
                    fontSize: 12,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  <Printer size={15} /> Print Statement
                </button>

                <button
                  type="button"
                  onClick={() => {
                    triggerToast('Statement downloaded as PDF successfully!')
                    setShowStatementModal(false)
                  }}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: 8,
                    background: '#00b0ff',
                    border: 'none',
                    color: '#020617',
                    fontWeight: 900,
                    fontSize: 12,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  <Download size={15} /> Download PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Screen>
  )
}
