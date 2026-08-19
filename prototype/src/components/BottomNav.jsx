import { NavLink } from 'react-router-dom';
import { Home, Receipt, User } from './Icons.jsx';

/* Same three destinations, same order, same floating pill.
   The active tab now also carries an indicator behind the icon — Flutter's
   NavigationBar draws this for free. Colour alone was the only active signal
   before, which is exactly the signal a colour-blind user does not get. */
const TABS = [
  { to: '/home',     label: 'Home',     Icon: Home },
  { to: '/bookings', label: 'Bookings', Icon: Receipt },
  { to: '/profile',  label: 'Profile',  Icon: User },
];

export const BottomNav = () => (
  <nav className="bottom-nav" aria-label="Main">
    {TABS.map(({ to, label, Icon }) => (
      <NavLink
        key={to}
        to={to}
        className={({ isActive }) => `bottom-nav__item${isActive ? ' is-active' : ''}`}
      >
        <span className="bottom-nav__pill"><Icon size={22} /></span>
        <span className="t-label-sm" style={{ textTransform: 'none', letterSpacing: 0 }}>{label}</span>
      </NavLink>
    ))}
  </nav>
);
