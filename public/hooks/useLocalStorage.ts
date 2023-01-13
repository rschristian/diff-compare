import { useEffect, useState } from 'preact/hooks';

export function useLocalStorage<T = string>(key: string, initialValue: T): [T, (arg0: T) => void] {
    const [storedValue, setStoredValue] = useState<T>(initialValue);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const item = window.localStorage.getItem(key);
            if (item) setStoredValue(JSON.parse(item));
        }
    }, []);

    const setValue = (value: T) => {
        setStoredValue(value);
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(value))
        }
    };

    return [storedValue, setValue];
}
