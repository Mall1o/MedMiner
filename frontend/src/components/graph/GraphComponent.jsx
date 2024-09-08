import React, { useEffect, useRef } from 'react';
import { initializeNetwork } from './GraphComponentLogic'; // Importa la logica dal file separato
import './GraphComponent.css';

const GraphComponent = ({ data }) => {
  const networkRef = useRef(null);

  useEffect(() => {
    // Verifica che i dati esistano e il ref sia pronto
    if (!data || !networkRef.current) {
      console.warn("Dati mancanti o ref non disponibile.");
      return;
    }

    // Inizializza il grafo utilizzando la funzione centralizzata
    const network = initializeNetwork(networkRef.current, data);

    // Salva l'istanza per possibili aggiornamenti
    networkRef.current.networkInstance = network;

    // Cleanup
    return () => {
      if (networkRef.current?.networkInstance?.destroy) {
        networkRef.current.networkInstance.destroy();
      }
    };
  }, [data]); // L'effetto si attiva solo quando cambiano i dati

  return <div ref={networkRef} className="graph-container" />;
};

export default GraphComponent;
