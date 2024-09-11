// App.js
import { useEffect } from 'react';
import { useSidebar } from './context/SidebarContext'; // Assicurati di avere il percorso corretto

// Funzione per gestire il resize dello schermo e chiudere la sidebar
export const useHandleSidebarResize = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && isSidebarOpen) {
        toggleSidebar(); // Chiude la sidebar se lo schermo è troppo piccolo
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isSidebarOpen, toggleSidebar]);
};
