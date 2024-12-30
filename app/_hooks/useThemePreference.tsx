'use client';

import { useEffect, useState } from 'react';

type ThemePreference = 'dark' | 'light' | 'system';

export default function useThemePreference(): {
  activeTheme: ThemePreference;
  toggleThemeChange: (newTheme: ThemePreference) => void;
} {
  const [activeTheme, setActiveTheme] = useState<ThemePreference>('system');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'system' || !savedTheme) {
      applySystemTheme();
      setActiveTheme('system');
    } else {
      applyTheme(savedTheme);
      setActiveTheme(savedTheme as ThemePreference);
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (!savedTheme || savedTheme === 'system') {
        applySystemTheme();
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  function applyTheme(theme: string) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    }
  }

  function applySystemTheme() {
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    if (systemPrefersDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  function handleThemeChange(newTheme: string) {
    setActiveTheme(newTheme as ThemePreference);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'system') {
      applySystemTheme();
    } else {
      applyTheme(newTheme);
    }
  }

  return { activeTheme, toggleThemeChange: handleThemeChange };
}
