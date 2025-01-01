'use client'
import { useState, useEffect } from 'react';

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Ensure window is available (client-side)
    if (typeof window !== 'undefined') {
      // Function to update the theme state
      const updateDarkMode = (e) => setIsDarkMode(e.matches);

      // Check the current theme
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDarkMode(darkModeQuery.matches);

      // Listen for changes to the theme
      darkModeQuery.addEventListener('change', updateDarkMode);

      return () => {
        darkModeQuery.removeEventListener('change', updateDarkMode);
      };
    }
  }, []);

  return isDarkMode;
};

export default useDarkMode;
