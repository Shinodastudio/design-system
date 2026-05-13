#!/usr/bin/env bun
/**
 * generate-icons.ts
 *
 * Reads every SVG in the Shinoda icon source folder, normalises it
 * (strips the outer <svg> wrapper, swaps the hard-coded fill for
 * currentColor), derives searchable tags from the file name plus
 * a small semantic synonyms map, and emits a generated TS module
 * the catalogue consumes at build time.
 *
 * Source SVGs (Phosphor "Fill" weight, 32x32) live in /assets/icons.
 * Run via `bun run icons:generate`.
 */

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dir, '..');
const SOURCE_DIR = join(ROOT, 'assets', 'icons');
const OUTPUT_FILE = join(ROOT, 'src', 'components', 'icons', 'data', 'icons.generated.ts');

/**
 * Synonyms map — augments auto-derived tags with semantic aliases
 * so users can search "delete" and hit "Trash", or "settings" and hit "Gear".
 * Keys match substrings of the icon's PascalCase name (case-insensitive).
 */
const SYNONYMS: ReadonlyArray<readonly [RegExp, readonly string[]]> = [
  [/trash/i,            ['delete', 'remove', 'bin', 'discard']],
  [/gear|wrench/i,      ['settings', 'preferences', 'config', 'options']],
  [/house/i,            ['home']],
  [/magnifyingglass/i,  ['search', 'find', 'zoom', 'lookup']],
  [/pencil/i,           ['edit', 'write', 'compose']],
  [/floppydisk/i,       ['save', 'disk']],
  [/x(?!Logo)|close/i,  ['close', 'dismiss', 'cancel']],
  [/check/i,            ['tick', 'done', 'success', 'confirm', 'approve']],
  [/plus/i,             ['add', 'new', 'create']],
  [/minus/i,            ['subtract', 'remove']],
  [/caret|chevron/i,    ['dropdown', 'expand', 'collapse']],
  [/arrow/i,            ['direction', 'navigation']],
  [/up$/i,              ['top', 'above']],
  [/down$/i,            ['bottom', 'below']],
  [/left$/i,            ['back', 'previous', 'west']],
  [/right$/i,           ['forward', 'next', 'east']],
  [/copy/i,             ['duplicate', 'clipboard']],
  [/clipboard/i,        ['paste', 'copy']],
  [/eye(?!slash)/i,     ['view', 'show', 'visible', 'preview']],
  [/eyeslash|eyeclosed/i, ['hide', 'invisible', 'hidden']],
  [/lock(?!simple|key)/i, ['secure', 'private', 'locked']],
  [/lockopen|lockSimpleOpen/i, ['unlock', 'unlocked', 'open']],
  [/user|person/i,      ['account', 'profile', 'people', 'avatar']],
  [/users/i,            ['group', 'team', 'people']],
  [/heart/i,            ['love', 'like', 'favourite', 'favorite']],
  [/star/i,             ['favourite', 'favorite', 'rating', 'bookmark']],
  [/bookmark/i,         ['save', 'favourite', 'favorite']],
  [/bell/i,             ['notification', 'alert', 'alarm']],
  [/envelope/i,         ['email', 'mail', 'message', 'inbox']],
  [/chat|messenger/i,   ['message', 'talk', 'conversation', 'comment']],
  [/phone(?!disconnect|x)/i, ['call', 'telephone', 'contact']],
  [/calendar/i,         ['date', 'schedule', 'event']],
  [/clock|timer/i,      ['time', 'schedule']],
  [/sun(?!horizon)/i,   ['light', 'day', 'bright', 'theme']],
  [/moon(?!stars)/i,    ['dark', 'night', 'theme']],
  [/cloud/i,            ['weather', 'upload', 'sync']],
  [/download/i,         ['save', 'import', 'fetch']],
  [/upload/i,           ['send', 'export', 'share']],
  [/share/i,            ['send', 'export']],
  [/link(?!simple|break)/i, ['url', 'hyperlink', 'chain']],
  [/arrowsquareout/i,   ['external', 'open', 'new tab']],
  [/folder/i,           ['directory', 'files']],
  [/file(?!arrow|x|search|magnifying|lock|css|html|js|jsx|ts|tsx|svg|png|jpg|pdf|cloud|audio|video|image|zip|sql|cpp|c|py|rs|rb|md|ini|js|jsx|video|audio|archive|cloud)/i, ['document', 'page']],
  [/image|imagesquare/i, ['picture', 'photo', 'media']],
  [/camera/i,           ['photo', 'picture', 'capture']],
  [/microphone|mic\b/i, ['record', 'audio', 'voice']],
  [/speaker/i,          ['audio', 'sound', 'volume']],
  [/musicnote/i,        ['audio', 'sound', 'song']],
  [/play/i,             ['start', 'media', 'video']],
  [/pause/i,            ['stop', 'media']],
  [/stop/i,             ['end', 'halt']],
  [/cart/i,             ['shop', 'buy', 'ecommerce']],
  [/bag/i,              ['shop', 'buy', 'ecommerce']],
  [/coin/i,             ['money', 'currency', 'cash']],
  [/currency/i,         ['money', 'cash', 'finance']],
  [/credit/i,           ['payment', 'card']],
  [/wallet/i,           ['money', 'payment', 'finance']],
  [/chart|graph|trend/i, ['analytics', 'data', 'statistics']],
  [/pie/i,              ['chart', 'analytics']],
  [/info/i,             ['information', 'help', 'about']],
  [/question/i,         ['help', 'faq']],
  [/warning/i,          ['caution', 'alert']],
  [/sealwarning|warningoctagon|warningcircle/i, ['error', 'caution', 'alert']],
  [/lightbulb/i,        ['idea', 'tip', 'hint']],
  [/flag/i,             ['report', 'mark', 'country']],
  [/globe/i,            ['world', 'web', 'international', 'language']],
  [/map(?!pin)/i,       ['location', 'navigation']],
  [/mappin|pin/i,       ['location', 'place', 'marker']],
  [/translate/i,        ['language', 'localisation']],
  [/lightning|bolt/i,   ['flash', 'fast', 'energy']],
  [/fire/i,             ['flame', 'hot', 'trending']],
  [/water|drop/i,       ['liquid']],
  [/trash|recycle/i,    ['delete', 'remove']],
  [/garbage/i,          ['trash', 'delete']],
  [/sliders/i,          ['settings', 'controls', 'filter']],
  [/funnel/i,           ['filter']],
  [/list/i,             ['menu', 'items']],
  [/grid/i,             ['layout', 'apps']],
  [/squares|squaresfour/i, ['grid', 'apps', 'layout']],
  [/dotsthree|dots/i,   ['more', 'menu', 'options']],
  [/hamburger/i,        ['menu', 'food']],
  [/arrowsclockwise/i,  ['refresh', 'reload', 'sync']],
  [/spinnergap|spinner|circlenotch/i, ['loading', 'progress']],
  [/cube|package/i,     ['box', 'product', '3d']],
  [/printer/i,          ['print']],
  [/keyboard/i,         ['input', 'typing']],
  [/mouse/i,            ['cursor', 'click']],
  [/cursorclick|cursor/i, ['pointer', 'click']],
  [/code/i,             ['developer', 'programming']],
  [/terminal/i,         ['shell', 'command', 'developer']],
  [/bug/i,              ['debug', 'error', 'issue']],
  [/sparkle/i,          ['ai', 'magic', 'new']],
  [/robot/i,            ['ai', 'bot']],
  [/brain/i,            ['ai', 'mind', 'intelligence']],
];

/** Generic stopwords to drop from auto-tags so search stays useful. */
const STOPWORDS = new Set(['the', 'a', 'an', 'of', 'and', 'or']);

interface IconRecord {
  readonly id: string;          // PascalCase, matches source filename minus .svg
  readonly displayName: string; // Human-readable, space-separated
  readonly tags: readonly string[];
  readonly body: string;        // Inner SVG markup, fills swapped to currentColor
}

function splitCamel(name: string): readonly string[] {
  // ArrowLineUpRight -> ["arrow", "line", "up", "right"]
  // AppleLogo -> ["apple", "logo"]
  // Number3 -> ["number", "3"]
  return name
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/([a-zA-Z])([0-9])/g, '$1 $2')
    .replace(/([0-9])([a-zA-Z])/g, '$1 $2')
    .toLowerCase()
    .split(/\s+/)
    .filter((part) => part.length > 0 && !STOPWORDS.has(part));
}

function buildTags(id: string): readonly string[] {
  const set = new Set<string>();
  for (const word of splitCamel(id)) set.add(word);
  for (const [pattern, extras] of SYNONYMS) {
    if (pattern.test(id)) {
      for (const tag of extras) set.add(tag);
    }
  }
  return [...set].sort();
}

function normaliseBody(raw: string): string {
  const open = raw.indexOf('>');
  const close = raw.lastIndexOf('</svg>');
  if (open === -1 || close === -1) {
    throw new Error('Malformed SVG');
  }
  const inner = raw.slice(open + 1, close).trim();
  return inner.replace(/fill="#18181B"/g, 'fill="currentColor"');
}

function escape(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function main(): void {
  const files = readdirSync(SOURCE_DIR)
    .filter((name) => name.endsWith('.svg'))
    .sort();

  const records: IconRecord[] = [];
  for (const file of files) {
    const id = file.replace(/\.svg$/, '');
    const raw = readFileSync(join(SOURCE_DIR, file), 'utf8');
    const body = normaliseBody(raw);
    const displayName = splitCamel(id)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
    records.push({ id, displayName, tags: buildTags(id), body });
  }

  const header = `/**
 * AUTO-GENERATED — do not edit by hand.
 * Source: /assets/icons
 * Run \`bun run icons:generate\` to refresh.
 * ${records.length} icons.
 */

export interface IconRecord {
  readonly id: string;
  readonly displayName: string;
  readonly tags: readonly string[];
  readonly body: string;
}

export const ICONS: readonly IconRecord[] = [
`;

  const body = records
    .map(
      (r) =>
        `  { id: ${JSON.stringify(r.id)}, displayName: ${JSON.stringify(r.displayName)}, tags: ${JSON.stringify(r.tags)}, body: \`${escape(r.body)}\` },`,
    )
    .join('\n');

  const footer = `\n];\n\nexport const ICONS_BY_ID: ReadonlyMap<string, IconRecord> = new Map(\n  ICONS.map((icon) => [icon.id, icon]),\n);\n`;

  writeFileSync(OUTPUT_FILE, header + body + footer, 'utf8');
  console.log(`Wrote ${records.length} icons to ${OUTPUT_FILE}`);
}

main();
