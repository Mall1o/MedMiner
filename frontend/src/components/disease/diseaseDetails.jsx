import React, { useEffect, useState } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';
import UtilsDataServices from '../../services/utilsDataService';
import styles from './diseaseDetails.module.css';
import defaultAvatar from '../../assets/malattia_avatar.png';

const DiseaseDetails = () => {
    const { gruppo } = useParams();  // Estrai il parametro 'gruppo' dall'URL
    const [diseases, setDiseases] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');  // Stato per il termine di ricerca
    const [currentPage, setCurrentPage] = useState(1);
    const [diseasesPerPage] = useState(5);  // Fissa il numero di malattie per pagina
    const navigate = useNavigate();

    const handleShowGraph = (disease) => {
        navigate(`/graph/disease/${disease.codice}`);
    };

    const goBack = () => {
        navigate(-1); // Naviga indietro di una pagina
    };

    useEffect(() => {
        const fetchDiseases = async () => {
            const utilsService = new UtilsDataServices();
            const data = await utilsService.getDiseases(gruppo);  // Fetch basata sul gruppo
            setDiseases(data);
        };

        fetchDiseases();
    }, [gruppo]);

    // Funzione per filtrare le malattie in base al termine di ricerca
    const filteredDiseases = diseases.filter((disease) => {
        return (
            (disease.codice && disease.codice.toLowerCase().includes(searchTerm.toLowerCase())) || 
            (disease.descrizione && disease.descrizione.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });

    // Logica per la paginazione
    const indexOfLastDisease = currentPage * diseasesPerPage;
    const indexOfFirstDisease = indexOfLastDisease - diseasesPerPage;
    const currentDiseases = filteredDiseases.slice(indexOfFirstDisease, indexOfLastDisease);  // Applica la paginazione ai risultati filtrati
    const totalPages = Math.ceil(filteredDiseases.length / diseasesPerPage);

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

    return (
        <div className={styles.diseaseDetailsContainer}>
            <button onClick={goBack} className={styles.backButton}>
                Back
            </button>
            <h1>Malattie del Gruppo: {gruppo}</h1>

            {/* Barra di ricerca */}
            <input
                type="text"
                placeholder="Cerca per codice ICD9-CM..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.diseaseSearchInput}
            />

            <table className={styles.diseaseDetailsTable}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Codice Malattia</th>
                        <th>Visualizza Grafo</th>
                    </tr>
                </thead>
                <tbody>
                    {currentDiseases.length > 0 ? (
                        currentDiseases.map((disease, index) => (
                            <tr key={index}>
                                <td>
                                    <img src={defaultAvatar} className={styles.avatarImg} alt="avatar" />
                                </td>
                                <td>{disease.codice}</td>
                                <td>
                                    <button onClick={() => handleShowGraph(disease)} className={styles.viewGraphBtn}>
                                        Apri
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" style={{ textAlign: 'center' }}>Nessun risultato trovato</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Paginazione */}
            <div className={styles.pagination}>
                <button onClick={paginatePrev} disabled={currentPage === 1} className={styles.paginationBtn}>Indietro</button>
                <button onClick={paginateNext} disabled={currentPage === totalPages} className={styles.paginationBtn}>Avanti</button>
            </div>
        </div>
    );
}

export default DiseaseDetails;
