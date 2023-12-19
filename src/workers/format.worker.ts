import { beautifyHtml, beautifyJs, beautifyCss } from '@rschristian/js-beautify';

import type { ContentFormat } from '../model.js';

function format(input: string, contentFormat: ContentFormat): string {
    input = input.replace(/\\/g, '');
    switch (contentFormat) {
        case 'HTML':
            return beautifyHtml(input, { extra_liners: [], indent_inner_html: true });
        case 'CSS':
            return beautifyCss(input);
        case 'JS':
            return beautifyJs(input);
        default:
            return input;
    }
}

addEventListener('message', ({ data }) => {
    postMessage(format(data.input, data.contentFormat));
});
