import DiseaseDetails from '../../components/disease/diseaseDetails.jsx';
import styles from './diseasePage.module.css';

const DiseaseDetailsPage = () => {
    return (
        <div className={styles.diseasePageContainer}>
            <DiseaseDetails/> {/* Mostra la lista delle malattie associate al gruppo */}
        </div>
    );
}

export default DiseaseDetailsPage;