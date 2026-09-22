import { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IconClose } from '../Icons';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EditProfileModal() {
  const { openModals, closeModal, profile, updateProfile, showToast } = useApp();
  const open = openModals['edit-profile'];

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [title, setTitle] = useState(profile.title);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    if (open) {
      setName(profile.name);
      setEmail(profile.email);
      setPhone(profile.phone);
      setTitle(profile.title);
      setNameError(false);
      setEmailError(false);
    }
  }, [open, profile]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    let valid = true;
    if (!trimmedName) { setNameError(true); valid = false; } else setNameError(false);
    if (!emailPattern.test(trimmedEmail)) { setEmailError(true); valid = false; } else setEmailError(false);
    if (!valid) return;
    updateProfile({ name: trimmedName, email: trimmedEmail, phone: phone.trim(), title: title.trim() || profile.title });
    closeModal('edit-profile');
    showToast('Profile updated');
  }

  return (
    <div className={'modal-backdrop' + (open ? ' open' : '')} id="modal-edit-profile">
      <div className="modal-blur">
        <div className="statusbar-spacer" />
        <div className="col" style={{ padding: '8px 24px 12px' }}>
          <span style={{ fontSize: 26, fontWeight: 700 }}>Profile</span>
        </div>
      </div>
      <div className="modal-scrim" onClick={() => closeModal('edit-profile')} />
      <div className="sheet">
        <div className="drag-handle" />
        <div className="row" style={{ alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px 12px 20px', flexShrink: 0 }}>
          <span style={{ fontSize: 20, fontWeight: 700 }}>Edit profile</span>
          <button className="close-btn" onClick={() => closeModal('edit-profile')}><IconClose width={17} height={17} /></button>
        </div>

        <form id="edit-profile-form" className="scroll col" noValidate style={{ padding: '6px 20px 130px', gap: 16 }} onSubmit={handleSubmit}>
          <div className="col field">
            <label htmlFor="ep-name">Full name</label>
            <input type="text" id="ep-name" autoComplete="name" className={nameError ? 'input-error' : ''} value={name} onChange={(e) => { setName(e.target.value); setNameError(false); }} />
            <span className={'field-error' + (nameError ? ' show' : '')}>Enter your full name.</span>
          </div>
          <div className="col field">
            <label htmlFor="ep-email">Email</label>
            <input type="email" id="ep-email" autoComplete="email" className={emailError ? 'input-error' : ''} value={email} onChange={(e) => { setEmail(e.target.value); setEmailError(false); }} />
            <span className={'field-error' + (emailError ? ' show' : '')}>Enter a valid email address.</span>
          </div>
          <div className="col field">
            <label htmlFor="ep-phone">Phone</label>
            <input type="tel" id="ep-phone" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="col field">
            <label htmlFor="ep-title">Title</label>
            <input type="text" id="ep-title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
        </form>

        <div className="col" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: 'var(--nav-bg)', backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)', borderTop: '1px solid var(--border-soft)', padding: '12px 20px 18px', gap: 9, zIndex: 3 }}>
          <button className="btn-primary" type="submit" form="edit-profile-form">Save changes</button>
        </div>
      </div>
    </div>
  );
}
