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
  Sliders,
  Layers,
  Wrench,
  Sun,
  Flame,
  Lock,
  Building2,
  Check,
} from 'lucide-react'
import Screen from '../components/Screen'

export default function GroundSlotBooking() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const urlMode = searchParams.get('mode')
  const urlSys = Number(searchParams.get('sys'))

  // Top Mode: 'stadium' (Feature 14 Multi-Venue Stadium Ops) vs 'slots' (Feature 13 Ground Slot Booking)
  const [opsMode, setOpsMode] = useState(urlMode === 'slots' ? 'slots' : 'stadium')

  // 1 to 12 Systems
  const [activeSystem, setActiveSystem] = useState(urlSys >= 1 && urlSys <= 12 ? urlSys : 1)
  const [selectedDay, setSelectedDay] = useState(12)
  const [toastMsg, setToastMsg] = useState('')
  const [dualModuleTab, setDualModuleTab] = useState('booking') // 'booking' | 'accounts'

  useEffect(() => {
    const m = searchParams.get('mode')
    const s = Number(searchParams.get('sys'))
    if (m === 'slots' || m === 'stadium') setOpsMode(m)
    if (s >= 1 && s <= 12) setActiveSystem(s)
  }, [searchParams])

  // Time Slots state
  const [slots, setSlots] = useState([
    { id: 1, time: '06:00 - 08:00', title: 'Morning Practice Slot', status: 'available', price: 2000 },
    { id: 2, time: '08:00 - 10:00', title: 'Scoring XI vs Warriors XI', status: 'booked', price: 3500 },
    { id: 3, time: '16:00 - 18:00', title: 'Sunset League Slot', status: 'price', price: 2500 },
    { id: 4, time: '18:00 - 20:00', title: 'Floodlight Prime Match', status: 'available', price: 4000 },
  ])

  // Ground facility inventory
  const [inventory, setInventory] = useState([
    { id: 'roller', name: 'Pitch Roller (Heavy & Light)', status: 'READY', badge: 'green' },
    { id: 'stumps', name: 'Electronic Stumps', status: '12 UNITS', badge: 'cyan' },
    { id: 'nets', name: 'Practice Nets (A, B, C, D)', status: 'GOOD', badge: 'gold' },
    { id: 'lights', name: 'Flood Lights', status: 'ACTIVE', badge: 'green' },
    { id: 'staff', name: 'Ground Staff on Duty', status: '8 PRESENT', badge: 'green' },
  ])

  // Staff salary roster
  const [staffRoster, setStaffRoster] = useState([
    { id: 1, name: 'Murugan S.', role: 'Head Curator', salary: 28000, status: 'DISBURSED' },
    { id: 2, name: 'Rajesh K.', role: 'Ground Superintendent', salary: 32000, status: 'DISBURSED' },
    { id: 3, name: 'Sundar V.', role: 'Floodlight Technician', salary: 22000, status: 'DISBURSED' },
    { id: 4, name: 'Karthik R.', role: 'Net & Pitch Caretaker', salary: 18000, status: 'PENDING' },
  ])

  const triggerToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 3000)
  }

  // Feature 14 Systems: Ground & Stadium Management System (Multi-Venue Operations)
  const stadiumSystems = [
    { id: 1, title: 'Multi-Ground & Stadium Management', short: 'Multi-Ground' },
    { id: 2, title: 'Central Staff Management', short: 'Central Staff' },
    { id: 3, title: 'Staff Attendance & Shift Management', short: 'Shifts & Attendance' },
    { id: 4, title: 'Staff Salary & Payroll System', short: 'Salary & Payroll' },
    { id: 5, title: 'Revenue Collection System', short: 'Revenue Collection' },
    { id: 6, title: 'Expense Management System', short: 'Expense Mgmt' },
    { id: 7, title: 'Profit & Loss Calculation System', short: 'Profit & Loss' },
    { id: 8, title: 'Stadium Event & Match Management', short: 'Event & Match' },
    { id: 9, title: 'Real-Time Dashboard Monitoring', short: 'Real-Time Dashboard' },
    { id: 10, title: 'Financial Reports & Audit System', short: 'Reports & Audit' },
    { id: 11, title: 'Asset & Equipment Management System', short: 'Asset & Equipment' },
    { id: 12, title: 'Role-Based Access Control System', short: 'Access Control' },
  ]

  // Feature 13 Systems: Ground Slot Booking & Scheduling
  const slotSystems = [
    { id: 1, title: 'Ground Registration & Setup', short: 'Ground Setup' },
    { id: 2, title: 'Time Slot Booking', short: 'Slot Booking' },
    { id: 3, title: 'Dual Module System', short: 'Dual Module' },
    { id: 4, title: 'Team A vs Team B Match Slot', short: 'Match Slots' },
    { id: 5, title: 'Slot Pricing System', short: 'Slot Pricing' },
    { id: 6, title: 'Income & Fund Management', short: 'Income & Funds' },
    { id: 7, title: 'Expenditure Tracking', short: 'Expenditure' },
    { id: 8, title: 'Monthly Account Sheet & Download', short: 'Account Sheet' },
    { id: 9, title: 'Ground Staff Attendance', short: 'Staff Attendance' },
    { id: 10, title: 'Staff Salary Management', short: 'Staff Salary' },
    { id: 11, title: 'Equipment Stock Register', short: 'Equipment Stock' },
    { id: 12, title: 'Contact Management', short: 'Contact Directory' },
  ]

  const activeSystemsList = opsMode === 'stadium' ? stadiumSystems : slotSystems
  const curSystem = activeSystemsList.find((s) => s.id === activeSystem) || activeSystemsList[0]

  return (
    <Screen
      back
      title={opsMode === 'stadium' ? 'Stadium Management' : 'Ground Slot Booking'}
      subtitle={opsMode === 'stadium' ? 'Multi-Venue Operations & Staff Controls' : 'Stadium Operations & Slot Management'}
    >
      <div className="ground-ops-container">
        {/* Top Operations Mode Selector (Feature 14 vs Feature 13) */}
        <div className="sh-seg" style={{ marginBottom: 4 }}>
          <button
            type="button"
            className={`sh-seg-btn ${opsMode === 'stadium' ? 'is-active' : ''}`}
            onClick={() => {
              setOpsMode('stadium')
              setActiveSystem(1)
            }}
          >
            🏟️ Stadium & Multi-Venue Operations (12 Systems)
          </button>
          <button
            type="button"
            className={`sh-seg-btn ${opsMode === 'slots' ? 'is-active' : ''}`}
            onClick={() => {
              setOpsMode('slots')
              setActiveSystem(1)
            }}
          >
            📅 Ground Slot Booking (12 Systems)
          </button>
        </div>

        {toastMsg && (
          <div className="match-tools-toast" style={{ margin: '0 0 4px' }}>
            <CheckCircle2 size={16} color="#00e676" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* 12 Systems Selector Ribbon */}
        <div className="academy-ops-ribbon">
          {activeSystemsList.map((sys) => (
            <button
              key={sys.id}
              type="button"
              className={`ops-ribbon-btn ${activeSystem === sys.id ? 'is-active' : ''}`}
              onClick={() => setActiveSystem(sys.id)}
            >
              <span className="ops-num-badge">{sys.id}</span>
              <span>{sys.short}</span>
            </button>
          ))}
        </div>

        {/* Phone Mockup Screen */}
        <div className="ground-screen-card">
          {/* Top Bar inside Screen */}
          <div className="phone-top-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #ff3b50, #b0211a)',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: 13,
                }}
              >
                {activeSystem}
              </div>
              <div>
                <h2 className="phone-system-title">{curSystem.title}</h2>
                <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>
                  {opsMode === 'stadium' ? 'Multi-Venue Infrastructure Hub' : 'Stadium & Turf Operations'}
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                className="icon-btn"
                style={{ width: 32, height: 32 }}
                disabled={activeSystem === 1}
                onClick={() => setActiveSystem((s) => Math.max(1, s - 1))}
                title="Previous"
              >
                ‹
              </button>
              <button
                className="icon-btn"
                style={{ width: 32, height: 32 }}
                disabled={activeSystem === 12}
                onClick={() => setActiveSystem((s) => Math.min(12, s + 1))}
                title="Next"
              >
                ›
              </button>
            </div>
          </div>

          {/* SCREEN 1: Multi-Ground or Ground Setup */}
          {activeSystem === 1 && (
            <div className="ground-stadium-card">
              <svg className="stadium-illustration-arc" viewBox="0 0 100 60" fill="none">
                <path d="M10 45 C10 15, 90 15, 90 45" stroke="#ffc83d" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M22 45 C22 26, 78 26, 78 45" stroke="rgba(255, 200, 61, 0.4)" strokeWidth="2" strokeDasharray="4 3" />
                <rect x="44" y="32" width="12" height="18" fill="#3de0ff" rx="2" />
              </svg>

              <h3 className="ground-name-title">SH SPORTS GROUND</h3>

              <div className="ground-stats-4col">
                <div className="ground-stat-pill-box">
                  <div className="ground-stat-val">3</div>
                  <div className="ground-stat-lbl">GROUNDS</div>
                </div>
                <div className="ground-stat-pill-box">
                  <div className="ground-stat-val">8</div>
                  <div className="ground-stat-lbl">STAFF</div>
                </div>
                <div className="ground-stat-pill-box">
                  <div className="ground-stat-val" style={{ color: '#ffc83d' }}>₹2.5K</div>
                  <div className="ground-stat-lbl">SLOT</div>
                </div>
                <div className="ground-stat-pill-box">
                  <div className="ground-stat-val" style={{ color: '#00e676' }}>92%</div>
                  <div className="ground-stat-lbl">UTILISATION</div>
                </div>
              </div>

              <div className="ground-status-text">● LIVE OPERATION STATUS: HEALTHY</div>

              <button
                type="button"
                className="ground-red-cta-btn"
                onClick={() => triggerToast('Ground facility status verified & operational!')}
              >
                CONFIRM / VIEW DETAILS
              </button>
            </div>
          )}

          {/* SCREEN 2: Central Staff or Time Slot Booking */}
          {activeSystem === 2 && (
            opsMode === 'stadium' ? (
              <div className="ops-inner-card">
                <h3 className="ops-inner-card-title">Central Staff Management</h3>
                <div className="ops-item-list">
                  {inventory.map((item) => (
                    <div key={item.id} className="ops-item-row">
                      <span className="ops-item-name">{item.name}</span>
                      <span
                        style={{
                          fontWeight: 800,
                          fontSize: 12,
                          color: item.badge === 'green' ? '#00e676' : item.badge === 'cyan' ? '#3de0ff' : '#ffc83d',
                        }}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="ground-red-cta-btn"
                  onClick={() => triggerToast('Central staff roster across 3 grounds synchronized!')}
                >
                  CONFIRM / VIEW DETAILS
                </button>
              </div>
            ) : (
              <div className="ops-inner-card">
                <h3 className="ops-inner-card-title">Time Slot Booking</h3>
                <div className="ground-calendar-widget">
                  <div className="ground-calendar-header">
                    <span className="ground-calendar-month">JULY 2026</span>
                    <span className="pill" style={{ fontSize: 9 }}>MATCH DAY</span>
                  </div>
                  <div className="ground-days-header-row">
                    <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
                  </div>
                  <div className="ground-days-grid">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28].map((day) => (
                      <button
                        key={day}
                        type="button"
                        className={`ground-day-btn ${selectedDay === day ? 'is-selected' : ''} ${day % 7 === 0 || day % 7 === 6 ? 'is-weekend' : ''} ${day === 12 || day === 19 ? 'has-match' : ''}`}
                        onClick={() => setSelectedDay(day)}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="ground-slots-list">
                  {slots.map((slot) => (
                    <div
                      key={slot.id}
                      className="ground-slot-card"
                      onClick={() => triggerToast(`Selected ${slot.time} for July ${selectedDay}`)}
                    >
                      <span className="ground-slot-time">{slot.time}</span>
                      <span className={`ground-slot-pill ${slot.status === 'available' ? 'is-avail' : slot.status === 'booked' ? 'is-booked' : 'is-price'}`}>
                        {slot.status === 'available' ? 'AVAILABLE' : slot.status === 'booked' ? 'BOOKED' : `₹ ${slot.price.toLocaleString('en-IN')}`}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="ground-red-cta-btn"
                  onClick={() => triggerToast(`Slot booking confirmed for July ${selectedDay}, 2026!`)}
                >
                  CONFIRM / VIEW DETAILS
                </button>
              </div>
            )
          )}

          {/* SCREEN 3: Staff Attendance & Shifts or Dual Module */}
          {activeSystem === 3 && (
            <div className="ground-stadium-card">
              <div className="sh-seg" style={{ width: '100%', marginBottom: 6 }}>
                <button
                  type="button"
                  className={`sh-seg-btn ${dualModuleTab === 'booking' ? 'is-active' : ''}`}
                  onClick={() => setDualModuleTab('booking')}
                >
                  📅 Booking Module
                </button>
                <button
                  type="button"
                  className={`sh-seg-btn ${dualModuleTab === 'accounts' ? 'is-active' : ''}`}
                  onClick={() => setDualModuleTab('accounts')}
                >
                  💰 Accounts Module
                </button>
              </div>

              <svg className="stadium-illustration-arc" viewBox="0 0 100 60" fill="none">
                <path d="M10 45 C10 15, 90 15, 90 45" stroke="#ffc83d" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M22 45 C22 26, 78 26, 78 45" stroke="rgba(255, 200, 61, 0.4)" strokeWidth="2" strokeDasharray="4 3" />
                <rect x="44" y="32" width="12" height="18" fill="#3de0ff" rx="2" />
              </svg>

              <h3 className="ground-name-title">SH SPORTS GROUND</h3>

              <div className="ground-stats-4col">
                <div className="ground-stat-pill-box">
                  <div className="ground-stat-val">3</div>
                  <div className="ground-stat-lbl">GROUNDS</div>
                </div>
                <div className="ground-stat-pill-box">
                  <div className="ground-stat-val">8</div>
                  <div className="ground-stat-lbl">STAFF</div>
                </div>
                <div className="ground-stat-pill-box">
                  <div className="ground-stat-val" style={{ color: '#ffc83d' }}>₹2.5K</div>
                  <div className="ground-stat-lbl">SLOT</div>
                </div>
                <div className="ground-stat-pill-box">
                  <div className="ground-stat-val" style={{ color: '#00e676' }}>92%</div>
                  <div className="ground-stat-lbl">UTILISATION</div>
                </div>
              </div>

              <div className="ground-status-text">
                {dualModuleTab === 'booking' ? '● LIVE OPERATION STATUS: HEALTHY' : '● FINANCIAL LEDGER: SYNCHRONIZED'}
              </div>

              <button
                type="button"
                className="ground-red-cta-btn"
                onClick={() => triggerToast(`Dual module synchronized: ${dualModuleTab.toUpperCase()} updated!`)}
              >
                CONFIRM / VIEW DETAILS
              </button>
            </div>
          )}

          {/* SCREEN 4: Staff Salary & Payroll or Team Match Slot */}
          {activeSystem === 4 && (
            opsMode === 'stadium' ? (
              <div className="ops-inner-card">
                <h3 className="ops-inner-card-title">Staff Salary & Payroll</h3>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--muted)', letterSpacing: 0.8 }}>THIS MONTH</span>
                  <div className="ops-big-currency">₹ 8,42,600</div>
                </div>

                <div className="ops-financial-grid">
                  <div className="ops-fin-row">
                    <span className="ops-fin-label">Bookings / Events</span>
                    <span className="ops-fin-val" style={{ color: '#00e676' }}>₹ 10,75,000</span>
                  </div>
                  <div className="ops-fin-row">
                    <span className="ops-fin-label">Staff / Maintenance</span>
                    <span className="ops-fin-val is-red">₹ 2,32,400</span>
                  </div>
                  <div className="ops-fin-row">
                    <span className="ops-fin-label">Net Balance</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <TrendingUp size={16} color="#3de0ff" />
                      <span className="ops-fin-val">₹ 8,42,600</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="ground-red-cta-btn"
                  onClick={() => triggerToast('Staff salary and payroll ledger audited!')}
                >
                  CONFIRM / VIEW DETAILS
                </button>
              </div>
            ) : (
              <div className="ops-inner-card">
                <h3 className="ops-inner-card-title">Team A vs Team B Match Slot</h3>
                <div className="ground-calendar-widget">
                  <div className="ground-calendar-header">
                    <span className="ground-calendar-month">JULY 2026</span>
                    <span className="pill" style={{ background: 'rgba(255,59,80,0.18)', color: '#ff3b50', border: '1px solid #ff3b50', fontSize: 9 }}>
                      RIVALRY FIXTURE
                    </span>
                  </div>
                  <div className="ground-days-header-row">
                    <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
                  </div>
                  <div className="ground-days-grid">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28].map((day) => (
                      <button
                        key={day}
                        type="button"
                        className={`ground-day-btn ${selectedDay === day ? 'is-selected' : ''} ${day === 12 || day === 19 ? 'has-match' : ''}`}
                        onClick={() => setSelectedDay(day)}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="ground-slots-list">
                  <div className="ground-slot-card">
                    <div>
                      <span className="ground-slot-time">06:00 - 08:00</span>
                      <div style={{ fontSize: 11, color: 'var(--muted)' }}>Pitch 1 Practice</div>
                    </div>
                    <span className="ground-slot-pill is-avail">AVAILABLE</span>
                  </div>
                  <div className="ground-slot-card" style={{ borderColor: 'var(--sh-ac)' }}>
                    <div>
                      <span className="ground-slot-time">08:00 - 10:00</span>
                      <div style={{ fontSize: 11, color: '#ffc83d', fontWeight: 800 }}>Scoring XI vs Warriors XI (T20 Cup)</div>
                    </div>
                    <span className="ground-slot-pill is-booked">BOOKED</span>
                  </div>
                  <div className="ground-slot-card">
                    <div>
                      <span className="ground-slot-time">16:00 - 18:00</span>
                      <div style={{ fontSize: 11, color: 'var(--muted)' }}>Open Match Challenge</div>
                    </div>
                    <span className="ground-slot-pill is-price">₹ 2,500</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="ground-red-cta-btn"
                  onClick={() => triggerToast('Team fixture scheduled on Center Turf!')}
                >
                  CONFIRM / VIEW DETAILS
                </button>
              </div>
            )
          )}

          {/* SCREEN 5: Revenue Collection or Slot Pricing */}
          {activeSystem === 5 && (
            <div className="ops-inner-card">
              <h3 className="ops-inner-card-title">{opsMode === 'stadium' ? 'Revenue Collection' : 'Slot Pricing'}</h3>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--muted)', letterSpacing: 0.8 }}>THIS MONTH</span>
                <div className="ops-big-currency">₹ 8,42,600</div>
              </div>

              <div className="ops-financial-grid">
                <div className="ops-fin-row">
                  <span className="ops-fin-label">Bookings / Events</span>
                  <span className="ops-fin-val" style={{ color: '#00e676' }}>₹ 10,75,000</span>
                </div>
                <div className="ops-fin-row">
                  <span className="ops-fin-label">Staff / Maintenance</span>
                  <span className="ops-fin-val is-red">₹ 2,32,400</span>
                </div>
                <div className="ops-fin-row">
                  <span className="ops-fin-label">Net Balance</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <TrendingUp size={16} color="#3de0ff" />
                    <span className="ops-fin-val">₹ 8,42,600</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="ground-red-cta-btn"
                onClick={() => triggerToast('Revenue collection verified across multiple venues!')}
              >
                CONFIRM / VIEW DETAILS
              </button>
            </div>
          )}

          {/* SCREEN 6: Expense Management or Income & Funds */}
          {activeSystem === 6 && (
            <div className="ops-inner-card">
              <h3 className="ops-inner-card-title">{opsMode === 'stadium' ? 'Expense Management' : 'Income & Fund'}</h3>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--muted)', letterSpacing: 0.8 }}>THIS MONTH</span>
                <div className="ops-big-currency">₹ 8,42,600</div>
              </div>

              <div className="ops-financial-grid">
                <div className="ops-fin-row">
                  <span className="ops-fin-label">Bookings / Events</span>
                  <span className="ops-fin-val" style={{ color: '#00e676' }}>₹ 10,75,000</span>
                </div>
                <div className="ops-fin-row">
                  <span className="ops-fin-label">Staff / Maintenance</span>
                  <span className="ops-fin-val is-red">₹ 2,32,400</span>
                </div>
                <div className="ops-fin-row">
                  <span className="ops-fin-label">Net Balance</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <TrendingUp size={16} color="#3de0ff" />
                    <span className="ops-fin-val">₹ 8,42,600</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="ground-red-cta-btn"
                onClick={() => triggerToast('Financial ledgers verified!')}
              >
                CONFIRM / VIEW DETAILS
              </button>
            </div>
          )}

          {/* SCREEN 7: Profit & Loss Calculation or Expenditure */}
          {activeSystem === 7 && (
            <div className="ground-stadium-card">
              <svg className="stadium-illustration-arc" viewBox="0 0 100 60" fill="none">
                <path d="M10 45 C10 15, 90 15, 90 45" stroke="#ffc83d" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M22 45 C22 26, 78 26, 78 45" stroke="rgba(255, 200, 61, 0.4)" strokeWidth="2" strokeDasharray="4 3" />
                <rect x="44" y="32" width="12" height="18" fill="#00e676" rx="2" />
              </svg>

              <h3 className="ground-name-title">SH SPORTS GROUND</h3>

              <div className="ground-stats-4col">
                <div className="ground-stat-pill-box">
                  <div className="ground-stat-val">3</div>
                  <div className="ground-stat-lbl">GROUNDS</div>
                </div>
                <div className="ground-stat-pill-box">
                  <div className="ground-stat-val">8</div>
                  <div className="ground-stat-lbl">STAFF</div>
                </div>
                <div className="ground-stat-pill-box">
                  <div className="ground-stat-val" style={{ color: '#ffc83d' }}>₹2.5K</div>
                  <div className="ground-stat-lbl">SLOT</div>
                </div>
                <div className="ground-stat-pill-box">
                  <div className="ground-stat-val" style={{ color: '#00e676' }}>92%</div>
                  <div className="ground-stat-lbl">UTILISATION</div>
                </div>
              </div>

              <div className="ground-status-text">● NET PROFIT ACCRUAL: +78.3% (HEALTHY)</div>

              <button
                type="button"
                className="ground-red-cta-btn"
                onClick={() => triggerToast('Profit & loss statement calculated & verified!')}
              >
                CONFIRM / VIEW DETAILS
              </button>
            </div>
          )}

          {/* SCREEN 8: Stadium Event & Match or Monthly Account Sheet */}
          {activeSystem === 8 && (
            <div className="ops-inner-card">
              <h3 className="ops-inner-card-title">{opsMode === 'stadium' ? 'Stadium Event & Match' : 'Monthly Account Sheet & Download'}</h3>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--muted)', letterSpacing: 0.8 }}>THIS MONTH</span>
                <div className="ops-big-currency">₹ 8,42,600</div>
              </div>

              <div className="ops-financial-grid">
                <div className="ops-fin-row">
                  <span className="ops-fin-label">Bookings / Events</span>
                  <span className="ops-fin-val" style={{ color: '#00e676' }}>₹ 10,75,000</span>
                </div>
                <div className="ops-fin-row">
                  <span className="ops-fin-label">Staff / Maintenance</span>
                  <span className="ops-fin-val is-red">₹ 2,32,400</span>
                </div>
                <div className="ops-fin-row">
                  <span className="ops-fin-label">Net Balance</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <TrendingUp size={16} color="#3de0ff" />
                    <span className="ops-fin-val">₹ 8,42,600</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                <button
                  type="button"
                  className="btn btn--outline btn--sm"
                  style={{ flex: 1 }}
                  onClick={() => triggerToast('Monthly statement downloaded as PDF!')}
                >
                  <Download size={14} /> Download PDF
                </button>
                <button
                  type="button"
                  className="btn btn--outline btn--sm"
                  style={{ flex: 1 }}
                  onClick={() => triggerToast('Financial report exported to Excel!')}
                >
                  <FileText size={14} /> Export Excel
                </button>
              </div>

              <button
                type="button"
                className="ground-red-cta-btn"
                onClick={() => triggerToast('Monthly accounting verified and archived!')}
              >
                CONFIRM / VIEW DETAILS
              </button>
            </div>
          )}

          {/* SCREEN 9: Real-Time Dashboard or Staff Attendance */}
          {activeSystem === 9 && (
            <div className="ground-stadium-card">
              <svg className="stadium-illustration-arc" viewBox="0 0 100 60" fill="none">
                <path d="M10 45 C10 15, 90 15, 90 45" stroke="#ffc83d" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M22 45 C22 26, 78 26, 78 45" stroke="rgba(255, 200, 61, 0.4)" strokeWidth="2" strokeDasharray="4 3" />
                <rect x="44" y="32" width="12" height="18" fill="#3de0ff" rx="2" />
              </svg>

              <h3 className="ground-name-title">SH SPORTS GROUND</h3>

              <div className="ground-stats-4col">
                <div className="ground-stat-pill-box">
                  <div className="ground-stat-val">3</div>
                  <div className="ground-stat-lbl">GROUNDS</div>
                </div>
                <div className="ground-stat-pill-box">
                  <div className="ground-stat-val">8</div>
                  <div className="ground-stat-lbl">STAFF</div>
                </div>
                <div className="ground-stat-pill-box">
                  <div className="ground-stat-val" style={{ color: '#ffc83d' }}>₹2.5K</div>
                  <div className="ground-stat-lbl">SLOT</div>
                </div>
                <div className="ground-stat-pill-box">
                  <div className="ground-stat-val" style={{ color: '#00e676' }}>92%</div>
                  <div className="ground-stat-lbl">UTILISATION</div>
                </div>
              </div>

              <div className="ground-status-text">● LIVE OPERATION STATUS: HEALTHY</div>

              <button
                type="button"
                className="ground-red-cta-btn"
                onClick={() => triggerToast('Real-time stadium telemetry refreshed!')}
              >
                CONFIRM / VIEW DETAILS
              </button>
            </div>
          )}

          {/* SCREEN 10: Financial Reports & Audit or Staff Salary */}
          {activeSystem === 10 && (
            <div className="ops-inner-card">
              <h3 className="ops-inner-card-title">{opsMode === 'stadium' ? 'Financial Reports & Audit' : 'Staff Salary'}</h3>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--muted)', letterSpacing: 0.8 }}>THIS MONTH</span>
                <div className="ops-big-currency">₹ 8,42,600</div>
              </div>

              <div className="ops-financial-grid">
                <div className="ops-fin-row">
                  <span className="ops-fin-label">Bookings / Events</span>
                  <span className="ops-fin-val" style={{ color: '#00e676' }}>₹ 10,75,000</span>
                </div>
                <div className="ops-fin-row">
                  <span className="ops-fin-label">Staff / Maintenance</span>
                  <span className="ops-fin-val is-red">₹ 2,32,400</span>
                </div>
                <div className="ops-fin-row">
                  <span className="ops-fin-label">Net Balance</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <TrendingUp size={16} color="#3de0ff" />
                    <span className="ops-fin-val">₹ 8,42,600</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="ground-red-cta-btn"
                onClick={() => triggerToast('Financial audit compliance certified!')}
              >
                CONFIRM / VIEW DETAILS
              </button>
            </div>
          )}

          {/* SCREEN 11: Asset & Equipment Management */}
          {activeSystem === 11 && (
            <div className="ops-inner-card">
              <h3 className="ops-inner-card-title">Asset & Equipment</h3>
              <div className="ops-item-list">
                {inventory.map((item) => (
                  <div key={item.id} className="ops-item-row">
                    <span className="ops-item-name">{item.name}</span>
                    <span
                      style={{
                        fontWeight: 800,
                        fontSize: 12,
                        color: item.badge === 'green' ? '#00e676' : item.badge === 'cyan' ? '#3de0ff' : '#ffc83d',
                      }}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="ground-red-cta-btn"
                onClick={() => triggerToast('Asset condition & equipment stock verified!')}
              >
                CONFIRM / VIEW DETAILS
              </button>
            </div>
          )}

          {/* SCREEN 12: Role-Based Access Control System (Feature 14 Screen 12) or Contact */}
          {activeSystem === 12 && (
            opsMode === 'stadium' ? (
              <div className="security-check-card">
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255, 200, 61, 0.15)', display: 'grid', placeItems: 'center' }}>
                  <Lock size={24} color="#ffc83d" />
                </div>

                <div style={{ fontSize: 13, fontWeight: 800, color: '#ffc83d', letterSpacing: 1.2 }}>
                  SECURE IDENTITY CHECK
                </div>

                <div className="security-masked-id">XXXX-XXXX-9012</div>

                <div className="security-points-list">
                  <div className="security-point-item">
                    <CheckCircle2 size={16} color="#00e676" />
                    <span>Prevent fake accounts</span>
                  </div>
                  <div className="security-point-item">
                    <CheckCircle2 size={16} color="#00e676" />
                    <span>Ensure fair play</span>
                  </div>
                  <div className="security-point-item">
                    <CheckCircle2 size={16} color="#00e676" />
                    <span>Protect personal data</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="ground-red-cta-btn"
                  onClick={() => navigate('/app/stats')}
                >
                  VIEW TRUST STATUS
                </button>
              </div>
            ) : (
              <div className="ops-inner-card">
                <h3 className="ops-inner-card-title">Contact Management</h3>
                <div className="ops-item-list">
                  {inventory.map((item) => (
                    <div key={item.id} className="ops-item-row">
                      <span className="ops-item-name">{item.name}</span>
                      <span style={{ fontWeight: 800, fontSize: 12, color: item.badge === 'green' ? '#00e676' : '#3de0ff' }}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="ground-red-cta-btn"
                  onClick={() => triggerToast('Emergency and staff contact list verified!')}
                >
                  CONFIRM / VIEW DETAILS
                </button>
              </div>
            )
          )}
        </div>

        {/* 12 Systems Directory Matrix */}
        <div style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#ffc83d', letterSpacing: 0.8 }}>
              {opsMode === 'stadium' ? 'STADIUM OPERATIONS DIRECTORY' : 'GROUND OPERATIONS DIRECTORY'}
            </span>
            <span className="pill" style={{ fontSize: 9 }}>12 SYSTEMS</span>
          </div>

          <div className="ops-overview-10-grid">
            {activeSystemsList.map((sys) => (
              <button
                key={sys.id}
                type="button"
                className="ops-overview-tile"
                style={activeSystem === sys.id ? { borderColor: '#ff3b50', background: '#12266a' } : {}}
                onClick={() => {
                  setActiveSystem(sys.id)
                  window.scrollTo({ top: 120, behavior: 'smooth' })
                }}
              >
                <div className={`ops-overview-num-pill ${sys.id % 2 === 0 ? 'is-blue' : ''}`}>
                  {sys.id}
                </div>
                <span className="ops-overview-text">{sys.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Screen>
  )
}
