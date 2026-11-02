import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Register from './Register'
import FlashScreen from './FlashScreen'

export default function Welcome({ skipFlash = false }) {
  const { user } = useAuth()
  const location = useLocation()

  const [showFlash, setShowFlash] = useState(() => {
    if (skipFlash) return false
    if (location.state?.skipFlash) return false
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('skip') === '1' || params.get('skip') === 'true') {
        return false
      }
    }
    return true
  })

  if (showFlash) {
    return <FlashScreen onFinish={() => setShowFlash(false)} />
  }

  if (user) return <Navigate to="/app" replace />

  // Render the clean white theme login & register directly on landing
  return <Register />
}
