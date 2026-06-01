'use client';

import { useCommandState } from '@/providers/ClientShell';
import { Button } from '@/components/primitives/Button';

function SearchIcon(): React.ReactElement {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M14 4C8.477 4 4 8.477 4 14C4 19.523 8.477 24 14 24C16.395 24 18.594 23.158 20.318 21.756L26.293 27.732C26.484 27.916 26.74 28.018 27.005 28.014C27.27 28.009 27.523 27.901 27.71 27.71C27.901 27.523 28.009 27.27 28.014 27.005C28.018 26.74 27.916 26.484 27.732 26.293L21.756 20.318C23.158 18.594 24 16.395 24 14C24 8.477 19.523 4 14 4ZM14 6C18.443 6 22 9.557 22 14C22 18.443 18.443 22 14 22C9.557 22 6 18.443 6 14C6 9.557 9.557 6 14 6Z"
        fill="currentColor"
      />
    </svg>
  );
}

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
      <SearchIcon />
    </Button>
  );
}
