import { useState } from 'react'
import { listings, projects, users, categories, userById } from '../data/mockData.js'
import GlowCard from '../components/GlowCard.jsx'
import Icon from '../components/Icon.jsx'
import ItemModal from '../components/ItemModal.jsx'
import ChatModal from '../components/ChatModal.jsx'
import PaymentModal from '../components/PaymentModal.jsx'
import './Projects.css'

export default function Browse() {
  const [activeTab, setActiveTab] = useState('resources') // 'resources' | 'projects' | 'skills'
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeItem, setActiveItem] = useState(null)
  const [activeChat, setActiveChat] = useState(null)
  const [showPayment, setShowPayment] = useState(false)

  // Skills list derived from users mock
  const skillListings = users.flatMap((u) =>
    u.skills.map((s) => ({
      id: `skill-${u.id}-${s.name}`,
      title: `${u.name} can teach / mentor in ${s.name}`,
      user: u,
      skillName: s.name,
      level: s.level,
      category: 'skills',
    }))
  )

  const filteredResources = listings.filter((item) => {
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory
    const matchQ = searchQuery === '' || item.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchQ
  })

  const filteredProjects = projects.filter((proj) => {
    const matchQ = searchQuery === '' || proj.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchQ
  })

  const filteredSkills = skillListings.filter((sk) => {
    const matchQ = searchQuery === '' || sk.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchQ
  })

  return (
    <div className="page browse-page">
      <div className="container">
        {/* Header */}
        <header className="page-header animate-fade-in-up">
          <div className="eyebrow-badge" style={{ display: 'inline-block', marginBottom: '8px' }}>
            CAMPUS DISCOVERY NETWORK
          </div>
          <h1 className="page-title">Explore Campus Value</h1>
          <p className="page-subtitle">
            Find textbooks, calculators, open project positions, or peer skill trades directly on campus
          </p>

          {/* 3-Tab Architecture */}
          <div className="browse-tabs" style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
            <button
              type="button"
              className={`btn ${activeTab === 'resources' ? 'btn--primary' : 'btn--ghost'}`}
              onClick={() => setActiveTab('resources')}
            >
              <Icon name="book" size={14} /> Resources ({listings.length})
            </button>
            <button
              type="button"
              className={`btn ${activeTab === 'projects' ? 'btn--primary' : 'btn--ghost'}`}
              onClick={() => setActiveTab('projects')}
            >
              <Icon name="sparkles" size={14} /> Projects ({projects.length})
            </button>
            <button
              type="button"
              className={`btn ${activeTab === 'skills' ? 'btn--primary' : 'btn--ghost'}`}
              onClick={() => setActiveTab('skills')}
            >
              <Icon name="swap" size={14} /> Skills ({skillListings.length})
            </button>
          </div>
        </header>

        {/* Controls Bar */}
        <div className="browse-controls surface animate-fade-in-up" style={{ padding: '16px', marginBottom: '24px' }}>
          <div className="search-input-wrap">
            <span className="search-icon"><Icon name="search" size={16} /></span>
            <input
              type="text"
              className="search-input"
              placeholder={
                activeTab === 'resources'
                  ? 'Search textbooks, calculators, notes...'
                  : activeTab === 'projects'
                  ? 'Search AI projects, web apps, robotics teams...'
                  : 'Search Figma, Python tutoring, hardware repair...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {activeTab === 'resources' && (
            <div className="categories-pills" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingTop: '12px' }}>
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`filter-btn ${selectedCategory === c.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(c.id)}
                >
                  <span>{c.icon}</span> {c.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* TAB 1: RESOURCES */}
        {activeTab === 'resources' && (
          <div className="projects-grid animate-fade-in-up">
            {filteredResources.map((item) => {
              const seller = userById(item.postedBy)
              return (
                <GlowCard key={item.id} glowColor="purple" className="project-card">
                  <div className="project-card-header">
                    <span className={`badge ${item.listingType === 'giveaway' ? 'badge--giveaway' : 'badge--sell'}`}>
                      {item.listingType === 'giveaway'
                        ? 'FREE GIVEAWAY'
                        : item.price === 0
                        ? 'FREE'
                        : `₹${item.price.toLocaleString('en-IN')}`}
                    </span>
                    <span className="project-category">{item.category}</span>
                  </div>

                  <h3 className="project-title">{item.title}</h3>
                  <p className="project-summary">{item.summary}</p>

                  {item.location && (
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                      📍 Pickup: {item.location}
                    </div>
                  )}

                  <div className="project-footer">
                    <div className="creator-info">
                      <span className="creator-avatar">{seller.avatar}</span>
                      <div className="creator-text">
                        <span className="creator-name">{seller.name}</span>
                        <span className="creator-meta">{seller.hostel}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn btn--primary btn--sm"
                      onClick={() => setActiveItem(item)}
                    >
                      Get it →
                    </button>
                  </div>
                </GlowCard>
              )
            })}
          </div>
        )}

        {/* TAB 2: PROJECTS */}
        {activeTab === 'projects' && (
          <div className="projects-grid animate-fade-in-up">
            {filteredProjects.map((proj) => {
              const creator = userById(proj.creatorId)
              return (
                <GlowCard key={proj.id} glowColor="blue" className="project-card">
                  <div className="project-card-header">
                    <span className="badge badge--share">{proj.category}</span>
                    <span className="project-category">{proj.currentTeamSize} / {proj.targetTeamSize} members</span>
                  </div>

                  <h3 className="project-title">{proj.title}</h3>
                  <p className="project-summary">{proj.summary}</p>

                  <div className="project-skills" style={{ marginBottom: '16px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                      Looking for:
                    </span>
                    {proj.requiredSkills.map((s) => (
                      <span key={s} className="skill-tag">{s}</span>
                    ))}
                  </div>

                  <div className="project-footer">
                    <div className="creator-info">
                      <span className="creator-avatar">{creator.avatar}</span>
                      <div className="creator-text">
                        <span className="creator-name">{creator.name}</span>
                        <span className="creator-meta">Lead</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn btn--primary btn--sm"
                      onClick={() => setActiveChat(creator)}
                    >
                      Join project →
                    </button>
                  </div>
                </GlowCard>
              )
            })}
          </div>
        )}

        {/* TAB 3: SKILLS */}
        {activeTab === 'skills' && (
          <div className="projects-grid animate-fade-in-up">
            {filteredSkills.map((sk) => (
              <GlowCard key={sk.id} glowColor="purple" className="project-card">
                <div className="project-card-header">
                  <span className="badge badge--giveaway">SKILL TRADE</span>
                  <span className="project-category">{sk.level}</span>
                </div>

                <h3 className="project-title">{sk.title}</h3>
                <p className="project-summary">{sk.user.bio}</p>

                <div className="project-footer" style={{ marginTop: '20px' }}>
                  <div className="creator-info">
                    <span className="creator-avatar">{sk.user.avatar}</span>
                    <div className="creator-text">
                      <span className="creator-name">{sk.user.name}</span>
                      <span className="creator-meta">{sk.user.hostel}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn btn--primary btn--sm"
                    onClick={() => setActiveChat(sk.user)}
                  >
                    Connect →
                  </button>
                </div>
              </GlowCard>
            ))}
          </div>
        )}
      </div>

      {activeItem && (
        <ItemModal
          item={activeItem}
          onClose={() => setActiveItem(null)}
          onInitiateChat={(seller) => setActiveChat(seller)}
          onShowPayment={() => setShowPayment(true)}
        />
      )}

      {activeChat && (
        <ChatModal
          seller={activeChat}
          onClose={() => setActiveChat(null)}
        />
      )}

      {showPayment && (
        <PaymentModal
          isOpen={showPayment}
          onClose={() => setShowPayment(false)}
        />
      )}
    </div>
  )
}
