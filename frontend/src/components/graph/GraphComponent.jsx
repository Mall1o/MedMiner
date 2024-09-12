import React, { useEffect, useRef, useState } from 'react';
import { initializeNetwork } from './GraphComponentLogic';
import usePopupDrag from '../../hooks/usePopupDrag'; // Importa il nuovo hook
import './GraphComponent.css';

const GraphComponent = ({ data }) => {
  const networkRef = useRef(null);
  const [popupContent, setPopupContent] = useState(null);
  const [isLegendVisible, setIsLegendVisible] = useState(false);

  useEffect(() => {
    if (!data || !networkRef.current) {
      console.warn("Dati mancanti o ref non disponibile.");
      return;
    }

    const handlePopup = ({ title, content, x, y }) => {
      setPopupContent({
        title,
        content,
        position: { x, y }
      });
    };

    const network = initializeNetwork(networkRef.current, data, handlePopup);

    // Centra e adatta il grafo all'interno del contenitore
    if (network) {
      networkRef.current.networkInstance = network;
      network.fit({
        animation: {
          duration: 500,
          easingFunction: "easeInOutQuad"
        }
      });
    }

    return () => {
      if (networkRef.current?.networkInstance?.destroy) {
        networkRef.current.networkInstance.destroy();
      }
    };
  }, [data]);

  // Usa il custom hook per gestire il dragging
  usePopupDrag(popupContent);

  // Funzioni per gestire lo zoom
  const zoomIn = () => {
    const network = networkRef.current.networkInstance;
    if (network) {
      network.moveTo({
        scale: network.getScale() * 1.1,  // Ingrandisce del 10%
      });
    }
  };

  const zoomOut = () => {
    const network = networkRef.current.networkInstance;
    if (network) {
      network.moveTo({
        scale: network.getScale() * 0.9,  // Riduce del 10%
      });
    }
  };

  // Funzione per gestire il click fuori dal popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLegendVisible && !event.target.closest('.legend-popup') && !event.target.closest('.legend-icon')) {
        setIsLegendVisible(false); // Chiudi la legenda se clicchi fuori dal popup o l'icona
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
    <div className="graph-page">
      <div ref={networkRef} className="graph-container" />

      {/* Popup per il contenuto dei nodi */}
      {popupContent && (
        <div
          className="popup"
          style={{
            top: `${popupContent.position.y}px`,
            left: `${popupContent.position.x}px`
          }}
        >
          <h3>{popupContent.title}</h3>
          <pre>{popupContent.content}</pre>
          <button onClick={() => setPopupContent(null)}>Chiudi</button>
        </div>
      )}
      
      {/* Pulsanti per lo zoom */}
      <div className="zoom-controls">
        <button onClick={zoomIn} className="zoom-button">+</button>
        <button onClick={zoomOut} className="zoom-button">-</button>
      </div>

      {/* Icona per mostrare/nascondere la legenda */}
      <div className="legend-icon" onClick={toggleLegend}>
        ℹ️
      </div>

      {/* Popup della legenda */}
      {isLegendVisible && (
        <div className="legend-popup">
          <h3>Legenda</h3>
          <ul>
            <li><span className="color-box patient"></span> Paziente</li>
            <li><span className="color-box disease"></span> Malattia</li>
            <li><span className="color-box prescription"></span> Prescrizione</li>
            <li><span className="color-box diagnostic"></span> DIAGNOSTICATO_CON</li>
            <li><span className="color-box receive"></span> RICEVE_PRESCRIZIONE</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default GraphComponent;
