import type { AsyncComputedSignalPayload } from '../utils/async-computed.js';
import { DiffPart } from '../utils/diffed.js';

interface Props {
    diffedParts: AsyncComputedSignalPayload<DiffPart[]>;
}

export function DiffBox({ diffedParts }: Props) {
    return (
        diffedParts.pending.value
            ? <div class="h-96"><span class="loader"></span></div>
            : <pre
                class={`${
                    diffedParts.value.length > 1
                        ? 'w-full bg-code(& dark:dark)'
                        : 'h-auto bg-primary-dark'
                } h-96 p-2 overflow-auto rounded shadow-md`}
            >
                {diffedParts.value.length === 1
                    ? <span class="bg-primary-dark">The two inputs are identical</span>
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
