import { useState, useEffect, useRef } from 'react'
import { useFocusTrap } from '../hooks/useFocusTrap.js'
import './ChatModal.css'

export const CAMPUS_SAFE_DROPZONES = [
  { id: 'lib', name: 'Central Library Foyer', icon: '🏛️', tag: 'CCTV Monitored · High Footfall', hours: '8 AM – 11 PM' },
  { id: 'block-a', name: 'Hostel Block A Lobby Desk', icon: '🏢', tag: 'Security Desk · Verified', hours: '24/7 Monitored' },
  { id: 'sac', name: 'Student Activity Center (SAC)', icon: '☕', tag: 'Public Lounge · Well-Lit', hours: '9 AM – 10 PM' },
  { id: 'main-gate', name: 'Main Gate Security Post', icon: '🛡️', tag: '24/7 Security Officer Present', hours: '24/7 Monitored' },
]

export const QUICK_REPLY_CATEGORIES = {
  safeZone: {
    label: '🛡️ Safe Zones',
    replies: [
      '📍 Let\'s meet at Central Library Foyer (CCTV Monitored)',
      '🏢 Meet at Hostel Block A Lobby desk',
      '☕ Meet at SAC Student Lounge',
    ],
  },
  timing: {
    label: '⏰ Schedule',
    replies: [
      '🕒 Free today around 4:30 PM?',
      '📅 Tomorrow during lunch break works!',
      '⚡ I can be at the drop-zone in 15 mins',
    ],
  },
  handoff: {
    label: '💵 Handoff & Pay',
    replies: [
      '📱 Will UPI / GPay on spot upon inspection',
      '💵 I have exact cash ready',
      '✅ Received item in great condition, thanks!',
    ],
  },
}

export const getWhatsAppUrl = (phone, name, itemTitle) => {
  const cleanPhone = (phone || '919876543210').replace(/[^0-9]/g, '')
  const message = `Hey ${name || 'there'}! Reaching out from RExchange regarding "${itemTitle || 'our exchange'}". Let's coordinate our campus meetup!`
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
}

export default function ChatModal({
  isOpen = true,
  onClose,
  seller,
  itemTitle,
  exchange,
  initialDropZone = 'Central Library Foyer',
}) {
  const resolvedSeller = seller?.partner || seller
  const resolvedItemTitle = itemTitle || exchange?.item || resolvedSeller?.itemTitle || resolvedSeller?.item || 'Campus Exchange'
  const sellerPhone = resolvedSeller?.phone || resolvedSeller?.whatsapp || '+91 98765 43210'
  const whatsappUrl = getWhatsAppUrl(sellerPhone, resolvedSeller?.name, resolvedItemTitle)

  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [activeCategory, setActiveCategory] = useState('safeZone')
  const [selectedDropZone, setSelectedDropZone] = useState(initialDropZone)
  const bodyRef = useRef(null)
  const inputRef = useRef(null)

  const modalRef = useFocusTrap({
    isOpen: Boolean(isOpen && resolvedSeller),
    onClose,
    initialFocusRef: inputRef,
  })

  // Reset conversation on partner/item change
  useEffect(() => {
    if (!isOpen || !resolvedSeller) return
    setMessages([
      {
        id: `msg-init-${Date.now()}`,
        sender: 'them',
        text: `Hi! I saw you requested "${resolvedItemTitle}". Where on campus works best for you to meet up?`,
        time: 'Just now',
      },
    ])
    setInput('')
  }, [isOpen, resolvedSeller?.id, resolvedItemTitle])

  // Auto-scroll to latest message
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [messages, isOpen])

  if (!isOpen || !resolvedSeller) return null

  const handleSend = (textToSend) => {
    const trimmed = (textToSend ?? input).trim()
    if (!trimmed) return

    const newMsg = {
      id: `msg-me-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      sender: 'me',
      text: trimmed,
      time: 'Just now',
    }

    setMessages((prev) => [...prev, newMsg])
    setInput('')

    setTimeout(() => {
      let replyText = 'Sounds good! See you there.'
      const lower = trimmed.toLowerCase()
      if (lower.includes('library')) {
        replyText = 'Central Library Foyer works great! I’ll wait near the ground floor check-in desk.'
      } else if (lower.includes('block a')) {
        replyText = 'Block A Lobby desk is perfect. Let me know when you arrive!'
      } else if (lower.includes('sac') || lower.includes('lounge')) {
        replyText = 'SAC cafe entrance works! I am wearing a dark hoodie.'
      } else if (lower.includes('upi') || lower.includes('gpay')) {
        replyText = 'UPI QR is ready on my phone!'
      } else if (lower.includes('cash')) {
        replyText = 'Exact cash is appreciated. Thanks!'
      } else if (lower.includes('whatsapp')) {
        replyText = 'Got your message on WhatsApp! Continuing there.'
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `msg-them-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          sender: 'them',
          text: replyText,
          time: 'Just now',
        },
      ])
    }, 1100)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleProposeDropZone = (zoneName) => {
    setSelectedDropZone(zoneName)
    handleSend(`📍 Proposing Campus Safe Meetup: ${zoneName} (CCTV Monitored Zone)`)
  }

  return (
    <div className="chat-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Campus Chat & Meetup Coordination">
      <div
        ref={modalRef}
        className="chat-modal glass-panel animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="chat-header">
          <div className="chat-seller-avatar" aria-hidden="true">{resolvedSeller.avatar || '🧑‍🎓'}</div>
          <div className="chat-seller-details">
            <div className="chat-seller-name-row">
              <span className="chat-seller-name">{resolvedSeller.name || 'Campus Student'}</span>
              <span className="chat-safe-badge" title="Campus Verified Student">🛡️ Verified</span>
            </div>
            <div className="chat-seller-hostel">
              <span className="chat-online-dot" aria-hidden="true" /> Online · {resolvedSeller.hostel || 'Main Campus'}
            </div>
          </div>

          {/* 1-Click WhatsApp Handoff Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="chat-whatsapp-btn"
            title="1-Click WhatsApp Direct Handoff"
            aria-label="Chat on WhatsApp"
          >
            <span className="whatsapp-icon">💬</span>
            <span className="whatsapp-text">WhatsApp</span>
          </a>

          <button className="chat-close" onClick={onClose} aria-label="Close chat">✕</button>
        </div>

        {/* Campus Safe Drop-Zone Indicator Banner */}
        <div className="chat-safezone-banner">
          <div className="safezone-header">
            <span className="safezone-icon">🛡️</span>
            <span className="safezone-title">Campus Safe Drop-Zones (CCTV Monitored)</span>
          </div>
          <div className="safezone-chips">
            {CAMPUS_SAFE_DROPZONES.map((zone) => (
              <button
                key={zone.id}
                type="button"
                className={`safezone-pill ${selectedDropZone === zone.name ? 'active' : ''}`}
                onClick={() => handleProposeDropZone(zone.name)}
                title={`${zone.tag} · ${zone.hours}`}
              >
                <span>{zone.icon}</span> {zone.name}
              </button>
            ))}
          </div>
        </div>

        {/* Message Thread */}
        <div className="chat-body" ref={bodyRef} role="log" aria-live="polite">
          <div className="chat-item-context">
            📦 Discussing: <strong>{resolvedItemTitle}</strong>
          </div>

          {messages.map((m) => (
            <div key={m.id} className={`chat-bubble-wrap ${m.sender === 'me' ? 'me' : 'them'}`}>
              <div className="chat-bubble">{m.text}</div>
              <span className="chat-time">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Categorized Quick Reply Chips */}
        <div className="chat-quick-replies-container">
          <div className="quick-reply-categories">
            {Object.entries(QUICK_REPLY_CATEGORIES).map(([catKey, catData]) => (
              <button
                key={catKey}
                type="button"
                className={`category-tab ${activeCategory === catKey ? 'active' : ''}`}
                onClick={() => setActiveCategory(catKey)}
              >
                {catData.label}
              </button>
            ))}
          </div>
          <div className="chat-quick-replies">
            {QUICK_REPLY_CATEGORIES[activeCategory]?.replies.map((replyText) => (
              <button
                key={replyText}
                type="button"
                className="chat-quick-reply"
                onClick={() => handleSend(replyText)}
              >
                {replyText}
              </button>
            ))}
          </div>
        </div>

        {/* Input Footer */}
        <form className="chat-footer" onSubmit={(e) => { e.preventDefault(); handleSend() }}>
          <input
            ref={inputRef}
            type="text"
            className="chat-input"
            placeholder="Type message or click a safe zone / reply chip above..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            aria-label="Message"
          />
          <button type="submit" className="btn btn--primary chat-send-btn" disabled={!input.trim()}>
            Send 💬
          </button>
        </form>
      </div>
    </div>
  )
}
