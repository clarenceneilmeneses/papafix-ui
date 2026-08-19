import { useNavigate, useParams } from 'react-router-dom';
import { Shell } from '../../components/Shell.jsx';
import { AppHeader } from '../../components/AppHeader.jsx';
import {
  Card, Tag, Field, SectionLabel, Button, StickyBar, LinkButton, StepProgress,
} from '../../components/ui.jsx';
import { Plus } from '../../components/Icons.jsx';
import { addresses, issuesByCategory, airconPlaceholder } from '../../mock/data.js';
import { useBooking } from './BookingFlow.jsx';

const MAX_NOTES = 500;

/* Step 3 of 4.
 *
 * Two fixes:
 *
 * 1. The breadcrumbs. Production drew "Plumbing" and "Leaking Pipe" as blue
 *    pills identical to the selectable filter chips on My Bookings, so they
 *    looked tappable and looked like they could be deselected. They are Tags
 *    here — square-ish, muted, unmistakably read-only.
 * 2. The placeholder. Every category showed "AC not cooling, makes loud
 *    noise…" — including Plumbing and Electrical, where it is nonsense. The
 *    hint now comes from the chosen category.
 * 3. The address radio group had exactly one option and no way to tell
 *    whether it was a choice or a statement. It is still a radio group (a
 *    second address exists in the mock data now), and the selected card
 *    carries the same selected treatment used everywhere else in the flow.
 */
export default function JobDetails() {
  const navigate = useNavigate();
  const { category } = useParams();
  const { draft, update } = useBooking();

  const spec = issuesByCategory[category];
  const placeholder = spec ? spec.placeholder : airconPlaceholder;
  const categoryLabel = draft.categoryLabel ?? (spec ? spec.label : 'Appliances');
  const itemLabel = draft.itemLabel ?? (spec ? spec.issues[0] : 'Air Conditioner');

  const hero = (
    <AppHeader back title="Job Details">
      <StepProgress current={3} total={4} />
    </AppHeader>
  );

  return (
    <Shell
      hero={hero}
      sticky={
        <StickyBar>
          <Button onClick={() => navigate(`/book/${category}/technician`)}>
            Next — Choose Technician
          </Button>
        </StickyBar>
      }
    >
      <div className="page">
          <div className="tag-row">
            <Tag>{categoryLabel}</Tag>
            <Tag>{itemLabel}</Tag>
          </div>

          <div className="section">
            <Field
              label="Additional details (optional)"
              counter={`${draft.notes.length}/${MAX_NOTES}`}
            >
              <textarea
                className="field__textarea t-body-lg"
                maxLength={MAX_NOTES}
                value={draft.notes}
                onChange={(e) => update({ notes: e.target.value })}
                placeholder={placeholder}
              />
            </Field>
          </div>

          <section className="section">
            <SectionLabel>Service address</SectionLabel>
            <div className="card-stack" role="radiogroup" aria-label="Service address">
              {addresses.map((a) => {
                const checked = draft.addressId === a.id;
                return (
                  <Card
                    as="button"
                    key={a.id}
                    selected={checked}
                    role="radio"
                    aria-checked={checked}
                    onClick={() => update({ addressId: a.id })}
                  >
                    <span className="radio-row">
                      <span className={`radio${checked ? ' is-checked' : ''}`} aria-hidden="true" />
                      <span style={{ minWidth: 0 }}>
                        <span className="t-title-md" style={{ display: 'block' }}>{a.label}</span>
                        <span
                          className="t-body-md c-on-surface-variant"
                          style={{ display: 'block', marginTop: 2 }}
                        >
                          {a.line}
                        </span>
                      </span>
                    </span>
                  </Card>
                );
              })}
            </div>

            <div className="text-center mt-md">
              <LinkButton onClick={() => navigate('/addresses')}>
                <Plus size={18} /> Add another address
              </LinkButton>
            </div>
        </section>
      </div>
    </Shell>
  );
}
