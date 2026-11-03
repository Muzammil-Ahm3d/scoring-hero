import { createContext, useContext, useMemo, useState } from 'react'
import { getRoleById } from '../data/rolesData'

const KEY = 'sh-prototype-user'
const ACCOUNTS_KEY = 'sh-registered-accounts'
const PENDING_KEY = 'sh-pending-onboardings'
const AuthContext = createContext(null)

function readUser() {
  try {
    const raw = sessionStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

// 6 Predefined Demo Business Accounts requested by platform specification:
// 9999999999 -> 1. GROUNDS / Stadium
// 8888888888 -> 2. Academics (Sports Academies)
// 7777777777 -> 3. Manufacturers / Factory Outlet / Seller
// 6666666666 -> 4. Coach / Trainer
// 5555555555 -> 5. Live Streamers
// 4444444444 -> 6. Sponsor
export const DEMO_BUSINESS_ACCOUNTS = {
  '9999999999': {
    phone: '9999999999',
    phoneCode: '+91',
    email: 'marina.arena@scoringheroes.com',
    role: 'ground',
    roleCategory: 'official',
    nickname: 'GroundMaster_Dev',
    fullName: 'Dev Anand (Stadium Director)',
    city: 'Chennai',
    age: '42',
    address: 'Marina Sports Arena, Marina Beach Road, Chennai, Tamil Nadu 600005',
    verified: true,
    aadhaarVerified: true,
    aadhaarMasked: 'XXXX-XXXX-9999',
    trust: 99,
    onboardingComplete: true,
    businessType: '1. GROUNDS / Stadium',
    roleDetails: {
      venueName: 'Marina International Cricket Arena & Turfs',
      pitchesCount: 3,
      turfType: 'Natural Red Soil Turf Oval + 2 Astro Turfs',
      floodlights: 'LED 800-Lux Match Ready (4 Towers)',
      todayBookings: 8,
      totalSlots: 10,
      weeklyRevenue: '₹1,48,500',
      monthlyRevenue: '₹8,42,600',
      hourlyRate: '₹2,500',
      maintenanceStatus: 'Pitch 1 Rolled & Match Ready',
      activeLeases: 2,
      staffCount: 8,
      occupancyRate: '92%',
    },
  },
  '8888888888': {
    phone: '8888888888',
    phoneCode: '+91',
    email: 'academy.director@scoringheroes.com',
    role: 'academy',
    roleCategory: 'official',
    nickname: 'Director_Murthy',
    fullName: 'K. S. Murthy (Director)',
    city: 'Coimbatore',
    age: '46',
    address: 'Scoring Heroes Apex Academy, Coimbatore, Tamil Nadu',
    verified: true,
    aadhaarVerified: true,
    aadhaarMasked: 'XXXX-XXXX-8888',
    trust: 98,
    onboardingComplete: true,
    businessType: '2. Academics (Sports Academies)',
    roleDetails: {
      academyName: 'Scoring Heroes Elite Academy',
      regNumber: 'TN-SPO-2023-771',
      totalStudents: 128,
      activeCoaches: 6,
      monthlyFeesCollected: '₹3,84,000',
      pendingFees: '₹42,000',
      availableSlots: 18,
    },
  },
  '7777777777': {
    phone: '7777777777',
    phoneCode: '+91',
    email: 'factory.outlet@scoringheroes.com',
    role: 'seller',
    roleCategory: 'official',
    nickname: 'Brand_SS_Willow',
    fullName: 'Suresh Singhania',
    city: 'Meerut',
    age: '44',
    address: 'SS Sports Gear Factory Outlet, Meerut, UP',
    verified: true,
    aadhaarVerified: true,
    aadhaarMasked: 'XXXX-XXXX-7777',
    trust: 99,
    onboardingComplete: true,
    businessType: '3. Manufacturers / Factory Outlet / Seller',
    roleDetails: {
      businessName: 'Apex Willow & Pro Gear Co.',
      gstNumber: '09AAACA1234F1Z8 (Verified)',
      category: 'Customised Team Jerseys, Willow Bats & Kits',
      activeListings: 38,
      pendingOrders: 14,
      escrowSettlementBalance: '₹1,82,400',
      averageRating: '4.9 ★',
    },
  },
  '6666666666': {
    phone: '6666666666',
    phoneCode: '+91',
    email: 'coach.venkat@scoringheroes.com',
    role: 'coach',
    roleCategory: 'official',
    nickname: 'Coach_Venkat',
    fullName: 'Venkatesh Prasad',
    city: 'Chennai',
    age: '45',
    address: 'National Cricket High-Performance Center, Chennai',
    verified: true,
    aadhaarVerified: true,
    aadhaarMasked: 'XXXX-XXXX-6666',
    trust: 98,
    onboardingComplete: true,
    businessType: '4. Coach / Trainer',
    roleDetails: {
      coachSpecialization: 'Ranji Trophy Staff & Fast Bowling Specialist',
      licenseLevel: 'BCCI Level 2 Certified / Ranji Staff',
      academyAffiliation: 'Scoring Heroes Apex Academy',
      activeStudents: 42,
      batchesToday: 3,
      attendanceRate: '96.4%',
    },
  },
  '5555555555': {
    phone: '5555555555',
    phoneCode: '+91',
    email: 'streamer.karan@scoringheroes.com',
    role: 'streamer',
    roleCategory: 'official',
    nickname: 'Streamer_Karan',
    fullName: 'Karan Mehra',
    city: 'Mumbai',
    age: '28',
    address: 'ScoringCast Live Broadcast Studios, Mumbai',
    verified: true,
    aadhaarVerified: true,
    aadhaarMasked: 'XXXX-XXXX-5555',
    trust: 97,
    onboardingComplete: true,
    businessType: '5. Live Streamers',
    roleDetails: {
      channelName: 'ScoringCast Live Studio',
      broadcastTier: 'Pro Multi-Cam Rig & 4K Drone Feed',
      primarySport: 'Cricket Tournaments',
      activeStreams: 2,
      totalViewers: '48,200',
      subscribers: '12.4K',
      quality: '1080p 60fps Ultra-Low Latency',
    },
  },
  '4444444444': {
    phone: '4444444444',
    phoneCode: '+91',
    email: 'sponsor.velocity@scoringheroes.com',
    role: 'sponsor',
    roleCategory: 'official',
    nickname: 'Sponsor_Velocity',
    fullName: 'Vikramaditya Rao',
    city: 'Mumbai',
    age: '37',
    address: 'Velocity Brands & Media Tower, Mumbai',
    verified: true,
    aadhaarVerified: true,
    aadhaarMasked: 'XXXX-XXXX-4444',
    trust: 99,
    onboardingComplete: true,
    businessType: '6. Sponsor',
    roleDetails: {
      companyName: 'Velocity Sports Nutrition',
      activeCampaigns: 4,
      totalImpressions: '1,420,000',
      clickThroughRate: '3.8%',
      sponsoredTournaments: ['Chennai Street Cup', 'Academy Super League'],
      walletBalance: '₹84,500',
    },
  },
}

function readRegisteredAccounts() {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY)
    const stored = raw ? JSON.parse(raw) : {}
    return { ...DEMO_BUSINESS_ACCOUNTS, ...stored }
  } catch {
    return { ...DEMO_BUSINESS_ACCOUNTS }
  }
}

function readPendingOnboardings() {
  try {
    const raw = localStorage.getItem(PENDING_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readUser)
  const [draft, setDraft] = useState({
    phoneCode: '+91',
    phone: '',
    email: '',
    nickname: '',
    fullName: '',
    age: '20',
    city: 'Chennai',
    address: '',
    nationality: 'India',
    countryCode: 'IN',
    sportId: 'cricket',
    sportName: 'Cricket',
    competitionLevel: 'National Level',
    roleCategory: 'player', // 'player' | 'official'
    role: 'player', // 'player', 'ground', 'academy', 'seller', 'coach', 'streamer', 'sponsor'
    roleDetails: {},
    mode: 'register',
    aadhaarNumber: '',
    aadhaarVerified: false,
    onboardingStep: 1,
  })

  const value = useMemo(
    () => ({
      user,
      draft,
      updateDraft: (patch) => setDraft((d) => ({ ...d, ...patch })),
      updateUser: (patch) => {
        setUser((prev) => {
          const next = { ...(prev || {}), ...patch }
          sessionStorage.setItem(KEY, JSON.stringify(next))
          return next
        })
      },
      // Save pending onboarding progress so user can resume anytime
      savePendingOnboarding: (identifier, progressData) => {
        try {
          const cleanKey = (identifier || '').replace(/\D/g, '') || (identifier || '').toLowerCase().trim()
          if (!cleanKey) return
          const pending = readPendingOnboardings()
          pending[cleanKey] = {
            ...progressData,
            savedAt: new Date().toISOString(),
          }
          localStorage.setItem(PENDING_KEY, JSON.stringify(pending))
        } catch {
          // ignore
        }
      },
      // Retrieve pending onboarding state if user left without finishing
      getPendingOnboarding: (identifier) => {
        const cleanKey = (identifier || '').replace(/\D/g, '') || (identifier || '').toLowerCase().trim()
        if (!cleanKey) return null
        const pending = readPendingOnboardings()
        return pending[cleanKey] || null
      },
      // Finish registration / login
      completeSignup: (customData) => {
        const targetRoleId = customData?.role || draft.role || 'player'
        const roleMeta = getRoleById(targetRoleId)

        const next = {
          ...draft,
          ...(roleMeta?.defaultUser || {}),
          ...(customData || {}),
          role: targetRoleId,
          roleCategory: roleMeta.category,
          nickname: (customData?.nickname || draft.nickname || roleMeta.defaultUser?.nickname || 'Athlete_One').trim(),
          fullName: (customData?.fullName || draft.fullName || roleMeta.defaultUser?.fullName || 'Registered Athlete').trim(),
          city: (customData?.city || draft.city || roleMeta.defaultUser?.city || 'Chennai').trim(),
          address: (customData?.address || draft.address || 'Chennai, Tamil Nadu, India'),
          age: (customData?.age || draft.age || roleMeta.defaultUser?.age || '20'),
          nationality: customData?.nationality || draft.nationality || 'India',
          sportName: customData?.sportName || draft.sportName || 'Cricket',
          competitionLevel: customData?.competitionLevel || draft.competitionLevel || 'National Level',
          phoneCode: customData?.phoneCode || draft.phoneCode || '+91',
          phone: (customData?.phone || draft.phone || '9876543210'),
          email: (customData?.email || draft.email || ''),
          roleDetails: {
            ...(roleMeta.defaultUser?.roleDetails || {}),
            ...(draft.roleDetails || {}),
            ...(customData?.roleDetails || {}),
          },
          verified: customData?.verified ?? true,
          aadhaarVerified: customData?.aadhaarVerified ?? (targetRoleId === 'player'),
          aadhaarMasked: customData?.aadhaarMasked || (targetRoleId === 'player' ? 'XXXX-XXXX-9012' : null),
          trust: customData?.trust || 94,
          isGuest: Boolean(customData?.isGuest),
          onboardingComplete: true,
        }

        // Save session
        sessionStorage.setItem(KEY, JSON.stringify(next))
        setUser(next)

        // Save to persistent accounts registry for automatic role detection on future login
        try {
          const cleanPhone = (next.phone || '').replace(/\D/g, '')
          const cleanEmail = (next.email || '').toLowerCase().trim()
          const accounts = readRegisteredAccounts()
          if (cleanPhone) accounts[cleanPhone] = next
          if (cleanEmail) accounts[cleanEmail] = next
          localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))

          // Clear any pending onboarding records
          const pending = readPendingOnboardings()
          if (cleanPhone) delete pending[cleanPhone]
          if (cleanEmail) delete pending[cleanEmail]
          localStorage.setItem(PENDING_KEY, JSON.stringify(pending))
        } catch {
          // ignore storage error
        }
      },
      // Intelligent login with automatic role detection and pending onboarding check
      loginWithIdentifier: (identifier) => {
        const clean = (identifier || '').trim()
        const cleanDigits = clean.replace(/\D/g, '')
        const accounts = readRegisteredAccounts()
        const pending = readPendingOnboardings()

        // 1. Check if user has an unfinished pending registration:
        // FORCE them to complete onboarding where they left off!
        const pendingRecord = pending[cleanDigits] || pending[clean.toLowerCase()]
        if (pendingRecord && !pendingRecord.onboardingComplete) {
          return {
            ...pendingRecord,
            needsOnboarding: true,
          }
        }

        // 2. Check predefined demo accounts or registered accounts:
        const matched = DEMO_BUSINESS_ACCOUNTS[cleanDigits] || accounts[cleanDigits] || accounts[clean.toLowerCase()]
        if (matched) {
          sessionStorage.setItem(KEY, JSON.stringify(matched))
          setUser(matched)
          return matched
        }

        // 3. Fallback demo user
        const defaultRoleMeta = getRoleById('player')
        const fallbackUser = {
          ...defaultRoleMeta.defaultUser,
          phoneCode: '+91',
          phone: cleanDigits || '9876543210',
          email: clean.includes('@') ? clean : 'athlete@sports.com',
          verified: true,
          trust: 94,
          role: 'player',
          roleCategory: 'player',
          onboardingComplete: true,
        }
        sessionStorage.setItem(KEY, JSON.stringify(fallbackUser))
        setUser(fallbackUser)
        return fallbackUser
      },
      // Instant switch between any role profiles & dashboards
      switchRole: (roleId) => {
        const roleMeta = getRoleById(roleId)
        setUser((prev) => {
          const base = prev || {}
          const next = {
            ...base,
            role: roleId,
            roleCategory: roleMeta.category,
            nickname: base.isGuest ? roleMeta.defaultUser.nickname : (base.nickname || roleMeta.defaultUser.nickname),
            roleDetails: {
              ...(roleMeta.defaultUser?.roleDetails || {}),
              ...(base.roleDetails?.[roleId] || {}),
            },
          }
          sessionStorage.setItem(KEY, JSON.stringify(next))
          return next
        })
      },
      // 1-Click Guest Login for any role (defaults to player if not specified)
      loginAsGuest: (roleId = 'player') => {
        const roleMeta = getRoleById(roleId)
        const guestData = {
          ...roleMeta.defaultUser,
          phoneCode: '+91',
          phone: '9876543210',
          isGuest: true,
          verified: true,
          trust: 90,
          onboardingComplete: true,
        }
        sessionStorage.setItem(KEY, JSON.stringify(guestData))
        setUser(guestData)
      },
      logout: () => {
        sessionStorage.removeItem(KEY)
        setUser(null)
      },
    }),
    [user, draft],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
