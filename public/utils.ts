import { beautifyHtml, beautifyJs, beautifyCss } from '@rschristian/js-beautify';

export function format(input: string, contentFormat: 'HTML' | 'CSS' | 'JS'): string {
    if (typeof window === 'undefined') return '';
    input = input.replace(/\\/g, '');
    switch (contentFormat) {
        case 'HTML':
            return beautifyHtml(input, { extra_liners: [], indent_inner_html: true });
        case 'CSS':
            return beautifyCss(input);
        default:
            return beautifyJs(input);
    }
}

// Expected
// <!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>preact-custo-template<\/title><meta name="example-meta" content="Hello World"><link rel="manifest" href="\/manifest.json"><\/head><body><h1>Guess what<\/h1><h2>This is an app with custom template<\/h2><script defer="defer" src="\/bundle.\w{5}.js"><\/script><h2>This is an app with custom template<\/h2><script type="__PREACT_CLI_DATA__">%7B%22preRenderData%22:%7B%22url%22:%22\/%22%7D%7D<\/script><script crossorigin="anonymous" src="\/bundle.\w{5}.js" type="module"><\/script><script nomodule="" src="\/dom-polyfills.\w{5}.legacy.js"><\/script><script nomodule="" src="\/es-polyfills.legacy.js"><\/script><script nomodule="" defer="defer" src="\/bundle.\w{5}.legacy.js"><\/script><\/body><\/html>

// Received
// <!DOCTYPE html><html lang=\"en\"><head><meta charset=\"utf-8\"><title>preact-custom-template</title><meta name=\"example-meta\" content=\"Hello World\"><link rel=\"manifest\" href=\"/manifest.json\"></head><body><h1>Guess what</h1><h2>This is an app with custom template</h2><script defer=\"defer\" src=\"/bundle.f693f.js\"></script><h2>This is an app with custom template</h2><script type=\"__PREACT_CLI_DATA__\">%7B%22preRenderData%22:%7B%22url%22:%22/%22%7D%7D</script><script crossorigin=\"anonymous\" src=\"/bundle.f693f.js\" type=\"module\"></script><script nomodule=\"\" src=\"/dom-polyfills.52a34.legacy.js\"></script><script nomodule=\"\" src=\"/es-polyfills.legacy.js\"></script><script nomodule=\"\" defer=\"defer\" src=\"/bundle.f693f.legacy.js\"></script></body></html>

// export function(  ) { console.log('foo') }
