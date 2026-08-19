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
