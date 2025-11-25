import './FAQ.css'

export default function FAQ() {
  return (
    <section id="faq" className="section">
      <div className="container">
        <h2 className="section-title">FAQ</h2>
        <p className="section-sub">Quick answers to common questions.</p>
        <div className="faq">
          <details>
            <summary>How early should we start</summary>
            <p>Rising juniors is ideal. We also help seniors on accelerated timelines with clear priorities.</p>
          </details>
          <details>
            <summary>Do you write essays for students</summary>
            <p>No. We coach structure, voice, and clarity so the work is authentic and strong.</p>
          </details>
          <details>
            <summary>How do payments work</summary>
            <p>Fixed price per package with optional hourly add ons. Transparent and predictable.</p>
          </details>
        </div>
      </div>
    </section>
  )
}