'use client';

// import necessary modules
import { createContext, ReactNode, useContext, useState } from 'react';

// create a context type
type SidebarContextType = {
  isSidebarOpen: boolean;
  onToggle: () => void;
};

// create a context
const SidebarContext = createContext({} as SidebarContextType);

// create a provider
export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleSidebar() {
    setIsSidebarOpen((prev) => !prev);
  }

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        onToggle: toggleSidebar,
      }}>
      {children}
    </SidebarContext.Provider>
  );
}

// create a custom hook
export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider');
  }

  return context;
}
