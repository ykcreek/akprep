import './About.css'

export default function About({ content }) {
  if (!content) return null;

  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title">{content.title || 'About us'}</h2>
        <p className="section-sub">{content.sub}</p>

        <div className="founders">
          {(content.founders || []).map((founder, idx) => (
            <article key={idx} className="person">
              <div className="portrait">
                <img src={founder.img} alt={founder.name} />
              </div>
              <div>
                <h5>{founder.name}</h5>
                <p>{founder.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
