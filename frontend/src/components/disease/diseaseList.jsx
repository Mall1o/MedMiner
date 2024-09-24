import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import UtilsDataServices from '../../services/utilsDataService';
import styles from './diseaseList.module.css';
import defaultAvatar from '../../assets/user_icon.png';

const DiseaseList = () => {
    const [diseasesGroup, setDiseasesGroup] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [diseasesPerPage] = useState(7);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDiseasesGroup = async () => {
            const utilsService = new UtilsDataServices();
            const data = await utilsService.getDiseasesGroup();
            setDiseasesGroup(data);
        };

        fetchDiseasesGroup();
    }, []);

    const filteredDiseases = diseasesGroup.filter((diseases) => {
        return diseases && diseases.gruppo && diseases.descrizione;
    });

    const indexOfLastDisease = currentPage * diseasesPerPage;
    const indexOfFirstDisease = indexOfLastDisease - diseasesPerPage;
    const currentDiseases = filteredDiseases.slice(indexOfFirstDisease, indexOfLastDisease);

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

    const handleShowGroup = (disease) => {
        navigate(`/diseases/${disease.gruppo}`); // Reindirizza alla pagina del grafo
    };

    return (
        <div className={styles.diseaseListContainer}>
            <input
                type="text"
                placeholder="Search disease..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.diseaseSearchInput}
            />
            <table className={styles.diseaseListTable}>
                <thead>
                    <tr>
                        <th>Gruppo</th>
                        <th>Descrizione</th>
                        <th>Visualizza Malattie</th>
                    </tr>
                </thead>
                <tbody>
                    {currentDiseases.map((diseasesGroup, index) => (
                        <tr key={index}>
                            <td>{diseasesGroup.gruppo}</td>
                            <td>{diseasesGroup.descrizione}</td>
                            <td>
                                <button onClick={() => handleShowGroup(diseasesGroup)}>
                                
                                    Visualizza Malattie
                                </button>
                            </td>


                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.paginationContainer}>
                <button onClick={paginatePrev} disabled={currentPage === 1}>Prev</button>
                <button onClick={paginateNext} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
}

export default DiseaseList;