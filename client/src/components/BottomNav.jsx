import { NavLink, useLocation } from 'react-router-dom'
import {
  Home,
  Trophy,
  PlaySquare,
  Newspaper,
  ShoppingBag,
  Calendar,
  Users,
  DollarSign,
  Building,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

// Player & Fan Bottom Navigation
const PLAYER_NAV_ITEMS = [
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

// Ground & Stadium Owner Dedicated Navigation
const GROUND_NAV_ITEMS = [
  {
    to: '/app',
    label: 'Home',
    icon: Building,
    end: true,
  },
  {
    to: '/app/grounds?tab=slots',
    label: 'Slots',
    icon: Calendar,
    aliases: ['/app/grounds', '/app/stadium'],
  },
  {
    to: '/app/grounds?tab=staff',
    label: 'Staff Ops',
    icon: Users,
  },
  {
    to: '/app/grounds?tab=accounts',
    label: 'Accounts',
    icon: DollarSign,
  },
  {
    to: '/app/marketplace',
    label: 'Gear Store',
    icon: ShoppingBag,
    aliases: ['/app/shop', '/app/store', '/app/market'],
  },
]

export default function BottomNav() {
  const { user } = useAuth()
  const location = useLocation()
  const currentPath = location.pathname

  const isGroundOwner = user?.role === 'ground'
  const navItems = isGroundOwner ? GROUND_NAV_ITEMS : PLAYER_NAV_ITEMS

  // Hide the bottom navigation bar on camera/capture pages
  if (
    currentPath.startsWith('/app/avatar/capture') ||
    currentPath.startsWith('/app/avatar/mapping')
  ) {
    return null
  }

  function checkIsActive(item) {
    const [itemPath, itemQuery] = item.to.split('?')
    if (item.end) {
      return currentPath === '/app' || currentPath === '/app/'
    }
    if (itemQuery) {
      if (location.search.includes(itemQuery)) return true
      // Default to slots when query is empty on /app/grounds
      if ((!location.search || location.search === '') && itemQuery === 'tab=slots' && currentPath === itemPath) {
        return true
      }
      return false
    }
    if (currentPath === itemPath) return true
    if (currentPath.startsWith(itemPath + '/')) return true
    if (item.aliases && item.aliases.some((alias) => currentPath.startsWith(alias.split('?')[0]))) {
      return true
    }
    return false
  }

  return (
    <nav className="tabbar tabbar--fixed" aria-label="Main Navigation">
      {navItems.map((item) => {
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
