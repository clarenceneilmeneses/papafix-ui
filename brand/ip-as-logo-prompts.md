# PapaFix IP mascot — six generation prompts

Generated with the `ip-as-logo` skill (s1dashu/ip-as-logo-skill), applied to the
existing `app-logo.png` / `tech-logo.png` mascot.

## Generation report

| Field | Value |
| --- | --- |
| Model / provider | Nano Banana Pro (Gemini 3 Pro Image), Google — via Gemini Pro |
| Constraint-delivery mode | `main-prompt constraints` (modern instruction-following model) |
| Batch | 6 independent candidates: 2 variants × 3 directions |
| Canvas | direct 1:1 square, requested ~1536 × 1536 |
| Colours per image | exactly 3 semantic: 2 IP base + 1 background |

### Directions

| Label | Direction | Defining feature | Product connection |
| --- | --- | --- | --- |
| A | Papa's head, glasses-led | one thick rounded glasses band | expertise / trust |
| B | Papa + one blunt wrench | one rounded wrench | the repair promise |
| C | Papa, mustache-led | one broad rounded mustache | the "papa" warmth |

### Colour mapping

| Label | Background | IP colour 1 (mass) | IP colour 2 (feature + face marks) | Strategy |
| --- | --- | --- | --- | --- |
| A1 | `#0B57D0` brand blue | `#F5C9A4` warm skin | `#0A2E6B` deep navy | dark feature on light head, cool ground |
| A2 | `#E8590C` brand orange | `#FFF1DF` cream | `#0B57D0` brand blue | brand blue as the mark colour on orange |
| B1 | `#E8590C` brand orange | `#F7CBA6` warm skin | `#123A6B` steel navy | tool carries the dark colour |
| B2 | `#073B8F` deep navy | `#FFD9B0` warm sand | `#F97316` bright orange | tool is the accent, face is the neutral |
| C1 | `#E8590C` brand orange | `#FFEFDC` cream | `#14243F` charcoal navy | maximum reduction, hard two-tone |
| C2 | `#1565E0` bright blue | `#FFCFA3` peach | `#E8590C` brand orange | mustache carries the brand accent |

### How to run them

- One prompt per **fresh Gemini chat**. Do not run two in the same thread and do
  not attach a previous result as a reference image — the candidates have to be
  independent draws, and Gemini will otherwise carry the last image forward.
- Ask for 1:1. Keep whatever native resolution it returns (1K / 2K); do not
  upscale or resample to hit 1536.
- Deliver all six. Do not re-roll a result because it looks off — that is a new
  explicit request, not a repair.

---

## A1

Create one complete full-bleed 1:1 square image.
Background: fill the entire square with solid brand blue #0B57D0. Keep #0B57D0 clearly visible in all four square corners and every open area surrounding the character.
Subject: place one extremely simplified, cute, endearing bald round-headed grandfather handyman IP character on the background, reduced to one soft rounded continuous silhouette and one defining feature: a single thick rounded pair of eyeglasses.
Complexity: use only 4–7 large basic shapes and at most two broad internal color regions. Use two simple eyes and add one tiny mouth only when it helps the expression. Remove every nonessential line, outline, anatomical detail, texture, and decoration. Omit any mustache, eyebrows, hair, collar, shirt pattern, and tools. Keep the character readable at 32 × 32.
Color behavior: use exactly three semantic colors in the complete image: exactly two IP base colors plus the background color. Use warm skin #F5C9A4 for the head and ear masses, and deep navy #0A2E6B for the eyeglasses and the two eyes. Reuse those same two colors for any facial mark. Keep the IP, facial marks, and background clearly separated.
Composition: keep the mascot upright, emerging from the lower-right, filling 75–85% of the square, with both paired identifying features visible: both ears and both lenses of the eyeglasses.
Style: make simplification, cuteness, and lovable baby-like appeal the strongest qualities. Use large soft forms, compact proportions, thick rounded contours, and an ultra-clean graphic treatment. Prefer one clear shape over several explanatory details. Add an extremely, extremely subtle, almost imperceptible sense of depth through a barely-there neo-skeuomorphic treatment.
Finish: show only the character on the full-canvas background, with clean surfaces and normal square outer corners.
Constraints: Use no text or watermark. Add no borders, frames, cards, or presentation masks. Include one character only, with no extra subjects or scenery. Use no fragile lines, sharp tips, unnecessary outlines, tiny details, or decorative marks. Add no photorealistic material, dramatic bevel, glossy hotspot, deep occlusion, extrusion, strong three-dimensional rendering, or external cast shadow. Keep the background solid and uniform, with no texture, vignette, or lighting variation.

---

## A2

Create one complete full-bleed 1:1 square image.
Background: fill the entire square with solid brand orange #E8590C. Keep #E8590C clearly visible in all four square corners and every open area surrounding the character.
Subject: place one extremely simplified, cute, endearing bald round-headed grandfather handyman IP character on the background, reduced to one soft rounded continuous silhouette and one defining feature: a single thick rounded pair of eyeglasses.
Complexity: use only 4–7 large basic shapes and at most two broad internal color regions. Use two simple eyes and add one tiny mouth only when it helps the expression. Remove every nonessential line, outline, anatomical detail, texture, and decoration. Omit any mustache, eyebrows, hair, collar, shirt pattern, and tools. Keep the character readable at 32 × 32.
Color behavior: use exactly three semantic colors in the complete image: exactly two IP base colors plus the background color. Use soft cream #FFF1DF for the head and ear masses, and brand blue #0B57D0 for the eyeglasses and the two eyes. Reuse those same two colors for any facial mark. Keep the IP, facial marks, and background clearly separated.
Composition: keep the mascot upright, emerging from the lower-left, filling 75–85% of the square, with both paired identifying features visible: both ears and both lenses of the eyeglasses.
Style: make simplification, cuteness, and lovable baby-like appeal the strongest qualities. Use large soft forms, compact proportions, thick rounded contours, and an ultra-clean graphic treatment. Prefer one clear shape over several explanatory details. Add an extremely, extremely subtle, almost imperceptible sense of depth through a barely-there neo-skeuomorphic treatment.
Finish: show only the character on the full-canvas background, with clean surfaces and normal square outer corners.
Constraints: Use no text or watermark. Add no borders, frames, cards, or presentation masks. Include one character only, with no extra subjects or scenery. Use no fragile lines, sharp tips, unnecessary outlines, tiny details, or decorative marks. Add no photorealistic material, dramatic bevel, glossy hotspot, deep occlusion, extrusion, strong three-dimensional rendering, or external cast shadow. Keep the background solid and uniform, with no texture, vignette, or lighting variation.

---

## B1

Create one complete full-bleed 1:1 square image.
Background: fill the entire square with solid brand orange #E8590C. Keep #E8590C clearly visible in all four square corners and every open area surrounding the character.
Subject: place one extremely simplified, cute, endearing bald round-headed grandfather handyman IP character on the background, reduced to one soft rounded continuous silhouette and one defining feature: a single broad wrench with a blunt rounded head, held up beside the face and merged into the silhouette.
Complexity: use only 4–7 large basic shapes and at most two broad internal color regions. Use two simple eyes and one small rounded mustache. Remove every nonessential line, outline, anatomical detail, texture, and decoration. Omit eyeglasses, hair, collar, shirt pattern, buttons, and every second tool. Keep the character readable at 32 × 32.
Color behavior: use exactly three semantic colors in the complete image: exactly two IP base colors plus the background color. Use warm skin #F7CBA6 for the head, ear, and hand masses, and steel navy #123A6B for the wrench, the two eyes, and the mustache. Reuse those same two colors for any facial mark. Keep the IP, facial marks, and background clearly separated.
Composition: keep the mascot upright, emerging from the lower-left, filling 75–85% of the square, with both paired identifying features visible: both ears. Do not crop the wrench head.
Style: make simplification, cuteness, and lovable baby-like appeal the strongest qualities. Use large soft forms, compact proportions, thick rounded contours, and an ultra-clean graphic treatment. Prefer one clear shape over several explanatory details. Add an extremely, extremely subtle, almost imperceptible sense of depth through a barely-there neo-skeuomorphic treatment.
Finish: show only the character on the full-canvas background, with clean surfaces and normal square outer corners.
Constraints: Use no text or watermark. Add no borders, frames, cards, or presentation masks. Include one character only, with no extra subjects or scenery. Use no fragile lines, sharp tips, unnecessary outlines, tiny details, or decorative marks. Add no photorealistic material, dramatic bevel, glossy hotspot, deep occlusion, extrusion, strong three-dimensional rendering, or external cast shadow. Keep the background solid and uniform, with no texture, vignette, or lighting variation.

---

## B2

Create one complete full-bleed 1:1 square image.
Background: fill the entire square with solid deep navy #073B8F. Keep #073B8F clearly visible in all four square corners and every open area surrounding the character.
Subject: place one extremely simplified, cute, endearing bald round-headed grandfather handyman IP character on the background, reduced to one soft rounded continuous silhouette and one defining feature: a single broad wrench with a blunt rounded head, held up beside the face and merged into the silhouette.
Complexity: use only 4–7 large basic shapes and at most two broad internal color regions. Use two simple eyes and one small rounded mustache. Remove every nonessential line, outline, anatomical detail, texture, and decoration. Omit eyeglasses, hair, collar, shirt pattern, buttons, and every second tool. Keep the character readable at 32 × 32.
Color behavior: use exactly three semantic colors in the complete image: exactly two IP base colors plus the background color. Use warm sand #FFD9B0 for the head, ear, and hand masses, and bright orange #F97316 for the wrench, the two eyes, and the mustache. Reuse those same two colors for any facial mark. Keep the IP, facial marks, and background clearly separated.
Composition: keep the mascot upright, emerging from the lower-right, filling 75–85% of the square, with both paired identifying features visible: both ears. Do not crop the wrench head.
Style: make simplification, cuteness, and lovable baby-like appeal the strongest qualities. Use large soft forms, compact proportions, thick rounded contours, and an ultra-clean graphic treatment. Prefer one clear shape over several explanatory details. Add an extremely, extremely subtle, almost imperceptible sense of depth through a barely-there neo-skeuomorphic treatment.
Finish: show only the character on the full-canvas background, with clean surfaces and normal square outer corners.
Constraints: Use no text or watermark. Add no borders, frames, cards, or presentation masks. Include one character only, with no extra subjects or scenery. Use no fragile lines, sharp tips, unnecessary outlines, tiny details, or decorative marks. Add no photorealistic material, dramatic bevel, glossy hotspot, deep occlusion, extrusion, strong three-dimensional rendering, or external cast shadow. Keep the background solid and uniform, with no texture, vignette, or lighting variation.

---

## C1

Create one complete full-bleed 1:1 square image.
Background: fill the entire square with solid brand orange #E8590C. Keep #E8590C clearly visible in all four square corners and every open area surrounding the character.
Subject: place one extremely simplified, cute, endearing bald round-headed grandfather IP character on the background, reduced to one soft rounded continuous silhouette and one defining feature: a single broad rounded mustache spanning most of the lower face.
Complexity: use only 4–7 large basic shapes and at most two broad internal color regions. Use two simple eyes and no mouth. Remove every nonessential line, outline, anatomical detail, texture, and decoration. Omit eyeglasses, eyebrows, hair, collar, shirt, and tools. Keep the character readable at 32 × 32.
Color behavior: use exactly three semantic colors in the complete image: exactly two IP base colors plus the background color. Use soft cream #FFEFDC for the head and ear masses, and charcoal navy #14243F for the mustache and the two eyes. Reuse those same two colors for any facial mark. Keep the IP, facial marks, and background clearly separated.
Composition: keep the mascot upright, emerging from the lower-right, filling 75–85% of the square, with both paired identifying features visible: both ears and both halves of the mustache.
Style: make simplification, cuteness, and lovable baby-like appeal the strongest qualities. Use large soft forms, compact proportions, thick rounded contours, and an ultra-clean graphic treatment. Prefer one clear shape over several explanatory details. Add an extremely, extremely subtle, almost imperceptible sense of depth through a barely-there neo-skeuomorphic treatment.
Finish: show only the character on the full-canvas background, with clean surfaces and normal square outer corners.
Constraints: Use no text or watermark. Add no borders, frames, cards, or presentation masks. Include one character only, with no extra subjects or scenery. Use no fragile lines, sharp tips, unnecessary outlines, tiny details, or decorative marks. Add no photorealistic material, dramatic bevel, glossy hotspot, deep occlusion, extrusion, strong three-dimensional rendering, or external cast shadow. Keep the background solid and uniform, with no texture, vignette, or lighting variation.

---

## C2

Create one complete full-bleed 1:1 square image.
Background: fill the entire square with solid bright blue #1565E0. Keep #1565E0 clearly visible in all four square corners and every open area surrounding the character.
Subject: place one extremely simplified, cute, endearing bald round-headed grandfather IP character on the background, reduced to one soft rounded continuous silhouette and one defining feature: a single broad rounded mustache spanning most of the lower face.
Complexity: use only 4–7 large basic shapes and at most two broad internal color regions. Use two simple eyes and no mouth. Remove every nonessential line, outline, anatomical detail, texture, and decoration. Omit eyeglasses, eyebrows, hair, collar, shirt, and tools. Keep the character readable at 32 × 32.
Color behavior: use exactly three semantic colors in the complete image: exactly two IP base colors plus the background color. Use warm peach #FFCFA3 for the head and ear masses, and brand orange #E8590C for the mustache and the two eyes. Reuse those same two colors for any facial mark. Keep the IP, facial marks, and background clearly separated.
Composition: keep the mascot upright, emerging from the lower-left, filling 75–85% of the square, with both paired identifying features visible: both ears and both halves of the mustache.
Style: make simplification, cuteness, and lovable baby-like appeal the strongest qualities. Use large soft forms, compact proportions, thick rounded contours, and an ultra-clean graphic treatment. Prefer one clear shape over several explanatory details. Add an extremely, extremely subtle, almost imperceptible sense of depth through a barely-there neo-skeuomorphic treatment.
Finish: show only the character on the full-canvas background, with clean surfaces and normal square outer corners.
Constraints: Use no text or watermark. Add no borders, frames, cards, or presentation masks. Include one character only, with no extra subjects or scenery. Use no fragile lines, sharp tips, unnecessary outlines, tiny details, or decorative marks. Add no photorealistic material, dramatic bevel, glossy hotspot, deep occlusion, extrusion, strong three-dimensional rendering, or external cast shadow. Keep the background solid and uniform, with no texture, vignette, or lighting variation.

---

# B1-T — technician twin of B1, with a cap

**What was wrong with B2.** It measures **1.48:1** between its orange mustache
and its peach head — at 32px the face goes blank. It also drifted away from B1
in composition, so the two never read as one family.

**The correction.** B1-T keeps B1's palette *exactly* — peach head, navy for
everything else — and changes only the ground and the cap. Measured against the
colours below:

| | features vs head | head vs ground | features vs ground |
| --- | --- | --- | --- |
| B1 (as generated) | 6.68:1 | 2.41:1 | 2.77:1 |
| **B1-T (predicted)** | **9.96:1** | **4.47:1** | **2.23:1** |

Navy on blue at 2.23:1 is the same order as B1's own softest edge, so the pair
will feel consistent rather than one being obviously weaker.

**Two deliberate departures from the skill,** both stated rather than smuggled:

1. The cap is a *second* defining feature alongside the wrench, where the skill
   budgets one. Keeping the wrench is what makes it read as B1's twin, and
   losing the wrench was the main reason B2 felt "too far from the orange one".
2. The cap covers the bald head, which is part of the Papa identity. The
   mustache carries that identity instead — it is the stronger cue of the two,
   and it stays.

The cap's top edge sits against the sky at 2.23:1, so the prompt explicitly
keeps a band of peach forehead visible under the brim. That way the cap's shape
is defined by its edge against the *head*, at 9.96:1, not against the ground.

Run in a fresh Gemini chat. Do not attach B1 as a reference.

Create one complete full-bleed 1:1 square image.
Background: fill the entire square with solid brand blue #0B57D0. Keep #0B57D0 clearly visible in all four square corners and every open area surrounding the character.
Subject: place one extremely simplified, cute, endearing round-headed grandfather handyman IP character on the background, reduced to one soft rounded continuous silhouette, wearing a simple rounded worker cap with a short blunt curved brim, and holding up a single broad wrench with a blunt rounded head beside the face on the lower-right.
Complexity: use only 5–7 large basic shapes and at most two broad internal color regions. Use two simple eyes and one small rounded mustache. Keep a clear band of bare forehead visible between the cap brim and the eyes, so the cap reads as a separate shape sitting on the head. Remove every nonessential line, outline, anatomical detail, texture, and decoration. Omit eyeglasses, hair, collar, shirt pattern, buttons, cap logos or badges, and every second tool. Keep the character readable at 32 × 32.
Color behavior: use exactly three semantic colors in the complete image: exactly two IP base colors plus the background color. Use warm peach #FFCFA3 for the head, forehead, ears, and hand. Use deep navy #1B2A4A for the cap, the wrench, the mustache, and the two eyes. Reuse those same two colors for any facial mark. Keep the IP, facial marks, and background clearly separated.
Composition: keep the mascot upright, emerging from the lower-left, filling 75–85% of the square, with both paired identifying features visible: both ears. Do not crop the cap or the wrench head.
Style: make simplification, cuteness, and lovable baby-like appeal the strongest qualities. Use large soft forms, compact proportions, thick rounded contours, and an ultra-clean graphic treatment. Prefer one clear shape over several explanatory details. Add an extremely, extremely subtle, almost imperceptible sense of depth through a barely-there neo-skeuomorphic treatment.
Finish: show only the character on the full-canvas background, with clean surfaces and normal square outer corners.
Constraints: Use no text or watermark. Add no borders, frames, cards, or presentation masks. Include one character only, with no extra subjects or scenery. Use no fragile lines, sharp tips, unnecessary outlines, tiny details, or decorative marks. Add no photorealistic material, dramatic bevel, glossy hotspot, deep occlusion, extrusion, strong three-dimensional rendering, or external cast shadow. Keep the background solid and uniform, with no texture, vignette, or lighting variation.

---

## B1-T-alt — cap instead of the wrench

Run this one too, in its own fresh chat. It is the same character with the cap
carrying the whole "technician" idea and no tool at all — back inside the
skill's one-feature budget, and cleaner at 32px. Worth seeing side by side
before committing: the wrench version resembles B1 more, this one reads faster
when small.

Create one complete full-bleed 1:1 square image.
Background: fill the entire square with solid brand blue #0B57D0. Keep #0B57D0 clearly visible in all four square corners and every open area surrounding the character.
Subject: place one extremely simplified, cute, endearing round-headed grandfather handyman IP character on the background, reduced to one soft rounded continuous silhouette and one defining feature: a simple rounded worker cap with a short blunt curved brim.
Complexity: use only 4–6 large basic shapes and at most two broad internal color regions. Use two simple eyes and one small rounded mustache. Keep a clear band of bare forehead visible between the cap brim and the eyes, so the cap reads as a separate shape sitting on the head. Remove every nonessential line, outline, anatomical detail, texture, and decoration. Omit eyeglasses, hair, collar, shirt pattern, buttons, cap logos or badges, and all tools. Keep the character readable at 32 × 32.
Color behavior: use exactly three semantic colors in the complete image: exactly two IP base colors plus the background color. Use warm peach #FFCFA3 for the head, forehead, ears, and shoulders. Use deep navy #1B2A4A for the cap, the mustache, and the two eyes. Reuse those same two colors for any facial mark. Keep the IP, facial marks, and background clearly separated.
Composition: keep the mascot upright, emerging from the lower-right, filling 75–85% of the square, with both paired identifying features visible: both ears. Do not crop the cap.
Style: make simplification, cuteness, and lovable baby-like appeal the strongest qualities. Use large soft forms, compact proportions, thick rounded contours, and an ultra-clean graphic treatment. Prefer one clear shape over several explanatory details. Add an extremely, extremely subtle, almost imperceptible sense of depth through a barely-there neo-skeuomorphic treatment.
Finish: show only the character on the full-canvas background, with clean surfaces and normal square outer corners.
Constraints: Use no text or watermark. Add no borders, frames, cards, or presentation masks. Include one character only, with no extra subjects or scenery. Use no fragile lines, sharp tips, unnecessary outlines, tiny details, or decorative marks. Add no photorealistic material, dramatic bevel, glossy hotspot, deep occlusion, extrusion, strong three-dimensional rendering, or external cast shadow. Keep the background solid and uniform, with no texture, vignette, or lighting variation.
