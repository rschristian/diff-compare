import type { ReadonlySignal } from '@preact/signals';

import type { ContentFormat } from '../index.js';
import { asyncComputed } from './async-computed.js';
import { workerHelper } from '../workers/worker-helper.js';

export function formatted(
    inputSignal: ReadonlySignal<string>,
    contentFormatSignal: ReadonlySignal<ContentFormat>,
) {
    return asyncComputed(async () => {
        return await workerHelper({
            url: new URL('../workers/format.worker.js', import.meta.url),
            workerData: { input: inputSignal.value, contentFormat: contentFormatSignal.value },
        });
    });
}
