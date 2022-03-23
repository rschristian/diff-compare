type PasteBoxProps = {
    placeholder: string;
    value: string;
    setContent: (newVal: string) => void;
    contentFormat?: 'HTML' | 'CSS' | 'JS';
    setContentFormat?: (newVal: string) => void;
};

export function PasteBox(props: PasteBoxProps) {
    const tabs = () => {
        if (!props.contentFormat) {
            return <div class="mt-10" />;
        }
        return ['HTML', 'CSS', 'JS'].map((content) => (
            <Tab
                label={content}
                setSelected={props.setContentFormat}
                selected={props.contentFormat === content}
            />
        ));
    };

    return (
        <div class="w-1/2 flex(& col) text-center">
            <label for={props.placeholder} class="mb-4 text(cadet 2xl) font-semibold">
                {props.placeholder}
            </label>
            <div class="flex(& row)">{tabs()}</div>
            <textarea
                id={props.placeholder}
                class="min-h-48 w-full p-2 bg-alabaster rounded focus:(ring(& cadet) outline-none) shadow-md"
                placeholder={props?.placeholder}
                value={props.value}
                onInput={(e) => props.setContent((e.target as HTMLTextAreaElement).value)}
            />
        </div>
    );
}

type TabProps = {
    label: string;
    setSelected: (label: string) => void;
    selected: boolean;
};

function Tab(props: TabProps) {
    return (
        <button
            class={`min-w(10 lg:16) h-10 p-2 bg-${
                props.selected ? 'cadet-brighter' : 'cadet'
            } text-alabaster rounded-t-lg border(& 1 timberwolf)`}
            onClick={() => props.setSelected(props.label)}
        >
            {props.label}
        </button>
    );
}
