import React, { useState, useEffect } from 'react';
import styles from './DetailPanel.module.css';
import { useDetailsPanel } from '../../context/DetailsPanelContext';

const DetailsSection = ({ data, isNode, isEdge }) => {
  const filteredKeys = Object.keys(data).filter(
    key => key !== 'id' && key !== 'start_id' && key !== 'end_id' && key !== 'size'
  );

  const formatKey = (key) => {
    if (key === 'type') return 'Tipo';
    return key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <div className={styles.detailsSection}>
      <h3>{isNode ? `Nodo - ${data.tipo}` : isEdge ? 'Arco' : 'Dettagli'}</h3>
      {filteredKeys.length > 0 ? (
        filteredKeys.map(key => {
          const value = data[key];
          if (key === 'properties') {
            return Object.entries(value)
              .filter(([subKey]) => subKey !== 'data_ultima_associazione' && subKey !== 'count')
              .map(([subKey, subValue]) => (
                <p key={subKey}>
                  <strong>{formatKey(subKey)}:</strong> {subValue}
                </p>
              ));
          }
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

// Sezione Metriche con menu a tendina che si apre verso l'alto
const MetricsSection = ({
  applyBetweenness, applyCloseness, applyPageRank, applyKcore, clearMetrics,
  selectedMetric, setSelectedMetric
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const metricDescriptions = {
    Betweenness: 'Misura il numero di volte che un nodo funge da "ponte" tra altri nodi.',
    Closeness: 'Misura quanto vicino un nodo è agli altri nodi.',
    PageRank: "Misura l'importanza di un nodo in base ai collegamenti.",
    Kcore: 'Identifica i nodi che fanno parte del nucleo centrale del grafo.'
  };

  const handleMetricClick = (metric) => {
    if (metric === "none") {
      clearMetrics();
      setSelectedMetric(null);
    } else {
      setSelectedMetric(metric);
    }
    setIsDropdownOpen(false); // Chiudi il menu dopo la selezione
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className={styles.metricsSection}>
      <h4>Seleziona una Metrica</h4>
      
      <div className={styles.customDropdown}>
      <button
        className={`${styles.dropdownButton} ${styles.metricButton}`}  // Aggiunta della classe 'metricButton'
        onClick={toggleDropdown}
      >
        {selectedMetric || "Nessuna Metrica"}
      </button>


        {/* Menu che si apre verso l'alto */}
        {isDropdownOpen && (
          <ul className={styles.dropdownMenu}>
            <li onClick={() => handleMetricClick('none')}>Nessuna Metrica</li>
            <li onClick={() => handleMetricClick('Betweenness')}>Betweenness</li>
            <li onClick={() => handleMetricClick('Closeness')}>Closeness</li>
            <li onClick={() => handleMetricClick('PageRank')}>PageRank</li>
            <li onClick={() => handleMetricClick('Kcore')}>K-core</li>
          </ul>
        )}
      </div>

      {/* Descrizione dinamica della metrica selezionata */}
      <div className={styles.metricDescription}>
        {selectedMetric && metricDescriptions[selectedMetric]}
      </div>

      {/* Pulsante per resettare tutte le metriche */}
      <button
        className={styles.resetButton}
        onClick={() => {
          clearMetrics();
          setSelectedMetric(null);
        }}
        style={{ marginTop: '10px' }} // Aggiungi margine per visibilità
      >
        Reset Metrica
      </button>
    </div>
  );
};

const DetailsPanel = ({
  details,
  applyBetweenness, isBetweennessApplied,
  applyCloseness, isClosenessApplied,
  applyPageRank, isPageRankApplied,
  applyKcore, isKcoreApplied,
  clearMetrics
}) => {
  const { isPanelOpen, togglePanel } = useDetailsPanel();
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [prevSelectedMetric, setPrevSelectedMetric] = useState(null);

  // Aggiungi una funzione clearMetrics locale per rimuovere le metriche
  const resetGraphToOriginal = () => {
    clearMetrics();
    setPrevSelectedMetric(null);
  };

  const isNode = details?.type === 'Nodo';
  const isEdge = details?.type === 'Arco';
  const data = isNode ? details.nodeData || {} : details || {};

  // Gestione dell'applicazione delle metriche basata sulla selezione, solo se cambia
  useEffect(() => {
    if (selectedMetric !== prevSelectedMetric) {
      resetGraphToOriginal();
      if (selectedMetric === 'Betweenness') applyBetweenness();
      if (selectedMetric === 'Closeness') applyCloseness();
      if (selectedMetric === 'PageRank') applyPageRank();
      if (selectedMetric === 'Kcore') applyKcore();
      setPrevSelectedMetric(selectedMetric);
    }
  }, [selectedMetric, prevSelectedMetric, applyBetweenness, applyCloseness, applyPageRank, applyKcore]);

  return (
    <div className={`${styles.detailsPanel} ${isPanelOpen ? styles.panelOpen : styles.panelClosed}`}>
      <div className={styles.panelToggle} onClick={togglePanel}>
        {isPanelOpen ? '→' : '←'}
      </div>
      <DetailsSection data={data} isNode={isNode} isEdge={isEdge} />
      <MetricsSection
        applyBetweenness={applyBetweenness}
        applyCloseness={applyCloseness}
        applyPageRank={applyPageRank}
        applyKcore={applyKcore}
        clearMetrics={resetGraphToOriginal} // Funzione per resettare il grafo
        selectedMetric={selectedMetric}
        setSelectedMetric={setSelectedMetric}
      />
    </div>
  );
};

export default DetailsPanel;
