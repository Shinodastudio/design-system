'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '@/lib/cn';
import { Tooltip } from '@/components/overlay/Tooltip';

/**
 * ButtonGroup — pill of icon+label items where the label expands fluidly
 * on the selected item and collapses on the others. Single-select.
 *
 * Anatomy:
 *   ┌──────────────────────────────────────────────┐
 *   │ [icon]  [icon]  [icon — selected · label]    │
 *   └──────────────────────────────────────────────┘
 *
 * A single absolutely-positioned thumb is measured against the active item
 * and slides between positions in the same 280ms easeInOutQuint curve as
 * the label-column expansion. The two animations run in lockstep, so the
 * pill appears to glide rather than crossfade.
 *
 * Lineage: Scrapbook TabSwitcher (l0at-izar worktree, .ts-* rules in
 * src/styles/stickerizer.css). Generalised here from "tabs" to "single-select
 * button group" since the pattern isn't tab-specific.
 */
interface ButtonGroupContextValue {
  readonly value: string;
  readonly onValueChange: (next: string) => void;
  readonly registerItem: (value: string, el: HTMLButtonElement | null) => void;
}

const ButtonGroupContext = createContext<ButtonGroupContextValue | null>(null);

function useButtonGroupContext(): ButtonGroupContextValue {
  const ctx = useContext(ButtonGroupContext);
  if (ctx == null) throw new Error('<ButtonGroup.Item> must be inside <ButtonGroup>');
  return ctx;
}

interface ButtonGroupProps {
  readonly value: string;
  readonly onValueChange: (next: string) => void;
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly ariaLabel?: string;
}

interface ThumbRect {
  readonly left: number;
  readonly width: number;
  readonly height: number;
  readonly top: number;
}

function ButtonGroupBase({
  value,
  onValueChange,
  children,
  className,
  ariaLabel,
}: ButtonGroupProps): React.ReactElement {
  const groupRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [thumb, setThumb] = useState<ThumbRect | null>(null);
  // Hold the very-first measurement so we can opt-out of the slide transition
  // on mount (otherwise the thumb appears to fly in from 0,0).
  const [hasMeasured, setHasMeasured] = useState(false);

  const registerItem = useCallback((itemValue: string, el: HTMLButtonElement | null): void => {
    if (el == null) {
      itemsRef.current.delete(itemValue);
    } else {
      itemsRef.current.set(itemValue, el);
    }
  }, []);

  const measure = useCallback((): void => {
    const group = groupRef.current;
    const item = itemsRef.current.get(value);
    if (group == null || item == null) return;
    const groupBox = group.getBoundingClientRect();
    const itemBox = item.getBoundingClientRect();
    setThumb({
      left: itemBox.left - groupBox.left,
      top: itemBox.top - groupBox.top,
      width: itemBox.width,
      height: itemBox.height,
    });
  }, [value]);

  // Re-measure on value change AND while the label-expansion transition is
  // running (280ms easeInOutQuint). We track via rAF so the thumb width
  // follows the active item's growing footprint frame-by-frame.
  useLayoutEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number): void => {
      measure();
      if (now - start < 320) {
        raf = requestAnimationFrame(tick);
      } else {
        setHasMeasured(true);
      }
    };
    raf = requestAnimationFrame(tick);
    return (): void => cancelAnimationFrame(raf);
  }, [value, measure]);

  // Handle external size changes (window resize, font load).
  useEffect(() => {
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => measure());
    if (groupRef.current != null) ro.observe(groupRef.current);
    itemsRef.current.forEach((el) => ro.observe(el));
    return (): void => ro.disconnect();
  }, [measure, children]);

  return (
    <ButtonGroupContext.Provider value={{ value, onValueChange, registerItem }}>
      <div
        ref={groupRef}
        className={cn('button-group', className)}
        role="radiogroup"
        aria-label={ariaLabel}
      >
        {thumb != null && (
          <span
            className={cn('button-group-thumb', !hasMeasured && 'is-initial')}
            aria-hidden="true"
            style={{
              transform: `translate(${thumb.left}px, ${thumb.top}px)`,
              width: thumb.width,
              height: thumb.height,
            }}
          />
        )}
        {children}
      </div>
    </ButtonGroupContext.Provider>
  );
}

interface ButtonGroupItemProps {
  readonly value: string;
  readonly icon: React.ReactNode;
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function ButtonGroupItem({
  value: itemValue,
  icon,
  children,
  className,
}: ButtonGroupItemProps): React.ReactElement {
  const { value, onValueChange, registerItem } = useButtonGroupContext();
  const isActive = value === itemValue;
  const labelText = typeof children === 'string' ? children : undefined;

  const button = (
    <button
      ref={(el): void => registerItem(itemValue, el)}
      type="button"
      role="radio"
      aria-checked={isActive}
      className={cn('button-group-item', isActive && 'is-active', className)}
      onClick={(): void => onValueChange(itemValue)}
    >
      <span className="button-group-item-icon" aria-hidden="true">{icon}</span>
      <span className="button-group-item-label-wrap">
        <span className="button-group-item-label">{children}</span>
      </span>
    </button>
  );

  // Tooltip the inactive items so the label is still discoverable when the
  // pill is collapsed. The active item's label is already on screen.
  if (!isActive && labelText != null) {
    return <Tooltip content={labelText} side="top">{button}</Tooltip>;
  }
  return button;
}

export const ButtonGroup = Object.assign(ButtonGroupBase, { Item: ButtonGroupItem });
