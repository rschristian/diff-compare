import * as model from '../Model.js';

function Tabs() {
    return (
        <>
            {['Plaintext', 'HTML', 'CSS', 'JS'].map((label: model.ContentFormat) => (
                <button
                    class={`min-w(10 lg:16) h-10 p-2 ${
                        model.contentFormat.value === label
                            ? 'bg-primary-light text-[#222]'
                            : 'bg-primary-dark text-white'
                    } rounded-t-lg mr(1 last:0)`}
                    onClick={() => (model.contentFormat.value = label)}
                >
                    {label}
                </button>
            ))}
        </>
    );
}

interface PasteBoxProps {
    label: string;
}

export function PasteBox({ label }: PasteBoxProps) {
    const content = model[label.toLowerCase()];

    return (
        <div class="flex(& col) mb-8 lg:(w-1/2 mb-0) text-center">
            <label for={label} class="mb-4 text(primary(dark dark:light) 2xl) font-semibold">
                {label}
            </label>
            <div class="flex(& row)">
                {label === 'Expected'
                    ? <Tabs />
                    : <div class="hidden lg:block h-10" />
                }
            </div>
            <textarea
                id={label}
                class="min-h-64 w-full p-2 bg-code(& dark:dark) rounded focus:(ring(& primary-light) outline-none) shadow-md"
                placeholder={label}
                onInput={(e) => (content.value = (e.target as HTMLTextAreaElement).value)}
            >
                {content.value}
            </textarea>
        </div>
    );
}
