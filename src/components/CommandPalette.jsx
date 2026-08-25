import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { projects, users } from '../data/mockData.js'
import { useFocusTrap } from '../hooks/useFocusTrap.js'
import './CommandPalette.css'

/**
 * Highlights matching query substrings within text safely
 */
function HighlightText({ text, query }) {
  if (!text) return null
  if (!query || !query.trim()) return <>{text}</>

  const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')
  const parts = String(text).split(regex)

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="cmd-highlight">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  )
}

export default function CommandPalette({ isOpen, onClose, onSelectProject }) {
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const modalRef = useFocusTrap({
    isOpen,
    onClose,
    initialFocusRef: inputRef,
  })

  const NAV_COMMANDS = useMemo(() => [
    { path: '/dashboard', icon: '📊', title: 'Go to Student Dashboard', meta: 'View active projects, applications & Next Best Action' },
    { path: '/matching', icon: '⚡', title: 'Launch AI Team Compatibility Matcher', meta: 'Find teammates with complementary skills' },
    { path: '/list', icon: '➕', title: 'Create a Project or Resource Listing', meta: 'Recruit teammates or share campus materials' },
    { path: '/profile', icon: '🪪', title: 'Edit Campus Trade Passport', meta: 'Skills, avatar, hostel & verification' },
  ], [])

  // Reset query and active index when palette opens
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setActiveIdx(0)
    }
  }, [isOpen])

  // Reset active index when query changes
  useEffect(() => {
    setActiveIdx(0)
  }, [query])

  const filteredProjects = useMemo(() => {
    if (!query.trim()) return projects.slice(0, 4)
    const q = query.toLowerCase()
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(q))
    ).slice(0, 6)
  }, [query])

  const filteredStudents = useMemo(() => {
    if (!query.trim()) return users.slice(0, 3)
    const q = query.toLowerCase()
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.department.toLowerCase().includes(q) ||
        (u.skills || []).some((s) => s.name.toLowerCase().includes(q))
    ).slice(0, 4)
  }, [query])

  const filteredNavCommands = useMemo(() => {
    if (!query.trim()) return NAV_COMMANDS
    const q = query.toLowerCase()
    return NAV_COMMANDS.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.meta.toLowerCase().includes(q) ||
        c.path.toLowerCase().includes(q)
    )
  }, [query, NAV_COMMANDS])

  const handleProjectClick = (proj) => {
    onClose()
    if (onSelectProject) {
      onSelectProject(proj)
    } else {
      navigate('/browse')
    }
  }

  const handleNav = (path) => {
    onClose()
    navigate(path)
  }

  // Unified actionable items list for keyboard navigation
  const flatItems = useMemo(() => {
    const items = []
    filteredProjects.forEach((p) => {
      items.push({
        id: `proj-${p.id}`,
        type: 'project',
        onSelect: () => handleProjectClick(p),
      })
    })
    filteredStudents.forEach((u) => {
      items.push({
        id: `user-${u.id}`,
        type: 'student',
        onSelect: () => handleNav('/profile'),
      })
    })
    filteredNavCommands.forEach((c) => {
      items.push({
        id: `nav-${c.path}`,
        type: 'nav',
        onSelect: () => handleNav(c.path),
      })
    })
    return items
  }, [filteredProjects, filteredStudents, filteredNavCommands])

  // Scroll active item into view during arrow key navigation
  useEffect(() => {
    if (!isOpen) return
    const activeEl = listRef.current?.querySelector('.cmd-row--active')
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' })
    }
  }, [activeIdx, isOpen])

  const handleKeyDown = (e) => {
    if (flatItems.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx((prev) => (prev + 1) % flatItems.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx((prev) => (prev - 1 + flatItems.length) % flatItems.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const selected = flatItems[activeIdx]
      if (selected) {
        selected.onSelect()
      }
    }
  }

  if (!isOpen) return null

  const showProjects = filteredProjects.length > 0
  const showStudents = filteredStudents.length > 0
  const showNav = filteredNavCommands.length > 0
  const showEmpty = !showProjects && !showStudents && !showNav

  let itemCounter = 0

  return (
    <div
      className="cmd-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        ref={modalRef}
        className="cmd-modal glass-panel animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cmd-search-bar">
          <span className="cmd-search-icon" aria-hidden="true">🔍</span>
          <input
            ref={inputRef}
            type="text"
            className="cmd-search-input"
            placeholder="Type a command, search projects, students, skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Search commands"
            aria-autocomplete="list"
            aria-controls="cmd-results"
            role="combobox"
            aria-expanded={!showEmpty}
          />
          <kbd className="cmd-esc-tag">ESC</kbd>
        </div>

        <div className="cmd-body" ref={listRef} id="cmd-results" role="listbox">
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
              {filteredProjects.map((p) => {
                const currentIndex = itemCounter++
                const isActive = activeIdx === currentIndex
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    className={`cmd-row ${isActive ? 'cmd-row--active' : ''}`}
                    onClick={() => handleProjectClick(p)}
                    onMouseEnter={() => setActiveIdx(currentIndex)}
                  >
                    <span className="cmd-row-icon" aria-hidden="true">
                      {p.category === 'Textbooks' ? '📚' : '💡'}
                    </span>
                    <div className="cmd-row-info">
                      <div className="cmd-row-title">
                        <HighlightText text={p.title} query={query} />
                      </div>
                      <div className="cmd-row-meta">
                        <HighlightText text={p.category} query={query} /> • {p.status || p.condition}
                      </div>
                    </div>
                    <span className="cmd-row-arrow" aria-hidden="true">→</span>
                  </button>
                )
              })}
            </div>
          )}

          {showStudents && (
            <div className="cmd-section">
              <span className="cmd-section-title">
                <span className="cmd-dot cmd-dot--green" /> Teammates & Students
              </span>
              {filteredStudents.map((u) => {
                const currentIndex = itemCounter++
                const isActive = activeIdx === currentIndex
                const skillsText = (u.skills || []).map((s) => s.name).slice(0, 2).join(', ')
                return (
                  <button
                    key={u.id}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    className={`cmd-row ${isActive ? 'cmd-row--active' : ''}`}
                    onClick={() => handleNav('/profile')}
                    onMouseEnter={() => setActiveIdx(currentIndex)}
                  >
                    <span className="cmd-row-icon" aria-hidden="true">{u.avatar}</span>
                    <div className="cmd-row-info">
                      <div className="cmd-row-title">
                        <HighlightText text={u.name} query={query} />
                      </div>
                      <div className="cmd-row-meta">
                        <HighlightText text={u.department} query={query} /> • <HighlightText text={skillsText} query={query} />
                      </div>
                    </div>
                    <span className="cmd-row-arrow" aria-hidden="true">→</span>
                  </button>
                )
              })}
            </div>
          )}

          {showNav && (
            <div className="cmd-section">
              <span className="cmd-section-title">
                <span className="cmd-dot cmd-dot--blue" /> Quick Navigation
              </span>
              {filteredNavCommands.map((c) => {
                const currentIndex = itemCounter++
                const isActive = activeIdx === currentIndex
                return (
                  <button
                    key={c.path}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    className={`cmd-row ${isActive ? 'cmd-row--active' : ''}`}
                    onClick={() => handleNav(c.path)}
                    onMouseEnter={() => setActiveIdx(currentIndex)}
                  >
                    <span className="cmd-row-icon" aria-hidden="true">{c.icon}</span>
                    <div className="cmd-row-info">
                      <div className="cmd-row-title">
                        <HighlightText text={c.title} query={query} />
                      </div>
                      <div className="cmd-row-meta">
                        <HighlightText text={c.meta} query={query} />
                      </div>
                    </div>
                    <span className="cmd-row-arrow" aria-hidden="true">→</span>
                  </button>
                )
              })}
            </div>
          )}
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
