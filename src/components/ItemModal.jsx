import { useState } from 'react'
import { userById } from '../data/mockData.js'
import { recordConnection, getRemainingFree } from '../lib/connections.js'
import './ItemModal.css'

export default function ItemModal({ item, onClose, onOpenChat, onOpenPaywall }) {
  const [requested, setRequested] = useState(false)
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
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content glass-panel animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
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
            <h2 className="modal-title">{item.title}</h2>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-price-box">
            <span className="price-label">Price / Term</span>
            <div className="price-value">
              {item.price === 0 ? <span className="price--free">FREE GIVEAWAY</span> : `₹${item.price.toLocaleString('en-IN')}`}
            </div>
          </div>

          <div className="modal-desc-box">
            <h4 className="desc-heading">Description & Details</h4>
            <p className="desc-text">{item.description}</p>
          </div>

          <div className="modal-tags">
            {item.tags?.map((t) => (
              <span key={t} className="skill-tag">#{t}</span>
            ))}
          </div>

          <div className="modal-location">
            <span>📍 Pickup Location:</span> <strong>{item.location}</strong>
          </div>

          <div className="seller-card">
            <span className="seller-avatar">{seller.avatar}</span>
            <div className="seller-info">
              <div className="seller-name">
                {seller.name} {seller.verified && <span className="verified-badge" title="Verified College Student">✓ Campus Verified</span>}
              </div>
              <div className="seller-sub">{seller.department} • {seller.hostel}</div>
              <div className="seller-stats">
                ★ {seller.rating} rating • {seller.exchanges} successful exchanges
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn--ghost" onClick={onClose}>
            Close
          </button>
          <button
            className={`btn btn--primary ${requested ? 'btn--success' : ''}`}
            onClick={handleConnect}
            disabled={requested}
          >
            {requested ? '✓ Connection Initiated! Opening Chat...' : '⚡ Initiate Exchange →'}
          </button>
        </div>
      </div>
    </div>
  )
}
