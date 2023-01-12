import { withTwind } from '@rschristian/twind-wmr';

import { Root, Header, Main, Footer } from '@rschristian/intrepid-design';

import { PasteBox } from './components/PasteBox.js';
import { DiffBox } from './components/DiffBox.js';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import { useFormatted } from './hooks/useFormatted.js';

export type ContentFormat = 'PlainText' | 'HTML' | 'CSS' | 'JS';

export function App() {
    const [expected, setExpected] = useLocalStorage('expected', '');
    const [received, setReceived] = useLocalStorage('received', '');
    const [contentFormat, setContentFormat] = useLocalStorage('contentFormat', 'HTML');

    const formattedExpected = useFormatted(expected, contentFormat);
    const formattedReceived = useFormatted(received, contentFormat);

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
                        <DiffBox formattedExpected={formattedExpected} formattedReceived={formattedReceived} />
                    </section>
                </section>
                <section class="flex(& col lg:row) gap-4">
                    <PasteBox
                        label="Expected"
                        content={expected}
                        setContent={setExpected}
                        contentFormat={contentFormat}
                        setContentFormat={setContentFormat}
                    />
                    <PasteBox label="Received" content={received} setContent={setReceived} />
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
