interface TabProps {
    label: string;
    setSelected: (label: string) => void;
    selected: boolean;
};

function Tab(props: TabProps) {
    return (
        <button
            class={`min-w(10 lg:16) h-10 p-2 bg-${
                props.selected ? 'primary-light' : 'primary-dark'
            } text-white rounded-t-lg border(& 1 code dark:code-dark)`}
            onClick={() => props.setSelected(props.label)}
        >
            {props.label}
        </button>
    );
}

interface TabsProps {
    contentFormat?: 'HTML' | 'CSS' | 'JS';
    setContentFormat?: (newVal: string) => void;
};

export function Tabs(props: TabsProps) {
    if (!props.contentFormat) {
        return <div class="mt-10" />;
    }

    return (
        <>
            {['Plaintext', 'HTML', 'CSS', 'JS'].map((content) => (
                <Tab
                    label={content}
                    setSelected={props.setContentFormat}
                    selected={props.contentFormat === content}
                />
            ))}
        </>
    );
}
