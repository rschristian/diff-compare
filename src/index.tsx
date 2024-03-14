import { withTwind } from '@rschristian/twind-wmr';
import { Root, Header, Main, Footer } from '@rschristian/intrepid-design';

import { PasteBox } from './components/PasteBox.js';
import { DiffBox } from './components/DiffBox.js';
import { init } from './Model.js';

export function App() {
    return (
        <Root>
            <Header RSC={{ href: 'https://github.com/rschristian', label: 'My GitHub Account' }}>
                <Header.NavItem
                    href="https://github.com/rschristian/diff-compare"
                    label="Source Code on GitHub"
                    iconId="github"
                />
                <Header.NavItem
                    href="https://twitter.com/_rschristian"
                    label="My Twitter Account"
                    iconId="twitter"
                />
                <Header.ThemeToggle />
            </Header>
            <Main widthStyle="w-full lg:max-w-screen-2xl">
                <section class="w-full lg:max-w-4xl mx-auto">
                    <h1 class="mb-2 text(primary(dark dark:light) 5xl center lg:left)">
                        Diff & Compare
                    </h1>
                    <p class="mb-12 text(xl center lg:left)">
                        Compare plaintext, HTML, CSS, JS and JSON strings
                    </p>
                    <section class="flex justify-center mb-16">
                        <DiffBox />
                    </section>
                </section>
                <section class="flex(& col lg:row) gap-4">
                    <PasteBox label="Expected" />
                    <PasteBox label="Received" />
                </section>
            </Main>
            <Footer year={2022} />
        </Root>
    );
}

const { hydrate, prerender } = withTwind(
    () => import('./styles/twind.config.js'),
    () => <App />,
    true,
);

hydrate(<App />);

init();

export { prerender };
