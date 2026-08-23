'use client';

import { useMemo, useSyncExternalStore } from 'react';
import { addDays, startOfDay } from '@/lib/date';

/** A second of slack, so the timer never fires a hair before the boundary. */
const MIDNIGHT_SETTLE_MS = 1000;

/*
 * "Today" is an external system, not React state: it changes on the world's
 * schedule rather than in response to anything the user does. Modelling it as a
 * store rather than useState + useEffect means one timer for the whole page no
 * matter how many calendars are mounted, and no setState-in-effect cascade.
 */
const listeners = new Set<() => void>();
let snapshot: number | null = null;
let rolloverTimer: number | null = null;

function computeToday(): number {
  return startOfDay(new Date()).getTime();
}

function scheduleRollover(): void {
  if (rolloverTimer != null) window.clearTimeout(rolloverTimer);
  const nextMidnight = addDays(new Date(snapshot ?? computeToday()), 1).getTime();
  rolloverTimer = window.setTimeout(() => {
    snapshot = computeToday();
    scheduleRollover();
    listeners.forEach(listener => listener());
  }, nextMidnight - Date.now() + MIDNIGHT_SETTLE_MS);
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  if (listeners.size === 1) {
    // First subscriber: re-read now (the module may have been evaluated on the
    // far side of midnight) and arm the timer.
    snapshot = computeToday();
    scheduleRollover();
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && rolloverTimer != null) {
      window.clearTimeout(rolloverTimer);
      rolloverTimer = null;
    }
  };
}

function getSnapshot(): number {
  snapshot ??= computeToday();
  return snapshot;
}

/**
 * Today, at local midnight, re-read when the day turns.
 *
 * A component that reads `new Date()` during render keeps whatever value it saw
 * on its first render for as long as it lives, so a calendar left open
 * overnight goes on insisting it is yesterday. Subscribing instead means the
 * marker moves at midnight, and every calendar on the page moves together off
 * one timer.
 */
export function useToday(): Date {
  const timestamp = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return useMemo(() => new Date(timestamp), [timestamp]);
}
