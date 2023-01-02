import { defineConfig } from '@twind/core';
import presetTailwind from '@twind/preset-tailwind';

export const twindConfig = defineConfig({
    darkMode: 'class',
    presets: [presetTailwind()],
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
            page: {
                DEFAULT: '#f8f8f8',
                dark: '#272a27',
            },
            code: {
                DEFAULT: '#fff',
                dark: '#1b1818',
            },
            white: {
                muted: '#999',
                DEFAULT: '#ffffff',
            },
            transparent: 'transparent',
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
