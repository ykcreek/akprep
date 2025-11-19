import { useMemo } from "react";
import { logos } from "../../Data/logos";
import './Results.css';

export default function Results() {
  const duplicated = useMemo(() => [...logos, ...logos], []);

  return (
    <section id="results">
      <div className="container">
        <h2 className="section-title">Results</h2>
        <p className="section-sub">Acceptances include the schools below.</p>

        <div className="scroller-wrap">
          <div className="logo-track">
            {duplicated.map((logo, i) => (
              <span key={`${logo}-${i}`} className="logo-pill">
                <img src={logo} alt="" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
