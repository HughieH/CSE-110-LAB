// ThemeContext.ts
import React from 'react';

export const themes = {
 light: {
   background: '#eeeeee',
 },
 dark: {
   background: '#222222',
 },
};

export const ThemeContext = React.createContext(themes.light);