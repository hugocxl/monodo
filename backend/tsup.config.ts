import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  format: ['cjs'],
  bundle: true,
  target: 'node18',
  sourcemap: true
})
