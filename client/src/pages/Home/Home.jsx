import Hero from '../../components/Hero/Hero'
import About from '../../components/About/About'
import Process from '../../components/Process/Process'
import Services from '../../components/Services/Services'
import Results from '../../components/Results/Results'
import FAQ from '../../components/FAQ/FAQ'
import Contact from '../../components/Contact/Contact'
import { useState, useEffect } from 'react'

export default function Home() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/site/content`);
        const data = await res.json();
        if (data.success) {
          setContent(data.content);
        }
      } catch (err) {
        console.error("Failed to load content:", err);
      }
    };

    loadContent();
  }, []);

  if (!content) return <div>Loading...</div>;
  return (
    <>
      <Hero content={content.hero}/>
      <About content={content.about}/>
      <Process content={content.process}/>
      <Services content={content.services}/>
      <FAQ  content={content.faq}/>
      <Contact />
    </>
  )
}