import { useState, useEffect } from 'react';

const useScrollToBottom = () => {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Ottieni la posizione dello scroll
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      console.log('scrollTop:', scrollTop, 'windowHeight:', windowHeight, 'documentHeight:', documentHeight);

      // Verifica se siamo in fondo alla pagina
      if (scrollTop + windowHeight >= documentHeight - 10) {
        setIsBottom(true);
      } else {
        setIsBottom(false);
      }
    };

    // Aggiungi l'evento di scroll quando il componente è montato
    window.addEventListener('scroll', handleScroll);

    // Chiamata per verificare la posizione corrente subito
    handleScroll();

    // Rimuovi l'evento quando il componente viene smontato
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Assicurati che venga eseguito solo una volta al montaggio

  return isBottom;
};

export default useScrollToBottom;
