import { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IconClose, IconCircleCheck, IconCircleOutline, IconEye } from '../Icons';

const pwRequirements: { key: string; label: string; test: (v: string) => boolean }[] = [
  { key: 'len', label: 'At least 8 characters', test: (v) => v.length >= 8 },
  { key: 'upper', label: 'One uppercase letter', test: (v) => /[A-Z]/.test(v) },
  { key: 'lower', label: 'One lowercase letter', test: (v) => /[a-z]/.test(v) },
  { key: 'number', label: 'One number', test: (v) => /[0-9]/.test(v) },
  { key: 'special', label: 'One special character', test: (v) => /[^A-Za-z0-9]/.test(v) },
];

function meetsAll(v: string) {
  return pwRequirements.every((r) => r.test(v));
}

export function PasswordModal() {
  const { openModals, closeModal, showToast } = useApp();
  const open = openModals.password;

  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [currentError, setCurrentError] = useState(false);
  const [nextError, setNextError] = useState(false);
  const [nextErrorMsg, setNextErrorMsg] = useState('Choose a password that meets every requirement below.');
  const [confirmError, setConfirmError] = useState(false);

  useEffect(() => {
    if (open) {
      setCurrent(''); setNext(''); setConfirm('');
      setShowCurrent(false); setShowNext(false); setShowConfirm(false);
      setCurrentError(false); setNextError(false); setConfirmError(false);
      setNextErrorMsg('Choose a password that meets every requirement below.');
    }
  }, [open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let valid = true;
    const curErr = !current;
    setCurrentError(curErr);
    if (curErr) valid = false;

    let nErr = !meetsAll(next);
    let msg = 'Choose a password that meets every requirement below.';
    if (next && current && next === current) {
      msg = 'New password must be different from your current password.';
      nErr = true;
    }
    setNextErrorMsg(msg);
    setNextError(nErr);
    if (nErr) valid = false;

    const cErr = confirm !== next || !confirm;
    setConfirmError(cErr);
    if (cErr) valid = false;

    if (!valid) return;
    closeModal('password');
    showToast('Password updated');
  }

  return (
    <div className={'modal-backdrop' + (open ? ' open' : '')} id="modal-password">
      <div className="modal-blur">
        <div className="statusbar-spacer" />
        <div className="col" style={{ padding: '8px 24px 12px' }}>
          <span style={{ fontSize: 26, fontWeight: 700 }}>Profile</span>
        </div>
      </div>
      <div className="modal-scrim" onClick={() => closeModal('password')} />
      <div className="sheet">
        <div className="drag-handle" />
        <div className="row" style={{ alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px 12px 20px', flexShrink: 0 }}>
          <span style={{ fontSize: 20, fontWeight: 700 }}>Password &amp; security</span>
          <button className="close-btn" onClick={() => closeModal('password')}><IconClose width={17} height={17} /></button>
        </div>

        <form id="password-form" className="scroll col" noValidate style={{ padding: '6px 20px 130px', gap: 16 }} onSubmit={handleSubmit}>
          <div className="col field">
            <label htmlFor="pw-current">Current password</label>
            <div className="input-wrap">
              <input
                type={showCurrent ? 'text' : 'password'} id="pw-current" autoComplete="current-password"
                className={currentError ? 'input-error' : ''}
                value={current}
                onChange={(e) => { setCurrent(e.target.value); setCurrentError(false); }}
              />
              <button type="button" className="input-eye" aria-label="Show password" onClick={() => setShowCurrent((s) => !s)}><IconEye /></button>
            </div>
            <span className={'field-error' + (currentError ? ' show' : '')}>Enter your current password.</span>
          </div>

          <div className="col field">
            <label htmlFor="pw-new">New password</label>
            <div className="input-wrap">
              <input
                type={showNext ? 'text' : 'password'} id="pw-new" autoComplete="new-password"
                className={nextError ? 'input-error' : ''}
                value={next}
                onChange={(e) => { setNext(e.target.value); setNextError(false); }}
              />
              <button type="button" className="input-eye" aria-label="Show password" onClick={() => setShowNext((s) => !s)}><IconEye /></button>
            </div>
            <span className={'field-error' + (nextError ? ' show' : '')}>{nextErrorMsg}</span>
          </div>

          <div className="col" style={{ gap: 7, background: 'var(--track)', borderRadius: 8, padding: '12px 13px' }}>
            {pwRequirements.map((r) => {
              const met = r.test(next);
              return (
                <div key={r.key} className={'row pw-req' + (met ? ' met' : '')}>
                  <IconCircleOutline className="req-unmet" />
                  <IconCircleCheck className="req-met" />
                  <span>{r.label}</span>
                </div>
              );
            })}
          </div>

          <div className="col field">
            <label htmlFor="pw-confirm">Confirm new password</label>
            <div className="input-wrap">
              <input
                type={showConfirm ? 'text' : 'password'} id="pw-confirm" autoComplete="new-password"
                className={confirmError ? 'input-error' : ''}
                value={confirm}
                onChange={(e) => { setConfirm(e.target.value); setConfirmError(false); }}
              />
              <button type="button" className="input-eye" aria-label="Show password" onClick={() => setShowConfirm((s) => !s)}><IconEye /></button>
            </div>
            <span className={'field-error' + (confirmError ? ' show' : '')}>Passwords don't match.</span>
          </div>
        </form>

        <div className="col" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: 'var(--nav-bg)', backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)', borderTop: '1px solid var(--border-soft)', padding: '12px 20px 18px', gap: 9, zIndex: 3 }}>
          <button className="btn-primary" type="submit" form="password-form">Update password</button>
        </div>
      </div>
    </div>
  );
}
