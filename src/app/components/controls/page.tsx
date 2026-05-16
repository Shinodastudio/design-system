'use client';

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
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
  CommandSeparator,
} from '@/components/controls/Command';

const SIZES = ['default'] as const;

export default function ControlsPage(): React.ReactElement {
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
                    20%, 40%, 60%, 80%, and 5% for dividers. No other values.
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
            description="Filterable command list with keyboard navigation. Supports groups and empty state."
            code={`<Command>\n  <CommandInput placeholder="Search…" />\n  <CommandList>\n    <CommandGroup label="Actions">\n      <CommandItem>Open file</CommandItem>\n    </CommandGroup>\n  </CommandList>\n</Command>`}
            sizes={SIZES}
            states={['default']}
            render={(): React.ReactNode => (
              <div style={{ width: '100%', maxWidth: '320px' }}>
              <Command>
                <CommandInput placeholder="Search commands…" />
                <CommandList>
                  <CommandEmpty />
                  <CommandGroup label="Navigation">
                    <CommandItem>Colour</CommandItem>
                    <CommandItem>Typography</CommandItem>
                    <CommandItem>Components</CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup label="Actions">
                    <CommandItem>Copy token</CommandItem>
                    <CommandItem disabled>Export (unavailable)</CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
              </div>
            )}
          />

        </div>
      </Grid>
    </MainWrapper>
  );
}
