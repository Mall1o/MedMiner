import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import UtilsDataServices from '../../services/utilsDataService';
import styles from './diseaseList.module.css';
import defaultAvatar from '../../assets/group_avatar.jpg';

const DiseaseList = () => {
    const [diseasesGroup, setDiseasesGroup] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [diseasesPerPage] = useState(6);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDiseasesGroup = async () => {
            const utilsService = new UtilsDataServices();
            const data = await utilsService.getDiseasesGroup();
            setDiseasesGroup(data);
        };

        fetchDiseasesGroup();
    }, []);

    // Filtra le malattie in base al termine di ricerca
    const filteredDiseases = diseasesGroup.filter((disease) => {
        return (
            disease.gruppo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            disease.descrizione.toLowerCase().includes(searchTerm.toLowerCase())
        );
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
        navigate(`/diseases/${disease.gruppo}`);
    };

    return (
        <div className={styles.diseaseListContainer}>
            <input
                type="text"
                placeholder="Ricerca malattie per gruppo o descrizione..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.diseaseSearchInput}
            />
            <table className={styles.diseaseListTable}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Gruppo</th>
                        <th>Descrizione</th>
                        <th>Lista Malattie</th>
                    </tr>
                </thead>
                <tbody>
                    {currentDiseases.map((disease, index) => (
                        <tr key={index}>
                            <td>
                                <img src={defaultAvatar} className={styles.avatarImg} alt="avatar" />
                            </td>
                            <td>{disease.gruppo}</td>
                            <td>{disease.descrizione}</td>
                            <td>
                                <button 
                                    className={styles.viewGraphBtn}
                                    onClick={() => handleShowGroup(disease)}
                                >
                                    Visualizza
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.paginationContainer}>
                <button 
                    className={styles.paginationBtn} 
                    onClick={paginatePrev} 
                    disabled={currentPage === 1}
                >
                    Indietro
                </button>
                <button 
                    className={styles.paginationBtn} 
                    onClick={paginateNext} 
                    disabled={currentPage === totalPages}
                >
                    Avanti
                </button>
            </div>
        </div>
    );
}

export default DiseaseList;
