import { useNavigate } from 'react-router-dom';
import { Shell } from '../components/Shell.jsx';
import { Card, SectionLabel, RowLink, Button, Avatar } from '../components/ui.jsx';
import { Pencil, MapPin, LifeBuoy } from '../components/Icons.jsx';
import { user } from '../mock/data.js';

export default function Profile() {
  const navigate = useNavigate();

  /* The identity block sits on the brand colour and the settings sit on the
     sheet. Production put both on the same flat off-white, so the screen had
     no top and the avatar looked like it was floating in the list. */
  const hero = (
    <div className="hero-identity">
      <span className="avatar-wrap">
        <Avatar name={user.name} src={user.avatarUrl} size="lg" />
        {/* Badge stays ~32px visually but the hit area is a full 48px.
            Production's was ~15px total. */}
        <button type="button" className="avatar-edit" aria-label="Change profile photo">
          <span className="avatar-edit__dot"><Pencil size={16} /></span>
        </button>
      </span>
      <div className="text-center">
        <p className="hero-identity__name t-headline-sm">{user.name}</p>
        <p className="hero-identity__mail t-body-md" style={{ marginTop: 'var(--space-xs)' }}>
          {user.email}
        </p>
      </div>
    </div>
  );

  return (
    <Shell hero={hero} nav>
      <div className="page">
        <section className="section" style={{ marginTop: 0 }}>
          <SectionLabel>Account</SectionLabel>
          <Card flush>
            <RowLink title="Full name" value={user.name} onClick={() => {}} />
            <div className="divider" />
            {/* Email is not editable. In production it looked identical to
                the editable row above it apart from a missing chevron, which
                is far too quiet a signal. Static label/value pair instead. */}
            <div className="row" style={{ minHeight: 56 }}>
              <span className="row__body">
                <span className="t-title-md" style={{ display: 'block' }}>Email</span>
                <span className="t-body-md c-on-surface-variant" style={{ display: 'block', marginTop: 2 }}>
                  {user.email}
                </span>
              </span>
            </div>
          </Card>
        </section>

        <section className="section">
          <SectionLabel>Addresses</SectionLabel>
          <Card flush>
            <RowLink
              icon={<span className="row__icon"><MapPin size={20} /></span>}
              title="My Addresses"
              onClick={() => navigate('/addresses')}
            />
          </Card>
        </section>

        <section className="section">
          <SectionLabel>Support</SectionLabel>
          <Card flush>
            <RowLink
              icon={<span className="row__icon"><LifeBuoy size={20} /></span>}
              title="Help & Support"
              onClick={() => navigate('/support')}
            />
          </Card>
        </section>

        <div className="mt-2xl">
          <Button variant="destructive" onClick={() => navigate('/sign-in')}>Sign Out</Button>
        </div>
      </div>
    </Shell>
  );
}
