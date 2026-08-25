import { Link } from 'react-router-dom'
import GlowCard from './GlowCard.jsx'
import Icon from './Icon.jsx'
import { sounds } from '../utils/audio.js'
import './Hero.css'

export function Hero() {
  const handleChipClick = () => {
    sounds.playPop()
  }

  return (
    <section className="hero" aria-labelledby="hero-title">
      {/* Dynamic Ambient Background & Grid */}
      <div className="hero-mesh" aria-hidden="true">
        <div className="hero-grid-pattern"></div>
        <div className="hero-top-beam"></div>
        <div className="mesh-orb mesh-orb-1"></div>
        <div className="mesh-orb mesh-orb-2"></div>
        <div className="mesh-orb mesh-orb-3"></div>
      </div>

      <div className="container">
        <div className="hero-grid">
          {/* Left Hero Content */}
          <div className="hero-content">
            {/* Dynamic Eyebrow Badge with Radar Beacon & Shimmer */}
            <div className="hero-eyebrow animate-fade-in-up">
              <div className="eyebrow-badge">
                <span className="live-beacon">
                  <span className="beacon-ping"></span>
                  <span className="beacon-core"></span>
                </span>
                <span className="eyebrow-text">THE CAMPUS EXCHANGE NETWORK</span>
                <span className="eyebrow-highlight">LIVE • 14+ CAMPUSES</span>
              </div>
            </div>

            {/* High Contrast Typography Headline */}
            <h1 id="hero-title" className="hero-headline">
              <span className="headline-solid">Everything your campus already has.</span>
              <span className="headline-gradient">Now, you can actually find it.</span>
            </h1>

            {/* Polished Subtitle with Emphasized Anchor Words */}
            <p className="hero-subtitle">
              Exchange <span className="text-highlight">resources</span>, discover <span className="text-highlight">dorm opportunities</span>, find vetted <span className="text-highlight">teammates</span>, and connect with students ready to collaborate in seconds.
            </p>

            {/* Enhanced CTA Group with Kinetic Physics */}
            <div className="hero-cta-group animate-fade-in-up">
              <Link
                to="/browse"
                className="btn btn--primary hero-cta-primary glow-button"
                onClick={() => sounds.playPop()}
              >
                <span className="btn-content">
                  Explore RExchange
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
                <span>Find a Teammate</span>
              </Link>
            </div>

            {/* Interactive Campus Category Subbar */}
            <div className="hero-subbar animate-fade-in-up">
              <div className="subbar-header">
                <span className="subbar-label">Available on Campus:</span>
                <span className="subbar-live-tag">⚡ Active Now</span>
              </div>
              <div className="subbar-chips">
                <button type="button" className="subbar-chip" onClick={handleChipClick}>
                  <Icon name="book" size={13} className="chip-icon" /> Textbooks
                </button>
                <button type="button" className="subbar-chip" onClick={handleChipClick}>
                  <Icon name="code" size={13} className="chip-icon" /> Notes & Cheatsheets
                </button>
                <button type="button" className="subbar-chip" onClick={handleChipClick}>
                  <Icon name="cpu" size={13} className="chip-icon" /> Electronics & Lab Kits
                </button>
                <button type="button" className="subbar-chip" onClick={handleChipClick}>
                  <Icon name="swap" size={13} className="chip-icon" /> Skill Swaps
                </button>
                <button type="button" className="subbar-chip" onClick={handleChipClick}>
                  <Icon name="sparkles" size={13} className="chip-icon" /> Project Bounties
                </button>
                <button type="button" className="subbar-chip" onClick={handleChipClick}>
                  <Icon name="shield" size={13} className="chip-icon" /> Dorm Favors
                </button>
              </div>
            </div>
          </div>

          {/* Right Hero Widget with Layered Glassmorphism & Floating Status Pills */}
          <div className="hero-widget-wrapper animate-fade-in-up" style={{ animationDelay: '150ms' }}>
            {/* Top Floating Activity Pill */}
            <div className="floating-pill floating-pill-top">
              <span className="pill-dot"></span>
              <span className="pill-text">⚡ Handover in 10 mins • Block A Lobby</span>
            </div>

            {/* Bottom Floating Match Score Pill */}
            <div className="floating-pill floating-pill-bottom">
              <span className="pill-emoji">🔥</span>
              <span className="pill-text"><strong>98% Match</strong> for Chem 201 Students</span>
            </div>

            {/* Center Main GlowCard */}
            <GlowCard glowColor="purple" className="widget-card">
              <div className="widget-top">
                <div className="widget-badge-group">
                  <span className="badge badge--giveaway">
                    <Icon name="shield" size={12} /> CAMPUS VERIFIED
                  </span>
                  <span className="widget-status-tag">⚡ FREE GIVEAWAY</span>
                </div>
                <span className="widget-time">Block A • 4 mins ago</span>
              </div>

              <h3 className="widget-title">Organic Chemistry Textbook (9th ed)</h3>
              <p className="widget-desc">
                Finished course with an A grade. Includes handwritten reaction mechanism cheat sheets and mid-sem flashcards for Chem 201.
              </p>

              <div className="widget-tags">
                <span className="tag-pill">Chemistry</span>
                <span className="tag-pill">Pre-Med / Eng</span>
                <span className="tag-pill">Cheat Sheets Included</span>
              </div>

              <div className="widget-user">
                <div className="widget-avatar-wrapper">
                  <span className="widget-avatar">👩‍💻</span>
                  <span className="avatar-online-ring" title="Active on campus now"></span>
                </div>
                <div className="widget-meta">
                  <div className="widget-username">
                    Sarah Chen <span className="user-role-badge">Senior</span>
                  </div>
                  <div className="widget-userstats">IIT Bombay • CSE Dept • ⭐ 4.9 (28 swaps)</div>
                </div>
                <div className="widget-action-box">
                  <span className="widget-price">FREE</span>
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
