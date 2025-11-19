import { faqs } from "../../Data/faq";
import './FAQ.css';

export default function FAQ() {
  return (
    <section id="faq">
      <div className="container">
        <h2 className="section-title">FAQ</h2>
        <p className="section-sub">Quick answers to common questions.</p>

        <div className="faq">
          {faqs.map((f) => (
            <details key={f.q} open>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}