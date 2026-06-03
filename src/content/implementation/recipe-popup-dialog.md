# Recipe — Two-Column Popup / Dialog

A popup card pattern with two equal columns divided by a vertical rule. Used for contact/booking flows where descriptive context lives on the left and the form (or embed) lives on the right.

---

## Structure

```tsx
<Dialog>
  <div className="popup-card">
    <div className="popup-col popup-col--left">
      {/* Context: heading, description, metadata */}
    </div>
    <div className="popup-col popup-col--right">
      {/* Action: form, embed, call-to-action */}
    </div>
  </div>
</Dialog>
```

---

## CSS

```css
.popup-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border-radius: var(--radius-xl);           /* 24px — card surface tier */
  border: var(--border-sm) solid var(--alpha-10);
  background-color: var(--color-fill-base);
  max-width: 720px;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.popup-col {
  padding: var(--padding-card);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--padding-card);
}

/* Divider between columns — vertical rule at 10% opacity.
   Exception: the only permitted vertical divider in the system.
   It lives inside a card surface, not at page layout level. */
.popup-col--left {
  border-right: var(--border-sm) solid var(--alpha-10);
}

/* Collapses to single column at mobile-landscape (≤767px) */
@media (max-width: 767px) {
  .popup-card {
    grid-template-columns: 1fr;
  }
  .popup-col--left {
    border-right: none;
    border-bottom: var(--border-sm) solid var(--alpha-10);
  }
}
```

---

## Notes

- `border-radius: --radius-xl` (24px) — card surface tier. The dialog overlay/scrim wraps this card; do not apply radius to the scrim.
- The vertical divider between columns is the **only permitted** vertical divider in the system — justified because it sits inside a contained card, not at page layout level.
- Use `--alpha-10` for both the outer card border and the internal column divider. In dark mode this resolves to `--alpha-10` of the dark source colour automatically.
- The right column takes a form, iframe embed (Calendly, etc.), or any action content. Padding via `--padding-card`.
- Max width 720px. Below 768px the grid collapses to a single column; the column divider becomes a horizontal rule.
- Outer shell: React DS `Dialog` component — handles scrim, focus trap, `aria-modal`, and open/close state.
