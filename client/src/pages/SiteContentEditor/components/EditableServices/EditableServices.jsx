// EditableServices.jsx
import { useRef, useState } from 'react';
import './EditableServices.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function EditableServices({ content, onUpdate }) {
  if (!content) return null;

  const [editing, setEditing] = useState(false);

  // Refs for simple fields
  const titleRef = useRef();
  const subRef = useRef();

  // Features: array of { name: el, desc: el }
  const featureRefs = useRef([]);
  if (featureRefs.current.length !== (content.features || []).length) {
    featureRefs.current = (content.features || []).map(() => ({ name: null, desc: null }));
  }

  // Session card
  const sessionTitleRef = useRef();
  const sessionPriceRef = useRef();
  const sessionFeatureRefs = useRef([]);
  if (sessionFeatureRefs.current.length !== (content.session?.features || []).length) {
    sessionFeatureRefs.current = (content.session?.features || []).map(() => null);
  }

  // Packs
  const packRefs = useRef([]);
  if (packRefs.current.length !== (content.packs || []).length) {
    packRefs.current = (content.packs || []).map(() => ({
      title: null,
      rate: null,
      desc: null,
    }));
  }

  const startEditing = () => setEditing(true);

  const cancelEditing = () => {
    // Reset all fields to original content
    titleRef.current.innerText = content.title || '';
    subRef.current.innerText = content.sub || '';

    // Features
    content.features?.forEach((feat, i) => {
      if (featureRefs.current[i]) {
        featureRefs.current[i].name.innerText = feat.name || '';
        featureRefs.current[i].desc.innerText = feat.desc || '';
      }
    });

    // Session
    if (content.session) {
      sessionTitleRef.current.innerText = content.session.title || '';
      sessionPriceRef.current.innerText = content.session.price || '';
      content.session.features?.forEach((feat, i) => {
        if (sessionFeatureRefs.current[i]) {
          sessionFeatureRefs.current[i].innerText = feat || '';
        }
      });
    }

    // Packs
    content.packs?.forEach((pack, i) => {
      if (packRefs.current[i]) {
        packRefs.current[i].title.innerText = pack.title || '';
        if (packRefs.current[i].rate) packRefs.current[i].rate.innerText = pack.rate || '';
        packRefs.current[i].desc.innerText = pack.desc || '';
      }
    });

    setEditing(false);
  };

  const saveEditing = async () => {
    const draft = {
      ...content,
      title: titleRef.current.innerText.trim(),
      sub: subRef.current.innerText.trim(),

      features: content.features.map((_, i) => ({
        name: featureRefs.current[i]?.name.innerText.trim() || '',
        desc: featureRefs.current[i]?.desc.innerText.trim() || '',
      })),

      session: content.session && {
        ...content.session,
        title: sessionTitleRef.current.innerText.trim(),
        price: sessionPriceRef.current.innerText.trim(),
        features: sessionFeatureRefs.current.map(el => el?.innerText.trim() || ''),
      },

      packs: content.packs.map((_, i) => ({
        title: packRefs.current[i]?.title.innerText.trim() || '',
        rate: packRefs.current[i]?.rate?.innerText.trim() || null,
        desc: packRefs.current[i]?.desc.innerText.trim() || '',
      })).filter(p => p.title), // optional: remove empty packs
    };

    // Optimistically update parent
    onUpdate(draft);

    try {
      const token = localStorage.getItem('token');
      const uid = localStorage.getItem('uid');

      const res = await fetch(`${API_URL}/site/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          uid,
          key: 'services',
          value: draft,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        console.error('Save failed:', result.error);
        alert('Save failed: ' + (result.error || 'Unknown error'));
      } else {
        console.log('Services saved successfully');
      }
    } catch (err) {
      console.error('Request failed:', err);
      alert('Failed to save changes');
    }

    setEditing(false);
  };

  return (
    <section id="services" className="editable-services-section">
      <div className="editable-container">

        {/* Header */}
        <div className="editable-services-header">
          <h2
            className="editable-section-title"
            contentEditable
            suppressContentEditableWarning
            ref={titleRef}
            onFocus={startEditing}
          >
            {content.title}
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
        </div>

        {/* Feature Tags */}
        <div className="editable-feature-grid">
          {(content.features || []).map((feature, idx) => (
            <div key={idx} className="editable-feature">
              <strong
                contentEditable
                suppressContentEditableWarning
                ref={el => featureRefs.current[idx].name = el}
                onFocus={startEditing}
              >
                {feature.name}
              </strong>
              <span
                contentEditable
                suppressContentEditableWarning
                ref={el => featureRefs.current[idx].desc = el}
                onFocus={startEditing}
              >
                {feature.desc}
              </span>
            </div>
          ))}
        </div>

        {/* Pricing Layout */}
        <div className="editable-pricing-layout">

          {/* Session Card */}
          {content.session && (
            <div className="editable-session-card">
              <h3
                contentEditable
                suppressContentEditableWarning
                ref={sessionTitleRef}
                onFocus={startEditing}
              >
                {content.session.title}
              </h3>
              <div className="editable-session-price">
                $<span
                  contentEditable
                  suppressContentEditableWarning
                  ref={sessionPriceRef}
                  onFocus={startEditing}
                >{content.session.price}</span> <span>/ hour</span>
              </div>
              <ul className="editable-features-list">
                {(content.session.features || []).map((feat, idx) => (
                  <li key={idx}>
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      ref={el => sessionFeatureRefs.current[idx] = el}
                      onFocus={startEditing}
                    >
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Packs Grid */}
          <div className="editable-pack-grid">
            {(content.packs || []).map((pack, idx) => (
              <div key={idx} className="editable-pack">
                <div>
                  <h4 className="editable-pack-title">
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      ref={el => packRefs.current[idx].title = el}
                      onFocus={startEditing}
                    >
                      {pack.title}
                    </span>
                    {pack.rate && (
                      <span className="editable-rate">
                        <span
                          contentEditable
                          suppressContentEditableWarning
                          ref={el => packRefs.current[idx].rate = el}
                          onFocus={startEditing}
                        >
                          {pack.rate}
                        </span>
                      </span>
                    )}
                  </h4>
                  <p
                    className="editable-pack-desc"
                    contentEditable
                    suppressContentEditableWarning
                    ref={el => packRefs.current[idx].desc = el}
                    onFocus={startEditing}
                  >
                    {pack.desc}
                  </p>
                </div>
                <a href="/student-form" className="editable-pack-btn">
                  Book a Call
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Save / Cancel Buttons */}
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