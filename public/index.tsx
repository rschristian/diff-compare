import { useMemo } from 'preact/hooks';
import { diffWords, diffLines } from 'diff';
import { withTwind } from '@rschristian/twind-wmr';

import { Header } from './components/core/Header';
import { Footer } from './components/core/Footer';
import { PasteBox } from './components/PasteBox';
import { DiffBox } from './components/DiffBox';
import { useLocalStorage } from './hooks/useLocalStorage';
import { format } from './utils/format';

type Part = {
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
        <div class="flex(& col) h-full px-5 text(content dark:content-dark) bg([#f8f8f8] dark:[#2a2727])">
            <Header />
            <main class="w-full lg:max-w-screen-2xl flex-1 mb(16 md:32) mx-auto">
                <section class="w-full lg:max-w-4xl mx-auto">
                    <h1 class="mb-2 text(primary(dark dark:light) 5xl center lg:left)">
                        Diff & Compare
                    </h1>
                    <p class="text-xl mb-12">Compare plaintext, HTML, CSS, JS and JSON strings</p>
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
            </main>
            <Footer />
        </div>
    );
}

const { hydrate, prerender } = withTwind(
    () => import('./styles/twind.config').then(({ twindConfig }) => twindConfig),
    () => <App />,
);

hydrate(<App />);

export { prerender };
