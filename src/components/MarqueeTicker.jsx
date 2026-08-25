import './MarqueeTicker.css'

const TICKER_ITEMS = [
  'TEXTBOOK EXCHANGE',
  'GADGET BAZAAR',
  'AI TEAMMATES',
  'NOTES SHARING',
  'SKILL BARTER',
  'TICKET SWAP',
  'HOSTEL PICKUP',
  'CAMPUS VERIFIED',
  'ZERO LISTING FEE',
  'DORM BOUNTIES',
]

export default function MarqueeTicker() {
  return (
    <div className="marquee-container" aria-hidden="true">
      <div className="marquee-track">
        <div className="marquee-content">
          {TICKER_ITEMS.map((item, idx) => (
            <span key={idx} className="marquee-item">
              <span className="marquee-text">{item}</span>
              <span className="marquee-sep">//</span>
            </span>
          ))}
        </div>
        <div className="marquee-content" aria-hidden="true">
          {TICKER_ITEMS.map((item, idx) => (
            <span key={`dup-${idx}`} className="marquee-item">
              <span className="marquee-text">{item}</span>
              <span className="marquee-sep">//</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
