import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  GraduationCap,
  Users,
  CreditCard,
  UserPlus,
  Send,
  Calendar,
  Layers,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ShoppingBag,
  Trophy,
  Milestone,
} from 'lucide-react'

export default function AcademyDashboard({ user }) {
  const navigate = useNavigate()
  const details = user?.roleDetails || {}

  const [reminderSent, setReminderSent] = useState(false)
  const [activeTab, setActiveTab] = useState('all')

  const students = [
    { id: 1, name: 'Rohit Sharma', batch: 'U19 Morning', dues: 'Paid', amount: '₹3,000' },
    { id: 2, name: 'Kavya Raman', batch: 'U16 Evening', dues: 'Paid', amount: '₹3,000' },
    { id: 3, name: 'Aditya Sen', batch: 'U19 Morning', dues: 'Overdue', amount: '₹3,000' },
    { id: 4, name: 'Arjun Das', batch: 'Weekend Grassroots', dues: 'Overdue', amount: '₹2,500' },
  ]

  function sendFeeReminders() {
    setReminderSent(true)
    setTimeout(() => setReminderSent(false), 3000)
  }

  const filteredStudents =
    activeTab === 'overdue' ? students.filter((s) => s.dues === 'Overdue') : students

  return (
    <div className="sh-dashboard-layout">
      {/* Academy Hero Header */}
      <section className="sh-dash-hero-card sh-dash-hero-card--academy">
        <div className="sh-dash-hero-top">
          <div className="sh-dash-avatar-box">
            <div className="sh-avatar-hex" style={{ background: 'rgba(124, 77, 255, 0.2)', borderColor: '#7c4dff' }}>
              <GraduationCap size={24} color="#7c4dff" />
            </div>
            <div>
              <div className="sh-dash-hero-title-row">
                <h2>{details.academyName || 'Scoring Heroes Elite Academy'}</h2>
                <span className="sh-badge-chip" style={{ color: '#7c4dff', borderColor: '#7c4dff55' }}>
                  AFFILIATED
                </span>
              </div>
              <p className="sh-dash-hero-sub">
                Director: <strong>{user.nickname}</strong> • Reg: {details.regNumber || 'TN-SPO-2023-771'}
              </p>
              <small style={{ color: 'var(--muted)', fontSize: 11 }}>
                Location: {user.city} • 4 Turf Nets • 2 Astro Pitches
              </small>
            </div>
          </div>

          <div className="sh-dash-stat-pill" style={{ borderColor: '#7c4dff55' }}>
            <strong style={{ color: '#7c4dff' }}>{details.totalStudents || 128}</strong>
            <span>STUDENTS</span>
          </div>
        </div>

        {/* Finance & Accounts Quick Bar */}
        <div className="sh-player-stats-bar" style={{ marginTop: 14 }}>
          <div className="sh-stat-box">
            <strong style={{ color: '#00e676' }}>{details.monthlyFeesCollected || '₹3.84L'}</strong>
            <span>Fees Collected</span>
          </div>
          <div className="sh-stat-box">
            <strong style={{ color: '#ff2d3a' }}>{details.pendingFees || '₹42,000'}</strong>
            <span>Pending Dues</span>
          </div>
          <div className="sh-stat-box">
            <strong>{details.activeCoaches || 6}</strong>
            <span>Staff Coaches</span>
          </div>
          <div className="sh-stat-box">
            <strong>14</strong>
            <span>New Admissions</span>
          </div>
        </div>
      </section>

      {/* Direct Operational Access Bar */}
      <section
        style={{
          marginTop: 12,
          marginBottom: 12,
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
              background: 'rgba(124, 77, 255, 0.12)',
              border: '1px solid rgba(124, 77, 255, 0.3)',
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
            onClick={() => navigate('/app/academy?tab=students')}
          >
            <span style={{ fontSize: 18 }}>👥</span>
            <span style={{ color: '#7c4dff' }}>Student Batches</span>
          </button>

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
            onClick={() => navigate('/app/academy?tab=attendance')}
          >
            <span style={{ fontSize: 18 }}>📋</span>
            <span style={{ color: '#00b0ff' }}>Attendance & Drills</span>
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
            onClick={() => navigate('/app/academy?tab=fees')}
          >
            <span style={{ fontSize: 18 }}>💳</span>
            <span style={{ color: '#00e676' }}>Fee Collection</span>
          </button>
        </div>
      </section>

      {/* Quick Action Shortcuts */}
      <div className="sh-quick-actions-grid">
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/academy?tab=students')}>
          <div className="sh-action-icon" style={{ background: 'rgba(124,77,255,0.15)', color: '#7c4dff' }}>
            <Users size={18} />
          </div>
          <span>Student Batches</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/grounds')}>
          <div className="sh-action-icon" style={{ background: 'rgba(0,176,255,0.15)', color: '#00b0ff' }}>
            <Layers size={18} />
          </div>
          <span>Net Pitches</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/marketplace')}>
          <div className="sh-action-icon" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676' }}>
            <ShoppingBag size={18} />
          </div>
          <span>Wholesale Kits</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/ticketing')}>
          <div className="sh-action-icon" style={{ background: 'rgba(255,145,0,0.15)', color: '#ff9100' }}>
            <Trophy size={18} />
          </div>
          <span>Tournaments</span>
        </button>
      </div>

      {/* Accounts & Fee Management (Core requirement) */}
      <section className="panel" style={{ padding: '14px 16px' }}>
        <header style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <CreditCard size={18} color="#7c4dff" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Accounts & Fee Collection</h3>
          </div>
          <span className="pill" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676' }}>
            OCTOBER 2026
          </span>
        </header>

        <div style={{ background: 'rgba(255,255,255,0.02)', padding: 12, borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>COLLECTION EFFICIENCY</span>
              <strong style={{ fontSize: 18, color: '#f4f7ff', display: 'block' }}>90.2%</strong>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: 11, color: '#ff2d3a' }}>8 Students Pending</span>
              <strong style={{ fontSize: 14, color: '#ff2d3a', display: 'block' }}>₹42,000 Overdue</strong>
            </div>
          </div>

          <div className="sh-progress-track" style={{ margin: '10px 0' }}>
            <div className="sh-progress-fill" style={{ width: '90.2%', background: 'linear-gradient(90deg, #7c4dff, #00e676)' }} />
          </div>

          {reminderSent ? (
            <div style={{ padding: 8, background: 'rgba(0,230,118,0.15)', color: '#00e676', borderRadius: 8, fontSize: 12, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <CheckCircle2 size={14} /> SMS & WhatsApp Fee Reminders dispatched to overdue students!
            </div>
          ) : (
            <button
              type="button"
              className="btn btn--secondary btn--sm"
              style={{ width: '100%', marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              onClick={sendFeeReminders}
            >
              <Send size={13} /> Send 1-Tap Payment Reminder Link (WhatsApp)
            </button>
          )}
        </div>
      </section>

      {/* Student Roster Snapshot with 1-tap Payment collection */}
      <section className="panel" style={{ padding: '14px 16px' }}>
        <header style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Users size={17} color="#3de0ff" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Enrolled Trainees & Dues</h3>
          </div>
          <button type="button" className="text-link" onClick={() => navigate('/app/academy')}>
            Student Portal →
          </button>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {filteredStudents.map((s) => (
            <div
              key={s.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 10px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div>
                <strong style={{ fontSize: 13 }}>{s.name}</strong>
                <small style={{ display: 'block', color: 'var(--muted)', fontSize: 11 }}>{s.batch}</small>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span
                  className="pill"
                  style={{
                    background: s.dues === 'Paid' ? 'rgba(0,230,118,0.15)' : 'rgba(255,45,58,0.15)',
                    color: s.dues === 'Paid' ? '#00e676' : '#ff2d3a',
                    fontSize: 10,
                  }}
                >
                  {s.dues.toUpperCase()} ({s.amount})
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Turf Nets & Pitch Slot Allocation (Grounds Allotment) */}
      <section className="panel" style={{ padding: '14px 16px' }}>
        <header style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Layers size={17} color="#00b0ff" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Turf Nets & Grounds Allocation</h3>
          </div>
          <button type="button" className="text-link" onClick={() => navigate('/app/grounds')}>
            Reserve Pitch →
          </button>
        </header>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginBottom: 8 }}>
          <div style={{ padding: 8, background: 'rgba(0,176,255,0.06)', borderRadius: 8, border: '1px solid rgba(0,176,255,0.2)', textAlign: 'center' }}>
            <span style={{ fontSize: 10, color: 'var(--muted)', display: 'block' }}>NET 1 (PACE)</span>
            <strong style={{ fontSize: 11, color: '#00b0ff' }}>Morning 6-9 AM</strong>
          </div>
          <div style={{ padding: 8, background: 'rgba(0,176,255,0.06)', borderRadius: 8, border: '1px solid rgba(0,176,255,0.2)', textAlign: 'center' }}>
            <span style={{ fontSize: 10, color: 'var(--muted)', display: 'block' }}>NET 2 (SPIN)</span>
            <strong style={{ fontSize: 11, color: '#00b0ff' }}>Morning 6-9 AM</strong>
          </div>
          <div style={{ padding: 8, background: 'rgba(0,230,118,0.06)', borderRadius: 8, border: '1px solid rgba(0,230,118,0.2)', textAlign: 'center' }}>
            <span style={{ fontSize: 10, color: 'var(--muted)', display: 'block' }}>MAIN ARENA</span>
            <strong style={{ fontSize: 11, color: '#00e676' }}>Evening Match</strong>
          </div>
        </div>
      </section>

      {/* Wholesale Equipment & Kit Procurement Allotment */}
      <section className="panel" style={{ padding: '14px 16px' }}>
        <header style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <ShoppingBag size={17} color="#ffc83d" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Bulk Gear Procurement (Wholesale)</h3>
          </div>
          <button type="button" className="text-link" onClick={() => navigate('/app/marketplace')}>
            B2B Store →
          </button>
        </header>
        <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 10px' }}>
          Direct factory rates for cricket balls, training cones, team bibs, and academy kit bags.
        </p>
        <button
          type="button"
          className="btn btn--secondary btn--sm"
          style={{ width: '100%' }}
          onClick={() => navigate('/app/marketplace')}
        >
          📦 Open Academy Wholesale Catalog
        </button>
      </section>
    </div>
  )
}
