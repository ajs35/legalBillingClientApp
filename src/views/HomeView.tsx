import { useApp } from '../context/AppContext';
import { useFloatingHeaderOffset } from '../hooks/useFloatingHeaderOffset';
import { useSwipeReveal } from '../hooks/useSwipeReveal';
import { IconDoc, IconMic, IconNotes, IconRemove, IconReschedule } from '../components/Icons';
import type { ScheduleItem } from '../types';

const homeDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
const homeUpdated = 'Updated ' + new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
}

function ScheduleRow({ item }: { item: ScheduleItem }) {
  const { openDrawer } = useApp();
  const swipe = useSwipeReveal(() => openDrawer(item.id, 'details', 'sheet'));

  return (
    <div className="swipe-row">
      <div className="reveal-row">
        <button className="btn-tertiary reveal-btn" style={{ background: 'var(--track)', color: 'var(--ink-soft)' }} onClick={() => openDrawer(item.id, 'notes', 'sheet')}><IconNotes />Notes</button>
        <button className="btn-tertiary reveal-btn" style={{ background: 'var(--accent-soft)', color: 'var(--accent-ink)' }} onClick={() => openDrawer(item.id, 'reschedule', 'sheet')}><IconReschedule />Reschedule</button>
        <button className="btn-tertiary reveal-btn" style={{ background: 'var(--danger-soft)', color: 'var(--danger-ink)' }} onClick={() => openDrawer(item.id, 'remove', 'sheet')}><IconRemove />Remove</button>
      </div>
      <div className="col sched-card" style={swipe.style} {...swipe.handlers}>
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="sched-time" style={{ color: item.flagged ? 'var(--danger-ink)' : 'var(--ink)' }}>{item.time} · {item.type}</span>
          {item.flagged && (
            <span className="row" style={{ alignItems: 'center', gap: 4, background: 'var(--danger-soft)', borderRadius: 20, padding: '3px 8px' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--danger)' }} />
              <span style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--danger-ink)' }}>{item.statusLabel}</span>
            </span>
          )}
        </div>
        <span style={{ fontSize: 14, fontWeight: 600, marginTop: 6 }}>{item.client}</span>
        <span style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 2 }}>{item.detail}</span>
        {item.notes && (
          <div className="row" style={{ alignItems: 'center', gap: 5, marginTop: 6 }}>
            <IconNotes width={12} height={12} />
            <span style={{ fontSize: 11.5, color: 'var(--accent-ink)' }}>{item.notes.length > 42 ? item.notes.slice(0, 42) + '…' : item.notes}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function HomeView() {
  const { scheduleItems, weekItems, gotoView, noticeDismissed, dismissNotice, profile, openDrawer, openModal } = useApp();
  const { headerRef, paddingTop } = useFloatingHeaderOffset<HTMLDivElement>();
  const upNext = scheduleItems[0];
  const firstName = profile.name.trim().split(/\s+/)[0] || profile.name;

  return (
    <section className="view active" style={{ position: 'relative' }}>
      <div className="floating-header" ref={headerRef}>
        <div className="statusbar-spacer" />
        <div className="col" style={{ padding: '8px 24px 8px', gap: 16 }}>
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 13.5, color: 'var(--ink-faint)' }}>{homeDate}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-faint)' }}>{homeUpdated}</span>
          </div>
          <div style={{ fontSize: 35, fontWeight: 300, lineHeight: 1.18, letterSpacing: '-0.01em' }}>Good afternoon,<br /><span>{firstName}</span></div>
        </div>

        <div className={'notice-collapse' + (noticeDismissed ? ' dismissed' : '')}>
          <div className="notice-collapse-inner">
            <div className="row" style={{ alignItems: 'center', gap: 10, background: 'var(--accent-soft)', border: '1px solid var(--accent-border)', borderRadius: 8, padding: '11px 11px 11px 13px', cursor: 'pointer' }} onClick={() => gotoView('queue')}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--accent-ink)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5l3 2" /></svg>
              <span style={{ fontSize: 12.5, color: 'var(--accent-ink)', flex: 1 }}><strong>2 entries</strong> from last week still need logging.</span>
              <button aria-label="Mark entries as updated" style={{ flexShrink: 0, width: 26, height: 26, borderRadius: '50%', background: 'rgba(255,255,255,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-ink)' }} onClick={(e) => { e.stopPropagation(); dismissNotice(); }}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll col" style={{ paddingLeft: 24, paddingRight: 24, paddingTop, gap: 28 }}>
        <div className="col" style={{ gap: 10 }}>
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 15, fontWeight: 700 }}>Up next</span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--ink-faint)' }}>{upNext?.time}</span>
          </div>
          <div className="col" style={{ background: 'var(--surface)', borderRadius: 12, padding: 18, gap: 14, boxShadow: 'var(--shadow-md)' }}>
            {!upNext ? (
              <div style={{ fontSize: 13, color: 'var(--ink-faint)' }}>Nothing scheduled.</div>
            ) : (
              <>
                <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div className="col" style={{ gap: 2 }}>
                    <span style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-0.01em' }}>{upNext.client}</span>
                    <span style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>{upNext.matterType} · {upNext.type}</span>
                  </div>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--accent-soft)', color: 'var(--accent-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{initials(upNext.client)}</div>
                </div>
                <div className="row" style={{ gap: 0, borderTop: '1px solid var(--border-soft)', paddingTop: 12 }}>
                  <div className="col" style={{ flex: 1, gap: 2 }}>
                    <span style={{ fontSize: 10.5, color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: '.03em' }}>Balance</span>
                    <span style={{ fontSize: 18, fontWeight: 300, color: 'var(--danger-ink)' }}>{upNext.balance}</span>
                  </div>
                  <div className="col" style={{ flex: 1, gap: 2 }}>
                    <span style={{ fontSize: 10.5, color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: '.03em' }}>Last invoice</span>
                    <span style={{ fontSize: 18, fontWeight: 300 }}>{upNext.invoiceAge}</span>
                  </div>
                  <div className="col" style={{ flex: 1, gap: 2 }}>
                    <span style={{ fontSize: 10.5, color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: '.03em' }}>Standing</span>
                    <span className="row" style={{ alignItems: 'center', gap: 4 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--danger)' }} />
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--danger-ink)' }}>Past-due</span>
                    </span>
                  </div>
                </div>
                <div className="row" style={{ gap: 8 }}>
                  <button className="btn-primary" style={{ flex: 1, background: 'var(--ink)' }}>Open matter</button>
                  <button className="btn-tertiary accent" style={{ flex: 1 }}>Send reminder</button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="col" style={{ gap: 14 }}>
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 15, fontWeight: 700 }}>Today's schedule</span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--ink-faint)' }}>{scheduleItems.length} appointments</span>
          </div>
          <div className="col" style={{ gap: 14 }}>
            {scheduleItems.map((item) => <ScheduleRow key={item.id} item={item} />)}
          </div>
        </div>

        <div className="col" style={{ gap: 10 }}>
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 15, fontWeight: 700 }}>Later this week</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-faint)' }}>{weekItems.length} upcoming</span>
          </div>
          <div className="row" style={{ gap: 10, overflowX: 'auto' }}>
            {weekItems.map((wi) => (
              <button key={wi.id} className="col card" style={{ flexShrink: 0, width: 150, padding: 12, gap: 6, textAlign: 'left' }} onClick={() => openDrawer(wi.id, 'details', 'modal')}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11.5, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--ink-faint)' }}>{wi.dayLabel} · {wi.time}</span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{wi.client}</span>
                <span style={{ fontSize: 11.5, color: 'var(--ink-soft)' }}>{wi.type}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="row" style={{ gap: 12 }}>
          <button className="capture-tile" onClick={() => openModal('capture')}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconMic />
            </div>
            <div className="col" style={{ gap: 1, textAlign: 'left' }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>Log time</span>
              <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,.6)' }}>Voice or type</span>
            </div>
          </button>
          <button className="capture-tile" onClick={() => openModal('capture')}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconDoc />
            </div>
            <div className="col" style={{ gap: 1, textAlign: 'left' }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>Add entry</span>
              <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,.6)' }}>Manual time entry</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
