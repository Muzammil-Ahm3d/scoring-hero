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

function readRegisteredAccounts() {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
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

        // 2. Check if account already registered and completed:
        const matched = accounts[cleanDigits] || accounts[clean.toLowerCase()]
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
