export type Theme = 'light' | 'dark';

export type ViewName =
  | 'home'
  | 'queue'
  | 'matters'
  | 'payments'
  | 'profile'
  | 'support-elly'
  | 'support-contact'
  | 'support-faq';

export type ModalName = 'capture' | 'detail' | 'edit-profile' | 'password';

export interface ScheduleItem {
  id: string;
  time: string;
  time24: string;
  isoDate: string;
  type: string;
  client: string;
  matterType: string;
  flagged: boolean;
  statusLabel: string;
  detail: string;
  balance: string;
  invoiceAge: string;
  notes: string;
  rescheduled?: boolean;
}

export interface WeekItem {
  id: string;
  dayLabel: string;
  time: string;
  time24: string;
  isoDate: string;
  type: string;
  client: string;
  matterType: string;
  flagged: boolean;
  statusLabel: string;
  detail: string;
  notes: string;
  rescheduled?: boolean;
}

export type ScheduleLikeItem = ScheduleItem | WeekItem;

export interface PaymentItem {
  id: string;
  client: string;
  amount: string;
  meta: string;
  urgent: boolean;
}

export type QueueTone = 'warn' | 'danger';

export interface QueueEntry {
  id: string;
  matter: string;
  flag: string;
  tone: QueueTone;
  hours: string;
  snippet: string;
  suggestion: string;
  resolved: boolean;
  detail?: boolean;
}

export interface Profile {
  name: string;
  email: string;
  phone: string;
  title: string;
}

export interface Faq {
  q: string;
  a: string;
}

export type DrawerView = 'details' | 'reschedule' | 'notes' | 'remove';
export type DrawerPresentation = 'sheet' | 'modal';

export interface DrawerState {
  open: boolean;
  itemId: string | null;
  view: DrawerView;
  presentation: DrawerPresentation;
}
