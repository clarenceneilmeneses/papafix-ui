import { useNavigate, Link } from 'react-router-dom';
import { Button, Field, Divider, TextInput, PasswordInput } from '../components/ui.jsx';
import { Mail, Lock, Google, ArrowRight } from '../components/Icons.jsx';

/* Sign Up — the same hero-over-sheet structure as Sign In, so the two screens
   are obviously the same place with a different job. */
export default function SignUp() {
  const navigate = useNavigate();

  return (
    <div className="auth">
      <header className="auth__hero">
        <p className="auth__brand t-title-md">PapaFix</p>

        <div className="auth__greeting" style={{ marginTop: 'var(--space-2xl)' }}>
          <h1 className="t-headline-lg">Create account</h1>
          <p className="t-body-lg" style={{ marginTop: 'var(--space-sm)' }}>
            Book trusted repairs in minutes.
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

          {/* The 8-character rule lived only in the placeholder in production,
              so it vanished on the first keystroke — exactly when it starts
              mattering. It is persistent helper text now. */}
          <Field label="Password" help="At least 8 characters.">
            <PasswordInput
              lead={<Lock size={20} />}
              autoComplete="new-password"
              placeholder="Create a password"
            />
          </Field>

          <Field label="Confirm password">
            <PasswordInput
              lead={<Lock size={20} />}
              autoComplete="new-password"
              placeholder="Re-enter your password"
            />
          </Field>

          <Button onClick={() => navigate('/home')}>
            Create Account <ArrowRight size={20} />
          </Button>

          {/* Production broke this line mid-link: "Privacy" ended one line,
              "Policy." began the next, and only "Privacy" was underlined.
              nowrap keeps the link atomic. */}
          <p className="text-center t-body-md c-on-surface-variant">
            By creating an account you agree to our{' '}
            <a href="#privacy" style={{ whiteSpace: 'nowrap' }}>Privacy Policy</a>.
          </p>

          <Divider />

          <Button variant="outline">
            <Google /> Continue with Google
          </Button>

          <p className="text-center t-body-md c-on-surface-variant">
            Already have an account? <Link to="/sign-in">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
