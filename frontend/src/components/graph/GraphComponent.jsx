import React, { useEffect, useRef, useState } from 'react';
import { initializeNetwork } from './GraphComponentLogic';
import usePopupDrag from '../../hooks/usePopupDrag'; // Importa il nuovo hook
import './GraphComponent.css';

const GraphComponent = ({ data }) => {
  const networkRef = useRef(null);
  const [popupContent, setPopupContent] = useState(null);

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

    networkRef.current.networkInstance = network;

    return () => {
      if (networkRef.current?.networkInstance?.destroy) {
        networkRef.current.networkInstance.destroy();
      }
    };
  }, [data]);

  // Usa il custom hook per gestire il dragging
  usePopupDrag(popupContent);

  return (
    <div>
      <div ref={networkRef} className="graph-container" />
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
    </div>
  );
};

export default GraphComponent;
