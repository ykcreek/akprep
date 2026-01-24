import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./InterestForm.css";

export default function InterestForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    gpa: '', sat: '', act: '', college: '',
    colleges: '', extracurriculars: '', notes: '',
    hasSpoken: false,
    hasPreference: false,
    prefKrissh: false,
    prefArnav: false
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    // Navigation logic
    navigate("/calendar");
  };

  return (
    <section className="gform-section">
      <div className="gform-container">
        
        {/* Header Card */}
        <div className="gform-header-card">
          <div className="gform-top-accent"></div>
          <h1 className="gform-title">Vita Prep Intake Form</h1>
          <p className="gform-description">
            Help us understand your background to maximize our discovery call.
          </p>
          <div className="gform-required-notice">* Indicates required question</div>
        </div>

        <form onSubmit={handleSubmit}>
          
          <div className="gform-card">
            <div className="gform-grid">
              <div className="gform-input-group">
                <label>First Name <span className="required-star">*</span></label>
                <input required name="firstName" placeholder="Your answer" value={form.firstName} onChange={handleChange} />
              </div>
              <div className="gform-input-group">
                <label>Last Name <span className="required-star">*</span></label>
                <input required name="lastName" placeholder="Your answer" value={form.lastName} onChange={handleChange} />
              </div>
            </div>
            <div className="gform-grid">
              <div className="gform-input-group">
                <label>Email Address <span className="required-star">*</span></label>
                <input required type="email" name="email" placeholder="Your answer" value={form.email} onChange={handleChange}/>
              </div>
              <div className="gform-input-group">
                <label>Phone Number <span className="required-star">*</span></label>
                <input required name="phone" placeholder="Your answer" value={form.phone} onChange={handleChange}/>
              </div>
            </div>
          </div>

          <div className="gform-card">
            <div className="gform-input-group">
              <label>Current College or University <span className="required-star">*</span></label>
              <input required name="college" placeholder="Your answer" value={form.college} onChange={handleChange} className="gform-medium-input" />
            </div>
            <div className="gform-grid-3">
              <div className="gform-input-group">
                <label>GPA <span className="required-star">*</span></label>
                <input required type="number" step="0.01" name="gpa" placeholder="0.00" value={form.gpa} onChange={handleChange} />
              </div>
              <div className="gform-input-group">
                <label>SAT</label>
                <input type="number" name="sat" placeholder="Optional" value={form.sat} onChange={handleChange} />
              </div>
              <div className="gform-input-group">
                <label>ACT</label>
                <input type="number" name="act" placeholder="Optional" value={form.act} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="gform-card">
            <div className="gform-input-group">
              <label className="gform-integrated-header">Which schools are you considering for transfer? <span className="required-star">*</span></label>
              <textarea required name="colleges" rows="2" placeholder="Your answer" value={form.colleges} onChange={handleChange} />
            </div>
            <div className="gform-input-group">
              <label className="gform-integrated-header">Notable Extracurriculars or Awards <span className="required-star">*</span></label>
              <textarea required name="extracurriculars" rows="3" placeholder="Your answer" value={form.extracurriculars} onChange={handleChange} />
            </div>
          </div>

          <div className="gform-card">
            <div className="gform-checkbox-group">
              <label className="gform-check-label">
                <input type="checkbox" name="hasPreference" checked={form.hasPreference} onChange={handleChange} />
                <span className="gform-check-text">Do you have a specific consultant preference?</span>
              </label>

              {form.hasPreference && (
                <div className="gform-sub-options">
                  <label className="gform-check-label">
                    <input type="checkbox" name="prefKrissh" checked={form.prefKrissh} onChange={handleChange} />
                    <span className="gform-check-text">Krissh (IU Kelley to NYU Stern)</span>
                  </label>
                  <label className="gform-check-label">
                    <input type="checkbox" name="prefArnav" checked={form.prefArnav} onChange={handleChange} />
                    <span className="gform-check-text">Arnav (UMass to NYU Stern)</span>
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="gform-footer">
            <button type="submit" className="gform-submit-btn" disabled={status === "sending"}>
              {status === "sending" ? "Submitting..." : "Submit"}
            </button>
            <p className="gform-disclaimer">Submit to move to the calendar booking page.</p>
          </div>
        </form>
      </div>
    </section>
  );
}