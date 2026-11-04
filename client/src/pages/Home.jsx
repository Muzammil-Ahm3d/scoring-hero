import Screen from '../components/Screen'
import { useAuth } from '../context/AuthContext'
import HeroBannerCarousel from '../components/HeroBannerCarousel'
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
import StreamerDashboard from '../components/dashboards/StreamerDashboard'
import AdminDashboard from '../components/dashboards/AdminDashboard'

export default function Home() {
  const { user } = useAuth()

  const currentRole = user?.role || 'player'
  const isBusinessVendor = ['ground', 'academy', 'seller', 'coach', 'streamer', 'sponsor', 'admin', 'staff', 'organizer'].includes(currentRole)

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
      case 'streamer':
        return <StreamerDashboard user={user} />
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
        {/* Only show consumer / fan hero carousel for players and fans, NOT for business owners! */}
        {!isBusinessVendor && <HeroBannerCarousel />}

        {/* Dedicated Role Dashboard */}
        {renderRoleDashboard()}
      </div>
    </Screen>
  )
}
