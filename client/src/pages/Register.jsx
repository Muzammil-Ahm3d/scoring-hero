import { useState, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  User,
  Building,
  Check,
  Eye,
  EyeOff,
  AlertCircle,
  Mail,
  Zap,
  Globe,
  Sparkles,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { OFFICIAL_BUSINESS_ROLES, getRoleById } from '../data/rolesData'
import CountryCodePicker from '../components/CountryCodePicker'
import { getMaxPhoneDigits, getPhonePlaceholder } from '../data/countries'
import '../AuthWhiteTheme.css'

export default function Register() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { draft, completeSignup, loginWithIdentifier } = useAuth()

  // 1. Two primary modes: 'register' vs 'login'
  const initialMode = searchParams.get('mode') === 'login' ? 'login' : 'register'
  const [activeTab, setActiveTab] = useState(initialMode) // 'register' | 'login'

  // 2. Role selection: 'player' vs 'business' (Two simple tabs)
  const [accountType, setAccountType] = useState('player') // 'player' | 'business'

  // 3. Business type selection (when Business tab active)
  const [selectedBusinessRoleId, setSelectedBusinessRoleId] = useState('ground')

  // 4. Player stats state
  const [playerRole, setPlayerRole] = useState('All-rounder')
  const [battingStance, setBattingStance] = useState('Right Hand Bat')
  const [bowlingAction, setBowlingAction] = useState('Right-arm Fast')
  const [competitionLevel, setCompetitionLevel] = useState('National Level')
  const [sportName, _setSportName] = useState('Cricket')

  // 5. Business stats state (dynamic according to selected business type)
  const [businessName, setBusinessName] = useState('Marina International Stadium')
  const [businessCustomField, setBusinessCustomField] = useState('Natural Red Soil Turf')
  const [businessCity, setBusinessCity] = useState('Chennai')
  const [businessSubField, setBusinessSubField] = useState('Day/Night 800 Lux Floodlights')

  // 6. Three small auth tabs: 'mobile' | 'email' | 'google'
  const [authMethod, setAuthMethod] = useState('mobile') // 'mobile' | 'email' | 'google'

  // Input states
  const [phoneCode, setPhoneCode] = useState(draft.phoneCode || '+91')
  const [phone, setPhone] = useState(draft.phone || '')
  const [email, setEmail] = useState(draft.email || '')
  const [username, setUsername] = useState(draft.nickname || '')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(true)
  const [error, setError] = useState('')

  // Mobile OTP dialog state
  const [showOtpDialog, setShowOtpDialog] = useState(false)
  const [inputOtp, setInputOtp] = useState('')

  // Country code national digit limits
  const maxPhoneDigits = useMemo(() => {
    return getMaxPhoneDigits(phoneCode)
  }, [phoneCode])

  const phonePlaceholder = useMemo(() => {
    return getPhonePlaceholder(phoneCode)
  }, [phoneCode])

  function handlePhoneChange(val) {
    const cleanDigits = val.replace(/\D/g, '').slice(0, maxPhoneDigits)
    setPhone(cleanDigits)
    if (error) setError('')
  }

  function handlePhoneCodeChange(newCode) {
    setPhoneCode(newCode)
    const newMax = getMaxPhoneDigits(newCode)
    if (phone.length > newMax) {
      setPhone(phone.slice(0, newMax))
    }
  }

  // Active business role metadata
  const activeBusinessRole = useMemo(() => {
    return OFFICIAL_BUSINESS_ROLES.find((b) => b.id === selectedBusinessRoleId) || OFFICIAL_BUSINESS_ROLES[0]
  }, [selectedBusinessRoleId])

  // Change business type and reset default field suggestions
  function handleBusinessTypeChange(newRoleId) {
    setSelectedBusinessRoleId(newRoleId)
    switch (newRoleId) {
      case 'ground':
        setBusinessName('Marina International Stadium')
        setBusinessCustomField('Natural Red Soil Turf')
        setBusinessSubField('Floodlit Day/Night (800+ Lux)')
        break
      case 'academy':
        setBusinessName('Marina Titans Cricket Academy')
        setBusinessCustomField('U14, U19 & Pro Elite Batches')
        setBusinessSubField('4 Pitches + 6 Astro Nets')
        break
      case 'seller':
        setBusinessName('Titans Pro Willow & Gear Store')
        setBusinessCustomField('English Willow Bats & Kits')
        setBusinessSubField('Verified Factory Outlet')
        break
      case 'coach':
        setBusinessName('Coach Dev Anand (BCCI L2)')
        setBusinessCustomField('Batting Technique & Biomechanics')
        setBusinessSubField('BCCI Level 2 Certified')
        break
      case 'streamer':
        setBusinessName('ScoringCast Live Studio')
        setBusinessCustomField('1080p 60fps Broadcast Rig')
        setBusinessSubField('Cricket Tournament Specialist')
        break
      case 'sponsor':
        setBusinessName('Zenith Energy & Hydration')
        setBusinessCustomField('Tournament Title Sponsor')
        setBusinessSubField('Perimeter LED & Digital Banners')
        break
      default:
        setBusinessName('Sports Organization Entity')
        setBusinessCustomField('Standard Partner')
        setBusinessSubField('Verified Official')
    }
  }

  // Build roleDetails payload
  function buildRoleDetails() {
    if (accountType === 'player') {
      return {
        role: playerRole,
        battingStyle,
        bowlingStyle: bowlingAction,
        competitionLevel,
        sport: sportName,
        stage: 'Active Competitive Athlete',
      }
    }
    return {
      businessName: businessName.trim() || activeBusinessRole.name,
      roleTitle: activeBusinessRole.name,
      specialField: businessCustomField,
      subField: businessSubField,
      city: businessCity.trim() || 'Chennai',
    }
  }

  // Complete Registration or Sign In
  function handleFormSubmit(e) {
    if (e) e.preventDefault()
    setError('')

    const cleanPhone = phone.replace(/\D/g, '')
    const cleanEmail = email.trim()
    const handleName = username.trim() || (accountType === 'player' ? 'Athlete_Pro' : businessName || 'Official_Partner')

    // --- SIGN IN MODE ---
    if (activeTab === 'login') {
      const identifier = authMethod === 'mobile' ? cleanPhone : cleanEmail
      if (!identifier) {
        setError(authMethod === 'mobile' ? 'Please enter your mobile number.' : 'Please enter your email.')
        return
      }
      if (authMethod === 'mobile' && cleanPhone.length !== maxPhoneDigits) {
        setError(`Please enter a valid ${maxPhoneDigits}-digit mobile number for ${phoneCode}.`)
        return
      }
      if (authMethod === 'email' && !password.trim()) {
        setError('Please enter your account password.')
        return
      }

      loginWithIdentifier(identifier)
      navigate('/app', { replace: true })
      return
    }

    // --- REGISTER MODE ---
    if (!agreeTerms) {
      setError('Please agree to the platform terms and privacy policy to continue.')
      return
    }

    if (authMethod === 'mobile') {
      if (!cleanPhone || cleanPhone.length !== maxPhoneDigits) {
        setError(`Please enter a valid ${maxPhoneDigits}-digit mobile number for ${phoneCode}.`)
        return
      }
      if (!username.trim()) {
        setError('Please enter your name or handle.')
        return
      }
      // Open clean Mobile OTP dialog
      setShowOtpDialog(true)
      return
    }

    if (authMethod === 'email') {
      if (!cleanEmail || !cleanEmail.includes('@')) {
        setError('Please enter a valid email address.')
        return
      }
      if (!password || password.length < 6) {
        setError('Password must be at least 6 characters.')
        return
      }
      if (!username.trim()) {
        setError('Please enter your name or handle.')
        return
      }
    }

    // Direct registration with Email or Google
    executeSignup(cleanPhone, cleanEmail, handleName)
  }

  // Finalize signup and navigate to app
  function executeSignup(cleanPhone, cleanEmail, handleName) {
    const targetRoleId = accountType === 'player' ? 'player' : selectedBusinessRoleId
    const finalRoleDetails = buildRoleDetails()

    completeSignup({
      role: targetRoleId,
      roleCategory: accountType === 'player' ? 'player' : 'official',
      nickname: handleName,
      fullName: handleName,
      city: businessCity.trim() || 'Chennai',
      phoneCode,
      phone: cleanPhone || '9876543210',
      email: cleanEmail || `${handleName.toLowerCase().replace(/\s+/g, '')}@scoringheroes.com`,
      sportName,
      competitionLevel,
      roleDetails: finalRoleDetails,
      verified: true,
      onboardingComplete: true,
    })

    navigate('/app', { replace: true })
  }

  // Handle Mobile OTP verification
  function handleVerifyOtpSubmit(e) {
    if (e) e.preventDefault()
    if (inputOtp !== '1234' && inputOtp !== '0000') {
      setError('Invalid OTP code. Please enter demo OTP: 1234')
      return
    }

    setShowOtpDialog(false)
    setInputOtp('')
    const cleanPhone = phone.replace(/\D/g, '')
    const handleName = username.trim() || (accountType === 'player' ? 'Athlete_Pro' : businessName || 'Official_Partner')
    executeSignup(cleanPhone, email.trim(), handleName)
  }

  // 1-Tap Google Registration
  function handleGoogleAuth() {
    const googleEmail = 'athlete.sports@gmail.com'
    const handleName = username.trim() || (accountType === 'player' ? 'Athlete_Google' : businessName || 'Partner_Google')
    executeSignup('9876543210', googleEmail, handleName)
  }

  return (
    <div className="sh-white-page">
      {/* Header with Top Logo */}
      <header className="sh-white-header">
        <div className="sh-white-logo-wrap">
          <img src="/logo.png" alt="Scoring Heroes" />
        </div>
        <h1 className="sh-white-title">SCORING HEROES</h1>
        <p className="sh-white-subtitle">Universal Sports Platform · Indian & International Sports OS</p>
      </header>

      {/* Main Card */}
      <div className="sh-white-card">
        {/* Top Segmented Tab: Sign In vs Register */}
        <div className="sh-white-tab-bar">
          <button
            type="button"
            className={`sh-white-tab ${activeTab === 'login' ? 'is-active' : ''}`}
            onClick={() => {
              setActiveTab('login')
              setError('')
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`sh-white-tab ${activeTab === 'register' ? 'is-active' : ''}`}
            onClick={() => {
              setActiveTab('register')
              setError('')
            }}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="sh-white-form">
          {/* ============================================================== */}
          {/* REGISTER MODE: SINGLE PAGE FLOW (ROLE -> STATS -> AUTH TABS)  */}
          {/* ============================================================== */}
          {activeTab === 'register' && (
            <>
              {/* PHASE 1: TWO SIMPLE TABS FOR PLAYER VS BUSINESS */}
              <div style={{ marginBottom: 2 }}>
                <label className="sh-white-label" style={{ marginBottom: 6 }}>
                  <span>Select Registration Type</span>
                  <span className="sh-white-hint">Player or Business</span>
                </label>
                <div className="sh-white-role-tabs">
                  <button
                    type="button"
                    className={`sh-white-role-tab ${accountType === 'player' ? 'is-active' : ''}`}
                    onClick={() => setAccountType('player')}
                  >
                    <User size={16} color={accountType === 'player' ? '#e10613' : '#64748b'} />
                    <span>Player</span>
                  </button>
                  <button
                    type="button"
                    className={`sh-white-role-tab ${accountType === 'business' ? 'is-active' : ''}`}
                    onClick={() => setAccountType('business')}
                  >
                    <Building size={16} color={accountType === 'business' ? '#e10613' : '#64748b'} />
                    <span>Business</span>
                  </button>
                </div>
              </div>

              {/* PHASE 2A: IF PLAYER SELECTED -> OPEN PLAYER STATS */}
              {accountType === 'player' && (
                <div className="sh-white-stats-box">
                  <div className="sh-white-stats-header">
                    <div className="sh-white-stats-title">
                      <span className="sh-white-questions-dot" />
                      <span>Player Playstyle & Career Stats</span>
                    </div>
                    <span className="sh-white-hint">Cricket OS</span>
                  </div>

                  {/* Cricket Playing Role */}
                  <div className="sh-white-group">
                    <label className="sh-white-label">
                      <span>Cricket Playing Role</span>
                      <span className="sh-white-hint">{playerRole}</span>
                    </label>
                    <select
                      className="sh-white-select"
                      value={playerRole}
                      onChange={(e) => setPlayerRole(e.target.value)}
                    >
                      <option value="All-rounder">All-rounder</option>
                      <option value="Batsman">Batsman</option>
                      <option value="Bowler">Bowler</option>
                      <option value="Wicketkeeper">Wicketkeeper</option>
                    </select>
                  </div>

                  {/* Batting Stance */}
                  <div className="sh-white-group">
                    <label className="sh-white-label">
                      <span>Batting Stance</span>
                      <span className="sh-white-hint">{battingStance}</span>
                    </label>
                    <div className="sh-white-option-pills">
                      {['Right Hand Bat', 'Left Hand Bat'].map((stance) => (
                        <button
                          key={stance}
                          type="button"
                          className={`sh-white-option-pill ${battingStance === stance ? 'is-active' : ''}`}
                          onClick={() => setBattingStance(stance)}
                        >
                          {battingStance === stance && <Check size={12} strokeWidth={3} />}
                          <span>{stance}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bowling Action */}
                  <div className="sh-white-group">
                    <label className="sh-white-label">
                      <span>Bowling Action</span>
                      <span className="sh-white-hint">{bowlingAction}</span>
                    </label>
                    <select
                      className="sh-white-select"
                      value={bowlingAction}
                      onChange={(e) => setBowlingAction(e.target.value)}
                    >
                      <option value="Right-arm Fast">Right-arm Fast (Express Seam)</option>
                      <option value="Left-arm Fast">Left-arm Fast (Swing)</option>
                      <option value="Right-arm Offspin">Right-arm Offspin</option>
                      <option value="Left-arm Orthodox">Left-arm Orthodox Spin</option>
                      <option value="Legbreak Googly">Legbreak / Googly</option>
                      <option value="None">None (Pure Batsman / Wicketkeeper)</option>
                    </select>
                  </div>

                  {/* Competition Level */}
                  <div className="sh-white-group">
                    <label className="sh-white-label">
                      <span>Competition Level</span>
                      <span className="sh-white-hint">{competitionLevel}</span>
                    </label>
                    <div className="sh-white-option-pills">
                      {['District / State', 'National Level', 'International Level'].map((level) => (
                        <button
                          key={level}
                          type="button"
                          className={`sh-white-option-pill ${competitionLevel === level ? 'is-active' : ''}`}
                          onClick={() => setCompetitionLevel(level)}
                        >
                          {competitionLevel === level && <Check size={12} strokeWidth={3} />}
                          <span>{level}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* PHASE 2B: IF BUSINESS SELECTED -> DROPDOWN FOR BUSINESS TYPE THEN STATS ACCORDING TO TYPE */}
              {accountType === 'business' && (
                <div className="sh-white-stats-box">
                  <div className="sh-white-stats-header">
                    <div className="sh-white-stats-title">
                      <span className="sh-white-questions-dot" />
                      <span>Business Type & Profile Stats</span>
                    </div>
                    <span className="sh-white-hint">{activeBusinessRole.name}</span>
                  </div>

                  {/* Dropdown to select Business Type */}
                  <div className="sh-white-group">
                    <label className="sh-white-label">
                      <span>Select Business Type</span>
                      <span className="sh-white-hint">Required</span>
                    </label>
                    <select
                      className="sh-white-select"
                      value={selectedBusinessRoleId}
                      onChange={(e) => handleBusinessTypeChange(e.target.value)}
                      style={{ fontWeight: 700, borderColor: '#e10613' }}
                    >
                      {OFFICIAL_BUSINESS_ROLES.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.icon} {role.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dynamic Stats according to chosen business type */}
                  {selectedBusinessRoleId === 'ground' && (
                    <>
                      <div className="sh-white-group">
                        <label className="sh-white-label">Stadium / Ground Venue Name</label>
                        <input
                          type="text"
                          className="sh-white-input"
                          placeholder="e.g. Marina International Cricket Stadium"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="sh-white-row-split">
                        <div className="sh-white-group" style={{ flex: 1 }}>
                          <label className="sh-white-label">Pitch Classification</label>
                          <select
                            className="sh-white-select"
                            value={businessCustomField}
                            onChange={(e) => setBusinessCustomField(e.target.value)}
                          >
                            <option value="Natural Red Soil Turf">Natural Red Soil Turf</option>
                            <option value="Astro Turf Ground">Astro Turf Ground</option>
                            <option value="Hybrid Grass Turf">Hybrid Grass Turf</option>
                            <option value="Concrete Practice Nets">Concrete Practice Nets</option>
                          </select>
                        </div>
                        <div className="sh-white-group" style={{ flex: 1 }}>
                          <label className="sh-white-label">Floodlight Setup</label>
                          <select
                            className="sh-white-select"
                            value={businessSubField}
                            onChange={(e) => setBusinessSubField(e.target.value)}
                          >
                            <option value="Floodlit Day/Night (800+ Lux)">Day/Night 800+ Lux</option>
                            <option value="Day-Only Standard">Day-Only Standard</option>
                            <option value="Indoor Nets Only">Indoor Nets Only</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  {selectedBusinessRoleId === 'academy' && (
                    <>
                      <div className="sh-white-group">
                        <label className="sh-white-label">Academy / School Name</label>
                        <input
                          type="text"
                          className="sh-white-input"
                          placeholder="e.g. Marina Titans Sports Academy"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="sh-white-row-split">
                        <div className="sh-white-group" style={{ flex: 1 }}>
                          <label className="sh-white-label">Active Training Batches</label>
                          <select
                            className="sh-white-select"
                            value={businessCustomField}
                            onChange={(e) => setBusinessCustomField(e.target.value)}
                          >
                            <option value="U14, U19 & Pro Elite Batches">U14, U19 & Pro Batches</option>
                            <option value="Grassroots & School Only">Grassroots & School Only</option>
                            <option value="Elite High Performance">Elite High Performance</option>
                          </select>
                        </div>
                        <div className="sh-white-group" style={{ flex: 1 }}>
                          <label className="sh-white-label">Facilities</label>
                          <select
                            className="sh-white-select"
                            value={businessSubField}
                            onChange={(e) => setBusinessSubField(e.target.value)}
                          >
                            <option value="4 Pitches + 6 Astro Nets">4 Pitches + 6 Astro Nets</option>
                            <option value="Indoor Turf Nets & Machine">Indoor Nets & Machine</option>
                            <option value="Open Ground Turf">Open Ground Turf</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  {selectedBusinessRoleId === 'seller' && (
                    <>
                      <div className="sh-white-group">
                        <label className="sh-white-label">Storefront / Brand Name</label>
                        <input
                          type="text"
                          className="sh-white-input"
                          placeholder="e.g. Titans Pro Willow & Sports Gear"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="sh-white-group">
                        <label className="sh-white-label">Product Specialization</label>
                        <select
                          className="sh-white-select"
                          value={businessCustomField}
                          onChange={(e) => setBusinessCustomField(e.target.value)}
                        >
                          <option value="English Willow Bats & Kits">English Willow Bats & Kits</option>
                          <option value="Turf Spike Shoes & Apparel">Turf Spike Shoes & Apparel</option>
                          <option value="Helmets, Pads & Protective Gear">Helmets, Pads & Protective</option>
                          <option value="Cricket Leather Balls & Accessories">Leather Balls & Accessories</option>
                        </select>
                      </div>
                    </>
                  )}

                  {selectedBusinessRoleId === 'coach' && (
                    <>
                      <div className="sh-white-group">
                        <label className="sh-white-label">Coach Full Name & Title</label>
                        <input
                          type="text"
                          className="sh-white-input"
                          placeholder="e.g. Coach Dev Anand"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="sh-white-row-split">
                        <div className="sh-white-group" style={{ flex: 1 }}>
                          <label className="sh-white-label">Primary Specialization</label>
                          <select
                            className="sh-white-select"
                            value={businessCustomField}
                            onChange={(e) => setBusinessCustomField(e.target.value)}
                          >
                            <option value="Batting Technique & Biomechanics">Batting Technique</option>
                            <option value="Fast Bowling & Seam Release">Fast Bowling & Seam</option>
                            <option value="Spin Bowling & Tactical IQ">Spin Bowling & IQ</option>
                            <option value="Fielding & Physical Fitness">Fielding & Fitness</option>
                          </select>
                        </div>
                        <div className="sh-white-group" style={{ flex: 1 }}>
                          <label className="sh-white-label">License Certification</label>
                          <select
                            className="sh-white-select"
                            value={businessSubField}
                            onChange={(e) => setBusinessSubField(e.target.value)}
                          >
                            <option value="BCCI Level 2 Certified">BCCI Level 2 Certified</option>
                            <option value="BCCI Level 1 Certified">BCCI Level 1 Certified</option>
                            <option value="NIS National Diploma">NIS National Diploma</option>
                            <option value="State Board Certified">State Board Certified</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  {selectedBusinessRoleId === 'streamer' && (
                    <>
                      <div className="sh-white-group">
                        <label className="sh-white-label">Broadcast Channel / Studio Name</label>
                        <input
                          type="text"
                          className="sh-white-input"
                          placeholder="e.g. ScoringCast Live Studio"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="sh-white-group">
                        <label className="sh-white-label">Stream Camera Setup</label>
                        <select
                          className="sh-white-select"
                          value={businessCustomField}
                          onChange={(e) => setBusinessCustomField(e.target.value)}
                        >
                          <option value="1080p 60fps Multi-Cam Rig">1080p 60fps Multi-Cam Rig</option>
                          <option value="4K Optical Drone & Boundary Feed">4K Drone & Boundary Feed</option>
                          <option value="Mobile Live Broadcast Studio">Mobile Live Studio</option>
                        </select>
                      </div>
                    </>
                  )}

                  {selectedBusinessRoleId === 'sponsor' && (
                    <>
                      <div className="sh-white-group">
                        <label className="sh-white-label">Brand / Corporate Entity Name</label>
                        <input
                          type="text"
                          className="sh-white-input"
                          placeholder="e.g. Zenith Energy & Hydration"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="sh-white-group">
                        <label className="sh-white-label">Sponsorship Category</label>
                        <select
                          className="sh-white-select"
                          value={businessCustomField}
                          onChange={(e) => setBusinessCustomField(e.target.value)}
                        >
                          <option value="Tournament Title Sponsor">Tournament Title Sponsor</option>
                          <option value="Perimeter LED & Boundary Boards">Perimeter LED & Boundary</option>
                          <option value="Digital Live Stream Ad Partner">Digital Stream Ad Partner</option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* City for all business types */}
                  <div className="sh-white-group">
                    <label className="sh-white-label">Headquarters / City Location</label>
                    <input
                      type="text"
                      className="sh-white-input"
                      placeholder="e.g. Chennai"
                      value={businessCity}
                      onChange={(e) => setBusinessCity(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {/* ============================================================== */}
          {/* PHASE 3: AUTH METHOD (EMAIL, GOOGLE AUTH, MOBILE OTP SMALL TABS) */}
          {/* ============================================================== */}
          <div style={{ marginTop: activeTab === 'register' ? 6 : 0 }}>
            <label className="sh-white-label">
              <span>{activeTab === 'register' ? 'Verification & Contact Method' : 'Sign In Method'}</span>
              <span className="sh-white-hint">Choose one</span>
            </label>

            {/* 3 Simple Small Tabs */}
            <div className="sh-white-auth-tabs">
              <button
                type="button"
                className={`sh-white-auth-tab ${authMethod === 'mobile' ? 'is-active' : ''}`}
                onClick={() => {
                  setAuthMethod('mobile')
                  setError('')
                }}
              >
                <Zap size={14} color={authMethod === 'mobile' ? '#e10613' : '#64748b'} />
                <span>Mobile OTP</span>
              </button>

              <button
                type="button"
                className={`sh-white-auth-tab ${authMethod === 'email' ? 'is-active' : ''}`}
                onClick={() => {
                  setAuthMethod('email')
                  setError('')
                }}
              >
                <Mail size={14} color={authMethod === 'email' ? '#2563eb' : '#64748b'} />
                <span>Email</span>
              </button>

              <button
                type="button"
                className={`sh-white-auth-tab ${authMethod === 'google' ? 'is-active' : ''}`}
                onClick={() => {
                  setAuthMethod('google')
                  setError('')
                }}
              >
                <Globe size={14} color={authMethod === 'google' ? '#ea4335' : '#64748b'} />
                <span>Google</span>
              </button>
            </div>

            {/* TAB 1: MOBILE OTP INPUTS */}
            {authMethod === 'mobile' && (
              <>
                <div className="sh-white-group">
                  <label className="sh-white-label">
                    <span>Mobile Number</span>
                    <span className="sh-white-hint">
                      {phone.length}/{maxPhoneDigits} digits
                    </span>
                  </label>
                  <div className="sh-white-phone-wrap">
                    <CountryCodePicker
                      value={phoneCode}
                      onChange={handlePhoneCodeChange}
                      dropdownClassName="sh-white-picker-dropdown"
                    />
                    <input
                      type="tel"
                      className="sh-white-input sh-white-phone-input"
                      placeholder={phonePlaceholder}
                      value={phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {activeTab === 'register' && (
                  <div className="sh-white-group">
                    <label className="sh-white-label">
                      <span>Your Name</span>
                      <span className="sh-white-hint">Public handle</span>
                    </label>
                    <input
                      type="text"
                      className="sh-white-input"
                      placeholder="Enter your full name or handle"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                )}
              </>
            )}

            {/* TAB 2: EMAIL & PASSWORD INPUTS */}
            {authMethod === 'email' && (
              <>
                <div className="sh-white-group">
                  <label className="sh-white-label">Official Email Address</label>
                  <input
                    type="email"
                    className="sh-white-input"
                    placeholder="athlete@sports.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="sh-white-group">
                  <label className="sh-white-label">Account Password</label>
                  <div className="sh-white-password-wrap">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="sh-white-input"
                      placeholder="Min 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="sh-white-eye-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {activeTab === 'register' && (
                  <div className="sh-white-group">
                    <label className="sh-white-label">
                      <span>Your Name</span>
                      <span className="sh-white-hint">Public handle</span>
                    </label>
                    <input
                      type="text"
                      className="sh-white-input"
                      placeholder="Enter your full name or handle"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                )}
              </>
            )}

            {/* TAB 3: GOOGLE AUTH 1-TAP */}
            {authMethod === 'google' && (
              <div style={{ padding: '8px 0 4px' }}>
                {activeTab === 'register' && (
                  <div className="sh-white-group" style={{ marginBottom: 12 }}>
                    <label className="sh-white-label">
                      <span>Preferred Nickname</span>
                      <span className="sh-white-hint">Optional</span>
                    </label>
                    <input
                      type="text"
                      className="sh-white-input"
                      placeholder="e.g. Athlete_Pro"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                )}

                <button
                  type="button"
                  className="sh-white-google-btn"
                  onClick={handleGoogleAuth}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>
                    {activeTab === 'register' ? 'Sign Up with Google / Gmail' : 'Sign In with Google / Gmail'}
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Terms Checkbox */}
          {activeTab === 'register' && (
            <label className="sh-white-checkbox-label">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <span>I agree to the platform terms & privacy policy. Data is securely protected.</span>
            </label>
          )}

          {error && <p className="sh-white-error">{error}</p>}

          {/* SUBMIT BUTTON (FOR MOBILE OTP & EMAIL) */}
          {authMethod !== 'google' && (
            <button type="submit" className="sh-white-btn-primary">
              {activeTab === 'register'
                ? authMethod === 'mobile'
                  ? 'Verify via Mobile OTP & Register →'
                  : 'Complete Registration with Email →'
                : 'Sign In to Scoring Heroes →'}
            </button>
          )}
        </form>
      </div>

      {/* ============================================================== */}
      {/* MOBILE OTP VERIFICATION DIALOG                                  */}
      {/* ============================================================== */}
      {showOtpDialog && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
            zIndex: 9999,
          }}
          onClick={() => setShowOtpDialog(false)}
        >
          <div
            className="sh-white-card"
            style={{ maxWidth: 400, animation: 'shWhiteFadeIn 0.2s ease-out' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: '#fef2f2',
                  color: '#e10613',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 10,
                }}
              >
                <Zap size={22} />
              </div>
              <h3 style={{ margin: 0, fontSize: 18, color: '#0f172a' }}>Enter SMS OTP Code</h3>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748b' }}>
                Sent 4-digit code to <strong>{phoneCode} {phone}</strong>
              </p>
            </div>

            <form onSubmit={handleVerifyOtpSubmit} className="sh-white-form">
              <div className="sh-white-group">
                <input
                  type="text"
                  className="sh-white-input"
                  style={{ textAlign: 'center', letterSpacing: 8, fontSize: 24, fontWeight: 800 }}
                  placeholder="••••"
                  maxLength={4}
                  value={inputOtp}
                  onChange={(e) => setInputOtp(e.target.value.replace(/\D/g, ''))}
                  autoFocus
                  required
                />
              </div>

              <div
                style={{
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: 8,
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 12,
                  color: '#15803d',
                }}
              >
                <Sparkles size={14} />
                <span>Demo Sandbox OTP: <strong>1234</strong></span>
              </div>

              {error && <p className="sh-white-error">{error}</p>}

              <button type="submit" className="sh-white-btn-primary">
                Verify & Enter Arena →
              </button>

              <button
                type="button"
                className="sh-white-btn-ghost"
                onClick={() => {
                  setShowOtpDialog(false)
                  setError('')
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
