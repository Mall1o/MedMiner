import React from 'react';
import styles from './DetailPanel.module.css';

const DetailsPanel = ({ details, metrics = [] }) => {
  // Log dei dettagli ricevuti per debugging
  console.log('Dettagli ricevuti:', details);

  // Se i dettagli non sono disponibili, mostra un messaggio predefinito
  if (!details || Object.keys(details).length === 0) {
    return (
      <div className={styles.DetailsPanel}>
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
    <div className={styles.DetailsPanel}>
      <div className={styles.detailsSection}>
        {/* Impostare il tipo come titolo */}
        <h3>{isNode ? 'Nodo - ' + data.tipo : isEdge ? 'Arco' : 'Dettagli'}</h3>

        {/* Mostra i dettagli dinamicamente, escludendo 'id', 'start_id' e 'end_id' */}
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

      {/* Sezione delle metriche */}
      <div className={styles.metricsSection}>
        <h4>Applica Metriche</h4>
        {/* Metrica statica con descrizione */}
        <div className={styles.metricItem}>
          <button onClick={() => alert('Metrica non implementata ancora!')}>Metrica Statica</button>
          <span>Descrizione della metrica statica, da implementare in futuro.</span>
        </div>
      </div>
    </div>
  );
};

export default DetailsPanel;
