import { useSignal, useSignalEffect } from '@preact/signals';

import type { AsyncComputedSignalPayload } from '../utils/async-computed.js';
import { DiffPart } from '../utils/diffed.js';

interface Props {
    diffedParts: AsyncComputedSignalPayload<DiffPart[]>;
}

function DelayedLoader() {
    const show = useSignal(false);

    useSignalEffect(() => {
        const timer = setTimeout(() => show.value = true, 250);
        return () => clearTimeout(timer);
    });

    return show.value && <span class="loader"></span>;
}

export function DiffBox({ diffedParts }: Props) {
    // prettier-ignore
    return (
        <pre class={`
            ${diffedParts.pending.value
                ? 'flex'
                : diffedParts.value.length === 1
                    ? '!h-auto !w-auto !bg-primary-dark'
                    : ''}
            items-center justify-center h-96 w-full bg-code(& dark:dark) p-2 overflow-y-auto rounded shadow-md
        `}>
            {
                diffedParts.pending.value
                    ? <DelayedLoader />
                    : diffedParts.value.length === 1
                        ? <span class="bg-primary-dark">The two inputs are identical!</span>
                        : diffedParts.value.map((part) => (
                            <span
                                class={`${
                                    part.added ? 'diff addition' : part.removed ? 'diff removal' : ''
                                }`}
                            >
                                {part.value}
                            </span>
                        ))
            }
        </pre>
    );
}
