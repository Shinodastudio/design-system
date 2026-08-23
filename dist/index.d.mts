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

interface ButtonGroupProps {
    readonly value: string;
    readonly onValueChange: (next: string) => void;
    readonly children: React.ReactNode;
    readonly className?: string;
    readonly ariaLabel?: string;
}
declare function ButtonGroupBase({ value, onValueChange, children, className, ariaLabel, }: ButtonGroupProps): React.ReactElement;
interface ButtonGroupItemProps {
    readonly value: string;
    readonly icon: React.ReactNode;
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function ButtonGroupItem({ value: itemValue, icon, children, className, }: ButtonGroupItemProps): React.ReactElement;
declare const ButtonGroup: typeof ButtonGroupBase & {
    Item: typeof ButtonGroupItem;
};

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

/**
 * PlainLink — inline body-copy link variant.
 *
 * Simpler than ShinodaLink. Use when a link sits inside running body text
 * and the background-fill hover of `.link` is too heavy. The only visual
 * affordance is a `border-bottom` underline at 20% opacity at rest,
 * transitioning to full opacity on hover. No fill, no flex container —
 * renders as `display: inline` so it flows with surrounding text naturally.
 */
interface PlainLinkProps {
    readonly href: string;
    readonly children: React.ReactNode;
    readonly className?: string;
    readonly external?: boolean;
    readonly disabled?: boolean;
}
declare function PlainLink({ href, children, className, external, disabled, }: PlainLinkProps): React.ReactElement;

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
    readonly hasError?: boolean;
    /**
     * When set, renders a float-label variant: no external InputLabel needed.
     * The string becomes the label that starts inside the field as placeholder
     * text and floats above on focus or when the field has a value.
     */
    readonly floatLabel?: string;
    /**
     * Strips the bottom underline. Use inside contained surfaces (e.g. Command
     * search row) where the parent already provides a visual boundary.
     */
    readonly borderless?: boolean;
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

/**
 * AUTO-GENERATED — do not edit by hand.
 * Source: /assets/icons
 * Run `bun run icons:generate` to refresh.
 * 2018 icons.
 */
interface IconRecord {
    readonly id: string;
    readonly displayName: string;
    readonly tags: readonly string[];
    readonly viewBox: string;
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
 * `name` matches the source filename minus `.svg` (e.g. "arrow-right").
 */
declare function Icon({ name, size, className, title, ...props }: IconProps): React.ReactElement | null;

/**
 * Top navigation — reduced to a single affordance (shinoda.studio parity).
 *
 * The brand wordmark and theme toggle are both gone: the toggle now lives
 * only in the footer, and every route (Home included) is reachable through
 * the Command palette. What remains is the search icon alone, top-right, at
 * heading-md, over the progressive blur strip that keeps scrolling content
 * legible beneath it.
 */
declare function Nav(): React.ReactElement;

interface NavItem$1 {
    readonly label: string;
    readonly href: string;
}
interface NavLinksProps {
    readonly items: readonly NavItem$1[];
}
declare function NavLinks({ items }: NavLinksProps): React.ReactElement;

declare function ThemeToggle(): React.ReactElement;

declare function SearchButton(): React.ReactElement;

/**
 * Smooth progressive blur rendered below the fixed nav bar.
 * All visual logic lives in the .progressive-blur CSS class —
 * three backdrop-filter layers (16 → 8 → 4 px) with overlapping
 * gradient masks so no seams appear between blur zones.
 *
 * Customise via CSS custom properties on the element or a parent:
 *   --pb-height    (default 140px)
 *   --pb-blur-a    (default 16px — heaviest, top zone)
 *   --pb-blur-b    (default  8px — mid zone)
 *   --pb-blur-c    (default  4px — lightest, bottom zone)
 *
 * Static — the scroll-velocity peel effect lives on the page content
 * underneath (see ContentPeel), not on the nav or this blur strip.
 */
declare function NavProgressiveBlur(): React.ReactElement;

interface CommandDialogProps {
    readonly open: boolean;
    readonly onClose: () => void;
    readonly children: React.ReactNode;
}
/**
 * Floating modal wrapper for the Command palette.
 * Portals to document.body so it layers above the nav (z-index 999).
 * Renders a scrim that closes the dialog on click.
 *
 * Mount is deferred a frame and unmount is deferred past the exit transition
 * (same lifecycle as the Scrim primitive) so open/close fades and lifts the
 * card smoothly instead of popping in/out instantly.
 */
declare function CommandDialog({ open, onClose, children }: CommandDialogProps): React.ReactElement | null;

interface CommandPaletteProps {
    readonly onClose: () => void;
}
/**
 * Navigation-aware Command palette with three drill-down levels:
 *   1. sections    — all NAV_ITEMS (leaf items navigate, "Components" drills in)
 *   2. categories  — COMPONENT_CATEGORIES (drills into level 3)
 *   3. components  — component pages within the active category (navigate)
 *
 * The whole Command is keyed by `${level}:${activeCategory}` so it remounts on
 * every level transition. Remounting clears query, activeIndex, and the itemRefs
 * registry inside Command, and re-triggers the CommandInput autoFocus.
 */
declare function CommandPalette({ onClose }: CommandPaletteProps): React.ReactElement;

/**
 * Mounts the CommandDialog with the global open state from ClientShell.
 * Lives at the root of the React tree so the portal target is always present.
 */
declare function CommandPaletteHost(): React.ReactElement;

/**
 * Single source of truth for primary navigation items.
 * Consumed by the CommandPalette (top-level sections) and Footer (mobile
 * vertical list, ≤767, and the desktop footer bar's page-name lookup).
 */
declare const NAV_ITEMS: readonly [{
    readonly label: "Home";
    readonly href: "/";
}, {
    readonly label: "Colour";
    readonly href: "/colour";
}, {
    readonly label: "Type";
    readonly href: "/type";
}, {
    readonly label: "Icons";
    readonly href: "/icons";
}, {
    readonly label: "Components";
    readonly href: "/components";
}, {
    readonly label: "Structure";
    readonly href: "/structure";
}, {
    readonly label: "Widths";
    readonly href: "/widths";
}, {
    readonly label: "Paddings";
    readonly href: "/paddings";
}, {
    readonly label: "Margins";
    readonly href: "/margins";
}, {
    readonly label: "Grids";
    readonly href: "/grids";
}, {
    readonly label: "Utility";
    readonly href: "/utility";
}, {
    readonly label: "Implementation";
    readonly href: "/implementation";
}];
type NavItem = (typeof NAV_ITEMS)[number];
/**
 * Grouped categories for the /components/* sub-routes.
 * Used by the CommandPalette to drill from
 *   level 1 (Components) → level 2 (category) → level 3 (component page).
 *
 * Each `items` entry is a slug that maps to `/components/[slug]`.
 * Labels in level 3 are derived by title-casing the slug.
 */
declare const COMPONENT_CATEGORIES: readonly [{
    readonly label: "Controls";
    readonly items: readonly ["button", "controls", "link", "tabs"];
}, {
    readonly label: "Input";
    readonly items: readonly ["input", "calendar", "upload"];
}, {
    readonly label: "Layout";
    readonly items: readonly ["card", "content", "divider"];
}, {
    readonly label: "Data";
    readonly items: readonly ["data", "map"];
}, {
    readonly label: "Feedback";
    readonly items: readonly ["feedback", "overlay"];
}, {
    readonly label: "Display";
    readonly items: readonly ["icon", "cursor", "sticker", "media"];
}];
type ComponentCategory = (typeof COMPONENT_CATEGORIES)[number];
/** Title-case a component slug (e.g. "button" → "Button"). */
declare function componentLabel(slug: string): string;

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
    /**
     * Caps the column to 280px on desktop (≥992px).
     * Reverts to full-width at tablet and below — the grid collapses anyway.
     * Use when 480px is too wide for the left column content (short label lists,
     * compact nav, etc.).
     */
    readonly narrow?: boolean;
}
declare function StickyCol({ children, className, narrow, style }: StickyColProps): React.ReactElement;

/**
 * Site footer — one layout at every width (Figma 3932:13432).
 *
 * A full-width <Divider> opens the block, with --padding-section-sm above and
 * below the row beneath it, holding the footer clear of page content the way
 * shinoda.studio does. All type is heading-md at 40% opacity, lifting to 100%
 * on hover.
 *
 * Clickable breadcrumb trail on the left, always opening with "Design System"
 * → "/"; "Made by Shinoda · {year} · Changelog" + theme toggle on the right.
 * Changelog opens a modal (<ChangelogDialog>). Below 768px the two halves
 * stack and the breadcrumb wraps, but nothing is added or removed — <Nav>'s
 * search icon is present at every width, so the Command palette is the sole
 * navigation surface on both sides of the breakpoint.
 */
declare function Footer(): React.ReactElement;

interface BackToTopProps {
    readonly label?: string;
    readonly className?: string;
}
/**
 * BackToTop — scrolls the page to the top on click.
 *
 * Uses `scrollTo` with no `behavior` option (instant — smooth scroll is
 * refused by the DS spec). Place in a footer, page end, or sidebar;
 * positioning is the parent's responsibility.
 *
 * Pairs with an icon or plain text label:
 *   <BackToTop />                       → "Back to top"
 *   <BackToTop label="↑" />             → single arrow
 *   <BackToTop><Icon name="arrow-up" /></BackToTop> — not yet (children not
 *   exposed; add if needed).
 */
declare function BackToTop({ label, className, }: BackToTopProps): React.ReactElement;

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

interface GridTileProps {
    readonly children: React.ReactNode;
    /**
     * Action row revealed on hover, centred over the tile content. Pass an
     * array of buttons (e.g. delete / download). Buttons should be plain
     * <button> nodes with the `grid-tile-btn` class — see the catalogue
     * for the canonical icon-button pattern.
     */
    readonly actions?: React.ReactNode;
    /**
     * Timestamp or short metadata rendered below the tile, visible only on
     * hover. Escapes the tile box — sits in the grid gap.
     */
    readonly meta?: React.ReactNode;
    readonly onClick?: () => void;
    readonly className?: string;
    readonly ariaLabel?: string;
}
/**
 * Square tile with hover-revealed action row and optional timestamp meta.
 *
 * Lineage: Scrapbook LibraryView .lv-tile pattern (l0at-izar worktree,
 * src/styles/stickerizer.css L884–1040).
 *
 * Behavioural notes:
 * - The container reserves no overflow:hidden so meta and tooltips can
 *   escape into the grid gap.
 * - :has() drives the dashed outline whenever an action button inside the
 *   tile is hovered or focus-visible. No outline at rest.
 * - Inner content dims to 20% while an action button is hovered, so the
 *   buttons remain legible without occluding the underlying content.
 */
declare function GridTile({ children, actions, meta, onClick, className, ariaLabel, }: GridTileProps): React.ReactElement;
/**
 * Canonical icon-button used inside a <GridTile>'s `actions` row. Renders
 * a 24×24 button with a coloured background pill that follows the
 * GridTile's action-hover state.
 *
 * Use `variant="danger"` for destructive actions (red icon, permanent
 * 10% red pill). Use `variant="default"` for neutral (transparent at
 * rest, 10% neutral pill on hover).
 */
interface GridTileActionProps {
    readonly children: React.ReactNode;
    readonly onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    readonly ariaLabel: string;
    readonly variant?: 'default' | 'danger';
    readonly className?: string;
}
declare function GridTileAction({ children, onClick, ariaLabel, variant, className, }: GridTileActionProps): React.ReactElement;

interface ScrollBendMediaBaseProps {
    readonly className?: string;
    /** width / height — sets the container's aspect-ratio up front so the layout never shifts once the media loads. */
    readonly ratio: number;
    /** Multiplier on the scroll-velocity-driven bend amount. Default 1. */
    readonly bendStrength?: number;
    /** Horizontal hump count in the peel edge. 2 = symmetric double-bulge (raggededge-style). Default 2. */
    readonly waveFrequency?: number;
    /** Render the plain media element only — no canvas, no scroll listener. */
    readonly disabled?: boolean;
}
interface ScrollBendImageProps extends ScrollBendMediaBaseProps {
    readonly type?: 'image';
    readonly src: string;
    readonly alt: string;
}
interface ScrollBendVideoProps extends ScrollBendMediaBaseProps {
    readonly type: 'video';
    readonly src: string;
    readonly poster?: string;
}
type ScrollBendMediaProps = ScrollBendImageProps | ScrollBendVideoProps;
/**
 * Full-bleed image or video whose top/bottom edges bend away from the frame
 * under scroll velocity, revealing the page background beneath — the
 * raggededge.com-style "peel" effect. WebGL (via ogl), not CSS: the media is
 * drawn onto a subdivided plane whose edge vertices displace based on an
 * eased scroll-velocity uniform (see useScrollBend).
 *
 * Degrades to the plain <img>/<video> — no canvas, no motion — when
 * `disabled` is set, under `prefers-reduced-motion: reduce`, or if WebGL
 * fails to initialise. `ratio` is required so the container reserves its
 * final size before the media (or the GL context) is ready — no CLS.
 */
declare function ScrollBendMedia(props: ScrollBendMediaProps): React.ReactElement;

type BadgeVariant = 'neutral' | 'red' | 'orange' | 'yellow' | 'green' | 'blue';
interface BadgeProps {
    readonly variant?: BadgeVariant;
    readonly className?: string;
    readonly children: React.ReactNode;
    readonly onClick?: () => void;
    /**
     * Disables hover/focus affordances and drops the chip to 40% opacity.
     * On interactive (button) badges, also disables the native control;
     * on static (span) badges, sets `aria-disabled` so screen readers know.
     */
    readonly disabled?: boolean;
}
declare function Badge({ variant, className, children, onClick, disabled, }: BadgeProps): React.ReactElement;

/**
 * Alert variants — accent-coloured pill banners.
 *
 * Canonical palette names: default, red, orange, yellow, green, blue.
 * Semantic aliases (success/warning/error/info/urgent) are kept as
 * convenience names — they map to a palette colour internally.
 */
type AlertVariant = 'default' | 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'success' | 'warning' | 'error' | 'info' | 'urgent';
interface AlertProps {
    readonly variant?: AlertVariant;
    readonly title?: string;
    readonly children?: React.ReactNode;
    readonly onDismiss?: () => void;
    /**
     * Icon name (from the Shinoda icon set) or a fully-formed node.
     * Pass `null` to render no icon. Defaults to "Warning" triangle.
     */
    readonly icon?: string | React.ReactNode | null;
    /** Dismiss control label. Defaults to "Dismiss". */
    readonly dismissLabel?: string;
    readonly className?: string;
}
declare function Alert({ variant, title, children, onDismiss, icon, dismissLabel, className, }: AlertProps): React.ReactElement | null;

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
     * Renders a downward caret icon beside the label. Only applies in `variable`
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
type DialogVariant = 'card' | 'bare' | 'drawer';
interface DialogContentProps {
    readonly children: React.ReactNode;
    readonly className?: string;
    /**
     * 'card' (default) wraps children in `.dialog-content` — the legacy
     * single-card layout. 'bare' and 'drawer' render children directly so
     * you can compose <DialogTitleRow> + <DialogCard> by hand.
     */
    readonly variant?: DialogVariant;
}
declare function DialogContent({ children, className, variant, }: DialogContentProps): React.ReactElement | null;
interface DialogPanelProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}
/**
 * Drawer-only — wraps the slide-up panel inside a `variant="drawer"` dialog.
 * Centres horizontally (max-width 896px) and stacks title row + card.
 */
declare function DialogPanel({ children, className }: DialogPanelProps): React.ReactElement;
interface DialogTitleRowProps {
    readonly children: React.ReactNode;
    readonly icon?: React.ReactNode;
    readonly className?: string;
    /** Hide the close button — only do this when an in-card close exists. */
    readonly hideClose?: boolean;
}
/**
 * Title row that sits on the scrim above the card. White text, regardless of
 * theme. Includes an optional leading icon and an auto-rendered close button.
 */
declare function DialogTitleRow({ children, icon, className, hideClose, }: DialogTitleRowProps): React.ReactElement;
interface DialogCardProps {
    readonly children: React.ReactNode;
    readonly className?: string;
    /** 'centered' (default) for bare-variant card; 'drawer' for the
     * top-rounded card that fills the drawer panel. */
    readonly variant?: 'centered' | 'drawer';
}
declare function DialogCard({ children, className, variant, }: DialogCardProps): React.ReactElement;
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

type ConfirmDialogIntent = 'default' | 'danger';
interface ConfirmDialogProps {
    readonly open: boolean;
    readonly onOpenChange: (open: boolean) => void;
    /** Heading-md message shown in the card. */
    readonly message: string;
    /** Label on the scrim title row (defaults to the intent's verb). */
    readonly title?: string;
    /** Optional icon on the scrim title row. Defaults to the intent's icon. */
    readonly titleIcon?: React.ReactNode;
    readonly confirmLabel?: string;
    readonly cancelLabel?: string;
    readonly onConfirm: () => void;
    /**
     * 'danger' (default-ish destructive) tints the confirm action with
     * status-error and ships a Trash title icon. 'default' uses primary.
     */
    readonly intent?: ConfirmDialogIntent;
}
/**
 * ConfirmDialog — title-on-scrim + card layout, with a message and two text
 * buttons. Built on the centred bare Dialog variant.
 *
 * Lineage: Scrapbook ConfirmDeleteDialog (Figma 75:35340).
 */
declare function ConfirmDialog({ open, onOpenChange, message, title, titleIcon, confirmLabel, cancelLabel, onConfirm, intent, }: ConfirmDialogProps): React.ReactElement;

type ScrimBlur = 'none' | 'xs' | 'md';
interface ScrimProps {
    /** Controlled visibility. Mount the component once, flip this to animate. */
    readonly open: boolean;
    /** Click on the scrim itself (not children passing through). Optional. */
    readonly onDismiss?: () => void;
    /** Escape key handler. Pass the same function as onDismiss for consistency. */
    readonly onEscape?: () => void;
    /** Backdrop blur intensity. 'xs' is the default Dialog blur, 'md' is the
     * deeper blur used behind bare/drawer dialogs. 'none' leaves the page sharp. */
    readonly blur?: ScrimBlur;
    /** Optional children rendered above the scrim — pointer events pass through
     * the scrim by default so children remain interactive. */
    readonly children?: React.ReactNode;
    readonly className?: string;
    /** z-index. Defaults to 990 (just under dialogs at 1000). */
    readonly zIndex?: number;
}
/**
 * Scrim — a portalled dark backdrop with optional blur. Standalone primitive
 * usable behind custom overlays, tours, lightboxes, or any surface that needs
 * a focus-darkening layer without bringing in a full Dialog.
 *
 * The Dialog component still uses the native <dialog>::backdrop for its scrim;
 * this primitive is for the cases where <dialog> isn't appropriate — e.g.
 * non-modal floating layers that still need the page dimmed.
 *
 * Visual tokens match the Dialog scrim exactly: --color-scrim fill, --blur-xs
 * (default) or --blur-md (deeper) backdrop blur. Same 200ms fade in/out.
 */
declare function Scrim({ open, onDismiss, onEscape, blur, children, className, zIndex, }: ScrimProps): React.ReactElement | null;

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
type DropdownMenuItemVariant = 'default' | 'danger';
interface DropdownMenuItemProps {
    readonly children: React.ReactNode;
    readonly onClick?: () => void;
    readonly disabled?: boolean;
    readonly className?: string;
    readonly index?: number;
    /** Leading icon — any React node, typically <Icon name="..." size="em" /> */
    readonly icon?: React.ReactNode;
    /** 'danger' renders the item in status-error red with a red hover fill. */
    readonly variant?: DropdownMenuItemVariant;
}
declare function DropdownMenuItem({ children, onClick, disabled, className, index, icon, variant, }: DropdownMenuItemProps): React.ReactElement;
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
    /** Optional callback invoked when Escape is pressed inside the input. */
    readonly onClose?: () => void;
}
declare function Command({ children, className, onClose }: CommandProps): React.ReactElement;
interface CommandInputProps {
    readonly placeholder?: string;
    readonly className?: string;
    readonly autoFocus?: boolean;
    /**
     * Invoked when Backspace is pressed while the query is already empty —
     * lets a drilled-down level pop back up via the keyboard, mirroring the
     * click behaviour of <CommandHeader>'s back button. Omit at the top level.
     */
    readonly onBackspaceEmpty?: () => void;
}
declare function CommandInput({ placeholder, className, autoFocus, onBackspaceEmpty }: CommandInputProps): React.ReactElement;
interface CommandHeaderProps {
    /** Label of the level currently being browsed, e.g. "Components". */
    readonly label: string;
    readonly onBack: () => void;
}
/**
 * Back-navigation row shown above <CommandInput> once the palette has
 * drilled 1+ levels deep (Figma 4030:948). Distinct from an in-list
 * "← Back" item — this is a persistent header, not a filterable option.
 */
declare function CommandHeader({ label, onBack }: CommandHeaderProps): React.ReactElement;
interface CommandListProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}
declare function CommandList({ children, className }: CommandListProps): React.ReactElement;
interface CommandEmptyProps {
    readonly children?: React.ReactNode;
    readonly className?: string;
}
/**
 * Renders only when the user has typed a query — prevents "No results" from
 * appearing on an empty palette before any interaction.
 */
declare function CommandEmpty({ children, className }: CommandEmptyProps): React.ReactElement | null;
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
    /** Overrides text used for query filtering. Falls back to string children. */
    readonly value?: string;
    /** Leading icon — typically <Icon name="..." size="em" /> */
    readonly icon?: React.ReactNode;
    /** Shows a right-pointing caret chevron on the trailing edge to signal a sub-level. */
    readonly hasSubmenu?: boolean;
    /** Marks the item as the current value of a single-select list (e.g. SearchDropdown). */
    readonly selected?: boolean;
}
declare function CommandItem({ children, onSelect, disabled, className, value, icon, hasSubmenu, selected, }: CommandItemProps): React.ReactElement | null;

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

type CalendarMode = 'single' | 'range';
type CalendarView = 'day' | 'month' | 'year';
type WeekStart = 0 | 1;
interface DateRange {
    readonly from: Date | null;
    readonly to: Date | null;
}
interface CalendarDay {
    readonly date: Date;
    readonly key: string;
    /** Belongs to a month either side of the one in view. */
    readonly isOutside: boolean;
    readonly isToday: boolean;
    readonly isSelected: boolean;
    readonly isRangeStart: boolean;
    readonly isRangeEnd: boolean;
    readonly isInRange: boolean;
    readonly isDisabled: boolean;
    readonly isFocused: boolean;
}
interface CalendarMonthCell {
    readonly month: number;
    readonly label: string;
    readonly isCurrent: boolean;
    readonly isSelected: boolean;
    readonly isDisabled: boolean;
}
interface CalendarYearCell {
    readonly year: number;
    readonly isCurrent: boolean;
    readonly isSelected: boolean;
    readonly isDisabled: boolean;
}
interface UseCalendarOptions {
    readonly mode: CalendarMode;
    readonly selected: Date | null;
    readonly range: DateRange | null;
    readonly month: Date | null;
    readonly defaultMonth: Date | null;
    readonly minDate: Date | null;
    readonly maxDate: Date | null;
    readonly weekStartsOn: WeekStart;
    readonly disabled: boolean;
    readonly onMonthChange?: (month: Date) => void;
    readonly onSelectDate: (date: Date) => void;
}
interface UseCalendarResult {
    readonly view: CalendarView;
    readonly setView: (view: CalendarView) => void;
    readonly viewDate: Date;
    readonly viewYear: number;
    readonly viewMonth: number;
    readonly weekdays: readonly WeekdayLabel[];
    readonly days: readonly CalendarDay[];
    readonly months: readonly CalendarMonthCell[];
    readonly years: readonly CalendarYearCell[];
    readonly yearRangeStart: number;
    /** Today at local midnight, reconciled after hydration and across midnight. */
    readonly today: Date;
    readonly focusedDate: Date;
    readonly focusViaKeyboard: boolean;
    readonly hoveredDate: Date | null;
    readonly setHoveredDate: (date: Date | null) => void;
    readonly canGoPrevious: boolean;
    readonly canGoNext: boolean;
    readonly goPrevious: () => void;
    readonly goNext: () => void;
    readonly goToToday: () => void;
    readonly goToMonth: (month: number) => void;
    readonly goToYear: (year: number) => void;
    /** Brings a date into view without selecting it (used by the date fields). */
    readonly goToDate: (date: Date) => void;
    /**
     * Selects a date. `keepFocusMode` defaults to true, which preserves whichever
     * focus mode is current — a click keeps focus where it is, an Enter on a cell
     * keeps focus in the grid. Pass false when the selection came from outside the
     * grid (a typed date, say) so the grid doesn't pull DOM focus off the field.
     */
    readonly selectDate: (date: Date, keepFocusMode?: boolean) => void;
    readonly isDateDisabled: (date: Date) => boolean;
    readonly handleGridKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
}
interface WeekdayLabel {
    readonly short: string;
    readonly long: string;
    readonly index: number;
}
declare function useCalendar(options: UseCalendarOptions): UseCalendarResult;

type CalendarSize = 'sm' | 'md';
type MonthLabelFormat = 'short' | 'long';
/** Everything a custom day renderer needs; MediaCalendar builds on this. */
interface CalendarDayContext {
    readonly day: CalendarDay;
    readonly dayNumber: number;
    readonly dateKey: string;
}
interface CalendarBaseProps {
    readonly size?: CalendarSize;
    readonly minDate?: Date | null;
    readonly maxDate?: Date | null;
    readonly disabled?: boolean;
    readonly weekStartsOn?: WeekStart;
    /** Controlled month in view. Pair with onMonthChange. */
    readonly month?: Date | null;
    readonly defaultMonth?: Date | null;
    readonly onMonthChange?: (month: Date) => void;
    readonly showOutsideDays?: boolean;
    readonly showTodayButton?: boolean;
    readonly showWeekdays?: boolean;
    /**
     * Month name in the header. Short by default — the header is a control strip,
     * not a title, and "September 2026" pushes the Today button and nav arrows
     * around as the months change width. The accessible name stays the full month
     * either way, so nothing is lost to assistive tech.
     */
    readonly monthLabelFormat?: MonthLabelFormat;
    /**
     * Typable `DD MMM YYYY` field(s) beneath the grid — one in single mode, a
     * From/To pair in range mode. Off for custom day renderers (the media grid
     * is a display surface, not a picker) and inside DateInput, where the
     * trigger field already does the job.
     */
    readonly showDateFields?: boolean;
    /** Replaces the day number with custom cell content (image, dot, badge…). */
    readonly renderDay?: (context: CalendarDayContext) => React.ReactNode;
    /**
     * Extends a cell's accessible name. Custom cell content is decorative to
     * assistive tech — the button is named by the date alone — so a renderer that
     * conveys extra meaning visually (a thumbnail, a badge) has to say so here or
     * it says nothing at all.
     */
    readonly getDayLabel?: (context: CalendarDayContext, defaultLabel: string) => string;
    readonly className?: string;
    readonly id?: string;
    readonly 'aria-label'?: string;
}
interface CalendarSingleProps extends CalendarBaseProps {
    readonly mode?: 'single';
    readonly value?: Date | null;
    readonly onChange?: (date: Date) => void;
}
interface CalendarRangeProps extends CalendarBaseProps {
    readonly mode: 'range';
    readonly value?: DateRange | null;
    readonly onChange?: (range: DateRange) => void;
}
type CalendarProps = CalendarSingleProps | CalendarRangeProps;
declare function Calendar(props: CalendarProps): React.ReactElement;

interface MediaCalendarEntry {
    readonly src: string;
    readonly alt?: string;
}
interface MediaCalendarProps {
    /** Keyed by local `YYYY-MM-DD`. Days without an entry render an empty ring. */
    readonly entries: Readonly<Record<string, MediaCalendarEntry>>;
    readonly value?: Date | null;
    readonly onChange?: (date: Date, entry: MediaCalendarEntry | null) => void;
    readonly month?: Date | null;
    readonly defaultMonth?: Date | null;
    readonly onMonthChange?: (month: Date) => void;
    readonly minDate?: Date | null;
    readonly maxDate?: Date | null;
    readonly weekStartsOn?: WeekStart;
    /**
     * Leading/trailing days from the adjacent months, dimmed to 20%. On by
     * default, as in the picker — a photo grid with holes at either end reads as
     * missing data rather than as the edge of the month.
     */
    readonly showOutsideDays?: boolean;
    readonly showTodayButton?: boolean;
    /** Defaults to Calendar's abbreviation; pass `long` for an editorial header. */
    readonly monthLabelFormat?: MonthLabelFormat;
    readonly disabled?: boolean;
    readonly className?: string;
    readonly 'aria-label'?: string;
}
/**
 * Photo-grid calendar: each day is a circular thumbnail when an entry exists
 * and a dashed ring when it doesn't. Hovering a filled day fades the image out
 * to reveal the day number; empty days show their number at rest.
 *
 * Built on Calendar's renderDay slot, so keyboard navigation, range/selection
 * semantics and month/year drill-down are identical to the picker.
 */
declare function MediaCalendar({ entries, value, onChange, month, defaultMonth, onMonthChange, minDate, maxDate, weekStartsOn, showOutsideDays, showTodayButton, monthLabelFormat, disabled, className, 'aria-label': ariaLabel, }: MediaCalendarProps): React.ReactElement;

type NativeFieldProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'value' | 'defaultValue' | 'onChange' | 'type' | 'role'>;
interface DateInputProps extends NativeFieldProps {
    readonly value?: Date | null;
    readonly onChange?: (date: Date | null) => void;
    readonly hasError?: boolean;
    /**
     * Float-label variant, identical to Input: the string starts inside the
     * field as placeholder text and floats above on focus or when filled.
     */
    readonly floatLabel?: string;
    /** Strips the bottom underline for use inside an already-bounded surface. */
    readonly borderless?: boolean;
    readonly minDate?: Date | null;
    readonly maxDate?: Date | null;
    readonly weekStartsOn?: WeekStart;
    readonly calendarSize?: CalendarSize;
}
/**
 * Text field in DD MMM YYYY format with a popover Calendar. The field owns the
 * value; the calendar is a secondary way in. Down arrow (or the trailing
 * button) opens the popover and moves focus into the grid; Escape closes it and
 * returns focus to the field.
 *
 * Sizing follows the same rule as Input: the control scales off its own
 * font-size, so `style={{ fontSize: '1.5rem' }}` on the component takes the
 * text, the trailing icon and the reserved gutter with it.
 */
declare const DateInput: react.ForwardRefExoticComponent<DateInputProps & react.RefAttributes<HTMLInputElement>>;

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

interface CollapsibleCodeProps {
    /** Raw text to display verbatim and copy. Whitespace preserved. */
    readonly code: string;
    /** Optional language label rendered as a quiet caption above the block. */
    readonly language?: string;
    readonly className?: string;
}
/**
 * Long-form code/text block intended for copy-paste of prompts and skill files.
 *
 * Fully collapsed by default — only the header (language label + action
 * icons) is visible, the code body itself is hidden. Both actions are
 * icon-only per the Figma "Code Snippet" component (node 3904:6552):
 * Copy always writes the full body to clipboard; the expand/collapse toggle
 * sits immediately to its right and reveals or hides the code below.
 *
 * Visual contract:
 *   - Mono font, 1.5em line-height, transparent at rest, --color-transparent-weak
 *     (5% text-primary — theme-adaptive, works on any surface) on hover
 *   - Border-radius: --radius-sm (system maximum on primary elements)
 *   - No drop shadow, no gradient fill
 */
declare function CollapsibleCode({ code, language, className, }: CollapsibleCodeProps): React.ReactElement;

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
    /** Layer that carries the hovered element's image in the preview state. */
    readonly preview: HTMLDivElement | null;
}
declare function useCursor(cursorRef: React.RefObject<CursorRef>): void;

declare function useGravity(ref: React.RefObject<HTMLElement | null>): void;
/**
 * Gravity for a set of sibling cells sharing one container — a calendar grid,
 * for instance. A single delegated listener drives whichever cell the cursor
 * is over, instead of every cell registering its own document listener.
 *
 * Returns a ref callback rather than taking a ref object: the container is
 * often a node that comes and goes (the calendar swaps day grid for month
 * tiles for year tiles), and an effect reading `ref.current` binds once to
 * whichever node happened to be mounted first, then never rebinds. React 19
 * runs the cleanup returned here on every detach, so the listeners follow the
 * element instead of the first render.
 */
declare function useGravityWithin(selector: string): (node: HTMLElement | null) => void;

type Theme = 'light' | 'dark';
declare function useTheme(): readonly [Theme, () => void];

interface UseScrollBendOptions {
    /** Multiplier on the scroll-velocity-driven bend amount. Default 1. */
    readonly bendStrength?: number;
    /** Number of horizontal humps in the peel edge. 2 = symmetric double-bulge. Default 2. */
    readonly waveFrequency?: number;
    /** Skip WebGL entirely and leave the plain media element visible. */
    readonly disabled?: boolean;
}
/**
 * Drives the ScrollBendMedia WebGL plane: eases the mesh's `uBend` uniform
 * toward a scroll-velocity target every frame, keeps the cover-fit uniforms
 * in sync with container/media size, and pauses rendering entirely off
 * screen or under prefers-reduced-motion.
 *
 * Renders directly to `canvasRef` — pass refs to a positioned container, the
 * canvas overlay, and the source <img>/<video> whose pixels become the
 * texture. On success, hides the source element and reveals the canvas; on
 * reduced motion (or if refs aren't ready) it does nothing, leaving the
 * plain media element visible as the static fallback.
 */
declare function useScrollBend(containerRef: React.RefObject<HTMLDivElement | null>, canvasRef: React.RefObject<HTMLCanvasElement | null>, mediaRef: React.RefObject<HTMLImageElement | HTMLVideoElement | null>, options?: UseScrollBendOptions): void;

/**
 * Today, at local midnight, re-read when the day turns.
 *
 * A component that reads `new Date()` during render keeps whatever value it saw
 * on its first render for as long as it lives, so a calendar left open
 * overnight goes on insisting it is yesterday. Subscribing instead means the
 * marker moves at midnight, and every calendar on the page moves together off
 * one timer.
 */
declare function useToday(): Date;

declare function cn(...inputs: readonly ClassValue[]): string;

/**
 * Date helpers shared by the calendar components. All operations are
 * local-time and day-granular — the calendar never reasons about hours.
 */
declare function startOfDay(date: Date): Date;
declare function isSameDay(a: Date, b: Date): boolean;
declare function isSameMonth(a: Date, b: Date): boolean;
declare function addDays(date: Date, amount: number): Date;
declare function addMonths(date: Date, amount: number): Date;
declare function addYears(date: Date, amount: number): Date;
declare function isBeforeDay(a: Date, b: Date): boolean;
declare function isAfterDay(a: Date, b: Date): boolean;
declare function isWithinDays(date: Date, from: Date, to: Date): boolean;
declare function clampDate(date: Date, min: Date | null, max: Date | null): Date;
/** Stable local `YYYY-MM-DD` key — safe for lookup maps (no UTC shift). */
declare function toDateKey(date: Date): string;
/** Month labels shared by the date fields, the tiles and the text parser. */
declare const MONTH_LABELS_SHORT: readonly ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** The one text format the calendar reads and writes: `DD MMM YYYY`. */
declare function formatDateShort(date: Date): string;
/**
 * Parses typed input against three explicit grammars: `DD MMM YYYY` (canonical),
 * day-first numeric (`24/07/2026`, `24-7-2026`, `24.07.2026`) since the DS is
 * en-GB, and ISO `YYYY-MM-DD` so a date key round-trips. Null = unusable.
 *
 * Deliberately no fall-through to `new Date(string)`. The native parser is
 * implementation-defined for anything but ISO, reads a bare `YYYY-MM-DD` as UTC
 * midnight — which lands on the previous day for every user west of the meridian
 * — and rolls overflow forward, so `2026-02-31` would come back as 2 March. A
 * parser that quietly returns the wrong day is worse than one that returns null.
 */
declare function parseDateInput(raw: string): Date | null;
/**
 * Parses a `YYYY-MM-DD` key back to a local date. Returns null if malformed or
 * if the date doesn't exist, so the round-trip with toDateKey is total.
 */
declare function fromDateKey(key: string): Date | null;

export { ACCENT_TOKENS, ALL_TYPE_VARIANTS, ALPHA_TOKENS, Accordion, AccordionContent, AccordionItem, AccordionTrigger, Alert, type AlertVariant, BLUR_TOKENS, BODY_VARIANTS, BORDER_TOKENS, BREAKPOINT_TOKENS, BackToTop, Badge, type BadgeVariant, type BodyVariant, Button, ButtonGroup, COMPONENT_CATEGORIES, CONTAINER_MAXWIDTH_TOKEN, CONTAINER_TOKENS, Calendar, type CalendarDay, type CalendarDayContext, type CalendarMode, type CalendarMonthCell, Calendar as CalendarPicker, type CalendarProps, type CalendarSize, type CalendarView, type CalendarYearCell, Checkbox, Choice, ChoiceLabel, ClientShell, CodeSnippet, CollapsibleCode, Command, CommandDialog, CommandEmpty, CommandGroup, CommandHeader, CommandInput, CommandItem, CommandList, CommandPalette, CommandPaletteHost, type ComponentCategory, ConfirmDialog, type ConfirmDialogIntent, ContentCard, Cursor, type CursorRef, DateInput, type DateInputProps, type DateRange, Dialog, DialogCard, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogPanel, DialogTitle, DialogTitleRow, DialogTrigger, type DialogVariant, Divider, DownloadTile, DropdownMenu, DropdownMenuContent, DropdownMenuItem, type DropdownMenuItemVariant, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, type EditableColumn, EditableTable, FONT_WEIGHT_TOKENS, FileChip, type FileChipProps, FileDropzone, type FileDropzoneProps, Footer, Grid, GridTile, GridTileAction, HEADING_VARIANTS, type HeadingVariant, ICONS, ICONS_BY_ID, Icon, type IconProps, type IconRecord, type IconSize, Input, InputError, InputField, InputHelp, InputLabel, LEADING_TOKENS, LINK_SIZES, type LinkSize, MONTH_LABELS_SHORT, MainWrapper, MediaCalendar, type MediaCalendarEntry, type MediaCalendarProps, type MonthLabelFormat, NAV_ITEMS, Nav, type NavItem, NavLinks, NavProgressiveBlur, OPACITY_LEVELS, type OpacityLevel, PADDING_TOKENS, PageWrapper, PlainLink, Popover, PopoverContent, PopoverTrigger, Progress, type ProgressSize, RADIUS_TOKENS, Radio, RichText, RouteAttribute, SEMANTIC_COLORS, SPACING_TOKENS, SUBHEADING_VARIANTS, Scrim, type ScrimBlur, ScrollBendMedia, type ScrollBendMediaProps, SearchButton, SearchDropdown, type SearchOption, SectionTile, Select, type SemanticColor, Sheet, SheetContent, SheetFooter, SheetHeader, type SheetSide, SheetTitle, SheetTrigger, ShinodaLink, Skeleton, Slider, StickyCol, type SubheadingVariant, Switch, TRACKING_TOKENS, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, Tabs, TabsList, TabsPanel, TabsTrigger, Text, Textarea, ThemeToggle, Tooltip, TooltipRoot, type TooltipSide, type TypeVariant, type UseCalendarOptions, type UseCalendarResult, type UseScrollBendOptions, type WeekStart, addDays, addMonths, addYears, clampDate, cn, componentLabel, formatDateShort, formatFileSize, fromDateKey, isAfterDay, isBeforeDay, isSameDay, isSameMonth, isWithinDays, parseDateInput, startOfDay, toDateKey, useCalendar, useCursor, useGravity, useGravityWithin, useScrollBend, useTheme, useThemeContext, useToday };
