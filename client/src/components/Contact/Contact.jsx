import './Contact.css'
import { useEffect, useRef } from 'react'

export default function Contact() {
  const sendEmail = (e) => {
    e.preventDefault()
    const f = e.target
    const name = encodeURIComponent(f.name.value)
    const email = encodeURIComponent(f.email.value)
    const topic = encodeURIComponent(f.topic.value || 'Inquiry')
    const message = encodeURIComponent(f.message.value)

    const body = `From: ${name} <${email}>\n\n${message}`
    window.location.href = `mailto:hello@akprep.co?subject=${topic}&body=${body}`
    f.reset()
  }

  const iframeRef = useRef(null)
  const formRef = useRef(null)

  // Make iframe match form height
  useEffect(() => {
    const resizeIframe = () => {
      if (iframeRef.current && formRef.current) {
        const formHeight = formRef.current.offsetHeight
        iframeRef.current.style.height = formHeight + 'px'
      }
    }

    resizeIframe()
    window.addEventListener('resize', resizeIframe)
    return () => window.removeEventListener('resize', resizeIframe)
  }, [])

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-header">
          <h2 className="section-title">Schedule & Contact</h2>
          <p className="section-sub">Based in NJ and NYC. Virtual support everywhere.</p>
        </div>

        <div className="contact-grid">
          {/* Calendly iframe — height matches form */}
          <div className="calendly-embed">
            <iframe
              ref={iframeRef}
              src="https://calendly.com/akprep/30min"
              width="100%"
              frameBorder="0"
              title="Schedule a call"
              allow="fullscreen"
            />
          </div>

          {/* Contact Form — ref to measure height */}
          <form ref={formRef} onSubmit={sendEmail} className="contact-form">
            <div className="form-row">
              <input required name="name" placeholder="Your name" />
              <input required type="email" name="email" placeholder="Email address" />
            </div>

            <input name="topic" placeholder="Subject (optional)" />

            <textarea
              required
              name="message"
              rows="6"
              placeholder="Tell us how we can help..."
            />

            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}