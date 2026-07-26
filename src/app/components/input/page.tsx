'use client';

import { useState } from 'react';
import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import {
  Input,
  Textarea,
  InputLabel,
  InputHelp,
  InputError,
  InputField,
} from '@/components/primitives/Input';
import { Select } from '@/components/primitives/Select';
import { Checkbox, Radio, Choice, ChoiceLabel } from '@/components/primitives/Choice';
import { SearchDropdown } from '@/components/search/SearchDropdown';
import type { SearchOption } from '@/components/search/SearchDropdown';
import { ComponentSection } from '@/components/catalogue/ComponentSection';
import { ComponentFrame } from '@/components/catalogue/ComponentFrame';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';

const INPUT_SIZES = [
  'heading-xl', 'heading-lg', 'heading-md', 'heading-sm', 'heading-xs', 'heading-2xs',
  'body-xl', 'body-lg', 'body-md', 'body-sm', 'body-xs', 'body-2xs',
] as const;
type InputSize = typeof INPUT_SIZES[number];

const INPUT_FONT: Record<InputSize, string> = {
  'heading-xl':  '2.5rem',
  'heading-lg':  '2rem',
  'heading-md':  '1.5rem',
  'heading-sm':  '1.25rem',
  'heading-xs':  '1rem',
  'heading-2xs': '0.75rem',
  'body-xl':     '1.5rem',
  'body-lg':     '1.375rem',
  'body-md':     '1.25rem',
  'body-sm':     '1.125rem',
  'body-xs':     '1rem',
  'body-2xs':    '0.875rem',
};

const SELECT_FONT: Record<InputSize, string> = {
  ...INPUT_FONT,
  'heading-2xs': '0.875rem',
};

const SEARCH_SIZES = ['default'] as const;

const DESIGN_TOKENS: readonly SearchOption[] = [
  { value: 'color-primary', label: 'color-primary', description: 'Primary text colour token' },
  { value: 'color-fill-base', label: 'color-fill-base', description: 'Background fill token' },
  { value: 'space-4', label: 'space-4', description: '16px standard block padding' },
  { value: 'space-8', label: 'space-8', description: '32px section spacing' },
  { value: 'radius-sm', label: 'radius-sm', description: 'Small border radius' },
  { value: 'opacity-60', label: 'opacity-60', description: '60% opacity — secondary content' },
] as const;

const CITIES: readonly SearchOption[] = [
  { value: 'london', label: 'London', description: 'United Kingdom' },
  { value: 'paris', label: 'Paris', description: 'France' },
  { value: 'berlin', label: 'Berlin', description: 'Germany' },
  { value: 'amsterdam', label: 'Amsterdam', description: 'Netherlands' },
  { value: 'lisbon', label: 'Lisbon', description: 'Portugal' },
] as const;

export default function InputPage(): React.ReactElement {
  const [tokenValue, setTokenValue] = useState<string | undefined>(undefined);
  const [cityValue, setCityValue] = useState<string | undefined>(undefined);

  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <CatalogueIntro
            title="Input"
            description="Text fields, textareas, select, checkbox, radio, and search dropdown. Underline-only — no outer box. 1px rule lifts to primary text on focus."
          />
        </StickyCol>
        <div>

          <ComponentSection
            name="Text Input"
            description="Underline sits at outline colour at rest — lifts to primary text colour on focus."
            code={({ state, size }): string => {
              const props = [
                'id="name"',
                'placeholder="Walter Benjamin"',
                `style={{ fontSize: '${INPUT_FONT[size]}' }}`,
                state === 'disabled' ? 'disabled' : null,
              ].filter((p): p is string => p != null).join(' ');
              return `<InputField>\n  <InputLabel htmlFor="name">Name</InputLabel>\n  <Input ${props} />\n</InputField>`;
            }}
            sizes={INPUT_SIZES}
            defaultSize="heading-md"
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
            code={({ size }): string =>
              `<InputField>\n  <InputLabel htmlFor="email">Email</InputLabel>\n  <Input id="email" type="email" placeholder="you@studio.com" style={{ fontSize: '${INPUT_FONT[size]}' }} />\n  <InputHelp>Used only for transactional mail.</InputHelp>\n</InputField>`
            }
            sizes={INPUT_SIZES}
            defaultSize="heading-md"
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
            code={({ size }): string =>
              `<InputField>\n  <InputLabel htmlFor="slug">Slug</InputLabel>\n  <Input id="slug" hasError defaultValue="bad slug" style={{ fontSize: '${INPUT_FONT[size]}' }} />\n  <InputError>Slug may not contain spaces.</InputError>\n</InputField>`
            }
            sizes={INPUT_SIZES}
            defaultSize="heading-md"
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
            code={({ size }): string =>
              `<InputField>\n  <InputLabel htmlFor="note">Note</InputLabel>\n  <Textarea id="note" placeholder="A short paragraph..." style={{ fontSize: '${INPUT_FONT[size]}' }} />\n</InputField>`
            }
            sizes={INPUT_SIZES}
            defaultSize="heading-md"
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

          <Divider />

          <ComponentSection
            name="Select"
            description="Native select with a custom chevron. Same underline treatment as text input."
            code={({ state, size }): string => {
              const props = [
                'id="role"',
                'defaultValue="director"',
                `style={{ fontSize: '${SELECT_FONT[size]}' }}`,
                state === 'disabled' ? 'disabled' : null,
              ].filter((p): p is string => p != null).join(' ');
              return `<InputField>\n  <InputLabel htmlFor="role">Role</InputLabel>\n  <Select ${props}>\n    <option value="director">Creative Director</option>\n    <option value="strategist">Strategist</option>\n    <option value="engineer">Engineer</option>\n  </Select>\n</InputField>`;
            }}
            sizes={INPUT_SIZES}
            defaultSize="heading-md"
            states={['default', 'hover', 'focus', 'disabled']}
            render={({ state, size }): React.ReactNode => (
              <InputField style={{ width: '100%', maxWidth: '24em' }}>
                <InputLabel htmlFor="preview-select">Role</InputLabel>
                <Select
                  id="preview-select"
                  defaultValue="director"
                  disabled={state === 'disabled'}
                  className={state === 'disabled' ? 'op-40' : undefined}
                  style={{ fontSize: SELECT_FONT[size as InputSize] }}
                >
                  <option value="director">Creative Director</option>
                  <option value="strategist">Strategist</option>
                  <option value="engineer">Engineer</option>
                </Select>
              </InputField>
            )}
          />

          <ComponentFrame
            title="Checkbox"
            description="Square, 4px radius. Filled with text-primary on check. Cursor hides on hover."
            code={`<Choice>
  <Checkbox defaultChecked />
  <ChoiceLabel>Subscribe to dispatches</ChoiceLabel>
</Choice>`}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <Choice>
                <Checkbox defaultChecked />
                <ChoiceLabel>Subscribe to dispatches</ChoiceLabel>
              </Choice>
              <Choice>
                <Checkbox />
                <ChoiceLabel>Send weekly digest</ChoiceLabel>
              </Choice>
            </div>
          </ComponentFrame>

          <ComponentFrame
            title="Radio group"
            description="Perfectly circular outer and inner. Uniform across all font-size contexts."
            code={`<Choice><Radio name="theme" defaultChecked /> <ChoiceLabel>Light</ChoiceLabel></Choice>`}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <Choice>
                <Radio name="ex-theme" defaultChecked />
                <ChoiceLabel>Light</ChoiceLabel>
              </Choice>
              <Choice>
                <Radio name="ex-theme" />
                <ChoiceLabel>Dark</ChoiceLabel>
              </Choice>
              <Choice>
                <Radio name="ex-theme" />
                <ChoiceLabel>System</ChoiceLabel>
              </Choice>
            </div>
          </ComponentFrame>

          <Divider />

          <ComponentSection
            name="SearchDropdown"
            description="Filters options as you type. Keyboard navigable with arrow keys and Enter."
            code={({ state }): string =>
              state === 'disabled'
                ? `<SearchDropdown\n  options={options}\n  value={value}\n  onChange={setValue}\n  placeholder="Search tokens…"\n  disabled\n/>`
                : `<SearchDropdown\n  options={options}\n  value={value}\n  onChange={setValue}\n  placeholder="Search tokens…"\n/>`
            }
            sizes={SEARCH_SIZES}
            states={['default', 'disabled']}
            render={({ state }): React.ReactNode => (
              <div style={{ width: '100%', maxWidth: '20em' }}>
                <SearchDropdown
                  options={DESIGN_TOKENS}
                  value={tokenValue}
                  onChange={setTokenValue}
                  placeholder="Search tokens…"
                  disabled={state === 'disabled'}
                />
              </div>
            )}
          />

          <ComponentSection
            name="SearchDropdown with descriptions"
            description="Each option can carry a secondary description line rendered at 40% opacity."
            code={`const options = [\n  { value: 'london', label: 'London', description: 'United Kingdom' },\n  …\n];\n\n<SearchDropdown options={options} onChange={setValue} />`}
            sizes={SEARCH_SIZES}
            states={['default']}
            render={(): React.ReactNode => (
              <div style={{ width: '100%', maxWidth: '20em' }}>
                <SearchDropdown
                  options={CITIES}
                  value={cityValue}
                  onChange={setCityValue}
                  placeholder="Search cities…"
                />
              </div>
            )}
          />

          <ComponentSection
            name="SearchDropdown — loading state"
            description="Pass isLoading to show a loading message while options are being fetched."
            code={`<SearchDropdown options={[]} isLoading placeholder="Searching…" />`}
            sizes={SEARCH_SIZES}
            states={['default']}
            render={(): React.ReactNode => (
              <div style={{ width: '100%', maxWidth: '20em' }}>
                <SearchDropdown
                  options={[]}
                  isLoading
                  placeholder="Searching…"
                />
              </div>
            )}
          />

        </div>
      </Grid>
    </MainWrapper>
  );
}
