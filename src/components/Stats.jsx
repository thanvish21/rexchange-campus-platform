import './Stats.css'

const stats = [
  { value: '₹4,200', label: 'Avg Saved / Semester' },
  { value: '1,200+', label: 'Active Listings' },
  { value: '6', label: 'Resource Categories' },
  { value: '0%', label: 'Platform Fee on Free' },
]

export function Stats() {
  return (
    <section className="stats" aria-label="Key statistics">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-value gradient-text">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
