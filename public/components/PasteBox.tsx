import { Tabs } from './Tabs';

type PasteBoxProps = {
    label: string;
    value: string;
    setContent: (newVal: string) => void;
    contentFormat?: 'HTML' | 'CSS' | 'JS';
    setContentFormat?: (newVal: string) => void;
};

export function PasteBox(props: PasteBoxProps) {
    const tabs = () => {
        if (!props.contentFormat) {
            return <div class="hidden lg:block mt-10" />;
        }

        return (
            <Tabs contentFormat={props.contentFormat} setContentFormat={props.setContentFormat} />
        );
    };

    return (
        <div class="flex(& col) mb-8 lg:(w-1/2 mb-0) text-center">
            <label for={props.label} class="mb-4 text(primary(dark dark:light) 2xl) font-semibold">
                {props.label}
            </label>
            <div class="flex(& row)">{tabs()}</div>
            <textarea
                id={props.label}
                class="min-h-64 w-full p-2 bg-code(& dark:dark) rounded focus:(ring(& primary-light) outline-none) shadow-md"
                placeholder={props.label}
                value={props.value}
                onInput={(e) => props.setContent((e.target as HTMLTextAreaElement).value)}
            />
        </div>
    );
}
