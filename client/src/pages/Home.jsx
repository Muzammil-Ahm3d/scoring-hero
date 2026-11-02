import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutGrid, UserCheck } from 'lucide-react'
import Screen from '../components/Screen'
import { useAuth } from '../context/AuthContext'
import HeroBannerCarousel from '../components/HeroBannerCarousel'
import RoleBanner from '../components/RoleBanner'
import RoleProfileView from '../components/RoleProfileView'
import PlayerDashboard from '../components/dashboards/PlayerDashboard'
import FanDashboard from '../components/dashboards/FanDashboard'
import FranchiseDashboard from '../components/dashboards/FranchiseDashboard'
import CoachDashboard from '../components/dashboards/CoachDashboard'
import AcademyDashboard from '../components/dashboards/AcademyDashboard'
import GroundDashboard from '../components/dashboards/GroundDashboard'
import StaffDashboard from '../components/dashboards/StaffDashboard'
import OrganizerDashboard from '../components/dashboards/OrganizerDashboard'
import SellerDashboard from '../components/dashboards/SellerDashboard'
import SponsorDashboard from '../components/dashboards/SponsorDashboard'
import AdminDashboard from '../components/dashboards/AdminDashboard'

export default function Home() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [panelTab, setPanelTab] = useState('workspace') // 'workspace' | 'profile'

  const currentRole = user?.role || 'player'

  // Map active role to its corresponding dedicated dashboard
  function renderRoleDashboard() {
    switch (currentRole) {
      case 'fan':
        return <FanDashboard user={user} />
      case 'franchise':
        return <FranchiseDashboard user={user} />
      case 'coach':
        return <CoachDashboard user={user} />
      case 'academy':
        return <AcademyDashboard user={user} />
      case 'ground':
        return <GroundDashboard user={user} />
      case 'staff':
        return <StaffDashboard user={user} />
      case 'organizer':
        return <OrganizerDashboard user={user} />
      case 'seller':
        return <SellerDashboard user={user} />
      case 'sponsor':
        return <SponsorDashboard user={user} />
      case 'admin':
        return <AdminDashboard user={user} />
      case 'player':
      default:
        return <PlayerDashboard user={user} />
    }
  }

  return (
    <Screen branded padded={false}>
      <div className="home-dashboard-container">
        {/* Modular Hero Banner Carousel showcasing latest world updates, admin news, and gear offers */}
        <HeroBannerCarousel />

        {/* Universal Role & Profile Switcher Banner */}
        <RoleBanner />

        {/* Role Panel Tabs: Operations Workspace vs About Profile & Account */}
        <div className="sh-role-panel-nav">
          <button
            type="button"
            className={`sh-role-panel-tab ${panelTab === 'workspace' ? 'is-active' : ''}`}
            onClick={() => setPanelTab('workspace')}
          >
            <LayoutGrid size={14} />
            <span>Operations & Tools</span>
          </button>
          <button
            type="button"
            className={`sh-role-panel-tab ${panelTab === 'profile' ? 'is-active' : ''}`}
            onClick={() => setPanelTab('profile')}
          >
            <UserCheck size={14} />
            <span>About Profile & Account</span>
          </button>
        </div>

        {/* Dynamic Dedicated Dashboard or Role Profile View */}
        {panelTab === 'workspace' ? (
          renderRoleDashboard()
        ) : (
          <div style={{ padding: '0 14px 20px' }}>
            <RoleProfileView onRoleSwitch={() => setPanelTab('workspace')} />
          </div>
        )}
      </div>
    </Screen>
  )
}
