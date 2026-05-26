'use client';

import { useState } from 'react';
import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { FileDropzone, FileChip } from '@/components/primitives/FileDropzone';
import { DownloadTile } from '@/components/primitives/DownloadTile';
import { ComponentSection } from '@/components/catalogue/ComponentSection';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';

const DEMO_FILE_PDF = new File(
  [new Uint8Array(2_411_724)],
  'brand-guidelines.pdf',
  { type: 'application/pdf' },
);
const DEMO_FILE_PNG = new File(
  [new Uint8Array(912_384)],
  'hero-image.png',
  { type: 'image/png' },
);

// ─── Interactive combined demo ────────────────────────────────────────────────

function CombinedDemo(): React.ReactElement {
  const [files, setFiles] = useState<readonly File[]>([]);

  function handleAccepted(incoming: readonly File[]): void {
    setFiles((prev) => {
      const existing = new Set(prev.map((f) => f.name));
      return [...prev, ...incoming.filter((f) => !existing.has(f.name))];
    });
  }

  function handleRemove(name: string): void {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: '100%' }}>
      <FileDropzone
        multiple
        accept=".pdf,.png,.jpg,.jpeg"
        hint=".pdf .png .jpg — up to 10 MB each"
        maxSize={10_485_760}
        onFilesAccepted={handleAccepted}
      />
      {files.map((file) => (
        <FileChip
          key={file.name}
          file={file}
          onRemove={() => handleRemove(file.name)}
        />
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const DROPZONE_SIZES = ['default'] as const;
type DropzoneSize = typeof DROPZONE_SIZES[number];

export default function UploadPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <CatalogueIntro
            title="Upload"
            description="Drag-and-drop zone, file chip list, and download tile for queued or completed assets."
          />
        </StickyCol>
        <div>

          <ComponentSection<DropzoneSize>
            name="Dropzone"
            description="Click or drag to trigger the file picker. Drag-over lifts to fill-secondary; error applies status-error border."
            code={`<FileDropzone\n  multiple\n  accept=".pdf,.png"\n  hint=".pdf .png — up to 10 MB"\n  onFilesAccepted={(files) => console.log(files)}\n/>`}
            sizes={DROPZONE_SIZES}
            states={['default', 'active', 'disabled']}
            render={({ state }): React.ReactNode => (
              <FileDropzone
                multiple
                hint=".pdf .png .jpg — up to 10 MB each"
                className={state === 'active' ? 'dropzone-active' : undefined}
                disabled={state === 'disabled'}
                onFilesAccepted={() => undefined}
              />
            )}
          />

          <ComponentSection<DropzoneSize>
            name="Dropzone — error"
            description="Error message appears below the label; border shifts to status-error. Pass a rejection message from onFilesRejected."
            code={`<FileDropzone\n  accept=".pdf"\n  error="File exceeds the 5 MB limit."\n  onFilesAccepted={(files) => console.log(files)}\n/>`}
            sizes={DROPZONE_SIZES}
            states={['default']}
            render={(): React.ReactNode => (
              <FileDropzone
                accept=".pdf"
                error="File exceeds the 5 MB limit."
                onFilesAccepted={() => undefined}
              />
            )}
          />

          <ComponentSection<DropzoneSize>
            name="File chip"
            description="Compact row for each queued or uploaded file. Filename truncates with ellipsis at any width."
            code={`<FileChip\n  file={file}\n  onRemove={() => removeFile(file.name)}\n/>`}
            sizes={DROPZONE_SIZES}
            states={['default']}
            render={(): React.ReactNode => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', width: '100%' }}>
                <FileChip file={DEMO_FILE_PDF} onRemove={() => undefined} />
                <FileChip file={DEMO_FILE_PNG} onRemove={() => undefined} />
              </div>
            )}
          />

          <ComponentSection<DropzoneSize>
            name="DownloadTile"
            description="File asset row with icon, filename, type/size metadata, and a download action. Pairs with the dropzone — what goes up can come back down."
            code={`<DownloadTile\n  filename="shinoda-tokens.css"\n  fileType="CSS"\n  fileSize="12 KB"\n  onDownload={fn}\n/>`}
            sizes={DROPZONE_SIZES}
            states={['default']}
            render={(): React.ReactNode => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: '100%' }}>
                <DownloadTile
                  filename="shinoda-tokens.css"
                  fileType="CSS"
                  fileSize="12 KB"
                  description="All design tokens as CSS custom properties"
                  onDownload={() => undefined}
                />
                <DownloadTile
                  filename="shinoda-base.css"
                  fileType="CSS"
                  fileSize="8 KB"
                  description="Reset, typography, layout shell"
                  onDownload={() => undefined}
                />
                <DownloadTile
                  filename="brand-guidelines.pdf"
                  fileType="PDF"
                  fileSize="4.2 MB"
                  onDownload={() => undefined}
                />
              </div>
            )}
          />

          <ComponentSection<DropzoneSize>
            name="DownloadTile — loading state"
            description="Pass isDownloading to replace the button with a Skeleton placeholder during async download."
            code={`<DownloadTile\n  filename="export.zip"\n  onDownload={fn}\n  isDownloading\n/>`}
            sizes={DROPZONE_SIZES}
            states={['default']}
            render={(): React.ReactNode => (
              <DownloadTile
                filename="export.zip"
                fileType="ZIP"
                fileSize="56 MB"
                onDownload={() => undefined}
                isDownloading
              />
            )}
          />

          <ComponentSection<DropzoneSize>
            name="Combined"
            description="Dropzone wired to a file list — drop or browse, then remove individual files. Try it."
            code={`const [files, setFiles] = useState<readonly File[]>([]);\n\n<FileDropzone multiple onFilesAccepted={(f) => setFiles((p) => [...p, ...f])} />\n{files.map((f) => (\n  <FileChip key={f.name} file={f} onRemove={() => remove(f.name)} />\n))}`}
            sizes={DROPZONE_SIZES}
            states={['default']}
            render={(): React.ReactNode => <CombinedDemo />}
          />

        </div>
      </Grid>
    </MainWrapper>
  );
}
