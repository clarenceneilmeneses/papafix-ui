import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shell, HeroTitle } from '../../components/Shell.jsx';
import {
  Card, Chip, StatusPill, BottomSheet, SectionLabel,
  EmptyState, ErrorState, SkeletonList, useAsync, Button,
} from '../../components/ui.jsx';
import { Search, Wrench, Calendar, MapPin, Sliders, X } from '../../components/Icons.jsx';
import { api } from '../../mock/api.js';
import { useScenario } from '../../mock/scenario.jsx';
import { techJobFilters } from '../../mock/data.js';
import { ServiceIcon, MoneyRow, MetaRow, JOB_PILL } from './shared.jsx';

/* Filters live behind ONE button, in a sheet — the same pattern My Bookings
   uses in the customer app, and for the same reason: a permanent row of
   pills spends a fifth of the screen restating the default. Only the filters
   you actually applied come back, as removable tags. The defaults stay
   silent.
 *
 * This also retires production's scrolling chip row entirely, which is a
 * better answer to TECH-APP-REVIEW.md §4 than fading its edges was — a row
 * that does not exist cannot clip "Incoming" into "coming".
 *
 * Flutter: an IconButton opening showModalBottomSheet. */
const STATUS_MATCH = {
  All:       () => true,
  Incoming:  (j) => j.status === 'incoming',
  Active:    (j) => j.status === 'active',
  Completed: (j) => j.status === 'completed',
  Missed:    (j) => j.status === 'cancelled',
};

const CATEGORIES = ['All services', 'Appliances', 'Electrical', 'Plumbing'];

const EMPTY_COPY = {
  All:       ['No jobs yet', 'Accepted and completed jobs will show up here.'],
  Incoming:  ['No incoming jobs', 'New requests appear here. Make sure you are marked available in your schedule.'],
  Active:    ['No active jobs', 'A job you accept shows up here until you complete it.'],
  Completed: ['No completed jobs', 'Finished jobs and what you earned from them land here.'],
  Missed:    ['Nothing missed', 'Requests you declined or that the customer cancelled show up here.'],
};

function JobCard({ job, onOpen }) {
  const pill = JOB_PILL[job.status];
  return (
    <Card as="button" onClick={onOpen} style={{ textAlign: 'left', width: '100%' }}>
      <div className="row-start">
        <ServiceIcon category={job.category} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="row-between">
            {/* Job is the title, customer is the subtitle — the same
                hierarchy Reviews uses. See TECH-APP-REVIEW.md §3. */}
            <h3 className="t-title-lg truncate" style={{ minWidth: 0 }}>{job.issue}</h3>
            <StatusPill status={pill.status} label={pill.label} />
          </div>
          <p className="t-body-md c-on-surface-variant truncate" style={{ marginTop: 2 }}>
            {job.category}{job.detail ? ` · ${job.detail}` : ''} · {job.customer}
          </p>
        </div>
      </div>

      {/* Each metadata line owns a full row and truncates on its own. */}
      <div className="meta mt-lg">
        <MetaRow icon={Calendar}>{job.when}</MetaRow>
        <MetaRow icon={MapPin}>{job.address}</MetaRow>
      </div>

      <div
        style={{
          marginTop: 'var(--space-md)',
          paddingTop: 'var(--space-md)',
          borderTop: '1px solid var(--outline-variant)',
        }}
      >
        {job.status === 'cancelled' ? (
          <div className="row-between">
            <span className="t-body-md c-on-surface-variant">Cancelled by the {job.cancelledBy}</span>
            <span className="t-body-md c-on-surface-variant">No earnings</span>
          </div>
        ) : (
          <MoneyRow job={job} label={job.status === 'completed' ? 'You earned' : 'You earn'} />
        )}
      </div>
    </Card>
  );
}

export default function TechJobs() {
  const navigate = useNavigate();
  const { scenario, setScenario } = useScenario();

  const [status_, setStatus] = useState(techJobFilters[0]);   // 'All'
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [query, setQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { status, data, error } = useAsync(() => api.getTechJobs(scenario), [scenario]);
  const all = data ?? [];

  const q = query.trim().toLowerCase();
  const visible = all
    .filter(STATUS_MATCH[status_])
    .filter((j) => category === CATEGORIES[0] || j.category === category)
    .filter((j) =>
      !q ||
      j.issue.toLowerCase().includes(q) ||
      j.customer.toLowerCase().includes(q) ||
      j.address.toLowerCase().includes(q));

  const activeFilters = [
    status_ !== techJobFilters[0] && { label: status_, clear: () => setStatus(techJobFilters[0]) },
    category !== CATEGORIES[0] && { label: category, clear: () => setCategory(CATEGORIES[0]) },
  ].filter(Boolean);

  const [emptyTitle, emptyBody] = EMPTY_COPY[status_];

  const hero = (
    <>
      <HeroTitle title="Jobs" />
      <div className="row-start mt-lg" style={{ alignItems: 'center', gap: 'var(--space-md)' }}>
        <div className="search" style={{ flex: 1, minWidth: 0 }}>
          <span className="search__icon"><Search size={20} /></span>
          <input
            className="field__input t-body-lg"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search customer, issue, or address"
            aria-label="Search customer, issue, or address"
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
              onClick={() => { setStatus(techJobFilters[0]); setCategory(CATEGORIES[0]); }}
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

        {status === 'done' && visible.length === 0 && (
          <EmptyState
            icon={Wrench}
            title={q || activeFilters.length > 0 ? 'No matches' : emptyTitle}
            body={q || activeFilters.length > 0 ? 'Try a different search or filter.' : emptyBody}
            action={(q || activeFilters.length > 0) ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setQuery('');
                  setStatus(techJobFilters[0]);
                  setCategory(CATEGORIES[0]);
                }}
              >
                Clear filters
              </Button>
            ) : null}
          />
        )}

        {status === 'done' && visible.length > 0 && (
          <div className="card-stack">
            {visible.map((job) => (
              <JobCard key={job.id} job={job} onOpen={() => navigate(`/tech/jobs/${job.id}`)} />
            ))}
          </div>
        )}
      </div>

      <BottomSheet
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Filter jobs"
        footer={
          <Button className="mt-xl" onClick={() => setFiltersOpen(false)}>
            Show {visible.length} {visible.length === 1 ? 'job' : 'jobs'}
          </Button>
        }
      >
        <SectionLabel>Status</SectionLabel>
        <div className="chip-wrap">
          {techJobFilters.map((f) => (
            <Chip key={f} selected={status_ === f} onClick={() => setStatus(f)}>
              {f}
              {status === 'done' && f !== 'All' && (
                <span style={{ marginLeft: 6, opacity: 0.7 }}>
                  {all.filter(STATUS_MATCH[f]).length}
                </span>
              )}
            </Chip>
          ))}
        </div>

        <div className="section">
          <SectionLabel>Service</SectionLabel>
          <div className="chip-wrap">
            {CATEGORIES.map((c) => (
              <Chip key={c} selected={category === c} onClick={() => setCategory(c)}>{c}</Chip>
            ))}
          </div>
        </div>
      </BottomSheet>
    </Shell>
  );
}
