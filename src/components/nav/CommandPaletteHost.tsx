'use client';

import { useCommandState } from '@/providers/ClientShell';
import { CommandDialog } from './CommandDialog';
import { CommandPalette } from './CommandPalette';

/**
 * Mounts the CommandDialog with the global open state from ClientShell.
 * Lives at the root of the React tree so the portal target is always present.
 */
export function CommandPaletteHost(): React.ReactElement {
  const { isCommandOpen, closeCommand } = useCommandState();
  return (
    <CommandDialog open={isCommandOpen} onClose={closeCommand}>
      <CommandPalette onClose={closeCommand} />
    </CommandDialog>
  );
}
