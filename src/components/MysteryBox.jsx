import { useState } from 'react'
import { sounds } from '../utils/audio.js'
import GlowCard from './GlowCard.jsx'
import './MysteryBox.css'

const SURPRISES = [
  { title: ' Organic Chem Notes + Reaction Map', type: 'FREE GIVEAWAY', donor: 'Sarah (Block A)', icon: '📚' },
  { title: '🍕 Slice of Pizza for 10-Min Resume Tip', type: 'FAVOR BOUNTY', donor: 'Marcus (Block C)', icon: '🍕' },
  { title: '🎸 Free 15-Min Guitar Chord Lesson', type: 'SKILL SWAP', donor: 'James (Block D)', icon: '🎸' },
  { title: '☕ Hot Coffee for Borrowing Umbrella', type: 'DORM FAVOR', donor: 'Priya (GH-2)', icon: '☕' },
  { title: '🎧 Wireless Headphones (1-Week Share)', type: 'ITEM SHARE', donor: 'Alex (Block D)', icon: '🎧' },
]

export function MysteryBox({ onSelectSurprise }) {
  const [opening, setOpening] = useState(false)
  const [surprise, setSurprise] = useState(null)

  const handleOpen = () => {
    sounds.playPop()
    setOpening(true)
    setSurprise(null)
    setTimeout(() => {
      const picked = SURPRISES[Math.floor(Math.random() * SURPRISES.length)]
      setSurprise(picked)
      setOpening(false)
      sounds.playSuccess()
    }, 1200)
  }

  return (
    <section className="mystery-section">
      <div className="container">
        <GlowCard glowColor="green" className="mystery-card">
          <div className="mystery-content">
            <div className="mystery-left">
              <span className="mystery-tag">🎁 CREATIVE CAMPUS CORNER</span>
              <h2 className="mystery-title">Feeling Lucky? Open a Campus Mystery Box!</h2>
              <p className="mystery-desc">
                Discover random giveaways, secret dorm favors, pizza-for-help bounties, and quick 15-minute skill swaps from students near you.
              </p>

              <button
                className={`btn btn--primary mystery-btn ${opening ? 'opening' : ''}`}
                onClick={handleOpen}
                disabled={opening}
              >
                {opening ? '🎲 Unboxing Campus Surprise...' : '🎁 Open Mystery Box'}
              </button>
            </div>

            <div className="mystery-right">
              {surprise ? (
                <div className="surprise-reveal animate-fade-in-up">
                  <div className="surprise-icon">{surprise.icon}</div>
                  <span className="badge badge--giveaway">{surprise.type}</span>
                  <h3 className="surprise-title">{surprise.title}</h3>
                  <div className="surprise-donor">Offered by {surprise.donor}</div>
                  <button
                    className="btn btn--ghost btn--sm"
                    style={{ marginTop: '12px' }}
                    onClick={() => {
                      sounds.playPop()
                      if (onSelectSurprise) onSelectSurprise(surprise)
                    }}
                  >
                    Claim Surprise →
                  </button>
                </div>
              ) : (
                <div className="mystery-box-idle">
                  <span className={`box-emoji ${opening ? 'box-shake' : ''}`}>🎁</span>
                  <span className="idle-text">{opening ? 'Rattling the box...' : 'Click the button to reveal a surprise!'}</span>
                </div>
              )}
            </div>
          </div>
        </GlowCard>
      </div>
    </section>
  )
}
