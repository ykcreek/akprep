import './Contact.css';

export default function Contact({ sendEmail }) {
  return (
    <section id="contact">
      <div className="container">
        <h2 className="section-title">Location and contact</h2>
        <p className="section-sub">Based in NJ and NYC. Virtual support everywhere.</p>

        <div className="contact-grid">
          <div className="map">Map embed goes here</div>

          <form onSubmit={sendEmail}>
            <div className="grid-2">
              <input required name="name" placeholder="Your name" />
              <input required type="email" name="email" placeholder="Email" />
            </div>

            <input name="topic" placeholder="Subject" />
            <textarea required name="message" rows="5" placeholder="Tell us what you need" />

            <div className="form-actions">
              <button className="primary" type="submit">Send message</button>
              <a className="pill" href="https://calendly.com/your-calendly/intro">
                Schedule on Calendly
              </a>
            </div>

            <small>This form opens your email app.</small>
          </form>
        </div>
      </div>
    </section>
  );
}
