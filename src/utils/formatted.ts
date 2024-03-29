import type { ReadonlySignal } from '@preact/signals';

import type { ContentFormat } from '../Model.js';
import { asyncComputed } from './async-computed.js';
import { workerHelper } from '../workers/worker-helper.js';
import formatWorkerUrl from '../workers/format.worker.js?worker&url';

export function formatted(
    inputSignal: ReadonlySignal<string>,
    contentFormatSignal: ReadonlySignal<ContentFormat>,
) {
    return asyncComputed(async () => {
        if (!inputSignal.value) return '';
        return await workerHelper({
            url: formatWorkerUrl,
            workerData: { input: inputSignal.value, contentFormat: contentFormatSignal.value },
        });
    });
}
