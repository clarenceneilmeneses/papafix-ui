import { useNavigate } from 'react-router-dom';
import { Shell } from '../components/Shell.jsx';
import { Card, Avatar, SectionLabel, StatusPill, Button } from '../components/ui.jsx';
import { ChevronRight, Wrench, Receipt, MapPin, Calendar, ArrowRight } from '../components/Icons.jsx';
import { user, bookings } from '../mock/data.js';

/* Home.
 *
 * The primary action lives in the hero as a white button. On a brand-coloured
 * header a blue card would vanish, so the action inverts: white fill, blue
 * label. It is still unmistakably the one thing to press.
 *
 * THE EMPTY SPACE. Production left roughly 65% of this screen blank. This
 * shows the next scheduled job, read from the same bookings list My Bookings
 * renders, and tapping it opens that existing screen.
 *
 * It is a new SURFACE, not a new feature — no data, endpoint or user action
 * exists here that did not already exist. If you would rather ship without
 * it, delete the <NextJob> block and nothing else changes.
 */
function NextJob({ booking, onOpen }) {
  return (
    <section className="section" style={{ marginTop: 0 }}>
      <SectionLabel>Next appointment</SectionLabel>
      <Card as="button" onClick={onOpen}>
        <div className="row-start" style={{ alignItems: 'center' }}>
          <span className="row__icon row__icon--accent row__icon--lg">
            <Calendar size={22} />
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* The pill sits on the metadata line, not beside the title: at
                390px a two-word job title and a pill fight for the same row
                and the title loses. */}
            <h3 className="t-title-lg">{booking.title}</h3>
            <span
              style={{
                display: 'flex', alignItems: 'center', gap: 'var(--space-sm)',
                marginTop: 'var(--space-xs)', flexWrap: 'wrap',
              }}
            >
              <StatusPill status={booking.status} />
              <span className="t-body-md c-on-surface-variant">
                {booking.date} · {booking.technician}
              </span>
            </span>
          </div>
          <span className="row__chev"><ChevronRight size={20} /></span>
        </div>
      </Card>
    </section>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const next = bookings.find((b) => b.group === 'upcoming');

  const hero = (
    <>
      <div className="row-between">
        <div style={{ minWidth: 0 }}>
          {/* The name was link-blue in production but is not tappable.
              Weight carries the emphasis instead. */}
          <h1 className="t-headline-lg">{greeting},</h1>
          <h1 className="t-headline-lg">{user.name}</h1>
        </div>
        {/* Same destination as the Profile tab — a shortcut, not a new
            route. It also gives the greeting block a right-hand anchor. */}
        <button
          type="button"
          onClick={() => navigate('/profile')}
          aria-label="Open your profile"
          style={{ flex: '0 0 auto' }}
        >
          <Avatar name={user.name} src={user.avatarUrl} />
        </button>
      </div>

      <p className="t-body-lg" style={{ marginTop: 'var(--space-xs)', color: 'rgba(255,255,255,0.86)' }}>
        How can we help you today?
      </p>

      <Button
        variant="onhero"
        className="mt-xl"
        onClick={() => navigate('/book')}
      >
        <Wrench size={20} /> Book a Technician <ArrowRight size={20} />
      </Button>

      <p
        className="text-center t-body-md"
        style={{ marginTop: 'var(--space-md)', color: 'rgba(255,255,255,0.80)' }}
      >
        Appliances · Electrical · Plumbing
      </p>
    </>
  );

  return (
    <Shell hero={hero} nav>
      <div className="page">
        {next && <NextJob booking={next} onOpen={() => navigate('/bookings')} />}

        {/* Secondary actions. Production rendered these as bare text with no
            icons while the hero card had one — no shared language. */}
        <div className="grid-2 mt-lg">
          <Card as="button" onClick={() => navigate('/bookings')} style={{ padding: 'var(--space-lg)' }}>
            <span className="row__icon row__icon--lg"><Receipt size={22} /></span>
            <span className="t-title-md" style={{ display: 'block', marginTop: 'var(--space-lg)' }}>
              My Bookings
            </span>
            <span className="t-body-md c-on-surface-variant" style={{ display: 'block', marginTop: 2 }}>
              Past and upcoming jobs
            </span>
          </Card>
          <Card as="button" onClick={() => navigate('/addresses')} style={{ padding: 'var(--space-lg)' }}>
            <span className="row__icon row__icon--lg"><MapPin size={22} /></span>
            <span className="t-title-md" style={{ display: 'block', marginTop: 'var(--space-lg)' }}>
              My Addresses
            </span>
            <span className="t-body-md c-on-surface-variant" style={{ display: 'block', marginTop: 2 }}>
              Where we come to you
            </span>
          </Card>
        </div>
      </div>
    </Shell>
  );
}
