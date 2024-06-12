import { useEffect, useState } from 'react';

export enum ColorScheme {
    Light = "light",
    Dark = "dark",
    System = "system"
}

export const useColorScheme = () => {
    const initialColorScheme = () => {
        const savedColorScheme = localStorage.getItem('colorScheme');
        return savedColorScheme ? JSON.parse(savedColorScheme) : ColorScheme.System;
    };

    const [colorScheme, setColorScheme] = useState<ColorScheme>(initialColorScheme);

    useEffect(() => {
        localStorage.setItem('colorScheme', JSON.stringify(colorScheme));
        console.log('colorScheme', colorScheme);
    }, [colorScheme]);

    const toggleColorScheme = () => {
        setColorScheme(prevScheme => prevScheme === ColorScheme.Dark ? ColorScheme.Light : ColorScheme.Dark);
    }

    return { colorScheme, toggleColorScheme };
}