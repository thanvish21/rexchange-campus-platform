import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import GlowCard from '../components/GlowCard.jsx'
import { currentUser } from '../data/mockData.js'
import { sounds } from '../utils/audio.js'
import './Profile.css'

const CATEGORIES = [
  { id: 'Textbooks', label: 'Textbooks', icon: '📚' },
  { id: 'Electronics', label: 'Electronics', icon: '💻' },
  { id: 'Tickets', label: 'Tickets & Passes', icon: '🎟️' },
  { id: 'Notes', label: 'Study Notes', icon: '📝' },
  { id: 'Skills', label: 'Skill Trades', icon: '🤝' },
  { id: 'Dorm Essentials', label: 'Dorm Essentials', icon: '🛏️' },
]

const TYPES = [
  { id: 'sell', label: '💰 Sell', desc: 'Set a price in ₹', badgeClass: 'badge--sell', glow: 'purple' },
  { id: 'giveaway', label: '🎁 Give Away', desc: 'Free for any student', badgeClass: 'badge--giveaway', glow: 'green' },
  { id: 'share', label: '📝 Share / Notes', desc: 'Study material & guides', badgeClass: 'badge--share', glow: 'blue' },
  { id: 'skill', label: '🤝 Offer a Skill', desc: 'Teach, fix, or trade', badgeClass: 'badge--skill', glow: 'purple' },
]

const EMOJI_OPTIONS = ['📚', '💻', '🎟️', '📝', '🤝', '🛏️', '🎧', '🎸', '👟', '🔬', '🚲', '⚡']

export default function ListItem() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Textbooks')
  const [type, setType] = useState('sell')
  const [price, setPrice] = useState('500')
  const [description, setDescription] = useState('')
  const [hostel, setHostel] = useState(currentUser.hostel || 'Block A Hostel')
  const [emoji, setEmoji] = useState('📚')
  const [posted, setPosted] = useState(false)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const navigate = useNavigate()

  const handleCategorySelect = (cat) => {
    sounds.playPop()
    setCategory(cat.id)
    setEmoji(cat.icon)
  }

  const qualityMetrics = useMemo(() => {
    let score = 0
    const checks = []

    if (title.trim().length >= 5) {
      score += 30
      checks.push({ label: 'Descriptive title', done: true })
    } else {
      checks.push({ label: 'Title (min 5 chars)', done: false })
    }

    if (category) {
      score += 15
      checks.push({ label: 'Category assigned', done: true })
    }

    if (type === 'giveaway' || (type === 'sell' && Number(price) > 0) || type === 'share' || type === 'skill') {
      score += 20
      checks.push({ label: 'Pricing / Type configured', done: true })
    } else {
      checks.push({ label: 'Valid price (₹ > 0)', done: false })
    }

    if (hostel.trim().length >= 3) {
      score += 15
      checks.push({ label: 'Campus pickup spot', done: true })
    } else {
      checks.push({ label: 'Pickup spot provided', done: false })
    }

    if (description.trim().length >= 15) {
      score += 20
      checks.push({ label: 'Detailed description (15+ chars)', done: true })
    } else {
      checks.push({ label: 'Description (15+ chars)', done: false })
    }

    let tier = 'Basic'
    let color = 'var(--text-muted)'
    if (score >= 80) {
      tier = 'Campus Spotlight Ready ⭐'
      color = 'var(--success)'
    } else if (score >= 50) {
      tier = 'Good Listing 👍'
      color = 'var(--accent-text)'
    }

    return { score, checks, tier, color }
  }, [title, category, type, price, hostel, description])

  const validateForm = () => {
    const errs = {}
    if (!title.trim()) {
      errs.title = 'Listing title is required.'
    } else if (title.trim().length < 5) {
      errs.title = 'Title must be at least 5 characters long.'
    }

    if (type === 'sell') {
      if (!price || isNaN(Number(price)) || Number(price) <= 0) {
        errs.price = 'Please specify a valid price greater than ₹0.'
      }
    }

    if (!hostel.trim()) {
      errs.hostel = 'Pickup location / hostel is required.'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handlePost = (e) => {
    e.preventDefault()
    setTouched({ title: true, price: true, hostel: true, description: true })

    if (!validateForm()) return

    sounds.playCelebration()
    setPosted(true)
  }

  const handleResetForm = () => {
    setTitle('')
    setCategory('Textbooks')
    setType('sell')
    setPrice('500')
    setDescription('')
    setHostel('Block A Hostel')
    setEmoji('📚')
    setPosted(false)
    setErrors({})
    setTouched({})
  }

  const currentTypeConfig = TYPES.find((t) => t.id === type) || TYPES[0]

  return (
    <div className="page list-item-page">
      <div className="container">
        {/* Header */}
        <header className="page-header animate-fade-in-up">
          <div className="eyebrow-badge" style={{ display: 'inline-block', marginBottom: '8px' }}>
            CAMPUS RESOURCE EXCHANGE
          </div>
          <h1 className="page-title">List a Resource or Skill</h1>
          <p className="page-subtitle">
            Post it once. Over 1,200+ students across campus see it instantly with direct chat & pickup.
          </p>
        </header>

        {/* LISTING STRENGTH / PROGRESS METER */}
        <div className="surface animate-fade-in-up" style={{ padding: '18px 24px', marginBottom: '24px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: '700' }}>Listing Quality Meter</span>
              <span className="badge" style={{ fontSize: '11px', color: qualityMetrics.color, border: `1px solid ${qualityMetrics.color}` }}>
                {qualityMetrics.tier}
              </span>
            </div>
            <span className="mono" style={{ fontSize: '13px', fontWeight: '700', color: qualityMetrics.color }}>
              {qualityMetrics.score}% Complete
            </span>
          </div>

          <div
            style={{
              height: '6px',
              background: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden',
              marginBottom: '12px',
            }}
          >
            <div
              style={{
                width: `${qualityMetrics.score}%`,
                height: '100%',
                background: qualityMetrics.score >= 80 ? 'var(--success)' : 'var(--accent-gradient)',
                transition: 'width 0.3s ease-out',
                boxShadow: '0 0 10px rgba(99, 102, 241, 0.5)',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {qualityMetrics.checks.map((c, i) => (
              <span
                key={i}
                style={{
                  fontSize: '11.5px',
                  color: c.done ? 'var(--success)' : 'var(--text-muted)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                {c.done ? '✓' : '○'} {c.label}
              </span>
            ))}
          </div>
        </div>

        <div className="two-col">
          {/* FORM COLUMN */}
          <form className="card animate-fade-in-up" style={{ animationDelay: '80ms' }} onSubmit={handlePost}>
            {/* Title Field */}
            <div className="form-field">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label htmlFor="item-title" className="form-label" style={{ marginBottom: 0 }}>
                  What are you listing? *
                </label>
                <span className="text-muted" style={{ fontSize: '11px' }}>
                  {title.length} / 80
                </span>
              </div>
              <input
                id="item-title"
                type="text"
                maxLength={80}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                  if (errors.title) setErrors((prev) => ({ ...prev, title: null }))
                }}
                onBlur={() => setTouched((prev) => ({ ...prev, title: true }))}
                placeholder="e.g. TI-84 Plus CE Graphing Calculator / DSA Notes"
                className={`form-input ${touched.title && errors.title ? 'form-input--error' : ''}`}
              />
              {touched.title && errors.title && (
                <p style={{ color: 'var(--error)', fontSize: '12px', marginTop: '6px' }}>⚠️ {errors.title}</p>
              )}
            </div>

            {/* Category Selection */}
            <div className="form-field">
              <span className="form-label">Category *</span>
              <div className="chip-row">
                {CATEGORIES.map((c) => {
                  const isActive = category === c.id
                  return (
                    <button
                      key={c.id}
                      type="button"
                      className={`chip ${isActive ? 'chip--active' : ''}`}
                      onClick={() => handleCategorySelect(c)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: isActive ? 'rgba(99, 102, 241, 0.18)' : 'var(--bg-primary)',
                        borderColor: isActive ? 'var(--accent-indigo)' : 'var(--border-primary)',
                        color: isActive ? '#c7d2fe' : 'var(--text-secondary)',
                        boxShadow: isActive ? '0 0 10px rgba(99, 102, 241, 0.25)' : 'none',
                        transform: isActive ? 'translateY(-1px)' : 'none',
                      }}
                    >
                      <span>{c.icon}</span>
                      <span>{c.label}</span>
                      {isActive && <span style={{ fontSize: '11px', color: 'var(--accent-text)' }}>✓</span>}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Emoji Selection */}
            <div className="form-field">
              <span className="form-label">Listing Icon Badge</span>
              <div className="chip-row">
                {EMOJI_OPTIONS.map((e) => {
                  const isActive = emoji === e
                  return (
                    <button
                      key={e}
                      type="button"
                      className={`chip ${isActive ? 'chip--active' : ''}`}
                      onClick={() => { sounds.playPop(); setEmoji(e) }}
                      style={{
                        fontSize: '18px',
                        padding: '6px 12px',
                        background: isActive ? 'rgba(99, 102, 241, 0.25)' : 'var(--bg-primary)',
                        borderColor: isActive ? 'var(--accent-indigo)' : 'var(--border-primary)',
                        transform: isActive ? 'scale(1.12)' : 'scale(1)',
                        boxShadow: isActive ? '0 0 12px rgba(99, 102, 241, 0.4)' : 'none',
                      }}
                    >
                      {e}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Listing Type Grid */}
            <div className="form-field">
              <span className="form-label">Exchange Model *</span>
              <div className="type-grid">
                {TYPES.map((t) => {
                  const isActive = type === t.id
                  return (
                    <button
                      key={t.id}
                      type="button"
                      className={`type-card ${isActive ? 'type-card--active' : ''}`}
                      onClick={() => { sounds.playPop(); setType(t.id) }}
                      style={{
                        borderColor: isActive ? 'var(--accent-indigo)' : 'var(--border-primary)',
                        background: isActive ? 'rgba(99, 102, 241, 0.12)' : 'var(--bg-primary)',
                        boxShadow: isActive ? '0 0 16px rgba(99, 102, 241, 0.2)' : 'none',
                        position: 'relative',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="type-card-label">{t.label}</div>
                        {isActive && (
                          <span style={{ fontSize: '11px', color: 'var(--accent-text)', fontWeight: '700' }}>● Active</span>
                        )}
                      </div>
                      <div className="type-card-desc">{t.desc}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Dynamic Price Field */}
            {type === 'sell' && (
              <div className="form-field">
                <label htmlFor="item-price" className="form-label">Price (₹ INR) *</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>
                    ₹
                  </span>
                  <input
                    id="item-price"
                    type="number"
                    min="1"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value)
                      if (errors.price) setErrors((prev) => ({ ...prev, price: null }))
                    }}
                    onBlur={() => setTouched((prev) => ({ ...prev, price: true }))}
                    placeholder="e.g. 500"
                    className={`form-input ${touched.price && errors.price ? 'form-input--error' : ''}`}
                    style={{ paddingLeft: '32px' }}
                  />
                </div>
                {touched.price && errors.price && (
                  <p style={{ color: 'var(--error)', fontSize: '12px', marginTop: '6px' }}>⚠️ {errors.price}</p>
                )}
              </div>
            )}

            {/* Hostel / Pickup Location */}
            <div className="form-field">
              <label htmlFor="item-hostel" className="form-label">Campus Pickup Spot / Hostel *</label>
              <input
                id="item-hostel"
                type="text"
                value={hostel}
                onChange={(e) => {
                  setHostel(e.target.value)
                  if (errors.hostel) setErrors((prev) => ({ ...prev, hostel: null }))
                }}
                onBlur={() => setTouched((prev) => ({ ...prev, hostel: true }))}
                placeholder="e.g. Block A Lobby, Central Library Lawn, Room 304"
                className={`form-input ${touched.hostel && errors.hostel ? 'form-input--error' : ''}`}
              />
              {touched.hostel && errors.hostel && (
                <p style={{ color: 'var(--error)', fontSize: '12px', marginTop: '6px' }}>⚠️ {errors.hostel}</p>
              )}
            </div>

            {/* Description Field */}
            <div className="form-field">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label htmlFor="item-desc" className="form-label" style={{ marginBottom: 0 }}>
                  Description & Details
                </label>
                <span className="text-muted" style={{ fontSize: '11px' }}>
                  {description.length} / 400
                </span>
              </div>
              <textarea
                id="item-desc"
                rows={3}
                maxLength={400}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Specify condition, included accessories, edition, return policy, or availability..."
                className="form-input form-textarea"
              />
            </div>

            <button type="submit" className="btn btn--primary save-btn" style={{ width: '100%', marginTop: '8px' }}>
              🚀 Publish Listing to Campus
            </button>
          </form>

          {/* INSTANT LIVE PREVIEW COLUMN */}
          <div className="preview-column animate-fade-in-up" style={{ animationDelay: '160ms', position: 'sticky', top: '90px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: '700' }}>
                <span>👁️ Live Marketplace Preview</span>
              </h3>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: 'var(--success)',
                  background: 'rgba(34, 197, 94, 0.12)',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-full)',
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--success)' }} />
                REAL-TIME SYNC
              </span>
            </div>

            {/* WYSIWYG GlowCard Preview */}
            <GlowCard glowColor={currentTypeConfig.glow} className="project-card">
              <div className="project-card-header">
                <span className={`badge ${currentTypeConfig.badgeClass}`}>
                  {type === 'giveaway'
                    ? 'FREE GIVEAWAY'
                    : type === 'sell'
                    ? price ? `₹${Number(price || 0).toLocaleString('en-IN')}` : 'PRICE TBD'
                    : type.toUpperCase()}
                </span>
                <span className="project-category">{category}</span>
              </div>

              <h3 className="project-title" style={{ wordBreak: 'break-word' }}>
                {emoji} {title.trim() || 'Your Listing Title Here'}
              </h3>
              
              <p className="project-summary" style={{ minHeight: '42px', wordBreak: 'break-word' }}>
                {description.trim() || 'Your description will appear here as you type. Add condition details to get faster campus inquiries...'}
              </p>

              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                📍 Pickup: {hostel || 'Hostel / Campus location'}
              </div>

              <div className="project-footer">
                <div className="creator-info">
                  <span className="creator-avatar">{currentUser.avatar || '👨‍🎓'}</span>
                  <div className="creator-text">
                    <span className="creator-name">{currentUser.name || 'You'}</span>
                    <span className="creator-meta">{hostel || 'Campus'}</span>
                  </div>
                </div>

                <button type="button" className="btn btn--primary btn--sm" disabled style={{ opacity: 0.85 }}>
                  {type === 'giveaway' ? 'Claim Free →' : 'Get it →'}
                </button>
              </div>
            </GlowCard>

            <p className="text-muted" style={{ fontSize: '12px', marginTop: '12px', textAlign: 'center' }}>
              💡 This card is rendered exactly as it will appear in the <strong>/browse</strong> campus feed.
            </p>
          </div>
        </div>

        {/* POST-PUBLISH SUCCESS MODAL */}
        {posted && (
          <div
            className="modal-backdrop animate-fade-in-up"
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(9, 9, 11, 0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <div
              className="surface"
              style={{
                maxWidth: '480px',
                width: '100%',
                padding: '32px',
                textAlign: 'center',
                border: '1px solid var(--accent-indigo)',
                boxShadow: '0 0 40px rgba(99, 102, 241, 0.3)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎉</div>
              <h2 className="text-heading-md" style={{ marginBottom: '8px' }}>Listing Published Successfully!</h2>
              <p className="text-body" style={{ marginBottom: '24px' }}>
                <strong>"{emoji} {title}"</strong> is now live on the campus marketplace. Students in {hostel} and surrounding hostels can now view and claim it.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={handleResetForm}
                >
                  + List Another Item
                </button>
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => navigate('/browse')}
                >
                  View in Browse Feed →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
