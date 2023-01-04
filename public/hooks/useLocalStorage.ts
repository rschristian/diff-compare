import { effect, signal, Signal } from '@preact/signals';

import { contentFormat } from '../index.js';

function formatContent(inputSignal: Signal<string>, outputSignal: Signal<string>) {
    const formatWorker = new Worker(new URL('../workers/format.worker.js', import.meta.url));
    formatWorker.postMessage({ input: inputSignal.value, contentFormat: contentFormat.value });
    formatWorker.addEventListener('message', (e) => outputSignal.value = e.data);
    return () => formatWorker.terminate();
}

export function localStorageSignal(key: string, initialValue: string) {
    let initialized = false;
    const lsSignal = signal(initialValue);
    const lsSignalFormatted = signal('');

    effect(() => {
        if (typeof window !== 'undefined') {
            if (key !== 'contentFormat') formatContent(lsSignal, lsSignalFormatted);

            if (initialized) window.localStorage.setItem(key, JSON.stringify(lsSignal.value));
            else initialized = true;
        }
    });

    return key === 'contentFormat' ? lsSignal : [lsSignal, lsSignalFormatted];
}
