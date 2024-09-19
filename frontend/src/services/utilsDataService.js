class UtilsDataServices {

    async getStats() {
        try {
            const response = await fetch('http://localhost:5000/stats');
            if (!response.ok) {
              throw new Error('Errore nel recupero dei dati delle statistiche');
            }
            return await response.json();
          } catch (error) {
            console.error('Errore nel caricamento dei dati:', error);
            return null;
          }
    }


    async getUsers() {
        try {
            const response = await fetch(`http://localhost:5000/patients`);
            if (!response.ok) {
                throw new Error('Errore nel recupero della lista utenti');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getBetweenessMalattia() {
        try {
            const response = await fetch(`http://localhost:5000/betweenness/disease`);
            if (!response.ok) {
                throw new Error('Errore nel recupero della lista betweeness');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getDegreeGroupMalattia() {
        try {
            const response = await fetch(`http://localhost:5000/degree-centrality/disese`);
            if (!response.ok) {
                throw new Error('Errore nel recupero della lista degree');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}

export default UtilsDataServices;
