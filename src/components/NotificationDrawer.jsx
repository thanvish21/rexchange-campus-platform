import { useNavigate } from 'react-router-dom'
import { notifications as defaultNotifications } from '../data/mockData.js'
import { useFocusTrap } from '../hooks/useFocusTrap.js'
import './NotificationDrawer.css'

export default function NotificationDrawer({
  isOpen,
  onClose,
  notifications = defaultNotifications,
  onMarkAllRead,
  onMarkAsRead,
}) {
  const navigate = useNavigate()
  const drawerRef = useFocusTrap({ isOpen, onClose })

  if (!isOpen) return null

  const items = notifications
  const unreadItemsCount = items.filter((i) => !i.read).length

  const handleMarkAllRead = () => {
    if (onMarkAllRead) {
      onMarkAllRead()
    }
  }

  const handleItemClick = (notification) => {
    if (onMarkAsRead && !notification.read) {
      onMarkAsRead(notification.id)
    }
    onClose()
    if (notification.actionPath) {
      navigate(notification.actionPath)
    }
  }

  return (
    <div className="notif-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Notifications">
      <div
        ref={drawerRef}
        className="notif-drawer surface animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="notif-header">
          <div className="notif-title-row">
            <span className="notif-heading">Notifications</span>
            <span className="notif-badge">{unreadItemsCount} Unread</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="button" className="notif-action-btn" onClick={handleMarkAllRead}>
              Mark all read
            </button>
            <button type="button" className="notif-close-btn" onClick={onClose} aria-label="Close notifications">
              ✕
            </button>
          </div>
        </div>

        <div className="notif-body">
          {items.length === 0 ? (
            <div className="notif-empty">You're all caught up! No notifications.</div>
          ) : (
            items.map((n) => (
              <button
                key={n.id}
                type="button"
                className={`notif-item ${!n.read ? 'unread' : ''}`}
                onClick={() => handleItemClick(n)}
                style={{ width: '100%', textAlign: 'left' }}
              >
                <div className="notif-item-top">
                  <span className="notif-item-title">{n.title}</span>
                  <span className="notif-item-time">{n.time}</span>
                </div>
                <p className="notif-item-body">{n.body}</p>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
