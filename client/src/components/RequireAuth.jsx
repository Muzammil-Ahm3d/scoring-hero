import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RequireAuth({ children }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) {
    const redirectParam = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/login?redirect=${redirectParam}`} replace />
  }
  return children
}
