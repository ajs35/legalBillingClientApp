import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  initialProfile,
  initialQueueEntries,
  initialScheduleItems,
  initialWeekItems,
} from '../data';
import type {
  DrawerPresentation,
  DrawerState,
  DrawerView,
  ModalName,
  Profile,
  QueueEntry,
  ScheduleItem,
  ScheduleLikeItem,
  Theme,
  ViewName,
  WeekItem,
} from '../types';

interface AppContextValue {
  // theme
  theme: Theme;
  setTheme: (t: Theme) => void;

  // view routing
  view: ViewName;
  gotoView: (v: ViewName) => void;

  // modals
  openModals: Record<ModalName, boolean>;
  openModal: (name: ModalName) => void;
  closeModal: (name: ModalName) => void;

  // toast
  toastMsg: string;
  toastShown: boolean;
  showToast: (msg: string) => void;

  // profile
  profile: Profile;
  updateProfile: (p: Profile) => void;

  // schedule + week items
  scheduleItems: ScheduleItem[];
  weekItems: WeekItem[];
  findItem: (id: string | null) => ScheduleLikeItem | null;
  updateItem: (id: string, patch: Partial<ScheduleLikeItem>) => void;
  removeItem: (id: string) => void;

  // queue
  queueEntries: QueueEntry[];
  resolveQueueEntry: (id: string) => void;

  // logging notice
  noticeDismissed: boolean;
  dismissNotice: () => void;

  // item drawer
  drawer: DrawerState;
  openDrawer: (itemId: string, view?: DrawerView, presentation?: DrawerPresentation) => void;
  closeDrawer: () => void;
  setDrawerView: (view: DrawerView) => void;
  rescheduleDate: string;
  rescheduleTime: string;
  notesDraft: string;
  setRescheduleDate: (v: string) => void;
  setRescheduleTime: (v: string) => void;
  setNotesDraft: (v: string) => void;
  saveReschedule: () => void;
  saveNotes: () => void;
  confirmRemove: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [view, setView] = useState<ViewName>('home');
  const [openModals, setOpenModals] = useState<Record<ModalName, boolean>>({
    capture: false, detail: false, 'edit-profile': false, password: false,
  });
  const [toastMsg, setToastMsg] = useState('');
  const [toastShown, setToastShown] = useState(false);
  const toastTimer = useRef<number | null>(null);

  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>(initialScheduleItems);
  const [weekItems, setWeekItems] = useState<WeekItem[]>(initialWeekItems);
  const [queueEntries, setQueueEntries] = useState<QueueEntry[]>(initialQueueEntries);
  const [noticeDismissed, setNoticeDismissed] = useState(false);

  const [drawer, setDrawer] = useState<DrawerState>({ open: false, itemId: null, view: 'details', presentation: 'sheet' });
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');
  const [notesDraft, setNotesDraft] = useState('');

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    document.documentElement.setAttribute('data-theme', t);
  }, []);

  const gotoView = useCallback((v: ViewName) => setView(v), []);

  const openModal = useCallback((name: ModalName) => {
    setOpenModals((prev) => ({ ...prev, [name]: true }));
    document.body.style.overflow = 'hidden';
  }, []);
  const closeModal = useCallback((name: ModalName) => {
    setOpenModals((prev) => ({ ...prev, [name]: false }));
    document.body.style.overflow = '';
  }, []);

  const showToast = useCallback((msg: string) => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    setToastMsg(msg);
    setToastShown(true);
    toastTimer.current = window.setTimeout(() => setToastShown(false), 2600);
  }, []);

  const updateProfile = useCallback((p: Profile) => setProfile(p), []);

  const findItem = useCallback((id: string | null): ScheduleLikeItem | null => {
    if (!id) return null;
    return scheduleItems.find((i) => i.id === id) || weekItems.find((i) => i.id === id) || null;
  }, [scheduleItems, weekItems]);

  const updateItem = useCallback((id: string, patch: Partial<ScheduleLikeItem>) => {
    setScheduleItems((prev) => {
      if (prev.some((i) => i.id === id)) {
        return prev.map((i) => (i.id === id ? { ...i, ...patch } as ScheduleItem : i));
      }
      return prev;
    });
    setWeekItems((prev) => {
      if (prev.some((i) => i.id === id)) {
        return prev.map((i) => (i.id === id ? { ...i, ...patch } as WeekItem : i));
      }
      return prev;
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setScheduleItems((prev) => prev.filter((i) => i.id !== id));
    setWeekItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const resolveQueueEntry = useCallback((id: string) => {
    setQueueEntries((prev) => prev.map((e) => (e.id === id ? { ...e, resolved: true } : e)));
  }, []);

  const dismissNotice = useCallback(() => setNoticeDismissed(true), []);

  const openDrawer = useCallback((itemId: string, dview: DrawerView = 'details', presentation: DrawerPresentation = 'sheet') => {
    const item = findItem(itemId);
    setDrawer({ open: true, itemId, view: dview, presentation });
    setRescheduleDate(item ? item.isoDate : '');
    setRescheduleTime(item ? item.time24 : '');
    setNotesDraft(item ? item.notes : '');
  }, [findItem]);

  const closeDrawer = useCallback(() => setDrawer((prev) => ({ ...prev, open: false })), []);
  const setDrawerView = useCallback((dview: DrawerView) => setDrawer((prev) => ({ ...prev, view: dview })), []);

  const saveReschedule = useCallback(() => {
    if (!drawer.itemId) return;
    const patch: Partial<ScheduleLikeItem> = { rescheduled: true };
    if (rescheduleDate) patch.isoDate = rescheduleDate;
    if (rescheduleTime) {
      patch.time24 = rescheduleTime;
      const [h, m] = rescheduleTime.split(':').map(Number);
      const period = h >= 12 ? 'PM' : 'AM';
      const h12 = ((h + 11) % 12) + 1;
      patch.time = h12 + ':' + String(m).padStart(2, '0') + ' ' + period;
    }
    updateItem(drawer.itemId, patch);
    setDrawerView('details');
  }, [drawer.itemId, rescheduleDate, rescheduleTime, updateItem, setDrawerView]);

  const saveNotes = useCallback(() => {
    if (!drawer.itemId) return;
    updateItem(drawer.itemId, { notes: notesDraft });
    setDrawerView('details');
  }, [drawer.itemId, notesDraft, updateItem, setDrawerView]);

  const confirmRemove = useCallback(() => {
    if (!drawer.itemId) return;
    removeItem(drawer.itemId);
    closeDrawer();
  }, [drawer.itemId, removeItem, closeDrawer]);

  const value = useMemo<AppContextValue>(() => ({
    theme, setTheme,
    view, gotoView,
    openModals, openModal, closeModal,
    toastMsg, toastShown, showToast,
    profile, updateProfile,
    scheduleItems, weekItems, findItem, updateItem, removeItem,
    queueEntries, resolveQueueEntry,
    noticeDismissed, dismissNotice,
    drawer, openDrawer, closeDrawer, setDrawerView,
    rescheduleDate, rescheduleTime, notesDraft,
    setRescheduleDate, setRescheduleTime, setNotesDraft,
    saveReschedule, saveNotes, confirmRemove,
  }), [
    theme, setTheme, view, gotoView, openModals, openModal, closeModal,
    toastMsg, toastShown, showToast, profile, updateProfile,
    scheduleItems, weekItems, findItem, updateItem, removeItem,
    queueEntries, resolveQueueEntry, noticeDismissed, dismissNotice,
    drawer, openDrawer, closeDrawer, setDrawerView,
    rescheduleDate, rescheduleTime, notesDraft, saveReschedule, saveNotes, confirmRemove,
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
