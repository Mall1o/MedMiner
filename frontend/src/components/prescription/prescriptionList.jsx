import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import UtilsDataServices from '../../services/utilsDataService';
import styles from './prescriptionList.module.css';
import defaultAvatar from '../../assets/user_icon.png';

const PrescriptionList = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1); 
    const [prescriptionsPerPage] = useState(6);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPrescriptions = async () => {
            const utilsService = new UtilsDataServices();
            const data = await utilsService.getPrescriptions();
            setPrescriptions(data);
        };

        fetchPrescriptions();
    }, []);

    const filteredPrescriptions = prescriptions.filter((prescription) => {
        return prescription && prescription.codice && prescription.codice.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const indexOfLastPrescription = currentPage * prescriptionsPerPage;
    const indexOfFirstPrescription = indexOfLastPrescription - prescriptionsPerPage;
    const currentPrescriptions = filteredPrescriptions.slice(indexOfFirstPrescription, indexOfLastPrescription);
    
    const totalPages = Math.ceil(filteredPrescriptions.length / prescriptionsPerPage);
    
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

    const handleShowGraph = (prescription) => {
        navigate(`/graph/${'prescrizione'}/${prescription.codice}`); // Reindirizza alla pagina del grafo
    };

    return (
        <div className={styles.prescriptionListContainer}>
            <input
                type="text"
                placeholder="Search prescription..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.prescriptionSearchInput}
            />
            <table className={styles.prescriptionListTable}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Codice Prescrizione</th>
                        <th>Visualizza Grafo</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPrescriptions.map((prescription) => (
                        <tr key={prescription.codice} >
                            <td>💊</td>
                            <td>{prescription.codice}</td>
                            <td>
                                 <button onClick={() => handleShowGraph(prescription)} className={styles.viewGraphBtn}>
                                  Visualizza Grafo
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.paginationContainer}>
                <button onClick={paginatePrev} className={styles.paginationBtn}>
                    Prev
                </button>
                <button onClick={paginateNext} className={styles.paginationBtn}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default PrescriptionList;