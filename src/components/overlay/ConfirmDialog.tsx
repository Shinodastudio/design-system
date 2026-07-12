'use client';

import {
  Dialog,
  DialogContent,
  DialogTitleRow,
  DialogCard,
} from './Dialog';
import { Icon } from '@/components/icons/Icon';
import { cn } from '@/lib/cn';

export type ConfirmDialogIntent = 'default' | 'danger';

interface ConfirmDialogProps {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
  /** Heading-md message shown in the card. */
  readonly message: string;
  /** Label on the scrim title row (defaults to the intent's verb). */
  readonly title?: string;
  /** Optional icon on the scrim title row. Defaults to the intent's icon. */
  readonly titleIcon?: React.ReactNode;
  readonly confirmLabel?: string;
  readonly cancelLabel?: string;
  readonly onConfirm: () => void;
  /**
   * 'danger' (default-ish destructive) tints the confirm action with
   * status-error and ships a Trash title icon. 'default' uses primary.
   */
  readonly intent?: ConfirmDialogIntent;
}

const INTENT_DEFAULTS: Record<
  ConfirmDialogIntent,
  { readonly title: string; readonly icon: string; readonly confirm: string }
> = {
  default: { title: 'Confirm',  icon: 'help-question-circle', confirm: 'Confirm' },
  danger:  { title: 'Delete',   icon: 'delete-bin-1',         confirm: 'Delete it' },
};

/**
 * ConfirmDialog — title-on-scrim + card layout, with a message and two text
 * buttons. Built on the centred bare Dialog variant.
 *
 * Lineage: Scrapbook ConfirmDeleteDialog (Figma 75:35340).
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  message,
  title,
  titleIcon,
  confirmLabel,
  cancelLabel = 'Nevermind',
  onConfirm,
  intent = 'danger',
}: ConfirmDialogProps): React.ReactElement {
  const defaults = INTENT_DEFAULTS[intent];
  const resolvedTitle = title ?? defaults.title;
  const resolvedIcon = titleIcon ?? <Icon name={defaults.icon} size="em" />;
  const resolvedConfirm = confirmLabel ?? defaults.confirm;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent variant="bare">
        <DialogTitleRow icon={resolvedIcon}>{resolvedTitle}</DialogTitleRow>
        <DialogCard className="dialog-confirm-card">
          <p className="dialog-confirm-message">{message}</p>
          <div className="dialog-confirm-actions">
            <button
              type="button"
              className="dialog-confirm-btn dialog-confirm-btn--cancel"
              onClick={(): void => onOpenChange(false)}
            >
              <Icon name="delete-1" size="em" aria-hidden="true" />
              <span>{cancelLabel}</span>
            </button>
            <button
              type="button"
              className={cn(
                'dialog-confirm-btn',
                intent === 'danger'
                  ? 'dialog-confirm-btn--confirm'
                  : 'dialog-confirm-btn--confirm dialog-confirm-btn--default',
              )}
              onClick={(): void => {
                onConfirm();
                onOpenChange(false);
              }}
            >
              <Icon name="check-thick" size="em" aria-hidden="true" />
              <span>{resolvedConfirm}</span>
            </button>
          </div>
        </DialogCard>
      </DialogContent>
    </Dialog>
  );
}
