import React, { useEffect, useRef, useState } from 'react';
import { initializeNetwork } from './GraphComponentLogic';
import styles from './GraphComponent.module.css';

const GraphComponent = ({ data,  onNodeClick, onEdgeClick }) => {
  const networkRef = useRef(null);
  const [isLegendVisible, setIsLegendVisible] = useState(false);

  useEffect(() => {
    if (!data || !networkRef.current) {
      console.warn("Dati mancanti o ref non disponibile.");
      return;
    }

    // Inizializzazione del network
    const network = initializeNetwork(networkRef.current, data);

    if (network) {
      networkRef.current.networkInstance = network;

      // Aggiungi gestione click sui nodi e sugli archi
      network.on('click', (event) => {
        if (event.nodes.length > 0) {
          const clickedNodeId = event.nodes[0];
          const clickedNode = data.nodes.find(node => node.id === clickedNodeId);
          if (clickedNode && onNodeClick) {
            onNodeClick(clickedNode); // Invia il nodo cliccato alla pagina
          }
        } else if (event.edges.length > 0) {
          const clickedEdgeId = event.edges[0];
          const clickedEdge = data.relationships.find(relationship => `edge-${relationship.start_id}-${relationship.end_id}` === clickedEdgeId);
          if (clickedEdge && onEdgeClick) {
            onEdgeClick(clickedEdge); // Invia l'arco cliccato alla pagina
          }
        }
      });

      // Forza il ridimensionamento del canvas
      const updateCanvasSize = () => {
        const canvas = networkRef.current.querySelector('canvas');
        if (canvas) {
          canvas.width = networkRef.current.clientWidth;
          canvas.height = networkRef.current.clientHeight;
        }
        if (networkRef.current.networkInstance) {
          networkRef.current.networkInstance.redraw();
        }
      };

      updateCanvasSize(); // Prima chiamata per forzare il ridimensionamento iniziale

      window.addEventListener('resize', updateCanvasSize); // Aggiungi listener di resize

      return () => {
        window.removeEventListener('resize', updateCanvasSize);
      };
    }

    return () => {
      if (networkRef.current?.networkInstance?.destroy) {
        networkRef.current.networkInstance.destroy();
      }
    };
  }, [data]);

  // Funzioni per gestire lo zoom
  const zoomIn = () => {
    const network = networkRef.current.networkInstance;
    if (network) {
      network.moveTo({
        scale: network.getScale() * 1.1,
      });
    }
  };

  const zoomOut = () => {
    const network = networkRef.current.networkInstance;
    if (network) {
      network.moveTo({
        scale: network.getScale() * 0.9,
      });
    }
  };

  // Funzione per gestire il click fuori dal popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLegendVisible && !event.target.closest({legendPopup}) && !event.target.closest({legendIcon})) {
        setIsLegendVisible(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isLegendVisible]);

  // Funzione per togglare la visualizzazione della legenda
  const toggleLegend = () => {
    setIsLegendVisible(!isLegendVisible);
  };

  return (
    <div className={styles.GraphPage}>
      <div ref={networkRef} className={styles.graphContainer} style={{ height: "100%" }} />
      <div className={styles.zoomControls}>
        <button onClick={zoomIn} className={styles.zoomButton}>+</button>
        <button onClick={zoomOut} className={styles.zoomButton}>-</button>
      </div>
      <div className={styles.legendIcon} onClick={toggleLegend}>
        ℹ️
      </div>
      {isLegendVisible && (
        <div className={styles.legendPopup}>
          <h3>Legenda</h3>
          <ul>
            <li><span className={styles.colorBoxPatient}></span> Paziente</li>
            <li><span className={styles.colorBoxDisease}></span> Malattia</li>
            <li><span className={styles.colorBoxPrescription}></span> Prescrizione</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default GraphComponent;
