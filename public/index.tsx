import { useMemo } from 'preact/hooks';
import { diffWords, diffLines } from 'diff';
import { withTwind } from '@rschristian/twind-wmr';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PasteBox } from './components/PasteBox';
import { DiffBox } from './components/DiffBox';
import { useLocalStorage } from './hooks/useLocalStorage';
import { format } from './utils';

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
        <div class="flex(& col) h-full">
            <Header />
            <main class="w-full lg:max-w-screen-2xl mx-auto px-6 py-12 flex-auto">
                <section class="flex justify-center mb-16">
                    <DiffBox content={diff} />
                </section>
                <section class="flex(& row) gap-4">
                    <PasteBox
                        placeholder="Expected"
                        value={expected}
                        setContent={setExpected}
                        contentFormat={contentFormat}
                        setContentFormat={setContentFormat}
                    />
                    <PasteBox placeholder="Received" value={received} setContent={setReceived} />
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
