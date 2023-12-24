import type { AsyncComputedSignalPayload } from './async-computed.js';
import { asyncComputed } from './async-computed.js';
import { workerHelper } from '../workers/worker-helper.js';
import diffWorkerUrl from '../workers/diff.worker?worker&url';

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
        if (typeof window === 'undefined') return []
        while (!expectedFormatted.value || !receivedFormatted.value) {
            await new Promise((r) => setTimeout(r, 5));
        }
        return await workerHelper({
            url: diffWorkerUrl,
            workerData: {
                expectedFormatted: expectedFormatted.value,
                receivedFormatted: receivedFormatted.value,
            },
        });
    });
}
