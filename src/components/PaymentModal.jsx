import { useState, useMemo } from 'react'
import { useFocusTrap } from '../hooks/useFocusTrap.js'
import './PaymentModal.css'

const PLANS = [
  { id: 'pass', label: '🎓 Semester Pass', price: '₹99', meta: 'Unlimited connections · 1 semester', popular: true },
  { id: 'per_connection', label: '⚡ 1 Connection Credit', price: '₹9', meta: 'Single use · One connection', popular: false },
]

const METHODS = [
  { id: 'upi', label: '📱 UPI / GPay / PhonePe / Paytm' },
  { id: 'card', label: '💳 Debit / Credit Card / NetBanking' },
]

export default function PaymentModal({ onClose, onSuccess }) {
  const [method, setMethod] = useState('upi')
  const [processing, setProcessing] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('pass')
  const modalRef = useFocusTrap({ isOpen: true, onClose })

  // Memoize the transaction reference so it doesn't change on every render
  const txnRef = useMemo(
    () => `#REX-${Math.floor(100000 + Math.random() * 900000)}`,
    []
  )

  const handlePay = () => {
    if (processing || completed) return
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setCompleted(true)
      setTimeout(() => {
        if (onSuccess) onSuccess()
        onClose()
      }, 1500)
    }, 1800)
  }

  return (
    <div className="pay-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="pay-modal-title">
      <div ref={modalRef} className="pay-modal glass-panel animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        <button className="pay-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <h2 id="pay-modal-title" className="pay-title">Unlock Unlimited Connections</h2>
        <p className="pay-subtitle">
          Keep textbook giveaways free. Upgrade for unlimited campus teammate invites & item pickup chats.
        </p>

        <div className="pay-plans" role="radiogroup" aria-label="Subscription plan options">
          {PLANS.map((plan) => (
            <button
              key={plan.id}
              type="button"
              role="radio"
              aria-checked={selectedPlan === plan.id}
              className={`pay-plan-chip ${selectedPlan === plan.id ? 'active' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && <span className="pay-pop-badge">BEST VALUE</span>}
              <div className="plan-label">{plan.label}</div>
              <div className="plan-price">{plan.price}</div>
              <div className="plan-meta">{plan.meta}</div>
            </button>
          ))}
        </div>

        <div className="pay-amount-box surface">
          <span className="pay-label">Total Due Today</span>
          <span className="pay-amount">{PLANS.find((p) => p.id === selectedPlan)?.price}</span>
        </div>

        <div className="pay-methods">
          <span className="pay-label">Select Payment Method:</span>
          {METHODS.map((m) => (
            <button
              key={m.id}
              type="button"
              className={`pay-method-btn ${method === m.id ? 'active' : ''}`}
              onClick={() => setMethod(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>

        {method === 'upi' ? (
          <div className="pay-upi-box surface">
            <p className="upi-instruction">Scan QR or Pay to Campus Merchant UPI:</p>
            <code className="upi-id">rexchange.srm@upi</code>
            <p className="upi-sub">Zero transaction fees on student UPI transfers</p>
          </div>
        ) : (
          <div className="pay-card-box surface">
            <input type="text" className="form-input" placeholder="4532 •••• •••• 8901" aria-label="Card number" />
            <div className="card-row">
              <input type="text" className="form-input" placeholder="MM/YY" aria-label="Expiration date" />
              <input type="password" className="form-input" placeholder="CVV" aria-label="Security CVV code" />
            </div>
          </div>
        )}

        <div className="pay-action-row">
          {completed ? (
            <button className="btn btn--primary pay-btn btn--success" disabled>
              ✓ Payment Verified! Account Upgraded
            </button>
          ) : processing ? (
            <button className="btn btn--primary pay-btn" disabled>
              <span className="spinner" /> Verifying with Bank...
            </button>
          ) : (
            <button className="btn btn--primary pay-btn" onClick={handlePay}>
              🔒 Pay {PLANS.find((p) => p.id === selectedPlan)?.price} & Unlock Access
            </button>
          )}
        </div>

        <div className="pay-shield-footer">
          <span>🛡️ 100% Refund Guarantee if no connections made within 7 days</span>
          <span className="ref-code">Ref: {txnRef}</span>
        </div>
      </div>
    </div>
  )
}
