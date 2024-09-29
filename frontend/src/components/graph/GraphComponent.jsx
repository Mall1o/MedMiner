import React, { useEffect, useRef, useState } from 'react';
import { initializeNetwork } from './GraphComponentLogic';
import { useDetailsPanel } from '../../context/DetailsPanelContext';
import styles from './GraphComponent.module.css';
import legendIcon from '../../assets/legend.png';

const GraphComponent = ({ data, onNodeClick, onEdgeClick }) => {
  const networkRef = useRef(null);
  const { isPanelOpen, togglePanel } = useDetailsPanel(); // Usa il contesto per gestire la barra dei dettagli
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
          if (clickedNode) {
            if (!isPanelOpen) {
              togglePanel(); // Apri il pannello solo se è chiuso
            }
            if (onNodeClick) {
              onNodeClick(clickedNode); // Invia il nodo cliccato alla pagina
            }
          }
        } else if (event.edges.length > 0) {
          const clickedEdgeId = event.edges[0];
          const clickedEdge = data.relationships.find(relationship => `edge-${relationship.start_id}-${relationship.end_id}` === clickedEdgeId);
          if (clickedEdge) {
            if (!isPanelOpen) {
              togglePanel(); // Apri il pannello solo se è chiuso
            }
            if (onEdgeClick) {
              onEdgeClick(clickedEdge); // Invia l'arco cliccato alla pagina
            }
          }
        }
      });
      
    }

    return () => {
      if (networkRef.current?.networkInstance?.destroy) {
        networkRef.current.networkInstance.destroy();
      }
    };
  }, [data]);

  useEffect(() => {
    if (networkRef.current?.networkInstance) {
      const network = networkRef.current.networkInstance;
  
      // Sposta il grafo di 300px verso sinistra o riposiziona al centro
      if (isPanelOpen) {
        // Sposta leggermente a sinistra mantenendo la posizione dinamica
        const currentViewPosition = network.getViewPosition();
        network.moveTo({
          position: { x: currentViewPosition.x + 100, y: currentViewPosition.y }, // Applica offset dinamico
          animation: {
            duration: 300,
            easingFunction: "easeInOutQuad"
          }
        });
      } else {
        // Centra il grafo in base alla vista corrente
        network.fit({
          animation: {
            duration: 300,
            easingFunction: "easeInOutQuad"
          }
        });
      }
    }
  }, [isPanelOpen]);
  
  
  

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
      const legendPopup = document.querySelector(`.${styles.legendPopup}`);
      const legendIcon = document.querySelector(`.${styles.legendIcon}`);
      
      if (isLegendVisible && !legendPopup.contains(event.target) && !legendIcon.contains(event.target)) {
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
    <div className={styles.graphPage}>
      <div ref={networkRef} className={styles.graphContainer} style={{ height: "100%" }} />
      <div className={styles.zoomControls}>
        <button onClick={zoomIn} className={styles.zoomButton}>+</button>
        <button onClick={zoomOut} className={styles.zoomButton}>-</button>
      </div>
      {!isPanelOpen && (
        <div className={styles.legendIcon} onClick={toggleLegend}>
          <img src={legendIcon} className={styles.iconImg} alt="Legenda" />
        </div>
      )}
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
