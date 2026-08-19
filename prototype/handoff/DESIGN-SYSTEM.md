# PapaFix — Customer App · Design System Handoff

> **Scope: the customer app.** A technician app is planned and is not covered here. When it exists it will share this token layer and these components — only the screens differ.

**This file is written to be pasted into Claude Code (or any agent) as the spec for building the customer app UI.** It is self-contained: everything needed to build a screen correctly is below, without opening the prototype.

Companion files in this folder:

| File | What it is |
| --- | --- |
| `DESIGN-SYSTEM.md` | This spec. **Stack-neutral — start here whatever you are building in.** |
| `papafix-tokens.json` | Tokens as plain data. Feed to a Tailwind config, a Compose theme, a React Native StyleSheet, or any token pipeline. |
| `papafix-tokens.css` | Tokens as CSS custom properties. Use as a global stylesheet for web / React Native Web. |
| `papafix_theme.dart` | Tokens as a Flutter `ThemeData` + three `ThemeExtension`s. Drop into `lib/theme/`. |

**Pick the one that matches your stack and ignore the rest.** This spec assumes nothing about the framework: it gives numbers and rules, not widgets. Where it names a Flutter class (`NavigationBar`, `showModalBottomSheet`) that is a hint about the *behaviour* to reach for, not a requirement — the equivalent in your framework is fine.

Regenerate the token files after any change to `src/styles/tokens.css` with `npm run handoff`. **`src/styles/tokens.css` is the source of truth** — do not hand-edit the generated files.

---

## 0. The rules

These are the whole system. Everything below is detail.

1. **Nothing hardcodes a value.** No colour, size, radius, or spacing literal inside a widget. If you need one that does not exist, add it to the theme first, then use it. A hardcoded `Color(0xFF0B57D0)` is a bug even when it looks right.
2. **One component per job.** One button, one chip, one status pill, one card. Variants, never copies. If you are about to write a second button widget, you want a variant.
3. **Every list has four states.** `loaded`, `loading`, `empty`, `error` — all four are real render paths, not mockups. A screen that only handles `loaded` is not done.
4. **Minimum touch target is 48dp.** Not negotiable, including icon buttons that *look* smaller.
5. **One high-contrast action per screen.** If two things are shouting, neither is.

---

## 1. Colour

Hue is unchanged from the current production app. **Contrast is** — that was the single biggest problem. Secondary text went from roughly 2:1 to 8.2:1, and card borders from about 1.1:1 (invisible) to 3.1:1, which is why cards now read as cards.

### Primary — `ColorScheme.primary`

| Token | Hex | Role |
| --- | --- | --- |
| `--primary` | `#0B57D0` | Every primary action, every selected state |
| `--on-primary` | `#FFFFFF` | Content on primary |
| `--primary-container` | `#DCE6FA` | Icon tiles, nav indicator, selected cards |
| `--on-primary-container` | `#0A2E6B` | Content on primaryContainer |

> The old primary was `#3B82F6`, which gives white text 3.1:1 — a **fail** for body text under WCAG AA. `#0B57D0` gives 7.0:1 and still reads as the same blue.

### Secondary / brand accent — `ColorScheme.secondary`

| Token | Hex | Role |
| --- | --- | --- |
| `--accent` | `#C2410C` | 5.0:1 on white, safe for text |
| `--on-accent` | `#FFFFFF` | Content on accent |
| `--accent-container` | `#FFEDD5` | Aircon icon tiles |
| `--on-accent-container` | `#7C2D12` | Content on accentContainer |

> **Orange is fenced.** The logo is orange and the app is blue, so the orange is a real ramp — but it is a *secondary*. Blue carries every primary action and every selected state. Orange appears on the aircon category and brand surfaces, and nowhere else. Tinting Electrical amber was tried and reverted: `--warning-container` and `--accent-container` are close enough that side by side in a list they read as the same colour, which defeats the point. **Question any third use.**

### Surfaces

| Token | Hex | Role |
| --- | --- | --- |
| `--surface` | `#FFFFFF` | Cards, sheets, fields |
| `--surface-container-lowest` | `#F5F6F1` | The page ground (warm off-white — keep it, it is a large part of how the app currently feels) |
| `--surface-container` | `#EDEEE9` | Segmented tracks, muted tiles, disabled fills |
| `--on-surface` | `#1A1C19` | Body and headings |
| `--on-surface-variant` | `#494C47` | Secondary text — 8.2:1, was ~2:1 |
| `--outline` | `#B9BCB6` | Field and chip borders |
| `--outline-variant` | `#DEE0DA` | Card borders, dividers |

### Status — a `StatusColors` ThemeExtension

| Token | Hex | Used by |
| --- | --- | --- |
| `--error` / `--on-error` | `#B3261E` / `#FFFFFF` | Destructive only |
| `--error-container` / `--on-error-container` | `#FCEEEE` / `#8C1D18` | |
| `--success` / `--success-container` | `#146C43` / `#DFF3E6` | Paid, Resolved |
| `--warning` / `--warning-container` | `#8A5300` / `#FDF0DC` | Open tickets, star ratings |
| `--neutral` / `--neutral-container` | `#494C47` / `#EDEEE9` | Coming soon |

### Gradients — `LinearGradient(begin: topLeft, end: bottomRight)`

Only three exist. A gradient is a brand moment, not a decoration. **Allowed on: the screen hero, the primary button, and the onboarding art panels. Nowhere else.**

```
--gradient-primary: #1565E0 0%  →  #0B57D0 45%  →  #073B8F 100%
--gradient-accent:  #F97316 0%  →  #E8590C 55%  →  #C2410C 100%
--gradient-wash:    #DCE6FA 0%  →  transparent 100%   (vertical)
```

---

## 2. Typography — `TextTheme`

Eight steps, up from roughly three in production. The old app used **size alone** to signal hierarchy; these pair size with weight, so a title still outranks its metadata after both are scaled by the OS font setting.

| Class | Flutter | Size / Line | Weight | Tracking | Use |
| --- | --- | --- | --- | --- | --- |
| `.t-headline-lg` | `headlineLarge` | 30 / 36 | 700 | −0.7 | Screen titles |
| `.t-headline-sm` | `headlineSmall` | 22 / 28 | 700 | −0.4 | Identity blocks, sheet prices |
| `.t-title-lg` | `titleLarge` | 18 / 24 | 600 | −0.2 | Card titles |
| `.t-title-md` | `titleMedium` | 16 / 22 | 600 | 0 | Row titles, buttons |
| `.t-body-lg` | `bodyLarge` | 16 / 24 | 400 | 0 | Inputs, lead paragraphs |
| `.t-body-md` | `bodyMedium` | 14 / 20 | 400 | 0 | Metadata, helper text |
| `.t-label-lg` | `labelLarge` | 14 / 20 | 600 | 0 | Chips |
| `.t-label-sm` | `labelSmall` | 12 / 16 | 600 | +0.8, **uppercase** | Section labels, status pills |

Family: `Roboto` (system default on Android). Never set a font size inline — use the step.

**Negative tracking on the headlines is deliberate.** It is most of what separates a heading that reads as *designed* from one that is merely large.

---

## 3. Spacing, radius, elevation

### Spacing — an `AppSpacing` ThemeExtension, 4pt base

`xs 4` · `sm 8` · `md 12` · `lg 16` · `xl 20` · `2xl 24` · `3xl 32` · `4xl 40`

The page gutter is `xl` (20). It matches production's ~20dp, so screens do not shift horizontally versus the current build.

### Radius — an `AppRadii` ThemeExtension

| Token | Value | Only for |
| --- | --- | --- |
| `--radius-sm` | 8 | Tags, small inner tiles |
| `--radius-md` | 12 | Icon tiles |
| `--radius-lg` | 16 | Cards, fields, sheets |
| `--radius-xl` | 22 | Hero surfaces, the lifted sheet, bottom sheets |
| `--radius-full` | 999 | **Buttons**, chips, avatars, bottom nav, status pills |

> **One shape language.** Buttons, chips and the nav are all fully rounded — the same family. Mixed radii are the fastest way to make a careful layout look accidental.

### Elevation — `BoxShadow` lists

The border does the structural work; the shadow is additive and deliberately soft. Two layers each — a tight contact shadow plus a wide ambient one — which is what stops it looking like a 2010 box-shadow.

```
--elevation-1  0 1px 2px rgba(26,28,25,.05), 0 1px 3px rgba(26,28,25,.04)   cards
--elevation-2  0 2px 4px rgba(26,28,25,.05), 0 6px 14px rgba(26,28,25,.07)  hover / raised
--elevation-3  0 6px 20px rgba(26,28,25,.12)                                nav, sheets
--elevation-primary  0 4px 12px rgba(11,87,208,.30)                         under a filled blue button
--elevation-accent   0 4px 12px rgba(194,65,12,.28)                         under a filled orange button
```

> A **grey** shadow under a saturated fill always looks muddy. Filled buttons get a shadow tinted to their own hue.

### Layout constants

| Token | Value | Meaning |
| --- | --- | --- |
| `--touch-target-min` | 48 | Hard floor for anything interactive |
| `--bottom-nav-height` | 64 | The floating nav pill |
| `--bottom-nav-inset` | 24 | Gap to the screen edge — clears the gesture bar |
| `--status-bar-height` | 30 | Reserved at the top of every screen (`MediaQuery.padding.top`) |
| `--gesture-bar-space` | 18 | Reserved at the bottom of sticky bars |
| `--list-bottom-clearance` | nav height + inset + 20 | Bottom padding on any list under the nav |

---

## 4. Components

### Button

Height **56**, `--radius-full`, padding `0 24`, full width by default. Icon gap 8.

| Variant | Fill | Border | Label | Shadow |
| --- | --- | --- | --- | --- |
| `primary` | `--gradient-primary` | none | `--on-primary` | `--elevation-primary` |
| `outline` | `--surface` | 1px `--outline` | `--on-surface` | `--elevation-1` |
| `destructive` | `--surface` | 1px `--error` | `--error` | none |
| `onhero` | `--surface` | none | `--primary` | `--elevation-2` |
| **disabled** | `--surface-container` | none | `--on-surface-variant` | none |

Pressed: `translateY(1px)` and drop to `--elevation-1`.

> **Get the disabled state right.** Production renders it as white on 40%-opacity blue, so the label is unreadable at exactly the moment it is telling the user what is missing. It must stay legible, and its label should name the missing thing ("Select your unit"), not say "Next".

`onhero` exists because on a brand-coloured hero a blue button disappears. It inverts: white fill, blue label.

### Field

Height **58**, `--radius-lg`, padding `16 20`, 1px `--outline`, `--surface` fill.
Focus: border `--primary` + 3px `--primary-container` ring.
Error: border `--error`.
Placeholder: `--on-surface-variant` at 60% opacity.

- **Leading glyph** (mail, padlock): left padding becomes 56. Not decoration — a column of identical rounded rectangles is unreadable until every label has been parsed, and a mail icon is recognised before a label is read.
- **Trailing affix** (show/hide password): a 48 square button, right inset 8.
- Label above in `.t-label-sm`. Helper/error below in `.t-body-md`. Character counter right-aligned below.
- Textarea: min-height 132, vertical resize only.

> Never use a row of dots as a password placeholder — it reads as an already-filled field. Use real hint text.

### Card

Padding **20**, `--radius-lg`, 1px `--outline-variant`, `--surface`, `--elevation-1`.
Tappable: hover raises to `--elevation-2`; pressed is `translateY(1px)`.
Selected: 2px `--primary` border, `--primary-container` fill (padding compensates by 1).
Inert / "coming soon": transparent fill, **dashed** `--outline` border, no shadow — reads as "not yet", not as a card that failed to load.

### Chip · Tag · StatusPill — three different jobs

| | Shape | Meaning | Notes |
| --- | --- | --- | --- |
| **Chip** | pill, 48 tall, padding `0 20` | **Selectable** | Selected = `--primary` fill + `--elevation-primary` |
| **Tag** | `--radius-sm`, small | **Read-only** breadcrumb | Deliberately *not* pill-shaped |
| **StatusPill** | pill + 6px dot | **Reports state** | One component, five roles |

> Production drew all three almost identically. If they look alike, people tap the ones that do nothing.

StatusPill roles: `paid`→success, `scheduled`→info(primary), `open`→warning, `resolved`→success, `soon`→neutral.

### Row (list tile)

Min-height **60**, padding `16 20`, 16 gap. Leading icon tile 40×40 `--radius-md`; `--lg` variant is 48×48 `--radius-lg`. Trailing chevron in `--on-surface-variant`. Divider inset 20.

### Bottom navigation

Floating pill: `--radius-full`, `--surface`, 1px `--outline-variant`, `--elevation-3`, inset 20 from the sides and 24 from the bottom.
**Active tab draws an indicator pill** (58×30, `--primary-container`) behind the icon — Flutter's `NavigationBar` gives this for free, do not hand-roll it.

> Colour alone was the only active signal before. That is the one signal a colour-blind user does not receive.

A gradient scrim sits behind the nav so list rows fade out under it rather than showing through the gaps either side of the pill.

### Bottom sheet — `showModalBottomSheet`

Scrim `rgba(26,28,25,.45)`. Panel: `--surface`, `--radius-xl` top corners, max-height 80%, 40×4 grabber, bottom padding includes `--gesture-bar-space`.

### The four states

| State | Render |
| --- | --- |
| **loading** | Shimmer skeletons matching the real row shape — not a spinner |
| **empty** | 72px circular icon, title, ≤30ch body, optional action |
| **error** | Same shape, warning icon, the actual message, **Try again** |
| **loaded** | The list |

---

## 5. Screen scaffold

**Every screen** is a coloured hero over a lifted sheet:

```
Scaffold(backgroundColor: heroColour)
└── Column
    ├── hero          // flex 0 — brand gradient, white content
    └── Expanded
        └── sheet     // --surface-container-lowest,
                      // --radius-xl top corners,
                      // THE ONLY SCROLLABLE
```

**The sheet being the only scrollable is load-bearing.** Before it, each screen scrolled its whole self, so the title, the search box and the filter chips all travelled up under nothing, and list rows ran beneath the floating nav. Now the header stays put and the sheet reserves `--list-bottom-clearance` so the last row is always readable.

Hero content inverts: back button, titles, step progress, outline buttons, search field and segmented control all get white/translucent-white treatments. Tab screens (no back button) get extra top padding so content does not start hard against the status bar.

The hero runs **under** the status bar — set `SystemUiOverlayStyle` per route (light icons everywhere; dark on Onboarding, whose top is a light surface).

---

## 6. Screen inventory

| Route | Notes |
| --- | --- |
| `/onboarding` | 3 slides, `PageView`. Skip visible from frame one. Gate on a `seen_onboarding` bool in SharedPreferences, written on finish **or** skip — not on sign-in, or a signed-out user sees it every launch. |
| `/sign-in`, `/sign-up` | Brand hero + white sheet. No logo — wordmark as type. |
| `/home` | Hero holds greeting + the primary action as an `onhero` button. Sheet holds next appointment + two tiles. |
| `/bookings` | Title + search live in the hero. Filters collapse into one icon button with a count badge, opening a bottom sheet. Applied filters return as removable tags; defaults stay silent. |
| `/profile` | Identity block on the hero, settings on the sheet. |
| `/addresses`, `/support` | Hero = back + title (+ action / segmented tabs). |
| `/book` → `/book/:cat/{unit,issue,details,technician}` | 4 steps. Hero = back + step progress + title. Sticky CTA below the sheet. |

---

## 7. Do not

- Do not hardcode a colour, size, radius, or spacing literal in a widget.
- Do not add a third use of orange.
- Do not add a gradient outside the three sanctioned places.
- Do not make a tappable target smaller than 48dp.
- Do not ship a list that handles only the loaded state.
- Do not use colour as the only signal for anything.
- Do not scroll a whole screen when it has a header — scroll the sheet.
- Do not port anything from `src/mock/`, the device mock, the top bar, the screen index, or the "Preview lists as" control. **All prototype chrome.**

---

## 8. Known data problems (not layout problems)

- **Technicians with no name** render as "Technician", so two different people with different photos and stats show identical titles. No layout fixes this — the field needs a value, or the app needs a rule (first name, or "PapaFix Technician #4").
- The **time filter** on My Bookings is presentational in the prototype; it does not filter the mock data.
- Booking step 4 ends by navigating to My Bookings, matching production. There is no confirmation screen — that was not invented.
