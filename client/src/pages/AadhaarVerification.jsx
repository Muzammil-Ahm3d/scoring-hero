import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ShieldCheck,
  ShieldAlert,
  Shield,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  Fingerprint,
  Check,
  ChevronRight,
  ArrowLeft,
  KeyRound,
  FileCheck2,
  Sparkles,
  QrCode,
  Share2,
  Download,
  Award,
  RefreshCw,
  Scale,
  Zap,
} from 'lucide-react'
import Screen from '../components/Screen'
import { useAuth } from '../context/AuthContext'

export default function AadhaarVerification() {
  const navigate = useNavigate()
  const { user, updateUser } = useAuth()

  const [activeTab, setActiveTab] = useState('verification') // 'verification' | 'fraud' | 'trust' | 'privacy' | 'status'

  // Verification Form State
  const [aadhaarInput, setAadhaarInput] = useState('')
  const [hasConsent, setHasConsent] = useState(true)
  const [step, setStep] = useState(user?.aadhaarVerified === true ? 'verified' : 'input') // 'input' | 'otp' | 'verified'
  const [otpInput, setOtpInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [toastMsg, setToastMsg] = useState(null)

  // Fraud radar simulation state
  const [fraudScanning, setFraudScanning] = useState(false)
  const [fraudStatus, setFraudStatus] = useState('clean') // 'clean' | 'risks_blocked'

  // Format Aadhaar Number with spaces
  function handleAadhaarChange(e) {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 12)
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ')
    setAadhaarInput(formatted)
  }

  function autofillDemoAadhaar() {
    setAadhaarInput('5489 2104 9012')
    setHasConsent(true)
  }

  function handleSendOtp(e) {
    e.preventDefault()
    const clean = aadhaarInput.replace(/\s/g, '')
    if (clean.length !== 12) {
      triggerToast('Please enter a valid 12-digit Aadhaar number.')
      return
    }
    if (!hasConsent) {
      triggerToast('Please accept the consent terms for UIDAI validation.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep('otp')
      triggerToast('OTP sent to UIDAI registered mobile (+91 98••••••10)')
    }, 700)
  }

  function handleVerifyOtp(e) {
    e.preventDefault()
    if (otpInput.length < 4) {
      triggerToast('Please enter the 6-digit verification OTP.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep('verified')
      updateUser({
        aadhaarVerified: true,
        aadhaarMasked: 'XXXX-XXXX-9012',
        trust: 94,
        verified: true,
      })
      triggerToast('✓ Aadhaar identity verified! Verified Athlete badge issued.')
    }, 900)
  }

  function triggerToast(msg) {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3000)
  }

  function runFraudScan() {
    setFraudScanning(true)
    setTimeout(() => {
      setFraudScanning(false)
      setFraudStatus('clean')
      triggerToast('✓ Real-time integrity scan completed: 0 threats detected.')
    }, 1200)
  }

  const maskedPhone = user?.phone ? `${user.phone.slice(0, 2)}••••••${user.phone.slice(-2)}` : '+91 98••••••10'
  const maskedEmail = user?.email ? `${user.email.slice(0, 2)}••••@${user.email.split('@')[1] || 'gmail.com'}` : 'ro•••@gmail.com'
  const maskedAadhaar = user?.aadhaarMasked || 'XXXX-XXXX-9012'

  return (
    <Screen branded={false} padded={false}>
      <div className="sh-aadhaar-page">
        {/* Header Bar */}
        <header className="sh-aadhaar-header">
          <button type="button" className="btn-icon" onClick={() => navigate('/app')}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 style={{ fontSize: 16, margin: 0, color: '#f4f7ff' }}>Aadhaar + Trust System</h1>
            <small style={{ color: '#00e676', fontSize: 11, fontWeight: 'bold' }}>
              FEATURE 03 • SECURITY & IDENTITY FOUNDATION
            </small>
          </div>
          <span className="pill" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676', fontSize: 10 }}>
            UIDAI COMPLIANT
          </span>
        </header>

        {toastMsg && (
          <div className="sh-aadhaar-toast">
            {toastMsg}
          </div>
        )}

        {/* 5-Feature Navigation Tabs (Exact 1:1 match to Feature 03 slides) */}
        <nav className="sh-aadhaar-nav-tabs">
          {[
            { id: 'verification', label: '1. Aadhaar Verify', icon: Fingerprint },
            { id: 'fraud', label: '2. Fraud Radar', icon: Shield },
            { id: 'trust', label: '3. Trust Score', icon: Award },
            { id: 'privacy', label: '4. Privacy Layer', icon: Lock },
            { id: 'status', label: '5. Athlete Badge', icon: ShieldCheck },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`sh-aadhaar-tab-btn ${activeTab === tab.id ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={14} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* TAB 1: AADHAAR-BASED VERIFICATION (FEATURE 3.1) */}
        {activeTab === 'verification' && (
          <div className="sh-aadhaar-tab-content">
            {/* Top Explanation Card */}
            <div className="sh-doc-card">
              <span className="sh-doc-chip">FEATURE 3.1 • SECURITY / TRUST</span>
              <h2 className="sh-doc-title">Aadhaar-Based Verification</h2>
              <p className="sh-doc-desc">
                Implemented as a backend-only identity validation mechanism, ensuring that every registered player
                is a real individual. This process is completely hidden from public view and strictly used for platform integrity.
              </p>
            </div>

            {/* Visual Screen Mockup as shown in the Slide */}
            <div className="sh-slide-mockup-card">
              <div className="sh-mockup-phone-frame">
                <div className="sh-mockup-header-title">
                  <span className="sh-mockup-badge">FEATURE 3.1</span>
                  <h3>Aadhaar-Based Verification</h3>
                  <small>SECURITY / TRUST</small>
                </div>

                {step === 'input' && (
                  <form onSubmit={handleSendOtp} className="sh-mockup-content">
                    <div className="sh-secure-badge-box">
                      <div className="sh-shield-icon-wrap">
                        <Lock size={32} color="#ffd600" />
                      </div>
                      <h4>SECURE IDENTITY CHECK</h4>
                      <p>Enter 12-digit Aadhaar UID to verify identity & unlock certified matches.</p>
                    </div>

                    <div className="sh-form-group" style={{ margin: '14px 0' }}>
                      <label className="sh-input-label">Aadhaar Number (12 Digits)</label>
                      <input
                        type="text"
                        className="sh-input sh-input--lg"
                        placeholder="XXXX XXXX XXXX"
                        value={aadhaarInput}
                        onChange={handleAadhaarChange}
                        maxLength={14}
                      />
                      <button
                        type="button"
                        className="text-link"
                        style={{ marginTop: 6, fontSize: 11, textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4, width: '100%' }}
                        onClick={autofillDemoAadhaar}
                      >
                        <Zap size={12} color="#ffd600" /> Autofill Demo Aadhaar: 5489 2104 9012
                      </button>
                    </div>

                    <label className="sh-checkbox-row">
                      <input
                        type="checkbox"
                        checked={hasConsent}
                        onChange={(e) => setHasConsent(e.target.checked)}
                      />
                      <span>
                        I consent to backend verification via secure UIDAI gateway. My Aadhaar will remain fully masked and never shown publicly.
                      </span>
                    </label>

                    <button
                      type="submit"
                      className="btn btn--primary"
                      style={{ width: '100%', marginTop: 14, background: 'linear-gradient(135deg, #e10613, #ff5722)' }}
                      disabled={loading}
                    >
                      {loading ? 'Connecting to UIDAI Gateway...' : 'Send Verification OTP →'}
                    </button>

                    <button
                      type="button"
                      className="text-link"
                      style={{ marginTop: 12, fontSize: 12, color: '#94a3b8', textAlign: 'center', width: '100%', display: 'block' }}
                      onClick={() => navigate('/app', { replace: true })}
                    >
                      Skip for now & Continue to App →
                    </button>
                  </form>
                )}

                {step === 'otp' && (
                  <form onSubmit={handleVerifyOtp} className="sh-mockup-content">
                    <div className="sh-secure-badge-box">
                      <div className="sh-shield-icon-wrap">
                        <KeyRound size={32} color="#00e5ff" />
                      </div>
                      <h4>ENTER AADHAAR OTP</h4>
                      <p>6-digit code dispatched to your Aadhaar-linked phone number {maskedPhone}</p>
                    </div>

                    <div className="sh-form-group" style={{ margin: '14px 0' }}>
                      <label className="sh-input-label">6-Digit UIDAI OTP</label>
                      <input
                        type="text"
                        className="sh-input sh-input--lg"
                        placeholder="••••••"
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value.slice(0, 6))}
                        maxLength={6}
                        style={{ textAlign: 'center', letterSpacing: '6px', fontSize: 18 }}
                      />
                      <button
                        type="button"
                        className="text-link"
                        style={{ marginTop: 6, fontSize: 11, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, width: '100%' }}
                        onClick={() => setOtpInput('123456')}
                      >
                        <Zap size={12} color="#00e5ff" /> Autofill Demo OTP: 123456
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="btn btn--primary"
                      style={{ width: '100%', marginTop: 14, background: 'linear-gradient(135deg, #00e676, #00b0ff)', color: '#020617', fontWeight: 'bold' }}
                      disabled={loading}
                    >
                      {loading ? 'Validating Biometric Token...' : 'Confirm & Issue Verified Badge ✓'}
                    </button>

                    <button
                      type="button"
                      className="btn btn--secondary btn--sm"
                      style={{ width: '100%', marginTop: 8 }}
                      onClick={() => setStep('input')}
                    >
                      Change Aadhaar Number
                    </button>
                  </form>
                )}

                {step === 'verified' && (
                  <div className="sh-mockup-content">
                    <div className="sh-secure-badge-box">
                      <div className="sh-shield-icon-wrap" style={{ borderColor: '#00e676', background: 'rgba(0,230,118,0.15)' }}>
                        <ShieldCheck size={36} color="#00e676" />
                      </div>
                      <h4 style={{ color: '#00e676' }}>SECURE IDENTITY CHECK</h4>
                      <div className="sh-masked-aadhaar-pill">
                        <strong>{maskedAadhaar}</strong>
                        <span className="sh-hash-badge">AES-256 ENCRYPTED</span>
                      </div>
                    </div>

                    <div className="sh-trust-guarantee-list">
                      <div className="sh-guarantee-item">
                        <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(0,230,118,0.15)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                          <ShieldCheck size={16} color="#00e676" />
                        </div>
                        <div>
                          <strong>Prevent Fake Accounts</strong>
                          <small>1 Real Individual = 1 Scoring Heroes Athlete Profile</small>
                        </div>
                        <Check size={16} color="#00e676" />
                      </div>
                      <div className="sh-guarantee-item">
                        <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(61,224,255,0.15)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                          <Scale size={16} color="#3de0ff" />
                        </div>
                        <div>
                          <strong>Ensure Fair Play</strong>
                          <small>Eliminates age-fudging and tournament impersonation</small>
                        </div>
                        <Check size={16} color="#00e676" />
                      </div>
                      <div className="sh-guarantee-item">
                        <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,214,0,0.15)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                          <Lock size={16} color="#ffd600" />
                        </div>
                        <div>
                          <strong>Protect Personal Data</strong>
                          <small>Stored in Zero-Knowledge Vault. Never exposed to public</small>
                        </div>
                        <Check size={16} color="#00e676" />
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14 }}>
                      <button
                        type="button"
                        className="btn btn--primary"
                        style={{ width: '100%', background: 'linear-gradient(135deg, #00e676, #00b0ff)', color: '#020617', fontWeight: 'bold' }}
                        onClick={() => navigate('/app', { replace: true })}
                      >
                        CONTINUE TO SCORING ARENA →
                      </button>
                      <button
                        type="button"
                        className="btn btn--secondary btn--sm"
                        style={{ width: '100%' }}
                        onClick={() => setActiveTab('trust')}
                      >
                        VIEW TRUST STATUS →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FRAUD DETECTION SYSTEM (FEATURE 3.2) */}
        {activeTab === 'fraud' && (
          <div className="sh-aadhaar-tab-content">
            <div className="sh-doc-card">
              <span className="sh-doc-chip" style={{ color: '#ff1744', borderColor: '#ff174444' }}>FEATURE 3.2 • SECURITY / TRUST</span>
              <h2 className="sh-doc-title">Fraud Detection System</h2>
              <p className="sh-doc-desc">
                Continuously monitors user behavior to identify suspicious patterns such as duplicate accounts,
                unusual activity spikes, or scoring manipulation attempts in real time.
              </p>
            </div>

            <div className="sh-slide-mockup-card">
              <div className="sh-mockup-phone-frame">
                <div className="sh-mockup-header-title">
                  <span className="sh-mockup-badge">FEATURE 3.2</span>
                  <h3>Fraud Detection</h3>
                </div>

                <div className="sh-mockup-content">
                  <div className="sh-fraud-radar-box">
                    <div className="sh-radar-pulse-ring">
                      <Shield size={38} color="#ff1744" />
                    </div>
                    <div className="sh-fraud-count-badge">
                      {fraudStatus === 'risks_blocked' ? '2 RISKS BLOCKED' : '0 RISKS DETECTED'}
                    </div>
                    <small style={{ color: 'var(--muted)', fontSize: 11, display: 'block', marginTop: 4 }}>
                      Real-Time Integrity Intelligence Layer Active
                    </small>
                  </div>

                  <div className="sh-fraud-check-table">
                    <div className="sh-fraud-row">
                      <span>Duplicate Account Check</span>
                      <strong className="sh-fraud-status sh-fraud-status--blocked">BLOCKED</strong>
                    </div>
                    <div className="sh-fraud-row">
                      <span>Unusual Activity Spike</span>
                      <strong className="sh-fraud-status sh-fraud-status--reviewed">REVIEWED</strong>
                    </div>
                    <div className="sh-fraud-row">
                      <span>Match Integrity Radar</span>
                      <strong className="sh-fraud-status sh-fraud-status--safe">SAFE</strong>
                    </div>
                    <div className="sh-fraud-row">
                      <span>Device Fingerprint Token</span>
                      <strong className="sh-fraud-status sh-fraud-status--safe">AUTHENTICATED</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                    <button
                      type="button"
                      className="btn btn--secondary btn--sm"
                      style={{ flex: 1 }}
                      onClick={runFraudScan}
                      disabled={fraudScanning}
                    >
                      <RefreshCw size={13} className={fraudScanning ? 'sh-spin' : ''} />
                      {fraudScanning ? 'Scanning...' : 'Run Live Radar'}
                    </button>
                    <button
                      type="button"
                      className="btn btn--secondary btn--sm"
                      style={{ flex: 1 }}
                      onClick={() => setFraudStatus(fraudStatus === 'clean' ? 'risks_blocked' : 'clean')}
                    >
                      Toggle 2 Risks View
                    </button>
                  </div>

                  <button
                    type="button"
                    className="btn btn--primary"
                    style={{ width: '100%', marginTop: 12, background: 'linear-gradient(135deg, #e10613, #ff5722)' }}
                    onClick={() => setActiveTab('trust')}
                  >
                    VIEW TRUST STATUS →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: INTERNAL TRUST SCORE (FEATURE 3.3) */}
        {activeTab === 'trust' && (
          <div className="sh-aadhaar-tab-content">
            <div className="sh-doc-card">
              <span className="sh-doc-chip" style={{ color: '#00e676', borderColor: '#00e67644' }}>FEATURE 3.3 • SECURITY / TRUST</span>
              <h2 className="sh-doc-title">Internal Trust Score</h2>
              <p className="sh-doc-desc">
                A dynamic metric assigned to each player based on identity verification status, match consistency,
                and disciplinary record. High trust scores unlock trial selections and franchise auction radars.
              </p>
            </div>

            <div className="sh-slide-mockup-card">
              <div className="sh-mockup-phone-frame">
                <div className="sh-mockup-header-title">
                  <span className="sh-mockup-badge">FEATURE 3.3</span>
                  <h3>Internal Trust Score</h3>
                </div>

                <div className="sh-mockup-content">
                  {/* Gauge Meter Representation */}
                  <div className="sh-gauge-container">
                    <svg viewBox="0 0 200 120" className="sh-gauge-svg">
                      <path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="16"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke="url(#trustGradient)"
                        strokeWidth="16"
                        strokeDasharray="251"
                        strokeDashoffset="35"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="trustGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#ff5722" />
                          <stop offset="50%" stopColor="#ffd600" />
                          <stop offset="100%" stopColor="#00e676" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <div className="sh-gauge-value-box">
                      <strong>{user?.trust || 94}</strong>
                      <span className="sh-gauge-label">HIGH RELIABILITY</span>
                    </div>
                  </div>

                  {/* Trust Score Breakdown */}
                  <div className="sh-trust-breakdown-box">
                    <div className="sh-breakdown-row">
                      <span>Aadhaar Identity Validation</span>
                      <strong style={{ color: '#00e676' }}>35 / 35 Pts</strong>
                    </div>
                    <div className="sh-breakdown-row">
                      <span>Match Participation & Fair Play</span>
                      <strong style={{ color: '#00e676' }}>25 / 25 Pts</strong>
                    </div>
                    <div className="sh-breakdown-row">
                      <span>Academy & Coach Endorsement</span>
                      <strong style={{ color: '#00e676' }}>20 / 20 Pts</strong>
                    </div>
                    <div className="sh-breakdown-row">
                      <span>Behavioral & Punctuality Rating</span>
                      <strong style={{ color: '#ffd600' }}>14 / 20 Pts</strong>
                    </div>
                  </div>

                  <div className="sh-trust-perks-box">
                    <span style={{ fontSize: 11, fontWeight: 'bold', color: '#3de0ff' }}>Unlocked with High Reliability:</span>
                    <ul style={{ margin: '4px 0 0', paddingLeft: 18, fontSize: 11, color: '#9aa8c7' }}>
                      <li>State Senior Trial Selection Scouting Radar</li>
                      <li>Live Player Auction Paddle Eligibility</li>
                      <li>Verified Athlete Checkmark Badge</li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    className="btn btn--primary"
                    style={{ width: '100%', marginTop: 14, background: 'linear-gradient(135deg, #e10613, #ff5722)' }}
                    onClick={() => setActiveTab('privacy')}
                  >
                    EXPLORE PRIVACY LAYER →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: HIDDEN VERIFICATION LAYER (FEATURE 3.4) */}
        {activeTab === 'privacy' && (
          <div className="sh-aadhaar-tab-content">
            <div className="sh-doc-card">
              <span className="sh-doc-chip" style={{ color: '#ffd600', borderColor: '#ffd60044' }}>FEATURE 3.4 • SECURITY / TRUST</span>
              <h2 className="sh-doc-title">Hidden Verification Layer</h2>
              <p className="sh-doc-desc">
                Ensures that all identity validation processes remain invisible to other users. While the platform
                verifies authenticity internally, it never exposes private personal data.
              </p>
            </div>

            <div className="sh-slide-mockup-card">
              <div className="sh-mockup-phone-frame">
                <div className="sh-mockup-header-title">
                  <span className="sh-mockup-badge">FEATURE 3.4</span>
                  <h3>Hidden Verification Layer</h3>
                </div>

                <div className="sh-mockup-content">
                  <div className="sh-lock-banner-box">
                    <div className="sh-gold-lock-hex">
                      <Lock size={32} color="#ffd600" />
                    </div>
                    <h4 style={{ color: '#ffd600', margin: '8px 0 2px' }}>PRIVATE DATA HIDDEN</h4>
                    <small style={{ color: 'var(--muted)', fontSize: 11 }}>Zero-Knowledge Vault Encrypted</small>
                  </div>

                  <div className="sh-privacy-matrix-table">
                    <div className="sh-privacy-matrix-row">
                      <div>
                        <span>Mobile Number</span>
                        <small style={{ display: 'block', color: 'var(--muted)' }}>{maskedPhone}</small>
                      </div>
                      <strong className="sh-privacy-pill sh-privacy-pill--hidden">Hidden</strong>
                    </div>

                    <div className="sh-privacy-matrix-row">
                      <div>
                        <span>Email Address</span>
                        <small style={{ display: 'block', color: 'var(--muted)' }}>{maskedEmail}</small>
                      </div>
                      <strong className="sh-privacy-pill sh-privacy-pill--hidden">Hidden</strong>
                    </div>

                    <div className="sh-privacy-matrix-row">
                      <div>
                        <span>Aadhaar UID Token</span>
                        <small style={{ display: 'block', color: 'var(--muted)' }}>{maskedAadhaar}</small>
                      </div>
                      <strong className="sh-privacy-pill sh-privacy-pill--hidden">Hidden</strong>
                    </div>

                    <div className="sh-privacy-matrix-row">
                      <div>
                        <span>Public Nickname</span>
                        <small style={{ display: 'block', color: 'var(--muted)' }}>{user?.nickname || 'Rohit_45'}</small>
                      </div>
                      <strong className="sh-privacy-pill sh-privacy-pill--visible">Visible</strong>
                    </div>

                    <div className="sh-privacy-matrix-row">
                      <div>
                        <span>Player Career Stats</span>
                        <small style={{ display: 'block', color: 'var(--muted)' }}>Verified Runs & Wickets</small>
                      </div>
                      <strong className="sh-privacy-pill sh-privacy-pill--visible">Visible</strong>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn btn--primary"
                    style={{ width: '100%', marginTop: 14, background: 'linear-gradient(135deg, #e10613, #ff5722)' }}
                    onClick={() => setActiveTab('status')}
                  >
                    VIEW ATHLETE STATUS →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: VERIFIED PLAYER STATUS (FEATURE 3.5) */}
        {activeTab === 'status' && (
          <div className="sh-aadhaar-tab-content">
            <div className="sh-doc-card">
              <span className="sh-doc-chip" style={{ color: '#3de0ff', borderColor: '#3de0ff44' }}>FEATURE 3.5 • SECURITY / TRUST</span>
              <h2 className="sh-doc-title">Verified Player Status</h2>
              <p className="sh-doc-desc">
                Your athlete profile is officially certified with the green verified shield, establishing genuine sportsmanship
                and state academy standing.
              </p>
            </div>

            {/* Official Athlete Digital ID Card */}
            <div className="sh-athlete-id-card">
              <div className="sh-athlete-id-top">
                <div className="sh-athlete-badge-row">
                  <span className="sh-badge-chip" style={{ color: '#00e676', borderColor: '#00e67655' }}>
                    <ShieldCheck size={12} /> ATHLETE VERIFIED
                  </span>
                  <span className="sh-badge-chip" style={{ color: '#3de0ff', borderColor: '#3de0ff55' }}>
                    UID: SH-9012-TN
                  </span>
                </div>
                <h3 style={{ margin: '10px 0 2px', fontSize: 18, color: '#f4f7ff' }}>{user?.nickname || 'Rohit Sharma'}</h3>
                <p style={{ margin: 0, fontSize: 12, color: '#9aa8c7' }}>
                  All-Rounder • {user?.city || 'Chennai'}, India
                </p>
                <small style={{ display: 'block', color: '#3de0ff', marginTop: 4, fontWeight: 'bold' }}>
                  🏫 Marina Titans Academy (U19 State Division)
                </small>
              </div>

              <div className="sh-athlete-id-stats-grid">
                <div>
                  <span style={{ fontSize: 10, color: 'var(--muted)', display: 'block' }}>TRUST SCORE</span>
                  <strong style={{ fontSize: 16, color: '#00e676' }}>{user?.trust || 94} / 100</strong>
                </div>
                <div>
                  <span style={{ fontSize: 10, color: 'var(--muted)', display: 'block' }}>AADHAAR HASH</span>
                  <strong style={{ fontSize: 13, color: '#f4f7ff' }}>{maskedAadhaar}</strong>
                </div>
                <div>
                  <span style={{ fontSize: 10, color: 'var(--muted)', display: 'block' }}>STATUS</span>
                  <strong style={{ fontSize: 13, color: '#00e676' }}>Certified Pro</strong>
                </div>
              </div>

              <div className="sh-athlete-id-qr-box">
                <QrCode size={56} color="#3de0ff" />
                <div>
                  <strong style={{ fontSize: 12, color: '#f4f7ff', display: 'block' }}>Official Match Pass Scan</strong>
                  <small style={{ fontSize: 10, color: 'var(--muted)' }}>
                    Scannable by match officials and franchise scouting radar.
                  </small>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                <button
                  type="button"
                  className="btn btn--secondary btn--sm"
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                  onClick={() => triggerToast('✓ Digital Athlete Pass downloaded (PDF with cryptographic signature)!')}
                >
                  <Download size={14} /> Download Pass
                </button>
                <button
                  type="button"
                  className="btn btn--secondary btn--sm"
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                  onClick={() => triggerToast('✓ Athlete Verified profile link copied to clipboard!')}
                >
                  <Share2 size={14} /> Share Badge
                </button>
              </div>
            </div>

            <button
              type="button"
              className="btn btn--primary"
              style={{ width: '100%', marginTop: 14, background: 'linear-gradient(135deg, #e10613, #ff5722)' }}
              onClick={() => navigate('/app')}
            >
              Back to Player Dashboard →
            </button>
          </div>
        )}
      </div>
    </Screen>
  )
}
