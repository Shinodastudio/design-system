---
name: shinoda-design-system
description: "Use this skill for ANY project built under the Shinoda or New Genre Labs umbrella. Load before writing a single line of HTML, CSS, or component code."
---

# Shinoda Design System — Claude Code Reference (v3)

## The North Star

Design as stewardship. Clarity is the form. Opacity is the hierarchy.

**Anti-patterns — refuse unconditionally:**
- Gradients, drop shadows, shimmer loaders
- Radius tiers mixed on the same surface
- Emoji in UI chrome
- "Powered by" badges or provider branding
- Any color outside the grey/status palette (hardcoded hex allowed only for deliberate stylistic exceptions)
- Smooth scroll — sharpness is intentional
- Vertical dividers
- Asymmetric column widths
- Any opacity value outside the system scale

---

## Opacity Scale — THE hierarchy tool

**Content hierarchy:**

| Token | Value | Use |
|---|---|---|
| `--opacity-80` | 80% | Near-primary emphasis |
| `--opacity-60` | 60% | Secondary content |
| `--opacity-40` | 40% | Tertiary / metadata labels / nav links at rest |
| `--opacity-20` | 20% | Very low emphasis / link underline at rest |

**Structural (backgrounds and dividers only):**

| Token | Value | Use |
|---|---|---|
| `--opacity-10` | 10% | Light mode divider · button/control background at rest |
| `--opacity-5`  | 5%  | Dark mode divider |
| `--opacity-divider` | 10% | Alias for divider usage — prefer `--alpha-10` as a bg colour |

Never use 30%, 50%, 70%, 90%, or 15%. 10% and 5% are structural only — not for content text.

Utility classes: `.op-80`, `.op-60`, `.op-40`, `.op-20`, `.op-10`, `.op-5`

---

## Typography

**`heading-md` (1.5rem) is the primary workhorse.** Hierarchy through opacity, not size.

### Type scale (1rem = 16px, tracking eased from original spec)

| Class | Size | Weight | Line Height | Tracking |
|---|---|---|---|---|
| `heading-xl` | 2.5rem | 400 | 105% | -0.040em |
| `heading-lg` | 2rem | 400 | 105% | -0.035em |
| `heading-md` | 1.5rem | 400 | 105% | -0.030em |
| `heading-sm` | 1.25rem | 400 | 105% | -0.025em |
| `heading-xs` | 1rem | 400 | 105% | -0.020em |
| `heading-2xs` | 0.875rem | 450 | 105% | -0.015em |
| `subheading-lg` | 3rem | 450 (serif) | 105% | -0.040em |
| `subheading-md` | 2rem | 450 (serif) | 105% | -0.040em |
| `subheading-sm` | 1.5rem | 450 (serif) | 105% | -0.040em |
| `body-xl` | 1.25rem | 400 | 120% | -0.025em |
| `body-lg` | 1.125rem | 400 | 120% | -0.020em |
| `body-md` | 1rem | 400 | 130% | -0.015em |
| `body-sm` | 0.875rem | 400 | 130% | -0.010em |
| `body-xs` | 0.75rem | 400 | 140% | -0.005em |
| `body-2xs` | 0.625rem | 400 | 140% | 0em |

---

## Radius — Three tiers, no mixing

| Tier | Token | Value | Use |
|---|---|---|---|
| Control | `--radius-sm` | 8px | Buttons, inputs, selects, checkboxes, toggles, tags/badges |
| Tile | `--radius-md` | 12px | Grid tiles, content cards, inline chips |
| Surface | `--radius-xl` | 24px | Dialogs, modals, sheets, popup cards |

Pick by surface type. Never mix tiers on the same surface. Nested containers step up one tier (button=8 inside tile=12 inside surface=24).

---

## Layout

- Grid: **always `1fr 1fr`** — equal 50/50
- Max width: **1312px** (`--container-5xl`)
- Global padding: `--padding-page` (responsive: 4em → 2em → 1.5em)
- Dividers: **horizontal only**, `--alpha-10` in light / `--alpha-5` in dark
- No vertical dividers, ever

---

## Cursor

Single `1.25em` solid dot, `mix-blend-mode: difference`.

| Context | Class | Appearance |
|---|---|---|
| Default | — | Solid dot, 1.25em |
| Text | `cursor--text` | Thin I-beam (2px × 1.5em) |
| Button | `cursor--btn` | Morphs to button footprint |
| Image | `cursor--chip` | Pill chip with label |
| Pressed | `cursor--active` | Scale 0.8 |

**Positioning:** Uses `left`/`top` properties with CSS `transform: translate(-50%, -50%)` for centering. Lerp factor: 0.22.

---

## Buttons

- `0.1em` inset on all sides (spring-zoom `::before` background)
- Transparent at rest; 10% fill (`--alpha-10`) on hover
- Active: `opacity: 0.80`
- `border-radius: --radius-sm` (8px)
- Never `cursor: pointer`

## Links

Two variants:

**`ShinodaLink` / `.link`** — standalone links, CTAs, nav items. Renders as `display: inline` with a dual-layer `background-image` underline: 20% opacity at rest, 100% on hover. Background fill appears on hover.

**`PlainLink` / `.plainlink`** — inline body-copy links. `border-bottom` underline only: 20% at rest → 100% on hover. No background fill. Use when the `.link` hover background is too heavy for running text.

Both: underline always present, never hidden.

## Text Selection

Inverted: `background: --color-text-primary; color: --color-fill-base`

---

## Navigation — Group fade

The top nav and any sidebar nav uses a **group fade** interaction: the entire link strip dims to 40% at rest and lifts to 100% as a unit on hover. Individual links do not have independent opacity — the group's `opacity` handles it.

CSS pattern: `.nav-links { opacity: 0.4; transition: opacity 0.2s } .nav-links:hover { opacity: 1 }`

---

## Component Checklist

- [ ] Only semantic color tokens — no raw hex (exceptions: deliberate stylistic hardcodes are allowed)
- [ ] Both light and dark modes work
- [ ] `cursor: none` preserved on all interactive elements
- [ ] `data-gravity` on interactive elements
- [ ] Grid is 50/50
- [ ] No vertical dividers
- [ ] Horizontal dividers use `--alpha-10` (light) / `--alpha-5` (dark) — not opacity on a solid element
- [ ] Hierarchy via opacity (20/40/60/80), not size
- [ ] `heading-md` as default — not `heading-xl`
- [ ] Links: 20% underline at rest, 100% on hover
- [ ] Buttons: spring-zoom bg, 10% fill at rest hover, `--radius-sm`
- [ ] Cards/dialogs: `--radius-xl`
- [ ] Tiles: `--radius-md`
- [ ] `::selection` inverted
- [ ] No smooth scroll
