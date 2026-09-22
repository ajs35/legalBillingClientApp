import { useApp } from '../context/AppContext';
import { initialsFor } from '../data';
import { IconAskElly, IconChevronRight, IconHelp, IconLock, IconMail, IconMoon, IconSun, IconUser } from '../components/Icons';

export function ProfileView() {
  const { profile, theme, setTheme, gotoView, openModal } = useApp();
  const initials = initialsFor(profile.name) || 'MO';

  return (
    <section className="view active">
      <div className="statusbar-spacer" />
      <div className="col" style={{ padding: '8px 24px 12px', flexShrink: 0 }}>
        <span style={{ fontSize: 26, fontWeight: 700 }}>Profile</span>
      </div>
      <div className="scroll col" style={{ paddingTop: 4, paddingLeft: 24, paddingRight: 24, gap: 26 }}>
        <div className="row" style={{ alignItems: 'center', gap: 14 }}>
          <div style={{ width: 58, height: 58, borderRadius: '50%', background: 'var(--accent-soft)', color: 'var(--accent-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 300, flexShrink: 0 }}>{initials}</div>
          <div className="col" style={{ flex: 1, gap: 2, minWidth: 0 }}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{profile.name}</div>
            <div style={{ fontSize: 12.5, color: 'var(--ink-faint)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{profile.title} · {profile.email}</div>
          </div>
          <button className="btn-tertiary accent" style={{ padding: '9px 12px', flexShrink: 0 }} onClick={() => openModal('edit-profile')}>Edit</button>
        </div>

        <div className="col" style={{ gap: 9 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>Account</div>
          <div className="col card" style={{ border: 'none' }}>
            <div className="row settings-row" onClick={() => openModal('edit-profile')}>
              <div className="settings-row-icon"><IconUser /></div>
              <div className="col" style={{ flex: 1, gap: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600 }}>Personal information</div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-faint)' }}>Name, email, phone</div>
              </div>
              <IconChevronRight />
            </div>
            <div className="row settings-row" onClick={() => openModal('password')}>
              <div className="settings-row-icon"><IconLock /></div>
              <div className="col" style={{ flex: 1, gap: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600 }}>Password &amp; security</div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-faint)' }}>Update your password</div>
              </div>
              <IconChevronRight />
            </div>
          </div>
        </div>

        <div className="col" style={{ gap: 9 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>Support</div>
          <div className="col card" style={{ border: 'none' }}>
            <div className="row settings-row" onClick={() => gotoView('support-elly')}>
              <div className="settings-row-icon accent"><IconAskElly /></div>
              <div className="col" style={{ flex: 1, gap: 1 }}>
                <div className="row" style={{ alignItems: 'center', gap: 7 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 600 }}>Ask Elly</span>
                  <span className="pill" style={{ background: 'var(--accent-soft)', color: 'var(--accent-ink)' }}>AI</span>
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-faint)' }}>Chat with your elite agentic assistant</div>
              </div>
              <IconChevronRight />
            </div>
            <div className="row settings-row" onClick={() => gotoView('support-contact')}>
              <div className="settings-row-icon"><IconMail /></div>
              <div className="col" style={{ flex: 1, gap: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600 }}>Contact us</div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-faint)' }}>Reach our support team directly</div>
              </div>
              <IconChevronRight />
            </div>
            <div className="row settings-row" onClick={() => gotoView('support-faq')}>
              <div className="settings-row-icon"><IconHelp /></div>
              <div className="col" style={{ flex: 1, gap: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600 }}>FAQs</div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-faint)' }}>Answers to common questions</div>
              </div>
              <IconChevronRight />
            </div>
          </div>
        </div>

        <div className="col" style={{ gap: 9 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>Appearance</div>
          <div className="seg">
            <button className={theme === 'light' ? 'active' : ''} onClick={() => setTheme('light')}><IconSun />Light</button>
            <button className={theme === 'dark' ? 'active' : ''} onClick={() => setTheme('dark')}><IconMoon />Dark</button>
          </div>
        </div>

        <button className="btn-tertiary danger" style={{ justifyContent: 'center' }}>Sign out</button>
        <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--ink-faint)', marginTop: -12 }}>Brief v2.4.1</div>
      </div>
    </section>
  );
}
