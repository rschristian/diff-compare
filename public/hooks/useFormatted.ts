import { useEffect, useState } from 'preact/hooks';

import type { ContentFormat } from '../index.js';
import { workerHelper } from '../workers/worker-helper.js';

export function useFormatted(raw: string, contentFormat: ContentFormat) {
    const [formatted, setFormatted] = useState('');

    useEffect(() => {
        let inProgress = true;
        workerHelper({
            url: new URL('../workers/format.worker.js', import.meta.url),
            workerData: { input: raw, contentFormat },
            cb: (data) => {
                if (!inProgress) return;
                setFormatted(data);
            }
        });
        return () => { inProgress = false };
    }, [raw, contentFormat]);

    return formatted;
}
