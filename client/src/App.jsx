import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import RequireAuth from './components/RequireAuth'
import Alerts from './pages/Alerts'
import EmailSetup from './pages/EmailSetup'
import Home from './pages/Home'
import LiveScorer from './pages/LiveScorer'
import Matches from './pages/Matches'
import ModulePlaceholder from './pages/ModulePlaceholder'
import More from './pages/More'
import Onboarding from './pages/Onboarding'
import Privacy from './pages/Privacy'
import ProfileSetup from './pages/ProfileSetup'
import Register from './pages/Register'
import RoleSelect from './pages/RoleSelect'
import VerifyOtp from './pages/VerifyOtp'
import VerifyEmail from './pages/VerifyEmail'
import Welcome from './pages/Welcome'
import FlashScreen from './pages/FlashScreen'
import Avatar from './pages/Avatar'
import AvatarCapture from './pages/AvatarCapture'
import AvatarMapping from './pages/AvatarMapping'
import AvatarViewer from './pages/AvatarViewer'
import AvatarJersey from './pages/AvatarJersey'
import PlayerStatsHub from './pages/PlayerStatsHub'
import PlayerStatDetail from './pages/PlayerStatDetail'
import Community from './pages/Community'
import Auction from './pages/Auction'
import AcademyCareer from './pages/AcademyCareer'
import AICommentary from './pages/AICommentary'
import Highlights from './pages/Highlights'
import CareerJourney from './pages/CareerJourney'
import MatchTools from './pages/MatchTools'
import GroundSlotBooking from './pages/GroundSlotBooking'
import TournamentTicketing from './pages/TournamentTicketing'
import SportsMarketplace from './pages/SportsMarketplace'
import SellerMerchantPortal from './pages/SellerMerchantPortal'
import CoachPortal from './pages/CoachPortal'
import ProductDetail from './pages/ProductDetail'
import CartPage from './pages/CartPage'
import WishlistPage from './pages/WishlistPage'
import ManufacturerPartners from './pages/ManufacturerPartners'
import SponsorshipAds from './pages/SponsorshipAds'
import AIMatchSystem from './pages/AIMatchSystem'
import EntertainmentSystem from './pages/EntertainmentSystem'
import InterviewMediaSystem from './pages/InterviewMediaSystem'
import SportsEPaperSystem from './pages/SportsEPaperSystem'
import SuperScoring11 from './pages/SuperScoring11'
import AdminPanel from './pages/AdminPanel'
import AadhaarVerification from './pages/AadhaarVerification'
import RoleProfile from './pages/RoleProfile'

function SplashRoute() {
  const navigate = useNavigate()
  const { user } = useAuth()
  return (
    <FlashScreen
      onFinish={() => {
        if (user) {
          navigate('/app', { replace: true })
        } else {
          navigate('/welcome', { replace: true })
        }
      }}
    />
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/welcome" element={<Welcome skipFlash={true} />} />
      <Route path="/splash" element={<SplashRoute />} />
      <Route path="/flash" element={<SplashRoute />} />
      <Route path="/preview-splash" element={<FlashScreen autoTransition={false} onFinish={() => {}} />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Register defaultTab="login" />} />
      <Route path="/signin" element={<Register defaultTab="login" />} />
      <Route path="/otp" element={<VerifyOtp />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/email" element={<EmailSetup />} />
      <Route path="/profile" element={<ProfileSetup />} />
      <Route path="/role" element={<RoleSelect />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route
        path="/app"
        element={
          <RequireAuth>
            <AppLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Home />} />
        <Route path="matches" element={<Matches />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="more" element={<More />} />
        <Route path="scorer" element={<LiveScorer />} />
        <Route path="module/:slug" element={<ModulePlaceholder />} />
        <Route path="avatar" element={<Avatar />} />
        <Route path="avatar/capture" element={<AvatarCapture />} />
        <Route path="avatar/mapping" element={<AvatarMapping />} />
        <Route path="avatar/viewer" element={<AvatarViewer />} />
        <Route path="avatar/jersey" element={<AvatarJersey />} />
        <Route path="stats" element={<PlayerStatsHub />} />
        <Route path="stats/:statId" element={<PlayerStatDetail />} />
        <Route path="community" element={<Community />} />
        <Route path="auction" element={<Auction />} />
        <Route path="academy" element={<AcademyCareer />} />
        <Route path="commentary" element={<AICommentary />} />
        <Route path="highlights" element={<Highlights />} />
        <Route path="videos" element={<Highlights />} />
        <Route path="reels" element={<Highlights />} />
        <Route path="journey" element={<CareerJourney />} />
        <Route path="match-tools" element={<MatchTools />} />
        <Route path="grounds" element={<GroundSlotBooking />} />
        <Route path="stadium" element={<GroundSlotBooking />} />
        <Route path="ticketing" element={<TournamentTicketing />} />
        <Route path="tournaments" element={<TournamentTicketing />} />
        <Route path="marketplace" element={<SportsMarketplace />} />
        <Route path="seller" element={<SellerMerchantPortal />} />
        <Route path="merchant" element={<SellerMerchantPortal />} />
        <Route path="coach" element={<CoachPortal />} />
        <Route path="trainer" element={<CoachPortal />} />
        <Route path="marketplace/product/:productId" element={<ProductDetail />} />
        <Route path="marketplace/cart" element={<CartPage />} />
        <Route path="marketplace/wishlist" element={<WishlistPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="market" element={<SportsMarketplace />} />
        <Route path="market/product/:productId" element={<ProductDetail />} />
        <Route path="store" element={<SportsMarketplace />} />
        <Route path="store/product/:productId" element={<ProductDetail />} />
        <Route path="shop" element={<SportsMarketplace />} />
        <Route path="shop/product/:productId" element={<ProductDetail />} />
        <Route path="shop/cart" element={<CartPage />} />
        <Route path="shop/wishlist" element={<WishlistPage />} />
        <Route path="partners" element={<ManufacturerPartners />} />
        <Route path="manufacturer" element={<ManufacturerPartners />} />
        <Route path="brands" element={<ManufacturerPartners />} />
        <Route path="sponsorship" element={<SponsorshipAds />} />
        <Route path="ads" element={<SponsorshipAds />} />
        <Route path="campaigns" element={<SponsorshipAds />} />
        <Route path="aimatch" element={<AIMatchSystem />} />
        <Route path="ai-match" element={<AIMatchSystem />} />
        <Route path="module/aimatch" element={<AIMatchSystem />} />
        <Route path="entertainment" element={<EntertainmentSystem />} />
        <Route path="audio" element={<EntertainmentSystem />} />
        <Route path="module/entertainment" element={<EntertainmentSystem />} />
        <Route path="interview" element={<InterviewMediaSystem />} />
        <Route path="media" element={<InterviewMediaSystem />} />
        <Route path="press" element={<InterviewMediaSystem />} />
        <Route path="module/interview" element={<InterviewMediaSystem />} />
        <Route path="epaper" element={<SportsEPaperSystem />} />
        <Route path="news" element={<SportsEPaperSystem />} />
        <Route path="paper" element={<SportsEPaperSystem />} />
        <Route path="module/epaper" element={<SportsEPaperSystem />} />
        <Route path="super11" element={<SuperScoring11 />} />
        <Route path="super-11" element={<SuperScoring11 />} />
        <Route path="module/super11" element={<SuperScoring11 />} />
        <Route path="admin" element={<AdminPanel />} />
        <Route path="admin-panel" element={<AdminPanel />} />
        <Route path="module/admin" element={<AdminPanel />} />
        <Route path="aadhaar" element={<AadhaarVerification />} />
        <Route path="trust" element={<AadhaarVerification />} />
        <Route path="verify-aadhaar" element={<AadhaarVerification />} />
        <Route path="profile" element={<RoleProfile />} />
        <Route path="account" element={<RoleProfile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
