import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IconClose, IconMic, IconSparkleAccent, IconTypeFaint } from '../Icons';

export function CaptureModal() {
  const { openModals, closeModal } = useApp();
  const open = openModals.capture;
  const [mode, setMode] = useState<'voice' | 'type'>('voice');
  const [duration, setDuration] = useState(1.2);
  const [approved, setApproved] = useState(false);

  function reset() {
    setMode('voice');
    setDuration(1.2);
    setApproved(false);
  }

  return (
    <div className={'modal-backdrop' + (open ? ' open' : '')} id="modal-capture">
      <div className="modal-blur">
        <div className="statusbar-spacer" />
        <div className="col" style={{ padding: '8px 24px 26px', gap: 16 }}>
          <div style={{ fontSize: 13.5, color: 'var(--ink-faint)' }}>Monday, September 21</div>
          <div style={{ fontSize: 35, fontWeight: 300, lineHeight: 1.18 }}>Good afternoon,<br />Maya</div>
        </div>
        <div className="col" style={{ padding: '0 24px', gap: 16 }}>
          <div className="row" style={{ alignItems: 'center', gap: 10, background: 'var(--accent-soft)', borderRadius: 8, padding: '11px 13px' }}>
            <span style={{ fontSize: 12.5, color: 'var(--accent-ink)' }}>2 entries from last week still need logging.</span>
          </div>
        </div>
      </div>
      <div className="modal-scrim" onClick={() => closeModal('capture')} />
      <div className="sheet">
        <div className="drag-handle" />
        <div className="row" style={{ alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px 12px 20px', flexShrink: 0 }}>
          <span style={{ fontSize: 20, fontWeight: 700 }}>Capture time</span>
          <button className="close-btn" onClick={() => closeModal('capture')}><IconClose width={17} height={17} /></button>
        </div>
        <div className="seg" style={{ margin: '0 20px 4px', flexShrink: 0 }}>
          <button className={mode === 'voice' ? 'active' : ''} onClick={() => setMode('voice')}><IconMic width={14} height={14} stroke="currentColor" />Voice</button>
          <button className={mode === 'type' ? 'active' : ''} onClick={() => setMode('type')}><IconTypeFaint width={14} height={14} stroke="currentColor" style={{}} />Type</button>
        </div>

        <div className="scroll col" style={{ padding: '10px 20px 148px', gap: 14 }}>
          {mode === 'voice' && (
            <div className="col" style={{ alignItems: 'center', gap: 10, padding: '6px 0 4px' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#1D1D1D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconMic width={24} height={24} stroke="var(--solid-fg)" />
              </div>
              <div style={{ fontSize: 11, color: 'var(--ink-faint)', animation: 'pulse 1.8s ease-in-out infinite' }}>Listening…</div>
            </div>
          )}
          {mode === 'type' && (
            <div className="row" style={{ alignItems: 'center', gap: 8, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '11px 12px' }}>
              <IconTypeFaint />
              <span style={{ flex: 1, fontSize: 13.5 }}>Called Acme's GC about the supply agreement changes, then reviewed the redline for like an hour twenty</span>
            </div>
          )}

          {mode === 'voice' && (
            <div className="col" style={{ alignItems: 'flex-end' }}>
              <div style={{ maxWidth: '82%', background: 'var(--solid)', color: 'var(--solid-fg)', borderRadius: '14px 14px 3px 14px', padding: '11px 13px', fontSize: 13.5, lineHeight: 1.5 }}>
                "Called Acme's GC about the supply agreement changes, then reviewed the redline for like an hour twenty"
              </div>
            </div>
          )}

          <div className="col" style={{ gap: 8 }}>
            <div className="row" style={{ alignItems: 'center', gap: 6, paddingLeft: 2 }}>
              <IconSparkleAccent />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--accent-ink)' }}>Brief drafted this entry</span>
            </div>
            <div className="col" style={{ background: 'var(--bg)', border: '1px solid var(--border-soft)', borderRadius: 8, padding: 15, gap: 13 }}>
              <div className="col" style={{ gap: 4 }}>
                <div style={{ fontSize: 11, color: 'var(--ink-faint)' }}>Matter</div>
                <div style={{ fontSize: 13.5, fontWeight: 600 }}>Acme Corp — Master Supply Agreement</div>
              </div>
              <div className="col" style={{ gap: 4 }}>
                <div style={{ fontSize: 11, color: 'var(--ink-faint)' }}>Task / activity</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13.5, background: 'var(--accent-soft)', color: 'var(--accent-ink)', borderRadius: 20, padding: '4px 10px', display: 'inline-block', width: 'fit-content' }}>L120 · Review / Analysis</div>
              </div>
              <div className="col" style={{ gap: 4 }}>
                <div style={{ fontSize: 11, color: 'var(--ink-faint)' }}>Narrative</div>
                <div style={{ fontSize: 13.5, lineHeight: 1.55 }}>Telephone conference with in-house counsel regarding proposed amendments to master supply agreement; reviewed and analyzed redline of Section&nbsp;4 (Delivery Terms).</div>
              </div>
              <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', paddingTop: 2 }}>
                <div style={{ fontSize: 11, color: 'var(--ink-faint)' }}>Duration</div>
                <div className="row" style={{ alignItems: 'center', gap: 12 }}>
                  <button style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setDuration((d) => Math.max(0.1, Math.round((d - 0.1) * 10) / 10))}>−</button>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 600, minWidth: 44, textAlign: 'center' }}>{duration.toFixed(1)}</span>
                  <button style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setDuration((d) => Math.round((d + 0.1) * 10) / 10)}>+</button>
                </div>
              </div>
            </div>
          </div>

          {approved && (
            <div className="row" style={{ background: 'var(--good-soft)', border: '1px solid var(--good-border)', borderRadius: 8, padding: '12px 13px', gap: 9, alignItems: 'center' }}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--good)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="m8.5 12.5 2.5 2.5 5-5" /></svg>
              <div style={{ fontSize: 12.5, lineHeight: 1.4 }}><strong>Logged.</strong> Acme Corp · {duration.toFixed(1)}h queued for pre-bill.</div>
            </div>
          )}
        </div>

        <div className="col" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: 'var(--nav-bg)', backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)', borderTop: '1px solid var(--border-soft)', padding: '12px 20px 18px', gap: 9, zIndex: 3 }}>
          {!approved ? (
            <div className="col" style={{ gap: 9 }}>
              <button className="btn-primary" onClick={() => setApproved(true)}>Approve &amp; log</button>
              <button className="btn-tertiary" style={{ padding: 14 }}>Refine</button>
            </div>
          ) : (
            <button className="btn-primary" onClick={reset}>Capture another</button>
          )}
        </div>
      </div>
    </div>
  );
}
