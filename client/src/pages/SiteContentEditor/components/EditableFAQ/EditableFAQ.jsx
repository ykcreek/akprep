// EditableFAQ.jsx
import { useRef, useState } from 'react';
import './EditableFAQ.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function EditableFAQ({ content, onUpdate }) {
  if (!content) return null;

  const [editing, setEditing] = useState(false);

  // Refs for header
  const titleRef = useRef();
  const subRef = useRef();

  // One ref per FAQ: { question: el, answer: el }
  const faqRefs = useRef([]);

  // Initialize refs if FAQ count changed
  if (faqRefs.current.length !== (content.faqs || []).length) {
    faqRefs.current = (content.faqs || []).map(() => ({
      question: null,
      answer: null,
    }));
  }

  const startEditing = () => setEditing(true);

  const cancelEditing = () => {
    // Restore original values
    titleRef.current.innerText = content.title || '';
    subRef.current.innerText = content.sub || '';

    content.faqs?.forEach((faq, i) => {
      if (faqRefs.current[i]) {
        faqRefs.current[i].question.innerText = faq.question || '';
        faqRefs.current[i].answer.innerText = faq.answer || '';
      }
    });

    setEditing(false);
  };

  const saveEditing = async () => {
    const draft = {
      ...content,
      title: titleRef.current.innerText.trim(),
      sub: subRef.current.innerText.trim(),
      faqs: content.faqs.map((_, i) => ({
        question: faqRefs.current[i]?.question.innerText.trim() || '',
        answer: faqRefs.current[i]?.answer.innerText.trim() || '',
      })).filter(faq => faq.question), // optional: remove empty FAQs
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
          key: 'faq',
          value: draft,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        console.error('Save failed:', result.error);
        alert('Save failed: ' + (result.error || 'Unknown error'));
      } else {
        console.log('FAQ section saved successfully');
      }
    } catch (err) {
      console.error('Save request failed:', err);
      alert('Failed to save changes');
    }

    setEditing(false);
  };

  return (
    <section id="faq" className="editable-faq-section">
      <div className="editable-faq-container">

        <h2
          className="editable-faq-title"
          contentEditable
          suppressContentEditableWarning
          ref={titleRef}
          onFocus={startEditing}
        >
          {content.title}
        </h2>

        <p
          className="editable-faq-subtitle"
          contentEditable
          suppressContentEditableWarning
          ref={subRef}
          onFocus={startEditing}
        >
          {content.sub}
        </p>

        <div className="editable-faq-list">
          {(content.faqs || []).map((item, idx) => (
            <details key={idx} className="editable-faq-item" open={editing}>
              <summary
                className="editable-faq-question"
                contentEditable
                suppressContentEditableWarning
                ref={el => faqRefs.current[idx].question = el}
                onFocus={startEditing}
              >
                {item.question}
              </summary>

              <p
                className="editable-faq-answer"
                contentEditable
                suppressContentEditableWarning
                ref={el => faqRefs.current[idx].answer = el}
                onFocus={startEditing}
              >
                {item.answer}
              </p>
            </details>
          ))}
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