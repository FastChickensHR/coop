import { defineConfig } from 'vite'

// Library build for the Coop package (ADR-0191). Bundles the components to ESM;
// react / react-dom / styled-components are peer deps and the radix / heroicons /
// internationalized packages are runtime deps — all externalised so the consumer
// resolves one copy. Types are emitted separately by `tsc --emitDeclarationOnly`.
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      external: (id) =>
        id === 'react' ||
        id === 'react-dom' ||
        id === 'react/jsx-runtime' ||
        id === 'styled-components' ||
        id.startsWith('@radix-ui/') ||
        id.startsWith('@heroicons/') ||
        id.startsWith('@internationalized/'),
    },
  },
})
