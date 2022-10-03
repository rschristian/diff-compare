import type { VNode } from 'preact';

type Props = {
    content: VNode;
};

export function DiffBox(props: Props) {
    return (
        <pre
            class={`min-h-64 max-h-96 w-full p-2 bg-code(& dark:dark) overflow-auto rounded shadow-md ${
                !props.content || props.content.type == 'p' ? 'whitespace-normal' : ''
            }`}
        >
            {props.content}
        </pre>
    );
}
