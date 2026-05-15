import { MainWrapper } from '@/components/layout/MainWrapper';
import { Grid } from '@/components/layout/Grid';
import { StickyCol } from '@/components/layout/StickyCol';
import { Divider } from '@/components/primitives/Divider';
import { Text } from '@/components/primitives/Text';
import {
  Input,
  Textarea,
  InputLabel,
  InputHelp,
  InputError,
  InputField,
} from '@/components/primitives/Input';
import { ComponentFrame } from '@/components/catalogue/ComponentFrame';

export default function InputPage(): React.ReactElement {
  return (
    <MainWrapper>
      <Grid>
        <StickyCol>
          <Text variant="body-md" as="h1">Input</Text>
          <Text variant="body-md" opacity={40} as="p" style={{ marginTop: 'var(--space-6)' }}>
            Text fields and textareas.<br />
            Label, help, error follow.<br /><br />
            Focus inverts background to fill-base.<br />
            Error state borrows status-error only.
          </Text>
        </StickyCol>
        <div style={{ paddingInline: 'var(--padding-columns)' }}>
          <ComponentFrame
            title="Text input"
            description="Single-line. Placeholder at tertiary opacity."
            code={`<InputField>
  <InputLabel htmlFor="name">Name</InputLabel>
  <Input id="name" placeholder="Walter Benjamin" />
</InputField>`}
          >
            <InputField className="w-full" >
              <InputLabel htmlFor="ex-name">Name</InputLabel>
              <Input id="ex-name" placeholder="Walter Benjamin" />
            </InputField>
          </ComponentFrame>

          <ComponentFrame
            title="With help text"
            description="Help sits below at 40% opacity."
            code={`<InputField>
  <InputLabel htmlFor="email">Email</InputLabel>
  <Input id="email" type="email" placeholder="you@studio.com" />
  <InputHelp>Used only for transactional mail.</InputHelp>
</InputField>`}
          >
            <InputField className="w-full">
              <InputLabel htmlFor="ex-email">Email</InputLabel>
              <Input id="ex-email" type="email" placeholder="you@studio.com" />
              <InputHelp>Used only for transactional mail.</InputHelp>
            </InputField>
          </ComponentFrame>

          <ComponentFrame
            title="Error state"
            description="Border + message in status-error."
            code={`<InputField>
  <InputLabel htmlFor="slug">Slug</InputLabel>
  <Input id="slug" hasError defaultValue="bad slug" />
  <InputError>Slug may not contain spaces.</InputError>
</InputField>`}
          >
            <InputField className="w-full">
              <InputLabel htmlFor="ex-slug">Slug</InputLabel>
              <Input id="ex-slug" hasError defaultValue="bad slug" />
              <InputError>Slug may not contain spaces.</InputError>
            </InputField>
          </ComponentFrame>

          <ComponentFrame
            title="Textarea"
            description="Resizable vertically. Min height 6em."
            code={`<InputField>
  <InputLabel htmlFor="note">Note</InputLabel>
  <Textarea id="note" placeholder="A short paragraph..." />
</InputField>`}
          >
            <InputField className="w-full">
              <InputLabel htmlFor="ex-note">Note</InputLabel>
              <Textarea id="ex-note" placeholder="A short paragraph on the work..." />
            </InputField>
          </ComponentFrame>

          <ComponentFrame
            title="Disabled"
            description="40% opacity. No interaction."
            code={`<Input disabled defaultValue="Locked" />`}
          >
            <Input className="op-40 w-full" disabled defaultValue="Locked" />
          </ComponentFrame>
          <Divider />
        </div>
      </Grid>
    </MainWrapper>
  );
}
