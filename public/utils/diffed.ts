import type { AsyncComputedSignalPayload } from './async-computed.js';
import { asyncComputed } from './async-computed.js';
import { workerHelper } from '../workers/worker-helper.js';

export interface DiffPart {
    added?: boolean;
    removed?: boolean;
    value: string;
}

export function diffed(
    expectedFormatted: AsyncComputedSignalPayload<string>,
    receivedFormatted: AsyncComputedSignalPayload<string>,
) {
    return asyncComputed<DiffPart[]>(async () => {
        if (
            expectedFormatted.pending.value ||
            receivedFormatted.pending.value ||
            !expectedFormatted.value ||
            !receivedFormatted.value
        )
            return [];
        return await workerHelper({
            url: new URL('../workers/diff.worker.js', import.meta.url),
            workerData: {
                expectedFormatted: expectedFormatted.value,
                receivedFormatted: receivedFormatted.value,
            },
        });
    });
}
