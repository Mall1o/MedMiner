import React from 'react';
import styles from './DetailPanel.module.css';
import { useDetailsPanel } from '../../context/DetailsPanelContext';


const DetailsSection = ({ data, isNode, isEdge }) => {
  // Filtra solo le chiavi rilevanti senza 'id', 'start_id', 'end_id'
  const filteredKeys = Object.keys(data).filter(
    key => key !== 'id' && key !== 'start_id' && key !== 'end_id' && key !== 'size'
  );

  // Funzione per formattare le chiavi: rimuove i trattini bassi e mette in maiuscolo la prima lettera di ogni parola
  const formatKey = (key) => {
    if (key === 'type') return 'Tipo'; // Cambia 'type' in 'Tipo'
    return key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <div className={styles.detailsSection}>
      {/* Togliamo 'type' e stampiamo solo il valore */}
      <h3>{isNode ? `Nodo - ${data.tipo}` : isEdge ? 'Arco' : 'Dettagli'}</h3>

      {/* Controlla se ci sono dettagli da mostrare */}
      {filteredKeys.length > 0 ? (
        filteredKeys.map(key => {
          const value = data[key];

          // Se la chiave è 'properties', visualizziamo solo i dettagli interni
          if (key === 'properties') {
            return Object.entries(value)
              .filter(([subKey]) => subKey !== 'data_ultima_associazione' && subKey !== 'count')
              .map(([subKey, subValue]) => (
                <p key={subKey}>
                  <strong>{formatKey(subKey)}:</strong> {subValue}
                </p>
              ));
          }

          // Visualizziamo gli altri dettagli formattati
          return (
            <p key={key}>
              <strong>{formatKey(key)}:</strong> {value}
            </p>
          );
        })
      ) : (
        <p>Seleziona un nodo o un arco per vedere i dettagli.</p>
      )}
    </div>
  );
};



// Sezione Metriche
const MetricsSection = ({ applyBetweenness, isBetweennessApplied }) => (
  <div className={styles.metricsSection}>
    <h4>Applica Metriche</h4>
    <div className={styles.metricItem}>
      <button onClick={applyBetweenness}>
        {isBetweennessApplied ? 'Ripristina' : 'Calcola Betweenness'}
      </button>
      <span>
        {isBetweennessApplied
          ? 'Ripristina lo stato originale del grafo'
          : 'Misura il numero di volte che un nodo funge da "ponte" tra altri nodi.'}
      </span>
    </div>
  </div>
);

const DetailsPanel = ({ details, applyBetweenness, isBetweennessApplied }) => {
  const { isPanelOpen, togglePanel } = useDetailsPanel();
  const isNode = details?.type === 'Nodo';
  const isEdge = details?.type === 'Arco';
  const data = isNode ? details.nodeData || {} : details || {};

  return (
    <div className={`${styles.detailsPanel} ${isPanelOpen ? styles.panelOpen : styles.panelClosed}`}>
      <div className={styles.panelToggle} onClick={togglePanel}>
        {isPanelOpen ? '→' : '←'}
      </div>
      <DetailsSection data={data} isNode={isNode} isEdge={isEdge} />
      <MetricsSection applyBetweenness={applyBetweenness} isBetweennessApplied={isBetweennessApplied} />
    </div>
  );
};

export default DetailsPanel;
