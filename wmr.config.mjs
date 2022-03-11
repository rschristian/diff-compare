import { defineConfig } from 'wmr';
import groupingPlugin from 'wmr-plugin-tailwind-grouping';

// Full list of options: https://wmr.dev/docs/configuration
export default defineConfig({
    plugins: [groupingPlugin()],
});
