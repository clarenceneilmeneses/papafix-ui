import { useLocation } from 'react-router-dom';

/* THE APP MARK.
 *
 * The icon only — no wordmark, no tagline, no corporate line baked into the
 * pixels. Production shipped one flat poster asset containing all four, and
 * rendered it at ~390px on the sign-in screen where the tagline was at the
 * edge of legibility and unreadable in the launcher.
 *
 * Splitting them means the wordmark is real text: it stays sharp at any size,
 * it can be translated, and it can be laid out. See TECH-APP-REVIEW.md §9.
 *
 * Two marks, one character:
 *   customer   — orange ground, navy wrench
 *   technician — blue ground, navy cap and wrench
 * The ground colour inverts with the app's primary hue, which is how someone
 * with both installed tells the launcher icons apart.
 *
 * Flutter: two entries in the flavour's asset catalogue; the launcher icon is
 * the same file at the platform's required densities.
 */
export function AppMark({ size = 64, app }) {
  const { pathname } = useLocation();
  const which = app ?? (pathname.startsWith('/tech') ? 'technician' : 'customer');

  return (
    <img
      className="app-mark"
      src={`/brand/app-icon-${which}-192.png`}
      width={size}
      height={size}
      style={{ width: size, height: size }}
      alt=""
      aria-hidden="true"
    />
  );
}
