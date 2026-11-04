# Scoring Heroes — Business Vendor Modules: Execution Status & Build Roadmap

> **Current Timestamp:** November 4, 2026  
> **Development Standard:** Brick-by-brick production execution, zero feature numbers / meta labels in UI, 100% mobile-first responsiveness, strictly dedicated pages with `← Back` (zero popups or modal dialogs), and authentic sports operational logic.

---

## 1. Executive Master Status Overview

| # | Business Vendor Module | Demo Login Phone | Operational Route | Core Capabilities | Current Status |
|---|------------------------|------------------|-------------------|-------------------|----------------|
| **1** | **Ground & Stadium Owner** | `9999999999` | `/app/grounds` | Pitch Slots & Booking, Staff Attendance & Payroll, Transparent Accounts P&L | ✅ **100% Completed & Deployed** |
| **2** | **Sports Academy & Institute** | `8888888888` | `/app/academy` | Student Batches, Daily Attendance Roll Call, Fee Collection & WhatsApp Reminders | ✅ **100% Completed & Deployed** |
| **3** | **Sports Equipment Seller & Merchant** | `7777777777` | `/app/seller` | Catalog Management, Order Queue with Milestone Tracking, Real Courier Details, Strikethrough MRP | ✅ **100% Completed & Deployed** |
| **4** | **Independent Coach & Trainer** | `6666666666` | `/app/coach` | Trainee Biomechanics & Skill Radar, 1-on-1 Sessions Calendar, Video Drill Library, Coaching Income | ✅ **100% Completed & Deployed** |
| **5** | **Live Streamer & Broadcaster** | `5555555555` | `/app/streamer` | Live RTMP Ingest & Stream Keys, TV Score Graphics & Milestone Banners, Instant Highlights | ⚪ **Queued (Next Module)** |
| **6** | **Tournament Sponsor & Brand Advertiser** | `4444444444` | `/app/sponsor` | Ad Campaigns, Matchday Banner Placements, Real-Time CTR & Impression Analytics, Ad Wallet | ⚪ **Queued** |

---

## 2. What Has Been Built Till Now (Completed Modules)

### Module 1: Ground & Stadium Owner (`9999999999`)
- **Pitch Slots & Venue Booking (`?tab=slots`):**
  - Multi-venue selector: *Main Stadium Oval* (50k capacity), *Practice Turf 2*, *Astroturf Box Arena*, *Nets Arena*.
  - Slot transparency: Displays customer name, phone number, teams, match format, amount paid, and floodlight surcharge (+₹1,500).
  - Dedicated sub-pages: `+ Book Walk-in Slot`, `[🎫 Digital Gate Pass]` (QR pass with ground rules).
- **Staff Operations & Attendance (`?tab=staff`):**
  - Daily roll call with 1-click status pills (`Present`, `Late`, `Half Day`, `Absent`).
  - Payroll due reminders and 1-click salary disbursal logging directly into P&L ledger.
  - Dedicated sub-page: `+ Add Staff Member`.
- **Financial Accounts & P&L (`?tab=accounts`):**
  - Real formula: $\text{Net Profit} = \text{Total Ground Inflow} - \text{Operational Expenses}$.
  - Itemized credit/debit ledger with category breakdowns (Diesel roller, floodlight power, red clay soil, payroll).
  - Dedicated sub-page: `+ Record Expense` and printable statement.

---

### Module 2: Sports Academy & Coaching Institute (`8888888888`)
- **Student Roster & Batches (`?tab=students`):**
  - Batch switcher: *All Students (128)*, *U-14 Morning Foundation*, *U-16 Evening Elite*, *U-19 Pro Performance*, *Weekend Clinic*.
  - Trainee profile cards with skill tag, Aadhaar KYC badge, guardian phone, and jersey number.
  - Dedicated sub-pages: `+ Admit New Student` and `[📊 Student Academic & Athletic Report Card]`.
- **Daily Attendance & Drills (`?tab=attendance`):**
  - 1-click roll call per batch with instant status marking (`Present`, `Late`, `Absent`, `Medical`).
  - Coach on-duty presence tracker.
  - Repeatable drill syllabi with 1-click `[Apply This Drill Today]`.
- **Fee Collection & Accounts (`?tab=fees`):**
  - Expected vs collected vs overdue fee metrics.
  - **1-Click WhatsApp / SMS Reminder** with UPI payment links.
  - Dedicated sub-page: `Record Fee Payment` with official digital receipt generator.

---

### Module 3: Sports Equipment Seller & Merchant (`7777777777`)
- **Streamlined Order Queue & Dedicated Order Details (`?tab=orders`):**
  - Scannable order queue cards: Order ID, status pill, customer snippet, item thumbnail, and order total.
  - **Dedicated Order Details Sub-Page (`viewingOrder`):**
    - **5-Stage Milestone Stepper:** *Order Placed* → *Packed & Labelled* → *In Transit* → *Out for Delivery* → *Delivered & Settled*.
    - **Interactive Vendor Check Marks:** Vendor can click directly on any milestone circle or toggle buttons in the checklist panel to update order progression.
    - **Customer Details Section:** Direct `[📞 Call Buyer]` button and **`[📋 Copy Full Address]`** button with instant confirmation toast.
    - **Product Breakdown:** High-res equipment photos, SKU codes, technical specifications, quantity, rate, and tax calculation.
    - **Courier & Logistics Details:** Carrier name, AWB tracking ID, and live **`[Track on Official Carrier Portal ↗]`** link.
- **Real Courier & Shipping Assignment (No Simulation):**
  - Dedicated sub-page: `Assign Courier & Shipping Details` (`assigningCourierOrder`).
  - One-tap carrier presets (*BlueDart*, *Delhivery*, *DTDC*, *India Post*, *FedEx*, *Shadowfax*).
  - Real fields for Carrier Name, AWB / Tracking ID, Live Tracking URL, Dispatch Date, and Estimated Delivery (ETA).
- **Product Image Selector (Add & Edit Product):**
  - Live preview thumbnail box.
  - 7 authentic cricket gear presets (*Bat*, *Match Ball*, *Pads*, *Gloves*, *Helmet*, *Jersey*, *Kit Bag*) + custom URL field.
- **Dynamic Category Specifications (Matching Customer View):**
  - Dynamically adjusting technical spec fields matching `/app/marketplace/product/...` for all 7 equipment categories.
- **Strikethrough Actual MRP vs Discounted Selling Price:**
  - Displays cut-off actual MRP (e.g., `~₹18,999~`), bright green selling price (`₹14,500`), auto-calculated `% OFF` badge, and wholesale rate.
- **Escrow Payouts & Settlement (`?tab=payouts`):**
  - Escrow math: $\text{Net Payout} = \text{Gross} - \text{5\% Fee} - \text{Courier Charges}$.
  - Instant bank transfer execution to verified current account + printable GST invoice.

---

### Module 4: Independent Coach & Trainer (`6666666666`) — [100% Completed & Deployed]

### Account Credentials & Role Context
- **Phone Number:** `6666666666` (Coach Venkatesh Prasad, BCCI Level 2 Certified / Ranji Trophy Staff)
- **Primary Dashboard:** `client/src/components/dashboards/CoachDashboard.jsx` (`/app`)
- **Operations Portal Route:** `/app/coach` (`CoachPortal.jsx` & `CoachPortal.css`)
- **Dedicated Bottom Navigation:**
  - `Home` (`/app`)
  - `Trainees` (`/app/coach?tab=trainees`)
  - `Sessions` (`/app/coach?tab=sessions`)
  - `Drills` (`/app/coach?tab=drills`)
  - `Earnings` (`/app/coach?tab=earnings`)

---

### Brick-by-Brick Implementation Blueprint for Module 4

```
                               COACH OPERATIONS PORTAL (/app/coach)
                                                │
         ┌───────────────────────┬──────────────┴──────────────┬───────────────────────┐
         ▼                       ▼                             ▼                       ▼
    [TAB 1: TRAINEES]      [TAB 2: SESSIONS]             [TAB 3: DRILLS]        [TAB 4: EARNINGS]
    • Bio-Mechanics Radar  • 1-on-1 Slots Calendar       • Video Analysis Lib   • Coach P&L Math
    • Trainee Cards        • Venue & Turf Nets           • Slow-Mo Checkpoints  • Trainee Fee Ledger
    • Skill Assessments    • Booking Management          • Common Faults Notes  • 1-Click WhatsApp Link
    • Call Trainee/Parent  • Reschedule & Mark Complete  • Assign to Trainee    • Printable Receipt
         │                       │                             │                       │
    Sub-Pages:              Sub-Pages:                    Sub-Pages:              Sub-Pages:
    1. View Trainee Radar   1. Schedule 1-on-1 Session    1. Watch Slow-Mo Drill  1. Record Payment
    2. Enroll Trainee       2. Reschedule Session         2. Create Technical     2. Official Tuition
    3. Add Evaluation                                        Drill                   Receipt Paper
```

---

### Brick 1: Tab 1 — Trainee Roster, Skill Radar & Assessments (`?tab=trainees`)
1. **Interactive Batch & Role Filters:**
   - Batches: `All Trainees (42)`, `Morning Pro (14)`, `Evening Elite (16)`, `Weekend Masterclass (12)`, `1-on-1 Private (8)`.
   - Specializations: `All Roles`, `Batsmen`, `Fast Bowlers`, `Spinners`, `Wicketkeepers`, `All-Rounders`.
   - Live Search: Searches trainee name, phone, school/squad, or technical note.
2. **Trainee Performance Cards:**
   - Trainee name, age, squad badge, contact phone with direct `[📞 Call Trainee/Parent]` action.
   - **Biomechanical Stats Bar:**
     - *Batting Technique Index*: e.g. `88/100`
     - *Clocked Pace*: e.g. `126 km/h`
     - *Yo-Yo Fitness Score*: e.g. `18.2`
     - *Catch Reflex Efficiency*: e.g. `94%`
   - Latest Coach Notes: e.g. *"Front-foot drive head position upright; back-foot punch improving. Needs work on short ball leave."*
3. **Dedicated Sub-Page 1.1: `View Trainee Profile & Skill Radar` (`viewingTrainee`):**
   - Full-width dedicated screen with `← Back`.
   - Bio-mechanical radar breakdown: Technique, Power, Reflexes, Endurance, Tactics.
   - Chronological evaluation history log with dates and coach feedback.
   - Active assigned drills and 30-day attendance score.
4. **Dedicated Sub-Page 1.2: `+ Enroll New Trainee` (`showEnrollTraineePage`):**
   - Full enrollment form: Trainee Name, Date of Birth, Primary Role, Guardian Contact, Blood Group, Assigned Batch, Monthly Fee, Baseline Biomechanical Notes.
5. **Dedicated Sub-Page 1.3: `+ Add Biomechanical Evaluation` (`evaluatingTrainee`):**
   - Evaluation date, assessed skill, updated metric ratings, coach technical feedback, and drill recommendation.

---

### Brick 2: Tab 2 — 1-on-1 Sessions & Masterclass Scheduling Calendar (`?tab=sessions`)
1. **Interactive Date Switcher:**
   - Quick date chips: `Today (04 Nov)`, `Tomorrow (05 Nov)`, `Fri (06 Nov)`, `Sat (07 Nov)`, `Sun (08 Nov)`.
2. **Session Category Filters:**
   - `All Sessions (6)`, `1-on-1 Net Sessions (3)`, `Fast Bowling Speed Clinics (2)`, `Batting Masterclasses (1)`.
3. **Session Slot Cards:**
   - Time window (e.g. `06:00 - 07:15 AM`, `04:30 - 06:00 PM`).
   - Slot Type badge (`1-on-1 Private Net`, `Group Clinic`).
   - Assigned Venue / Turf Net (e.g. *Turf Net 1 - Red Soil*, *Astroturf Box Net*, *Bowling Machine Bay*).
   - Trainee Name & Target Technical Focus (e.g. *Inswing Release & Seam Alignment*).
   - Hourly Fee (e.g. `₹1,200/hr`) and Payment Status (`Paid via Escrow` vs `Pending at Net`).
   - Direct Actions: `[📞 Call]`, `[✓ Mark Completed]`, `[✏️ Reschedule]`.
4. **Dedicated Sub-Page 2.1: `+ Schedule 1-on-1 Session` (`showScheduleSessionPage`):**
   - Trainee selection, date, start/end time, venue net, drill topic, fee rate, payment mode.

---

### Brick 3: Tab 3 — Video Drill Analysis & Technical Library (`?tab=drills`)
1. **Category Pills:**
   - `All Drills`, `🏏 Batting Technique`, `⚡ Fast Bowling Mechanics`, `🌀 Spin & Drift`, `🧤 Wicketkeeping & Fielding`.
2. **Technical Drill Cards:**
   - Drill Title (e.g. *Front-Foot Cover Drive Weight Transfer*, *Pace Run-Up & Wrist Snap*, *Late Cut against Off-Spin*).
   - HD Video Thumbnail Preview with Slow-Motion badge (`HD 60FPS Slow-Mo`).
   - **Target Biomechanical Checkpoints:**
     - Checkpoint 1: Stance & Head Alignment
     - Checkpoint 2: Impact Point Directly Under Eyes
     - Checkpoint 3: High Elbow Follow-Through
   - Common Fault to Avoid (e.g. *Dropping back shoulder, bottom hand dominant grip*).
   - Recommended Sets & Reps: `4 Sets x 15 Reps (60 balls daily)`.
   - Trainees Assigned count.
3. **Dedicated Sub-Page 3.1: `Watch Video Breakdown & Slow-Mo Pointers` (`viewingDrill`):**
   - Video player mock with frame step controls, slow-mo speeds (`0.25x`, `0.5x`, `1.0x`), and coach commentary notes.
4. **Dedicated Sub-Page 3.2: `+ Create Technical Drill` (`showCreateDrillPage`):**
   - Technical drill creator with checkpoints, common faults, and target skill areas.

---

### Brick 4: Tab 4 — Coaching Income, Invoicing & Fee Ledger (`?tab=earnings`)
1. **Coach P&L Math Formula Banner:**
   $$\text{Net Coach Earnings} = \text{1-on-1 Private Sessions} + \text{Monthly Trainee Retainers} - \text{Turf Net Rental Cost}$$
2. **KPI Financial Metrics:**
   - Monthly Billed Total (`₹1,48,000`)
   - Collected Coaching Fees (`₹1,18,500` - Emerald Green)
   - Pending Trainee Dues (`₹29,500` - Amber Alert)
   - Net Turf Net Rental Outflow (`₹24,000` - Stadium Facility Cost)
3. **Itemized Trainee Fee Ledger:**
   - Trainee name, batch, monthly fee amount, due date, status (`Paid` vs `Overdue`).
   - **`[📲 1-Click WhatsApp / SMS Fee Reminder]`**: Sends direct payment link with UPI QR code.
   - **`[💳 Record Payment & Issue Receipt]`**: Updates ledger and issues digital receipt.
4. **Dedicated Sub-Page 4.1: `Record Coaching Payment` (`recordingPaymentTrainee`):**
   - Form for amount, payment mode (Cash, UPI, NEFT, Escrow), date, and receipt notes.
5. **Dedicated Sub-Page 4.2: `Official Coaching Tuition Receipt` (`viewingReceipt`):**
   - Printable official Coach Tuition Receipt with unique receipt ID, coach BCCI license badge, trainee details, and session breakdown.

---

### Brick 5: Home Dashboard & Navigation Integration
1. **`BottomNav.jsx` Role Mapping:**
   - Bottom navigation items for `coach`: `Home`, `Trainees`, `Sessions`, `Drills`, `Earnings`.
2. **`CoachDashboard.jsx` (`/app`):**
   - Hero operational jump buttons leading directly into all 4 tabs of `/app/coach`.
3. **`App.jsx` Routing:**
   - `/app/coach` -> `<CoachPortal />`.

---

## 3. What Needs to Be Built Next (Module 5: Live Streamer & Broadcaster `5555555555`)

### Module 5: Live Streamer & Broadcaster (`5555555555`)
- Live RTMP Ingest & Stream Keys (OBS Studio, vMix, Mobile camera feeds).
- TV Broadcast Graphics Overlays (Lower-third scores, batsman celebration banners, wicket alerts).
- Instant 30s match highlights clipper.
- Broadcaster monetization, viewer tips, and Super Chat ledger.

### Module 6: Tournament Sponsor & Brand Advertiser (`4444444444`)
- Brand ad campaigns & matchday banner inventory.
- Real-time impression, click-through (CTR), and conversion ROI analytics.
- Creative banner asset manager (Leaderboards, Video pre-rolls, Pitch mat logos).
- Ad wallet deposits and automated spending invoices.
