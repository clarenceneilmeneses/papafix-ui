import { Shell } from '../../components/Shell.jsx';
import { AppHeader } from '../../components/AppHeader.jsx';
import {
  Card, SectionLabel, StatusPill, EmptyState, ErrorState,
  SkeletonList, useAsync,
} from '../../components/ui.jsx';
import { PriceTag } from '../../components/Icons.jsx';
import { api } from '../../mock/api.js';
import { useScenario } from '../../mock/scenario.jsx';
import { COMMISSION_RATE } from '../../mock/data.js';
import { peso } from './shared.jsx';

/* Earnings.
 *
 * Production's hero said "THIS MONTH ₱15,400.00" with no statement of whose
 * money that is, while the Jobs tab showed the customer price for the same
 * jobs — 1.2x bigger, equally unlabelled. Every figure on this screen is now
 * explicitly the technician's own take, and the gross is shown once, as a
 * reconciliation, so the two screens can be compared without a calculator.
 * See TECH-APP-REVIEW.md §1.
 */
export default function TechEarnings() {
  const { scenario, setScenario } = useScenario();
  const { status, data, error } = useAsync(() => api.getTechEarnings(scenario), [scenario]);

  const jobs = data ?? [];
  const net = jobs.reduce((s, j) => s + j.techEarns, 0);
  const gross = jobs.reduce((s, j) => s + j.customerPays, 0);
  const fee = gross - net;

  return (
    <Shell hero={<AppHeader back title="Earnings" />}>
      <div className="page">
        {status === 'loading' && <SkeletonList count={4} lines={1} />}

        {status === 'error' && (
          <ErrorState body={error.message} onRetry={() => setScenario('loaded')} />
        )}

        {status === 'done' && jobs.length === 0 && (
          <EmptyState
            icon={PriceTag}
            title="No earnings yet"
            body="When you complete a job and the customer pays, your share shows up here."
          />
        )}

        {status === 'done' && jobs.length > 0 && (
          <>
            {/* The hero states whose money it is in the label, not in a
                footnote. "THIS MONTH" alone was the whole problem. */}
            <Card
              style={{
                background: 'var(--gradient-primary)',
                borderColor: 'transparent',
                color: 'var(--on-primary)',
                boxShadow: 'var(--elevation-primary)',
              }}
            >
              <div className="earn-hero">
                <span className="t-label-sm">YOU EARNED THIS MONTH</span>
                <span className="t-headline-lg">{peso(net)}</span>
                <span className="t-body-md">
                  {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} · after the
                  {' '}{Math.round(COMMISSION_RATE * 100)}% platform fee
                </span>
              </div>
            </Card>

            <section className="section">
              <SectionLabel>How that adds up</SectionLabel>
              <Card>
                <div className="fee-row">
                  <span className="t-body-lg">Customers paid</span>
                  <span className="t-body-lg">{peso(gross)}</span>
                </div>
                <div className="fee-row">
                  <span className="t-body-lg c-on-surface-variant">
                    Platform fee · {Math.round(COMMISSION_RATE * 100)}%
                  </span>
                  <span className="t-body-lg c-on-surface-variant">−{peso(fee)}</span>
                </div>
                <div className="fee-row fee-row--total">
                  <span className="t-title-md">You earned</span>
                  <span className="t-title-lg money__net">{peso(net)}</span>
                </div>
              </Card>
              <p className="t-body-md c-on-surface-variant mt-md">
                The larger figure on a job card is what the customer paid. This
                is your share of it.
              </p>
            </section>

            <section className="section">
              <SectionLabel>August 2026</SectionLabel>
              <div className="card-stack">
                {jobs.map((j) => (
                  <Card key={j.id}>
                    <div className="row-between" style={{ alignItems: 'flex-start', gap: 'var(--space-md)' }}>
                      <div style={{ minWidth: 0 }}>
                        <h3 className="t-title-md">{j.issue}</h3>
                        <p className="t-body-md c-on-surface-variant" style={{ marginTop: 2 }}>
                          {j.category} · {j.customer}
                        </p>
                        <p className="t-body-md c-on-surface-variant">{j.when}</p>
                      </div>
                      <span className="money">
                        <span className="t-title-lg money__net">{peso(j.techEarns)}</span>
                        <span className="t-body-md money__gross">
                          of {peso(j.customerPays)}
                        </span>
                        <StatusPill status="paid" />
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </Shell>
  );
}
