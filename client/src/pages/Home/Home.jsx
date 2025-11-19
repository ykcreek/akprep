import Hero from "../../components/Hero/Hero";
import HeroCards from "../../components/Hero/HeroCards";

export default function Home() {
  return (
    <header id="home" className="hero container hero-grid">
      <Hero />
      <HeroCards />
    </header>
  );
}
