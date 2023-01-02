import { useMemo } from 'preact/hooks';
import { diffWords, diffLines } from 'diff';
import { withTwind } from '@rschristian/twind-wmr';

import { Root, Header, Main, Footer } from '@rschristian/intrepid-design';

import { PasteBox } from './components/PasteBox.js';
import { DiffBox } from './components/DiffBox.js';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import { format } from './utils/format.js';

interface Part {
    added?: boolean;
    removed?: boolean;
    value: string;
};

export function App() {
    const [expected, setExpected] = useLocalStorage('expected', '');
    const [received, setReceived] = useLocalStorage('received', '');
    const [contentFormat, setContentFormat] = useLocalStorage('contentFormat', 'HTML');

    const formattedExpected = useMemo(
        () => format(expected, contentFormat),
        [expected, contentFormat],
    );
    const formattedReceived = useMemo(
        () => format(received, contentFormat),
        [received, contentFormat],
    );
    const diff = useMemo(() => {
        if (!formattedExpected || !formattedReceived) return null;
        if (!formattedExpected.match(/\n/g) || !formattedReceived.match(/\n/g)) {
            return (
                <p class="removal">
                    One or both of the inputs resulted in a formatted output containing no newlines.
                    This likely means that one (or both) are not in the correct format, and as such,
                    a diff will not be attempted. Diffing content of different formats or the wrong
                    format is rather expensive, so it is avoided.
                </p>
            );
        }
        // prettier-ignore
        const diffMethod =
            Math.max(
                formattedExpected.match(/\n/g).length,
                formattedReceived.match(/\n/g).length
            ) > 300
                ? diffLines
                : diffWords;

        return diffMethod(formattedExpected, formattedReceived).map((part: Part) => (
            <span class={`${part.added ? 'diff addition' : part.removed ? 'diff removal' : ''}`}>
                {part.value}
            </span>
        ));
    }, [formattedExpected, formattedReceived]);

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
                        <DiffBox content={diff} />
                    </section>
                </section>
                <section class="flex(& col lg:row) gap-4">
                    <PasteBox
                        label="Expected"
                        value={expected}
                        setContent={setExpected}
                        contentFormat={contentFormat}
                        setContentFormat={setContentFormat}
                    />
                    <PasteBox label="Received" value={received} setContent={setReceived} />
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
