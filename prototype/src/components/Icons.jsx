/* Inline SVG icon set — avoids an icon-library dependency and keeps every
   glyph on the same 24px grid with the same 2px stroke.
   Production had at least two glyphs that rendered as unrecognisable
   placeholder shapes (the Book-a-Technician tile and the Auto-match tile);
   those are given real meanings here. */

const base = {
  width: 24, height: 24, viewBox: '0 0 24 24',
  fill: 'none', stroke: 'currentColor',
  strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round',
};

const Svg = ({ size = 24, children, ...rest }) => (
  <svg {...base} width={size} height={size} aria-hidden="true" focusable="false" {...rest}>
    {children}
  </svg>
);

export const ChevronLeft  = (p) => <Svg {...p}><polyline points="15 18 9 12 15 6" /></Svg>;
export const ChevronRight = (p) => <Svg {...p}><polyline points="9 18 15 12 9 6" /></Svg>;

export const Home = (p) => (
  <Svg {...p}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></Svg>
);
export const Receipt = (p) => (
  <Svg {...p}>
    <path d="M6 2h12v20l-3-2-3 2-3-2-3 2Z" />
    <line x1="9" y1="8" x2="15" y2="8" /><line x1="9" y1="12" x2="15" y2="12" />
  </Svg>
);
export const User = (p) => (
  <Svg {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" /></Svg>
);

/* Replaces the unreadable T-shape on the Home hero card. */
export const Wrench = (p) => (
  <Svg {...p}>
    <path d="M14.7 6.3a4 4 0 0 0 5 5l-9.4 9.4a2.1 2.1 0 0 1-3-3Z" />
    <path d="M14.7 6.3 17.5 3.5" />
  </Svg>
);
export const Droplet = (p) => (
  <Svg {...p}><path d="M12 3s6 6.2 6 10a6 6 0 0 1-12 0c0-3.8 6-10 6-10Z" /></Svg>
);
export const Bolt = (p) => (
  <Svg {...p}><polygon points="13 2 4 14 11 14 10 22 20 10 13 10 13 2" /></Svg>
);
export const Snowflake = (p) => (
  <Svg {...p}>
    <line x1="12" y1="2" x2="12" y2="22" /><line x1="3" y1="7" x2="21" y2="17" />
    <line x1="21" y1="7" x2="3" y2="17" />
  </Svg>
);
export const Grid = (p) => (
  <Svg {...p}>
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
  </Svg>
);

export const MapPin = (p) => (
  <Svg {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></Svg>
);
export const LifeBuoy = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" />
    <line x1="15" y1="9" x2="18.5" y2="5.5" /><line x1="5.5" y1="18.5" x2="9" y2="15" />
    <line x1="15" y1="15" x2="18.5" y2="18.5" /><line x1="5.5" y1="5.5" x2="9" y2="9" />
  </Svg>
);
export const Search = (p) => (
  <Svg {...p}><circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" /></Svg>
);
export const Eye = (p) => (
  <Svg {...p}><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></Svg>
);
export const EyeOff = (p) => (
  <Svg {...p}>
    <path d="M10.6 5.2A9.9 9.9 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4" />
    <path d="M6.2 6.5A17 17 0 0 0 2 12s3.6 7 10 7a9.7 9.7 0 0 0 4.6-1.1" />
    <line x1="3" y1="3" x2="21" y2="21" />
  </Svg>
);
export const Pencil = (p) => (
  <Svg {...p}><path d="M4 20h4l10-10-4-4L4 16Z" /><path d="M14 6l4 4" /></Svg>
);
export const Plus = (p) => (
  <Svg {...p}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></Svg>
);
export const Check = (p) => <Svg {...p}><polyline points="20 6 9 17 4 12" /></Svg>;
export const Google = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7c2.2-2 3.4-5 3.4-8.6Z" />
    <path fill="#34A853" d="M12 24c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7H1.8v3C3.7 21.4 7.6 24 12 24Z" />
    <path fill="#FBBC05" d="M5.6 14.7a7.2 7.2 0 0 1 0-4.6v-3H1.8a12 12 0 0 0 0 10.6l3.8-3Z" />
    <path fill="#EA4335" d="M12 4.8c1.7 0 3.2.6 4.4 1.7l3.3-3.3C17.7 1.2 15.1 0 12 0 7.6 0 3.7 2.6 1.8 6.1l3.8 3C6.5 6.7 9 4.8 12 4.8Z" />
  </svg>
);

/* Replaces the two-white-bars placeholder on the Auto-match card. */
export const Sparkle = (p) => (
  <Svg {...p}>
    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z" />
    <path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8Z" />
  </Svg>
);
export const Star = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9Z" />
  </svg>
);
export const Inbox = (p) => (
  <Svg {...p}>
    <path d="M3 13h5l1.5 3h5L16 13h5" />
    <path d="M5.4 5h13.2l2.4 8v6H3v-6Z" />
  </Svg>
);
export const AlertTriangle = (p) => (
  <Svg {...p}>
    <path d="M12 3.5 22 20H2Z" /><line x1="12" y1="10" x2="12" y2="14" />
    <circle cx="12" cy="17" r="0.6" fill="currentColor" />
  </Svg>
);
export const Calendar = (p) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <line x1="8" y1="3" x2="8" y2="7" /><line x1="16" y1="3" x2="16" y2="7" />
  </Svg>
);

export const Mail = (p) => (
  <Svg {...p}>
    <rect x="2.5" y="5" width="19" height="14" rx="2" />
    <path d="m3 6.5 9 6 9-6" />
  </Svg>
);
export const Lock = (p) => (
  <Svg {...p}>
    <rect x="4" y="10.5" width="16" height="10.5" rx="2" />
    <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
  </Svg>
);
export const ArrowRight = (p) => (
  <Svg {...p}><line x1="4" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" /></Svg>
);
export const ShieldCheck = (p) => (
  <Svg {...p}>
    <path d="M12 3l7.5 3v5.5c0 4.6-3.1 8.4-7.5 9.5-4.4-1.1-7.5-4.9-7.5-9.5V6Z" />
    <polyline points="9 12 11.2 14 15 10" />
  </Svg>
);
export const PriceTag = (p) => (
  <Svg {...p}>
    <path d="M3 12.5V4h8.5l8.5 8.5-8.5 8.5Z" />
    <circle cx="7.5" cy="8" r="1.3" fill="currentColor" />
  </Svg>
);

export const Sliders = (p) => (
  <Svg {...p}>
    <line x1="4" y1="7" x2="20" y2="7" /><circle cx="10" cy="7" r="2.4" />
    <line x1="4" y1="17" x2="20" y2="17" /><circle cx="16" cy="17" r="2.4" />
  </Svg>
);
export const X = (p) => (
  <Svg {...p}><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></Svg>
);

export const CATEGORY_ICONS = { ac: Snowflake, plumbing: Droplet, bolt: Bolt, more: Grid };
