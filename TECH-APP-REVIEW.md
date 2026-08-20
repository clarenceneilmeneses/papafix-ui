# PapaFix Technician App — review of the current build

Source: the 16 screenshots in `mobile tech/` (QA account, 18–20 Aug 2026).
Read against `prototype/src/styles/tokens.css`, which the README commits the
technician app to sharing.

Screens captured: Sign In · Add profile photo · Home · Jobs (All / Incoming /
Active / Completed / Missed) · Schedule (My Availability, sheet open and closed,
toggle on and off) · Profile · Earnings · Reviews · Help & Support (New message /
My messages).

Not captured anywhere: **loading states, error states, job detail, the active-job
flow (accept → travel → arrive → complete), and any push/notification surface.**
Five of the seven Jobs filters render empty, so most of this app is unproven.

---

## 1. The money does not agree between two screens

This is the most serious finding on the list and it is not a layout problem.

| Job | Jobs tab | Earnings tab |
| --- | --- | --- |
| Leaking Pipe · Plumbing | ₱600.00 | ₱500.00 |
| Sink Installation · Plumbing | ₱600.00 | ₱500.00 |
| Circuit Breaker · Electrical | ₱600.00 | ₱500.00 |
| Air Conditioner · Cleaning 2.5hp | ₱2,160.00 | ₱1,800.00 |
| Air Conditioner · Repair 2.5hp | ₱7,260.00 | ₱6,050.00 |

Every Jobs figure is **exactly 1.2×** its Earnings figure. So one screen is
showing what the customer pays and the other is showing what the technician
keeps — but both are rendered as a bare peso amount in the same weight, with no
qualifier anywhere on either screen.

A technician who finishes a ₱7,260 job and later sees ₱6,050 in Earnings has no
way to read that as anything except being shortchanged. Earnings is internally
consistent (the five listed plus a sixth ₱6,050 sum to the ₱15,400 header), so
the numbers are right — only the labelling is missing.

**Fix:** decide which number the technician's app is *about*, and say so in
words. Either the job card reads `You earn ₱500.00` with `Customer pays ₱600.00`
underneath, or the job card shows the payout only. The Earnings header should
name itself — `Your earnings` — not just `THIS MONTH`. Silence here is the bug.

---

## 2. The colour inversion is correct — but it is undocumented, and the orange fails contrast

The technician app runs orange as its **primary** (Sign In, Save, active nav
tab, selected chips, selected date, the toggle, the segmented control, the
Earnings hero, the greeting name) with a **blue** app icon. The customer app is
the mirror: blue primary, orange icon.

**This is deliberate** — the inversion is what lets someone with both installed
tell at a glance which app they opened. Nothing below argues with it.

The problem is that `tokens.css` does not know about it. The file currently
states, as a flat rule:

> `SECONDARY: blue still carries every primary action and every selected state.
> Orange appears on brand surfaces, the aircon category …`

That is true of the customer app and false of the technician app, and it is the
file the README sends the mobile developer to as *"the single source of truth"*.
A dev building the technician app from it will build the wrong colour roles.

**Fix:** keep one token file and add a theme flag that decides *which token
fills the primary role*, then rewrite that comment to describe both apps. One
palette, two role assignments — not two palettes that drift apart.

### 2a. The orange currently in use fails contrast

The buttons and orange text read as roughly `#F97316` (`--accent-bright`). White
on that is about **2.9:1** — below the 4.5:1 WCAG AA needs for normal text. This
is the exact defect `tokens.css` already documents and fixes for blue:

> `Was ~#3B82F6, which gives white text 3.1:1 (fails WCAG AA …)`

`--accent: #C2410C` is the AA-safe orange at 5.0:1 and already exists.

Affected: Sign In, Save, the `+ Add slot` label, the active nav labels
(`Home` / `Jobs` / `Schedule` / `Profile`), the selected chip labels
(`Booking`, `Incoming`, `Active`, `Completed 6`, `Missed 1`), and the greeting
name. All of these are orange-on-near-white or white-on-orange at the bright
value.

### 2b. The disabled button is unreadable

`Send Message` in its disabled state is white text on washed orange — roughly
1.6:1. Disabled controls are exempt from the AA minimum, but this is
unreadable rather than merely dim. Use a grey surface with grey text.

---

## 3. Two screens, two hierarchies, same two facts

- **Jobs card:** job title is primary (`Plumbing · Leaking Pipe`), customer name
  is the grey subtitle (`TestQA`).
- **Reviews card:** customer name is primary (`TestQA`), job is the grey
  subtitle (`Leaking Pipe · Plumbing`).

Same pair of fields, inverted. Also note the job string itself flips order:
`Plumbing · Leaking Pipe` on Jobs, `Leaking Pipe · Plumbing` on Reviews and
Earnings. Pick one order and one hierarchy.

---

## 4. Filter chips are clipped mid-word with no scroll affordance

On the Jobs tab the chip row scrolls horizontally, but:

- the left-most chip is cut mid-word — `Incoming` renders as `coming`
- `All 7` scrolls off entirely and nothing indicates it is still there
- `Missed 1` is clipped at the right edge on the default view

There is no edge fade, no peek, no indicator. A chip cut mid-word reads as a
rendering fault, not as "scroll me".

**Fix:** an edge fade mask on both sides, and scroll-snap so a chip is never cut
mid-word. Seven filters is also a lot — `All`, `Incoming`, `Active`,
`Completed`, `Missed` may be enough.

---

## 5. Empty states use two different shapes

- **Home:** empty state sits inside a bordered card.
- **Jobs (Active / Incoming / My messages):** bare centred text, no card.

Same concept, two treatments. Pick one — the card, since it reads as a slot that
will later hold content.

Home also says `No active jobs right now.` under the greeting and `No active
jobs` as the card title, twice in one viewport. Drop one.

---

## 6. Availability: you can publish a bookable day with zero bookable hours

With `Available this day` ON and `TIME SLOTS — No slots added yet`, **Save is
enabled**. That saves a day marked bookable with nothing to book. Either disable
Save with a reason, or define what an available day with no slots means and say
it on screen.

Related, on the same sheet:

- The sheet covers the calendar it refers to. With slots present it hides the
  legend entirely; with the toggle off, the legend is visible. The user loses
  sight of the month while editing a day in it.
- The legend lists three states — `Available` (green ring), `Off` (grey),
  `Today` (orange ring) — but the grid renders **five**: those three, plus
  *selected* (solid orange fill), plus a faint green tint on past available days
  (5, 6, 8, 12, 13). Today-and-selected also collapse into one appearance, so on
  the default view you cannot tell which of the two the orange means.

---

## 7. Content is clipped by the floating nav

On Jobs → All, the last card is cut by the floating bottom-nav pill with no
bottom padding, so it reads as broken rather than as more-to-scroll. The scroll
container needs a bottom inset of nav height + spacing.

---

## 8. Header patterns differ by depth

Root screens (Home, Jobs, Schedule) use a large left-aligned title with no back
control. Pushed screens (Earnings, Reviews, Help & Support) put a back chevron
on its own row above the title. That distinction is fine and conventional — but
the chevron is a ~24px glyph with no visible hit area. The README's own rule 4
sets a **48dp minimum touch target**; this looks under it.

---

## 9. Sign In is a dead end for anyone not yet approved

The screen says accounts are *"created and approved by PapaFix admin. Contact
support to apply."* — and offers no way to contact support. There is also no
forgot-password, no visible error state, and no loading state on the button.

The logo on this screen is the full poster asset — mascot, wordmark, tagline,
and `By NAM Builders and Supply Corp.` — rendered at roughly 390px wide. The
tagline is at the edge of legibility and the corporate line is below it. This is
the same problem the logo work is fixing; the mark and the wordmark should be
separate assets so this screen can use a clean mark plus real text.

---

## 10. Test data is hiding real layout risk

`qaqaqa`, `TestQA`, `teset`, and a phone value of `ABX` are QA fixtures — no
real names or numbers, which is good and is *not* the problem the README warns
about for `mobile customer/`.

The problem is that they are all short. `qaqaqa` in the greeting and as an
avatar fallback `Q` never tests what a real Filipino technician name does to
these layouts. Re-shoot, or review the prototype, with something like
`Juan Miguel Dela Cruz` in:

- the Home greeting (`Good afternoon, …` on one line)
- the profile title
- the avatar fallback (three initials? two? first only?)

Note the customer app has the mirror of this bug already logged in the README —
technicians with no name render as `Technician`. Same field, both sides.

Also `Phone  [Verified]  ABX` puts the verification pill *between* the label and
the value, which reads as a three-column row rather than a labelled value with a
badge.

---

## Suggested order of work

1. **Label the money** (§1). Trust bug, cheap fix, nothing else depends on it.
2. **Teach the token layer about the inversion, and fix the orange** (§2) — one
   token file, one theme flag, `#C2410C` instead of `#F97316`. Everything
   visual downstream depends on this, and the handoff doc is wrong until it is
   done.
3. **Availability save rule + legend** (§6). Real behavioural defect.
4. **Chip clipping, nav inset, empty-state shape** (§4, §5, §7). Mechanical.
5. **Unify the Jobs/Reviews hierarchy** (§3).
6. **Sign-in dead end + touch targets** (§8, §9).
7. **Prove loading and error states** — no screenshot shows either, and the
   customer prototype mandates all four list states.

## Housekeeping

- `mobile tech/773662fa-…-d905a27e7533 (1).jpe` is a byte-identical duplicate of
  the file next to it.
- The screenshots use the `.jpe` extension, which most tools and browsers will
  not preview. Renaming to `.jpg` costs nothing and makes the folder usable.
