import { diffWords, diffLines } from 'diff';

function diffInputs(expectedFormatted, recievedFormatted) {
    console.log(expectedFormatted);
    console.log(recievedFormatted);
    const diffMethod =
        Math.max(expectedFormatted.match(/\n/g).length, recievedFormatted.match(/\n/g).length) > 300
            ? diffLines
            : diffWords;

    console.log(diffMethod);
    const x = diffMethod('Hello', 'World!')
    console.log(x);
    return x;
}

addEventListener('message', ({ data }) => {
    postMessage(diffInputs(data.expectedFormatted, data.recievedFormatted));
});
