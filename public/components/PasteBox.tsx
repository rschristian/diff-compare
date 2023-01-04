import type { Signal } from '@preact/signals';

import { Tabs } from './Tabs.js';

interface PasteBoxProps {
    label: string;
    content: Signal<string>;
    contentFormat?: Signal<'PlainText' | 'HTML' | 'CSS' | 'JS'>;
}

export function PasteBox(props: PasteBoxProps) {
    const fileTypePicker = () => {
        return props.contentFormat
            ? <Tabs contentFormat={props.contentFormat} />
            : <div class="hidden lg:block mt-10" />;
    }

    return (
        <div class="flex(& col) mb-8 lg:(w-1/2 mb-0) text-center">
            <label for={props.label} class="mb-4 text(primary(dark dark:light) 2xl) font-semibold">
                {props.label}
            </label>
            <div class="flex(& row)">
                {fileTypePicker()}
            </div>
            <textarea
                id={props.label}
                class="min-h-64 w-full p-2 bg-code(& dark:dark) rounded focus:(ring(& primary-light) outline-none) shadow-md"
                placeholder={props.label}
                value={props.content.value}
                onInput={(e) => (props.content.value = (e.target as HTMLTextAreaElement).value)}
                autocorrect="off"
            />
        </div>
    );
}
