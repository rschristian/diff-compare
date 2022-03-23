type Props = {
    content: string;
    id: string;
};

export function DiffBox(props: Props) {
    return (
        <pre
            id={props.id}
            class="min-h-32 lg:h-112 lg:w-1/2 p-2 bg-alabaster overflow-auto rounded shadow-md"
        >
            {props.content}
        </pre>
    );
}
