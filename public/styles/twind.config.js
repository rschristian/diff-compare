import { defineConfig } from 'twind';
import presetTailwind from '@twind/preset-tailwind';
import presetAutoprefix from '@twind/preset-autoprefix';

export const twindConfig = defineConfig({
    presets: [presetAutoprefix(), presetTailwind()],
    hash: false,
    theme: {
        colors: {
            alabaster: '#F1F2EB',
            timberwolf: '#D8DAD3',
            davysGrey: '#4A4A48',
            ebony: '#566246',
            cambridgeBlue: '#A4C2A5',
            cadet: {
                DEFAULT: '#4A6D7C',
                brighter: '#6A8D9C',
            },
        },
        extend: {
            height: {
                112: '28rem',
            },
            minHeight: {
                32: '8rem',
                48: '12rem',
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
});
