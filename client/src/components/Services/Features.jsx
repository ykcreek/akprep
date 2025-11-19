import { features } from "../../Data/features";
import './Services.css'

export default function Features() {
  return (
    <div className="feature-grid">
      {features.map((f) => (
        <article key={f.title} className="feature">
          <b>{f.title}</b>
          <span>{f.copy}</span>
        </article>
      ))}
    </div>
  );
}