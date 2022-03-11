import { useMemo } from 'preact/hooks';
import { diffChars } from 'diff';
import twindConfig from './styles/twind.config';

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

    const formattedExpected = useMemo(() => format(expected, contentFormat), [expected, contentFormat]);
    const formattedReceived = useMemo(() => format(received, contentFormat), [received, contentFormat]);
    const diff = useMemo(() => {
        if (!formattedExpected || !formattedReceived) return null;
        return diffChars(formattedExpected, formattedReceived).map((part: Part) => (
            <span style={{ color: part.added ? 'green' : part.removed ? 'red' : '#555' }}>
                {part.value}
            </span>
        ));
    }, [formattedExpected, formattedReceived]);

    return (
        <div class="flex(& col) h-full">
            <Header />
            <main class="w-full lg:max-w-screen-2xl mx-auto px-6 py-12 flex-auto">
                <section class="flex justify-center mb-16">
                    <DiffBox id="received" content={diff} />
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

if (import.meta.env.NODE_ENV === 'development') {
    import('@twind/wmr').then(({ default: withTwind }) => {
        const { hydrate } = withTwind({ props: { className: true }, ...twindConfig }, () => (
            <App />
        ));
        hydrate(<App />);
    });
} else {
    import('preact-iso').then(({ hydrate }) => hydrate(<App />));
}

export async function prerender(data?: any) {
    const { default: withTwind } = await import('@twind/wmr');
    return await withTwind({ props: { className: true }, ...twindConfig }, () => <App />).prerender(
        data,
    );
}
