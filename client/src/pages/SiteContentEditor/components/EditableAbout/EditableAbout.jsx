// EditableAbout.jsx
import { useRef, useState } from 'react';
import './EditableAbout.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function EditableAbout({ content, onUpdate }) {
  if (!content) return null;

  const [editing, setEditing] = useState(false);

  // Refs for all editable fields
  const titleRef = useRef();
  const subRef = useRef();

  // One ref per founder → { name, desc, img (kept separately) }
  const founderRefs = useRef([]); // will hold { name: el, desc: el } for each founder

  // Initialise refs arrays with correct length on first render
  if (founderRefs.current.length !== (content.founders || []).length) {
    founderRefs.current = (content.founders || []).map(() => ({
      name: null,
      desc: null,
    }));
  }

  const startEditing = () => setEditing(true);

  const cancelEditing = () => {
    // Reset everything to the original content
    titleRef.current.innerText = content.title || 'About us';
    subRef.current.innerText = content.sub || '';

    content.founders?.forEach((founder, i) => {
      if (founderRefs.current[i]) {
        founderRefs.current[i].name.innerText = founder.name || '';
        founderRefs.current[i].desc.innerText = founder.desc || '';
      }
    });

    setEditing(false);
  };

  const saveEditing = async () => {
    const draft = {
      ...content,
      title: titleRef.current.innerText.trim(),
      sub: subRef.current.innerText.trim(),
      founders: content.founders.map((_, i) => ({
        name: founderRefs.current[i].name.innerText.trim(),
        desc: founderRefs.current[i].desc.innerText.trim(),
        img: content.founders[i].img, // image stays the same unless changed via upload
      })),
    };

    // Optimistically update parent UI
    onUpdate(draft);

    try {
      const token = localStorage.getItem('token');
      const uid = localStorage.getItem('uid');

      const response = await fetch(`${API_URL}/site/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          uid,
          key: 'about',           // or "about.title", etc. – adjust to your backend
          value: draft,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('Failed to save:', result.error);
        alert('Save failed: ' + result.error);
      } else {
        console.log('About section saved successfully');
      }
    } catch (err) {
      console.error('Save request failed:', err);
      alert('Save request failed');
    }

    setEditing(false);
  };

  const updateFounderImage = (idx) => (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedFounders = [...content.founders];
      updatedFounders[idx] = { ...updatedFounders[idx], img: reader.result };

      // Immediately reflect the new image (even before Save)
      onUpdate({ ...content, founders: updatedFounders });
    };
    reader.readAsDataURL(file);
  };

  return (
    <section id="about" className="editable-section">
      <div className="editable-container">
        <h2
          className="editable-section-title"
          contentEditable
          suppressContentEditableWarning
          ref={titleRef}
          onFocus={startEditing}
        >
          {content.title || 'About us'}
        </h2>

        <p
          className="editable-section-sub"
          contentEditable
          suppressContentEditableWarning
          ref={subRef}
          onFocus={startEditing}
        >
          {content.sub}
        </p>

        <div className="editable-founders">
          {(content.founders || []).map((founder, idx) => (
            <article key={idx} className="editable-person">
              {/* Image upload */}
              <label className="editable-portrait">
                <img src={founder.img} alt={founder.name || 'Founder'} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={updateFounderImage(idx)}
                  style={{ display: 'none' }}
                />
              </label>

              <div>
                <h5
                  contentEditable
                  suppressContentEditableWarning
                  ref={(el) => (founderRefs.current[idx].name = el)}
                  onFocus={startEditing}
                >
                  {founder.name}
                </h5>

                <p
                  contentEditable
                  suppressContentEditableWarning
                  ref={(el) => (founderRefs.current[idx].desc = el)}
                  onFocus={startEditing}
                >
                  {founder.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Save / Cancel buttons – appear only in edit mode */}
      {editing && (
        <div className="editable-buttons">
          <button className="btn-save" onClick={saveEditing}>
            Save
          </button>
          <button className="btn-cancel" onClick={cancelEditing}>
            Cancel
          </button>
        </div>
      )}
    </section>
  );
}