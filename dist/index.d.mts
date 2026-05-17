import * as react from 'react';
import { ClassValue } from 'clsx';

interface DividerProps {
    readonly className?: string;
}
declare function Divider({ className }: DividerProps): React.ReactElement;

declare const HEADING_VARIANTS: readonly ["heading-xl", "heading-lg", "heading-md", "heading-sm", "heading-xs", "heading-2xs"];
declare const SUBHEADING_VARIANTS: readonly ["subheading-lg", "subheading-md", "subheading-sm"];
declare const BODY_VARIANTS: readonly ["body-xl", "body-lg", "body-md", "body-sm", "body-xs", "body-2xs"];
declare const ALL_TYPE_VARIANTS: readonly ["heading-xl", "heading-lg", "heading-md", "heading-sm", "heading-xs", "heading-2xs", "subheading-lg", "subheading-md", "subheading-sm", "body-xl", "body-lg", "body-md", "body-sm", "body-xs", "body-2xs"];
type HeadingVariant = typeof HEADING_VARIANTS[number];
type SubheadingVariant = typeof SUBHEADING_VARIANTS[number];
type BodyVariant = typeof BODY_VARIANTS[number];
type TypeVariant = typeof ALL_TYPE_VARIANTS[number];
declare const OPACITY_LEVELS: readonly [80, 60, 40, 20];
type OpacityLevel = typeof OPACITY_LEVELS[number];
declare const SEMANTIC_COLORS: readonly ["fill-base", "fill-primary", "fill-secondary", "fill-tertiary", "text-primary", "text-secondary", "text-tertiary", "text-contrast", "outline", "overlay-weak", "overlay-core", "overlay-strong", "status-error", "status-warning", "status-info", "status-success"];
type SemanticColor = typeof SEMANTIC_COLORS[number];
declare const SPACING_TOKENS: readonly [{
    readonly name: "--space-1";
    readonly value: "4px";
}, {
    readonly name: "--space-2";
    readonly value: "8px";
}, {
    readonly name: "--space-3";
    readonly value: "12px";
}, {
    readonly name: "--space-4";
    readonly value: "16px";
}, {
    readonly name: "--space-5";
    readonly value: "20px";
}, {
    readonly name: "--space-6";
    readonly value: "24px";
}, {
    readonly name: "--space-7";
    readonly value: "28px";
}, {
    readonly name: "--space-8";
    readonly value: "32px";
}, {
    readonly name: "--space-9";
    readonly value: "36px";
}, {
    readonly name: "--space-10";
    readonly value: "40px";
}, {
    readonly name: "--space-12";
    readonly value: "48px";
}, {
    readonly name: "--space-14";
    readonly value: "56px";
}, {
    readonly name: "--space-16";
    readonly value: "64px";
}, {
    readonly name: "--space-18";
    readonly value: "72px";
}, {
    readonly name: "--space-20";
    readonly value: "80px";
}, {
    readonly name: "--space-24";
    readonly value: "96px";
}, {
    readonly name: "--space-28";
    readonly value: "112px";
}, {
    readonly name: "--space-32";
    readonly value: "128px";
}];
declare const CONTAINER_TOKENS: readonly [{
    readonly name: "--container-3xs";
    readonly value: "128px";
}, {
    readonly name: "--container-2xs";
    readonly value: "192px";
}, {
    readonly name: "--container-xs";
    readonly value: "256px";
}, {
    readonly name: "--container-sm";
    readonly value: "320px";
}, {
    readonly name: "--container-md";
    readonly value: "384px";
}, {
    readonly name: "--container-lg";
    readonly value: "512px";
}, {
    readonly name: "--container-xl";
    readonly value: "640px";
}, {
    readonly name: "--container-2xl";
    readonly value: "768px";
}, {
    readonly name: "--container-3xl";
    readonly value: "896px";
}, {
    readonly name: "--container-4xl";
    readonly value: "1024px";
}, {
    readonly name: "--container-5xl";
    readonly value: "1312px";
}];
declare const BREAKPOINT_TOKENS: readonly [{
    readonly name: "--breakpoint-2xs";
    readonly value: "400px";
}, {
    readonly name: "--breakpoint-xs";
    readonly value: "428px";
}, {
    readonly name: "--breakpoint-sm";
    readonly value: "640px";
}, {
    readonly name: "--breakpoint-md";
    readonly value: "768px";
}, {
    readonly name: "--breakpoint-lg";
    readonly value: "1024px";
}, {
    readonly name: "--breakpoint-xl";
    readonly value: "1280px";
}, {
    readonly name: "--breakpoint-2xl";
    readonly value: "1440px";
}, {
    readonly name: "--breakpoint-3xl";
    readonly value: "1920px";
}];
declare const RADIUS_TOKENS: readonly [{
    readonly name: "--radius-none";
    readonly value: "0px";
}, {
    readonly name: "--radius-xs";
    readonly value: "4px";
}, {
    readonly name: "--radius-sm";
    readonly value: "8px";
}, {
    readonly name: "--radius-md";
    readonly value: "12px";
}, {
    readonly name: "--radius-lg";
    readonly value: "16px";
}, {
    readonly name: "--radius-xl";
    readonly value: "24px";
}, {
    readonly name: "--radius-2xl";
    readonly value: "32px";
}, {
    readonly name: "--radius-3xl";
    readonly value: "64px";
}, {
    readonly name: "--radius-4xl";
    readonly value: "128px";
}, {
    readonly name: "--radius-full";
    readonly value: "9999px";
}];
declare const BORDER_TOKENS: readonly [{
    readonly name: "--border-none";
    readonly value: "0px";
}, {
    readonly name: "--border-sm";
    readonly value: "1px";
}, {
    readonly name: "--border-md";
    readonly value: "2px";
}, {
    readonly name: "--border-lg";
    readonly value: "4px";
}, {
    readonly name: "--border-xl";
    readonly value: "8px";
}];
declare const BLUR_TOKENS: readonly [{
    readonly name: "--blur-none";
    readonly value: "0px";
}, {
    readonly name: "--blur-xs";
    readonly value: "8px";
}, {
    readonly name: "--blur-sm";
    readonly value: "16px";
}, {
    readonly name: "--blur-md";
    readonly value: "32px";
}, {
    readonly name: "--blur-lg";
    readonly value: "64px";
}, {
    readonly name: "--blur-xl";
    readonly value: "128px";
}, {
    readonly name: "--blur-2xl";
    readonly value: "256px";
}, {
    readonly name: "--blur-3xl";
    readonly value: "512px";
}, {
    readonly name: "--blur-4xl";
    readonly value: "1024px";
}];
declare const ALPHA_TOKENS: readonly [{
    readonly name: "--alpha-5";
    readonly value: "5%";
}, {
    readonly name: "--alpha-10";
    readonly value: "10%";
}, {
    readonly name: "--alpha-20";
    readonly value: "20%";
}, {
    readonly name: "--alpha-30";
    readonly value: "30%";
}, {
    readonly name: "--alpha-40";
    readonly value: "40%";
}, {
    readonly name: "--alpha-50";
    readonly value: "50%";
}, {
    readonly name: "--alpha-60";
    readonly value: "60%";
}, {
    readonly name: "--alpha-70";
    readonly value: "70%";
}, {
    readonly name: "--alpha-80";
    readonly value: "80%";
}, {
    readonly name: "--alpha-90";
    readonly value: "90%";
}];
declare const ACCENT_TOKENS: readonly [{
    readonly name: "--accent-red";
    readonly label: "Red";
}, {
    readonly name: "--accent-orange";
    readonly label: "Orange";
}, {
    readonly name: "--accent-yellow";
    readonly label: "Yellow";
}, {
    readonly name: "--accent-green";
    readonly label: "Green";
}, {
    readonly name: "--accent-blue";
    readonly label: "Blue";
}];
declare const PADDING_TOKENS: readonly [{
    readonly name: "--padding-page";
    readonly value: "4em";
    readonly note: "Outer page gutter — 64/32/24/24 (md/sm/xs/2xs)";
}, {
    readonly name: "--padding-columns";
    readonly value: "4em";
    readonly note: "Between columns — mirrors page";
}, {
    readonly name: "--padding-section-sm";
    readonly value: "4em";
    readonly note: "Section vertical, small — 64/32/24/24";
}, {
    readonly name: "--padding-section-md";
    readonly value: "6em";
    readonly note: "Section vertical, medium — 96/96/64/64";
}, {
    readonly name: "--padding-section-lg";
    readonly value: "8em";
    readonly note: "Section vertical, large — 128 across all";
}, {
    readonly name: "--padding-container";
    readonly value: "4em";
    readonly note: "Inner container — 64/64/24/24";
}, {
    readonly name: "--padding-nav";
    readonly value: "8em";
    readonly note: "Nav region — 128/64/24/24";
}, {
    readonly name: "--padding-card";
    readonly value: "2em";
    readonly note: "Card interior — 32/32/24/24";
}];
declare const CONTAINER_MAXWIDTH_TOKEN: {
    readonly name: "--container-maxwidth";
    readonly values: {
        readonly md: "1312px";
        readonly sm: "960px";
        readonly xs: "736px";
        readonly '2xs': "396px";
    };
    readonly note: "Responsive page max-width — May 2026 spec";
};
declare const LEADING_TOKENS: readonly [{
    readonly name: "--leading-heading";
    readonly value: "1.05";
    readonly note: "Display + heading";
}, {
    readonly name: "--leading-body-xl";
    readonly value: "1.20";
    readonly note: "Body XL";
}, {
    readonly name: "--leading-body-md";
    readonly value: "1.30";
    readonly note: "Body MD";
}, {
    readonly name: "--leading-body-xs";
    readonly value: "1.40";
    readonly note: "Body XS";
}, {
    readonly name: "--leading-title";
    readonly value: "1.05";
    readonly note: "Figma primitive";
}, {
    readonly name: "--leading-subtitle";
    readonly value: "1.05";
    readonly note: "Figma primitive";
}, {
    readonly name: "--leading-body";
    readonly value: "1.30";
    readonly note: "Figma primitive";
}, {
    readonly name: "--leading-paragraph";
    readonly value: "1.50";
    readonly note: "Figma primitive";
}, {
    readonly name: "--leading-caption";
    readonly value: "1.00";
    readonly note: "Figma primitive";
}];
declare const TRACKING_TOKENS: readonly [{
    readonly name: "--tracking-n040";
    readonly value: "-0.040em";
}, {
    readonly name: "--tracking-n035";
    readonly value: "-0.035em";
}, {
    readonly name: "--tracking-n030";
    readonly value: "-0.030em";
}, {
    readonly name: "--tracking-n025";
    readonly value: "-0.025em";
}, {
    readonly name: "--tracking-n020";
    readonly value: "-0.020em";
}, {
    readonly name: "--tracking-n015";
    readonly value: "-0.015em";
}, {
    readonly name: "--tracking-n010";
    readonly value: "-0.010em";
}, {
    readonly name: "--tracking-n005";
    readonly value: "-0.005em";
}, {
    readonly name: "--tracking-none";
    readonly value: "0em";
}];
declare const FONT_WEIGHT_TOKENS: readonly [{
    readonly name: "--fw-thin";
    readonly value: "100";
}, {
    readonly name: "--fw-extralight";
    readonly value: "200";
}, {
    readonly name: "--fw-light";
    readonly value: "300";
}, {
    readonly name: "--fw-normal";
    readonly value: "400";
}, {
    readonly name: "--fw-book";
    readonly value: "450";
}, {
    readonly name: "--fw-medium";
    readonly value: "500";
}, {
    readonly name: "--fw-semibold";
    readonly value: "600";
}, {
    readonly name: "--fw-bold";
    readonly value: "700";
}, {
    readonly name: "--fw-extrabold";
    readonly value: "800";
}, {
    readonly name: "--fw-black";
    readonly value: "900";
}];

type TextTag = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'time' | 'cite' | 'div';
interface TextProps {
    readonly variant?: TypeVariant;
    readonly opacity?: OpacityLevel;
    readonly as?: TextTag;
    readonly className?: string;
    readonly style?: React.CSSProperties;
    readonly children: React.ReactNode;
}
declare function Text({ variant, opacity, as, className, style, children, }: TextProps): React.ReactElement;

/**
 * Button size constants — kept in a non-client module so server components
 * (catalogue pages) can import them without crossing the RSC boundary.
 *
 * Sizes map 1:1 to the Shinoda type scale (Figma May 2026 spec):
 *   - 6 heading sizes (sans serif, fw-normal)
 *   - 3 subheading sizes (serif, fw-book)
 *   - 6 body sizes (sans serif, fw-normal)
 *
 * Previous t-shirt scale (xs/sm/md/lg/xl/2xl) was Webflow-parity shorthand;
 * the Figma source defines buttons by type tier instead.
 */
declare const ACCENT_COLORS: readonly ["red", "orange", "yellow", "green", "blue", "error", "warning", "success", "info"];
type AccentColor = typeof ACCENT_COLORS[number];
declare const BUTTON_SIZES: readonly ["heading-xl", "heading-lg", "heading-md", "heading-sm", "heading-xs", "heading-2xs", "subheading-lg", "subheading-md", "subheading-sm", "body-xl", "body-lg", "body-md", "body-sm", "body-xs", "body-2xs"];
type ButtonSize = typeof BUTTON_SIZES[number];

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    readonly asChild?: boolean;
    /**
     * Size variant — maps to the Shinoda type scale (heading / subheading / body).
     * Default base is heading-md (1.5rem). Sizes follow the Figma spec.
     */
    readonly size?: ButtonSize;
    /**
     * Accent colour variant — tints the button text and background with a
     * semantic or raw palette colour. Background is 10% tint at rest, 20% on
     * hover. Applies to text buttons and icon-only (.btn-icon) buttons alike.
     */
    readonly accent?: AccentColor;
}
declare function Button({ asChild, size, accent, className, children, ...props }: ButtonProps): React.ReactElement;

/**
 * Link sizes mirror the Button size scale 1:1 — see Button.constants for the
 * full enum. Visual styling is delegated to .btn-size-* classes so links and
 * buttons stay in lockstep with the type scale.
 */
declare const LINK_SIZES: readonly ["heading-xl", "heading-lg", "heading-md", "heading-sm", "heading-xs", "heading-2xs", "subheading-lg", "subheading-md", "subheading-sm", "body-xl", "body-lg", "body-md", "body-sm", "body-xs", "body-2xs"];
type LinkSize = ButtonSize;
interface ShinodaLinkProps {
    readonly href: string;
    readonly children: React.ReactNode;
    readonly className?: string;
    readonly external?: boolean;
    readonly size?: LinkSize;
    readonly disabled?: boolean;
    /**
     * Accent colour variant — tints the link text, underline, and background
     * with a semantic or raw palette colour. Background is 10% tint at rest,
     * 20% on hover. Underline inherits via currentColor automatically.
     */
    readonly accent?: AccentColor;
}
declare function ShinodaLink({ href, children, className, external, size, disabled, accent, }: ShinodaLinkProps): React.ReactElement;

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
    readonly hasError?: boolean;
}
declare const Input: react.ForwardRefExoticComponent<InputProps & react.RefAttributes<HTMLInputElement>>;
interface TextareaProps extends React.ComponentPropsWithoutRef<'textarea'> {
    readonly hasError?: boolean;
}
declare const Textarea: react.ForwardRefExoticComponent<TextareaProps & react.RefAttributes<HTMLTextAreaElement>>;
interface InputLabelProps extends React.ComponentPropsWithoutRef<'label'> {
    readonly children: React.ReactNode;
}
declare function InputLabel({ className, children, ...props }: InputLabelProps): React.ReactElement;
interface InputHelpProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function InputHelp({ children, className }: InputHelpProps): React.ReactElement;
interface InputErrorProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function InputError({ children, className }: InputErrorProps): React.ReactElement;
interface InputFieldProps {
    readonly children: React.ReactNode;
    readonly className?: string;
    readonly style?: React.CSSProperties;
}
declare function InputField({ children, className, style }: InputFieldProps): React.ReactElement;

interface SelectProps extends React.ComponentPropsWithoutRef<'select'> {
    readonly hasError?: boolean;
}
declare const Select: react.ForwardRefExoticComponent<SelectProps & react.RefAttributes<HTMLSelectElement>>;

type CheckboxProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'type'>;
declare const Checkbox: react.ForwardRefExoticComponent<CheckboxProps & react.RefAttributes<HTMLInputElement>>;
type RadioProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'type'>;
declare const Radio: react.ForwardRefExoticComponent<RadioProps & react.RefAttributes<HTMLInputElement>>;
interface ChoiceProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function Choice({ children, className }: ChoiceProps): React.ReactElement;
interface ChoiceLabelProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function ChoiceLabel({ children, className }: ChoiceLabelProps): React.ReactElement;

interface TabsProps {
    readonly defaultValue: string;
    readonly value?: string;
    readonly onValueChange?: (value: string) => void;
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function Tabs({ defaultValue, value, onValueChange, children, className, }: TabsProps): React.ReactElement;
interface TabsListProps {
    readonly children: React.ReactNode;
    readonly className?: string;
    readonly ariaLabel?: string;
}
/**
 * TabsList — renders the trigger row plus a single shared indicator bar
 * that slides horizontally to the active trigger's bounds (May 2026 spec
 * section 15). Position is measured via a layout effect so the indicator
 * animates rather than jumping.
 */
declare function TabsList({ children, className, ariaLabel }: TabsListProps): React.ReactElement;
interface TabsTriggerProps {
    readonly value: string;
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function TabsTrigger({ value, children, className }: TabsTriggerProps): React.ReactElement;
interface TabsPanelProps {
    readonly value: string;
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function TabsPanel({ value, children, className }: TabsPanelProps): React.ReactElement | null;

declare const RICH_TEXT_SIZES: readonly ["sm", "md", "lg"];
type RichTextSize = typeof RICH_TEXT_SIZES[number];
interface RichTextProps {
    readonly children: React.ReactNode;
    readonly className?: string;
    /**
     * Size variant — sm | md (default) | lg.
     * Scales the entire flow proportionally; child elements inherit via em.
     */
    readonly size?: RichTextSize;
}
declare function RichText({ children, className, size }: RichTextProps): React.ReactElement;

declare function formatFileSize(bytes: number): string;
interface FileChipProps {
    readonly file: File;
    readonly onRemove: () => void;
    readonly className?: string;
}
declare function FileChip({ file, onRemove, className }: FileChipProps): React.ReactElement;
interface FileDropzoneProps {
    /** Accepted MIME types or extensions — passed directly to <input accept>. */
    readonly accept?: string;
    readonly multiple?: boolean;
    /** Reject files larger than this (bytes). Filtered silently — pass onReject for feedback. */
    readonly maxSize?: number;
    readonly label?: string;
    readonly hint?: string;
    /** Error message displayed below the label and applies error border. */
    readonly error?: string;
    readonly disabled?: boolean;
    /** Called with accepted files after drop or browse. */
    readonly onFilesAccepted: (files: readonly File[]) => void;
    /** Called with rejected files (failed maxSize). */
    readonly onFilesRejected?: (files: readonly File[]) => void;
    readonly className?: string;
}
declare function FileDropzone({ accept, multiple, maxSize, label, hint, error, disabled, onFilesAccepted, onFilesRejected, className, }: FileDropzoneProps): React.ReactElement;

/**
 * AUTO-GENERATED — do not edit by hand.
 * Source: /assets/icons
 * Run `bun run icons:generate` to refresh.
 * 1512 icons.
 */
interface IconRecord {
    readonly id: string;
    readonly displayName: string;
    readonly tags: readonly string[];
    readonly body: string;
}
declare const ICONS: readonly IconRecord[];
declare const ICONS_BY_ID: ReadonlyMap<string, IconRecord>;

type IconSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'em';
interface IconProps extends Omit<React.SVGAttributes<SVGSVGElement>, 'dangerouslySetInnerHTML'> {
    readonly name: string;
    readonly size?: IconSize;
    readonly className?: string;
    readonly title?: string;
}
/**
 * Inline SVG icon from the Shinoda icon set.
 * `name` matches the source filename in PascalCase (e.g. "ArrowRight").
 */
declare function Icon({ name, size, className, title, ...props }: IconProps): React.ReactElement | null;

/**
 * Top navigation bar.
 *
 * Visibility contract (May 2026 spec):
 * - ≥768px: full horizontal nav, theme toggle flush right.
 * - ≤768px: nav is hidden entirely. Items are rendered as a vertical list
 *   in the <Footer> instead. The CSS rule lives in shinoda-base.css under
 *   `.nav` and its responsive overrides — kept declarative, not JS-gated.
 */
declare function Nav(): React.ReactElement;

interface NavItem {
    readonly label: string;
    readonly href: string;
}
interface NavLinksProps {
    readonly items: readonly NavItem[];
}
declare function NavLinks({ items }: NavLinksProps): React.ReactElement;

declare function ThemeToggle(): React.ReactElement;

declare function NavProgressiveBlur(): React.ReactElement;

interface PageWrapperProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function PageWrapper({ children, className }: PageWrapperProps): React.ReactElement;

interface MainWrapperProps {
    readonly children: React.ReactNode;
    readonly className?: string;
    readonly as?: 'main' | 'div' | 'section';
}
declare function MainWrapper({ children, className, as: Tag }: MainWrapperProps): React.ReactElement;

interface GridProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function Grid({ children, className }: GridProps): React.ReactElement;

interface StickyColProps {
    readonly children: React.ReactNode;
    readonly className?: string;
    readonly style?: React.CSSProperties;
}
declare function StickyCol({ children, className, style }: StickyColProps): React.ReactElement;

/**
 * Footer — only shown ≤768px (CSS-controlled). Renders the same NAV_ITEMS
 * as the top nav, but as a vertical list. This mirrors the Webflow design
 * pattern where the nav collapses entirely into the footer at small viewports.
 *
 * Above 768px the footer is hidden (display: none in shinoda-base.css).
 */
declare function Footer(): React.ReactElement;

declare function Cursor(): React.ReactElement;

/**
 * Homepage section tile — replaces the previous full-bleed Button rows
 * (May 2026 spec, Figma 3907-10763).
 *
 * Anatomy:
 *   ┌──────────────────────────────┐
 *   │ [ image placeholder ]        │
 *   │                              │
 *   │ Title (heading-md)           │
 *   │ Sub-description (body-sm 40) │
 *   └──────────────────────────────┘
 *
 * No border at rest — the system's opacity scale reserves 5% for horizontal
 * dividers only, so the previous hairline-around-the-tile violated the rule.
 * Affordance now comes from the hover overlay alone: 20% transparent-core
 * fill reveals on :hover (CSS fallback for the Figma proximity treatment).
 *
 * Figma source could not be read at implementation time (MCP blocked).
 * Refine visual treatment when access returns.
 */
interface SectionTileProps {
    readonly label: string;
    readonly description: string;
    readonly href: string;
    readonly className?: string;
}
declare function SectionTile({ label, description, href, className, }: SectionTileProps): React.ReactElement;

type BadgeVariant = 'neutral' | 'red' | 'orange' | 'yellow' | 'green' | 'blue';
interface BadgeProps {
    readonly variant?: BadgeVariant;
    readonly className?: string;
    readonly children: React.ReactNode;
    readonly onClick?: () => void;
}
declare function Badge({ variant, className, children, onClick, }: BadgeProps): React.ReactElement;

type AlertVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'urgent';
interface AlertProps {
    readonly variant?: AlertVariant;
    readonly title?: string;
    readonly children?: React.ReactNode;
    readonly onDismiss?: () => void;
    readonly className?: string;
}
declare function Alert({ variant, title, children, onDismiss, className, }: AlertProps): React.ReactElement | null;

type ProgressSize = 'sm' | 'md';
interface ProgressProps {
    readonly value: number;
    readonly size?: ProgressSize;
    readonly label?: string;
    readonly className?: string;
}
declare function Progress({ value, size, label, className, }: ProgressProps): React.ReactElement;

interface SkeletonProps {
    readonly width?: string | number;
    readonly height?: string | number;
    readonly className?: string;
}
declare function Skeleton({ width, height, className, }: SkeletonProps): React.ReactElement;

type TooltipSide = 'top' | 'bottom' | 'left' | 'right';
interface TooltipProps {
    readonly content: React.ReactNode;
    readonly children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
    readonly side?: TooltipSide;
    readonly delay?: number;
    /**
     * `variable` (default) — pill hugs its content, max-width unconstrained.
     * `fixed` — 256px wide, text wraps. Matches Figma Width=Fixed variant.
     */
    readonly width?: 'variable' | 'fixed';
    /**
     * Renders a `CaretDown` icon beside the label. Only applies in `variable`
     * mode; ignored when `width="fixed"`. Matches Figma icon=true variant.
     */
    readonly icon?: boolean;
}
declare function Tooltip({ content, children, side, delay, width, icon, }: TooltipProps): React.ReactElement;
declare function TooltipRoot({ children, className }: {
    readonly children: React.ReactNode;
    readonly className?: string;
}): React.ReactElement;

interface DialogProps {
    readonly open?: boolean;
    readonly onOpenChange?: (open: boolean) => void;
    readonly children: React.ReactNode;
    readonly defaultOpen?: boolean;
}
declare function Dialog({ open: controlledOpen, onOpenChange, children, defaultOpen, }: DialogProps): React.ReactElement;
interface DialogTriggerProps {
    readonly children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
}
declare function DialogTrigger({ children }: DialogTriggerProps): React.ReactElement;
interface DialogContentProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function DialogContent({ children, className }: DialogContentProps): React.ReactElement | null;
interface DialogHeaderProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function DialogHeader({ children, className }: DialogHeaderProps): React.ReactElement;
interface DialogTitleProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function DialogTitle({ children, className }: DialogTitleProps): React.ReactElement;
interface DialogDescriptionProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function DialogDescription({ children, className }: DialogDescriptionProps): React.ReactElement;
interface DialogFooterProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function DialogFooter({ children, className }: DialogFooterProps): React.ReactElement;
interface DialogCloseProps {
    readonly children?: React.ReactNode;
    readonly className?: string;
}
declare function DialogClose({ children, className }: DialogCloseProps): React.ReactElement;

type SheetSide = 'left' | 'right';
interface SheetProps {
    readonly open?: boolean;
    readonly onOpenChange?: (open: boolean) => void;
    readonly side?: SheetSide;
    readonly children: React.ReactNode;
    readonly defaultOpen?: boolean;
}
declare function Sheet({ open: controlledOpen, onOpenChange, side, children, defaultOpen, }: SheetProps): React.ReactElement;
interface SheetTriggerProps {
    readonly children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
}
declare function SheetTrigger({ children }: SheetTriggerProps): React.ReactElement;
interface SheetContentProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function SheetContent({ children, className }: SheetContentProps): React.ReactElement | null;
interface SheetHeaderProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function SheetHeader({ children, className }: SheetHeaderProps): React.ReactElement;
interface SheetTitleProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function SheetTitle({ children, className }: SheetTitleProps): React.ReactElement;
interface SheetFooterProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function SheetFooter({ children, className }: SheetFooterProps): React.ReactElement;

interface PopoverProps {
    readonly children: React.ReactNode;
    readonly open?: boolean;
    readonly onOpenChange?: (open: boolean) => void;
}
declare function Popover({ children, open: controlledOpen, onOpenChange, }: PopoverProps): React.ReactElement;
interface PopoverTriggerProps {
    readonly children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
}
declare function PopoverTrigger({ children }: PopoverTriggerProps): React.ReactElement;
interface PopoverContentProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function PopoverContent({ children, className }: PopoverContentProps): React.ReactElement | null;

interface DropdownMenuProps {
    readonly children: React.ReactNode;
    readonly open?: boolean;
    readonly onOpenChange?: (open: boolean) => void;
}
declare function DropdownMenu({ children, open: controlledOpen, onOpenChange, }: DropdownMenuProps): React.ReactElement;
interface DropdownMenuTriggerProps {
    readonly children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
}
declare function DropdownMenuTrigger({ children }: DropdownMenuTriggerProps): React.ReactElement;
interface DropdownMenuContentProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function DropdownMenuContent({ children, className }: DropdownMenuContentProps): React.ReactElement | null;
interface DropdownMenuItemProps {
    readonly children: React.ReactNode;
    readonly onClick?: () => void;
    readonly disabled?: boolean;
    readonly className?: string;
    readonly index?: number;
}
declare function DropdownMenuItem({ children, onClick, disabled, className, index, }: DropdownMenuItemProps): React.ReactElement;
interface DropdownMenuSeparatorProps {
    readonly className?: string;
}
declare function DropdownMenuSeparator({ className }: DropdownMenuSeparatorProps): React.ReactElement;
interface DropdownMenuLabelProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function DropdownMenuLabel({ children, className }: DropdownMenuLabelProps): React.ReactElement;

interface SwitchProps {
    readonly checked?: boolean;
    readonly defaultChecked?: boolean;
    readonly onCheckedChange?: (value: boolean) => void;
    readonly disabled?: boolean;
    readonly label?: string;
    /** Size variant — mirrors the button/type scale. Default: heading-xs (1rem). */
    readonly size?: ButtonSize;
    readonly className?: string;
}
declare function Switch({ checked: controlledChecked, defaultChecked, onCheckedChange, disabled, label, size, className, }: SwitchProps): React.ReactElement;

interface SliderProps {
    readonly min?: number;
    readonly max?: number;
    /** Snap increment. Default: 1. */
    readonly step?: number;
    /** Controlled value. */
    readonly value?: number;
    readonly defaultValue?: number;
    readonly onChange?: (value: number) => void;
    /** Render min/max labels below the track. */
    readonly showLabels?: boolean;
    readonly disabled?: boolean;
    readonly className?: string;
}
declare function Slider({ min, max, step, value: controlledValue, defaultValue, onChange, showLabels, disabled, className, }: SliderProps): React.ReactElement;

type AccordionType = 'single' | 'multiple';
interface AccordionProps {
    readonly type: AccordionType;
    readonly defaultValue?: string | readonly string[];
    readonly value?: string | readonly string[];
    readonly onValueChange?: (value: string | readonly string[]) => void;
    readonly children: React.ReactNode;
    /** Size variant — mirrors the button/type scale. Default: heading-xs (1rem). */
    readonly size?: ButtonSize;
    readonly className?: string;
}
declare function Accordion({ type, defaultValue, value: controlledValue, onValueChange, children, size, className, }: AccordionProps): React.ReactElement;
interface AccordionItemProps {
    readonly value: string;
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function AccordionItem({ value, children, className }: AccordionItemProps): React.ReactElement;
interface AccordionTriggerProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function AccordionTrigger({ children, className }: AccordionTriggerProps): React.ReactElement;
interface AccordionContentProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function AccordionContent({ children, className }: AccordionContentProps): React.ReactElement;

interface CommandProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function Command({ children, className }: CommandProps): React.ReactElement;
interface CommandInputProps {
    readonly placeholder?: string;
    readonly className?: string;
}
declare function CommandInput({ placeholder, className }: CommandInputProps): React.ReactElement;
interface CommandListProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function CommandList({ children, className }: CommandListProps): React.ReactElement;
interface CommandEmptyProps {
    readonly children?: React.ReactNode;
    readonly className?: string;
}
declare function CommandEmpty({ children, className }: CommandEmptyProps): React.ReactElement;
interface CommandGroupProps {
    readonly label?: string;
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function CommandGroup({ label, children, className }: CommandGroupProps): React.ReactElement;
interface CommandItemProps {
    readonly children: React.ReactNode;
    readonly onSelect?: () => void;
    readonly disabled?: boolean;
    readonly className?: string;
    readonly value?: string;
}
declare function CommandItem({ children, onSelect, disabled, className, }: CommandItemProps): React.ReactElement | null;
interface CommandSeparatorProps {
    readonly className?: string;
}
declare function CommandSeparator({ className }: CommandSeparatorProps): React.ReactElement;

interface TableProps {
    readonly children: React.ReactNode;
    readonly stickyHeader?: boolean;
    readonly className?: string;
}
declare function Table({ children, stickyHeader, className }: TableProps): React.ReactElement;
interface TableHeaderProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function TableHeader({ children, className }: TableHeaderProps): React.ReactElement;
interface TableBodyProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function TableBody({ children, className }: TableBodyProps): React.ReactElement;
interface TableFooterProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function TableFooter({ children, className }: TableFooterProps): React.ReactElement;
interface TableRowProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function TableRow({ children, className }: TableRowProps): React.ReactElement;
interface TableHeadProps {
    readonly children?: React.ReactNode;
    readonly className?: string;
    readonly colSpan?: number;
    readonly scope?: string;
}
declare function TableHead({ children, className, colSpan, scope }: TableHeadProps): React.ReactElement;
interface TableCellProps {
    readonly children?: React.ReactNode;
    readonly className?: string;
    readonly colSpan?: number;
    readonly onClick?: () => void;
}
declare function TableCell({ children, className, colSpan, onClick }: TableCellProps): React.ReactElement;
interface TableCaptionProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function TableCaption({ children, className }: TableCaptionProps): React.ReactElement;

interface EditableColumn {
    readonly key: string;
    readonly header: string;
    readonly editable?: boolean;
    readonly type?: 'text' | 'number' | 'select';
    readonly options?: readonly string[];
}
interface EditableTableProps {
    readonly columns: readonly EditableColumn[];
    readonly data: readonly Record<string, unknown>[];
    readonly onCellChange?: (rowIndex: number, key: string, value: string) => void;
    readonly stickyHeader?: boolean;
    readonly className?: string;
}
declare function EditableTable({ columns, data, onCellChange, stickyHeader, className, }: EditableTableProps): React.ReactElement;

interface CalendarPickerProps {
    readonly value?: Date | null;
    readonly onChange?: (date: Date) => void;
    readonly minDate?: Date;
    readonly maxDate?: Date;
    readonly disabled?: boolean;
    readonly className?: string;
}
declare function CalendarPicker({ value, onChange, minDate, maxDate, disabled, className, }: CalendarPickerProps): React.ReactElement;

interface DateInputProps {
    readonly value?: Date | null;
    readonly onChange?: (date: Date | null) => void;
    readonly placeholder?: string;
    readonly hasError?: boolean;
    readonly disabled?: boolean;
    readonly minDate?: Date;
    readonly maxDate?: Date;
    readonly className?: string;
}
declare function DateInput({ value, onChange, placeholder, hasError, disabled, minDate, maxDate, className, }: DateInputProps): React.ReactElement;

interface SearchOption {
    readonly value: string;
    readonly label: string;
    readonly description?: string;
}
interface SearchDropdownProps {
    readonly options: readonly SearchOption[];
    readonly value?: string;
    readonly onChange?: (value: string) => void;
    readonly placeholder?: string;
    readonly disabled?: boolean;
    readonly isLoading?: boolean;
    readonly className?: string;
}
declare function SearchDropdown({ options, value, onChange, placeholder, disabled, isLoading, className, }: SearchDropdownProps): React.ReactElement;

interface FloatingAction {
    readonly label: string;
    readonly icon?: React.ReactNode;
    readonly onClick: () => void;
    readonly variant?: 'default' | 'destructive';
}
interface FloatingActionBarProps {
    readonly selected: number;
    readonly actions: readonly FloatingAction[];
    readonly onClearSelection?: () => void;
    readonly className?: string;
}
declare function FloatingActionBar({ selected, actions, onClearSelection, className, }: FloatingActionBarProps): React.ReactElement | null;

interface ContentCardProps {
    readonly title: string;
    readonly description?: string;
    readonly children?: React.ReactNode;
    readonly actions?: React.ReactNode;
    readonly metadata?: string;
    readonly onClick?: () => void;
    readonly className?: string;
}
declare function ContentCard({ title, description, children, actions, metadata, onClick, className, }: ContentCardProps): React.ReactElement;

interface DownloadTileProps {
    readonly filename: string;
    readonly description?: string;
    readonly fileSize?: string;
    readonly fileType?: string;
    readonly onDownload: () => void;
    readonly isDownloading?: boolean;
    readonly className?: string;
}
declare function DownloadTile({ filename, description, fileSize, fileType, onDownload, isDownloading, className, }: DownloadTileProps): React.ReactElement;

interface CodeSnippetProps {
    /** The code text to display and copy. */
    readonly code: string;
    /** Optional aria label for the copy action. Defaults to "Copy code". */
    readonly copyLabel?: string;
    readonly className?: string;
}
/**
 * Click-to-copy code snippet. Three states (Figma: Default / Hovered / Active):
 *   - Default — 40% opacity, no background, no action affordance
 *   - Hovered — full opacity, fill-secondary background, Copy icon button
 *   - Active  — same background, "Copied to Clipboard" feedback with CheckCircle
 *
 * Whole tile is clickable. After copy, the active state holds for ~1.6s
 * before returning to hover/default.
 */
declare function CodeSnippet({ code, copyLabel, className, }: CodeSnippetProps): React.ReactElement;

interface MapMarker {
    readonly position: readonly [number, number];
    readonly label?: string;
}
interface MapProps {
    readonly center?: readonly [number, number];
    readonly zoom?: number;
    readonly markers?: readonly MapMarker[];
    readonly className?: string;
    readonly onMapClick?: (position: readonly [number, number]) => void;
}
declare function Map(props: MapProps): React.ReactElement;
declare function MapNoSSR(props: MapProps): React.ReactElement;

interface ThemeContextValue {
    readonly theme: 'light' | 'dark';
    readonly toggleTheme: () => void;
}
declare function useThemeContext(): ThemeContextValue;
declare function ClientShell({ children }: {
    readonly children: React.ReactNode;
}): React.ReactElement;

/**
 * Sets `data-route` on <body> so CSS can target route-specific chrome.
 * Used by base styles to hide the global nav on `/` (the home page IS the nav).
 *
 * Effect-based rather than render-time because body is owned by RootLayout.
 */
declare function RouteAttribute(): null;

interface CursorRef {
    readonly el: HTMLDivElement | null;
    readonly label: HTMLSpanElement | null;
}
declare function useCursor(cursorRef: React.RefObject<CursorRef>): void;

declare function useGravity(ref: React.RefObject<HTMLElement | null>): void;

type Theme = 'light' | 'dark';
declare function useTheme(): readonly [Theme, () => void];

declare function cn(...inputs: readonly ClassValue[]): string;

export { ACCENT_TOKENS, ALL_TYPE_VARIANTS, ALPHA_TOKENS, Accordion, AccordionContent, AccordionItem, AccordionTrigger, Alert, type AlertVariant, BLUR_TOKENS, BODY_VARIANTS, BORDER_TOKENS, BREAKPOINT_TOKENS, Badge, type BadgeVariant, type BodyVariant, Button, CONTAINER_MAXWIDTH_TOKEN, CONTAINER_TOKENS, CalendarPicker, Checkbox, Choice, ChoiceLabel, ClientShell, CodeSnippet, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, ContentCard, Cursor, type CursorRef, DateInput, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Divider, DownloadTile, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, type EditableColumn, EditableTable, FONT_WEIGHT_TOKENS, FileChip, type FileChipProps, FileDropzone, type FileDropzoneProps, type FloatingAction, FloatingActionBar, Footer, Grid, HEADING_VARIANTS, type HeadingVariant, ICONS, ICONS_BY_ID, Icon, type IconProps, type IconRecord, type IconSize, Input, InputError, InputField, InputHelp, InputLabel, LEADING_TOKENS, LINK_SIZES, type LinkSize, MainWrapper, Map, type MapMarker, MapNoSSR, Nav, NavLinks, NavProgressiveBlur, OPACITY_LEVELS, type OpacityLevel, PADDING_TOKENS, PageWrapper, Popover, PopoverContent, PopoverTrigger, Progress, type ProgressSize, RADIUS_TOKENS, Radio, RichText, RouteAttribute, SEMANTIC_COLORS, SPACING_TOKENS, SUBHEADING_VARIANTS, SearchDropdown, type SearchOption, SectionTile, Select, type SemanticColor, Sheet, SheetContent, SheetFooter, SheetHeader, type SheetSide, SheetTitle, SheetTrigger, ShinodaLink, Skeleton, Slider, StickyCol, type SubheadingVariant, Switch, TRACKING_TOKENS, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, Tabs, TabsList, TabsPanel, TabsTrigger, Text, Textarea, ThemeToggle, Tooltip, TooltipRoot, type TooltipSide, type TypeVariant, cn, formatFileSize, useCursor, useGravity, useTheme, useThemeContext };
