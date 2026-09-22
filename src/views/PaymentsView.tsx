import { paymentsData } from '../data';

export function PaymentsView() {
  return (
    <section className="view active">
      <div className="statusbar-spacer" />
      <div className="col" style={{ padding: '8px 24px 12px', flexShrink: 0, gap: 2 }}>
        <span style={{ fontSize: 26, fontWeight: 700 }}>Payments</span>
        <span style={{ fontSize: 12, color: 'var(--ink-faint)' }}>{paymentsData.length} outstanding</span>
      </div>
      <div className="scroll col" style={{ paddingTop: 4, paddingLeft: 24, paddingRight: 24, gap: 12 }}>
        {paymentsData.map((p) => (
          <div
            key={p.id}
            className="col card"
            style={{ padding: '20px 14px', gap: 10, border: 'none', borderRadius: 0, boxShadow: 'none', borderBottom: '1px solid var(--border-soft)' }}
          >
            <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div className="col" style={{ gap: 2 }}>
                <span style={{ fontSize: 13.5, fontWeight: 600 }}>{p.client}</span>
                <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{p.meta}</span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700 }}>{p.amount}</span>
            </div>
            {p.urgent ? (
              <button className="btn-primary" style={{ padding: '9px 0', fontSize: 12.5 }}>Send reminder</button>
            ) : (
              <button className="btn-tertiary accent" style={{ padding: '9px 0', fontSize: 12.5, justifyContent: 'flex-start' }}>Send reminder</button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
