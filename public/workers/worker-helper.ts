interface WorkerHelper {
    url: URL;
    workerData: any;
    cb: (data: any) => void;
}

export function workerHelper({ url, workerData, cb }: WorkerHelper) {
    const worker = new Worker(url);
    worker.postMessage(workerData);
    worker.addEventListener('message', ({ data }) => {
        cb(data);
        return () => worker.terminate();
    });
}
