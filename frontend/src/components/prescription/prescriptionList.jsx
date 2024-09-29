import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import UtilsDataServices from '../../services/utilsDataService';
import styles from './prescriptionList.module.css';
import defaultAvatar from '../../assets/prescrizione_avatar.png';

const PrescriptionList = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1); 
    const [prescriptionsPerPage] = useState(6); // Numero fisso di prescrizioni per pagina
    const navigate = useNavigate();

    // Effettua la fetch delle prescrizioni dal servizio API
    useEffect(() => {
        const fetchPrescriptions = async () => {
            const utilsService = new UtilsDataServices();
            const data = await utilsService.getPrescriptions();
            setPrescriptions(data);
        };
        fetchPrescriptions();
    }, []);

    // Filtra le prescrizioni in base al termine di ricerca
    const filteredPrescriptions = prescriptions.filter((prescription) => {
        return (
            prescription &&
            prescription.codice &&
            prescription.codice.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    // Calcola l'indice dell'ultima prescrizione e della prima
    const indexOfLastPrescription = currentPage * prescriptionsPerPage;
    const indexOfFirstPrescription = indexOfLastPrescription - prescriptionsPerPage;
    const currentPrescriptions = filteredPrescriptions.slice(indexOfFirstPrescription, indexOfLastPrescription);

    const totalPages = Math.ceil(filteredPrescriptions.length / prescriptionsPerPage);

    // Funzioni per cambiare pagina
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

    // Funzione per visualizzare il grafo per una prescrizione selezionata
    const handleShowGraph = (prescription) => {
        navigate(`/graph/${'prescrizione'}/${prescription.codice}`); // Reindirizza alla pagina del grafo
    };

    return (
        <div className={styles.prescriptionListContainer}>
            {/* Search bar per filtrare le prescrizioni */}
            <input
                type="text"
                placeholder="Cerca prescrizione per codice..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.prescriptionSearchInput}
            />
            
            {/* Tabella delle prescrizioni */}
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
                        <tr key={prescription.codice}>
                            <td>
                                <img src={defaultAvatar} alt="avatar" className={styles.avatarImg} />
                            </td>
                            <td>{prescription.codice}</td>
                            <td>
                                <button 
                                    onClick={() => handleShowGraph(prescription)} 
                                    className={styles.viewGraphBtn}>
                                    Apri
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Paginazione */}
            <div className={styles.paginationContainer}>
                <button 
                    onClick={paginatePrev} 
                    className={styles.paginationBtn} 
                    disabled={currentPage === 1}>
                    Indietro
                </button>
                <button 
                    onClick={paginateNext} 
                    className={styles.paginationBtn} 
                    disabled={currentPage === totalPages}>
                    Avanti
                </button>
            </div>
        </div>
    );
}

export default PrescriptionList;
