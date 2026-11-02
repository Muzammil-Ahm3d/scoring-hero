import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, Zap } from 'lucide-react'
import Screen from '../components/Screen'
import { DEMO_OTP } from '../data/demo'
import { useAuth } from '../context/AuthContext'
import { getRoleById } from '../data/rolesData'

export default function VerifyOtp() {
  const navigate = useNavigate()
  const { draft, completeSignup } = useAuth()
  const [digits, setDigits] = useState(['', '', '', ''])
  const [seconds, setSeconds] = useState(30)
  const [error, setError] = useState('')
  const [resendNotice, setResendNotice] = useState(false)
  const refs = useRef([])

  const activeRole = getRoleById(draft.role || 'player')

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [])

  function setDigit(i, value) {
    const v = value.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[i] = v
    setDigits(next)
    if (v && i < 3) refs.current[i + 1]?.focus()
  }

  function handleResend() {
    setSeconds(30)
    setResendNotice(true)
    setTimeout(() => setResendNotice(false), 3500)
  }

  function handleAutoFill() {
    setDigits(['1', '2', '3', '4'])
    setError('')
  }

  function submit(e) {
    e.preventDefault()
    const code = digits.join('')
    // Allow demo OTP 1234 or 0000
    if (code !== DEMO_OTP && code !== '0000') {
      setError(`Incorrect OTP. Use ${DEMO_OTP} for test mode.`)
      return
    }

    if (draft.mode === 'register' && draft.email) {
      navigate('/verify-email')
      return
    }

    // Complete authentication and navigate into the designated dashboard
    completeSignup({
      phoneCode: draft.phoneCode || '+91',
      phone: draft.phone || '9876543210',
      nickname: draft.nickname || (draft.phone ? 'User_' + draft.phone.slice(-4) : 'Athlete_User'),
      city: draft.city || 'Chennai',
      age: draft.age || '20',
      role: draft.role || 'player',
      roleCategory: draft.roleCategory || 'player',
      roleDetails: draft.roleDetails || {},
      verified: true,
      trust: 94,
    })

    navigate('/app', { replace: true })
  }

  return (
    <Screen back title="Verify Mobile">
      <div className="sh-auth-container">
        <div className="sh-auth-card">
          <h3 style={{ margin: 0, fontSize: 20, color: '#fff' }}>Verify your mobile</h3>

          <p style={{ margin: '4px 0 10px', fontSize: 13, color: 'var(--muted)' }}>
            Enter 4-digit code sent to{' '}
            <strong style={{ color: '#f4f7ff' }}>
              {draft.phoneCode || '+91'} {draft.phone || '98765 43210'}
            </strong>
          </p>

          {/* Active Profile Info Banner */}
          <div
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              background: activeRole.accentBg,
              border: `1px solid ${activeRole.color}40`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 12,
            }}
          >
            <div>
              <span style={{ fontSize: 10, color: 'var(--muted)', display: 'block' }}>ASSIGNED PROFILE</span>
              <strong style={{ fontSize: 13, color: '#f4f7ff' }}>{activeRole.title}</strong>
            </div>
            <span className="pill" style={{ color: activeRole.color, borderColor: `${activeRole.color}55`, fontSize: 10 }}>
              {activeRole.badge}
            </span>
          </div>

          {/* Test Mode Card with 1-Tap Autofill */}
          <div className="sh-test-mode-card">
            <div className="sh-test-mode-title">Test mode: no SMS was sent</div>
            <div className="sh-test-mode-body">
              Your test OTP code is: <b className="sh-test-mode-code">{DEMO_OTP}</b>
            </div>
            <button
              type="button"
              className="btn btn--secondary btn--sm"
              style={{ marginTop: 8, width: '100%', fontSize: 11, background: 'rgba(255,255,255,0.08)' }}
              onClick={handleAutoFill}
            >
              ⚡ 1-Tap Autofill ({DEMO_OTP})
            </button>
          </div>

          <form className="sh-form" onSubmit={submit}>
            <div className="sh-otp-row">
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => (refs.current[i] = el)}
                  inputMode="numeric"
                  maxLength={1}
                  className="sh-otp-box"
                  value={d}
                  onChange={(e) => setDigit(i, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !digits[i] && i > 0) refs.current[i - 1]?.focus()
                  }}
                  autoFocus={i === 0}
                />
              ))}
            </div>

            {error && <p className="error" style={{ textAlign: 'center', margin: '4px 0' }}>{error}</p>}
            {resendNotice && (
              <p style={{ color: '#00e676', fontSize: 12, textAlign: 'center', margin: '4px 0' }}>
                New OTP generated: <strong>{DEMO_OTP}</strong>
              </p>
            )}

            <button className="sh-btn-submit" type="submit">
              Confirm & Enter {activeRole.short} Dashboard →
            </button>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
            <button
              className="sh-btn-ghost"
              type="button"
              disabled={seconds > 0}
              onClick={handleResend}
            >
              {seconds > 0 ? `Resend SMS in 0:${String(seconds).padStart(2, '0')}` : 'Resend SMS'}
            </button>

            <button
              className="sh-btn-ghost"
              type="button"
              onClick={() => navigate(-1)}
            >
              Back to Registration
            </button>
          </div>
        </div>
      </div>
    </Screen>
  )
}
