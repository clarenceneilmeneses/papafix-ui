import { BottomNav } from './BottomNav.jsx';

/* The app scaffold: a coloured hero with a lifted sheet under it.
 *
 * Every screen in the app is built from this, which is the point — the auth
 * screens used to be the only ones with any shape to them and everything else
 * was content dropped onto a flat page.
 *
 * WHY IT IS ALSO THE FIX FOR THE OVERLAP BUG:
 * the sheet is the ONLY scrolling region. Before this, each screen scrolled
 * its whole self, so the title, the search box and the filter chips all
 * travelled up under nothing and list rows ran beneath the floating nav. Now
 * the header stays put, the list scrolls inside the sheet, and the sheet
 * reserves clearance for the nav so the last row can always be read.
 *
 * Flutter: Column[ hero, Expanded(sheet) ] inside a Scaffold whose
 * backgroundColor is the hero colour; the sheet is a Container with a
 * vertical-only BorderRadius and a ListView inside it.
 */
export function Shell({ hero, children, sticky, nav = false, flush = false }) {
  // Tab screens have no back button, so their hero content would otherwise
  // start hard against the status bar.
  const heroCls = `shell__hero${nav ? ' shell__hero--tab' : ''}`;
  const sheet = [
    'shell__sheet',
    nav && 'shell__sheet--nav',
    flush && 'shell__sheet--flush',
  ].filter(Boolean).join(' ');

  return (
    <div className="shell">
      <div className={heroCls}>{hero}</div>
      <div className={sheet}>{children}</div>
      {sticky}
      {/* Content fades out beneath the floating nav instead of showing
          through the gaps either side of the pill. */}
      {nav && <span className="nav-scrim" aria-hidden="true" />}
      {nav && <BottomNav />}
    </div>
  );
}

/* The hero's own title block. Kept separate from AppHeader because a tab
   screen has no back button and no step progress — it just has a name. */
export function HeroTitle({ title, subtitle, action }) {
  return (
    <div className="hero-title">
      <div style={{ flex: 1, minWidth: 0 }}>
        <h1 className="t-headline-lg">{title}</h1>
        {subtitle && <p className="hero-title__sub t-body-lg">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
