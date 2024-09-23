import React, { useEffect, useState } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';
import UtilsDataServices from '../../services/utilsDataService';
import styles from './diseaseDetails.module.css';

const DiseaseDetails = () => {
    const { gruppo } = useParams();  // Estrai il parametro 'gruppo' dall'URL
    const [diseases, setDiseases] = useState([]);
    const[searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [diseasesPerPage] = useState(7);  // Fissa il numero di malattie per pagina
    const navigate = useNavigate();

    const handleShowGraph = (disease) => {
        navigate(`/graph/${'malattia'}/${disease.codice}`);
    };

    useEffect(() => {
        const fetchDiseases = async () => {
            const utilsService = new UtilsDataServices();
            const data = await utilsService.getDiseases(gruppo);  // Fetch basata sul gruppo
            console.log(data);
            setDiseases(data);
        };

        fetchDiseases();
    }, [gruppo]);

    const filteredDiseases = diseases.filter((disease) => {
        return disease && disease.codice && disease.descrizione;
    });
    // Logica per la paginazione
    const indexOfLastDisease = currentPage * diseasesPerPage;
    const indexOfFirstDisease = indexOfLastDisease - diseasesPerPage;
    const currentDiseases = diseases.slice(indexOfFirstDisease, indexOfLastDisease);
    const totalPages = Math.ceil(diseases.length / diseasesPerPage);

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
            <h1>Malattie del Gruppo: {gruppo}</h1>
            <table className={styles.diseaseDetailsTable}>
                <thead>
                    <tr>
                        <th>Codice Malattia</th>
                        <th>Descrizione</th>
                    </tr>
                </thead>
                <tbody>
                    {currentDiseases.map((disease, index) => (
                        <tr key={index}>
                            <td>{disease.codice}</td>
                            <td>{disease.descrizione}</td>
                            <td>
                                <button onClick={() => handleShowGraph(disease)}>
                                    Visualizza Grafo
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Paginazione */}
            <div className={styles.paginationContainer}>
                <button onClick={paginatePrev} disabled={currentPage === 1}>Prev</button>
                <span>Pagina {currentPage} di {totalPages}</span>
                <button onClick={paginateNext} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
}

export default DiseaseDetails;
