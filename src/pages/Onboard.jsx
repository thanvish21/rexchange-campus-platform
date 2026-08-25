import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { allSkills, currentUser } from '../data/mockData.js'
import { sounds } from '../utils/audio.js'
import './Profile.css'

const AVATAR_OPTIONS = ['👨‍💻', '👩‍💻', '👨‍🎨', '👩‍🔬', '🚀', '⚡', '💡', '🤖', '🎧', '🛠️']

const SKILL_CATEGORIES = {
  All: allSkills,
  'Dev & Tech': ['React & Next.js', 'Python', 'Node.js', 'C++', 'System Design', 'TypeScript', 'Docker & DevOps'],
  'AI & Data': ['PyTorch & ML', 'Data Pipeline', 'Computer Vision', 'NLP', 'SQL & Databases'],
  'Design & Creative': ['Figma UI/UX', 'Design Systems', '3D Modeling & Blender', 'Video Editing', 'Graphic Design'],
  'Hardware & Core': ['Hardware & ROS', 'Arduino & ESP32', 'Embedded C', 'PCB Design', 'MATLAB & Simulation'],
}

const STEPS = [
  { id: 1, title: 'Identity', desc: 'Who are you on campus?' },
  { id: 2, title: 'Skills', desc: 'What can you trade or teach?' },
  { id: 3, title: 'First Goal', desc: 'What brings you to RExchange?' },
]

export default function Onboard() {
  const [step, setStep] = useState(1)
  const [name, setName] = useState(currentUser.name || '')
  const [avatar, setAvatar] = useState(currentUser.avatar || '👨‍💻')
  const [year, setYear] = useState('Junior (3rd Year)')
  const [department, setDepartment] = useState('Computer Science & Engineering')
  const [selectedSkills, setSelectedSkills] = useState(['React & Next.js', 'Python'])
  const [activeCategory, setActiveCategory] = useState('All')
  const [skillSearch, setSkillSearch] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const toggleSkill = (s) => {
    sounds.playPop()
    setSelectedSkills((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    )
    if (errors.skills) {
      setErrors((prev) => ({ ...prev, skills: null }))
    }
  }

  const validateStep1 = () => {
    const errs = {}
    if (!name.trim() || name.trim().length < 2) {
      errs.name = 'Please enter your full name (minimum 2 characters).'
    }
    if (!department.trim()) {
      errs.department = 'Please specify your department / major.'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const validateStep2 = () => {
    const errs = {}
    if (selectedSkills.length < 2) {
      errs.skills = `Please select at least 2 skills (${selectedSkills.length}/2 currently selected).`
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNextFromStep1 = (e) => {
    e?.preventDefault()
    if (validateStep1()) {
      sounds.playSnap()
      setStep(2)
    }
  }

  const handleNextFromStep2 = (e) => {
    e?.preventDefault()
    if (validateStep2()) {
      sounds.playSnap()
      setStep(3)
    }
  }

  const handleFinish = (targetPath) => {
    sounds.playCelebration()
    try {
      const savedProfile = {
        name: name.trim(),
        avatar,
        year,
        department: department.trim(),
        skills: selectedSkills.map((s) => ({ name: s, level: 'intermediate' })),
        verified: true,
      }
      localStorage.setItem('rexchange.profile', JSON.stringify(savedProfile))
      localStorage.setItem('rexchange.onboarded', 'true')
    } catch (err) {
      console.error('Failed to save profile:', err)
    }
    navigate(targetPath)
  }

  const filteredSkills = useMemo(() => {
    const baseList = SKILL_CATEGORIES[activeCategory] || allSkills
    if (!skillSearch.trim()) return baseList
    return baseList.filter((s) => s.toLowerCase().includes(skillSearch.toLowerCase().trim()))
  }, [activeCategory, skillSearch])

  return (
    <div className="page" style={{ paddingTop: '60px', paddingBottom: '80px' }}>
      <div className="container" style={{ maxWidth: '720px' }}>
        {/* Header */}
        <header className="page-header text-center animate-fade-in-up" style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span className="badge badge--giveaway" style={{ letterSpacing: '0.08em', padding: '6px 14px' }}>
            STUDENT ACTIVATION WIZARD
          </span>
          <h1 className="text-heading-lg" style={{ marginTop: '12px', marginBottom: '8px' }}>
            Welcome to RExchange
          </h1>
          <p className="text-body">
            Set up your verified campus identity and unlock peer resource trading in under 60 seconds.
          </p>
        </header>

        <div className="surface wizard-surface animate-fade-in-up" style={{ padding: '32px', borderRadius: 'var(--radius-lg)' }}>
          {/* STEP PROGRESS METER */}
          <div className="onboard-progress-container" style={{ marginBottom: '32px' }}>
            <div
              className="onboard-progress-track"
              style={{
                height: '6px',
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-full)',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: '20px',
              }}
              role="progressbar"
              aria-valuenow={(step / 3) * 100}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                className="onboard-progress-fill"
                style={{
                  width: `${(step / 3) * 100}%`,
                  height: '100%',
                  background: 'var(--accent-gradient)',
                  transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 0 12px rgba(99, 102, 241, 0.6)',
                }}
              />
            </div>

            <div className="onboard-steps-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {STEPS.map((s) => {
                const isCurrent = step === s.id
                const isDone = step > s.id
                return (
                  <button
                    key={s.id}
                    type="button"
                    className={`step-indicator-btn ${isCurrent ? 'active' : ''} ${isDone ? 'done' : ''}`}
                    onClick={() => isDone && setStep(s.id)}
                    disabled={!isDone && !isCurrent}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      background: isCurrent ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                      border: isCurrent ? '1px solid var(--accent-indigo)' : '1px solid transparent',
                      cursor: isDone ? 'pointer' : 'default',
                      textAlign: 'left',
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    <span
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontWeight: '700',
                        flexShrink: 0,
                        background: isDone
                          ? 'var(--success)'
                          : isCurrent
                          ? 'var(--accent-gradient)'
                          : 'var(--bg-subtle)',
                        color: isDone || isCurrent ? '#fff' : 'var(--text-muted)',
                      }}
                    >
                      {isDone ? '✓' : s.id}
                    </span>
                    <div style={{ minWidth: 0, overflow: 'hidden' }}>
                      <div
                        style={{
                          fontSize: '12px',
                          fontWeight: '700',
                          color: isCurrent ? 'var(--text-primary)' : isDone ? 'var(--text-secondary)' : 'var(--text-muted)',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {s.title}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* STEP 1: IDENTITY */}
          {step === 1 && (
            <div className="onboard-step-1 animate-fade-in-up">
              <div style={{ marginBottom: '20px' }}>
                <h3 className="text-heading-md" style={{ marginBottom: '4px' }}>Who are you on campus?</h3>
                <p className="text-muted">Set up your student identity to match with study groups and trade gear.</p>
              </div>

              {/* Avatar Selector */}
              <div className="form-field" style={{ marginBottom: '20px' }}>
                <label className="form-label">Pick Your Avatar</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {AVATAR_OPTIONS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => { sounds.playPop(); setAvatar(a) }}
                      className={`avatar-chip ${avatar === a ? 'avatar-chip--active' : ''}`}
                      style={{
                        fontSize: '22px',
                        width: '44px',
                        height: '44px',
                        borderRadius: 'var(--radius-md)',
                        background: avatar === a ? 'rgba(99, 102, 241, 0.2)' : 'var(--bg-primary)',
                        border: avatar === a ? '2px solid var(--accent-indigo)' : '1px solid var(--border-primary)',
                        transform: avatar === a ? 'scale(1.08)' : 'scale(1)',
                        boxShadow: avatar === a ? '0 0 14px rgba(99, 102, 241, 0.4)' : 'none',
                        transition: 'all var(--transition-fast)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-field" style={{ marginBottom: '16px' }}>
                <label className="form-label" htmlFor="onboard-name">Full Name *</label>
                <input
                  id="onboard-name"
                  type="text"
                  className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    if (errors.name) setErrors((prev) => ({ ...prev, name: null }))
                  }}
                  placeholder="e.g. Alex Chen"
                  autoFocus
                />
                {errors.name && <p className="form-field-error" style={{ color: 'var(--error)', fontSize: '12px', marginTop: '6px' }}>{errors.name}</p>}
              </div>

              <div className="form-field" style={{ marginBottom: '16px' }}>
                <label className="form-label" htmlFor="onboard-dept">Department / Major *</label>
                <input
                  id="onboard-dept"
                  type="text"
                  className={`form-input ${errors.department ? 'form-input--error' : ''}`}
                  value={department}
                  onChange={(e) => {
                    setDepartment(e.target.value)
                    if (errors.department) setErrors((prev) => ({ ...prev, department: null }))
                  }}
                  placeholder="e.g. Computer Science & Engineering"
                />
                {errors.department && <p className="form-field-error" style={{ color: 'var(--error)', fontSize: '12px', marginTop: '6px' }}>{errors.department}</p>}
              </div>

              <div className="form-field" style={{ marginBottom: '24px' }}>
                <label className="form-label" htmlFor="onboard-year">Year of Study</label>
                <select
                  id="onboard-year"
                  className="form-input"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option>Freshman (1st Year)</option>
                  <option>Sophomore (2nd Year)</option>
                  <option>Junior (3rd Year)</option>
                  <option>Senior (4th Year)</option>
                  <option>Postgraduate / PhD</option>
                </select>
              </div>

              {/* Instant Mini Identity Preview */}
              <div style={{ marginBottom: '24px', padding: '16px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <span className="mono" style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  Live Campus ID Preview
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '32px' }}>{avatar}</span>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '15px' }}>{name || 'Your Name'}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {department || 'Your Department'} • {year}
                    </div>
                  </div>
                  <span className="badge badge--giveaway" style={{ marginLeft: 'auto', fontSize: '10px' }}>
                    VERIFIED
                  </span>
                </div>
              </div>

              <button className="btn btn--primary" style={{ width: '100%' }} onClick={handleNextFromStep1}>
                Continue to Skills →
              </button>
            </div>
          )}

          {/* STEP 2: SKILLS */}
          {step === 2 && (
            <div className="onboard-step-2 animate-fade-in-up">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 className="text-heading-md" style={{ marginBottom: '4px' }}>What skills can you offer or trade?</h3>
                  <p className="text-muted">Select at least 2 technical or creative abilities you bring to teams.</p>
                </div>
                <span
                  className="badge"
                  style={{
                    background: selectedSkills.length >= 2 ? 'rgba(34, 197, 94, 0.15)' : 'rgba(234, 179, 8, 0.15)',
                    color: selectedSkills.length >= 2 ? '#4ade80' : '#facc15',
                    border: selectedSkills.length >= 2 ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(234, 179, 8, 0.3)',
                    fontSize: '12px',
                    padding: '4px 10px',
                  }}
                >
                  {selectedSkills.length} of 2 required selected
                </span>
              </div>

              {errors.skills && (
                <div className="form-error-banner" style={{ padding: '10px 14px', borderRadius: 'var(--radius-md)', background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', color: 'var(--error)', fontSize: '13px', marginBottom: '16px' }}>
                  ⚠️ {errors.skills}
                </div>
              )}

              {/* Category Filter Pills & Search */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', overflowX: 'auto', paddingBottom: '4px' }}>
                {Object.keys(SKILL_CATEGORIES).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => { sounds.playPop(); setActiveCategory(cat) }}
                    className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                    style={{ padding: '6px 12px', fontSize: '12px', minHeight: '32px', whiteSpace: 'nowrap' }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div style={{ position: 'relative', marginBottom: '16px' }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Filter skills by keyword..."
                  value={skillSearch}
                  onChange={(e) => setSkillSearch(e.target.value)}
                  style={{ paddingLeft: '14px', fontSize: '13px', minHeight: '38px' }}
                />
              </div>

              {/* Skill Chips Grid */}
              <div className="chip-grid" style={{ marginBottom: '24px', maxHeight: '220px', overflowY: 'auto', padding: '4px' }}>
                {filteredSkills.map((s) => {
                  const isSelected = selectedSkills.includes(s)
                  return (
                    <button
                      key={s}
                      type="button"
                      className={`wizard-chip ${isSelected ? 'active' : ''}`}
                      onClick={() => toggleSkill(s)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '13px',
                        fontWeight: '500',
                        background: isSelected ? 'rgba(99, 102, 241, 0.18)' : 'var(--bg-subtle)',
                        border: isSelected ? '1px solid var(--accent-indigo)' : '1px solid var(--border-subtle)',
                        color: isSelected ? '#c7d2fe' : 'var(--text-secondary)',
                        boxShadow: isSelected ? '0 0 12px rgba(99, 102, 241, 0.25)' : 'none',
                        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                        transition: 'all var(--transition-fast)',
                        cursor: 'pointer',
                      }}
                    >
                      {isSelected ? '✓ ' : '+ '}{s}
                    </button>
                  )
                })}
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" className="btn btn--ghost" onClick={() => setStep(1)}>
                  ← Back
                </button>
                <button
                  type="button"
                  className="btn btn--primary"
                  style={{ flex: 1 }}
                  onClick={handleNextFromStep2}
                >
                  Continue to Goal ({selectedSkills.length} selected) →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: FIRST GOAL */}
          {step === 3 && (
            <div className="onboard-step-3 animate-fade-in-up">
              <h3 className="text-heading-md" style={{ marginBottom: '8px' }}>What would you like to do first?</h3>
              <p className="text-muted" style={{ marginBottom: '20px' }}>Pick your primary focus area to land directly on the relevant hub:</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                <button
                  type="button"
                  className="wizard-option surface--interactive"
                  onClick={() => handleFinish('/browse')}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-primary)',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: '700', marginBottom: '4px' }}>
                    <span>📦</span> Browse Campus Resources
                  </div>
                  <div className="text-muted" style={{ fontSize: '12.5px' }}>
                    Find textbooks, calculators, notes, lab gear, and dorm essentials with zero platform fees.
                  </div>
                </button>

                <button
                  type="button"
                  className="wizard-option surface--interactive"
                  onClick={() => handleFinish('/matching')}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-primary)',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: '700', marginBottom: '4px' }}>
                    <span>⚡</span> Find Hackathon & Project Teammates
                  </div>
                  <div className="text-muted" style={{ fontSize: '12.5px' }}>
                    Use the AI compatibility engine to find partners with complementary technical skills.
                  </div>
                </button>

                <button
                  type="button"
                  className="wizard-option surface--interactive"
                  onClick={() => handleFinish('/list')}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-primary)',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: '700', marginBottom: '4px' }}>
                    <span>💡</span> Post My First Listing / Skill
                  </div>
                  <div className="text-muted" style={{ fontSize: '12.5px' }}>
                    List a textbook, offer tutoring or dev assistance, and start earning campus exchange credits.
                  </div>
                </button>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" className="btn btn--ghost" onClick={() => setStep(2)}>
                  ← Back to Skills
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
