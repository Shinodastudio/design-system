'use client';

import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';
import { ComponentSection } from '@/components/catalogue/ComponentSection';
import { Button } from '@/components/primitives/Button';
import { Tooltip } from '@/components/overlay/Tooltip';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/overlay/Dialog';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/overlay/Sheet';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/overlay/Popover';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/overlay/DropdownMenu';

const SIZES = ['default'] as const;

export default function OverlayPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <CatalogueIntro
            title="Overlay"
            description="Floating surfaces: tooltips, dialogs, sheets, popovers, and dropdown menus."
          />
        </StickyCol>
        <div>

          <ComponentSection
            name="Tooltip"
            description="Appears on hover or focus after 400ms. Portalled to body. Four sides."
            code={`<Tooltip content="Helpful hint" side="top">\n  <Button>Hover me</Button>\n</Tooltip>`}
            sizes={SIZES}
            states={['default']}
            render={(): React.ReactNode => (
              <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                {(['top', 'bottom', 'left', 'right'] as const).map(side => (
                  <Tooltip key={side} content={`Tooltip on ${side}`} side={side} delay={0}>
                    <Button size="sm">{side}</Button>
                  </Tooltip>
                ))}
              </div>
            )}
          />

          <ComponentSection
            name="Dialog"
            description="Full-screen modal using the native <dialog> element. Closes on backdrop click or Escape."
            code={`<Dialog>\n  <DialogTrigger><Button>Open</Button></DialogTrigger>\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>Title</DialogTitle>\n    </DialogHeader>\n  </DialogContent>\n</Dialog>`}
            sizes={SIZES}
            states={['default']}
            render={(): React.ReactNode => (
              <Dialog>
                <DialogTrigger>
                  <Button size="md">Open dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm action</DialogTitle>
                    <DialogClose />
                  </DialogHeader>
                  <DialogDescription>
                    This action cannot be undone. Are you sure you want to proceed?
                  </DialogDescription>
                  <DialogFooter>
                    <DialogClose>Cancel</DialogClose>
                    <Button size="md">Confirm</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          />

          <ComponentSection
            name="Sheet"
            description="Slide-in panel anchored to an edge. Three sides: left, right, bottom."
            code={`<Sheet side="right">\n  <SheetTrigger><Button>Open sheet</Button></SheetTrigger>\n  <SheetContent>…</SheetContent>\n</Sheet>`}
            sizes={SIZES}
            states={['default']}
            render={(): React.ReactNode => (
              <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                {(['right', 'left', 'bottom'] as const).map(side => (
                  <Sheet key={side} side={side}>
                    <SheetTrigger>
                      <Button size="sm">{side}</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>{side.charAt(0).toUpperCase() + side.slice(1)} sheet</SheetTitle>
                      </SheetHeader>
                      <p className="body-sm op-60" style={{ marginTop: 'var(--space-4)' }}>
                        Sheet content goes here.
                      </p>
                    </SheetContent>
                  </Sheet>
                ))}
              </div>
            )}
          />

          <ComponentSection
            name="Popover"
            description="Anchored floating panel. Closes on outside click or Escape."
            code={`<Popover>\n  <PopoverTrigger><Button>Options</Button></PopoverTrigger>\n  <PopoverContent>…</PopoverContent>\n</Popover>`}
            sizes={SIZES}
            states={['default']}
            render={(): React.ReactNode => (
              <Popover>
                <PopoverTrigger>
                  <Button size="md">Open popover</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div style={{ padding: 'var(--space-3)', minWidth: '160px' }}>
                    <p className="body-sm">Popover content. Positioned below the trigger by default.</p>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          />

          <ComponentSection
            name="DropdownMenu"
            description="Keyboard-navigable list of actions. Supports labels, separators, and disabled items."
            code={`<DropdownMenu>\n  <DropdownMenuTrigger><Button>Actions</Button></DropdownMenuTrigger>\n  <DropdownMenuContent>\n    <DropdownMenuItem>Edit</DropdownMenuItem>\n    <DropdownMenuItem>Delete</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>`}
            sizes={SIZES}
            states={['default']}
            render={(): React.ReactNode => (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button size="md">Actions</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>File</DropdownMenuLabel>
                  <DropdownMenuItem index={0}>Open</DropdownMenuItem>
                  <DropdownMenuItem index={1}>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Danger zone</DropdownMenuLabel>
                  <DropdownMenuItem index={2} disabled>Archive</DropdownMenuItem>
                  <DropdownMenuItem index={3}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          />

        </div>
      </Grid>
    </MainWrapper>
  );
}
