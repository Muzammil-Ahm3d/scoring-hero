import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Sun,
  Moon,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Wrench,
  Megaphone,
  Activity,
  Users,
  ShieldCheck,
  Download,
  Plus,
  QrCode,
  FileText,
  Check,
  X,
  Phone,
  TrendingUp,
  Building,
  ArrowUpRight,
  Lock,
  Printer,
  Share2,
  Sparkles,
  ExternalLink,
  ChevronRight,
} from 'lucide-react'

export default function GroundDashboard({ user }) {
  const navigate = useNavigate()
  const details = user?.roleDetails || {}

  // Active sub-tab inside the dashboard
  const [activeTab, setActiveTab] = useState('slots') // 'slots' | 'finance' | 'staff' | 'equipment' | 'leases'

  // Pitch filter
  const [selectedPitch, setSelectedPitch] = useState('all') // 'all' | 'p1' | 'p2' | 'p3'

  // Calendar Day Picker
  const [selectedDay, setSelectedDay] = useState(12)

  // Feedback Toast Message
  const [toastMsg, setToastMsg] = useState('')

  // Modals state
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showGatePassModal, setShowGatePassModal] = useState(null)
  const [showStatementModal, setShowStatementModal] = useState(false)

  // Booking Form State for quick walk-in counter booking
  const [newBooking, setNewBooking] = useState({
    time: '14:00 - 17:00',
    pitch: 'Main Stadium Oval (Red Soil)',
    teamA: 'Marina Super Kings',
    teamB: 'Chennai Rhinos',
    captainPhone: '9876543210',
    matchFormat: 'T20 Match Challenge',
    price: 3500,
    floodlights: false,
    paymentMode: 'UPI QR Scan',
  })

  // Time Slots state (Feature 13.2 & 13.4)
  const [slots, setSlots] = useState([
    {
      id: 's1',
      time: '06:00 AM - 09:00 AM',
      pitch: 'Main Stadium Oval (Red Soil)',
      pitchId: 'p1',
      teamA: 'Scoring Heroes Academy',
      teamB: 'Marina Strikers',
      matchType: '25-Over Practice Match',
      captainA: 'Dev Anand (9876543210)',
      captainB: 'Vignesh R. (9840123456)',
      status: 'Booked',
      paid: true,
      amount: '₹4,500',
      floodlight: false,
    },
    {
      id: 's2',
      time: '09:30 AM - 12:30 PM',
      pitch: 'Practice Turf 2 (Black Soil)',
      pitchId: 'p2',
      teamA: 'Coastal Kings XI',
      teamB: 'City Tigers Club',
      matchType: 'Corporate T20 Trophy',
      captainA: 'Rajesh K. (9840998877)',
      captainB: 'Arun Prasad (9884112233)',
      status: 'Booked',
      paid: true,
      amount: '₹5,000',
      floodlight: false,
    },
    {
      id: 's3',
      time: '01:00 PM - 04:00 PM',
      pitch: 'Main Stadium Oval (Red Soil)',
      pitchId: 'p1',
      teamA: 'Curator Maintenance',
      teamB: 'Heavy Roller Work',
      matchType: 'Curator Pitch Restoration',
      status: 'Maintenance',
      paid: false,
      amount: '₹0',
      floodlight: false,
    },
    {
      id: 's4',
      time: '04:30 PM - 07:30 PM',
      pitch: 'Astroturf Box Arena',
      pitchId: 'p3',
      teamA: 'Tech Titans Box XI',
      teamB: 'Marina Velocity Box',
      matchType: 'Floodlit Box 10-Over Cup',
      captainA: 'Sunil M. (9789012345)',
      captainB: 'Gautam S. (9840776655)',
      status: 'Booked',
      paid: true,
      amount: '₹3,600',
      floodlight: true,
    },
    {
      id: 's5',
      time: '08:00 PM - 11:30 PM',
      pitch: 'Main Stadium Oval (Red Soil)',
      pitchId: 'p1',
      teamA: 'Available for Slot Booking',
      teamB: '',
      matchType: 'Night Floodlight Standard Match',
      status: 'Available',
      paid: false,
      amount: '₹7,500',
      floodlight: true,
    },
  ])

  // Ground Staff Roster (Feature 13.9 & 13.10)
  const [staffList, setStaffList] = useState([
    {
      id: 1,
      name: 'Murugan S.',
      role: 'Head Pitch Curator',
      experience: '12 Yrs Exp • BCCI Level 1 Ground',
      salary: '₹28,000',
      status: 'Present',
      duty: 'Main Pitch 1 Moisture & 2-Ton Rolling Complete',
      checkedIn: '05:45 AM',
    },
    {
      id: 2,
      name: 'Rajesh K.',
      role: 'Ground Superintendent',
      experience: '8 Yrs Exp • Operations Lead',
      salary: '₹32,000',
      status: 'Present',
      duty: 'Dressing Rooms & Pavilion Gate Turnstiles Active',
      checkedIn: '06:15 AM',
    },
    {
      id: 3,
      name: 'Sundar V.',
      role: 'Floodlight & Electrical Tech',
      experience: '6 Yrs Exp • High-Voltage Tech',
      salary: '₹22,000',
      status: 'Present',
      duty: '800-Lux Tower Diesel Gen-Set at 92% Capacity',
      checkedIn: '02:00 PM',
    },
    {
      id: 4,
      name: 'Karthik R.',
      role: 'Net & Practice Pitch Caretaker',
      experience: '4 Yrs Exp • Ground Assistant',
      salary: '₹18,000',
      status: 'Present',
      duty: 'Boundary Ropes & 30-Yard Circle Paint Lines Marked',
      checkedIn: '06:00 AM',
    },
  ])

  // Equipment Stock Register (Feature 13.11 & 14.11)
  const [equipmentList, setEquipmentList] = useState([
    { id: 'eq1', name: 'Heavy Motorized Pitch Roller (2-Ton)', status: 'OPERATIONAL', lastService: '3 days ago', health: '98%', color: '#00e676' },
    { id: 'eq2', name: 'Electronic Stumps & LED Flashing Bails', status: '12 UNITS READY', lastService: 'Battery at 94%', health: '100%', color: '#3de0ff' },
    { id: 'eq3', name: 'Practice Netting & Bowling Machine', status: '4 NETS ACTIVE', lastService: 'Speed calibrated 145km/h', health: '95%', color: '#ffc83d' },
    { id: 'eq4', name: 'Day/Night High-Mast Floodlight Towers', status: '800-LUX ACTIVE', lastService: 'Tested for Night Fixture', health: '100%', color: '#00e676' },
    { id: 'eq5', name: 'Super Sopper Rain Water Evaporator', status: 'MONSOON READY', lastService: 'Dry test cleared', health: '100%', color: '#00e676' },
  ])

  // Tournament Leases (Feature 14.8 & 15.3)
  const [tournamentLeases] = useState([
    {
      id: 'lse-1',
      name: 'Chennai Premier Youth Cup (U19)',
      organizer: 'South Zone Cricket Federation',
      duration: '14 Match Days Booked',
      contractValue: '₹2,40,000',
      status: 'Confirmed & Advance Paid',
      dates: 'July 14 - July 28, 2026',
    },
    {
      id: 'lse-2',
      name: 'Tamil Nadu Corporate Champions Trophy',
      organizer: 'Marina Corporate Sports Council',
      duration: '8 Weekend Days Booked',
      contractValue: '₹1,60,000',
      status: 'Confirmed & Advance Paid',
      dates: 'August 01 - August 22, 2026',
    },
  ])

  // Boundary LED Billboards (Feature 15.10 & 18.5)
  const [billboards] = useState([
    { id: 'bb1', position: 'Perimeter Board 1 (Mid-Wicket Pavilion)', advertiser: 'Velocity Sports Nutrition', rate: '₹16,000 / mo', status: 'Active' },
    { id: 'bb2', position: 'Perimeter Board 2 (Cover Boundary)', advertiser: 'Velocity Sports Nutrition', rate: '₹16,000 / mo', status: 'Active' },
    { id: 'bb3', position: 'Perimeter Board 3 (Sight Screen Right)', advertiser: 'Apex Willow & Pro Gear Co.', rate: '₹16,000 / mo', status: 'Active' },
    { id: 'bb4', position: 'Perimeter Board 4 (Long-Off Boundary)', advertiser: 'Apex Willow & Pro Gear Co.', rate: '₹16,000 / mo', status: 'Active' },
    { id: 'bb5', position: 'Perimeter Board 5 (Scoreboard Lower Tier)', advertiser: 'Available for Brand Sponsor', rate: '₹16,000 / mo', status: 'Available' },
    { id: 'bb6', position: 'Perimeter Board 6 (Main Entrance Turnstile)', advertiser: 'Available for Brand Sponsor', rate: '₹16,000 / mo', status: 'Available' },
  ])

  function triggerToast(msg) {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 3500)
  }

  // Toggle staff attendance
  function toggleStaffAttendance(id) {
    setStaffList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: s.status === 'Present' ? 'Absent' : 'Present' } : s))
    )
    triggerToast('Staff attendance status updated!')
  }

  // Disburse payroll
  function handleDisbursePayroll() {
    triggerToast('✓ Staff payroll batch of ₹1,00,000 initiated via Bank NEFT!')
  }

  // Handle Quick Counter Booking
  function handleCreateBooking(e) {
    e.preventDefault()
    const newId = `s-${Date.now()}`
    const created = {
      id: newId,
      time: newBooking.time,
      pitch: newBooking.pitch,
      pitchId: newBooking.pitch.includes('Main') ? 'p1' : newBooking.pitch.includes('Black') ? 'p2' : 'p3',
      teamA: newBooking.teamA,
      teamB: newBooking.teamB,
      matchType: newBooking.matchFormat,
      captainA: `${newBooking.teamA} Captain (${newBooking.captainPhone})`,
      captainB: `${newBooking.teamB} Captain`,
      status: 'Booked',
      paid: true,
      amount: `₹${Number(newBooking.price).toLocaleString('en-IN')}`,
      floodlight: newBooking.floodlights,
    }

    setSlots((prev) => [created, ...prev])
    setShowBookingModal(false)
    triggerToast(`✓ Slot confirmed for ${newBooking.teamA} vs ${newBooking.teamB}! Gate Pass QR issued.`)
    setShowGatePassModal(created)
  }

  // Filtered Slots
  const filteredSlots = slots.filter((s) => {
    if (selectedPitch === 'all') return true
    return s.pitchId === selectedPitch
  })

  return (
    <div className="sh-dashboard-layout" style={{ maxWidth: 840, margin: '0 auto', padding: '10px 14px 80px' }}>
      {/* Toast Notification */}
      {toastMsg && (
        <div
          style={{
            position: 'fixed',
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 99999,
            background: 'linear-gradient(135deg, #0f172a, #1e293b)',
            color: '#00e676',
            border: '1px solid #00e676',
            boxShadow: '0 8px 30px rgba(0, 230, 118, 0.25)',
            padding: '10px 20px',
            borderRadius: 12,
            fontSize: 13,
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <CheckCircle2 size={16} color="#00e676" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* 1. MASTER VENUE EXECUTIVE COMMAND CARD (Redesigned & Clean) */}
      <section
        style={{
          background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(10, 15, 29, 0.98) 100%)',
          border: '1px solid rgba(0, 176, 255, 0.25)',
          borderRadius: 18,
          padding: '18px 20px',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.55)',
          position: 'relative',
        }}
      >
        {/* Top Venue Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'linear-gradient(135deg, rgba(0, 176, 255, 0.2), rgba(0, 230, 118, 0.15))',
                border: '1px solid rgba(0, 176, 255, 0.4)',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <Building size={24} color="#00b0ff" />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: 18, fontWeight: 900, color: '#f8fafc', margin: 0, letterSpacing: -0.4 }}>
                  {details.venueName || 'Marina International Cricket Arena & Turfs'}
                </h1>
                <span
                  style={{
                    background: 'rgba(0, 176, 255, 0.15)',
                    color: '#00b0ff',
                    border: '1px solid rgba(0, 176, 255, 0.4)',
                    padding: '2px 8px',
                    borderRadius: 999,
                    fontSize: 10,
                    fontWeight: 800,
                  }}
                >
                  VENUE VERIFIED
                </span>
                <span
                  style={{
                    background: 'rgba(0, 230, 118, 0.15)',
                    color: '#00e676',
                    border: '1px solid rgba(0, 230, 118, 0.4)',
                    padding: '2px 8px',
                    borderRadius: 999,
                    fontSize: 10,
                    fontWeight: 800,
                  }}
                >
                  AADHAAR COMPLIANT
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4, fontSize: 12, color: '#94a3b8' }}>
                <span>Stadium Director: <strong style={{ color: '#f1f5f9' }}>{user?.fullName || 'Dev Anand'}</strong></span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#38bdf8' }}>
                  <MapPin size={12} /> Marina Beach Road, Chennai 600005
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stadium Status Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                background: 'rgba(255, 214, 0, 0.12)',
                color: '#ffd600',
                border: '1px solid rgba(255, 214, 0, 0.3)',
                padding: '4px 10px',
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <Sun size={12} /> 800-Lux Lights Active
            </span>
            <span
              style={{
                background: 'rgba(0, 230, 118, 0.12)',
                color: '#00e676',
                border: '1px solid rgba(0, 230, 118, 0.3)',
                padding: '4px 10px',
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#00e676', display: 'inline-block' }} />
              MATCH READY
            </span>
          </div>
        </div>

        {/* Integrated Financial Health Bar (Blueprint Feature 14.7) */}
        <div
          style={{
            marginTop: 14,
            padding: '10px 14px',
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: 12,
            border: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <span style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>GROSS INFLOW</span>
              <strong style={{ fontSize: 14, color: '#f8fafc', display: 'block' }}>₹ 10,75,000</strong>
            </div>
            <div style={{ width: 1, height: 26, background: 'rgba(255, 255, 255, 0.1)' }} />
            <div>
              <span style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>OPERATING COST</span>
              <strong style={{ fontSize: 14, color: '#f87171', display: 'block' }}>₹ 2,32,400</strong>
            </div>
            <div style={{ width: 1, height: 26, background: 'rgba(255, 255, 255, 0.1)' }} />
            <div>
              <span style={{ fontSize: 10, color: '#00e676', fontWeight: 800, textTransform: 'uppercase' }}>NET AUDITED PROFIT</span>
              <strong style={{ fontSize: 15, color: '#00e676', display: 'block' }}>₹ 8,42,600 (+78.3%)</strong>
            </div>
          </div>

          <button
            type="button"
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              background: 'rgba(0, 230, 118, 0.12)',
              border: '1px solid rgba(0, 230, 118, 0.3)',
              color: '#00e676',
              fontSize: 11,
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
            onClick={() => navigate('/app/grounds?action=statement')}
          >
            <Download size={13} /> Statement
          </button>
        </div>

        {/* 4 KPI Telemetry Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 12 }}>
          <div style={{ padding: '8px 10px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 10, border: '1px solid rgba(255, 255, 255, 0.06)', textAlign: 'center' }}>
            <span style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>GROUNDS</span>
            <strong style={{ fontSize: 16, color: '#00b0ff', display: 'block', marginTop: 1 }}>3 Active</strong>
            <small style={{ fontSize: 9, color: '#64748b' }}>Multi-Venue</small>
          </div>

          <div style={{ padding: '8px 10px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 10, border: '1px solid rgba(255, 255, 255, 0.06)', textAlign: 'center' }}>
            <span style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>STAFF ON DUTY</span>
            <strong style={{ fontSize: 16, color: '#00e676', display: 'block', marginTop: 1 }}>8 Present</strong>
            <small style={{ fontSize: 9, color: '#64748b' }}>Curator & Tech</small>
          </div>

          <div style={{ padding: '8px 10px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 10, border: '1px solid rgba(255, 255, 255, 0.06)', textAlign: 'center' }}>
            <span style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>HOURLY SLOT</span>
            <strong style={{ fontSize: 16, color: '#ffc83d', display: 'block', marginTop: 1 }}>₹2,500</strong>
            <small style={{ fontSize: 9, color: '#64748b' }}>Standard Tariff</small>
          </div>

          <div style={{ padding: '8px 10px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 10, border: '1px solid rgba(255, 255, 255, 0.06)', textAlign: 'center' }}>
            <span style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>UTILISATION</span>
            <strong style={{ fontSize: 16, color: '#38bdf8', display: 'block', marginTop: 1 }}>92%</strong>
            <small style={{ fontSize: 9, color: '#64748b' }}>High Demand</small>
          </div>
        </div>
      </section>

      {/* 2. DIRECT OPERATIONAL ACCESS BAR */}
      <section
        style={{
          marginTop: 12,
          padding: '12px 14px',
          background: 'rgba(15, 23, 42, 0.65)',
          borderRadius: 14,
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          <button
            type="button"
            style={{
              padding: '12px 10px',
              borderRadius: 10,
              background: 'rgba(0, 176, 255, 0.12)',
              border: '1px solid rgba(0, 176, 255, 0.3)',
              color: '#f8fafc',
              fontSize: 12,
              fontWeight: 800,
              cursor: 'pointer',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
            }}
            onClick={() => navigate('/app/grounds?tab=slots')}
          >
            <span style={{ fontSize: 18 }}>📅</span>
            <span style={{ color: '#00b0ff' }}>Slots & Bookings</span>
          </button>

          <button
            type="button"
            style={{
              padding: '12px 10px',
              borderRadius: 10,
              background: 'rgba(255, 200, 61, 0.12)',
              border: '1px solid rgba(255, 200, 61, 0.3)',
              color: '#f8fafc',
              fontSize: 12,
              fontWeight: 800,
              cursor: 'pointer',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
            }}
            onClick={() => navigate('/app/grounds?tab=staff')}
          >
            <span style={{ fontSize: 18 }}>👷</span>
            <span style={{ color: '#ffc83d' }}>Staff & Attendance</span>
          </button>

          <button
            type="button"
            style={{
              padding: '12px 10px',
              borderRadius: 10,
              background: 'rgba(0, 230, 118, 0.12)',
              border: '1px solid rgba(0, 230, 118, 0.3)',
              color: '#f8fafc',
              fontSize: 12,
              fontWeight: 800,
              cursor: 'pointer',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
            }}
            onClick={() => navigate('/app/grounds?tab=accounts')}
          >
            <span style={{ fontSize: 18 }}>💰</span>
            <span style={{ color: '#00e676' }}>Accounts & P&L</span>
          </button>
        </div>
      </section>

      {/* 3. PROMINENT SUB-SYSTEM NAVIGATION TABS */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          marginTop: 14,
          marginBottom: 14,
          overflowX: 'auto',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          paddingBottom: 4,
          maxWidth: '100%',
        }}
      >
        {[
          { id: 'slots', label: '📅 Slot Booking & Matches', color: '#00b0ff' },
          { id: 'finance', label: '💰 Dual Module Accounts', color: '#00e676' },
          { id: 'staff', label: '👷 Staff Attendance & Payroll', color: '#ffc83d' },
          { id: 'equipment', label: '🛠️ Equipment & Roller Stock', color: '#38bdf8' },
          { id: 'leases', label: '🤝 Tournament Leases & Ads', color: '#f87171' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '8px 14px',
              borderRadius: 10,
              fontSize: 12,
              fontWeight: 800,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              border: activeTab === tab.id ? `1.5px solid ${tab.color}` : '1px solid rgba(255, 255, 255, 0.08)',
              background: activeTab === tab.id ? `${tab.color}22` : 'rgba(255, 255, 255, 0.03)',
              color: activeTab === tab.id ? tab.color : 'var(--text)',
              boxShadow: activeTab === tab.id ? `0 0 12px ${tab.color}44` : 'none',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* =========================================================================
          TAB 1: SLOT BOOKING & MATCH SCHEDULER (Feature 13.2, 13.4, 13.5)
      ========================================================================= */}
      {activeTab === 'slots' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Header & Quick Action Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 900, margin: 0, color: '#f8fafc' }}>
                Time Slot Booking & Match Schedule
              </h2>
              <small style={{ color: 'var(--muted)', fontSize: 11 }}>
                Real-time pitch allocation, walk-in reservations & match fixture linking
              </small>
            </div>

            <button
              type="button"
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
              onClick={() => navigate('/app/grounds?action=book')}
            >
              <Plus size={15} /> + Quick Walk-In Booking
            </button>
          </div>

          {/* Interactive Date Picker (July 2026, 28 Days) */}
          <div
            style={{
              padding: 12,
              background: 'rgba(15, 23, 42, 0.7)',
              borderRadius: 14,
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: '#38bdf8', letterSpacing: 0.5 }}>
                JULY 2026 CALENDAR
              </span>
              <span className="pill" style={{ background: 'rgba(0, 230, 118, 0.15)', color: '#00e676', fontSize: 10 }}>
                MATCH DAY SELECTED: JULY {selectedDay}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, textAlign: 'center' }}>
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d) => (
                <span key={d} style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 800 }}>
                  {d}
                </span>
              ))}

              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28].map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  style={{
                    padding: '8px 4px',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: selectedDay === day ? '1px solid #00b0ff' : '1px solid rgba(255, 255, 255, 0.04)',
                    background:
                      selectedDay === day
                        ? '#00b0ff'
                        : day === 12 || day === 19
                        ? 'rgba(0, 230, 118, 0.12)'
                        : 'rgba(255, 255, 255, 0.02)',
                    color: selectedDay === day ? '#020617' : day === 12 || day === 19 ? '#00e676' : 'var(--text)',
                    boxShadow: selectedDay === day ? '0 0 10px rgba(0, 176, 255, 0.5)' : 'none',
                  }}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Pitch Filter Pills (FIXED: Full wrapping & zero edge clipping!) */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              width: '100%',
              padding: '2px 0',
            }}
          >
            {[
              { id: 'all', label: 'All Complex Pitches' },
              { id: 'p1', label: '🏟️ Pitch 1: Main Stadium Oval (Red Soil)' },
              { id: 'p2', label: '🌱 Pitch 2: Black Soil Turf' },
              { id: 'p3', label: '🥅 Pitch 3: Box Astroturf Net' },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                style={{
                  padding: '7px 14px',
                  borderRadius: 999,
                  border: selectedPitch === p.id ? '1.5px solid #00b0ff' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: selectedPitch === p.id ? '#00b0ff' : 'rgba(255, 255, 255, 0.04)',
                  color: selectedPitch === p.id ? '#020617' : '#cbd5e1',
                  cursor: 'pointer',
                  fontSize: 11,
                  fontWeight: selectedPitch === p.id ? 800 : 600,
                  whiteSpace: 'nowrap',
                }}
                onClick={() => setSelectedPitch(p.id)}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Slot Cards List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filteredSlots.map((slot) => (
              <div
                key={slot.id}
                style={{
                  padding: '14px 16px',
                  borderRadius: 14,
                  background:
                    slot.status === 'Booked'
                      ? 'rgba(0, 176, 255, 0.04)'
                      : slot.status === 'Available'
                      ? 'rgba(0, 230, 118, 0.04)'
                      : 'rgba(255, 200, 61, 0.04)',
                  border: `1px solid ${
                    slot.status === 'Booked'
                      ? 'rgba(0, 176, 255, 0.25)'
                      : slot.status === 'Available'
                      ? 'rgba(0, 230, 118, 0.25)'
                      : 'rgba(255, 200, 61, 0.25)'
                  }`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <strong style={{ fontSize: 15, color: '#f8fafc' }}>{slot.time}</strong>
                      {slot.floodlight && (
                        <span style={{ fontSize: 10, color: '#ffd600', display: 'flex', alignItems: 'center', gap: 3 }}>
                          <Moon size={12} /> Floodlights Active
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: 11, color: '#38bdf8', fontWeight: 600 }}>{slot.pitch}</span>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span
                      style={{
                        padding: '3px 10px',
                        borderRadius: 999,
                        fontSize: 10,
                        fontWeight: 800,
                        background:
                          slot.status === 'Booked'
                            ? 'rgba(0, 176, 255, 0.15)'
                            : slot.status === 'Available'
                            ? 'rgba(0, 230, 118, 0.15)'
                            : 'rgba(255, 200, 61, 0.15)',
                        color:
                          slot.status === 'Booked'
                            ? '#00b0ff'
                            : slot.status === 'Available'
                            ? '#00e676'
                            : '#ffc83d',
                        border: `1px solid ${
                          slot.status === 'Booked'
                            ? 'rgba(0, 176, 255, 0.3)'
                            : slot.status === 'Available'
                            ? 'rgba(0, 230, 118, 0.3)'
                            : 'rgba(255, 200, 61, 0.3)'
                        }`,
                      }}
                    >
                      {slot.status === 'Booked' ? 'CONFIRMED BOOKING' : slot.status === 'Available' ? 'AVAILABLE' : 'CURATOR MAINTENANCE'}
                    </span>
                    <strong style={{ display: 'block', fontSize: 14, color: '#f8fafc', marginTop: 4 }}>
                      {slot.amount}
                    </strong>
                  </div>
                </div>

                {/* Match Information (Feature 13.4: Team A vs Team B) */}
                {slot.status === 'Booked' && (
                  <div
                    style={{
                      marginTop: 10,
                      padding: '8px 12px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      borderRadius: 8,
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: 8,
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: 13, color: '#f8fafc' }}>
                        {slot.teamA} <span style={{ color: '#e10613' }}>VS</span> {slot.teamB}
                      </strong>
                      <small style={{ display: 'block', color: 'var(--muted)', fontSize: 11 }}>
                        {slot.matchType} • Captains: {slot.captainA}
                      </small>
                    </div>

                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        type="button"
                        style={{
                          padding: '6px 12px',
                          borderRadius: 8,
                          background: 'rgba(0, 176, 255, 0.15)',
                          border: '1px solid rgba(0, 176, 255, 0.35)',
                          color: '#00b0ff',
                          fontSize: 11,
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 5,
                        }}
                        onClick={() => navigate('/app/grounds?action=book')}
                      >
                        <QrCode size={13} /> Gate Pass QR
                      </button>
                    </div>
                  </div>
                )}

                {/* Available Slot Actions (FIXED: Invisible button styling completely resolved!) */}
                {slot.status === 'Available' && (
                  <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                    <button
                      type="button"
                      style={{
                        padding: '8px 16px',
                        borderRadius: 8,
                        background: '#00e676',
                        border: 'none',
                        color: '#020617',
                        fontWeight: 900,
                        fontSize: 11,
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        setNewBooking((prev) => ({ ...prev, time: slot.time, pitch: slot.pitch }))
                        navigate('/app/grounds?action=book')
                      }}
                    >
                      + Book Walk-In Match
                    </button>
                    <button
                      type="button"
                      style={{
                        padding: '8px 16px',
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        color: '#f8fafc',
                        fontWeight: 700,
                        fontSize: 11,
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        setSlots((prev) =>
                          prev.map((s) => (s.id === slot.id ? { ...s, status: 'Maintenance', teamA: 'Pitch Roller Rest' } : s))
                        )
                        triggerToast('Slot marked for Pitch Curator Rolling / Rest!')
                      }}
                    >
                      Block for Maintenance
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: DUAL MODULE ACCOUNTS & PROFIT/LOSS (Feature 13.3, 13.6, 13.7, 13.8)
      ========================================================================= */}
      {activeTab === 'finance' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Financial Header Banner */}
          <div
            style={{
              padding: '18px 20px',
              borderRadius: 16,
              background: 'linear-gradient(135deg, rgba(0, 230, 118, 0.1), rgba(15, 23, 42, 0.95))',
              border: '1px solid rgba(0, 230, 118, 0.3)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <div>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#00e676', letterSpacing: 0.8, textTransform: 'uppercase' }}>
                DUAL MODULE ACCOUNTING SHEET (OCTOBER 2026)
              </span>
              <h2 style={{ fontSize: 26, fontWeight: 900, color: '#f8fafc', margin: '4px 0 0' }}>
                ₹ 8,42,600 <span style={{ fontSize: 14, color: '#00e676', fontWeight: 600 }}>NET PROFIT</span>
              </h2>
              <small style={{ color: 'var(--muted)', fontSize: 11 }}>
                Calculated automatically from Slot Bookings, Tournament Leases & Ground Maintenance Expenses
              </small>
            </div>

            <button
              type="button"
              style={{
                padding: '8px 14px',
                borderRadius: 10,
                background: 'rgba(0, 230, 118, 0.15)',
                border: '1px solid #00e676',
                color: '#00e676',
                fontWeight: 800,
                fontSize: 12,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
              onClick={() => navigate('/app/grounds?action=statement')}
            >
              <Download size={14} /> Download Account Sheet (PDF / Excel)
            </button>
          </div>

          {/* Dual Module Ledger Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
            {/* Income Card */}
            <div
              style={{
                padding: '14px 16px',
                borderRadius: 14,
                background: 'rgba(0, 230, 118, 0.04)',
                border: '1px solid rgba(0, 230, 118, 0.2)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <strong style={{ fontSize: 14, color: '#00e676', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <TrendingUp size={16} /> Total Income Collections
                </strong>
                <span style={{ fontSize: 16, fontWeight: 900, color: '#00e676' }}>₹ 10,75,000</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                  <span>Ground & Pitch Slot Bookings (74 Slots)</span>
                  <strong style={{ color: '#f8fafc' }}>₹ 6,85,000</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                  <span>Tournament League Leases (2 Tournaments)</span>
                  <strong style={{ color: '#f8fafc' }}>₹ 2,40,000</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                  <span>Academy Practice Net Tie-Up (Marina Titans)</span>
                  <strong style={{ color: '#f8fafc' }}>₹ 1,02,000</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                  <span>Perimeter Billboard & Stadium Ads</span>
                  <strong style={{ color: '#f8fafc' }}>₹ 48,000</strong>
                </div>
              </div>
            </div>

            {/* Expenditure Card */}
            <div
              style={{
                padding: '14px 16px',
                borderRadius: 14,
                background: 'rgba(239, 68, 68, 0.04)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <strong style={{ fontSize: 14, color: '#f87171', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <DollarSign size={16} /> Total Ground Expenditures
                </strong>
                <span style={{ fontSize: 16, fontWeight: 900, color: '#f87171' }}>₹ 2,32,400</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                  <span>Staff Salaries & Curator Payroll</span>
                  <strong style={{ color: '#f8fafc' }}>₹ 1,00,000</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                  <span>Pitch Red Soil, Clay & Grass Fertilizers</span>
                  <strong style={{ color: '#f8fafc' }}>₹ 45,000</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                  <span>Heavy Roller Diesel & Equipment Fuel</span>
                  <strong style={{ color: '#f8fafc' }}>₹ 32,400</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                  <span>800-Lux Floodlight Tower Electricity</span>
                  <strong style={{ color: '#f8fafc' }}>₹ 55,000</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: CENTRAL STAFF & SHIFT PAYROLL (Feature 13.9, 13.10, 14.2, 14.3, 14.4)
      ========================================================================= */}
      {activeTab === 'staff' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 900, margin: 0, color: '#f8fafc' }}>
                Central Staff & Shift Payroll System
              </h2>
              <small style={{ color: 'var(--muted)', fontSize: 11 }}>
                Curators, groundsmen, electricians & turnstile security attendance
              </small>
            </div>

            <button
              type="button"
              style={{
                padding: '8px 14px',
                borderRadius: 10,
                border: 'none',
                background: 'linear-gradient(135deg, #ffc83d, #ff9100)',
                color: '#020617',
                fontWeight: 900,
                fontSize: 12,
                cursor: 'pointer',
              }}
              onClick={handleDisbursePayroll}
            >
              Disburse Staff Payroll (₹1,00,000) →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {staffList.map((staff) => (
              <div
                key={staff.id}
                style={{
                  padding: '12px 14px',
                  borderRadius: 12,
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 10,
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <strong style={{ fontSize: 14, color: '#f8fafc' }}>{staff.name}</strong>
                    <span className="pill" style={{ background: 'rgba(0, 176, 255, 0.15)', color: '#00b0ff', fontSize: 10 }}>
                      {staff.role}
                    </span>
                  </div>
                  <small style={{ display: 'block', color: 'var(--muted)', fontSize: 11, marginTop: 2 }}>
                    {staff.experience} • Shift Check-In: {staff.checkedIn}
                  </small>
                  <p style={{ margin: '4px 0 0', fontSize: 12, color: '#38bdf8' }}>
                    Active Task: {staff.duty}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: 10, color: 'var(--muted)' }}>Salary</span>
                    <strong style={{ fontSize: 14, color: '#f8fafc', display: 'block' }}>{staff.salary}</strong>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleStaffAttendance(staff.id)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 8,
                      fontSize: 11,
                      fontWeight: 800,
                      cursor: 'pointer',
                      border: 'none',
                      background: staff.status === 'Present' ? '#00e676' : '#ef4444',
                      color: '#020617',
                    }}
                  >
                    {staff.status === 'Present' ? '✓ PRESENT' : '✗ ABSENT'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: EQUIPMENT STOCK & CURATOR LOG (Feature 13.11, 14.11)
      ========================================================================= */}
      {activeTab === 'equipment' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 900, margin: 0, color: '#f8fafc' }}>
                Asset & Equipment Stock Register
              </h2>
              <small style={{ color: 'var(--muted)', fontSize: 11 }}>
                Pitch rollers, electronic stumps, practice cages & floodlight towers
              </small>
            </div>

            <button
              type="button"
              style={{
                padding: '8px 14px',
                borderRadius: 8,
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#f8fafc',
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
              }}
              onClick={() => {
                triggerToast('Curator equipment inspection logged in register!')
              }}
            >
              + Log Curator Inspection
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {equipmentList.map((eq) => (
              <div
                key={eq.id}
                style={{
                  padding: '12px 14px',
                  borderRadius: 12,
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <strong style={{ fontSize: 13, color: '#f8fafc' }}>{eq.name}</strong>
                  <small style={{ display: 'block', color: 'var(--muted)', fontSize: 11 }}>
                    Condition: {eq.lastService} • System Reliability: {eq.health}
                  </small>
                </div>

                <span
                  style={{
                    padding: '4px 10px',
                    borderRadius: 8,
                    fontSize: 10,
                    fontWeight: 800,
                    background: `${eq.color}22`,
                    color: eq.color,
                    border: `1px solid ${eq.color}55`,
                  }}
                >
                  {eq.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: TOURNAMENT LEASES & BILLBOARD ADS (Feature 14.8, 15.2, 15.10)
      ========================================================================= */}
      {activeTab === 'leases' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Tournament Leases */}
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 900, margin: '0 0 4px', color: '#f8fafc' }}>
              Seasonal Tournament Leases & Contracts
            </h2>
            <small style={{ color: 'var(--muted)', fontSize: 11 }}>
              Guaranteed stadium booking contracts with federations and tournament bodies
            </small>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
              {tournamentLeases.map((lse) => (
                <div
                  key={lse.id}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 12,
                    background: 'rgba(0, 176, 255, 0.04)',
                    border: '1px solid rgba(0, 176, 255, 0.2)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 10,
                  }}
                >
                  <div>
                    <strong style={{ fontSize: 14, color: '#f8fafc' }}>{lse.name}</strong>
                    <small style={{ display: 'block', color: 'var(--muted)', fontSize: 11 }}>
                      Organizer: {lse.organizer} • {lse.duration}
                    </small>
                    <span style={{ fontSize: 11, color: '#38bdf8', fontWeight: 600 }}>Schedule: {lse.dates}</span>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span className="pill" style={{ background: 'rgba(0, 230, 118, 0.15)', color: '#00e676', fontSize: 10 }}>
                      {lse.status}
                    </span>
                    <strong style={{ display: 'block', fontSize: 15, color: '#f8fafc', marginTop: 4 }}>
                      {lse.contractValue}
                    </strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stadium Boundary Billboards (Feature 15.10 & 18.5) */}
          <div style={{ marginTop: 10 }}>
            <h2 style={{ fontSize: 16, fontWeight: 900, margin: '0 0 4px', color: '#f8fafc' }}>
              Stadium Boundary LED & Perimeter Advertising Slots
            </h2>
            <small style={{ color: 'var(--muted)', fontSize: 11 }}>
              Monetize stadium boundary perimeter with brand sponsor banners
            </small>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 10, marginTop: 10 }}>
              {billboards.map((b) => (
                <div
                  key={b.id}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 10,
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: `1px solid ${b.status === 'Active' ? 'rgba(0, 230, 118, 0.2)' : 'rgba(255, 214, 0, 0.2)'}`,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: 12, color: '#f8fafc' }}>{b.position}</strong>
                    <span
                      className="pill"
                      style={{
                        background: b.status === 'Active' ? 'rgba(0, 230, 118, 0.15)' : 'rgba(255, 214, 0, 0.15)',
                        color: b.status === 'Active' ? '#00e676' : '#ffd600',
                        fontSize: 9,
                      }}
                    >
                      {b.status.toUpperCase()}
                    </span>
                  </div>
                  <small style={{ display: 'block', color: 'var(--muted)', fontSize: 11, margin: '4px 0' }}>
                    Advertiser: {b.advertiser}
                  </small>
                  <strong style={{ fontSize: 12, color: '#38bdf8' }}>{b.rate}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

          </div>
  )
}
