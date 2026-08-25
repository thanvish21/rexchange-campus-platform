import { useState, useEffect } from 'react'
import { getRemainingFree } from '../lib/connections.js'
import { exchanges, userById } from '../data/mockData.js'
import ChatModal, { getWhatsAppUrl, CAMPUS_SAFE_DROPZONES } from '../components/ChatModal.jsx'
import PaymentModal from '../components/PaymentModal.jsx'
import GlowCard from '../components/GlowCard.jsx'
import './Projects.css'

const modeIcon = {
  online: '💻 Online Skill Swap',
  meetup: '📍 On Campus Meetup',
}

const safeZoneMap = {
  'ex-1': 'Hostel Block A Lobby Desk',
  'ex-2': 'Online / Central Library Desk 4',
  'ex-3': 'Block C Quad (Monitored Area)',
}

export default function Exchanges() {
  const [remaining, setRemaining] = useState(getRemainingFree())
  const [showPaywall, setShowPaywall] = useState(false)
  const [activeChat, setActiveChat] = useState(null)
  const [upgraded, setUpgraded] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all')

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

  const filteredExchanges = exchanges.filter((ex) => {
    if (filterStatus === 'all') return true
    return ex.status === filterStatus
  })

  return (
    <div className="page exchanges-page">
      <div className="container">
        {/* Page Header */}
        <header className="page-header animate-fade-in-up">
          <div className="header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div className="eyebrow-badge" style={{ display: 'inline-block', marginBottom: '8px' }}>
                ACTIVE TRADES & CAMPUS SAFE HANDOFFS
              </div>
              <h1 className="page-title">My Exchanges & Connections</h1>
              <p className="page-subtitle">Track your physical item pickups, skill trades, and WhatsApp coordination</p>
            </div>

            <div className="credits-badge glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 18px', borderRadius: 'var(--radius-md)', background: 'var(--bg-card)', border: '1px solid var(--border-primary)' }}>
              <span className="credits-icon" style={{ fontSize: '20px' }}>⚡</span>
              <div className="credits-info">
                <span className="credits-count" style={{ display: 'block', fontWeight: 600, fontSize: '13px' }}>
                  {upgraded ? 'Unlimited Pro Pass' : `${remaining} Free Connections Left`}
                </span>
                <span className="credits-sub" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Free giveaways stay 100% free</span>
              </div>
              <button className="btn btn--primary btn--sm" onClick={() => setShowPaywall(true)}>
                {upgraded ? '⚡ Pro Active' : 'Upgrade'}
              </button>
            </div>
          </div>
        </header>

        {/* Campus Safe Meetup Guarantee Banner */}
        <div className="surface animate-fade-in-up" style={{ padding: '16px 20px', marginBottom: '24px', border: '1px solid rgba(99, 102, 241, 0.25)', background: 'linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(168,85,247,0.06) 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>🛡️</span>
              <div>
                <strong style={{ fontSize: '14px', color: '#c7d2fe', display: 'block' }}>IITB / SRM Verified Safe Meetup Guarantee</strong>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Always exchange items at designated CCTV-monitored campus drop-zones. Never meet in isolated areas.
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {CAMPUS_SAFE_DROPZONES.map((zone) => (
                <span key={zone.id} className="skill-tag" style={{ fontSize: '11px' }} title={zone.tag}>
                  {zone.icon} {zone.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="animate-fade-in-up" style={{ animationDelay: '80ms', marginBottom: '20px', display: 'flex', gap: '8px' }}>
          {[
            { id: 'all', label: `All Exchanges (${exchanges.length})` },
            { id: 'active', label: '⚡ Active' },
            { id: 'pending', label: '⏳ Pending Pickup' },
            { id: 'completed', label: '✓ Completed' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`filter-btn ${filterStatus === tab.id ? 'active' : ''}`}
              style={{ minHeight: '36px', padding: '6px 14px', fontSize: '13px' }}
              onClick={() => setFilterStatus(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active exchanges list */}
        <div className="animate-fade-in-up" style={{ animationDelay: '120ms' }}>
          <div className="exchanges-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredExchanges.map((ex) => {
              const partner = userById(ex.withUser)
              const safeZone = safeZoneMap[ex.id] || 'Central Library Foyer'
              const whatsappUrl = getWhatsAppUrl(partner.phone || partner.whatsapp, partner.name, ex.item)

              return (
                <GlowCard key={ex.id} glowColor="purple" className="exchange-card">
                  <div className="exchange-main" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                    <div className="exchange-item-info" style={{ flex: '1', minWidth: '260px' }}>
                      <div className="exchange-header-tags" style={{ display: 'flex', gap: '8px', marginBottom: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span className="badge badge--share">{modeIcon[ex.mode] || '📍 On Campus'}</span>
                        <span className={`status-pill status--${ex.status}`} style={{
                          fontSize: '11px',
                          fontWeight: '700',
                          padding: '3px 10px',
                          borderRadius: 'var(--radius-full)',
                          background: ex.status === 'completed' ? 'rgba(34, 197, 94, 0.15)' : ex.status === 'active' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(234, 179, 8, 0.15)',
                          color: ex.status === 'completed' ? '#4ade80' : ex.status === 'active' ? '#a5b4fc' : '#facc15',
                          border: `1px solid ${ex.status === 'completed' ? 'rgba(34,197,94,0.3)' : ex.status === 'active' ? 'rgba(99,102,241,0.3)' : 'rgba(234,179,8,0.3)'}`,
                        }}>
                          {ex.status === 'completed' ? '✓ Completed' : ex.status === 'active' ? '⚡ Active Exchange' : '⏳ Pending Confirmation'}
                        </span>
                        <span className="skill-tag" style={{ fontSize: '11px', background: 'rgba(34, 197, 94, 0.1)', color: '#86efac', borderColor: 'rgba(34, 197, 94, 0.25)' }}>
                          🛡️ Drop-Zone: {safeZone}
                        </span>
                      </div>

                      <h3 className="exchange-item-title" style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>
                        {ex.item}
                      </h3>
                      <p className="exchange-detail" style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                        {ex.detail} · <span style={{ color: 'var(--text-muted)' }}>{ex.date}</span>
                      </p>
                    </div>

                    {/* Partner & Action Controls */}
                    <div className="exchange-partner" style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span className="partner-avatar" style={{ fontSize: '26px' }}>{partner.avatar}</span>
                        <div className="partner-info" style={{ display: 'flex', flexDirection: 'column' }}>
                          <span className="partner-name" style={{ fontSize: '13.5px', fontWeight: 600 }}>{partner.name}</span>
                          <span className="partner-hostel" style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{partner.hostel}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        {/* 1-Click WhatsApp Direct Action Link */}
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn--ghost btn--sm"
                          style={{ borderColor: 'rgba(37, 211, 102, 0.4)', color: '#4ade80' }}
                          title="Open direct WhatsApp handoff chat"
                        >
                          💬 WhatsApp Handoff
                        </a>

                        {/* Open Chat Modal with Full Context */}
                        <button
                          type="button"
                          className="btn btn--primary btn--sm"
                          onClick={() => setActiveChat({ partner, itemTitle: ex.item, exchange: ex })}
                        >
                          💬 Open Chat
                        </button>
                      </div>
                    </div>
                  </div>
                </GlowCard>
              )
            })}
          </div>
        </div>
      </div>

      {/* Chat Modal with Full Props & Drop-Zones */}
      {activeChat && (
        <ChatModal
          isOpen={Boolean(activeChat)}
          seller={activeChat.partner || activeChat}
          itemTitle={activeChat.itemTitle}
          exchange={activeChat.exchange}
          onClose={() => setActiveChat(null)}
        />
      )}

      {/* Paywall Modal */}
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
