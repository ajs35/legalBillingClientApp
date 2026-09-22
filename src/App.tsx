import { AppProvider, useApp } from './context/AppContext';
import { FloatingNav } from './components/FloatingNav';
import { Toast } from './components/Toast';
import { Drawer } from './components/Drawer';
import { CaptureModal } from './components/modals/CaptureModal';
import { EntryReviewModal } from './components/modals/EntryReviewModal';
import { EditProfileModal } from './components/modals/EditProfileModal';
import { PasswordModal } from './components/modals/PasswordModal';
import { AskEllyModal } from './components/modals/AskEllyModal';
import { HomeView } from './views/HomeView';
import { QueueView } from './views/QueueView';
import { MattersView } from './views/MattersView';
import { PaymentsView } from './views/PaymentsView';
import { ProfileView } from './views/ProfileView';
import { ContactUsView } from './views/ContactUsView';
import { FaqView } from './views/FaqView';

function ActiveView() {
  const { view } = useApp();
  switch (view) {
    case 'home': return <HomeView />;
    case 'queue': return <QueueView />;
    case 'matters': return <MattersView />;
    case 'payments': return <PaymentsView />;
    case 'profile': return <ProfileView />;
    case 'support-contact': return <ContactUsView />;
    case 'support-faq': return <FaqView />;
    default: return <HomeView />;
  }
}

function Shell() {
  return (
    <div className="shell">
      <ActiveView />
      <FloatingNav />
      <CaptureModal />
      <EntryReviewModal />
      <EditProfileModal />
      <PasswordModal />
      <AskEllyModal />
      <Drawer />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}
