import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  Zap,
  BookOpen,
  Copy,
  GraduationCap,
  Users,
  Calendar,
  DollarSign,
  CheckCircle2,
  Phone,
  Plus,
  Send,
  AlertTriangle,
  Clock,
  Printer,
  Share2,
  Search,
  Check,
  CreditCard,
  ShieldCheck,
  TrendingUp,
  Award,
  Flame,
  Layers,
  FileText,
  RotateCcw,
  Activity,
  UserCheck,
  ChevronRight,
  Download,
  X,
} from 'lucide-react'
import Screen from '../components/Screen'

// Standard Academy Benchmark Drills
const STANDARD_ACADEMY_DRILLS = [
  {
    id: 'std-1',
    time: '06:00 AM - 07:00 AM',
    title: 'Yo-Yo Conditioning & Agility Ladders',
    venue: 'Main Ground Outfield',
    coach: 'Mohit Rao (S&C Trainer)',
    batch: 'U-19 & U-16 Squads',
    focus: 'Endurance, stamina & speed deceleration',
  },
  {
    id: 'std-2',
    time: '07:00 AM - 08:15 AM',
    title: 'Target Bowling & Seam Position Net Session',
    venue: 'Turf Nets A & B',
    coach: 'Rahul Sharma (Pace Coach)',
    batch: 'Pace & Spin Bowlers',
    focus: 'Hitting top of off-stump on good length',
  },
  {
    id: 'std-3',
    time: '08:15 AM - 09:00 AM',
    title: 'Short-Ball Pull & Hook Practice against Bowling Machine',
    venue: 'Turf Net C (Automated Machine)',
    coach: 'Ashish KP (Batting Coach)',
    batch: 'Top-Order Batsmen',
    focus: 'Swiveling weight transfer & keeping ball down',
  },
  {
    id: 'std-4',
    time: '04:30 PM - 06:30 PM',
    title: '20-Over Center Turf Match Simulation',
    venue: 'Center Turf Wicket (Red Soil)',
    coach: 'Arjun Verma (Head Coach)',
    batch: 'Elite Match Squad',
    focus: 'Powerplay strike rotation & death bowling',
  },
];

export default function AcademyCareer() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const tabParam = searchParams.get('tab')
  const [activeTab, setActiveTab] = useState(
    tabParam === 'attendance' ? 'attendance' : tabParam === 'fees' ? 'fees' : 'students'
  )

  const [toastMsg, setToastMsg] = useState('')

  useEffect(() => {
    const t = searchParams.get('tab')
    if (t === 'students' || t === 'attendance' || t === 'fees') {
      setActiveTab(t)
    }
  }, [searchParams])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSearchParams({ tab })
  }

  const triggerToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 3000)
  }

  // =========================================================================
  // 1. STUDENTS ROSTER & COMPREHENSIVE STATS
  // =========================================================================
  const [selectedBatchFilter, setSelectedBatchFilter] = useState('all') // 'all' | 'u14' | 'u16' | 'u19' | 'weekend'
  const [searchQuery, setSearchQuery] = useState('')

  const [students, setStudents] = useState([
    {
      id: 1,
      studentId: 'SH-2026-081',
      name: 'Rohit Sharma',
      age: 17,
      ageGroup: 'u19',
      batch: 'U-19 Pro High Performance',
      role: 'Top-Order Batsman',
      battingStance: 'Right Hand Bat',
      bowlingAction: 'Right-arm Offspin',
      competitionTier: 'State / Ranji Trophy Squad',
      guardianName: 'Ramakant Sharma',
      guardianPhone: '+91 98401 11223',
      attendanceRate: '96.4%',
      attendanceToday: 'present',
      feeStatus: 'Paid',
      feeAmount: 3000,
      dueDate: '05 Nov 2026',
      receiptNo: 'REC-9912',
      yoyoScore: 19.8,
      sprint30m: '3.82s',
      coachNote: 'Strong front-foot balance. Head steady at point of impact. Focus on back-foot punch off express pace.',
      isVerified: true,
      academyCertified: true,
      // Comprehensive Player Match Stats
      matches: 24,
      innings: 22,
      runs: 846,
      highScore: '104*',
      battingAvg: '44.5',
      strikeRate: '138.2',
      wickets: 8,
      bestBowling: '2/18',
      economy: '5.2',
      catches: 14,
      recentInnings: [
        { fixture: 'vs Coastal Kings XI (Championship Cup)', score: '58 (34)', role: 'Opened batting • 6 Fours, 3 Sixes' },
        { fixture: 'vs Marina Strikers (25-Over League)', score: '74* (48)', role: 'Match Winner • Not Out' },
        { fixture: 'vs City Tigers Club (T20 League)', score: '38 (24)', role: 'Top-order partnership 84 runs' },
      ],
      attendanceHistory: [
        { date: '04 Nov 2026', status: 'Present', session: 'Morning Elite Net Practice' },
        { date: '03 Nov 2026', status: 'Present', session: '20-Over Center Turf Match' },
        { date: '02 Nov 2026', status: 'Late (15m)', session: 'Agility Ladders & Fitness' },
        { date: '01 Nov 2026', status: 'Present', session: 'Bowling Machine Short-Ball Drill' },
        { date: '31 Oct 2026', status: 'Present', session: 'Slip Catching & Throwing' },
      ],
    },
    {
      id: 2,
      studentId: 'SH-2026-082',
      name: 'Kavya Raman',
      age: 15,
      ageGroup: 'u16',
      batch: 'U-16 Evening Elite',
      role: 'Right-Arm Fast Bowler',
      battingStance: 'Right Hand Bat',
      bowlingAction: 'Right-arm Fast (Express Seam)',
      competitionTier: 'District Player (DCA)',
      guardianName: 'Ramanathan K.',
      guardianPhone: '+91 98402 22334',
      attendanceRate: '94.2%',
      attendanceToday: 'present',
      feeStatus: 'Paid',
      feeAmount: 3000,
      dueDate: '05 Nov 2026',
      receiptNo: 'REC-9913',
      yoyoScore: 18.6,
      sprint30m: '3.94s',
      coachNote: 'Upright seam position. Good bounce extraction. Working on reverse swing delivery with older ball.',
      isVerified: true,
      academyCertified: true,
      matches: 20,
      innings: 14,
      runs: 142,
      highScore: '32*',
      battingAvg: '17.7',
      strikeRate: '112.4',
      wickets: 32,
      bestBowling: '5/16',
      economy: '4.8',
      catches: 8,
      recentInnings: [
        { fixture: 'vs Apex Academy XI', score: '4/22 (4.0 ov)', role: 'Man of the Match • Express Pace' },
        { fixture: 'vs Marina Titans', score: '3/19 (4.0 ov)', role: 'Death overs spell • 2 Clean bowled' },
      ],
      attendanceHistory: [
        { date: '04 Nov 2026', status: 'Present', session: 'Evening Elite Net Practice' },
        { date: '03 Nov 2026', status: 'Present', session: 'Target Bowling Drills' },
        { date: '02 Nov 2026', status: 'Present', session: 'Yo-Yo Test & Sprint Work' },
        { date: '01 Nov 2026', status: 'Present', session: 'Match Simulation' },
      ],
    },
    {
      id: 3,
      studentId: 'SH-2026-083',
      name: 'Aditya Sen',
      age: 16,
      ageGroup: 'u16',
      batch: 'U-16 Evening Elite',
      role: 'Wicketkeeper Batsman',
      battingStance: 'Right Hand Bat',
      bowlingAction: 'None (Pure Wicketkeeper)',
      competitionTier: 'District Player (DCA)',
      guardianName: 'Sneha Sen',
      guardianPhone: '+91 98403 33445',
      attendanceRate: '88.5%',
      attendanceToday: 'present',
      feeStatus: 'Overdue',
      feeAmount: 3000,
      dueDate: '01 Nov 2026',
      receiptNo: '',
      yoyoScore: 17.8,
      sprint30m: '3.88s',
      coachNote: 'Agile collection down the leg side. Footwork clean against spin bowlers. Solid middle-order strike rotation.',
      isVerified: true,
      academyCertified: true,
      matches: 18,
      innings: 16,
      runs: 412,
      highScore: '68',
      battingAvg: '31.6',
      strikeRate: '124.8',
      wickets: 0,
      bestBowling: '-',
      economy: '-',
      catches: 22,
      recentInnings: [
        { fixture: 'vs Spartan Colts', score: '46 (30) & 2 Stumpings', role: 'Solid glove work' },
        { fixture: 'vs Coastal Kings XI', score: '28 (18)', role: 'Finisher cameo' },
      ],
      attendanceHistory: [
        { date: '04 Nov 2026', status: 'Present', session: 'Evening Keeping Drills' },
        { date: '03 Nov 2026', status: 'Present', session: 'Batting Net Session' },
        { date: '02 Nov 2026', status: 'Absent', session: 'Excused for School Exam' },
      ],
    },
    {
      id: 4,
      studentId: 'SH-2026-084',
      name: 'Arjun Das',
      age: 13,
      ageGroup: 'u14',
      batch: 'U-14 Morning Foundation',
      role: 'Leg-Spin Bowler',
      battingStance: 'Right Hand Bat',
      bowlingAction: 'Legbreak Googly',
      competitionTier: 'Independent / Club Player',
      guardianName: 'Pradeep Das',
      guardianPhone: '+91 98404 44556',
      attendanceRate: '91.0%',
      attendanceToday: 'present',
      feeStatus: 'Overdue',
      feeAmount: 2500,
      dueDate: '01 Nov 2026',
      receiptNo: '',
      yoyoScore: 16.5,
      sprint30m: '4.10s',
      coachNote: 'Googly disguised naturally. Working on consistent pitching around 4th stump line.',
      isVerified: true,
      academyCertified: true,
      matches: 12,
      innings: 8,
      runs: 84,
      highScore: '22',
      battingAvg: '14.0',
      strikeRate: '98.5',
      wickets: 21,
      bestBowling: '4/14',
      economy: '4.2',
      catches: 4,
      recentInnings: [
        { fixture: 'vs Grassroots Tigers', score: '3/16 (3.0 ov)', role: 'Turned game in middle overs' },
      ],
      attendanceHistory: [
        { date: '04 Nov 2026', status: 'Present', session: 'Morning Foundation Drills' },
        { date: '03 Nov 2026', status: 'Present', session: 'Spin Bowling Clinic' },
      ],
    },
    {
      id: 5,
      studentId: 'SH-2026-085',
      name: 'Divya Patel',
      age: 16,
      ageGroup: 'u16',
      batch: 'U-16 Evening Elite',
      role: 'Left-Hand All-Rounder',
      battingStance: 'Left Hand Bat',
      bowlingAction: 'Left-arm Orthodox Spin',
      competitionTier: 'State / Ranji Trophy Squad',
      guardianName: 'Hiren Patel',
      guardianPhone: '+91 98405 55667',
      attendanceRate: '98.0%',
      attendanceToday: 'present',
      feeStatus: 'Paid',
      feeAmount: 3000,
      dueDate: '05 Nov 2026',
      receiptNo: 'REC-9914',
      yoyoScore: 19.2,
      sprint30m: '3.86s',
      coachNote: 'Gun fielder at backward point. Great bat speed and lofted shots against left-arm pace.',
      isVerified: true,
      academyCertified: true,
      matches: 22,
      innings: 20,
      runs: 624,
      highScore: '89*',
      battingAvg: '39.0',
      strikeRate: '141.5',
      wickets: 24,
      bestBowling: '4/19',
      economy: '4.9',
      catches: 16,
      recentInnings: [
        { fixture: 'vs Chennai Super Colts', score: '64 (38) & 2/22', role: 'All-round match MVP' },
      ],
      attendanceHistory: [
        { date: '04 Nov 2026', status: 'Present', session: 'Evening Elite Nets' },
        { date: '03 Nov 2026', status: 'Present', session: 'Match Simulation' },
      ],
    },
    {
      id: 6,
      studentId: 'SH-2026-086',
      name: 'Sai Teja',
      age: 18,
      ageGroup: 'u19',
      batch: 'U-19 Pro High Performance',
      role: 'Fast Bowling All-Rounder',
      battingStance: 'Right Hand Bat',
      bowlingAction: 'Right-arm Fast (Express Seam)',
      competitionTier: 'National Level',
      guardianName: 'Venkatesh T.',
      guardianPhone: '+91 98406 66778',
      attendanceRate: '95.5%',
      attendanceToday: 'present',
      feeStatus: 'Paid',
      feeAmount: 3000,
      dueDate: '05 Nov 2026',
      receiptNo: 'REC-9915',
      yoyoScore: 20.1,
      sprint30m: '3.75s',
      coachNote: 'Clocked 128 km/h. Powerful lower-order boundary hitter. Match-ready physique.',
      isVerified: true,
      academyCertified: true,
      matches: 26,
      innings: 20,
      runs: 480,
      highScore: '62*',
      battingAvg: '32.0',
      strikeRate: '158.4',
      wickets: 36,
      bestBowling: '4/12',
      economy: '5.1',
      catches: 11,
      recentInnings: [
        { fixture: 'vs Bay Velocity XI', score: '42* (19) & 3/20', role: 'Death-overs heroics' },
      ],
      attendanceHistory: [
        { date: '04 Nov 2026', status: 'Present', session: 'Morning Elite Net Practice' },
        { date: '03 Nov 2026', status: 'Present', session: 'Pace Bowling Clinic' },
      ],
    },
    {
      id: 7,
      studentId: 'SH-2026-087',
      name: 'Karan Singh',
      age: 12,
      ageGroup: 'weekend',
      batch: 'Weekend Grassroots Clinic',
      role: 'Right-Hand Batsman',
      battingStance: 'Right Hand Bat',
      bowlingAction: 'None',
      competitionTier: 'Independent / Club Player',
      guardianName: 'Gurmeet Singh',
      guardianPhone: '+91 98407 77889',
      attendanceRate: '82.0%',
      attendanceToday: 'absent',
      feeStatus: 'Paid',
      feeAmount: 2500,
      dueDate: '05 Nov 2026',
      receiptNo: 'REC-9916',
      yoyoScore: 15.4,
      sprint30m: '4.25s',
      coachNote: 'Strong defensive technique. Working on backfoot cut shot and running between wickets.',
      isVerified: true,
      academyCertified: true,
      matches: 8,
      innings: 8,
      runs: 160,
      highScore: '38',
      battingAvg: '22.8',
      strikeRate: '102.0',
      wickets: 0,
      bestBowling: '-',
      economy: '-',
      catches: 3,
      recentInnings: [
        { fixture: 'vs Junior Lions', score: '34 (28)', role: 'Top scorer' },
      ],
      attendanceHistory: [
        { date: '04 Nov 2026', status: 'Absent', session: 'School Exam Leave' },
        { date: '01 Nov 2026', status: 'Present', session: 'Weekend Clinic' },
      ],
    },
  ])

  // Filter students
  const filteredStudents = students.filter((s) => {
    const matchesBatch = selectedBatchFilter === 'all' || s.ageGroup === selectedBatchFilter
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.guardianName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesBatch && matchesSearch
  })

  // =========================================================================
  // 2. COACHES & STAFF MASTER ROSTER
  // =========================================================================
  const [coaches, setCoaches] = useState([
    {
      id: 1,
      name: 'Arjun Verma',
      role: 'Head Coach & Director',
      badge: 'BCCI Level 3',
      experience: '14 Years Elite Coaching • Ex-State Player',
      phone: '+91 98400 11001',
      shift: '05:30 AM - 11:30 AM',
      salary: 45000,
      payoutStatus: 'Paid for Oct',
      present: true,
      assignedBatches: 'U-19 Pro & U-16 Evening Elite',
      assignedDrills: [
        '20-Over Center Turf Match Simulation',
        'Video Biomechanics & Strike Rotation Clinic',
      ],
      attendanceLog: [
        { date: '04 Nov 2026', status: 'Present (On Duty)' },
        { date: '03 Nov 2026', status: 'Present (On Duty)' },
        { date: '02 Nov 2026', status: 'Present (On Duty)' },
        { date: '01 Nov 2026', status: 'Absent (Board Meeting)' },
        { date: '31 Oct 2026', status: 'Present (On Duty)' },
      ],
    },
    {
      id: 2,
      name: 'Rahul Sharma',
      role: 'Pace Bowling Specialist Coach',
      badge: 'State Certified & NIS',
      experience: '8 Years Bowling Coaching • Fast Bowling Specialist',
      phone: '+91 98400 22002',
      shift: '06:00 AM - 10:00 AM',
      salary: 32000,
      payoutStatus: 'Pending (Due Nov 5)',
      present: true,
      assignedBatches: 'U-16 Elite & U-14 Foundation Pace Bowlers',
      assignedDrills: [
        'Target Bowling & Seam Position Net Session',
        'Yorker & Bouncer Execution in Nets A & B',
      ],
      attendanceLog: [
        { date: '04 Nov 2026', status: 'Present (On Duty)' },
        { date: '03 Nov 2026', status: 'Present (On Duty)' },
        { date: '02 Nov 2026', status: 'Present (On Duty)' },
      ],
    },
    {
      id: 3,
      name: 'Ashish KP',
      role: 'Batting Coach & Biomechanics',
      badge: 'BCCI Level 2',
      experience: '10 Years Batting Specialist • Video Analysis Expert',
      phone: '+91 98400 33003',
      shift: '03:30 PM - 07:30 PM',
      salary: 35000,
      payoutStatus: 'Paid for Oct',
      present: true,
      assignedBatches: 'U-16 Evening Elite & U-19 Batsmen',
      assignedDrills: [
        'Short-Ball Pull & Hook Practice against Bowling Machine',
        'Spin Bowling Footwork & Sweep Shots',
      ],
      attendanceLog: [
        { date: '04 Nov 2026', status: 'Present (On Duty)' },
        { date: '03 Nov 2026', status: 'Present (On Duty)' },
      ],
    },
    {
      id: 4,
      name: 'Mohit Rao',
      role: 'Strength & Conditioning Trainer',
      badge: 'CSCS Level 2 & Sports Physio',
      experience: '6 Years High Performance Athletic Conditioning',
      phone: '+91 98400 44004',
      shift: '05:30 AM - 09:30 AM',
      salary: 28000,
      payoutStatus: 'Paid for Oct',
      present: true,
      assignedBatches: 'All Academy Batches (Fitness & Agility)',
      assignedDrills: [
        'Yo-Yo Conditioning & Agility Ladders',
        'Shoulder Pre-hab & Core Strength Session',
      ],
      attendanceLog: [
        { date: '04 Nov 2026', status: 'Present (On Duty)' },
        { date: '03 Nov 2026', status: 'Present (On Duty)' },
      ],
    },
  ])

  // Support staff
  const [supportStaff, setSupportStaff] = useState([
    { id: 101, name: 'Senthil Nathan', role: 'Academy Administrator', phone: '+91 98400 55005', salary: 22000, status: 'Active' },
    { id: 102, name: 'Babu K.', role: 'Kit Manager & Bowling Machine Operator', phone: '+91 98400 66006', salary: 16000, status: 'Active' },
  ])

  // =========================================================================
  // 3. DRILLS SCHEDULE & HISTORY STATE
  // =========================================================================
  const [selectedDrillDate, setSelectedDrillDate] = useState('04 Nov 2026')

  // Drills repository mapped by date
  const [drillsByDate, setDrillsByDate] = useState({
    '04 Nov 2026': [
      {
        id: 'd1',
        time: '06:00 AM - 07:00 AM',
        title: 'Yo-Yo Conditioning & Agility Ladders',
        venue: 'Main Ground Outfield',
        coach: 'Mohit Rao (S&C Trainer)',
        batch: 'U-19 & U-16 Squads',
        focus: 'Endurance, stamina & speed deceleration',
      },
      {
        id: 'd2',
        time: '07:00 AM - 08:15 AM',
        title: 'Target Bowling & Seam Position Net Session',
        venue: 'Turf Nets A & B',
        coach: 'Rahul Sharma (Pace Coach)',
        batch: 'Pace & Spin Bowlers',
        focus: 'Hitting top of off-stump on good length',
      },
      {
        id: 'd3',
        time: '08:15 AM - 09:00 AM',
        title: 'Short-Ball Pull & Hook Practice against Bowling Machine',
        venue: 'Turf Net C (Automated Machine)',
        coach: 'Ashish KP (Batting Coach)',
        batch: 'Top-Order Batsmen',
        focus: 'Swiveling weight transfer & keeping ball down',
      },
      {
        id: 'd4',
        time: '04:30 PM - 06:30 PM',
        title: '20-Over Center Turf Match Simulation',
        venue: 'Center Turf Wicket (Red Soil)',
        coach: 'Arjun Verma (Head Coach)',
        batch: 'Elite Match Squad',
        focus: 'Powerplay strike rotation & death bowling',
      },
    ],
    '03 Nov 2026': [
      {
        id: 'd-03-1',
        time: '06:00 AM - 07:15 AM',
        title: 'Sprint Acceleration & Slip Cordon Reflexes',
        venue: 'Main Ground Outfield',
        coach: 'Mohit Rao (S&C Trainer)',
        batch: 'U-16 & U-19 Squads',
        focus: 'Reaction time & low slip catching',
      },
      {
        id: 'd-03-2',
        time: '07:15 AM - 08:30 AM',
        title: 'Middle-Overs Spin Bowling Attack & Sweeps',
        venue: 'Turf Nets A & B',
        coach: 'Arjun Verma (Head Coach)',
        batch: 'All Batsmen & Spinners',
        focus: 'Paddle sweep & reverse sweep execution',
      },
      {
        id: 'd-03-3',
        time: '04:30 PM - 06:00 PM',
        title: 'Death Overs Power Hitting & Range Clearance',
        venue: 'Center Turf Wicket',
        coach: 'Ashish KP (Batting Coach)',
        batch: 'Middle-Order & Finishers',
        focus: 'Base stability, high backlift & clearing boundary',
      },
    ],
    '02 Nov 2026': [
      {
        id: 'd-02-1',
        time: '06:00 AM - 07:30 AM',
        title: 'Front-Foot Defense & Straight Driving on Red Soil',
        venue: 'Turf Nets A & B',
        coach: 'Ashish KP (Batting Coach)',
        batch: 'Top-Order Batsmen',
        focus: 'Presenting full face of the bat & high elbow',
      },
      {
        id: 'd-02-2',
        time: '07:30 AM - 08:45 AM',
        title: 'Left-Arm Angle & Late Inswing Release Point Analysis',
        venue: 'Turf Net C',
        coach: 'Rahul Sharma (Pace Coach)',
        batch: 'Fast Bowlers',
        focus: 'Wrist alignment behind seam & follow-through',
      },
      {
        id: 'd-02-3',
        time: '04:30 PM - 06:15 PM',
        title: 'High Boundary Catching under Floodlights with Tennis Racket',
        venue: 'Main Outfield',
        coach: 'Mohit Rao (S&C Trainer)',
        batch: 'All Academy Batches',
        focus: 'Calling early, judging trajectory & reverse cup',
      },
    ],
    '01 Nov 2026': [
      {
        id: 'd-01-1',
        time: '06:00 AM - 07:15 AM',
        title: 'Cone Shuttle Runs & Fast Bowling Stamina Drills',
        venue: 'Main Outfield',
        coach: 'Mohit Rao (S&C Trainer)',
        batch: 'Pace Bowling Squad',
        focus: 'Deceleration balance & core stability',
      },
      {
        id: 'd-01-2',
        time: '07:15 AM - 08:30 AM',
        title: 'Target Bowling: Hitting Top of Off-Stump Target Cones',
        venue: 'Turf Nets A & B',
        coach: 'Rahul Sharma (Pace Coach)',
        batch: 'Pace & Spin Bowlers',
        focus: 'Consistency in 6-meter good length channel',
      },
      {
        id: 'd-01-3',
        time: '04:30 PM - 06:00 PM',
        title: 'Running Between Wickets & Direct Hit Target Throws',
        venue: 'Center Turf Wicket',
        coach: 'Arjun Verma (Head Coach)',
        batch: 'All Batches',
        focus: 'Loud calling communication & sharp 180-degree turns',
      },
    ],
    '31 Oct 2026': [
      {
        id: 'd-31-1',
        time: '06:00 AM - 07:30 AM',
        title: 'Leg-Spin Grip, Wrong\'un & Top-Spinner Variations',
        venue: 'Turf Net B',
        coach: 'Arjun Verma (Head Coach)',
        batch: 'Spin Bowlers & Wicketkeepers',
        focus: 'Revolutions on seam & subtle release variations',
      },
      {
        id: 'd-31-2',
        time: '07:30 AM - 08:45 AM',
        title: 'Bouncer Ducking & Weaving against Short Pitch Bowling',
        venue: 'Turf Net C (Bowling Machine)',
        coach: 'Ashish KP (Batting Coach)',
        batch: 'Top-Order Batsmen',
        focus: 'Eyes on ball, soft hands & evasion technique',
      },
      {
        id: 'd-31-3',
        time: '04:30 PM - 06:30 PM',
        title: 'Match Pressure Scenario: 36 Runs Needed off 18 Balls',
        venue: 'Center Turf Wicket',
        coach: 'Arjun Verma (Head Coach)',
        batch: 'Elite Match Squad',
        focus: 'Strike rotation, finding gaps & execution under pressure',
      },
    ],
  })

  // State to toggle preview of standard drills
  const [showStandardPreview, setShowStandardPreview] = useState(false)

  // 1-Click: Apply a single individual drill directly to Today (04 Nov 2026)
  const applySingleDrillToToday = (drill) => {
    const todayKey = '04 Nov 2026'
    const newDrill = {
      ...drill,
      id: `d-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    }
    setDrillsByDate((prev) => ({
      ...prev,
      [todayKey]: [...(prev[todayKey] || []), newDrill],
    }))
    triggerToast(`⚡ Instant Applied "${drill.title}" to Today (${todayKey})!`)
  }

  // 1-Click: Duplicate drill to current date
  const duplicateDrillToCurrent = (drill) => {
    const newDrill = {
      ...drill,
      id: `d-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title: `${drill.title} (Repeated)`,
    }
    setDrillsByDate((prev) => ({
      ...prev,
      [selectedDrillDate]: [...(prev[selectedDrillDate] || []), newDrill],
    }))
    triggerToast(`📋 Duplicated "${drill.title}" for ${selectedDrillDate}!`)
  }

  // 1-Click: Copy all drills from a specific date to Today (04 Nov 2026)
  const copyDayDrillsToToday = (fromDate) => {
    const todayKey = '04 Nov 2026'
    const sourceDrills = drillsByDate[fromDate] || []
    if (sourceDrills.length === 0) {
      triggerToast(`No drills found on ${fromDate} to copy.`)
      return
    }
    const cloned = sourceDrills.map((d, idx) => ({
      ...d,
      id: `d-${Date.now()}-${idx}`,
    }))
    setDrillsByDate((prev) => ({
      ...prev,
      [todayKey]: [...(prev[todayKey] || []), ...cloned],
    }))
    triggerToast(`⚡ Copied all ${sourceDrills.length} drills from ${fromDate} to Today (${todayKey})!`)
  }

  // 1-Click: Copy standard drills to a target date
  const applyStandardDrillsToDate = (targetDate) => {
    const cloned = STANDARD_ACADEMY_DRILLS.map((d, idx) => ({
      ...d,
      id: `d-${Date.now()}-${idx}`,
    }))
    setDrillsByDate((prev) => ({
      ...prev,
      [targetDate]: cloned,
    }))
    triggerToast(`🔁 Applied standard curriculum (4 drills) to ${targetDate}!`)
  }

  // 1-Click: Copy drills from chosen date to the currently selected date
  const copyDrillsFromDateToSelected = (sourceDate) => {
    const sourceDrills = drillsByDate[sourceDate] || []
    if (sourceDrills.length === 0) {
      triggerToast(`No drills found on ${sourceDate}.`)
      return
    }
    const cloned = sourceDrills.map((d, idx) => ({
      ...d,
      id: `d-${Date.now()}-${idx}`,
    }))
    setDrillsByDate((prev) => ({
      ...prev,
      [selectedDrillDate]: [...(prev[selectedDrillDate] || []), ...cloned],
    }))
    triggerToast(`📋 Copied ${sourceDrills.length} drills from ${sourceDate} to ${selectedDrillDate}!`)
  }

  // Current displayed drills
  const currentDrills = drillsByDate[selectedDrillDate] || []

  // 1-Click: Repeat yesterday's drills today
  const handleRepeatDrillsToday = () => {
    const standardDrills = [
      {
        id: `d-${Date.now()}-1`,
        time: '06:00 AM - 07:00 AM',
        title: 'Yo-Yo Conditioning & Agility Ladders',
        venue: 'Main Ground Outfield',
        coach: 'Mohit Rao (S&C Trainer)',
        batch: 'U-19 & U-16 Squads',
        focus: 'Endurance, stamina & speed deceleration',
      },
      {
        id: `d-${Date.now()}-2`,
        time: '07:00 AM - 08:15 AM',
        title: 'Target Bowling & Seam Position Net Session',
        venue: 'Turf Nets A & B',
        coach: 'Rahul Sharma (Pace Coach)',
        batch: 'Pace & Spin Bowlers',
        focus: 'Hitting top of off-stump on good length',
      },
      {
        id: `d-${Date.now()}-3`,
        time: '08:15 AM - 09:00 AM',
        title: 'Short-Ball Pull & Hook Practice against Bowling Machine',
        venue: 'Turf Net C (Automated Machine)',
        coach: 'Ashish KP (Batting Coach)',
        batch: 'Top-Order Batsmen',
        focus: 'Swiveling weight transfer & keeping ball down',
      },
      {
        id: `d-${Date.now()}-4`,
        time: '04:30 PM - 06:30 PM',
        title: '20-Over Center Turf Match Simulation',
        venue: 'Center Turf Wicket (Red Soil)',
        coach: 'Arjun Verma (Head Coach)',
        batch: 'Elite Match Squad',
        focus: 'Powerplay strike rotation & death bowling',
      },
    ]

    setDrillsByDate((prev) => ({
      ...prev,
      [selectedDrillDate]: standardDrills,
    }))
    triggerToast(`🔁 Repeated standard daily drills for ${selectedDrillDate}!`)
  }

  // =========================================================================
  // 4. ACADEMY FINANCIAL ACCOUNTS & TRANSACTIONS LEDGER
  // =========================================================================
  const [academyTransactions, setAcademyTransactions] = useState([
    {
      id: 'tx-1',
      date: '04 Nov 2026',
      desc: 'Tuition Fee Received: Rohit Sharma (U-19 Pro High Performance)',
      category: 'Student Tuition Fee',
      type: 'credit',
      amount: 3000,
      mode: 'UPI QR Scan',
      ref: 'REC-9912',
    },
    {
      id: 'tx-2',
      date: '04 Nov 2026',
      desc: 'Tuition Fee Received: Kavya Raman (U-16 Evening Elite)',
      category: 'Student Tuition Fee',
      type: 'credit',
      amount: 3000,
      mode: 'UPI QR Scan',
      ref: 'REC-9913',
    },
    {
      id: 'tx-3',
      date: '03 Nov 2026',
      desc: 'Tuition Fee Received: Divya Patel (U-16 Evening Elite)',
      category: 'Student Tuition Fee',
      type: 'credit',
      amount: 3000,
      mode: 'Online NEFT',
      ref: 'REC-9914',
    },
    {
      id: 'tx-4',
      date: '02 Nov 2026',
      desc: 'Tuition Fee Received: Sai Teja (U-19 Pro High Performance)',
      category: 'Student Tuition Fee',
      type: 'credit',
      amount: 3000,
      mode: 'UPI QR Scan',
      ref: 'REC-9915',
    },
    {
      id: 'tx-5',
      date: '02 Nov 2026',
      desc: 'Coach Salary Payout: Arjun Verma (Head Coach & Director)',
      category: 'Coach & Staff Salaries',
      type: 'debit',
      amount: 45000,
      mode: 'Bank NEFT',
      ref: 'SAL-COACH-101',
    },
    {
      id: 'tx-6',
      date: '01 Nov 2026',
      desc: 'Box of 12 SG Club White Leather Match Balls (4 Boxes)',
      category: 'Cricket Gear & Equipment',
      type: 'debit',
      amount: 14400,
      mode: 'Card / POS',
      ref: 'GEAR-7712',
    },
    {
      id: 'tx-7',
      date: '01 Nov 2026',
      desc: 'Turf Nets & Practice Ground Monthly Rental Lease (Nov 2026)',
      category: 'Turf & Facility Rent',
      type: 'debit',
      amount: 25000,
      mode: 'Direct Bank Transfer',
      ref: 'RENT-NOV-01',
    },
    {
      id: 'tx-8',
      date: '30 Oct 2026',
      desc: 'Physiotherapy Cold Sprays, Strapping Tapes & First Aid Kit',
      category: 'Medical & Physio',
      type: 'debit',
      amount: 3800,
      mode: 'UPI',
      ref: 'MED-4412',
    },
  ])

  // Real-time financial calculations
  const totalAcademyInflow = academyTransactions
    .filter((t) => t.type === 'credit')
    .reduce((acc, t) => acc + t.amount, 0)

  const totalAcademyOutflow = academyTransactions
    .filter((t) => t.type === 'debit')
    .reduce((acc, t) => acc + t.amount, 0)

  const netAcademySurplus = totalAcademyInflow - totalAcademyOutflow

  // =========================================================================
  // 5. 1-CLICK: MARK THIS MONTH FEE PAID DIRECTLY FOR STUDENT
  // =========================================================================
  const markStudentFeePaid = (student) => {
    const newReceiptNo = `REC-${Math.floor(1000 + Math.random() * 9000)}`

    // 1. Update Student record
    setStudents((prev) =>
      prev.map((s) =>
        s.id === student.id
          ? {
              ...s,
              feeStatus: 'Paid',
              receiptNo: newReceiptNo,
            }
          : s
      )
    )

    // 2. Automatically log Inflow (Credit) in the Academy Accounts Ledger!
    const newTx = {
      id: `tx-${Date.now()}`,
      date: '04 Nov 2026',
      desc: `Tuition Fee Received: ${student.name} (${student.batch})`,
      category: 'Student Tuition Fee',
      type: 'credit',
      amount: student.feeAmount,
      mode: 'UPI / Cash Counter',
      ref: newReceiptNo,
    }

    setAcademyTransactions((prev) => [newTx, ...prev])

    triggerToast(`✓ Marked ₹${student.feeAmount.toLocaleString()} paid for ${student.name}! Added to Accounts Ledger (Ref: ${newReceiptNo}).`)

    if (selectedStudentView && selectedStudentView.id === student.id) {
      setSelectedStudentView((prev) => ({
        ...prev,
        feeStatus: 'Paid',
        receiptNo: newReceiptNo,
      }))
    }
  }

  // 1-Click: Disburse Coach Payout
  const disburseCoachPayout = (coach) => {
    setCoaches((prev) =>
      prev.map((c) =>
        c.id === coach.id
          ? {
              ...c,
              payoutStatus: 'Paid (Disbursed)',
            }
          : c
      )
    )

    // Log Debit in Academy Ledger
    const debitTx = {
      id: `tx-${Date.now()}`,
      date: '04 Nov 2026',
      desc: `Coach Salary Payout: ${coach.name} (${coach.role})`,
      category: 'Coach & Staff Salaries',
      type: 'debit',
      amount: coach.salary,
      mode: 'Bank NEFT',
      ref: `SAL-COACH-${Math.floor(100 + Math.random() * 900)}`,
    }

    setAcademyTransactions((prev) => [debitTx, ...prev])
    triggerToast(`💸 Disbursed ₹${coach.salary.toLocaleString()} to ${coach.name}! Logged in Academy Ledger.`)

    if (selectedCoachView && selectedCoachView.id === coach.id) {
      setSelectedCoachView((prev) => ({
        ...prev,
        payoutStatus: 'Paid (Disbursed)',
      }))
    }
  }

  // =========================================================================
  // 6. DEDICATED INDIVIDUAL PAGE VIEWS (No popup windows per user requirement!)
  // =========================================================================
  const [selectedStudentView, setSelectedStudentView] = useState(null)
  const [selectedCoachView, setSelectedCoachView] = useState(null)
  const [showAdmitPage, setShowAdmitPage] = useState(false)
  const [showAddCoachPage, setShowAddCoachPage] = useState(false)
  const [showAddDrillPage, setShowAddDrillPage] = useState(false)
  const [showRecordExpensePage, setShowRecordExpensePage] = useState(false)
  const [showStatementPage, setShowStatementPage] = useState(false)

  // Forms
  const [admitForm, setAdmitForm] = useState({
    name: '',
    age: '',
    ageGroup: 'u16',
    batch: 'U-16 Evening Elite',
    role: 'All-Rounder',
    battingStance: 'Right Hand Bat',
    bowlingAction: 'Right-arm Fast (Express Seam)',
    competitionTier: 'District Player (DCA)',
    guardianName: '',
    guardianPhone: '',
    monthlyFee: 3000,
  })

  const [coachForm, setCoachForm] = useState({
    name: '',
    role: 'Batting Coach & Biomechanics',
    badge: 'BCCI Level 2',
    experience: '6 Years Coaching Experience',
    phone: '',
    shift: 'Morning (06:00 AM - 10:00 AM)',
    salary: 30000,
  })

  const [drillForm, setDrillForm] = useState({
    time: '06:00 AM - 07:30 AM',
    title: '',
    venue: 'Turf Nets A & B',
    coach: 'Arjun Verma (Head Coach)',
    batch: 'U-16 & U-19 Squads',
    focus: '',
  })

  const [expenseForm, setExpenseForm] = useState({
    category: 'Cricket Gear & Equipment',
    desc: '',
    amount: '',
    mode: 'UPI / Online',
  })

  // Handle Admission Submit
  const handleAdmitStudent = (e) => {
    e.preventDefault()
    if (!admitForm.name || !admitForm.guardianPhone) {
      alert('Please enter student name and guardian phone!')
      return
    }

    const newId = `SH-2026-${Math.floor(100 + Math.random() * 900)}`
    const newStudent = {
      id: Date.now(),
      studentId: newId,
      name: admitForm.name,
      age: Number(admitForm.age) || 15,
      ageGroup: admitForm.ageGroup,
      batch: admitForm.batch,
      role: admitForm.role,
      battingStance: admitForm.battingStance,
      bowlingAction: admitForm.bowlingAction,
      competitionTier: admitForm.competitionTier,
      guardianName: admitForm.guardianName || 'Guardian',
      guardianPhone: admitForm.guardianPhone,
      attendanceRate: '100.0%',
      attendanceToday: 'present',
      feeStatus: 'Overdue',
      feeAmount: Number(admitForm.monthlyFee) || 3000,
      dueDate: '05 Nov 2026',
      receiptNo: '',
      yoyoScore: 17.5,
      sprint30m: '3.90s',
      coachNote: 'New academy admission. Initial skills assessment completed.',
      isVerified: true,
      academyCertified: true,
      matches: 0,
      innings: 0,
      runs: 0,
      highScore: '0',
      battingAvg: '0.0',
      strikeRate: '0.0',
      wickets: 0,
      bestBowling: '-',
      economy: '-',
      catches: 0,
      recentInnings: [],
      attendanceHistory: [
        { date: '04 Nov 2026', status: 'Present', session: 'First Academy Session' },
      ],
    }

    setStudents((prev) => [newStudent, ...prev])
    setShowAdmitPage(false)
    triggerToast(`Student ${newStudent.name} admitted with ID ${newId}!`)
  }

  // Handle Add Coach Submit
  const handleAddCoach = (e) => {
    e.preventDefault()
    if (!coachForm.name || !coachForm.phone) {
      alert('Please fill coach name and phone!')
      return
    }

    const newCoach = {
      id: Date.now(),
      name: coachForm.name,
      role: coachForm.role,
      badge: coachForm.badge,
      experience: coachForm.experience,
      phone: coachForm.phone,
      shift: coachForm.shift,
      salary: Number(coachForm.salary) || 30000,
      payoutStatus: 'Pending (New Joining)',
      present: true,
      assignedBatches: 'All Academy Batches',
      assignedDrills: ['Batting & Fielding Drills'],
      attendanceLog: [
        { date: '04 Nov 2026', status: 'Present (On Duty)' },
      ],
    }

    setCoaches((prev) => [...prev, newCoach])
    setShowAddCoachPage(false)
    triggerToast(`Coach ${newCoach.name} added to master roster!`)
  }

  // Handle Add Drill
  const handleAddDrill = (e) => {
    e.preventDefault()
    if (!drillForm.title) return

    const newDrill = {
      id: `d-${Date.now()}`,
      time: drillForm.time,
      title: drillForm.title,
      venue: drillForm.venue,
      coach: drillForm.coach,
      batch: drillForm.batch,
      focus: drillForm.focus || 'Technical execution & fitness',
    }

    setDrillsByDate((prev) => ({
      ...prev,
      [selectedDrillDate]: [...(prev[selectedDrillDate] || []), newDrill],
    }))

    setShowAddDrillPage(false)
    setDrillForm({
      time: '06:00 AM - 07:30 AM',
      title: '',
      venue: 'Turf Nets A & B',
      coach: 'Arjun Verma (Head Coach)',
      batch: 'U-16 & U-19 Squads',
      focus: '',
    })
    triggerToast(`Added training drill to ${selectedDrillDate}!`)
  }

  // Handle Add Expense
  const handleAddExpense = (e) => {
    e.preventDefault()
    if (!expenseForm.desc || !expenseForm.amount) return

    const newExp = {
      id: `tx-${Date.now()}`,
      date: '04 Nov 2026',
      desc: expenseForm.desc,
      category: expenseForm.category,
      type: 'debit',
      amount: Number(expenseForm.amount),
      mode: expenseForm.mode,
      ref: `EXP-${Math.floor(1000 + Math.random() * 9000)}`,
    }

    setAcademyTransactions((prev) => [newExp, ...prev])
    setShowRecordExpensePage(false)
    setExpenseForm({
      category: 'Cricket Gear & Equipment',
      desc: '',
      amount: '',
      mode: 'UPI / Online',
    })
    triggerToast(`Logged operational expense of ₹${newExp.amount.toLocaleString()} in Accounts!`)
  }


  // =========================================================================
  // DEDICATED PAGE VIEWS (No popup windows per user requirement!)
  // =========================================================================

  // 1. DEDICATED STUDENT ATHLETE PASSPORT PAGE
  if (selectedStudentView) {
    return (
      <Screen
        back
        onBack={() => setSelectedStudentView(null)}
        title={selectedStudentView.name}
        subtitle={`Athlete Passport • Batch: ${selectedStudentView.batch}`}
      >
        <div style={{ maxWidth: 960, margin: '0 auto', paddingBottom: 80 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <button
              type="button"
              onClick={() => setSelectedStudentView(null)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 16px',
                borderRadius: 10,
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#f8fafc',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ← Back</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  fontSize: 12,
                  color: '#00e676',
                  fontWeight: 800,
                  padding: '4px 10px',
                  borderRadius: 8,
                  background: 'rgba(0, 230, 118, 0.1)',
                  border: '1px solid rgba(0, 230, 118, 0.25)',
                }}
              >
                ✓ Academy Certified Athlete
              </span>
              <button
                type="button"
                onClick={() => window.print()}
                style={{
                  padding: '8px 12px',
                  borderRadius: 10,
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#f8fafc',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                <Printer size={15} /> Print Passport
              </button>
            </div>
          </div>

          {/* Student Hero Header Banner */}
          <div
            style={{
              padding: '20px 24px',
              borderRadius: 16,
              background: 'linear-gradient(135deg, rgba(124, 77, 255, 0.15), rgba(0, 176, 255, 0.1))',
              border: '1px solid rgba(124, 77, 255, 0.3)',
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div
                style={{
                  width: 68,
                  height: 68,
                  borderRadius: 16,
                  background: 'linear-gradient(135deg, #7c4dff, #00b0ff)',
                  color: '#fff',
                  display: 'grid',
                  placeItems: 'center',
                  fontWeight: 900,
                  fontSize: 28,
                  boxShadow: '0 8px 24px rgba(124, 77, 255, 0.4)',
                }}
              >
                {selectedStudentView.name.charAt(0)}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <h1 style={{ fontSize: 24, fontWeight: 900, color: '#f8fafc', margin: 0 }}>
                    {selectedStudentView.name}
                  </h1>
                  <span
                    style={{
                      fontSize: 11,
                      padding: '3px 8px',
                      borderRadius: 6,
                      background: '#7c4dff',
                      color: '#fff',
                      fontWeight: 800,
                    }}
                  >
                    {selectedStudentView.studentId}
                  </span>
                </div>
                <div style={{ fontSize: 14, color: '#38bdf8', fontWeight: 700, marginTop: 4 }}>
                  {selectedStudentView.role} • {selectedStudentView.age} Years Old
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                  Enrolled Batch: <strong style={{ color: '#ffc83d' }}>{selectedStudentView.batch}</strong> • Aadhaar Waived (Academy Endorsed)
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a
                href={`tel:${selectedStudentView.guardianPhone}`}
                style={{
                  padding: '10px 18px',
                  borderRadius: 10,
                  background: 'rgba(0, 176, 255, 0.2)',
                  border: '1px solid rgba(0, 176, 255, 0.4)',
                  color: '#00b0ff',
                  fontWeight: 800,
                  fontSize: 13,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <Phone size={16} /> Call Guardian ({selectedStudentView.guardianPhone})
              </a>
            </div>
          </div>

          {/* Playing Technical Specifications */}
          <div
            style={{
              padding: '18px 20px',
              borderRadius: 14,
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: 20,
            }}
          >
            <h3 style={{ fontSize: 13, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>
              Player Technical Profile & Playing Style
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
              <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <span style={{ fontSize: 11, color: 'var(--muted)', display: 'block' }}>Batting Stance</span>
                <strong style={{ fontSize: 15, color: '#f8fafc', marginTop: 2, display: 'block' }}>{selectedStudentView.battingStance}</strong>
              </div>
              <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <span style={{ fontSize: 11, color: 'var(--muted)', display: 'block' }}>Bowling Action</span>
                <strong style={{ fontSize: 15, color: '#38bdf8', marginTop: 2, display: 'block' }}>{selectedStudentView.bowlingAction}</strong>
              </div>
              <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <span style={{ fontSize: 11, color: 'var(--muted)', display: 'block' }}>Competition Level</span>
                <strong style={{ fontSize: 15, color: '#00e676', marginTop: 2, display: 'block' }}>{selectedStudentView.competitionTier}</strong>
              </div>
              <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <span style={{ fontSize: 11, color: 'var(--muted)', display: 'block' }}>Academy Registration</span>
                <strong style={{ fontSize: 15, color: '#e879f9', marginTop: 2, display: 'block' }}>Enrolled & Certified</strong>
              </div>
            </div>
          </div>

          {/* Integrated Match Statistics */}
          <div
            style={{
              padding: '18px 20px',
              borderRadius: 14,
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: 20,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h3 style={{ fontSize: 13, fontWeight: 800, color: '#ffc83d', textTransform: 'uppercase', letterSpacing: 0.5, margin: 0 }}>
                Live Match Statistics (Integrated Player Hub)
              </h3>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>Synchronized across academy fixtures</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10, textAlign: 'center' }}>
              <div style={{ padding: '12px 8px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700 }}>MATCHES</span>
                <strong style={{ fontSize: 20, color: '#f8fafc', display: 'block', marginTop: 4 }}>{selectedStudentView.matches}</strong>
              </div>
              <div style={{ padding: '12px 8px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700 }}>RUNS</span>
                <strong style={{ fontSize: 20, color: '#00e676', display: 'block', marginTop: 4 }}>{selectedStudentView.runs}</strong>
              </div>
              <div style={{ padding: '12px 8px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700 }}>BATTING AVG</span>
                <strong style={{ fontSize: 20, color: '#38bdf8', display: 'block', marginTop: 4 }}>{selectedStudentView.battingAvg}</strong>
              </div>
              <div style={{ padding: '12px 8px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700 }}>WICKETS</span>
                <strong style={{ fontSize: 20, color: '#e879f9', display: 'block', marginTop: 4 }}>{selectedStudentView.wickets}</strong>
              </div>
            </div>

            {/* Recent Match Innings Breakdown */}
            {selectedStudentView.recentInnings && selectedStudentView.recentInnings.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase' }}>
                  Recent Tournament Innings
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 10, marginTop: 8 }}>
                  {selectedStudentView.recentInnings.map((inn, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '12px 14px',
                        background: 'rgba(255,255,255,0.02)',
                        borderRadius: 8,
                        border: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ fontSize: 13, color: '#f8fafc', fontWeight: 600 }}>{inn.fixture}</span>
                      <strong style={{ fontSize: 13, color: '#00e676' }}>{inn.score}</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Athleticism & Physical Benchmarks */}
          <div
            style={{
              padding: '18px 20px',
              borderRadius: 14,
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: 20,
            }}
          >
            <h3 style={{ fontSize: 13, fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>
              Physical Fitness & Conditioning Benchmarks
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              <div style={{ padding: '14px 16px', borderRadius: 10, background: 'rgba(0, 230, 118, 0.05)', border: '1px solid rgba(0, 230, 118, 0.2)' }}>
                <span style={{ fontSize: 11, color: 'var(--muted)', display: 'block' }}>Attendance Rate</span>
                <strong style={{ fontSize: 18, color: '#00e676', display: 'block', marginTop: 2 }}>{selectedStudentView.attendanceRate}</strong>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>Consecutive regular sessions</span>
              </div>
              <div style={{ padding: '14px 16px', borderRadius: 10, background: 'rgba(255, 200, 61, 0.05)', border: '1px solid rgba(255, 200, 61, 0.2)' }}>
                <span style={{ fontSize: 11, color: 'var(--muted)', display: 'block' }}>Yo-Yo Test Score</span>
                <strong style={{ fontSize: 18, color: '#ffc83d', display: 'block', marginTop: 2 }}>{selectedStudentView.yoyoScore}</strong>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>State tournament qualification tier</span>
              </div>
              <div style={{ padding: '14px 16px', borderRadius: 10, background: 'rgba(0, 176, 255, 0.05)', border: '1px solid rgba(0, 176, 255, 0.2)' }}>
                <span style={{ fontSize: 11, color: 'var(--muted)', display: 'block' }}>30m Sprint Acceleration</span>
                <strong style={{ fontSize: 18, color: '#00b0ff', display: 'block', marginTop: 2 }}>{selectedStudentView.sprint30m}</strong>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>Elite boundary running benchmark</span>
              </div>
            </div>
          </div>

          {/* Tuition Fee Management Card */}
          <div
            style={{
              padding: '20px 24px',
              borderRadius: 16,
              background: selectedStudentView.feeStatus === 'Paid'
                ? 'rgba(0, 230, 118, 0.08)'
                : 'rgba(255, 59, 80, 0.08)',
              border: selectedStudentView.feeStatus === 'Paid'
                ? '1px solid rgba(0, 230, 118, 0.3)'
                : '1px solid rgba(255, 59, 80, 0.35)',
              marginBottom: 20,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div>
              <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase' }}>
                Tuition Fee Payment Record • November 2026
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
                <strong
                  style={{
                    fontSize: 20,
                    color: selectedStudentView.feeStatus === 'Paid' ? '#00e676' : '#ff3b50',
                  }}
                >
                  {selectedStudentView.feeStatus === 'Paid' ? 'PAID FOR NOVEMBER 2026' : 'PAYMENT OVERDUE / PENDING'}
                </strong>
                <span style={{ fontSize: 16, color: '#f8fafc', fontWeight: 700 }}>
                  ₹{selectedStudentView.feeAmount.toLocaleString()}
                </span>
              </div>
              {selectedStudentView.receiptNo ? (
                <div style={{ fontSize: 12, color: '#38bdf8', marginTop: 4 }}>
                  Verified Receipt ID: <strong>{selectedStudentView.receiptNo}</strong> (Synchronized in Academy Ledger)
                </div>
              ) : (
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                  Monthly tuition fee is due at the beginning of the training cycle.
                </div>
              )}
            </div>

            <div>
              {selectedStudentView.feeStatus === 'Overdue' ? (
                <button
                  type="button"
                  onClick={() => markStudentFeePaid(selectedStudentView)}
                  style={{
                    padding: '12px 24px',
                    borderRadius: 10,
                    background: '#00e676',
                    border: 'none',
                    color: '#020617',
                    fontWeight: 900,
                    fontSize: 14,
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(0, 230, 118, 0.35)',
                  }}
                >
                  💳 Mark This Month Fee Paid (₹{selectedStudentView.feeAmount.toLocaleString()})
                </button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#00e676', fontSize: 14, fontWeight: 900 }}>
                  <span>✓ Fee Up to Date</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Screen>
    )
  }

  // 2. DEDICATED COACH PROFILE & PAYOUT PAGE
  if (selectedCoachView) {
    return (
      <Screen
        back
        onBack={() => setSelectedCoachView(null)}
        title={selectedCoachView.name}
        subtitle={`${selectedCoachView.role} • ${selectedCoachView.badge}`}
      >
        <div style={{ maxWidth: 960, margin: '0 auto', paddingBottom: 80 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <button
              type="button"
              onClick={() => setSelectedCoachView(null)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 16px',
                borderRadius: 10,
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#f8fafc',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ← Back</button>
            <span
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: selectedCoachView.present ? '#00e676' : '#ff3b50',
                background: selectedCoachView.present ? 'rgba(0,230,118,0.15)' : 'rgba(255,59,80,0.15)',
                padding: '4px 10px',
                borderRadius: 8,
                border: selectedCoachView.present ? '1px solid rgba(0,230,118,0.3)' : '1px solid rgba(255,59,80,0.3)',
              }}
            >
              {selectedCoachView.present ? 'PRESENT (ON DUTY)' : 'OFF DUTY'}
            </span>
          </div>

          <div
            style={{
              padding: '20px 24px',
              borderRadius: 16,
              background: 'linear-gradient(135deg, rgba(124, 77, 255, 0.15), rgba(0, 176, 255, 0.1))',
              border: '1px solid rgba(124, 77, 255, 0.3)',
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div
                style={{
                  width: 68,
                  height: 68,
                  borderRadius: 16,
                  background: 'linear-gradient(135deg, #7c4dff, #00b0ff)',
                  color: '#fff',
                  display: 'grid',
                  placeItems: 'center',
                  fontWeight: 900,
                  fontSize: 28,
                  boxShadow: '0 8px 24px rgba(124, 77, 255, 0.4)',
                }}
              >
                {selectedCoachView.name.charAt(0)}
              </div>
              <div>
                <h1 style={{ fontSize: 24, fontWeight: 900, color: '#f8fafc', margin: 0 }}>
                  {selectedCoachView.name}
                </h1>
                <div style={{ fontSize: 14, color: '#38bdf8', fontWeight: 700, marginTop: 4 }}>
                  {selectedCoachView.role} ({selectedCoachView.badge})
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                  {selectedCoachView.experience} • Shift: <strong style={{ color: '#ffc83d' }}>{selectedCoachView.shift}</strong>
                </div>
              </div>
            </div>

            <div>
              <a
                href={`tel:${selectedCoachView.phone}`}
                style={{
                  padding: '10px 18px',
                  borderRadius: 10,
                  background: 'rgba(0, 176, 255, 0.2)',
                  border: '1px solid rgba(0, 176, 255, 0.4)',
                  color: '#00b0ff',
                  fontWeight: 800,
                  fontSize: 13,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <Phone size={16} /> Call Coach ({selectedCoachView.phone})
              </a>
            </div>
          </div>

          <div
            style={{
              padding: '18px 20px',
              borderRadius: 14,
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: 20,
            }}
          >
            <h3 style={{ fontSize: 13, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>
              Shift Attendance & Absence / Presence History
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10 }}>
              {selectedCoachView.attendanceLog?.map((log, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 10,
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: 13, color: '#f8fafc' }}>{log.date}</span>
                  <strong style={{ fontSize: 12, color: log.status.includes('Present') ? '#00e676' : '#ff3b50' }}>
                    {log.status}
                  </strong>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              padding: '18px 20px',
              borderRadius: 14,
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: 20,
            }}
          >
            <h3 style={{ fontSize: 13, fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>
              Assigned Curriculum Drills Conducted
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {selectedCoachView.assignedDrills?.map((dr, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 8,
                    background: 'rgba(0, 176, 255, 0.1)',
                    border: '1px solid rgba(0, 176, 255, 0.25)',
                    fontSize: 12,
                    color: '#38bdf8',
                    fontWeight: 700,
                  }}
                >
                  ✓ {dr}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              padding: '20px 24px',
              borderRadius: 16,
              background: 'rgba(255, 200, 61, 0.08)',
              border: '1px solid rgba(255, 200, 61, 0.3)',
              marginBottom: 20,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div>
              <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase' }}>
                Monthly Compensation & Payout Status
              </span>
              <strong style={{ fontSize: 24, color: '#ffc83d', display: 'block', marginTop: 4 }}>
                ₹{selectedCoachView.salary.toLocaleString()} / month
              </strong>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>
                Status: <strong style={{ color: selectedCoachView.payoutStatus.includes('Paid') ? '#00e676' : '#ffc83d' }}>{selectedCoachView.payoutStatus}</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={() => disburseCoachPayout(selectedCoachView)}
              style={{
                padding: '12px 24px',
                borderRadius: 10,
                background: '#00e676',
                border: 'none',
                color: '#020617',
                fontWeight: 900,
                fontSize: 14,
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(0, 230, 118, 0.35)',
              }}
            >
              💸 Disburse Coach Payout (₹{selectedCoachView.salary.toLocaleString()})
            </button>
          </div>
        </div>
      </Screen>
    )
  }

  // 3. DEDICATED ADMIT STUDENT PAGE
  if (showAdmitPage) {
    return (
      <Screen
        back
        onBack={() => setShowAdmitPage(false)}
        title="Admit New Student"
        subtitle="Academy Enrollment & Athlete Profile Formulation"
      >
        <div style={{ maxWidth: 720, margin: '0 auto', paddingBottom: 80 }}>
          <div style={{ marginBottom: 16 }}>
            <button
              type="button"
              onClick={() => setShowAdmitPage(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 16px',
                borderRadius: 10,
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#f8fafc',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ← Back</button>
          </div>

          <div
            style={{
              background: '#0b1329',
              borderRadius: 16,
              border: '1px solid rgba(124, 77, 255, 0.35)',
              padding: 24,
            }}
          >
            <h2 style={{ fontSize: 20, fontWeight: 900, color: '#f8fafc', margin: '0 0 16px' }}>
              🎓 Academy Student Admission Form
            </h2>

            <form onSubmit={handleAdmitStudent} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 6 }}>
                  Full Student Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Yashasvi Jaiswal"
                  value={admitForm.name}
                  onChange={(e) => setAdmitForm({ ...admitForm, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 10,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#f8fafc',
                    fontSize: 14,
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 6 }}>
                    Age *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 15"
                    value={admitForm.age}
                    onChange={(e) => setAdmitForm({ ...admitForm, age: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 10,
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#f8fafc',
                      fontSize: 14,
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 6 }}>
                    Age Group *
                  </label>
                  <select
                    value={admitForm.ageGroup}
                    onChange={(e) => setAdmitForm({ ...admitForm, ageGroup: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 10,
                      background: '#0b1329',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#f8fafc',
                      fontSize: 14,
                    }}
                  >
                    <option value="u12">Under-12 Grassroots</option>
                    <option value="u14">Under-14 Foundation</option>
                    <option value="u16">Under-16 Elite</option>
                    <option value="u19">Under-19 High Performance</option>
                    <option value="senior">Senior District Squad</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 6 }}>
                  Assigned Training Batch *
                </label>
                <select
                  value={admitForm.batch}
                  onChange={(e) => setAdmitForm({ ...admitForm, batch: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 10,
                    background: '#0b1329',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#f8fafc',
                    fontSize: 14,
                  }}
                >
                  <option value="U-16 Evening Elite">U-16 Evening Elite (04:00 PM - 06:30 PM)</option>
                  <option value="U-19 Pro High Performance">U-19 Pro High Performance (06:00 AM - 08:30 AM)</option>
                  <option value="U-14 Foundation">U-14 Foundation (04:30 PM - 06:00 PM)</option>
                  <option value="Weekend Grassroots Batch">Weekend Grassroots Batch (Sat & Sun 07:00 AM)</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 6 }}>
                    Playing Role
                  </label>
                  <select
                    value={admitForm.role}
                    onChange={(e) => setAdmitForm({ ...admitForm, role: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 10,
                      background: '#0b1329',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#f8fafc',
                      fontSize: 14,
                    }}
                  >
                    <option value="Top-Order Batsman">Top-Order Batsman</option>
                    <option value="Right-arm Fast Bowler">Right-arm Fast Bowler</option>
                    <option value="Left-arm Fast Bowler">Left-arm Fast Bowler</option>
                    <option value="All-Rounder">All-Rounder</option>
                    <option value="Wicketkeeper Batsman">Wicketkeeper Batsman</option>
                    <option value="Leg-Spin Bowler">Leg-Spin Bowler</option>
                    <option value="Off-Spin Bowler">Off-Spin Bowler</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 6 }}>
                    Batting Stance
                  </label>
                  <select
                    value={admitForm.battingStance}
                    onChange={(e) => setAdmitForm({ ...admitForm, battingStance: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 10,
                      background: '#0b1329',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#f8fafc',
                      fontSize: 14,
                    }}
                  >
                    <option value="Right Hand Bat">Right Hand Bat</option>
                    <option value="Left Hand Bat">Left Hand Bat</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 6 }}>
                  Bowling Action
                </label>
                <select
                  value={admitForm.bowlingAction}
                  onChange={(e) => setAdmitForm({ ...admitForm, bowlingAction: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 10,
                    background: '#0b1329',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#f8fafc',
                    fontSize: 14,
                  }}
                >
                  <option value="Right-arm Fast (Express Seam)">Right-arm Fast (Express Seam)</option>
                  <option value="Left-arm Fast / Swing">Left-arm Fast / Swing</option>
                  <option value="Right-arm Off Spin (Doosra)">Right-arm Off Spin (Doosra)</option>
                  <option value="Left-arm Orthodox Spin">Left-arm Orthodox Spin</option>
                  <option value="Right-arm Leg Break / Googly">Right-arm Leg Break / Googly</option>
                  <option value="Does Not Bowl">Does Not Bowl</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 6 }}>
                    Parent/Guardian Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sanjay Jaiswal"
                    value={admitForm.guardianName}
                    onChange={(e) => setAdmitForm({ ...admitForm, guardianName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 10,
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#f8fafc',
                      fontSize: 14,
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 6 }}>
                    Guardian Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98401 12345"
                    value={admitForm.guardianPhone}
                    onChange={(e) => setAdmitForm({ ...admitForm, guardianPhone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 10,
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#f8fafc',
                      fontSize: 14,
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: 10,
                  background: 'rgba(0, 230, 118, 0.08)',
                  border: '1px solid rgba(0, 230, 118, 0.25)',
                  fontSize: 12,
                  color: '#00e676',
                }}
              >
                <strong>Aadhaar Card Waived:</strong> Students enrolling under academy do not require Aadhaar verification. Registration is certified directly by the Academy Director.
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: 10,
                    border: 'none',
                    background: 'linear-gradient(135deg, #7c4dff, #00b0ff)',
                    color: '#ffffff',
                    fontWeight: 900,
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  ✓ Admit & Enroll Student in Academy
                </button>
                <button
                  type="button"
                  onClick={() => setShowAdmitPage(false)}
                  style={{
                    padding: '14px 24px',
                    borderRadius: 10,
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#94a3b8',
                    fontWeight: 800,
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </Screen>
    )
  }

  // 4. DEDICATED ONBOARD COACH PAGE
  if (showAddCoachPage) {
    return (
      <Screen
        back
        onBack={() => setShowAddCoachPage(false)}
        title="Onboard Coach & Staff"
        subtitle="Staff Registration, Credentials & Monthly Payouts"
      >
        <div style={{ maxWidth: 720, margin: '0 auto', paddingBottom: 80 }}>
          <div style={{ marginBottom: 16 }}>
            <button
              type="button"
              onClick={() => setShowAddCoachPage(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 16px',
                borderRadius: 10,
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#f8fafc',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ← Back</button>
          </div>

          <div
            style={{
              background: '#0b1329',
              borderRadius: 16,
              border: '1px solid rgba(124, 77, 255, 0.35)',
              padding: 24,
            }}
          >
            <h2 style={{ fontSize: 20, fontWeight: 900, color: '#f8fafc', margin: '0 0 16px' }}>
              👨‍🏫 Coach & Specialist Registration
            </h2>

            <form onSubmit={handleAddCoach} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 6 }}>
                  Coach / Staff Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VVS Laxman"
                  value={coachForm.name}
                  onChange={(e) => setCoachForm({ ...coachForm, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 10,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#f8fafc',
                    fontSize: 14,
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 6 }}>
                    Designation / Role *
                  </label>
                  <select
                    value={coachForm.role}
                    onChange={(e) => setCoachForm({ ...coachForm, role: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 10,
                      background: '#0b1329',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#f8fafc',
                      fontSize: 14,
                    }}
                  >
                    <option value="Head Cricket Coach">Head Cricket Coach</option>
                    <option value="Batting Coach & Biomechanics">Batting Coach & Biomechanics</option>
                    <option value="Fast Bowling Specialist">Fast Bowling Specialist</option>
                    <option value="Spin Bowling & Flight Coach">Spin Bowling & Flight Coach</option>
                    <option value="Strength & Conditioning Trainer">Strength & Conditioning Trainer</option>
                    <option value="Physiotherapist & Recovery">Physiotherapist & Recovery</option>
                    <option value="Grounds & Turf Curator">Grounds & Turf Curator</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 6 }}>
                    Certification Badge
                  </label>
                  <select
                    value={coachForm.badge}
                    onChange={(e) => setCoachForm({ ...coachForm, badge: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 10,
                      background: '#0b1329',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#f8fafc',
                      fontSize: 14,
                    }}
                  >
                    <option value="BCCI Level 1">BCCI Level 1</option>
                    <option value="BCCI Level 2">BCCI Level 2</option>
                    <option value="BCCI Level 3">BCCI Level 3 (Elite)</option>
                    <option value="Ranji Trophy Veteran">Ranji Trophy Veteran</option>
                    <option value="NIS Certified">NIS Certified</option>
                    <option value="CSCS Strength Specialist">CSCS Strength Specialist</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 6 }}>
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={coachForm.phone}
                    onChange={(e) => setCoachForm({ ...coachForm, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 10,
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#f8fafc',
                      fontSize: 14,
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 6 }}>
                    Monthly Base Salary (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={coachForm.salary}
                    onChange={(e) => setCoachForm({ ...coachForm, salary: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 10,
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#f8fafc',
                      fontSize: 14,
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 6 }}>
                  Assigned Shift
                </label>
                <select
                  value={coachForm.shift}
                  onChange={(e) => setCoachForm({ ...coachForm, shift: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 10,
                    background: '#0b1329',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#f8fafc',
                    fontSize: 14,
                  }}
                >
                  <option value="Morning (06:00 AM - 10:00 AM)">Morning (06:00 AM - 10:00 AM)</option>
                  <option value="Evening (03:30 PM - 07:30 PM)">Evening (03:30 PM - 07:30 PM)</option>
                  <option value="Full Day (Both Morning & Evening)">Full Day (Both Morning & Evening)</option>
                  <option value="Weekend Special Camp">Weekend Special Camp</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 6 }}>
                  Coaching Experience
                </label>
                <input
                  type="text"
                  placeholder="e.g. 8 Years Coaching Experience"
                  value={coachForm.experience}
                  onChange={(e) => setCoachForm({ ...coachForm, experience: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 10,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#f8fafc',
                    fontSize: 14,
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: 10,
                    border: 'none',
                    background: 'linear-gradient(135deg, #7c4dff, #00b0ff)',
                    color: '#ffffff',
                    fontWeight: 900,
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  ✓ Onboard Coach & Assign Batches
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddCoachPage(false)}
                  style={{
                    padding: '14px 24px',
                    borderRadius: 10,
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#94a3b8',
                    fontWeight: 800,
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </Screen>
    )
  }

  // 5. DEDICATED SCHEDULE DRILL PAGE
  if (showAddDrillPage) {
    return (
      <Screen
        back
        onBack={() => setShowAddDrillPage(false)}
        title="Schedule Training Drill"
        subtitle={`Session Date: ${selectedDrillDate}`}
      >
        <div style={{ maxWidth: 720, margin: '0 auto', paddingBottom: 80 }}>
          <div style={{ marginBottom: 16 }}>
            <button
              type="button"
              onClick={() => setShowAddDrillPage(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 16px',
                borderRadius: 10,
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#f8fafc',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ← Back</button>
          </div>

          <div
            style={{
              background: '#0b1329',
              borderRadius: 16,
              border: '1px solid rgba(0, 176, 255, 0.35)',
              padding: 24,
            }}
          >
            <h2 style={{ fontSize: 20, fontWeight: 900, color: '#f8fafc', margin: '0 0 16px' }}>
              🏏 Schedule Drill on {selectedDrillDate}
            </h2>

            <form onSubmit={handleAddDrill} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 6 }}>
                  Drill Title & Curriculum *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Backfoot Punch against Tennis Ball on Concrete"
                  value={drillForm.title}
                  onChange={(e) => setDrillForm({ ...drillForm, title: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 10,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#f8fafc',
                    fontSize: 14,
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 6 }}>
                    Time Slot
                  </label>
                  <input
                    type="text"
                    placeholder="06:00 AM - 07:30 AM"
                    value={drillForm.time}
                    onChange={(e) => setDrillForm({ ...drillForm, time: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 10,
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#f8fafc',
                      fontSize: 14,
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 6 }}>
                    Pitch / Venue
                  </label>
                  <input
                    type="text"
                    placeholder="Turf Nets A & B"
                    value={drillForm.venue}
                    onChange={(e) => setDrillForm({ ...drillForm, venue: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 10,
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#f8fafc',
                      fontSize: 14,
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 6 }}>
                    Lead Coach
                  </label>
                  <select
                    value={drillForm.coach}
                    onChange={(e) => setDrillForm({ ...drillForm, coach: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 10,
                      background: '#0b1329',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#f8fafc',
                      fontSize: 14,
                    }}
                  >
                    {coaches.map((c) => (
                      <option key={c.id} value={`${c.name} (${c.role.split(' ')[0]})`}>
                        {c.name} ({c.role})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 6 }}>
                    Target Squad
                  </label>
                  <input
                    type="text"
                    placeholder="U-16 & U-19 Batsmen"
                    value={drillForm.batch}
                    onChange={(e) => setDrillForm({ ...drillForm, batch: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 10,
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#f8fafc',
                      fontSize: 14,
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 6 }}>
                  Technical Focus & Goal
                </label>
                <input
                  type="text"
                  placeholder="e.g. Head still, high elbow, weight transfer back and across"
                  value={drillForm.focus}
                  onChange={(e) => setDrillForm({ ...drillForm, focus: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 10,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#f8fafc',
                    fontSize: 14,
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: 10,
                    border: 'none',
                    background: '#00b0ff',
                    color: '#020617',
                    fontWeight: 900,
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  ✓ Schedule Drill on {selectedDrillDate}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddDrillPage(false)}
                  style={{
                    padding: '14px 24px',
                    borderRadius: 10,
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#94a3b8',
                    fontWeight: 800,
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </Screen>
    )
  }

  // 6. DEDICATED RECORD EXPENSE PAGE
  if (showRecordExpensePage) {
    return (
      <Screen
        back
        onBack={() => setShowRecordExpensePage(false)}
        title="Record Operational Expense"
        subtitle="Academy Operational Ledger & Expenditure"
      >
        <div style={{ maxWidth: 720, margin: '0 auto', paddingBottom: 80 }}>
          <div style={{ marginBottom: 16 }}>
            <button
              type="button"
              onClick={() => setShowRecordExpensePage(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 16px',
                borderRadius: 10,
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#f8fafc',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ← Back</button>
          </div>

          <div
            style={{
              background: '#0b1329',
              borderRadius: 16,
              border: '1px solid rgba(255, 59, 80, 0.35)',
              padding: 24,
            }}
          >
            <h2 style={{ fontSize: 20, fontWeight: 900, color: '#f8fafc', margin: '0 0 16px' }}>
              💸 Record Academy Operational Expense
            </h2>

            <form onSubmit={handleAddExpense} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 6 }}>
                  Expense Category
                </label>
                <select
                  value={expenseForm.category}
                  onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 10,
                    background: '#0b1329',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#f8fafc',
                    fontSize: 14,
                  }}
                >
                  <option value="Coach & Trainer Stipends">Coach & Trainer Stipends</option>
                  <option value="Cricket Gear & Equipment">Cricket Gear & Equipment (SG Match Balls / Cones)</option>
                  <option value="Turf Ground & Net Lease">Turf Ground & Net Lease / Rent</option>
                  <option value="Medical & Physio">Medical & Physio (Cold sprays / strapping)</option>
                  <option value="Video Analysis & Tools">Video Analysis Software & iPad Mounts</option>
                  <option value="Tournament Entry Fees">Tournament Registration & Match Fees</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 6 }}>
                  Description / Particulars *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2 Boxes SG Tournament White Leather Cricket Balls"
                  value={expenseForm.desc}
                  onChange={(e) => setExpenseForm({ ...expenseForm, desc: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 10,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#f8fafc',
                    fontSize: 14,
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 6 }}>
                    Amount (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 5400"
                    value={expenseForm.amount}
                    onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 10,
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#f8fafc',
                      fontSize: 14,
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 6 }}>
                    Payment Mode
                  </label>
                  <select
                    value={expenseForm.mode}
                    onChange={(e) => setExpenseForm({ ...expenseForm, mode: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 10,
                      background: '#0b1329',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#f8fafc',
                      fontSize: 14,
                    }}
                  >
                    <option value="UPI / Online">UPI / QR Transfer</option>
                    <option value="Bank NEFT">Bank NEFT Transfer</option>
                    <option value="Cash Voucher">Cash Voucher</option>
                    <option value="Debit Card">Debit Card</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: 10,
                    border: 'none',
                    background: '#ff3b50',
                    color: '#ffffff',
                    fontWeight: 900,
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  ✓ Deduct & Save in Accounts Ledger
                </button>
                <button
                  type="button"
                  onClick={() => setShowRecordExpensePage(false)}
                  style={{
                    padding: '14px 24px',
                    borderRadius: 10,
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#94a3b8',
                    fontWeight: 800,
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </Screen>
    )
  }

  // 7. DEDICATED MONTHLY FINANCIAL AUDIT STATEMENT PAGE
  if (showStatementPage) {
    return (
      <Screen
        back
        onBack={() => setShowStatementPage(false)}
        title="Monthly Financial Audit Statement"
        subtitle="November 2026 • Scoring Heroes Elite Academy"
      >
        <div style={{ maxWidth: 880, margin: '0 auto', paddingBottom: 80 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <button
              type="button"
              onClick={() => setShowStatementPage(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 16px',
                borderRadius: 10,
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#f8fafc',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ← Back</button>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                type="button"
                onClick={() => window.print()}
                style={{
                  padding: '8px 16px',
                  borderRadius: 10,
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#f8fafc',
                  fontWeight: 800,
                  fontSize: 13,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Printer size={15} /> Print Statement
              </button>
              <button
                type="button"
                onClick={() => triggerToast('Monthly financial audit statement downloaded as PDF!')}
                style={{
                  padding: '8px 16px',
                  borderRadius: 10,
                  background: '#00b0ff',
                  border: 'none',
                  color: '#020617',
                  fontWeight: 900,
                  fontSize: 13,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Download size={15} /> Download PDF
              </button>
            </div>
          </div>

          <div
            style={{
              background: '#0b1329',
              borderRadius: 16,
              border: '1px solid rgba(0, 176, 255, 0.35)',
              padding: 24,
            }}
          >
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontSize: 11, color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase' }}>
                OFFICIAL FINANCIAL AUDIT REPORT
              </span>
              <h2 style={{ fontSize: 22, fontWeight: 900, color: '#f8fafc', margin: '4px 0 0' }}>
                Scoring Heroes Elite Cricket Academy
              </h2>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                Period: 01 November 2026 - 30 November 2026 • Verified by Academy Accounts Desk
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 12,
                marginBottom: 24,
                textAlign: 'center',
              }}
            >
              <div style={{ padding: 14, borderRadius: 12, background: 'rgba(0, 230, 118, 0.08)', border: '1px solid rgba(0, 230, 118, 0.25)' }}>
                <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 800 }}>TOTAL TUITION INFLOW</span>
                <strong style={{ fontSize: 22, color: '#00e676', display: 'block', marginTop: 4 }}>
                  ₹{totalAcademyInflow.toLocaleString()}
                </strong>
              </div>
              <div style={{ padding: 14, borderRadius: 12, background: 'rgba(255, 59, 80, 0.08)', border: '1px solid rgba(255, 59, 80, 0.25)' }}>
                <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 800 }}>TOTAL OPERATING EXPENSES</span>
                <strong style={{ fontSize: 22, color: '#ff3b50', display: 'block', marginTop: 4 }}>
                  ₹{totalAcademyOutflow.toLocaleString()}
                </strong>
              </div>
              <div style={{ padding: 14, borderRadius: 12, background: 'rgba(255, 200, 61, 0.08)', border: '1px solid rgba(255, 200, 61, 0.25)' }}>
                <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 800 }}>NET OPERATING SURPLUS</span>
                <strong style={{ fontSize: 22, color: '#ffc83d', display: 'block', marginTop: 4 }}>
                  ₹{netAcademySurplus.toLocaleString()}
                </strong>
              </div>
            </div>

            <div>
              <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase' }}>
                Itemized Chronological Transaction Ledger
              </span>
              <div
                style={{
                  marginTop: 8,
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 10,
                  overflow: 'hidden',
                }}
              >
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                  <thead>
                    <tr style={{ background: 'rgba(255, 255, 255, 0.04)', color: 'var(--muted)', textAlign: 'left' }}>
                      <th style={{ padding: '10px 12px' }}>Date</th>
                      <th style={{ padding: '10px 12px' }}>Particulars</th>
                      <th style={{ padding: '10px 12px' }}>Category</th>
                      <th style={{ padding: '10px 12px' }}>Reference</th>
                      <th style={{ padding: '10px 12px', textAlign: 'right' }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {academyTransactions.map((tx) => (
                      <tr key={tx.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                        <td style={{ padding: '10px 12px', color: '#94a3b8' }}>{tx.date}</td>
                        <td style={{ padding: '10px 12px', color: '#f8fafc', fontWeight: 600 }}>{tx.desc}</td>
                        <td style={{ padding: '10px 12px', color: '#38bdf8' }}>{tx.category}</td>
                        <td style={{ padding: '10px 12px', color: '#ffc83d' }}>{tx.ref}</td>
                        <td
                          style={{
                            padding: '10px 12px',
                            textAlign: 'right',
                            fontWeight: 800,
                            color: tx.type === 'credit' ? '#00e676' : '#ff3b50',
                          }}
                        >
                          {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Screen>
    )
  }
  return (
    <Screen
      back
      title="Sports Academy Operations"
      subtitle="Student Batches, Daily Attendance & Academy Accounts"
    >
      <div style={{ paddingBottom: 80 }}>
        {/* Toast Alert */}
        {toastMsg && (
          <div
            style={{
              padding: '10px 14px',
              borderRadius: 10,
              background: 'rgba(0, 230, 118, 0.15)',
              border: '1px solid #00e676',
              color: '#00e676',
              fontSize: 13,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 12,
            }}
          >
            <CheckCircle2 size={18} />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* =========================================================================
            PRIMARY 3-PORTAL NAVIGATION TABS (Strictly Clean & Direct)
        ========================================================================= */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 6,
            background: 'rgba(15, 23, 42, 0.8)',
            padding: 4,
            borderRadius: 12,
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: 14,
          }}
        >
          <button
            type="button"
            onClick={() => handleTabChange('students')}
            style={{
              padding: '10px 8px',
              borderRadius: 9,
              border: 'none',
              background: activeTab === 'students' ? 'linear-gradient(135deg, #7c4dff, #536dfe)' : 'transparent',
              color: activeTab === 'students' ? '#ffffff' : '#94a3b8',
              fontSize: 12,
              fontWeight: 900,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              transition: 'all 0.15s ease',
            }}
          >
            <Users size={15} />
            <span>Student Batches</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('attendance')}
            style={{
              padding: '10px 8px',
              borderRadius: 9,
              border: 'none',
              background: activeTab === 'attendance' ? 'linear-gradient(135deg, #00b0ff, #0081cb)' : 'transparent',
              color: activeTab === 'attendance' ? '#020617' : '#94a3b8',
              fontSize: 12,
              fontWeight: 900,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              transition: 'all 0.15s ease',
            }}
          >
            <Calendar size={15} />
            <span>Attendance & Drills</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('fees')}
            style={{
              padding: '10px 8px',
              borderRadius: 9,
              border: 'none',
              background: activeTab === 'fees' ? 'linear-gradient(135deg, #00e676, #00a854)' : 'transparent',
              color: activeTab === 'fees' ? '#020617' : '#94a3b8',
              fontSize: 12,
              fontWeight: 900,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              transition: 'all 0.15s ease',
            }}
          >
            <DollarSign size={15} />
            <span>Fees & Accounts</span>
          </button>
        </div>

        {/* =========================================================================
            TAB 1: STUDENT BATCHES & COMPREHENSIVE PROFILES
        ========================================================================= */}
        {activeTab === 'students' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Header with Search and New Admission Button */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                padding: '14px',
                borderRadius: 14,
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Trainee Roster
                  </span>
                  <h3 style={{ fontSize: 16, fontWeight: 900, color: '#f8fafc', margin: '2px 0 0' }}>
                    Enrolled Students ({students.length})
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAdmitPage(true)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 10,
                    border: 'none',
                    background: 'linear-gradient(135deg, #7c4dff, #00b0ff)',
                    color: '#ffffff',
                    fontWeight: 900,
                    fontSize: 12,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <Plus size={16} /> + Admit New Student
                </button>
              </div>

              {/* Search Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 12px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderRadius: 10,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  marginBottom: 10,
                }}
              >
                <Search size={16} color="#94a3b8" />
                <input
                  type="text"
                  placeholder="Search student by name, role, ID, or guardian..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#f8fafc',
                    fontSize: 13,
                    width: '100%',
                    outline: 'none',
                  }}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 12 }}
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Batch Filter Pills */}
              <div
                style={{
                  display: 'flex',
                  gap: 6,
                  overflowX: 'auto',
                  scrollbarWidth: 'none',
                  paddingBottom: 2,
                }}
              >
                {[
                  { key: 'all', label: `All Batches (${students.length})` },
                  { key: 'u14', label: 'U-14 Foundation' },
                  { key: 'u16', label: 'U-16 Elite' },
                  { key: 'u19', label: 'U-19 Pro' },
                  { key: 'weekend', label: 'Weekend Grassroots' },
                ].map((b) => {
                  const isSel = selectedBatchFilter === b.key
                  return (
                    <button
                      key={b.key}
                      type="button"
                      onClick={() => setSelectedBatchFilter(b.key)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 8,
                        fontSize: 11,
                        fontWeight: 800,
                        whiteSpace: 'nowrap',
                        border: isSel ? '1px solid #7c4dff' : '1px solid rgba(255, 255, 255, 0.08)',
                        background: isSel ? 'rgba(124, 77, 255, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                        color: isSel ? '#b388ff' : '#94a3b8',
                        cursor: 'pointer',
                      }}
                    >
                      {b.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Students List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {filteredStudents.length === 0 ? (
                <div style={{ padding: 30, textAlign: 'center', background: 'rgba(15, 23, 42, 0.6)', borderRadius: 14 }}>
                  <p style={{ color: 'var(--muted)', margin: 0 }}>No students found matching your search filter.</p>
                </div>
              ) : (
                filteredStudents.map((st) => (
                  <div
                    key={st.id}
                    style={{
                      padding: '14px',
                      borderRadius: 14,
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 10,
                    }}
                  >
                    {/* Top Student Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <div
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 10,
                            background: 'rgba(124, 77, 255, 0.15)',
                            border: '1px solid rgba(124, 77, 255, 0.35)',
                            display: 'grid',
                            placeItems: 'center',
                            color: '#b388ff',
                            fontWeight: 900,
                            fontSize: 17,
                          }}
                        >
                          {st.name.charAt(0)}
                        </div>

                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <strong style={{ fontSize: 15, color: '#f8fafc' }}>{st.name}</strong>
                            <span style={{ fontSize: 10, color: '#94a3b8', background: 'rgba(255,255,255,0.06)', padding: '2px 5px', borderRadius: 4 }}>
                              {st.studentId}
                            </span>
                            {st.academyCertified && (
                              <span
                                style={{
                                  fontSize: 9,
                                  fontWeight: 800,
                                  color: '#00e676',
                                  background: 'rgba(0, 230, 118, 0.15)',
                                  padding: '2px 5px',
                                  borderRadius: 4,
                                }}
                              >
                                ✓ Academy Verified
                              </span>
                            )}
                          </div>
                          <span style={{ fontSize: 12, color: '#38bdf8', fontWeight: 700 }}>
                            {st.role} • {st.age} yrs • {st.battingStance}
                          </span>
                          <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                            Batch: <strong style={{ color: '#f8fafc' }}>{st.batch}</strong>
                          </div>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 900,
                            padding: '3px 8px',
                            borderRadius: 6,
                            textTransform: 'uppercase',
                            background: st.feeStatus === 'Paid' ? 'rgba(0, 230, 118, 0.15)' : 'rgba(255, 59, 80, 0.15)',
                            color: st.feeStatus === 'Paid' ? '#00e676' : '#ff3b50',
                            border: st.feeStatus === 'Paid' ? '1px solid #00e676' : '1px solid #ff3b50',
                          }}
                        >
                          {st.feeStatus === 'Paid' ? 'FEES PAID' : `DUE ₹${st.feeAmount}`}
                        </span>
                        <small style={{ fontSize: 10, color: '#94a3b8', display: 'block', marginTop: 4 }}>
                          Attendance: <strong style={{ color: '#00e676' }}>{st.attendanceRate}</strong>
                        </small>
                      </div>
                    </div>

                    {/* Quick Stats Strip */}
                    <div
                      style={{
                        padding: '8px 10px',
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        fontSize: 11,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 6,
                      }}
                    >
                      <span>
                        Match Stats: <strong>{st.runs} Runs</strong> ({st.highScore} HS) • <strong>{st.wickets} Wkts</strong>
                      </span>
                      <span style={{ color: '#ffc83d' }}>
                        Yo-Yo: <strong>{st.yoyoScore}</strong> • Tier: <span>{st.competitionTier}</span>
                      </span>
                    </div>

                    {/* Action Buttons Row */}
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                      <a
                        href={`tel:${st.guardianPhone}`}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 8,
                          background: 'rgba(0, 176, 255, 0.12)',
                          border: '1px solid rgba(0, 176, 255, 0.25)',
                          color: '#00b0ff',
                          fontSize: 11,
                          fontWeight: 800,
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 5,
                        }}
                      >
                        <Phone size={13} /> {st.guardianName}
                      </a>

                      <div style={{ display: 'flex', gap: 6 }}>
                        {st.feeStatus === 'Overdue' && (
                          <button
                            type="button"
                            onClick={() => markStudentFeePaid(st)}
                            style={{
                              padding: '6px 12px',
                              borderRadius: 8,
                              background: '#00e676',
                              border: 'none',
                              color: '#020617',
                              fontSize: 11,
                              fontWeight: 900,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 4,
                            }}
                          >
                            <DollarSign size={13} /> Mark Fee Paid
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setSelectedStudentView(st)}
                          style={{
                            padding: '6px 14px',
                            borderRadius: 8,
                            background: 'linear-gradient(135deg, #7c4dff, #00b0ff)',
                            border: 'none',
                            color: '#ffffff',
                            fontSize: 11,
                            fontWeight: 900,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 5,
                          }}
                        >
                          <span>Full Profile & Stats</span>
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: ATTENDANCE & TRAINING DRILLS (With Date History & Repeat Button)
        ========================================================================= */}
        {activeTab === 'attendance' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* 1. Training Schedule & Date Switcher */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                padding: '14px',
                borderRadius: 14,
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Training Schedule & History
                  </span>
                  <h3 style={{ fontSize: 18, fontWeight: 900, color: '#f8fafc', margin: '2px 0 0' }}>
                    {selectedDrillDate}
                  </h3>
                </div>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => setShowStandardPreview(!showStandardPreview)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 9,
                      border: '1px solid rgba(255, 200, 61, 0.35)',
                      background: showStandardPreview ? 'rgba(255, 200, 61, 0.2)' : 'rgba(255, 200, 61, 0.08)',
                      color: '#ffc83d',
                      fontWeight: 800,
                      fontSize: 11,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <BookOpen size={14} /> {showStandardPreview ? 'Hide Curriculum' : '📖 View Standard Drills (4)'}
                  </button>

                  <button
                    type="button"
                    onClick={() => applyStandardDrillsToDate('04 Nov 2026')}
                    style={{
                      padding: '8px 14px',
                      borderRadius: 9,
                      border: 'none',
                      background: 'linear-gradient(135deg, #ffc83d, #ff9100)',
                      color: '#020617',
                      fontWeight: 900,
                      fontSize: 11,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <RotateCcw size={14} /> ⚡ Apply Standard Drills to Today
                  </button>
                </div>
              </div>

              {/* Date Switcher Pills */}
              <div
                style={{
                  display: 'flex',
                  gap: 6,
                  overflowX: 'auto',
                  scrollbarWidth: 'none',
                  paddingBottom: 2,
                }}
              >
                {['04 Nov 2026', '03 Nov 2026', '02 Nov 2026', '01 Nov 2026', '31 Oct 2026'].map((dt) => {
                  const isSel = selectedDrillDate === dt
                  const count = (drillsByDate[dt] || []).length
                  return (
                    <button
                      key={dt}
                      type="button"
                      onClick={() => setSelectedDrillDate(dt)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: 10,
                        fontSize: 12,
                        fontWeight: 800,
                        whiteSpace: 'nowrap',
                        border: isSel ? '1.5px solid #00b0ff' : '1px solid rgba(255, 255, 255, 0.08)',
                        background: isSel ? 'rgba(0, 176, 255, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                        color: isSel ? '#38bdf8' : '#94a3b8',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <span>{dt === '04 Nov 2026' ? 'Today (04 Nov)' : dt}</span>
                      <span
                        style={{
                          fontSize: 10,
                          padding: '1px 6px',
                          borderRadius: 6,
                          background: isSel ? '#00b0ff' : 'rgba(255, 255, 255, 0.1)',
                          color: isSel ? '#020617' : '#cbd5e1',
                          fontWeight: 900,
                        }}
                      >
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Standard Curriculum Preview Card (When Toggled) */}
            {showStandardPreview && (
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 200, 61, 0.08), rgba(0, 176, 255, 0.05))',
                  padding: '16px',
                  borderRadius: 14,
                  border: '1.5px solid rgba(255, 200, 61, 0.35)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, background: '#ffc83d', color: '#020617', fontWeight: 900 }}>
                        OFFICIAL BENCHMARK
                      </span>
                      <h4 style={{ fontSize: 14, fontWeight: 900, color: '#f8fafc', margin: 0 }}>
                        Standard Academy Daily Curriculum (4 Core Modules)
                      </h4>
                    </div>
                    <small style={{ color: 'var(--muted)', fontSize: 11, marginTop: 2, display: 'block' }}>
                      You can copy individual standard drills or apply all 4 to today or any chosen date
                    </small>
                  </div>

                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      type="button"
                      onClick={() => applyStandardDrillsToDate(selectedDrillDate)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 8,
                        background: 'rgba(255, 200, 61, 0.2)',
                        border: '1px solid rgba(255, 200, 61, 0.4)',
                        color: '#ffc83d',
                        fontWeight: 800,
                        fontSize: 11,
                        cursor: 'pointer',
                      }}
                    >
                      Copy All 4 to {selectedDrillDate}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 10 }}>
                  {STANDARD_ACADEMY_DRILLS.map((std) => (
                    <div
                      key={std.id}
                      style={{
                        padding: '12px 14px',
                        borderRadius: 10,
                        background: 'rgba(15, 23, 42, 0.85)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: 6,
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 10, fontWeight: 800, color: '#ffc83d', background: 'rgba(255, 200, 61, 0.15)', padding: '2px 6px', borderRadius: 4 }}>
                            🕒 {std.time}
                          </span>
                          <span style={{ fontSize: 10, color: '#38bdf8', fontWeight: 700 }}>
                            📍 {std.venue}
                          </span>
                        </div>
                        <strong style={{ fontSize: 13, color: '#f8fafc', display: 'block', marginTop: 4 }}>
                          {std.title}
                        </strong>
                        <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                          Coach: <span style={{ color: '#f8fafc' }}>{std.coach}</span> • Squad: <span>{std.batch}</span>
                        </div>
                        <div style={{ fontSize: 11, color: '#00e676', marginTop: 2 }}>
                          🎯 {std.focus}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                        <button
                          type="button"
                          onClick={() => applySingleDrillToToday(std)}
                          style={{
                            flex: 1,
                            padding: '6px 10px',
                            borderRadius: 6,
                            background: 'linear-gradient(135deg, #00e676, #00b0ff)',
                            border: 'none',
                            color: '#020617',
                            fontWeight: 900,
                            fontSize: 10,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 4,
                          }}
                        >
                          <Zap size={11} /> ⚡ Apply This Drill Today
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Drills Performed on Selected Date List */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                padding: '16px',
                borderRadius: 14,
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 900, color: '#f8fafc', textTransform: 'uppercase', margin: 0 }}>
                    Drills Performed on {selectedDrillDate} ({currentDrills.length})
                  </h4>
                  <small style={{ color: 'var(--muted)', fontSize: 11 }}>
                    Session curriculum, venue locations, coach in charge & focus
                  </small>
                </div>

                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  {/* If viewing a past date that has drills, offer 1-click copy all to today */}
                  {selectedDrillDate !== '04 Nov 2026' && currentDrills.length > 0 && (
                    <button
                      type="button"
                      onClick={() => copyDayDrillsToToday(selectedDrillDate)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 8,
                        background: 'linear-gradient(135deg, #00e676, #00b0ff)',
                        border: 'none',
                        color: '#020617',
                        fontWeight: 900,
                        fontSize: 11,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                        boxShadow: '0 4px 12px rgba(0, 230, 118, 0.25)',
                      }}
                    >
                      <Zap size={13} /> ⚡ Copy All ({currentDrills.length}) to Today (04 Nov)
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setShowAddDrillPage(true)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 8,
                      background: 'rgba(0, 176, 255, 0.15)',
                      border: '1px solid #00b0ff',
                      color: '#00b0ff',
                      fontWeight: 800,
                      fontSize: 11,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <Plus size={14} /> + Add Drill
                  </button>
                </div>
              </div>

              {currentDrills.length === 0 ? (
                <div style={{ padding: '28px 20px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px dashed rgba(255, 255, 255, 0.15)' }}>
                  <p style={{ color: 'var(--muted)', fontSize: 13, margin: '0 0 14px' }}>
                    No drills scheduled for <strong>{selectedDrillDate}</strong>.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 440, margin: '0 auto' }}>
                    <button
                      type="button"
                      onClick={() => applyStandardDrillsToDate(selectedDrillDate)}
                      style={{
                        padding: '10px 16px',
                        borderRadius: 9,
                        background: 'linear-gradient(135deg, #ffc83d, #ff9100)',
                        border: 'none',
                        color: '#020617',
                        fontWeight: 900,
                        fontSize: 12,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 6,
                      }}
                    >
                      🔁 Copy Standard Curriculum (4 Drills) To This Day
                    </button>

                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={() => copyDrillsFromDateToSelected('04 Nov 2026')}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 8,
                          background: 'rgba(0, 176, 255, 0.15)',
                          border: '1px solid rgba(0, 176, 255, 0.3)',
                          color: '#38bdf8',
                          fontSize: 11,
                          fontWeight: 800,
                          cursor: 'pointer',
                        }}
                      >
                        📋 Copy from Today (04 Nov)
                      </button>
                      <button
                        type="button"
                        onClick={() => copyDrillsFromDateToSelected('03 Nov 2026')}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 8,
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: '#f8fafc',
                          fontSize: 11,
                          fontWeight: 800,
                          cursor: 'pointer',
                        }}
                      >
                        📋 Copy from 03 Nov
                      </button>
                      <button
                        type="button"
                        onClick={() => copyDrillsFromDateToSelected('02 Nov 2026')}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 8,
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: '#f8fafc',
                          fontSize: 11,
                          fontWeight: 800,
                          cursor: 'pointer',
                        }}
                      >
                        📋 Copy from 02 Nov
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {currentDrills.map((d) => (
                    <div
                      key={d.id}
                      style={{
                        padding: '14px 16px',
                        borderRadius: 12,
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 6,
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 800,
                            color: '#ffc83d',
                            background: 'rgba(255, 200, 61, 0.12)',
                            padding: '3px 8px',
                            borderRadius: 6,
                          }}
                        >
                          🕒 {d.time}
                        </span>
                        <span style={{ fontSize: 11, color: '#38bdf8', fontWeight: 700 }}>
                          📍 {d.venue}
                        </span>
                      </div>

                      <strong style={{ fontSize: 15, color: '#f8fafc', marginTop: 2 }}>{d.title}</strong>
                      <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                        Coach in Charge: <strong style={{ color: '#f8fafc' }}>{d.coach}</strong> • Target Squad: <span style={{ color: '#ffc83d' }}>{d.batch}</span>
                      </div>
                      <div style={{ fontSize: 12, color: '#00e676' }}>
                        🎯 Technical Focus: <span>{d.focus}</span>
                      </div>

                      {/* COPY ACTIONS FOR THIS INDIVIDUAL DRILL */}
                      <div style={{ display: 'flex', gap: 8, marginTop: 4, alignItems: 'center', flexWrap: 'wrap' }}>
                        {selectedDrillDate !== '04 Nov 2026' ? (
                          <button
                            type="button"
                            onClick={() => applySingleDrillToToday(d)}
                            style={{
                              padding: '6px 12px',
                              borderRadius: 8,
                              background: 'linear-gradient(135deg, #00e676, #00b0ff)',
                              border: 'none',
                              color: '#020617',
                              fontWeight: 900,
                              fontSize: 11,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 5,
                              boxShadow: '0 4px 12px rgba(0, 230, 118, 0.25)',
                            }}
                          >
                            <Zap size={13} /> ⚡ Instant Apply This Drill to Today (04 Nov)
                          </button>
                        ) : (
                          <span style={{ fontSize: 11, color: '#00e676', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            ✓ Active in Today's Schedule
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => duplicateDrillToCurrent(d)}
                          style={{
                            padding: '6px 10px',
                            borderRadius: 8,
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            color: '#94a3b8',
                            fontSize: 11,
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          <Copy size={12} /> Duplicate Drill
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Daily Student Attendance Roll Call */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                padding: '14px',
                borderRadius: 14,
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 900, color: '#f8fafc', textTransform: 'uppercase', margin: 0 }}>
                    Student Roll Call ({students.filter((s) => s.attendanceToday === 'present').length} / {students.length} Present)
                  </h4>
                  <small style={{ color: 'var(--muted)', fontSize: 11 }}>1-click status marking per student</small>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setStudents((prev) => prev.map((s) => ({ ...s, attendanceToday: 'present' })))
                    triggerToast('All students marked PRESENT for today!')
                  }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 8,
                    background: 'rgba(0, 230, 118, 0.15)',
                    border: '1px solid #00e676',
                    color: '#00e676',
                    fontWeight: 900,
                    fontSize: 11,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <Check size={14} /> Mark All Present
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {students.map((st) => (
                  <div
                    key={st.id}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 10,
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: 8,
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: 13, color: '#f8fafc' }}>{st.name}</strong>
                      <span style={{ fontSize: 11, color: 'var(--muted)', display: 'block' }}>
                        {st.batch} • {st.role}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: 4 }}>
                      {[
                        { key: 'present', label: 'Present', color: '#00e676' },
                        { key: 'late', label: 'Late', color: '#ffc83d' },
                        { key: 'half', label: 'Half Day', color: '#38bdf8' },
                        { key: 'absent', label: 'Absent', color: '#ff3b50' },
                      ].map((btn) => {
                        const active = st.attendanceToday === btn.key
                        return (
                          <button
                            key={btn.key}
                            type="button"
                            onClick={() => {
                              setStudents((prev) =>
                                prev.map((s) => (s.id === st.id ? { ...s, attendanceToday: btn.key } : s))
                              )
                            }}
                            style={{
                              padding: '5px 9px',
                              borderRadius: 6,
                              border: active ? `1.5px solid ${btn.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                              background: active ? `${btn.color}25` : 'transparent',
                              color: active ? btn.color : '#94a3b8',
                              fontSize: 11,
                              fontWeight: 800,
                              cursor: 'pointer',
                            }}
                          >
                            {btn.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Coaches & Staff Master Section (With Details View) */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                padding: '14px',
                borderRadius: 14,
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 900, color: '#f8fafc', textTransform: 'uppercase', margin: 0 }}>
                    Coaches & Staff Roster ({coaches.length} Coaches • {supportStaff.length} Staff)
                  </h4>
                  <small style={{ color: 'var(--muted)', fontSize: 11 }}>
                    Absence, presence, certifications, assigned drills & payouts
                  </small>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddCoachPage(true)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 8,
                    background: 'rgba(124, 77, 255, 0.15)',
                    border: '1px solid #7c4dff',
                    color: '#b388ff',
                    fontWeight: 800,
                    fontSize: 11,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <Plus size={14} /> + Add Coach / Staff
                </button>
              </div>

              {/* Coach Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                {coaches.map((c) => (
                  <div
                    key={c.id}
                    style={{
                      padding: '12px',
                      borderRadius: 12,
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: 14, color: '#f8fafc' }}>{c.name}</strong>
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 800,
                          color: c.present ? '#00e676' : '#ff3b50',
                          background: c.present ? 'rgba(0,230,118,0.15)' : 'rgba(255,59,80,0.15)',
                          padding: '2px 6px',
                          borderRadius: 4,
                        }}
                      >
                        {c.present ? 'ON DUTY' : 'OFF DUTY'}
                      </span>
                    </div>

                    <span style={{ fontSize: 11, color: '#38bdf8', fontWeight: 700 }}>
                      {c.role} ({c.badge})
                    </span>

                    <div style={{ fontSize: 10, color: 'var(--muted)' }}>
                      🕒 {c.shift} • Pay: <strong style={{ color: '#ffc83d' }}>₹{c.salary.toLocaleString()}/mo</strong>
                    </div>

                    <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                      <button
                        type="button"
                        onClick={() => setSelectedCoachView(c)}
                        style={{
                          flex: 1,
                          padding: '6px',
                          borderRadius: 6,
                          background: 'rgba(124, 77, 255, 0.15)',
                          border: '1px solid rgba(124, 77, 255, 0.3)',
                          color: '#b388ff',
                          fontSize: 10,
                          fontWeight: 800,
                          cursor: 'pointer',
                        }}
                      >
                        Coach Details & Drills →
                      </button>

                      {c.payoutStatus.includes('Pending') && (
                        <button
                          type="button"
                          onClick={() => disburseCoachPayout(c)}
                          style={{
                            padding: '6px 8px',
                            borderRadius: 6,
                            background: '#00e676',
                            border: 'none',
                            color: '#020617',
                            fontSize: 10,
                            fontWeight: 900,
                            cursor: 'pointer',
                          }}
                        >
                          Disburse
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: TUITION FEES & REAL ACCOUNTS LEDGER
        ========================================================================= */}
        {activeTab === 'fees' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Real Academy Financial Health Banner */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(0, 230, 118, 0.06))',
                padding: '16px',
                borderRadius: 14,
                border: '1px solid rgba(0, 230, 118, 0.3)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Academy Accounts & Balance
                  </span>
                  <h3 style={{ fontSize: 17, fontWeight: 900, color: '#f8fafc', margin: '2px 0 0' }}>
                    November 2026 Financial Audit
                  </h3>
                </div>

                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    type="button"
                    onClick={() => setShowRecordExpensePage(true)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 10,
                      background: 'rgba(255, 59, 80, 0.15)',
                      border: '1px solid #ff3b50',
                      color: '#ff3b50',
                      fontWeight: 800,
                      fontSize: 11,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <Plus size={14} /> + Record Expense
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowStatementPage(true)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 10,
                      background: 'rgba(0, 176, 255, 0.15)',
                      border: '1px solid #00b0ff',
                      color: '#00b0ff',
                      fontWeight: 800,
                      fontSize: 11,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <FileText size={14} /> Monthly Report
                  </button>
                </div>
              </div>

              {/* 3 Metrics: Inflow, Outflow, Surplus */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 12 }}>
                <div style={{ padding: '12px 10px', background: 'rgba(0, 230, 118, 0.1)', borderRadius: 10, border: '1px solid rgba(0, 230, 118, 0.25)', textAlign: 'center' }}>
                  <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>TOTAL INFLOW</span>
                  <strong style={{ fontSize: 17, color: '#00e676', display: 'block', marginTop: 2 }}>
                    ₹{totalAcademyInflow.toLocaleString()}
                  </strong>
                  <small style={{ fontSize: 9, color: '#64748b' }}>Tuition Fees & Admissions</small>
                </div>

                <div style={{ padding: '12px 10px', background: 'rgba(255, 59, 80, 0.1)', borderRadius: 10, border: '1px solid rgba(255, 59, 80, 0.25)', textAlign: 'center' }}>
                  <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>TOTAL OUTFLOW</span>
                  <strong style={{ fontSize: 17, color: '#ff3b50', display: 'block', marginTop: 2 }}>
                    ₹{totalAcademyOutflow.toLocaleString()}
                  </strong>
                  <small style={{ fontSize: 9, color: '#64748b' }}>Coach Salaries & Balls</small>
                </div>

                <div style={{ padding: '12px 10px', background: 'rgba(0, 176, 255, 0.1)', borderRadius: 10, border: '1px solid rgba(0, 176, 255, 0.25)', textAlign: 'center' }}>
                  <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>NET BALANCE</span>
                  <strong style={{ fontSize: 17, color: netAcademySurplus >= 0 ? '#38bdf8' : '#ff3b50', display: 'block', marginTop: 2 }}>
                    {netAcademySurplus >= 0 ? `+₹${netAcademySurplus.toLocaleString()}` : `-₹${Math.abs(netAcademySurplus).toLocaleString()}`}
                  </strong>
                  <small style={{ fontSize: 9, color: '#00e676', fontWeight: 800 }}>Surplus Balance</small>
                </div>
              </div>
            </div>

            {/* Itemized Transactions Ledger */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 900, color: '#f8fafc', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Itemized Transaction Ledger ({academyTransactions.length})
                </span>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>Live Audit Trail</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {academyTransactions.map((tx) => {
                  const isCredit = tx.type === 'credit'
                  return (
                    <div
                      key={tx.id}
                      style={{
                        padding: '12px 14px',
                        borderRadius: 12,
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 10,
                      }}
                    >
                      <div>
                        <strong style={{ fontSize: 13, color: '#f8fafc' }}>{tx.desc}</strong>
                        <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                          <span>{tx.date}</span> • <span style={{ color: '#38bdf8' }}>{tx.category}</span> • <span>{tx.mode}</span> (Ref: {tx.ref})
                        </div>
                      </div>

                      <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <strong
                          style={{
                            fontSize: 15,
                            fontWeight: 900,
                            color: isCredit ? '#00e676' : '#ff3b50',
                          }}
                        >
                          {isCredit ? `+₹${tx.amount.toLocaleString()}` : `-₹${tx.amount.toLocaleString()}`}
                        </strong>
                        <span
                          style={{
                            fontSize: 9,
                            fontWeight: 800,
                            display: 'block',
                            color: isCredit ? '#00e676' : '#ff3b50',
                          }}
                        >
                          {isCredit ? 'INFLOW' : 'OUTFLOW'}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

      </div>
    </Screen>
  )
}
