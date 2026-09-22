import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { queueFilterDefs, toneVars } from '../data';
import { IconBack, IconChev, IconCheck, IconSparkleAccent, IconTriangle } from '../components/Icons';
import type { QueueEntry } from '../types';

function SuggestionBlock({ entry, onAccept }: { entry: QueueEntry; onAccept: () => void }) {
  const { openModal } = useApp();
  return (
    <div className="detail">
      <div style={{ height: 1, background: 'var(--border-soft)' }} />
      <div style={{ fontSize: 12.5, lineHeight: 1.5, color: 'var(--ink-soft)' }}>{entry.snippet}</div>
      <div className="col" style={{ background: 'var(--accent-soft)', borderRadius: 8, padding: '10px 11px', gap: 4 }}>
        <div className="row" style={{ alignItems: 'center', gap: 5 }}>
          <IconSparkleAccent />
          <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--accent-ink)' }}>Brief suggests</span>
        </div>
        <div style={{ fontSize: 12.5, lineHeight: 1.5, color: 'var(--ink)' }}>{entry.suggestion}</div>
      </div>
      <div className="row" style={{ gap: 8 }}>
        <button className="btn-primary" style={{ flex: 1, padding: '13px 9px', fontSize: 13 }} onClick={(e) => { e.stopPropagation(); onAccept(); }}>Accept</button>
        <button className="btn-tertiary" style={{ flex: 1, padding: '13px 9px', fontSize: 13 }} onClick={(e) => e.stopPropagation()}>Edit myself</button>
        {entry.detail && (
          <button className="btn-secondary" style={{ flex: 1, padding: '13px 9px', fontSize: 13, whiteSpace: 'nowrap' }} onClick={(e) => { e.stopPropagation(); openModal('detail'); }}>Review in detail</button>
        )}
      </div>
    </div>
  );
}

export function QueueView() {
  const { queueEntries, resolveQueueEntry, gotoView } = useApp();
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const visible = queueEntries.filter((e) => filter === 'all' || e.flag === filter);
  const openCount = queueEntries.filter((e) => !e.resolved).length;

  return (
    <section className="view active">
      <div className="statusbar-spacer" />
      <div className="col" style={{ padding: '8px 24px 12px', flexShrink: 0, gap: 12 }}>
        <div className="row" style={{ alignItems: 'center', gap: 10 }}>
          <button className="close-btn" onClick={() => gotoView('home')}><IconBack /></button>
          <span style={{ fontSize: 26, fontWeight: 700, flex: 1 }}>Review queue</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--ink-faint)' }}>{openCount} open</span>
        </div>
        <div className="row" style={{ gap: 7, overflowX: 'auto', paddingBottom: 2 }}>
          {queueFilterDefs.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                style={{
                  flexShrink: 0, borderRadius: 20, padding: '7px 12px', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap',
                  transition: 'background .16s ease,color .16s ease,border-color .16s ease',
                  background: active ? 'var(--solid)' : 'var(--surface)',
                  color: active ? 'var(--solid-fg)' : 'var(--ink-soft)',
                  border: `1px solid ${active ? 'var(--solid)' : 'var(--border)'}`,
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="scroll col" style={{ paddingTop: 4, paddingLeft: 24, paddingRight: 24, gap: 9 }}>
        {visible.map((entry) => {
          const t = toneVars[entry.tone];
          const resolved = entry.resolved;
          const badgeSoft = resolved ? 'var(--good-soft)' : t.soft;
          const badgeInk = resolved ? 'var(--good)' : t.ink;
          const isExpanded = expanded === entry.id;
          return (
            <div key={entry.id} className={'card needs-item' + (isExpanded ? ' expanded' : '') + (resolved ? ' resolved' : '')}>
              <div className="row body" onClick={() => setExpanded(isExpanded ? null : entry.id)}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'transparent', color: badgeInk, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  {resolved ? <IconCheck /> : <IconTriangle />}
                </div>
                <div className="col" style={{ flex: 1, gap: 6, minWidth: 0 }}>
                  <div className="flag-text" style={{ fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{entry.matter}</div>
                  <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="pill" style={{ background: badgeSoft, color: badgeInk }}>{entry.flag}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-faint)' }}>{entry.hours}h</span>
                  </div>
                </div>
                <IconChev />
              </div>
              <div className="detail-collapse">
                {!resolved ? (
                  <SuggestionBlock entry={entry} onAccept={() => { resolveQueueEntry(entry.id); setExpanded(null); }} />
                ) : (
                  <div className="detail">
                    <div style={{ height: 1, background: 'var(--border-soft)' }} />
                    <div style={{ fontSize: 12.5, lineHeight: 1.5, color: 'var(--ink-soft)' }}>{entry.snippet}</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
