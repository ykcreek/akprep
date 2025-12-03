import './FAQ.css'

export default function FAQ({content}) {
  if (!content) return null;
  return (
    <section id="faq" className="section">
      <div className="container">
        <h2 className="section-title">{content.title}</h2>
        <p className="section-sub">{content.sub}</p>

        <div className="faq">
          {(content.faqs || []).map((item, idx) => (
            <details key={idx}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}