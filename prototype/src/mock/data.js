/* Mock data. Values are lifted from the production screenshots wherever they
   were legible, so the mobile dev is comparing like for like. Anything I had
   to invent is marked INVENTED. */

export const user = {
  name: 'TestQA',
  email: 'itsmewarr31@gmail.com',
  avatarUrl: null, // production showed a user-uploaded photo; initials fallback here
};

export const addresses = [
  {
    id: 'addr-1',
    label: 'Home',
    line: '1 President Jose P. Laurel Hwy, Barangay III, Tanauan City, Batangas, Philippines',
    isDefault: true,
  },
  // INVENTED — a second address, so the "Set default" affordance has a job to do
  // and the radio group on Step 3 has more than one option.
  {
    id: 'addr-2',
    label: 'Office',
    line: '88 Gen. Trias Ave, Poblacion, Tanauan City, Batangas, Philippines',
    isDefault: false,
  },
];

export const bookings = [
  { id: 'bk-1', title: 'Leaking Pipe',     category: 'Plumbing',   technician: 'qaqaqa', date: '12 Aug 2026', amount: 600, status: 'paid',      group: 'past' },
  { id: 'bk-2', title: 'Sink Installation', category: 'Plumbing',   technician: 'qaqaqa', date: '8 Aug 2026',  amount: 600, status: 'paid',      group: 'past' },
  { id: 'bk-3', title: 'Circuit Breaker',   category: 'Electrical', technician: 'qaqaqa', date: '8 Aug 2026',  amount: 600, status: 'paid',      group: 'past' },
  { id: 'bk-4', title: 'Air Conditioner',   category: 'Appliances', technician: 'qaqaqa', date: '5 Aug 2026',  amount: 600, status: 'paid',      group: 'past' },
  // INVENTED — production showed only a "PAST" section. An upcoming job is
  // included so the section header has a sibling and the pill has a 2nd role.
  { id: 'bk-5', title: 'Aircon Cleaning',   category: 'Appliances', technician: 'Mercy Valencia', date: '22 Aug 2026', amount: 900, status: 'scheduled', group: 'upcoming' },
];

export const serviceFilters = ['All services', 'Plumbing', 'Electrical', 'Appliances'];
// The 4th time filter was clipped off-screen in the source screenshot. GUESSED.
export const timeFilters = ['Any time', 'Last 30 days', 'Last 3 months', 'Last year'];

export const categories = [
  { id: 'appliances', title: 'Aircon Cleaning and Repair', subtitle: 'Window & split AC cleaning and repair', icon: 'ac',       flow: 'aircon' },
  { id: 'plumbing',   title: 'Plumbing',                    subtitle: 'Leaks, drains, fixtures',              icon: 'plumbing', flow: 'issues' },
  { id: 'electrical', title: 'Electrical',                  subtitle: 'Wiring, outlets, breakers',            icon: 'bolt',     flow: 'issues' },
  { id: 'others',     title: 'Others',                      subtitle: 'More services coming soon',            icon: 'more',     flow: null, disabled: true },
];

export const issuesByCategory = {
  plumbing: {
    label: 'Plumbing',
    prompt: 'What plumbing problem needs fixing?',
    startsAt: 600,
    placeholder: 'Pipe under the kitchen sink drips overnight…',
    issues: ['Leaking Pipe', 'Clogged Drain', 'Toilet Repair', 'Faucet / Fixture', 'Water Pump', 'Sink Installation'],
  },
  electrical: {
    label: 'Electrical',
    prompt: 'What electrical issue do you have?',
    startsAt: 600,
    placeholder: 'Breaker trips whenever the aircon starts…',
    issues: ['Wiring / Outlets', 'Circuit Breaker', 'Lighting Installation', 'Switch / Socket', 'Generator', 'Exhaust Fan'],
  },
};

export const airconTypes = [
  { id: 'window-non', name: 'Window', variant: 'Non-inverter' },
  { id: 'window-inv', name: 'Window', variant: 'Inverter' },
  { id: 'split-inv',  name: 'Split',  variant: 'Inverter' },
];

export const airconServices = [
  { id: 'cleaning', title: 'Cleaning', note: 'Fixed price', priceLabel: '₱1,200', price: 1200, final: true },
  { id: 'repair',   title: 'Repair',   note: 'Starting price', priceLabel: '₱1,800', price: 1800, final: false },
];

export const horsepowerOptions = ['0.75 hp', '1.0 hp', '1.5 hp', '2.0 hp', '2.5 hp'];

export const airconPlaceholder = 'AC not cooling, makes loud noise…';

export const technicians = [
  { id: 't-1', name: null,             rating: 5.0, reviews: 1,  jobs: 3,  km: 1.3, eta: 5, travelFee: 0 },
  { id: 't-2', name: 'albert',         rating: 5.0, reviews: 2,  jobs: 2,  km: 1.3, eta: 5, travelFee: 0 },
  { id: 't-3', name: 'Mercy Valencia', rating: 5.0, reviews: 4,  jobs: 6,  km: 1.3, eta: 5, travelFee: 0 },
  { id: 't-4', name: null,             rating: 4.6, reviews: 13, jobs: 18, km: 1.3, eta: 5, travelFee: 0 },
];

export const tickets = [
  {
    id: 'tk-1', subject: 'Testing QA', topic: 'Account', date: '8 Aug 2026',
    status: 'open', body: '❤️😄😄😄😄😄😄😄😄', reply: null,
  },
  {
    id: 'tk-2', subject: 'QA TEST', topic: 'Other', date: '5 Aug 2026',
    status: 'resolved', body: 'QA TEST QA TEST QA TEST',
    reply: { from: 'PapaFix Support', body: 'TESTING QA', date: '6 Aug 2026' },
  },
];

export const supportTopics = ['Booking', 'Payment', 'Account', 'App problem', 'Other'];

/* =========================================================================
   TECHNICIAN APP
   -------------------------------------------------------------------------
   Values lifted from the screenshots in `mobile tech/`. Two changes from
   what production showed, both deliberate:

   1. THE MONEY IS SPLIT INTO TWO NAMED FIELDS. Production showed ₱600 on a
      job card and ₱500 for the same job under Earnings, both as a bare peso
      amount with no qualifier. Every Jobs figure was exactly 1.2x its
      Earnings figure, so one screen was the customer price and the other was
      the technician's take — and nothing on either screen said so. Here it
      is `customerPays` and `techEarns`, and the UI always labels which is
      which. See TECH-APP-REVIEW.md §1.

   2. THE TECHNICIAN HAS A REAL NAME. Production's QA account was `qaqaqa`,
      which is too short to test anything — it never shows what a real name
      does to the greeting, the profile title or the avatar fallback.
   ========================================================================= */

export const COMMISSION_RATE = 0.1667;   // customerPays x (1 - rate) = techEarns

export const techUser = {
  name: 'Juan Miguel Dela Cruz',
  email: 'jm.delacruz@papafix.ph',
  phone: '+63 917 555 0142',
  phoneVerified: true,
  avatarUrl: null,
  rating: 5.0,
  reviewCount: 3,
  categories: ['Appliances', 'Electrical', 'Plumbing'],
};

/* status: incoming | active | completed | cancelled
   stage (active only): accepted | travelling | arrived | working */
export const techJobs = [
  // INVENTED — production had zero incoming and zero active jobs, so the two
  // filters that matter most to a working technician were never shown.
  {
    id: 'tj-1', status: 'incoming', category: 'Appliances', issue: 'Air Conditioner',
    detail: 'Repair · 2.5 hp', customer: 'Marites Bautista',
    address: '12 Mabini St, Poblacion, Tanauan City',
    when: 'Today, 2:00 PM', requestedAgo: '4m ago',
    customerPays: 7260, techEarns: 6050, expiresInSec: 540,
  },
  {
    id: 'tj-2', status: 'incoming', category: 'Plumbing', issue: 'Clogged Drain',
    detail: 'Kitchen sink', customer: 'Rolando Uy',
    address: '5 Rizal Ave, Barangay III, Tanauan City',
    when: 'Tomorrow, 9:00 AM', requestedAgo: '22m ago',
    customerPays: 600, techEarns: 500, expiresInSec: 1980,
  },
  {
    id: 'tj-3', status: 'active', stage: 'travelling', category: 'Appliances',
    issue: 'Air Conditioner', detail: 'Cleaning · 1.5 hp', customer: 'Grace Lim',
    address: '88 Gen. Trias Ave, Poblacion, Tanauan City',
    when: 'Today, 11:00 AM', customerPays: 2160, techEarns: 1800,
  },
  // From the screenshots — the six completed jobs and the one cancelled.
  { id: 'tj-4', status: 'completed', category: 'Plumbing',   issue: 'Leaking Pipe',      detail: null,                customer: 'TestQA', address: '1 P. Laurel Hwy, Tanauan City', when: '12 Aug 2026', customerPays: 600,  techEarns: 500,  paid: true },
  { id: 'tj-5', status: 'completed', category: 'Plumbing',   issue: 'Sink Installation', detail: null,                customer: 'TestQA', address: '1 P. Laurel Hwy, Tanauan City', when: '8 Aug 2026',  customerPays: 600,  techEarns: 500,  paid: true },
  { id: 'tj-6', status: 'completed', category: 'Electrical', issue: 'Circuit Breaker',   detail: null,                customer: 'TestQA', address: '1 P. Laurel Hwy, Tanauan City', when: '8 Aug 2026',  customerPays: 600,  techEarns: 500,  paid: true },
  { id: 'tj-7', status: 'completed', category: 'Appliances', issue: 'Air Conditioner',   detail: 'Cleaning · 2.5 hp', customer: 'TestQA', address: '1 P. Laurel Hwy, Tanauan City', when: '8 Aug 2026',  customerPays: 2160, techEarns: 1800, paid: true },
  { id: 'tj-8', status: 'completed', category: 'Appliances', issue: 'Air Conditioner',   detail: 'Repair · 2.5 hp',   customer: 'TestQA', address: '1 P. Laurel Hwy, Tanauan City', when: '8 Aug 2026',  customerPays: 7260, techEarns: 6050, paid: true },
  { id: 'tj-9', status: 'completed', category: 'Appliances', issue: 'Air Conditioner',   detail: 'Repair · 2.5 hp',   customer: 'TestQA', address: '1 P. Laurel Hwy, Tanauan City', when: '7 Aug 2026',  customerPays: 7260, techEarns: 6050, paid: true },
  { id: 'tj-10', status: 'cancelled', category: 'Appliances', issue: 'Air Conditioner',  detail: 'Cleaning · 2.5 hp', customer: 'TestQA', address: '1 P. Laurel Hwy, Tanauan City', when: '8 Aug 2026',  customerPays: 2160, techEarns: 1800, cancelledBy: 'customer' },
];

export const techJobFilters = ['All', 'Incoming', 'Active', 'Completed', 'Missed'];

export const techReviews = [
  { id: 'tr-1', customer: 'TestQA', issue: 'Leaking Pipe',      category: 'Plumbing',   stars: 5, note: 'teset',   date: '12 Aug 2026' },
  { id: 'tr-2', customer: 'TestQA', issue: 'Sink Installation', category: 'Plumbing',   stars: 5, note: null,      date: '8 Aug 2026' },
  { id: 'tr-3', customer: 'TestQA', issue: 'Circuit Breaker',   category: 'Electrical', stars: 5, note: null,      date: '8 Aug 2026' },
];

/* Availability for August 2026. `slots` empty + available:true is the state
   production let you SAVE — a day customers can book with no bookable hours.
   Kept in the data so the prototype can show the rule that now blocks it. */
export const techAvailability = {
  month: '2026-08',
  days: {
    5:  { available: true,  slots: [['08:00', '17:00']] },
    6:  { available: true,  slots: [['08:00', '17:00']] },
    8:  { available: true,  slots: [['08:00', '12:00']] },
    12: { available: true,  slots: [['08:00', '17:00']] },
    13: { available: true,  slots: [['08:00', '17:00']] },
    18: { available: true,  slots: [] },
    19: { available: false, slots: [] },
    20: { available: true,  slots: [['09:00', '18:00']] },
    21: { available: true,  slots: [['09:00', '18:00']] },
  },
};

export const techTickets = [];
