import React, { createContext, useState, useContext } from 'react';

// Crea il contesto
const SidebarContext = createContext();

// Hook personalizzato per usare il contesto
export const useSidebar = () => useContext(SidebarContext);

// Provider del contesto della Sidebar
export const SidebarProvider = ({ children }) => {
  // Imposta il valore iniziale su true per aprire la sidebar all'avvio
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Funzione per togglare la sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
