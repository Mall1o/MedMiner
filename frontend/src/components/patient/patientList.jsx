import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import UtilsDataServices from '../../services/utilsDataService';
import styles from './PatientList.module.css';
import defaultAvatar from '../../assets/user_icon.png';

const PatientList = () => {
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
    const search = searchTerm.toLowerCase(); // Converte il termine di ricerca in lowercase per evitare problemi con maiuscole/minuscole
  
    // Filtra per codice fiscale assistito (se esiste)
    const matchesCodiceFiscale = patient.codice_fiscale_assistito 
      ? patient.codice_fiscale_assistito.toLowerCase().includes(search)
      : false;
  
    // Filtra per anno di nascita (converti l'anno in stringa per confrontarlo)
    const matchesAnnoNascita = patient.anno_nascita 
      ? patient.anno_nascita.toString().includes(search) 
      : false;
  
    // Filtra per sesso (usa toUpperCase per il confronto del sesso)
    const matchesSesso = patient.sesso 
      ? patient.sesso.toUpperCase().includes(search.toUpperCase()) 
      : false;
  
    // Filtra per CAP (se esiste)
    const matchesCap = patient.cap_residenza
      ? patient.cap_residenza.toString().includes(search) 
      : false;
  
    // Ritorna vero se uno di questi campi corrisponde al termine di ricerca
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
    navigate(`/graph/${'paziente'}/${patient.codice_fiscale_assistito}`); // Reindirizza alla pagina del grafo
  };

  return (
    <div className={styles.patientListContainer}>
      <input
        type="text"
        placeholder="Ricerca paziente per codice fiscale, anno di nascita, CAP o sesso"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setPlaceholderVisible(false)}  // Nascondi il placeholder quando c'è il focus
        onBlur={() => setPlaceholderVisible(searchTerm === "")}  // Mostra il placeholder solo se il campo è vuoto
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
            <th>Visualizza Grafo</th>
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
                <button onClick={() => handleShowGraph(patient)} className={styles.viewGraphBtn}>
                  Apri
                </button>
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
