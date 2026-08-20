import { useState } from 'react';
import { Shell, HeroTitle } from '../../components/Shell.jsx';
import {
  Card, SectionLabel, Button, LinkButton, BottomSheet,
  ErrorState, useAsync, Skeleton,
} from '../../components/ui.jsx';
import { ChevronLeft, ChevronRight, Plus, X } from '../../components/Icons.jsx';
import { api } from '../../mock/api.js';
import { useScenario } from '../../mock/scenario.jsx';

/* My Availability.
 *
 * TWO REAL DEFECTS FROM PRODUCTION ARE FIXED HERE.
 *
 * 1. YOU COULD SAVE A BOOKABLE DAY WITH NO BOOKABLE HOURS.
 *    "Available this day" ON + "No slots added yet" + Save enabled. That
 *    publishes a day customers can book with nothing to book. Save is now
 *    blocked with a reason until either a slot exists or the day is off.
 *
 * 2. THE LEGEND DESCRIBED THREE STATES; THE GRID DREW FIVE.
 *    Production listed Available / Off / Today and also rendered a selected
 *    fill and a past-available tint — and today and selected were the same
 *    orange, so on the default view you could not tell which was which.
 *    Today is a ring, selected is a fill, and both are in the legend.
 *
 * See TECH-APP-REVIEW.md §6.
 */

const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTH_LABEL = 'August 2026';
const DAYS_IN_MONTH = 31;
const FIRST_WEEKDAY = 6;   // 1 Aug 2026 is a Saturday
const TODAY = 18;

const SLOT_PRESETS = [
  ['08:00', '12:00'],
  ['13:00', '17:00'],
  ['08:00', '17:00'],
  ['09:00', '18:00'],
];

const fmt = (s, e) => `${s} – ${e}`;

export default function TechSchedule() {
  const { scenario, setScenario } = useScenario();
  const { status, data, error } = useAsync(() => api.getTechAvailability(scenario), [scenario]);

  const [edits, setEdits] = useState({});
  const [selected, setSelected] = useState(null);
  const [draft, setDraft] = useState(null);
  const [addOpen, setAddOpen] = useState(false);

  const days = { ...(data?.days ?? {}), ...edits };
  const dayOf = (d) => days[d] ?? { available: false, slots: [] };

  const open = (d) => {
    setSelected(d);
    const cur = dayOf(d);
    setDraft({ available: cur.available, slots: cur.slots.map((s) => [...s]) });
  };

  const close = () => { setSelected(null); setDraft(null); setAddOpen(false); };

  const save = () => {
    setEdits((e) => ({ ...e, [selected]: draft }));
    close();
  };

  /* The rule production did not have. */
  const blocked = draft && draft.available && draft.slots.length === 0;

  const cells = [];
  for (let i = 0; i < FIRST_WEEKDAY; i += 1) cells.push(null);
  for (let d = 1; d <= DAYS_IN_MONTH; d += 1) cells.push(d);

  const hero = (
    <HeroTitle
      title="My Availability"
      subtitle="Customers can only book you on days you open."
    />
  );

  return (
    <Shell hero={hero} nav>
      <div className="page">
        {status === 'loading' && (
          <Card>
            <Skeleton w="50%" h={24} />
            <div style={{ height: 'var(--space-xl)' }} />
            <Skeleton h={220} r="var(--radius-md)" />
          </Card>
        )}

        {status === 'error' && (
          <ErrorState body={error.message} onRetry={() => setScenario('loaded')} />
        )}

        {status === 'done' && (
          <>
            <Card>
              <div className="cal__head">
                <button type="button" className="cal__nav" disabled aria-label="Previous month">
                  <ChevronLeft size={20} />
                </button>
                <span className="t-title-lg">{MONTH_LABEL}</span>
                <button type="button" className="cal__nav" aria-label="Next month">
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="cal__grid mt-lg" role="grid">
                {DOW.map((d, i) => (
                  <span key={i} className="cal__dow t-label-sm" role="columnheader">{d}</span>
                ))}

                {cells.map((d, i) => {
                  if (d === null) return <span key={`p${i}`} />;
                  const past = d < TODAY;
                  const day = dayOf(d);
                  const bookable = day.available && day.slots.length > 0;
                  const cls = [
                    'cal__day',
                    bookable && !past && 'cal__day--open',
                    day.available === false && days[d] && 'cal__day--off',
                    d === TODAY && 'cal__day--today',
                    d === selected && 'cal__day--sel',
                  ].filter(Boolean).join(' ');

                  return (
                    <button
                      key={d}
                      type="button"
                      role="gridcell"
                      className={cls}
                      disabled={past}
                      onClick={() => open(d)}
                      aria-label={`${d} August${bookable ? ', available' : ''}`}
                    >
                      <span className="t-body-lg">{d}</span>
                      {days[d] && !past && (
                        <span className="cal__flag">{bookable ? 'Open' : 'Off'}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* All five states the grid can draw, not three. */}
            <div className="legend mt-xl">
              <span className="legend__item t-body-md">
                <span className="legend__key legend__key--open" />Open for booking
              </span>
              <span className="legend__item t-body-md">
                <span className="legend__key legend__key--off" />Off
              </span>
              <span className="legend__item t-body-md">
                <span className="legend__key legend__key--today" />Today
              </span>
              <span className="legend__item t-body-md">
                <span className="legend__key legend__key--sel" />Selected
              </span>
              <span className="legend__item t-body-md">
                <span className="legend__key" style={{ opacity: 0.4 }} />Past
              </span>
            </div>
          </>
        )}
      </div>

      <BottomSheet
        open={selected !== null}
        onClose={close}
        title={selected ? `${selected} August 2026` : ''}
        footer={
          <>
            <Button className="mt-xl" disabled={blocked} onClick={save}>
              Save
            </Button>
            {blocked && (
              <p className="sticky-bar__hint t-body-md" style={{ marginTop: 'var(--space-sm)' }}>
                Add at least one time slot, or switch the day off. An open day
                with no hours cannot be booked.
              </p>
            )}
          </>
        }
      >
        {draft && (
          <>
            <Card inert>
              <div className="row-between">
                <div>
                  <span className="t-title-md" style={{ display: 'block' }}>Open for booking</span>
                  <span className="t-body-md c-on-surface-variant">
                    Customers can request you on this day
                  </span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={draft.available}
                  aria-label="Open for booking"
                  onClick={() => setDraft((d) => ({ ...d, available: !d.available }))}
                  style={{
                    width: 52, height: 32, flex: '0 0 auto',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--outline)',
                    background: draft.available ? 'var(--primary)' : 'var(--surface-container)',
                    position: 'relative',
                    transition: 'background var(--transition-fast)',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute', top: 3, left: draft.available ? 23 : 3,
                      width: 24, height: 24, borderRadius: '50%', background: '#fff',
                      boxShadow: 'var(--elevation-1)',
                      transition: 'left var(--transition-fast)',
                    }}
                  />
                </button>
              </div>
            </Card>

            {draft.available && (
              <div className="section">
                <SectionLabel>Time slots</SectionLabel>

                {draft.slots.length === 0 ? (
                  <p className="t-body-lg c-on-surface-variant">
                    No hours set. Add at least one so customers know when to book.
                  </p>
                ) : (
                  <div className="card-stack">
                    {draft.slots.map(([s, e], i) => (
                      <Card key={`${s}-${e}-${i}`} flush>
                        <div className="row-between" style={{ padding: 'var(--space-md) var(--space-lg)' }}>
                          <span className="t-body-lg">{fmt(s, e)}</span>
                          <button
                            type="button"
                            onClick={() => setDraft((d) => ({
                              ...d, slots: d.slots.filter((_, j) => j !== i),
                            }))}
                            aria-label={`Remove ${fmt(s, e)}`}
                            style={{ padding: 'var(--space-sm)' }}
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

                <div className="mt-lg">
                  <Button variant="outline" onClick={() => setAddOpen((v) => !v)}>
                    <Plus size={18} style={{ marginRight: 6, verticalAlign: '-3px' }} />
                    Add slot
                  </Button>
                </div>

                {addOpen && (
                  <div className="chip-wrap mt-lg">
                    {SLOT_PRESETS.map(([s, e]) => (
                      <button
                        key={`${s}-${e}`}
                        type="button"
                        className="chip t-label-lg"
                        onClick={() => {
                          setDraft((d) => ({ ...d, slots: [...d.slots, [s, e]] }));
                          setAddOpen(false);
                        }}
                      >
                        {fmt(s, e)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {!draft.available && (
              <p className="t-body-lg c-on-surface-variant mt-lg">
                You will not be sent any requests for this day.
              </p>
            )}

            <div className="text-center mt-xl">
              <LinkButton onClick={close}>Cancel</LinkButton>
            </div>
          </>
        )}
      </BottomSheet>
    </Shell>
  );
}
