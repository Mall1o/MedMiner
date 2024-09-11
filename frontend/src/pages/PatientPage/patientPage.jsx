import React, { useState } from 'react';
import PatientList from '../../components/patient/patientList'; // Importa il componente per la lista dei pazienti 
import './patientPage.css';
//import PatientGraph from './PatientGraph'; // Componente che mostra il grafo del paziente

const PatientPage = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showGraph, setShowGraph] = useState(false); // Stato per gestire la visibilità del grafo

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
  };

  const handleShowGraph = () => {
    setShowGraph(true); // Mostra il grafo al click
  };

  return (
    <div className="patient-page-container">
      {!showGraph ? ( // Se il grafo non è visibile
        <>
          {!selectedPatient ? (
            <PatientList onSelectPatient={handlePatientSelect} />
          ) : (
            <div className="patient-details">
              <h2>Dettagli del paziente: {selectedPatient.codice_fiscale_assistito}</h2>
              <button onClick={handleShowGraph} className="show-graph-btn">
                Mostra Grafo del Paziente
              </button>
            </div>
          )}
        </>
      ) : (
        <PatientGraph patient={selectedPatient} /> // Mostra il grafo del paziente selezionato
      )}
    </div>
  );
};

export default PatientPage;
