import { useState } from 'react';
import { Shell, HeroTitle } from '../components/Shell.jsx';
import {
  Card, Chip, SectionLabel, StatusPill, BottomSheet, Tag,
  EmptyState, ErrorState, SkeletonList, useAsync, Button,
} from '../components/ui.jsx';
import {
  Search, Receipt, Droplet, Bolt, Snowflake, Calendar, Sliders, X,
} from '../components/Icons.jsx';
import { api } from '../mock/api.js';
import { useScenario } from '../mock/scenario.jsx';
import { serviceFilters, timeFilters } from '../mock/data.js';

const peso = (n) => `₱${n.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`;

/* One tile per service, so a list of jobs is scannable by shape and colour
   before a single word is read. Production styled every card identically. */
const SERVICE_TILE = {
  Plumbing:   { Icon: Droplet,   tone: '' },
  Electrical: { Icon: Bolt,      tone: '' },
  Appliances: { Icon: Snowflake, tone: ' row__icon--accent' },
};

function BookingCard({ b }) {
  const tile = SERVICE_TILE[b.category] ?? SERVICE_TILE.Plumbing;
  return (
    <Card>
      <div className="row-start">
        <span className={`row__icon${tile.tone}`}><tile.Icon size={20} /></span>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="row-between">
            {/* Title is the only t-title-lg in the card, so it wins outright.
                Production styled title, category and technician alike. */}
            <h3 className="t-title-lg" style={{ minWidth: 0 }}>{b.title}</h3>
            <StatusPill status={b.status} />
          </div>

          {/* Category and technician were two stacked identical lines in
              production and read as one blob. One metadata line, one style. */}
          <p className="t-body-md c-on-surface-variant" style={{ marginTop: 2 }}>
            {b.category} · {b.technician}
          </p>
        </div>
      </div>

      <div
        className="row-between"
        style={{
          marginTop: 'var(--space-lg)',
          paddingTop: 'var(--space-md)',
          borderTop: '1px solid var(--outline-variant)',
        }}
      >
        <span className="t-body-md c-on-surface-variant">
          <Calendar size={16} style={{ verticalAlign: '-3px', marginRight: 6 }} />
          {b.date}
        </span>
        <span className="t-title-lg c-primary">{peso(b.amount)}</span>
      </div>
    </Card>
  );
}

export default function Bookings() {
  const { scenario, setScenario } = useScenario();
  const [service, setService] = useState(serviceFilters[0]);
  const [time, setTime] = useState(timeFilters[0]);
  const [query, setQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { status, data, error } = useAsync(() => api.getBookings(scenario), [scenario]);

  const all = data ?? [];
  const filtered = all.filter((b) => {
    const matchesService = service === 'All services' || b.category === service;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      b.title.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      b.technician.toLowerCase().includes(q);
    return matchesService && matchesQuery;
  });

  const upcoming = filtered.filter((b) => b.group === 'upcoming');
  const past = filtered.filter((b) => b.group === 'past');

  /* Eight filter pills sat permanently above the list, taking two rows and
     roughly a fifth of the screen to say "All services, any time" — which is
     the default, i.e. nothing. They collapse into one button now, and only
     the filters you actually applied come back as removable tags. The
     defaults stay silent.

     Flutter: an IconButton opening showModalBottomSheet. */
  const activeFilters = [
    service !== serviceFilters[0] && { label: service, clear: () => setService(serviceFilters[0]) },
    time !== timeFilters[0] && { label: time, clear: () => setTime(timeFilters[0]) },
  ].filter(Boolean);

  const hero = (
    <>
      <HeroTitle title="My Bookings" />
      <div className="row-start mt-lg" style={{ alignItems: 'center', gap: 'var(--space-md)' }}>
        <div className="search" style={{ flex: 1, minWidth: 0 }}>
          <span className="search__icon"><Search size={20} /></span>
          <input
            className="field__input t-body-lg"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search bookings"
            aria-label="Search issue, service, or technician"
          />
        </div>

        <span className="filter-btn">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFiltersOpen(true)}
            aria-label="Filters"
            style={{ width: 52, padding: 0 }}
          >
            <Sliders size={20} />
          </Button>
          {activeFilters.length > 0 && (
            <span className="filter-btn__count">{activeFilters.length}</span>
          )}
        </span>
      </div>
    </>
  );

  return (
    <Shell hero={hero} nav>
      {activeFilters.length > 0 && (
        <div className="page mb-lg">
          <div className="tag-row">
            {activeFilters.map((f) => (
              <button key={f.label} type="button" className="tag" onClick={f.clear}>
                <span className="t-label-sm">{f.label}</span>
                <X size={14} />
              </button>
            ))}
            <button
              type="button"
              className="t-label-lg c-primary"
              onClick={() => { setService(serviceFilters[0]); setTime(timeFilters[0]); }}
            >
              Clear all
            </button>
          </div>
        </div>
      )}

      <div className="page">
        {status === 'loading' && <SkeletonList count={3} lines={2} />}

        {status === 'error' && (
          <ErrorState body={error.message} onRetry={() => setScenario('loaded')} />
        )}

        {status === 'done' && filtered.length === 0 && (
          <EmptyState
            icon={Receipt}
            title={all.length === 0 ? 'No bookings yet' : 'No matches'}
            body={
              all.length === 0
                ? 'When you book a technician, the job will show up here.'
                : 'Try a different search or filter.'
            }
            action={
              all.length > 0 ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { setQuery(''); setService(serviceFilters[0]); }}
                >
                  Clear filters
                </Button>
              ) : null
            }
          />
        )}

        {status === 'done' && filtered.length > 0 && (
          <>
            {upcoming.length > 0 && (
              <section className="section" style={{ marginTop: 0 }}>
                <SectionLabel>Upcoming</SectionLabel>
                <div className="card-stack">
                  {upcoming.map((b) => <BookingCard key={b.id} b={b} />)}
                </div>
              </section>
            )}
            {past.length > 0 && (
              <section className="section" style={upcoming.length === 0 ? { marginTop: 0 } : undefined}>
                <SectionLabel>Past</SectionLabel>
                <div className="card-stack">
                  {past.map((b) => <BookingCard key={b.id} b={b} />)}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      <BottomSheet
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Filter bookings"
        footer={
          <Button className="mt-xl" onClick={() => setFiltersOpen(false)}>
            Show {filtered.length} {filtered.length === 1 ? 'booking' : 'bookings'}
          </Button>
        }
      >
        <SectionLabel>Service</SectionLabel>
        <div className="chip-wrap">
          {serviceFilters.map((f) => (
            <Chip key={f} selected={service === f} onClick={() => setService(f)}>{f}</Chip>
          ))}
        </div>

        <div className="section">
          <SectionLabel>When</SectionLabel>
          <div className="chip-wrap">
            {timeFilters.map((f) => (
              <Chip key={f} selected={time === f} onClick={() => setTime(f)}>{f}</Chip>
            ))}
          </div>
        </div>
      </BottomSheet>
    </Shell>
  );
}
