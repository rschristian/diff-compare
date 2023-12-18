import { withTwind } from '@rschristian/twind-wmr';
import { signal } from '@preact/signals';

import { Root, Header, Main, Footer } from '@rschristian/intrepid-design';

import { PasteBox } from './components/PasteBox.js';
import { DiffBox } from './components/DiffBox.js';
import { initFromLocalStorage } from './utils/local-storage.js';
import { formatted } from './utils/formatted.js';
import { diffed } from './utils/diffed.js';

export type ContentFormat = 'PlainText' | 'HTML' | 'CSS' | 'JS';

const expected = signal('');
const received = signal('');
const contentFormat = signal<ContentFormat>('HTML');

// Combine formatting & diffing into 1 big signal?
const expectedFormatted = formatted(expected, contentFormat);
const receivedFormatted = formatted(received, contentFormat);
const diffedParts = diffed(expectedFormatted, receivedFormatted);

export function App() {
    return (
        <Root>
            <Header RSC={{ href: 'https://github.com/rschristian', label: 'My GitHub Account' }}>
                <Header.NavItem
                    href="https://github.com/rschristian/diff-compare"
                    label="Source Code on GitHub"
                    iconId="github"
                />
                <Header.NavItem
                    href="https://twitter.com/_rschristian"
                    label="My Twitter Account"
                    iconId="twitter"
                />
                <Header.ThemeToggle />
            </Header>
            <Main widthStyle="w-full lg:max-w-screen-2xl">
                <section class="w-full lg:max-w-4xl mx-auto">
                    <h1 class="mb-2 text(primary(dark dark:light) 5xl center lg:left)">
                        Diff & Compare
                    </h1>
                    <p class="mb-12 text(xl center lg:left)">
                        Compare plaintext, HTML, CSS, JS and JSON strings
                    </p>
                    <section class="flex justify-center mb-16">
                        <DiffBox diffedParts={diffedParts} />
                    </section>
                </section>
                <section class="flex(& col lg:row) gap-4">
                    <PasteBox label="Expected" content={expected} contentFormat={contentFormat} />
                    <PasteBox label="Received" content={received} />
                </section>
            </Main>
            <Footer year={2022} />
        </Root>
    );
}

const { hydrate, prerender } = withTwind(
    () => import('./styles/twind.config.js'),
    () => <App />,
);

hydrate(<App />);

initFromLocalStorage(contentFormat, 'contentFormat');
initFromLocalStorage(expected, 'expected');
initFromLocalStorage(received, 'received');

export { prerender };
