import { useState } from 'react';
import { matterPeriodData, teamMembers } from '../data';
import { useFloatingHeaderOffset } from '../hooks/useFloatingHeaderOffset';
import { IconSparkleAccent } from '../components/Icons';

export function MattersView() {
  const { headerRef, paddingTop } = useFloatingHeaderOffset<HTMLDivElement>();
  const [period, setPeriod] = useState<'month' | 'quarter'>('month');
  const d = matterPeriodData[period];

  return (
    <section className="view active" style={{ position: 'relative' }}>
      <div className="floating-header" ref={headerRef}>
        <div className="statusbar-spacer" />
        <div className="col" style={{ padding: '8px 24px 12px', gap: 10 }}>
          <div className="row" style={{ alignItems: 'center', gap: 12 }}>
            <div className="col" style={{ gap: 1 }}>
              <span style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.2 }}>Acme Corp</span>
              <span style={{ fontSize: 11, color: 'var(--ink-faint)' }}>Master Supply Agreement · 04629-002</span>
            </div>
          </div>
          <div className="seg">
            <button className={period === 'month' ? 'active' : ''} onClick={() => setPeriod('month')}>This month</button>
            <button className={period === 'quarter' ? 'active' : ''} onClick={() => setPeriod('quarter')}>This quarter</button>
          </div>
        </div>
      </div>
      <div className="scroll col" style={{ paddingTop, paddingLeft: 24, paddingRight: 24, gap: 28 }}>
        <div className="col" style={{ background: 'var(--solid)', borderRadius: 8, padding: '24px 16px', gap: 7, boxShadow: 'var(--shadow-xs)' }}>
          <div className="row" style={{ alignItems: 'center', gap: 7 }}>
            <IconSparkleAccent fill="#d0ebff" />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: '#d0ebff' }}>Brief's forecast</span>
          </div>
          <div style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--solid-fg)' }}>
            At the current burn rate, Acme's Q3 budget will be exceeded by <strong>12%</strong> before month end. Consider flagging to the relationship partner.
          </div>
        </div>

        <div className="col card" style={{ padding: 16, gap: 10, border: 'none' }}>
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 11, color: 'var(--ink-faint)', letterSpacing: '.03em' }}>Budget used</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13.5, color: 'var(--ink-soft)' }}>{d.pct}%</span>
          </div>
          <div style={{ height: 8, borderRadius: 5, background: 'var(--border-soft)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${d.pct}%`, background: 'var(--solid)', borderRadius: 5, transition: 'width .3s ease' }} />
          </div>
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <div className="col" style={{ gap: 1 }}>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 24, fontWeight: 300 }}>{d.billed}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-faint)' }}>Billed</div>
            </div>
            <div className="col" style={{ gap: 1, alignItems: 'center' }}>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 24, fontWeight: 300, color: 'var(--warn-ink)' }}>{d.wip}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-faint)' }}>WIP</div>
            </div>
            <div className="col" style={{ gap: 1, alignItems: 'flex-end' }}>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 24, fontWeight: 300 }}>$185.0k</div>
              <div style={{ fontSize: 11, color: 'var(--ink-faint)' }}>Budget</div>
            </div>
          </div>
        </div>

        <div className="row" style={{ gap: 10 }}>
          <div className="col card" style={{ flex: 1, padding: '12px 14px', gap: 2 }}>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 24, fontWeight: 300, color: 'var(--good)' }}>94%</div>
            <div style={{ fontSize: 11, color: 'var(--ink-faint)' }}>Realization</div>
          </div>
          <div className="col card" style={{ flex: 1, padding: '12px 14px', gap: 2 }}>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 24, fontWeight: 300 }}>$12.4k</div>
            <div style={{ fontSize: 11, color: 'var(--ink-faint)' }}>AR &gt; 60 days</div>
          </div>
          <div className="col card" style={{ flex: 1, padding: '12px 14px', gap: 2 }}>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 24, fontWeight: 300 }}>Sep 3</div>
            <div style={{ fontSize: 11, color: 'var(--ink-faint)' }}>Last invoice</div>
          </div>
        </div>

        <div className="col" style={{ gap: 9 }}>
          <div style={{ fontSize: 15.5, fontWeight: 700 }}>By team member</div>
          <div className="col card">
            {teamMembers.map((m, i) => (
              <div key={m.initials} className="row" style={{ alignItems: 'center', gap: 11, padding: '12px 14px', borderBottom: i < teamMembers.length - 1 ? '1px solid var(--border-soft)' : 'none' }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--accent-soft)', color: 'var(--accent-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12.5, fontWeight: 700, flexShrink: 0 }}>{m.initials}</div>
                <div className="col" style={{ flex: 1, gap: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{m.name}</div>
                  <div style={{ fontSize: 10.5, color: 'var(--ink-faint)' }}>{m.role}</div>
                </div>
                <div className="col" style={{ alignItems: 'flex-end', gap: 1 }}>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12.5, fontWeight: 600 }}>{m.amount}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-faint)' }}>{m.hours}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ height: 16 }} />
      </div>
    </section>
  );
}
