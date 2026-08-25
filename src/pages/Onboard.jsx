import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { allSkills, currentUser } from '../data/mockData.js'
import './Profile.css'

export default function Onboard() {
  const [step, setStep] = useState(1)
  const [name, setName] = useState(currentUser.name)
  const [avatar, setAvatar] = useState(currentUser.avatar)
  const [year, setYear] = useState('Junior (3rd Year)')
  const [department, setDepartment] = useState('Computer Science & Engineering')
  const [selectedSkills, setSelectedSkills] = useState(['React & Next.js', 'Python'])
  const navigate = useNavigate()

  const toggleSkill = (s) => {
    setSelectedSkills(
      selectedSkills.includes(s) ? selectedSkills.filter((x) => x !== s) : [...selectedSkills, s]
    )
  }

  const handleFinish = (targetPath) => {
    try {
      const savedProfile = {
        name,
        avatar,
        year,
        department,
        skills: selectedSkills.map((s) => ({ name: s, level: 'intermediate' })),
        verified: true,
      }
      localStorage.setItem('rexchange.profile', JSON.stringify(savedProfile))
      localStorage.setItem('rexchange.onboarded', 'true')
    } catch {}
    navigate(targetPath)
  }

  return (
    <div className="page" style={{ paddingTop: '60px', paddingBottom: '80px' }}>
      <div className="container" style={{ maxWidth: '640px' }}>
        <header className="page-header text-center animate-fade-in-up" style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span className="badge badge--giveaway">STUDENT ACTIVATION WIZARD</span>
          <h1 className="text-heading-lg" style={{ marginTop: '8px' }}>Welcome to RExchange</h1>
          <p className="text-body">Set up your campus identity and start finding collaborators in 60 seconds.</p>
        </header>

        <div className="surface animate-fade-in-up" style={{ padding: '32px' }}>
          {/* Step indicator */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '28px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: step === 1 ? 'var(--accent-text)' : 'var(--text-muted)' }}>1. Identity</span>
            <span style={{ fontSize: '13px', fontWeight: '700', color: step === 2 ? 'var(--accent-text)' : 'var(--text-muted)' }}>2. Skills</span>
            <span style={{ fontSize: '13px', fontWeight: '700', color: step === 3 ? 'var(--accent-text)' : 'var(--text-muted)' }}>3. First Goal</span>
          </div>

          {step === 1 && (
            <div className="onboard-step-1">
              <h3 className="text-heading-md" style={{ marginBottom: '16px' }}>Who are you on campus?</h3>

              <div className="form-field" style={{ marginBottom: '16px' }}>
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-field" style={{ marginBottom: '16px' }}>
                <label className="form-label">Department / Major</label>
                <input
                  type="text"
                  className="form-input"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>

              <div className="form-field" style={{ marginBottom: '24px' }}>
                <label className="form-label">Year of Study</label>
                <select
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

              <button className="btn btn--primary" style={{ width: '100%' }} onClick={() => setStep(2)}>
                Continue to Skills →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="onboard-step-2">
              <h3 className="text-heading-md" style={{ marginBottom: '8px' }}>What skills can you offer or trade?</h3>
              <p className="text-muted" style={{ marginBottom: '20px' }}>Select at least 2 topics you are comfortable with:</p>

              <div className="chip-grid" style={{ marginBottom: '24px' }}>
                {allSkills.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`wizard-chip ${selectedSkills.includes(s) ? 'active' : ''}`}
                    onClick={() => toggleSkill(s)}
                  >
                    {selectedSkills.includes(s) ? '✓ ' : '+ '}{s}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn btn--ghost" onClick={() => setStep(1)}>← Back</button>
                <button
                  className="btn btn--primary"
                  style={{ flex: 1 }}
                  disabled={selectedSkills.length === 0}
                  onClick={() => setStep(3)}
                >
                  Continue to Goal →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="onboard-step-3">
              <h3 className="text-heading-md" style={{ marginBottom: '8px' }}>What would you like to do first?</h3>
              <p className="text-muted" style={{ marginBottom: '20px' }}>Pick your primary focus area:</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                <button
                  className="wizard-option"
                  onClick={() => handleFinish('/browse')}
                >
                  📦 <strong>Browse Campus Resources</strong>
                  <div className="text-muted" style={{ fontSize: '12px' }}>Find textbooks, calculators, notes, and dorm gear</div>
                </button>

                <button
                  className="wizard-option"
                  onClick={() => handleFinish('/matching')}
                >
                  ⚡ <strong>Find Hackathon & Project Teammates</strong>
                  <div className="text-muted" style={{ fontSize: '12px' }}>Match with students having complementary technical skills</div>
                </button>

                <button
                  className="wizard-option"
                  onClick={() => handleFinish('/list')}
                >
                  💡 <strong>Post My Project / Listing</strong>
                  <div className="text-muted" style={{ fontSize: '12px' }}>Recruit collaborators or share textbooks & study guides</div>
                </button>
              </div>

              <button className="btn btn--ghost" onClick={() => setStep(2)}>← Back</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
