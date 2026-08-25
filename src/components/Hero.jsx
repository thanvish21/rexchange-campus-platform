import { Link } from 'react-router-dom'
import GlowCard from './GlowCard.jsx'
import Icon from './Icon.jsx'
import './Hero.css'

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-mesh" aria-hidden="true">
        <div className="mesh-orb mesh-orb-1"></div>
        <div className="mesh-orb mesh-orb-2"></div>
      </div>

      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-eyebrow animate-fade-in-up">
              <span className="eyebrow-badge">THE CAMPUS EXCHANGE NETWORK</span>
            </div>

            <h1 id="hero-title" className="hero-headline">
              <span>Everything your campus already has.</span>
              <span className="gradient-text">Now, you can actually find it.</span>
            </h1>

            <p className="hero-subtitle">
              Exchange resources, discover opportunities, find teammates, and connect with students who can help you move faster.
            </p>

            <div className="hero-cta-group animate-fade-in-up">
              <Link to="/browse" className="btn btn--primary hero-cta-primary glow">
                Explore RExchange →
              </Link>
              <Link to="/matching" className="btn btn--ghost hero-cta-secondary">
                Find a Teammate
              </Link>
            </div>

            <div className="hero-subbar animate-fade-in-up">
              <span className="subbar-label">Available on Campus:</span>
              <div className="subbar-chips">
                <span className="subbar-chip"><Icon name="book" size={13} /> Textbooks</span>
                <span className="subbar-chip"><Icon name="code" size={13} /> Notes</span>
                <span className="subbar-chip"><Icon name="cpu" size={13} /> Electronics</span>
                <span className="subbar-chip"><Icon name="swap" size={13} /> Skills</span>
                <span className="subbar-chip"><Icon name="sparkles" size={13} /> Projects</span>
                <span className="subbar-chip"><Icon name="shield" size={13} /> Opportunities</span>
              </div>
            </div>
          </div>

          <div className="hero-widget animate-fade-in-up" style={{ animationDelay: '150ms' }}>
            <GlowCard glowColor="purple" className="widget-card">
              <div className="widget-top">
                <span className="badge badge--giveaway">CAMPUS VERIFIED</span>
                <span className="widget-time">Block A Lobby</span>
              </div>
              <h3 className="widget-title">Organic Chemistry Textbook (9th ed)</h3>
              <p className="widget-desc">Finished course with an A grade. Includes handwritten reaction cheat sheets for Chem 201.</p>
              <div className="widget-user">
                <span className="widget-avatar">👩‍💻</span>
                <div>
                  <div className="widget-username">Sarah Chen • Senior</div>
                  <div className="widget-userstats">IIT Bombay • CSE Dept</div>
                </div>
                <span className="widget-price">FREE</span>
              </div>
            </GlowCard>
          </div>
        </div>
      </div>
    </section>
  )
}
