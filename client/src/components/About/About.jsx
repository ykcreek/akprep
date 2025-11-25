import './About.css'

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title">About us</h2>
        <p className="section-sub">
          We are a student led advisory focused on clarity, craft, and confidence. Your story should sound like you and stand up under pressure.
        </p>
        <div className="founders">
          <article className="person">
            <div className="portrait">
              <img src="/Headshot-Krissh Kolhatkar.JPG" alt="Krissh Kolhatkar" />
            </div>
            <div>
              <h5>Krissh Kolhatkar</h5>
              <p>Co founder. Student at NYU Stern majoring in Finance and Statistics. Systems, dashboards, and essay frameworks that reduce stress and raise clarity.</p>
            </div>
          </article>
          <article className="person">
            <div className="portrait">
              <img src="/arnav headshot.jpg" alt="Arnav Raghuvanshi" />
            </div>
            <div>
              <h5>Arnav Raghuvanshi</h5>
              <p>Co founder. Student at NYU Stern majoring in Finance. School list strategy, interview prep, and high leverage feedback.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}