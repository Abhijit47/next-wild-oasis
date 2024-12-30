'use client';

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
// import useLocalStorageState from '../_hooks/useLocalStorageState';

type DarkModeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

// function checkWindow() {
//   return typeof window !== 'undefined';
// }

function useLocalStorageState(
  initialState: boolean,
  key: string
): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [value, setValue] = useState<boolean>(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) === true : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}

const DarkModeContext = createContext({} as DarkModeContextType);

// window is not defined
// const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

function DarkModeProvider({
  children,
}: PropsWithChildren<{ children: React.ReactNode }>) {
  // if (typeof window === 'undefined') {
  //   return null;
  // }

  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia('(prefers-color-scheme: dark)').matches,
    'isDarkMode'
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  return (
    <DarkModeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
      }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error('DarkModeContext was used outside of DarkModeProvider');

  return context;
}

export { DarkModeProvider, useDarkMode };
