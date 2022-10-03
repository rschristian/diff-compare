if (import.meta.env.NODE_ENV !== 'production') {
    while (!document.querySelector('#theme-switcher')) {
        await new Promise((r) => setTimeout(r, 50));
    }
} else {
    // @ts-ignore
    while (!document.body.__k) {
        await new Promise((r) => setTimeout(r, 50));
    }
}

const themeSwitcher = document.getElementById('theme-switcher'),
    moon = document.getElementById('dark-mode'),
    sun = document.getElementById('light-mode');

let theme =
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && matchMedia('(prefers-color-scheme: dark)').matches)
        ? 'light'
        : 'dark';
toggle();

function toggle() {
    theme = theme == 'dark' ? 'light' : 'dark';
    document.documentElement.classList[theme === 'dark' ? 'add' : 'remove']('dark');
    (theme === 'dark' ? moon : sun).style.visibility = 'hidden';
    (theme === 'dark' ? sun : moon).style.visibility = 'visible';
    localStorage.theme = theme;
}

themeSwitcher.addEventListener('click', toggle);