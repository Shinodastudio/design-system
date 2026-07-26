'use client';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogPanel,
  DialogTitleRow,
  DialogCard,
} from '@/components/overlay/Dialog';
import { Badge, type BadgeVariant } from '@/components/feedback/Badge';
import { Icon } from '@/components/icons/Icon';
import { CHANGELOG, type ChangelogType } from '@/data/changelog';

const TYPE_BADGE: Record<ChangelogType, BadgeVariant> = {
  Feature: 'blue',
  Improvement: 'green',
  Fix: 'red',
  Docs: 'neutral',
  Sync: 'yellow',
  Infrastructure: 'orange',
};

/** "1st" / "2nd" / "3rd" / "4th"…  — matches the Figma changelog date format. */
function ordinalSuffix(day: number): string {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

/** e.g. "Jul 12th, 2026" (Figma node 4030:2209). */
function formatEntryDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  const month = date.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' });
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  return `${month} ${day}${ordinalSuffix(day)}, ${year}`;
}

interface ChangelogDialogProps {
  /** Trigger element — typically the "Changelog" footer link/button. */
  readonly children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
}

/**
 * Wraps its trigger child in a Dialog that opens the design system changelog
 * as a modal popup. Content is a static snapshot of the Notion Changelog
 * database — see src/data/changelog.ts for provenance and update process.
 */
export function ChangelogDialog({ children }: ChangelogDialogProps): React.ReactElement {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent variant="drawer">
        <DialogPanel>
          <DialogTitleRow icon={<Icon name="file-document-info" size="em" />}>
            Changelog
          </DialogTitleRow>
          <DialogCard variant="drawer" className="changelog-card">
            <ul className="changelog-list">
              {CHANGELOG.map((entry) => (
                <li key={entry.title} className="changelog-entry">
                  <div className="changelog-entry-header">
                    <div className="changelog-entry-row">
                      <span className="changelog-entry-date heading-md">
                        {formatEntryDate(entry.date)}
                      </span>
                      {entry.version != null && (
                        <Badge variant="neutral">{entry.version}</Badge>
                      )}
                      <Badge variant={TYPE_BADGE[entry.type]}>{entry.type}</Badge>
                    </div>
                    <h3 className="changelog-entry-title heading-md">{entry.title}</h3>
                  </div>
                  <ul className="changelog-entry-changes body-xs">
                    {entry.changes.map((change) => (
                      <li key={change}>{change}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </DialogCard>
        </DialogPanel>
      </DialogContent>
    </Dialog>
  );
}
