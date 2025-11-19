import { packs } from "../../Data/packs";
import './Services.css'

export default function Pricing() {
  return (
    <div className="pricing-layout">
      <article className="session-card">
        <h3>Description of sessions</h3>
        <div className="session-price">
          $80 <span>/ hour</span>
        </div>

        <ul>
          <li>Online time is one on one coaching...</li>
          <li>Offline time includes tracked edits...</li>
          <li>Support for Common App and supplements.</li>
          <li>Application theme and positioning.</li>
          <li>Brainstorming spikes and activities.</li>
          <li>Guidance on resumes, recommendations, LOCIs.</li>
        </ul>
      </article>

      <div className="pack-grid">
        {packs.map((p) => (
          <article key={p.title} className="pack">
            <div>
              <p className="pack-title">{p.title}</p>
              <p className="pack-hours">{p.description}</p>
            </div>
            <button type="button">Book intro call</button>
          </article>
        ))}
      </div>
    </div>
  );
}