import { founders } from "../../Data/founders";
import './Founders.css';

export default function Founders() {
  return (
    <section id="about">
      <div className="container">
        <h2 className="section-title">About us</h2>
        <p className="section-sub">We are a student led advisory focused on clarity, craft, and confidence.</p>

        <div className="founders">
          {founders.map((f) => (
            <article key={f.name} className="person">
              <div className="portrait">
                <img src={f.image} alt={f.name} />
              </div>
              <div>
                <h5>{f.name}</h5>
                <p>{f.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}