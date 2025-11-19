import { heroCards } from "../../Data/hero";
import './Hero.css';

export default function HeroCards() {
  return (
    <div className="hero-cards">
      {heroCards.map((c) => (
        <article key={c.title} className="card">
          <span className="tag">{c.tag}</span>
          <h4>{c.title}</h4>
          <p className="subtitle">{c.body}</p>
        </article>
      ))}
    </div>
  );
}