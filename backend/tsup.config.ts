import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  // format: ['esm', 'cjs'],
  // minify: true,
  // shims: true,
  bundle: true,
  platform: 'node',
  target: 'node18',
  sourcemap: true,
  // splitting: false,
  // esbuildOptions(options) {
  //   options.banner = {
  //     js: "const require = (await import('node:module')).createRequire(import.meta.url);const __filename = (await import('node:url')).fileURLToPath(import.meta.url);const __dirname = (await import('node:path')).dirname(__filename);"
  //   }
  // }
})
