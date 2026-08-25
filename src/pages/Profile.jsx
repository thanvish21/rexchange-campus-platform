import { useState } from 'react'
import { currentUser, allSkills } from '../data/mockData.js'
import GlowCard from '../components/GlowCard.jsx'
import './Profile.css'

const PROFILE_KEY = 'rexchange.profile'

function loadSavedProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return {
    name: currentUser.name,
    avatar: currentUser.avatar,
    hostel: currentUser.hostel,
    department: currentUser.department,
    year: currentUser.year,
    bio: currentUser.bio,
    github: currentUser.github || '',
    linkedin: currentUser.linkedin || '',
    skills: currentUser.skills || [],
    verified: currentUser.verified,
  }
}

export default function Profile() {
  const [profile, setProfile] = useState(loadSavedProfile)
  const [saved, setSaved] = useState(false)

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {}
  }

  const toggleSkill = (skillName) => {
    const exists = profile.skills.some((s) => s.name === skillName)
    let updated
    if (exists) {
      updated = profile.skills.filter((s) => s.name !== skillName)
    } else {
      updated = [...profile.skills, { name: skillName, level: 'intermediate' }]
    }
    setProfile((prev) => ({ ...prev, skills: updated }))
  }

  return (
    <div className="page profile-page">
      <div className="container">
        <header className="page-header animate-fade-in-up">
          <h1 className="page-title">Student Trade Passport & Profile</h1>
          <p className="page-subtitle">Your verified campus identity, skill set, and collaboration fit</p>
        </header>

        <div className="profile-grid">
          {/* Form */}
          <div className="surface profile-form-card animate-fade-in-up" style={{ padding: '28px' }}>
            <h3 className="text-heading-md" style={{ marginBottom: '20px' }}>Edit Student Identity</h3>
            <form onSubmit={handleSave}>
              <div className="form-field">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={profile.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                />
              </div>

              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-field">
                  <label className="form-label">Department</label>
                  <input
                    type="text"
                    className="form-input"
                    value={profile.department}
                    onChange={(e) => handleChange('department', e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Year / Status</label>
                  <input
                    type="text"
                    className="form-input"
                    value={profile.year}
                    onChange={(e) => handleChange('year', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">Hostel / Campus Residence</label>
                <input
                  type="text"
                  className="form-input"
                  value={profile.hostel}
                  onChange={(e) => handleChange('hostel', e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="form-label">Bio & Collaboration Pitch</label>
                <textarea
                  className="form-input form-textarea"
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                />
              </div>

              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-field">
                  <label className="form-label">GitHub URL</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://github.com/handle"
                    value={profile.github}
                    onChange={(e) => handleChange('github', e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">LinkedIn URL</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://linkedin.com/in/handle"
                    value={profile.linkedin}
                    onChange={(e) => handleChange('linkedin', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-field" style={{ marginTop: '20px' }}>
                <label className="form-label">Skills & Capabilities</label>
                <div className="chip-grid" style={{ marginTop: '8px' }}>
                  {allSkills.map((s) => {
                    const active = profile.skills.some((sk) => sk.name === s)
                    return (
                      <button
                        key={s}
                        type="button"
                        className={`wizard-chip ${active ? 'active' : ''}`}
                        onClick={() => toggleSkill(s)}
                      >
                        {active ? '✓ ' : '+ '}{s}
                      </button>
                    )
                  })}
                </div>
              </div>

              <button type="submit" className="btn btn--primary" style={{ width: '100%', marginTop: '24px' }}>
                💾 Save Student Profile
              </button>

              {saved && (
                <div className="save-success" role="status" style={{ marginTop: '12px', textAlign: 'center' }}>
                  ✓ Profile saved! Persistence updated.
                </div>
              )}
            </form>
          </div>

          {/* Preview Passport Card */}
          <div className="profile-preview animate-fade-in-up">
            <GlowCard glowColor="purple" className="passport-card">
              <div className="passport-badge">✓ CAMPUS VERIFIED</div>
              <div className="passport-head">
                <span className="passport-avatar">{profile.avatar}</span>
                <div>
                  <h3 className="passport-name">{profile.name}</h3>
                  <div className="passport-dept">{profile.department} • {profile.year}</div>
                  <div className="passport-hostel">📍 {profile.hostel}</div>
                </div>
              </div>

              <p className="passport-bio">{profile.bio}</p>

              <div className="passport-skills">
                <span className="passport-label">Active Skills:</span>
                <div className="chip-grid" style={{ marginTop: '6px' }}>
                  {profile.skills.map((s) => (
                    <span key={s.name} className="skill-tag">{s.name}</span>
                  ))}
                </div>
              </div>

              {(profile.github || profile.linkedin) && (
                <div className="passport-links" style={{ marginTop: '16px', fontSize: '12px' }}>
                  {profile.github && (
                    <div>🔗 <a href={profile.github} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-text)' }}>{profile.github}</a></div>
                  )}
                  {profile.linkedin && (
                    <div>🔗 <a href={profile.linkedin} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-text)' }}>{profile.linkedin}</a></div>
                  )}
                </div>
              )}
            </GlowCard>
          </div>
        </div>
      </div>
    </div>
  )
}
