import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import ServicesPage from "./pages/Services/Services";
import ProcessPage from "./pages/Process/Process";
import ResultsPage from "./pages/Results/Results";
import FAQPage from "./pages/FAQ/FAQ";
import ContactPage from "./pages/Contact/Contact";

export default function App() {
  const sendEmail = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const name = encodeURIComponent(formData.get("name"));
    const email = encodeURIComponent(formData.get("email"));
    const topic = encodeURIComponent(formData.get("topic") || "Inquiry");
    const message = encodeURIComponent(formData.get("message"));

    const body = `From: ${name} (%3C${email}%3E)%0D%0A%0D%0A${message}`;

    window.location.href = `mailto:hello@akprep.co?subject=${topic}&body=${body}`;

    event.currentTarget.reset();
  };

  return (
    <div className="page">
      <Nav />

      <Home />
      <About />
      <ServicesPage />
      <ProcessPage />
      <ResultsPage />
      <FAQPage />
      <ContactPage sendEmail={sendEmail} />

      <Footer />
    </div>
  );
}
