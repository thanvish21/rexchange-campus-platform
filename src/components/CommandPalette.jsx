import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { projects, users } from '../data/mockData.js'
import './CommandPalette.css'

export default function CommandPalette({ isOpen, onClose, onSelectProject }) {
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const navigate = useNavigate()
  const inputRef = useRef(null)

  // Reset query when palette opens
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setActiveIdx(0)
      // Focus input after mount
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const filteredProjects = query
    ? projects.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          (p.tags || []).some((t) => t.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 6)
    : projects.slice(0, 4)

  const filteredStudents = query
    ? users.filter(
        (u) =>
          u.name.toLowerCase().includes(query.toLowerCase()) ||
          (u.skills || []).some((s) => s.name.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 4)
    : users.slice(0, 3)

  const NAV_COMMANDS = [
    { path: '/dashboard', icon: '📊', title: 'Go to Student Dashboard', meta: 'View active projects, applications & Next Best Action' },
    { path: '/matching', icon: '⚡', title: 'Launch AI Team Compatibility Matcher', meta: 'Find teammates with complementary skills' },
    { path: '/list', icon: '➕', title: 'Create a Project or Resource Listing', meta: 'Recruit teammates or share campus materials' },
    { path: '/profile', icon: '🪪', title: 'Edit Campus Trade Passport', meta: 'Skills, avatar, hostel & verification' },
  ]

  const handleProjectClick = (proj) => {
    onClose()
    if (onSelectProject) onSelectProject(proj)
    else navigate('/browse')
  }

  const handleNav = (path) => {
    onClose()
    navigate(path)
  }

  const showProjects = filteredProjects.length > 0
  const showStudents = filteredStudents.length > 0
  const showEmpty = !showProjects && !showStudents

  return (
    <div className="cmd-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Command palette">
      <div className="cmd-modal glass-panel animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-search-bar">
          <span className="cmd-search-icon" aria-hidden="true">🔍</span>
          <input
            ref={inputRef}
            type="text"
            className="cmd-search-input"
            placeholder="Type a command, search projects, students, skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search commands"
          />
          <kbd className="cmd-esc-tag">ESC</kbd>
       </div>

        <div className="cmd-body">
          {showEmpty && (
            <div className="cmd-empty">
              <div className="cmd-empty-icon">🔍</div>
              <p>No matches for "{query}"</p>
              <span>Try a different keyword</span>
           </div>
          )}

          {showProjects && (
            <div className="cmd-section">
              <span className="cmd-section-title">
                <span className="cmd-dot" /> Projects & Ideas
             </span>
              {filteredProjects.map((p) => (
                <button key={p.id} type="button" className="cmd-row" onClick={() => handleProjectClick(p)}>
                  <span className="cmd-row-icon" aria-hidden="true">
                    {p.category === 'Textbooks' ? '📚' : '💡'}
                 </span>
                  <div className="cmd-row-info">
                    <div className="cmd-row-title">{p.title}</div>
                    <div className="cmd-row-meta">{p.category} • {p.status || p.condition}</div>
                 </div>
                  <span className="cmd-row-arrow" aria-hidden="true">→</span>
               </button>
              ))}
           </div>
          )}

          {showStudents && (
            <div className="cmd-section">
              <span className="cmd-section-title">
                <span className="cmd-dot cmd-dot--green" /> Teammates & Students
             </span>
              {filteredStudents.map((u) => (
                <button key={u.id} type="button" className="cmd-row" onClick={() => handleNav('/profile')}>
                  <span className="cmd-row-icon" aria-hidden="true">{u.avatar}</span>
                  <div className="cmd-row-info">
                    <div className="cmd-row-title">{u.name}</div>
                    <div className="cmd-row-meta">
                      {u.department} • {(u.skills || []).map((s) => s.name).slice(0, 2).join(', ')}
                   </div>
                 </div>
                  <span className="cmd-row-arrow" aria-hidden="true">→</span>
               </button>
              ))}
           </div>
          )}

          <div className="cmd-section">
            <span className="cmd-section-title">
              <span className="cmd-dot cmd-dot--blue" /> Quick Navigation
           </span>
            {NAV_COMMANDS.map((c) => (
              <button key={c.path} type="button" className="cmd-row" onClick={() => handleNav(c.path)}>
                <span className="cmd-row-icon" aria-hidden="true">{c.icon}</span>
                <div className="cmd-row-info">
                  <div className="cmd-row-title">{c.title}</div>
                  <div className="cmd-row-meta">{c.meta}</div>
                </div>
                <span className="cmd-row-arrow" aria-hidden="true">→</span>
              </button>
            ))}
         </div>
       </div>

        <div className="cmd-footer">
          <span className="cmd-hint"><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span className="cmd-hint"><kbd>↵</kbd> select</span>
          <span className="cmd-hint"><kbd>esc</kbd> close</span>
       </div>
     </div>
   </div>
  )
}
