import { useState } from 'react'
import { userById } from '../data/mockData.js'
import { recordConnection, getRemainingFree } from '../lib/connections.js'
import { useFocusTrap } from '../hooks/useFocusTrap.js'
import './ItemModal.css'

export default function ItemModal({ item, onClose, onOpenChat, onOpenPaywall }) {
  const [requested, setRequested] = useState(false)
  const modalRef = useFocusTrap({ isOpen: Boolean(item), onClose })

  if (!item) return null

  const seller = userById(item.postedBy)
  const remaining = getRemainingFree()

  const handleConnect = () => {
    if (remaining === 0) {
      if (onOpenPaywall) onOpenPaywall()
      return
    }
    recordConnection()
    setRequested(true)
    setTimeout(() => {
      if (onOpenChat) onOpenChat(seller, item.title)
      onClose()
    }, 1200)
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-item-title">
      <div ref={modalRef} className="modal-content glass-panel animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="modal-header">
          <div className="modal-icon-badge">{item.image || '📦'}</div>
          <div>
            <div className="modal-type-row">
              <span className={`badge badge--${item.type}`}>{item.type.toUpperCase()}</span>
              <span className="modal-condition">{item.condition}</span>
              <span className="modal-posted">{item.postedAt}</span>
            </div>
            <h2 id="modal-item-title" className="modal-title">{item.title}</h2>
          </div>
        </div>

        <div className="modal-body">
          <p className="modal-description">{item.description}</p>

          <div className="modal-tags">
            {item.tags.map((tag) => (
              <span key={tag} className="tag-pill">
                #{tag}
              </span>
            ))}
          </div>

          <div className="modal-seller-card surface">
            <div className="seller-avatar">{seller.avatar}</div>
            <div className="seller-info">
              <div className="seller-name-row">
                <span className="seller-name">{seller.name}</span>
                {seller.verified && <span className="verified-chip">✓ Campus Verified</span>}
              </div>
              <p className="seller-dept">
                {seller.dept} • {seller.role}
              </p>
              <div className="seller-meta">
                <span>📍 Pickup Spot: {item.location}</span>
                <span>⭐ {seller.rating} ({seller.swapsCount} swaps)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <div className="modal-price-row">
            <span className="price-label">{item.price === 0 ? 'Giveaway' : 'Price'}</span>
            <span className="price-value">{item.price === 0 ? 'FREE' : `₹${item.price}`}</span>
          </div>

          <button
            className={`btn btn--primary connect-btn ${requested ? 'btn--success' : ''}`}
            onClick={handleConnect}
            disabled={requested}
          >
            {requested
              ? '✓ Connection Sent!'
              : item.price === 0
                ? '🎁 Claim Free Giveaway'
                : `⚡ Connect with ${seller.name.split(' ')[0]}`}
          </button>
        </div>
      </div>
    </div>
  )
}
