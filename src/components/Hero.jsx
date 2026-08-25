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
      <div className="container">
        <div className="hero-grid">
          {/* Main Hero Content Column */}
          <div className="hero-content">
            {/* Simple Eyebrow Badge */}
            <div className="hero-eyebrow animate-fade-in-up">
              <span className="eyebrow-badge">
                <span className="live-dot" /> SRM Campus Peer Exchange
              </span>
            </div>

            {/* Clean, Readable Headline */}
            <h1 id="hero-title" className="hero-headline">
              Buy, sell, and borrow student gear across your campus.
            </h1>

            {/* Clear Subtitle */}
            <p className="hero-subtitle">
              Connect with verified students in your hostels to trade textbooks, calculators, study notes, and dorm essentials with zero platform fees.
            </p>

            {/* Clean Hero Search Bar */}
            <form className="hero-search-form animate-fade-in-up" onSubmit={handleHeroSearchSubmit}>
              <div className="hero-search-wrap">
                <span className="hero-search-icon"><Icon name="search" size={18} /></span>
                <input
                  type="text"
                  className="hero-search-input"
                  placeholder="Search textbooks, calculators, notes, or dorm gear..."
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                />
                <button type="submit" className="btn btn--primary hero-search-btn">
                  Search
                </button>
              </div>
            </form>

            {/* Action Buttons */}
            <div className="hero-cta-group animate-fade-in-up">
              <Link
                to="/browse"
                className="btn btn--primary hero-cta-primary"
                onClick={() => sounds.playPop()}
              >
                Browse Marketplace →
              </Link>

              <Link
                to="/matching"
                className="btn btn--ghost hero-cta-secondary"
                onClick={() => sounds.playPop()}
              >
                Find a Teammate
              </Link>
            </div>

            {/* Quick Category Chips */}
            <div className="hero-subbar animate-fade-in-up">
              <span className="subbar-label">Popular Categories:</span>
              <div className="subbar-chips">
                <button type="button" className="subbar-chip" onClick={() => handleChipClick('Textbooks')}>
                  📚 Textbooks
                </button>
                <button type="button" className="subbar-chip" onClick={() => handleChipClick('Electronics')}>
                  💻 Calculators & Electronics
                </button>
                <button type="button" className="subbar-chip" onClick={() => handleChipClick('Notes')}>
                  📝 Study Notes
                </button>
                <button type="button" className="subbar-chip" onClick={() => handleChipClick('Skills')}>
                  🤝 Skill Trades
                </button>
                <button type="button" className="subbar-chip" onClick={() => handleChipClick('Dorm')}>
                  🍕 Dorm Favors
                </button>
              </div>
            </div>
          </div>

          {/* Right Featured Card */}
          <div className="hero-widget-wrapper animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <GlowCard glowColor="blue" className="widget-card">
              <div className="widget-top">
                <span className="badge badge--giveaway">CAMPUS VERIFIED</span>
                <span className="widget-time">Block A • 4 mins ago</span>
              </div>

              <h3 className="widget-title">TI-84 Plus CE Graphing Calculator</h3>
              <p className="widget-desc">
                Includes rechargeable battery & USB cable. Perfect for Engineering Mathematics & Statistics labs.
              </p>

              <div className="widget-tags">
                <span className="tag-pill">Electronics</span>
                <span className="tag-pill">Block A Hostel</span>
              </div>

              <div className="widget-user">
                <span className="widget-avatar">👩‍💻</span>
                <div className="widget-meta">
                  <div className="widget-username">Ananya Patel</div>
                  <div className="widget-userstats">SRMIST • CSE Dept</div>
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
