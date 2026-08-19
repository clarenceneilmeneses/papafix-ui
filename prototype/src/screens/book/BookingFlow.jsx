import { createContext, useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';

/* The draft booking, shared by the four steps.
 *
 * Flutter equivalent: a single ChangeNotifier provided at the root of the
 * flow's Navigator, so it is disposed when the flow is popped rather than
 * living for the lifetime of the app.
 *
 * Every field is nullable and every screen renders without it, because the
 * prototype rail deep-links into step 2, 3 and 4 directly. */
const BookingContext = createContext(null);

const EMPTY = {
  categoryLabel: null,  // 'Plumbing' — the breadcrumb on step 3
  itemLabel: null,      // 'Leaking Pipe' / 'Air Conditioner'
  unitId: null,
  serviceId: null,
  horsepower: null,
  notes: '',
  addressId: 'addr-1',
};

export function useBooking() {
  const ctx = useContext(BookingContext);
  // Deep-linked screens render outside a provider in no case today, but the
  // fallback keeps a screen from crashing if one is ever mounted standalone.
  return ctx ?? { draft: EMPTY, update: () => {} };
}

export default function BookingFlow() {
  const [draft, setDraft] = useState(EMPTY);
  const update = (patch) => setDraft((d) => ({ ...d, ...patch }));

  return (
    <BookingContext.Provider value={{ draft, update }}>
      <Outlet />
    </BookingContext.Provider>
  );
}
