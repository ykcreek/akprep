import './Hero.css'

export default function Hero() {
  return (
    <header id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-content">
          <div className="eyebrow">College for students by students</div>
          <h1 className="title">Guiding students to stronger applications with structure, clarity, and strategy </h1>
          <p className="subtitle">
            We help students craft standout college applications with a proven, student-led system. Essays, activity strategy, school lists, and interview prep — all guided by trained peer mentors from NYU Stern.
          </p>
          <div className="hero-pills">
            <span className="pill">Peer mentors from NYU Stern</span>
            <span className="pill">Essay coaches, interview prep</span>
            <span className="pill">Transparent pricing</span>
          </div>
        </div>

        <div className="hero-cards">
          {[
            { tag: "Founders", title: "Our story", text: "Two Stern students who transferred into a top business program, looking to help out fellow transfers" },
            { tag: "Track record", title: "Results that compound", text: "From state flagships to top privates, we help families target fit and ROI, not just brand names." },
            { tag: "Approach", title: "Calm, clear, consistent", text: "Weekly check ins, crisp templates, and lightweight dashboards keep students moving without burnout." },
            { tag: "Support", title: "Always reachable", text: "Fast feedback on drafts and decisions when it matters most." }
          ].map(card => (
            <div key={card.title} className="card">
              <span className="tag">{card.tag}</span>
              <h4>{card.title}</h4>
              <p className="subtitle">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}