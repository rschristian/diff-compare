import type { AsyncComputedSignalPayload } from '../utils/async-computed.js';
import { DiffPart } from '../utils/diffed.js';

interface Props {
    diffedParts: AsyncComputedSignalPayload<DiffPart[]>;
}

export function DiffBox({ diffedParts }: Props) {
    return (
        <pre class="h-96 w-full p-2 bg-code(& dark:dark) overflow-auto rounded shadow-md">
            {diffedParts.pending.value
                ? ''
                : diffedParts.value.map((part) => (
                      <span
                          class={`${
                              part.added ? 'diff addition' : part.removed ? 'diff removal' : ''
                          }`}
                      >
                          {part.value}
                      </span>
                  ))}
        </pre>
    );
}
