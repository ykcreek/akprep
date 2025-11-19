import Features from "../../components/Services/Features";
import Pricing from "../../components/Services/Pricing";

export default function Services() {
  return (
    <section id="services">
      <div className="container">
        <h2 className="section-title">Tutoring center, services, and pricing</h2>
        <p className="section-sub">
          Every package includes school list strategy, essay calendars, weekly check ins, and fast feedback.
        </p>

        <Features />
        <Pricing />
      </div>
    </section>
  );
}
