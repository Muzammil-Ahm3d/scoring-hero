import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MailCheck, ShieldCheck } from 'lucide-react'
import Screen from '../components/Screen'
import { DEMO_OTP } from '../data/demo'
import { useAuth } from '../context/AuthContext'
import { getRoleById } from '../data/rolesData'

export default function VerifyEmail() {
  const navigate = useNavigate()
  const { draft, completeSignup } = useAuth()
  const [digits, setDigits] = useState(['', '', '', ''])
  const [error, setError] = useState('')
  const refs = useRef([])
  const activeRole = getRoleById(draft.role || 'player')

  function setDigit(index, value) {
    const digit = value.replace(/\D/g, '').slice(-1)
    setDigits((current) => current.map((item, i) => (i === index ? digit : item)))
    if (digit && index < 3) refs.current[index + 1]?.focus()
  }

  function submit(event) {
    event.preventDefault()
    if (digits.join('') !== DEMO_OTP && digits.join('') !== '0000') {
      setError(`Incorrect code. Use ${DEMO_OTP} for test mode.`)
      return
    }

    completeSignup({
      phoneCode: draft.phoneCode || '+91',
      phone: draft.phone || '9876543210',
      email: draft.email,
      nickname: draft.nickname || (draft.email ? draft.email.split('@')[0] : 'Athlete_User'),
      city: draft.city || 'Chennai',
      age: draft.age || '20',
      role: draft.role || 'player',
      roleCategory: draft.roleCategory || 'player',
      roleDetails: draft.roleDetails || {},
      verified: true,
      emailVerified: true,
      trust: 94,
    })
    navigate('/app/avatar', { replace: true })
  }

  return (
    <Screen back title="Verify your email">
      <div className="sh-auth-container">
        <div className="sh-auth-card">
          <div style={{ display: 'grid', justifyItems: 'center', gap: 10, textAlign: 'center', padding: '8px 4px 12px' }}>
            <div style={{ width: 58, height: 58, borderRadius: 18, display: 'grid', placeItems: 'center', color: '#3de0ff', background: 'rgba(61,224,255,.12)', border: '1px solid rgba(61,224,255,.3)' }}>
              <MailCheck size={30} />
            </div>
            <h2 style={{ margin: 0, color: '#fff', fontSize: 22 }}>One last security check</h2>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: 13, lineHeight: 1.5 }}>
              Enter the 4-digit verification code sent to <strong style={{ color: '#f4f7ff' }}>{draft.email}</strong>.
            </p>
          </div>

          <div className="sh-test-mode-card">
            <div className="sh-test-mode-title">Test mode: no email was sent</div>
            <div className="sh-test-mode-body">Your test verification code is: <b className="sh-test-mode-code">{DEMO_OTP}</b></div>
            <button
              type="button"
              className="btn btn--secondary btn--sm"
              style={{ marginTop: 8, width: '100%', fontSize: 11, background: 'rgba(255,255,255,0.08)' }}
              onClick={() => { setDigits(DEMO_OTP.split('')); setError('') }}
            >
              Fill test code
            </button>
          </div>

          <form className="sh-form" onSubmit={submit}>
            <div className="sh-otp-row" aria-label="Email verification code">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => { refs.current[index] = element }}
                  inputMode="numeric"
                  autoComplete={index === 0 ? 'one-time-code' : 'off'}
                  maxLength={1}
                  aria-label={`Verification digit ${index + 1}`}
                  className="sh-otp-box"
                  value={digit}
                  onChange={(event) => setDigit(index, event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Backspace' && !digits[index] && index > 0) refs.current[index - 1]?.focus()
                  }}
                />
              ))}
            </div>
            {error && <p className="error" style={{ textAlign: 'center', margin: '4px 0' }}>{error}</p>}
            <button className="sh-btn-submit" type="submit">Verify email & continue</button>
          </form>

          <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: 'var(--muted)', fontSize: 11, margin: '12px 0 0' }}>
            <ShieldCheck size={14} color="#00e676" /> Email stays private and secures account recovery.
          </p>
        </div>
      </div>
    </Screen>
  )
}
