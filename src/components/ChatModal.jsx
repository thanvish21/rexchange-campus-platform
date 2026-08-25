import { useState, useEffect, useRef } from 'react'
import './ChatModal.css'

const QUICK_REPLIES = [
  '📍 Meet at library at 4 PM?',
  'Block A lobby works for me!',
  'Is 6 PM tomorrow okay?',
  "I'll bring exact change 💵",
]

export default function ChatModal({ isOpen, onClose, seller, itemTitle }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const bodyRef = useRef(null)

  // Reset messages whenever the conversation partner changes
  useEffect(() => {
    if (!isOpen || !seller) return
    setMessages([
      { sender: 'them', text: `Hi! I saw you requested "${itemTitle || 'this item'}". Where on campus works best for you to meet up?`, time: 'Just now' },
    ])
    setInput('')
  }, [isOpen, seller?.id, itemTitle])

  // Auto-scroll to latest
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [messages, isOpen])

  if (!isOpen || !seller) return null

  const handleSend = (text) => {
    const trimmed = (text ?? input).trim()
    if (!trimmed) return
    const newMsg = { sender: 'me', text: trimmed, time: 'Just now' }
    setMessages((prev) => [...prev, newMsg])
    setInput('')

    // Simulated reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'them', text: 'Sounds good! See you near Block A lobby entrance.', time: 'Just now' },
      ])
    }, 1400)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="chat-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Chat with seller">
      <div className="chat-modal glass-panel animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        <div className="chat-header">
          <div className="chat-seller-avatar" aria-hidden="true">{seller.avatar || '🧑‍🎓'}</div>
          <div className="chat-seller-details">
            <div className="chat-seller-name">{seller.name || 'Campus Student'}</div>
            <div className="chat-seller-hostel">
              <span className="chat-online-dot" aria-hidden="true" /> Online · {seller.hostel || 'Main Campus'}
            </div>
          </div>
          <button className="chat-close" onClick={onClose} aria-label="Close chat">✕</button>
        </div>

        <div className="chat-body" ref={bodyRef}>
          <div className="chat-banner">
            🔒 <strong>Meetup Safety</strong> Always meet in well-lit campus areas like hostel lobbies or central library.
          </div>
          {messages.map((m, index) => (
            <div key={`${m.sender}-${index}-${m.time}`} className={`chat-bubble-wrap ${m.sender === 'me' ? 'me' : 'them'}`}>
              <div className="chat-bubble">{m.text}</div>
              <span className="chat-time">{m.time}</span>
            </div>
          ))}
        </div>

        {messages.length <= 1 && (
          <div className="chat-quick-replies">
            {QUICK_REPLIES.map((q) => (
              <button key={q} className="chat-quick-reply" onClick={() => handleSend(q)}>
                {q}
            </button>
            ))}
        </div>
        )}

        <form className="chat-footer" onSubmit={(e) => { e.preventDefault(); handleSend() }}>
          <input
            type="text"
            className="chat-input"
            placeholder="Type a message (e.g. Meet at library at 4 PM?)..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            aria-label="Message"
          />
          <button type="submit" className="btn btn--primary chat-send-btn" disabled={!input.trim()}>
            Send <span aria-hidden="true">💬</span>
        </button>
      </form>
    </div>
  </div>
  )
}
