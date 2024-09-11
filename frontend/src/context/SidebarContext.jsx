import React, { createContext, useContext, useState, useEffect } from 'react';

const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar aperta di default

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  // Effetto per monitorare la dimensione dello schermo
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {  // Modifica la soglia secondo le tue esigenze
        setIsSidebarOpen(false); // Chiude la sidebar automaticamente
      }
    };

    // Aggiungi l'event listener
    window.addEventListener('resize', handleResize);

    // Chiama subito per controllare le dimensioni al primo render
    handleResize();

    // Cleanup l'event listener alla disconnessione del componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
