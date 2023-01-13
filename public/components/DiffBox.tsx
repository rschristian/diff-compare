import type { VNode } from 'preact';
import { useEffect, useState } from 'preact/hooks';

interface Part {
    added?: boolean;
    removed?: boolean;
    value: string;
};

interface Props {
    formattedExpected: string;
    formattedReceived: string;
};

export function DiffBox(props: Props) {
    const [diff, setDiff] = useState<VNode | VNode[] | null>(null);

    useEffect(() => {
        let inProgress = true;
        if (!props.formattedExpected || !props.formattedReceived) return setDiff(null);
        diffContent();

        return () => { inProgress = false };

        async function diffContent() {
            const diffWorker = new Worker(new URL('../workers/diff.worker.js', import.meta.url));
            diffWorker.postMessage({ expectedFormatted: props.formattedExpected, receivedFormatted: props.formattedReceived });
            diffWorker.addEventListener('message', ({ data }) => {
                console.log(inProgress);
                if (!inProgress) return;
                setDiff(
                    data.map((part: Part) => (
                        <span class={`${part.added ? 'diff addition' : part.removed ? 'diff removal' : ''}`}>
                            {part.value}
                        </span>
                    ))
                );
            });
            return () => diffWorker.terminate();
        }
    }, [props.formattedExpected, props.formattedReceived]);

    return (
        <pre
            class={`min-h-64 max-h-96 w-full p-2 bg-code(& dark:dark) overflow-auto rounded shadow-md ${
                !Array.isArray(diff) ? 'whitespace-normal' : ''
            }`}
        >
            {diff}
        </pre>
    );
}
