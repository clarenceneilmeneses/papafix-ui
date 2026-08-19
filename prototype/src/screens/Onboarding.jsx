import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, LinkButton, StickyBar } from '../components/ui.jsx';
import { Wrench, PriceTag, Calendar, ArrowRight, Star, Snowflake } from '../components/Icons.jsx';

/* First-run onboarding.
 *
 * THREE RULES THIS FOLLOWS, because most onboarding fails all three:
 *
 * 1. Every slide describes something the app actually does, in the app's own
 *    words and numbers. The prices below are the same ones the booking flow
 *    quotes. Nothing here promises a feature that does not exist.
 * 2. Three slides, not five. It is a launcher, not a manual.
 * 3. Skip is visible on every slide from the first frame. Onboarding that
 *    hides its exit is a dark pattern, and it is the reason people bounce
 *    before they ever see the product.
 *
 * WIRING (the part that is not visible here): this is gated on a "seen
 * onboarding" bool in SharedPreferences, written when the user reaches the
 * last slide OR taps Skip — not on sign-in, or a signed-out user gets it
 * again every launch. The launcher route reads that flag and goes straight
 * to /sign-in when it is set.
 *
 * The art panels are built from the design system on purpose. They are
 * honest placeholders for a real illustrator; stock photography here would
 * set an expectation the rest of the app does not meet.
 */
const SLIDES = [
  {
    id: 'book',
    tone: '',
    Glyph: Wrench,
    title: 'Book a technician in minutes',
    body: 'Aircon, plumbing and electrical work — pick the job, pick a time, and we handle the rest.',
    chips: [
      { Icon: Snowflake, label: 'Aircon cleaning' },
      { Icon: Wrench, label: 'Leaking pipe' },
    ],
  },
  {
    id: 'price',
    tone: ' onb-art--accent',
    Glyph: PriceTag,
    title: 'Know the price before you book',
    body: 'Cleaning is a fixed price. Repairs show a starting price up front, and the final amount is set only after the technician inspects.',
    chips: [
      { Icon: PriceTag, label: 'Cleaning ₱1,200' },
      { Icon: PriceTag, label: 'Repairs from ₱600' },
    ],
  },
  {
    id: 'track',
    tone: '',
    Glyph: Calendar,
    title: 'Keep every job in one place',
    body: 'See who is coming and when, check what you paid, and message support without leaving the app.',
    chips: [
      { Icon: Star, label: 'Rated technicians' },
      { Icon: Calendar, label: 'Next: 22 Aug' },
    ],
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [i, setI] = useState(0);

  const slide = SLIDES[i];
  const [chipA, chipB] = slide.chips;
  const last = i === SLIDES.length - 1;

  // Both of these are where the app writes the "seen onboarding" flag.
  const finish = () => navigate('/sign-up');
  const skip = () => navigate('/sign-in');

  return (
    <div className="onb">
      <div className="onb__top">
        <p className="t-title-md">PapaFix</p>
        <LinkButton onClick={skip}>Skip</LinkButton>
      </div>

      <div className="onb__body">
        <div className={`onb-art${slide.tone}`}>
          <span className="onb-art__glyph"><slide.Glyph size={56} /></span>

          <span className="onb-chip onb-chip--a t-label-lg">
            <chipA.Icon size={16} />
            {chipA.label}
          </span>
          <span className="onb-chip onb-chip--b t-label-lg">
            <chipB.Icon size={16} />
            {chipB.label}
          </span>
        </div>

        <div className="onb__copy">
          <h1 className="t-headline-lg">{slide.title}</h1>
          <p className="t-body-lg c-on-surface-variant" style={{ marginTop: 'var(--space-md)' }}>
            {slide.body}
          </p>
        </div>
      </div>

      <StickyBar>
        <div className="row-between">
          <div className="onb-dots" role="tablist" aria-label="Onboarding progress">
            {SLIDES.map((s, n) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={n === i}
                aria-label={`Step ${n + 1} of ${SLIDES.length}`}
                className={`onb-dot${n === i ? ' is-active' : ''}`}
                onClick={() => setI(n)}
              />
            ))}
          </div>

          <Button
            size="sm"
            onClick={() => (last ? finish() : setI(i + 1))}
            style={{ paddingLeft: 'var(--space-2xl)', paddingRight: 'var(--space-2xl)' }}
          >
            {last ? 'Get started' : 'Next'} <ArrowRight size={20} />
          </Button>
        </div>

        {last && (
          <p className="text-center t-body-md c-on-surface-variant" style={{ marginTop: 'var(--space-md)' }}>
            Already have an account?{' '}
            <button type="button" className="c-primary" onClick={skip}>Sign In</button>
          </p>
        )}
      </StickyBar>
    </div>
  );
}
