import PatientList from '../../components/patient/patientList'; // Importa il componente per la lista dei pazienti
import styles from './PatientPage.module.css';

const PatientPage = () => {
  return (
    <div className={styles.patientPageContainer}>
      <PatientList /> {/* Mostra la lista dei pazienti */}
    </div>
  );
};

export default PatientPage;
