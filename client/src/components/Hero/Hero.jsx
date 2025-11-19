import { heroHighlights } from "../../Data/hero";
import './Hero.css'

export default function Hero() {
  return (
    <div className="hero-left">
      <div className="eyebrow">College for students by students</div>
      <h1 className="title">
        Strategy, storytelling, and steady guidance from application to acceptance.
      </h1>

      <p className="subtitle">
        We help students craft standout applications with a calm, proven process.
      </p>

      <div className="hero-actions">
        <a className="cta" href="#contact">Schedule a free call</a>
        <a className="pill" href="#services">See services</a>
      </div>

      <div className="hero-tags">
        {heroHighlights.map((h) => (
          <span key={h} className="pill">{h}</span>
        ))}
      </div>
    </div>
  );
}