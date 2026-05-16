import { cn } from '@/lib/cn';
import { Button } from '@/components/primitives/Button';
import { Skeleton } from '@/components/feedback/Skeleton';

interface DownloadTileProps {
  readonly filename: string;
  readonly description?: string;
  readonly fileSize?: string;
  readonly fileType?: string;
  readonly onDownload: () => void;
  readonly isDownloading?: boolean;
  readonly className?: string;
}

export function DownloadTile({
  filename,
  description,
  fileSize,
  fileType,
  onDownload,
  isDownloading = false,
  className,
}: DownloadTileProps): React.ReactElement {
  return (
    <div className={cn('download-tile', className)}>
      <div className="download-tile-icon" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="download-tile-body">
        <p className="download-tile-filename">{filename}</p>
        {(description != null || fileSize != null || fileType != null) && (
          <div className="download-tile-meta">
            {fileType != null && (
              <span className="download-tile-type">{fileType}</span>
            )}
            {fileSize != null && (
              <span className="download-tile-size">{fileSize}</span>
            )}
            {description != null && (
              <span className="download-tile-description">{description}</span>
            )}
          </div>
        )}
      </div>
      <div className="download-tile-action">
        {isDownloading ? (
          <Skeleton width={80} height={28} />
        ) : (
          <Button size="sm" onClick={onDownload} aria-label={`Download ${filename}`}>
            Download
          </Button>
        )}
      </div>
    </div>
  );
}
