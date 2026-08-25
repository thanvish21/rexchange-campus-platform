import './HowItWorks.css'

const steps = [
  {
    number: '01',
    title: 'Post What You Have',
    description: 'Old textbooks, gadgets, tickets, notes — or a skill you can teach. 30 seconds to list.',
    icon: '📸',
  },
  {
    number: '02',
    title: 'Match With Campus',
    description: 'Verified students browse and request. Choose online exchange or meet on campus.',
    icon: '🤝',
  },
  {
    number: '03',
    title: 'Exchange & Save',
    description: 'Trade, sell, give away, or skill-swap. First 5 connections free, then ₹9/match.',
    icon: '💰',
  },
]

export function HowItWorks() {
  return (
    <section className="how-it-works" aria-labelledby="how-it-works-title">
      <div className="container">
        <header className="section-header">
          <h2 id="how-it-works-title" className="section-title">How It Works</h2>
          <p className="section-subtitle">From unused to exchanged in three steps</p>
        </header>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <article key={index} className="step-card">
              <div className="step-number">{step.number}</div>
              <div className="step-icon" aria-hidden="true">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
