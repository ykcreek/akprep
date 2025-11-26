import React from 'react'
import { useNavigate } from 'react-router-dom'
import './StudentForm.css'

export default function StudentForm() {
  const navigate = useNavigate()
  const [form, setForm] = React.useState({
    firstName: '', lastName: '', email: '', phone: '',
    gpa: '', sat: '', act: '', college: '',
    colleges: '', extracurriculars: '', notes: '',
    hasSpoken: false,
    hasPreference: false,
    prefKrissh: false,
    prefArnav: false
  })
  const [status, setStatus] = React.useState("")
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
  e.preventDefault()
  setStatus("sending") // optional status tracking

  try {
    const response = await fetch("http://localhost:4242/interest-form/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    const result = await response.json()

    if (response.ok) {
      // Optional: clear form
      // setForm({ ...all fields empty... })

      // Navigate to homepage
      navigate("/calendar")
    } else {
      console.error(result.error)
      alert("Something went wrong submitting the form.")
    }
  } catch (error) {
    console.error("Network error:", error)
    alert("Submission failed. Check your network or contact support.")
  }
}

  return (
    <section className="intake-page">
      <div className="container">
        <div className="intake-header">
          <h1>Tell Us About You</h1>
          <p>We’ll use this to tailor your strategy perfectly. Takes 2 minutes.</p>
        </div>

        <form onSubmit={handleSubmit} className="intake-form">
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="grid-2">
              <input required name="firstName" placeholder="First name" value={form.firstName} onChange={handleChange} />
              <input required name="lastName" placeholder="Last name" value={form.lastName} onChange={handleChange} />
            </div>
            <div className="personal-info-grid">
              <input required type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange}/>
              <input name="phone" placeholder="Phone number" value={form.phone} onChange={handleChange} required/>
            </div>
          </div>

          {/* Academic Snapshot */}
          <div className="form-section">
            <h3>Quick Academic Snapshot</h3>
            <div className="academic-grid">
              <input type="number" name="gpa" placeholder="GPA UW" value={form.gpa} onChange={handleChange} className='gpa'required/>
              <input type="number" name="sat" placeholder="SAT" value={form.sat} onChange={handleChange} className='sat'/>
              <input type="number"name="act" placeholder="ACT" value={form.act} onChange={handleChange} className='act'/>
              <input name="college" placeholder="Current College or University" value={form.college} onChange={handleChange} className='college'required/>
            </div>
          </div>

          {/* Colleges */}
          <div className="form-section">
            <h3>Colleges You're Considering</h3>
            <textarea
              required
              name="colleges"
              rows="5"
              placeholder="List your dream schools — comma separated&#10;e.g.&#10;Harvard University, Stanford, NYU Stern, UPenn Wharton&#10;..."
              value={form.colleges}
              onChange={handleChange}
            />
          </div>

          {/* Activities & Notes */}
          <div className="form-section">
            <h3>Activities, Awards & Spikes</h3>
            <textarea
              name="extracurriculars"
              rows="4"
              placeholder="What makes you stand out? Leadership roles, startups, research, olympiads, passions..."
              value={form.extracurriculars}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-section">
            <h3>Anything Else?</h3>
            <textarea
              name="notes"
              rows="3"
              placeholder="Timeline concerns, specific goals, or questions for us..."
              value={form.notes}
              onChange={handleChange}
            />
          </div>

          {/* Checkbox */}
          <div className="form-section checkbox-section">
            {/* Original spoken checkbox */}
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="hasSpoken"
                checked={form.hasSpoken}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
              <span className="label-text">
                I have already spoken with Krissh or Arnav on a discovery call
              </span>
            </label>

            {/* NEW: preference checkbox */}
            <label className="checkbox-label preference-main">
              <input
                type="checkbox"
                name="hasPreference"
                checked={form.hasPreference}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
              <span className="label-text">Do you have a preference?</span>
            </label>

            {/* Only show options if preference = true */}
            {form.hasPreference && (
              <div className="preference-options">
                <label className="checkbox-label small-check">
                  <input
                    type="checkbox"
                    name="prefKrissh"
                    checked={form.prefKrissh}
                    onChange={handleChange}
                  />
                  <span className="checkmark"></span>
                  <span className="label-text">Krissh</span>
                </label>

                <label className="checkbox-label small-check">
                  <input
                    type="checkbox"
                    name="prefArnav"
                    checked={form.prefArnav}
                    onChange={handleChange}
                  />
                  <span className="checkmark"></span>
                  <span className="label-text">Arnav</span>
                </label>
              </div>
            )}
          </div>

          <button type="submit" className="continue-btn">
            Book a Call
          </button>
        </form>
      </div>
    </section>
  )
}