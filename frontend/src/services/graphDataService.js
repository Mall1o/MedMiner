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
  