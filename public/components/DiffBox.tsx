import { useMemo } from 'preact/hooks';
import { diffWords, diffLines } from 'diff';

interface Part {
    added?: boolean;
    removed?: boolean;
    value: string;
};

interface Props {
    formattedExpected: string;
    formattedReceived: string;
};

export function DiffBox(props: Props) {
    const diff = useMemo(() => {
        if (!props.formattedExpected || !props.formattedReceived) return null;
        //if (!props.formattedExpected.match(/\n/g) || !props.formattedReceived.match(/\n/g)) {
        //    return (
        //        <p class="removal">
        //            One or both of the inputs resulted in a formatted output containing no newlines.
        //            This likely means that one (or both) are not in the correct format, and as such,
        //            a diff will not be attempted. Diffing content of different formats or the wrong
        //            format is rather expensive, so it is avoided.
        //        </p>
        //    );
        //}

        // prettier-ignore
        const diffMethod =
            Math.max(
                props.formattedExpected.match(/\n/g)?.length,
                props.formattedReceived.match(/\n/g)?.length
            ) > 300
                ? diffLines
                : diffWords;

        return diffMethod(props.formattedExpected, props.formattedReceived).map((part: Part) => (
            <span class={`${part.added ? 'diff addition' : part.removed ? 'diff removal' : ''}`}>
                {part.value}
            </span>
        ));
    }, [props.formattedExpected, props.formattedReceived]);

    return (
        <pre
            class={`min-h-64 max-h-96 w-full p-2 bg-code(& dark:dark) overflow-auto rounded shadow-md ${
                !Array.isArray(diff) ? 'whitespace-normal' : ''
            }`}
        >
            {diff}
        </pre>
    );
}
