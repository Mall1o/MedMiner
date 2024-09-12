import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Componente che esegue lo scroll in alto e a sinistra
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scrolla verso l'alto e sinistra ogni volta che cambia la rotta
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Non renderizza nulla, è solo un effetto
};

export default ScrollToTop;
