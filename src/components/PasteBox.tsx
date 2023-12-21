import type { Signal } from '@preact/signals';

import type { ContentFormat } from '../Model.js';

interface TabsProps {
    contentFormat?: Signal<ContentFormat>;
}

export function Tabs({ contentFormat }: TabsProps) {
    return (
        <>
            {['Plaintext', 'HTML', 'CSS', 'JS'].map((label: ContentFormat) => (
                <button
                    class={`min-w(10 lg:16) h-10 p-2 bg-${
                        contentFormat.value === label
                            ? 'primary-light text-[#222]'
                            : 'primary-dark text-white'
                    } rounded-t-lg mr(1 last:0)`}
                    onClick={() => (contentFormat.value = label)}
                >
                    {label}
                </button>
            ))}
        </>
    );
}

interface PasteBoxProps {
    label: string;
    content: Signal<string>;
    contentFormat?: Signal<ContentFormat>;
}

export function PasteBox({ label, content, contentFormat }: PasteBoxProps) {
    return (
        <div class="flex(& col) mb-8 lg:(w-1/2 mb-0) text-center">
            <label for={label} class="mb-4 text(primary(dark dark:light) 2xl) font-semibold">
                {label}
            </label>
            <div class="flex(& row)">
                {contentFormat ? (
                    <Tabs contentFormat={contentFormat} />
                ) : (
                    <div class="hidden lg:block mt-10" />
                )}
            </div>
            <textarea
                id={label}
                class="min-h-64 w-full p-2 bg-code(& dark:dark) rounded focus:(ring(& primary-light) outline-none) shadow-md"
                placeholder={label}
                value={content.value}
                onInput={(e) => (content.value = (e.target as HTMLTextAreaElement).value)}
            />
        </div>
    );
}
