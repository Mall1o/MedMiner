// ModuloIA.jsx
import React from 'react';
import PatientList from '../../components/patient/patientList';
import styles from './ModuloIA.module.css';

const ModuloIA = () => {
  return (
    <div className={styles.moduloIAContainer}>
      <div className={styles.leftContainer}>
        <PatientList mode="moduloIA" /> {/* Passa il mode "moduloIA" */}
      </div>
      <div className={styles.rightContainer}>
        {/* Contenuto del container di destra */}
        <h2>Risultati del Modulo di Intelligenza Artificiale</h2>
        {/* Qui potrai inserire il risultato dell'analisi */}
      </div>
    </div>
  );
};

export default ModuloIA;
