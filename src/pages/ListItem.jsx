import { useState } from 'react'
import GlowCard from '../components/GlowCard.jsx'
import './Profile.css'

const CATEGORIES = ['Textbooks', 'Electronics', 'Tickets', 'Notes', 'Skills', 'Dorm Essentials']
const TYPES = [
  { id: 'sell', label: '💰 Sell', desc: 'Set a price in ₹' },
  { id: 'giveaway', label: '🎁 Give Away', desc: 'Free for any student' },
  { id: 'share', label: '📝 Share', desc: 'Notes & study material' },
  { id: 'skill', label: '🤝 Offer a Skill', desc: 'Teach, fix, or trade' },
]

const EMOJI_OPTIONS = ['📚', '💻', '🎟️', '📝', '🤝', '🛏️', '🎧', '🎸', '👟']

export default function ListItem() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Textbooks')
  const [type, setType] = useState('sell')
  const [price, setPrice] = useState('500')
  const [description, setDescription] = useState('')
  const [hostel, setHostel] = useState('Block A Hostel')
  const [emoji, setEmoji] = useState('📚')
  const [posted, setPosted] = useState(false)

  const handlePost = (e) => {
    e.preventDefault()
    setPosted(true)
    setTimeout(() => setPosted(false), 4000)
  }

  return (
    <div className="page">
      <div className="container">
        <header className="page-header animate-fade-in-up">
          <h1 className="page-title">List a Resource or Skill</h1>
          <p className="page-subtitle">Post it once. Over 1,200+ students across campus see it instantly.</p>
        </header>

        <div className="two-col">
          <form className="card animate-fade-in-up" style={{ animationDelay: '80ms' }} onSubmit={handlePost}>
            <div className="form-field">
              <label htmlFor="item-title" className="form-label">What are you listing? *</label>
              <input
                id="item-title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. TI-84 Plus Calculator / DSA Master Notes"
                className="form-input"
              />
            </div>

            <div className="form-field">
              <span className="form-label">Category</span>
              <div className="chip-row">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`chip ${category === c ? 'chip--active' : ''}`}
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-field">
              <span className="form-label">Select Icon / Emoji</span>
              <div className="chip-row">
                {EMOJI_OPTIONS.map((e) => (
                  <button
                    key={e}
                    type="button"
                    className={`chip ${emoji === e ? 'chip--active' : ''}`}
                    onClick={() => setEmoji(e)}
                    style={{ fontSize: '18px', padding: '6px 12px' }}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-field">
              <span className="form-label">Listing Type</span>
              <div className="type-grid">
                {TYPES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`type-card ${type === t.id ? 'type-card--active' : ''}`}
                    onClick={() => setType(t.id)}
                  >
                    <div className="type-card-label">{t.label}</div>
                    <div className="type-card-desc">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {type === 'sell' && (
              <div className="form-field">
                <label htmlFor="item-price" className="form-label">Price (₹)</label>
                <input
                  id="item-price"
                  type="number"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 500"
                  className="form-input"
                />
              </div>
            )}

            <div className="form-field">
              <label htmlFor="item-hostel" className="form-label">Campus Pickup Spot / Hostel</label>
              <input
                id="item-hostel"
                type="text"
                value={hostel}
                onChange={(e) => setHostel(e.target.value)}
                placeholder="e.g. Block A Lobby, Library Lawn, Room 204"
                className="form-input"
              />
            </div>

            <div className="form-field">
              <label htmlFor="item-desc" className="form-label">Description</label>
              <textarea
                id="item-desc"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Condition, included accessories, pickup details..."
                className="form-input form-textarea"
              />
            </div>

            <button type="submit" className="btn btn--primary save-btn">
              {posted ? '✓ Live on Campus!' : '🚀 Publish Listing'}
            </button>

            {posted && (
              <div className="save-success" role="status" style={{ marginTop: '12px' }}>
                🎉 Listing published! Students can now find it in Browse.
              </div>
            )}
          </form>

          {/* Live Preview Column */}
          <div className="animate-fade-in-up" style={{ animationDelay: '160ms' }}>
            <h3 className="card-title" style={{ marginBottom: '12px' }}>👁️ Live Preview</h3>
            <GlowCard glowColor={type === 'giveaway' ? 'green' : 'purple'}>
              <div className="project-top">
                <span className={`badge badge--${type}`}>{type.toUpperCase()}</span>
                <span className="diff diff--intermediate">Just now</span>
              </div>

              <h3 className="project-title">{emoji} {title || 'Your Listing Title Here'}</h3>
              <p className="project-desc">{description || 'Your description will appear here as you type...'}</p>

              <div className="project-skills">
                <span className="skill-tag">🧑‍🎓 You</span>
                <span className="skill-tag">📍 {hostel}</span>
                <span className="skill-tag">★ 5.0</span>
              </div>

              <div className="project-bottom">
                <div className="project-meta">
                  {type === 'giveaway' || price === '0' ? (
                    <span className="price price--free">FREE GIVEAWAY</span>
                  ) : (
                    <span className="price">₹{Number(price || 0).toLocaleString('en-IN')}</span>
                  )}
                </div>
                <button className="btn btn--primary btn--sm" disabled>
                  Preview Button
                </button>
              </div>
            </GlowCard>
          </div>
        </div>
      </div>
    </div>
  )
}

