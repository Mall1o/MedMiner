import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import UtilsDataServices from '../../services/utilsDataService';
import './patientList.css';
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
    return patient && patient.codice_fiscale_assistito && 
           patient.codice_fiscale_assistito.toLowerCase().includes(searchTerm.toLowerCase());
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
    navigate(`/graph/${patient.codice_fiscale_assistito}`); // Reindirizza alla pagina del grafo
  };

  return (
    <div className="patient-list-container">
      <input
        type="text"
        placeholder="Search user..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="patient-search-input"
      />
      <table className="patient-list-table">
        <thead>
          <tr>
            <th></th>
            <th>Codice Fiscale</th>
            <th>Età prima diagnosi</th>
            <th>Sesso</th>
            <th>Visualizza Grafo</th>
          </tr>
        </thead>
        <tbody>
          {currentPatients.map((patient) => (
            <tr key={patient.codice_fiscale_assistito}>
              <td>
                <img src={defaultAvatar} className="avatar-img" alt="avatar" />
              </td>
              <td>{patient.codice_fiscale_assistito}</td>
              <td>{patient.eta_prima_diagnosi}</td>
              <td>{patient.sesso}</td>
              <td>
                <button onClick={() => handleShowGraph(patient)} className="view-graph-btn">
                  Visualizza Grafo
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={paginatePrev} disabled={currentPage === 1} className="pagination-button">Indietro</button>
        <button onClick={paginateNext} disabled={currentPage === totalPages} className="pagination-button">Avanti</button>
      </div>
    </div>
  );
};

export default PatientList;
