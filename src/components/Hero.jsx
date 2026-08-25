import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GlowCard from './GlowCard.jsx'
import Icon from './Icon.jsx'
import { sounds } from '../utils/audio.js'
import './Hero.css'

export function Hero() {
  const [heroSearch, setHeroSearch] = useState('')
  const navigate = useNavigate()

  const handleHeroSearchSubmit = (e) => {
    e.preventDefault()
    sounds.playSnap()
    if (heroSearch.trim()) {
      navigate(`/browse?search=${encodeURIComponent(heroSearch.trim())}`)
    } else {
      navigate('/browse')
    }
  }

  const handleChipClick = (category) => {
    sounds.playPop()
    navigate(`/browse?cat=${encodeURIComponent(category)}`)
  }

  return (
    <section className="hero" aria-labelledby="hero-title">
      {/* Dynamic Ambient Background Mesh & Top Horizon Beam */}
      <div className="hero-mesh" aria-hidden="true">
        <div className="hero-grid-pattern"></div>
        <div className="hero-top-beam"></div>
        <div className="mesh-orb mesh-orb-1"></div>
        <div className="mesh-orb mesh-orb-2"></div>
        <div className="mesh-orb mesh-orb-3"></div>
      </div>

      <div className="container">
        <div className="hero-grid">
          {/* Left Hero Main Content */}
          <div className="hero-content">
            {/* Live Eyebrow Badge with Radar Beacon */}
            <div className="hero-eyebrow animate-fade-in-up">
              <div className="eyebrow-badge">
                <span className="live-beacon">
                  <span className="beacon-ping"></span>
                  <span className="beacon-core"></span>
                </span>
                <span className="eyebrow-text">SRM & CAMPUS PEER NETWORK</span>
                <span className="eyebrow-highlight">LIVE • 1,200+ ACTIVE LISTINGS</span>
              </div>
            </div>

            {/* High-Impact High Contrast Headline */}
            <h1 id="hero-title" className="hero-headline">
              <span className="headline-solid">Everything your campus already owns.</span>
              <span className="headline-gradient">Now 1-click away from your dorm.</span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle">
              Buy/sell textbooks, borrow lab gear, trade dorm favors for cold coffee, and match with hackathon teammates using AI skill compatibility.
            </p>

            {/* Quick Hero Search Bar */}
            <form className="hero-search-form animate-fade-in-up" onSubmit={handleHeroSearchSubmit}>
              <div className="hero-search-wrap">
                <span className="hero-search-icon"><Icon name="search" size={18} /></span>
                <input
                  type="text"
                  className="hero-search-input"
                  placeholder="Search textbooks, calculators, notes, or skills (e.g. TI-84, DSA)..."
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                />
                <button type="submit" className="btn btn--primary hero-search-btn">
                  Search Campus →
                </button>
              </div>
            </form>

            {/* Primary CTA Buttons */}
            <div className="hero-cta-group animate-fade-in-up">
              <Link
                to="/browse"
                className="btn btn--primary hero-cta-primary glow-button"
                onClick={() => sounds.playPop()}
              >
                <span className="btn-content">
                  📦 Browse Campus Gear
                  <Icon name="arrowUpRight" size={18} className="cta-icon" />
                </span>
                <div className="btn-shine"></div>
              </Link>

              <Link
                to="/matching"
                className="btn btn--ghost hero-cta-secondary"
                onClick={() => sounds.playPop()}
              >
                <Icon name="sparkles" size={16} className="secondary-icon" />
                <span>⚡ AI Teammate Matcher</span>
              </Link>
            </div>

            {/* Interactive Quick Category Pills */}
            <div className="hero-subbar animate-fade-in-up">
              <div className="subbar-header">
                <span className="subbar-label">Instant Campus Categories:</span>
                <span className="subbar-live-tag">⚡ 0% Platform Fees</span>
              </div>
              <div className="subbar-chips">
                <button type="button" className="subbar-chip" onClick={() => handleChipClick('Textbooks')}>
                  <Icon name="book" size={13} className="chip-icon" /> 📚 Textbooks (₹150 avg)
                </button>
                <button type="button" className="subbar-chip" onClick={() => handleChipClick('Electronics')}>
                  <Icon name="cpu" size={13} className="chip-icon" /> 💻 Calculators & Kits
                </button>
                <button type="button" className="subbar-chip" onClick={() => handleChipClick('Notes')}>
                  <Icon name="code" size={13} className="chip-icon" /> 📝 Free Study Notes
                </button>
                <button type="button" className="subbar-chip" onClick={() => handleChipClick('Skills')}>
                  <Icon name="swap" size={13} className="chip-icon" /> 🤝 Peer Skill Trades
                </button>
                <button type="button" className="subbar-chip" onClick={() => handleChipClick('Dorm')}>
                  <Icon name="shield" size={13} className="chip-icon" /> 🍕 Dorm Favors
                </button>
              </div>
            </div>
          </div>

          {/* Right Hero Preview Section */}
          <div className="hero-widget-wrapper animate-fade-in-up" style={{ animationDelay: '150ms' }}>
            {/* Top Activity Pill */}
            <div className="floating-pill floating-pill-top">
              <span className="pill-dot"></span>
              <span className="pill-text">⚡ Handover in 10 mins • Block A Lobby Desk</span>
            </div>

            {/* Bottom Synergy Match Pill */}
            <div className="floating-pill floating-pill-bottom">
              <span className="pill-emoji">🔥</span>
              <span className="pill-text"><strong>98% Team Match</strong> for React + PyTorch</span>
            </div>

            {/* Featured Marketplace GlowCard */}
            <GlowCard glowColor="purple" className="widget-card">
              <div className="widget-top">
                <div className="widget-badge-group">
                  <span className="badge badge--giveaway">
                    <Icon name="shield" size={12} /> SRM VERIFIED
                  </span>
                  <span className="widget-status-tag">⚡ FREE GIVEAWAY</span>
                </div>
                <span className="widget-time">Block A • 4 mins ago</span>
              </div>

              <h3 className="widget-title">TI-84 Plus CE Graphing Calculator</h3>
              <p className="widget-desc">
                Clean condition with rechargeable battery & USB cable. Perfect for Eng Math Vol 3 & Stats lab exams.
              </p>

              <div className="widget-tags">
                <span className="tag-pill">Electronics</span>
                <span className="tag-pill">Hostel Block A</span>
                <span className="tag-pill">Verified Student</span>
              </div>

              <div className="widget-user">
                <div className="widget-avatar-wrapper">
                  <span className="widget-avatar">👩‍💻</span>
                  <span className="avatar-online-ring" title="Active on campus now"></span>
                </div>
                <div className="widget-meta">
                  <div className="widget-username">
                    Ananya Patel <span className="user-role-badge">Junior 3rd Yr</span>
                  </div>
                  <div className="widget-userstats">SRMIST • CSE Dept • ⭐ 4.9 (24 swaps)</div>
                </div>
                <div className="widget-action-box">
                  <span className="widget-price">₹350</span>
                </div>
              </div>
            </GlowCard>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
