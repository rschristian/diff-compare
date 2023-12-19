import { effect, Signal } from '@preact/signals';

export function initFromLocalStorage(signal: Signal, key: string): void {
    if (typeof window !== 'undefined') {
        const stored = window.localStorage.getItem(key);
        if (stored) signal.value = JSON.parse(stored);
    }

    effect(() => {
        const jsonString = JSON.stringify(signal.value);
        if (typeof window !== 'undefined') localStorage.setItem(key, jsonString);
    });
}
