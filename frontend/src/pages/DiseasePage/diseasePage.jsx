import DiseaseList from '../../components/disease/diseaseList.jsx';
import styles from './diseasePage.module.css';

const DiseasePage = () => {
    return (
        <div className={styles.diseasePageContainer}>
            <DiseaseList /> {/* Mostra la lista delle malattie */}
        </div>
    );
}

export default DiseasePage;