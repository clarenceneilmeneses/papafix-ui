import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Field, TextInput, PasswordInput, Button, LinkButton, Card,
} from '../../components/ui.jsx';
import { Mail, Lock, LifeBuoy } from '../../components/Icons.jsx';
import { AppMark } from '../../components/AppMark.jsx';

/* Technician sign-in.
 *
 * Production's version was a dead end for the person most likely to be on it:
 * it said accounts are "created and approved by PapaFix admin. Contact
 * support to apply." and then offered no way to contact support. It also had
 * no forgot-password, no error state and no loading state on the button.
 * All four exist here. See TECH-APP-REVIEW.md §9.
 *
 * The logo is the MARK ONLY. Production rendered the full poster asset —
 * mascot, wordmark, tagline and "By NAM Builders and Supply Corp." — at about
 * 390px wide, where the tagline is at the edge of legibility. The wordmark is
 * real text now, so it stays sharp and can be translated.
 */
export default function TechSignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const submit = () => {
    setError(null);
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      /* Demonstrates the error path the prototype has to prove. Any other
         address signs in. */
      if (email.trim().toLowerCase() === 'wrong@papafix.ph') {
        setError('That email and password do not match an approved technician account.');
      } else {
        navigate('/tech/home');
      }
    }, 700);
  };

  return (
    <div className="screen screen--auth">
      <div className="auth">
        <div className="auth__hero">
          {/* Mark only — the wordmark below is real text. */}
          <AppMark size={88} />
          <h1 className="t-headline-lg mt-lg">PapaFix</h1>
          <p className="auth__greeting t-body-lg">Technician · work on your terms</p>
        </div>

        <div className="auth__sheet">
          <div className="page">
            {error && (
              <Card
                className="mb-lg"
                style={{
                  background: 'var(--error-container)',
                  borderColor: 'var(--error)',
                }}
              >
                <p className="t-body-lg" style={{ color: 'var(--on-error-container)' }}>
                  {error}
                </p>
              </Card>
            )}

            <Field label="Email">
              <TextInput
                lead={<Mail size={20} />}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="technician@email.com"
                autoComplete="username"
              />
            </Field>

            <div className="section">
              <Field label="Password">
                <PasswordInput
                  lead={<Lock size={20} />}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </Field>
              {/* Recovery sits after the field, not above it: you only reach
                  for it once the password you tried has failed. Same
                  placement as the customer app's Sign In. */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-sm)' }}>
                <LinkButton onClick={() => {}}>Forgot password?</LinkButton>
              </div>
            </div>

            <div className="section">
              <Button disabled={busy} onClick={submit}>
                {busy ? 'Signing in…' : 'Sign In'}
              </Button>
            </div>

            {/* The dead end, fixed: the sentence that tells you to contact
                support now carries the way to do it. */}
            <Card className="section" inert>
              <div className="row-start" style={{ gap: 'var(--space-md)', alignItems: 'flex-start' }}>
                <span className="row__icon"><LifeBuoy size={20} /></span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p className="t-body-md c-on-surface-variant">
                    Technician accounts are created and approved by a PapaFix
                    admin — there is no self sign-up.
                  </p>
                  <div className="mt-sm">
                    <LinkButton onClick={() => navigate('/tech/support')}>
                      Contact support to apply
                    </LinkButton>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
