import { diffWords, diffLines } from 'diff';

function diffInputs(expectedFormatted: string, receivedFormatted: string) {
    const diffMethod =
        Math.max(
            expectedFormatted.match(/\n/g)?.length,
            receivedFormatted.match(/\n/g)?.length
        ) > 300
            ? diffLines
            : diffWords;

    return diffMethod(expectedFormatted, receivedFormatted);
}

addEventListener('message', ({ data }) => {
    postMessage(diffInputs(data.expectedFormatted, data.receivedFormatted));
})
