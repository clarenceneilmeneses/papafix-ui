import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shell } from '../../components/Shell.jsx';
import { AppHeader } from '../../components/AppHeader.jsx';
import {
  Card, Avatar, Divider, StepProgress,
  ErrorState, EmptyState, SkeletonList, useAsync,
} from '../../components/ui.jsx';
import { ChevronRight, Sparkle, Star, User } from '../../components/Icons.jsx';
import { api } from '../../mock/api.js';
import { useScenario } from '../../mock/scenario.jsx';
import { useBooking } from './BookingFlow.jsx';

/* Step 4 of 4.
 *
 * The Auto-match card is the recommended path, so it stays visually ahead of
 * the list — but in production its icon was two white bars that read as a
 * rendering failure. It is a real glyph now.
 *
 * KNOWN DATA PROBLEM, not a layout one: two of the four technicians have no
 * name, so both rows render as "Technician" with different photos and
 * different stats. No amount of layout fixes that — the field needs a value,
 * or the app needs a rule (first name, or "PapaFix Technician #4"). Flagged
 * rather than papered over.
 */
function TechnicianCard({ t, onSelect }) {
  return (
    <Card as="button" onClick={onSelect}>
      <span className="row-start" style={{ alignItems: 'center' }}>
        <span className="avatar-ring"><Avatar name={t.name ?? '?'} /></span>
        <span style={{ flex: 1, minWidth: 0 }}>
          <span className="t-title-lg" style={{ display: 'block' }}>
            {t.name ?? 'Technician'}
          </span>

          {/* Production ran rating, review count and job count together as one
              grey line at body size, so the rating — the thing people are
              actually scanning for — had no more weight than the comma next
              to it. The score leads at title size; the rest is metadata. */}
          <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginTop: 4 }}>
            <span className="pill pill--warning t-label-sm" style={{ letterSpacing: 0 }}>
              <Star size={13} />
              {t.rating.toFixed(1)}
            </span>
            <span className="t-body-md c-on-surface-variant">
              {t.reviews} {t.reviews === 1 ? 'review' : 'reviews'} · {t.jobs} jobs
            </span>
          </span>

          <span
            className="t-body-md c-on-surface-variant"
            style={{ display: 'block', marginTop: 'var(--space-xs)' }}
          >
            {t.km} km · ~{t.eta} min · Travel fee: {t.travelFee === 0 ? 'free' : `₱${t.travelFee}`}
          </span>
        </span>
        <span className="row__chev"><ChevronRight size={20} /></span>
      </span>
    </Card>
  );
}

export default function Technician() {
  const navigate = useNavigate();
  const { draft } = useBooking();
  const { scenario, setScenario } = useScenario();

  const { status, data, error } = useAsync(() => api.getTechnicians(scenario), [scenario]);
  const list = data ?? [];

  // Picking a technician is the last step of the flow; production went
  // straight from the tap to the booking. Same here — no extra confirm screen
  // is invented, the tap lands on My Bookings.
  const confirm = () => navigate('/bookings');

  const hero = (
    <AppHeader
      back
      title="Choose a Technician"
      subtitle={`Available for ${draft.categoryLabel ?? 'this service'} near you.`}
    >
      <StepProgress current={4} total={4} />
    </AppHeader>
  );

  return (
    <Shell hero={hero}>
      <div className="page">
          <Card as="button" selected onClick={confirm}>
            <span className="row-start" style={{ alignItems: 'center' }}>
              <span className="row__icon" style={{ background: 'var(--primary)', color: 'var(--on-primary)' }}>
                <Sparkle size={20} />
              </span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span className="t-title-lg" style={{ display: 'block' }}>Auto-match me</span>
                <span className="t-body-md" style={{ display: 'block', marginTop: 2 }}>
                  We&apos;ll pick the best available tech
                </span>
              </span>
              <span className="row__chev"><ChevronRight size={20} /></span>
            </span>
          </Card>

          <div className="mt-xl mb-lg">
            <Divider label="or browse manually" />
          </div>
        </div>

        <div className="page">
          {status === 'loading' && <SkeletonList count={3} lines={2} />}

          {status === 'error' && (
            <ErrorState body={error.message} onRetry={() => setScenario('loaded')} />
          )}

          {status === 'done' && list.length === 0 && (
            <EmptyState
              icon={User}
              title="No technicians nearby"
              body="Nobody is available for this service in your area right now. Auto-match will keep looking."
            />
          )}

          {status === 'done' && list.length > 0 && (
            <div className="card-stack">
            {list.map((t) => <TechnicianCard key={t.id} t={t} onSelect={confirm} />)}
          </div>
        )}
      </div>
    </Shell>
  );
}
