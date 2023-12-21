import { batch, signal, computed, effect, Signal } from '@preact/signals';
import { beautifyHtml, beautifyJs, beautifyCss } from '@rschristian/js-beautify';
import { diffWords, diffLines } from 'diff';

export type ContentFormat = 'PlainText' | 'HTML' | 'CSS' | 'JS';

export class Model {
    expected = signal('');
    received = signal('');
    contentFormat = signal<ContentFormat>('HTML');

    expectedFormatted = computed(() => format(this.expected.value, this.contentFormat.value));
    receivedFormatted = computed(() => format(this.received.value, this.contentFormat.value));

    diffedParts = computed(() =>
        diffInputs(this.expectedFormatted.value, this.receivedFormatted.value),
    );

    initFromLocalStorage() {
        batch(() => {
            initFromLocalStorage(this.expected, 'expected');
            initFromLocalStorage(this.received, 'received');
            initFromLocalStorage(this.contentFormat, 'contentFormat');
        });
    }
}

function format(input: string, contentFormat: ContentFormat): string {
    input = input.replace(/\\/g, '');
    switch (contentFormat) {
        case 'HTML':
            return beautifyHtml(input, { extra_liners: [], indent_inner_html: true });
        case 'CSS':
            return beautifyCss(input);
        case 'JS':
            return beautifyJs(input);
        default:
            return input;
    }
}

export interface DiffPart {
    added?: boolean;
    removed?: boolean;
    value: string;
}

function diffInputs(expectedFormatted: string, receivedFormatted: string): DiffPart[] {
    const diffMethod =
        Math.max(expectedFormatted.match(/\n/g)?.length, receivedFormatted.match(/\n/g)?.length) >
        300
            ? diffLines
            : diffWords;

    return diffMethod(expectedFormatted, receivedFormatted);
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
