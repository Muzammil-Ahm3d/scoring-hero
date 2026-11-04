import { useState, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  Users,
  Calendar,
  PlaySquare,
  DollarSign,
  Search,
  Filter,
  Plus,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  Phone,
  FileText,
  Printer,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Award,
  Activity,
  Flame,
  Check,
  ExternalLink,
  Eye,
  Video,
  Target,
  Dumbbell,
  Zap,
  Share2,
  CreditCard,
  TrendingUp,
  Compass,
} from 'lucide-react'
import Screen from '../components/Screen'
import { useAuth } from '../context/AuthContext'
import './CoachPortal.css'

// =========================================================================
// INITIAL MOCK DATA: INDEPENDENT COACH & TRAINER (VENKATESH PRASAD)
// =========================================================================

const INITIAL_TRAINEES = [
  {
    id: 'TRN-101',
    name: 'Rohit Sharma',
    age: 19,
    role: 'All-Rounder',
    batch: 'Morning Pro',
    phone: '+91 98401 11223',
    guardian: 'R. K. Sharma (Father)',
    bloodGroup: 'B+',
    monthlyFee: 4000,
    feeStatus: 'Paid',
    attendanceScore: '96%',
    radar: {
      technique: 88,
      power: 82,
      reflexes: 94,
      endurance: 85,
      tactics: 90,
    },
    metrics: {
      battingIndex: 88,
      paceClocked: '126 km/h',
      yoYoScore: '18.2',
      reflexRating: '94%',
    },
    latestNote: 'Front-foot drive head position upright; back-foot punch improving. Needs work on short ball leave.',
    evaluations: [
      {
        date: '02 Nov 2026',
        assessedBy: 'Coach Venkatesh Prasad',
        focus: 'High Elbow & Seam Presentation',
        score: '88/100',
        remarks: 'Front foot stride extended nicely into line of ball. Good transfer of body weight.',
      },
      {
        date: '18 Oct 2026',
        assessedBy: 'Coach Venkatesh Prasad',
        focus: 'Outswing Seam Upright',
        score: '84/100',
        remarks: 'Wrist position locked at release. Pace clocked 125 km/h with 1.8° deviation off deck.',
      },
    ],
    assignedDrills: ['Front-Foot Cover Drive Weight Transfer', 'Fast Bowler Gather & Upright Wrist Release'],
  },
  {
    id: 'TRN-102',
    name: 'Kavya Raman',
    age: 17,
    role: 'Fast Bowler',
    batch: 'Evening Elite',
    phone: '+91 98202 33445',
    guardian: 'Suresh Raman (Father)',
    bloodGroup: 'O+',
    monthlyFee: 4500,
    feeStatus: 'Paid',
    attendanceScore: '98%',
    radar: {
      technique: 84,
      power: 88,
      reflexes: 89,
      endurance: 92,
      tactics: 80,
    },
    metrics: {
      battingIndex: 65,
      paceClocked: '124 km/h',
      yoYoScore: '19.1',
      reflexRating: '89%',
    },
    latestNote: 'Pace clocked at 124 km/h today. Excellent non-bowling arm pull down. Next: Yorker line consistency.',
    evaluations: [
      {
        date: '01 Nov 2026',
        assessedBy: 'Coach Venkatesh Prasad',
        focus: 'Yorker Length & Death Overs Simulation',
        score: '86/100',
        remarks: 'Landed 7 out of 10 balls on target cone placed on popping crease.',
      },
    ],
    assignedDrills: ['Fast Bowler Gather & Upright Wrist Release'],
  },
  {
    id: 'TRN-103',
    name: 'Aditya Sen',
    age: 18,
    role: 'Wicketkeeper Batsman',
    batch: 'Morning Pro',
    phone: '+91 98303 55667',
    guardian: 'Dr. Ananya Sen (Mother)',
    bloodGroup: 'A+',
    monthlyFee: 4000,
    feeStatus: 'Overdue',
    attendanceScore: '92%',
    radar: {
      technique: 91,
      power: 75,
      reflexes: 97,
      endurance: 88,
      tactics: 92,
    },
    metrics: {
      battingIndex: 91,
      paceClocked: 'N/A',
      yoYoScore: '17.8',
      reflexRating: '97%',
    },
    latestNote: 'Standing up to spinners is world-class. Soft hands gathering outside off stump.',
    evaluations: [
      {
        date: '28 Oct 2026',
        assessedBy: 'Coach Venkatesh Prasad',
        focus: 'Leg Side Stumping Speed',
        score: '93/100',
        remarks: 'Reaction time 0.28 seconds from bails dislodged to return.',
      },
    ],
    assignedDrills: ['Wicketkeeper Low Snatch & Blind Rebound'],
  },
  {
    id: 'TRN-104',
    name: 'Manish Verma',
    age: 20,
    role: 'Middle Order Bat',
    batch: 'Weekend Masterclass',
    phone: '+91 98101 77889',
    guardian: 'Sunil Verma (Father)',
    bloodGroup: 'B-',
    monthlyFee: 3500,
    feeStatus: 'Overdue',
    attendanceScore: '88%',
    radar: {
      technique: 79,
      power: 85,
      reflexes: 82,
      endurance: 78,
      tactics: 84,
    },
    metrics: {
      battingIndex: 79,
      paceClocked: 'N/A',
      yoYoScore: '16.5',
      reflexRating: '82%',
    },
    latestNote: 'Running between wickets drill completed. Work on rotation of strike against left-arm orthodox.',
    evaluations: [
      {
        date: '25 Oct 2026',
        assessedBy: 'Coach Venkatesh Prasad',
        focus: 'Sweep & Reverse Sweep Execution',
        score: '80/100',
        remarks: 'Good contact point ahead of front pad. Keep head down on follow-through.',
      },
    ],
    assignedDrills: ['Front-Foot Cover Drive Weight Transfer'],
  },
  {
    id: 'TRN-105',
    name: 'Aryan Deshmukh',
    age: 16,
    role: 'Left-Arm Spinner',
    batch: '1-on-1 Private',
    phone: '+91 97690 44556',
    guardian: 'Vikram Deshmukh (Father)',
    bloodGroup: 'O+',
    monthlyFee: 6000,
    feeStatus: 'Paid',
    attendanceScore: '100%',
    radar: {
      technique: 86,
      power: 70,
      reflexes: 88,
      endurance: 82,
      tactics: 94,
    },
    metrics: {
      battingIndex: 68,
      paceClocked: '88 km/h',
      yoYoScore: '18.0',
      reflexRating: '88%',
    },
    latestNote: 'Drift into right hander is sharp. Revolutions averaging 2200 RPM off the index seam.',
    evaluations: [
      {
        date: '30 Oct 2026',
        assessedBy: 'Coach Venkatesh Prasad',
        focus: 'Arm Ball Variation & Under-Cut',
        score: '89/100',
        remarks: 'Deceptive skid off good length. Release angle identical to standard stock ball.',
      },
    ],
    assignedDrills: ['Off-Spin Revolutions & Flighted Dip'],
  },
  {
    id: 'TRN-106',
    name: 'Pranav Nair',
    age: 17,
    role: 'Fast Bowler',
    batch: 'Evening Elite',
    phone: '+91 98410 88990',
    guardian: 'Gopal Nair (Father)',
    bloodGroup: 'A-',
    monthlyFee: 4500,
    feeStatus: 'Paid',
    attendanceScore: '94%',
    radar: {
      technique: 82,
      power: 90,
      reflexes: 86,
      endurance: 89,
      tactics: 81,
    },
    metrics: {
      battingIndex: 60,
      paceClocked: '128 km/h',
      yoYoScore: '18.6',
      reflexRating: '86%',
    },
    latestNote: 'Fastest bowler in the U-19 squad. Needs to manage run-up rhythm in 4th and 5th overs.',
    evaluations: [
      {
        date: '29 Oct 2026',
        assessedBy: 'Coach Venkatesh Prasad',
        focus: 'Back-foot Landing Stability',
        score: '83/100',
        remarks: 'Braced front leg on impact increased release speed by 2.4 km/h.',
      },
    ],
    assignedDrills: ['Fast Bowler Gather & Upright Wrist Release'],
  },
]

const INITIAL_SESSIONS = [
  {
    id: 'SES-201',
    date: 'Today (04 Nov)',
    time: '06:00 - 07:15 AM',
    type: '1-on-1 Private Net',
    traineeName: 'Rohit Sharma',
    venue: 'Turf Net 1 - Red Soil',
    focusTopic: 'Inswing Seam Alignment & High Elbow Drive',
    fee: 1200,
    paid: true,
    status: 'Completed',
  },
  {
    id: 'SES-202',
    date: 'Today (04 Nov)',
    time: '07:30 - 08:45 AM',
    type: '1-on-1 Private Net',
    traineeName: 'Aryan Deshmukh',
    venue: 'Spin Box Net 3',
    focusTopic: 'Drift into Right-Hander & Arm Ball Skid',
    fee: 1500,
    paid: true,
    status: 'Upcoming',
  },
  {
    id: 'SES-203',
    date: 'Today (04 Nov)',
    time: '04:30 - 05:45 PM',
    type: 'Fast Bowling Clinic',
    traineeName: 'Kavya Raman',
    venue: 'Bowling Machine Bay 2',
    focusTopic: 'Yorker Accuracy & 125 km/h Bouncer Variation',
    fee: 1400,
    paid: false,
    status: 'Upcoming',
  },
  {
    id: 'SES-204',
    date: 'Today (04 Nov)',
    time: '06:00 - 07:15 PM',
    type: '1-on-1 Private Net',
    traineeName: 'Aditya Sen',
    venue: 'Main Turf Net',
    focusTopic: 'Standing Up to Stumps Keeping Drills',
    fee: 1200,
    paid: true,
    status: 'Upcoming',
  },
  {
    id: 'SES-205',
    date: 'Tomorrow (05 Nov)',
    time: '06:30 - 08:00 AM',
    type: 'Masterclass Group',
    traineeName: 'Morning Pro Batch (Group Clinic)',
    venue: 'Turf Ground 1',
    focusTopic: 'High-Intensity Fielding & Ground Relays',
    fee: 2500,
    paid: true,
    status: 'Upcoming',
  },
  {
    id: 'SES-206',
    date: 'Tomorrow (05 Nov)',
    time: '04:30 - 06:00 PM',
    type: '1-on-1 Private Net',
    traineeName: 'Manish Verma',
    venue: 'Astro Net 2',
    focusTopic: 'Backfoot Punch Against Short Pitch Bowling',
    fee: 1200,
    paid: false,
    status: 'Upcoming',
  },
]

const INITIAL_DRILLS = [
  {
    id: 'DRL-301',
    title: 'Front-Foot Cover Drive Weight Transfer',
    category: 'Batting',
    fps: 'HD 60FPS Slow-Mo',
    duration: '04:15 min',
    videoThumb: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
    assignedCount: 14,
    checkpoints: [
      'Head positioned directly over front knee at moment of ball contact',
      'Full bat face presentation accelerating through target cover area',
      'High lead elbow guide without premature wrist twist',
    ],
    commonFault: 'Dropping head towards off-side causing body weight to fall outside off-stump.',
    recommendedReps: '4 Sets × 15 Drives (60 balls daily against throwdowns)',
    coachNote: 'Key drill for stroke players facing 130+ km/h swinging deliveries.',
  },
  {
    id: 'DRL-302',
    title: 'Fast Bowler Gather & Upright Wrist Release',
    category: 'Fast Bowling',
    fps: '240FPS Ultra Slow-Mo',
    duration: '06:30 min',
    videoThumb: 'https://images.unsplash.com/photo-1531415074868-036b107e775a?auto=format&fit=crop&w=800&q=80',
    assignedCount: 12,
    checkpoints: [
      'Explosive back-foot landing aligned straight down pitch',
      'Vertical index and middle fingers behind seam at release',
      'Full non-bowling arm pull down through ribcage to maximize hip torque',
    ],
    commonFault: 'Collapsing front knee on delivery stride causing energy leak and short pitch delivery.',
    recommendedReps: '5 Spells × 6 Deliveries (Target marker at good length)',
    coachNote: 'Helps bowlers cross 125 km/h mark with consistent outswing deviation.',
  },
  {
    id: 'DRL-303',
    title: 'Off-Spin Revolutions & Flighted Dip',
    category: 'Spin',
    fps: '120FPS Slow-Mo',
    duration: '05:00 min',
    videoThumb: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
    assignedCount: 8,
    checkpoints: [
      'Index finger cocked over top seam for maximum torque at 2200 RPM',
      'Body weight pushed upward through delivery arc for natural trajectory dip',
      'Right shoulder pointing straight at batsman at follow-through finish',
    ],
    commonFault: 'Pushing ball with palm instead of ripping off the index finger knuckle.',
    recommendedReps: '6 Overs Continuous Loop (Aiming for 3-foot chalk square)',
    coachNote: 'Essential drill to deceive aggressive batsmen dancing down track.',
  },
  {
    id: 'DRL-304',
    title: 'Wicketkeeper Low Snatch & Blind Rebound',
    category: 'Fielding',
    fps: 'HD 60FPS Slow-Mo',
    duration: '03:45 min',
    videoThumb: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    assignedCount: 6,
    checkpoints: [
      'Soft cupped hands rising smoothly with pitch bounce',
      'Body weight balanced on balls of feet, head dead still',
      'Clean snatch without double clutching or snatching upward early',
    ],
    commonFault: 'Rising too early before ball reaches glove pocket on bouncy turf pitches.',
    recommendedReps: '50 Catches off deflection ramp (25 right / 25 left)',
    coachNote: 'Directly builds muscle memory for edge catches standing up to pacers and spinners.',
  },
]

export default function CoachPortal() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()

  // Primary Tab Management (Synced with URL ?tab=...)
  const activeTab = searchParams.get('tab') || 'trainees'
  function handleTabChange(tabKey) {
    setSearchParams({ tab: tabKey })
  }

  // Master Data States
  const [trainees, setTrainees] = useState(INITIAL_TRAINEES)
  const [sessions, setSessions] = useState(INITIAL_SESSIONS)
  const [drills, setDrills] = useState(INITIAL_DRILLS)

  // Dedicated Sub-Pages State (Strictly NO Modals / Popups!)
  const [viewingTrainee, setViewingTrainee] = useState(null)
  const [showEnrollTraineePage, setShowEnrollTraineePage] = useState(false)
  const [evaluatingTrainee, setEvaluatingTrainee] = useState(null)
  const [showScheduleSessionPage, setShowScheduleSessionPage] = useState(false)
  const [viewingDrill, setViewingDrill] = useState(null)
  const [showCreateDrillPage, setShowCreateDrillPage] = useState(false)
  const [recordingPaymentTrainee, setRecordingPaymentTrainee] = useState(null)
  const [viewingReceipt, setViewingReceipt] = useState(null)

  // Feedback banner state
  const [bannerNotice, setBannerNotice] = useState(null)
  function showToast(msg) {
    setBannerNotice(msg)
    setTimeout(() => setBannerNotice(null), 3500)
  }

  // -------------------------------------------------------------
  // TAB 1 FILTERS (TRAINEES)
  // -------------------------------------------------------------
  const [traineeSearch, setTraineeSearch] = useState('')
  const [selectedBatchFilter, setSelectedBatchFilter] = useState('All')
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('All')

  const filteredTrainees = useMemo(() => {
    return trainees.filter((t) => {
      const matchSearch =
        t.name.toLowerCase().includes(traineeSearch.toLowerCase()) ||
        t.role.toLowerCase().includes(traineeSearch.toLowerCase()) ||
        t.batch.toLowerCase().includes(traineeSearch.toLowerCase()) ||
        t.latestNote.toLowerCase().includes(traineeSearch.toLowerCase())

      const matchBatch =
        selectedBatchFilter === 'All' || t.batch.toLowerCase().includes(selectedBatchFilter.toLowerCase())
      const matchRole =
        selectedRoleFilter === 'All' || t.role.toLowerCase().includes(selectedRoleFilter.toLowerCase())

      return matchSearch && matchBatch && matchRole
    })
  }, [trainees, traineeSearch, selectedBatchFilter, selectedRoleFilter])

  // -------------------------------------------------------------
  // TAB 2 FILTERS (SESSIONS)
  // -------------------------------------------------------------
  const [sessionDateFilter, setSessionDateFilter] = useState('All')
  const [sessionTypeFilter, setSessionTypeFilter] = useState('All')

  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      const matchDate =
        sessionDateFilter === 'All' ||
        (sessionDateFilter === 'Today' && s.date.includes('Today')) ||
        (sessionDateFilter === 'Tomorrow' && s.date.includes('Tomorrow'))

      const matchType =
        sessionTypeFilter === 'All' || s.type.toLowerCase().includes(sessionTypeFilter.toLowerCase())

      return matchDate && matchType
    })
  }, [sessions, sessionDateFilter, sessionTypeFilter])

  // -------------------------------------------------------------
  // TAB 3 FILTERS (DRILLS)
  // -------------------------------------------------------------
  const [drillCategoryFilter, setDrillCategoryFilter] = useState('All')

  const filteredDrills = useMemo(() => {
    return drills.filter((d) => {
      return drillCategoryFilter === 'All' || d.category === drillCategoryFilter
    })
  }, [drills, drillCategoryFilter])

  // -------------------------------------------------------------
  // TAB 4 LEDGER STATS (EARNINGS)
  // -------------------------------------------------------------
  const earningsStats = useMemo(() => {
    const totalBilled = 148000
    const collected = 118500
    const overdue = 29500
    const turfRentalCost = 24000
    const netProfit = collected - turfRentalCost
    return { totalBilled, collected, overdue, turfRentalCost, netProfit }
  }, [])

  // =========================================================================
  // HANDLERS FOR ACTIONS
  // =========================================================================

  function handleEnrollTraineeSubmit(e) {
    e.preventDefault()
    const form = e.target
    const newTrainee = {
      id: `TRN-${Date.now().toString().slice(-3)}`,
      name: form.name.value,
      age: parseInt(form.age.value) || 18,
      role: form.role.value,
      batch: form.batch.value,
      phone: form.phone.value || '+91 99000 00000',
      guardian: form.guardian.value || 'Guardian',
      bloodGroup: form.bloodGroup.value || 'B+',
      monthlyFee: parseInt(form.monthlyFee.value) || 4000,
      feeStatus: 'Paid',
      attendanceScore: '100%',
      radar: {
        technique: parseInt(form.technique.value) || 80,
        power: parseInt(form.power.value) || 75,
        reflexes: parseInt(form.reflexes.value) || 80,
        endurance: parseInt(form.endurance.value) || 80,
        tactics: parseInt(form.tactics.value) || 75,
      },
      metrics: {
        battingIndex: parseInt(form.technique.value) || 80,
        paceClocked: form.paceClocked.value || '118 km/h',
        yoYoScore: form.yoYoScore.value || '17.5',
        reflexRating: `${form.reflexes.value || 80}%`,
      },
      latestNote: form.latestNote.value || 'Enrolled with baseline biomechanics recorded.',
      evaluations: [
        {
          date: '04 Nov 2026',
          assessedBy: 'Coach Venkatesh Prasad',
          focus: 'Baseline Biomechanics Intake Evaluation',
          score: '80/100',
          remarks: 'Good natural posture. Enrolled into high-performance training program.',
        },
      ],
      assignedDrills: ['Front-Foot Cover Drive Weight Transfer'],
    }
    setTrainees([newTrainee, ...trainees])
    setShowEnrollTraineePage(false)
    showToast(`✓ Athlete ${newTrainee.name} enrolled successfully with baseline metrics!`)
  }

  function handleAddEvaluationSubmit(e) {
    e.preventDefault()
    const form = e.target
    const updatedEval = {
      date: '04 Nov 2026',
      assessedBy: 'Coach Venkatesh Prasad',
      focus: form.focus.value,
      score: `${form.score.value}/100`,
      remarks: form.remarks.value,
    }
    setTrainees((prev) =>
      prev.map((t) => {
        if (t.id === evaluatingTrainee.id) {
          return {
            ...t,
            latestNote: form.remarks.value,
            evaluations: [updatedEval, ...(t.evaluations || [])],
            radar: {
              ...t.radar,
              technique: Math.min(99, t.radar.technique + 2),
            },
          }
        }
        return t
      })
    )
    setEvaluatingTrainee(null)
    showToast(`✓ Biomechanical evaluation recorded for ${evaluatingTrainee.name}!`)
  }

  function handleScheduleSessionSubmit(e) {
    e.preventDefault()
    const form = e.target
    const newSession = {
      id: `SES-${Date.now().toString().slice(-3)}`,
      date: form.date.value,
      time: form.time.value,
      type: form.type.value,
      traineeName: form.traineeName.value,
      venue: form.venue.value,
      focusTopic: form.focusTopic.value,
      fee: parseInt(form.fee.value) || 1200,
      paid: form.paid.value === 'yes',
      status: 'Upcoming',
    }
    setSessions([newSession, ...sessions])
    setShowScheduleSessionPage(false)
    showToast(`✓ Session scheduled at ${newSession.venue} for ${newSession.traineeName}!`)
  }

  function handleToggleSessionStatus(sessionId) {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === sessionId) {
          const nextStatus = s.status === 'Completed' ? 'Upcoming' : 'Completed'
          return { ...s, status: nextStatus }
        }
        return s
      })
    )
    showToast(`✓ Session status updated!`)
  }

  function handleCreateDrillSubmit(e) {
    e.preventDefault()
    const form = e.target
    const newDrill = {
      id: `DRL-${Date.now().toString().slice(-3)}`,
      title: form.title.value,
      category: form.category.value,
      fps: form.fps.value,
      duration: form.duration.value || '04:00 min',
      videoThumb:
        form.videoThumb.value ||
        'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
      assignedCount: 0,
      checkpoints: [
        form.checkpoint1.value || 'Maintain high elbow and still head',
        form.checkpoint2.value || 'Weight centered on contact',
        form.checkpoint3.value || 'Clean wrist snap follow-through',
      ],
      commonFault: form.commonFault.value || 'Over-rotating torso too early in delivery.',
      recommendedReps: form.recommendedReps.value || '4 sets × 15 reps',
      coachNote: form.coachNote.value || 'Mastery drill for high-performance training.',
    }
    setDrills([newDrill, ...drills])
    setShowCreateDrillPage(false)
    showToast(`✓ New technical drill "${newDrill.title}" published to library!`)
  }

  function handleRecordPaymentSubmit(e) {
    e.preventDefault()
    const form = e.target
    const amountPaid = parseInt(form.amount.value) || recordingPaymentTrainee.monthlyFee
    const method = form.method.value

    setTrainees((prev) =>
      prev.map((t) => (t.id === recordingPaymentTrainee.id ? { ...t, feeStatus: 'Paid' } : t))
    )

    const receiptObj = {
      receiptNo: `RCT-${Math.floor(100000 + Math.random() * 900000)}`,
      date: '04 Nov 2026',
      traineeName: recordingPaymentTrainee.name,
      traineeId: recordingPaymentTrainee.id,
      role: recordingPaymentTrainee.role,
      batch: recordingPaymentTrainee.batch,
      guardian: recordingPaymentTrainee.guardian,
      amount: amountPaid,
      method: method,
      coach: 'Coach Venkatesh Prasad (BCCI Level 2)',
      center: 'National Cricket High-Performance Training Center, Chennai',
      period: 'November 2026 Coaching Tuition',
      notes: form.notes.value || 'Fee payment confirmed. Biomechanical evaluation and net access cleared.',
    }

    setRecordingPaymentTrainee(null)
    setViewingReceipt(receiptObj)
    showToast(`✓ Payment of ₹${amountPaid.toLocaleString('en-IN')} recorded! Official Receipt generated.`)
  }

  // =========================================================================
  // DEDICATED SUB-PAGE 1: TRAINEE BIOMECHANICAL RADAR & PROFILE
  // =========================================================================
  if (viewingTrainee) {
    return (
      <Screen title={`Athlete Profile · ${viewingTrainee.name}`} back={false} padded={false}>
        <div className="coach-portal-container">
          {/* Sub-page Top Navigation */}
          <div className="coach-top-bar">
            <button
              type="button"
              className="btn btn--secondary btn--sm"
              onClick={() => setViewingTrainee(null)}
            >
              ← Back
            </button>
            <div className="coach-badge-group">
              <span className="pill" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676' }}>
                {viewingTrainee.batch}
              </span>
              <span className="pill" style={{ background: 'rgba(56,189,248,0.15)', color: '#38bdf8' }}>
                ID: {viewingTrainee.id}
              </span>
            </div>
          </div>

          {/* Athlete Bio Card */}
          <div className="coach-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ margin: '0 0 4px', fontSize: 20, color: '#f8fafc' }}>
                  {viewingTrainee.name}
                </h2>
                <p style={{ margin: 0, fontSize: 13, color: '#94a3b8' }}>
                  Age {viewingTrainee.age} • {viewingTrainee.role} • Blood Group: {viewingTrainee.bloodGroup}
                </p>
                <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--muted)' }}>
                  Guardian: {viewingTrainee.guardian} • Attendance Score: <strong>{viewingTrainee.attendanceScore}</strong>
                </p>
              </div>
              <a
                href={`tel:${viewingTrainee.phone}`}
                className="btn btn--secondary btn--sm"
                style={{ display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}
              >
                <Phone size={14} color="#00e676" /> Call Athlete
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="coach-metrics-bar" style={{ marginTop: 8 }}>
              <div className="coach-metric-item">
                <span>Batting Index</span>
                <strong style={{ color: '#00e676' }}>{viewingTrainee.metrics.battingIndex}/100</strong>
              </div>
              <div className="coach-metric-item">
                <span>Clocked Pace</span>
                <strong style={{ color: '#38bdf8' }}>{viewingTrainee.metrics.paceClocked}</strong>
              </div>
              <div className="coach-metric-item">
                <span>Yo-Yo Fitness</span>
                <strong style={{ color: '#ffc83d' }}>{viewingTrainee.metrics.yoYoScore}</strong>
              </div>
              <div className="coach-metric-item">
                <span>Reflex Efficiency</span>
                <strong style={{ color: '#a78bfa' }}>{viewingTrainee.metrics.reflexRating}</strong>
              </div>
            </div>
          </div>

          {/* Biomechanical Radar Breakdown */}
          <div className="coach-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="coach-card-title">
                <Target size={15} color="#00e676" /> Biomechanical Radar Breakdown
              </h3>
              <button
                type="button"
                className="btn btn--primary btn--sm"
                onClick={() => {
                  setEvaluatingTrainee(viewingTrainee)
                  setViewingTrainee(null)
                }}
              >
                + Add Evaluation
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
              {[
                { label: 'Technical Execution & Bat-Swing Path', val: viewingTrainee.radar.technique, color: '#00e676' },
                { label: 'Kinetic Power & Bat-Speed / Bowling Whip', val: viewingTrainee.radar.power, color: '#38bdf8' },
                { label: 'Catching Reflexes & Crease Agility', val: viewingTrainee.radar.reflexes, color: '#a78bfa' },
                { label: 'Cardiovascular Endurance & Recovery (Yo-Yo)', val: viewingTrainee.radar.endurance, color: '#ffc83d' },
                { label: 'Match Awareness & Tactical Field Placements', val: viewingTrainee.radar.tactics, color: '#ec4899' },
              ].map((m) => (
                <div key={m.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                    <span style={{ color: '#cbd5e1' }}>{m.label}</span>
                    <strong style={{ color: m.color }}>{m.val} / 100</strong>
                  </div>
                  <div style={{ width: '100%', height: 7, background: 'rgba(255,255,255,0.06)', borderRadius: 10, overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${m.val}%`,
                        height: '100%',
                        background: m.color,
                        borderRadius: 10,
                        transition: 'width 0.4s ease',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assigned Drills List */}
          <div className="coach-card">
            <h3 className="coach-card-title">
              <PlaySquare size={15} color="#38bdf8" /> Assigned Video Technical Drills
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {viewingTrainee.assignedDrills.map((dName, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <span style={{ fontSize: 13, color: '#f8fafc' }}>🏏 {dName}</span>
                  <span className="pill" style={{ background: 'rgba(0,230,118,0.1)', color: '#00e676', fontSize: 10 }}>
                    Active Drill
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Chronological Evaluation History Log */}
          <div className="coach-card">
            <h3 className="coach-card-title">
              <Activity size={15} color="#ffc83d" /> Coach Assessment History & Progress Log
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {viewingTrainee.evaluations.map((ev, i) => (
                <div
                  key={i}
                  style={{
                    padding: 10,
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <strong style={{ fontSize: 13, color: '#00e676' }}>{ev.focus}</strong>
                    <span style={{ fontSize: 11, color: 'var(--muted)' }}>{ev.date}</span>
                  </div>
                  <p style={{ margin: '0 0 4px', fontSize: 12, color: '#94a3b8' }}>
                    "{ev.remarks}"
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted)' }}>
                    <span>Evaluator: {ev.assessedBy}</span>
                    <strong style={{ color: '#38bdf8' }}>Score: {ev.score}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // DEDICATED SUB-PAGE 2: ENROLL NEW TRAINEE
  // =========================================================================
  if (showEnrollTraineePage) {
    return (
      <Screen title="Enroll Athlete · Biomechanical Baseline" back={false} padded={false}>
        <div className="coach-portal-container">
          <div className="coach-top-bar">
            <button
              type="button"
              className="btn btn--secondary btn--sm"
              onClick={() => setShowEnrollTraineePage(false)}
            >
              ← Back
            </button>
            <span className="pill" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676' }}>
              New Registration
            </span>
          </div>

          <form onSubmit={handleEnrollTraineeSubmit} className="coach-card">
            <h3 className="coach-card-title">
              <Users size={15} color="#00e676" /> Athlete Personal & Contact Details
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10 }}>
              <div>
                <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  Full Name of Athlete *
                </label>
                <input
                  name="name"
                  required
                  placeholder="e.g. Yashasvi Jaiswal"
                  className="sh-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  Age *
                </label>
                <input
                  name="age"
                  type="number"
                  required
                  defaultValue={18}
                  className="sh-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  Primary Cricket Role *
                </label>
                <select name="role" className="sh-select" style={{ width: '100%' }}>
                  <option value="Top Order Batsman">Top Order Batsman</option>
                  <option value="Middle Order Batsman">Middle Order Batsman</option>
                  <option value="Fast Bowler">Fast Bowler</option>
                  <option value="Left-Arm Spinner">Left-Arm Spinner</option>
                  <option value="Off-Spinner">Off-Spinner</option>
                  <option value="Leg-Spinner">Leg-Spinner</option>
                  <option value="Wicketkeeper Batsman">Wicketkeeper Batsman</option>
                  <option value="All-Rounder">All-Rounder</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  Training Batch Allocation *
                </label>
                <select name="batch" className="sh-select" style={{ width: '100%' }}>
                  <option value="Morning Pro">Morning Pro (06:00 - 08:00 AM)</option>
                  <option value="Evening Elite">Evening Elite (04:30 - 06:30 PM)</option>
                  <option value="Weekend Masterclass">Weekend Masterclass (Sat-Sun)</option>
                  <option value="1-on-1 Private">1-on-1 Private High-Performance Net</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  Phone / WhatsApp Number *
                </label>
                <input
                  name="phone"
                  required
                  placeholder="+91 98765 43210"
                  className="sh-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  Parent / Guardian Name
                </label>
                <input
                  name="guardian"
                  placeholder="e.g. Ramesh Jaiswal (Father)"
                  className="sh-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  Blood Group
                </label>
                <select name="bloodGroup" className="sh-select" style={{ width: '100%' }}>
                  <option value="B+">B Positive (B+)</option>
                  <option value="O+">O Positive (O+)</option>
                  <option value="A+">A Positive (A+)</option>
                  <option value="AB+">AB Positive (AB+)</option>
                  <option value="O-">O Negative (O-)</option>
                  <option value="B-">B Negative (B-)</option>
                  <option value="A-">A Negative (A-)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  Monthly Training Fee (₹) *
                </label>
                <input
                  name="monthlyFee"
                  type="number"
                  required
                  defaultValue={4500}
                  className="sh-input"
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <h3 className="coach-card-title" style={{ marginTop: 12 }}>
              <Target size={15} color="#38bdf8" /> Baseline Biomechanical Ratings (1 - 100)
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 8 }}>
              <div>
                <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 3 }}>
                  Technique (1-100)
                </label>
                <input name="technique" type="number" defaultValue={82} min={1} max={100} className="sh-input" />
              </div>
              <div>
                <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 3 }}>
                  Kinetic Power (1-100)
                </label>
                <input name="power" type="number" defaultValue={78} min={1} max={100} className="sh-input" />
              </div>
              <div>
                <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 3 }}>
                  Reflex Speed (1-100)
                </label>
                <input name="reflexes" type="number" defaultValue={85} min={1} max={100} className="sh-input" />
              </div>
              <div>
                <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 3 }}>
                  Endurance (1-100)
                </label>
                <input name="endurance" type="number" defaultValue={80} min={1} max={100} className="sh-input" />
              </div>
              <div>
                <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 3 }}>
                  Tactical IQ (1-100)
                </label>
                <input name="tactics" type="number" defaultValue={75} min={1} max={100} className="sh-input" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8, marginTop: 8 }}>
              <div>
                <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 3 }}>
                  Clocked Pace / Speed
                </label>
                <input name="paceClocked" defaultValue="122 km/h" className="sh-input" />
              </div>
              <div>
                <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 3 }}>
                  Yo-Yo Fitness Score
                </label>
                <input name="yoYoScore" defaultValue="18.0" className="sh-input" />
              </div>
            </div>

            <div style={{ marginTop: 8 }}>
              <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 3 }}>
                Intake Notes & Focus Plan
              </label>
              <textarea
                name="latestNote"
                rows={2}
                placeholder="Key coach observations on entry, target goals for next Ranji/State trials..."
                defaultValue="Baseline recorded. Focus on clean bat presentation and front knee bracing."
                className="sh-input"
                style={{ width: '100%', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button
                type="button"
                className="btn btn--secondary"
                style={{ flex: 1 }}
                onClick={() => setShowEnrollTraineePage(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn--primary"
                style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              >
                <Check size={16} /> Complete Trainee Intake
              </button>
            </div>
          </form>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // DEDICATED SUB-PAGE 3: ADD BIOMECHANICAL EVALUATION
  // =========================================================================
  if (evaluatingTrainee) {
    return (
      <Screen title={`Add Evaluation · ${evaluatingTrainee.name}`} back={false} padded={false}>
        <div className="coach-portal-container">
          <div className="coach-top-bar">
            <button
              type="button"
              className="btn btn--secondary btn--sm"
              onClick={() => setEvaluatingTrainee(null)}
            >
              ← Back
            </button>
            <span className="pill" style={{ background: 'rgba(56,189,248,0.15)', color: '#38bdf8' }}>
              Biomechanical Evaluation
            </span>
          </div>

          <form onSubmit={handleAddEvaluationSubmit} className="coach-card">
            <div style={{ padding: 10, background: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>
              <h3 style={{ margin: 0, fontSize: 16, color: '#f8fafc' }}>{evaluatingTrainee.name}</h3>
              <p style={{ margin: '3px 0 0', fontSize: 12, color: 'var(--muted)' }}>
                {evaluatingTrainee.role} • Batch: {evaluatingTrainee.batch}
              </p>
            </div>

            <div>
              <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                Target Biomechanical Focus Area *
              </label>
              <input
                name="focus"
                required
                defaultValue="Bat-Swing Arc & Impact Under Eye Line"
                className="sh-input"
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
              <div>
                <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  Session Performance Rating (1 - 100) *
                </label>
                <input
                  name="score"
                  type="number"
                  required
                  defaultValue={88}
                  min={1}
                  max={100}
                  className="sh-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  Evaluator Coach
                </label>
                <input
                  readOnly
                  value="Coach Venkatesh Prasad (BCCI Level 2)"
                  className="sh-input"
                  style={{ width: '100%', opacity: 0.8 }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                Technical Coach Feedback & Video Analysis Remarks *
              </label>
              <textarea
                name="remarks"
                required
                rows={4}
                placeholder="Provide actionable feedback on hand speed, head stability, foot alignment, wrist lock at point of impact..."
                defaultValue="Excellent front elbow extension during the off-drive. Back foot stayed grounded providing steady anchor. Recommended 4 sets of 15 throwdowns with red ball."
                className="sh-input"
                style={{ width: '100%', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <button
                type="button"
                className="btn btn--secondary"
                style={{ flex: 1 }}
                onClick={() => setEvaluatingTrainee(null)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn--primary"
                style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              >
                <Check size={16} /> Save Evaluation to Athlete Log
              </button>
            </div>
          </form>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // DEDICATED SUB-PAGE 4: SCHEDULE 1-ON-1 SESSION / MASTERCLASS
  // =========================================================================
  if (showScheduleSessionPage) {
    return (
      <Screen title="Schedule 1-on-1 Practice Session" back={false} padded={false}>
        <div className="coach-portal-container">
          <div className="coach-top-bar">
            <button
              type="button"
              className="btn btn--secondary btn--sm"
              onClick={() => setShowScheduleSessionPage(false)}
            >
              ← Back
            </button>
            <span className="pill" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676' }}>
              Turf Net Booking
            </span>
          </div>

          <form onSubmit={handleScheduleSessionSubmit} className="coach-card">
            <h3 className="coach-card-title">
              <Calendar size={15} color="#00e676" /> Session Time & Athlete Information
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10 }}>
              <div>
                <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  Select Athlete / Group *
                </label>
                <select name="traineeName" className="sh-select" style={{ width: '100%' }}>
                  {trainees.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name} ({t.role} - {t.batch})
                    </option>
                  ))}
                  <option value="State U19 Squad Clinic">State U19 Squad Clinic (Group)</option>
                  <option value="Fast Bowler Speed Camp">Fast Bowler Speed Camp</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  Session Type *
                </label>
                <select name="type" className="sh-select" style={{ width: '100%' }}>
                  <option value="1-on-1 Private Net">1-on-1 Private Net (Exclusive Focus)</option>
                  <option value="Fast Bowling Clinic">Fast Bowling Clinic (Biomechanics & Speed)</option>
                  <option value="Batting Masterclass">Batting Masterclass (Shot Selection)</option>
                  <option value="Spin Craft Lab">Spin Craft Lab (Drift & Turn)</option>
                  <option value="Masterclass Group">Masterclass Group (Fielding & Agility)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  Scheduled Date *
                </label>
                <select name="date" className="sh-select" style={{ width: '100%' }}>
                  <option value="Today (04 Nov)">Today (04 Nov 2026)</option>
                  <option value="Tomorrow (05 Nov)">Tomorrow (05 Nov 2026)</option>
                  <option value="Fri (06 Nov)">Friday (06 Nov 2026)</option>
                  <option value="Sat (07 Nov)">Saturday (07 Nov 2026)</option>
                  <option value="Sun (08 Nov)">Sunday (08 Nov 2026)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  Time Slot Window *
                </label>
                <select name="time" className="sh-select" style={{ width: '100%' }}>
                  <option value="06:00 - 07:15 AM">06:00 - 07:15 AM (Morning Net 1)</option>
                  <option value="07:30 - 08:45 AM">07:30 - 08:45 AM (Morning Net 2)</option>
                  <option value="03:00 - 04:15 PM">03:00 - 04:15 PM (Afternoon Specialty)</option>
                  <option value="04:30 - 05:45 PM">04:30 - 05:45 PM (Prime Evening Net)</option>
                  <option value="06:00 - 07:15 PM">06:00 - 07:15 PM (Floodlight Net)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  Venue / Turf Net Selection *
                </label>
                <select name="venue" className="sh-select" style={{ width: '100%' }}>
                  <option value="Turf Net 1 - Red Soil">Turf Net 1 - Red Soil (Bouncy Deck)</option>
                  <option value="Turf Net 2 - Black Soil">Turf Net 2 - Black Soil (Spin & Grip)</option>
                  <option value="Bowling Machine Bay 2">Bowling Machine Bay 2 (Pace 140 km/h)</option>
                  <option value="Astroturf Box Net">Astroturf Box Net (Reflex & Footwork)</option>
                  <option value="Center Turf Ground">Center Turf Ground (Scenario Match Practice)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  Session Coaching Fee (₹) *
                </label>
                <input
                  name="fee"
                  type="number"
                  required
                  defaultValue={1400}
                  className="sh-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  Payment Status
                </label>
                <select name="paid" className="sh-select" style={{ width: '100%' }}>
                  <option value="yes">Paid via Escrow / UPI Advance</option>
                  <option value="no">Pending (To be collected at Net)</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: 10 }}>
              <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                Target Coaching Focus Topic *
              </label>
              <input
                name="focusTopic"
                required
                defaultValue="Bouncer Leave Technique & Short Ball Pull Shot"
                className="sh-input"
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button
                type="button"
                className="btn btn--secondary"
                style={{ flex: 1 }}
                onClick={() => setShowScheduleSessionPage(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn--primary"
                style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              >
                <Check size={16} /> Confirm & Reserve Turf Slot
              </button>
            </div>
          </form>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // DEDICATED SUB-PAGE 5: WATCH SLOW-MO DRILL BREAKDOWN & CHECKPOINTS
  // =========================================================================
  if (viewingDrill) {
    return (
      <Screen title={`Drill Breakdown · ${viewingDrill.title}`} back={false} padded={false}>
        <div className="coach-portal-container">
          <div className="coach-top-bar">
            <button
              type="button"
              className="btn btn--secondary btn--sm"
              onClick={() => setViewingDrill(null)}
            >
              ← Back
            </button>
            <div className="coach-badge-group">
              <span className="pill" style={{ background: 'rgba(255,200,61,0.15)', color: '#ffc83d' }}>
                {viewingDrill.fps}
              </span>
              <span className="pill" style={{ background: 'rgba(56,189,248,0.15)', color: '#38bdf8' }}>
                {viewingDrill.category}
              </span>
            </div>
          </div>

          {/* Video Player Display */}
          <div className="coach-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="coach-drill-video-thumb" style={{ borderRadius: 0, border: 'none', height: 260 }}>
              <img src={viewingDrill.videoThumb} alt={viewingDrill.title} />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(2,6,23,0.95), transparent)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: 14,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h2 style={{ margin: 0, fontSize: 18, color: '#f8fafc' }}>{viewingDrill.title}</h2>
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                      Duration: {viewingDrill.duration} • Active in {viewingDrill.assignedCount} Trainee Programs
                    </span>
                  </div>
                  <div
                    style={{
                      padding: '6px 12px',
                      background: '#00e676',
                      color: '#020617',
                      borderRadius: 20,
                      fontWeight: 800,
                      fontSize: 11,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <Video size={13} /> 60 FPS SIMULATION
                  </div>
                </div>
              </div>
            </div>

            {/* Video Controls Bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 14px',
                background: 'rgba(15,23,42,0.95)',
                borderTop: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div style={{ display: 'flex', gap: 6 }}>
                {['0.25x Slow-Mo', '0.5x Half-Speed', '1.0x Normal'].map((spd, i) => (
                  <button
                    key={spd}
                    type="button"
                    className="pill"
                    style={{
                      background: i === 0 ? 'rgba(0,230,118,0.2)' : 'rgba(255,255,255,0.06)',
                      color: i === 0 ? '#00e676' : '#cbd5e1',
                      border: i === 0 ? '1px solid #00e67655' : '1px solid transparent',
                      cursor: 'pointer',
                    }}
                  >
                    {spd}
                  </button>
                ))}
              </div>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>Frame 142 / 640</span>
            </div>
          </div>

          {/* Key Biomechanical Checkpoints */}
          <div className="coach-card">
            <h3 className="coach-card-title">
              <CheckCircle2 size={15} color="#00e676" /> Mandatory Biomechanical Checkpoints
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {viewingDrill.checkpoints.map((cp, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    padding: 10,
                    background: 'rgba(0,230,118,0.03)',
                    border: '1px solid rgba(0,230,118,0.15)',
                    borderRadius: 8,
                  }}
                >
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: '#00e676',
                      color: '#020617',
                      fontWeight: 800,
                      fontSize: 11,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {idx + 1}
                  </span>
                  <div>
                    <strong style={{ fontSize: 13, color: '#f8fafc' }}>Checkpoint {idx + 1}</strong>
                    <p style={{ margin: '2px 0 0', fontSize: 12, color: '#cbd5e1' }}>{cp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Common Technical Fault to Avoid */}
          <div className="coach-card" style={{ borderColor: 'rgba(239,68,68,0.25)', background: 'rgba(239,68,68,0.03)' }}>
            <h3 className="coach-card-title" style={{ color: '#ef4444' }}>
              <AlertTriangle size={15} color="#ef4444" /> Common Technical Fault to Eliminate
            </h3>
            <p style={{ margin: 0, fontSize: 13, color: '#fca5a5' }}>{viewingDrill.commonFault}</p>
          </div>

          {/* Training Volume & Reps */}
          <div className="coach-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: 11, color: 'var(--muted)', display: 'block' }}>Prescribed Repetition Protocol</span>
                <strong style={{ fontSize: 14, color: '#ffc83d' }}>{viewingDrill.recommendedReps}</strong>
              </div>
              <button
                type="button"
                className="btn btn--primary btn--sm"
                onClick={() => {
                  showToast(`✓ Drill assigned to all active trainees!`)
                }}
              >
                Assign to Squad
              </button>
            </div>
          </div>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // DEDICATED SUB-PAGE 6: CREATE TECHNICAL DRILL
  // =========================================================================
  if (showCreateDrillPage) {
    return (
      <Screen title="Create Technical Video Drill" back={false} padded={false}>
        <div className="coach-portal-container">
          <div className="coach-top-bar">
            <button
              type="button"
              className="btn btn--secondary btn--sm"
              onClick={() => setShowCreateDrillPage(false)}
            >
              ← Back
            </button>
            <span className="pill" style={{ background: 'rgba(255,200,61,0.15)', color: '#ffc83d' }}>
              Publish Video Drill
            </span>
          </div>

          <form onSubmit={handleCreateDrillSubmit} className="coach-card">
            <h3 className="coach-card-title">
              <PlaySquare size={15} color="#ffc83d" /> Drill Metadata & Classification
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10 }}>
              <div>
                <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  Technical Drill Title *
                </label>
                <input
                  name="title"
                  required
                  placeholder="e.g. Slower Ball Back-of-the-Hand Deception"
                  className="sh-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  Skill Category *
                </label>
                <select name="category" className="sh-select" style={{ width: '100%' }}>
                  <option value="Batting">🏏 Batting Mechanics</option>
                  <option value="Fast Bowling">⚡ Fast Bowling & Pace</option>
                  <option value="Spin">🌀 Spin Revolutions & Drift</option>
                  <option value="Fielding">🧤 Wicketkeeping & Fielding</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  Video Frame Rate (FPS) *
                </label>
                <select name="fps" className="sh-select" style={{ width: '100%' }}>
                  <option value="HD 60FPS Slow-Mo">HD 60FPS Slow-Mo</option>
                  <option value="120FPS Slow-Mo">120FPS High-Speed Slow-Mo</option>
                  <option value="240FPS Ultra Slow-Mo">240FPS Ultra Slow-Mo (Biomechanics)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  Video Clip Duration
                </label>
                <input
                  name="duration"
                  defaultValue="05:15 min"
                  className="sh-input"
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div style={{ marginTop: 8 }}>
              <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                Video Thumbnail URL / Asset Link
              </label>
              <input
                name="videoThumb"
                defaultValue="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80"
                className="sh-input"
                style={{ width: '100%' }}
              />
            </div>

            <h3 className="coach-card-title" style={{ marginTop: 12 }}>
              <CheckCircle2 size={15} color="#00e676" /> Checkpoints to Monitor (Mandatory 3)
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <input
                name="checkpoint1"
                required
                placeholder="Checkpoint 1: e.g. Maintain high elbow and still head directly over the seam"
                defaultValue="Maintain high elbow and still head directly over the seam"
                className="sh-input"
                style={{ width: '100%' }}
              />
              <input
                name="checkpoint2"
                required
                placeholder="Checkpoint 2: e.g. Weight transfer completed before bat impact"
                defaultValue="Weight transfer completed before bat impact"
                className="sh-input"
                style={{ width: '100%' }}
              />
              <input
                name="checkpoint3"
                required
                placeholder="Checkpoint 3: e.g. Clean follow-through without twisting torso"
                defaultValue="Clean follow-through without twisting torso"
                className="sh-input"
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ marginTop: 10 }}>
              <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                Common Technical Fault to Avoid *
              </label>
              <input
                name="commonFault"
                required
                placeholder="e.g. Dropping wrists early causing toe-end contact"
                defaultValue="Dropping wrists early causing bottom hand dominance and spooning catches"
                className="sh-input"
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10, marginTop: 10 }}>
              <div>
                <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  Recommended Sets & Reps
                </label>
                <input
                  name="recommendedReps"
                  defaultValue="4 Sets × 15 Deliveries Daily"
                  className="sh-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  Coach Master Note
                </label>
                <input
                  name="coachNote"
                  defaultValue="Key drill for mastering high-speed bouncers on bouncy pitches."
                  className="sh-input"
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button
                type="button"
                className="btn btn--secondary"
                style={{ flex: 1 }}
                onClick={() => setShowCreateDrillPage(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn--primary"
                style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              >
                <Check size={16} /> Publish Drill to Squad Library
              </button>
            </div>
          </form>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // DEDICATED SUB-PAGE 7: RECORD COACHING PAYMENT
  // =========================================================================
  if (recordingPaymentTrainee) {
    return (
      <Screen title={`Record Fee Payment · ${recordingPaymentTrainee.name}`} back={false} padded={false}>
        <div className="coach-portal-container">
          <div className="coach-top-bar">
            <button
              type="button"
              className="btn btn--secondary btn--sm"
              onClick={() => setRecordingPaymentTrainee(null)}
            >
              ← Back
            </button>
            <span className="pill" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676' }}>
              Fee Collection
            </span>
          </div>

          <form onSubmit={handleRecordPaymentSubmit} className="coach-card">
            <div style={{ padding: 12, background: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, color: '#f8fafc' }}>{recordingPaymentTrainee.name}</h3>
                  <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                    Batch: {recordingPaymentTrainee.batch} • Guardian: {recordingPaymentTrainee.guardian}
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: 11, color: 'var(--muted)', display: 'block' }}>Monthly Retainer</span>
                  <strong style={{ fontSize: 16, color: '#00e676' }}>
                    ₹{recordingPaymentTrainee.monthlyFee.toLocaleString('en-IN')}
                  </strong>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10, marginTop: 8 }}>
              <div>
                <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  Amount Received (₹) *
                </label>
                <input
                  name="amount"
                  type="number"
                  required
                  defaultValue={recordingPaymentTrainee.monthlyFee}
                  className="sh-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  Payment Method *
                </label>
                <select name="method" className="sh-select" style={{ width: '100%' }}>
                  <option value="UPI / PhonePe / GPay">UPI / QR (PhonePe / GPay)</option>
                  <option value="Direct Bank NEFT / IMPS">Direct Bank NEFT / IMPS</option>
                  <option value="Cash at Academy Desk">Cash at Academy Desk</option>
                  <option value="Escrow Platform Wallet">Escrow Platform Wallet</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: 8 }}>
              <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                Tuition Receipt Notes
              </label>
              <textarea
                name="notes"
                rows={2}
                defaultValue="November 2026 coaching fee and turf net maintenance cleared. Eligible for weekend Ranji trials."
                className="sh-input"
                style={{ width: '100%', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button
                type="button"
                className="btn btn--secondary"
                style={{ flex: 1 }}
                onClick={() => setRecordingPaymentTrainee(null)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn--primary"
                style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              >
                <Check size={16} /> Confirm Receipt & Issue Official Voucher
              </button>
            </div>
          </form>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // DEDICATED SUB-PAGE 8: PRINTABLE OFFICIAL TUITION RECEIPT
  // =========================================================================
  if (viewingReceipt) {
    return (
      <Screen title="Official Tuition Receipt" back={false} padded={false}>
        <div className="coach-portal-container">
          <div className="coach-top-bar">
            <button
              type="button"
              className="btn btn--secondary btn--sm"
              onClick={() => setViewingReceipt(null)}
            >
              ← Back
            </button>
            <button
              type="button"
              className="btn btn--primary btn--sm"
              onClick={() => window.print()}
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <Printer size={14} /> Print Receipt
            </button>
          </div>

          <div className="coach-receipt-paper">
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 12 }}>
              <div>
                <span className="pill" style={{ background: 'rgba(0,230,118,0.2)', color: '#00e676', marginBottom: 6 }}>
                  OFFICIAL COACHING TUITION RECEIPT
                </span>
                <h2 style={{ margin: '6px 0 2px', fontSize: 18, color: '#f8fafc' }}>
                  {viewingReceipt.coach}
                </h2>
                <p style={{ margin: 0, fontSize: 12, color: '#94a3b8' }}>
                  {viewingReceipt.center}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <strong style={{ fontSize: 14, color: '#38bdf8' }}>{viewingReceipt.receiptNo}</strong>
                <span style={{ fontSize: 11, color: 'var(--muted)', display: 'block' }}>Date: {viewingReceipt.date}</span>
              </div>
            </div>

            {/* Trainee Details */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10, padding: 10, background: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>
              <div>
                <span style={{ fontSize: 11, color: 'var(--muted)', display: 'block' }}>ATHLETE NAME</span>
                <strong style={{ fontSize: 14, color: '#f8fafc' }}>{viewingReceipt.traineeName}</strong>
                <span style={{ fontSize: 11, color: '#94a3b8', display: 'block' }}>ID: {viewingReceipt.traineeId}</span>
              </div>
              <div>
                <span style={{ fontSize: 11, color: 'var(--muted)', display: 'block' }}>SPECIALIZATION / BATCH</span>
                <strong style={{ fontSize: 13, color: '#f8fafc' }}>{viewingReceipt.role}</strong>
                <span style={{ fontSize: 11, color: '#94a3b8', display: 'block' }}>{viewingReceipt.batch}</span>
              </div>
              <div>
                <span style={{ fontSize: 11, color: 'var(--muted)', display: 'block' }}>GUARDIAN CONTACT</span>
                <strong style={{ fontSize: 13, color: '#f8fafc' }}>{viewingReceipt.guardian}</strong>
              </div>
            </div>

            {/* Itemized Breakdown Table */}
            <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(255,255,255,0.04)', fontSize: 11, fontWeight: 800, color: 'var(--muted)' }}>
                <span>DESCRIPTION</span>
                <span>AMOUNT (INR)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: 13 }}>
                <div>
                  <strong style={{ color: '#f8fafc' }}>{viewingReceipt.period}</strong>
                  <p style={{ margin: '2px 0 0', fontSize: 11, color: '#94a3b8' }}>
                    Includes Turf Net Practice, Biomechanical Radar Assessment & Video Drill Access
                  </p>
                </div>
                <strong style={{ color: '#00e676' }}>₹{viewingReceipt.amount.toLocaleString('en-IN')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'rgba(0,230,118,0.05)', fontSize: 14 }}>
                <strong>TOTAL AMOUNT PAID:</strong>
                <strong style={{ color: '#00e676', fontSize: 16 }}>₹{viewingReceipt.amount.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            {/* Payment Details */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#94a3b8', padding: '6px 0' }}>
              <span>Payment Mode: <strong style={{ color: '#f8fafc' }}>{viewingReceipt.method}</strong></span>
              <span>Status: <strong style={{ color: '#00e676' }}>✓ Settled & Verified</strong></span>
            </div>

            <p style={{ margin: 0, fontSize: 11, color: 'var(--muted)', fontStyle: 'italic' }}>
              Remarks: "{viewingReceipt.notes}"
            </p>

            {/* Footer Seal */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 12, marginTop: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#00e676', fontSize: 11 }}>
                <ShieldCheck size={16} /> Digitally Authenticated by BCCI Licensed Coach
              </div>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>Scoring Heroes High Performance Platform</span>
            </div>
          </div>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // MAIN PORTAL VIEW (TABS: TRAINEES, SESSIONS, DRILLS, EARNINGS)
  // =========================================================================
  return (
    <Screen title="Coach & Trainer Operations Portal" back={false} padded={false}>
      <div className="coach-portal-container">
        {/* Banner Toast Notification */}
        {bannerNotice && (
          <div
            style={{
              padding: '10px 14px',
              background: 'rgba(0,230,118,0.15)',
              border: '1px solid #00e676',
              borderRadius: 8,
              color: '#00e676',
              fontSize: 13,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <CheckCircle2 size={16} /> {bannerNotice}
          </div>
        )}

        {/* Top Header Bar */}
        <div className="coach-top-bar">
          <div>
            <span style={{ fontSize: 10, letterSpacing: 0.8, color: '#00e676', textTransform: 'uppercase', fontWeight: 800 }}>
              INDEPENDENT COACH PORTAL
            </span>
            <h1 style={{ margin: '2px 0 0', fontSize: 18, color: '#f8fafc', fontWeight: 800 }}>
              Coach Venkatesh Prasad
            </h1>
          </div>
          <div className="coach-badge-group">
            <span className="pill" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676', fontWeight: 800 }}>
              BCCI LEVEL 2
            </span>
          </div>
        </div>

        {/* Primary 4-Portal Tab Bar */}
        <div className="coach-tab-bar" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'trainees'}
            className={`coach-tab-btn ${activeTab === 'trainees' ? 'is-active' : ''}`}
            onClick={() => handleTabChange('trainees')}
          >
            <Users size={16} />
            <span>Trainees ({trainees.length})</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'sessions'}
            className={`coach-tab-btn ${activeTab === 'sessions' ? 'is-active' : ''}`}
            onClick={() => handleTabChange('sessions')}
          >
            <Calendar size={16} />
            <span>Sessions ({sessions.length})</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'drills'}
            className={`coach-tab-btn ${activeTab === 'drills' ? 'is-active' : ''}`}
            onClick={() => handleTabChange('drills')}
          >
            <PlaySquare size={16} />
            <span>Video Drills ({drills.length})</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'earnings'}
            className={`coach-tab-btn ${activeTab === 'earnings' ? 'is-active' : ''}`}
            onClick={() => handleTabChange('earnings')}
          >
            <DollarSign size={16} />
            <span>P&L Ledger</span>
          </button>
        </div>

        {/* ================================================================= */}
        {/* TAB 1: TRAINEE ROSTER, SKILL RADAR & ASSESSMENTS */}
        {/* ================================================================= */}
        {activeTab === 'trainees' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Action Bar */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Search
                  size={15}
                  color="var(--muted)"
                  style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }}
                />
                <input
                  type="text"
                  placeholder="Search athlete by name, role, batch or bio..."
                  value={traineeSearch}
                  onChange={(e) => setTraineeSearch(e.target.value)}
                  className="sh-input"
                  style={{ width: '100%', paddingLeft: 32 }}
                />
              </div>
              <button
                type="button"
                className="btn btn--primary btn--sm"
                onClick={() => setShowEnrollTraineePage(true)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}
              >
                <Plus size={15} /> Enroll Athlete
              </button>
            </div>

            {/* Batch Filter Scroll Row */}
            <div className="coach-scroll-filters">
              {['All', 'Morning Pro', 'Evening Elite', 'Weekend Masterclass', '1-on-1 Private'].map((b) => (
                <button
                  key={b}
                  type="button"
                  className={`pill ${selectedBatchFilter === b ? 'is-active' : ''}`}
                  style={{
                    background: selectedBatchFilter === b ? '#00e676' : 'rgba(255,255,255,0.06)',
                    color: selectedBatchFilter === b ? '#020617' : '#cbd5e1',
                    cursor: 'pointer',
                    fontWeight: selectedBatchFilter === b ? 'bold' : 'normal',
                    whiteSpace: 'nowrap',
                  }}
                  onClick={() => setSelectedBatchFilter(b)}
                >
                  {b === 'All' ? 'All Batches' : b}
                </button>
              ))}
            </div>

            {/* Trainees Cards Grid */}
            <div className="coach-trainee-grid">
              {filteredTrainees.map((t) => (
                <div key={t.id} className="coach-trainee-card">
                  <div>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                      <div>
                        <strong style={{ fontSize: 15, color: '#f8fafc' }}>{t.name}</strong>
                        <span style={{ fontSize: 11, color: 'var(--muted)', display: 'block' }}>
                          Age {t.age} • {t.role}
                        </span>
                      </div>
                      <span
                        className="pill"
                        style={{
                          background: t.batch.includes('Private')
                            ? 'rgba(167,139,250,0.15)'
                            : 'rgba(56,189,248,0.15)',
                          color: t.batch.includes('Private') ? '#a78bfa' : '#38bdf8',
                          fontSize: 10,
                        }}
                      >
                        {t.batch}
                      </span>
                    </div>

                    {/* Biomechanical Metrics Bar */}
                    <div className="coach-metrics-bar">
                      <div className="coach-metric-item">
                        <span>Technique</span>
                        <strong style={{ color: '#00e676' }}>{t.metrics.battingIndex}/100</strong>
                      </div>
                      <div className="coach-metric-item">
                        <span>Pace</span>
                        <strong style={{ color: '#38bdf8' }}>{t.metrics.paceClocked}</strong>
                      </div>
                      <div className="coach-metric-item">
                        <span>Yo-Yo</span>
                        <strong style={{ color: '#ffc83d' }}>{t.metrics.yoYoScore}</strong>
                      </div>
                      <div className="coach-metric-item">
                        <span>Reflex</span>
                        <strong style={{ color: '#a78bfa' }}>{t.metrics.reflexRating}</strong>
                      </div>
                    </div>

                    {/* Coach Assessment Note */}
                    <p style={{ margin: '8px 0 0', fontSize: 12, color: '#94a3b8', fontStyle: 'italic', lineHeight: 1.4 }}>
                      "{t.latestNote}"
                    </p>
                  </div>

                  {/* Actions Row */}
                  <div style={{ display: 'flex', gap: 6, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 8, marginTop: 4 }}>
                    <button
                      type="button"
                      className="btn btn--secondary btn--sm"
                      style={{ flex: 1, fontSize: 11 }}
                      onClick={() => setViewingTrainee(t)}
                    >
                      View Radar →
                    </button>
                    <button
                      type="button"
                      className="btn btn--secondary btn--sm"
                      style={{ flex: 1, fontSize: 11 }}
                      onClick={() => setEvaluatingTrainee(t)}
                    >
                      + Evaluate
                    </button>
                    <a
                      href={`tel:${t.phone}`}
                      className="btn btn--secondary btn--sm"
                      style={{ width: 34, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      title="Call Athlete or Parent"
                    >
                      <Phone size={13} color="#00e676" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 2: 1-ON-1 SESSIONS & CALENDAR SCHEDULING */}
        {/* ================================================================= */}
        {activeTab === 'sessions' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Top Bar for Sessions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="coach-scroll-filters" style={{ flex: 1, marginRight: 8 }}>
                {['All', 'Today', 'Tomorrow'].map((df) => (
                  <button
                    key={df}
                    type="button"
                    className={`pill ${sessionDateFilter === df ? 'is-active' : ''}`}
                    style={{
                      background: sessionDateFilter === df ? '#00e676' : 'rgba(255,255,255,0.06)',
                      color: sessionDateFilter === df ? '#020617' : '#cbd5e1',
                      cursor: 'pointer',
                      fontWeight: sessionDateFilter === df ? 'bold' : 'normal',
                    }}
                    onClick={() => setSessionDateFilter(df)}
                  >
                    {df === 'All' ? 'All Days' : df}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="btn btn--primary btn--sm"
                onClick={() => setShowScheduleSessionPage(true)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}
              >
                <Plus size={15} /> Schedule Session
              </button>
            </div>

            {/* Sessions Cards Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {filteredSessions.map((s) => (
                <div key={s.id} className="coach-session-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                        <span className="pill" style={{ background: 'rgba(56,189,248,0.15)', color: '#38bdf8', fontSize: 10 }}>
                          {s.time}
                        </span>
                        <span className="pill" style={{ background: 'rgba(255,255,255,0.06)', color: '#cbd5e1', fontSize: 10 }}>
                          {s.date}
                        </span>
                        <span
                          className="pill"
                          style={{
                            background: s.status === 'Completed' ? 'rgba(0,230,118,0.15)' : 'rgba(255,200,61,0.15)',
                            color: s.status === 'Completed' ? '#00e676' : '#ffc83d',
                            fontSize: 10,
                          }}
                        >
                          {s.status}
                        </span>
                      </div>
                      <strong style={{ fontSize: 15, color: '#f8fafc' }}>{s.traineeName}</strong>
                      <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--muted)' }}>
                        Venue: <strong style={{ color: '#cbd5e1' }}>{s.venue}</strong> • Focus: <span style={{ color: '#38bdf8' }}>{s.focusTopic}</span>
                      </p>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <strong style={{ fontSize: 15, color: '#00e676' }}>₹{s.fee}</strong>
                      <span
                        style={{
                          fontSize: 10,
                          color: s.paid ? '#00e676' : '#ef4444',
                          display: 'block',
                          fontWeight: 700,
                        }}
                      >
                        {s.paid ? 'PAID VIA ESCROW' : 'PAYMENT PENDING'}
                      </span>
                    </div>
                  </div>

                  {/* Session Actions */}
                  <div style={{ display: 'flex', gap: 8, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 8 }}>
                    <button
                      type="button"
                      className="btn btn--secondary btn--sm"
                      style={{ flex: 1, fontSize: 11 }}
                      onClick={() => handleToggleSessionStatus(s.id)}
                    >
                      {s.status === 'Completed' ? 'Re-open Slot' : '✓ Mark Completed'}
                    </button>
                    <button
                      type="button"
                      className="btn btn--secondary btn--sm"
                      style={{ flex: 1, fontSize: 11 }}
                      onClick={() => setShowScheduleSessionPage(true)}
                    >
                      Reschedule Slot
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 3: VIDEO DRILL ANALYSIS & TECHNICAL LIBRARY */}
        {/* ================================================================= */}
        {activeTab === 'drills' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Filter and Create Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="coach-scroll-filters" style={{ flex: 1, marginRight: 8 }}>
                {['All', 'Batting', 'Fast Bowling', 'Spin', 'Fielding'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`pill ${drillCategoryFilter === cat ? 'is-active' : ''}`}
                    style={{
                      background: drillCategoryFilter === cat ? '#00e676' : 'rgba(255,255,255,0.06)',
                      color: drillCategoryFilter === cat ? '#020617' : '#cbd5e1',
                      cursor: 'pointer',
                      fontWeight: drillCategoryFilter === cat ? 'bold' : 'normal',
                      whiteSpace: 'nowrap',
                    }}
                    onClick={() => setDrillCategoryFilter(cat)}
                  >
                    {cat === 'All' ? 'All Drills' : cat}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="btn btn--primary btn--sm"
                onClick={() => setShowCreateDrillPage(true)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}
              >
                <Plus size={15} /> Create Drill
              </button>
            </div>

            {/* Drills Grid */}
            <div className="coach-drill-grid">
              {filteredDrills.map((d) => (
                <div key={d.id} className="coach-drill-card">
                  <div>
                    {/* Video Thumbnail with Slow-Mo Badge */}
                    <div className="coach-drill-video-thumb">
                      <img src={d.videoThumb} alt={d.title} />
                      <div
                        className="coach-drill-play-overlay"
                        onClick={() => setViewingDrill(d)}
                        title="Watch slow-mo video analysis"
                      >
                        <PlaySquare size={20} />
                      </div>
                      <span
                        style={{
                          position: 'absolute',
                          top: 8,
                          left: 8,
                          padding: '3px 8px',
                          background: 'rgba(2,6,23,0.8)',
                          borderRadius: 6,
                          fontSize: 10,
                          color: '#ffc83d',
                          fontWeight: 800,
                          backdropFilter: 'blur(4px)',
                        }}
                      >
                        {d.fps}
                      </span>
                      <span
                        style={{
                          position: 'absolute',
                          bottom: 8,
                          right: 8,
                          padding: '2px 6px',
                          background: 'rgba(2,6,23,0.8)',
                          borderRadius: 4,
                          fontSize: 10,
                          color: '#fff',
                        }}
                      >
                        {d.duration}
                      </span>
                    </div>

                    {/* Drill Info */}
                    <div style={{ marginTop: 8 }}>
                      <strong style={{ fontSize: 14, color: '#f8fafc', display: 'block' }}>{d.title}</strong>
                      <span style={{ fontSize: 11, color: '#38bdf8', fontWeight: 700 }}>
                        {d.category} Mechanics • Assigned: {d.assignedCount} Athletes
                      </span>
                    </div>

                    {/* Key Checkpoint Preview */}
                    <div style={{ marginTop: 8, padding: 8, background: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>
                      <span style={{ fontSize: 10, color: 'var(--muted)', display: 'block', textTransform: 'uppercase' }}>
                        Primary Checkpoint:
                      </span>
                      <p style={{ margin: '2px 0 0', fontSize: 12, color: '#cbd5e1' }}>
                        ✓ {d.checkpoints[0]}
                      </p>
                    </div>
                  </div>

                  {/* Drill Card Actions */}
                  <div style={{ display: 'flex', gap: 6, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 8, marginTop: 4 }}>
                    <button
                      type="button"
                      className="btn btn--primary btn--sm"
                      style={{ flex: 1, fontSize: 11 }}
                      onClick={() => setViewingDrill(d)}
                    >
                      Watch Slow-Mo Breakdown →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 4: COACH P&L MATH, INVOICING & FEE LEDGER */}
        {/* ================================================================= */}
        {activeTab === 'earnings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Coach Net Profit Formula Banner */}
            <div
              style={{
                padding: '12px 14px',
                background: 'rgba(0,230,118,0.05)',
                border: '1px solid rgba(0,230,118,0.2)',
                borderRadius: 12,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <TrendingUp size={16} color="#00e676" />
                <strong style={{ fontSize: 13, color: '#00e676' }}>
                  Coach Net Profit Math (Monthly P&L Model)
                </strong>
              </div>
              <p style={{ margin: 0, fontSize: 12, color: '#cbd5e1' }}>
                Net Margin = (1-on-1 Sessions + Monthly Retainers) − Facility Turf Net Rental Outflow
              </p>
            </div>

            {/* Financial KPI Grid */}
            <div className="coach-kpi-grid">
              <div className="coach-card">
                <span className="coach-card-title">Monthly Billed</span>
                <strong style={{ fontSize: 18, color: '#f8fafc' }}>
                  ₹{earningsStats.totalBilled.toLocaleString('en-IN')}
                </strong>
                <span style={{ fontSize: 10, color: 'var(--muted)' }}>42 Trainees Enrolled</span>
              </div>

              <div className="coach-card" style={{ borderColor: 'rgba(0,230,118,0.3)' }}>
                <span className="coach-card-title" style={{ color: '#00e676' }}>Collected Fees</span>
                <strong style={{ fontSize: 18, color: '#00e676' }}>
                  ₹{earningsStats.collected.toLocaleString('en-IN')}
                </strong>
                <span style={{ fontSize: 10, color: '#00e676' }}>80% Collection Rate</span>
              </div>

              <div className="coach-card" style={{ borderColor: 'rgba(239,68,68,0.3)' }}>
                <span className="coach-card-title" style={{ color: '#ef4444' }}>Pending Dues</span>
                <strong style={{ fontSize: 18, color: '#ef4444' }}>
                  ₹{earningsStats.overdue.toLocaleString('en-IN')}
                </strong>
                <span style={{ fontSize: 10, color: '#ef4444' }}>7 Trainees Pending</span>
              </div>

              <div className="coach-card">
                <span className="coach-card-title">Net Turf Net Rent</span>
                <strong style={{ fontSize: 18, color: '#38bdf8' }}>
                  ₹{earningsStats.turfRentalCost.toLocaleString('en-IN')}
                </strong>
                <span style={{ fontSize: 10, color: 'var(--muted)' }}>Facility Outflow</span>
              </div>
            </div>

            {/* Itemized Trainee Fee Ledger */}
            <div className="coach-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className="coach-card-title">
                  <CreditCard size={15} color="#00e676" /> Trainee Fee Ledger & Direct Collection
                </h3>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>Active Retainers</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {trainees.map((t) => (
                  <div
                    key={t.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 10,
                      background: 'rgba(255,255,255,0.02)',
                      borderRadius: 8,
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <strong style={{ fontSize: 14, color: '#f8fafc' }}>{t.name}</strong>
                        <span
                          className="pill"
                          style={{
                            background: t.feeStatus === 'Paid' ? 'rgba(0,230,118,0.15)' : 'rgba(239,68,68,0.15)',
                            color: t.feeStatus === 'Paid' ? '#00e676' : '#ef4444',
                            fontSize: 10,
                          }}
                        >
                          {t.feeStatus}
                        </span>
                      </div>
                      <span style={{ fontSize: 11, color: 'var(--muted)' }}>
                        {t.batch} • ₹{t.monthlyFee.toLocaleString('en-IN')}/month
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: 6 }}>
                      {t.feeStatus === 'Overdue' ? (
                        <a
                          href={`https://wa.me/${t.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(
                            t.guardian
                          )},%20this%20is%20Coach%20Venkatesh%20Prasad.%20Kindly%20clear%20the%20coaching%20fee%20for%20${encodeURIComponent(
                            t.name
                          )}%20(Amount:%20INR%20${t.monthlyFee}).%20UPI:%20scoringheros@icici`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn--secondary btn--sm"
                          style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}
                        >
                          <Share2 size={12} color="#00e676" /> Remind
                        </a>
                      ) : null}

                      <button
                        type="button"
                        className="btn btn--primary btn--sm"
                        style={{ fontSize: 11 }}
                        onClick={() => setRecordingPaymentTrainee(t)}
                      >
                        Record Payment
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Screen>
  )
}

