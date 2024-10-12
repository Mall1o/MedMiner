import UtilsDataServices from '../../services/utilsDataService';
import { useEffect, useState } from 'react';

// Funzione per gestire la logica di fetching dei dati
export const useHomeData = () => {
  const [stats, setStats] = useState({
    pazienti: 0,
    prescrizioni: 0,
    malattie: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const utilsService = new UtilsDataServices();
      const data = await utilsService.getStats();

      // Aggiorna lo stato con i dati ottenuti
      setStats({
        pazienti: data.patientCount,
        prescrizioni: data.prescriptionCount,
        malattie: data.diseaseCount,
      });
    };

    fetchData();
  }, []);

  return stats;
};
