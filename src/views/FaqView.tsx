import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { faqs } from '../data';
import { IconBack, IconChev } from '../components/Icons';

export function FaqView() {
  const { gotoView } = useApp();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="view active">
      <div className="statusbar-spacer" />
      <div className="row" style={{ alignItems: 'center', gap: 10, padding: '8px 20px 12px', flexShrink: 0 }}>
        <button className="close-btn" onClick={() => gotoView('profile')}><IconBack /></button>
        <span style={{ fontSize: 20, fontWeight: 700 }}>FAQs</span>
      </div>
      <div className="scroll col" style={{ paddingTop: 4, paddingLeft: 20, paddingRight: 20, gap: 18 }}>
        <div className="col card">
          {faqs.map((item, i) => (
            <div key={item.q} className={'col accordion-item' + (openIndex === i ? ' open' : '')}>
              <div className="row accordion-q" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <span style={{ flex: 1, fontSize: 13.5, fontWeight: 600 }}>{item.q}</span>
                <IconChev />
              </div>
              <div className="accordion-collapse">
                <div className="accordion-collapse-inner">
                  <div className="accordion-a">{item.a}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
