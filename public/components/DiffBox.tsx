import type { VNode } from 'preact';

type Props = {
    content: VNode;
};

export function DiffBox(props: Props) {
    return (
        <pre
            class={`min-h-32 lg:h-112 w(full xl:1/2) p-2 bg-alabaster overflow-auto rounded shadow-md ${
                !props.content || props.content.type == 'p' ? 'whitespace-normal' : ''
            }`}
        >
            {props.content}
        </pre>
    );
}
