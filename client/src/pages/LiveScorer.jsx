import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  RotateCcw,
  CloudRain,
  FileText,
  Video,
  MoreHorizontal,
  Settings,
  ChevronLeft,
  Share2,
  Mic,
  Volume2,
  VolumeX,
  Sparkles,
  Zap,
  Radio,
  Target,
  Compass,
  Play,
  CheckCircle2,
} from 'lucide-react'
import Screen from '../components/Screen'
import './LiveScorer.css'

// =========================================================================
// CRICKET SHOT TYPES & PLACEMENT ZONES
// =========================================================================
const SHOT_TYPES = [
  { id: 'straight_drive', label: 'Straight Drive', zone: 'Down the Ground / Mid-Off', emoji: '🏏' },
  { id: 'cover_drive', label: 'Cover Drive', zone: 'Through Extra Cover', emoji: '🏏' },
  { id: 'mid_off', label: 'Mid-Off Push', zone: 'Towards Mid-Off', emoji: '📍' },
  { id: 'mid_on', label: 'Mid-On Punch', zone: 'Towards Mid-On', emoji: '📍' },
  { id: 'square_cut', label: 'Square Cut', zone: 'Behind Point', emoji: '⚡' },
  { id: 'pull_shot', label: 'Pull Shot', zone: 'Through Mid-Wicket', emoji: '💥' },
  { id: 'flick', label: 'Flick off Pads', zone: 'Through Square Leg', emoji: '🎯' },
  { id: 'sweep', label: 'Sweep Shot', zone: 'Fine Leg / Backward Square', emoji: '🔄' },
  { id: 'lofted_drive', label: 'Lofted Drive', zone: 'Over Long-On / Long-Off', emoji: '🚀' },
  { id: 'defense', label: 'Forward Defense', zone: 'Back to Bowler / Pitch', emoji: '🛡️' },
  { id: 'edge', label: 'Outside Edge', zone: 'Gully / Third Man / Slips', emoji: '⚠️' },
]

// =========================================================================
// ENGLISH-ONLY COMMENTARY GENERATOR ENGINE
// =========================================================================
function generateEnglishCommentary(val, type, shotObj, batsman, bowler, overStr, currentRuns, wickets) {
  const shot = shotObj.label
  const zone = shotObj.zone

  // Boundaries (4s)
  if (val === '4') {
    const lines = [
      `FOUR! Pure batting royalty from ${batsman.name}! Leans into a classical ${shot} ${zone}! The timing is immaculate, tracing the turf all the way to the boundary fence!`,
      `CRACK! FOUR RUNS! ${batsman.name} picks the length early and unfurls a glorious ${shot} ${zone}! ${bowler.name} can only watch as the sweeper is beaten with disdain!`,
      `FOUR! Shot of the day! Upright stance, pristine high elbow on that ${shot} ${zone}! Pierces the gap to perfection, four more added to the total!`,
      `GLORIOUS! ${batsman.name} punches with supreme authority! Crisp ${shot} speeding ${zone}! The crowd erupts as the ball rattles the advertising cushions!`,
    ]
    return lines[Math.floor(Math.random() * lines.length)]
  }

  // Maximums (6s)
  if (val === '6') {
    const lines = [
      `SIX! THAT IS MONSTROUS! ${batsman.name} dances down the pitch and launches an enormous ${shot} ${zone}! Cleans out the stadium, landing 15 rows back!`,
      `INTO ORBIT! SIX RUNS! ${batsman.name} detects the slower ball and unleashes an explosive ${shot} ${zone}! High, handsome, and into the night sky!`,
      `SIX! Raw kinetic power! ${batsman.name} clears the front leg and smokes that ${shot} ${zone}! What a sensational hit from the set batsman!`,
    ]
    return lines[Math.floor(Math.random() * lines.length)]
  }

  // Wickets (W)
  if (val === 'W' || type === 'wicket') {
    const lines = [
      `OUT! GONE! HUGE BREAKTHROUGH! ${batsman.name} attempts the ${shot} ${zone}, but gets a leading edge! Simple catch taken, and ${bowler.name} strikes with venom!`,
      `WICKET! CLEAN BOWLED! ${bowler.name} produces absolute magic! Deceptive nip-backer beats the ${shot} completely and shatters the timber! Disbelief for ${batsman.name}!`,
      `OUT! EDGED AND TAKEN! ${bowler.name} draws ${batsman.name} forward on the ${shot}, takes the outside edge, and the keeper pouches it cleanly! Crucial blow!`,
    ]
    return lines[Math.floor(Math.random() * lines.length)]
  }

  // Singles & Twos
  if (val === '1') {
    const lines = [
      `Dropped with soft hands on the ${shot} ${zone}. Quick call of yes and they scurry through for a sharp single. Intelligent strike rotation.`,
      `Pushed firmly on the ${shot} towards ${zone}. The fielder tidies up quickly, just a single on offer.`,
      `Works the wrists neatly on the ${shot} ${zone}. One run taken, keeping the scoreboard moving nicely.`,
    ]
    return lines[Math.floor(Math.random() * lines.length)]
  }

  if (val === '2') {
    const lines = [
      `Driven into the deep pocket ${zone} on the ${shot}. They turn aggressively for the second run and make their ground comfortably! Excellent running!`,
      `Placed gently ${zone} with a balanced ${shot}. Good hustle between the wickets allows two easy runs.`,
    ]
    return lines[Math.floor(Math.random() * lines.length)]
  }

  if (val === '3') {
    return `Stroked past the inner ring ${zone} on the ${shot}! Superb fielding on the rope saves one, three runs conceded.`
  }

  // Dot Ball (0)
  if (val === '0') {
    if (shotObj.id === 'edge') {
      return `BEATEN! Snorting delivery from ${bowler.name}! Whistles past the outside edge as ${batsman.name} was searching for contact. Dot ball.`
    }
    const lines = [
      `Good length ball on off stump, ${batsman.name} meets it with a solid ${shot} ${zone}. Fielded inside the ring, no run.`,
      `Well bowled by ${bowler.name}. Cramps the batsman for room, ${shot} straight to the fielder. No run conceded.`,
      `Defended calmly back down the track. ${bowler.name} collects on the bounce. Dot ball.`,
    ]
    return lines[Math.floor(Math.random() * lines.length)]
  }

  // Extras
  if (val === 'Wd') {
    return `WIDE! ${bowler.name} loses control of radar, spraying it well outside off stump. Extra run added to the scorecard.`
  }
  if (val === 'Nb') {
    return `NO BALL! High drama as ${bowler.name} oversteps the line! Free hit coming up on the very next delivery!`
  }
  if (val === 'B' || val === 'Lb') {
    return `Beats the bat, off the pads down ${zone} for leg byes. Extra run taken by the running batsmen.`
  }

  return `Punched through ${zone} on the ${shot}. Score advances.`
}

// Keypad matrix configuration (matching User Screenshot 2)
const keyPadRows = [
  [
    { label: '0', val: '0', type: 'num' },
    { label: '1', val: '1', type: 'num' },
    { label: '2', val: '2', type: 'num' },
    { label: '3', val: '3', type: 'num' },
  ],
  [
    { label: '4', val: '4', type: 'boundary', color: '#00e676' },
    { label: '6', val: '6', type: 'six', color: '#651fff' },
    { label: 'W', val: 'W', type: 'wicket', color: '#e10613' },
    { label: '↶', val: 'undo', type: 'undo', color: '#ffb300' },
  ],
  [
    { label: 'Wide', val: 'Wd', type: 'extra', color: '#1d6dff' },
    { label: 'No Ball', val: 'Nb', type: 'extra', color: '#e10613' },
    { label: 'Bye', val: 'B', type: 'extra', color: '#182b4d' },
    { label: 'Leg Bye', val: 'Lb', type: 'extra', color: '#182b4d' },
  ],
]

export default function LiveScorer() {
  const navigate = useNavigate()

  // Match State
  const [runs, setRuns] = useState(106)
  const [wickets, setWickets] = useState(3)
  const [overs, setOvers] = useState('10.3')
  const [ballsInCurrentOver, setBallsInCurrentOver] = useState(3)
  const [completedOvers, setCompletedOvers] = useState(10)

  const [currentOverBalls, setCurrentOverBalls] = useState([
    { val: '4', color: '#00e676', shot: 'Cover Drive' },
    { val: '6', color: '#651fff', shot: 'Lofted Drive' },
    { val: '1', color: '#3de0ff', shot: 'Mid-Off Push' },
    { val: '0', color: '#9aa8c7', shot: 'Forward Defense' },
  ])

  const [striker, setStriker] = useState({ name: 'Rohit', runs: 42, balls: 18, fours: 4, sixes: 2 })
  const [nonStriker, setNonStriker] = useState({ name: 'Karan', runs: 18, balls: 10, fours: 1, sixes: 1 })
  const [bowler, setBowler] = useState({ name: 'Vikram', figures: '1.3 - 0 - 21 - 1' })

  // Active Shot Type Selection
  const [selectedShot, setSelectedShot] = useState(SHOT_TYPES[0]) // Default: Straight Drive

  // Audio Speech Narration Toggle (English Voice)
  const [voiceEnabled, setVoiceEnabled] = useState(true)

  // Dedicated In-Depth Scorecard Sub-Page (Strictly NO Modals / Popups!)
  const [showScorecardPage, setShowScorecardPage] = useState(false)

  // Live Commentary State
  const [liveCommentary, setLiveCommentary] = useState({
    over: '10.3',
    shot: 'Cover Drive (Through Extra Cover)',
    text: 'FOUR! Brilliant timing through extra cover! Rohit leans into the drive with surgical elegance!',
    event: 'BOUNDARY',
    color: '#00e676',
    timestamp: 'Just now',
  })

  // Ball-by-ball history with shot breakdown
  const [ballHistory, setBallHistory] = useState([
    {
      over: '10.3',
      val: '4',
      shot: 'Cover Drive',
      zone: 'Through Extra Cover',
      commentary: 'FOUR! Brilliant timing through extra cover! Rohit leans into the drive with surgical elegance!',
      color: '#00e676',
    },
    {
      over: '10.2',
      val: '1',
      shot: 'Mid-Off Push',
      zone: 'Towards Mid-Off',
      commentary: 'Good length on off stump, defended with soft hands towards mid-off for a quick single.',
      color: '#3de0ff',
    },
    {
      over: '10.1',
      val: '6',
      shot: 'Lofted Drive',
      zone: 'Over Long-On',
      commentary: 'UP IN THE AIR... AND CARRIED OVER THE ROPES! Smashed clean over long-on for a gigantic six!',
      color: '#651fff',
    },
    {
      over: '9.6',
      val: '0',
      shot: 'Forward Defense',
      zone: 'Back to Bowler',
      commentary: 'Appeal for LBW turned down! Defended solidly on the front foot. Dot ball.',
      color: '#9aa8c7',
    },
  ])

  // Speech synthesis speaker helper (STRICTLY ENGLISH ONLY)
  function speakCommentaryAloud(text) {
    if (!voiceEnabled) return
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'en-US'
        utterance.rate = 1.05
        utterance.pitch = 1.0
        window.speechSynthesis.speak(utterance)
      } catch (err) {
        console.warn('Speech synthesis error:', err)
      }
    }
  }

  // Trigger speech on initial mount or update
  function releaseCommentary(text, shotTitle, runVal) {
    const isBound = runVal === '4'
    const isSix = runVal === '6'
    const isWkt = runVal === 'W'

    const newComm = {
      over: `${completedOvers}.${ballsInCurrentOver + 1}`,
      shot: `${shotTitle} (${selectedShot.zone})`,
      text: text,
      event: isSix ? 'SIX' : isBound ? 'BOUNDARY' : isWkt ? 'WICKET' : 'RUNS',
      color: isBound ? '#00e676' : isSix ? '#a78bfa' : isWkt ? '#ef4444' : '#38bdf8',
      timestamp: 'Just now',
    }
    setLiveCommentary(newComm)

    // Sync to localStorage for AICommentary and other broadcast channels
    try {
      const existing = localStorage.getItem('scoringheros_live_commentary')
      const arr = existing ? JSON.parse(existing) : []
      const updated = [newComm, ...arr.slice(0, 15)]
      localStorage.setItem('scoringheros_live_commentary', JSON.stringify(updated))
    } catch (e) {}

    // Speak aloud in English
    speakCommentaryAloud(text)
  }

  // Handle Score Button Keypad Press
  const handleKeyPress = (key) => {
    if (key.type === 'undo') {
      if (currentOverBalls.length > 0) {
        setCurrentOverBalls((b) => b.slice(0, -1))
      }
      return
    }

    const nextBalls = ballsInCurrentOver + 1
    const nextOver = nextBalls >= 6 ? completedOvers + 1 : completedOvers
    const nextBallInOver = nextBalls >= 6 ? 0 : nextBalls
    const overDisplay = `${completedOvers}.${nextBalls}`

    setBallsInCurrentOver(nextBallInOver)
    if (nextBalls >= 6) setCompletedOvers((o) => o + 1)
    setOvers(overDisplay)

    // Generate English commentary for this ball outcome
    const commentaryText = generateEnglishCommentary(
      key.val,
      key.type,
      selectedShot,
      striker,
      bowler,
      overDisplay,
      runs,
      wickets
    )

    if (key.type === 'wicket') {
      const nextW = wickets + 1
      setWickets(nextW)
      setCurrentOverBalls((b) => [...b, { val: 'W', color: '#e10613', shot: selectedShot.label }])
      setBallHistory((h) => [
        {
          over: overDisplay,
          val: 'W',
          shot: selectedShot.label,
          zone: selectedShot.zone,
          commentary: commentaryText,
          color: '#e10613',
        },
        ...h,
      ])
      releaseCommentary(commentaryText, selectedShot.label, 'W')
      return
    }

    const runNum = parseInt(key.val)
    if (!isNaN(runNum)) {
      const nextRuns = runs + runNum
      setRuns(nextRuns)
      setStriker((s) => ({
        ...s,
        runs: s.runs + runNum,
        balls: s.balls + 1,
        fours: runNum === 4 ? s.fours + 1 : s.fours,
        sixes: runNum === 6 ? s.sixes + 1 : s.sixes,
      }))
      const ballColor = runNum === 4 ? '#00e676' : runNum === 6 ? '#651fff' : '#ffffff'
      setCurrentOverBalls((b) => [
        ...b,
        {
          val: key.val,
          color: ballColor,
          shot: selectedShot.label,
        },
      ])
      setBallHistory((h) => [
        {
          over: overDisplay,
          val: key.val,
          shot: selectedShot.label,
          zone: selectedShot.zone,
          commentary: commentaryText,
          color: ballColor,
        },
        ...h,
      ])
      releaseCommentary(commentaryText, selectedShot.label, key.val)
    } else {
      // Extras (Wide, No Ball, etc.)
      const nextRuns = runs + 1
      setRuns(nextRuns)
      setCurrentOverBalls((b) => [
        ...b,
        {
          val: key.val,
          color: key.color || '#1d6dff',
          shot: selectedShot.label,
        },
      ])
      setBallHistory((h) => [
        {
          over: overDisplay,
          val: key.val,
          shot: selectedShot.label,
          zone: selectedShot.zone,
          commentary: commentaryText,
          color: key.color || '#1d6dff',
        },
        ...h,
      ])
      releaseCommentary(commentaryText, selectedShot.label, key.val)
    }
  }

  // Explicit Manual "Release Commentary" Action
  function handleManualCommentaryRelease() {
    const text = generateEnglishCommentary(
      '4',
      'boundary',
      selectedShot,
      striker,
      bowler,
      overs,
      runs,
      wickets
    )
    releaseCommentary(text, selectedShot.label, '4')
  }

  // =========================================================================
  // DEDICATED SUB-PAGE: IN-DEPTH SCORECARD WITH SHOT TYPE MATRIX
  // =========================================================================
  if (showScorecardPage) {
    return (
      <Screen title="Full Match Scorecard & Shot Analysis" back={false} padded={false}>
        <div className="scorecard-subpage">
          {/* Sub-page Navigation Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              type="button"
              className="btn btn--secondary btn--sm"
              onClick={() => setShowScorecardPage(false)}
            >
              ← Back
            </button>
            <span className="pill" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676', fontWeight: 800 }}>
              LIVE SCORECARD
            </span>
          </div>

          {/* Match Score Summary Banner */}
          <div className="scorecard-card" style={{ borderColor: 'rgba(0,230,118,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span className="live-red-pill">LIVE • 1st Innings</span>
                <h2 style={{ margin: '4px 0 0', fontSize: 20, color: '#f8fafc' }}>
                  Scoring XI <span style={{ color: '#00e676' }}>{runs}/{wickets}</span>
                </h2>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                  Overs: {overs} (20) • CRR: 10.10 • RRR: 8.25
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 11, color: 'var(--muted)', display: 'block' }}>OPPONENT</span>
                <strong style={{ fontSize: 15, color: '#3de0ff' }}>Warriors XI</strong>
              </div>
            </div>
          </div>

          {/* Batting Scorecard Table with Shot Breakdown */}
          <div className="scorecard-card">
            <h3 className="scorecard-section-title">
              <FileText size={15} color="#00e676" /> Batting Figures & Shot Selection Matrix
            </h3>

            {/* Striker: Rohit */}
            <div style={{ padding: 10, background: 'rgba(255,255,255,0.02)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <div>
                  <strong style={{ fontSize: 14, color: '#f8fafc' }}>{striker.name} * (Captain)</strong>
                  <span style={{ fontSize: 11, color: '#00e676', display: 'block' }}>batting • on strike</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <strong style={{ fontSize: 15, color: '#00e676' }}>{striker.runs}</strong>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}> ({striker.balls}b, {striker.fours}x4, {striker.sixes}x6)</span>
                  <span style={{ fontSize: 10, color: '#38bdf8', display: 'block' }}>SR: {((striker.runs / Math.max(1, striker.balls)) * 100).toFixed(1)}</span>
                </div>
              </div>

              {/* Shot Distribution Matrix */}
              <span style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 4 }}>
                SHOT BREAKDOWN & RUN CONVERSION:
              </span>
              <div className="shot-matrix-grid">
                <div className="shot-matrix-chip">
                  <span className="shot-name">Straight Drive</span>
                  <span className="shot-stats">5 balls • 2x4s</span>
                  <span className="shot-runs">14 runs</span>
                </div>
                <div className="shot-matrix-chip">
                  <span className="shot-name">Cover Drive</span>
                  <span className="shot-stats">6 balls • 1x4, 1x6</span>
                  <span className="shot-runs">16 runs</span>
                </div>
                <div className="shot-matrix-chip">
                  <span className="shot-name">Mid-Off Push</span>
                  <span className="shot-stats">3 balls • 1x4</span>
                  <span className="shot-runs">5 runs</span>
                </div>
                <div className="shot-matrix-chip">
                  <span className="shot-name">Mid-On Punch</span>
                  <span className="shot-stats">2 balls • 1x2</span>
                  <span className="shot-runs">3 runs</span>
                </div>
                <div className="shot-matrix-chip">
                  <span className="shot-name">Pull Shot</span>
                  <span className="shot-stats">2 balls • 1x6</span>
                  <span className="shot-runs">7 runs</span>
                </div>
                <div className="shot-matrix-chip">
                  <span className="shot-name">Forward Defense</span>
                  <span className="shot-stats">2 balls</span>
                  <span className="shot-runs" style={{ color: '#94a3b8' }}>0 runs</span>
                </div>
              </div>
            </div>

            {/* Non-Striker: Karan */}
            <div style={{ padding: 10, background: 'rgba(255,255,255,0.02)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)', marginTop: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <div>
                  <strong style={{ fontSize: 14, color: '#f8fafc' }}>{nonStriker.name}</strong>
                  <span style={{ fontSize: 11, color: 'var(--muted)', display: 'block' }}>batting • non-striker</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <strong style={{ fontSize: 15, color: '#f8fafc' }}>{nonStriker.runs}</strong>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}> ({nonStriker.balls}b, {nonStriker.fours}x4, {nonStriker.sixes}x6)</span>
                  <span style={{ fontSize: 10, color: '#38bdf8', display: 'block' }}>SR: {((nonStriker.runs / Math.max(1, nonStriker.balls)) * 100).toFixed(1)}</span>
                </div>
              </div>

              {/* Shot Distribution Matrix */}
              <span style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 4 }}>
                SHOT BREAKDOWN & RUN CONVERSION:
              </span>
              <div className="shot-matrix-grid">
                <div className="shot-matrix-chip">
                  <span className="shot-name">Flick off Pads</span>
                  <span className="shot-stats">3 balls • 1x4</span>
                  <span className="shot-runs">6 runs</span>
                </div>
                <div className="shot-matrix-chip">
                  <span className="shot-name">Square Cut</span>
                  <span className="shot-stats">3 balls • 1x6</span>
                  <span className="shot-runs">7 runs</span>
                </div>
                <div className="shot-matrix-chip">
                  <span className="shot-name">Mid-On Punch</span>
                  <span className="shot-stats">2 balls</span>
                  <span className="shot-runs">2 runs</span>
                </div>
                <div className="shot-matrix-chip">
                  <span className="shot-name">Straight Drive</span>
                  <span className="shot-stats">2 balls</span>
                  <span className="shot-runs">3 runs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Wagon Wheel Radial Field Direction Dispersion */}
          <div className="scorecard-card">
            <h3 className="scorecard-section-title">
              <Compass size={15} color="#38bdf8" /> Wagon Wheel Field Direction Dispersion
            </h3>
            <div className="wagon-direction-row">
              {[
                { label: 'Mid-Off / Extra Cover', pct: 28, color: '#00e676' },
                { label: 'Straight / Long-On', pct: 24, color: '#38bdf8' },
                { label: 'Mid-On / Mid-Wicket', pct: 20, color: '#a78bfa' },
                { label: 'Point / Third Man', pct: 16, color: '#ffc83d' },
                { label: 'Fine Leg / Square Leg', pct: 12, color: '#ec4899' },
              ].map((w) => (
                <div key={w.label} className="wagon-direction-item">
                  <span className="wagon-dir-label">{w.label}</span>
                  <div className="wagon-dir-bar-bg">
                    <div className="wagon-dir-bar-fill" style={{ width: `${w.pct}%`, background: w.color }} />
                  </div>
                  <span className="wagon-dir-pct" style={{ color: w.color }}>{w.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bowling Figures */}
          <div className="scorecard-card">
            <h3 className="scorecard-section-title">
              <Target size={15} color="#ffc83d" /> Bowling Analysis
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>
              <div>
                <strong style={{ fontSize: 13, color: '#f8fafc' }}>{bowler.name}</strong>
                <span style={{ fontSize: 11, color: 'var(--muted)', display: 'block' }}>Right-arm fast medium</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <strong style={{ fontSize: 13, color: '#38bdf8' }}>{bowler.figures}</strong>
                <span style={{ fontSize: 10, color: 'var(--muted)', display: 'block' }}>Econ: 14.0</span>
              </div>
            </div>
          </div>

          {/* Ball-by-Ball Live English Commentary Log */}
          <div className="scorecard-card">
            <h3 className="scorecard-section-title">
              <Mic size={15} color="#00e676" /> Ball-by-Ball English Commentary & Shot Log
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {ballHistory.map((b, idx) => (
                <div key={idx} className="ball-commentary-item">
                  <div className="ball-comm-top">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span className="ball-badge-round" style={{ background: b.color }}>
                        {b.val}
                      </span>
                      <strong style={{ fontSize: 12, color: '#cbd5e1' }}>Ball {b.over}</strong>
                      <span className="scorer-comm-shot-badge">
                        🏏 {b.shot} ({b.zone})
                      </span>
                    </div>
                    <button
                      type="button"
                      className="btn btn--secondary btn--sm"
                      style={{ fontSize: 10, padding: '2px 8px', height: 24 }}
                      onClick={() => speakCommentaryAloud(b.commentary)}
                    >
                      <Volume2 size={12} /> Listen
                    </button>
                  </div>
                  <p style={{ margin: 0, fontSize: 12, color: '#f1f5f9', fontStyle: 'italic', lineHeight: 1.4 }}>
                    "{b.commentary}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // MAIN LIVE SCORER VIEW (MATCHES USER SCREENSHOT 2)
  // =========================================================================
  return (
    <Screen
      back
      title="Live Scorer"
      right={
        <button
          className="icon-btn"
          type="button"
          onClick={() => navigate('/app/match-tools')}
          title="Match Settings & Tools"
        >
          <Settings size={18} />
        </button>
      }
    >
      <div className="perfect-scorer-screen">
        {/* Top Header Card (Screen 2 of reference image) */}
        <div className="scorer-header-card">
          <div className="scorer-header-top">
            <span className="live-red-pill">LIVE</span>
            <span className="scorer-format-meta">T20 • {overs} (20)</span>
          </div>

          <div className="scorer-teams-hero">
            <div className="scorer-team-block">
              <div className="team-badge-circle" style={{ borderColor: 'var(--red)' }}>
                <span style={{ fontSize: 13, fontWeight: 900 }}>SH</span>
              </div>
              <strong className="team-abbr">Scoring XI</strong>
            </div>

            <div className="scorer-score-center">
              <h1 className="score-main">{runs}/{wickets}</h1>
              <div className="score-rates">
                <span>CRR 10.10</span>
                <span className="rate-divider">|</span>
                <span>RRR 8.25</span>
              </div>
            </div>

            <div className="scorer-team-block">
              <div className="team-badge-circle" style={{ borderColor: 'var(--cyan)' }}>
                <span style={{ fontSize: 13, fontWeight: 900 }}>WAR</span>
              </div>
              <strong className="team-abbr">Warriors XI</strong>
            </div>
          </div>
        </div>

        {/* Batsmen & Current Over Strip */}
        <div className="batsmen-table-card">
          <div className="batsman-row is-striker">
            <div className="batsman-name-group">
              <span className="striker-dot" />
              <strong>{striker.name}</strong>
            </div>
            <div className="batsman-score-figures">
              <strong>{striker.runs}</strong>
              <small>({striker.balls})</small>
            </div>
            <div className="batsman-ball-bubbles">
              <span className="b-bubble" style={{ background: '#00e676', color: '#000' }}>4</span>
              <span className="b-bubble" style={{ background: '#651fff' }}>6</span>
              <span className="b-bubble" style={{ background: '#37474f' }}>1</span>
              <span className="b-bubble" style={{ background: '#263238' }}>0</span>
            </div>
          </div>

          <div className="batsman-row">
            <div className="batsman-name-group">
              <span className="non-striker-dot" />
              <span style={{ fontSize: 13, color: 'var(--muted)' }}>{nonStriker.name}</span>
            </div>
            <div className="batsman-score-figures">
              <strong>{nonStriker.runs}</strong>
              <small>({nonStriker.balls})</small>
            </div>
            <div className="batsman-ball-bubbles">
              <span className="b-bubble" style={{ background: '#37474f' }}>1</span>
              <span className="b-bubble" style={{ background: '#37474f' }}>1</span>
              <span className="b-bubble" style={{ background: '#00e676', color: '#000' }}>4</span>
              <span className="b-bubble" style={{ background: '#651fff' }}>6</span>
            </div>
          </div>
        </div>

        {/* Bowler Details Strip */}
        <div className="bowler-strip-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="bowler-icon">⚾</span>
            <strong style={{ fontSize: 13, color: '#fff' }}>{bowler.name}</strong>
          </div>
          <span className="bowler-stats-val">{bowler.figures}</span>
        </div>

        {/* ── Shot Type Selection Tray (Mid Off, Mid On, Straight Drive, etc.) ── */}
        <div className="scorer-shot-selector">
          <div className="scorer-shot-header">
            <span className="scorer-shot-title">
              <Target size={13} color="#00e676" /> Selected Shot & Placement
            </span>
            <span className="scorer-comm-shot-badge">
              {selectedShot.emoji} {selectedShot.label} ({selectedShot.zone})
            </span>
          </div>

          <div className="scorer-shot-scroll">
            {SHOT_TYPES.map((sh) => (
              <button
                key={sh.id}
                type="button"
                className={`shot-pill-btn ${selectedShot.id === sh.id ? 'is-active' : ''}`}
                onClick={() => setSelectedShot(sh)}
              >
                <span>{sh.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Live AI Commentary Release Box (English Only) ── */}
        <div className={`scorer-commentary-box ${liveCommentary.event === 'BOUNDARY' ? 'is-boundary' : liveCommentary.event === 'SIX' ? 'is-six' : liveCommentary.event === 'WICKET' ? 'is-wicket' : ''}`}>
          <div className="scorer-comm-header">
            <div className="scorer-comm-tag">
              <Radio size={12} className="radio-pulse" />
              <span>LIVE AI COMMENTARY • BALL {liveCommentary.over} (ENGLISH)</span>
            </div>
            <span style={{ fontSize: 10, color: 'var(--muted)' }}>{liveCommentary.timestamp}</span>
          </div>
          <p className="scorer-comm-quote">"{liveCommentary.text}"</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
            <span className="scorer-comm-shot-badge">
              {liveCommentary.shot}
            </span>
            <button
              type="button"
              className="btn btn--secondary btn--sm"
              style={{ fontSize: 10, padding: '2px 8px', height: 22, display: 'flex', alignItems: 'center', gap: 4 }}
              onClick={() => speakCommentaryAloud(liveCommentary.text)}
              title="Speak commentary in English"
            >
              <Volume2 size={12} color="#00e676" /> Replay Voice
            </button>
          </div>
        </div>

        {/* ── Commentary Release Trigger & Voice Control Row ── */}
        <div className="commentary-trigger-row">
          <button
            type="button"
            className="btn-generate-comm"
            onClick={handleManualCommentaryRelease}
          >
            <Mic size={15} /> Release AI Commentary (English)
          </button>
          <button
            type="button"
            className={`btn-voice-toggle ${!voiceEnabled ? 'is-muted' : ''}`}
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            title="Toggle voice speech synthesis"
          >
            {voiceEnabled ? <Volume2 size={16} color="#00e676" /> : <VolumeX size={16} color="#ef4444" />}
            <span>{voiceEnabled ? 'VOICE ON' : 'MUTED'}</span>
          </button>
        </div>

        {/* Keypad Grid (Screen 2: 0,1,2,3 / 4,6,W,Undo / Wide, No Ball, Bye, Leg Bye) */}
        <div className="keypad-matrix">
          {keyPadRows.map((row, rIdx) => (
            <div key={rIdx} className="keypad-row">
              {row.map((k, kIdx) => (
                <button
                  key={kIdx}
                  type="button"
                  className={`keypad-btn key-${k.type}`}
                  style={k.color ? { background: k.color } : {}}
                  onClick={() => handleKeyPress(k)}
                >
                  {k.label}
                </button>
              ))}
            </div>
          ))}

          {/* Undo + Change Bowler Actions */}
          <div className="keypad-row-dual">
            <button
              type="button"
              className="keypad-aux-btn"
              onClick={() => handleKeyPress({ type: 'undo' })}
            >
              <RotateCcw size={16} /> UNDO
            </button>
            <button
              type="button"
              className="keypad-aux-btn keypad-aux-btn--bowler"
              onClick={() => setBowler({ name: 'Karan Patel', figures: '0.0 - 0 - 0 - 0' })}
            >
              CHANGE BOWLER
            </button>
          </div>
        </div>

        {/* Bottom Fast Action Bar (DRS Review | Rain / DLS | Scorecard | More) */}
        <div className="scorer-footer-toolbar">
          <button
            type="button"
            className="footer-tool-btn is-drs"
            onClick={() => navigate('/app/highlights')}
          >
            <Video size={16} />
            <span>DRS Review</span>
          </button>

          <button
            type="button"
            className="footer-tool-btn is-dls"
            onClick={() => navigate('/app/match-tools')}
          >
            <CloudRain size={16} />
            <span>Rain / DLS</span>
          </button>

          <button
            type="button"
            className="footer-tool-btn"
            style={{ color: '#00e676', borderColor: 'rgba(0,230,118,0.4)', background: 'rgba(0,230,118,0.08)' }}
            onClick={() => setShowScorecardPage(true)}
          >
            <FileText size={16} />
            <span>Scorecard</span>
          </button>

          <button
            type="button"
            className="footer-tool-btn"
            onClick={() => navigate('/app/match-tools')}
          >
            <MoreHorizontal size={16} />
            <span>More</span>
          </button>
        </div>
      </div>
    </Screen>
  )
}
