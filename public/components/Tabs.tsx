import type { Signal } from '@preact/signals';

interface TabProps {
    label: string;
    contentFormat: Signal<string>;
};

function Tab(props: TabProps) {
    return (
        <button
            class={`min-w(10 lg:16) h-10 p-2 bg-${
                props.contentFormat.value == props.label ? 'primary-light' : 'primary-dark'
            } text-white rounded-t-lg border(& 1 code dark:code-dark)`}
            onClick={() => props.contentFormat.value = props.label}
        >
            {props.label}
        </button>
    );
}

interface TabsProps {
    contentFormat?: Signal<'PlainText' | 'HTML' | 'CSS' | 'JS'>;
};

export function Tabs(props: TabsProps) {
    if (!props.contentFormat) {
        return <div class="mt-10" />;
    }

    return (
        <>
            {['Plaintext', 'HTML', 'CSS', 'JS'].map((label) => (
                <Tab
                    label={label}
                    contentFormat={props.contentFormat}
                />
            ))}
        </>
    );
}
