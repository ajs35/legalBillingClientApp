import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IconBack, IconCheckCircle } from '../components/Icons';

export function ContactUsView() {
  const { gotoView, profile } = useApp();
  const [category, setCategory] = useState('billing');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [subjectError, setSubjectError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subjErr = !subject.trim();
    const msgErr = message.trim().length < 5;
    setSubjectError(subjErr);
    setMessageError(msgErr);
    if (subjErr || msgErr) return;
    setSent(true);
  }

  function sendAnother() {
    setCategory('billing');
    setSubject('');
    setMessage('');
    setSubjectError(false);
    setMessageError(false);
    setSent(false);
  }

  return (
    <section className="view active">
      <div className="statusbar-spacer" />
      <div className="row" style={{ alignItems: 'center', gap: 10, padding: '8px 20px 12px', flexShrink: 0 }}>
        <button className="close-btn" onClick={() => gotoView('profile')}><IconBack /></button>
        <span style={{ fontSize: 20, fontWeight: 700 }}>Contact us</span>
      </div>
      <div className="scroll col" style={{ paddingTop: 4, paddingLeft: 20, paddingRight: 20, gap: 20 }}>
        <span style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.5 }}>
          Send our support team a message and we'll reply to <strong>{profile.email}</strong> within one business day.
        </span>

        {!sent ? (
          <form className="col" noValidate style={{ gap: 16 }} onSubmit={handleSubmit}>
            <div className="col field">
              <label htmlFor="contact-category">Category</label>
              <select id="contact-category" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="billing">Billing</option>
                <option value="technical">Technical issue</option>
                <option value="feature">Feature request</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="col field">
              <label htmlFor="contact-subject">Subject</label>
              <input
                type="text" id="contact-subject" placeholder="Brief summary of your question"
                className={subjectError ? 'input-error' : ''}
                value={subject}
                onChange={(e) => { setSubject(e.target.value); setSubjectError(false); }}
              />
              <span className={'field-error' + (subjectError ? ' show' : '')}>Enter a subject so we know what this is about.</span>
            </div>
            <div className="col field">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message" rows={6} placeholder="Tell us what's going on…"
                className={messageError ? 'input-error' : ''}
                value={message}
                onChange={(e) => { setMessage(e.target.value); setMessageError(false); }}
              />
              <span className={'field-error' + (messageError ? ' show' : '')}>Enter a message — at least a sentence helps us help you.</span>
            </div>
            <button type="submit" className="btn-primary">Send message</button>
          </form>
        ) : (
          <div className="col" style={{ alignItems: 'center', textAlign: 'center', gap: 12, padding: '28px 10px' }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--good-soft)', border: '1px solid var(--good-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconCheckCircle width={24} height={24} />
            </div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Message sent</div>
            <div style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.5, maxWidth: 280 }}>We'll reply within one business day. Thanks for the details, {profile.name.split(' ')[0]}.</div>
            <button className="btn-tertiary accent" onClick={sendAnother}>Send another message</button>
          </div>
        )}
      </div>
    </section>
  );
}
