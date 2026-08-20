import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { SCENARIOS } from '../mock/api.js';
import { useScenario } from '../mock/scenario.jsx';
import { ChevronRight, AlertTriangle } from './Icons.jsx';

/* Prototype chrome. None of this exists in the app.
 *
 * On a phone the app fills the viewport and the handset supplies its own
 * bezel, status bar and gesture bar. On a desktop review it renders inside a
 * device mock, with a collapsible screen index beside it.
 */

/* One prototype, two apps. Both share the token layer and every component —
   only the screens and the colour ROLES differ. See [data-app] in tokens.css. */
const APPS = [
  { id: 'customer',   label: 'Customer',   ready: true },
  { id: 'technician', label: 'Technician', ready: true },
];

const TECH_INDEX = [
  {
    group: 'Auth',
    items: [['/tech/sign-in', 'Sign In']],
  },
  {
    group: 'Tabs',
    items: [
      ['/tech/home', 'Home'],
      ['/tech/jobs', 'Jobs'],
      ['/tech/schedule', 'Schedule'],
      ['/tech/profile', 'Profile'],
    ],
  },
  {
    group: 'Job',
    items: [
      ['/tech/jobs/tj-1', 'Incoming — decide'],
      ['/tech/jobs/tj-3', 'Active — in progress'],
      ['/tech/jobs/tj-4', 'Completed'],
      ['/tech/jobs/tj-10', 'Cancelled'],
    ],
  },
  {
    group: 'Stack',
    items: [
      ['/tech/earnings', 'Earnings'],
      ['/tech/reviews', 'Reviews'],
      ['/tech/support', 'Help & Support'],
    ],
  },
];

const INDEX = [
  {
    group: 'First run',
    items: [['/onboarding', 'Onboarding']],
  },
  {
    group: 'Auth',
    items: [
      ['/sign-in', 'Sign In'],
      ['/sign-up', 'Sign Up'],
    ],
  },
  {
    group: 'Tabs',
    items: [
      ['/home', 'Home'],
      ['/bookings', 'My Bookings'],
      ['/profile', 'Profile'],
    ],
  },
  {
    group: 'Stack',
    items: [
      ['/addresses', 'My Addresses'],
      ['/support', 'Help & Support'],
    ],
  },
  {
    group: 'Booking flow',
    items: [
      ['/book', '1 · Category'],
      ['/book/appliances/unit', '2 · Aircon unit'],
      ['/book/plumbing/issue', '2 · Issue (Plumbing)'],
      ['/book/electrical/issue', '2 · Issue (Electrical)'],
      ['/book/appliances/details', '3 · Job Details'],
      ['/book/appliances/technician', '4 · Technician'],
    ],
  },
];

/* Routes whose top edge is a light surface rather than the brand colour, so
   the status bar has to invert. In the app this is one line —
   SystemUiOverlayStyle on the route's AppBar. */
const LIGHT_TOP = ['/onboarding'];

/* The device mock is 844px tall plus bezel. Most laptop windows are shorter
   than that, which forced a browser zoom-out — and browser zoom scales the
   text too, so the mock stopped being a truthful preview. Scaling the mock
   itself keeps the phone at real proportions and always fully visible. */
const DEVICE_W = 410;   // 390 screen + 2 x 10 bezel
const DEVICE_H = 864;   // 844 screen + 2 x 10 bezel
const CHROME_H = 56;    // top bar
const GUTTER = 40;      // stage padding, top + bottom

function useFitScale(enabled) {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    if (!enabled) { setScale(1); return undefined; }
    const measure = () => {
      const available = window.innerHeight - CHROME_H - GUTTER;
      // Never scale UP — 1:1 is the truthful maximum.
      setScale(Math.min(1, available / DEVICE_H));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [enabled]);
  return scale;
}

const Signal = () => (
  <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" aria-hidden="true">
    <rect x="0" y="8" width="3" height="4" rx="1" />
    <rect x="4.3" y="5.5" width="3" height="6.5" rx="1" />
    <rect x="8.6" y="3" width="3" height="9" rx="1" />
    <rect x="12.9" y="0.5" width="3" height="11.5" rx="1" />
  </svg>
);
const Wifi = () => (
  <svg width="15" height="12" viewBox="0 0 15 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
    <path d="M1 4.2a9.5 9.5 0 0 1 13 0" />
    <path d="M3.4 6.8a6 6 0 0 1 8.2 0" />
    <path d="M5.9 9.3a2.6 2.6 0 0 1 3.2 0" />
    <circle cx="7.5" cy="11" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);
const Battery = () => (
  <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden="true">
    <rect x="0.6" y="0.6" width="18" height="10.8" rx="3" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
    <rect x="2.4" y="2.4" width="12" height="7.2" rx="1.6" fill="currentColor" />
    <path d="M20.4 4.2v3.6a2 2 0 0 0 0-3.6Z" fill="currentColor" opacity="0.6" />
  </svg>
);

function StatusBar({ dark }) {
  return (
    <div className={`statusbar${dark ? ' statusbar--dark' : ''}`}>
      <span>9:41</span>
      <span className="statusbar__icons">
        <Signal /><Wifi /><Battery />
      </span>
    </div>
  );
}

/* The forced-scenario control.
 *
 * The explanation used to be a full-width banner strip under the top bar,
 * which was a lot of furniture for one line of text — and it pushed the stage
 * down, which clipped the phone. It is an inline notice in the bar now: it
 * appears only while a state is forced, and it costs no layout. */
const STATE_HELP = {
  loaded:  'normal data, as the API would return it',
  loading: 'skeleton placeholders, mid-request',
  empty:   'a brand-new account with nothing saved yet',
  error:   'the request failed',
};

function ScenarioNotice() {
  const { scenario, setScenario } = useScenario();
  if (scenario === 'loaded') return null;
  return (
    <div className="proto__notice t-body-md" role="status">
      <AlertTriangle size={16} />
      <span>Forcing <b>{scenario}</b> — {STATE_HELP[scenario]}.</span>
      <button
        type="button"
        className="proto__notice-reset t-label-lg"
        onClick={() => setScenario('loaded')}
      >
        Back to normal
      </button>
    </div>
  );
}

function ScenarioControl() {
  const { scenario, setScenario } = useScenario();
  return (
    <>
      <div className="statectl">
        <span className="statectl__label t-label-sm">Preview lists as</span>
        <div className="statectl__opts" role="group" aria-label="Forced data state">
          {SCENARIOS.map((s) => (
            <button
              key={s}
              type="button"
              title={`${s} — ${STATE_HELP[s]}`}
              aria-pressed={scenario === s}
              className={`statectl__btn t-label-lg${scenario === s ? ' is-active' : ''}`}
              onClick={() => setScenario(s)}
            >
              <span className="statectl__dot" aria-hidden="true" />
              {s}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

/* Which group holds a given path — used to auto-open the section you are in. */
function groupOf(pathname) {
  const list = pathname.startsWith('/tech') ? TECH_INDEX : INDEX;
  const hit = list.find(({ items }) =>
    items.some(([to]) => (to === '/book' ? pathname === '/book' : pathname.startsWith(to))));
  return hit ? hit.group : null;
}

/* The handoff files, served from /public so they download rather than open.
   They sit beside the style-guide link because that is where someone looking
   for the spec already is. */
const DOWNLOADS = [
  ['Spec', '.md', '/handoff/DESIGN-SYSTEM.md',
    'START HERE. The whole system in writing — rules, tokens, component specs, screen inventory. Stack-neutral: paste it into Claude Code whatever you build in.'],
  ['Tokens', '.json', '/handoff/papafix-tokens.json',
    'Every token as plain data. Feed to a Tailwind config, a Compose theme, a React Native StyleSheet, or any token pipeline.'],
  ['Tokens', '.css', '/handoff/papafix-tokens.css',
    'The same tokens as CSS custom properties. Use as your global stylesheet on web or React Native Web.'],
  ['Theme', '.dart', '/handoff/papafix_theme.dart',
    'The same tokens as a Flutter ThemeData plus AppSpacing / AppRadii / StatusColors extensions. Only needed if you are on Flutter.'],
];

export function PhoneFrame({ children }) {
  const { pathname } = useLocation();
  const lightTop = LIGHT_TOP.some((p) => pathname.startsWith(p));

  // The style guide is documentation for the dev, not a screen — a 390px
  // phone is the wrong place to read a spec.
  const bare = pathname.startsWith('/style');
  const scale = useFitScale(!bare);

  /* Sections collapse. Only the one you are in opens by default, which keeps
     the index short enough to read at a glance instead of needing to scroll. */
  const navigate = useNavigate();

  /* Which app you are looking at is the ROUTE, not a separate toggle state —
     otherwise deep-linking to /tech/jobs would show the customer index. */
  const app = pathname.startsWith('/tech') ? 'technician' : 'customer';
  const index = app === 'technician' ? TECH_INDEX : INDEX;

  const [open, setOpen] = useState(() => {
    const active = groupOf(pathname);
    return Object.fromEntries(
      [...INDEX, ...TECH_INDEX].map(({ group }) => [group, group === active]));
  });

  useEffect(() => {
    const active = groupOf(pathname);
    if (active) setOpen((o) => (o[active] ? o : { ...o, [active]: true }));
  }, [pathname]);

  return (
    <div className="proto">
      <nav className="proto__nav" aria-label="Screen index">
        <p className="proto__rail-title t-label-sm">PapaFix — UI reference</p>

        <div className="proto__apps" role="tablist" aria-label="Which app">
          {APPS.map(({ id, label, ready }) => (
            <button
              key={id}
              type="button"
              role="tab"
              disabled={!ready}
              aria-selected={app === id}
              title={ready ? undefined : 'Not built yet'}
              className={`proto__app t-label-lg${app === id ? ' is-active' : ''}`}
              onClick={() => navigate(id === 'technician' ? '/tech/home' : '/home')}
            >
              {label}
            </button>
          ))}
        </div>

        {index.map(({ group, items }) => {
          const isOpen = open[group];
          return (
            <div className="proto__rail-group" key={group}>
              <button
                type="button"
                className="proto__rail-head t-label-sm"
                aria-expanded={isOpen}
                onClick={() => setOpen((o) => ({ ...o, [group]: !o[group] }))}
              >
                <span className={`proto__rail-chev${isOpen ? ' is-open' : ''}`}>
                  <ChevronRight size={14} />
                </span>
                <span style={{ flex: 1 }}>{group}</span>
                <span className="proto__rail-count t-body-md">{items.length}</span>
              </button>

              {isOpen && items.map(([to, label]) => (
                <NavLink
                  key={to}
                  to={to}
                  end
                  className={({ isActive }) => `proto__rail-link t-body-md${isActive ? ' is-active' : ''}`}
                >
                  {label}
                </NavLink>
              ))}
            </div>
          );
        })}
      </nav>

      <div className="proto__body">
        <ScenarioNotice />

        <header className="proto__topbar">
          <div className="proto__dev">
            <Link to="/style" className={`proto__devlink t-label-lg${bare ? ' is-active' : ''}`}>
              For the dev · Style guide
            </Link>
            {DOWNLOADS.map(([name, ext, href, help]) => (
              <a key={href} className="proto__dl t-label-lg" href={href} download title={help}>
                {name}<span className="proto__dl-ext">{ext}</span>
              </a>
            ))}
          </div>
          <span className="proto__topbar-spacer" />
          <ScenarioControl />
        </header>

        <main className={`proto__stage${bare ? ' proto__stage--bare' : ''}`}>
          {bare ? children : (
            <div
              className="device-fit"
              style={{ width: DEVICE_W * scale, height: DEVICE_H * scale }}
            >
              <div className="device" style={{ transform: `scale(${scale})` }}>
                <div className="phone" data-app={app}>
                  <StatusBar dark={lightTop} />
                  {children}
                  <span
                    className={`gesturebar${lightTop ? ' gesturebar--dark' : ''}`}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
