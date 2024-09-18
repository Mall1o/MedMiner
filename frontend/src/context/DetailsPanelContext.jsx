import React, { createContext, useContext, useState, useEffect } from 'react';

const DetailsPanelContext = createContext();

export const useDetailsPanel = () => useContext(DetailsPanelContext);

export const DetailsPanelProvider = ({ children }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false); // Pannello aperto di default

  const togglePanel = () => {
    setIsPanelOpen(prevState => !prevState);
  };

  // Effetto per monitorare la dimensione dello schermo
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {  // Modifica la soglia secondo le tue esigenze
        setIsPanelOpen(false); // Chiude il pannello automaticamente su schermi piccoli
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
    <DetailsPanelContext.Provider value={{ isPanelOpen, togglePanel }}>
      {children}
    </DetailsPanelContext.Provider>
  );
};
