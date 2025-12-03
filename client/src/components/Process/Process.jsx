import './Process.css'
import { FaCheck } from 'react-icons/fa'  // Clean checkmark icon

export default function Process({content}) {
  return (
    <section id="process" className="process-section">
      <div className="container">
        <div className="process-header">
          <h2 className="section-title">{content.title}</h2>
          <p className="section-sub">{content.sub}</p>
        </div>

        <div className="process-grid">
          {content.processes.map((step) => (
            <div key={step.num} className="step-card">
              <div className="step-number">{step.num}</div>
              <h3>{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
              <ul className="step-list">
                {step.items.map((item) => (
                  <li key={item}>
                    <FaCheck className="checkmark-icon" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="process-disclaimer">
          Disclaimer: {content.disclaimer}
        </p>

      </div>
    </section>
  )
}
