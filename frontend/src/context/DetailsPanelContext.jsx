import React, { createContext, useContext, useState, useEffect } from 'react';

// Esporta il contesto in modo che possa essere utilizzato altrove
export const DetailsPanelContext = createContext();

// Hook personalizzato per utilizzare il contesto in altri componenti
export const useDetailsPanel = () => useContext(DetailsPanelContext);

// Provider che gestisce lo stato del pannello dei dettagli
export const DetailsPanelProvider = ({ children }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false); // Pannello chiuso di default

  const togglePanel = () => {
    setIsPanelOpen(prevState => !prevState); // Alterna lo stato del pannello
  };

  // Effetto che monitora le dimensioni dello schermo per chiudere automaticamente il pannello su schermi piccoli
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {  // Soglia basata sulle dimensioni dello schermo
        setIsPanelOpen(false); // Chiude il pannello automaticamente se lo schermo è piccolo
      }
    };

    // Aggiunge un listener per monitorare i cambiamenti di dimensione
    window.addEventListener('resize', handleResize);

    // Chiama subito per controllare le dimensioni al primo render
    handleResize();

    // Cleanup dell'event listener quando il componente viene smontato
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
