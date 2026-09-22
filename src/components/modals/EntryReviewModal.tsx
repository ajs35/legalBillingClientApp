import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IconClose, IconCheckThin } from '../Icons';

const draftLines = [
  { code: 'L210 · Drafting', hours: '2.0h', text: 'Drafted motion to compel discovery responses.' },
  { code: 'L110 · Fact Investigation', hours: '0.6h', text: 'Telephone conference with client regarding motion strategy.' },
  { code: 'L190 · Other Case Admin', hours: '1.5h', text: 'Prepared and e-filed motion with the court.' },
];

const complianceChecks = [
  'Block-billed entry separated into task-level detail',
  'Task codes assigned to every line',
  'Narratives meet minimum detail threshold',
  'Split hours reconcile to original 4.1h',
];

export function EntryReviewModal() {
  const { openModals, closeModal } = useApp();
  const open = openModals.detail;
  const [tab, setTab] = useState<'original' | 'draft'>('draft');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className={'modal-backdrop' + (open ? ' open' : '')} id="modal-detail">
      <div className="modal-blur">
        <div className="statusbar-spacer" />
        <div className="col" style={{ padding: '8px 24px 12px', gap: 12 }}>
          <span style={{ fontSize: 26, fontWeight: 700 }}>Review queue</span>
          <div className="row" style={{ gap: 7 }}>
            <div className="pill" style={{ background: 'var(--solid)', color: '#fff' }}>All</div>
            <div className="pill" style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--ink-soft)' }}>Narrative</div>
          </div>
        </div>
      </div>
      <div className="modal-scrim" onClick={() => closeModal('detail')} />
      <div className="sheet">
        <div className="drag-handle" />
        <div className="col" style={{ padding: '10px 14px 10px 20px', flexShrink: 0, gap: 8 }}>
          <div className="row" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 20, fontWeight: 700 }}>Entry review</span>
            <button className="close-btn" onClick={() => closeModal('detail')}><IconClose width={17} height={17} /></button>
          </div>
          <div className="col" style={{ gap: 3 }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Halvorsen v. Meridian Holdings</div>
            <div className="row" style={{ alignItems: 'center', gap: 8 }}>
              <span className="pill" style={{ background: 'var(--danger-soft)', color: 'var(--danger-ink)' }}>Block-billed</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--ink-faint)' }}>9/19 · 4.1h · T. Reyes</span>
            </div>
          </div>
        </div>

        <div className="scroll col" style={{ padding: '6px 20px 148px', gap: 16 }}>
          <div className="seg">
            <button className={tab === 'original' ? 'active' : ''} onClick={() => setTab('original')}>Original note</button>
            <button className={tab === 'draft' ? 'active' : ''} onClick={() => setTab('draft')}>Brief's draft</button>
          </div>

          {tab === 'original' && (
            <div className="col card" style={{ padding: 15, gap: 6, background: 'var(--bg)' }}>
              <div style={{ fontSize: 11, color: 'var(--ink-faint)' }}>As logged by timekeeper</div>
              <div style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--ink-soft)', fontStyle: 'italic' }}>"Worked on Halvorsen case — drafted motion, talked to client, filed with court."</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--ink-faint)', marginTop: 4 }}>1 entry · 4.1h · no task code</div>
            </div>
          )}

          {tab === 'draft' && (
            <div className="col" style={{ gap: 8 }}>
              {draftLines.map((line) => (
                <div key={line.code} className="col" style={{ background: 'var(--bg)', border: '1px solid var(--border-soft)', borderRadius: 8, padding: '13px 14px', gap: 6 }}>
                  <div className="row" style={{ justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, background: 'var(--accent-soft)', color: 'var(--accent-ink)', borderRadius: 20, padding: '3px 9px' }}>{line.code}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600 }}>{line.hours}</span>
                  </div>
                  <div style={{ fontSize: 12.5, lineHeight: 1.5 }}>{line.text}</div>
                </div>
              ))}
            </div>
          )}

          <div className="col" style={{ gap: 9 }}>
            <div style={{ fontSize: 15.5, fontWeight: 700 }}>Compliance check</div>
            <div className="col card" style={{ background: 'var(--bg)' }}>
              {complianceChecks.map((c, i) => (
                <div key={c} className="row" style={{ alignItems: 'center', gap: 10, padding: '11px 14px', borderBottom: i < complianceChecks.length - 1 ? '1px solid var(--border-soft)' : 'none' }}>
                  <IconCheckThin />
                  <span style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>{c}</span>
                </div>
              ))}
            </div>
          </div>

          {submitted && (
            <div className="row" style={{ background: 'var(--good-soft)', border: '1px solid var(--good-border)', borderRadius: 8, padding: '12px 13px', gap: 9, alignItems: 'center' }}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--good)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="m8.5 12.5 2.5 2.5 5-5" /></svg>
              <div style={{ fontSize: 12.5, lineHeight: 1.4 }}><strong>Approved.</strong> Split entries queued for the next pre-bill.</div>
            </div>
          )}
        </div>

        {!submitted && (
          <div className="col" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: 'var(--nav-bg)', backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)', borderTop: '1px solid var(--border-soft)', padding: '12px 20px 18px', gap: 9, zIndex: 3 }}>
            <button className="btn-primary" onClick={() => setSubmitted(true)}>Approve &amp; submit</button>
            <button className="btn-tertiary" style={{ padding: 14 }}>Send back</button>
          </div>
        )}
      </div>
    </div>
  );
}
