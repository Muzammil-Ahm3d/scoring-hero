# Scoring Heroes — 6 Business Vendor Portals & Modules Roadmap

> **Design Principle & Golden Rule:**
> **Zero Metadata / Feature Numbers in the UI.** No mention of "Feature 13", "12 Systems", "Master Blueprint", or artificial directory matrices. Every page must deliver real product-grade functionality, clear operational purpose, real data inputs, and direct action buttons that work.

---

## Executive Summary of the 6 Business Accounts

| # | Role & Business Type | Demo Account | Primary Workflows | Current Status |
|---|----------------------|--------------|-------------------|----------------|
| **1** | **Ground & Stadium Owner** | `9999999999` | Pitch Slots & Booking, Staff Attendance & Payroll, Accounts P&L | ✅ **Completed & Deployed** |
| **2** | **Sports Academy & Institute** | `8888888888` | Student Batches, Attendance, Fee Tracking & Reminders, Training Curriculum | ✅ **Completed & Deployed** |
| **3** | **Sports Equipment Seller** | `7777777777` | Catalog Management, Order Queue & Fulfillment, Escrow Payouts | ✅ **Completed & Deployed** |
| **4** | **Independent Coach & Trainer**| `6666666666` | Trainee Profiles, 1-on-1 Sessions, Video Drills, Coaching Income | ✅ **Completed & Deployed** |
| **5** | **Live Streamer & Broadcaster**| `5555555555` | RTMP Ingest & Stream Keys, Live Score Overlays, Instant Clips, Earnings | ⚪ Pending Real Ops Portal |
| **6** | **Tournament Sponsor & Brand** | `4444444444` | Ad Campaigns, Real-Time ROI Analytics, Creative Assets, Ad Wallet | ⚪ Pending Real Ops Portal |

---

## 1. Ground & Stadium Owner (`9999999999`)
* **Role Key:** `ground`
* **Home Dashboard:** `client/src/components/dashboards/GroundDashboard.jsx`
* **Dedicated Operations Portal:** `client/src/pages/GroundSlotBooking.jsx`
* **Dedicated Bottom Navigation:** `Home`, `Slots`, `Staff Ops`, `Accounts`, `Gear Store`

### What We Have Built (Current Production Status)
- **Executive Dashboard (`/app`):** Real-time venue status, 3 direct operational jump buttons (`Slots & Bookings`, `Staff & Attendance`, `Accounts & P&L`), live slot timeline.
- **Pitch Slots & Match Booking Portal (`/app/grounds?tab=slots`):**
  - **Venue Selection First:** Direct switcher across 4 venues:
    1. *Main Stadium Oval* (Red soil, 50k capacity, 4 floodlight towers, ₹4,500/slot)
    2. *Practice Turf 2* (Black soil grass wicket, daylight only, ₹3,000/slot)
    3. *Astroturf Box Arena* (All-weather covered turf, LED lights, ₹2,500/slot)
    4. *Nets Arena* (Twin turf nets & bowling machine, ₹1,500/slot)
  - **Booked Slot Transparency:** Displays customer name, phone number, team fixture, match format, amount paid, payment mode, and floodlights status.
  - **Direct Actions:** `[📞 Call Customer]` (tel link), `[🎫 View Gate Pass]` (official digital QR pass with ground rules and share capability), `[❌ Cancel Booking]`.
  - **`+ Book New Slot / Walk-in` Modal:** Complete form with venue dropdown, date, custom start/end time, customer info, team info, floodlight surcharge (+₹1,500), and payment mode.
- **Staff Operations & Attendance Portal (`/app/grounds?tab=staff`):**
  - **Daily Attendance Tracker:** Today's date with live count of present staff and 1-click `[Mark All Present]`.
  - **Staff Roster:** Full profiles for *Head Pitch Curator*, *Ground Superintendent*, *Electrician*, *Net Caretaker*, and *Gate Security*.
  - **Daily Status Controls:** 1-click status pills (`Present`, `Late`, `Half Day`, `Absent`) per employee.
  - **Payroll Due Reminders & Disbursal:** Highlights pending salaries and enables 1-click disbursal that automatically logs debit entries into the Accounts ledger.
  - **`+ Add New Staff` Modal:** Add member name, role, phone, shift, and monthly salary.
- **Financial Accounts & Profit / Loss Portal (`/app/grounds?tab=accounts`):**
  - **Transparent P&L Formula Display:**
    $$\text{Net Profit} = \text{Total Ground Inflow} - \text{Operational Expenses}$$
  - **Key Metrics:** Gross Inflow, Operational Outflow, Net Profit Margin.
  - **Expense Category Breakdown:** Staff Payroll, Floodlight Electricity, Red Soil/Clay, and Roller Diesel Fuel.
  - **Itemized Ledger:** Full credit/debit transaction log with dates, descriptions, categories, and references.
  - **Actions:** `+ Record Expense` modal and printable `Download Statement` preview.

---

## 2. Sports Academy & Coaching Institute (`8888888888`)
* **Role Key:** `academy`
* **Home Dashboard:** `client/src/components/dashboards/AcademyDashboard.jsx`
* **Current Operations Page:** `client/src/pages/AcademyCareer.jsx`

### What We Have Built Till Now
- Basic academy overview card on Home (`AcademyDashboard.jsx`) showing student count, fees collected, and pending dues.
- `AcademyCareer.jsx` currently contains an obsolete prototype with a simulated phone screen and a 10-system directory list.

### What We Need to Build (Product-Level Functionality)
To match the high standard set by the Grounds module, `AcademyCareer.jsx` must be replaced with a **3-Portal Operational Center**:

#### Tab 1: 👥 Student Roster & Batches (`?tab=students`)
- **Purpose:** Comprehensive student enrollment, profile management, and batch allocation.
- **Batch Selector at Top:**
  - *All Students (128)*
  - *U-14 Morning Foundation (32)*
  - *U-16 Evening Elite (40)*
  - *U-19 Pro High Performance (36)*
  - *Weekend Grassroots Clinic (20)*
- **Student Profile Cards:**
  - Student photo/avatar, full name, age, primary skill (e.g. *Right-arm Fast Bowler*, *Top-order Batsman*), guardian phone number, and jersey number.
  - Aadhaar KYC trust badge.
  - Direct Actions: `[📞 Call Guardian]`, `[📊 View Report Card]`, `[Assign Batch]`.
- **`+ Admit New Student` Modal:** Full admission form (Student name, Date of birth, Blood group, Guardian name, Phone number, Primary role, Assigned batch, Admission fee, Monthly fee).

#### Tab 2: 📋 Daily Attendance & Training Drills (`?tab=attendance`)
- **Purpose:** Real-time daily roll call for students and coaches, plus training session syllabus.
- **Live Roll Call by Batch:**
  - Date selector (Today: Nov 4, 2026).
  - Quick action: `[Mark All Present]`.
  - Student row with 1-click status pills: `Present` (Green), `Late` (Amber), `Absent` (Red), `Medical Leave` (Blue).
- **Coach On-Duty Roster:**
  - Head Coach, Batting Specialist, Pace Bowling Coach, Strength & Conditioning Trainer.
  - Shift hours and presence toggle.
- **Training Drill Schedule:**
  - Morning Session (06:00 - 08:30 AM): Warm-up & Yo-Yo Test, Net Practice (Pitches 1 & 2), Slip Catching Drills.
  - Evening Session (04:00 - 06:30 PM): Center Turf Match Simulation, Target Bowling, Video Analysis.
  - `+ Add Training Drill` button.

#### Tab 3: 💳 Fee Collection & Accounts (`?tab=fees`)
- **Purpose:** Complete student tuition accounting, overdue tracking, and automated reminders.
- **Fee Summary Metrics:** Total Monthly Expected Fees, Collected Fees (Green), Pending Dues (Red), Collection Rate (%).
- **Itemized Student Fee Ledger:**
  - Student name, batch, monthly fee amount, due date, status (`Paid` vs `Overdue`).
  - **1-Click WhatsApp / SMS Reminder:** Direct button `[📲 Send Fee Reminder]` that sends payment link with QR code.
  - **Direct `[Record Fee Payment]` Button:** Logs payment (Cash, UPI, Cheque), issues a printable digital receipt with receipt number.
- **`📄 Download Monthly Fee Statement`:** Comprehensive audit export for academy administration.

---

## 3. Sports Equipment Seller & Merchant (`7777777777`)
* **Role Key:** `seller`
* **Home Dashboard:** `client/src/components/dashboards/SellerDashboard.jsx`
* **Operational Pages:** `client/src/pages/SportsMarketplace.jsx`, `client/src/pages/ProductDetail.jsx`

### What We Have Built Till Now
- Consumer marketplace catalog, product detail page, cart, and wishlist.
- Seller dashboard showing basic order pills and escrow balance.

### What We Need to Build (Product-Level Functionality)
A dedicated **Merchant Control Portal** (`/app/seller` or `/app/merchant`):

#### Tab 1: 📦 Inventory & Catalog Manager
- **Purpose:** Full stock register for sports equipment, apparel, bats, balls, and protective gear.
- **Inventory Table / Cards:**
  - Product thumbnail, SKU code, product title, category, price, sale discount, and live stock count.
  - Low Stock Warning badges (e.g. *Only 2 units remaining!*).
  - Toggle: `Active on Store` / `Out of Stock`.
- **`+ Add New Product` Modal:**
  - Product name, category dropdown (Bats, Balls, Protective, Shoes, Kits, Bags), retail price, seller discounted price, stock units, description, and specifications (Willow grade, weight, size).

#### Tab 2: 🚚 Order Fulfillment Queue
- **Purpose:** Managing incoming customer and academy orders through dispatch to delivery.
- **Order Pipeline Stages:** `New Orders (Pending)` → `Processing / Packed` → `Dispatched / In Transit` → `Delivered`.
- **Order Cards:**
  - Order ID (e.g., `#ORD-8821`), Buyer name & contact, delivery address, items purchased, total amount, and payment mode (Prepaid UPI vs Cash on Delivery).
  - Actions:
    - `[Generate Packing Slip & GST Invoice]` (Printable PDF).
    - `[Enter Courier Tracking ID]` (Updates buyer's live status).
    - `[Mark Dispatched]`.

#### Tab 3: 💰 Escrow Settlements & Payouts
- **Purpose:** Transparent financial earnings, marketplace commission deduction, and bank transfers.
- **Escrow Math Breakdown:**
  $$\text{Net Payout} = \text{Gross Sales} - \text{Platform Fee (5\%)} - \text{Courier Charges}$$
- **Settlement Ledger:** Completed orders released from 7-day return escrow into ready balance.
- **`[Request Bank Payout]` Action:** Direct bank transfer button to verified GST / Current Account.

---

## 4. Independent Coach & Trainer (`6666666666`)
* **Role Key:** `coach`
* **Home Dashboard:** `client/src/components/dashboards/CoachDashboard.jsx`

### What We Have Built (Current Production Status)
* **Dedicated Operations Portal:** `client/src/pages/CoachPortal.jsx` & `CoachPortal.css` (`/app/coach` & `/app/trainer`)
* **Dedicated Bottom Navigation:** `Home`, `Trainees`, `Sessions`, `Drills`, `Earnings` (`client/src/components/BottomNav.jsx`)
* **Strict Navigation Architecture:** Zero popups or modal overlays — all 8 operational actions navigate to full dedicated sub-pages with standard `← Back` buttons.

#### Tab 1: 🏃 Trainee Roster & Skill Assessments (`?tab=trainees`)
- **Interactive Roster Filters:** Filter by batch (`Morning Pro`, `Evening Elite`, `Weekend Masterclass`, `1-on-1 Private`) and live search by name, role, or coach observations.
- **Trainee Performance Cards:** Displays Trainee name, age, batch, primary cricket role, direct phone dialer (`[📞 Call Athlete]`), and mini biomechanical bar (Batting Index, Clocked Pace, Yo-Yo score, Reflex rating).
- **Dedicated Sub-Page 1.1 — Athlete Profile & Biomechanical Radar (`viewingTrainee`):**
  - Full-screen radar breakdown of 5 core athletic dimensions: Technique, Kinetic Power, Catching Reflexes, Cardiovascular Endurance, and Tactical IQ.
  - Chronological coach assessment log with previous evaluation notes, dates, and scores.
  - Active assigned drills list and 30-day attendance score.
- **Dedicated Sub-Page 1.2 — Enroll New Athlete (`showEnrollTraineePage`):**
  - Full registration form capturing athlete personal details, guardian contact, blood group, batch, monthly fee, and baseline 1-100 biomechanical ratings.
- **Dedicated Sub-Page 1.3 — Add Biomechanical Evaluation (`evaluatingTrainee`):**
  - Direct form to log technique ratings, session focus, and actionable coach feedback notes.

#### Tab 2: 📅 1-on-1 Sessions & Masterclass Scheduling Calendar (`?tab=sessions`)
- **Interactive Date Filters:** Switch between `All Days`, `Today`, and `Tomorrow`.
- **Session Slot Cards:** Displays scheduled time, date, session category (`1-on-1 Private Net`, `Fast Bowling Clinic`, `Masterclass Group`), assigned venue (`Turf Net 1 - Red Soil`, `Bowling Machine Bay 2`, etc.), target focus topic, hourly fee, and payment status (`Paid via Escrow` vs `Pending`).
- **Direct Actions:** `[✓ Mark Completed / Re-open Slot]`, `[Reschedule Slot]`.
- **Dedicated Sub-Page 2.1 — Schedule 1-on-1 Session (`showScheduleSessionPage`):**
  - Form to select trainee/group, session type, date, time window, venue net, coaching focus, fee, and escrow payment status.

#### Tab 3: 📹 Video Drill Analysis & Technical Library (`?tab=drills`)
- **Skill Category Filters:** `All Drills`, `Batting`, `Fast Bowling`, `Spin`, `Fielding`.
- **Technical Drill Cards:**
  - HD Video thumbnail with slow-motion framerate pill (`HD 60FPS Slow-Mo`, `240FPS Ultra Slow-Mo`).
  - Drill title, duration, assigned trainees count, and primary checkpoint preview.
- **Dedicated Sub-Page 3.1 — Watch Slow-Mo Video Breakdown (`viewingDrill`):**
  - Video simulator with playback speed toggles (`0.25x Slow-Mo`, `0.5x Half-Speed`, `1.0x Normal`), frame counter, mandatory 3-point biomechanical checkpoints, common technical fault warning box, and prescribed repetitions.
- **Dedicated Sub-Page 3.2 — Create Technical Drill (`showCreateDrillPage`):**
  - Form to publish technical drills with title, category, video FPS, thumbnail URL, 3 checkpoints, common fault, and recommended sets/reps.

#### Tab 4: 💵 Coaching Income, Invoicing & Fee Ledger (`?tab=earnings`)
- **Coach P&L Math Formula Banner:**
  $$\text{Net Profit} = (\text{1-on-1 Sessions} + \text{Monthly Retainers}) - \text{Facility Turf Net Rental Outflow}$$
- **KPI Financial Cards:** Monthly Billed (`₹1,48,000`), Collected Fees (`₹1,18,500`), Pending Dues (`₹29,500`), Net Turf Net Rent (`₹24,000`).
- **Itemized Fee Ledger:** Trainee list with payment status pills (`Paid` vs `Overdue`).
  - **`[📲 Remind via WhatsApp]`**: Direct WhatsApp link with prefilled personalized message and UPI QR payment address.
  - **`[Record Payment]` Action**: Opens dedicated sub-page to record payment amount, mode, and generate receipt.
- **Dedicated Sub-Page 4.1 — Record Coaching Payment (`recordingPaymentTrainee`):**
  - Form to enter amount received, payment method (UPI, NEFT, Cash, Escrow), and tuition notes.
- **Dedicated Sub-Page 4.2 — Printable Official Coaching Tuition Receipt (`viewingReceipt`):**
  - Formal digital tuition receipt complete with unique voucher ID, BCCI coach credentials, athlete details, itemized fee breakdown, and digital authentication seal with 1-click `[Print Receipt]` trigger.

---

## 5. Live Streamer & Broadcaster (`5555555555`)
* **Role Key:** `streamer`
* **Home Dashboard:** `client/src/components/dashboards/StreamerDashboard.jsx`

### What We Have Built Till Now
- Streamer dashboard with channel name, viewer reach, and RTMP URL string.

### What We Need to Build (Product-Level Functionality)
A dedicated **Broadcast Production Control Room** (`/app/streamer`):

#### Tab 1: 📡 Live Ingest & Stream Keys
- **Purpose:** Direct configuration for OBS Studio, vMix, mobile camera rigs, and drone feeds.
- Live RTMP Ingest URL + One-Click Copy Stream Key.
- Multi-Destination Broadcast Toggles:
  - `Scoring Heroes App Stream` (Active)
  - `YouTube Live RTMP` (Active)
  - `Facebook Live RTMP` (Standby)
- Live Stream Diagnostics: Bitrate (e.g., 6,500 kbps), Frame Rate (60 FPS), Resolution (1080p), Dropped Frames (0.0%).
- Master Control: `[🔴 GO LIVE / BROADCAST]` and `[⏹ STOP BROADCAST]`.

#### Tab 2: 📺 Live Match Graphics & Score Overlays
- **Purpose:** Controlling broadcast TV graphics displayed on top of the live video.
- Real-time overlay toggles:
  - `Lower-Third Score Bar` (Runs, Overs, Current Batsmen, Bowler).
  - `Batsman Milestone Banner` (Celebration animation on 50 / 100 runs).
  - `Wicket Alert Card` (Fall of wicket graphic).
  - `Sponsor Watermark Logo` (Top-right persistent watermark).

#### Tab 3: ✂️ Instant Match Clips & Highlights
- **Purpose:** Real-time clipping of boundaries, sixes, and wickets directly into app feed.
- One-tap buttons: `[✂️ Clip Last 30s]`, `[🚀 Publish to Match Reels]`.

#### Tab 4: 💸 Stream Monetization & Viewer Tips
- Stream sponsorship revenue, viewer Super Chat tips, and broadcaster payout ledger.

---

## 6. Tournament Sponsor & Brand Advertiser (`4444444444`)
* **Role Key:** `sponsor`
* **Home Dashboard:** `client/src/components/dashboards/SponsorDashboard.jsx`
* **Operational Pages:** `client/src/pages/SponsorshipAds.jsx`

### What We Have Built Till Now
- Sponsor dashboard with impressions and brand reach.
- `SponsorshipAds.jsx` with 3-tier package cards and prototype ad placement toggles.

### What We Need to Build (Product-Level Functionality)
A dedicated **Brand Campaign Hub** (`/app/sponsor`):

#### Tab 1: 📢 Active Ad Campaigns
- **Purpose:** Managing digital ad inventory across live scorecards, match video streams, and tournament banners.
- **Campaign Cards:**
  - Campaign Title (e.g., *Digital Scorecard Top Banner — All Chennai Matches*).
  - Target Audience / Region (e.g., *Tamil Nadu & Karnataka • Cricket Fans 18-35*).
  - Live Status: `Active & Delivering`, `Under Review`, `Completed`.
  - Impressions Delivered vs Goal (e.g., *840,000 / 1,000,000*).
  - Daily Budget & Total Spend.
- **`+ Launch New Campaign` Wizard:**
  - Select placement (Scorecard Banner, Stream Lower-Third, Boundary Billboard, Match Player of Match Title).
  - Set budget & duration.
  - Upload banner artwork / image.

#### Tab 2: 📊 Live Impression Analytics & ROI
- Real-time metrics: Total Impressions, Verified Reach, Clicks & Click-Through Rate (CTR), Cost Per Mille (CPM), Cost Per Click (CPC).
- Match-by-match audience engagement graph.

#### Tab 3: 🎨 Creative Assets & Logo Approvals
- Brand logo repository, jersey sponsor mockups, and banner creative previews.

#### Tab 4: 💳 Ad Wallet & Billing Invoices
- Prepaid advertising balance with instant top-up via UPI / Corporate Card.
- Itemized GST tax invoices with 1-click download.

---

## Next Recommended Step
**Module 2: Sports Academy & Coaching Institute (`8888888888`)**
- Replace the obsolete prototype in `AcademyCareer.jsx` with the complete, production-grade 3-tab portal:
  1. `👥 Student Roster & Batches` (Real students, batch switching, admission modal)
  2. `📋 Daily Attendance & Training Drills` (Attendance marking, drill schedule)
  3. `💳 Fee Collection & Accounts` (Ledger, overdue tracking, WhatsApp reminders)
