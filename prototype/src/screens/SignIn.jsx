import { useNavigate, Link } from 'react-router-dom';
import { Button, Field, LinkButton, Divider, TextInput, PasswordInput } from '../components/ui.jsx';
import { Mail, Lock, Google, ArrowRight } from '../components/Icons.jsx';

/* Sign In — brand-colour hero over a white sheet.
 *
 * No logo here by choice: the wordmark set as type is legible at any size and
 * the colour already says whose app this is. The icon still exists on the
 * store listing and the launcher, which is where a user has just seen it.
 *
 * The hero stays put while the sheet scrolls, so the screen keeps its
 * identity when the keyboard pushes the form up — the old layout scrolled the
 * branding off the top the moment a field was focused.
 */
export default function SignIn() {
  const navigate = useNavigate();

  return (
    <div className="auth">
      <header className="auth__hero">
        <p className="auth__brand t-title-md">PapaFix</p>

        <div className="auth__greeting" style={{ marginTop: 'var(--space-2xl)' }}>
          <h1 className="t-headline-lg">Welcome back</h1>
          <p className="t-body-lg" style={{ marginTop: 'var(--space-sm)' }}>
            Sign in to book a technician.
          </p>
        </div>
      </header>

      <div className="auth__sheet">
        <div className="stack gap-lg">
          <Field label="Email address">
            <TextInput
              lead={<Mail size={20} />}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
            />
          </Field>

          {/* Production used a row of dots as the PLACEHOLDER, which reads
              as an already-filled password. Real hint text instead. */}
          <Field label="Password">
            <PasswordInput
              lead={<Lock size={20} />}
              autoComplete="current-password"
              placeholder="Enter your password"
            />
          </Field>

          {/* Recovery sits after the field, not above it: you only reach for
              it once the password you tried has failed. */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'calc(var(--space-lg) * -1)' }}>
            <LinkButton>Forgot password?</LinkButton>
          </div>

          <Button onClick={() => navigate('/home')}>
            Sign In <ArrowRight size={20} />
          </Button>

          <Divider />

          <Button variant="outline">
            <Google /> Continue with Google
          </Button>

          <p className="text-center t-body-md c-on-surface-variant">
            Don&apos;t have an account? <Link to="/sign-up">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
