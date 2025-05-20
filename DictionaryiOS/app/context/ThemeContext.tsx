import React, { createContext, ReactNode, useContext, useState } from 'react';

type Theme = {
  backgroundColor: string;
  cardBackground: string;
  textColor: string;
  iconColor: string;
  borderColor: string;
};

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  theme: Theme;
};

const lightTheme: Theme = {
  backgroundColor: '#F2F2F7',
  cardBackground: '#fff',
  textColor: '#333',
  iconColor: '#555',
  borderColor: '#eee',
};

const darkTheme: Theme = {
  backgroundColor: '#121212',       // Darker background for dark mode
  cardBackground: '#1E1E1E',        // Dark card background
  textColor: '#E0E0E0',             // Light text color
  iconColor: '#FFFFFF',             // Brighter icon color for visibility
  borderColor: '#333333',           // Darker border color
};

const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
  theme: lightTheme,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
