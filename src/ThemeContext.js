import React from 'react';

export const ThemeContext = React.createContext({
    theme: 'light', // set the initial theme
    switchTheme: () => {} // initial function to switch the theme
});