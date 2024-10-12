// PatientList.jsx
import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import UtilsDataServices from '../../services/utilsDataService';
import styles from './PatientList.module.css';
import defaultAvatar from '../../assets/user_icon.png';

const PatientList = ({ mode, onAnalysisResult}) => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(6);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchPatients = async () => {
      const utilsService = new UtilsDataServices();
      const data = await utilsService.getUsers();
      setPatients(data);
    };

    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((patient) => {
    const search = searchTerm.toLowerCase();
    const matchesCodiceFiscale = patient.codice_fiscale_assistito 
      ? patient.codice_fiscale_assistito.toLowerCase().includes(search)
      : false;
    const matchesAnnoNascita = patient.anno_nascita 
      ? patient.anno_nascita.toString().includes(search) 
      : false;
    const matchesSesso = patient.sesso 
      ? patient.sesso.toUpperCase().includes(search.toUpperCase()) 
      : false;
    const matchesCap = patient.cap_residenza
      ? patient.cap_residenza.toString().includes(search) 
      : false;
    return matchesCodiceFiscale || matchesAnnoNascita || matchesSesso || matchesCap;
  });

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  const paginateNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const paginatePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleShowGraph = (patient) => {
    navigate(`/graph/paziente/${patient.codice_fiscale_assistito}`);
  };

  const handleCalculateProbability = (patient) => {
    // Implementa la chiamata al modulo IA
    const result = null; /* chiamata al modulo IA con il paziente */
    onAnalysisResult(result);
  };

  return (
    <div className={styles.patientListContainer}>
      <input
        type="text"
        placeholder="Ricerca paziente per codice fiscale, anno di nascita, CAP o sesso"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.patientSearchInput}
      />
      <table className={styles.patientListTable}>
        <thead>
          <tr>
            <th></th>
            <th>Codice Fiscale</th>
            <th>Anno nascita</th>
            <th>Cap Residenza</th>
            <th>Sesso</th>
            <th>{mode === 'patient' ? 'Visualizza Grafo' : 'Calcola Probabilità'}</th>
          </tr>
        </thead>
        <tbody>
          {currentPatients.map((patient) => (
            <tr key={patient.codice_fiscale_assistito}>
              <td>
                <img src={defaultAvatar} className={styles.avatarImg} alt="avatar" />
              </td>
              <td>{patient.codice_fiscale_assistito}</td>
              <td>{patient.anno_nascita}</td>
              <td>{patient.cap_residenza}</td>
              <td>{patient.sesso}</td>
              <td>
                {mode === 'patient' ? (
                  <button onClick={() => handleShowGraph(patient)} className={styles.viewGraphBtn}>
                    Apri
                  </button>
                ) : (
                  <button onClick={() => handleCalculateProbability(patient)} className={styles.calculateProbabilityBtn}>
                    Calcola
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button onClick={paginatePrev} 
        disabled={currentPage === 1} 
        className={styles.paginationBtn}>
          Indietro
        </button>
        <button 
          onClick={paginateNext} 
          disabled={currentPage === totalPages} 
          className={styles.paginationBtn}>
          Avanti
        </button>
      </div>
    </div>
  );
};

export default PatientList;
