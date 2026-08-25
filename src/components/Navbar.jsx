import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { notifications as initialNotifications } from '../data/mockData.js'
import CommandPalette from './CommandPalette.jsx'
import NotificationDrawer from './NotificationDrawer.jsx'
import './Navbar.css'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cmdOpen, setCmdOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [notificationsList, setNotificationsList] = useState(initialNotifications)

  const unreadCount = notificationsList.filter((n) => !n.read).length

  const handleMarkAllRead = () => {
    setNotificationsList((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const handleMarkAsRead = (id) => {
    setNotificationsList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const navLinks = [
    { path: '/browse', label: 'Discover' },
    { path: '/matching', label: 'AI Teammates' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/list', label: '+ Create' },
  ]

  // Global ⌘K / Ctrl+K listener
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        if (document.querySelector('[role="dialog"]:not(.cmd-modal)')) return
        e.preventDefault()
        setCmdOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const closeMobile = () => setMobileMenuOpen(false)

  return (
    <>
      <nav className="navbar" role="navigation">
        <div className="navbar-container container">
          <NavLink to="/" className="navbar-logo" aria-label="RExchange Home" onClick={closeMobile}>
            <span className="navbar-logo-icon" aria-hidden="true">🔄</span>
            <span className="navbar-logo-text">RExchange</span>
          </NavLink>

          <div className="navbar-center">
            {navLinks.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `navbar-link ${isActive ? 'navbar-link--active' : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          <div className="navbar-right">
            <button
              type="button"
              className="navbar-search-btn"
              onClick={() => setCmdOpen(true)}
              title="Global Search (⌘K)"
              aria-label="Open command palette"
            >
              <span aria-hidden="true">🔍</span>
              <span className="navbar-search-label">Search</span>
              <kbd>⌘K</kbd>
            </button>

            <button
              type="button"
              className="navbar-notif-btn"
              onClick={() => setNotifOpen(true)}
              title="Notifications"
              aria-label={`Notifications (${unreadCount} unread)`}
            >
              <span aria-hidden="true">🔔</span>
              {unreadCount > 0 && <span className="notif-dot" aria-hidden="true">{unreadCount}</span>}
            </button>

            <NavLink to="/profile" className="navbar-avatar" aria-label="Your profile" onClick={closeMobile}>
              👨‍💻
            </NavLink>

            <NavLink to="/browse" className="navbar-cta" onClick={closeMobile}>
              Browse Listings →
            </NavLink>

            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-menu animate-fade-in-up">
            {navLinks.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className="mobile-link"
                onClick={closeMobile}
              >
                {label}
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
      <NotificationDrawer
        isOpen={notifOpen}
        onClose={() => setNotifOpen(false)}
        notifications={notificationsList}
        onMarkAllRead={handleMarkAllRead}
        onMarkAsRead={handleMarkAsRead}
      />
    </>
  )
}
