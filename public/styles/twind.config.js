import { defineConfig } from 'twind';
import presetTailwind from '@twind/preset-tailwind';
import presetAutoprefix from '@twind/preset-autoprefix';

export const twindConfig = defineConfig({
    darkMode: 'class',
    presets: [presetAutoprefix(), presetTailwind()],
    hash: false,
    theme: {
        colors: {
            primary: {
                dark: '#04a579',
                DEFAULT: '#06c390',
                light: '#24e1a8',
            },
            content: {
                DEFAULT: '#24292f',
                dark: '#ddd',
            },
            code: {
                DEFAULT: '#fff',
                dark: '#1b1818',
            },
            white: {
                muted: '#999',
                DEFAULT: '#ffffff',
            },
        },
        extend: {
            height: {
                112: '28rem',
            },
            minHeight: {
                32: '8rem',
                64: '16rem',
            },
            minWidth: {
                10: '2.5rem',
                16: '4rem',
            },
            fontSize: {
                '2xl': '1.5rem',
                '5xl': '2.5rem',
            },
        },
    },
    variants: [['hocus', '&:hover,&:focus-visible']],
});
