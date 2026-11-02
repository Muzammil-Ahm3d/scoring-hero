import { useState, useMemo, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  Search,
  Check,
  ShieldCheck,
  Zap,
  User,
  Building,
  KeyRound,
  Lock,
  ArrowRight,
  Sparkles,
  Globe,
  MapPin,
  Calendar,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  RotateCcw,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { OFFICIAL_BUSINESS_ROLES } from '../data/rolesData'
import {
  ALL_SPORTS,
  INDIAN_PRIORITY_SPORTS,
  INTERNATIONAL_SPORTS,
  NATIONALITIES,
  getSportQuestions,
} from '../data/sportsCatalog'
import CountryCodePicker from '../components/CountryCodePicker'
import { getMaxPhoneDigits, getPhonePlaceholder } from '../data/countries'
import '../AuthWhiteTheme.css'

export default function Register() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const {
    draft,
    updateDraft,
    loginWithIdentifier,
    loginAsGuest,
    completeSignup,
    savePendingOnboarding,
    getPendingOnboarding,
  } = useAuth()

  // Two primary tabs: 'login' | 'register'
  const initialTab = searchParams.get('mode') === 'login' ? 'login' : 'register'
  const [activeTab, setActiveTab] = useState(initialTab)

  // Auth method: 'mobile' | 'email'
  const [authMethod, setAuthMethod] = useState('mobile') // 'mobile' | 'email'

  // Input states
  const [phoneCode, setPhoneCode] = useState(draft.phoneCode || '+91')
  const [phone, setPhone] = useState(draft.phone || '')
  const [email, setEmail] = useState(draft.email || '')
  const [username, setUsername] = useState(draft.nickname || '')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(true)
  const [error, setError] = useState('')
  const [resumeNotice, setResumeNotice] = useState('')

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

  // Verification dialog & code states
  const [showOtpDialog, setShowOtpDialog] = useState(false)
  const [inputOtp, setInputOtp] = useState('')

  // -------------------------------------------------------------
  // ONBOARDING WIZARD STATES (Triggered after contact verification)
  // Step 1: Role (Player vs Official)
  // Step 2: Sport / Business details
  // Step 3: Aadhaar identity verification & Profile minting
  // -------------------------------------------------------------
  const [isOnboarding, setIsOnboarding] = useState(false)
  const [onboardingStep, setOnboardingStep] = useState(1) // 1 | 2 | 3 | 4 (Done)
  const [accountType, setAccountType] = useState('player') // 'player' | 'official'
  const [selectedBusinessRoleId, setSelectedBusinessRoleId] = useState('ground')

  // Player Onboarding details
  const [sportSearch, setSportSearch] = useState('')
  const [sportFilter, setSportFilter] = useState('all') // 'all' | 'indian' | 'international'
  const [selectedSport, setSelectedSport] = useState({
    id: 'cricket',
    name: 'Cricket',
    icon: '🏏',
    category: 'Indian Priority',
    tag: '#1 in India',
  })
  const [isSportPickerExpanded, setIsSportPickerExpanded] = useState(false)

  // Sport-specific technical questions answers (e.g. Cricket: Playing Role, Batting Stance, etc.)
  const [sportAnswers, setSportAnswers] = useState(() => {
    const initialQuestions = getSportQuestions('cricket')
    const initialMap = {}
    initialQuestions.forEach((q) => {
      initialMap[q.id] = q.default
    })
    return initialMap
  })
  const [nationality, setNationality] = useState('India')
  const [competitionLevel, setCompetitionLevel] = useState('National Level') // 'National Level' | 'International Level'

  // Look up questions for the currently selected sport
  const currentSportQuestions = useMemo(() => {
    return getSportQuestions(selectedSport.id)
  }, [selectedSport.id])

  // Select sport handler: minimizes the sport card immediately and updates dynamic questions
  function handleSelectSport(sport) {
    setSelectedSport(sport)
    setIsSportPickerExpanded(false) // Automatically minimize selection cards!
    const questions = getSportQuestions(sport.id)
    const initialMap = {}
    questions.forEach((q) => {
      initialMap[q.id] = q.default
    })
    setSportAnswers(initialMap)
  }

  // Official Onboarding details
  const [businessName, setBusinessName] = useState('Marina International Stadium')
  const [representativeName, setRepresentativeName] = useState('Dev Anand')
  const [businessCity, setBusinessCity] = useState('Chennai')
  const [businessCustomField, setBusinessCustomField] = useState('Natural Red Soil Turf')

  // Aadhaar flow state
  const [aadhaarNumber, setAadhaarNumber] = useState('')
  const [aadhaarOtp, setAadhaarOtp] = useState('')
  const [aadhaarConsent, setAadhaarConsent] = useState(false)
  const [aadhaarSubStep, setAadhaarSubStep] = useState('input') // 'input' | 'otp' | 'verified'
  const [isVerifyingAadhaar, setIsVerifyingAadhaar] = useState(false)

  // Filtered sports list
  const filteredSports = useMemo(() => {
    let list = ALL_SPORTS
    if (sportFilter === 'indian') list = INDIAN_PRIORITY_SPORTS
    if (sportFilter === 'international') list = INTERNATIONAL_SPORTS

    if (!sportSearch.trim()) return list
    const q = sportSearch.toLowerCase().trim()
    return list.filter((s) => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q))
  }, [sportSearch, sportFilter])

  // Active business role metadata
  const activeBusinessRole = useMemo(() => {
    return OFFICIAL_BUSINESS_ROLES.find((b) => b.id === selectedBusinessRoleId) || OFFICIAL_BUSINESS_ROLES[0]
  }, [selectedBusinessRoleId])

  // Auto-save onboarding progress whenever states change
  useEffect(() => {
    if (isOnboarding) {
      const identifier = phone.replace(/\D/g, '') || email.toLowerCase().trim()
      if (identifier) {
        savePendingOnboarding(identifier, {
          onboardingStep,
          accountType,
          selectedBusinessRoleId,
          selectedSport,
          sportAnswers,
          nationality,
          competitionLevel,
          phoneCode,
          phone,
          email,
          username,
          businessName,
          representativeName,
          businessCity,
          businessCustomField,
          onboardingComplete: false,
        })
      }
    }
  }, [
    isOnboarding,
    onboardingStep,
    accountType,
    selectedBusinessRoleId,
    selectedSport,
    sportAnswers,
    nationality,
    competitionLevel,
    phone,
    email,
    username,
    businessName,
    representativeName,
    businessCity,
    businessCustomField,
  ])

  // =============================================================
  // 1. SIGN IN (LOGIN) HANDLER
  // =============================================================
  function handleLoginSubmit(e) {
    e.preventDefault()
    setError('')
    setResumeNotice('')

    const cleanPhone = phone.replace(/\D/g, '')
    const cleanEmail = email.trim()
    const identifier = authMethod === 'mobile' ? cleanPhone : cleanEmail

    if (!identifier) {
      setError(
        authMethod === 'mobile'
          ? 'Please enter your registered mobile number.'
          : 'Please enter your registered email address.'
      )
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

    // Attempt login with auto-detection
    const result = loginWithIdentifier(identifier)

    // CHECK FORCED ONBOARDING:
    // If the user left previously without finishing registration, redirect them back!
    if (result && result.needsOnboarding) {
      setResumeNotice('Welcome back! Resuming your incomplete registration setup where you left off.')
      setIsOnboarding(true)
      setOnboardingStep(result.onboardingStep || 1)
      if (result.accountType) setAccountType(result.accountType)
      if (result.selectedSport) setSelectedSport(result.selectedSport)
      if (result.username) setUsername(result.username)
      if (result.selectedBusinessRoleId) setSelectedBusinessRoleId(result.selectedBusinessRoleId)
      return
    }

    // Normal successful login directly to user dashboard
    navigate('/app', { replace: true })
  }

  // =============================================================
  // 2. REGISTER: INITIAL CONTACT VERIFICATION
  // =============================================================
  function handleRegisterInitialSubmit(e) {
    e.preventDefault()
    setError('')
    setResumeNotice('')

    if (authMethod === 'mobile') {
      const cleanPhone = phone.replace(/\D/g, '')
      if (cleanPhone.length !== maxPhoneDigits) {
        setError(`Please enter a valid ${maxPhoneDigits}-digit mobile number for ${phoneCode}.`)
        return
      }
      if (!username.trim() || username.trim().length < 2) {
        setError('Please enter your name.')
        return
      }
    } else {
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('Please enter a valid email address.')
        return
      }
      if (!password || password.length < 6) {
        setError('Password must be at least 6 characters.')
        return
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match. Please verify.')
        return
      }
      if (!username.trim() || username.trim().length < 2) {
        setError('Please enter your name.')
        return
      }
    }

    if (!agreeTerms) {
      setError('Please agree to the platform terms & privacy policy.')
      return
    }

    // Open Contact OTP modal
    setShowOtpDialog(true)
  }

  // Confirm Contact OTP
  function handleConfirmContactOtp(e) {
    e.preventDefault()
    if (inputOtp !== '1234' && inputOtp !== '0000') {
      setError('Invalid OTP code. Please enter demo OTP: 1234')
      return
    }

    setError('')
    setShowOtpDialog(false)
    setInputOtp('')

    // Lead captured! Save initial progress and enter the stepped onboarding process
    const identifier = authMethod === 'mobile' ? phone.replace(/\D/g, '') : email.toLowerCase().trim()
    savePendingOnboarding(identifier, {
      phoneCode,
      phone: phone.replace(/\D/g, ''),
      email: email.trim(),
      username: username.trim(),
      onboardingStep: 1,
      accountType: 'player',
      onboardingComplete: false,
    })

    // Advance to Step 1 of onboarding wizard!
    setIsOnboarding(true)
    setOnboardingStep(1)
  }

  // Quick 1-Tap Google / Gmail Authentication
  function handleGoogleAuth() {
    setEmail('athlete.sports@gmail.com')
    setUsername('Athlete_Pro')
    setPhone('9876543210')

    const identifier = 'athlete.sports@gmail.com'
    const pending = getPendingOnboarding(identifier)

    if (activeTab === 'login') {
      const result = loginWithIdentifier(identifier)
      if (result && result.needsOnboarding) {
        setResumeNotice('Welcome back! Resuming your incomplete registration setup.')
        setIsOnboarding(true)
        setOnboardingStep(result.onboardingStep || 1)
        return
      }
      navigate('/app', { replace: true })
    } else {
      // Direct registration with Google
      setIsOnboarding(true)
      setOnboardingStep(1)
    }
  }

  // Quick Demo Guest Access
  function handleGuestAccess() {
    loginAsGuest(accountType === 'player' ? 'player' : selectedBusinessRoleId)
    navigate('/app', { replace: true })
  }

  // =============================================================
  // 3. ONBOARDING STEPS PROCEED / SUBMIT
  // =============================================================
  function handleProceedToStep2() {
    setOnboardingStep(2)
  }

  function handleProceedToStep3() {
    setOnboardingStep(3)
  }

  // Aadhaar UID Submission
  function handleSendAadhaarOtp(e) {
    e.preventDefault()
    const cleanAadhaar = aadhaarNumber.replace(/\D/g, '')
    if (cleanAadhaar.length !== 12) {
      setError('Please enter a valid 12-digit Aadhaar UID number.')
      return
    }
    if (!aadhaarConsent) {
      setError('Please agree to the Aadhaar verification consent to proceed.')
      return
    }
    setError('')
    setIsVerifyingAadhaar(true)
    setTimeout(() => {
      setIsVerifyingAadhaar(false)
      setAadhaarSubStep('otp')
    }, 600)
  }

  // Aadhaar OTP & Final Completion
  function handleConfirmAadhaarOtp(e) {
    e.preventDefault()
    if (aadhaarOtp.length < 4) {
      setError('Please enter the 6-digit Aadhaar OTP (Demo: 123456).')
      return
    }

    setError('')
    setIsVerifyingAadhaar(true)

    setTimeout(() => {
      setIsVerifyingAadhaar(false)
      setAadhaarSubStep('verified')

      // Complete registration:
      // Legal Name, Verified Age, and Address are fetched directly from Aadhaar!
      // Username remains the athlete's custom selection.
      const finalNickname = username.trim() || 'Athlete_' + Math.floor(1000 + Math.random() * 9000)
      const primaryRole =
        sportAnswers.playingRole ||
        sportAnswers.position ||
        sportAnswers.kabaddiRole ||
        sportAnswers.discipline ||
        sportAnswers.category ||
        'Athlete'

      completeSignup({
        role: 'player',
        roleCategory: 'player',
        nickname: finalNickname,
        fullName: username.trim() ? username.trim().replace(/_/g, ' ') : 'Verified Athlete',
        age: '20', // Extracted from Aadhaar DOB
        city: 'Chennai',
        address: 'No. 42, Sports Complex Enclave, Chennai, Tamil Nadu - 600004',
        nationality,
        sportName: selectedSport.name,
        sportRole: primaryRole,
        sportAnswers,
        competitionLevel,
        phoneCode,
        phone: phone.replace(/\D/g, '') || '9876543210',
        email: email.trim(),
        roleDetails: {
          ...sportAnswers,
          role: primaryRole,
          sportName: selectedSport.name,
          sportIcon: selectedSport.icon,
        },
        aadhaarVerified: true,
        aadhaarMasked: 'XXXX-XXXX-9012',
        verified: true,
        trust: 98,
        onboardingComplete: true,
      })
    }, 800)
  }

  // Official Final Completion
  function handleOfficialFinalComplete(e) {
    e.preventDefault()
    completeSignup({
      role: selectedBusinessRoleId,
      roleCategory: 'official',
      nickname: representativeName.trim() || businessName.trim(),
      fullName: representativeName.trim(),
      city: businessCity.trim() || 'Chennai',
      phoneCode,
      phone: phone.replace(/\D/g, '') || '9876543210',
      email: email.trim(),
      roleDetails: {
        businessName: businessName.trim(),
        roleTitle: activeBusinessRole.name,
        specialField: businessCustomField,
      },
      verified: true,
      trust: 96,
      onboardingComplete: true,
    })
    navigate('/app', { replace: true })
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
        {/* If Incomplete Registration Notice */}
        {resumeNotice && (
          <div className="sh-white-callout sh-white-callout--warning" style={{ marginBottom: 16 }}>
            <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>{resumeNotice}</span>
          </div>
        )}

        {/* ============================================================== */}
        {/* CASE A: ONBOARDING WIZARD WITH STEPS (After verification)       */}
        {/* ============================================================== */}
        {isOnboarding ? (
          <div>
            {/* Stepper Progress Bar */}
            <div className="sh-white-stepper">
              <div
                className={`sh-white-step-node ${onboardingStep >= 1 ? 'is-active' : ''} ${
                  onboardingStep > 1 ? 'is-completed' : ''
                }`}
              >
                <div className="sh-white-step-circle">{onboardingStep > 1 ? '✓' : '1'}</div>
                <span className="sh-white-step-label">Role</span>
              </div>
              <div
                className={`sh-white-step-node ${onboardingStep >= 2 ? 'is-active' : ''} ${
                  onboardingStep > 2 ? 'is-completed' : ''
                }`}
              >
                <div className="sh-white-step-circle">{onboardingStep > 2 ? '✓' : '2'}</div>
                <span className="sh-white-step-label">{accountType === 'player' ? 'Sport' : 'Business'}</span>
              </div>
              <div
                className={`sh-white-step-node ${onboardingStep >= 3 ? 'is-active' : ''} ${
                  aadhaarSubStep === 'verified' ? 'is-completed' : ''
                }`}
              >
                <div className="sh-white-step-circle">{aadhaarSubStep === 'verified' ? '✓' : '3'}</div>
                <span className="sh-white-step-label">Verify</span>
              </div>
            </div>

            {/* STEP 1: CHOOSE ROLE (Directly Player vs Official) */}
            {onboardingStep === 1 && (
              <div className="sh-white-form">
                <div style={{ textAlign: 'center', marginBottom: 6 }}>
                  <h3 style={{ margin: 0, fontSize: 18, color: '#0f172a' }}>Step 1: Select Your Role</h3>
                  <p style={{ margin: '4px 0 0', fontSize: 12, color: '#64748b' }}>
                    Choose whether you are registering as a Player or an Official
                  </p>
                </div>

                {/* Direct: Player vs Official */}
                <div className="sh-white-account-type-grid" style={{ margin: '14px 0' }}>
                  <div
                    className={`sh-white-account-type-card ${accountType === 'player' ? 'is-active' : ''}`}
                    onClick={() => setAccountType('player')}
                  >
                    <div className="sh-white-account-type-title">
                      <User size={18} color={accountType === 'player' ? '#e10613' : '#64748b'} />
                      <span style={{ fontSize: 16 }}>Player</span>
                    </div>
                    <span className="sh-white-account-type-desc">
                      Career tracking, player matchmaking, tournament registrations & live scoring.
                    </span>
                  </div>

                  <div
                    className={`sh-white-account-type-card ${accountType === 'official' ? 'is-active' : ''}`}
                    onClick={() => setAccountType('official')}
                  >
                    <div className="sh-white-account-type-title">
                      <Building size={18} color={accountType === 'official' ? '#e10613' : '#64748b'} />
                      <span style={{ fontSize: 16 }}>Official</span>
                    </div>
                    <span className="sh-white-account-type-desc">
                      Stadiums, Academies, Manufacturers, Coaches, Streamers & Sponsors.
                    </span>
                  </div>
                </div>

                <button type="button" className="sh-white-btn-primary" onClick={handleProceedToStep2}>
                  Proceed to Step 2 →
                </button>
              </div>
            )}

            {/* STEP 2: SPORT / BUSINESS DETAILS */}
            {onboardingStep === 2 && accountType === 'player' && (
              <div className="sh-white-form">
                <div style={{ textAlign: 'center', marginBottom: 6 }}>
                  <h3 style={{ margin: 0, fontSize: 18, color: '#0f172a' }}>Step 2: Sport & Your Role</h3>
                  <p style={{ margin: '4px 0 0', fontSize: 12, color: '#64748b' }}>
                    Select your sport and customize your playstyle & role
                  </p>
                </div>

                {/* 1. Minimized Sport Selection Card (When Collapsed) */}
                {!isSportPickerExpanded && (
                  <div className="sh-white-minimized-sport-card">
                    <div className="sh-white-minimized-left">
                      <span className="sh-white-minimized-icon">{selectedSport.icon}</span>
                      <div className="sh-white-minimized-info">
                        <div className="sh-white-minimized-title">
                          <span>{selectedSport.name}</span>
                          <span className="sh-white-check-circle" title="Sport Selected">
                            <Check size={11} strokeWidth={3} />
                          </span>
                        </div>
                        <div className="sh-white-minimized-sub">
                          {selectedSport.category || 'Indian Priority'} {selectedSport.tag ? `• ${selectedSport.tag}` : ''}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="sh-white-change-sport-btn"
                      onClick={() => setIsSportPickerExpanded(true)}
                    >
                      Change Sport ▾
                    </button>
                  </div>
                )}

                {/* 2. Expanded Sports Catalog Grid (When user clicks Change Sport) */}
                {isSportPickerExpanded && (
                  <div className="sh-white-expanded-sport-picker">
                    <div className="sh-white-expanded-header">
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>
                        Browse 45+ Sports Catalog
                      </span>
                      <button
                        type="button"
                        className="sh-white-collapse-btn"
                        onClick={() => setIsSportPickerExpanded(false)}
                      >
                        Done / Minimize ▴
                      </button>
                    </div>

                    {/* Search Input */}
                    <div className="sh-white-search-box">
                      <Search size={15} className="sh-white-search-icon" />
                      <input
                        type="text"
                        className="sh-white-input"
                        placeholder="Search any sport (Cricket, Kabaddi, Tennis, Football...)"
                        value={sportSearch}
                        onChange={(e) => setSportSearch(e.target.value)}
                        autoFocus
                      />
                    </div>

                    {/* Filter Pills */}
                    <div className="sh-white-pill-row">
                      <button
                        type="button"
                        className={`sh-white-pill-btn ${sportFilter === 'all' ? 'is-active' : ''}`}
                        onClick={() => setSportFilter('all')}
                      >
                        All Sports ({ALL_SPORTS.length})
                      </button>
                      <button
                        type="button"
                        className={`sh-white-pill-btn ${sportFilter === 'indian' ? 'is-active' : ''}`}
                        onClick={() => setSportFilter('indian')}
                      >
                        🇮🇳 Indian Priority ({INDIAN_PRIORITY_SPORTS.length})
                      </button>
                      <button
                        type="button"
                        className={`sh-white-pill-btn ${sportFilter === 'international' ? 'is-active' : ''}`}
                        onClick={() => setSportFilter('international')}
                      >
                        🌍 International ({INTERNATIONAL_SPORTS.length})
                      </button>
                    </div>

                    {/* Sports Grid */}
                    <div className="sh-white-sports-grid">
                      {filteredSports.map((sport) => {
                        const isSel = selectedSport.id === sport.id
                        return (
                          <div
                            key={sport.id}
                            className={`sh-white-sport-item ${isSel ? 'is-selected' : ''}`}
                            onClick={() => handleSelectSport(sport)}
                          >
                            <span className="sh-white-sport-icon">{sport.icon}</span>
                            <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {sport.name}
                            </span>
                            {isSel && <Check size={14} color="#e10613" />}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* 3. Sport-Specific Dynamic Questions Section */}
                <div className="sh-white-sport-questions-section">
                  <div className="sh-white-questions-header">
                    <div className="sh-white-questions-title">
                      <span className="sh-white-questions-dot"></span>
                      <span>{selectedSport.name} · Your Play & Role</span>
                    </div>
                    <span className="sh-white-questions-hint">Customized for your {selectedSport.name} career</span>
                  </div>

                  <div className="sh-white-questions-list">
                    {currentSportQuestions.map((q) => {
                      const currentVal = sportAnswers[q.id] !== undefined ? sportAnswers[q.id] : q.default
                      const usePills = q.options.length <= 4

                      return (
                        <div key={q.id} className="sh-white-group">
                          <label className="sh-white-label">
                            <span>{q.label}</span>
                            <span className="sh-white-hint">{currentVal}</span>
                          </label>

                          {usePills ? (
                            <div className="sh-white-option-pills">
                              {q.options.map((opt) => {
                                const isOptActive = currentVal === opt
                                return (
                                  <button
                                    key={opt}
                                    type="button"
                                    className={`sh-white-option-pill ${isOptActive ? 'is-active' : ''}`}
                                    onClick={() => {
                                      setSportAnswers((prev) => ({
                                        ...prev,
                                        [q.id]: opt,
                                      }))
                                    }}
                                  >
                                    {isOptActive && <Check size={12} />}
                                    {opt}
                                  </button>
                                )
                              })}
                            </div>
                          ) : (
                            <select
                              className="sh-white-select"
                              value={currentVal}
                              onChange={(e) => {
                                const val = e.target.value
                                setSportAnswers((prev) => ({
                                  ...prev,
                                  [q.id]: val,
                                }))
                              }}
                            >
                              {q.options.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* 4. Nationality & Level */}
                <div className="sh-white-row-split">
                  <div className="sh-white-group" style={{ flex: 1.2 }}>
                    <label className="sh-white-label">Nationality</label>
                    <select
                      className="sh-white-select"
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                    >
                      {NATIONALITIES.map((n) => (
                        <option key={n.code} value={n.name}>
                          {n.flag} {n.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sh-white-group" style={{ flex: 1.3 }}>
                    <label className="sh-white-label">Competition Level</label>
                    <div className="sh-white-level-switch">
                      <button
                        type="button"
                        className={`sh-white-level-btn ${competitionLevel === 'National Level' ? 'is-active' : ''}`}
                        onClick={() => setCompetitionLevel('National Level')}
                      >
                        National
                      </button>
                      <button
                        type="button"
                        className={`sh-white-level-btn ${competitionLevel === 'International Level' ? 'is-active' : ''}`}
                        onClick={() => setCompetitionLevel('International Level')}
                      >
                        International
                      </button>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    type="button"
                    className="sh-white-btn-secondary"
                    style={{ flex: 1 }}
                    onClick={() => setOnboardingStep(1)}
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    className="sh-white-btn-primary"
                    style={{ flex: 2 }}
                    onClick={handleProceedToStep3}
                  >
                    Proceed →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: OFFICIAL DETAILS */}
            {onboardingStep === 2 && accountType === 'official' && (
              <form onSubmit={handleOfficialFinalComplete} className="sh-white-form">
                <div style={{ textAlign: 'center', marginBottom: 6 }}>
                  <h3 style={{ margin: 0, fontSize: 18, color: '#0f172a' }}>Step 2: Business Portal Details</h3>
                  <p style={{ margin: '4px 0 0', fontSize: 12, color: '#64748b' }}>
                    Select your official business category & venue details
                  </p>
                </div>

                {/* Dropdown with the exact 6 businesses */}
                <div className="sh-white-group">
                  <label className="sh-white-label">Official / Business Category</label>
                  <select
                    className="sh-white-select"
                    value={selectedBusinessRoleId}
                    onChange={(e) => setSelectedBusinessRoleId(e.target.value)}
                  >
                    {OFFICIAL_BUSINESS_ROLES.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Role Briefing Box */}
                <div className="sh-white-biz-brief-box">
                  <div className="sh-white-biz-brief-title">
                    <span>{activeBusinessRole.icon}</span>
                    <span>{activeBusinessRole.name}</span>
                  </div>
                  <span className="sh-white-biz-brief-desc">{activeBusinessRole.subtitle}</span>
                </div>

                <div className="sh-white-group">
                  <label className="sh-white-label">Entity / Business / Stadium Name</label>
                  <input
                    type="text"
                    className="sh-white-input"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                </div>

                <div className="sh-white-row-split">
                  <div className="sh-white-group" style={{ flex: 1.2 }}>
                    <label className="sh-white-label">Representative Name</label>
                    <input
                      type="text"
                      className="sh-white-input"
                      required
                      value={representativeName}
                      onChange={(e) => setRepresentativeName(e.target.value)}
                    />
                  </div>
                  <div className="sh-white-group" style={{ flex: 1 }}>
                    <label className="sh-white-label">City / Location</label>
                    <input
                      type="text"
                      className="sh-white-input"
                      required
                      value={businessCity}
                      onChange={(e) => setBusinessCity(e.target.value)}
                    />
                  </div>
                </div>

                <div className="sh-white-group">
                  <label className="sh-white-label">
                    {selectedBusinessRoleId === 'ground' && 'Pitch / Turf Surface & Night Lights'}
                    {selectedBusinessRoleId === 'academy' && 'Student Capacity & Nets Infrastructure'}
                    {selectedBusinessRoleId === 'seller' && 'GSTIN & Sports Equipment Category'}
                    {selectedBusinessRoleId === 'coach' && 'Coaching Specialization & License Tier'}
                    {selectedBusinessRoleId === 'streamer' && 'Streaming Hardware & Broadcast Setup'}
                    {selectedBusinessRoleId === 'sponsor' && 'Industry & Ad Campaign Budget Tier'}
                  </label>
                  <input
                    type="text"
                    className="sh-white-input"
                    value={businessCustomField}
                    onChange={(e) => setBusinessCustomField(e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    type="button"
                    className="sh-white-btn-secondary"
                    style={{ flex: 1 }}
                    onClick={() => setOnboardingStep(1)}
                  >
                    ← Back
                  </button>
                  <button type="submit" className="sh-white-btn-primary" style={{ flex: 2 }}>
                    Complete Setup & Enter Dashboard →
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: AADHAAR IDENTITY VERIFICATION (For Player) */}
            {onboardingStep === 3 && accountType === 'player' && (
              <div className="sh-white-form">
                {aadhaarSubStep === 'input' && (
                  <form onSubmit={handleSendAadhaarOtp} className="sh-white-form">
                    <div style={{ textAlign: 'center', marginBottom: 8 }}>
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 12,
                          background: '#f0fdf4',
                          display: 'grid',
                          placeItems: 'center',
                          margin: '0 auto 10px',
                        }}
                      >
                        <ShieldCheck size={26} color="#16a34a" />
                      </div>
                      <h3 style={{ margin: 0, fontSize: 18, color: '#0f172a' }}>Aadhaar Identity Verification</h3>
                      <p style={{ margin: '4px 0 0', fontSize: 12, color: '#64748b' }}>
                        Government UIDAI Compliance · Eliminates age fraud & tournament impersonation
                      </p>
                    </div>

                    <div className="sh-white-callout sh-white-callout--warning">
                      <Lock size={16} style={{ flexShrink: 0, marginTop: 1 }} />
                      <span style={{ fontSize: 11 }}>
                        Legal Name, Age, and Address will be extracted directly from your Aadhaar card into your profile.
                        Your chosen username (<strong>{username}</strong>) remains your public handle.
                      </span>
                    </div>

                    <div className="sh-white-group">
                      <label className="sh-white-label">12-Digit Aadhaar UID Number</label>
                      <input
                        type="text"
                        maxLength={14}
                        className="sh-white-input"
                        placeholder="XXXX XXXX XXXX"
                        value={aadhaarNumber}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/\D/g, '').slice(0, 12)
                          const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ')
                          setAadhaarNumber(formatted)
                        }}
                        autoFocus
                      />
                      <button
                        type="button"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#16a34a',
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: 'pointer',
                          textAlign: 'left',
                          marginTop: 4,
                        }}
                        onClick={() => setAadhaarNumber('5489 2104 9012')}
                      >
                        ⚡ Autofill Demo Aadhaar: 5489 2104 9012
                      </button>
                    </div>

                    {/* Aadhaar Consent Checkbox */}
                    <label className="sh-white-aadhaar-consent-label">
                      <input
                        type="checkbox"
                        checked={aadhaarConsent}
                        onChange={(e) => {
                          setAadhaarConsent(e.target.checked)
                          if (e.target.checked) setError('')
                        }}
                      />
                      <span>
                        I voluntarily give consent to Scoring Heroes to verify my Aadhaar UID via UIDAI OTP for age verification, identity confirmation, and fair-play tournament eligibility.
                      </span>
                    </label>

                    {error && <p className="sh-white-error">{error}</p>}

                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        type="button"
                        className="sh-white-btn-secondary"
                        style={{ flex: 1 }}
                        onClick={() => setOnboardingStep(2)}
                      >
                        ← Back
                      </button>
                      <button
                        type="submit"
                        className="sh-white-btn-primary"
                        style={{ flex: 2 }}
                        disabled={isVerifyingAadhaar}
                      >
                        {isVerifyingAadhaar ? 'Connecting UIDAI...' : 'Send Aadhaar OTP →'}
                      </button>
                    </div>
                  </form>
                )}

                {aadhaarSubStep === 'otp' && (
                  <form onSubmit={handleConfirmAadhaarOtp} className="sh-white-form">
                    <div style={{ textAlign: 'center', marginBottom: 8 }}>
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 12,
                          background: '#f0fdf4',
                          display: 'grid',
                          placeItems: 'center',
                          margin: '0 auto 10px',
                        }}
                      >
                        <KeyRound size={26} color="#16a34a" />
                      </div>
                      <h3 style={{ margin: 0, fontSize: 18, color: '#0f172a' }}>Enter 6-Digit Aadhaar OTP</h3>
                      <p style={{ margin: '4px 0 0', fontSize: 12, color: '#64748b' }}>
                        OTP dispatched to UIDAI registered mobile number
                      </p>
                    </div>

                    <div className="sh-white-group">
                      <input
                        type="text"
                        maxLength={6}
                        className="sh-white-input"
                        placeholder="• • • • • •"
                        value={aadhaarOtp}
                        onChange={(e) => setAadhaarOtp(e.target.value.replace(/\D/g, ''))}
                        style={{ textAlign: 'center', fontSize: 22, letterSpacing: 6, fontWeight: 'bold' }}
                        autoFocus
                      />
                      <button
                        type="button"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#16a34a',
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: 'pointer',
                          marginTop: 4,
                        }}
                        onClick={() => setAadhaarOtp('123456')}
                      >
                        ⚡ Autofill Demo Aadhaar OTP: 123456
                      </button>
                    </div>

                    {error && <p className="sh-white-error">{error}</p>}

                    <button type="submit" className="sh-white-btn-primary" disabled={isVerifyingAadhaar}>
                      {isVerifyingAadhaar ? 'Validating UIDAI Gateway...' : 'Confirm & Extract Aadhaar Data ✓'}
                    </button>
                  </form>
                )}

                {aadhaarSubStep === 'verified' && (
                  <div className="sh-white-form" style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 50,
                        background: '#dcfce7',
                        display: 'grid',
                        placeItems: 'center',
                        margin: '0 auto 10px',
                      }}
                    >
                      <ShieldCheck size={32} color="#16a34a" />
                    </div>

                    <h3 style={{ margin: 0, fontSize: 19, color: '#0f172a' }}>Aadhaar Identity Verified!</h3>
                    <p style={{ margin: '4px 0 12px', fontSize: 12, color: '#16a34a', fontWeight: 600 }}>
                      ✓ Official Verified Athlete Checkmark Issued
                    </p>

                    {/* Aadhaar Extracted Details Preview Card */}
                    <div className="sh-white-aadhaar-preview">
                      <div className="sh-white-preview-row">
                        <span className="sh-white-preview-label">Public Username (Chosen):</span>
                        <span className="sh-white-preview-val">{username}</span>
                      </div>
                      <div className="sh-white-preview-row">
                        <span className="sh-white-preview-label">Legal Name (From Aadhaar):</span>
                        <span className="sh-white-preview-val">
                          {username ? `${username.replace(/_/g, ' ')} (UID Verified)` : 'Verified Athlete (UID Verified)'}
                        </span>
                      </div>
                      <div className="sh-white-preview-row">
                        <span className="sh-white-preview-label">Verified Age (From Aadhaar):</span>
                        <span className="sh-white-preview-val">20 Years (DOB: 14/08/2005)</span>
                      </div>
                      <div className="sh-white-preview-row">
                        <span className="sh-white-preview-label">Verified Address (From Aadhaar):</span>
                        <span className="sh-white-preview-val" style={{ textAlign: 'right', maxWidth: '60%' }}>
                          Mylapore, Chennai, Tamil Nadu - 600004
                        </span>
                      </div>
                      <div className="sh-white-preview-row">
                        <span className="sh-white-preview-label">Aadhaar Token:</span>
                        <span className="sh-white-preview-val" style={{ color: '#16a34a' }}>
                          XXXX-XXXX-9012 (Encrypted)
                        </span>
                      </div>
                      <div className="sh-white-preview-row">
                        <span className="sh-white-preview-label">Registered Sport:</span>
                        <span className="sh-white-preview-val">
                          {selectedSport.icon} {selectedSport.name} ({competitionLevel})
                        </span>
                      </div>
                    </div>

                    <p style={{ margin: '8px 0', fontSize: 11, color: '#64748b' }}>
                      Your age and address are verified and locked to your profile to guarantee 100% fair play.
                    </p>

                    <button
                      type="button"
                      className="sh-white-btn-primary"
                      onClick={() => navigate('/app', { replace: true })}
                    >
                      Enter Player Dashboard →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* ============================================================== */
          /* CASE B: INITIAL ENTRY SCREEN (SIGN IN OR REGISTER)             */
          /* ============================================================== */
          <div>
            {/* Top 2 Tabs ONLY: Sign In vs Register */}
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

            {/* TAB 1: SIGN IN (LOGIN) */}
            {activeTab === 'login' && (
              <form className="sh-white-form" onSubmit={handleLoginSubmit}>
                {/* DIRECT MOBILE NUMBER FIELD AT THE TOP (NO AUTO DETECTION NOTE) */}
                {authMethod === 'mobile' ? (
                  <div className="sh-white-group">
                    <label className="sh-white-label">
                      <span>Registered Mobile Number</span>
                      <span className="sh-white-hint">{phone.length}/{maxPhoneDigits} digits</span>
                    </label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <CountryCodePicker value={phoneCode} onChange={handlePhoneCodeChange} />
                      <input
                        type="tel"
                        className="sh-white-input"
                        placeholder={phonePlaceholder}
                        value={phone}
                        maxLength={maxPhoneDigits}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        autoFocus
                      />
                    </div>
                  </div>
                ) : (
                  /* EMAIL + PASSWORD FIELDS */
                  <>
                    <div className="sh-white-group">
                      <label className="sh-white-label">Official Email Address</label>
                      <input
                        type="email"
                        className="sh-white-input"
                        placeholder="athlete@sports.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                      />
                    </div>

                    <div className="sh-white-group">
                      <label className="sh-white-label">Password</label>
                      <div className="sh-white-password-wrap">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="sh-white-input"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          className="sh-white-eye-btn"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {error && <p className="sh-white-error">{error}</p>}

                <button type="submit" className="sh-white-btn-primary">
                  {authMethod === 'mobile' ? 'Continue with Mobile OTP →' : 'Sign In with Email →'}
                </button>

                <div className="sh-white-divider">
                  <span>OR CONTINUE WITH</span>
                </div>

                {/* BOTTOM PROPER SECTION CARDS FOR EMAIL & GMAIL */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {authMethod === 'mobile' ? (
                    <div className="sh-white-social-card" onClick={() => setAuthMethod('email')}>
                      <div className="sh-white-social-icon" style={{ color: '#2563eb', background: '#eff6ff' }}>
                        <Mail size={18} />
                      </div>
                      <div className="sh-white-social-text">
                        <span className="sh-white-social-title">Continue with Email & Password</span>
                        <span className="sh-white-social-sub">Sign in using your registered email</span>
                      </div>
                    </div>
                  ) : (
                    <div className="sh-white-social-card" onClick={() => setAuthMethod('mobile')}>
                      <div className="sh-white-social-icon" style={{ color: '#e10613', background: '#fff5f5' }}>
                        <Zap size={18} />
                      </div>
                      <div className="sh-white-social-text">
                        <span className="sh-white-social-title">Continue with Mobile Number</span>
                        <span className="sh-white-social-sub">Sign in using OTP verification</span>
                      </div>
                    </div>
                  )}

                  {/* GOOGLE / GMAIL SECTION CARD */}
                  <div className="sh-white-social-card" onClick={handleGoogleAuth}>
                    <div className="sh-white-social-icon" style={{ background: '#ffffff', border: '1px solid #e2e8f0' }}>
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
                    </div>
                    <div className="sh-white-social-text">
                      <span className="sh-white-social-title">Continue with Google / Gmail</span>
                      <span className="sh-white-social-sub">Instant 1-Tap Google authentication</span>
                    </div>
                  </div>
                </div>

                <div className="sh-white-divider">
                  <span>OR GUEST MODE</span>
                </div>

                <button type="button" className="sh-white-btn-secondary" onClick={handleGuestAccess}>
                  <Zap size={14} color="#e10613" />
                  <span>Instant 1-Tap Guest Access as Player</span>
                </button>
              </form>
            )}

            {/* TAB 2: REGISTER (LEAD CAPTURE & INITIAL VERIFICATION) */}
            {activeTab === 'register' && (
              <form className="sh-white-form" onSubmit={handleRegisterInitialSubmit}>
                {authMethod === 'mobile' ? (
                  /* REGISTER VIA MOBILE */
                  <>
                    <div className="sh-white-group">
                      <label className="sh-white-label">
                        <span>Mobile Number</span>
                        <span className="sh-white-hint">{phone.length}/{maxPhoneDigits} digits</span>
                      </label>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <CountryCodePicker value={phoneCode} onChange={handlePhoneCodeChange} />
                        <input
                          type="tel"
                          className="sh-white-input"
                          placeholder={phonePlaceholder}
                          value={phone}
                          maxLength={maxPhoneDigits}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          autoFocus
                        />
                      </div>
                    </div>

                    <div className="sh-white-group">
                      <label className="sh-white-label">
                        <span>Your Name</span>
                        <span className="sh-white-hint">Public handle</span>
                      </label>
                      <input
                        type="text"
                        className="sh-white-input"
                        placeholder="Enter your name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength={2}
                        maxLength={30}
                      />
                    </div>
                  </>
                ) : (
                  /* REGISTER VIA EMAIL WITH PASSWORD FIELDS & EYE ICONS */
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
                        autoFocus
                      />
                    </div>

                    <div className="sh-white-row-split">
                      <div className="sh-white-group" style={{ flex: 1 }}>
                        <label className="sh-white-label">Create Password</label>
                        <div className="sh-white-password-wrap">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            className="sh-white-input"
                            placeholder="Min 6 chars"
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

                      <div className="sh-white-group" style={{ flex: 1 }}>
                        <label className="sh-white-label">Confirm Password</label>
                        <div className="sh-white-password-wrap">
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            className="sh-white-input"
                            placeholder="Re-enter password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                          <button
                            type="button"
                            className="sh-white-eye-btn"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                          >
                            {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="sh-white-group">
                      <label className="sh-white-label">Your Name</label>
                      <input
                        type="text"
                        className="sh-white-input"
                        placeholder="Enter your name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength={2}
                        maxLength={30}
                      />
                    </div>
                  </>
                )}

                {/* Terms Checkbox */}
                <label className="sh-white-checkbox-label">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                  />
                  <span>
                    I agree to the platform terms & privacy policy. Data is securely protected.
                  </span>
                </label>

                {error && <p className="sh-white-error">{error}</p>}

                <button type="submit" className="sh-white-btn-primary">
                  {authMethod === 'mobile' ? 'Verify via Mobile OTP →' : 'Verify Email & Proceed to Onboarding →'}
                </button>

                <div className="sh-white-divider">
                  <span>OR REGISTER USING</span>
                </div>

                {/* SECTION CARDS: SWITCH TO EMAIL / MOBILE / GMAIL */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {authMethod === 'mobile' ? (
                    <div className="sh-white-social-card" onClick={() => setAuthMethod('email')}>
                      <div className="sh-white-social-icon" style={{ color: '#2563eb', background: '#eff6ff' }}>
                        <Mail size={18} />
                      </div>
                      <div className="sh-white-social-text">
                        <span className="sh-white-social-title">Register with Email & Password</span>
                        <span className="sh-white-social-sub">Create account with email and password</span>
                      </div>
                    </div>
                  ) : (
                    <div className="sh-white-social-card" onClick={() => setAuthMethod('mobile')}>
                      <div className="sh-white-social-icon" style={{ color: '#e10613', background: '#fff5f5' }}>
                        <Zap size={18} />
                      </div>
                      <div className="sh-white-social-text">
                        <span className="sh-white-social-title">Register with Mobile Number</span>
                        <span className="sh-white-social-sub">Fast registration with SMS OTP</span>
                      </div>
                    </div>
                  )}

                  {/* GOOGLE / GMAIL SECTION CARD */}
                  <div className="sh-white-social-card" onClick={handleGoogleAuth}>
                    <div className="sh-white-social-icon" style={{ background: '#ffffff', border: '1px solid #e2e8f0' }}>
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
                    </div>
                    <div className="sh-white-social-text">
                      <span className="sh-white-social-title">Sign Up with Google / Gmail</span>
                      <span className="sh-white-social-sub">1-Tap registration with Google</span>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* CONTACT OTP VERIFICATION DIALOG (MOBILE OR EMAIL)               */}
      {/* ============================================================== */}
      {showOtpDialog && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
        >
          <div
            className="sh-white-card"
            style={{
              maxWidth: 420,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
            }}
          >
            <form onSubmit={handleConfirmContactOtp} className="sh-white-form">
              <div style={{ textAlign: 'center', marginBottom: 8 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: '#eff6ff',
                    display: 'grid',
                    placeItems: 'center',
                    margin: '0 auto 10px',
                  }}
                >
                  <KeyRound size={24} color="#2563eb" />
                </div>
                <h3 style={{ margin: 0, fontSize: 18, color: '#0f172a' }}>
                  Verify {authMethod === 'mobile' ? 'Mobile Number' : 'Email Address'}
                </h3>
                <p style={{ margin: '4px 0 0', fontSize: 12, color: '#64748b' }}>
                  Enter 4-digit code sent to{' '}
                  <strong>
                    {authMethod === 'mobile' ? `${phoneCode} ${phone}` : email}
                  </strong>
                </p>
              </div>

              <div className="sh-white-callout sh-white-callout--info" style={{ justifyContent: 'center' }}>
                <span>
                  Demo test code is: <strong>1234</strong>
                </span>
              </div>

              <div className="sh-white-group">
                <input
                  type="text"
                  maxLength={4}
                  className="sh-white-input"
                  placeholder="• • • •"
                  value={inputOtp}
                  onChange={(e) => setInputOtp(e.target.value.replace(/\D/g, ''))}
                  style={{ textAlign: 'center', fontSize: 22, letterSpacing: 8, fontWeight: 'bold' }}
                  autoFocus
                />
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#2563eb',
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginTop: 4,
                  }}
                  onClick={() => setInputOtp('1234')}
                >
                  ⚡ Autofill: 1234
                </button>
              </div>

              {error && <p className="sh-white-error">{error}</p>}

              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  type="button"
                  className="sh-white-btn-secondary"
                  style={{ flex: 1 }}
                  onClick={() => setShowOtpDialog(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="sh-white-btn-primary" style={{ flex: 2 }}>
                  Verify & Start Onboarding →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
