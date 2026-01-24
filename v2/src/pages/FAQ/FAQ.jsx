import { useState } from "react";
import "./FAQ.css";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is the difference between Offline/Online Hours?",
      answer: "Online support includes live 1-on-1 calls via Google Meet for real-time brainstorming and guidance. Offline support covers the intensive editing, planning, and review work our strategists do independently to ensure your drafts are polished."
    },
    {
      question: "How early should we start the transfer process?",
      answer: "Starting in your first year of college is ideal to build a strong extracurricular profile, but we also support 'rising' students on shorter timelines for the Spring and Fall cycles."
    },
    {
      question: "Do you write essays for students?",
      answer: "No. Our philosophy is rooted in authenticity. We coach you on structure, narrative positioning, and voice so that the final submission is your work, only at its highest potential."
    },
    {
      question: "How do payments work?",
      answer: "We offer both hourly consulting and discounted starter packages. Payments are handled securely online before sessions commence, and you can add hours as needed throughout the cycle."
    },
    {
      question: "Can I transfer into schools other than NYU Stern?",
      answer: "Absolutely. While our founders are at Stern, our systems are built for all elite institutions including Ivy League, T-20, and top-tier public universities like UC Berkeley or UMich."
    },
    {
      question: "What if I haven't decided which schools to apply to yet?",
      answer: "That is where we begin. We help you audit your current credits and career goals to build a targeted 'Shortlist' of schools where you have the highest probability of acceptance."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="faq-container">
        <header className="faq-header">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <div className="faq-accent-line"></div>
        </header>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                <span>{faq.question}</span>
                <span className="faq-icon">{activeIndex === index ? "−" : "+"}</span>
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}