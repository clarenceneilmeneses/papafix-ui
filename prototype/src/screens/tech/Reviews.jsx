import { Shell } from '../../components/Shell.jsx';
import { AppHeader } from '../../components/AppHeader.jsx';
import {
  Card, EmptyState, ErrorState, SkeletonList, useAsync,
} from '../../components/ui.jsx';
import { Star } from '../../components/Icons.jsx';
import { api } from '../../mock/api.js';
import { useScenario } from '../../mock/scenario.jsx';
import { techUser } from '../../mock/data.js';
import { Stars } from './shared.jsx';

/* Reviews.
 *
 * Production made the customer the card title and the job the subtitle —
 * the exact inverse of the Jobs card, which titled the job and subtitled the
 * customer. Same two fields, opposite hierarchy on two screens a tap apart.
 * The job is the title here too. See TECH-APP-REVIEW.md §3.
 */
export default function TechReviews() {
  const { scenario, setScenario } = useScenario();
  const { status, data, error } = useAsync(() => api.getTechReviews(scenario), [scenario]);
  const reviews = data ?? [];

  const avg = reviews.length
    ? reviews.reduce((s, r) => s + r.stars, 0) / reviews.length
    : 0;

  return (
    <Shell hero={<AppHeader back title="Reviews" />}>
      <div className="page">
        {status === 'loading' && <SkeletonList count={3} lines={2} />}

        {status === 'error' && (
          <ErrorState body={error.message} onRetry={() => setScenario('loaded')} />
        )}

        {status === 'done' && reviews.length === 0 && (
          <EmptyState
            icon={Star}
            title="No reviews yet"
            body="After a job, the customer can rate you. Their ratings show up here."
          />
        )}

        {status === 'done' && reviews.length > 0 && (
          <>
            <Card>
              <div className="row-between">
                <div>
                  <span className="t-headline-lg" style={{ display: 'block' }}>
                    {avg.toFixed(1)}
                  </span>
                  <Stars n={Math.round(avg)} />
                </div>
                <div className="text-center">
                  <span className="t-headline-sm" style={{ display: 'block' }}>
                    {reviews.length}
                  </span>
                  <span className="t-body-md c-on-surface-variant">
                    {reviews.length === 1 ? 'review' : 'reviews'}
                  </span>
                </div>
              </div>
              <p className="t-body-md c-on-surface-variant mt-md">
                Customers see this on your profile when they pick a technician.
              </p>
            </Card>

            <div className="card-stack section">
              {reviews.map((r) => (
                <Card key={r.id}>
                  <div className="row-between" style={{ alignItems: 'flex-start', gap: 'var(--space-md)' }}>
                    <div style={{ minWidth: 0 }}>
                      <h3 className="t-title-lg">{r.issue}</h3>
                      <p className="t-body-md c-on-surface-variant" style={{ marginTop: 2 }}>
                        {r.category} · {r.customer}
                      </p>
                    </div>
                    <Stars n={r.stars} />
                  </div>

                  {r.note ? (
                    <p className="t-body-lg mt-md">“{r.note}”</p>
                  ) : (
                    <p className="t-body-md c-on-surface-variant mt-md" style={{ fontStyle: 'italic' }}>
                      Rated, but no note left.
                    </p>
                  )}

                  <p className="t-body-md c-on-surface-variant mt-sm">{r.date}</p>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </Shell>
  );
}
