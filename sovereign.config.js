import { defineConfig } from '@sovereignjs/core';

export default defineConfig({
    optimizeDeps: {
        include: ['@rschristian/js-beautify', 'diff'],
    },
});
