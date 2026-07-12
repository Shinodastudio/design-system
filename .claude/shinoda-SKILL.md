---
name: shinoda-design-system
description: "Use this skill for ANY project built under the Shinoda or New Genre Labs umbrella. Load before writing a single line of HTML, CSS, or component code."
---

# Shinoda Design System — Claude Code Reference (v3)

## The North Star

Design as stewardship. Clarity is the form. Opacity is the hierarchy.

**Anti-patterns — refuse unconditionally:**
- Gradients, drop shadows, shimmer loaders
- Radius values outside the two-tier system: `--radius-md` (12px) for interactive controls (buttons, inputs, button groups); `--radius-xl` (24px) for card surfaces (dialogs, modals, sheets). No other values on primary elements.
- Emoji in UI chrome
- "Powered by" badges or provider branding
- Any color outside the grey/status palette
- Smooth scroll — sharpness is intentional
- Vertical dividers
- Asymmetric column widths
- Any opacity value outside the system scale

---

## Opacity Scale — THE hierarchy tool

**Content opacities — only these four values, ever:**

| Token | Value | Use |
|---|---|---|
| `--opacity-80` | 80% | Near-primary emphasis |
| `--opacity-60` | 60% | Secondary content |
| `--opacity-40` | 40% | Tertiary / metadata labels / nav links at rest |
| `--opacity-20` | 20% | Very low emphasis / link underline at rest |

**Structural:**

| Token | Value | Use |
|---|---|---|
| `--opacity-divider` | 10% | Horizontal dividers only |

No other opacity values exist. Never use 30%, 50%, 70%, 90%, 15%, or 5%.

Utility classes: `.op-80`, `.op-60`, `.op-40`, `.op-20`

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

## Layout

- Grid: **always `1fr 1fr`** — equal 50/50
- Max width: **1280px** (`--container-5xl`)
- Global padding: `--space-6` (24px)
- Dividers: **horizontal only**, 10% opacity (`--opacity-divider`)
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

- `0.1em` padding on all sides
- Transparent at rest
- Hover / focus: `--alpha-10` (10% opacity fill)
- Active: `opacity: 0.80`
- Never `cursor: pointer`

## Links

- Underline always present at **20% opacity** (`--color-overlay-core`)
- Hover: underline transitions to **100% opacity** (`--color-text-primary`)
- Never fully hidden underline

## Text Selection

Inverted: `background: --color-text-primary; color: --color-fill-base`

---

## Component Checklist

- [ ] Only semantic color tokens — no raw hex
- [ ] Both modes work
- [ ] `cursor: none` preserved
- [ ] `data-gravity` on interactive elements
- [ ] Grid is 50/50
- [ ] No vertical dividers
- [ ] Horizontal dividers at 10%
- [ ] Hierarchy via opacity (20/40/60/80), not size
- [ ] `heading-md` as default — not `heading-xl`
- [ ] Links: 20% underline at rest, 100% on hover
- [ ] Buttons: 0.1em padding, 10% hover fill
- [ ] `::selection` inverted
- [ ] No smooth scroll
