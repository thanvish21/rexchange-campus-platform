import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { notifications as initialNotifications } from '../data/mockData.js'
import './NotificationDrawer.css'

export default function NotificationDrawer({ isOpen, onClose }) {
  const [items, setItems] = useState(initialNotifications)
  const navigate = useNavigate()

  if (!isOpen) return null

  const markAllRead = () => {
    setItems(items.map((n) => ({ ...n, read: true })))
  }

  const handleItemClick = (path) => {
    onClose()
    if (path) navigate(path)
  }

  return (
    <div className="notif-overlay" onClick={onClose}>
      <div className="notif-drawer surface animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        <div className="notif-header">
          <div className="notif-title-row">
            <span className="notif-heading">Notifications</span>
            <span className="notif-badge">{items.filter((i) => !i.read).length} Unread</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="notif-action-btn" onClick={markAllRead}>Mark all read</button>
            <button className="notif-close-btn" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="notif-body">
          {items.length === 0 ? (
            <div className="notif-empty">You're all caught up! No unread notifications.</div>
          ) : (
            items.map((n) => (
              <div
                key={n.id}
                className={`notif-item ${!n.read ? 'unread' : ''}`}
                onClick={() => handleItemClick(n.actionPath)}
              >
                <div className="notif-item-top">
                  <span className="notif-item-title">{n.title}</span>
                  <span className="notif-item-time">{n.time}</span>
                </div>
                <p className="notif-item-body">{n.body}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
