//Classe che permette il fetch dei dati
export const fetchGraphData = async () => {
    try {
      const response = await fetch('http://localhost:5000/graph');
      if (!response.ok) {
        throw new Error('Errore nel recupero dei dati del grafo');
      }
      return await response.json();
    } catch (error) {
      console.error('Errore nel caricamento dei dati:', error);
      return null;
    }
  };
  
// Funzione per il fetch dei dati del grafo per un singolo paziente
export const fetchPatientGraphData = async (codiceFiscale) => {
  try {
    const response = await fetch('http://localhost:5000/graph/patient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ codice_fiscale: codiceFiscale }), // Invio del codice fiscale
    });
    if (!response.ok) {
      throw new Error('Errore nel recupero dei dati del grafo');
    }
    return await response.json(); // Ritorna i dati del grafo come JSON
  } catch (error) {
    console.error('Errore nel caricamento dei dati:', error);
    return null;
  }
};  

// Funzione per il fetch dei dati per una singola prescrizione
export const fetchPrescriptionGraphData = async (prescriptionCode) => {
    try {
      const response = await fetch('http://localhost:5000/graph/prescription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codice_prescrizione: prescriptionCode }), // Invio del codice prescrizione
      });
      if (!response.ok) {
        throw new Error('Errore nel recupero dei dati del grafo');
      }
      return await response.json(); // Ritorna i dati del grafo come JSON
    } catch (error) {
      console.error('Errore nel caricamento dei dati:', error);
      return null;
    }
  };