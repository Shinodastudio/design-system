import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import { Select } from '@/components/primitives/Select';
import { Checkbox, Radio, Choice, ChoiceLabel } from '@/components/primitives/Choice';
import { InputField, InputLabel } from '@/components/primitives/Input';
import { ComponentFrame } from '@/components/catalogue/ComponentFrame';

export default function SelectPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <Text variant="body-md" as="h1">Select</Text>
          <Text variant="body-md" opacity={40} as="p" style={{ marginTop: 'var(--space-6)' }}>
            Native select for one-of-many.<br />
            Checkbox + radio for inline choices.<br /><br />
            Custom chevron drawn from primary text.
          </Text>
        </StickyCol>
        <div style={{ paddingInline: 'var(--padding-columns)' }}>
          <ComponentFrame
            title="Native select"
            description="Browser-rendered dropdown. Wrapper draws the chevron."
            code={`<InputField>
  <InputLabel htmlFor="role">Role</InputLabel>
  <Select id="role" defaultValue="director">
    <option value="director">Creative Director</option>
    <option value="strategist">Strategist</option>
    <option value="engineer">Engineer</option>
  </Select>
</InputField>`}
          >
            <InputField className="w-full">
              <InputLabel htmlFor="ex-role">Role</InputLabel>
              <Select id="ex-role" defaultValue="director">
                <option value="director">Creative Director</option>
                <option value="strategist">Strategist</option>
                <option value="engineer">Engineer</option>
              </Select>
            </InputField>
          </ComponentFrame>

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
            code={`<Choice><Radio name="theme" defaultChecked /> <ChoiceLabel>Light</ChoiceLabel></Choice>
<Choice><Radio name="theme" /> <ChoiceLabel>Dark</ChoiceLabel></Choice>`}
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
