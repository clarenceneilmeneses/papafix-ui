# PapaFix — Customer App UI Reference

A working visual reference for the PapaFix customer app, built to be handed to a mobile developer. **It is a prototype, not shippable app code** — the point is that every screen, state and token is pinned down before the app is built.

> **Scope: the customer app.** A technician app is planned. It will share this token layer and these components; only the screens differ.

---

## Run it

```bash
cd prototype
npm install
npm run dev          # http://localhost:5173
```

Open it on a phone with the Network URL that `npm run dev` prints (same Wi-Fi) to see it at real device size.

On desktop it renders inside a device mock that scales to fit the window, so the whole screen is visible at 100% browser zoom. Below 900px wide the mock disappears and the app fills the viewport.

---

## What is in here

| Path | What it is |
| --- | --- |
| `prototype/` | The Vite + React prototype. |
| `prototype/handoff/` | **The deliverable for the dev.** Spec + tokens in four formats. |
| `prototype/src/styles/tokens.css` | **The single source of truth** for every design value. |
| `mobile customer/` | Screenshots of the current production app — the "before". |

---

## For the mobile developer

Start with **`prototype/handoff/DESIGN-SYSTEM.md`**. It is written to be pasted into Claude Code (or any agent) as the build spec, and it is self-contained — you do not need to read the prototype source to build a screen correctly.

Then take the one token file that matches your stack and ignore the rest:

| File | Use it if |
| --- | --- |
| `papafix-tokens.json` | Any stack — Tailwind config, Compose theme, React Native StyleSheet, token pipeline |
| `papafix-tokens.css` | Web / React Native Web |
| `papafix_theme.dart` | Flutter (`MaterialApp(theme: papaFixTheme())`) |

All of them are **generated** from `prototype/src/styles/tokens.css`. Never hand-edit them — change the token and run:

```bash
npm run handoff
```

The running prototype also has a **Style guide** page (link in the top bar) that renders every colour, type step, component and state live, reading its values from the stylesheet at runtime so it cannot drift from the code.

---

## What is prototype chrome, and must not be ported

Everything outside the phone screen, plus the fake data layer:

- the top bar, the screen index, the device mock, the status bar and gesture bar
- the **"Preview lists as"** control — it forces every list into `loaded` / `loading` / `empty` / `error` so all four states can be reviewed on every screen. The app has no such switch.
- `prototype/src/mock/` — the fake API and its 700ms delay

---

## The rules the design follows

1. **Nothing hardcodes a value.** No colour, size, radius or spacing literal in a component.
2. **One component per job.** One button, one chip, one status pill. Variants, never copies.
3. **Every list has four states.** Loaded, loading, empty, error — all real render paths.
4. **Minimum touch target is 48dp.**
5. **One high-contrast action per screen.**

---

## Known data problems (not layout problems)

- **Technicians with no name** render as "Technician", so two different people show identical titles. No layout fixes this — the field needs a value, or a naming rule.
- The **time filter** on My Bookings is presentational in the prototype; it does not filter the mock data.
- Booking step 4 ends by navigating to My Bookings, matching production. No confirmation screen was invented.

---

## Note on the sample data

The mock data and the screenshots in `mobile customer/` come from a real QA account and include real technician names, photos and a test email address. This repository is public. Swap them for placeholders if that matters to you.
