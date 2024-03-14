import { batch, signal, effect, Signal } from '@preact/signals';

import { formatted } from './utils/formatted.js';
import { diffed } from './utils/diffed.js';

export type ContentFormat = 'PlainText' | 'HTML' | 'CSS' | 'JS';

export const expected = signal('');
export const received = signal('');
export const contentFormat = signal<ContentFormat>('HTML');

export const diffedParts = diffed(
    formatted(expected, contentFormat),
    formatted(received, contentFormat),
);

export function init() {
    batch(() => {
        initFromLocalStorage(expected, 'expected');
        initFromLocalStorage(received, 'received');
        initFromLocalStorage(contentFormat, 'contentFormat');
    });
}

function initFromLocalStorage(signal: Signal, key: string): void {
    if (typeof window !== 'undefined') {
        const stored = window.localStorage.getItem(key);
        if (stored) signal.value = JSON.parse(stored);
    }

    effect(() => {
        const jsonString = JSON.stringify(signal.value);
        if (typeof window !== 'undefined') localStorage.setItem(key, jsonString);
    });
}
