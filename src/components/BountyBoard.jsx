import { useState } from 'react'
import { sounds } from '../utils/audio.js'
import GlowCard from './GlowCard.jsx'
import './BountyBoard.css'

const BOUNTIES = [
  { id: 1, title: 'Need electric kettle in Block B for 1 hour', bounty: '🍕 Slice of Dominoes Pizza', rewardType: 'pizza', postedBy: 'Rahul (Block B)', urgent: true, karma: 15 },
  { id: 2, title: 'Borrowing graphing calculator for 9 AM exam', bounty: '☕ Free Cold Coffee', rewardType: 'coffee', postedBy: 'Ananya (Block A)', urgent: true, karma: 20 },
  { id: 3, title: 'Need someone to test my React lab app', bounty: '🍪 Box of Cookies', rewardType: 'snacks', postedBy: 'Vikram (Block C)', urgent: false, karma: 10 },
  { id: 4, title: 'Need past 3 years math question paper notes', bounty: '💸 ₹100 or Samosa Treat', rewardType: 'cash', postedBy: 'Sneha (GH-1)', urgent: false, karma: 25 },
]

export function BountyBoard() {
  const [bounties, setBounties] = useState(BOUNTIES)
  const [title, setTitle] = useState('')
  const [bounty, setBounty] = useState('')
  const [posted, setPosted] = useState(false)
  const [claimedId, setClaimedId] = useState(null)

  const handleAdd = (e) => {
    e.preventDefault()
    if (!title.trim() || !bounty.trim()) return
    sounds.playCelebration()
    const newB = {
      id: Date.now(),
      title: title.trim(),
      bounty: bounty.trim(),
      rewardType: bounty.toLowerCase().includes('coffee') ? 'coffee' : bounty.toLowerCase().includes('pizza') ? 'pizza' : 'favor',
      postedBy: 'You (Just Now)',
      urgent: true,
      karma: 15,
    }
    setBounties([newB, ...bounties])
    setTitle('')
    setBounty('')
    setPosted(true)
    setTimeout(() => setPosted(false), 3000)
  }

  const handleClaim = (bountyId) => {
    sounds.playCelebration()
    setClaimedId(bountyId)
    setTimeout(() => setClaimedId(null), 4000)
  }

  return (
    <section className="bounty-section">
      <div className="container">
        <header className="section-header">
          <span className="bounty-pill animate-fade-in-up">🍕 CAMPUS FAVOR BOUNTIES</span>
          <h2 className="section-title">Need a Quick Favor or Late-Night Snack Trade?</h2>
          <p className="section-subtitle">Post small bounties for coffee, pizza slices, or quick help across dorms</p>
        </header>

        <div className="bounty-grid">
          {/* Create Bounty Form */}
          <div className="card bounty-form-card">
            <h3 className="card-title">➕ Post a Campus Favor Bounty</h3>
            <form onSubmit={handleAdd}>
              <div className="form-field">
                <label className="form-label">What favor do you need?</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Need umbrella for 20 mins / Need lab coat size M"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label className="form-label">What reward are you offering?</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 🍕 Slice of Pizza / ☕ Cold Coffee / ₹50"
                  value={bounty}
                  onChange={(e) => setBounty(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn--primary save-btn">
                🚀 Post Bounty to Campus
              </button>

              {posted && (
                <div className="save-success" style={{ marginTop: '12px' }}>
                  ✓ Bounty live on campus feed! (+15 Karma Points)
                </div>
              )}
            </form>
          </div>

          {/* Active Bounties Feed */}
          <div className="bounty-feed">
            {bounties.map((b) => (
              <GlowCard key={b.id} glowColor={b.urgent ? 'purple' : 'blue'} className="bounty-item">
                <div className="bounty-head">
                  <span className={`badge ${b.urgent ? 'badge--sell' : 'badge--share'}`}>
                    {b.urgent ? '🔴 LIVE - NEEDED ASAP' : '✨ CAMPUS FAVOR'}
                  </span>
                  <span className="bounty-karma-badge">+ {b.karma} Karma</span>
                  <span className="bounty-user">{b.postedBy}</span>
                </div>
                <h4 className="bounty-item-title">{b.title}</h4>
                <div className="bounty-reward">
                  <span>Offering Reward:</span> <strong>{b.bounty}</strong>
                </div>
                {claimedId === b.id ? (
                  <div className="save-success bounty-claim-success animate-fade-in-up" role="status">
                    🎉 Claimed! +{b.karma} Karma Points Earned!
                  </div>
                ) : (
                  <button
                    type="button"
                    className="btn btn--primary btn--sm bounty-claim-btn"
                    onClick={() => handleClaim(b.id)}
                  >
                    ⚡ Claim Bounty →
                  </button>
                )}
              </GlowCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
