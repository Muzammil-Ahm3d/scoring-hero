import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Register from './Register'

export default function Welcome() {
  const { user } = useAuth()

  if (user) return <Navigate to="/app" replace />

  // Render the clean white theme login & register directly on landing
  return <Register />
}
