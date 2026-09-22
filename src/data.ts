import type { Faq, PaymentItem, Profile, QueueEntry, QueueTone, ScheduleItem, WeekItem } from './types';

export const initialScheduleItems: ScheduleItem[] = [
  {
    id: 'h1', time: '9:00 AM', time24: '09:00', isoDate: '2026-09-21', type: 'Call',
    client: 'Halvorsen v. Meridian Holdings', matterType: 'Litigation',
    flagged: true, statusLabel: 'Past-due', detail: '$18,400 outstanding · invoice sent 32 days ago',
    balance: '$18,400', invoiceAge: '32 days ago', notes: '',
  },
  {
    id: 'h2', time: '11:30 AM', time24: '11:30', isoDate: '2026-09-21', type: 'In person',
    client: 'Doyle Family Trust', matterType: 'Estate admin',
    flagged: false, statusLabel: '', detail: 'Estate admin review', balance: '$0', invoiceAge: '—', notes: '',
  },
  {
    id: 'h3', time: '1:00 PM', time24: '13:00', isoDate: '2026-09-21', type: 'Consult',
    client: 'Kestrel Aviation', matterType: 'Prospect',
    flagged: false, statusLabel: '', detail: 'Prospect · no matter yet', balance: '$0', invoiceAge: '—', notes: '',
  },
  {
    id: 'h4', time: '3:30 PM', time24: '15:30', isoDate: '2026-09-21', type: 'Call',
    client: 'Acme Corp', matterType: 'Contracts',
    flagged: false, statusLabel: '', detail: 'Master supply agreement — contract terms', balance: '$4,200', invoiceAge: '6 days', notes: '',
  },
];

export const initialWeekItems: WeekItem[] = [
  {
    id: 'w1', dayLabel: 'Tue', time: '10:00 AM', time24: '10:00', isoDate: '2026-09-22',
    type: 'Deposition prep', client: 'Bekele & Sons', matterType: 'Litigation',
    flagged: false, statusLabel: '', detail: 'Deposition prep', notes: '',
  },
  {
    id: 'w2', dayLabel: 'Wed', time: '2:00 PM', time24: '14:00', isoDate: '2026-09-23',
    type: 'Contract review', client: 'Nordvik Shipping', matterType: 'Contracts',
    flagged: false, statusLabel: '', detail: 'Contract review', notes: '',
  },
  {
    id: 'w3', dayLabel: 'Fri', time: '9:30 AM', time24: '09:30', isoDate: '2026-09-25',
    type: 'Hearing', client: 'Whitmore Estate', matterType: 'Estate admin',
    flagged: false, statusLabel: '', detail: 'Hearing', notes: '',
  },
];

export const paymentsData: PaymentItem[] = [
  { id: 'p1', client: 'Halvorsen v. Meridian Holdings', amount: '$18,400', meta: 'Sent 32 days ago · viewed', urgent: true },
  { id: 'p2', client: 'Acme Corp', amount: '$4,200', meta: 'Due in 6 days · not viewed', urgent: false },
  { id: 'p3', client: 'Kestrel Aviation', amount: '$4,340', meta: 'Due in 11 days · viewed', urgent: false },
];

export const initialQueueEntries: QueueEntry[] = [
  {
    id: 'a', matter: 'Acme Corp — Master Supply Agmt', flag: 'Missing narrative', tone: 'warn', hours: '2.3',
    snippet: 'Entry logged 9/19 has no narrative text.',
    suggestion: 'Reviewed and negotiated revisions to Section 4 (Delivery Terms) of the master supply agreement.',
    resolved: false,
  },
  {
    id: 'b', matter: 'Halvorsen v. Meridian Holdings', flag: 'Block-billed', tone: 'danger', hours: '4.1',
    snippet: "One entry covers drafting, a call, and filing — Halvorsen's guidelines require separated tasks.",
    suggestion: 'Split into three entries: draft (2.0h), client call (0.6h), e-filing (1.5h).',
    resolved: false, detail: true,
  },
  {
    id: 'c', matter: 'Doyle Family Trust — Estate Admin', flag: 'OCG risk', tone: 'danger', hours: '1.0',
    snippet: "Task code L120 is not on Doyle's approved task list.",
    suggestion: 'Recode to L110 (Fact Investigation) to match the approved list.',
    resolved: false,
  },
  {
    id: 'd', matter: 'Kestrel Aviation — IPO Advisory', flag: 'Missing narrative', tone: 'warn', hours: '0.8',
    snippet: 'Entry logged 9/18 has no narrative text.',
    suggestion: 'Reviewed underwriter comments on Section 5 risk factors and circulated summary to deal team.',
    resolved: false,
  },
  {
    id: 'e', matter: 'Union Steel Co. — Antitrust Review', flag: 'Block-billed', tone: 'danger', hours: '3.4',
    snippet: 'Entry combines research, memo drafting, and a partner call.',
    suggestion: 'Split into: research (1.6h), memo drafting (1.3h), partner call (0.5h).',
    resolved: false,
  },
];

export const toneVars: Record<QueueTone, { soft: string; ink: string; border: string }> = {
  warn: { soft: 'var(--warn-soft)', ink: 'var(--warn-ink)', border: 'var(--warn-border)' },
  danger: { soft: 'var(--danger-soft)', ink: 'var(--danger-ink)', border: 'var(--danger-border)' },
};

export const initialProfile: Profile = {
  name: 'Maya Okafor',
  email: 'maya.okafor@firm.com',
  phone: '(415) 555-0142',
  title: 'Partner',
};

export const matterPeriodData = {
  month: { pct: 44, billed: '$38.9k', wip: '$42.3k' },
  quarter: { pct: 69, billed: '$110.2k', wip: '$128.4k' },
};

export const teamMembers = [
  { initials: 'MO', name: 'Maya Okafor', role: 'Partner', amount: '$12,780', hours: '14.2h' },
  { initials: 'TR', name: 'T. Reyes', role: 'Associate', amount: '$11,025', hours: '22.5h' },
  { initials: 'SP', name: 'S. Patel', role: 'Paralegal', amount: '$2,000', hours: '8.0h' },
  { initials: 'DC', name: 'D. Chen', role: 'Associate', amount: '$9,450', hours: '18.9h' },
  { initials: 'RW', name: 'R. Whitfield', role: 'Of Counsel', amount: '$14,200', hours: '12.4h' },
  { initials: 'KN', name: 'K. Novak', role: 'Associate', amount: '$7,875', hours: '15.75h' },
  { initials: 'JA', name: 'J. Alvarez', role: 'Paralegal', amount: '$1,680', hours: '6.7h' },
];

export const queueFilterDefs: { key: string; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'Missing narrative', label: 'Narrative' },
  { key: 'Block-billed', label: 'Block-billed' },
  { key: 'OCG risk', label: 'OCG risk' },
];

export const faqs: Faq[] = [
  { q: 'Why does a time entry land in the review queue?', a: "Brief flags entries that are block-billed, missing a narrative, or touch a client's outside counsel guidelines. Review each flag, approve Brief's draft split, or send it back to the timekeeper." },
  { q: 'How do I update my password?', a: "Go to Profile → Password & security. You'll need your current password and a new one that meets all five strength requirements shown as you type." },
  { q: 'Does Brief work in dark mode?', a: 'Yes — switch it from Profile → Appearance. The choice applies immediately across every screen.' },
  { q: "Can I edit a logged entry after it's submitted?", a: 'Entries already queued for pre-bill can be reopened from the review queue. Entries already billed require a credit memo — ask Elly or contact us for help with those.' },
  { q: 'How current are the matter budget numbers?', a: 'Budget, billed, and WIP figures refresh as new time is logged and approved — usually within a few minutes, never overnight-batched.' },
  { q: 'Who can see my outstanding payments?', a: 'Only timekeepers and staff assigned to that matter. Firm admins can see totals across all matters from their own view.' },
];

export function fmtTime(hhmm: string): string {
  if (!hhmm) return '';
  const [h, m] = hhmm.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = ((h + 11) % 12) + 1;
  return h12 + ':' + String(m).padStart(2, '0') + ' ' + period;
}

export function initialsFor(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] || '') + (parts[parts.length - 1]?.[0] || '')).toUpperCase();
}
