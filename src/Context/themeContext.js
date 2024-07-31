import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

// Theme modes
const light = { mode: 'light', color: 'black', bg: 'white' };
const dark = { mode: 'dark', color: 'white', bg: '#020300' };

// Get the system theme
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? dark : light;

export function ThemeProvider(props) {
    // Get theme from localStorage or default to system theme
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? JSON.parse(savedTheme) : systemTheme;
    });

    // Handle theme change
    function changeTheme() {
        const newTheme = theme.mode === 'light' ? dark : light;
        setTheme(newTheme);
    }

    // Save the theme to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(theme));
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
}
