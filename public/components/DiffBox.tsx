import type { VNode } from 'preact';
import { signal, Signal, useSignalEffect } from '@preact/signals';

const diff: Signal<VNode | Part[]> = signal([]);

function diffContent(expectedFormatted: Signal<string>, recievedFormatted: Signal<string>) {
    console.log('triggering worker');
    const formatWorker = new Worker(new URL('../workers/diff.worker.js', import.meta.url));
    formatWorker.postMessage({ expectedFormatted: expectedFormatted.value, recievedFormatted: recievedFormatted.value });
    formatWorker.addEventListener('message', (e) => diff.value = e.data);
    return () => formatWorker.terminate();
}

interface Part {
    added?: boolean;
    removed?: boolean;
    value: string;
};

interface Props {
    expected: Signal<string>;
    received: Signal<string>;
};

export function DiffBox(props: Props) {
    useSignalEffect(() => {
        console.log('triggering effect');
        if (!props.expected.value || !props.received.value) return null;
        if (!props.expected.value.match(/\n/g) || !props.received.value.match(/\n/g)) {
            diff.value = (
                <p class="removal">
                    One or both of the inputs resulted in a  output containing no newlines.
                    This likely means that one (or both) are not in the correct format, and as such,
                    a diff will not be attempted. Diffing content of different formats or the wrong
                    format is rather expensive, so it is avoided.
                </p>
            );
        }

        if (typeof window !== 'undefined') diffContent(props.expected, props.received);
    });

    return (
        <pre
            class={`min-h-64 max-h-96 w-full p-2 bg-code(& dark:dark) overflow-auto rounded shadow-md ${
                !Array.isArray(diff.value) ? 'whitespace-normal' : ''
            }`}
        >
            {!Array.isArray(diff.value)
                ? diff.value
                : diff.value.map((part: Part) => (
                    <span class={`${part.added ? 'diff addition' : part.removed ? 'diff removal' : ''}`}>
                        {part.value}
                    </span>
                ))
            }
        </pre>
    );
}
