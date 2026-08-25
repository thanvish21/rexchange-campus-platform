import { Link } from 'react-router-dom'
import './CampusChapters.css'

const CHAPTERS = [
  {
    num: '01',
    kicker: 'CHAPTER // DISCOVERY',
    title: 'The Campus Marketplace',
    desc: 'Textbooks, calculators, dorm fridges, and handwritten notes — traded locally with zero middleman cut.',
    link: '/browse',
    cta: 'EXPLORE FEED →',
  },
  {
    num: '02',
    kicker: 'CHAPTER // MATCHMAKING',
    title: 'AI Teammate Matcher',
    desc: 'Find compatible hackathon partners and project collaborators based on complementary skill gaps.',
    link: '/matching',
    cta: 'RUN MATRICES →',
  },
  {
    num: '03',
    kicker: 'CHAPTER // IDENTITY',
    title: 'Verified Student Passport',
    desc: 'Campus email authentication, hostel pickup routing, and visible trade reputation history.',
    link: '/profile',
    cta: 'VIEW PASSPORT →',
  },
  {
    num: '04',
    kicker: 'CHAPTER // BOUNTIES',
    title: 'Dorm Favor Exchange',
    desc: 'Late-night pizza trades, umbrella borrows, and quick campus favors resolved between hostels.',
    link: '/dashboard',
    cta: 'OPEN BOARD →',
  },
]

export default function CampusChapters() {
  return (
    <section className="chapters-section">
      <div className="container">
        <header className="section-header" style={{ textAlign: 'left', marginBottom: '40px' }}>
          <div className="chapters-tag-kicker">◆ ACT II // THE PLATFORM ARCHITECTURE</div>
          <h2 className="section-title">Engineered for Campus Density</h2>
          <p className="section-subtitle">Four integrated modules replacing fragmented chat groups and classifieds</p>
        </header>

        <div className="chapters-list">
          {CHAPTERS.map((ch) => (
            <Link key={ch.num} to={ch.link} className="chapter-row surface surface--interactive">
              <span className="chapter-num">{ch.num}</span>
              <div className="chapter-main">
                <span className="chapter-kicker">{ch.kicker}</span>
                <h3 className="chapter-title">{ch.title}</h3>
                <p className="chapter-desc">{ch.desc}</p>
                <div className="chapter-line"></div>
              </div>
              <span className="chapter-cta">{ch.cta}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
