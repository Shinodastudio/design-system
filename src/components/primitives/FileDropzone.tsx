'use client';

import { useCallback, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { useGravity } from '@/hooks/useGravity';

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1_048_576) return `${Math.round(bytes / 1024)} KB`;
  if (bytes < 1_073_741_824) return `${(bytes / 1_048_576).toFixed(1)} MB`;
  return `${(bytes / 1_073_741_824).toFixed(1)} GB`;
}

// ─── File icon ───────────────────────────────────────────────────────────────

function FileIcon(): React.ReactElement {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2.5" y="1.5" width="11" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M5 6.5h6M5 9.5h4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function UploadIcon(): React.ReactElement {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 15V7M12 7L9 10M12 7l3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 17v1.5A1.5 1.5 0 006.5 20h11a1.5 1.5 0 001.5-1.5V17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── FileChip ────────────────────────────────────────────────────────────────

export interface FileChipProps {
  readonly file: File;
  readonly onRemove: () => void;
  readonly className?: string;
}

export function FileChip({ file, onRemove, className }: FileChipProps): React.ReactElement {
  const chipRef = useRef<HTMLDivElement>(null);
  useGravity(chipRef);

  return (
    <div ref={chipRef} className={cn('file-chip', className)}>
      <span className="file-chip-icon" aria-hidden="true">
        <FileIcon />
      </span>
      <span className="file-chip-name" title={file.name}>
        {file.name}
      </span>
      <span className="file-chip-size">{formatFileSize(file.size)}</span>
      <button
        type="button"
        className="file-chip-remove"
        onClick={onRemove}
        aria-label={`Remove ${file.name}`}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path
            d="M1 1l8 8M9 1L1 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}

// ─── FileDropzone ─────────────────────────────────────────────────────────────

export interface FileDropzoneProps {
  /** Accepted MIME types or extensions — passed directly to <input accept>. */
  readonly accept?: string;
  readonly multiple?: boolean;
  /** Reject files larger than this (bytes). Filtered silently — pass onReject for feedback. */
  readonly maxSize?: number;
  readonly label?: string;
  readonly hint?: string;
  /** Error message displayed below the label and applies error border. */
  readonly error?: string;
  readonly disabled?: boolean;
  /** Called with accepted files after drop or browse. */
  readonly onFilesAccepted: (files: readonly File[]) => void;
  /** Called with rejected files (failed maxSize). */
  readonly onFilesRejected?: (files: readonly File[]) => void;
  readonly className?: string;
}

export function FileDropzone({
  accept,
  multiple = false,
  maxSize,
  label = 'Drop files here, or browse',
  hint,
  error,
  disabled = false,
  onFilesAccepted,
  onFilesRejected,
  className,
}: FileDropzoneProps): React.ReactElement {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);
  useGravity(dropzoneRef as React.RefObject<HTMLElement | null>);

  const processFiles = useCallback(
    (fileList: FileList) => {
      const all = Array.from(fileList);
      if (maxSize == null) {
        onFilesAccepted(all);
        return;
      }
      const accepted = all.filter((f) => f.size <= maxSize);
      const rejected = all.filter((f) => f.size > maxSize);
      if (accepted.length > 0) onFilesAccepted(accepted);
      if (rejected.length > 0) onFilesRejected?.(rejected);
    },
    [maxSize, onFilesAccepted, onFilesRejected],
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!disabled) setIsDragOver(true);
    },
    [disabled],
  );

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setIsDragOver(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      if (disabled || e.dataTransfer.files.length === 0) return;
      processFiles(e.dataTransfer.files);
    },
    [disabled, processFiles],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files == null || e.target.files.length === 0) return;
      processFiles(e.target.files);
      // Reset so the same file can be re-selected.
      e.target.value = '';
    },
    [processFiles],
  );

  const handleClick = useCallback(() => {
    if (!disabled) inputRef.current?.click();
  }, [disabled]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
        e.preventDefault();
        inputRef.current?.click();
      }
    },
    [disabled],
  );

  return (
    <div
      ref={dropzoneRef}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-label={label}
      className={cn(
        'dropzone',
        isDragOver && 'dropzone-active',
        error != null && 'dropzone-error',
        disabled && 'dropzone-disabled',
        className,
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleChange}
        aria-hidden="true"
        tabIndex={-1}
        style={{ display: 'none' }}
      />
      <span className="dropzone-icon">
        <UploadIcon />
      </span>
      <p className="dropzone-label">
        {isDragOver ? 'Release to upload' : label}
      </p>
      {hint != null && <p className="dropzone-hint">{hint}</p>}
      {error != null && (
        <p className="dropzone-error-text" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
