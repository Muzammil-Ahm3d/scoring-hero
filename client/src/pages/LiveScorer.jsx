import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  RotateCcw, CloudRain, FileText, MoreHorizontal, Settings,
  ChevronLeft, ChevronRight, Mic, Volume2, VolumeX, Sparkles,
  Zap, Radio, Target, Play, CheckCircle2, Trophy, Users,
  ArrowRight, Shield, AlertCircle, RefreshCw, Copy, Check,
  User, Star, Award, TrendingUp, Clock, Crosshair,
} from 'lucide-react'
import Screen from '../components/Screen'
import './LiveScorer.css'

// =========================================================================
// SHOT TYPES
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

const FORMATS = [
  { label: 'T20 (20 overs)', value: 20 },
  { label: 'ODI (50 overs)', value: 50 },
  { label: 'T10 (10 overs)', value: 10 },
  { label: 'Custom', value: 'custom' },
]

const DISMISSAL_TYPES = [
  'Bowled', 'Caught', 'LBW', 'Run Out', 'Stumped', 'Hit Wicket', 'Retired'
]

// =========================================================================
// COMMENTARY ENGINE
// =========================================================================
function generateEnglishCommentary(val, type, shotObj, batsman, bowler, overStr, currentRuns, wickets) {
  const shot = shotObj ? shotObj.label : 'defensive push'
  const zone = shotObj ? shotObj.zone : 'mid-wicket'
  const bname = batsman ? batsman.name : 'Batsman'
  const bwname = bowler ? bowler.name : 'Bowler'

  if (val === '4') {
    const lines = [
      `FOUR! Pure batting royalty from ${bname}! Leans into a classical ${shot} ${zone}! The timing is immaculate, tracing the turf all the way to the boundary fence!`,
      `CRACK! FOUR RUNS! ${bname} picks the length early and unfurls a glorious ${shot} ${zone}! ${bwname} can only watch as the sweeper is beaten with disdain!`,
      `FOUR! Shot of the day! Upright stance, pristine high elbow on that ${shot} ${zone}! Pierces the gap to perfection!`,
      `GLORIOUS! ${bname} punches with supreme authority! Crisp ${shot} speeding ${zone}! The crowd erupts!`,
    ]
    return lines[Math.floor(Math.random() * lines.length)]
  }

  if (val === '6') {
    const lines = [
      `SIX! THAT IS MONSTROUS! ${bname} dances down the pitch and launches an enormous ${shot} ${zone}! Cleans out the stadium, landing 15 rows back!`,
      `INTO ORBIT! SIX RUNS! ${bname} unleashes an explosive ${shot} ${zone}! High, handsome, and into the night sky!`,
      `SIX! Raw kinetic power! ${bname} clears the front leg and smokes that ${shot} ${zone}! What a sensational hit!`,
    ]
    return lines[Math.floor(Math.random() * lines.length)]
  }

  if (val === 'W' || type === 'wicket') {
    const lines = [
      `OUT! GONE! HUGE BREAKTHROUGH! ${bname} attempts the ${shot} ${zone}, but gets a leading edge! ${bwname} strikes with venom!`,
      `WICKET! ${bwname} produces absolute magic! Beats the ${shot} and the timber is shattered! Disbelief for ${bname}!`,
      `OUT! EDGED AND TAKEN! ${bwname} draws ${bname} forward on the ${shot}, takes the outside edge, and the keeper pouches it cleanly! Crucial blow!`,
    ]
    return lines[Math.floor(Math.random() * lines.length)]
  }

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
      `Driven into the deep pocket ${zone} on the ${shot}. They turn aggressively for the second run! Excellent running!`,
      `Placed gently ${zone} with a balanced ${shot}. Good hustle between the wickets allows two easy runs.`,
    ]
    return lines[Math.floor(Math.random() * lines.length)]
  }

  if (val === '3') {
    return `Stroked past the inner ring ${zone} on the ${shot}! Superb fielding on the rope saves one, three runs conceded.`
  }

  if (val === '0') {
    if (shotObj && shotObj.id === 'edge') {
      return `BEATEN! Snorting delivery from ${bwname}! Whistles past the outside edge as ${bname} was searching for contact. Dot ball.`
    }
    const lines = [
      `Good length ball on off stump, ${bname} meets it with a solid ${shot} ${zone}. Fielded inside the ring, no run.`,
      `Well bowled by ${bwname}. Cramps the batsman for room, ${shot} straight to the fielder. No run conceded.`,
      `Defended calmly back down the track. ${bwname} collects on the bounce. Dot ball.`,
    ]
    return lines[Math.floor(Math.random() * lines.length)]
  }

  if (val === 'Wd') {
    return `WIDE! ${bwname} loses control of radar, spraying it well outside off stump. Extra run added to the scorecard. Fielding team frustrated!`
  }
  if (val === 'Nb') {
    return `NO BALL! High drama as ${bwname} oversteps the line! FREE HIT coming up on the very next delivery! Cannot be out bowled!`
  }
  if (val === 'B') {
    return `Beats the bat! Goes through to the keeper but the batsmen scramble through for leg byes. Fielding team appeals but umpire signals byes.`
  }
  if (val === 'Lb') {
    return `Hits the pads and deflects ${zone}! The umpire signals Leg Bye, run taken. The ball hit the pads outside the line.`
  }

  return `Punched through ${zone} on the ${shot}. Score advances.`
}

// =========================================================================
// HELPER: Create blank player object
// =========================================================================
function mkPlayer(id, name) {
  return {
    id, name,
    runs: 0, balls: 0, fours: 0, sixes: 0,
    shots: {}, dismissed: false, dismissalInfo: '',
  }
}

function mkBowler(id, name) {
  return {
    id, name,
    balls: 0, runs: 0, wickets: 0, maidens: 0,
    overs: 0, // completed overs
  }
}

function bowlerFigures(b) {
  const oStr = b.overs > 0 || b.balls > 0 ? `${b.overs}.${b.balls}` : '0'
  return `${oStr} - ${b.maidens} - ${b.runs} - ${b.wickets}`
}

function strikeRate(runs, balls) {
  if (balls === 0) return '-'
  return ((runs / balls) * 100).toFixed(1)
}

function economy(runs, overs, balls) {
  const totalBalls = overs * 6 + balls
  if (totalBalls === 0) return '-'
  return ((runs / totalBalls) * 6).toFixed(2)
}

// Keypad rows
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
    { label: 'Bye', val: 'B', type: 'extra', color: '#334155' },
    { label: 'Leg Bye', val: 'Lb', type: 'extra', color: '#334155' },
  ],
]

// =========================================================================
// MAIN COMPONENT
// =========================================================================
export default function LiveScorer() {
  const navigate = useNavigate()

  // ---- PHASE state machine ----
  // 'setup' | 'toss' | 'openers' | 'scoring' | 'innings_break' | 'openers2' | 'match_result' | 'scorecard_view'
  const [phase, setPhase] = useState('setup')

  // ---- Match config ----
  const [matchName, setMatchName] = useState('')
  const [formatOvers, setFormatOvers] = useState(20)
  const [customOvers, setCustomOvers] = useState('')
  const [selectedFormat, setSelectedFormat] = useState(20)
  const [teamAName, setTeamAName] = useState('')
  const [teamBName, setTeamBName] = useState('')
  const [teamAPlayers, setTeamAPlayers] = useState(Array(11).fill('').map((_, i) => `Player ${i + 1}`))
  const [teamBPlayers, setTeamBPlayers] = useState(Array(11).fill('').map((_, i) => `Player ${i + 1}`))
  const [setupStep, setSetupStep] = useState(0) // 0=match info, 1=team A, 2=team B

  // ---- Toss ----
  const [tossWinnerKey, setTossWinnerKey] = useState(null) // 'A' or 'B'
  const [battingTeamKey, setBattingTeamKey] = useState('A')

  // ---- Innings ----
  const [innings, setInnings] = useState(1)

  // ---- Live batting/bowling objects ----
  const [battingTeamPlayers, setBattingTeamPlayers] = useState([]) // array of mkPlayer
  const [bowlingTeamPlayers, setBowlingTeamPlayers] = useState([]) // array of mkBowler
  const [nextBatsmanIdx, setNextBatsmanIdx] = useState(2)
  const [striker, setStriker] = useState(null)
  const [nonStriker, setNonStriker] = useState(null)
  const [currentBowler, setCurrentBowler] = useState(null)
  const [bowlerHistory, setBowlerHistory] = useState({}) // { id: mkBowler }
  const [dismissedBatsmen, setDismissedBatsmen] = useState([])
  const [extras, setExtras] = useState({ wides: 0, noBalls: 0, byes: 0, legByes: 0 })
  const [runs, setRuns] = useState(0)
  const [wickets, setWickets] = useState(0)
  const [ballsInOver, setBallsInOver] = useState(0) // valid balls 0-5
  const [completedOvers, setCompletedOvers] = useState(0)
  const [currentOverBalls, setCurrentOverBalls] = useState([])
  const [ballHistory, setBallHistory] = useState([])
  const [innings1Result, setInnings1Result] = useState(null)

  // ---- Openers selection temp state ----
  const [selStriker, setSelStriker] = useState('')
  const [selNonStriker, setSelNonStriker] = useState('')
  const [selBowler, setSelBowler] = useState('')

  // ---- Dismissal info ----
  const [pendingNextBatsman, setPendingNextBatsman] = useState(false)
  const [dismissalType, setDismissalType] = useState('Caught')
  const [fielderId, setFielderId] = useState('')

  // ---- Bowler change ----
  const [pendingBowlerChange, setPendingBowlerChange] = useState(false)
  const [selNewBowler, setSelNewBowler] = useState('')

  // ---- Shot & commentary ----
  const [selectedShot, setSelectedShot] = useState(SHOT_TYPES[0])
  const [liveCommentary, setLiveCommentary] = useState(null)
  const [voiceEnabled, setVoiceEnabled] = useState(true)

  // ---- Sub-pages ----
  const [showScorecardView, setShowScorecardView] = useState(false)

  // ---- Free hit tracking ----
  const [isFreeHit, setIsFreeHit] = useState(false)

  // =========================================================================
  // HELPERS
  // =========================================================================
  const totalOvers = formatOvers === 'custom' ? (parseInt(customOvers) || 20) : formatOvers

  function getBattingPlayers() {
    return battingTeamKey === 'A' ? teamAPlayers : teamBPlayers
  }
  function getBowlingPlayers() {
    return battingTeamKey === 'A' ? teamBPlayers : teamAPlayers
  }
  function getBattingTeamName() {
    return battingTeamKey === 'A' ? teamAName : teamBName
  }
  function getBowlingTeamName() {
    return battingTeamKey === 'A' ? teamBName : teamAName
  }

  function speakAloud(text) {
    if (!voiceEnabled) return
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'en-US'
        utterance.rate = 1.05
        utterance.pitch = 1.0
        window.speechSynthesis.speak(utterance)
      } catch (e) {}
    }
  }

  function overDisplay(completed, ballsIn) {
    return `${completed}.${ballsIn}`
  }

  function crr() {
    const totalBalls = completedOvers * 6 + ballsInOver
    if (totalBalls === 0) return '0.00'
    return ((runs / totalBalls) * 6).toFixed(2)
  }

  function rrr() {
    if (!innings1Result) return '-'
    const target = innings1Result.total + 1
    const needed = target - runs
    const ballsLeft = (totalOvers * 6) - (completedOvers * 6 + ballsInOver)
    if (ballsLeft <= 0) return '-'
    return ((needed / ballsLeft) * 6).toFixed(2)
  }

  function runsNeeded() {
    if (!innings1Result) return 0
    return innings1Result.total + 1 - runs
  }

  // =========================================================================
  // SETUP PHASE
  // =========================================================================
  function handleSetupNext() {
    if (setupStep === 0) {
      if (!matchName.trim()) return alert('Please enter a match name')
      if (!teamAName.trim() || !teamBName.trim()) return alert('Please enter both team names')
      setSetupStep(1)
    } else if (setupStep === 1) {
      setSetupStep(2)
    } else if (setupStep === 2) {
      setPhase('toss')
    }
  }

  // =========================================================================
  // TOSS PHASE
  // =========================================================================
  function handleToss(winnerKey) {
    setTossWinnerKey(winnerKey)
  }

  function handleBatBowlChoice(choice) {
    // choice = 'bat' | 'bowl'
    if (choice === 'bat') {
      setBattingTeamKey(tossWinnerKey)
    } else {
      setBattingTeamKey(tossWinnerKey === 'A' ? 'B' : 'A')
    }
    setPhase('openers')
  }

  // =========================================================================
  // OPENERS PHASE: initialise teams & set openers
  // =========================================================================
  function initInnings(batKey) {
    // batting team players
    const batPlayers = batKey === 'A' ? teamAPlayers : teamBPlayers
    const bowlPlayers = batKey === 'A' ? teamBPlayers : teamAPlayers
    const batObjs = batPlayers.map((name, i) => mkPlayer(i, name || `Player ${i + 1}`))
    const bowlObjs = bowlPlayers.map((name, i) => mkBowler(i, name || `Player ${i + 1}`))
    setBattingTeamPlayers(batObjs)
    setBowlingTeamPlayers(bowlObjs)
    setBowlerHistory({})
    setDismissedBatsmen([])
    setExtras({ wides: 0, noBalls: 0, byes: 0, legByes: 0 })
    setRuns(0)
    setWickets(0)
    setBallsInOver(0)
    setCompletedOvers(0)
    setCurrentOverBalls([])
    setBallHistory([])
    setNextBatsmanIdx(2)
    setStriker(null)
    setNonStriker(null)
    setCurrentBowler(null)
    setLiveCommentary(null)
    setIsFreeHit(false)
    setSelStriker('')
    setSelNonStriker('')
    setSelBowler('')
  }

  function handleStartMatch() {
    if (!selStriker) return alert('Select striker')
    if (!selNonStriker) return alert('Select non-striker')
    if (selStriker === selNonStriker) return alert('Striker and non-striker must be different players')
    if (!selBowler) return alert('Select opening bowler')
    // Set up striker and non-striker objects
    const strObj = { ...battingTeamPlayers[parseInt(selStriker)], onStrike: true }
    const nsObj = { ...battingTeamPlayers[parseInt(selNonStriker)], onStrike: false }
    // Find next batsman index (3rd in order, skipping 0=striker, 1=nonStriker)
    const usedIds = [strObj.id, nsObj.id]
    let nextIdx = 0
    for (let i = 0; i < battingTeamPlayers.length; i++) {
      if (!usedIds.includes(battingTeamPlayers[i].id)) { nextIdx = i; break }
    }
    setStriker(strObj)
    setNonStriker(nsObj)
    setNextBatsmanIdx(nextIdx)
    const bowlObj = { ...bowlingTeamPlayers[parseInt(selBowler)] }
    setCurrentBowler(bowlObj)
    setBowlerHistory(prev => ({ ...prev, [bowlObj.id]: { ...bowlObj } }))
    setPhase('scoring')
  }

  // Called before entering openers phase for 2nd innings
  function setupSecondInnings() {
    // swap batting team
    const newBatKey = battingTeamKey === 'A' ? 'B' : 'A'
    setBattingTeamKey(newBatKey)
    initInnings(newBatKey)
    setInnings(2)
    setPhase('openers')
  }

  // =========================================================================
  // SCORING PHASE: Handle keypad press
  // =========================================================================
  function handleKeyPress(key) {
    if (pendingNextBatsman || pendingBowlerChange) return // block until resolved

    if (key.type === 'undo') {
      handleUndo()
      return
    }

    const val = key.val
    const isWide = val === 'Wd'
    const isNoBall = val === 'Nb'
    const isBye = val === 'B'
    const isLegBye = val === 'Lb'
    const isExtra = isWide || isNoBall || isBye || isLegBye
    const isWicket = val === 'W'
    const runVal = isExtra ? 1 : (isWicket ? 0 : parseInt(val))

    // Commentary
    const curOver = overDisplay(completedOvers, ballsInOver + (isWide || isNoBall ? 0 : 1))
    const commentaryText = generateEnglishCommentary(val, key.type, selectedShot, striker, currentBowler, curOver, runs, wickets)

    // Update runs total
    const addRuns = isWicket ? 0 : (isExtra ? 1 : runVal)
    setRuns(r => r + addRuns)

    // Update extras breakdown
    if (isWide) setExtras(e => ({ ...e, wides: e.wides + 1 }))
    if (isNoBall) setExtras(e => ({ ...e, noBalls: e.noBalls + 1 }))
    if (isBye) setExtras(e => ({ ...e, byes: e.byes + 1 }))
    if (isLegBye) setExtras(e => ({ ...e, legByes: e.legByes + 1 }))

    // Ball color for over display
    const ballColor = val === '4' ? '#00e676' : val === '6' ? '#651fff' : val === 'W' ? '#e10613'
      : isWide ? '#1d6dff' : isNoBall ? '#ff5722' : isBye || isLegBye ? '#607d8b' : '#ffffff'

    // Record in currentOverBalls (visual)
    setCurrentOverBalls(b => [...b, { val, color: ballColor, shot: selectedShot.label, isExtra: isWide || isNoBall }])

    // Ball history
    setBallHistory(h => [{
      over: curOver,
      val,
      shot: selectedShot.label,
      zone: selectedShot.zone,
      commentary: commentaryText,
      color: ballColor,
      timestamp: new Date().toLocaleTimeString(),
    }, ...h])

    // Commentary release
    const newComm = {
      over: curOver,
      shot: `${selectedShot.label} (${selectedShot.zone})`,
      text: commentaryText,
      event: val === '6' ? 'SIX' : val === '4' ? 'BOUNDARY' : isWicket ? 'WICKET'
        : isWide ? 'WIDE' : isNoBall ? 'NO BALL' : isBye ? 'BYE' : isLegBye ? 'LEG BYE' : 'RUNS',
      color: ballColor,
      timestamp: 'Just now',
    }
    setLiveCommentary(newComm)
    try {
      const existing = localStorage.getItem('scoringheros_live_commentary')
      const arr = existing ? JSON.parse(existing) : []
      localStorage.setItem('scoringheros_live_commentary', JSON.stringify([newComm, ...arr.slice(0, 15)]))
    } catch (e) {}
    speakAloud(commentaryText)

    // Update bowler stats
    if (currentBowler) {
      const bowlerRuns = isWicket ? 0 : addRuns
      const bowlerBalls = isWide || isNoBall ? 0 : 1
      const bowlerWickets = isWicket ? 1 : 0
      setCurrentBowler(b => ({
        ...b,
        runs: b.runs + bowlerRuns,
        balls: b.balls + bowlerBalls,
        wickets: b.wickets + bowlerWickets,
      }))
      setBowlerHistory(prev => {
        const existing = prev[currentBowler.id] || { ...currentBowler }
        return {
          ...prev,
          [currentBowler.id]: {
            ...existing,
            runs: (existing.runs || 0) + bowlerRuns,
            balls: (existing.balls || 0) + bowlerBalls,
            wickets: (existing.wickets || 0) + bowlerWickets,
          }
        }
      })
    }

    // Update batsman stats (not for Wide — batsman doesn't face)
    if (!isWide && !isNoBall && !isWicket && !isBye && !isLegBye) {
      setStriker(s => ({
        ...s,
        runs: s.runs + runVal,
        balls: s.balls + 1,
        fours: runVal === 4 ? s.fours + 1 : s.fours,
        sixes: runVal === 6 ? s.sixes + 1 : s.sixes,
        shots: {
          ...s.shots,
          [selectedShot.id]: {
            count: ((s.shots[selectedShot.id] || {}).count || 0) + 1,
            runs: ((s.shots[selectedShot.id] || {}).runs || 0) + runVal,
          }
        }
      }))
    } else if ((isBye || isLegBye) && !isWicket) {
      // Bye/LegBye: ball counted, runs go to extras not batsman, but balls faced increments
      setStriker(s => ({ ...s, balls: s.balls + 1 }))
    } else if (isNoBall) {
      // No ball: free hit on next delivery, batsman runs count normally though
      setIsFreeHit(true)
    }

    // Wicket handling
    if (isWicket) {
      setStriker(s => ({
        ...s,
        balls: s.balls + 1,
        dismissed: true,
        dismissalInfo: `${dismissalType}${fielderId ? ' by ' + fielderId : ''}`,
      }))
      setDismissedBatsmen(d => [...d, {
        ...striker,
        balls: striker.balls + 1,
        dismissed: true,
        dismissalInfo: `${dismissalType}`,
      }])
      setWickets(w => {
        const newW = w + 1
        if (newW >= 10) {
          // All out — innings ends after this
          setTimeout(() => endInnings(), 300)
        }
        return newW
      })
      setBallsInOver(b => {
        const nb = b + 1
        if (nb >= 6) {
          setTimeout(() => overComplete(), 50)
          return 0
        }
        return nb
      })
      setPendingNextBatsman(true)
      return
    }

    // If not wicket, not wide, not no-ball: valid ball
    if (!isWide && !isNoBall) {
      // Odd runs: swap striker
      if (addRuns % 2 === 1) {
        setStriker(s => ({ ...s, ...nonStriker, onStrike: true }))
        setNonStriker(s => ({ ...s, ...striker, onStrike: false }))
      }

      setBallsInOver(b => {
        const nb = b + 1
        if (nb >= 6) {
          setTimeout(() => overComplete(), 50)
          return 0
        }
        return nb
      })
    }

    // After no-ball: next ball is free-hit
    if (isNoBall) {
      // already set isFreeHit above
    } else {
      setIsFreeHit(false)
    }
  }

  function overComplete() {
    setCompletedOvers(o => {
      const newO = o + 1
      if (newO >= totalOvers) {
        setTimeout(() => endInnings(), 300)
      }
      return newO
    })
    // Swap striker and non-striker at end of over
    setStriker(s => s)
    setNonStriker(ns => ns)
    // Actually swap them
    setStriker(s => ({ ...nonStriker, onStrike: true }))
    setNonStriker(s => ({ ...striker, onStrike: false }))
    // Save bowler history
    if (currentBowler) {
      setBowlerHistory(prev => ({
        ...prev,
        [currentBowler.id]: {
          ...(prev[currentBowler.id] || currentBowler),
          overs: ((prev[currentBowler.id] || currentBowler).overs || 0) + 1,
          balls: 0,
        }
      }))
      setCurrentBowler(b => ({ ...b, overs: b.overs + 1, balls: 0 }))
    }
    setCurrentOverBalls([])
    setPendingBowlerChange(true)
  }

  function endInnings() {
    if (innings === 1) {
      setInnings1Result({
        total: runs,
        wickets,
        completedOvers,
        ballsInOver,
        battingTeamName: getBattingTeamName(),
        bowlingTeamName: getBowlingTeamName(),
        dismissed: [...dismissedBatsmen, ...(striker ? [{ ...striker, dismissalInfo: striker.dismissed ? striker.dismissalInfo : 'not out' }] : [])],
        nonStrikerFinal: nonStriker ? { ...nonStriker, dismissalInfo: 'not out' } : null,
        extrasSnapshot: { ...extras },
        bowlerHistorySnapshot: { ...bowlerHistory },
        striker: striker ? { ...striker } : null,
      })
      setPhase('innings_break')
    } else {
      setPhase('match_result')
    }
  }

  function handleUndo() {
    if (currentOverBalls.length === 0) return
    const last = currentOverBalls[currentOverBalls.length - 1]
    setCurrentOverBalls(b => b.slice(0, -1))
    setBallHistory(h => h.slice(1))
    // Simple undo: reverse run addition
    const wasExtra = last.val === 'Wd' || last.val === 'Nb' || last.val === 'B' || last.val === 'Lb'
    const wasWicket = last.val === 'W'
    if (!wasWicket) {
      const runVal = wasExtra ? 1 : (parseInt(last.val) || 0)
      setRuns(r => Math.max(0, r - runVal))
    }
    if (!wasExtra && !wasWicket) {
      setBallsInOver(b => Math.max(0, b - 1))
      setStriker(s => ({
        ...s,
        runs: Math.max(0, s.runs - (parseInt(last.val) || 0)),
        balls: Math.max(0, s.balls - 1),
      }))
    }
  }

  function handleSelectNextBatsman(playerIdx) {
    const nextBat = battingTeamPlayers[playerIdx]
    if (!nextBat || nextBat.dismissed) return
    setStriker({ ...nextBat, onStrike: true })
    // Update next idx
    const usedIds = new Set([nonStriker?.id, nextBat.id, ...dismissedBatsmen.map(d => d.id)])
    let nextIdx = -1
    for (let i = 0; i < battingTeamPlayers.length; i++) {
      if (!usedIds.has(battingTeamPlayers[i].id)) { nextIdx = i; break }
    }
    setNextBatsmanIdx(nextIdx)
    setPendingNextBatsman(false)
    // Check if over was also complete
    if (ballsInOver === 0 && !pendingBowlerChange) {
      setPendingBowlerChange(true)
    }
  }

  function handleSelectNewBowler(bowlerId) {
    const existing = bowlerHistory[bowlerId] || bowlingTeamPlayers.find(b => b.id === parseInt(bowlerId))
    setCurrentBowler({ ...existing, id: parseInt(bowlerId) })
    setPendingBowlerChange(false)
    setSelNewBowler('')
  }

  // =========================================================================
  // REMAINING BATSMEN (not dismissed, not currently at crease)
  // =========================================================================
  function getRemainingBatsmen() {
    if (!battingTeamPlayers.length) return []
    const atCrease = new Set([striker?.id, nonStriker?.id])
    const dismissed = new Set(dismissedBatsmen.map(d => d.id))
    return battingTeamPlayers.filter(p => !atCrease.has(p.id) && !dismissed.has(p.id))
  }

  // =========================================================================
  // MATCH RESULT determination
  // =========================================================================
  function getMatchResult() {
    if (!innings1Result) return { winner: 'N/A', margin: '' }
    if (innings === 2) {
      const target = innings1Result.total + 1
      if (runs >= target) {
        // Batting team (2nd innings) wins
        const wktsLeft = 10 - wickets
        return {
          winner: getBattingTeamName(),
          margin: `by ${wktsLeft} wicket${wktsLeft !== 1 ? 's' : ''}`,
        }
      } else {
        // Bowling team (1st innings batting team) wins
        const diff = target - 1 - runs
        return {
          winner: innings1Result.battingTeamName,
          margin: `by ${diff} run${diff !== 1 ? 's' : ''}`,
        }
      }
    }
    return { winner: 'N/A', margin: '' }
  }

  // =========================================================================
  // RENDER: SETUP PHASE
  // =========================================================================
  if (phase === 'setup') {
    return (
      <Screen title="New Match Setup" back={() => navigate(-1)} padded={false}>
        <div className="scorer-setup-page">

          {/* Step Indicator */}
          <div className="setup-steps">
            {['Match Info', 'Team A', 'Team B'].map((label, i) => (
              <div key={i} className={`setup-step ${i === setupStep ? 'active' : i < setupStep ? 'done' : ''}`}>
                <div className="setup-step-circle">{i < setupStep ? <Check size={12} /> : i + 1}</div>
                <span>{label}</span>
              </div>
            ))}
          </div>

          {/* Step 0: Match Info */}
          {setupStep === 0 && (
            <div className="setup-section">
              <h2 className="setup-heading">Match Information</h2>

              <label className="setup-label">Match Name</label>
              <input
                className="setup-input"
                placeholder="e.g. Club Final 2025, League Match #3"
                value={matchName}
                onChange={e => setMatchName(e.target.value)}
              />

              <label className="setup-label">Format</label>
              <div className="format-grid">
                {FORMATS.map(f => (
                  <button
                    key={f.value}
                    className={`format-btn ${selectedFormat === f.value ? 'active' : ''}`}
                    onClick={() => { setSelectedFormat(f.value); setFormatOvers(f.value) }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              {selectedFormat === 'custom' && (
                <input
                  className="setup-input"
                  placeholder="Enter number of overs"
                  type="number"
                  min="1"
                  value={customOvers}
                  onChange={e => setCustomOvers(e.target.value)}
                  style={{ marginTop: 8 }}
                />
              )}

              <label className="setup-label" style={{ marginTop: 20 }}>Team A Name</label>
              <input
                className="setup-input"
                placeholder="e.g. Scoring XI"
                value={teamAName}
                onChange={e => setTeamAName(e.target.value)}
              />

              <label className="setup-label">Team B Name</label>
              <input
                className="setup-input"
                placeholder="e.g. Warriors XI"
                value={teamBName}
                onChange={e => setTeamBName(e.target.value)}
              />

              <button className="setup-next-btn" onClick={handleSetupNext}>
                Next: Add Team A Players <ChevronRight size={16} />
              </button>
            </div>
          )}

          {/* Step 1: Team A Players */}
          {setupStep === 1 && (
            <div className="setup-section">
              <h2 className="setup-heading">
                <span style={{ color: '#38bdf8' }}>{teamAName || 'Team A'}</span> — 11 Players
              </h2>
              <p className="setup-hint">Enter names in batting order (Player 1 bats first)</p>
              <div className="players-list">
                {teamAPlayers.map((name, i) => (
                  <div key={i} className="player-input-row">
                    <span className="player-num">{i + 1}</span>
                    <input
                      className="setup-input player-name-input"
                      placeholder={`Player ${i + 1}`}
                      value={name}
                      onChange={e => {
                        const updated = [...teamAPlayers]
                        updated[i] = e.target.value
                        setTeamAPlayers(updated)
                      }}
                    />
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <button className="setup-back-btn" onClick={() => setSetupStep(0)}>← Back</button>
                <button className="setup-next-btn" style={{ flex: 1 }} onClick={handleSetupNext}>
                  Next: Add Team B Players <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Team B Players */}
          {setupStep === 2 && (
            <div className="setup-section">
              <h2 className="setup-heading">
                <span style={{ color: '#00e676' }}>{teamBName || 'Team B'}</span> — 11 Players
              </h2>
              <p className="setup-hint">Enter names in batting order (Player 1 bats first)</p>
              <div className="players-list">
                {teamBPlayers.map((name, i) => (
                  <div key={i} className="player-input-row">
                    <span className="player-num">{i + 1}</span>
                    <input
                      className="setup-input player-name-input"
                      placeholder={`Player ${i + 1}`}
                      value={name}
                      onChange={e => {
                        const updated = [...teamBPlayers]
                        updated[i] = e.target.value
                        setTeamBPlayers(updated)
                      }}
                    />
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <button className="setup-back-btn" onClick={() => setSetupStep(1)}>← Back</button>
                <button className="setup-next-btn" style={{ flex: 1 }} onClick={handleSetupNext}>
                  Proceed to Toss <Trophy size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // RENDER: TOSS PHASE
  // =========================================================================
  if (phase === 'toss') {
    return (
      <Screen title="Toss" back={() => setPhase('setup')} padded={false}>
        <div className="scorer-setup-page">
          <div className="setup-section toss-section">
            <div className="toss-coin-icon">🪙</div>
            <h2 className="setup-heading" style={{ textAlign: 'center' }}>Who Won the Toss?</h2>
            <p className="setup-hint" style={{ textAlign: 'center' }}>Match: <strong>{matchName}</strong> • {totalOvers} overs</p>

            {!tossWinnerKey ? (
              <div className="toss-team-buttons">
                <button className="toss-team-btn team-a" onClick={() => handleToss('A')}>
                  <Shield size={20} />
                  <span>{teamAName || 'Team A'}</span>
                  <span className="toss-team-sub">Wins Toss</span>
                </button>
                <button className="toss-team-btn team-b" onClick={() => handleToss('B')}>
                  <Shield size={20} />
                  <span>{teamBName || 'Team B'}</span>
                  <span className="toss-team-sub">Wins Toss</span>
                </button>
              </div>
            ) : (
              <div>
                <div className="toss-winner-badge">
                  🏆 {tossWinnerKey === 'A' ? (teamAName || 'Team A') : (teamBName || 'Team B')} won the toss!
                </div>
                <p className="setup-hint" style={{ textAlign: 'center', marginBottom: 16 }}>Choose to:</p>
                <div className="toss-team-buttons">
                  <button className="toss-choice-btn bat" onClick={() => handleBatBowlChoice('bat')}>
                    🏏 Bat First
                  </button>
                  <button className="toss-choice-btn bowl" onClick={() => handleBatBowlChoice('bowl')}>
                    ⚡ Bowl First
                  </button>
                </div>
                <button className="setup-back-btn" style={{ marginTop: 12, width: '100%' }} onClick={() => setTossWinnerKey(null)}>
                  ← Change Toss
                </button>
              </div>
            )}
          </div>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // RENDER: OPENERS SELECTION PHASE (called for both innings 1 and 2)
  // =========================================================================
  if (phase === 'openers') {
    // Need to init innings players if not done
    const batPlayers = battingTeamKey === 'A' ? teamAPlayers : teamBPlayers
    const bowlPlayers = battingTeamKey === 'A' ? teamBPlayers : teamAPlayers
    const inningsLabel = innings === 1 ? '1st Innings' : '2nd Innings'
    const batTeamName = battingTeamKey === 'A' ? (teamAName || 'Team A') : (teamBName || 'Team B')
    const bowlTeamName = battingTeamKey === 'A' ? (teamBName || 'Team B') : (teamAName || 'Team A')

    function handleOpenerConfirm() {
      if (!selStriker) return alert('Select striker (opening batsman on strike)')
      if (!selNonStriker) return alert('Select non-striker')
      if (selStriker === selNonStriker) return alert('Must be different players')
      if (!selBowler) return alert('Select opening bowler')

      const batObjs = batPlayers.map((name, i) => mkPlayer(i, name || `Player ${i + 1}`))
      const bowlObjs = bowlPlayers.map((name, i) => mkBowler(i, name || `Player ${i + 1}`))
      setBattingTeamPlayers(batObjs)
      setBowlingTeamPlayers(bowlObjs)
      setBowlerHistory({})
      setDismissedBatsmen([])
      setExtras({ wides: 0, noBalls: 0, byes: 0, legByes: 0 })
      setRuns(0)
      setWickets(0)
      setBallsInOver(0)
      setCompletedOvers(0)
      setCurrentOverBalls([])
      setBallHistory([])

      const strIdx = parseInt(selStriker)
      const nsIdx = parseInt(selNonStriker)
      const bowlIdx = parseInt(selBowler)

      const strObj = { ...mkPlayer(strIdx, batPlayers[strIdx] || `Player ${strIdx + 1}`), onStrike: true }
      const nsObj = { ...mkPlayer(nsIdx, batPlayers[nsIdx] || `Player ${nsIdx + 1}`), onStrike: false }
      const bowlObj = mkBowler(bowlIdx, bowlPlayers[bowlIdx] || `Player ${bowlIdx + 1}`)

      setStriker(strObj)
      setNonStriker(nsObj)
      setCurrentBowler(bowlObj)
      setBowlerHistory({ [bowlObj.id]: { ...bowlObj } })

      const usedIds = new Set([strIdx, nsIdx])
      let nextIdx = 0
      for (let i = 0; i < batPlayers.length; i++) {
        if (!usedIds.has(i)) { nextIdx = i; break }
      }
      setNextBatsmanIdx(nextIdx)
      setLiveCommentary(null)
      setIsFreeHit(false)
      setPendingNextBatsman(false)
      setPendingBowlerChange(false)

      setPhase('scoring')
    }

    return (
      <Screen title={`Select Openers — ${inningsLabel}`} back={() => setPhase(innings === 1 ? 'toss' : 'innings_break')} padded={false}>
        <div className="scorer-setup-page">
          <div className="setup-section">
            {innings === 2 && innings1Result && (
              <div className="target-banner">
                <Trophy size={16} />
                <span>Target: <strong>{innings1Result.total + 1}</strong> runs in <strong>{totalOvers}</strong> overs</span>
              </div>
            )}

            <h2 className="setup-heading">🏏 {batTeamName} — Batting</h2>

            <label className="setup-label">Striker (On Strike)</label>
            <select className="setup-select" value={selStriker} onChange={e => setSelStriker(e.target.value)}>
              <option value="">Select striker...</option>
              {batPlayers.map((name, i) => (
                <option key={i} value={i} disabled={parseInt(selNonStriker) === i}>
                  {i + 1}. {name || `Player ${i + 1}`}
                </option>
              ))}
            </select>

            <label className="setup-label" style={{ marginTop: 12 }}>Non-Striker</label>
            <select className="setup-select" value={selNonStriker} onChange={e => setSelNonStriker(e.target.value)}>
              <option value="">Select non-striker...</option>
              {batPlayers.map((name, i) => (
                <option key={i} value={i} disabled={parseInt(selStriker) === i}>
                  {i + 1}. {name || `Player ${i + 1}`}
                </option>
              ))}
            </select>

            <h2 className="setup-heading" style={{ marginTop: 20 }}>⚡ {bowlTeamName} — Opening Bowler</h2>
            <label className="setup-label">Opening Bowler</label>
            <select className="setup-select" value={selBowler} onChange={e => setSelBowler(e.target.value)}>
              <option value="">Select opening bowler...</option>
              {bowlPlayers.map((name, i) => (
                <option key={i} value={i}>
                  {i + 1}. {name || `Player ${i + 1}`}
                </option>
              ))}
            </select>

            <button className="setup-next-btn" style={{ marginTop: 24 }} onClick={handleOpenerConfirm}>
              {innings === 1 ? '🏏 Start Match' : '🏏 Start 2nd Innings'}
            </button>
          </div>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // RENDER: INNINGS BREAK
  // =========================================================================
  if (phase === 'innings_break' && innings1Result) {
    const target = innings1Result.total + 1
    const batters = innings1Result.dismissed || []
    if (innings1Result.striker && !innings1Result.striker.dismissed) {
      batters.push({ ...innings1Result.striker, dismissalInfo: 'not out' })
    }
    if (innings1Result.nonStrikerFinal) batters.push(innings1Result.nonStrikerFinal)
    const bowlerList = Object.values(innings1Result.bowlerHistorySnapshot || {})
    const extSnap = innings1Result.extrasSnapshot || {}
    const extTotal = (extSnap.wides || 0) + (extSnap.noBalls || 0) + (extSnap.byes || 0) + (extSnap.legByes || 0)

    return (
      <Screen title="1st Innings Summary" back={false} padded={false}>
        <div className="scorecard-page">

          {/* Result Banner */}
          <div className="innings-result-banner">
            <Trophy size={22} color="#f59e0b" />
            <div>
              <div className="innings-result-title">{innings1Result.battingTeamName}</div>
              <div className="innings-result-score">
                {innings1Result.total}/{innings1Result.wickets}
                <span style={{ fontSize: 14, fontWeight: 400, marginLeft: 8 }}>
                  ({innings1Result.completedOvers}.{innings1Result.ballsInOver} overs)
                </span>
              </div>
            </div>
          </div>

          {/* Target */}
          <div className="target-banner" style={{ margin: '12px 16px' }}>
            <Crosshair size={16} />
            <span><strong>{innings1Result.bowlingTeamName}</strong> need <strong>{target}</strong> runs to win</span>
          </div>

          {/* Batting Card */}
          <div className="scorecard-section">
            <div className="scorecard-section-header">🏏 Batting</div>
            <div className="scorecard-table-wrap">
              <div className="sc-row sc-header">
                <span className="sc-name">Batter</span>
                <span className="sc-stat">R</span>
                <span className="sc-stat">B</span>
                <span className="sc-stat">4s</span>
                <span className="sc-stat">6s</span>
                <span className="sc-stat">SR</span>
              </div>
              {batters.map((b, i) => (
                <div key={i} className="sc-row">
                  <div className="sc-name">
                    <span className="sc-player-name">{b.name}</span>
                    <span className="sc-dismissal">{b.dismissalInfo || 'not out'}</span>
                  </div>
                  <span className="sc-stat sc-runs">{b.runs}</span>
                  <span className="sc-stat">{b.balls}</span>
                  <span className="sc-stat">{b.fours}</span>
                  <span className="sc-stat">{b.sixes}</span>
                  <span className="sc-stat">{strikeRate(b.runs, b.balls)}</span>
                </div>
              ))}
              <div className="sc-row sc-extras">
                <span className="sc-name">Extras</span>
                <span className="sc-stat sc-runs" style={{ gridColumn: '2 / -1', textAlign: 'left', paddingLeft: 8 }}>
                  {extTotal} (wd {extSnap.wides || 0}, nb {extSnap.noBalls || 0}, b {extSnap.byes || 0}, lb {extSnap.legByes || 0})
                </span>
              </div>
            </div>
          </div>

          {/* Bowling Card */}
          <div className="scorecard-section">
            <div className="scorecard-section-header">⚡ Bowling</div>
            <div className="scorecard-table-wrap">
              <div className="sc-row sc-header">
                <span className="sc-name">Bowler</span>
                <span className="sc-stat">O</span>
                <span className="sc-stat">M</span>
                <span className="sc-stat">R</span>
                <span className="sc-stat">W</span>
                <span className="sc-stat">Eco</span>
              </div>
              {bowlerList.map((b, i) => (
                <div key={i} className="sc-row">
                  <span className="sc-name sc-player-name">{b.name}</span>
                  <span className="sc-stat">{b.overs || 0}.{b.balls || 0}</span>
                  <span className="sc-stat">{b.maidens || 0}</span>
                  <span className="sc-stat">{b.runs || 0}</span>
                  <span className="sc-stat sc-wickets">{b.wickets || 0}</span>
                  <span className="sc-stat">{economy(b.runs || 0, b.overs || 0, b.balls || 0)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ padding: '0 16px 32px' }}>
            <button
              className="setup-next-btn"
              onClick={() => {
                const newBatKey = battingTeamKey === 'A' ? 'B' : 'A'
                setBattingTeamKey(newBatKey)
                setInnings(2)
                setSelStriker('')
                setSelNonStriker('')
                setSelBowler('')
                setPhase('openers')
              }}
            >
              🏏 Start 2nd Innings
            </button>
          </div>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // RENDER: MATCH RESULT
  // =========================================================================
  if (phase === 'match_result') {
    const result = getMatchResult()
    return (
      <Screen title="Match Complete" back={false} padded={false}>
        <div className="scorecard-page">
          <div className="match-result-banner">
            <Trophy size={40} color="#f59e0b" />
            <h1 className="match-result-winner">{result.winner}</h1>
            <p className="match-result-margin">won {result.margin}</p>
          </div>

          {innings1Result && (
            <div className="result-scores-row">
              <div className="result-score-block">
                <span className="result-team">{innings1Result.battingTeamName}</span>
                <span className="result-score">{innings1Result.total}/{innings1Result.wickets}</span>
                <span className="result-overs">({innings1Result.completedOvers}.{innings1Result.ballsInOver} ov)</span>
              </div>
              <div className="result-vs">vs</div>
              <div className="result-score-block">
                <span className="result-team">{innings1Result.bowlingTeamName}</span>
                <span className="result-score">{runs}/{wickets}</span>
                <span className="result-overs">({completedOvers}.{ballsInOver} ov)</span>
              </div>
            </div>
          )}

          <div style={{ padding: '0 16px 40px', marginTop: 24 }}>
            <button className="setup-next-btn" onClick={() => {
              setPhase('setup')
              setSetupStep(0)
              setMatchName('')
              setTeamAName('')
              setTeamBName('')
              setTeamAPlayers(Array(11).fill('').map((_, i) => `Player ${i + 1}`))
              setTeamBPlayers(Array(11).fill('').map((_, i) => `Player ${i + 1}`))
              setInnings(1)
              setInnings1Result(null)
              setTossWinnerKey(null)
            }}>
              🏏 Start New Match
            </button>
            <button className="setup-back-btn" style={{ marginTop: 10, width: '100%' }} onClick={() => navigate(-1)}>
              ← Go Home
            </button>
          </div>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // RENDER: FULL SCORECARD VIEW (sub-page from scoring)
  // =========================================================================
  if (showScorecardView) {
    return (
      <Screen title="Live Scorecard" back={false} padded={false}>
        <div className="scorecard-page">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px' }}>
            <button className="setup-back-btn" onClick={() => setShowScorecardView(false)}>← Back to Scoring</button>
            <span style={{ fontSize: 11, color: '#38bdf8', fontWeight: 700 }}>LIVE • {innings === 1 ? '1st' : '2nd'} INNINGS</span>
          </div>

          {/* Score banner */}
          <div className="innings-result-banner">
            <div>
              <div className="innings-result-title">{getBattingTeamName()}</div>
              <div className="innings-result-score">
                {runs}/{wickets}
                <span style={{ fontSize: 14, fontWeight: 400, marginLeft: 8 }}>({completedOvers}.{ballsInOver} overs)</span>
              </div>
              {innings === 2 && innings1Result && (
                <div style={{ fontSize: 12, color: '#fbbf24', marginTop: 4 }}>
                  Need {runsNeeded()} more • RRR {rrr()}
                </div>
              )}
            </div>
          </div>

          {/* Batting */}
          <div className="scorecard-section">
            <div className="scorecard-section-header">🏏 Batting</div>
            <div className="scorecard-table-wrap">
              <div className="sc-row sc-header">
                <span className="sc-name">Batter</span>
                <span className="sc-stat">R</span>
                <span className="sc-stat">B</span>
                <span className="sc-stat">4s</span>
                <span className="sc-stat">6s</span>
                <span className="sc-stat">SR</span>
              </div>
              {/* At crease */}
              {striker && (
                <div className="sc-row sc-active">
                  <div className="sc-name">
                    <span className="sc-player-name">{striker.name} *</span>
                    <span className="sc-dismissal" style={{ color: '#00e676' }}>batting</span>
                  </div>
                  <span className="sc-stat sc-runs">{striker.runs}</span>
                  <span className="sc-stat">{striker.balls}</span>
                  <span className="sc-stat">{striker.fours}</span>
                  <span className="sc-stat">{striker.sixes}</span>
                  <span className="sc-stat">{strikeRate(striker.runs, striker.balls)}</span>
                </div>
              )}
              {nonStriker && (
                <div className="sc-row">
                  <div className="sc-name">
                    <span className="sc-player-name">{nonStriker.name}</span>
                    <span className="sc-dismissal" style={{ color: '#94a3b8' }}>non-striker</span>
                  </div>
                  <span className="sc-stat sc-runs">{nonStriker.runs}</span>
                  <span className="sc-stat">{nonStriker.balls}</span>
                  <span className="sc-stat">{nonStriker.fours}</span>
                  <span className="sc-stat">{nonStriker.sixes}</span>
                  <span className="sc-stat">{strikeRate(nonStriker.runs, nonStriker.balls)}</span>
                </div>
              )}
              {/* Dismissed */}
              {dismissedBatsmen.map((b, i) => (
                <div key={i} className="sc-row sc-dismissed">
                  <div className="sc-name">
                    <span className="sc-player-name">{b.name}</span>
                    <span className="sc-dismissal">{b.dismissalInfo}</span>
                  </div>
                  <span className="sc-stat sc-runs">{b.runs}</span>
                  <span className="sc-stat">{b.balls}</span>
                  <span className="sc-stat">{b.fours}</span>
                  <span className="sc-stat">{b.sixes}</span>
                  <span className="sc-stat">{strikeRate(b.runs, b.balls)}</span>
                </div>
              ))}
              <div className="sc-row sc-extras">
                <span className="sc-name">Extras</span>
                <span style={{ fontSize: 12, color: 'var(--muted)', padding: '0 8px' }}>
                  {extras.wides + extras.noBalls + extras.byes + extras.legByes}
                  {' '}(wd {extras.wides}, nb {extras.noBalls}, b {extras.byes}, lb {extras.legByes})
                </span>
              </div>
            </div>
          </div>

          {/* Bowling */}
          <div className="scorecard-section">
            <div className="scorecard-section-header">⚡ Bowling</div>
            <div className="scorecard-table-wrap">
              <div className="sc-row sc-header">
                <span className="sc-name">Bowler</span>
                <span className="sc-stat">O</span>
                <span className="sc-stat">R</span>
                <span className="sc-stat">W</span>
                <span className="sc-stat">Eco</span>
              </div>
              {Object.values(bowlerHistory).map((b, i) => (
                <div key={i} className={`sc-row ${currentBowler?.id === b.id ? 'sc-active' : ''}`}>
                  <div className="sc-name">
                    <span className="sc-player-name">{b.name}{currentBowler?.id === b.id ? ' *' : ''}</span>
                  </div>
                  <span className="sc-stat">{b.overs || 0}.{b.balls || 0}</span>
                  <span className="sc-stat">{b.runs || 0}</span>
                  <span className="sc-stat sc-wickets">{b.wickets || 0}</span>
                  <span className="sc-stat">{economy(b.runs || 0, b.overs || 0, b.balls || 0)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ball-by-ball */}
          <div className="scorecard-section" style={{ paddingBottom: 40 }}>
            <div className="scorecard-section-header">📋 Ball by Ball</div>
            {ballHistory.slice(0, 20).map((b, i) => (
              <div key={i} className="ball-history-row">
                <span className="ball-history-over">{b.over}</span>
                <span className="ball-chip" style={{ background: b.color }}>{b.val}</span>
                <span className="ball-history-comment">{b.commentary}</span>
              </div>
            ))}
          </div>
        </div>
      </Screen>
    )
  }

  // =========================================================================
  // RENDER: SCORING PHASE (main UI)
  // =========================================================================
  const oStr = overDisplay(completedOvers, ballsInOver)
  const crrVal = crr()
  const rrrVal = rrr()
  const runsNeededVal = runsNeeded()
  const batTeamName = getBattingTeamName()
  const bowlTeamName = getBowlingTeamName()

  return (
    <Screen title="Live Scorer" back={() => navigate(-1)} padded={false}
      right={
        <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={() => setVoiceEnabled(v => !v)}>
          {voiceEnabled ? <Volume2 size={20} color="#00e676" /> : <VolumeX size={20} color="#64748b" />}
        </button>
      }
    >
      <div className="live-scorer-page">

        {/* ---- NEXT BATSMAN SELECTION (inline, full-width overlay) ---- */}
        {pendingNextBatsman && (
          <div className="inline-overlay">
            <div className="inline-overlay-header">
              <AlertCircle size={18} color="#ef4444" />
              <span>WICKET! Who comes in next?</span>
            </div>
            <div className="inline-overlay-sub">Select the next batsman from {batTeamName}</div>

            <label className="setup-label" style={{ marginTop: 10 }}>Dismissal Type</label>
            <div className="dismissal-type-grid">
              {DISMISSAL_TYPES.map(dt => (
                <button
                  key={dt}
                  className={`dismissal-btn ${dismissalType === dt ? 'active' : ''}`}
                  onClick={() => setDismissalType(dt)}
                >
                  {dt}
                </button>
              ))}
            </div>

            <label className="setup-label" style={{ marginTop: 8 }}>Next Batsman</label>
            {getRemainingBatsmen().length === 0 ? (
              <div style={{ color: '#ef4444', padding: '10px 0', fontSize: 14 }}>All batsmen dismissed — innings over!</div>
            ) : (
              getRemainingBatsmen().map(p => (
                <button
                  key={p.id}
                  className="next-batsman-btn"
                  onClick={() => handleSelectNextBatsman(p.id)}
                >
                  <User size={14} /> {p.name}
                </button>
              ))
            )}
          </div>
        )}

        {/* ---- BOWLER CHANGE (inline overlay) ---- */}
        {pendingBowlerChange && !pendingNextBatsman && (
          <div className="inline-overlay">
            <div className="inline-overlay-header">
              <RefreshCw size={18} color="#38bdf8" />
              <span>Over Complete! Select Next Bowler</span>
            </div>
            <div className="inline-overlay-sub">Over {completedOvers} complete — choose bowler for over {completedOvers + 1}</div>

            {bowlingTeamPlayers.map(b => {
              const hist = bowlerHistory[b.id] || b
              return (
                <button
                  key={b.id}
                  className={`next-batsman-btn ${currentBowler?.id === b.id ? 'disabled-bowler' : ''}`}
                  disabled={currentBowler?.id === b.id}
                  onClick={() => {
                    const freshBowler = {
                      ...(bowlerHistory[b.id] || mkBowler(b.id, b.name)),
                      id: b.id,
                    }
                    setCurrentBowler(freshBowler)
                    if (!bowlerHistory[b.id]) {
                      setBowlerHistory(prev => ({ ...prev, [b.id]: { ...freshBowler } }))
                    }
                    setPendingBowlerChange(false)
                  }}
                >
                  <Zap size={14} />
                  <span>{b.name}</span>
                  {hist.overs > 0 || hist.balls > 0 ? (
                    <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 'auto' }}>
                      {hist.overs || 0}.{hist.balls || 0}-{hist.runs || 0}-{hist.wickets || 0}
                    </span>
                  ) : (
                    <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 'auto' }}>yet to bowl</span>
                  )}
                </button>
              )
            })}
          </div>
        )}

        {/* ---- SCORE HEADER ---- */}
        {!pendingNextBatsman && !pendingBowlerChange && (
          <>
            <div className="scorer-header">
              <div className="scorer-team-block">
                <span className="scorer-team-name">{batTeamName}</span>
              </div>
              <div className="scorer-score-center">
                <div className="scorer-main-score">{runs}/{wickets}</div>
                <div className="scorer-overs-row">
                  <span>CRR {crrVal}</span>
                  <span style={{ color: '#94a3b8' }}>|</span>
                  <span>{oStr} ov</span>
                  {innings === 2 && (
                    <>
                      <span style={{ color: '#94a3b8' }}>|</span>
                      <span style={{ color: '#fbbf24' }}>RRR {rrrVal}</span>
                    </>
                  )}
                </div>
                {innings === 2 && innings1Result && (
                  <div className="needs-runs-pill">
                    Need {runsNeededVal} from {(totalOvers * 6) - (completedOvers * 6 + ballsInOver)} balls
                  </div>
                )}
              </div>
              <div className="scorer-team-block" style={{ textAlign: 'right' }}>
                <span className="scorer-team-name">{bowlTeamName}</span>
              </div>
            </div>

            {/* Free Hit Banner */}
            {isFreeHit && (
              <div className="freehit-banner">
                ⚡ FREE HIT — Batsman cannot be bowled out!
              </div>
            )}

            {/* Current Over Balls */}
            <div className="current-over-strip">
              <span className="over-strip-label">This Over</span>
              <div className="over-balls">
                {currentOverBalls.map((b, i) => (
                  <div key={i} className="over-ball" style={{ background: b.color }}>
                    {b.val}
                  </div>
                ))}
                {currentOverBalls.length === 0 && <span style={{ color: '#475569', fontSize: 12 }}>No balls bowled yet</span>}
              </div>
            </div>

            {/* Batsmen */}
            <div className="batsmen-section">
              {striker && (
                <div className="batsman-card striker">
                  <div className="batsman-info">
                    <span className="batsman-strike-dot" />
                    <span className="batsman-name">{striker.name}</span>
                  </div>
                  <div className="batsman-stats">
                    <span className="batsman-runs">{striker.runs}</span>
                    <span className="batsman-balls">({striker.balls})</span>
                    <div className="batsman-mini-stats">
                      <span className="mini-stat four">{striker.fours}</span>
                      <span className="mini-stat six">{striker.sixes}</span>
                    </div>
                  </div>
                </div>
              )}
              {nonStriker && (
                <div className="batsman-card">
                  <div className="batsman-info">
                    <span className="batsman-name">{nonStriker.name}</span>
                  </div>
                  <div className="batsman-stats">
                    <span className="batsman-runs">{nonStriker.runs}</span>
                    <span className="batsman-balls">({nonStriker.balls})</span>
                    <div className="batsman-mini-stats">
                      <span className="mini-stat four">{nonStriker.fours}</span>
                      <span className="mini-stat six">{nonStriker.sixes}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Current Bowler */}
            {currentBowler && (
              <div className="bowler-row">
                <span className="bowler-icon">🏏</span>
                <span className="bowler-name">{currentBowler.name}</span>
                <span className="bowler-figures">{bowlerFigures(currentBowler)}</span>
              </div>
            )}

            {/* Shot Type Tray */}
            <div className="shot-tray-wrap">
              <div className="shot-tray-label">
                <Sparkles size={12} color="#a78bfa" />
                <span>Shot & Placement</span>
                <span className="shot-selected-pill">{selectedShot.label}</span>
              </div>
              <div className="shot-tray">
                {SHOT_TYPES.map(shot => (
                  <button
                    key={shot.id}
                    className={`shot-btn ${selectedShot.id === shot.id ? 'active' : ''}`}
                    onClick={() => setSelectedShot(shot)}
                  >
                    {shot.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Commentary Box */}
            {liveCommentary && (
              <div className="commentary-box" style={{ borderColor: liveCommentary.color }}>
                <div className="commentary-box-header">
                  <div>
                    <Radio size={12} color="#a78bfa" />
                    <span className="commentary-over-label">Ball {liveCommentary.over}</span>
                  </div>
                  <span className="commentary-event-pill" style={{ background: liveCommentary.color + '33', color: liveCommentary.color }}>
                    {liveCommentary.event}
                  </span>
                </div>
                <p className="commentary-text">"{liveCommentary.text}"</p>
                <div className="commentary-shot-tag">{liveCommentary.shot}</div>
                <button className="replay-voice-btn" onClick={() => speakAloud(liveCommentary.text)}>
                  🔊 Replay Voice
                </button>
              </div>
            )}

            {/* Score Keypad */}
            <div className="keypad">
              {keyPadRows.map((row, ri) => (
                <div key={ri} className="keypad-row">
                  {row.map(key => (
                    <button
                      key={key.val}
                      className="keypad-btn"
                      style={key.color ? { background: key.color } : {}}
                      onClick={() => handleKeyPress(key)}
                    >
                      {key.label}
                    </button>
                  ))}
                </div>
              ))}
            </div>

            {/* Undo + Change Bowler row */}
            <div className="scorer-action-row">
              <button className="scorer-action-btn" onClick={() => handleKeyPress({ type: 'undo', val: 'undo' })}>
                <RotateCcw size={14} /> UNDO
              </button>
              <button className="scorer-action-btn primary" onClick={() => setPendingBowlerChange(true)}>
                <RefreshCw size={14} /> CHANGE BOWLER
              </button>
            </div>

            {/* Footer toolbar */}
            <div className="scorer-footer">
              <button className="footer-btn">
                <Target size={16} />
                <span>DRS</span>
              </button>
              <button className="footer-btn">
                <CloudRain size={16} />
                <span>DLS</span>
              </button>
              <button className="footer-btn" onClick={() => setShowScorecardView(true)}>
                <FileText size={16} />
                <span>Scorecard</span>
              </button>
              <button className="footer-btn" onClick={endInnings}>
                <MoreHorizontal size={16} />
                <span>End Innings</span>
              </button>
            </div>
          </>
        )}
      </div>
    </Screen>
  )
}
