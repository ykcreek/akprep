// EditableProcess.jsx
import { useRef, useState } from 'react';
import './EditableProcess.css';
import { FaCheck } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL;

export default function EditableProcess({ content, onUpdate }) {
  if (!content) return null;

  const [editing, setEditing] = useState(false);

  // Simple fields
  const titleRef = useRef();
  const subRef = useRef();
  const disclaimerRef = useRef();

  // One ref object per step: { num, title, desc, items: [el, el...] }
  const stepRefs = useRef([]);

  // Initialize refs structure if length changed
  if (stepRefs.current.length !== content.processes.length) {
    stepRefs.current = content.processes.map(() => ({
      num: null,
      title: null,
      desc: null,
      items: [],
    }));
  }

  const startEditing = () => setEditing(true);

  const cancelEditing = () => {
    // Restore original values
    titleRef.current.innerText = content.title || '';
    subRef.current.innerText = content.sub || '';
    disclaimerRef.current.innerText = `Disclaimer: ${content.disclaimer || ''}`.trim();

    content.processes.forEach((step, stepIdx) => {
      const refs = stepRefs.current[stepIdx];
      if (refs.num) refs.num.innerText = step.num;
      if (refs.title) refs.title.innerText = step.title;
      if (refs.desc) refs.desc.innerText = step.desc;
      step.items.forEach((item, itemIdx) => {
        if (refs.items[itemIdx]) {
          refs.items[itemIdx].innerText = item;
        }
      });
    });

    setEditing(false);
  };

  const saveEditing = async () => {
    const draft = {
      ...content,
      title: titleRef.current.innerText.trim(),
      sub: subRef.current.innerText.trim(),
      disclaimer: disclaimerRef.current.innerText.replace(/^Disclaimer:\s*/i, '').trim(),
      processes: content.processes.map((_, stepIdx) => {
        const r = stepRefs.current[stepIdx];
        return {
          num: r.num.innerText.trim(),
          title: r.title.innerText.trim(),
          desc: r.desc.innerText.trim(),
          items: r.items.map(el => el.innerText.trim()),
        };
      }),
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
          key: 'process',
          value: draft,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        console.error('Save failed:', result.error);
        alert('Save failed: ' + (result.error || 'Unknown error'));
      } else {
        console.log('Process section saved successfully');
      }
    } catch (err) {
      console.error('Save request failed:', err);
      alert('Failed to save changes');
    }

    setEditing(false);
  };

  return (
    <section id="process" className="editable-process-section">
      <div className="editable-container">

        {/* Header */}
        <div className="editable-process-header">
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

        {/* Steps Grid */}
        <div className="editable-process-grid">
          {content.processes.map((step, stepIdx) => (
            <div key={step.num} className="editable-step-card">

              {/* Step Number */}
              <div
                className="editable-step-number"
                contentEditable
                suppressContentEditableWarning
                ref={el => stepRefs.current[stepIdx].num = el}
                onFocus={startEditing}
              >
                {step.num}
              </div>

              <h3
                contentEditable
                suppressContentEditableWarning
                ref={el => stepRefs.current[stepIdx].title = el}
                onFocus={startEditing}
              >
                {step.title}
              </h3>

              <p
                className="editable-step-desc"
                contentEditable
                suppressContentEditableWarning
                ref={el => stepRefs.current[stepIdx].desc = el}
                onFocus={startEditing}
              >
                {step.desc}
              </p>

              <ul className="editable-step-list">
                {step.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <FaCheck className="checkmark-icon" />
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      ref={el => stepRefs.current[stepIdx].items[itemIdx] = el}
                      onFocus={startEditing}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p
          className="editable-process-disclaimer"
          contentEditable
          suppressContentEditableWarning
          ref={disclaimerRef}
          onFocus={startEditing}
        >
          Disclaimer: {content.disclaimer}
        </p>
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