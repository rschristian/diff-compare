import { promises as fs } from 'node:fs';

let html = await fs.readFile('dist/index.html', 'utf-8');

// Scripts
const themeToggleJS = await fs.readFile(
    `dist/${(await fs.readdir('dist')).find((entry) => /^themeToggle/.test(entry))}`,
    'utf-8',
);
html = html.replace(
    /<script.*\/themeToggle[^\n]*/g,
    `<script type="module">${themeToggleJS}</script>`,
);

// CSS
const globalCSS = await fs.readFile(
    `dist/assets/styles/${(await fs.readdir('dist/assets/styles'))[0]}`,
    'utf-8',
);
html = html.replace(/<link.*href=".*global[^\n]*/, `<style>${globalCSS}</style>`);

await fs.writeFile('dist/index.html', html);
