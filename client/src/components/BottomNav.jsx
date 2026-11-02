import { NavLink, useLocation } from 'react-router-dom'
import {
  Home,
  Trophy,
  PlaySquare,
  Newspaper,
  ShoppingBag,
} from 'lucide-react'

// Exactly 5 fixed bottom navigation icons per requirements: Home, Matches, Videos, News, Shop
const NAV_ITEMS = [
  {
    to: '/app',
    label: 'Home',
    icon: Home,
    end: true,
  },
  {
    to: '/app/matches',
    label: 'Matches',
    icon: Trophy,
    aliases: ['/app/match-tools', '/app/scorer', '/app/tournaments'],
  },
  {
    to: '/app/highlights',
    label: 'Videos',
    icon: PlaySquare,
    aliases: ['/app/videos', '/app/reels', '/app/interview'],
  },
  {
    to: '/app/epaper',
    label: 'News',
    icon: Newspaper,
    aliases: ['/app/news', '/app/paper'],
  },
  {
    to: '/app/marketplace',
    label: 'Shop',
    icon: ShoppingBag,
    aliases: ['/app/shop', '/app/store', '/app/market', '/app/cart', '/app/wishlist'],
  },
]

export default function BottomNav() {
  const location = useLocation()
  const currentPath = location.pathname

  // Hide the bottom navigation bar on camera/capture pages
  if (
    currentPath.startsWith('/app/avatar/capture') ||
    currentPath.startsWith('/app/avatar/mapping')
  ) {
    return null
  }

  function checkIsActive(item) {
    if (item.end) {
      return currentPath === '/app' || currentPath === '/app/'
    }
    if (currentPath.startsWith(item.to)) {
      return true
    }
    if (item.aliases && item.aliases.some((alias) => currentPath.startsWith(alias))) {
      return true
    }
    return false
  }

  return (
    <nav className="tabbar tabbar--fixed" aria-label="Main Navigation">
      {NAV_ITEMS.map((item) => {
        const active = checkIsActive(item)
        const IconComponent = item.icon

        return (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.end}
            className={`tabbar__item ${active ? 'is-active' : ''}`}
            aria-label={item.label}
          >
            <div className="tabbar__icon-wrap">
              <IconComponent size={22} strokeWidth={active ? 2.4 : 1.9} />
            </div>
            <span className="tabbar__label">{item.label}</span>
            {active && <span className="tabbar__active-bar" />}
          </NavLink>
        )
      })}
    </nav>
  )
}
