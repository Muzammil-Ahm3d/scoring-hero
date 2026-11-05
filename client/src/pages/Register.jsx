import { useState, useMemo, useEffect } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import {
  User,
  Building,
  Check,
  AlertCircle,
  Mail,
  Zap,
  Globe,
  Sparkles,
  ArrowRight,
  Plus,
  ArrowLeft,
  ShieldCheck,
  Compass,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { OFFICIAL_BUSINESS_ROLES } from '../data/rolesData'
import CountryCodePicker from '../components/CountryCodePicker'
import { getMaxPhoneDigits, getPhonePlaceholder } from '../data/countries'
import '../AuthWhiteTheme.css'

const SPORTS_LIST = [
  { id: 'cricket', name: 'Cricket', icon: '🏏', roles: ['All-rounder', 'Batsman', 'Fast Bowler', 'Spin Bowler', 'Wicketkeeper'] },
  { id: 'football', name: 'Football (Soccer)', icon: '⚽', roles: ['Striker / Forward', 'Winger (LW/RW)', 'Midfielder (CAM/CM)', 'Defender (CB/LB/RB)', 'Goalkeeper (GK)'] },
  { id: 'badminton', name: 'Badminton', icon: '🏸', roles: ['Singles Specialist', 'Doubles Specialist', 'Mixed Doubles'] },
  { id: 'kabaddi', name: 'Kabaddi', icon: '🤼', roles: ['Lead Raider', 'Corner Defender', 'Cover Defender', 'All-Rounder'] },
  { id: 'tennis', name: 'Lawn Tennis', icon: '🎾', roles: ['Singles Specialist', 'Doubles Specialist'] },
  { id: 'basketball', name: 'Basketball', icon: '🏀', roles: ['Point Guard (PG)', 'Shooting Guard (SG)', 'Small Forward (SF)', 'Power Forward (PF)', 'Center (C)'] },
  { id: 'hockey', name: 'Field Hockey', icon: '🏑', roles: ['Forward / Striker', 'Midfielder', 'Defender / Full-Back', 'Goalkeeper'] },
  { id: 'volleyball', name: 'Volleyball', icon: '🏐', roles: ['Outside Hitter (Spiker)', 'Setter (Playmaker)', 'Middle Blocker', 'Libero'] },
  { id: 'athletics', name: 'Athletics & Track', icon: '👟', roles: ['Sprints (100m/200m)', 'Javelin Throw', 'Middle Distance', 'Long Jump'] },
  { id: 'wrestling', name: 'Wrestling (Kushti)', icon: '🤼‍♂️', roles: ['Freestyle (Olympic)', 'Traditional Kushti (Akhada)', 'Greco-Roman'] },
  { id: 'swimming', name: 'Swimming', icon: '🏊', roles: ['Freestyle Sprint', 'Butterfly', 'Breaststroke', 'Individual Medley'] },
  { id: 'boxing', name: 'Boxing', icon: '🥊', roles: ['Orthodox Fighter', 'Southpaw Fighter', 'Counter Puncher'] },
]

const GAMES_LIST = [
  { id: 'chess', name: 'Chess', icon: '♟️', roles: ['Club Competitor (<1400)', 'Intermediate (1400-1800)', 'Candidate Master (1800-2200)', 'Titled Master (2200+)'] },
  { id: 'carrom', name: 'Carrom', icon: '🎯', roles: ['White Slam Specialist', 'Pocketing & Defensive Strategist', 'Board Captain / Pro Striker'] },
  { id: 'billiards', name: 'Billiards & Snooker', icon: '🎱', roles: ['Break Builder (147 Hunter)', 'Safety & Tactical Player', '8-Ball / 9-Ball Specialist'] },
  { id: 'table-tennis', name: 'Table Tennis / Ping Pong', icon: '🏓', roles: ['Offensive Loop Attacker', 'Fast Block Counter', 'Defensive Chopper'] },
  { id: 'kho-kho', name: 'Kho Kho', icon: '🏃', roles: ['Wazir / Attacking Chaser', 'Defender / Dodging Runner', 'All-Round Player'] },
  { id: 'darts', name: 'Darts', icon: '🎯', roles: ['501 Checkout Finisher', 'Bullseye Specialist', 'Triple-20 Scorer'] },
  { id: 'bowling', name: 'Tenpin Bowling', icon: '🎳', roles: ['Hook Ball Striker', 'Straight Spare Converter', 'Two-Handed Power Bowler'] },
  { id: 'squash', name: 'Squash', icon: '🎾', roles: ['Fast Pace Volleyer', 'Drop Shot & Nick Maestro', 'Retrieval Specialist'] },
  { id: 'archery', name: 'Archery', icon: '🏹', roles: ['Recurve Target Archer', 'Compound Bow Specialist', 'Traditional Barebow'] },
  { id: 'shooting', name: 'Shooting Sports', icon: '🎯', roles: ['10m Air Rifle', '25m Rapid Fire Pistol', 'Trap & Skeet (Clay)'] },
  { id: 'mallakhamb', name: 'Mallakhamb', icon: '🤸', roles: ['Pole Mallakhamb', 'Rope Mallakhamb', 'Hanging Mallakhamb'] },
]

const MODULE_PREFILLS = {
  grounds: { key: 'grounds', phone: '9999999999', target: '/app/grounds', title: 'Grounds & Stadium Operations', icon: '🏟️' },
  stadium: { key: 'grounds', phone: '9999999999', target: '/app/grounds', title: 'Grounds & Stadium Operations', icon: '🏟️' },
  academy: { key: 'academy', phone: '8888888888', target: '/app/academy', title: 'Sports Academies Portal', icon: '🏫' },
  academies: { key: 'academy', phone: '8888888888', target: '/app/academy', title: 'Sports Academies Portal', icon: '🏫' },
  seller: { key: 'seller', phone: '7777777777', target: '/app/seller', title: 'Manufacturers & Sports Sellers', icon: '🏭' },
  merchant: { key: 'seller', phone: '7777777777', target: '/app/seller', title: 'Manufacturers & Sports Sellers', icon: '🏭' },
  manufacturer: { key: 'seller', phone: '7777777777', target: '/app/seller', title: 'Manufacturers & Sports Sellers', icon: '🏭' },
  coach: { key: 'coach', phone: '6666666666', target: '/app/coach', title: 'Coach & Trainer Operations', icon: '🏏' },
  trainer: { key: 'coach', phone: '6666666666', target: '/app/coach', title: 'Coach & Trainer Operations', icon: '🏏' },
  streamer: { key: 'streamer', phone: '5555555555', target: '/app/streamer', title: 'Live Streamer & Broadcaster', icon: '📹' },
  broadcast: { key: 'streamer', phone: '5555555555', target: '/app/streamer', title: 'Live Streamer & Broadcaster', icon: '📹' },
  sponsor: { key: 'sponsor', phone: '4444444444', target: '/app/sponsor', title: 'Tournament Sponsor & Brand', icon: '🤝' },
  sponsorship: { key: 'sponsor', phone: '4444444444', target: '/app/sponsor', title: 'Tournament Sponsor & Brand', icon: '🤝' },
}

export default function Register({ defaultTab, prefillModule }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const { user, draft, completeSignup, loginWithIdentifier, loginAsGuest } = useAuth()

  // Match direct module from prop, pathname, or redirect param
  const matchedModule = useMemo(() => {
    if (prefillModule && MODULE_PREFILLS[prefillModule]) {
      return MODULE_PREFILLS[prefillModule]
    }
    const path = location.pathname.toLowerCase()
    for (const key of Object.keys(MODULE_PREFILLS)) {
      if (path.includes(`/${key}/login`) || path.includes(`/app/${key}/login`)) {
        return MODULE_PREFILLS[key]
      }
    }
    const redirectParam = searchParams.get('redirect')?.toLowerCase() || ''
    for (const key of Object.keys(MODULE_PREFILLS)) {
      if (redirectParam.includes(`/${key}`)) {
        return MODULE_PREFILLS[key]
      }
    }
    return null
  }, [prefillModule, location.pathname, searchParams])

  // 1. Two primary modes: 'register' vs 'login'
  const isLoginPath = location.pathname === '/login' || location.pathname === '/signin' || Boolean(matchedModule) || defaultTab === 'login' || searchParams.get('mode') === 'login'
  const [activeTab, setActiveTab] = useState(isLoginPath ? 'login' : 'register')

  useEffect(() => {
    if (matchedModule || location.pathname === '/login' || location.pathname === '/signin' || defaultTab === 'login') {
      setActiveTab('login')
    } else if (location.pathname === '/register' || location.pathname === '/signup' || defaultTab === 'register') {
      setActiveTab('register')
    }
  }, [location.pathname, defaultTab, matchedModule])

  // If already logged in, redirect directly to module target
  useEffect(() => {
    if (user && matchedModule) {
      navigate(matchedModule.target, { replace: true })
    }
  }, [user, matchedModule, navigate])

  // 2. Role selection: 'player' vs 'business' (Two simple tabs)
  const [accountType, setAccountType] = useState('player') // 'player' | 'business'

  // 3. Business type selection (when Business tab active)
  const [selectedBusinessRoleId, setSelectedBusinessRoleId] = useState('ground')

  // 4. Player category & sport selection state (differentiate Sports vs Games!)
  const [activityCategory, setActivityCategory] = useState('sports') // 'sports' | 'games'
  const [selectedSportId, setSelectedSportId] = useState('cricket')
  const [playerRole, setPlayerRole] = useState('All-rounder')
  const [battingStance, setBattingStance] = useState('Right Hand Bat')
  const [bowlingAction, setBowlingAction] = useState('Right-arm Fast')
  const [competitionLevel, setCompetitionLevel] = useState('National Level')

  // Minimization toggles for preview card view
  const [isPlayerStatsMinimized, setIsPlayerStatsMinimized] = useState(true)
  const [isBusinessStatsMinimized, setIsBusinessStatsMinimized] = useState(true)

  // 5. Business stats state (dynamic according to selected business type)
  const [businessName, setBusinessName] = useState('Marina International Stadium')
  const [businessCustomField, setBusinessCustomField] = useState('Natural Red Soil Turf')
  const [businessCity, setBusinessCity] = useState('Chennai')
  const [businessSubField, setBusinessSubField] = useState('Day/Night 800 Lux Floodlights')

  // Custom text field inputs when "Other" option is selected
  const [customCompetitionLevel, setCustomCompetitionLevel] = useState('')
  const [customPlayerRole, setCustomPlayerRole] = useState('')
  const [customProductSpecialization, setCustomProductSpecialization] = useState('')
  const [customCoachCertification, setCustomCoachCertification] = useState('')
  const [customCoachSpecialization, setCustomCoachSpecialization] = useState('')
  const [customVenueType, setCustomVenueType] = useState('')
  const [customAcademyProgram, setCustomAcademyProgram] = useState('')
  const [customStreamerRig, setCustomStreamerRig] = useState('')
  const [customSponsorCategory, setCustomSponsorCategory] = useState('')

  // Academy enrollment for player (waives Aadhaar verification requirement)
  const [enrolledUnderAcademy, setEnrolledUnderAcademy] = useState(false)
  const [selectedAcademyName, setSelectedAcademyName] = useState('Scoring Heroes Elite Cricket Academy')
  const [enrolledBatch, setEnrolledBatch] = useState('U-16 Evening Elite')
  const [guardianPhone, setGuardianPhone] = useState('')

  // Memoized display strings for previews & payload
  const displayCompetitionLevel = useMemo(() => {
    if (competitionLevel === 'Other') return customCompetitionLevel.trim() || 'Custom Tier'
    return competitionLevel
  }, [competitionLevel, customCompetitionLevel])

  const displayPlayerRole = useMemo(() => {
    if (playerRole === 'Other') return customPlayerRole.trim() || 'Custom Role'
    return playerRole
  }, [playerRole, customPlayerRole])

  const displayBusinessField = useMemo(() => {
    if (businessCustomField === 'Other' || businessCustomField?.startsWith('Other')) {
      if (selectedBusinessRoleId === 'seller') return customProductSpecialization.trim() || 'Custom Merchandise'
      if (selectedBusinessRoleId === 'coach') return customCoachSpecialization.trim() || 'Custom Coaching'
      if (selectedBusinessRoleId === 'ground') return customVenueType.trim() || 'Custom Venue'
      if (selectedBusinessRoleId === 'academy') return customAcademyProgram.trim() || 'Custom Academy'
      if (selectedBusinessRoleId === 'streamer') return customStreamerRig.trim() || 'Custom Stream'
      if (selectedBusinessRoleId === 'sponsor') return customSponsorCategory.trim() || 'Custom Sponsor'
    }
    return businessCustomField
  }, [businessCustomField, selectedBusinessRoleId, customProductSpecialization, customCoachSpecialization, customVenueType, customAcademyProgram, customStreamerRig, customSponsorCategory])

  // 6. Three small auth tabs: 'mobile' | 'email' | 'google' (Passwordless - OTP based!)
  const [authMethod, setAuthMethod] = useState('mobile') // 'mobile' | 'email' | 'google'

  // Input states (No password required - 100% OTP!)
  const [phoneCode, setPhoneCode] = useState(draft.phoneCode || '+91')
  const [phone, setPhone] = useState(draft.phone || matchedModule?.phone || '')
  const [email, setEmail] = useState(draft.email || '')
  const [username, setUsername] = useState(draft.nickname || '')
  const [agreeTerms, setAgreeTerms] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (matchedModule) {
      setPhone(matchedModule.phone)
      setAuthMethod('mobile')
      setActiveTab('login')
    }
  }, [matchedModule])

  // Universal OTP dialog state (for Mobile OTP and Email OTP)
  const [showOtpDialog, setShowOtpDialog] = useState(false)
  const [otpTargetType, setOtpTargetType] = useState('mobile') // 'mobile' | 'email'
  const [inputOtp, setInputOtp] = useState('')

  // Active sport or game object
  const currentSportItem = useMemo(() => {
    const list = activityCategory === 'sports' ? SPORTS_LIST : GAMES_LIST
    return list.find((s) => s.id === selectedSportId) || list[0]
  }, [activityCategory, selectedSportId])

  // Handle differentiator tab switch between sports and games
  function handleActivityCategoryChange(cat) {
    setActivityCategory(cat)
    const nextList = cat === 'sports' ? SPORTS_LIST : GAMES_LIST
    const firstItem = nextList[0]
    setSelectedSportId(firstItem.id)
    setPlayerRole(firstItem.roles[0])
  }

  // Handle specific sport / game selection
  function handleSportSelect(sportId) {
    setSelectedSportId(sportId)
    const list = activityCategory === 'sports' ? SPORTS_LIST : GAMES_LIST
    const item = list.find((s) => s.id === sportId) || list[0]
    setPlayerRole(item.roles[0])
  }

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
        role: displayPlayerRole,
        battingStyle: battingStance,
        bowlingStyle: bowlingAction,
        competitionLevel: displayCompetitionLevel,
        sport: currentSportItem.name,
        sportId: currentSportItem.id,
        activityCategory,
        stage: displayCompetitionLevel || 'Active Competitive Athlete',
        enrolledUnderAcademy,
        academyName: enrolledUnderAcademy ? selectedAcademyName : null,
        batch: enrolledUnderAcademy ? enrolledBatch : null,
        guardianPhone: enrolledUnderAcademy ? guardianPhone : null,
      }
    }

    let resolvedSubField = businessSubField
    if (businessSubField === 'Other' || businessSubField?.startsWith('Other')) {
      if (selectedBusinessRoleId === 'coach' && customCoachCertification.trim()) {
        resolvedSubField = customCoachCertification.trim()
      }
    }

    return {
      businessName: businessName.trim() || activeBusinessRole.name,
      roleTitle: activeBusinessRole.name,
      specialField: displayBusinessField,
      subField: resolvedSubField,
      city: businessCity.trim() || 'Chennai',
    }
  }

  // Form submit handler for both Register and Sign In (OTP-based)
  function handleFormSubmit(e) {
    if (e) e.preventDefault()
    setError('')

    const cleanPhone = phone.replace(/\D/g, '')
    const cleanEmail = email.trim()

    // 1. MOBILE OTP VALIDATION
    if (authMethod === 'mobile') {
      if (!cleanPhone || cleanPhone.length !== maxPhoneDigits) {
        setError(`Please enter a valid ${maxPhoneDigits}-digit mobile number for ${phoneCode}.`)
        return
      }
      if (activeTab === 'register' && !username.trim()) {
        setError('Please enter your name or handle.')
        return
      }
      if (activeTab === 'register' && !agreeTerms) {
        setError('Please agree to the platform terms and privacy policy to continue.')
        return
      }
      // Trigger Mobile OTP dialog
      setOtpTargetType('mobile')
      setShowOtpDialog(true)
      return
    }

    // 2. EMAIL OTP VALIDATION (No password - OTP only!)
    if (authMethod === 'email') {
      if (!cleanEmail || !cleanEmail.includes('@')) {
        setError('Please enter a valid official email address.')
        return
      }
      if (activeTab === 'register' && !username.trim()) {
        setError('Please enter your name or handle.')
        return
      }
      if (activeTab === 'register' && !agreeTerms) {
        setError('Please agree to the platform terms and privacy policy to continue.')
        return
      }
      // Trigger Email OTP dialog
      setOtpTargetType('email')
      setShowOtpDialog(true)
      return
    }

    // 3. GOOGLE AUTH (Direct)
    if (authMethod === 'google') {
      handleGoogleAuth()
    }
  }

  // Finalize signup and redirect to Aadhaar verification
  function executeSignup(cleanPhone, cleanEmail, handleName) {
    const targetRoleId = accountType === 'player' ? 'player' : selectedBusinessRoleId
    const finalRoleDetails = buildRoleDetails()

    // IF REGISTERING UNDER AN ACADEMY: AADHAAR VERIFICATION IS WAIVED BY ACADEMY DIRECTOR!
    if (accountType === 'player' && enrolledUnderAcademy) {
      completeSignup({
        role: targetRoleId,
        roleCategory: 'player',
        nickname: handleName,
        fullName: handleName,
        city: 'Chennai',
        phoneCode,
        phone: cleanPhone || '9876543210',
        email: cleanEmail || `${handleName.toLowerCase().replace(/\s+/g, '')}@scoringheroes.com`,
        sportId: currentSportItem.id,
        sportName: currentSportItem.name,
        competitionLevel: displayCompetitionLevel,
        roleDetails: finalRoleDetails,
        verified: true,
        aadhaarVerified: true,
        academyCertified: true,
        onboardingComplete: true,
      })
      navigate('/app', { replace: true })
      return
    }

    completeSignup({
      role: targetRoleId,
      roleCategory: accountType === 'player' ? 'player' : 'official',
      nickname: handleName,
      fullName: handleName,
      city: businessCity.trim() || 'Chennai',
      phoneCode,
      phone: cleanPhone || '9876543210',
      email: cleanEmail || `${handleName.toLowerCase().replace(/\s+/g, '')}@scoringheroes.com`,
      sportId: currentSportItem.id,
      sportName: currentSportItem.name,
      competitionLevel: displayCompetitionLevel,
      roleDetails: finalRoleDetails,
      verified: false,
      aadhaarVerified: false,
      onboardingComplete: false,
    })

    // REDIRECT TO AADHAAR VERIFICATION ON MOBILE OTP PER USER SPECIFICATION FOR INDEPENDENT ATHLETES
    navigate('/aadhaar', { replace: true })
  }

  // Handle OTP verification for either Mobile or Email
  function handleVerifyOtpSubmit(e) {
    if (e) e.preventDefault()
    if (inputOtp !== '1234' && inputOtp !== '0000') {
      setError('Invalid OTP code. Please enter demo sandbox OTP: 1234')
      return
    }

    setShowOtpDialog(false)
    setInputOtp('')

    const cleanPhone = phone.replace(/\D/g, '')
    const cleanEmail = email.trim()

    // IF IN SIGN IN MODE
    if (activeTab === 'login') {
      const identifier = otpTargetType === 'mobile' ? cleanPhone : cleanEmail
      const loggedUser = loginWithIdentifier(identifier)
      const redirectTarget = matchedModule?.target || searchParams.get('redirect') || '/app'
      // If user already verified, go directly to target or app dashboard! Otherwise redirect to Aadhaar verification
      if (otpTargetType === 'mobile') {
        if (loggedUser?.aadhaarVerified) {
          navigate(redirectTarget, { replace: true })
        } else {
          navigate('/aadhaar', { replace: true })
        }
      } else {
        navigate(redirectTarget, { replace: true })
      }
      return
    }

    // IF IN REGISTER MODE
    const handleName = username.trim() || (accountType === 'player' ? 'Athlete_Pro' : businessName || 'Official_Partner')
    executeSignup(cleanPhone, cleanEmail, handleName)
  }

  // 1-Tap Google Registration / Login
  function handleGoogleAuth() {
    const googleEmail = 'athlete.sports@gmail.com'
    if (activeTab === 'login') {
      loginWithIdentifier(googleEmail)
      const redirectTarget = matchedModule?.target || searchParams.get('redirect') || '/app'
      navigate(redirectTarget, { replace: true })
      return
    }

    const handleName = username.trim() || (accountType === 'player' ? 'Athlete_Google' : businessName || 'Partner_Google')
    executeSignup('9876543210', googleEmail, handleName)
  }

  return (
    <div className="sh-white-page">
      {/* Round Back Button on Top Left */}
      <button
        type="button"
        className="sh-modern-back-btn"
        onClick={() => {
          if (window.history.length > 1) {
            navigate(-1)
          } else {
            navigate('/welcome')
          }
        }}
        aria-label="Back"
      >
        <ArrowLeft size={18} color="#0f172a" />
      </button>

      {/* Header with Centered Logo, Title & Subtitle */}
      <header className="sh-modern-header">
        <div className="sh-modern-logo-wrap">
          <img src="/logo.png" alt="Scoring Heroes" />
        </div>
        <h1 className="sh-modern-title">Customer access</h1>
        <p className="sh-modern-subtitle">
          {activeTab === 'login'
            ? 'Verify your number to browse and access universal sports.'
            : 'Register your athlete or business profile for national tournaments.'}
        </p>
      </header>

      {/* Main Modern Card */}
      <div className="sh-modern-card-container">
        {/* Top Segmented Tab Switcher (Matching Mobile Spec) */}
        <div className="sh-modern-switcher">
          <button
            type="button"
            className={`sh-modern-tab ${activeTab === 'login' ? 'is-active' : ''}`}
            onClick={() => {
              setActiveTab('login')
              setError('')
              const redirect = searchParams.get('redirect')
              navigate(redirect ? `/login?redirect=${encodeURIComponent(redirect)}` : '/login', { replace: true })
            }}
          >
            <ArrowRight size={15} strokeWidth={2.6} />
            <span>Sign in</span>
          </button>
          <button
            type="button"
            className={`sh-modern-tab ${activeTab === 'register' ? 'is-active' : ''}`}
            onClick={() => {
              setActiveTab('register')
              setError('')
              const redirect = searchParams.get('redirect')
              navigate(redirect ? `/register?redirect=${encodeURIComponent(redirect)}` : '/register', { replace: true })
            }}
          >
            <Plus size={16} strokeWidth={2.6} />
            <span>Sign up</span>
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="sh-white-form">
          {matchedModule && (
            <div style={{
              margin: '0 0 14px',
              padding: '10px 14px',
              background: '#f0fdf4',
              border: '1.5px solid #86efac',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 20 }}>{matchedModule.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#14532d' }}>
                    {matchedModule.title} Login
                  </div>
                  <div style={{ fontSize: 11, color: '#16a34a' }}>
                    Auto-filling registered business session
                  </div>
                </div>
              </div>
              <span style={{
                fontSize: 11,
                fontWeight: 800,
                background: '#16a34a',
                color: '#ffffff',
                padding: '4px 10px',
                borderRadius: 8,
                letterSpacing: '0.4px',
              }}>
                {matchedModule.phone}
              </span>
            </div>
          )}
          {/* ============================================================== */}
          {/* REGISTER MODE: SINGLE PAGE FLOW (ROLE -> STATS -> AUTH TABS)  */}
          {/* ============================================================== */}
          {activeTab === 'register' && (
            <>
              {/* ACCOUNT SELECTION: MINIMIZED PREVIEW OR EXPANDED TWO-OPTION SELECTOR */}
              {accountType === 'player' && (
                <>
                  {isPlayerStatsMinimized ? (
                    /* SMALL PREVIEW CARD (MINIMIZED VIEW - BUSINESS REMOVED) */
                    <div className="sh-small-preview-card">
                      <div className="sh-preview-card-left">
                        <div className="sh-preview-icon-wrap">{currentSportItem.icon}</div>
                        <div className="sh-preview-text-block">
                          <div className="sh-preview-main-row">
                            <span className="sh-preview-sport-name">{currentSportItem.name}</span>
                            <span className="sh-preview-role-tag">{displayPlayerRole}</span>
                          </div>
                          <span className="sh-preview-subtext">
                            {selectedSportId === 'cricket'
                              ? `${battingStance} · ${bowlingAction} · ${displayCompetitionLevel}`
                              : `${activityCategory === 'sports' ? 'Physical Sport' : 'Indoor Game'} · ${displayCompetitionLevel}`}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="sh-preview-change-btn"
                        onClick={() => setIsPlayerStatsMinimized(false)}
                      >
                        Change
                      </button>
                    </div>
                  ) : (
                    /* EXPANDED SELECTOR: GIVES TWO OPTIONS (PLAYER VS BUSINESS) & SELECTION */
                    <div className="sh-white-stats-box" style={{ animation: 'shWhiteFadeIn 0.2s ease-out', marginBottom: 14 }}>
                      <div className="sh-white-stats-header">
                        <div className="sh-white-stats-title">
                          <span className="sh-white-questions-dot" />
                          <span>Player Profile & Sport</span>
                        </div>
                        <span className="sh-white-hint">{activityCategory === 'sports' ? 'Physical Sports' : 'Indoor & Board Games'}</span>
                      </div>

                      {/* TWO OPTIONS: PLAYER VS BUSINESS */}
                      <div style={{ marginBottom: 6 }}>
                        <label className="sh-white-label" style={{ marginBottom: 6 }}>
                          <span>Registration Type</span>
                          <span className="sh-white-hint">Athlete or Organization</span>
                        </label>
                        <div className="sh-white-role-tabs">
                          <button
                            type="button"
                            className={`sh-white-role-tab ${accountType === 'player' ? 'is-active' : ''}`}
                            onClick={() => {
                              setAccountType('player')
                              setIsPlayerStatsMinimized(false)
                            }}
                          >
                            <User size={16} color={accountType === 'player' ? '#e10613' : '#64748b'} />
                            <span>Player</span>
                          </button>
                          <button
                            type="button"
                            className={`sh-white-role-tab ${accountType === 'business' ? 'is-active' : ''}`}
                            onClick={() => {
                              setAccountType('business')
                              setIsBusinessStatsMinimized(false)
                            }}
                          >
                            <Building size={16} color={accountType === 'business' ? '#e10613' : '#64748b'} />
                            <span>Business</span>
                          </button>
                        </div>
                      </div>

                      {/* 1. DIFFERENTIATE: SPORTS VS GAMES TABS */}
                      <div className="sh-differentiator-tabs">
                        <button
                          type="button"
                          className={`sh-differentiator-tab ${activityCategory === 'sports' ? 'is-active' : ''}`}
                          onClick={() => handleActivityCategoryChange('sports')}
                        >
                          <span>🏃 Physical Sports</span>
                        </button>
                        <button
                          type="button"
                          className={`sh-differentiator-tab ${activityCategory === 'games' ? 'is-active' : ''}`}
                          onClick={() => handleActivityCategoryChange('games')}
                        >
                          <span>🎯 Indoor & Board Games</span>
                        </button>
                      </div>

                      {/* 2. SPECIFIC SPORT / GAME SELECTOR */}
                      <div className="sh-white-group">
                        <label className="sh-white-label">
                          <span>{activityCategory === 'sports' ? 'Select Sport' : 'Select Game'}</span>
                          <span className="sh-white-hint">{currentSportItem.name}</span>
                        </label>
                        <select
                          className="sh-white-select"
                          value={selectedSportId}
                          onChange={(e) => handleSportSelect(e.target.value)}
                        >
                          {(activityCategory === 'sports' ? SPORTS_LIST : GAMES_LIST).map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.icon} {s.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* 3. DYNAMIC PLAYING ROLE FOR CHOSEN SPORT */}
                      <div className="sh-white-group">
                        <label className="sh-white-label">
                          <span>Playing Role / Specialization</span>
                          <span className="sh-white-hint">{displayPlayerRole}</span>
                        </label>
                        <select
                          className="sh-white-select"
                          value={playerRole}
                          onChange={(e) => setPlayerRole(e.target.value)}
                        >
                          {currentSportItem.roles.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                          <option value="Other">Other (Custom Playing Role)</option>
                        </select>
                        {playerRole === 'Other' && (
                          <div style={{ marginTop: 8 }}>
                            <input
                              type="text"
                              className="sh-white-input"
                              placeholder="Enter your custom playing role / title"
                              value={customPlayerRole}
                              onChange={(e) => setCustomPlayerRole(e.target.value)}
                              required
                            />
                          </div>
                        )}
                      </div>

                      {/* 4. CRICKET SPECIFIC STANCE & BOWLING ACTION */}
                      {selectedSportId === 'cricket' && (
                        <>
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
                        </>
                      )}

                      {/* 5. COMPETITION LEVEL */}
                      <div className="sh-white-group">
                        <label className="sh-white-label">
                          <span>Competition Level / Tier</span>
                          <span className="sh-white-hint">{displayCompetitionLevel}</span>
                        </label>
                        <div className="sh-white-option-pills">
                          {[
                            'Independent / Club Player',
                            'District Player (DCA)',
                            'State / Ranji Trophy Player',
                            'National Level',
                            'International Level',
                            'Other',
                          ].map((level) => (
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
                        {competitionLevel === 'Other' && (
                          <div style={{ marginTop: 8 }}>
                            <input
                              type="text"
                              className="sh-white-input"
                              placeholder="Specify custom competition level / tournament tier"
                              value={customCompetitionLevel}
                              onChange={(e) => setCustomCompetitionLevel(e.target.value)}
                              required
                            />
                          </div>
                        )}
                      </div>

                      {/* 6. ACADEMY ENROLLMENT / AFFILIATION */}
                      <div className="sh-white-group">
                        <label className="sh-white-label">
                          <span>Sports Academy Affiliation</span>
                          <span className="sh-white-hint">
                            {enrolledUnderAcademy ? 'Enrolled under Academy' : 'Independent'}
                          </span>
                        </label>
                        <div className="sh-white-option-pills">
                          <button
                            type="button"
                            className={`sh-white-option-pill ${!enrolledUnderAcademy ? 'is-active' : ''}`}
                            onClick={() => setEnrolledUnderAcademy(false)}
                          >
                            {!enrolledUnderAcademy && <Check size={12} strokeWidth={3} />}
                            <span>Independent Player</span>
                          </button>
                          <button
                            type="button"
                            className={`sh-white-option-pill ${enrolledUnderAcademy ? 'is-active' : ''}`}
                            onClick={() => setEnrolledUnderAcademy(true)}
                          >
                            {enrolledUnderAcademy && <Check size={12} strokeWidth={3} />}
                            <span>Enrolled under Academy</span>
                          </button>
                        </div>

                        {enrolledUnderAcademy && (
                          <div
                            style={{
                              marginTop: 10,
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 8,
                              padding: '10px 12px',
                              background: 'rgba(124, 77, 255, 0.08)',
                              borderRadius: 10,
                              border: '1px solid rgba(124, 77, 255, 0.25)',
                            }}
                          >
                            <div>
                              <label className="sh-white-label" style={{ fontSize: 11 }}>
                                Select Affiliated Academy
                              </label>
                              <select
                                className="sh-white-select"
                                value={selectedAcademyName}
                                onChange={(e) => setSelectedAcademyName(e.target.value)}
                              >
                                <option value="Scoring Heroes Elite Cricket Academy">
                                  Scoring Heroes Elite Cricket Academy (Chennai Central)
                                </option>
                                <option value="Marina Strikers Cricket Academy">
                                  Marina Strikers Cricket Academy
                                </option>
                                <option value="Apex High Performance Center">
                                  Apex High Performance Center
                                </option>
                                <option value="Other Academy">Other Affiliated Academy</option>
                              </select>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                              <div>
                                <label className="sh-white-label" style={{ fontSize: 11 }}>
                                  Assigned Batch
                                </label>
                                <select
                                  className="sh-white-select"
                                  value={enrolledBatch}
                                  onChange={(e) => setEnrolledBatch(e.target.value)}
                                >
                                  <option value="U-14 Morning Foundation">U-14 Morning Foundation</option>
                                  <option value="U-16 Evening Elite">U-16 Evening Elite</option>
                                  <option value="U-19 Pro High Performance">U-19 Pro High Performance</option>
                                  <option value="Weekend Grassroots Clinic">Weekend Grassroots Clinic</option>
                                </select>
                              </div>

                              <div>
                                <label className="sh-white-label" style={{ fontSize: 11 }}>
                                  Guardian Phone
                                </label>
                                <input
                                  type="tel"
                                  className="sh-white-input"
                                  placeholder="Guardian 10-digit phone"
                                  value={guardianPhone}
                                  onChange={(e) => setGuardianPhone(e.target.value)}
                                />
                              </div>
                            </div>

                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6,
                                color: '#00e676',
                                fontSize: 11,
                                fontWeight: 700,
                              }}
                            >
                              <ShieldCheck size={16} />
                              <span>Academy Certified Student — Aadhaar verification is waived!</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* SAVE BUTTON */}
                      <button
                        type="button"
                        className="sh-minimize-btn"
                        onClick={() => setIsPlayerStatsMinimized(true)}
                      >
                        <Check size={16} strokeWidth={2.5} />
                        <span>Save</span>
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* PHASE 2B: IF BUSINESS SELECTED -> EITHER SMALL PREVIEW CARD OR EXPANDED SELECTOR */}
              {accountType === 'business' && (
                <>
                  {isBusinessStatsMinimized ? (
                    /* SMALL PREVIEW CARD (MINIMIZED VIEW) */
                    <div className="sh-small-preview-card">
                      <div className="sh-preview-card-left">
                        <div className="sh-preview-icon-wrap">
                          {selectedBusinessRoleId === 'ground'
                            ? '🏟️'
                            : selectedBusinessRoleId === 'academy'
                            ? '🏫'
                            : selectedBusinessRoleId === 'seller'
                            ? '🛍️'
                            : selectedBusinessRoleId === 'coach'
                            ? '📋'
                            : selectedBusinessRoleId === 'streamer'
                            ? '🎥'
                            : '💼'}
                        </div>
                        <div className="sh-preview-text-block">
                          <div className="sh-preview-main-row">
                            <span className="sh-preview-sport-name">{activeBusinessRole.name}</span>
                            <span className="sh-preview-role-tag">{businessCity || 'Chennai'}</span>
                          </div>
                          <span className="sh-preview-subtext">
                            {businessName} · {displayBusinessField}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="sh-preview-change-btn"
                        onClick={() => setIsBusinessStatsMinimized(false)}
                      >
                        Change
                      </button>
                    </div>
                  ) : (
                    /* EXPANDED BUSINESS SELECTOR: GIVES TWO OPTIONS (PLAYER VS BUSINESS) & SELECTION */
                    <div className="sh-white-stats-box" style={{ animation: 'shWhiteFadeIn 0.2s ease-out', marginBottom: 14 }}>
                      <div className="sh-white-stats-header">
                        <div className="sh-white-stats-title">
                          <span className="sh-white-questions-dot" />
                          <span>Business Type & Profile Stats</span>
                        </div>
                        <span className="sh-white-hint">{activeBusinessRole.name}</span>
                      </div>

                      {/* TWO OPTIONS: PLAYER VS BUSINESS */}
                      <div style={{ marginBottom: 6 }}>
                        <label className="sh-white-label" style={{ marginBottom: 6 }}>
                          <span>Registration Type</span>
                          <span className="sh-white-hint">Athlete or Organization</span>
                        </label>
                        <div className="sh-white-role-tabs">
                          <button
                            type="button"
                            className={`sh-white-role-tab ${accountType === 'player' ? 'is-active' : ''}`}
                            onClick={() => {
                              setAccountType('player')
                              setIsPlayerStatsMinimized(false)
                            }}
                          >
                            <User size={16} color={accountType === 'player' ? '#e10613' : '#64748b'} />
                            <span>Player</span>
                          </button>
                          <button
                            type="button"
                            className={`sh-white-role-tab ${accountType === 'business' ? 'is-active' : ''}`}
                            onClick={() => {
                              setAccountType('business')
                              setIsBusinessStatsMinimized(false)
                            }}
                          >
                            <Building size={16} color={accountType === 'business' ? '#e10613' : '#64748b'} />
                            <span>Business</span>
                          </button>
                        </div>
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
                            <option value="Natural Clay Soil Turf">Natural Clay Soil Turf</option>
                            <option value="Astro Turf Ground / Box Cricket Arena">Astro Turf / Box Arena</option>
                            <option value="Multisport Turf Arena">Multisport Turf Arena</option>
                            <option value="Hybrid Grass Turf">Hybrid Grass Turf</option>
                            <option value="Concrete Practice Nets">Concrete Practice Nets</option>
                            <option value="Other">Other Venue Type</option>
                          </select>
                          {(businessCustomField === 'Other' || businessCustomField?.startsWith('Other')) && (
                            <div style={{ marginTop: 8 }}>
                              <input
                                type="text"
                                className="sh-white-input"
                                placeholder="Specify custom pitch or venue type"
                                value={customVenueType}
                                onChange={(e) => setCustomVenueType(e.target.value)}
                                required
                              />
                            </div>
                          )}
                        </div>
                        <div className="sh-white-group" style={{ flex: 1 }}>
                          <label className="sh-white-label">Floodlight Setup</label>
                          <select
                            className="sh-white-select"
                            value={businessSubField}
                            onChange={(e) => setBusinessSubField(e.target.value)}
                          >
                            <option value="Floodlit Day/Night (800+ Lux - Broadcast Ready)">Day/Night 800+ Lux</option>
                            <option value="Floodlit Standard (400-600 Lux)">Standard 400-600 Lux</option>
                            <option value="Day-Only Standard">Day-Only Standard</option>
                            <option value="Indoor Nets LED Array">Indoor Nets LED Array</option>
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
                            <option value="District & State Development Program">District & State Program</option>
                            <option value="Grassroots & School Only">Grassroots & School Only</option>
                            <option value="Elite High Performance">Elite High Performance</option>
                            <option value="Independent Weekend Clinic">Independent Weekend Clinic</option>
                            <option value="Other">Other Academy Program</option>
                          </select>
                          {(businessCustomField === 'Other' || businessCustomField?.startsWith('Other')) && (
                            <div style={{ marginTop: 8 }}>
                              <input
                                type="text"
                                className="sh-white-input"
                                placeholder="Specify custom academy program"
                                value={customAcademyProgram}
                                onChange={(e) => setCustomAcademyProgram(e.target.value)}
                                required
                              />
                            </div>
                          )}
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
                            <option value="Open Ground Turf Oval">Open Ground Turf Oval</option>
                            <option value="Gymnasium & Recovery Center">Gym & Recovery Center</option>
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
                        <label className="sh-white-label">Product Specialization & Categories</label>
                        <select
                          className="sh-white-select"
                          value={businessCustomField}
                          onChange={(e) => setBusinessCustomField(e.target.value)}
                        >
                          <option value="Customised Team Jerseys & Uniforms">Customised Team Jerseys & Uniforms</option>
                          <option value="Performance Training Tees & Activewear">Performance Training Tees & Activewear</option>
                          <option value="English Willow Bats & Kits">English Willow Bats & Kits</option>
                          <option value="Kashmir Willow Bats & Practice Gear">Kashmir Willow Bats & Practice Gear</option>
                          <option value="Turf Spike Shoes & Athletic Footwear">Turf Spike Shoes & Athletic Footwear</option>
                          <option value="Helmets, Pads & Protective Gear">Helmets, Pads & Protective Gear</option>
                          <option value="Cricket Leather Balls & Accessories">Cricket Leather Balls & Accessories</option>
                          <option value="Custom Team Badges & Merchandise">Custom Team Badges & Merchandise</option>
                          <option value="Other">Other (Custom Product Category)</option>
                        </select>
                        {(businessCustomField === 'Other' || businessCustomField?.startsWith('Other')) && (
                          <div style={{ marginTop: 8 }}>
                            <input
                              type="text"
                              className="sh-white-input"
                              placeholder="Enter custom product specialization (e.g. Sublimation Tees, Custom Badges)"
                              value={customProductSpecialization}
                              onChange={(e) => setCustomProductSpecialization(e.target.value)}
                              required
                            />
                          </div>
                        )}
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
                          placeholder="e.g. Coach Dev Anand (Ranji Trophy Staff)"
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
                            <option value="Wicketkeeping & Fielding Drills">Wicketkeeping & Fielding</option>
                            <option value="Strength & Conditioning (S&C)">Strength & Conditioning (S&C)</option>
                            <option value="Mental Conditioning & Strategy">Mental Conditioning & Strategy</option>
                            <option value="Grassroots & Youth Development">Grassroots & Youth Dev</option>
                            <option value="Other">Other Specialization</option>
                          </select>
                          {(businessCustomField === 'Other' || businessCustomField?.startsWith('Other')) && (
                            <div style={{ marginTop: 8 }}>
                              <input
                                type="text"
                                className="sh-white-input"
                                placeholder="Specify custom coaching specialization"
                                value={customCoachSpecialization}
                                onChange={(e) => setCustomCoachSpecialization(e.target.value)}
                                required
                              />
                            </div>
                          )}
                        </div>
                        <div className="sh-white-group" style={{ flex: 1 }}>
                          <label className="sh-white-label">License & Experience Level</label>
                          <select
                            className="sh-white-select"
                            value={businessSubField}
                            onChange={(e) => setBusinessSubField(e.target.value)}
                          >
                            <option value="Ranji Trophy Coach / First-Class Staff">Ranji Trophy Coach</option>
                            <option value="BCCI Level 3 Certified (Elite)">BCCI Level 3 Certified</option>
                            <option value="BCCI Level 2 Certified">BCCI Level 2 Certified</option>
                            <option value="BCCI Level 1 Certified">BCCI Level 1 Certified</option>
                            <option value="NIS National Diploma">NIS National Diploma</option>
                            <option value="State Cricket Association Coach">State Association Coach</option>
                            <option value="District Cricket Association Coach">District Coach (DCA)</option>
                            <option value="Independent / Private Academy Coach">Independent Coach</option>
                            <option value="Other">Other Certification</option>
                          </select>
                          {(businessSubField === 'Other' || businessSubField?.startsWith('Other')) && (
                            <div style={{ marginTop: 8 }}>
                              <input
                                type="text"
                                className="sh-white-input"
                                placeholder="Specify custom certification / affiliation"
                                value={customCoachCertification}
                                onChange={(e) => setCustomCoachCertification(e.target.value)}
                                required
                              />
                            </div>
                          )}
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
                          <option value="YouTube / OTT Digital Stream Rig">YouTube / OTT Digital Stream Rig</option>
                          <option value="Single Cam Live Score Graphics">Single Cam Live Score Graphics</option>
                          <option value="Other">Other Broadcast Setup</option>
                        </select>
                        {(businessCustomField === 'Other' || businessCustomField?.startsWith('Other')) && (
                          <div style={{ marginTop: 8 }}>
                            <input
                              type="text"
                              className="sh-white-input"
                              placeholder="Specify custom broadcast rig / setup"
                              value={customStreamerRig}
                              onChange={(e) => setCustomStreamerRig(e.target.value)}
                              required
                            />
                          </div>
                        )}
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
                          <option value="Customized Team Jersey & Apparel Sponsor">Customized Team Jersey & Apparel Sponsor</option>
                          <option value="Perimeter LED & Boundary Boards">Perimeter LED & Boundary Boards</option>
                          <option value="Digital Live Stream Ad Partner">Digital Live Stream Ad Partner</option>
                          <option value="Trophy & Prize Money Partner">Trophy & Prize Money Partner</option>
                          <option value="Hydration & Energy Drink Sponsor">Hydration & Energy Drink Sponsor</option>
                          <option value="Other">Other Sponsorship Category</option>
                        </select>
                        {(businessCustomField === 'Other' || businessCustomField?.startsWith('Other')) && (
                          <div style={{ marginTop: 8 }}>
                            <input
                              type="text"
                              className="sh-white-input"
                              placeholder="Specify custom sponsorship category"
                              value={customSponsorCategory}
                              onChange={(e) => setCustomSponsorCategory(e.target.value)}
                              required
                            />
                          </div>
                        )}
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

                  {/* SAVE BUTTON */}
                  <button
                    type="button"
                    className="sh-minimize-btn"
                    onClick={() => setIsBusinessStatsMinimized(true)}
                  >
                    <Check size={16} strokeWidth={2.5} />
                    <span>Save</span>
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}

          {/* ============================================================== */}
          {/* PHASE 3: MODERN INPUT FIELDS & ACTION BUTTONS                  */}
          {/* ============================================================== */}
          <div style={{ marginTop: activeTab === 'register' ? 8 : 0 }}>
            {authMethod === 'mobile' ? (
              <div className="sh-modern-field-group">
                <label className="sh-modern-field-label">
                  <span>Mobile number</span>
                  <span className="sh-white-hint">
                    {phone.length}/{maxPhoneDigits} digits
                  </span>
                </label>
                <div className="sh-modern-input-box">
                  <CountryCodePicker
                    value={phoneCode}
                    onChange={handlePhoneCodeChange}
                  />
                  <div className="sh-modern-input-divider" />
                  <input
                    type="tel"
                    className="sh-modern-input-field"
                    placeholder={phonePlaceholder}
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    required
                  />
                </div>
              </div>
            ) : (
              <div className="sh-modern-field-group">
                <label className="sh-modern-field-label">
                  <span>Official Email Address</span>
                  <span className="sh-white-hint">Will receive 4-digit OTP</span>
                </label>
                <div className="sh-modern-input-box">
                  <Mail size={18} color="#64748b" style={{ marginRight: 6 }} />
                  <div className="sh-modern-input-divider" />
                  <input
                    type="email"
                    className="sh-modern-input-field"
                    placeholder="athlete@sports.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {activeTab === 'register' && (
              <div className="sh-modern-field-group">
                <label className="sh-modern-field-label">
                  <span>Your Name</span>
                  <span className="sh-white-hint">Public handle</span>
                </label>
                <div className="sh-modern-input-box">
                  <User size={18} color="#64748b" style={{ marginRight: 6 }} />
                  <div className="sh-modern-input-divider" />
                  <input
                    type="text"
                    className="sh-modern-input-field"
                    placeholder="Enter your full name or handle"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {/* Terms Checkbox in Register Mode */}
            {activeTab === 'register' && (
              <label className="sh-white-checkbox-label" style={{ marginTop: 4, marginBottom: 8 }}>
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span>I agree to the platform terms & privacy policy. Data is securely protected.</span>
              </label>
            )}

            {error && <p className="sh-white-error">{error}</p>}

            {/* PRIMARY ACTION BUTTON: Send OTP */}
            <button type="submit" className="sh-modern-primary-btn">
              Send OTP
            </button>

            {/* TRUST SHIELD BADGE */}
            <div className="sh-modern-shield-badge">
              <ShieldCheck size={16} color="#16a34a" />
              <span>We will send a one-time password to verify your account.</span>
            </div>

            {/* OR CONTINUE WITH DIVIDER */}
            <div className="sh-modern-divider">
              <span>OR CONTINUE WITH</span>
            </div>

            {/* SOCIAL / ALTERNATE BUTTONS (50/50 ROW: Google & Email / Mobile) */}
            <div className="sh-modern-social-row">
              <button
                type="button"
                className="sh-modern-social-btn"
                onClick={handleGoogleAuth}
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>Google</span>
              </button>

              {authMethod === 'mobile' ? (
                <button
                  type="button"
                  className="sh-modern-social-btn"
                  onClick={() => {
                    setAuthMethod('email')
                    setError('')
                  }}
                >
                  <Mail size={17} color="#ea580c" />
                  <span>Email</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="sh-modern-social-btn"
                  onClick={() => {
                    setAuthMethod('mobile')
                    setError('')
                  }}
                >
                  <Zap size={17} color="#e10613" />
                  <span>Mobile OTP</span>
                </button>
              )}
            </div>

            {/* GUEST BUTTON: ONLY IN LOGIN / SIGN IN (REMOVED FROM REGISTRATION PER USER REQUEST) */}
            {activeTab === 'login' && (
              <button
                type="button"
                className="sh-modern-guest-btn"
                onClick={() => {
                  loginAsGuest('player')
                  const redirectTarget = matchedModule?.target || searchParams.get('redirect') || '/app'
                  navigate(redirectTarget, { replace: true })
                }}
              >
                <div className="sh-modern-guest-icon">
                  <Compass size={18} color="#ea580c" />
                </div>
                <span className="sh-modern-guest-text">Continue with Guest Account</span>
              </button>
            )}

            {/* FOOTER NOTE */}
            <p className="sh-modern-footer-note">
              Your credentials and data are securely protected.
            </p>
          </div>
        </form>
      </div>

      {/* ============================================================== */}
      {/* UNIVERSAL OTP VERIFICATION DIALOG (MOBILE SMS & EMAIL OTP)     */}
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
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: otpTargetType === 'mobile' ? '#fef2f2' : '#eff6ff',
                  color: otpTargetType === 'mobile' ? '#e10613' : '#2563eb',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 10,
                }}
              >
                {otpTargetType === 'mobile' ? <Zap size={24} /> : <Mail size={24} />}
              </div>
              <h3 style={{ margin: 0, fontSize: 18, color: '#0f172a' }}>
                {otpTargetType === 'mobile' ? 'Enter Mobile SMS OTP' : 'Enter Email Verification OTP'}
              </h3>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748b' }}>
                {otpTargetType === 'mobile' ? (
                  <>Sent 4-digit code via SMS to <strong>{phoneCode} {phone}</strong></>
                ) : (
                  <>Sent 4-digit verification code to <strong>{email}</strong></>
                )}
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

              <button type="submit" className="sh-modern-primary-btn" style={{ marginTop: 12 }}>
                {activeTab === 'login' ? 'Verify OTP & Sign In →' : 'Verify OTP & Enter Arena →'}
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
