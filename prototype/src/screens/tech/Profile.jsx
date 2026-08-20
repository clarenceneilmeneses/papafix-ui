import { useNavigate } from 'react-router-dom';
import { Shell } from '../../components/Shell.jsx';
import {
  Card, SectionLabel, Button, Avatar, RowLink, Tag,
} from '../../components/ui.jsx';
import { PriceTag, Star, LifeBuoy, ShieldCheck, Pencil } from '../../components/Icons.jsx';
import { techUser } from '../../mock/data.js';
import { Stars } from './shared.jsx';

/* Profile.
 *
 * Production rendered the phone row as `Phone  [Verified]  ABX` — a label, a
 * badge and a value as three equal columns, which reads as a three-column
 * table rather than a labelled value. The badge belongs with the value.
 *
 * The name is also a real one here. `qaqaqa` and its `Q` avatar never showed
 * what a Filipino name does to this layout. See TECH-APP-REVIEW.md §10.
 */
const initials = (full) => (full || '?')
  .trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

export default function TechProfile() {
  const navigate = useNavigate();

  const hero = (
    <div className="profile-head">
      <div className="avatar-wrap">
        <span className="avatar avatar--lg" aria-hidden="true">
          <span className="t-headline-sm">{initials(techUser.name)}</span>
        </span>
        <span className="avatar-edit" aria-hidden="true">
          <span className="avatar-edit__dot"><Pencil size={14} /></span>
        </span>
      </div>

      {/* The name can be long. It wraps rather than truncating — a
          technician's own name is the one string worth two lines. */}
      <h1 className="t-headline-sm mt-lg text-center">{techUser.name}</h1>

      <div className="row-start mt-sm" style={{ justifyContent: 'center', gap: 'var(--space-sm)' }}>
        <Stars n={Math.round(techUser.rating)} />
        <span className="t-body-lg">
          {techUser.rating.toFixed(1)} ({techUser.reviewCount} reviews)
        </span>
      </div>
    </div>
  );

  return (
    <Shell hero={hero} nav>
      <div className="page">
        <SectionLabel>Contact</SectionLabel>
        <Card flush>
          <div style={{ padding: 'var(--space-lg)' }}>
            <span className="t-label-sm c-on-surface-variant" style={{ display: 'block' }}>
              PHONE
            </span>
            <span className="row-start mt-xs" style={{ gap: 'var(--space-sm)', alignItems: 'center' }}>
              <span className="t-body-lg">{techUser.phone}</span>
              {techUser.phoneVerified && (
                <span className="pill pill--success t-label-sm">
                  <ShieldCheck size={14} />
                  Verified
                </span>
              )}
            </span>
          </div>
          <div style={{ borderTop: '1px solid var(--outline-variant)', padding: 'var(--space-lg)' }}>
            <span className="t-label-sm c-on-surface-variant" style={{ display: 'block' }}>
              EMAIL
            </span>
            <span className="t-body-lg">{techUser.email}</span>
          </div>
        </Card>

        <section className="section">
          <SectionLabel>Service categories</SectionLabel>
          <Card>
            <div className="chip-wrap">
              {techUser.categories.map((c) => <Tag key={c}>{c}</Tag>)}
            </div>
            <p className="t-body-md c-on-surface-variant mt-md">
              You are only sent requests in these categories. Contact support
              to change them.
            </p>
          </Card>
        </section>

        <section className="section">
          <SectionLabel>Activity</SectionLabel>
          <Card flush>
            <RowLink
              icon={<span className="row__icon"><PriceTag size={20} /></span>}
              title="Earnings"
              onClick={() => navigate('/tech/earnings')}
            />
            <RowLink
              icon={<span className="row__icon"><Star size={20} /></span>}
              title="Reviews"
              onClick={() => navigate('/tech/reviews')}
            />
          </Card>
        </section>

        <section className="section">
          <SectionLabel>Support</SectionLabel>
          <Card flush>
            <RowLink
              icon={<span className="row__icon"><LifeBuoy size={20} /></span>}
              title="Help & Support"
              onClick={() => navigate('/tech/support')}
            />
          </Card>
        </section>

        <div className="section">
          <Button variant="destructive" onClick={() => navigate('/tech/sign-in')}>
            Sign Out
          </Button>
        </div>
      </div>
    </Shell>
  );
}
