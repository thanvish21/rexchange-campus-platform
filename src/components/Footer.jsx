import { Link } from 'react-router-dom'
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-copy">© 2026 RExchange. By students, for students.</div>
        <nav className="footer-links" aria-label="Footer">
          <Link to="/browse">Browse</Link>
          <Link to="/list">List an Item</Link>
          <Link to="/exchanges">My Exchanges</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </div>
    </footer>
  )
}
