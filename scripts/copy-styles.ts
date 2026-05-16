/**
 * Copies DS styles and fonts into dist/ after tsup builds the JS/TS output.
 *
 * dist/styles/  — CSS + interactions JS
 * dist/fonts/   — Font files (consuming apps must serve these from /system/fonts/)
 */
import { copyFileSync, cpSync, mkdirSync } from 'fs';
import { join } from 'path';

const root = import.meta.dir ? join(import.meta.dir, '..') : process.cwd();

const stylesSrc  = join(root, 'src/styles');
const stylesDest = join(root, 'dist/styles');
const fontsSrc   = join(root, 'public/system/fonts');
const fontsDest  = join(root, 'dist/fonts');

mkdirSync(stylesDest, { recursive: true });
mkdirSync(fontsDest,  { recursive: true });

const styleFiles = [
  'shinoda-tokens.css',
  'shinoda-base.css',
  'shinoda-interactions.js',
  'fonts.css',
];

for (const file of styleFiles) {
  copyFileSync(join(stylesSrc, file), join(stylesDest, file));
  console.log(`  copied styles/${file}`);
}

cpSync(fontsSrc, fontsDest, { recursive: true });
console.log('  copied fonts/');

console.log('\nStyles and fonts ready in dist/');
