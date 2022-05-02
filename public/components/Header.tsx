export function Header() {
    return (
        <header class="bg-ebony">
            <div class="py-12 px-4">
                <div class="mx-auto text-center">
                    <h1 class="mb-2 text(timberwolf 5xl) font-bold">Diff & Compare!</h1>
                    <h2 class="text(timberwolf xl)">
                        Compare and diff unformatted HTML, JS, CSS, and JSON strings
                    </h2>
                    <a
                        class="inline-flex mt-8 px-4 py-2 text-timberwolf border(1 solid timberwolf) bg(alabaster opacity-10) hover:(text-alabaster bg(cadet opacity-20) border-cadet-brighter) rounded-md"
                        href="https://github.com/rschristian/diff-compare"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Check it out on GitHub
                    </a>
                </div>
            </div>
        </header>
    );
}
