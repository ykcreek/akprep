import "./Process.css";

export default function Process() {
  const steps = [
    {
      months: "Nov — Dec",
      title: "Applications Open",
      description: "Portals open for the transfer cycle. It's time to gather transcripts and set up accounts."
    },
    {
      months: "Dec — Jan",
      title: "Strategic Shortlisting",
      description: "Identifying target, reach, and safety schools based on credit portability and fit."
    },
    {
      months: "Jan — March",
      title: "Work With Us",
      description: "The intensive phase: high-level essay drafting, positioning, and application finalization."
    }
  ];

  return (
    <section id="process" className="process-section">
      <div className="process-container">
        
        <header className="process-header">
          <h2 className="process-title">Transfer Application Timeline</h2>
          <div className="process-accent-line"></div>
        </header>

        <div className="process-timeline">
          {steps.map((step, index) => (
            <div key={index} className="process-step">
              <div className="process-time-node">
                <span className="process-months">{step.months}</span>
                <div className="process-dot"></div>
              </div>
              <div className="process-content">
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-description">{step.description}</p>
              </div>
            </div>
          ))}
          {/* Connecting line for the timeline */}
          <div className="process-timeline-line"></div>
        </div>

      </div>
    </section>
  );
}