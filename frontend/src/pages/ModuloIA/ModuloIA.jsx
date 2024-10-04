// ModuloIA.jsx
import React, { useState } from 'react';
import PatientList from '../../components/patient/PatientList';
import styles from './ModuloIA.module.css';

const ModuloIA = () => {
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalysisResult = (result) => {
    setAnalysisResult(result);
  };

  return (
    <div className={styles.moduloIAContainer}>
      <div className={styles.leftContainer}>
        <PatientList mode="moduloIA" onAnalysisResult={handleAnalysisResult} />
      </div>
      <div className={styles.rightContainer}>
        <h2>Risultati del Modulo di Intelligenza Artificiale</h2>
        {analysisResult ? (
          <div>
            {/* Mostra i risultati dell'analisi */}
            {JSON.stringify(analysisResult)}
          </div>
        ) : (
          <p>Seleziona un paziente e calcola la probabilità.</p>
        )}
      </div>
    </div>
  );
};

export default ModuloIA;
