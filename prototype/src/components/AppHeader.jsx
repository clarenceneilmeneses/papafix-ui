import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from './Icons.jsx';

/* One header treatment for every screen.
 *
 * Production used two: a real app bar on My Addresses (back + title + action)
 * and a lone floating back chevron on every other stack screen, with the
 * title orphaned ~90px below it. This merges them — the back button and any
 * trailing action share one bar, and the large title sits directly under it.
 * Roughly 90px of vertical space comes back on every stack screen.
 */
export function AppHeader({ title, subtitle, back = false, action, children }) {
  const navigate = useNavigate();
  return (
    <header className="header">
      {(back || action) && (
        <div className="header__bar">
          {back && (
            <button
              type="button"
              className="header__back"
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <ChevronLeft />
            </button>
          )}
          <span className="header__spacer" />
          {action}
        </div>
      )}
      {children}
      {title && <h1 className="header__title t-headline-lg">{title}</h1>}
      {subtitle && <p className="header__subtitle t-body-lg">{subtitle}</p>}
    </header>
  );
}
