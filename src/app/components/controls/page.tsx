'use client';

import { useState } from 'react';
import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';
import { ComponentSection } from '@/components/catalogue/ComponentSection';
import { Switch } from '@/components/controls/Switch';
import { Slider } from '@/components/controls/Slider';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/controls/Accordion';
import {
  Command,
  CommandHeader,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from '@/components/controls/Command';
import { Icon } from '@/components/icons/Icon';

const SIZES = ['default'] as const;

export default function ControlsPage(): React.ReactElement {
  const [commandPanel, setCommandPanel] = useState<'root' | 'components'>('root');
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <CatalogueIntro
            title="Controls"
            description="Interactive controls: toggle switches, accordions, and command palette."
          />
        </StickyCol>
        <div>

          <ComponentSection
            name="Switch"
            description="Toggle switch with optional label. Controlled or uncontrolled."
            code={`<Switch label="Notifications" defaultChecked />`}
            sizes={SIZES}
            states={['default', 'disabled']}
            render={({ state }): React.ReactNode => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <Switch
                  label="Off by default"
                  disabled={state === 'disabled'}
                />
                <Switch
                  label="On by default"
                  defaultChecked
                  disabled={state === 'disabled'}
                />
              </div>
            )}
          />

          <ComponentSection
            name="Accordion — single"
            description="Only one item open at a time. Chevron animates on open/close."
            code={`<Accordion type="single">\n  <AccordionItem value="one">\n    <AccordionTrigger>Question</AccordionTrigger>\n    <AccordionContent>Answer</AccordionContent>\n  </AccordionItem>\n</Accordion>`}
            sizes={SIZES}
            states={['default']}
            render={(): React.ReactNode => (
              <div style={{ width: '100%' }}>
              <Accordion type="single">
                <AccordionItem value="one">
                  <AccordionTrigger>What is the Shinoda Design System?</AccordionTrigger>
                  <AccordionContent>
                    A token-first system built for brand-led products. Transparent at rest, deliberate in motion.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="two">
                  <AccordionTrigger>Why underline-only inputs?</AccordionTrigger>
                  <AccordionContent>
                    Box removal reduces visual noise. The underline alone is sufficient affordance for text entry.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="three">
                  <AccordionTrigger>What opacity values are permitted?</AccordionTrigger>
                  <AccordionContent>
                    20%, 40%, 60%, 80%, and 10% for dividers. No other values.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              </div>
            )}
          />

          <ComponentSection
            name="Accordion — multiple"
            description="Multiple items can be open simultaneously."
            code={`<Accordion type="multiple">\n  …\n</Accordion>`}
            sizes={SIZES}
            states={['default']}
            render={(): React.ReactNode => (
              <div style={{ width: '100%' }}>
              <Accordion type="multiple" defaultValue={['a']}>
                <AccordionItem value="a">
                  <AccordionTrigger>Typography</AccordionTrigger>
                  <AccordionContent>
                    GT America for body. GT Super Text for editorial display only.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="b">
                  <AccordionTrigger>Layout</AccordionTrigger>
                  <AccordionContent>
                    1fr 1fr grid always. No asymmetric columns. Max width 1280px.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              </div>
            )}
          />

          <ComponentSection
            name="Slider"
            description="Stepped range input with snapping. Gravity on the thumb. Tooltip on drag and focus. Optional min/max labels."
            code={`<Slider defaultValue={40} step={10} showLabels />`}
            sizes={SIZES}
            states={['default', 'disabled']}
            render={({ state }): React.ReactNode => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', width: '100%' }}>
                <Slider
                  defaultValue={40}
                  step={10}
                  disabled={state === 'disabled'}
                />
                <Slider
                  defaultValue={60}
                  step={5}
                  showLabels
                  disabled={state === 'disabled'}
                />
                <Slider
                  defaultValue={25}
                  min={0}
                  max={200}
                  step={25}
                  showLabels
                  disabled={state === 'disabled'}
                />
              </div>
            )}
          />

          <ComponentSection
            name="Command"
            description="Filterable command palette with icon items and sub-level chevrons. Groups live in a white card, separated by spacing rather than divider lines. Drilling into a sub-level swaps the search field's neighbour for a persistent header with a back button — not an in-list item. Empty state only shows after a query."
            code={`<Command>\n  <CommandInput placeholder="Search…" />\n  <CommandList>\n    <CommandGroup label="Navigation">\n      <CommandItem icon={<Icon name="color-palette" size="em" />}>Colour</CommandItem>\n      <CommandItem icon={<Icon name="module-puzzle" size="em" />} hasSubmenu>Components</CommandItem>\n    </CommandGroup>\n    <CommandGroup label="Actions">\n      <CommandItem icon={<Icon name="copy-paste" size="em" />}>Copy token</CommandItem>\n    </CommandGroup>\n    <CommandEmpty />\n  </CommandList>\n</Command>\n\n// Drilled into a sub-level — header replaces the in-list "Back" item:\n<Command key="components">\n  <CommandHeader label="Components" onBack={goBack} />\n  <CommandInput placeholder="Search components…" onBackspaceEmpty={goBack} />\n  <CommandList>…</CommandList>\n</Command>`}
            sizes={SIZES}
            states={['default']}
            render={(): React.ReactNode => (
              <Command key={commandPanel}>
                {commandPanel === 'components' && (
                  <CommandHeader label="Components" onBack={(): void => setCommandPanel('root')} />
                )}
                <CommandInput
                  placeholder={commandPanel === 'root' ? 'Search commands…' : 'Search components…'}
                  onBackspaceEmpty={commandPanel === 'components' ? (): void => setCommandPanel('root') : undefined}
                />
                <CommandList>
                  {commandPanel === 'root' ? (
                    <>
                      <CommandGroup label="Navigation">
                        <CommandItem icon={<Icon name="color-palette" size="em" />}>Colour</CommandItem>
                        <CommandItem icon={<Icon name="type-cursor-1" size="em" />}>Typography</CommandItem>
                        <CommandItem
                          icon={<Icon name="module-puzzle" size="em" />}
                          hasSubmenu
                          onSelect={(): void => setCommandPanel('components')}
                        >
                          Components
                        </CommandItem>
                      </CommandGroup>
                      <CommandGroup label="Actions">
                        <CommandItem icon={<Icon name="copy-paste" size="em" />}>Copy token</CommandItem>
                        <CommandItem icon={<Icon name="export-output" size="em" />} disabled>Export</CommandItem>
                      </CommandGroup>
                    </>
                  ) : (
                    <>
                      <CommandGroup label="Primitives">
                        <CommandItem icon={<Icon name="cursor-click" size="em" />}>Button</CommandItem>
                        <CommandItem icon={<Icon name="edit-frame-textbox" size="em" />}>Input</CommandItem>
                        <CommandItem icon={<Icon name="horizontal-toggle-button-single-left" size="em" />}>Switch</CommandItem>
                        <CommandItem icon={<Icon name="slider-horizontal-1" size="em" />}>Slider</CommandItem>
                      </CommandGroup>
                      <CommandGroup label="Overlay">
                        <CommandItem icon={<Icon name="layout-border-frame" size="em" />}>Dialog</CommandItem>
                        <CommandItem icon={<Icon name="layout-border-right" size="em" />}>Sheet</CommandItem>
                        <CommandItem icon={<Icon name="chat-bubble-square" size="em" />}>Tooltip</CommandItem>
                      </CommandGroup>
                    </>
                  )}
                  <CommandEmpty />
                </CommandList>
              </Command>
            )}
          />

        </div>
      </Grid>
    </MainWrapper>
  );
}
