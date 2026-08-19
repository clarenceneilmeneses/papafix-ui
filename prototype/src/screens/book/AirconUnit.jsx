import { useNavigate } from 'react-router-dom';
import { Shell } from '../../components/Shell.jsx';
import { AppHeader } from '../../components/AppHeader.jsx';
import { Card, Chip, StepProgress, SectionLabel, Button, StickyBar } from '../../components/ui.jsx';
import { airconTypes, airconServices, horsepowerOptions } from '../../mock/data.js';
import { useBooking } from './BookingFlow.jsx';

/* Step 2 of 4 — the aircon branch.
 *
 * Three things changed:
 *
 * 1. The disabled CTA. Production rendered it as white text on a 40%-opacity
 *    version of the primary blue — "Select your unit" was very nearly
 *    invisible, which is the one moment the label has a job to do. It uses
 *    the shared .btn:disabled treatment now, and the label names the next
 *    thing to tap rather than staying generic.
 * 2. Progressive disclosure is kept from production (SERVICE appears after a
 *    type is picked, HORSEPOWER after a service) — that part was right.
 * 3. Horsepower was a 2-column grid of full cards for five two-word options,
 *    which is a lot of furniture for a single-select. They are Chips now, the
 *    same control the Bookings filters use.
 */
export default function AirconUnit() {
  const navigate = useNavigate();
  const { draft, update } = useBooking();

  const service = airconServices.find((s) => s.id === draft.serviceId);
  const type = airconTypes.find((t) => t.id === draft.unitId);

  const nextLabel = !type
    ? 'Select your unit'
    : !service
      ? 'Choose a service'
      : !draft.horsepower
        ? 'Select the horsepower'
        : service.final
          ? `Next — ${service.priceLabel}`
          : `Next — from ${service.priceLabel}`;

  const ready = Boolean(type && service && draft.horsepower);

  const next = () => {
    update({ itemLabel: 'Air Conditioner' });
    navigate('/book/appliances/details');
  };

  const hero = (
    <AppHeader
      back
      title="Which unit, and what service?"
      subtitle="Cleaning prices are final. Repair shows a starting price — the final amount is set after the technician inspects your unit."
    >
      <StepProgress current={2} total={4} />
      <p className="t-label-sm c-primary" style={{ marginTop: 'var(--space-lg)' }}>
        Appliances · Air Conditioner
      </p>
    </AppHeader>
  );

  return (
    <Shell
      hero={hero}
      sticky={
        <StickyBar hint={service && !service.final ? 'Parts, if needed, are quoted after the inspection.' : null}>
          <Button disabled={!ready} onClick={next}>{nextLabel}</Button>
        </StickyBar>
      }
    >
      <div className="page">
          <SectionLabel>Aircon type</SectionLabel>
          <div className="grid-3">
            {airconTypes.map((t) => (
              <Card
                as="button"
                key={t.id}
                selected={draft.unitId === t.id}
                aria-pressed={draft.unitId === t.id}
                onClick={() => update({ unitId: t.id })}
                style={{ padding: 'var(--space-md)', textAlign: 'center' }}
              >
                <span className="t-title-md" style={{ display: 'block' }}>{t.name}</span>
                <span className="t-body-md c-on-surface-variant" style={{ display: 'block', marginTop: 2 }}>
                  {t.variant}
                </span>
              </Card>
            ))}
          </div>

          {type && (
            <section className="section">
              <SectionLabel>Service</SectionLabel>
              <div className="grid-2">
                {airconServices.map((s) => (
                  <Card
                    as="button"
                    key={s.id}
                    selected={draft.serviceId === s.id}
                    aria-pressed={draft.serviceId === s.id}
                    onClick={() => update({ serviceId: s.id })}
                  >
                    <span className="t-title-md" style={{ display: 'block' }}>{s.title}</span>
                    {/* Production showed "Fixed Price" and "Starts at P1,800"
                        in the same slot at the same size, so the one that
                        carried a number and the one that did not looked like
                        equivalent facts. The amount is now the emphasis and
                        the qualifier sits above it. */}
                    <span
                      className="t-label-sm c-on-surface-variant"
                      style={{ display: 'block', marginTop: 'var(--space-sm)' }}
                    >
                      {s.note}
                    </span>
                    <span className="t-title-lg" style={{ display: 'block', marginTop: 2 }}>
                      {s.priceLabel}
                    </span>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {service && (
            <section className="section">
              <SectionLabel>Horsepower</SectionLabel>
              <p className="t-body-md c-on-surface-variant" style={{ marginBottom: 'var(--space-md)' }}>
                {service.final
                  ? 'Cleaning is quoted per unit type, so the price is the same for every size. We ask so your technician arrives prepared.'
                  : 'Repair is quoted per unit type, so the price is the same for every size. We ask so your technician arrives prepared.'}
              </p>
              <div className="chip-wrap">
                {horsepowerOptions.map((hp) => (
                  <Chip
                    key={hp}
                    selected={draft.horsepower === hp}
                    onClick={() => update({ horsepower: hp })}
                  >
                    {hp}
                  </Chip>
                ))}
              </div>
          </section>
        )}
      </div>
    </Shell>
  );
}
