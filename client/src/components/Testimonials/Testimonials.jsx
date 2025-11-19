import { testimonials } from "../../Data/testimonials";

export default function Testimonials() {
  return (
    <div className="testimonials">
      {testimonials.map((t) => (
        <blockquote key={t.name} className="quote">
          <p>{t.quote}</p>
          <small>{t.name}</small>
        </blockquote>
      ))}
    </div>
  );
}