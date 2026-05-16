import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  external: ['react', 'react-dom', 'next'],
  clean: true,
  sourcemap: true,
  treeshake: true,
  tsconfig: './tsconfig.lib.json',
});
