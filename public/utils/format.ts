import { beautifyHtml, beautifyJs, beautifyCss } from '@rschristian/js-beautify';

export function format(input: string, contentFormat: 'HTML' | 'CSS' | 'JS'): string {
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
