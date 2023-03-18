import type { VNode } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { workerHelper } from '../workers/worker-helper.js';

interface Part {
    added?: boolean;
    removed?: boolean;
    value: string;
};

interface Props {
    expectedFormatted: string;
    receivedFormatted: string;
};

export function DiffBox(props: Props) {
    const [diff, setDiff] = useState<VNode | VNode[] | null>(null);

    useEffect(() => {
        let inProgress = true;
        if (!props.expectedFormatted || !props.receivedFormatted) return setDiff(null);
        workerHelper({
            url: new URL('../workers/diff.worker.js', import.meta.url),
            workerData: { ...props },
            cb: (data) => {
                if (!inProgress) return;
                setDiff(
                    data.map((part: Part) => (
                        <span class={`${part.added ? 'diff addition' : part.removed ? 'diff removal' : ''}`}>
                            {part.value}
                        </span>
                    ))
                );
            }
        });
        return () => { inProgress = false };
    }, [props.expectedFormatted, props.receivedFormatted]);

    return (
        <pre
            class={`h-96 w-full p-2 bg-code(& dark:dark) overflow-auto rounded shadow-md ${
                !Array.isArray(diff) ? 'whitespace-normal' : ''
            }`}
        >
            {diff}
        </pre>
    );
}
