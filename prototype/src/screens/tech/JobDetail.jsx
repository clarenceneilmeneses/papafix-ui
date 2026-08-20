import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Shell } from '../../components/Shell.jsx';
import { AppHeader } from '../../components/AppHeader.jsx';
import {
  Card, SectionLabel, StatusPill, Button, LinkButton, StickyBar,
  BottomSheet, EmptyState,
} from '../../components/ui.jsx';
import { Check, MapPin, Calendar, User, Wrench } from '../../components/Icons.jsx';
import { techJobs } from '../../mock/data.js';
import { ServiceIcon, FeeBreakdown, JOB_PILL, STAGES, peso } from './shared.jsx';

/* Job detail — THE SCREEN PRODUCTION DID NOT HAVE.
 *
 * Nothing in the 16 screenshots showed a single job, which means the whole
 * working life of a job — accept it, travel to it, arrive, finish it, get
 * paid — was unproven. A technician app whose job list cannot be opened is a
 * list of receipts.
 *
 * The three states below are the three things a technician actually does:
 *   incoming  → decide (accept / decline), on a countdown
 *   active    → advance the stage, one action at a time
 *   completed → read what happened and what it paid
 */

function StageTracker({ current }) {
  const idx = STAGES.findIndex((s) => s.id === current);
  return (
    <div className="stages">
      {STAGES.map((s, i) => (
        <div
          key={s.id}
          className={`stages__step${i < idx ? ' is-done' : ''}${i === idx ? ' is-current' : ''}`}
        >
          <span className="stages__dot">
            {i < idx ? <Check size={14} /> : <span className="t-label-sm">{i + 1}</span>}
          </span>
          <span className="stages__label t-label-sm" style={{ textTransform: 'none', letterSpacing: 0 }}>
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function Facts({ job }) {
  return (
    <Card>
      <div className="row-start">
        <ServiceIcon category={job.category} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 className="t-title-lg">{job.issue}</h2>
          <p className="t-body-md c-on-surface-variant" style={{ marginTop: 2 }}>
            {job.category}{job.detail ? ` · ${job.detail}` : ''}
          </p>
        </div>
      </div>

      <div style={{ marginTop: 'var(--space-lg)', display: 'grid', gap: 'var(--space-md)' }}>
        <span className="row-start" style={{ gap: 'var(--space-md)' }}>
          <User size={18} className="c-on-surface-variant" />
          <span className="t-body-lg">{job.customer}</span>
        </span>
        <span className="row-start" style={{ gap: 'var(--space-md)' }}>
          <Calendar size={18} className="c-on-surface-variant" />
          <span className="t-body-lg">{job.when}</span>
        </span>
        <span className="row-start" style={{ gap: 'var(--space-md)', alignItems: 'flex-start' }}>
          <MapPin size={18} className="c-on-surface-variant" style={{ marginTop: 3 }} />
          <span className="t-body-lg" style={{ flex: 1 }}>{job.address}</span>
        </span>
      </div>
    </Card>
  );
}

export default function TechJobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = techJobs.find((j) => j.id === id);

  const [stage, setStage] = useState(job?.stage ?? 'accepted');
  const [declineOpen, setDeclineOpen] = useState(false);
  const [decided, setDecided] = useState(null);   // 'accepted' | 'declined'

  if (!job) {
    return (
      <Shell hero={<AppHeader back title="Job" />}>
        <div className="page">
          <EmptyState icon={Wrench} title="Job not found" body="This job is no longer available." />
        </div>
      </Shell>
    );
  }

  const pill = JOB_PILL[job.status];
  const stageIdx = STAGES.findIndex((s) => s.id === stage);
  const nextStage = STAGES[stageIdx + 1];

  /* ---- incoming: decide ---- */
  if (job.status === 'incoming' && !decided) {
    const mins = Math.floor(job.expiresInSec / 60);
    return (
      <Shell
        hero={<AppHeader back title={job.issue} subtitle={`Requested ${job.requestedAgo}`} />}
        sticky={
          <StickyBar hint={`Expires in about ${mins} minutes if you do not respond.`}>
            <div className="row-start" style={{ gap: 'var(--space-md)' }}>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setDeclineOpen(true)}
              >
                Decline
              </Button>
              <Button className="flex-1" onClick={() => setDecided('accepted')}>
                Accept job
              </Button>
            </div>
          </StickyBar>
        }
      >
        <div className="page pad-for-bar">
          <Facts job={job} />

          <section className="section">
            <SectionLabel>What you get paid</SectionLabel>
            <Card>
              <FeeBreakdown job={job} />
            </Card>
          </section>
        </div>

        <BottomSheet
          open={declineOpen}
          onClose={() => setDeclineOpen(false)}
          title="Decline this job?"
          footer={
            <div className="row-start mt-xl" style={{ gap: 'var(--space-md)' }}>
              <Button variant="outline" className="flex-1" onClick={() => setDeclineOpen(false)}>
                Keep it
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => { setDeclineOpen(false); setDecided('declined'); }}
              >
                Decline
              </Button>
            </div>
          }
        >
          <p className="t-body-lg">
            It goes back to the pool for another technician. Declining often
            lowers how many requests you are sent.
          </p>
        </BottomSheet>
      </Shell>
    );
  }

  /* ---- just decided ---- */
  if (decided) {
    return (
      <Shell hero={<AppHeader back title={job.issue} />}>
        <div className="page">
          <EmptyState
            icon={decided === 'accepted' ? Check : Wrench}
            title={decided === 'accepted' ? 'Job accepted' : 'Job declined'}
            body={
              decided === 'accepted'
                ? 'It is in your Active list. You will get a reminder before the start time.'
                : 'It has gone back to the pool for another technician.'
            }
            action={
              <Button variant="outline" size="sm" onClick={() => navigate('/tech/jobs')}>
                Back to jobs
              </Button>
            }
          />
        </div>
      </Shell>
    );
  }

  /* ---- completed / cancelled: read-only ---- */
  if (job.status !== 'active') {
    return (
      <Shell hero={<AppHeader back title={job.issue} action={<StatusPill status={pill.status} label={pill.label} />} />}>
        <div className="page">
          <Facts job={job} />
          <section className="section">
            <SectionLabel>{job.status === 'cancelled' ? 'What this would have paid' : 'What you earned'}</SectionLabel>
            <Card>
              <FeeBreakdown job={job} />
              {job.status === 'cancelled' && (
                <p className="t-body-md c-on-surface-variant" style={{ marginTop: 'var(--space-md)' }}>
                  Cancelled by the {job.cancelledBy}. Nothing was paid out.
                </p>
              )}
            </Card>
          </section>
        </div>
      </Shell>
    );
  }

  /* ---- active: advance the stage ---- */
  const CTA = {
    accepted:   'Start travelling',
    travelling: "I've arrived",
    arrived:    'Start work',
    working:    'Complete job',
  };

  return (
    <Shell
      hero={<AppHeader back title={job.issue} action={<StatusPill status={pill.status} label={pill.label} />} />}
      sticky={
        <StickyBar
          hint={
            stage === 'working'
              ? `Completing releases ${peso(job.techEarns)} to your next payout.`
              : 'The customer sees this update straight away.'
          }
        >
          <Button
            onClick={() => (nextStage ? setStage(nextStage.id) : navigate('/tech/jobs'))}
          >
            {CTA[stage]}
          </Button>
        </StickyBar>
      }
    >
      <div className="page pad-for-bar">
        <Card>
          <StageTracker current={stage} />
        </Card>

        <section className="section">
          <Facts job={job} />
        </section>

        <section className="section">
          <SectionLabel>What you get paid</SectionLabel>
          <Card>
            <FeeBreakdown job={job} />
          </Card>
        </section>

        <div className="text-center mt-xl">
          <LinkButton onClick={() => navigate('/tech/support')}>
            Something wrong with this job?
          </LinkButton>
        </div>
      </div>
    </Shell>
  );
}
