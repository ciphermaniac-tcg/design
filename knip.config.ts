import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  // Everything under src/ is the package's public surface, reached through `exports`.
  entry: ['src/components/*.tsx', 'src/lib/*.ts', 'tests/*.test.ts'],
  project: ['src/**/*.{ts,tsx}', 'tests/**/*.ts'],
  ignoreExportsUsedInFile: true,
  includeEntryExports: false
};

export default config;
