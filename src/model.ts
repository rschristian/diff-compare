import { signal } from '@preact/signals';

import { diffed } from './utils/diffed.js';
import { formatted } from './utils/formatted.js';
import { initFromLocalStorage } from './utils/local-storage.js';

export type ContentFormat = 'PlainText' | 'HTML' | 'CSS' | 'JS';

export class Model {
    expected = signal('');
    received = signal('');
    contentFormat = signal<ContentFormat>('HTML');

    expectedFormatted = formatted(this.expected, this.contentFormat);
    receivedFormatted = formatted(this.received, this.contentFormat);

    diffedParts = diffed(this.expectedFormatted, this.receivedFormatted);

    initFromLocalStorage() {
        initFromLocalStorage(this.contentFormat, 'contentFormat');
        initFromLocalStorage(this.expected, 'expected');
        initFromLocalStorage(this.received, 'received');
    }
}
