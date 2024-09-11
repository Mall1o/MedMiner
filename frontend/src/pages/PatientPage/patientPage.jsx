import React, { useState, useEffect } from 'react';
import PatientList from '../../components/patient/patientList'; // Importa il componente per la lista dei pazienti
import GraphComponent from '../../components/graph/GraphComponent'; // Importa il componente che mostra il grafo
import { fetchPatientGraphData } from '../../services/graphDataService'; // Importa la funzione di fetch
import './patientPage.css';
import Loader from '../../components/Loader'; 

const PatientPage = () => {
  const [selectedPatient, setSelectedPatient] = useState(null); // Stato per il paziente selezionato
  const [showGraph, setShowGraph] = useState(false); // Stato per gestire la visibilità del grafo
  const [graphData, setGraphData] = useState(null); // Stato per i dati del grafo

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient); // Aggiorna il paziente selezionato
  };

  const handleShowGraph = async () => {
      setShowGraph(true); // Mostra il grafo al click
      const data = await fetchPatientGraphData(selectedPatient.codice_fiscale_assistito); // Fetch dei dati del grafo per il paziente
      setGraphData(data); // Aggiorna i dati del grafo
    
  };

  return (
    <div className="patient-page-container">
      {!showGraph ? ( // Se il grafo non è visibile
        <>
          {!selectedPatient ? (
            // Se non è stato selezionato un paziente, mostra la lista
            <PatientList onSelectPatient={handlePatientSelect} />
          ) : (
            // Mostra i dettagli del paziente selezionato
            <div className="patient-details">
              <h2>Dettagli del paziente: {selectedPatient.codice_fiscale_assistito}</h2>
              <button onClick={handleShowGraph} className="show-graph-btn">
                Mostra Grafo del Paziente
              </button>
            </div>
          )}
        </>
      ) : (
        // Mostra il grafo del paziente selezionato, passando i dati del grafo come props
        graphData && <GraphComponent data={graphData} />
      )}
    </div>
  );
};

export default PatientPage;
