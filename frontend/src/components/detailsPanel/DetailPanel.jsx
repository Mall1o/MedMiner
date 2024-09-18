import React from 'react';
import styles from './DetailPanel.module.css';
import { useDetailsPanel } from '../../context/DetailsPanelContext'; // Importa il contesto del pannello

const DetailsPanel = ({ details, metrics = [] }) => {
  const { isPanelOpen, togglePanel } = useDetailsPanel(); // Usa lo stato del pannello

  // Log dei dettagli ricevuti per debugging
  console.log('Dettagli ricevuti:', details);

  // Se i dettagli non sono disponibili, mostra un messaggio predefinito
  if (!details || Object.keys(details).length === 0) {
    return (
      <div className={`${styles.detailsPanel} ${isPanelOpen ? styles.panelOpen : styles.panelClosed}`}>
        <div className={styles.panelToggle} onClick={togglePanel}>
          {isPanelOpen ? '→' : '←'}
        </div>
        <p>Seleziona un nodo o un arco per vedere i dettagli.</p>
      </div>
    );
  }

  // Determina se stiamo mostrando un nodo o un arco
  const isNode = details.type === 'Nodo';
  const isEdge = details.type === 'Arco';

  // Estrarre i dati del nodo o dell'arco (gestione robusta dei dettagli)
  const data = isNode ? details.nodeData || {} : details;

  // Escludere chiavi specifiche come 'id', 'start_id', 'end_id'
  const filteredKeys = Object.keys(data).filter(key => key !== 'id' && key !== 'start_id' && key !== 'end_id');

  return (
    <div className={`${styles.detailsPanel} ${isPanelOpen ? styles.panelOpen : styles.panelClosed}`}>
      <div className={styles.panelToggle} onClick={togglePanel}>
        {isPanelOpen ? '→' : '←'}
      </div>
      <div className={styles.detailsSection}>
        <h3>{isNode ? 'Nodo - ' + data.tipo : isEdge ? 'Arco' : 'Dettagli'}</h3>
        {filteredKeys.length > 0 ? (
          filteredKeys.map((key) => {
            const value = data[key];
            return (
              <p key={key}>
                <strong>{key}:</strong>{' '}
                {typeof value === 'object' && value !== null ? (
                  <ul>
                    {Object.entries(value).map(([subKey, subValue]) => (
                      <li key={subKey}>
                        <strong>{subKey}:</strong> {subValue}
                      </li>
                    ))}
                  </ul>
                ) : (
                  value
                )}
              </p>
            );
          })
        ) : (
          <p>Dettagli non disponibili.</p>
        )}
      </div>

      <div className={styles.metricsSection}>
        <h4>Applica Metriche</h4>
        <div className={styles.metricItem}>
          <button onClick={() => alert('Metrica non implementata ancora!')}>Metrica Statica</button>
          <span>Descrizione della metrica statica, da implementare in futuro.</span>
        </div>
      </div>
    </div>
  );
};

export default DetailsPanel;
