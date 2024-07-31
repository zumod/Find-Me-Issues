import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

// Theme modes 
const light = { mode: 'light', color: 'black', bg: 'white' };
const dark = { mode: 'dark', color: 'white', bg: '#020300' };

// Function to get the system theme
const getSystemTheme = () => 
  window.matchMedia('(prefers-color-scheme: dark)').matches ? dark : light;

export function ThemeProvider(props) {
    // Theme is initialised from localstorage
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem('theme');
        return storedTheme ? JSON.parse(storedTheme) : getSystemTheme();
    });

    useEffect(() => {
        // Save the current theme to localStorage whenever theme changes
        localStorage.setItem('theme', JSON.stringify(theme));
    }, [theme]);

    // Handle theme change
    function changeTheme() {
        setTheme(prevTheme => {
            const newTheme = prevTheme.mode === 'light' ? dark : light;
            return newTheme;
        });
    }

    return (
        <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
}
