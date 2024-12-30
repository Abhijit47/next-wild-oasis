'use client';

// import necessary dependencies
import { createContext, useContext, useState } from 'react';

// define the type of the context
type ModalContextType = {
  isModalOpen: boolean;
  isDeleteModalOpen: boolean;
  onToggle: () => void;
  onToggleDelete: () => void;
};

// create a context
export const ModalContext = createContext({} as ModalContextType);

// create a provider
export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  function toggleModal() {
    setIsOpen((prev) => !prev);
  }

  function toggleDeleteModal() {
    setIsDeleteModalOpen((prev) => !prev);
  }

  return (
    <ModalContext.Provider
      value={{
        isModalOpen: isOpen,
        isDeleteModalOpen,
        onToggle: toggleModal,
        onToggleDelete: toggleDeleteModal,
      }}>
      {children}
    </ModalContext.Provider>
  );
}

// create a custom hook
export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
}
