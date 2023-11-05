module.exports = {
  '{backend,frontend,shared}/**/*.{ts,tsx}': [
    'pnpm --reporter=silent lint:fix',
    'pnpm --reporter=silent format:fix'
  ],
  // '{backend,frontend,shared}/**/*.{ts,tsx}': "bash -c 'pnpm types:check'"
  '{backend,frontend,shared}/**/*.{ts,tsx}': 'tsc-files --noEmit'
}
