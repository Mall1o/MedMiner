// PatientPage.jsx
import React from 'react';
import PatientList from '../../components/patient/patientList'; // Assicurati del percorso corretto
import styles from './PatientPage.module.css';

const PatientPage = () => {
  return (
    <div className={styles.patientPageContainer}>
      <PatientList mode="patient" /> {/* Passa il mode "patient" */}
    </div>
  );
};

export default PatientPage;
