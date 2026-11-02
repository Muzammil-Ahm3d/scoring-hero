import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ChevronLeft, Bell } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export function Flow({ as: Tag = 'div', children, foot, onSubmit, className = '' }) {
  return (
    <Tag className={`flow ${className}`} onSubmit={onSubmit}>
      <div className="flow__main">{children}</div>
      {foot ? <div className="screen__foot">{foot}</div> : null}
    </Tag>
  )
}

export default function Screen({
  children,
  back,
  left,
  title,
  right,
  branded,
  showNavActions = true,
  padded = true,
  className = '',
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const bodyRef = useRef(null)
  const { user } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)

  // Ensure every screen strictly starts from the top (0px) on load and route changes
  useEffect(() => {
    setIsScrolled(false)
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    if (bodyRef.current) {
      bodyRef.current.scrollTop = 0
    }
    const allBodies = document.querySelectorAll('.screen__body')
    allBodies.forEach((b) => {
      b.scrollTop = 0
    })
  }, [location.pathname])

  // Track scroll position to dynamically collapse/minimize the logo
  const checkScroll = (e) => {
    const bodyScroll = bodyRef.current ? bodyRef.current.scrollTop : 0
    const targetScroll = e?.target && typeof e.target.scrollTop === 'number' ? e.target.scrollTop : 0
    const winScroll = window.scrollY || document.documentElement?.scrollTop || document.body?.scrollTop || 0
    const maxScroll = Math.max(bodyScroll, targetScroll, winScroll)
    setIsScrolled(maxScroll > 15)
  }

  useEffect(() => {
    const bodyEl = bodyRef.current
    if (bodyEl) {
      bodyEl.addEventListener('scroll', checkScroll, { passive: true })
    }
    window.addEventListener('scroll', checkScroll, { passive: true, capture: true })

    checkScroll()

    return () => {
      if (bodyEl) {
        bodyEl.removeEventListener('scroll', checkScroll)
      }
      window.removeEventListener('scroll', checkScroll, { capture: true })
    }
  }, [location.pathname])

  // Standard Header Actions (Notification Bell & Profile Redirection)
  const defaultHeaderActions = showNavActions ? (
    <div className="topbar__actions">
      <button
        type="button"
        className="topbar__action-btn topbar__action-btn--bell"
        onClick={() => navigate('/app/alerts')}
        aria-label="Alerts & Notifications"
        title="View Alerts & Notifications"
      >
        <Bell size={20} />
        <span className="topbar__badge" aria-label="3 new notifications">
          3
        </span>
      </button>

      <button
        type="button"
        className="topbar__action-btn topbar__action-btn--profile"
        onClick={() => navigate('/app/profile')}
        aria-label="View Profile & Account"
        title={user?.name ? `${user.name} - Profile` : 'View Profile & Account'}
      >
        <div className="topbar__avatar">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name || 'User Profile'}
              className="topbar__avatar-img"
            />
          ) : (
            <span className="topbar__avatar-init">
              {(user?.name || user?.role || 'SH').substring(0, 2).toUpperCase()}
            </span>
          )}
          <span className="topbar__avatar-status" />
        </div>
      </button>
    </div>
  ) : null

  const hasHeader = back || left || title || branded || right !== undefined || showNavActions

  return (
    <div className={`screen ${className}`}>
      {hasHeader && (
        <>
          <header className={`topbar topbar--fixed ${branded ? 'topbar--branded' : ''} ${isScrolled ? 'topbar--scrolled' : ''}`}>
            {/* Left section: Back button, Custom Left, or Prominent PNG Brand Logo */}
            <div className="topbar__left">
              {back ? (
                <button
                  className="icon-btn"
                  type="button"
                  onClick={() => navigate(-1)}
                  aria-label="Back"
                >
                  <ChevronLeft size={22} />
                </button>
              ) : left ? (
                left
              ) : branded ? (
                <button
                  type="button"
                  className="topbar__logo-btn"
                  onClick={() => navigate('/app')}
                  aria-label="Scoring Heroes Home"
                  title="Scoring Heroes Home"
                >
                  <img
                    src="/logo.png"
                    alt="Scoring Heroes"
                    className="topbar__logo-img"
                  />
                </button>
              ) : (
                <span className="icon-btn icon-btn--ghost" />
              )}
            </div>

            {/* Center section: Title if provided */}
            {title ? (
              <h1 className="topbar__title">{title}</h1>
            ) : (
              <div className="topbar__center-spacer" />
            )}

            {/* Right section: Custom Right prop or default Notification Bell & Profile Avatar */}
            <div className="topbar__right">
              {right !== undefined ? right : defaultHeaderActions}
            </div>
          </header>
          <div className={`topbar-spacer ${branded ? 'topbar-spacer--branded' : ''}`} aria-hidden="true" />
        </>
      )}

      <div
        ref={bodyRef}
        onScroll={checkScroll}
        className={`screen__body ${padded ? 'screen__body--pad' : ''}`}
      >
        {children}
      </div>
    </div>
  )
}
