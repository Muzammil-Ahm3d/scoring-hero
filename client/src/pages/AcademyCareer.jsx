import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
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
} from 'lucide-react'
import Screen from '../components/Screen'

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
  // 1. STUDENT ROSTER & BATCHES STATE
  // =========================================================================
  const [selectedBatchFilter, setSelectedBatchFilter] = useState('all') // 'all' | 'u14' | 'u16' | 'u19' | 'weekend'
  const [searchQuery, setSearchQuery] = useState('')

  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Rohit Sharma',
      age: 17,
      ageGroup: 'u19',
      batch: 'U-19 Pro High Performance',
      role: 'Top-Order Batsman',
      guardianName: 'Ramakant Sharma',
      guardianPhone: '+91 98401 11223',
      attendanceRate: '96.4%',
      attendanceToday: 'present', // 'present' | 'late' | 'half' | 'absent' | 'leave'
      feeStatus: 'Paid',
      feeAmount: 3000,
      dueDate: '05 Nov 2026',
      receiptNo: 'REC-9912',
      yoyoScore: 19.8,
      battingAvg: '48.5',
      coachNote: 'Strong front-foot technique. Focus on back-foot punch off fast bowlers.',
      isVerified: true,
    },
    {
      id: 2,
      name: 'Kavya Raman',
      age: 15,
      ageGroup: 'u16',
      batch: 'U-16 Evening Elite',
      role: 'Right-Arm Fast Bowler',
      guardianName: 'Ramanathan K.',
      guardianPhone: '+91 98402 22334',
      attendanceRate: '94.2%',
      attendanceToday: 'present',
      feeStatus: 'Paid',
      feeAmount: 3000,
      dueDate: '05 Nov 2026',
      receiptNo: 'REC-9913',
      yoyoScore: 18.6,
      battingAvg: '124 km/h Pace',
      coachNote: 'Wrist position upright. Consistent good length hit 8 out of 10 balls today.',
      isVerified: true,
    },
    {
      id: 3,
      name: 'Aditya Sen',
      age: 16,
      ageGroup: 'u16',
      batch: 'U-16 Evening Elite',
      role: 'Wicketkeeper Batsman',
      guardianName: 'Sneha Sen',
      guardianPhone: '+91 98403 33445',
      attendanceRate: '88.5%',
      attendanceToday: 'present',
      feeStatus: 'Overdue',
      feeAmount: 3000,
      dueDate: '01 Nov 2026',
      receiptNo: '',
      yoyoScore: 17.8,
      battingAvg: '36.2',
      coachNote: 'Glove work clean against leg-spin. Footwork agile behind the stumps.',
      isVerified: true,
    },
    {
      id: 4,
      name: 'Arjun Das',
      age: 13,
      ageGroup: 'u14',
      batch: 'U-14 Morning Foundation',
      role: 'Leg-Spin Bowler',
      guardianName: 'Pradeep Das',
      guardianPhone: '+91 98404 44556',
      attendanceRate: '91.0%',
      attendanceToday: 'present',
      feeStatus: 'Overdue',
      feeAmount: 2500,
      dueDate: '01 Nov 2026',
      receiptNo: '',
      yoyoScore: 16.5,
      battingAvg: '3.8 Econ',
      coachNote: 'Googly disguised well. Working on flatter trajectory for T20 overs.',
      isVerified: true,
    },
    {
      id: 5,
      name: 'Divya Patel',
      age: 16,
      ageGroup: 'u16',
      batch: 'U-16 Evening Elite',
      role: 'Left-Hand All-Rounder',
      guardianName: 'Hiren Patel',
      guardianPhone: '+91 98405 55667',
      attendanceRate: '98.0%',
      attendanceToday: 'present',
      feeStatus: 'Paid',
      feeAmount: 3000,
      dueDate: '05 Nov 2026',
      receiptNo: 'REC-9914',
      yoyoScore: 19.2,
      battingAvg: '42.0',
      coachNote: 'Exceptional athletic fielding in the covers. Match-winning composure.',
      isVerified: true,
    },
    {
      id: 6,
      name: 'Sai Teja',
      age: 18,
      ageGroup: 'u19',
      batch: 'U-19 Pro High Performance',
      role: 'Fast Bowling All-Rounder',
      guardianName: 'Venkatesh T.',
      guardianPhone: '+91 98406 66778',
      attendanceRate: '95.5%',
      attendanceToday: 'present',
      feeStatus: 'Paid',
      feeAmount: 3000,
      dueDate: '05 Nov 2026',
      receiptNo: 'REC-9915',
      yoyoScore: 20.1,
      battingAvg: '128 km/h Pace',
      coachNote: 'Hitting the deck hard. Great yorker execution in the death overs.',
      isVerified: true,
    },
    {
      id: 7,
      name: 'Karan Singh',
      age: 12,
      ageGroup: 'weekend',
      batch: 'Weekend Grassroots Clinic',
      role: 'Right-Hand Batsman',
      guardianName: 'Gurmeet Singh',
      guardianPhone: '+91 98407 77889',
      attendanceRate: '82.0%',
      attendanceToday: 'absent',
      feeStatus: 'Paid',
      feeAmount: 2500,
      dueDate: '05 Nov 2026',
      receiptNo: 'REC-9916',
      yoyoScore: 15.4,
      battingAvg: '28.0',
      coachNote: 'Developing straight-bat defensive shots. Excused today for school exams.',
      isVerified: true,
    },
  ])

  // Filter students based on batch & search query
  const filteredStudents = students.filter((s) => {
    const matchesBatch = selectedBatchFilter === 'all' || s.ageGroup === selectedBatchFilter
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.guardianName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesBatch && matchesSearch
  })

  // =========================================================================
  // 2. COACHES & DRILLS STATE
  // =========================================================================
  const [coaches, setCoaches] = useState([
    {
      id: 1,
      name: 'Arjun Verma',
      role: 'Head Coach & Director',
      badge: 'BCCI Level 3',
      phone: '+91 98400 11001',
      shift: '05:30 AM - 11:30 AM',
      present: true,
    },
    {
      id: 2,
      name: 'Rahul Sharma',
      role: 'Pace Bowling Specialist',
      badge: 'State Certified',
      phone: '+91 98400 22002',
      shift: '06:00 AM - 10:00 AM',
      present: true,
    },
    {
      id: 3,
      name: 'Ashish KP',
      role: 'Batting Coach & Biomechanics',
      badge: 'NIS Certified',
      phone: '+91 98400 33003',
      shift: '03:30 PM - 07:30 PM',
      present: true,
    },
    {
      id: 4,
      name: 'Mohit Rao',
      role: 'Strength & Conditioning Trainer',
      badge: 'CSCS Level 2',
      phone: '+91 98400 44004',
      shift: '05:30 AM - 09:30 AM',
      present: true,
    },
  ])

  const [drills, setDrills] = useState([
    {
      id: 'd1',
      time: '06:00 AM - 07:00 AM',
      title: 'Yo-Yo Conditioning & Agility Ladders',
      venue: 'Main Ground Outfield',
      coach: 'Mohit Rao (S&C Trainer)',
      batch: 'U-19 & U-16 Squads',
      focus: 'Endurance, stamina & acceleration',
    },
    {
      id: 'd2',
      time: '07:00 AM - 08:15 AM',
      title: 'Target Bowling & Seam Position Net Session',
      venue: 'Turf Nets A & B',
      coach: 'Rahul Sharma (Bowling Coach)',
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
  ])

  // Attendance actions
  const toggleStudentAttendance = (studentId, status) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, attendanceToday: status } : s))
    )
    triggerToast('Student attendance updated!')
  }

  const markAllStudentsPresent = () => {
    setStudents((prev) => prev.map((s) => ({ ...s, attendanceToday: 'present' })))
    triggerToast('All students marked PRESENT for today!')
  }

  const toggleCoachAttendance = (coachId) => {
    setCoaches((prev) =>
      prev.map((c) => (c.id === coachId ? { ...c, present: !c.present } : c))
    )
    triggerToast('Coach on-duty status updated!')
  }

  // =========================================================================
  // 3. TUITION FEES & ACCOUNTS STATE
  // =========================================================================
  const totalExpectedFees = students.reduce((acc, s) => acc + s.feeAmount, 0)
  const totalCollectedFees = students
    .filter((s) => s.feeStatus === 'Paid')
    .reduce((acc, s) => acc + s.feeAmount, 0)
  const totalOverdueFees = students
    .filter((s) => s.feeStatus === 'Overdue')
    .reduce((acc, s) => acc + s.feeAmount, 0)
  const collectionRate = totalExpectedFees > 0 ? ((totalCollectedFees / totalExpectedFees) * 100).toFixed(1) : 0

  // 1-Tap fee reminder
  const sendFeeReminder = (student) => {
    const text = encodeURIComponent(
      `Hello ${student.guardianName}, this is a gentle fee reminder from Scoring Heroes Elite Cricket Academy for ${student.name}. Monthly tuition of ₹${student.feeAmount.toLocaleString()} is due. Please pay via UPI or at the academy counter. Thank you!`
    )
    const url = `https://wa.me/${student.guardianPhone.replace(/[^0-9]/g, '')}?text=${text}`
    window.open(url, '_blank')
    triggerToast(`Payment reminder opened for ${student.name}'s guardian!`)
  }

  // =========================================================================
  // 4. MODALS STATE
  // =========================================================================
  const [showAdmitModal, setShowAdmitModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(null)
  const [showReceiptModal, setShowReceiptModal] = useState(null)
  const [showRecordFeeModal, setShowRecordFeeModal] = useState(null)
  const [showAddDrillModal, setShowAddDrillModal] = useState(false)
  const [showStatementModal, setShowStatementModal] = useState(false)

  // Admission Form
  const [admitForm, setAdmitForm] = useState({
    name: '',
    age: '',
    ageGroup: 'u16',
    batch: 'U-16 Evening Elite',
    role: 'All-Rounder',
    guardianName: '',
    guardianPhone: '',
    monthlyFee: 3000,
    admissionFee: 5000,
  })

  // Record Fee Form
  const [feePaymentForm, setFeePaymentForm] = useState({
    studentId: '',
    amount: 3000,
    paymentMode: 'UPI QR Scan',
    date: '04 Nov 2026',
  })

  // Add Drill Form
  const [drillForm, setDrillForm] = useState({
    time: '06:00 AM - 07:30 AM',
    title: '',
    venue: 'Turf Nets A & B',
    coach: 'Arjun Verma (Head Coach)',
    batch: 'U-16 & U-19 Squads',
    focus: '',
  })

  // Handle Admission Submit
  const handleAdmitStudent = (e) => {
    e.preventDefault()
    if (!admitForm.name || !admitForm.guardianPhone) {
      alert('Please fill student name and guardian phone number!')
      return
    }

    const newStudent = {
      id: Date.now(),
      name: admitForm.name,
      age: Number(admitForm.age) || 15,
      ageGroup: admitForm.ageGroup,
      batch: admitForm.batch,
      role: admitForm.role,
      guardianName: admitForm.guardianName || 'Guardian',
      guardianPhone: admitForm.guardianPhone,
      attendanceRate: '100.0%',
      attendanceToday: 'present',
      feeStatus: 'Paid',
      feeAmount: Number(admitForm.monthlyFee) || 3000,
      dueDate: '05 Dec 2026',
      receiptNo: `REC-${Math.floor(1000 + Math.random() * 9000)}`,
      yoyoScore: 17.0,
      battingAvg: 'New Joining',
      coachNote: 'Newly enrolled student. Initial assessment scheduled.',
      isVerified: true,
    }

    setStudents((prev) => [newStudent, ...prev])
    setShowAdmitModal(false)
    setAdmitForm({
      name: '',
      age: '',
      ageGroup: 'u16',
      batch: 'U-16 Evening Elite',
      role: 'All-Rounder',
      guardianName: '',
      guardianPhone: '',
      monthlyFee: 3000,
      admissionFee: 5000,
    })
    triggerToast(`Student ${newStudent.name} admitted successfully!`)
  }

  // Handle Record Payment Submit
  const handleRecordPayment = (e) => {
    e.preventDefault()
    const student = students.find((s) => s.id === Number(feePaymentForm.studentId))
    if (!student) return

    const newReceiptNo = `REC-${Math.floor(1000 + Math.random() * 9000)}`

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

    setShowRecordFeeModal(null)
    setShowReceiptModal({
      ...student,
      receiptNo: newReceiptNo,
      paidAmount: Number(feePaymentForm.amount),
      paidMode: feePaymentForm.paymentMode,
      paidDate: feePaymentForm.date,
    })
    triggerToast(`Payment of ₹${feePaymentForm.amount.toLocaleString()} recorded for ${student.name}!`)
  }

  // Handle Add Drill Submit
  const handleAddDrill = (e) => {
    e.preventDefault()
    if (!drillForm.title) {
      alert('Please enter drill title!')
      return
    }

    const newDrill = {
      id: `d-${Date.now()}`,
      time: drillForm.time,
      title: drillForm.title,
      venue: drillForm.venue,
      coach: drillForm.coach,
      batch: drillForm.batch,
      focus: drillForm.focus || 'Technical execution & fitness',
    }

    setDrills((prev) => [...prev, newDrill])
    setShowAddDrillModal(false)
    setDrillForm({
      time: '06:00 AM - 07:30 AM',
      title: '',
      venue: 'Turf Nets A & B',
      coach: 'Arjun Verma (Head Coach)',
      batch: 'U-16 & U-19 Squads',
      focus: '',
    })
    triggerToast(`New training drill added to daily schedule!`)
  }

  return (
    <Screen
      back
      title="Sports Academy Operations"
      subtitle="Student Batches, Daily Attendance & Tuition Fees"
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
            <span>Fee Collection</span>
          </button>
        </div>

        {/* =========================================================================
            TAB 1: STUDENT BATCHES & ROSTER
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
                    Trainee Management
                  </span>
                  <h3 style={{ fontSize: 16, fontWeight: 900, color: '#f8fafc', margin: '2px 0 0' }}>
                    Enrolled Students ({students.length})
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAdmitModal(true)}
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
                  placeholder="Search student by name, role or guardian..."
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
                  <p style={{ color: 'var(--muted)', margin: 0 }}>No students found matching your filter.</p>
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
                            width: 42,
                            height: 42,
                            borderRadius: 10,
                            background: 'rgba(124, 77, 255, 0.15)',
                            border: '1px solid rgba(124, 77, 255, 0.35)',
                            display: 'grid',
                            placeItems: 'center',
                            color: '#b388ff',
                            fontWeight: 900,
                            fontSize: 16,
                          }}
                        >
                          {st.name.charAt(0)}
                        </div>

                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <strong style={{ fontSize: 15, color: '#f8fafc' }}>{st.name}</strong>
                            {st.isVerified && (
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
                                ✓ KYC
                              </span>
                            )}
                          </div>
                          <span style={{ fontSize: 12, color: '#38bdf8', fontWeight: 700 }}>
                            {st.role} • {st.age} yrs
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

                    {/* Guardian & Coach Note Strip */}
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
                        gap: 4,
                      }}
                    >
                      <span style={{ color: 'var(--muted)' }}>
                        Guardian: <strong style={{ color: '#f8fafc' }}>{st.guardianName}</strong> ({st.guardianPhone})
                      </span>
                      <span style={{ color: '#ffc83d' }}>
                        Yo-Yo Fitness: <strong>{st.yoyoScore}</strong>
                      </span>
                    </div>

                    {/* Action Buttons Row */}
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 2 }}>
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
                        <Phone size={13} /> Call Guardian
                      </a>

                      <button
                        type="button"
                        onClick={() => setShowReportModal(st)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 8,
                          background: 'rgba(124, 77, 255, 0.15)',
                          border: '1px solid rgba(124, 77, 255, 0.35)',
                          color: '#b388ff',
                          fontSize: 11,
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 5,
                        }}
                      >
                        <Award size={13} /> Performance Report
                      </button>

                      {st.feeStatus === 'Overdue' && (
                        <button
                          type="button"
                          onClick={() => sendFeeReminder(st)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: 8,
                            background: 'rgba(0, 230, 118, 0.15)',
                            border: '1px solid #00e676',
                            color: '#00e676',
                            fontSize: 11,
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 5,
                          }}
                        >
                          <Send size={13} /> Remind Fee
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: DAILY ATTENDANCE & TRAINING DRILLS
        ========================================================================= */}
        {activeTab === 'attendance' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Daily Attendance Header Card */}
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
                  <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Daily Roll Call Tracker
                  </span>
                  <h3 style={{ fontSize: 16, fontWeight: 900, color: '#f8fafc', margin: '2px 0 0' }}>
                    Today: Wednesday, 4 Nov 2026
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={markAllStudentsPresent}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 10,
                    border: 'none',
                    background: 'rgba(0, 230, 118, 0.15)',
                    border: '1px solid #00e676',
                    color: '#00e676',
                    fontWeight: 900,
                    fontSize: 11,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <Check size={14} /> Mark All Present
                </button>
              </div>

              {/* Attendance Statistics Strip */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 8 }}>
                <div style={{ padding: '10px', background: 'rgba(0, 230, 118, 0.08)', borderRadius: 10, border: '1px solid rgba(0, 230, 118, 0.25)', textAlign: 'center' }}>
                  <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>PRESENT</span>
                  <strong style={{ fontSize: 18, color: '#00e676', display: 'block', marginTop: 2 }}>
                    {students.filter((s) => s.attendanceToday === 'present').length} / {students.length}
                  </strong>
                </div>

                <div style={{ padding: '10px', background: 'rgba(255, 200, 61, 0.08)', borderRadius: 10, border: '1px solid rgba(255, 200, 61, 0.25)', textAlign: 'center' }}>
                  <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>LATE / HALF</span>
                  <strong style={{ fontSize: 18, color: '#ffc83d', display: 'block', marginTop: 2 }}>
                    {students.filter((s) => s.attendanceToday === 'late' || s.attendanceToday === 'half').length}
                  </strong>
                </div>

                <div style={{ padding: '10px', background: 'rgba(255, 59, 80, 0.08)', borderRadius: 10, border: '1px solid rgba(255, 59, 80, 0.25)', textAlign: 'center' }}>
                  <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>ABSENT</span>
                  <strong style={{ fontSize: 18, color: '#ff3b50', display: 'block', marginTop: 2 }}>
                    {students.filter((s) => s.attendanceToday === 'absent' || s.attendanceToday === 'leave').length}
                  </strong>
                </div>
              </div>
            </div>

            {/* Student Roll Call List */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                padding: '14px',
                borderRadius: 14,
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <h4 style={{ fontSize: 13, fontWeight: 900, color: '#f8fafc', textTransform: 'uppercase', margin: '0 0 10px' }}>
                Student Attendance Roll Call
              </h4>

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
                            onClick={() => toggleStudentAttendance(st.id, btn.key)}
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

            {/* Coach On-Duty Status */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                padding: '14px',
                borderRadius: 14,
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <h4 style={{ fontSize: 13, fontWeight: 900, color: '#f8fafc', textTransform: 'uppercase', margin: '0 0 10px' }}>
                Coach Roster On-Duty Today ({coaches.length})
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                {coaches.map((c) => (
                  <div
                    key={c.id}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 10,
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: 13, color: '#f8fafc' }}>{c.name}</strong>
                      <button
                        type="button"
                        onClick={() => toggleCoachAttendance(c.id)}
                        style={{
                          padding: '3px 8px',
                          borderRadius: 6,
                          border: 'none',
                          background: c.present ? 'rgba(0, 230, 118, 0.15)' : 'rgba(255, 59, 80, 0.15)',
                          color: c.present ? '#00e676' : '#ff3b50',
                          fontSize: 10,
                          fontWeight: 800,
                          cursor: 'pointer',
                        }}
                      >
                        {c.present ? 'ON DUTY' : 'OFF DUTY'}
                      </button>
                    </div>
                    <span style={{ fontSize: 11, color: '#38bdf8' }}>{c.role}</span>
                    <small style={{ fontSize: 10, color: 'var(--muted)' }}>🕒 {c.shift}</small>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Training Drills Syllabus */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                padding: '14px',
                borderRadius: 14,
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h4 style={{ fontSize: 13, fontWeight: 900, color: '#f8fafc', textTransform: 'uppercase', margin: 0 }}>
                  Today's Training Drills Schedule
                </h4>

                <button
                  type="button"
                  onClick={() => setShowAddDrillModal(true)}
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

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {drills.map((d) => (
                  <div
                    key={d.id}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 12,
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 800,
                          color: '#ffc83d',
                          background: 'rgba(255, 200, 61, 0.12)',
                          padding: '2px 8px',
                          borderRadius: 6,
                        }}
                      >
                        🕒 {d.time}
                      </span>
                      <span style={{ fontSize: 11, color: '#38bdf8', fontWeight: 700 }}>
                        📍 {d.venue}
                      </span>
                    </div>

                    <strong style={{ fontSize: 14, color: '#f8fafc', marginTop: 2 }}>{d.title}</strong>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                      Coach: <strong style={{ color: '#f8fafc' }}>{d.coach}</strong> • Batch: <span>{d.batch}</span>
                    </div>
                    <div style={{ fontSize: 11, color: '#00e676', marginTop: 2 }}>
                      🎯 Focus: {d.focus}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: TUITION FEES & ACCOUNTS
        ========================================================================= */}
        {activeTab === 'fees' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Fee Health Summary Card */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(0, 230, 118, 0.06))',
                padding: '16px',
                borderRadius: 14,
                border: '1px solid rgba(0, 230, 118, 0.3)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Academy Fee Ledger
                  </span>
                  <h3 style={{ fontSize: 17, fontWeight: 900, color: '#f8fafc', margin: '2px 0 0' }}>
                    November 2026 Tuition Collection
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setShowStatementModal(true)}
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
                  <FileText size={14} /> Audit Sheet
                </button>
              </div>

              {/* 3 Metric Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 12 }}>
                <div style={{ padding: '12px 10px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 10, border: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center' }}>
                  <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>EXPECTED</span>
                  <strong style={{ fontSize: 16, color: '#f8fafc', display: 'block', marginTop: 2 }}>
                    ₹{totalExpectedFees.toLocaleString()}
                  </strong>
                  <small style={{ fontSize: 9, color: '#64748b' }}>{students.length} Students</small>
                </div>

                <div style={{ padding: '12px 10px', background: 'rgba(0, 230, 118, 0.1)', borderRadius: 10, border: '1px solid rgba(0, 230, 118, 0.3)', textAlign: 'center' }}>
                  <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>COLLECTED</span>
                  <strong style={{ fontSize: 16, color: '#00e676', display: 'block', marginTop: 2 }}>
                    ₹{totalCollectedFees.toLocaleString()}
                  </strong>
                  <small style={{ fontSize: 9, color: '#00e676', fontWeight: 800 }}>{collectionRate}% Efficiency</small>
                </div>

                <div style={{ padding: '12px 10px', background: 'rgba(255, 59, 80, 0.1)', borderRadius: 10, border: '1px solid rgba(255, 59, 80, 0.3)', textAlign: 'center' }}>
                  <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>OVERDUE DUES</span>
                  <strong style={{ fontSize: 16, color: '#ff3b50', display: 'block', marginTop: 2 }}>
                    ₹{totalOverdueFees.toLocaleString()}
                  </strong>
                  <small style={{ fontSize: 9, color: '#ff3b50', fontWeight: 800 }}>
                    {students.filter((s) => s.feeStatus === 'Overdue').length} Pending
                  </small>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ width: '100%', height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${collectionRate}%`, height: '100%', background: 'linear-gradient(90deg, #7c4dff, #00e676)', borderRadius: 3 }} />
              </div>
            </div>

            {/* Overdue Alert Banner if any overdue */}
            {totalOverdueFees > 0 && (
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 59, 80, 0.12), rgba(255, 200, 61, 0.08))',
                  padding: '12px 14px',
                  borderRadius: 12,
                  border: '1px solid rgba(255, 59, 80, 0.35)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 8,
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <AlertTriangle size={16} color="#ff3b50" />
                    <strong style={{ fontSize: 13, color: '#f8fafc' }}>
                      2 Students with Overdue Tuition Fees (₹{totalOverdueFees.toLocaleString()})
                    </strong>
                  </div>
                  <small style={{ color: '#94a3b8', fontSize: 11 }}>
                    Send automated WhatsApp payment link with QR code to parents.
                  </small>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const overdue = students.filter((s) => s.feeStatus === 'Overdue')
                    overdue.forEach((st) => sendFeeReminder(st))
                  }}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 8,
                    background: '#00e676',
                    border: 'none',
                    color: '#020617',
                    fontWeight: 900,
                    fontSize: 11,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <Send size={13} /> 1-Tap Remind All
                </button>
              </div>
            )}

            {/* Itemized Student Fee Ledger Table */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 900, color: '#f8fafc', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Student Fee Ledger ({students.length})
                </span>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>November Billing Cycle</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {students.map((st) => {
                  const isPaid = st.feeStatus === 'Paid'
                  return (
                    <div
                      key={st.id}
                      style={{
                        padding: '12px 14px',
                        borderRadius: 12,
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: isPaid ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(255, 59, 80, 0.35)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 10,
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <strong style={{ fontSize: 14, color: '#f8fafc' }}>{st.name}</strong>
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 800,
                              padding: '2px 6px',
                              borderRadius: 4,
                              background: isPaid ? 'rgba(0, 230, 118, 0.15)' : 'rgba(255, 59, 80, 0.15)',
                              color: isPaid ? '#00e676' : '#ff3b50',
                            }}
                          >
                            {st.feeStatus}
                          </span>
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                          {st.batch} • Guardian: <span>{st.guardianName}</span> ({st.guardianPhone})
                        </div>
                        {isPaid && (
                          <small style={{ fontSize: 10, color: '#38bdf8', marginTop: 2, display: 'block' }}>
                            Receipt: {st.receiptNo} • Due: {st.dueDate}
                          </small>
                        )}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ textAlign: 'right' }}>
                          <strong style={{ fontSize: 15, color: isPaid ? '#00e676' : '#ff3b50', display: 'block' }}>
                            ₹{st.feeAmount.toLocaleString()}
                          </strong>
                          <small style={{ fontSize: 10, color: 'var(--muted)' }}>Monthly Fee</small>
                        </div>

                        <div style={{ display: 'flex', gap: 6 }}>
                          {isPaid ? (
                            <button
                              type="button"
                              onClick={() => setShowReceiptModal(st)}
                              style={{
                                padding: '6px 10px',
                                borderRadius: 8,
                                background: 'rgba(0, 176, 255, 0.12)',
                                border: '1px solid rgba(0, 176, 255, 0.3)',
                                color: '#00b0ff',
                                fontSize: 11,
                                fontWeight: 800,
                                cursor: 'pointer',
                              }}
                            >
                              Receipt
                            </button>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() => {
                                  setFeePaymentForm((prev) => ({
                                    ...prev,
                                    studentId: st.id,
                                    amount: st.feeAmount,
                                  }))
                                  setShowRecordFeeModal(st)
                                }}
                                style={{
                                  padding: '6px 12px',
                                  borderRadius: 8,
                                  background: 'linear-gradient(135deg, #00e676, #00b0ff)',
                                  border: 'none',
                                  color: '#020617',
                                  fontSize: 11,
                                  fontWeight: 900,
                                  cursor: 'pointer',
                                }}
                              >
                                Record Pay
                              </button>

                              <button
                                type="button"
                                onClick={() => sendFeeReminder(st)}
                                style={{
                                  padding: '6px 10px',
                                  borderRadius: 8,
                                  background: 'rgba(0, 230, 118, 0.15)',
                                  border: '1px solid #00e676',
                                  color: '#00e676',
                                  fontSize: 11,
                                  fontWeight: 800,
                                  cursor: 'pointer',
                                }}
                              >
                                <Send size={12} />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODAL 1: ADMIT NEW STUDENT
        ========================================================================= */}
        {showAdmitModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: 480,
                maxHeight: '90vh',
                overflowY: 'auto',
                background: '#0b1329',
                borderRadius: 16,
                border: '1px solid rgba(124, 77, 255, 0.4)',
                padding: 20,
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h3 style={{ fontSize: 17, fontWeight: 900, color: '#f8fafc', margin: 0 }}>
                  👥 Admit New Trainee
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAdmitModal(false)}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 18 }}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAdmitStudent} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Student Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senthil Raman"
                    value={admitForm.name}
                    onChange={(e) => setAdmitForm({ ...admitForm, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#f8fafc',
                      fontSize: 13,
                      marginTop: 4,
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Age</label>
                    <input
                      type="number"
                      required
                      placeholder="15"
                      value={admitForm.age}
                      onChange={(e) => setAdmitForm({ ...admitForm, age: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#f8fafc',
                        fontSize: 13,
                        marginTop: 4,
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Primary Role</label>
                    <select
                      value={admitForm.role}
                      onChange={(e) => setAdmitForm({ ...admitForm, role: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#f8fafc',
                        fontSize: 13,
                        marginTop: 4,
                      }}
                    >
                      <option value="Top-Order Batsman">Top-Order Batsman</option>
                      <option value="Middle-Order Batsman">Middle-Order Batsman</option>
                      <option value="Right-Arm Fast Bowler">Right-Arm Fast Bowler</option>
                      <option value="Left-Arm Fast Bowler">Left-Arm Fast Bowler</option>
                      <option value="Spin Bowler">Spin Bowler</option>
                      <option value="All-Rounder">All-Rounder</option>
                      <option value="Wicketkeeper Batsman">Wicketkeeper Batsman</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Assigned Batch</label>
                    <select
                      value={admitForm.batch}
                      onChange={(e) => {
                        const val = e.target.value
                        let grp = 'u16'
                        if (val.includes('U-14')) grp = 'u14'
                        else if (val.includes('U-19')) grp = 'u19'
                        else if (val.includes('Weekend')) grp = 'weekend'
                        setAdmitForm({ ...admitForm, batch: val, ageGroup: grp })
                      }}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#f8fafc',
                        fontSize: 13,
                        marginTop: 4,
                      }}
                    >
                      <option value="U-14 Morning Foundation">U-14 Morning Foundation</option>
                      <option value="U-16 Evening Elite">U-16 Evening Elite</option>
                      <option value="U-19 Pro High Performance">U-19 Pro High Performance</option>
                      <option value="Weekend Grassroots Clinic">Weekend Grassroots Clinic</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Monthly Tuition (₹)</label>
                    <input
                      type="number"
                      required
                      value={admitForm.monthlyFee}
                      onChange={(e) => setAdmitForm({ ...admitForm, monthlyFee: Number(e.target.value) })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#00e676',
                        fontWeight: 900,
                        fontSize: 13,
                        marginTop: 4,
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Guardian Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Ramanathan S."
                      value={admitForm.guardianName}
                      onChange={(e) => setAdmitForm({ ...admitForm, guardianName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#f8fafc',
                        fontSize: 13,
                        marginTop: 4,
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Guardian Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="9876543210"
                      value={admitForm.guardianPhone}
                      onChange={(e) => setAdmitForm({ ...admitForm, guardianPhone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#f8fafc',
                        fontSize: 13,
                        marginTop: 4,
                      }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    marginTop: 10,
                    padding: '12px',
                    borderRadius: 10,
                    border: 'none',
                    background: 'linear-gradient(135deg, #7c4dff, #00b0ff)',
                    color: '#ffffff',
                    fontWeight: 900,
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  ✓ Complete Admission & Issue Student ID
                </button>
              </form>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODAL 2: PERFORMANCE REPORT CARD
        ========================================================================= */}
        {showReportModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: 440,
                background: '#0b1329',
                borderRadius: 16,
                border: '1px solid rgba(124, 77, 255, 0.4)',
                padding: 20,
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span
                  style={{
                    padding: '3px 8px',
                    borderRadius: 6,
                    background: 'rgba(124, 77, 255, 0.15)',
                    color: '#b388ff',
                    fontSize: 11,
                    fontWeight: 800,
                  }}
                >
                  ACADEMY PERFORMANCE REPORT
                </span>
                <button
                  type="button"
                  onClick={() => setShowReportModal(null)}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 18 }}
                >
                  ✕
                </button>
              </div>

              <div style={{ textAlign: 'center', marginBottom: 14 }}>
                <h3 style={{ fontSize: 18, fontWeight: 900, color: '#f8fafc', margin: '0 0 2px' }}>
                  {showReportModal.name}
                </h3>
                <span style={{ fontSize: 12, color: '#38bdf8', fontWeight: 700 }}>
                  {showReportModal.batch} • {showReportModal.role}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 14 }}>
                <div style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, textAlign: 'center' }}>
                  <span style={{ fontSize: 10, color: 'var(--muted)' }}>ATTENDANCE</span>
                  <strong style={{ fontSize: 15, color: '#00e676', display: 'block', marginTop: 2 }}>
                    {showReportModal.attendanceRate}
                  </strong>
                </div>
                <div style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, textAlign: 'center' }}>
                  <span style={{ fontSize: 10, color: 'var(--muted)' }}>YO-YO TEST</span>
                  <strong style={{ fontSize: 15, color: '#ffc83d', display: 'block', marginTop: 2 }}>
                    {showReportModal.yoyoScore}
                  </strong>
                </div>
                <div style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, textAlign: 'center' }}>
                  <span style={{ fontSize: 10, color: 'var(--muted)' }}>METRIC</span>
                  <strong style={{ fontSize: 14, color: '#38bdf8', display: 'block', marginTop: 2 }}>
                    {showReportModal.battingAvg}
                  </strong>
                </div>
              </div>

              <div
                style={{
                  padding: '12px',
                  borderRadius: 10,
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  marginBottom: 14,
                }}
              >
                <span style={{ fontSize: 11, color: '#b388ff', fontWeight: 800, textTransform: 'uppercase' }}>
                  Coach Technical Assessment:
                </span>
                <p style={{ fontSize: 12, color: '#f8fafc', margin: '4px 0 0', lineHeight: 1.5 }}>
                  "{showReportModal.coachNote}"
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  window.print()
                }}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: 8,
                  background: '#7c4dff',
                  border: 'none',
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: 12,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                <Printer size={15} /> Print Report Card
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODAL 3: OFFICIAL FEE RECEIPT
        ========================================================================= */}
        {showReceiptModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: 420,
                background: '#0b1329',
                borderRadius: 16,
                border: '1px solid rgba(0, 230, 118, 0.4)',
                padding: 20,
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span
                  style={{
                    padding: '3px 8px',
                    borderRadius: 6,
                    background: 'rgba(0, 230, 118, 0.15)',
                    color: '#00e676',
                    fontSize: 11,
                    fontWeight: 800,
                  }}
                >
                  OFFICIAL FEE RECEIPT
                </span>
                <button
                  type="button"
                  onClick={() => setShowReceiptModal(null)}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 18 }}
                >
                  ✕
                </button>
              </div>

              <div style={{ textAlign: 'center', marginBottom: 14 }}>
                <h3 style={{ fontSize: 17, fontWeight: 900, color: '#f8fafc', margin: '0 0 2px' }}>
                  Scoring Heroes Cricket Academy
                </h3>
                <small style={{ color: 'var(--muted)', fontSize: 11 }}>
                  State Cricket Affiliation No: TN-SPO-2023-771
                </small>
              </div>

              <div
                style={{
                  padding: '12px',
                  borderRadius: 10,
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>Receipt No:</span>
                  <strong style={{ color: '#00e676' }}>{showReceiptModal.receiptNo}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>Student Name:</span>
                  <strong style={{ color: '#f8fafc' }}>{showReceiptModal.name}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>Batch:</span>
                  <strong style={{ color: '#f8fafc' }}>{showReceiptModal.batch}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>Guardian:</span>
                  <strong style={{ color: '#f8fafc' }}>{showReceiptModal.guardianName}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>Month:</span>
                  <strong style={{ color: '#f8fafc' }}>November 2026</strong>
                </div>
                <hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '4px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#f8fafc', fontWeight: 800 }}>Amount Paid:</span>
                  <strong style={{ color: '#00e676' }}>₹{showReceiptModal.feeAmount?.toLocaleString()}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                  <span style={{ color: 'var(--muted)' }}>Payment Mode:</span>
                  <span style={{ color: '#38bdf8' }}>UPI QR / Online Verification</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                <button
                  type="button"
                  onClick={() => window.print()}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#f8fafc',
                    fontWeight: 800,
                    fontSize: 12,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  <Printer size={15} /> Print Receipt
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sendFeeReminder(showReceiptModal)
                    setShowReceiptModal(null)
                  }}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: 8,
                    background: '#00e676',
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
                  <Share2 size={15} /> Share on WhatsApp
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODAL 4: RECORD FEE PAYMENT
        ========================================================================= */}
        {showRecordFeeModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: 420,
                background: '#0b1329',
                borderRadius: 16,
                border: '1px solid rgba(0, 230, 118, 0.4)',
                padding: 20,
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h3 style={{ fontSize: 17, fontWeight: 900, color: '#f8fafc', margin: 0 }}>
                  💸 Record Tuition Fee Payment
                </h3>
                <button
                  type="button"
                  onClick={() => setShowRecordFeeModal(null)}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 18 }}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleRecordPayment} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Student</label>
                  <input
                    type="text"
                    readOnly
                    value={`${showRecordFeeModal.name} (${showRecordFeeModal.batch})`}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#f8fafc',
                      fontSize: 13,
                      marginTop: 4,
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Amount (₹)</label>
                    <input
                      type="number"
                      required
                      value={feePaymentForm.amount}
                      onChange={(e) => setFeePaymentForm({ ...feePaymentForm, amount: Number(e.target.value) })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid #00e676',
                        color: '#00e676',
                        fontWeight: 900,
                        fontSize: 14,
                        marginTop: 4,
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Payment Mode</label>
                    <select
                      value={feePaymentForm.paymentMode}
                      onChange={(e) => setFeePaymentForm({ ...feePaymentForm, paymentMode: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#f8fafc',
                        fontSize: 13,
                        marginTop: 4,
                      }}
                    >
                      <option value="UPI QR Scan">UPI QR Scan</option>
                      <option value="Cash at Counter">Cash at Counter</option>
                      <option value="Bank NEFT">Bank NEFT / IMPS</option>
                      <option value="Cheque">Bank Cheque</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    marginTop: 10,
                    padding: '12px',
                    borderRadius: 10,
                    border: 'none',
                    background: '#00e676',
                    color: '#020617',
                    fontWeight: 900,
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  ✓ Confirm Payment & Issue Receipt
                </button>
              </form>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODAL 5: ADD TRAINING DRILL
        ========================================================================= */}
        {showAddDrillModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: 440,
                background: '#0b1329',
                borderRadius: 16,
                border: '1px solid rgba(0, 176, 255, 0.4)',
                padding: 20,
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h3 style={{ fontSize: 17, fontWeight: 900, color: '#f8fafc', margin: 0 }}>
                  📋 Add Training Drill
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAddDrillModal(false)}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 18 }}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddDrill} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Drill Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Boundary Catching & Relays"
                    value={drillForm.title}
                    onChange={(e) => setDrillForm({ ...drillForm, title: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#f8fafc',
                      fontSize: 13,
                      marginTop: 4,
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Time Slot</label>
                    <input
                      type="text"
                      value={drillForm.time}
                      onChange={(e) => setDrillForm({ ...drillForm, time: e.target.value })}
                      placeholder="06:00 AM - 07:30 AM"
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#f8fafc',
                        fontSize: 13,
                        marginTop: 4,
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Location / Pitch</label>
                    <select
                      value={drillForm.venue}
                      onChange={(e) => setDrillForm({ ...drillForm, venue: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#f8fafc',
                        fontSize: 13,
                        marginTop: 4,
                      }}
                    >
                      <option value="Turf Nets A & B">Turf Nets A & B</option>
                      <option value="Turf Net C (Bowling Machine)">Net C (Machine)</option>
                      <option value="Main Oval Center Turf">Center Turf Wicket</option>
                      <option value="Main Ground Outfield">Main Outfield</option>
                      <option value="Gym & Fitness Zone">Gym & Fitness Zone</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>Technical Focus</label>
                  <input
                    type="text"
                    placeholder="e.g. High catches, flat throws & direct hits"
                    value={drillForm.focus}
                    onChange={(e) => setDrillForm({ ...drillForm, focus: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#f8fafc',
                      fontSize: 13,
                      marginTop: 4,
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    marginTop: 10,
                    padding: '12px',
                    borderRadius: 10,
                    border: 'none',
                    background: '#00b0ff',
                    color: '#020617',
                    fontWeight: 900,
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  ✓ Add Drill to Syllabus
                </button>
              </form>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODAL 6: ACCOUNTS & AUDIT STATEMENT
        ========================================================================= */}
        {showStatementModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: 460,
                background: '#0b1329',
                borderRadius: 16,
                border: '1px solid rgba(0, 176, 255, 0.4)',
                padding: 20,
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h3 style={{ fontSize: 17, fontWeight: 900, color: '#f8fafc', margin: 0 }}>
                  📄 Academy Accounts Audit
                </h3>
                <button
                  type="button"
                  onClick={() => setShowStatementModal(false)}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 18 }}
                >
                  ✕
                </button>
              </div>

              <div
                style={{
                  padding: '14px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: 12,
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>Period:</span>
                  <strong style={{ color: '#f8fafc' }}>01 Nov 2026 – 30 Nov 2026</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>Enrolled Students:</span>
                  <strong style={{ color: '#f8fafc' }}>{students.length} Trainees</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>Total Expected:</span>
                  <strong style={{ color: '#f8fafc' }}>₹{totalExpectedFees.toLocaleString()}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>Fees Collected:</span>
                  <strong style={{ color: '#00e676' }}>+₹{totalCollectedFees.toLocaleString()}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>Pending Dues:</span>
                  <strong style={{ color: '#ff3b50' }}>₹{totalOverdueFees.toLocaleString()}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>Collection Efficiency:</span>
                  <strong style={{ color: '#00e676' }}>{collectionRate}%</strong>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                <button
                  type="button"
                  onClick={() => window.print()}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#f8fafc',
                    fontWeight: 800,
                    fontSize: 12,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  <Printer size={15} /> Print Statement
                </button>

                <button
                  type="button"
                  onClick={() => {
                    triggerToast('Statement downloaded as PDF successfully!')
                    setShowStatementModal(false)
                  }}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: 8,
                    background: '#00b0ff',
                    border: 'none',
                    color: '#020617',
                    fontWeight: 900,
                    fontSize: 12,
                    cursor: 'pointer',
                  }}
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Screen>
  )
}
