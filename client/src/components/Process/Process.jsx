import { processSteps } from "../../Data/process";
import './Process.css';

export default function Process() {
  return (
    <section id="process">
      <div className="container">
        <h2 className="section-title">Our process</h2>
        <p className="section-sub">Simple steps. Clear deliverables. No surprises.</p>

        <div className="process-grid">
          {processSteps.map((s) => (
            <article key={s.title} className="step">
              <h4>{s.title}</h4>
              <p className="subtitle">{s.copy}</p>
              <ul className="subtitle">
                {s.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
