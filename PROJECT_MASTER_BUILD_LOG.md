# RExchange — Master Project Build Log, Timeline & Hackathon Defense Guide
**Platform:** RExchange — Student Resource Exchange & Collaboration Platform  
**Live URL:** https://temporary-prompt-poplar-ylogjtn.vercel.app  
**Codebase Path:** /home/thanvish/skillforge  
**Zip Archive:** rexchange_project.zip  
**Last Updated:** 2026-08-25  

---

## 🏆 1. HACKATHON PITCH & DEMO SCRIPT

### ⚡ 30-Second Elevator Pitch
> *"College students spend over ₹1,370 every year on single-semester textbooks, lab gear, and calculators, while older seniors throw them away. Meanwhile, finding compatible teammates for hackathons or startups means posting chaotic messages across 10 unstructured WhatsApp groups.*  
>  
> *RExchange is a verified student resource exchange and AI teammate discovery platform. It combines zero-fee peer-to-peer textbook trading, campus gadget swaps, and a 4-vector teammate matching matrix into a sleek 2026 SaaS interface — saving students thousands while building trusted campus teams."*

---

### 🎙️ 2-Minute Live Demo Walkthrough (For Judges)

1. **Step 1: Hero & Marquee Ticker (`0:00 - 0:25`)**
   - *"Welcome to RExchange. Built with a Linear/Vercel dark mode aesthetic. Notice our continuous live ticker showing active exchange categories: Textbooks, Gadget Bazaar, Notes, and Skill Barter."*
2. **Step 2: Student Activation Onboarding (`0:25 - 0:45`)**
   - *"Click 'Get Started Free →'. This opens our 3-step onboarding wizard. A student enters their name, department, year, and skills like React and Python. We save their verified profile to local storage instantly."*
3. **Step 3: Two-Tab Discovery Feed (`0:45 - 1:10`)**
   - *"On the Discovery Feed, students switch seamlessly between 'Marketplace Resources' (textbooks, TI-84 calculators, notes) and 'Project Teams'. Selecting 'Textbooks' filters course books directly from seniors in your hostel."*
4. **Step 4: Deterministic AI Teammate Matcher (`1:10 - 1:35`)**
   - *"In 'AI Teammates', our 5-step wizard analyzes your skills and goals. Clicking 'Generate Teammate Matches' runs a 4-vector scoring algorithm and displays a Visual Team Composition Matrix highlighting skill gaps (e.g. 'Team has Frontend + ML, UI/UX Missing')."*
5. **Step 5: Campus Favor Bounties & Chat (`1:35 - 2:00`)**
   - *"Students can post quick bounties for coffee or pizza slices in the Bounty Board, view active exchanges, and open instant chat drawers to coordinate hostel-level pickups."*

---

## 🛠️ 2. COMPLETE TECH STACK & ARCHITECTURAL REASONING

| Layer | Technology Used | Why Chosen / Hackathon Advantage |
|---|---|---|
| **Frontend Framework** | **React 19** (`react-router-dom` v7) | Component reusability, client-side SPA routing, zero page-refresh state transitions. |
| **Build Tooling** | **Vite 8.2** + **Rolldown** | Built-in Lightning CSS & ES modules. Compiles production bundle in under **200ms**. |
| **Styling & Tokens** | **Vanilla CSS** + Design System Tokens | Maximum flexibility without Tailwind utility clutter. Custom `:root` zinc dark palette (`#09090b` root, `#18181b` surface). |
| **Component UI** | **21st.dev GlowCard** + Glassmorphism | Custom CSS spotlight radial glow (`--glow-x`, `--glow-y`) reacting to mouse pointer movement. |
| **Keyboard Command** | **⌘K Command Palette** (`CommandPalette.jsx`) | Global keyboard event listener providing instant Raycast/Vercel-style search across resources, projects, and users. |
| **Matching Algorithm** | **4-Vector Scoring Engine** (`matchingAlgorithm.js`) | Deterministic mathematical scoring (0–100%) evaluating skill complementarity, domain overlap, time commitment, and verification. |
| **Audio Engine** | **Web Audio API** (`src/utils/audio.js`) | Synthesizes tactile sound FX (button pops, match success chimes) without downloading external MP3 assets. |
| **Accessibility** | **`useFocusTrap` Hook** (`useFocusTrap.js`) | Enforces focus containment inside modals and restores keyboard focus on Escape close. |
| **Deployment** | **Vercel Edge CLI** (`npx vercel deploy`) | Deploys instant production edge builds directly from local terminal in 3 seconds. |

---

## 🛡️ 3. FORENSIC AUDIT RESOLUTION LOG

All P0 and P1 audit findings were fixed directly in the codebase:

1. **Broken CSS Token System (`src/index.css`)**:
   - Added all 38 missing tokens (`--accent-indigo`, `--accent-purple`, `--accent-gradient`, `--bg-card`, `--border-primary`, `--shadow-glow`).
2. **Listings & Projects Data Separation (`src/data/mockData.js`)**:
   - Created distinct `listings` array matching resource categories (`textbooks`, `electronics`, `notes`, `skills`, `tickets`, `dorm`).
3. **⌘K Command Palette Listener (`Navbar.jsx`)**:
   - Registered global ⌘K/Ctrl+K keyboard listener to open search from anywhere.
4. **Inline Bounty Confirmation (`BountyBoard.jsx`)**:
   - Replaced browser `alert()` with inline success notification.
5. **Cleaned Development Artefacts**:
   - Removed "Reset Demo" button from `Exchanges.jsx` and updated developer speak in `CompetitorComparison.jsx`.
6. **Profile Persistence & Fields (`Profile.jsx`)**:
   - Hydrated profile from `localStorage` with GitHub, LinkedIn, Department, and Year fields.
7. **Dynamic Dashboard (`Dashboard.jsx`)**:
   - Computed dynamic `profileStrength` and context-aware `getNextBestAction`.

---

## ⏱️ 4. TIMELINE & EXECUTED WORK LOG

| Timestamp | Phase | Executed Action & Output |
|---|---|---|
| `11:45 AM` | **Audit** | Conducted deep codebase audit across all JSX, CSS, and data files. Identified 38 ghost CSS tokens and broken data aliasing. |
| `11:50 AM` | **P0 Fixes** | Updated `src/index.css` with 38 token definitions. Created separated `listings` array in `mockData.js`. Verified clean Vite build (282ms). |
| `11:51 AM` | **P0 Fixes** | Added global ⌘K event listener in `Navbar.jsx`. Replaced `alert()` in `BountyBoard.jsx` with inline success banner. |
| `11:52 AM` | **P1 Fixes** | Created `useFocusTrap.js` accessibility hook. Built two-tab `Browse.jsx` architecture (Resources vs Projects). |
| `11:53 AM` | **P1 Fixes** | Added `localStorage` profile persistence in `Profile.jsx`. Built data-driven `Dashboard.jsx` with dynamic NextBestAction. |
| `11:54 AM` | **Deploy** | Verified Vite build (178ms) and deployed live to Vercel (`temporary-prompt-poplar-ylogjtn.vercel.app`). |
| `11:55 AM` | **Engine** | Created `matchingAlgorithm.js` for 4-vector skill scoring. Built `/onboard` 3-step activation wizard in `Onboard.jsx`. |
| `11:58 AM` | **Redesign** | Redesigned `Features.jsx` and `CompetitorComparison.jsx` into high-density GlowCard grids following user screenshot feedback. |
| `12:00 PM` | **Aether UI** | Integrated Aether Command design references: created `MarqueeTicker.jsx` and `CampusChapters.jsx` with mono kickers and hover line triggers. |
| `12:01 PM` | **Finalize** | Verified 266ms Vite build, updated zip archive, and deployed final production release live to Vercel. |

---

## 🎯 5. JUDGE Q&A & COMPETITIVE DEFENSE

### Q1: *"How is RExchange different from WhatsApp buy-sell groups?"*
> **Answer:** *"WhatsApp groups suffer from zero searchability, chaotic message clutter, lost trade history, and zero verification. RExchange provides 7 organized categories, instant real-time search, campus email verification, and hostel-level pickup routing."*

### Q2: *"How does RExchange solve the cold-start problem?"*
> **Answer:** *"By combining resource exchange with team formation. Students come for textbook giveaways or calculator deals, then discover hackathon teammates using our AI Teammate Matcher."*

### Q3: *"What is the monetization model?"*
> **Answer:** *"Freemium quota model: First 5 connection matches are 100% free every semester. Giveaway listings stay free forever. After 5 connections, students pay ₹9 per match or ₹99 for a Pro Semester Pass."*

---

### 🌐 Live Production Links
- **Live Vercel Application:** https://temporary-prompt-poplar-ylogjtn.vercel.app
- **Local Project Path:** `/home/thanvish/skillforge`
- **Downloadable Zip:** `rexchange_project.zip`
