import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Flame,
  CheckCircle,
  XCircle,
  ClipboardList,
  UserCheck,
  Calendar,
  MessageSquare,
  Award,
  Activity,
  Plus,
  Shield,
  Video,
  Bot,
  Send,
  Users,
  DollarSign,
  PlaySquare,
  ChevronRight,
  Trophy,
} from 'lucide-react'

export default function CoachDashboard({ user }) {
  const navigate = useNavigate()
  const details = user?.roleDetails || {}

  // Attendance states for student batch
  const [trainees, setTrainees] = useState([
    { id: 1, name: 'Rohit Sharma', role: 'All-Rounder', age: 19, present: true, note: 'Front-foot drive solid. Improve short ball leave.' },
    { id: 2, name: 'Kavya Raman', role: 'Fast Bowler', age: 17, present: true, note: 'Pace clocked at 124 km/h today. Wrist release upright.' },
    { id: 3, name: 'Aditya Sen', role: 'Wicketkeeper', age: 18, present: false, note: 'Excused for school sports trial.' },
    { id: 4, name: 'Manish Verma', role: 'Middle Order Bat', age: 20, present: true, note: 'Running between wickets drill completed.' },
  ])

  const [activeBatch, setActiveBatch] = useState('morning') // 'morning' | 'evening' | 'u16'
  const [newFeedbackTrainee, setNewFeedbackTrainee] = useState('Rohit Sharma')
  const [newFeedbackText, setNewFeedbackText] = useState('')
  const [feedbackSuccess, setFeedbackSuccess] = useState(false)

  function toggleAttendance(id) {
    setTrainees((prev) =>
      prev.map((t) => (t.id === id ? { ...t, present: !t.present } : t))
    )
  }

  function markAllPresent() {
    setTrainees((prev) => prev.map((t) => ({ ...t, present: true })))
  }

  function handleSaveFeedback(e) {
    e.preventDefault()
    if (!newFeedbackText.trim()) return

    setTrainees((prev) =>
      prev.map((t) => (t.name === newFeedbackTrainee ? { ...t, note: newFeedbackText } : t))
    )
    setNewFeedbackText('')
    setFeedbackSuccess(true)
    setTimeout(() => setFeedbackSuccess(false), 2500)
  }

  const presentCount = trainees.filter((t) => t.present).length

  return (
    <div className="sh-dashboard-layout">
      {/* Coach Hero Card */}
      <section className="sh-dash-hero-card sh-dash-hero-card--coach">
        <div className="sh-dash-hero-top">
          <div className="sh-dash-avatar-box">
            <div className="sh-avatar-hex" style={{ background: 'rgba(0, 230, 118, 0.2)', borderColor: '#00e676' }}>
              <Flame size={24} color="#00e676" />
            </div>
            <div>
              <div className="sh-dash-hero-title-row">
                <h2>{user.nickname}</h2>
                <span className="sh-badge-chip" style={{ color: '#00e676', borderColor: '#00e67655' }}>
                  {details.licenseLevel || 'BCCI LEVEL 2'}
                </span>
              </div>
              <p className="sh-dash-hero-sub">
                {details.coachSpecialization || 'Head Coach & Fast Bowling Specialist'}
              </p>
              <small style={{ color: 'var(--muted)', fontSize: 11 }}>
                Academy: <strong>{details.academyAffiliation || 'Scoring Heroes Apex Academy'}</strong>
              </small>
            </div>
          </div>

          <div className="sh-dash-stat-pill" style={{ borderColor: '#00e67655' }}>
            <strong style={{ color: '#00e676' }}>{details.attendanceRate || '96.4%'}</strong>
            <span>ATTENDANCE</span>
          </div>
        </div>

        {/* Coach Overview Bar */}
        <div className="sh-player-stats-bar" style={{ marginTop: 14 }}>
          <div className="sh-stat-box">
            <strong style={{ color: '#00e676' }}>{details.activeStudents || 42}</strong>
            <span>Active Trainees</span>
          </div>
          <div className="sh-stat-box">
            <strong>3</strong>
            <span>Batches Today</span>
          </div>
          <div className="sh-stat-box">
            <strong>18</strong>
            <span>Drills Logged</span>
          </div>
          <div className="sh-stat-box">
            <strong>4.9 ★</strong>
            <span>Player Rating</span>
          </div>
        </div>
      </section>

      {/* 22-Player Intra-Squad Practice Match & Scorer Card */}
      <section className="panel" style={{ padding: '14px 16px', background: 'linear-gradient(135deg, rgba(0,230,118,0.08), rgba(56,189,248,0.04))', border: '1.5px solid rgba(0,230,118,0.3)', borderRadius: 12, marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <Trophy size={17} color="#00e676" />
              <h3 style={{ margin: 0, fontSize: 15, color: '#f8fafc', fontWeight: 800 }}>
                22-Player Intra-Squad Trial Match
              </h3>
            </div>
            <p style={{ margin: 0, fontSize: 12, color: '#94a3b8', lineHeight: 1.4 }}>
              Select 22 trainees (Team A vs Team B), conduct coin toss, and score live ball-by-ball with shot analysis & commentary.
            </p>
          </div>
          <button
            type="button"
            className="btn btn--primary"
            style={{ padding: '10px 16px', whiteSpace: 'nowrap', fontWeight: 800, fontSize: 13, flexShrink: 0 }}
            onClick={() => navigate('/app/scorer')}
          >
            🏏 Start Match →
          </button>
        </div>
      </section>

      {/* Coach Operations Grid */}
      <div className="sh-quick-actions-grid">
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/coach?tab=trainees')}>
          <div className="sh-action-icon" style={{ background: 'rgba(255,45,58,0.15)', color: '#ff2d3a' }}>
            <Users size={18} />
          </div>
          <span>Trainee Radar</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/coach?tab=sessions')}>
          <div className="sh-action-icon" style={{ background: 'rgba(61,224,255,0.15)', color: '#3de0ff' }}>
            <Calendar size={18} />
          </div>
          <span>1-on-1 Sessions</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/coach?tab=drills')}>
          <div className="sh-action-icon" style={{ background: 'rgba(255,200,61,0.15)', color: '#ffc83d' }}>
            <PlaySquare size={18} />
          </div>
          <span>Video Drills</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/coach?tab=earnings')}>
          <div className="sh-action-icon" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676' }}>
            <DollarSign size={18} />
          </div>
          <span>P&L Ledger</span>
        </button>
      </div>

      {/* Today's 1-on-1 Practice Net Schedule */}
      <section className="panel" style={{ padding: '14px 16px' }}>
        <header style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Calendar size={17} color="#00e676" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Today's 1-on-1 High Performance Nets</h3>
          </div>
          <button
            type="button"
            className="text-link"
            style={{ fontSize: 12 }}
            onClick={() => navigate('/app/coach?tab=sessions')}
          >
            All Sessions →
          </button>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 12px',
              background: 'rgba(255,255,255,0.02)',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="pill" style={{ background: 'rgba(56,189,248,0.15)', color: '#38bdf8', fontSize: 10 }}>
                  07:30 - 08:45 AM
                </span>
                <strong style={{ fontSize: 13, color: '#f8fafc' }}>Aryan Deshmukh</strong>
              </div>
              <span style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginTop: 2 }}>
                Spin Box Net 3 • Drift into Right-Hander & Arm Ball Skid
              </span>
            </div>
            <button
              type="button"
              className="btn btn--secondary btn--sm"
              style={{ fontSize: 11 }}
              onClick={() => navigate('/app/coach?tab=sessions')}
            >
              Manage
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 12px',
              background: 'rgba(255,255,255,0.02)',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="pill" style={{ background: 'rgba(255,200,61,0.15)', color: '#ffc83d', fontSize: 10 }}>
                  04:30 - 05:45 PM
                </span>
                <strong style={{ fontSize: 13, color: '#f8fafc' }}>Kavya Raman</strong>
              </div>
              <span style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginTop: 2 }}>
                Bowling Machine Bay 2 • Yorker Accuracy & 125 km/h Bouncer Variation
              </span>
            </div>
            <button
              type="button"
              className="btn btn--secondary btn--sm"
              style={{ fontSize: 11 }}
              onClick={() => navigate('/app/coach?tab=sessions')}
            >
              Manage
            </button>
          </div>
        </div>
      </section>

      {/* Trainee Attendance Tracker (Core requirement) */}
      <section className="panel" style={{ padding: '14px 16px' }}>
        <header style={{ marginBottom: 10 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <UserCheck size={18} color="#00e676" />
              <h3 style={{ margin: 0, fontSize: 15 }}>Batch Attendance Tracker</h3>
            </div>
            <small style={{ color: 'var(--muted)', fontSize: 11 }}>
              {presentCount} of {trainees.length} present ({Math.round((presentCount / trainees.length) * 100)}%)
            </small>
          </div>
          <button
            type="button"
            className="btn btn--secondary btn--sm"
            style={{ width: 'auto', fontSize: 11 }}
            onClick={markAllPresent}
          >
            Mark All Present
          </button>
        </header>

        {/* Batch Pills */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
          {['morning', 'evening', 'u16'].map((b) => (
            <button
              key={b}
              type="button"
              className={`pill ${activeBatch === b ? 'is-active' : ''}`}
              style={{
                background: activeBatch === b ? '#00e676' : 'rgba(255,255,255,0.06)',
                color: activeBatch === b ? '#020617' : 'var(--text)',
                cursor: 'pointer',
                fontWeight: activeBatch === b ? 'bold' : 'normal',
              }}
              onClick={() => setActiveBatch(b)}
            >
              {b === 'morning' ? 'Morning Pro (6:30 AM)' : b === 'evening' ? 'Evening Nets (4:30 PM)' : 'U16 Elite (6:00 PM)'}
            </button>
          ))}
        </div>

        {/* Attendance List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {trainees.map((t) => (
            <div
              key={t.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 12px',
                background: t.present ? 'rgba(0,230,118,0.05)' : 'rgba(255,45,58,0.05)',
                border: `1px solid ${t.present ? 'rgba(0,230,118,0.2)' : 'rgba(255,45,58,0.2)'}`,
                borderRadius: 10,
              }}
            >
              <div style={{ flex: 1, minWidth: 0, marginRight: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <strong style={{ fontSize: 14 }}>{t.name}</strong>
                  <span style={{ fontSize: 10, color: 'var(--muted)' }}>Age {t.age} • {t.role}</span>
                </div>
                <p style={{ margin: '3px 0 0', fontSize: 11, color: '#9aa8c7', fontStyle: 'italic' }}>
                  Coach Note: "{t.note}"
                </p>
              </div>

              <button
                type="button"
                onClick={() => toggleAttendance(t.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '5px 10px',
                  borderRadius: 8,
                  fontSize: 11,
                  border: 'none',
                  background: t.present ? '#00e676' : '#ff2d3a',
                  color: t.present ? '#020617' : '#fff',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                {t.present ? <CheckCircle size={13} /> : <XCircle size={13} />}
                {t.present ? 'PRESENT' : 'ABSENT'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Give Player Technical Feedback Panel (Interactive) */}
      <section className="panel" style={{ padding: '14px 16px' }}>
        <header style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <MessageSquare size={17} color="#3de0ff" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Log Player Feedback & Technical Drill</h3>
          </div>
        </header>

        <form onSubmit={handleSaveFeedback} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <select
              className="sh-select"
              value={newFeedbackTrainee}
              onChange={(e) => setNewFeedbackTrainee(e.target.value)}
              style={{ flex: 1 }}
            >
              {trainees.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name} ({t.role})
                </option>
              ))}
            </select>
          </div>

          <textarea
            className="sh-input"
            rows={2}
            placeholder="Type technical advice (e.g. Work on high elbow position during cover drive, bowl yorkers from wide of the crease)..."
            value={newFeedbackText}
            onChange={(e) => setNewFeedbackText(e.target.value)}
            style={{ resize: 'vertical' }}
          />

          <button
            type="submit"
            className="btn btn--primary btn--sm"
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
          >
            <Send size={13} /> Save Coach Feedback Note
          </button>

          {feedbackSuccess && (
            <span style={{ color: '#00e676', fontSize: 11, textAlign: 'center' }}>
              ✓ Feedback note logged to {newFeedbackTrainee}'s profile!
            </span>
          )}
        </form>
      </section>

      {/* Match Tools Allotment (Interactive DLS & DRS) */}
      <section className="panel" style={{ padding: '14px 16px' }}>
        <header style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Shield size={17} color="#00b0ff" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Coach Tactical Tools • DLS Rain Recalculator</h3>
          </div>
          <button type="button" className="text-link" onClick={() => navigate('/app/match-tools')}>
            Hawk-Eye Lab →
          </button>
        </header>

        <div style={{ padding: 12, background: 'rgba(0,176,255,0.03)', borderRadius: 10, border: '1px solid rgba(0,176,255,0.15)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>T20 Rain Interruption Model:</span>
            <span className="pill" style={{ background: 'rgba(0,176,255,0.15)', color: '#00b0ff' }}>PAR SCORE TABLE</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, textAlign: 'center', marginBottom: 10 }}>
            <div style={{ padding: 6, background: 'rgba(255,255,255,0.03)', borderRadius: 6 }}>
              <span style={{ fontSize: 10, color: 'var(--muted)', display: 'block' }}>ORIGINAL</span>
              <strong style={{ fontSize: 13 }}>180 / 20 Ov</strong>
            </div>
            <div style={{ padding: 6, background: 'rgba(255,255,255,0.03)', borderRadius: 6 }}>
              <span style={{ fontSize: 10, color: 'var(--muted)', display: 'block' }}>REVISED OVERS</span>
              <strong style={{ fontSize: 13, color: '#ffc83d' }}>14.0 Overs</strong>
            </div>
            <div style={{ padding: 6, background: 'rgba(0,230,118,0.1)', borderRadius: 6 }}>
              <span style={{ fontSize: 10, color: '#00e676', display: 'block' }}>DLS TARGET</span>
              <strong style={{ fontSize: 13, color: '#00e676' }}>137 Runs</strong>
            </div>
          </div>
          <button
            type="button"
            className="btn btn--secondary btn--sm"
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
            onClick={() => navigate('/app/match-tools')}
          >
            Launch Full DRS & DLS Standard Calculator →
          </button>
        </div>
      </section>
    </div>
  )
}
