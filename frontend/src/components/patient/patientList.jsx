import React, { useEffect, useState } from 'react';
import UtilsDataServices from '../../services/utilsDataService';
import './patientList.css';
import defaultAvatar from '../../assets/user_icon.png';

const PatientList = ({ onSelectPatient }) => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      const utilsService = new UtilsDataServices();
      const data = await utilsService.getUsers();
      setPatients(data);
    };

    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((patient) =>{
    return patient && patient.codice_fiscale_assistito && patient.codice_fiscale_assistito.toLowerCase().includes(searchTerm.toLowerCase());    
  }
  );

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
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient.codice_fiscale_assistito} onClick={() => onSelectPatient(patient)}>
              <td>
                <img src={defaultAvatar} className="avatar-img" />
              </td>
              <td>{patient.codice_fiscale_assistito}</td>
              <td>{patient.eta_prima_diagnosi}</td>
              <td>{patient.sesso}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
