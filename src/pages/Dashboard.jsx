import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { currentUser, projects } from '../data/mockData.js'
import { getRemainingFree, FREE_MATCH_LIMIT } from '../lib/connections.js'
import GlowCard from '../components/GlowCard.jsx'
import './Dashboard.css'

const PROFILE_FIELDS = [
  { key: 'name', label: 'Full Name', weight: 10 },
  { key: 'department', label: 'Department / Major', weight: 10 },
  { key: 'year', label: 'Year of Study', weight: 10 },
  { key: 'hostel', label: 'Campus Hostel', weight: 10 },
  { key: 'bio', label: 'Bio & Pitch', weight: 15 },
  { key: 'skills', label: 'Skills (2+)', weight: 20, check: (u) => u.skills?.length >= 2 },
  { key: 'github', label: 'GitHub Profile', weight: 10 },
  { key: 'linkedin', label: 'LinkedIn Profile', weight: 5 },
  { key: 'verified', label: 'SRM Verification', weight: 10 },
]

function getProfileDetails(user) {
  let score = 0
  const missing = []
  
  PROFILE_FIELDS.forEach((f) => {
    const isComplete = f.check ? f.check(user) : Boolean(user[f.key])
    if (isComplete) {
      score += f.weight
    } else {
      missing.push(f)
    }
  })

  let tier = { title: 'Campus Novice', color: 'var(--text-muted)', icon: '🌱' }
  if (score >= 90) tier = { title: 'Campus Luminary', color: '#60a5fa', icon: '🌟' }
  else if (score >= 75) tier = { title: 'Collaboration Pro', color: '#a855f7', icon: '⚡' }
  else if (score >= 50) tier = { title: 'Verified Scholar', color: '#34d399', icon: '🎓' }

  return { score: Math.min(100, score), missing, tier }
}

function getNextBestAction(user, projectList, profileScore) {
  if (profileScore < 80) {
    return {
      icon: '🪪',
      tag: 'PROFILE OPTIMIZATION',
      title: 'Complete your SRM Student Passport',
      body: `Your profile strength is at ${profileScore}%. Add your missing details to boost your AI Match priority by 3.5x.`,
      cta: 'Complete Profile →',
      path: '/profile',
    }
  }
  const myProjects = projectList.filter((p) => p.creatorId === 'me')
  if (myProjects.length === 0) {
    return {
      icon: '💡',
      tag: 'CAMPUS COLLABORATION',
      title: 'Post your first Hackathon or Startup Project',
      body: 'Recruit complementary frontend, backend, ML, or UI/UX teammates from SRMIST.',
      cta: '+ Post Project →',
      path: '/list',
    }
  }
  const incomplete = myProjects.find((p) => p.currentTeamSize < p.targetTeamSize)
  if (incomplete) {
    return {
      icon: '🧩',
      tag: 'TEAM BUILDER',
      title: `Recruit remaining talent for "${incomplete.title}"`,
      body: `Your project needs ${incomplete.targetTeamSize - incomplete.currentTeamSize} more collaborator(s). Match with active SRM builders now.`,
      cta: 'Run AI Matcher →',
      path: '/matching',
    }
  }
  return {
    icon: '⚡',
    tag: 'EXPLORE FEED',
    title: 'Browse High-Match Campus Opportunities',
    body: 'Your profile is 100% collaboration-ready! Discover fellow student projects looking for your skill stack.',
    cta: 'Explore Projects →',
    path: '/browse',
  }
}

export default function Dashboard() {
  const [user] = useState(currentUser)
  const [timelineFilter, setTimelineFilter] = useState('all')
  const creditsRemaining = getRemainingFree()
  const maxCredits = FREE_MATCH_LIMIT || 5
  
  const { score: strength, missing, tier } = useMemo(() => getProfileDetails(user), [user])
  const action = useMemo(() => getNextBestAction(user, projects, strength), [user, strength])
  const myCollabs = projects.filter((p) => p.creatorId === 'me')

  const timelineEvents = [
    {
      id: 'act-1',
      type: 'match',
      icon: '⚡',
      badge: '94% AI Match',
      badgeType: 'badge--skill',
      title: 'New Teammate Match for PulseKit',
      description: 'Marcus Johnson (UI/UX Designer) matched your design systems requirements.',
      time: '1 hour ago',
      actionLabel: 'View Match',
      actionPath: '/matching',
    },
    {
      id: 'act-2',
      type: 'invite',
      icon: '🚀',
      badge: 'Project Invite',
      badgeType: 'badge--share',
      title: 'Invited to join "AetherAI"',
      description: 'Sarah Chen invited you as Full-Stack Lead for the upcoming hackathon sprint.',
      time: '3 hours ago',
      actionLabel: 'Review Invite',
      actionPath: '/browse',
    },
    {
      id: 'act-3',
      type: 'exchange',
      icon: '📚',
      badge: 'Trade Completed',
      badgeType: 'badge--giveaway',
      title: 'Organic Chemistry Study Guide',
      description: 'Exchange successfully completed with Sarah Chen at SRM Block A.',
      time: 'Yesterday',
      actionLabel: 'View Thread',
      actionPath: '/exchanges',
    },
    {
      id: 'act-4',
      type: 'endorsement',
      icon: '🌟',
      badge: 'Skill Endorsed',
      badgeType: 'badge--sell',
      title: 'React & Next.js Endorsement',
      description: 'David Wang endorsed your Frontend & Distributed Architecture skills.',
      time: '2 days ago',
      actionLabel: 'View Passport',
      actionPath: '/profile',
    },
  ]

  const filteredEvents = timelineFilter === 'all' 
    ? timelineEvents 
    : timelineEvents.filter((ev) => ev.type === timelineFilter)

  return (
    <div className="page dashboard-page">
      <div className="container">
        {/* Header with SRM Verification Banner */}
        <header className="dash-header animate-fade-in-up">
          <div className="dash-user-meta">
            <div className="dash-greeting-row">
              <span className="dash-greeting">Welcome back, {user.name}</span>
              {user.verified && (
                <span className="srm-verified-badge" title="Official SRM Institute Student Verification">
                  <span className="srm-verified-icon">✓</span>
                  <span className="srm-verified-text">SRM Verified Student</span>
                  <span className="srm-verified-dot"></span>
                </span>
              )}
            </div>
            <h1 className="text-heading-lg dash-title">Student Collaboration Hub</h1>
            <p className="text-muted" style={{ fontSize: '13px', marginTop: '2px' }}>
              📍 {user.college || 'SRMIST Chennai'} • {user.department} • {user.hostel}
            </p>
          </div>
          
          <div className="dash-header-actions">
            <Link to="/matching" className="btn btn--primary btn--sm glow">
              ⚡ AI Teammate Matcher
            </Link>
            <Link to="/list" className="btn btn--ghost btn--sm">
              + Post Opportunity
            </Link>
          </div>
        </header>

        {/* Dynamic Next Best Action Banner */}
        <section className="surface dash-action-banner animate-fade-in-up">
          <div className="action-badge-row">
            <span className="action-badge">🎯 {action.tag}</span>
            <span className="tier-pill" style={{ color: tier.color }}>{tier.icon} {tier.title}</span>
          </div>
          <div className="action-body">
            <div className="action-icon">{action.icon}</div>
            <div className="action-info">
              <h3 className="text-heading-md">{action.title}</h3>
              <p className="text-body" style={{ fontSize: '13.5px' }}>{action.body}</p>
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
            {/* Recommended Projects */}
            <section className="dash-section">
              <div className="dash-section-head">
                <div>
                  <h3 className="text-heading-md">Recommended Projects for You</h3>
                  <span className="text-muted" style={{ fontSize: '12px' }}>Matched to your verified skill stack</span>
                </div>
                <Link to="/browse" className="text-muted dash-link-hover" style={{ fontSize: '12px' }}>
                  View all listings →
                </Link>
              </div>

              <div className="dash-cards-list">
                {projects.slice(0, 2).map((p) => (
                  <GlowCard key={p.id} glowColor="blue" className="dash-card">
                    <div className="project-top">
                      <span className="badge badge--giveaway">{p.category}</span>
                      <span className="diff diff--intermediate">{p.difficulty}</span>
                      <span className="badge badge--share" style={{ marginLeft: 'auto' }}>
                        👥 {p.currentTeamSize}/{p.targetTeamSize} Members
                      </span>
                    </div>
                    <h4 className="text-heading-md" style={{ marginTop: '8px' }}>{p.title}</h4>
                    <p className="text-body" style={{ fontSize: '13px', margin: '8px 0 14px' }}>{p.summary}</p>
                    <div className="project-skills">
                      {p.requiredSkills.slice(0, 4).map((s) => (
                        <span key={s} className="skill-tag">{s}</span>
                      ))}
                    </div>
                    <div className="dash-card-foot">
                      <span className="text-muted" style={{ fontSize: '12.5px' }}>
                        Seeking: <strong style={{ color: 'var(--text-primary)' }}>{p.seekingRoles[0]}</strong>
                      </span>
                      <Link to="/browse" className="btn btn--ghost btn--sm">
                        Apply / Connect →
                      </Link>
                    </div>
                  </GlowCard>
                ))}
              </div>
            </section>

            {/* Campus Activity & Collaboration Timeline */}
            <section className="dash-section" style={{ marginTop: '36px' }}>
              <div className="dash-section-head">
                <div>
                  <h3 className="text-heading-md">Campus Activity & Milestone Timeline</h3>
                  <span className="text-muted" style={{ fontSize: '12px' }}>Live updates from your network & project matches</span>
                </div>
                
                {/* Timeline Filters */}
                <div className="timeline-filter-group">
                  {['all', 'match', 'invite', 'exchange'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setTimelineFilter(tab)}
                      className={`timeline-filter-btn ${timelineFilter === tab ? 'active' : ''}`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="activity-timeline-card surface">
                {filteredEvents.length === 0 ? (
                  <div className="timeline-empty">No recent activity in this category.</div>
                ) : (
                  <div className="timeline-stream">
                    {filteredEvents.map((ev, idx) => (
                      <div key={ev.id} className="timeline-item">
                        <div className="timeline-node">
                          <div className="timeline-icon-box">{ev.icon}</div>
                          {idx !== filteredEvents.length - 1 && <div className="timeline-line" />}
                        </div>
                        <div className="timeline-content">
                          <div className="timeline-header-row">
                            <span className={`badge ${ev.badgeType}`}>{ev.badge}</span>
                            <span className="timeline-time">{ev.time}</span>
                          </div>
                          <h4 className="timeline-title">{ev.title}</h4>
                          <p className="timeline-desc">{ev.description}</p>
                          <div className="timeline-foot">
                            <Link to={ev.actionPath} className="timeline-action-link">
                              {ev.actionLabel} →
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Active Projects Managed */}
            <section className="dash-section" style={{ marginTop: '36px' }}>
              <div className="dash-section-head">
                <h3 className="text-heading-md">My Active Collaborations ({myCollabs.length})</h3>
                <Link to="/list" className="text-muted dash-link-hover" style={{ fontSize: '12px' }}>+ New Project</Link>
              </div>
              {myCollabs.length === 0 ? (
                <div className="surface collab-empty-box">
                  No active projects posted yet — <Link to="/list" style={{ color: 'var(--accent-text)', fontWeight: '600' }}>Post a Hackathon/Project Idea →</Link>
                </div>
              ) : (
                myCollabs.map((c) => (
                  <div key={c.id} className="surface collab-card" style={{ padding: '18px 20px', marginBottom: '12px' }}>
                    <div className="active-collab-row">
                      <div className="collab-avatar-badge">🚀</div>
                      <div className="collab-info">
                        <div className="collab-title">{c.title}</div>
                        <div className="text-muted" style={{ fontSize: '12px' }}>
                          Status: <span style={{ color: 'var(--accent-text)' }}>{c.status}</span> • Target: {c.timeline} • Team: {c.currentTeamSize}/{c.targetTeamSize}
                        </div>
                      </div>
                      <Link to="/matching" className="btn btn--ghost btn--sm">
                        Manage Team
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="dash-side">
            {/* Enhanced Profile Strength Widget */}
            <section className="surface side-card">
              <div className="side-card-header">
                <div>
                  <h4 className="side-card-title">🪪 Profile Passport</h4>
                  <span className="side-card-subtitle">{tier.icon} {tier.title}</span>
                </div>
                <span className="strength-percentage" style={{ color: strength >= 80 ? 'var(--success)' : 'var(--accent-text)' }}>
                  {strength}%
                </span>
              </div>

              {/* Multi-segment Progress Bar */}
              <div className="profile-progress-container" role="progressbar" aria-valuenow={strength} aria-valuemin="0" aria-valuemax="100">
                <div 
                  className="profile-progress-fill" 
                  style={{ 
                    width: `${strength}%`,
                    background: strength >= 80 
                      ? 'linear-gradient(90deg, #3b82f6, #10b981)' 
                      : 'linear-gradient(90deg, #6366f1, #a855f7)'
                  }} 
                />
              </div>

              {/* Missing Fields Interactive Checklist */}
              {missing.length > 0 ? (
                <div className="missing-checklist">
                  <div className="missing-title">Boost your match ranking:</div>
                  <div className="missing-chips">
                    {missing.slice(0, 3).map((item) => (
                      <Link key={item.key} to="/profile" className="missing-chip">
                        + Add {item.label} <span className="missing-weight">+{item.weight}%</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="profile-complete-banner">
                  ✓ Profile is 100% optimized for campus matching
                </div>
              )}

              <Link to="/profile" className="btn btn--ghost btn--sm side-full-btn" style={{ marginTop: '16px' }}>
                Edit Student Passport →
              </Link>
            </section>

            {/* Enhanced Student Connection Credit Meter */}
            <section className="surface side-card" style={{ marginTop: '20px' }}>
              <div className="side-card-header">
                <div>
                  <h4 className="side-card-title">⚡ Connection Credits</h4>
                  <span className="side-card-subtitle">Semester Match Allowance</span>
                </div>
                <span className="credits-badge-pill">
                  {creditsRemaining > 0 ? `${creditsRemaining} Left` : 'Depleted'}
                </span>
              </div>

              {/* Segmented Meter Visuals */}
              <div className="credit-meter-box">
                <div className="credit-meter-segments">
                  {Array.from({ length: maxCredits }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`credit-segment ${i < creditsRemaining ? 'credit-segment--active' : 'credit-segment--empty'}`}
                    />
                  ))}
                </div>
                
                <div className="credit-meter-meta">
                  <div className="credits-large-num">
                    {creditsRemaining} <span className="credits-total-denom">/ {maxCredits}</span>
                  </div>
                  <span className="credit-status-tag">
                    {creditsRemaining >= 3 ? '🟢 Healthy' : creditsRemaining >= 1 ? '🟡 Low Quota' : '🔴 Refill Needed'}
                  </span>
                </div>
              </div>

              <div className="credit-perks-list">
                <div className="credit-perk-item">✓ Teammate outreach & direct chats</div>
                <div className="credit-perk-item">✓ Giveaways & resource trades stay 100% free</div>
                <div className="credit-perk-item">🔄 Auto-resets each semester cycle</div>
              </div>

              <Link to="/exchanges" className="btn btn--primary btn--sm side-full-btn" style={{ marginTop: '16px' }}>
                ⚡ Refill / Get Pro Pass
              </Link>
            </section>

            {/* SRM Campus Quick Info */}
            <section className="surface side-card" style={{ marginTop: '20px' }}>
              <h4 className="side-card-title" style={{ marginBottom: '8px' }}>🏛️ SRM Campus Hub</h4>
              <p className="text-muted" style={{ fontSize: '12px', lineHeight: '1.5' }}>
                Connected to <strong>SRM IST Kattankulathur</strong> peer node. Direct hostel delivery and lab meetups active.
              </p>
              <div className="srm-quick-stats">
                <div className="srm-stat-item">
                  <span className="srm-stat-val">1.2k+</span>
                  <span className="srm-stat-lbl">Active Students</span>
                </div>
                <div className="srm-stat-item">
                  <span className="srm-stat-val">98.4%</span>
                  <span className="srm-stat-lbl">Safe Pickups</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
