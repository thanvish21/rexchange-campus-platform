import GlowCard from './GlowCard.jsx'
import './CompetitorComparison.css'

const comparisons = [
  {
    competitor: 'OLX & FB Marketplace',
    flaw: 'Anonymous scammers, off-campus danger, non-student spam',
    solution: 'Campus-Verified Email • Hostel-Level Pickup Routing • 100% Student Safe',
    icon: '🛡️',
  },
  {
    competitor: 'Chegg & Book Rentals',
    flaw: 'Overpriced textbook rentals, shipping delays, harsh late return fees',
    solution: '0% Listing Fee • Senior-to-Junior Direct Giveaway & Buyback',
    icon: '📚',
  },
  {
    competitor: 'Craigslist & Legacy Ads',
    flaw: 'Outdated text interface, zero trust indicators, broken mobile UX',
    solution: 'Linear-Inspired SaaS UI • 21st.dev GlowSpotlight • Mobile-First Drawer',
    icon: '🎨',
  },
  {
    competitor: 'WhatsApp Student Groups',
    flaw: 'Chaotic chat clutter, unsearchable threads, lost listing history',
    solution: '7 Structured Categories • Real-Time Search • Live Chat & Trade Tracking',
    icon: '💬',
  },
  {
    competitor: 'Mercari & P2P Shipping',
    flaw: '10–15% fee per sale, 3–5 day shipping delays across cities',
    solution: '0% Listing Fee • Instant 5-Min Hostel Meetups • 5 Free Connections',
    icon: '⚡',
  },
]

export function CompetitorComparison() {
  return (
    <section className="comp-section" aria-labelledby="comp-title">
      <div className="container">
        <header className="section-header">
          <span className="comp-tag">BENCHMARKED AGAINST COMPETITORS</span>
          <h2 id="comp-title" className="section-title">Built By Fixing What Others Got Wrong</h2>
          <p className="section-subtitle">Why students choose RExchange over generic marketplace apps</p>
        </header>

        <div className="comp-grid">
          {comparisons.map((item, idx) => (
            <GlowCard key={idx} glowColor={idx % 2 === 0 ? 'purple' : 'blue'} className="comp-card">
              <div className="comp-card-top">
                <div className="comp-icon-box">
                  <span>{item.icon}</span>
                </div>
                <div className="comp-title-group">
                  <span className="comp-vs-pill">VS {item.competitor.toUpperCase()}</span>
                  <h3 className="comp-card-title">{item.competitor}</h3>
                </div>
              </div>

              <div className="comp-box comp-box--flaw">
                <div className="comp-box-label comp-box-label--flaw">❌ THE PROBLEM</div>
                <p className="comp-box-text">{item.flaw}</p>
              </div>

              <div className="comp-box comp-box--solution">
                <div className="comp-box-label comp-box-label--solution">✓ REXCHANGE ADVANTAGE</div>
                <p className="comp-box-text">{item.solution}</p>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  )
}
