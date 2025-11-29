// Contact.jsx
import './Contact.css'
import { useEffect, useRef, useState } from 'react'

export default function Contact() {
  const [status, setStatus] = useState('') // success, error, sending
  const formRef = useRef(null)
  const iframeRef = useRef(null)

  const sendEmail = async (e) => {
    e.preventDefault()
    setStatus('sending')

    const form = e.target
    const data = {
      name: form.name.value,
      email: form.email.value,
      topic: form.topic.value || 'General Inquiry',
      message: form.message.value,
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/email/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
        console.error(result.error)
      }
    } catch (err) {
      setStatus('error')
      console.error('Network error:', err)
    }
  }

  // Resize iframe to match form height
  useEffect(() => {
    const resizeIframe = () => {
      if (iframeRef.current && formRef.current) {
        iframeRef.current.style.height = formRef.current.offsetHeight + 'px'
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
          <form ref={formRef} onSubmit={sendEmail} className="contact-form">
            <div className="form-row">
              <input required name="name" placeholder="Your name" disabled={status === 'sending'} />
              <input required type="email" name="email" placeholder="Email address" disabled={status === 'sending'} />
            </div>
            <input name="topic" placeholder="Subject (optional)" disabled={status === 'sending'} />
            <textarea
              required
              name="message"
              rows="6"
              placeholder="Tell us how we can help..."
              disabled={status === 'sending'}
            />

            <button type="submit" className="submit-btn" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="status-success">Message sent! We'll get back to you within 24 hours.</p>
            )}
            {status === 'error' && (
              <p className="status-error">Failed to send. Please email hello@akprep.co directly.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}