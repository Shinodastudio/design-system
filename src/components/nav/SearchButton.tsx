'use client';

import { useCommandState } from '@/providers/ClientShell';
import { Button } from '@/components/primitives/Button';
import { Icon } from '@/components/icons';

export function SearchButton(): React.ReactElement {
  const { openCommand } = useCommandState();
  return (
    <Button
      className="btn-icon op-40"
      onClick={openCommand}
      aria-label="Open command palette"
      aria-keyshortcuts="Meta+K"
      style={{ '--hover-opacity': '1' } as React.CSSProperties}
    >
      <Icon name="search" size="em" />
    </Button>
  );
}
