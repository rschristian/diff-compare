interface WorkerHelper {
    url: URL;
    workerData: any;
}

export async function workerHelper({ url, workerData }: WorkerHelper) {
    const worker = new Worker(url);
    worker.postMessage(workerData);
    // @ts-ignore
    const { data } = await new Promise((r) => worker.addEventListener('message', r, { once: true }));
    worker.terminate();
    return data;
}
