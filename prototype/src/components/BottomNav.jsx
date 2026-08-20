import { NavLink, useLocation } from 'react-router-dom';
import { Home, Receipt, User, Wrench, Calendar } from './Icons.jsx';

/* Same floating pill for both apps — only the destinations differ.
   The active tab also carries an indicator behind the icon; colour alone was
   the only active signal before, which is exactly the signal a colour-blind
   user does not get.

   Flutter: one NavigationBar widget, two destination lists chosen by flavour.
   Do not fork the widget. */
const CUSTOMER_TABS = [
  { to: '/home',     label: 'Home',     Icon: Home },
  { to: '/bookings', label: 'Bookings', Icon: Receipt },
  { to: '/profile',  label: 'Profile',  Icon: User },
];

/* Four tabs, matching production. Jobs is the working surface — it is second
   so it sits under the thumb rather than at the edge. */
const TECH_TABS = [
  { to: '/tech/home',     label: 'Home',     Icon: Home },
  { to: '/tech/jobs',     label: 'Jobs',     Icon: Wrench },
  { to: '/tech/schedule', label: 'Schedule', Icon: Calendar },
  { to: '/tech/profile',  label: 'Profile',  Icon: User },
];

export const BottomNav = () => {
  const { pathname } = useLocation();
  const tabs = pathname.startsWith('/tech') ? TECH_TABS : CUSTOMER_TABS;

  return (
    <nav className="bottom-nav" aria-label="Main">
      {tabs.map(({ to, label, Icon }) => (
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
};
