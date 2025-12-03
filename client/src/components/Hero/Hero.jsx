import './Hero.css'

export default function Hero({ content }) {
  if (!content) return null;
  return (
    <header id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-content">
          <div className="eyebrow">{content.eyebrow}</div>

          <h1 className="title">{content.title}</h1>

          <p className="subtitle">{content.subtitle}</p>

          <div className="hero-pills">
            {content["hero-pills"].map((pill, index) => (
              <span key={index} className="pill">{pill}</span>
            ))}
          </div>
        </div>

        <div className="hero-cards">
          {content["hero-cards"].map(card => (
            <div key={card.title} className="card">
              <span className="tag">{card.tag}</span>
              <h4>{card.title}</h4>
              <p className="subtitle">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
