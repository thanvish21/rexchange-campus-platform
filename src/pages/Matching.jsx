import { useState } from 'react'
import { users } from '../data/mockData.js'
import { rankCandidates } from '../lib/matchingAlgorithm.js'
import GlowCard from '../components/GlowCard.jsx'
import Icon from '../components/Icon.jsx'
import './Matching.css'

const STEPS = [
  { id: 'skills', title: '1. Select Your Core Skills', sub: 'What technologies or abilities do you bring?' },
  { id: 'interests', title: '2. Project Interests', sub: 'What domains excite you most?' },
  { id: 'experience', title: '3. Experience Level', sub: 'How experienced are you with these tools?' },
  { id: 'availability', title: '4. Weekly Commitment', sub: 'How many hours per week can you contribute?' },
  { id: 'goals', title: '5. Collaboration Goal', sub: 'What is your primary target?' },
]

const SKILL_OPTIONS = ['React & Next.js', 'Python', 'PyTorch & ML', 'Figma UI/UX', 'Node.js', 'C++', 'System Design', 'Hardware & ROS']
const DOMAIN_OPTIONS = ['AI / Machine Learning', 'Web SaaS', 'Mobile Apps', 'Robotics & Hardware', 'Open Source', 'EdTech']
const EXP_OPTIONS = ['Beginner (Learning)', 'Intermediate (Built Projects)', 'Advanced / Expert']
const TIME_OPTIONS = ['5–10 hrs/week', '10–15 hrs/week', '15+ hrs/week (Full Hackathon Mode)']
const GOAL_OPTIONS = ['Win a Hackathon', 'Build a Campus Startup', 'Course / Lab Project', 'Skill Trade & Learning']

export default function Matching() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedSkills, setSelectedSkills] = useState(['React & Next.js', 'Python'])
  const [selectedDomains, setSelectedDomains] = useState(['AI / Machine Learning', 'Web SaaS'])
  const [selectedExp, setSelectedExp] = useState('Intermediate (Built Projects)')
  const [selectedTime, setSelectedTime] = useState('10–15 hrs/week')
  const [selectedGoal, setSelectedGoal] = useState('Win a Hackathon')
  const [matched, setMatched] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [rankedUsers, setRankedUsers] = useState([])
  const [invitedId, setInvitedId] = useState(null)

  const toggleSkill = (s) => {
    setSelectedSkills(
      selectedSkills.includes(s) ? selectedSkills.filter((x) => x !== s) : [...selectedSkills, s]
    )
  }

  const toggleDomain = (d) => {
    setSelectedDomains(
      selectedDomains.includes(d) ? selectedDomains.filter((x) => x !== d) : [...selectedDomains, d]
    )
  }

  const handleRunMatch = () => {
    setAnalyzing(true)
    setTimeout(() => {
      const ranked = rankCandidates(users, {
        selectedSkills,
        selectedDomains,
        selectedTime,
        selectedGoal,
      })
      setRankedUsers(ranked)
      setAnalyzing(false)
      setMatched(true)
    }, 1000)
  }

  const handleInvite = (id) => {
    setInvitedId(id)
    setTimeout(() => setInvitedId(null), 4000)
  }

  return (
    <div className="page matching-page">
      <div className="container" style={{ maxWidth: '900px' }}>
        <header className="page-header text-center animate-fade-in-up" style={{ textAlign: 'center' }}>
          <div className="eyebrow-badge" style={{ display: 'inline-block', marginBottom: '8px' }}>
            ALGORITHMIC TEAM COMPOSITION
          </div>
          <h1 className="page-title">AI Teammate Compatibility Engine</h1>
          <p className="page-subtitle">
            Match with campus partners based on complementary skill gaps and shared project goals
          </p>
        </header>

        {!matched ? (
          <div className="surface wizard-card animate-fade-in-up" style={{ padding: '32px' }}>
            {/* Step indicators */}
            <div className="wizard-progress" style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>
              {STEPS.map((s, i) => (
                <div
                  key={s.id}
                  className={`progress-step ${i === currentStep ? 'active' : i < currentStep ? 'completed' : ''}`}
                  onClick={() => setCurrentStep(i)}
                  style={{ flex: 1, height: '4px', background: i <= currentStep ? 'var(--accent-indigo)' : 'var(--border-subtle)', borderRadius: '2px', cursor: 'pointer' }}
                />
              ))}
            </div>

            <div className="step-content">
              <h2 className="text-heading-md" style={{ marginBottom: '4px' }}>{STEPS[currentStep].title}</h2>
              <p className="text-muted" style={{ marginBottom: '24px' }}>{STEPS[currentStep].sub}</p>

              {currentStep === 0 && (
                <div className="chip-grid">
                  {SKILL_OPTIONS.map((s) => (
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
              )}

              {currentStep === 1 && (
                <div className="chip-grid">
                  {DOMAIN_OPTIONS.map((d) => (
                    <button
                      key={d}
                      type="button"
                      className={`wizard-chip ${selectedDomains.includes(d) ? 'active' : ''}`}
                      onClick={() => toggleDomain(d)}
                    >
                      {selectedDomains.includes(d) ? '✓ ' : '+ '}{d}
                    </button>
                  ))}
                </div>
              )}

              {currentStep === 2 && (
                <div className="options-stack">
                  {EXP_OPTIONS.map((e) => (
                    <button
                      key={e}
                      type="button"
                      className={`wizard-option ${selectedExp === e ? 'active' : ''}`}
                      onClick={() => setSelectedExp(e)}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              )}

              {currentStep === 3 && (
                <div className="options-stack">
                  {TIME_OPTIONS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={`wizard-option ${selectedTime === t ? 'active' : ''}`}
                      onClick={() => setSelectedTime(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}

              {currentStep === 4 && (
                <div className="options-stack">
                  {GOAL_OPTIONS.map((g) => (
                    <button
                      key={g}
                      type="button"
                      className={`wizard-option ${selectedGoal === g ? 'active' : ''}`}
                      onClick={() => setSelectedGoal(g)}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="wizard-actions" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
              {currentStep > 0 ? (
                <button className="btn btn--ghost" onClick={() => setCurrentStep(currentStep - 1)}>
                  ← Back
                </button>
              ) : <div />}

              {currentStep < STEPS.length - 1 ? (
                <button className="btn btn--primary" onClick={() => setCurrentStep(currentStep + 1)}>
                  Next Step →
                </button>
              ) : (
                <button className="btn btn--primary glow" onClick={handleRunMatch} disabled={analyzing}>
                  {analyzing ? '⚙️ Computing Team Matrices...' : '⚡ Generate Teammate Matches'}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="match-results-stack animate-fade-in-up">
            <div className="results-header surface" style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <span className="badge badge--giveaway">MATCHING ALGORITHM COMPLETE</span>
                <h2 className="text-heading-md" style={{ marginTop: '6px' }}>Top Recommended Teammates & Matrix</h2>
              </div>
              <button className="btn btn--ghost btn--sm" onClick={() => setMatched(false)}>
                🔄 Adjust Preferences
              </button>
            </div>

            {/* Team Composition Matrix Visualization */}
            <div className="surface team-matrix-card" style={{ padding: '24px', marginBottom: '24px' }}>
              <h3 className="text-heading-md" style={{ marginBottom: '8px' }}>🧩 Visual Team Composition Matrix</h3>
              <p className="text-muted" style={{ marginBottom: '16px' }}>Analyzing skill coverage for your current project setup:</p>

              <div className="matrix-grid">
                <div className="matrix-cell ok">
                  <span className="matrix-role">Frontend / Web</span>
                  <span className="matrix-status">✓ You ({selectedSkills[0] || 'React'})</span>
                </div>
                <div className="matrix-cell ok">
                  <span className="matrix-role">Machine Learning</span>
                  <span className="matrix-status">✓ Sarah Chen (PyTorch)</span>
                </div>
                <div className="matrix-cell gap">
                  <span className="matrix-role">UI/UX Design</span>
                  <span className="matrix-status">⚠️ Missing Capability</span>
                </div>
                <div className="matrix-cell recommended">
                  <span className="matrix-role">Recommended Pick</span>
                  <span className="matrix-status">Marcus Johnson (Figma)</span>
                </div>
              </div>

              <div className="matrix-tip" style={{ marginTop: '16px', fontSize: '13px', background: 'var(--accent-subtle)', border: '1px solid var(--border-accent)', padding: '12px 16px', borderRadius: 'var(--radius-sm)' }}>
                <strong>💡 Team Composition Tip:</strong> Adding <strong>Marcus Johnson (UI/UX)</strong> completes your team spectrum and boosts overall compatibility to 96%.
              </div>
            </div>

            {/* Recommended Teammates List */}
            <div className="match-cards-grid" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {(rankedUsers.length > 0 ? rankedUsers : users).slice(0, 3).map((u) => {
                const score = u.matchScore || 92
                return (
                  <GlowCard key={u.id} glowColor="purple" className="match-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <div className="match-user-head" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <span className="match-avatar" style={{ fontSize: '28px' }}>{u.avatar}</span>
                        <div>
                          <h4 className="match-name" style={{ fontSize: '17px', fontWeight: '700' }}>{u.name}</h4>
                          <div className="match-sub" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{u.department} • {u.year}</div>
                        </div>
                      </div>
                      <div className="badge badge--giveaway" style={{ fontSize: '14px', fontWeight: '700' }}>
                        {score}% Compatibility
                      </div>
                    </div>

                    <p className="match-bio" style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '16px' }}>{u.bio}</p>

                    <div className="match-breakdown surface" style={{ padding: '14px', marginBottom: '16px', fontSize: '12.5px' }}>
                      <div style={{ fontWeight: '700', marginBottom: '6px', color: 'var(--accent-text)' }}>
                        Why this match?
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        <span><Icon name="check" size={13} color="var(--success)" /> {selectedSkills[0] || 'React'} ✓</span>
                        <span><Icon name="check" size={13} color="var(--success)" /> {selectedSkills[1] || 'Python'} ✓</span>
                        <span><Icon name="check" size={13} color="var(--success)" /> {selectedDomains[0] || 'AI Tools'} ✓</span>
                        <span><Icon name="check" size={13} color="var(--success)" /> {selectedTime} ✓</span>
                      </div>
                    </div>

                    {invitedId === u.id ? (
                      <div className="save-success" role="status" style={{ textAlign: 'center', padding: '10px' }}>
                        ✓ Invitation sent to {u.name}!
                      </div>
                    ) : (
                      <button
                        className="btn btn--primary btn--sm"
                        style={{ width: '100%' }}
                        onClick={() => handleInvite(u.id)}
                      >
                        Send Teammate Invite →
                      </button>
                    )}
                  </GlowCard>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
