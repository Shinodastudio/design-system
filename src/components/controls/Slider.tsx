'use client';

import { useCallback, useId, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { useGravity } from '@/hooks/useGravity';

interface SliderProps {
  readonly min?: number;
  readonly max?: number;
  /** Snap increment. Default: 1. */
  readonly step?: number;
  /** Controlled value. */
  readonly value?: number;
  readonly defaultValue?: number;
  readonly onChange?: (value: number) => void;
  /** Render min/max labels below the track. */
  readonly showLabels?: boolean;
  readonly disabled?: boolean;
  readonly className?: string;
}

/** Snap raw to nearest step, clamped to [min, max]. */
function snap(raw: number, min: number, max: number, step: number): number {
  const stepped = Math.round((raw - min) / step) * step + min;
  return Math.min(max, Math.max(min, stepped));
}

export function Slider({
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  defaultValue,
  onChange,
  showLabels = false,
  disabled = false,
  className,
}: SliderProps): React.ReactElement {
  const [internalValue, setInternalValue] = useState<number>(
    defaultValue ?? min,
  );
  const value = controlledValue ?? internalValue;
  const [showTooltip, setShowTooltip] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const isDragging = useRef(false);

  useGravity(thumbRef);

  const percent = ((value - min) / (max - min)) * 100;

  const updateFromClient = useCallback(
    (clientX: number) => {
      if (disabled || !trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const raw = ((clientX - rect.left) / rect.width) * (max - min) + min;
      const next = snap(raw, min, max, step);
      if (controlledValue == null) setInternalValue(next);
      onChange?.(next);
    },
    [disabled, min, max, step, controlledValue, onChange],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      isDragging.current = true;
      setShowTooltip(true);
      updateFromClient(e.clientX);
    },
    [disabled, updateFromClient],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
      updateFromClient(e.clientX);
    },
    [updateFromClient],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.releasePointerCapture(e.pointerId);
      isDragging.current = false;
      setShowTooltip(false);
    },
    [],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      let next: number | null = null;
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          e.preventDefault();
          next = snap(value + step, min, max, step);
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          e.preventDefault();
          next = snap(value - step, min, max, step);
          break;
        case 'Home':
          e.preventDefault();
          next = min;
          break;
        case 'End':
          e.preventDefault();
          next = max;
          break;
      }
      if (next !== null) {
        if (controlledValue == null) setInternalValue(next);
        onChange?.(next);
      }
    },
    [disabled, value, step, min, max, controlledValue, onChange],
  );

  return (
    <div className={cn('slider', disabled && 'slider-disabled', className)}>
      {/* Track area — handles all pointer and keyboard events */}
      <div
        ref={trackRef}
        role="slider"
        id={id}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
        data-cursor="btn"
        className="slider-track-area"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        onKeyDown={handleKeyDown}
      >
        {/* Visual track + fill */}
        <div className="slider-track">
          <div className="slider-fill" style={{ width: `${percent}%` }} />
        </div>

        {/* Thumb — gravity applied here, tooltip anchored to this */}
        <div className="slider-thumb-wrap" style={{ left: `${percent}%` }}>
          <div ref={thumbRef} className="slider-thumb" />
          <div
            className={cn('slider-tooltip', showTooltip && 'is-visible')}
            aria-hidden="true"
          >
            {value}
          </div>
        </div>
      </div>

      {showLabels && (
        <div className="slider-labels" aria-hidden="true">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
}
