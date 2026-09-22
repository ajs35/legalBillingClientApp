import { useApp } from '../context/AppContext';
import { IconBack, IconClose, IconNotes, IconReschedule, IconRemove } from './Icons';

export function Drawer() {
  const {
    drawer, findItem, closeDrawer, setDrawerView,
    rescheduleDate, rescheduleTime, notesDraft,
    setRescheduleDate, setRescheduleTime, setNotesDraft,
    saveReschedule, saveNotes, confirmRemove,
  } = useApp();

  const item = findItem(drawer.itemId) || {
    client: '', time: '', type: '', detail: '', flagged: false, statusLabel: '', notes: '',
  };
  const isSheet = drawer.presentation !== 'modal';

  return (
    <>
      <div className={'drawer-scrim' + (drawer.open ? ' open' : '')} onClick={closeDrawer} />
      <div className={'drawer-panel ' + (drawer.presentation === 'modal' ? 'drawer-modal' : 'drawer-sheet') + (drawer.open ? ' open' : '')}>
        {isSheet && <div className="drag-handle" />}
        <div className="col" style={{ flex: 1, overflowY: 'auto' }}>
          {drawer.view === 'details' && (
            <>
              <div className="col" style={{ padding: '18px 20px 4px', gap: 3 }}>
                <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 18, fontWeight: 700 }}>{item.client}</span>
                  <button className="close-btn" onClick={closeDrawer}><IconClose /></button>
                </div>
                <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{item.time} · {item.type}</span>
              </div>
              <div className="col" style={{ padding: '14px 20px 22px', gap: 14 }}>
                {item.flagged && (
                  <span className="row" style={{ alignItems: 'center', gap: 4, width: 'fit-content', background: 'var(--danger-soft)', borderRadius: 20, padding: '3px 9px' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--danger)' }} />
                    <span style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--danger-ink)' }}>{item.statusLabel}</span>
                  </span>
                )}
                <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.5 }}>{item.detail}</div>
                {item.notes && (
                  <div className="col" style={{ background: 'var(--accent-soft)', borderRadius: 8, padding: '11px 12px', gap: 3 }}>
                    <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '.03em', textTransform: 'uppercase', color: 'var(--accent-ink)' }}>Notes</span>
                    <span style={{ fontSize: 12.5, color: 'var(--ink)', lineHeight: 1.5 }}>{item.notes}</span>
                  </div>
                )}
                <button className="btn-primary" style={{ background: 'var(--ink)' }}>Open matter</button>
                <div className="row" style={{ gap: 4 }}>
                  <button className="btn-tertiary" style={{ flex: 1, padding: '10px 4px', fontSize: 12, flexDirection: 'column', gap: 5 }} onClick={() => setDrawerView('notes')}><IconNotes />Notes</button>
                  <button className="btn-tertiary" style={{ flex: 1, padding: '10px 4px', fontSize: 12, flexDirection: 'column', gap: 5 }} onClick={() => setDrawerView('reschedule')}><IconReschedule />Reschedule</button>
                  <button className="btn-tertiary danger" style={{ flex: 1, padding: '10px 4px', fontSize: 12, flexDirection: 'column', gap: 5 }} onClick={() => setDrawerView('remove')}><IconRemove />Remove</button>
                </div>
              </div>
            </>
          )}

          {drawer.view === 'reschedule' && (
            <div className="col" style={{ padding: '18px 20px 22px', gap: 16 }}>
              <div className="row" style={{ alignItems: 'center', gap: 10 }}>
                <button className="close-btn" onClick={() => setDrawerView('details')}><IconBack /></button>
                <span style={{ fontSize: 17, fontWeight: 700 }}>Reschedule</span>
              </div>
              <div className="col" style={{ gap: 6 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: '.03em' }}>Date</label>
                <input type="date" value={rescheduleDate} onChange={(e) => setRescheduleDate(e.target.value)} />
              </div>
              <div className="col" style={{ gap: 6 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: '.03em' }}>Time</label>
                <input type="time" value={rescheduleTime} onChange={(e) => setRescheduleTime(e.target.value)} />
              </div>
              <div className="row" style={{ gap: 8, paddingTop: 4 }}>
                <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setDrawerView('details')}>Cancel</button>
                <button className="btn-primary" style={{ flex: 1 }} onClick={saveReschedule}>Save</button>
              </div>
            </div>
          )}

          {drawer.view === 'notes' && (
            <div className="col" style={{ padding: '18px 20px 22px', gap: 16 }}>
              <div className="row" style={{ alignItems: 'center', gap: 10 }}>
                <button className="close-btn" onClick={() => setDrawerView('details')}><IconBack /></button>
                <span style={{ fontSize: 17, fontWeight: 700 }}>Add notes</span>
              </div>
              <textarea
                rows={4}
                placeholder="Add a note about this appointment…"
                style={{ minHeight: 100 }}
                value={notesDraft}
                onChange={(e) => setNotesDraft(e.target.value)}
              />
              <div className="row" style={{ gap: 8 }}>
                <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setDrawerView('details')}>Cancel</button>
                <button className="btn-primary" style={{ flex: 1 }} onClick={saveNotes}>Save</button>
              </div>
            </div>
          )}

          {drawer.view === 'remove' && (
            <div className="col" style={{ padding: '18px 20px 22px', gap: 16 }}>
              <div className="row" style={{ alignItems: 'center', gap: 10 }}>
                <button className="close-btn" onClick={() => setDrawerView('details')}><IconBack /></button>
                <span style={{ fontSize: 17, fontWeight: 700 }}>Remove from schedule</span>
              </div>
              <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.5 }}>
                This removes <strong>{item.client}</strong> from the schedule. This can't be undone from here.
              </div>
              <div className="row" style={{ gap: 8 }}>
                <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setDrawerView('details')}>Cancel</button>
                <button className="btn-primary" style={{ flex: 1, background: 'var(--danger)' }} onClick={confirmRemove}>Remove entry</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
