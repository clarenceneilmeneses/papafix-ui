import { useNavigate } from 'react-router-dom';
import { Shell } from '../../components/Shell.jsx';
import {
  Card, SectionLabel, StatusPill, Button, EmptyState, ErrorState,
  SkeletonList, useAsync,
} from '../../components/ui.jsx';
import { Wrench, Calendar, MapPin, ArrowRight } from '../../components/Icons.jsx';
import { api } from '../../mock/api.js';
import { useScenario } from '../../mock/scenario.jsx';
import { techUser } from '../../mock/data.js';
import { ServiceIcon, MoneyRow, MetaRow, peso, JOB_PILL } from './shared.jsx';

/* Home = "what am I doing right now, and what is coming".
 *
 * Production said "No active jobs right now." under the greeting AND "No
 * active jobs" as a card title, twice in one viewport, and put the empty
 * state in a bordered card while every Jobs empty state was bare centred
 * text. One treatment now — the shared EmptyState — and the subtitle says
 * something the card does not. See TECH-APP-REVIEW.md §5.
 */
function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

/* Only the first name. "Good afternoon, Juan Miguel Dela Cruz" wraps to two
   lines on a 390px screen and pushes the whole hero down. */
const firstName = (full) => (full || '').trim().split(/\s+/)[0] || 'there';

export default function TechHome() {
  const navigate = useNavigate();
  const { scenario, setScenario } = useScenario();
  const { status, data, error } = useAsync(() => api.getTechJobs(scenario), [scenario]);

  const all = data ?? [];
  const active = all.filter((j) => j.status === 'active');
  const incoming = all.filter((j) => j.status === 'incoming');
  const paidThisMonth = all.filter((j) => j.paid);
  const monthTotal = paidThisMonth.reduce((sum, j) => sum + j.techEarns, 0);

  const hero = (
    <div className="hero-title">
      <div style={{ flex: 1, minWidth: 0 }}>
        <h1 className="t-headline-lg">
          {greeting()}, {firstName(techUser.name)}
        </h1>
        <p className="hero-title__sub t-body-lg">
          {status !== 'done'
            ? ' '
            : active.length > 0
              ? `${active.length} job in progress · ${incoming.length} waiting on you`
              : incoming.length > 0
                ? `${incoming.length} new ${incoming.length === 1 ? 'request' : 'requests'} waiting on you`
                : 'Nothing on right now.'}
        </p>
      </div>
    </div>
  );

  return (
    <Shell hero={hero} nav>
      <div className="page">
        {status === 'loading' && <SkeletonList count={2} lines={2} />}

        {status === 'error' && (
          <ErrorState body={error.message} onRetry={() => setScenario('loaded')} />
        )}

        {status === 'done' && (
          <>
            {/* Earnings summary first: it is the reason the app is open. */}
            <Card as="button" onClick={() => navigate('/tech/earnings')} style={{ width: '100%', textAlign: 'left' }}>
              <div className="row-between">
                <div>
                  <span className="t-label-sm c-on-surface-variant" style={{ display: 'block' }}>
                    YOU EARNED THIS MONTH
                  </span>
                  <span className="t-headline-sm money__net" style={{ display: 'block', marginTop: 2 }}>
                    {peso(monthTotal)}
                  </span>
                  <span className="t-body-md c-on-surface-variant">
                    {paidThisMonth.length} {paidThisMonth.length === 1 ? 'job' : 'jobs'} paid out
                  </span>
                </div>
                <ArrowRight size={20} className="c-on-surface-variant" />
              </div>
            </Card>

            {active.length > 0 && (
              <section className="section">
                <SectionLabel>In progress</SectionLabel>
                <div className="card-stack">
                  {active.map((job) => (
                    <Card
                      key={job.id}
                      as="button"
                      onClick={() => navigate(`/tech/jobs/${job.id}`)}
                      style={{ width: '100%', textAlign: 'left' }}
                    >
                      <div className="row-start">
                        <ServiceIcon category={job.category} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="row-between">
                            <h3 className="t-title-lg truncate" style={{ minWidth: 0 }}>{job.issue}</h3>
                            <StatusPill {...JOB_PILL[job.status]} />
                          </div>
                          <p className="t-body-md c-on-surface-variant" style={{ marginTop: 2 }}>
                            {job.customer} · {job.when}
                          </p>
                        </div>
                      </div>
                      <div className="meta mt-md">
                        <MetaRow icon={MapPin}>{job.address}</MetaRow>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {incoming.length > 0 && (
              <section className="section">
                <SectionLabel>Waiting on you</SectionLabel>
                <div className="card-stack">
                  {incoming.map((job) => (
                    <Card
                      key={job.id}
                      as="button"
                      onClick={() => navigate(`/tech/jobs/${job.id}`)}
                      style={{ width: '100%', textAlign: 'left' }}
                    >
                      <h3 className="t-title-lg truncate">{job.issue}</h3>
                      <p className="t-body-md c-on-surface-variant truncate" style={{ marginTop: 2 }}>
                        {job.customer} · {job.when}
                      </p>
                      <div
                        style={{
                          marginTop: 'var(--space-md)',
                          paddingTop: 'var(--space-md)',
                          borderTop: '1px solid var(--outline-variant)',
                        }}
                      >
                        <MoneyRow job={job} />
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {active.length === 0 && incoming.length === 0 && (
              <div className="section">
                <EmptyState
                  icon={Wrench}
                  title="Nothing on right now"
                  body="New requests arrive here and in your Jobs tab. You only get them on days you are marked available."
                  action={
                    <Button variant="outline" size="sm" onClick={() => navigate('/tech/schedule')}>
                      Check my availability
                    </Button>
                  }
                />
              </div>
            )}
          </>
        )}
      </div>
    </Shell>
  );
}
