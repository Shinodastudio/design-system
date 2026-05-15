'use client';

import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import {
  Input,
  Textarea,
  InputLabel,
  InputHelp,
  InputError,
  InputField,
} from '@/components/primitives/Input';
import { ComponentSection } from '@/components/catalogue/ComponentSection';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';

const INPUT_SIZES = ['body-md', 'body-sm', 'body-xs', 'body-2xs'] as const;
type InputSize = typeof INPUT_SIZES[number];

const INPUT_FONT: Record<InputSize, string> = {
  'body-md':  '1.25rem',
  'body-sm':  '1.125rem',
  'body-xs':  '1rem',
  'body-2xs': '0.875rem',
};

export default function InputPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <CatalogueIntro
            title="Input"
            description="Underline-only — no outer box. Single 1px rule lifts to full primary on focus."
          />
        </StickyCol>
        <div style={{ paddingLeft: 'var(--padding-columns)' }}>

          <ComponentSection
            name="Text Input"
            description="Underline sits at outline colour at rest — lifts to primary text colour on focus."
            code={`<InputField>\n  <InputLabel htmlFor="name">Name</InputLabel>\n  <Input id="name" placeholder="Walter Benjamin" />\n</InputField>`}
            sizes={INPUT_SIZES}
            defaultSize="body-xs"
            states={['default', 'hover', 'focus', 'disabled']}
            render={({ state, size }): React.ReactNode => (
              <InputField style={{ width: '100%', maxWidth: '24em' }}>
                <InputLabel htmlFor="sec-name">Name</InputLabel>
                <Input
                  id="sec-name"
                  placeholder="Walter Benjamin"
                  disabled={state === 'disabled'}
                  className={state === 'disabled' ? 'op-40' : undefined}
                  style={{ fontSize: INPUT_FONT[size as InputSize] }}
                />
              </InputField>
            )}
          />

          <ComponentSection
            name="Input with help text"
            description="Help text sits below the field at 40% opacity — always visible, not just on error."
            code={`<InputField>\n  <InputLabel htmlFor="email">Email</InputLabel>\n  <Input id="email" type="email" placeholder="you@studio.com" />\n  <InputHelp>Used only for transactional mail.</InputHelp>\n</InputField>`}
            sizes={INPUT_SIZES}
            defaultSize="body-xs"
            states={['default', 'focus']}
            render={({ size }): React.ReactNode => (
              <InputField style={{ width: '100%', maxWidth: '24em' }}>
                <InputLabel htmlFor="sec-email">Email</InputLabel>
                <Input
                  id="sec-email"
                  type="email"
                  placeholder="you@studio.com"
                  style={{ fontSize: INPUT_FONT[size as InputSize] }}
                />
                <InputHelp>Used only for transactional mail.</InputHelp>
              </InputField>
            )}
          />

          <ComponentSection
            name="Error state"
            description="Underline and error message both use status-error. Never use red on the field fill."
            code={`<InputField>\n  <InputLabel htmlFor="slug">Slug</InputLabel>\n  <Input id="slug" hasError defaultValue="bad slug" />\n  <InputError>Slug may not contain spaces.</InputError>\n</InputField>`}
            sizes={INPUT_SIZES}
            defaultSize="body-xs"
            states={['default']}
            render={({ size }): React.ReactNode => (
              <InputField style={{ width: '100%', maxWidth: '24em' }}>
                <InputLabel htmlFor="sec-slug">Slug</InputLabel>
                <Input
                  id="sec-slug"
                  hasError
                  defaultValue="bad slug"
                  style={{ fontSize: INPUT_FONT[size as InputSize] }}
                />
                <InputError>Slug may not contain spaces.</InputError>
              </InputField>
            )}
          />

          <ComponentSection
            name="Textarea"
            description="Vertical resize only. Same underline treatment as single-line input."
            code={`<InputField>\n  <InputLabel htmlFor="note">Note</InputLabel>\n  <Textarea id="note" placeholder="A short paragraph..." />\n</InputField>`}
            sizes={INPUT_SIZES}
            defaultSize="body-xs"
            states={['default', 'focus']}
            render={({ size }): React.ReactNode => (
              <InputField style={{ width: '100%', maxWidth: '24em' }}>
                <InputLabel htmlFor="sec-note">Note</InputLabel>
                <Textarea
                  id="sec-note"
                  placeholder="A short paragraph on the work..."
                  style={{ fontSize: INPUT_FONT[size as InputSize] }}
                />
              </InputField>
            )}
          />

        </div>
      </Grid>
    </MainWrapper>
  );
}
