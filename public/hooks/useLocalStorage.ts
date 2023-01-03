import { useState } from 'preact/hooks';

export function useLocalStorage(key: string, initialValue: string) {
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === 'undefined') return initialValue;

        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    });

    const setValue = (value: (a: string) => void | string) => {
        setStoredValue(value);
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(value))
        }
    };

    return [storedValue, setValue];
}
