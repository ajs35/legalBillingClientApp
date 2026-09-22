import { useApp } from '../context/AppContext';
import { initialsFor } from '../data';
import { IconCapture, IconMatters, IconPayments, IconSchedule } from './Icons';
import type { ViewName } from '../types';

export function FloatingNav() {
  const { view, gotoView, openModal, profile } = useApp();
  const isActive = (v: ViewName) => view === v;

  return (
    <nav className="floating-nav">
      <div className="floating-nav-bg" />
      <div className="floating-nav-content">
        <button className={'navitem' + (isActive('home') ? ' active' : '')} onClick={() => gotoView('home')}>
          <IconSchedule />
          <span>Schedule</span>
        </button>
        <button className={'navitem' + (isActive('matters') ? ' active' : '')} onClick={() => gotoView('matters')}>
          <IconMatters />
          <span>Matters</span>
        </button>
        <div className="navitem" style={{ flex: 1, alignItems: 'center' }}>
          <button className="capture-fab" onClick={() => openModal('capture')}>
            <IconCapture />
          </button>
        </div>
        <button className={'navitem' + (isActive('payments') ? ' active' : '')} style={{ position: 'relative' }} onClick={() => gotoView('payments')}>
          <IconPayments />
          <span>Payments</span>
          <div style={{ position: 'absolute', top: -3, right: 26, width: 7, height: 7, borderRadius: '50%', background: 'var(--warn)' }} />
        </button>
        <button className={'navitem' + (isActive('profile') ? ' active' : '')} onClick={() => gotoView('profile')}>
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--accent-soft)', color: 'var(--accent-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>
            {initialsFor(profile.name) || 'MO'}
          </div>
          <span>Profile</span>
        </button>
      </div>
    </nav>
  );
}
