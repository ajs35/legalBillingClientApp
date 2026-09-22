import { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IconClose, IconSend, IconSparkleWhite } from '../Icons';

interface ChatMessage {
  id: string;
  text: string;
  mine: boolean;
  typing?: boolean;
}

const initialThread: ChatMessage[] = [
  { id: 'seed-1', mine: false, text: "Hi Maya — I'm Elly. Ask me about a matter, a client balance, or a formatting rule and I'll pull it up." },
  { id: 'seed-2', mine: true, text: "What's outstanding on Halvorsen?" },
  { id: 'seed-3', mine: false, text: '<strong>$18,400</strong> — sent 32 days ago, viewed 3 days ago, nothing received. Want me to draft a reminder?' },
];

function replyFor(text: string): string {
  const t = text.toLowerCase();
  if (t.includes('balance') || t.includes('outstanding') || t.includes('payment')) {
    return 'You have $26,940 outstanding across 3 clients — Halvorsen v. Meridian is the largest at $18,400. Want the full breakdown on the Payments tab?';
  }
  if (t.includes('matter') || t.includes('acme') || t.includes('budget')) {
    return "Acme Corp is trending 12% over its Q3 budget at the current burn rate. I'd flag it to the relationship partner before month end.";
  }
  if (t.includes('reminder') || t.includes('draft')) {
    return "Drafted. It's a short, firm note referencing the 32-day-old invoice — check Payments to review and send it.";
  }
  if (t.includes('password') || t.includes('security')) {
    return "Head to Profile → Password & security to update it — I'll walk the requirements with you as you type.";
  }
  return "Got it — I'm still learning that one, but I can help with unlogged time, outstanding balances, and matter budgets right now.";
}

export function AskEllyModal() {
  const { openModals, closeModal } = useApp();
  const open = openModals['ask-elly'];
  const [thread, setThread] = useState<ChatMessage[]>(initialThread);
  const [input, setInput] = useState('');
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (threadRef.current) threadRef.current.scrollTop = threadRef.current.scrollHeight;
  }, [thread]);

  function send() {
    const text = input.trim();
    if (!text) return;
    const mine: ChatMessage = { id: 'm-' + Date.now(), mine: true, text: text.replace(/</g, '&lt;') };
    setThread((prev) => [...prev, mine]);
    setInput('');
    const typingId = 'typing-' + Date.now();
    setThread((prev) => [...prev, { id: typingId, mine: false, text: '', typing: true }]);
    window.setTimeout(() => {
      setThread((prev) => [...prev.filter((m) => m.id !== typingId), { id: 'r-' + Date.now(), mine: false, text: replyFor(text) }]);
    }, 750);
  }

  return (
    <div className={'modal-backdrop' + (open ? ' open' : '')} id="modal-ask-elly">
      <div className="modal-blur">
        <div className="statusbar-spacer" />
        <div className="col" style={{ padding: '8px 24px 12px' }}>
          <span style={{ fontSize: 26, fontWeight: 700 }}>Profile</span>
        </div>
      </div>
      <div className="modal-scrim" onClick={() => closeModal('ask-elly')} />
      <div className="sheet">
        <div className="drag-handle" />
        <div className="row" style={{ alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px 4px', flexShrink: 0 }}>
          <div className="row" style={{ alignItems: 'center', gap: 10 }}>
            <div className="chat-avatar" style={{ width: 34, height: 34 }}>
              <IconSparkleWhite width={16} height={16} />
            </div>
            <div className="col" style={{ gap: 8 }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>Ask Elly</span>
              <span className="row" style={{ alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--good)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--good)', display: 'inline-block' }} />
                Elite agentic chat · online
              </span>
            </div>
          </div>
          <button className="close-btn" onClick={() => closeModal('ask-elly')}><IconClose width={17} height={17} /></button>
        </div>

        <div className="scroll col" ref={threadRef} style={{ paddingTop: 6, paddingLeft: 24, paddingRight: 24, paddingBottom: 90, gap: 14 }}>
          {thread.map((m) => (
            <div key={m.id} className={'row chat-row' + (m.mine ? ' mine' : '')}>
              {!m.mine && <div className="chat-avatar"><IconSparkleWhite /></div>}
              {m.typing ? (
                <div className="chat-bubble elly chat-typing"><span /><span /><span /></div>
              ) : (
                <div className={'chat-bubble ' + (m.mine ? 'mine' : 'elly')} dangerouslySetInnerHTML={{ __html: m.text }} />
              )}
            </div>
          ))}
        </div>

        <div
          className="row"
          style={{
            position: 'absolute', left: 16, right: 16, bottom: 16, background: 'var(--nav-bg)',
            backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid var(--border-soft)', borderRadius: 14, padding: '10px 14px', gap: 9,
            alignItems: 'center', zIndex: 3, boxShadow: 'var(--shadow-xs)',
          }}
        >
          <input
            type="text"
            placeholder="Ask Elly about a matter, a balance, a rule…"
            style={{ flex: 1, borderRadius: 20, padding: '11px 15px' }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
          />
          <button aria-label="Send" style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--solid)', color: 'var(--solid-fg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} onClick={send}>
            <IconSend />
          </button>
        </div>
      </div>
    </div>
  );
}
