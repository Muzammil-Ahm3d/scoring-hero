import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GiCricketBat } from 'react-icons/gi'
import {
  User,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Award,
  LogOut,
  RefreshCw,
  Edit3,
  Check,
  X,
  ChevronRight,
  ExternalLink,
  Layers,
  Sparkles,
  Building,
  Briefcase,
  Trophy,
  Ticket,
  ShoppingBag,
  Megaphone,
  GraduationCap,
  Gavel,
  Radio,
  FileText,
  CreditCard,
  QrCode,
  Flame,
  Heart,
  Zap,
  ClipboardCheck,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { getRoleById, ROLES } from '../data/rolesData'

function renderOfficialRoleIcon(roleId, size = 26) {
  switch (roleId) {
    case 'player':
      return <GiCricketBat size={size} color="#00e5ff" />
    case 'franchise':
      return <Gavel size={size} color="#ff5722" />
    case 'coach':
      return <Zap size={size} color="#00e676" />
    case 'academy':
      return <GraduationCap size={size} color="#ffc83d" />
    case 'ground':
      return <Building size={size} color="#00e5ff" />
    case 'staff':
      return <ClipboardCheck size={size} color="#ffd600" />
    case 'organizer':
      return <Trophy size={size} color="#e10613" />
    case 'seller':
      return <ShoppingBag size={size} color="#ff5722" />
    case 'sponsor':
      return <Megaphone size={size} color="#3de0ff" />
    case 'admin':
      return <Shield size={size} color="#ff1744" />
    case 'fan':
    default:
      return <Heart size={size} color="#ffc83d" />
  }
}

export default function RoleProfileView({ onRoleSwitch }) {
  const navigate = useNavigate()
  const { user, updateUser, switchRole, logout } = useAuth()
  const activeRole = getRoleById(user?.role || 'player')

  // Edit profile state
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    nickname: user?.nickname || 'User',
    fullName: user?.fullName || (user?.nickname || 'User'),
    city: user?.city || 'Chennai',
    phone: user?.phone || '9876543210',
    email: user?.email || '',
  })
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const roleDetails = user?.roleDetails || {}
  const maskedAadhaar = user?.aadhaarMasked || 'XXXX-XXXX-9012'
  const isAadhaarVerified = user?.aadhaarVerified !== false

  function handleSaveProfile(e) {
    e.preventDefault()
    updateUser({
      nickname: formData.nickname.trim(),
      fullName: formData.fullName.trim(),
      city: formData.city.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
    })
    setIsEditing(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 2500)
  }

  function handleLogout() {
    logout()
    navigate('/', { replace: true })
  }

  // Generate detailed "About Profile" attributes based on the active role
  function getRoleProfileFields() {
    switch (activeRole.id) {
      case 'fan':
        return [
          { label: 'Supported Franchise', value: roleDetails.favTeam || 'Scoring XI & CSK', icon: Trophy },
          { label: 'Super 11 Squad Name', value: roleDetails.fantasyClub || 'Marina Blasters XI', icon: Flame },
          { label: 'Super Fan Tier', value: 'VIP Gold Member', icon: Award, highlight: true },
          { label: 'Fan Voting Points', value: `${roleDetails.pointsEarned || 1420} Pts`, icon: Sparkles },
          { label: 'Match Passes Booked', value: `${roleDetails.ticketsBooked || 4} Passes Active`, icon: Ticket },
          { label: 'Region Leaderboard', value: roleDetails.rank || '#12 in Karnataka State', icon: Award },
        ]
      case 'franchise':
        return [
          { label: 'Franchise Legal Entity', value: roleDetails.franchiseName || 'Coastal Kings XI', icon: Building, highlight: true },
          { label: 'Official Paddle Number', value: roleDetails.paddleNumber || 'PADDLE #04', icon: Gavel },
          { label: 'Tournament Tier', value: roleDetails.leagueName || 'Premier Champions Cup', icon: Trophy },
          { label: 'Auction Purse Budget', value: roleDetails.allocatedPurse || '₹50,00,000 (50L)', icon: CreditCard },
          { label: 'Purse Balance Remaining', value: '₹42,50,000 Available', icon: CreditCard },
          { label: 'Squad Composition', value: '18 Athletes (3 Overseas Stars)', icon: User },
          { label: 'Home Ground Facility', value: 'Marina Turf Arena, Chennai', icon: MapPin },
        ]
      case 'coach':
        return [
          { label: 'Coaching License Level', value: 'BCCI Level 2 Certified (Lic #TN-CCH-881)', icon: Award, highlight: true },
          { label: 'Affiliated Academy', value: roleDetails.academyName || 'Marina Titans Cricket Academy', icon: GraduationCap },
          { label: 'Active Training Batches', value: roleDetails.batchCount || '3 Batches (U14, U19, Elite Pro)', icon: Layers },
          { label: 'Trainees Supervised', value: `${roleDetails.activeStudents || 48} Enrolled Students`, icon: User },
          { label: 'Primary Specialization', value: roleDetails.specialization || 'Batting Technique & Mental Toughness', icon: Sparkles },
          { label: 'Trainee Attendance Rate', value: '96.4% Consistency', icon: Check },
        ]
      case 'academy':
        return [
          { label: 'Academy Name', value: roleDetails.academyName || 'Marina Titans Sports Academy', icon: GraduationCap, highlight: true },
          { label: 'Registration Society No.', value: roleDetails.regNumber || 'TN-SPO-2019-88', icon: FileText },
          { label: 'Campus Turf Facilities', value: roleDetails.turfCount || '4 Pitches + 6 Astro Practice Nets', icon: Layers },
          { label: 'Enrolled Trainee Base', value: `${roleDetails.studentCount || 124} Registered Athletes`, icon: User },
          { label: 'Certified Coaching Staff', value: '4 Senior Coaches, 1 Physio', icon: Briefcase },
          { label: 'Business GSTIN', value: '33AAAAA0000A1Z5 (Verified)', icon: ShieldCheck },
          { label: 'Monthly Accounts Collected', value: '₹3,84,000 / month', icon: CreditCard },
        ]
      case 'ground':
        return [
          { label: 'Venue / Stadium Name', value: roleDetails.venueName || 'Marina Stadium & Turf Arena', icon: Building, highlight: true },
          { label: 'Pitch Classifications', value: roleDetails.pitchTypes || '2 Red Soil Turf + 2 Astro Turfs', icon: Layers },
          { label: 'Floodlight Certification', value: roleDetails.lights || '800 Lux (Day/Night Matches Certified)', icon: Sparkles },
          { label: 'Seating Capacity', value: `${roleDetails.capacity || '2,500'} Spectators + 2 AC Dressing Rooms`, icon: User },
          { label: 'Hourly Turf Rate', value: '₹1,800/hr (Turf) • ₹1,200/hr (Nets)', icon: CreditCard },
          { label: 'Direct Settlement Bank', value: 'HDFC Bank • IFSC: HDFC0001234', icon: CreditCard },
        ]
      case 'staff':
        return [
          { label: 'Staff Designation', value: roleDetails.roleTitle || 'Senior Match Official & Digital Scorer', icon: Briefcase, highlight: true },
          { label: 'Official License ID', value: roleDetails.employeeId || 'ID #SH-OFF-772 (State Certified)', icon: FileText },
          { label: 'Total Matches Officiated', value: '142 Fixtures Completed', icon: Trophy },
          { label: 'Active Shift Location', value: roleDetails.department || 'Marina Ground Turf 1 (14:00 - 20:00)', icon: MapPin },
          { label: 'Match Fee Rate', value: '₹2,200 per match day', icon: CreditCard },
          { label: 'Role Privileges', value: 'Live Scoring, DRS Review, Sign Scorecard', icon: ShieldCheck },
        ]
      case 'organizer':
        return [
          { label: 'Sanctioned League Name', value: roleDetails.tournamentName || 'Coastal Premier League (CPL 2026)', icon: Trophy, highlight: true },
          { label: 'Sanctioning Body', value: roleDetails.sanctionBody || 'Tamil Nadu District Cricket Council', icon: ShieldCheck },
          { label: 'Registered Teams', value: `${roleDetails.teamsCount || 16} Teams (32 Fixtures Scheduled)`, icon: Layers },
          { label: 'Box Office Tickets Sold', value: '8,400 Tickets (₹12.6L Gross Revenue)', icon: Ticket },
          { label: 'Gate Turnstile App', value: 'Digital QR Verification Active', icon: QrCode },
          { label: 'Official Contact Desk', value: 'organizer@coastalcricket.org', icon: Mail },
        ]
      case 'seller':
        return [
          { label: 'Storefront Brand Name', value: roleDetails.brandName || 'Titans Pro Willow & Sports Gear', icon: ShoppingBag, highlight: true },
          { label: 'Product Specialization', value: roleDetails.category || 'English Willow Bats, Turf Spikes & Kits', icon: Layers },
          { label: 'Merchant Verification', value: 'B2B Verified Seller (UIDAI & GST Verified)', icon: ShieldCheck },
          { label: 'Active Catalog Products', value: '84 Products Listed in Marketplace', icon: ShoppingBag },
          { label: 'Warehouse Dispatch City', value: 'Guindy Industrial Estate, Chennai', icon: MapPin },
          { label: 'Business GSTIN', value: roleDetails.gstNumber || '33BBBBB1111B2Z6', icon: FileText },
          { label: 'Settlement Schedule', value: 'Weekly Automated Direct Deposit', icon: CreditCard },
        ]
      case 'sponsor':
        return [
          { label: 'Brand Entity Name', value: roleDetails.companyName || 'Zenith Energy & Hydration Co.', icon: Megaphone, highlight: true },
          { label: 'Sponsorship Tier', value: roleDetails.tier || 'Title Sponsor & Stadium Perimeter Partner', icon: Award, highlight: true },
          { label: 'Active Ad Campaigns', value: '4 Audio Commentary Jingles + 6 LED Banners', icon: Radio },
          { label: 'Committed Ad Budget', value: roleDetails.budget || '₹15,00,000 (15L Budget Committed)', icon: CreditCard },
          { label: 'Delivered Impressions', value: '480,000+ Verified Fan Impressions', icon: Sparkles },
          { label: 'Corporate Account Rep', value: 'Anjali Mehta (Brand Partnerships)', icon: User },
        ]
      case 'admin':
        return [
          { label: 'Administrative Rank', value: 'Platform Super Governance Admin', icon: Shield, highlight: true },
          { label: 'System Access Clearance', value: 'Level 5 Root Clearance (All Modules)', icon: Lock },
          { label: 'Security & Anti-Fraud', value: 'Active Live Integrity Radar', icon: ShieldAlert },
          { label: 'Verification Queue', value: '3 Pending Academy Approvals', icon: Check },
          { label: 'Audit Trail Ledger', value: 'Cryptographic SHA-256 Active', icon: FileText },
        ]
      case 'streamer':
        return [
          { label: 'Broadcast Channel', value: roleDetails.channelName || roleDetails.specialField || 'ScoringCast Live Studio', icon: Radio, highlight: true },
          { label: 'Streaming Hardware Setup', value: roleDetails.broadcastTier || 'Pro Broadcast Rig & Drones', icon: Layers },
          { label: 'Primary Sport Coverage', value: roleDetails.primarySport || 'Cricket Tournaments & Multi-Sport Feeds', icon: Trophy },
          { label: 'Stream Quality', value: '1080p 60fps Ultra-Low Latency', icon: Sparkles },
          { label: 'Live Viewership Base', value: '48,200 Viewers • 12.4K Subscribers', icon: User },
        ]
      case 'player':
      default:
        return [
          { label: 'Registered Sport', value: `${user?.sportName || 'Cricket'} (${user?.competitionLevel || 'National Level'})`, icon: Trophy, highlight: true },
          { label: 'Playing Role', value: roleDetails.role || 'All-rounder', icon: Award },
          { label: 'Batting Style', value: roleDetails.battingStyle || 'Right Hand Bat', icon: Sparkles },
          { label: 'Bowling Style', value: roleDetails.bowlingStyle || 'Right-arm Fast', icon: Flame },
          { label: 'Verified Age (Aadhaar)', value: `${user?.age || '20'} Years (UIDAI Verified)`, icon: Calendar },
          { label: 'Verified Address (Aadhaar)', value: user?.address || 'Mylapore, Chennai, Tamil Nadu - 600004', icon: MapPin },
          { label: 'Aadhaar Identity Status', value: `Verified & Encrypted (${maskedAadhaar})`, icon: ShieldCheck },
          { label: 'Enrolled Academy', value: roleDetails.academyName || 'Marina Titans Cricket Academy', icon: GraduationCap },
        ]
    }
  }


  const profileFields = getRoleProfileFields()

  return (
    <div className="sh-role-profile-view">
      {saveSuccess && (
        <div className="sh-profile-toast">
          ✓ Profile details updated successfully!
        </div>
      )}

      {/* Profile Header Hero Card */}
      <section className="sh-profile-hero" style={{ borderColor: `${activeRole.color}44` }}>
        <div className="sh-profile-hero-top">
          <div
            className="sh-profile-avatar-hex"
            style={{
              background: activeRole.accentBg,
              borderColor: activeRole.color,
              boxShadow: `0 0 20px ${activeRole.color}33`,
            }}
          >
            {renderOfficialRoleIcon(activeRole.id, 28)}
          </div>

          <div className="sh-profile-hero-info">
            <div className="sh-profile-title-row">
              <h2>{user?.nickname || 'User'}</h2>
              <span
                className="sh-badge-chip"
                style={{
                  background: activeRole.accentBg,
                  color: activeRole.color,
                  borderColor: `${activeRole.color}66`,
                }}
              >
                {activeRole.badge}
              </span>
            </div>
            <p className="sh-profile-fullname">{user?.fullName || user?.nickname || 'Account Holder'}</p>
            <p className="sh-profile-role-title">
              {activeRole.title} • <span style={{ color: '#3de0ff' }}>{user?.city || 'Chennai'}</span>
            </p>
          </div>

          <div
            className="sh-profile-trust-pill"
            onClick={() => navigate('/app/aadhaar')}
            role="button"
            tabIndex={0}
            title="Open Aadhaar & Trust System"
          >
            <strong>{user?.trust || 94}</strong>
            <span>TRUST SCORE</span>
          </div>
        </div>

        {/* Quick Identity Badges */}
        <div className="sh-profile-tags-row">
          <span className="sh-tag-badge">
            <ShieldCheck size={12} color="#00e676" />
            {isAadhaarVerified ? 'UIDAI AADHAAR VERIFIED' : 'VERIFICATION PENDING'}
          </span>
          <span className="sh-tag-badge">
            <Lock size={12} color="#ffd600" />
            ZERO-KNOWLEDGE PRIVACY
          </span>
          {user?.isGuest && (
            <span className="sh-tag-badge sh-tag-badge--guest">
              GUEST ACCESS MODE
            </span>
          )}
        </div>
      </section>

      {/* Edit Profile Toggle / Form */}
      <section className="panel" style={{ padding: '14px 16px', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: isEditing ? 12 : 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <User size={18} color="#3de0ff" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Personal & Contact Details</h3>
          </div>
          <button
            type="button"
            className="btn btn--secondary btn--sm"
            onClick={() => setIsEditing(!isEditing)}
            style={{ display: 'flex', alignItems: 'center', gap: 5 }}
          >
            {isEditing ? <X size={13} /> : <Edit3 size={13} />}
            <span>{isEditing ? 'Cancel Edit' : 'Edit Details'}</span>
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="sh-edit-profile-form">
            <div className="sh-form-grid">
              <div className="sh-form-group">
                <label className="sh-input-label">Public Nickname / Handle</label>
                <input
                  type="text"
                  className="sh-input"
                  value={formData.nickname}
                  onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                  required
                />
              </div>
              <div className="sh-form-group">
                <label className="sh-input-label">Official Full Legal Name</label>
                <input
                  type="text"
                  className="sh-input"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>
              <div className="sh-form-group">
                <label className="sh-input-label">Home City / Headquarters</label>
                <input
                  type="text"
                  className="sh-input"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  required
                />
              </div>
              <div className="sh-form-group">
                <label className="sh-input-label">Registered Mobile Number</label>
                <input
                  type="tel"
                  className="sh-input"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div className="sh-form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="sh-input-label">Email Address (Optional)</label>
                <input
                  type="email"
                  className="sh-input"
                  value={formData.email}
                  placeholder="name@example.com"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn--primary"
              style={{ width: '100%', marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
            >
              <Check size={16} /> Save Profile Changes
            </button>
          </form>
        ) : (
          <div className="sh-contact-summary-grid">
            <div className="sh-contact-box">
              <span className="sh-contact-label">PUBLIC NICKNAME</span>
              <strong className="sh-contact-val">{user?.nickname || 'Rohit_45'}</strong>
            </div>
            <div className="sh-contact-box">
              <span className="sh-contact-label">LEGAL NAME</span>
              <strong className="sh-contact-val">{user?.fullName || user?.nickname || 'Rohit Sharma'}</strong>
            </div>
            <div className="sh-contact-box">
              <span className="sh-contact-label">HOME BASE</span>
              <strong className="sh-contact-val">{user?.city || 'Chennai'}</strong>
            </div>
            <div className="sh-contact-box">
              <span className="sh-contact-label">MOBILE (MASKED)</span>
              <strong className="sh-contact-val">
                {user?.phone ? `${user.phone.slice(0, 2)}••••••${user.phone.slice(-2)}` : '+91 98••••••10'}
              </strong>
            </div>
          </div>
        )}
      </section>

      {/* "About This Profile" — Role Specific Comprehensive Information */}
      <section className="panel" style={{ padding: '16px', marginBottom: 14 }}>
        <header style={{ marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Briefcase size={16} color={activeRole.color} />
              <h3 style={{ margin: 0, fontSize: 15 }}>About Your {activeRole.title} Profile</h3>
            </div>
            <small style={{ color: 'var(--muted)', fontSize: 11 }}>
              Official registered details and operating credentials for this role
            </small>
          </div>
          <span
            className="pill"
            style={{
              background: activeRole.accentBg,
              color: activeRole.color,
              fontSize: 10,
              fontWeight: 'bold',
            }}
          >
            ACTIVE ROLE
          </span>
        </header>

        <div className="sh-role-details-list">
          {profileFields.map((field, idx) => {
            const Icon = field.icon || Award
            return (
              <div
                key={idx}
                className={`sh-role-detail-item ${field.highlight ? 'is-highlight' : ''}`}
                style={field.highlight ? { borderColor: `${activeRole.color}55` } : {}}
              >
                <div className="sh-detail-icon-wrap" style={{ color: activeRole.color }}>
                  <Icon size={16} />
                </div>
                <div className="sh-detail-text">
                  <span className="sh-detail-label">{field.label}</span>
                  <strong className="sh-detail-val" style={field.highlight ? { color: '#f4f7ff' } : {}}>
                    {field.value}
                  </strong>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Feature 03: Aadhaar + Trust Foundation Quick Card */}
      <section
        className="panel"
        style={{
          padding: '14px 16px',
          marginBottom: 14,
          background: 'linear-gradient(135deg, rgba(8, 22, 50, 0.9) 0%, rgba(13, 31, 68, 0.9) 100%)',
          borderColor: 'rgba(0, 230, 118, 0.3)',
          cursor: 'pointer',
        }}
        onClick={() => navigate('/app/aadhaar')}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(0,230,118,0.15)', display: 'grid', placeItems: 'center' }}>
              <ShieldCheck size={20} color="#00e676" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <strong style={{ fontSize: 13, color: '#f4f7ff' }}>Aadhaar & Fraud Security Layer</strong>
                <span className="pill" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676', fontSize: 9 }}>FEATURE 03</span>
              </div>
              <small style={{ color: '#9aa8c7', fontSize: 11 }}>
                Masked UID: {maskedAadhaar} • Zero-Knowledge Private Vault
              </small>
            </div>
          </div>
          <ChevronRight size={18} color="#00e676" />
        </div>
      </section>

      {/* Switch Profile / Role Section */}
      <section className="panel" style={{ padding: '14px 16px', marginBottom: 14 }}>
        <header style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <RefreshCw size={15} color="#3de0ff" />
            <h3 style={{ margin: 0, fontSize: 14 }}>Switch Active Dashboard Profile</h3>
          </div>
          <small style={{ color: 'var(--muted)', fontSize: 11 }}>
            Seamlessly test and explore dashboards for any of the 11 platform roles
          </small>
        </header>

        <select
          className="sh-select"
          value={activeRole.id}
          onChange={(e) => {
            switchRole(e.target.value)
            if (onRoleSwitch) onRoleSwitch(e.target.value)
          }}
          style={{ width: '100%', background: '#081330', borderColor: 'rgba(61,224,255,0.4)', color: '#f4f7ff' }}
        >
          <optgroup label="Athlete & Academy">
            <option value="player">🏏 1. Player (including academy students)</option>
          </optgroup>
          <optgroup label="Officials & Business Ecosystem">
            <option value="fan">💛 2. Fan / Viewer (Super 11, Tickets & Arena)</option>
            <option value="franchise">🔨 3. Franchise Owner (Auctions & Bidding)</option>
            <option value="coach">⚡ 4. Coach / Trainer (Attendance & Feedback)</option>
            <option value="academy">🎓 5. Academy Owner / Mgr (Accounts & Staff)</option>
            <option value="ground">🏟️ 6. Ground / Stadium Owner (Turf Leases)</option>
            <option value="staff">📋 7. Staff Member (Matches & Payroll)</option>
            <option value="organizer">🏆 8. Tournament Organizer (Ticketing & Leagues)</option>
            <option value="seller">🛍️ 9. Seller / Brand / Manufacturer (KYC Storefront)</option>
            <option value="sponsor">📢 10. Sponsor / Advertiser (Sponsorships & Ads)</option>
            <option value="admin">🛡️ 11. Platform Admin (Approvals & Anti-Fraud)</option>
          </optgroup>
        </select>
      </section>

      {/* Log Out Option ("log out potion and etc") */}
      <section className="panel" style={{ padding: '14px 16px', borderColor: 'rgba(255,23,68,0.25)', background: 'rgba(255,23,68,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: showLogoutConfirm ? 12 : 0 }}>
          <div>
            <strong style={{ fontSize: 14, color: '#f4f7ff', display: 'block' }}>Account Session</strong>
            <small style={{ fontSize: 11, color: 'var(--muted)' }}>
              Sign out of this session on this device. Your data remains safely encrypted.
            </small>
          </div>

          {!showLogoutConfirm && (
            <button
              type="button"
              className="btn btn--danger btn--sm"
              style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 'bold' }}
              onClick={() => setShowLogoutConfirm(true)}
            >
              <LogOut size={14} /> Log Out
            </button>
          )}
        </div>

        {showLogoutConfirm && (
          <div className="sh-logout-confirm-box">
            <p style={{ margin: '0 0 10px', fontSize: 12, color: '#ff5252' }}>
              Are you sure you want to log out of <strong>{user?.nickname || 'your account'}</strong>?
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                type="button"
                className="btn btn--danger"
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                onClick={handleLogout}
              >
                <LogOut size={14} /> Yes, Log Out Now
              </button>
              <button
                type="button"
                className="btn btn--secondary"
                style={{ flex: 1 }}
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
