/* Shared primitives. One definition per component, used everywhere.
   Nothing below takes a colour or size prop — variants only. */

import { useEffect, useState } from 'react';
import { ChevronRight, Inbox, AlertTriangle, Eye, EyeOff } from './Icons.jsx';

/* ---------------- Card ---------------- */
export function Card({ as = 'div', selected, inert, flush, className = '', children, ...rest }) {
  const Tag = as;
  const cls = [
    'card',
    flush && 'card--flush',
    selected && 'card--selected',
    inert && 'card--inert',
    (as === 'button' || as === 'a') && !inert && 'card--tappable',
    className,
  ].filter(Boolean).join(' ');
  return <Tag className={cls} {...rest}>{children}</Tag>;
}

/* ---------------- SectionLabel ---------------- */
export const SectionLabel = ({ children }) => (
  <h2 className="section-label t-label-sm">{children}</h2>
);

/* ---------------- StatusPill ----------------
   Replaces the two incompatible pill designs in production. */
const PILL_ROLES = {
  paid:      { role: 'success', label: 'Paid' },
  scheduled: { role: 'info',    label: 'Scheduled' },
  open:      { role: 'warning', label: 'Open' },
  resolved:  { role: 'success', label: 'Resolved' },
  soon:      { role: 'neutral', label: 'Coming soon' },
};
export function StatusPill({ status, label }) {
  const spec = PILL_ROLES[status] ?? PILL_ROLES.soon;
  return (
    <span className={`pill pill--${spec.role} t-label-sm`}>
      <span className="pill__dot" />
      {label ?? spec.label}
    </span>
  );
}

/* ---------------- Chip (selectable) ---------------- */
export const Chip = ({ selected, children, ...rest }) => (
  <button
    type="button"
    className={`chip t-label-lg${selected ? ' is-selected' : ''}`}
    aria-pressed={selected}
    {...rest}
  >
    {children}
  </button>
);

/* ---------------- Tag (read-only breadcrumb) ---------------- */
export const Tag = ({ children }) => <span className="tag t-label-sm">{children}</span>;

/* ---------------- Button ---------------- */
/* variant: primary | outline | destructive | onhero
   `onhero` is the inverted primary — white fill, brand-coloured label — for
   use on a brand-coloured hero, where a blue button would disappear. */
export function Button({ variant = 'primary', size, className = '', children, ...rest }) {
  const cls = ['btn', `btn--${variant}`, size === 'sm' && 'btn--sm', 't-title-md', className]
    .filter(Boolean).join(' ');
  return <button type="button" className={cls} {...rest}>{children}</button>;
}

export const LinkButton = ({ children, className = '', ...rest }) => (
  <button type="button" className={`link-btn t-title-md ${className}`} {...rest}>{children}</button>
);

/* ---------------- Divider ----------------
   A hairline with an optional word set into it. */
export const Divider = ({ label = 'or' }) => (
  <div className="divider-row">
    <span className="t-body-md c-on-surface-variant">{label}</span>
  </div>
);

/* ---------------- Field ----------------
   `action` puts a control on the label row, for a control that qualifies the
   field itself. Recovery links are NOT this — "Forgot password?" sits after
   the input on both Sign In screens, because you only reach for it once the
   password you tried has failed. */
export function Field({ label, help, error, counter, action, children }) {
  return (
    <label className="field">
      {(label || action) && (
        <span className="field__row">
          {label && <span className="field__label t-label-sm">{label}</span>}
          {action}
        </span>
      )}
      {children}
      {counter && <span className="field__counter t-body-md">{counter}</span>}
      {(help || error) && (
        <span className={`field__help t-body-md${error ? ' field__help--error' : ''}`}>
          {error || help}
        </span>
      )}
    </label>
  );
}

/* ---------------- TextInput ----------------
   One input, optionally with a leading glyph and a trailing control. The
   leading icon is what makes a stack of identical boxes readable at a glance
   before any label is parsed. */
export function TextInput({ lead, trail, className = '', ...rest }) {
  return (
    <span className={`field__wrap${lead ? ' field__wrap--lead' : ''}`}>
      {lead && <span className="field__lead">{lead}</span>}
      <input className={`field__input t-body-lg ${className}`} {...rest} />
      {trail}
    </span>
  );
}

/* Password input with its own show/hide state, so no screen has to hold a
   boolean per password field (Sign Up has two). */
export function PasswordInput({ lead, ...rest }) {
  const [show, setShow] = useState(false);
  return (
    <TextInput
      {...rest}
      lead={lead}
      type={show ? 'text' : 'password'}
      trail={
        <button
          type="button"
          className="field__affix"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      }
    />
  );
}

/* ---------------- BottomSheet ----------------
   Flutter: showModalBottomSheet. Tapping the scrim dismisses; the panel
   swallows its own clicks. */
export function BottomSheet({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div className="sheet-scrim" onClick={onClose} role="presentation">
      <div
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="sheet__grabber" aria-hidden="true" />
        {title && <h2 className="t-title-lg mb-lg">{title}</h2>}
        {children}
        {footer}
      </div>
    </div>
  );
}

/* ---------------- StepProgress ----------------
   A 4-segment bar instead of 4 dots: it shows how much of the flow is behind
   you, which dots of equal size never did. */
export function StepProgress({ current, total }) {
  return (
    <div className="steps" role="group" aria-label={`Step ${current} of ${total}`}>
      <div className="steps__track">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={`steps__seg${i + 1 < current ? ' is-done' : ''}${i + 1 === current ? ' is-current' : ''}`}
          />
        ))}
      </div>
      <span className="steps__label t-label-lg">Step {current} of {total}</span>
    </div>
  );
}

/* ---------------- StickyActionBar ---------------- */
export const StickyBar = ({ hint, children }) => (
  <div className="sticky-bar">
    {children}
    {hint && <span className="sticky-bar__hint t-body-md">{hint}</span>}
  </div>
);

/* ---------------- Avatar ---------------- */
export function Avatar({ name, src, size }) {
  const initial = (name || '?').trim().charAt(0).toUpperCase();
  return (
    <span className={`avatar${size === 'lg' ? ' avatar--lg' : ''}`} aria-hidden="true">
      {src
        ? <img src={src} alt="" />
        : <span className={size === 'lg' ? 't-headline-sm' : 't-title-lg'}>{initial}</span>}
    </span>
  );
}

/* ---------------- Empty / Error / Loading ---------------- */
export const EmptyState = ({ icon: Icon = Inbox, title, body, action }) => (
  <div className="state">
    <span className="state__icon"><Icon size={28} /></span>
    <h3 className="t-title-lg">{title}</h3>
    {body && <p className="state__body t-body-md">{body}</p>}
    {action}
  </div>
);

export const ErrorState = ({ title = 'Something went wrong', body, onRetry }) => (
  <div className="state">
    <span className="state__icon"><AlertTriangle size={28} /></span>
    <h3 className="t-title-lg">{title}</h3>
    {body && <p className="state__body t-body-md">{body}</p>}
    {onRetry && <Button variant="outline" size="sm" onClick={onRetry}>Try again</Button>}
  </div>
);

export const Skeleton = ({ w = '100%', h = 14, r }) => (
  <span className="skeleton" style={{ display: 'block', width: w, height: h, borderRadius: r }} />
);

export function SkeletonCard({ lines = 3 }) {
  return (
    <div className="card">
      <Skeleton w="55%" h={20} />
      <div style={{ height: 'var(--space-md)' }} />
      {Array.from({ length: lines }, (_, i) => (
        <div key={i} style={{ marginBottom: 'var(--space-sm)' }}>
          <Skeleton w={i === lines - 1 ? '40%' : '85%'} />
        </div>
      ))}
    </div>
  );
}

export const SkeletonList = ({ count = 3, lines }) => (
  <div className="card-stack">
    {Array.from({ length: count }, (_, i) => <SkeletonCard key={i} lines={lines} />)}
  </div>
);

/* ---------------- RowLink ---------------- */
export const RowLink = ({ icon, title, value, onClick }) => (
  <button type="button" className="row" onClick={onClick}>
    {icon}
    <span className="row__body">
      <span className="t-title-md" style={{ display: 'block' }}>{title}</span>
    </span>
    {value && <span className="t-body-md c-on-surface-variant truncate">{value}</span>}
    <span className="row__chev"><ChevronRight size={20} /></span>
  </button>
);

/* The forced-scenario control now lives in the prototype rail, outside the
   phone — see components/PhoneFrame.jsx and mock/scenario.jsx. */

/* ---------------- useAsync ----------------
   Re-runs whenever the forced scenario changes. */
export function useAsync(loader, deps) {
  const [state, setState] = useState({ status: 'loading', data: null, error: null });
  useEffect(() => {
    let alive = true;
    setState({ status: 'loading', data: null, error: null });
    loader()
      .then((data) => alive && setState({ status: 'done', data, error: null }))
      .catch((error) => alive && setState({ status: 'error', data: null, error }));
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return state;
}
