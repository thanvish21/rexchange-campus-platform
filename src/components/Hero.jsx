import { Link, useNavigate } from 'react-router-dom'
import GlowCard from './GlowCard.jsx'
import Icon from './Icon.jsx'
import { sounds } from '../utils/audio.js'
import './Hero.css'

export function Hero() {
  const navigate = useNavigate()

  const handleChipClick = (category) => {
    sounds.playPop()
    navigate(`/browse?cat=${encodeURIComponent(category)}`)
  }

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero-grid">
          {/* Left Main Hero Column */}
          <div className="hero-content">
            {/* Eyebrow Badge */}
            <div className="hero-eyebrow animate-fade-in-up">
              <span className="eyebrow-badge">
                THE CAMPUS EXCHANGE NETWORK
              </span>
            </div>

            {/* Headline */}
            <h1 id="hero-title" className="hero-headline">
              <span className="headline-main">Everything your campus already has.</span>
              <span className="headline-sub">Now, you can actually find it.</span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle">
              Exchange resources, discover opportunities, find teammates, and connect with students who can help you move faster.
            </p>

            {/* Action Buttons */}
            <div className="hero-cta-group animate-fade-in-up">
              <Link
                to="/browse"
                className="btn btn--primary hero-cta-purple"
                onClick={() => sounds.playPop()}
              >
                Explore RExchange →
              </Link>

              <Link
                to="/matching"
                className="btn btn--ghost hero-cta-ghost"
                onClick={() => sounds.playPop()}
              >
                Find a Teammate
              </Link>
            </div>

            {/* Available on Campus Subbar */}
            <div className="hero-subbar animate-fade-in-up">
              <span className="subbar-label">AVAILABLE ON CAMPUS:</span>
              <div className="subbar-chips">
                <button type="button" className="subbar-chip" onClick={() => handleChipClick('Textbooks')}>
                  <Icon name="book" size={13} /> Textbooks
                </button>
                <button type="button" className="subbar-chip" onClick={() => handleChipClick('Notes')}>
                  <Icon name="code" size={13} /> Notes
                </button>
                <button type="button" className="subbar-chip" onClick={() => handleChipClick('Electronics')}>
                  <Icon name="cpu" size={13} /> Electronics
                </button>
                <button type="button" className="subbar-chip" onClick={() => handleChipClick('Skills')}>
                  <Icon name="swap" size={13} /> Skills
                </button>
                <button type="button" className="subbar-chip" onClick={() => handleChipClick('Projects')}>
                  <Icon name="sparkles" size={13} /> Projects
                </button>
                <button type="button" className="subbar-chip" onClick={() => handleChipClick('Opportunities')}>
                  <Icon name="shield" size={13} /> Opportunities
                </button>
              </div>
            </div>
          </div>

          {/* Right Featured Card */}
          <div className="hero-widget-wrapper animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <GlowCard glowColor="purple" className="widget-card">
              <div className="widget-top">
                <span className="badge badge--giveaway">CAMPUS VERIFIED</span>
                <span className="widget-time">Block A Lobby</span>
              </div>

              <h3 className="widget-title">Organic Chemistry Textbook (9th ed)</h3>
              <p className="widget-desc">
                Finished course with an A grade. Includes handwritten reaction cheat sheets for Chem 201.
              </p>

              <div className="widget-user">
                <span className="widget-avatar">👩‍💻</span>
                <div className="widget-meta">
                  <div className="widget-username">Sarah Chen • Senior</div>
                  <div className="widget-userstats">IIT Bombay • CSE Dept</div>
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
