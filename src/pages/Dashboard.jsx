import { useState } from 'react'
import { Link } from 'react-router-dom'
import { currentUser, projects } from '../data/mockData.js'
import GlowCard from '../components/GlowCard.jsx'
import './Dashboard.css'

function getProfileStrength(user) {
  const fields = [
    user.name,
    user.bio,
    user.skills?.length > 0,
    user.github,
    user.linkedin,
    user.verified,
    user.department,
    user.hostel,
  ]
  const filled = fields.filter(Boolean).length
  return Math.round((filled / fields.length) * 100)
}

function getNextBestAction(user, projectList) {
  const strength = getProfileStrength(user)
  if (strength < 80) {
    return {
      icon: '🪪',
      title: 'Complete your student profile',
      body: `Your profile is ${strength}% complete. Add your ${!user.github ? 'GitHub link' : !user.linkedin ? 'LinkedIn' : 'skills'} to unlock 90%+ match accuracy.`,
      cta: 'Complete Profile →',
      path: '/profile',
    }
  }
  const myProjects = projectList.filter((p) => p.creatorId === 'me')
  if (myProjects.length === 0) {
    return {
      icon: '💡',
      title: 'Post your first campus project',
      body: 'Share your startup or hackathon idea and get matched with complementary teammates.',
      cta: 'Create Project →',
      path: '/list',
    }
  }
  const incomplete = myProjects.find((p) => p.currentTeamSize < p.targetTeamSize)
  if (incomplete) {
    return {
      icon: '🧩',
      title: `Find a teammate for "${incomplete.title}"`,
      body: `Your project needs ${incomplete.targetTeamSize - incomplete.currentTeamSize} more team member. The AI Matcher can recommend candidates.`,
      cta: 'Find Teammates →',
      path: '/matching',
    }
  }
  return {
    icon: '⭐',
    title: 'Browse new campus opportunities',
    body: 'Your profile is ready! Discover projects looking for skills like yours.',
    cta: 'Browse Feed →',
    path: '/browse',
  }
}

export default function Dashboard() {
  const [user] = useState(currentUser)
  const strength = getProfileStrength(user)
  const action = getNextBestAction(user, projects)
  const myCollabs = projects.filter((p) => p.creatorId === 'me')

  return (
    <div className="page">
      <div className="container">
        {/* Header */}
        <header className="dash-header animate-fade-in-up">
          <div>
            <span className="dash-greeting">Welcome back, {user.name} 👋</span>
            <h1 className="text-heading-lg" style={{ marginTop: '2px' }}>Student Collaboration Hub</h1>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Link to="/matching" className="btn btn--primary btn--sm glow">
              ⚡ AI Matcher
            </Link>
            <Link to="/list" className="btn btn--ghost btn--sm">
              + New Project
            </Link>
          </div>
        </header>

        {/* Dynamic Next Best Action Banner */}
        <section className="surface dash-action-banner animate-fade-in-up">
          <div className="action-badge">🎯 NEXT BEST ACTION</div>
          <div className="action-body">
            <div className="action-icon">{action.icon}</div>
            <div className="action-info">
              <h3 className="text-heading-md">{action.title}</h3>
              <p className="text-body" style={{ fontSize: '13px' }}>{action.body}</p>
            </div>
            <Link to={action.path} className="btn btn--primary btn--sm action-btn">
              {action.cta}
            </Link>
          </div>
        </section>

        {/* 2 Column Dashboard Grid */}
        <div className="dash-grid animate-fade-in-up">
          {/* Main Column */}
          <div className="dash-main">
            <section className="dash-section">
              <div className="dash-section-head">
                <h3 className="text-heading-md">Recommended Projects for You</h3>
                <Link to="/browse" className="text-muted" style={{ fontSize: '12px' }}>View all →</Link>
              </div>

              <div className="dash-cards-list">
                {projects.slice(0, 2).map((p) => (
                  <GlowCard key={p.id} glowColor="blue" className="dash-card">
                    <div className="project-top">
                      <span className="badge badge--giveaway">{p.category}</span>
                      <span className="diff diff--intermediate">{p.difficulty}</span>
                    </div>
                    <h4 className="text-heading-md" style={{ marginTop: '8px' }}>{p.title}</h4>
                    <p className="text-body" style={{ fontSize: '13px', margin: '8px 0 14px' }}>{p.summary}</p>
                    <div className="project-skills">
                      {p.requiredSkills.slice(0, 3).map((s) => (
                        <span key={s} className="skill-tag">{s}</span>
                      ))}
                    </div>
                    <div className="dash-card-foot">
                      <span className="text-muted">Seeking: {p.seekingRoles[0]}</span>
                      <Link to="/browse" className="btn btn--ghost btn--sm">Explore →</Link>
                    </div>
                  </GlowCard>
                ))}
              </div>
            </section>

            <section className="dash-section" style={{ marginTop: '32px' }}>
              <div className="dash-section-head">
                <h3 className="text-heading-md">Active Collaborations ({myCollabs.length})</h3>
              </div>
              {myCollabs.length === 0 ? (
                <div className="surface" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No active projects yet — <Link to="/list" style={{ color: 'var(--accent-text)' }}>Create one →</Link>
                </div>
              ) : (
                myCollabs.map((c) => (
                  <div key={c.id} className="surface" style={{ padding: '20px', marginBottom: '12px' }}>
                    <div className="active-collab-row">
                      <span className="collab-avatar">🚀</span>
                      <div className="collab-info">
                        <div className="text-heading-md" style={{ fontSize: '15px' }}>{c.title}</div>
                        <div className="text-muted">Status: {c.status} • Target: {c.timeline}</div>
                      </div>
                      <span className="badge badge--share">Owner</span>
                    </div>
                  </div>
                ))
              )}
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="dash-side">
            <section className="surface side-card">
              <h4 className="text-heading-md" style={{ fontSize: '15px', marginBottom: '12px' }}>🪪 Profile Strength</h4>
              <div className="profile-progress-bar">
                <div className="profile-progress-fill" style={{ width: `${strength}%` }}></div>
              </div>
              <div className="text-muted" style={{ fontSize: '12px', marginTop: '6px', marginBottom: '16px' }}>
                Profile Strength: <strong>{strength}%</strong>
              </div>
              <Link to="/profile" className="btn btn--ghost btn--sm" style={{ width: '100%' }}>
                Edit Profile Settings
              </Link>
            </section>

            <section className="surface side-card" style={{ marginTop: '20px' }}>
              <h4 className="text-heading-md" style={{ fontSize: '15px', marginBottom: '12px' }}>⚡ Connection Credits</h4>
              <div className="credits-display">
                <span className="credits-number">{user.creditsLeft}</span>
                <span className="credits-label">Free Connections Remaining</span>
              </div>
              <div className="text-muted" style={{ fontSize: '12px', marginTop: '10px' }}>
                Resets every semester. Giveaways are always 100% free.
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
