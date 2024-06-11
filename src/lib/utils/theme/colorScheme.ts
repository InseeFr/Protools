import { useState } from 'react';

export enum ColorScheme {
    Light = "light",
    Dark = "dark",
    System = "system"
}

export const useColorScheme = () => {
    const [colorScheme, setColorScheme] = useState<ColorScheme>(ColorScheme.System);

    const toggleColorScheme = () => {
        setColorScheme(prevScheme => prevScheme === ColorScheme.Dark ? ColorScheme.Light : ColorScheme.Dark);
    }

    return { colorScheme, toggleColorScheme };
}