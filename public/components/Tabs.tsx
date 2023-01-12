import type { ContentFormat } from '../index.js';

interface TabProps {
    label: string;
    selected: boolean;
    setSelected: (label: string) => void;
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
    contentFormat?: ContentFormat;
    setContentFormat?: (newVal: string) => void;
};

export function Tabs(props: TabsProps) {
    return (
        <>
            {['Plaintext', 'HTML', 'CSS', 'JS'].map((content) => (
                <Tab
                    label={content}
                    selected={props.contentFormat === content}
                    setSelected={props.setContentFormat}
                />
            ))}
        </>
    );
}
