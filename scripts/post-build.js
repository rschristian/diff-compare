import { promises as fs } from 'node:fs';

(async function inlineCSS() {
    const linkRegex = /<link rel="stylesheet" href="\/assets\/styles([^\n]*)/;
    const css = await fs.readFile(
        `dist/assets/styles/${(await fs.readdir('dist/assets/styles'))[0]}`,
        'utf-8',
    );

    let html = await fs.readFile('dist/index.html', 'utf-8');
    if (linkRegex.test(html)) {
        html = html.replace(linkRegex, `<style>${css}</style>`);
        await fs.writeFile('dist/index.html', html);
    }
})();
