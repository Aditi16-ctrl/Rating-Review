// src/theme.js
import React, { createContext, useState, useContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

// AMOLED Dark Theme
const amoledDark = {
  colors: {
    background: '#000000',
    cardBg: '#1e293b',
    cardBgGlass: 'rgba(255, 255, 255, 0.1)',
    primary: '#38bdf8',
    accent: '#60a5fa',
    text: '#f8fafc',
    mutedText: '#94a3b8',
    tagBg: '#475569',
    buttonBg: '#38bdf8',
    buttonHover: '#0ea5e9',
  },
  glassmorphism: false,
};

// Glassmorphism Theme
const glassmorphism = {
  colors: {
    background: 'linear-gradient(135deg, #c3cfe2 0%, #e9e4f0 100%)',
    cardBg: 'rgba(255, 255, 255, 0.15)',
    cardBgGlass: 'rgba(255, 255, 255, 0.15)',
    primary: '#38bdf8',
    accent: '#3b82f6',
    text: '#0f172a',
    mutedText: '#475569',
    tagBg: 'rgba(71, 85, 105, 0.5)',
    buttonBg: '#3b82f6',
    buttonHover: '#2563eb',
  },
  glassmorphism: true,
};

const ThemeToggleContext = createContext();

export const useTheme = () => useContext(ThemeToggleContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(amoledDark);

  const toggleTheme = () => {
    setTheme((prev) => (prev === amoledDark ? glassmorphism : amoledDark));
  };

  return (
    <ThemeToggleContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeToggleContext.Provider>
  );
};
