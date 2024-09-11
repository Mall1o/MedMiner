export const usePatientPageLogic = () => {
    const [selectedPatient, setSelectedPatient] = useState(null);
  
    const handlePatientSelect = (patient) => {
      setSelectedPatient(patient);
    };
  
    return { selectedPatient, handlePatientSelect };
  };
  