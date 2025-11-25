import './Results.css'
import LogoScroller from './LogoScroller'

export default function Results() {
  return (
    <section id="results" className="section">
      <div className="container">
        <h2 className="section-title">Results</h2>
        <p className="section-sub">Acceptances include the schools below. Logos scroll continuously and pause on hover.</p>
        <LogoScroller />
        {/* You can add testimonials here if you want */}
      </div>
    </section>
  )
}