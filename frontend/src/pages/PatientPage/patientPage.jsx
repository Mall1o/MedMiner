import React, { useState, useEffect } from 'react';
import PatientList from '../../components/patient/patientList'; // Importa il componente per la lista dei pazienti
import GraphComponent from '../../components/graph/GraphComponent'; // Importa il componente che mostra il grafo
import { fetchPatientGraphData } from '../../services/graphDataService'; // Importa la funzione di fetch
import './patientPage.css';
import Loader from '../../components/Loader'; 

const PatientPage = () => {
  return (
    <div className="patient-page-container">
      <PatientList /> {/* Mostra la lista dei pazienti */}
    </div>
  );
};

export default PatientPage;
