import type { ReadonlySignal } from '@preact/signals';

import type { DiffPart } from '../Model.js';

interface Props {
    diffedParts: ReadonlySignal<DiffPart[]>;
}

export function DiffBox({ diffedParts }: Props) {
    // prettier-ignore
    return (
        <pre class={`
            ${diffedParts.value.length === 1
                ? '!h-auto !w-auto !bg-primary-dark'
                : ''}
            h-96 w-full bg-code(& dark:dark) p-2 overflow-y-auto rounded shadow-md
        `}>
            {
                diffedParts.value.length === 1
                    ? <span class="bg-primary-dark">The two inputs are identical!</span>
                    : diffedParts.value.map((part) => (
                        <span class={part.added ? 'diff addition' : part.removed ? 'diff removal' : ''}>
                            {part.value}
                        </span>
                    ))
            }
        </pre>
    );
}
