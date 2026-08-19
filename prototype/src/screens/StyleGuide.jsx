import { useEffect, useState } from 'react';
import {
  Card, Button, Chip, Tag, StatusPill, SectionLabel, Field, TextInput,
  PasswordInput, StepProgress, EmptyState, ErrorState, SkeletonList,
  RowLink, Avatar, Divider, LinkButton,
} from '../components/ui.jsx';
import {
  Mail, Lock, MapPin, Wrench, Droplet, Bolt, Snowflake, ChevronRight,
  Receipt, Calendar, Star, Sparkle, ArrowRight,
} from '../components/Icons.jsx';

/* THE STYLE GUIDE.
 *
 * Every value below is read from the live stylesheet at runtime rather than
 * typed in here, so this page cannot drift from tokens.css. If you change a
 * token, this page changes with it. If a swatch here looks wrong, the token
 * is wrong — not the guide.
 */
function useTokens(names) {
  const [values, setValues] = useState({});
  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const out = {};
    names.forEach((n) => { out[n] = styles.getPropertyValue(n).trim(); });
    setValues(out);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return values;
}

const COLOURS = [
  ['--primary', 'ColorScheme.primary', 'Every primary action, every selected state.'],
  ['--on-primary', 'ColorScheme.onPrimary', 'Text and icons on primary.'],
  ['--primary-container', 'ColorScheme.primaryContainer', 'Icon tiles, nav indicator, selected cards.'],
  ['--on-primary-container', 'ColorScheme.onPrimaryContainer', 'Content on primaryContainer.'],
  ['--accent', 'ColorScheme.secondary', 'Aircon + brand only. Never a third use.'],
  ['--accent-container', 'ColorScheme.secondaryContainer', 'Aircon icon tiles.'],
  ['--surface', 'ColorScheme.surface', 'Cards, sheets, fields.'],
  ['--surface-container-lowest', 'surfaceContainerLowest', 'The page ground.'],
  ['--surface-container', 'surfaceContainerHighest', 'Segmented tracks, muted tiles.'],
  ['--on-surface', 'ColorScheme.onSurface', 'Body and headings.'],
  ['--on-surface-variant', 'onSurfaceVariant', 'Secondary text. 8.2:1 — was 2.1:1.'],
  ['--outline', 'ColorScheme.outline', 'Field and chip borders.'],
  ['--outline-variant', 'outlineVariant', 'Card borders, dividers.'],
  ['--error', 'ColorScheme.error', 'Destructive only.'],
  ['--success', 'StatusColors.success', 'Paid, resolved.'],
  ['--warning', 'StatusColors.warning', 'Open tickets, ratings.'],
];

const TYPE = [
  ['t-headline-lg', 'headlineLarge', 'Screen titles.'],
  ['t-headline-sm', 'headlineSmall', 'Identity blocks, sheet prices.'],
  ['t-title-lg', 'titleLarge', 'Card titles.'],
  ['t-title-md', 'titleMedium', 'Row titles, buttons.'],
  ['t-body-lg', 'bodyLarge', 'Inputs, lead paragraphs.'],
  ['t-body-md', 'bodyMedium', 'Metadata, helper text.'],
  ['t-label-lg', 'labelLarge', 'Chips.'],
  ['t-label-sm', 'labelSmall', 'Section labels, pills. Uppercase + tracking.'],
];

const SPACING = ['--space-xs', '--space-sm', '--space-md', '--space-lg', '--space-xl', '--space-2xl', '--space-3xl', '--space-4xl'];
const RADII = ['--radius-sm', '--radius-md', '--radius-lg', '--radius-xl', '--radius-full'];

function Swatch({ name, role, note, value }) {
  const light = ['--on-primary', '--surface', '--surface-container-lowest', '--surface-container', '--outline-variant', '--accent-container', '--primary-container'].includes(name);
  return (
    <div className="sg-swatch">
      <span
        className="sg-swatch__chip"
        style={{ background: `var(${name})`, color: light ? 'var(--on-surface)' : '#fff' }}
      >
        {value}
      </span>
      <div style={{ minWidth: 0 }}>
        <p className="t-title-md">{name}</p>
        <p className="t-body-md c-on-surface-variant">{role}</p>
        <p className="t-body-md c-on-surface-variant" style={{ opacity: 0.8 }}>{note}</p>
      </div>
    </div>
  );
}

function Block({ id, title, lead, children }) {
  return (
    <section className="sg-block" id={id}>
      <h2 className="t-headline-sm">{title}</h2>
      {lead && <p className="t-body-lg c-on-surface-variant sg-block__lead">{lead}</p>}
      {children}
    </section>
  );
}

export default function StyleGuide() {
  const tokens = useTokens([
    ...COLOURS.map((c) => c[0]),
    ...SPACING,
    ...RADII,
    ...TYPE.flatMap((t) => {
      const base = `--${t[0].replace('t-', '')}`;
      return [`${base}-size`, `${base}-line`, `${base}-weight`];
    }),
  ]);

  return (
    <div className="sg">
      <header className="sg-head">
        <p className="t-label-sm c-on-surface-variant">For the mobile dev</p>
        <h1 className="t-headline-lg" style={{ marginTop: 'var(--space-sm)' }}>
          PapaFix design system
        </h1>
        <p className="t-body-lg c-on-surface-variant" style={{ marginTop: 'var(--space-md)', maxWidth: '62ch' }}>
          Every value on this page is read from the live stylesheet at runtime, so it
          cannot drift from the code. Names map 1:1 onto Flutter&apos;s ThemeData, so the
          port is a rename, not a redesign.
        </p>

        <div className="sg-files">
          {[
            ['DESIGN-SYSTEM.md', '/handoff/DESIGN-SYSTEM.md', 'Start here',
              'The whole system in writing: the rules, every token with its role, component specs with exact numbers, the screen scaffold and inventory, and an explicit "do not" list. Stack-neutral — paste it into Claude Code whatever you are building in.'],
            ['papafix-tokens.json', '/handoff/papafix-tokens.json', 'Any stack',
              'Every token as plain data — colour, type, spacing, radius, elevation, layout constants. Feed it to a Tailwind config, a Compose theme, a React Native StyleSheet, or any token pipeline.'],
            ['papafix-tokens.css', '/handoff/papafix-tokens.css', 'Web / RN Web',
              'The same tokens as CSS custom properties. Drop in as your global stylesheet and reference them with var(--token).'],
            ['papafix_theme.dart', '/handoff/papafix_theme.dart', 'Flutter only',
              'The same tokens as a ThemeData, plus AppSpacing / AppRadii / StatusColors extensions, gradients and shadow lists. MaterialApp(theme: papaFixTheme()). Skip this file if you are not on Flutter.'],
          ].map(([file, href, tag, desc]) => (
            <a className="sg-file" key={href} href={href} download>
              <div className="sg-file__head">
                <span className="t-title-md">{file}</span>
                <span className="tag t-label-sm">{tag}</span>
              </div>
              <p className="t-body-md c-on-surface-variant sg-file__desc">{desc}</p>
              <span className="sg-file__cta t-label-lg">Download</span>
            </a>
          ))}
        </div>

        <p className="t-body-md c-on-surface-variant" style={{ marginTop: 'var(--space-lg)' }}>
          All four are generated from <code>src/styles/tokens.css</code>, which is the single
          source of truth — regenerate with <code>npm run handoff</code> and never hand-edit them.
        </p>

        <div className="sg-rules">
          <Card>
            <h3 className="t-title-md">The three rules</h3>
            <ol className="sg-list t-body-md">
              <li><b>Nothing hardcodes a value.</b> No colour, size, radius or spacing literal in a widget. If you need one that is not here, add it to the theme first.</li>
              <li><b>One component per job.</b> There is one button, one chip, one status pill. Variants, never copies.</li>
              <li><b>Every list has four states.</b> Loaded, loading, empty, error. Use the State control in the top bar to see all four on every screen.</li>
            </ol>
          </Card>
        </div>
      </header>

      {/* ------------------------------------------------------ colour --- */}
      <Block
        id="colour"
        title="Colour"
        lead="Hue is unchanged from the current app. Contrast is not: secondary text went from roughly 2:1 to 8.2:1, and card borders from about 1.1:1 to 3.1:1, which is why cards now read as cards."
      >
        <div className="sg-grid">
          {COLOURS.map(([name, role, note]) => (
            <Swatch key={name} name={name} role={role} note={note} value={tokens[name]} />
          ))}
        </div>
        <Card className="mt-xl" style={{ borderLeft: '3px solid var(--accent)' }}>
          <p className="t-title-md">On the orange</p>
          <p className="t-body-md c-on-surface-variant mt-md">
            The logo is orange and the app is blue, so the orange is a real ramp — but it
            is a <b>secondary</b>. Blue carries every primary action and every selected
            state. Orange appears on the aircon category and nothing else. I tried tinting
            Electrical amber too; <code>--warning</code> and <code>--accent</code> containers
            are close enough that side by side in a list they read as the same colour, which
            defeated the point. Question any third use.
          </p>
        </Card>
      </Block>

      {/* -------------------------------------------------- typography --- */}
      <Block
        id="type"
        title="Typography"
        lead="Eight steps, up from roughly three. The old app used size alone to signal hierarchy; these pair size with weight, so a title still outranks its metadata after both are scaled by the OS font setting."
      >
        <div className="sg-type">
          {TYPE.map(([cls, flutter, use]) => {
            const base = `--${cls.replace('t-', '')}`;
            return (
              <div className="sg-type__row" key={cls}>
                <div className="sg-type__meta">
                  <p className="t-title-md">{flutter}</p>
                  <p className="t-body-md c-on-surface-variant">.{cls}</p>
                  <p className="t-body-md c-on-surface-variant">
                    {tokens[`${base}-size`]} / {tokens[`${base}-line`]} · w{tokens[`${base}-weight`]}
                  </p>
                  <p className="t-body-md c-on-surface-variant" style={{ opacity: 0.8 }}>{use}</p>
                </div>
                <p className={cls}>Book a technician</p>
              </div>
            );
          })}
        </div>
      </Block>

      {/* ---------------------------------------------- spacing, radius --- */}
      <Block
        id="spacing"
        title="Spacing & radius"
        lead="A 4pt base. The page gutter is --space-xl. Radius is four steps and each has one job — get them wrong and everything looks subtly off even when the colours are right."
      >
        <div className="sg-cols">
          <div>
            <SectionLabel>Spacing</SectionLabel>
            <div className="sg-scale">
              {SPACING.map((n) => (
                <div className="sg-scale__row" key={n}>
                  <span className="t-body-md" style={{ width: 120 }}>{n.replace('--space-', '')}</span>
                  <span className="t-body-md c-on-surface-variant" style={{ width: 56 }}>{tokens[n]}</span>
                  <span className="sg-bar" style={{ width: `var(${n})` }} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionLabel>Radius</SectionLabel>
            <div className="sg-radii">
              {RADII.map((n) => (
                <div className="sg-radii__item" key={n}>
                  <span className="sg-radii__box" style={{ borderRadius: `var(${n})` }} />
                  <p className="t-body-md">{n.replace('--radius-', '')}</p>
                  <p className="t-body-md c-on-surface-variant">{tokens[n]}</p>
                </div>
              ))}
            </div>
            <SectionLabel style={{ marginTop: 'var(--space-xl)' }}>Elevation</SectionLabel>
            <div className="sg-elev">
              <span className="sg-elev__box" style={{ boxShadow: 'var(--elevation-1)' }}>1 · cards</span>
              <span className="sg-elev__box" style={{ boxShadow: 'var(--elevation-2)' }}>2 · hover</span>
              <span className="sg-elev__box" style={{ boxShadow: 'var(--elevation-3)' }}>3 · nav, sheets</span>
            </div>
          </div>
        </div>
      </Block>

      {/* ------------------------------------------------- components ---- */}
      <Block
        id="buttons"
        title="Buttons"
        lead="Minimum height 56, full width, fully rounded — the same shape family as the chips and the nav. The disabled state is the one to get right — the current app renders it as white on 40%-opacity blue, so the label is unreadable at exactly the moment it is telling you what is missing."
      >
        <div className="sg-specimens">
          <div className="sg-specimen">
            <Button>Primary</Button>
            <p className="t-body-md c-on-surface-variant">FilledButton · the one action per screen</p>
          </div>
          <div className="sg-specimen">
            <Button variant="outline">Outline</Button>
            <p className="t-body-md c-on-surface-variant">OutlinedButton · secondary</p>
          </div>
          <div className="sg-specimen">
            <Button variant="destructive">Sign Out</Button>
            <p className="t-body-md c-on-surface-variant">Destructive · error border, never filled</p>
          </div>
          <div className="sg-specimen">
            <Button disabled>Select your unit</Button>
            <p className="t-body-md c-on-surface-variant">Disabled · readable, and names what is missing</p>
          </div>
          <div className="sg-specimen">
            <Button>Continue <ArrowRight size={20} /></Button>
            <p className="t-body-md c-on-surface-variant">With trailing glyph</p>
          </div>
          <div className="sg-specimen">
            <div style={{ background: 'var(--gradient-primary)', padding: 'var(--space-lg)', borderRadius: 'var(--radius-lg)' }}>
              <Button variant="onhero">On hero</Button>
            </div>
            <p className="t-body-md c-on-surface-variant">Inverted, for use on the brand colour</p>
          </div>
        </div>
      </Block>

      <Block
        id="selection"
        title="Chips, tags & status"
        lead="Three different jobs that the current app draws almost identically. A chip is selectable, a tag is read-only, a pill reports state. If they look alike, people tap the ones that do nothing."
      >
        <div className="sg-specimens">
          <div className="sg-specimen">
            <div className="chip-wrap">
              <Chip selected>Selected</Chip>
              <Chip>Unselected</Chip>
            </div>
            <p className="t-body-md c-on-surface-variant">Chip · FilterChip. Selectable, 48px target.</p>
          </div>
          <div className="sg-specimen">
            <div className="tag-row">
              <Tag>Plumbing</Tag>
              <Tag>Leaking Pipe</Tag>
            </div>
            <p className="t-body-md c-on-surface-variant">Tag · read-only breadcrumb. Squarer on purpose.</p>
          </div>
          <div className="sg-specimen">
            <div className="tag-row">
              <StatusPill status="paid" />
              <StatusPill status="scheduled" />
              <StatusPill status="open" />
              <StatusPill status="resolved" />
              <StatusPill status="soon" />
            </div>
            <p className="t-body-md c-on-surface-variant">StatusPill · one component, five roles.</p>
          </div>
        </div>
      </Block>

      <Block
        id="fields"
        title="Fields"
        lead="Leading glyphs are not decoration: a column of identical rounded rectangles is unreadable until you have parsed every label, and a mail icon is recognised before a label is read."
      >
        <div className="sg-cols">
          <div className="stack gap-lg">
            <Field label="Email address">
              <TextInput lead={<Mail size={20} />} placeholder="you@example.com" />
            </Field>
            <Field label="Password" help="At least 8 characters.">
              <PasswordInput lead={<Lock size={20} />} placeholder="Enter your password" />
            </Field>
            <Field label="Subject" error="Tell us what this is about.">
              <TextInput className="has-error" placeholder="Short summary" />
            </Field>
          </div>
          <div className="stack gap-lg">
            <Field label="Additional details (optional)" counter="0/500">
              <textarea className="field__textarea t-body-lg" placeholder="Pipe under the kitchen sink drips overnight…" />
            </Field>
            <div>
              <SectionLabel>Step progress</SectionLabel>
              <StepProgress current={2} total={4} />
            </div>
          </div>
        </div>
      </Block>

      <Block
        id="surfaces"
        title="Cards & rows"
        lead="Cards separate with a border plus a very soft shadow. The border does the structural work — it survives both themes and never washes out on the warm ground."
      >
        <div className="sg-cols">
          <div className="card-stack">
            <Card>
              <div className="row-start">
                <span className="row__icon"><Droplet size={20} /></span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="row-between">
                    <h3 className="t-title-lg">Leaking Pipe</h3>
                    <StatusPill status="paid" />
                  </div>
                  <p className="t-body-md c-on-surface-variant" style={{ marginTop: 2 }}>
                    Plumbing · qaqaqa
                  </p>
                </div>
              </div>
              <div className="row-between" style={{ marginTop: 'var(--space-lg)', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--outline-variant)' }}>
                <span className="t-body-md c-on-surface-variant">
                  <Calendar size={16} style={{ verticalAlign: '-3px', marginRight: 6 }} />12 Aug 2026
                </span>
                <span className="t-title-lg c-primary">₱600.00</span>
              </div>
            </Card>

            <Card as="button" selected>
              <span className="row-start" style={{ alignItems: 'center' }}>
                <span className="row__icon row__icon--lg" style={{ background: 'var(--primary)', color: 'var(--on-primary)' }}>
                  <Sparkle size={20} />
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span className="t-title-lg" style={{ display: 'block' }}>Selected card</span>
                  <span className="t-body-md" style={{ display: 'block', marginTop: 2 }}>2px primary border + container fill</span>
                </span>
                <span className="row__chev"><ChevronRight size={20} /></span>
              </span>
            </Card>

            <Card inert>
              <div className="row-between">
                <span className="row-start" style={{ alignItems: 'center' }}>
                  <span className="row__icon row__icon--muted row__icon--lg"><Wrench size={20} /></span>
                  <span className="t-title-lg c-on-surface-variant">Disabled / not yet</span>
                </span>
                <StatusPill status="soon" />
              </div>
            </Card>
          </div>

          <div>
            <Card flush>
              <RowLink icon={<span className="row__icon"><MapPin size={20} /></span>} title="My Addresses" onClick={() => {}} />
              <div className="divider" />
              <RowLink icon={<span className="row__icon row__icon--accent"><Snowflake size={20} /></span>} title="Aircon tile" value="accent" onClick={() => {}} />
              <div className="divider" />
              <RowLink icon={<span className="row__icon"><Bolt size={20} /></span>} title="Electrical tile" onClick={() => {}} />
            </Card>

            <div className="sg-inline mt-xl">
              <Avatar name="TestQA" />
              <Avatar name="Mercy Valencia" />
              <span className="pill pill--warning t-label-sm" style={{ letterSpacing: 0 }}>
                <Star size={13} />5.0
              </span>
              <LinkButton>Set default</LinkButton>
            </div>

            <div className="mt-xl"><Divider label="or browse manually" /></div>
          </div>
        </div>
      </Block>

      <Block
        id="states"
        title="The four states"
        lead="Every list renders all four. These are real render paths in the prototype, not mockups — flip the State control in the top bar and every screen changes with it."
      >
        <div className="sg-cols">
          <div>
            <SectionLabel>Loading</SectionLabel>
            <SkeletonList count={2} lines={2} />
          </div>
          <div>
            <SectionLabel>Empty</SectionLabel>
            <Card>
              <EmptyState
                icon={Receipt}
                title="No bookings yet"
                body="When you book a technician, the job will show up here."
              />
            </Card>
            <div className="mt-xl">
              <SectionLabel>Error</SectionLabel>
              <Card>
                <ErrorState body="Could not load your bookings." onRetry={() => {}} />
              </Card>
            </div>
          </div>
        </div>
      </Block>

      {/* ------------------------------------------------------- notes --- */}
      <Block
        id="craft"
        title="Why the plain references look expensive"
        lead="Worth naming, because it is repeatable and none of it is decoration."
      >
        <div className="sg-grid">
          <Card><p className="t-title-md">One accent, held back</p><p className="t-body-md c-on-surface-variant mt-md">The reference is greyscale plus one black. Restraint reads as confidence; a second accent halves the weight of the first. Ours is blue, with orange fenced to a single job.</p></Card>
          <Card><p className="t-title-md">Two weights, far apart</p><p className="t-body-md c-on-surface-variant mt-md">Bold headings against light-grey secondary text. The gap does the work — mid-grey semibold everywhere is what makes a screen read as flat.</p></Card>
          <Card><p className="t-title-md">Generous, even space</p><p className="t-body-md c-on-surface-variant mt-md">The padding inside those fields is larger than instinct suggests, and identical on every row. Rhythm reads as care.</p></Card>
          <Card><p className="t-title-md">Borders, barely there</p><p className="t-body-md c-on-surface-variant mt-md">Hairlines and soft fills, no heavy strokes or drop shadows. Depth comes from layering, not outlining.</p></Card>
          <Card><p className="t-title-md">One shape language</p><p className="t-body-md c-on-surface-variant mt-md">Everything is the same family of rounded rectangles. Mixed radii are the fastest way to make a careful layout look accidental.</p></Card>
          <Card><p className="t-title-md">The action is unmissable</p><p className="t-body-md c-on-surface-variant mt-md">Exactly one high-contrast element per screen. Everything else steps back so it can be the loudest thing.</p></Card>
        </div>
      </Block>

      <Block id="port" title="Porting notes">
        <Card>
          <ul className="sg-list t-body-md">
            <li><b>Tokens → ThemeData.</b> Colours to <code>ColorScheme</code>, type to <code>TextTheme</code>. Spacing, radii and status colours are three small <code>ThemeExtension</code>s — <code>AppSpacing</code>, <code>AppRadii</code>, <code>StatusColors</code>.</li>
            <li><b>Shell → Scaffold.</b> <code>Column[hero, Expanded(sheet)]</code>, the Scaffold background set to the hero colour, the sheet a Container with a vertical-only BorderRadius. The sheet is the only scrollable — this is what stops list rows running under the floating nav.</li>
            <li><b>Bottom nav → NavigationBar.</b> The indicator pill is built in; do not hand-roll it.</li>
            <li><b>Filters → showModalBottomSheet.</b> Collapsed behind one button with a count badge.</li>
            <li><b>Onboarding → PageView</b> with a <code>seen_onboarding</code> bool in SharedPreferences, written on finish <i>or</i> skip — not on sign-in, or signed-out users see it every launch.</li>
            <li><b>Status bar.</b> The hero runs under it; set <code>SystemUiOverlayStyle</code> per route (light everywhere, dark on Onboarding).</li>
            <li><b>Not in the app:</b> the top bar, the navigator pill, the device mock and the State control are prototype chrome. So is <code>mock/</code>.</li>
          </ul>
        </Card>
      </Block>
    </div>
  );
}
