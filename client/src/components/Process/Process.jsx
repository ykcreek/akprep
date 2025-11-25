import './Process.css'
import { FaCheck } from 'react-icons/fa'  // Clean checkmark icon

export default function Process() {
  return (
    <section id="process" className="process-section">
      <div className="container">
        <div className="process-header">
          <h2 className="section-title">Our process</h2>
          <p className="section-sub">Simple steps. Clear deliverables. No surprises.</p>
        </div>

        <div className="process-grid">
          {[
            { num: "1", title: "Discover", desc: "Free consultation to map goals, constraints, and a first draft school list.", items: ["Profile review", "Timeline alignment", "Fit criteria"] },
            { num: "2", title: "Plan", desc: "Calendar, essay prompts, and a shared workspace so everyone stays aligned.", items: ["Essay schedule", "Task templates", "Check-in cadence"] },
            { num: "3", title: "Build", desc: "Weekly sprints on essays, activities, and recommendations with tight feedback loops.", items: ["Draft reviews", "Activity spikes", "Interview practice"] },
            { num: "4", title: "Polish", desc: "Final QA, interview practice, and financial aid checks before you submit.", items: ["Final pass", "Scholarship sweep", "Submit with confidence"] }
          ].map((step) => (
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
      </div>
    </section>
  )
}
