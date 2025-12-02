import './FAQ.css'

export default function FAQ() {
  return (
    <section id="faq" className="section">
      <div className="container">
        <h2 className="section-title">FAQ</h2>
        <p className="section-sub">Quick answers to common questions.</p>
        <div className="faq">
          <details>
            <summary>What is the difference between Offline/Online Hours?</summary>
            <p>Offline support covers planning, editing, and review work done independently. Online support includes live calls, guidance, and real-time feedback.</p>
          </details>
          <details>
            <summary>How early should we start?</summary>
            <p>Starting in the first year of college is ideal, but we also support rising high school seniors on quicker timelines.</p>
          </details>
          <details>
            <summary>Do you write essays for students?</summary>
            <p>No. We coach structure, voice, and clarify so the work is authentic and strong.</p>
          </details>
          <details>
            <summary>How do payments work?</summary>
            <p>After speaking with you, we send a secure checkout link. All pricing is listed above.</p>
          </details>
        </div>
      </div>
    </section>
  )
}