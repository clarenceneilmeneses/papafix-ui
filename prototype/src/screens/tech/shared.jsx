import { Star, Droplet, Bolt, Snowflake } from '../../components/Icons.jsx';
import { COMMISSION_RATE } from '../../mock/data.js';

/* Shared bits for the technician screens. Anything here that also exists in
   the customer app is imported from components/ui.jsx instead — this file is
   only for things the customer app has no equivalent of. */

export const peso = (n) => `₱${n.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`;

/* Same tiles as the customer app, so one job reads the same on both sides. */
export const SERVICE_TILE = {
  Plumbing:   { Icon: Droplet,   tone: '' },
  Electrical: { Icon: Bolt,      tone: '' },
  Appliances: { Icon: Snowflake, tone: ' row__icon--accent' },
};

export function ServiceIcon({ category, size = 20 }) {
  const tile = SERVICE_TILE[category] ?? SERVICE_TILE.Plumbing;
  return <span className={`row__icon${tile.tone}`}><tile.Icon size={size} /></span>;
}

/* THE MONEY COMPONENT.
 *
 * Production showed ₱600 on a job card and ₱500 for the same job under
 * Earnings, both as a bare peso amount in the same weight. A technician who
 * finished a ₱7,260 job and later saw ₱6,050 had no way to read that as
 * anything except being shortchanged.
 *
 * The payout is what this app is about, so it is the headline. The customer
 * price is kept as a labelled reference, never as a second bare number.
 * See TECH-APP-REVIEW.md §1.
 */
export function MoneyRow({ job, label = 'You earn' }) {
  return (
    <div className="money-row">
      <span className="t-body-md c-on-surface-variant">{label}</span>
      <span className="money-row__figures">
        <span className="t-title-lg money__net" style={{ display: 'block' }}>
          {peso(job.techEarns)}
        </span>
        <span className="t-body-md money__gross" style={{ display: 'block' }}>
          customer pays {peso(job.customerPays)}
        </span>
      </span>
    </div>
  );
}

/* One metadata line: fixed icon, truncating text. */
export function MetaRow({ icon: Icon, children }) {
  return (
    <span className="meta__row t-body-md">
      <Icon size={16} />
      <span className="meta__text">{children}</span>
    </span>
  );
}

/* The same split written out in full, for the one place that should show the
   arithmetic rather than assert it. */
export function FeeBreakdown({ job }) {
  const fee = job.customerPays - job.techEarns;
  return (
    <>
      <div className="fee-row">
        <span className="t-body-lg">Customer pays</span>
        <span className="t-body-lg">{peso(job.customerPays)}</span>
      </div>
      <div className="fee-row">
        <span className="t-body-lg c-on-surface-variant">
          Platform fee · {Math.round(COMMISSION_RATE * 100)}%
        </span>
        <span className="t-body-lg c-on-surface-variant">−{peso(fee)}</span>
      </div>
      <div className="fee-row fee-row--total">
        <span className="t-title-md">You earn</span>
        <span className="t-title-lg money__net">{peso(job.techEarns)}</span>
      </div>
    </>
  );
}

export function Stars({ n = 5, of = 5 }) {
  return (
    <span className="stars" aria-label={`${n} of ${of} stars`}>
      {Array.from({ length: of }, (_, i) => (
        <Star key={i} size={16} className={i < n ? undefined : 'stars--muted'} />
      ))}
    </span>
  );
}

/* Status → StatusPill role. `cancelled` has no customer-app equivalent. */
export const JOB_PILL = {
  incoming:  { status: 'open',      label: 'New request' },
  active:    { status: 'scheduled', label: 'In progress' },
  completed: { status: 'paid',      label: 'Paid' },
  cancelled: { status: 'soon',      label: 'Cancelled' },
};

export const STAGES = [
  { id: 'accepted',   label: 'Accepted' },
  { id: 'travelling', label: 'On the way' },
  { id: 'arrived',    label: 'Arrived' },
  { id: 'working',    label: 'Working' },
];
