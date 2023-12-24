interface WorkerHelper {
    url: string;
    workerData: any;
}

export async function workerHelper({ url, workerData }: WorkerHelper) {
    const worker = new Worker(url, { type: 'module' });
    worker.postMessage(workerData);
    // @ts-ignore
    const { data } = await new Promise((r) =>
        worker.addEventListener('message', r, { once: true }),
    );
    worker.terminate();
    return data;
}
