import GlowCard from './GlowCard.jsx'
import './Features.css'

const features = [
  { icon: '📚', tag: 'ACADEMICS', title: 'Textbook Exchange', description: 'Sell, buy, or give away course books. Eliminate the ₹1,370/year textbook bill directly with seniors.' },
  { icon: '💻', tag: 'DORM GEAR', title: 'Gadget Bazaar', description: 'Calculators, cables, monitors, mini-fridges — everything a dorm room needs, second-hand.' },
  { icon: '🎟️', tag: 'CAMPUS LIFE', title: 'Ticket Swap', description: 'Can\'t make the concert or fest? Pass your ticket to a classmate safely at face value.' },
  { icon: '📝', tag: 'STUDY AID', title: 'Notes Sharing', description: 'Free curated study guides and handwritten notes from students who aced the course.' },
  { icon: '🤝', tag: 'BARTER', title: 'Skill Barter', description: 'Teach Figma, learn guitar. Trade technical or creative skills instead of money.' },
  { icon: '🛡️', tag: 'SAFETY', title: 'Campus-Verified', description: 'College email verification only. Every trader is a verified student on your exact campus.' },
]

export function Features() {
  return (
    <section className="features-section" aria-labelledby="features-title">
      <div className="container">
        <header className="section-header">
          <span className="features-tag">EVERYTHING EXCHANGES HERE</span>
          <h2 id="features-title" className="section-title">One Platform for Every Campus Resource</h2>
          <p className="section-subtitle">Everything a student needs, trades, or teaches in one unified ecosystem</p>
        </header>

        <div className="features-grid">
          {features.map((feature, index) => (
            <GlowCard key={index} glowColor={index % 2 === 0 ? 'purple' : 'blue'} className="feature-card-glow">
              <div className="feature-card-content">
                <div className="feature-icon-wrapper">
                  <span className="feature-icon">{feature.icon}</span>
                  <span className="feature-category-badge">{feature.tag}</span>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  )
}
