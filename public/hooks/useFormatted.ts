import { useEffect, useState } from 'preact/hooks';

import type { ContentFormat } from '../index.js';

export function useFormatted(raw: string, contentFormat: ContentFormat) {
    const [formatted, setFormatted] = useState('');

    useEffect(() => {
        let inProgress = true;
        format();
        return () => { inProgress = false };

        async function format() {
            const formatWorker = new Worker(new URL('../utils/format.worker.js', import.meta.url))
            formatWorker.postMessage({ input: raw, contentFormat });
            formatWorker.addEventListener('message', (e: { data: string }) => {
                if (!inProgress) return;
                setFormatted(e.data);
            });
            return () => formatWorker.terminate();
        }
    }, [raw, contentFormat]);

    return formatted;
}
