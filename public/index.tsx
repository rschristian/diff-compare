import { useEffect } from 'preact/hooks';
import { Signal } from '@preact/signals';
import { withTwind } from '@rschristian/twind-wmr';

import { Root, Header, Main, Footer } from '@rschristian/intrepid-design';

import { PasteBox } from './components/PasteBox.js';
import { DiffBox } from './components/DiffBox.js';
import { localStorageSignal } from './hooks/useLocalStorage.js';

type ContentFormat = 'PlainText' | 'HTML' | 'CSS' | 'JS';

export const contentFormat = localStorageSignal('contentFormat', 'HTML') as Signal<ContentFormat>;
const [expected, formattedExpected] = localStorageSignal('expected', '') as [Signal<string>, Signal<string>];
const [received, formattedReceived] = localStorageSignal('received', '') as [Signal<string>, Signal<string>];

export function App() {
    useEffect(() => {
        const getFromLocalStorage = (signal: Signal, key: string) => {
            const item = window.localStorage.getItem(key);
            if (item) signal.value = JSON.parse(item);
        }
        getFromLocalStorage(contentFormat, 'contentFormat');
        getFromLocalStorage(expected, 'expected');
        getFromLocalStorage(received, 'received');
    });

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
                    <p class="mb-12 text(xl center lg:left)">Compare plaintext, HTML, CSS, JS and JSON strings</p>
                    <section class="flex justify-center mb-16">
                        <DiffBox expected={formattedExpected} received={formattedReceived} />
                    </section>
                </section>
                <section class="flex(& col lg:row) gap-4">
                    <PasteBox
                        label="Expected"
                        content={expected}
                        contentFormat={contentFormat}
                    />
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

export { prerender };
