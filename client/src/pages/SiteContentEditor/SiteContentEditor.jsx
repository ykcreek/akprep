import EditableHero from './components/EditableHero/EditableHero';
import EditableAbout from './components/EditableAbout/EditableAbout';
import EditableProcess from './components/EditableProcess/EditableProcess';
import EditableServices from './components/EditableServices/EditableServices';
import EditableFAQ from './components/EditableFAQ/EditableFAQ';
import Contact from '../../components/Contact/Contact';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useState, useEffect } from 'react';
import './SiteContentEditor.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function SiteContentEditor() {
  const [content, setContent] = useState(null);
  const [editingContent, setEditingContent] = useState(null); // temporary edits
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const res = await fetch(`${API_URL}/site/content`);
        const data = await res.json();
        if (data.success) {
          setContent(data.content);
          setEditingContent(data.content); // init editable copy
        }
      } catch (err) {
        console.error("Failed to load content:", err);
      }
    };
    loadContent();
  }, []);

  if (!editingContent) return <div>Loading...</div>;

  const handleUpdate = (section, updatedSection) => {
    setEditingContent(prev => ({
      ...prev,
      [section]: updatedSection
    }));
  };

  return (
    <div className='site-container'>
      <Navbar />
      <EditableHero
        content={editingContent.hero}
        onUpdate={(updated) => handleUpdate("hero", updated)}
      />
      <EditableAbout
        content={editingContent.about}
        onUpdate={(updated) => handleUpdate("about", updated)}
      />
      <EditableProcess
        content={editingContent.process}
        onUpdate={(updated) => handleUpdate("process", updated)}
      />
      <EditableServices
        content={editingContent.services}
        onUpdate={(updated) => handleUpdate("services", updated)}
      />
      <EditableFAQ
        content={editingContent.faq}
        onUpdate={(updated) => handleUpdate("faq", updated)}
      />
      <Contact />
      <Footer />  
    </div>
  );
}
