'use client';

import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Select } from '@/components/primitives/Select';
import { Checkbox, Radio, Choice, ChoiceLabel } from '@/components/primitives/Choice';
import { InputField, InputLabel } from '@/components/primitives/Input';
import { ComponentPreviewer } from '@/components/catalogue/ComponentPreviewer';
import { ComponentFrame } from '@/components/catalogue/ComponentFrame';
import { CatalogueIntro } from '@/components/catalogue/CatalogueIntro';

const SELECT_SIZES = ['body-md', 'body-sm', 'body-xs', 'body-2xs'] as const;
type SelectSize = typeof SELECT_SIZES[number];

const SIZE_FONT: Record<SelectSize, string> = {
  'body-md':  '1.25rem',
  'body-sm':  '1.125rem',
  'body-xs':  '1rem',
  'body-2xs': '0.875rem',
};

export default function SelectPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <CatalogueIntro
            title="Select"
            description="Native select, checkbox and radio — chevron drawn from primary text."
          />
        </StickyCol>
        <div>
          <ComponentPreviewer
            states={['default', 'hover', 'focus', 'disabled']}
            sizes={SELECT_SIZES}
            defaultSize="body-xs"
            render={({ state, size }): React.ReactNode => (
              <InputField className="w-full">
                <InputLabel htmlFor="preview-select">Role</InputLabel>
                <Select
                  id="preview-select"
                  defaultValue="director"
                  disabled={state === 'disabled'}
                  className={state === 'disabled' ? 'op-40' : undefined}
                  style={{ fontSize: SIZE_FONT[size] }}
                >
                  <option value="director">Creative Director</option>
                  <option value="strategist">Strategist</option>
                  <option value="engineer">Engineer</option>
                </Select>
              </InputField>
            )}
          />

          <Divider />

          <ComponentFrame
            title="Checkbox"
            description="Square, 4px radius. Filled with text-primary on check."
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
            description="Full circle. Inner dot on selection."
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
        </div>
      </Grid>
    </MainWrapper>
  );
}
