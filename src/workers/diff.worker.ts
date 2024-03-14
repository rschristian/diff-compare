import { diffWords, diffLines } from 'diff';

function firstThreeLines(str: string) {
    return str.match(/(?:[^\n]*?\n){0,3}/)[0];
}

function lastThreeLines(str: string) {
    return str.match(/.*([\n].*){0,3}$/)[0];
}

function newLineCount(str: string) {
    return str.split('\n').length - 1;
}

//function dedent(str: string) {
//    const lines = str.split('\n');
//    const indent = lines.reduce((indent, line) => {
//        if (line.trim() === '') return indent;
//        const lineIndent = line.match(/^\s*/)[0].length;
//        return lineIndent < indent ? lineIndent : indent;
//    }, Infinity);
//    return lines.map((line) => line.slice(indent)).join('\n');
//}

function diffInputs(expectedFormatted: string, receivedFormatted: string) {
    const diffMethod =
        // prettier-ignore
        Math.max(
            expectedFormatted.match(/\n/g)?.length,
            receivedFormatted.match(/\n/g)?.length
        ) > 300
            ? diffLines
            : diffWords;

    return diffMethod(expectedFormatted, receivedFormatted);
}

addEventListener('message', ({ data }) => {
    const diff = diffInputs(data.expectedFormatted, data.receivedFormatted);

    postMessage(
        diff.map((segment: { value: string; added?: boolean; removed?: boolean }, i: number) => {
            if (segment.added || segment.removed) return segment;

            if (i == 0) {
                return {
                    value:
                        (newLineCount(segment.value) > 3 ? '...\n' : '') +
                        lastThreeLines(segment.value),
                };
            }

            if (i == diff.length - 1) {
                return {
                    value:
                        firstThreeLines(segment.value) +
                        (newLineCount(segment.value) > 3 ? '...' : ''),
                };
            }

            return {
                value:
                    newLineCount(segment.value) > 6
                        ? firstThreeLines(segment.value) + '...\n' + lastThreeLines(segment.value)
                        : segment.value,
            };
        }),
    );
});
