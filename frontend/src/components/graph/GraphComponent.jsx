// src/components/graph/GraphComponent.jsx
import React, { useEffect, useRef } from 'react';
import { DataSet } from 'vis-data';
import { Network } from 'vis-network';
import './GraphComponent.css';

const GraphComponent = ({ data }) => {
  const networkRef = useRef(null);

  useEffect(() => {
    // Verifica che i dati esistano e il ref sia pronto
    if (!data || !networkRef.current) {
      console.warn("Dati mancanti o ref non disponibile.");
      return;
    }

    // Funzione per creare il grafo
    const initializeNetwork = () => {
      const nodes = new DataSet(
        data.nodes.map(node => ({
          id: node.id,
          label: node.type === 'Paziente'
            ? `👤 Paziente\nCF: ${node.properties.codice_fiscale_assistito}`
            : node.type === 'Malattia'
            ? `⚕️ Malattia\nCodice: ${node.properties.codice}`
            : `💊 Prescrizione\nCodice: ${node.properties.codice}`,
          shape: node.type === 'Paziente' ? 'circle' : 'box',
          color: {
            background: node.type === 'Paziente' ? 'rgba(255, 99, 132, 0.5)' : node.type === 'Malattia' ? 'rgba(54, 162, 235, 0.5)' : 'rgba(75, 192, 192, 0.5)',
            border: node.type === 'Paziente' ? 'rgba(255, 99, 132, 1)' : node.type === 'Malattia' ? 'rgba(54, 162, 235, 1)' : 'rgba(75, 192, 192, 1)',
          },
          font: { color: '#fff', size: 14 },
        }))
      );

      const edges = new DataSet(
        data.relationships.map(relationship => ({
          from: relationship.start_id,
          to: relationship.end_id,
          label: relationship.type,
          arrows: 'to',
          color: { color: 'rgba(150, 150, 150, 0.5)' },
          font: { align: 'middle', color: '#000', size: 12 }
        }))
      );

      const options = {
        nodes: {
          shape: 'dot',
          size: 30,
          font: { size: 12, color: '#ffffff' },
          borderWidth: 2,
        },
        edges: { width: 2, font: { size: 10, align: 'middle' } },
        physics: { enabled: true, solver: 'forceAtlas2Based', stabilization: { iterations: 150 } },
        interaction: { hover: true, navigationButtons: true, zoomView: true },
      };

      try {
        const network = new Network(networkRef.current, { nodes, edges }, options);
        networkRef.current.networkInstance = network; // Salva l'istanza per possibili aggiornamenti
      } catch (error) {
        console.error("Errore durante l'inizializzazione del grafo:", error);
      }
    };

    // Inizializza il grafo
    initializeNetwork();

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
