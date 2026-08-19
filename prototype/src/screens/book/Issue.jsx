import { useNavigate, useParams } from 'react-router-dom';
import { Shell } from '../../components/Shell.jsx';
import { AppHeader } from '../../components/AppHeader.jsx';
import { Card, StepProgress, EmptyState } from '../../components/ui.jsx';
import { ChevronRight } from '../../components/Icons.jsx';
import { issuesByCategory } from '../../mock/data.js';
import { useBooking } from './BookingFlow.jsx';

/* Step 2 of 4 — the plumbing / electrical branch.
 *
 * The price panel is the change worth pointing at. In production the amount,
 * its label and its caveat were three lines at two type sizes inside a tinted
 * box, and "SERVICE STARTS AT" competed with the number for attention. Same
 * box, three distinct steps: quiet label, loud amount, quiet caveat.
 */
export default function Issue() {
  const navigate = useNavigate();
  const { category } = useParams();
  const { update } = useBooking();

  const spec = issuesByCategory[category];

  if (!spec) {
    return (
      <Shell
        hero={
          <AppHeader back title="Select the issue">
            <StepProgress current={2} total={4} />
          </AppHeader>
        }
      >
        <EmptyState
          title="No issues listed"
          body="This category does not have an issue list yet."
        />
      </Shell>
    );
  }

  const pick = (issue) => {
    update({ categoryLabel: spec.label, itemLabel: issue });
    navigate(`/book/${category}/details`);
  };

  const hero = (
    <AppHeader back title="Select the issue" subtitle={spec.prompt}>
      <StepProgress current={2} total={4} />
      <p className="t-label-sm c-primary" style={{ marginTop: 'var(--space-lg)' }}>
        {spec.label}
      </p>
    </AppHeader>
  );

  return (
    <Shell hero={hero}>
      <div className="page">
          <div className="note">
            <span className="t-label-sm">Service starts at</span>
            <span className="note__value t-headline-sm">₱{spec.startsAt}</span>
            <span className="note__body t-body-md">
              Final price is set after the technician inspects. Parts, if needed, are added then.
            </span>
          </div>

          <div className="card-stack mt-xl">
            {spec.issues.map((issue) => (
              <Card as="button" key={issue} onClick={() => pick(issue)}>
                <span className="row-between">
                  <span className="t-title-md">{issue}</span>
                  <span className="row__chev"><ChevronRight size={20} /></span>
                </span>
              </Card>
          ))}
        </div>
      </div>
    </Shell>
  );
}
