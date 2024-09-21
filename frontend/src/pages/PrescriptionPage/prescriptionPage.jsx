import PrescriptionList from '../../components/prescription/prescriptionList.jsx';
import styles from './prescriptionPage.module.css';

const PrescriptionPage = () => {
    return (
        <div className={styles.prescriptionPageContainer}>
            <PrescriptionList /> {/* Mostra la lista delle prescrizioni */}
        </div>
    );
}

export default PrescriptionPage;