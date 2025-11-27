import "./Calendar.css";

export default function Calendar() {
  return (
    <section className="calendar-page">
      <div className="calendar-container">
        <div className="calendar-header">
          <h1 className="calendar-title">Book Your Strategy Call</h1>
          <p className="calendar-sub">
            Choose a time that works best for you. We can't wait to meet you.
          </p>
        </div>

        <div className="calendar-embed-wrapper">
          <iframe
            src="https://cal.com/vita-prep-cb06c0/intro-call"
            className="calendar-embed"
            allow="camera; microphone; fullscreen"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
