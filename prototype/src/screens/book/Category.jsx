import { useNavigate } from 'react-router-dom';
import { Shell } from '../../components/Shell.jsx';
import { AppHeader } from '../../components/AppHeader.jsx';
import { Card, StepProgress, StatusPill } from '../../components/ui.jsx';
import { ChevronRight, CATEGORY_ICONS } from '../../components/Icons.jsx';
import { categories } from '../../mock/data.js';

/* Aircon is the flagship service and the one the brand is named for, so it
   gets the brand orange. Everything else stays in the blue system — see the
   note on --accent in tokens.css before adding a third colour here. */
const TILE_TONE = {
  appliances: ' row__icon--accent',
};
import { useBooking } from './BookingFlow.jsx';

/* Step 1 of 4.
 *
 * Production gave every row the same blue dot as its icon — four identical
 * marks carrying no information, and the dot on the disabled row was the only
 * thing distinguishing it. Each category gets its own glyph here, and the
 * disabled row uses the same StatusPill as every other "state" in the app
 * instead of grey micro-caps floating at the end of the row.
 */
export default function Category() {
  const navigate = useNavigate();
  const { update } = useBooking();

  const open = (c) => {
    update({ categoryLabel: c.id === 'appliances' ? 'Appliances' : c.title, itemLabel: null });
    navigate(c.flow === 'aircon' ? `/book/${c.id}/unit` : `/book/${c.id}/issue`);
  };

  const hero = (
    <AppHeader back title="What needs fixing?" subtitle="Choose a service category.">
      <StepProgress current={1} total={4} />
    </AppHeader>
  );

  return (
    <Shell hero={hero}>
      <div className="page">
          <div className="card-stack">
            {categories.map((c) => {
              const Icon = CATEGORY_ICONS[c.icon];
              const tone = TILE_TONE[c.id] ?? '';

              if (c.disabled) {
                return (
                  <Card key={c.id} inert>
                    <div className="row-between">
                      <span className="row-start" style={{ alignItems: 'center', minWidth: 0 }}>
                        <span className="row__icon row__icon--muted row__icon--lg">
                          <Icon size={22} />
                        </span>
                        <span style={{ minWidth: 0 }}>
                          <span className="t-title-lg c-on-surface-variant" style={{ display: 'block' }}>
                            {c.title}
                          </span>
                          <span className="t-body-md c-on-surface-variant" style={{ display: 'block', marginTop: 2 }}>
                            {c.subtitle}
                          </span>
                        </span>
                      </span>
                      <StatusPill status="soon" />
                    </div>
                  </Card>
                );
              }

              return (
                <Card as="button" key={c.id} onClick={() => open(c)}>
                  <span className="row-start" style={{ alignItems: 'center' }}>
                    <span className={`row__icon row__icon--lg${tone}`}><Icon size={22} /></span>
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <span className="t-title-lg" style={{ display: 'block' }}>{c.title}</span>
                      <span
                        className="t-body-md c-on-surface-variant"
                        style={{ display: 'block', marginTop: 2 }}
                      >
                        {c.subtitle}
                      </span>
                    </span>
                    <span className="row__chev"><ChevronRight size={20} /></span>
                  </span>
                </Card>
              );
            })}
        </div>
      </div>
    </Shell>
  );
}
