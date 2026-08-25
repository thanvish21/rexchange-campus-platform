import { useState, useMemo } from 'react'
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
    <div className="pay-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Upgrade plan">
      <div className="pay-modal glass-panel animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        <button className="pay-close" onClick={onClose} aria-label="Close payment">✕</button>

        {!completed ? (
          <>
            <div className="pay-brand-header">
              <span className="pay-shield">🛡️ Secure Payment · RExchange Campus Pay</span>
              <div className="pay-amount">
                {selectedPlan === 'pass' ? '₹99' : '₹9'}
                <span>{selectedPlan === 'pass' ? ' / semester pass' : ' / single connection'}</span>
              </div>
            </div>

            <div className="pay-plan-selector">
              {PLANS.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  className={`pay-plan-chip ${selectedPlan === plan.id ? 'active' : ''} ${plan.popular ? 'popular' : ''}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && <span className="pay-popular-tag">POPULAR</span>}
                  <span className="pay-plan-label">{plan.label}</span>
                  <span className="pay-plan-meta">{plan.meta}</span>
                </button>
              ))}
            </div>

            <div className="pay-methods">
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
              <div className="upi-box">
                <div className="qr-box">
                  <span className="qr-emoji">📱 Scan QR with any UPI App</span>
                  <div className="mock-qr">
                    <div className="qr-pattern" aria-hidden="true" />
                 </div>
                  <span className="upi-id mono">UPI ID: rexchange.pay@icici</span>
               </div>
                <div className="upi-apps">
                  <span className="upi-badge">GPay</span>
                  <span className="upi-badge">PhonePe</span>
                  <span className="upi-badge">Paytm</span>
                  <span className="upi-badge">BHIM</span>
               </div>
             </div>
            ) : (
              <div className="card-form">
                <input className="form-input" placeholder="Card Number" readOnly value="4000 •••• •••• 9010" />
                <div className="card-form-row">
                  <input className="form-input" placeholder="MM/YY" readOnly value="12/28" />
                  <input className="form-input" placeholder="CVV" readOnly value="•••" />
               </div>
             </div>
            )}

            <button
              type="button"
              className="btn btn--primary pay-submit-btn"
              onClick={handlePay}
              disabled={processing}
            >
              {processing ? (
                <span className="pay-spinner">
                  <span className="pay-spinner-dot" /> Verifying with Bank…
               </span>
              ) : (
                `Pay ${selectedPlan === 'pass' ? '₹99' : '₹9'} Instantly`
              )}
           </button>

            <p className="pay-fineprint">
              By paying you agree to RExchange Terms · 100% refundable within 7 days
           </p>
          </>
        ) : (
          <div className="pay-success-state animate-fade-in">
            <div className="success-icon-anim">🎉</div>
            <h3>Payment Successful</h3>
            <p>Your Connection Credits have been updated</p>
            <span className="ref-code mono">Txn Ref: {txnRef}</span>
         </div>
        )}
     </div>
   </div>
  )
}
