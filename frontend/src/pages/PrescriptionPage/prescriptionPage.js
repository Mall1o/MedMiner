export const usePrescriptionPageLogic = () => {
    const [selectedPrescription, setSelectedPrescription] = useState(null);
    
    const handlePrescriptionSelect = (prescription) => {
        setSelectedPrescription(prescription);
    };
    
    return { selectedPrescription, handlePrescriptionSelect };
}