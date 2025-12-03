import { useRef, useState } from 'react';
import './EditableHero.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function EditableHero({ content, onUpdate }) {
  if (!content) return null;

  const [editing, setEditing] = useState(false);

  // Refs for editable fields
  const eyebrowRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const pillsRef = useRef([]);
  const cardRefs = useRef([]);

  const startEditing = () => setEditing(true);
  const cancelEditing = () => {
    setEditing(false);
    // Reset DOM to original content
    eyebrowRef.current.innerText = content.eyebrow;
    titleRef.current.innerText = content.title;
    subtitleRef.current.innerText = content.subtitle;
    content["hero-pills"].forEach((pill, i) => {
      pillsRef.current[i].innerText = pill;
    });
    content["hero-cards"].forEach((card, idx) => {
      const refs = cardRefs.current[idx];
      refs.tag.innerText = card.tag;
      refs.title.innerText = card.title;
      refs.desc.innerText = card.description;
    });
  };

  const saveEditing = async () => {
  const draft = {
    eyebrow: eyebrowRef.current.innerText,
    title: titleRef.current.innerText,
    subtitle: subtitleRef.current.innerText,
    "hero-pills": pillsRef.current.map(el => el.innerText),
    "hero-cards": cardRefs.current.map(r => ({
      tag: r.tag.innerText,
      title: r.title.innerText,
      description: r.desc.innerText,
    })),
  };

  // Update parent state
  onUpdate(draft);

  try {
    const token = localStorage.getItem("token"); // make sure this is set
    const uid = localStorage.getItem("uid");     // make sure this is set
    const response = await fetch(`${import.meta.env.VITE_API_URL}/site/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // your @require_auth expects auth
      },
      body: JSON.stringify({
        uid, 
        key: "hero",   // key can also be "hero.hero-cards.0.title" if you want granular
        value: draft
      })
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Failed to save:", result.error);
      alert("Save failed: " + result.error);
    } else {
      console.log("Saved successfully:", result.updated);
    }

  } catch (err) {
    console.error("Save request failed:", err);
    alert("Save request failed");
  }

  setEditing(false);
};

  return (
    <header id="home" className="editable-hero">
      <div className="editable-hero-grid">

        {/* Left side */}
        <div className="editable-hero-content">
          <div
            className="editable-eyebrow"
            contentEditable
            suppressContentEditableWarning
            ref={eyebrowRef}
            onFocus={startEditing}
          >
            {content.eyebrow}
          </div>

          <h1
            className="editable-title"
            contentEditable
            suppressContentEditableWarning
            ref={titleRef}
            onFocus={startEditing}
          >
            {content.title}
          </h1>

          <p
            className="editable-subtitle"
            contentEditable
            suppressContentEditableWarning
            ref={subtitleRef}
            onFocus={startEditing}
          >
            {content.subtitle}
          </p>

          <div className="editable-hero-pills">
            {content["hero-pills"].map((pill, i) => (
              <span
                key={i}
                className="editable-pill"
                contentEditable
                suppressContentEditableWarning
                ref={el => pillsRef.current[i] = el}
                onFocus={startEditing}
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Right side – Cards */}
        <div className="editable-hero-cards">
          {content["hero-cards"].map((card, idx) => (
            <div key={idx} className="editable-card">
              <span
                className="editable-tag"
                contentEditable
                suppressContentEditableWarning
                ref={el => {
                  if (!cardRefs.current[idx]) cardRefs.current[idx] = {};
                  cardRefs.current[idx].tag = el;
                }}
                onFocus={startEditing}
              >
                {card.tag}
              </span>

              <h4
                contentEditable
                suppressContentEditableWarning
                ref={el => {
                  if (!cardRefs.current[idx]) cardRefs.current[idx] = {};
                  cardRefs.current[idx].title = el;
                }}
                onFocus={startEditing}
              >
                {card.title}
              </h4>

              <p
                className="editable-card-subtitle"
                contentEditable
                suppressContentEditableWarning
                ref={el => {
                  if (!cardRefs.current[idx]) cardRefs.current[idx] = {};
                  cardRefs.current[idx].desc = el;
                }}
                onFocus={startEditing}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Save/Cancel buttons */}
      {editing && (
        <div className="editable-buttons">
          <button className="btn-save" onClick={saveEditing}>Save</button>
          <button className="btn-cancel" onClick={cancelEditing}>Cancel</button>
        </div>
      )}
    </header>
  );
}
