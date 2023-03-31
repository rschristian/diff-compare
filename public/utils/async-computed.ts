// https://gist.github.com/surma/fbe92a856eebc3dbcbe611a653eab333
import { signal, computed, effect, ReadonlySignal } from '@preact/signals';

export type AsyncComputedSignalPayload<T, E = any> = ReadonlySignal<T | null> & {
    pending: ReadonlySignal<boolean>;
    error: ReadonlySignal<E | null>;
};

export function asyncComputed<T, E = any>(
    fn: () => Promise<T> | T,
): AsyncComputedSignalPayload<T, E> {
    const valueS = signal<T | null>(null);
    const errorS = signal<E | null>(null);
    const pendingS = signal<boolean>(true);
    effect(async () => {
        pendingS.value = true;
        valueS.value = null;
        errorS.value = null;
        try {
            const value = await fn();
            valueS.value = value;
        } catch (error) {
            errorS.value = error;
        } finally {
            pendingS.value = false;
        }
    });

    // Return a proper ReadonlySignal
    const s = computed(() => valueS.value) as AsyncComputedSignalPayload<T, E>;
    s.error = computed(() => errorS.value);
    s.pending = computed(() => pendingS.value);
    return s;
}
