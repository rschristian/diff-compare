import { promises as fs } from 'node:fs';

let html = await fs.readFile('dist/index.html', 'utf-8');

// Scripts
const themeSwitcherJS = await fs.readFile(
    `dist/${(await fs.readdir('dist')).find((entry) => /^themeSwitcher/.test(entry))}`,
    'utf-8',
);
html = html.replace(
    /<script.*\/themeSwitcher[^\n]*/g,
    `<script type="module">${themeSwitcherJS}</script>`,
);

// CSS
const globalCSS = await fs.readFile(
    `dist/assets/styles/${(await fs.readdir('dist/assets/styles'))[0]}`,
    'utf-8',
);
html = html.replace(/<link.*href=".*global[^\n]*/, `<style>${globalCSS}</style>`);

await fs.writeFile('dist/index.html', html);
