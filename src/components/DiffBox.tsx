import { computed } from '@preact/signals';

import { diffedParts } from '../Model.js';

let previous = '';
const wrapperClasses = computed(() => {
    if (diffedParts.pending.value) {
        // Centers the loading spinner
        return (previous += ' flex justify-center items-center');
    }
    return diffedParts.value.length === 1
        ? (previous = 'bg-primary-dark p-2 rounded shadow-md')
        : (previous = 'h-96 w-full bg-code(& dark:dark) p-2 overflow-y-auto rounded shadow-md');
});

export function DiffBox() {
    // prettier-ignore
    return (
        <pre class={wrapperClasses}>
            {diffedParts.pending.value
                ? <span class="loader"></span>
                : diffedParts.value.length === 1
                    ? <span class="text-white bg-primary-dark">The two inputs are identical!</span>
                    : diffedParts.value.map((part) => (
                        <span class={part.added ? 'diff addition' : part.removed ? 'diff removal' : ''}>
                            {part.value}
                        </span>
                    ))}
        </pre>
    );
}
