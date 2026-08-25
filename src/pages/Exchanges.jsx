import { useState, useEffect } from 'react'
import { getRemainingFree, FREE_MATCH_LIMIT } from '../lib/connections.js'
import { exchanges, userById } from '../data/mockData.js'
import ChatModal from '../components/ChatModal.jsx'
import PaymentModal from '../components/PaymentModal.jsx'
import GlowCard from '../components/GlowCard.jsx'
import './Projects.css'

const modeIcon = {
  online: '💻 Online',
  meetup: '📍 On Campus',
}

export default function Exchanges() {
  const [remaining, setRemaining] = useState(getRemainingFree())
  const [showPaywall, setShowPaywall] = useState(false)
  const [activeChat, setActiveChat] = useState(null)
  const [upgraded, setUpgraded] = useState(false)

  const refreshQuota = () => {
    setRemaining(getRemainingFree())
  }

  useEffect(() => {
    refreshQuota()
  }, [])

  const handlePaymentSuccess = () => {
    setUpgraded(true)
    setShowPaywall(false)
  }

  return (
    <div className="page exchanges-page">
      <div className="container">
        <header className="page-header animate-fade-in-up">
          <div className="header-flex">
            <div>
              <h1 className="page-title">My Exchanges & Connections</h1>
              <p className="page-subtitle">Track your active resource trades, skill swaps, and pickup status</p>
            </div>

            <div className="credits-badge glass-panel">
              <span className="credits-icon">⚡</span>
              <div className="credits-info">
                <span className="credits-count">{upgraded ? 'Unlimited Pro Pass' : `${remaining} Free Connections Left`}</span>
                <span className="credits-sub">Free giveaways stay 100% free</span>
              </div>
              <button className="btn btn--primary btn--sm" onClick={() => setShowPaywall(true)}>
                {upgraded ? '⚡ Pro Active' : 'Buy Credits / Pass'}
              </button>
            </div>
          </div>
        </header>

        {/* Active exchanges */}
        <div className="animate-fade-in-up" style={{ animationDelay: '120ms' }}>
          <h2 className="section-title" style={{ fontSize: '1.25rem', marginBottom: '16px' }}>
            Active Exchange Threads ({exchanges.length})
          </h2>

          <div className="exchanges-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {exchanges.map((ex) => {
              const partner = userById(ex.withUser)
              return (
                <GlowCard key={ex.id} glowColor="purple" className="exchange-card">
                  <div className="exchange-main">
                    <div className="exchange-item-info">
                      <div className="exchange-header-tags">
                        <span className="badge badge--share">{modeIcon[ex.mode] || '📍 On Campus'}</span>
                        <span className={`status-pill status--${ex.status}`}>
                          {ex.status === 'completed' ? '✓ Completed' : ex.status === 'active' ? '⚡ Active' : '⏳ Pending'}
                        </span>
                      </div>
                      <h3 className="exchange-item-title">{ex.item}</h3>
                      <p className="exchange-detail">{ex.detail}</p>
                    </div>

                    <div className="exchange-partner">
                      <span className="partner-avatar">{partner.avatar}</span>
                      <div className="partner-info">
                        <span className="partner-name">{partner.name}</span>
                        <span className="partner-hostel">{partner.hostel}</span>
                      </div>
                      <button
                        className="btn btn--ghost btn--sm"
                        onClick={() => setActiveChat(partner)}
                      >
                        💬 Open Chat
                      </button>
                    </div>
                  </div>
                </GlowCard>
              )
            })}
          </div>
        </div>
      </div>

      {activeChat && (
        <ChatModal
          seller={activeChat}
          onClose={() => setActiveChat(null)}
        />
      )}

      {showPaywall && (
        <PaymentModal
          isOpen={showPaywall}
          onClose={() => setShowPaywall(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  )
}
