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

    async getPrescriptions() {
        try {
            const response = await fetch(`http://localhost:5000/prescriptions`);
            if (!response.ok) {
                throw new Error('Errore nel recupero della lista prescrizioni');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getDiseasesGroup() {
        try {
            const response = await fetch(`http://localhost:5000/diseases_groups`);
            if (!response.ok) {
                throw new Error('Errore nel recupero della lista gruppo malattie');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getDiseases(gruppoMalattia) {
        try {
            const response = await fetch(`http://localhost:5000/diseases`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ gruppo: gruppoMalattia }),  // Assicurati che il nome del campo corrisponda a quello nel backend
            });
            if (!response.ok) {
                throw new Error('Errore nel recupero della lista malattie');
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

    async getFrequencyPrescriptionMalattia() {
        try {
            const response = await fetch(`http://localhost:5000/degree-centrality/prescription`);
            if (!response.ok) {
                throw new Error('Errore nel recupero della lista frequency');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

     // Funzione per caricare il file CSV
     async uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:5000/upload-file', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Errore durante il caricamento del file CSV');
            }
            const data = await response.json();
            return data.filePath;  // Restituisce il percorso del file caricato
        } catch (error) {
            console.error('Errore nel caricamento del file CSV:', error);
            return null;
        }
    }

    // Funzione per creare il database
    async createDatabase(dbName) {
        try {
            const response = await fetch('http://localhost:5000/create-database', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dbName }),
            });
            if (!response.ok) {
                throw new Error('Errore durante la creazione del database');
            }
            const data = await response.json();
            return data.message;
        } catch (error) {
            console.error('Errore durante la creazione del database:', error);
            return null;
        }
    }

    // Funzione per caricare il CSV nel database creato
    async loadCsvToDatabase(dbName, filePath) {
        try {
            const response = await fetch('http://localhost:5000/load-csv', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dbName, filePath }),
            });
            if (!response.ok) {
                throw new Error('Errore durante il caricamento del file CSV nel database');
            }
            const data = await response.json();
            return data.message;
        } catch (error) {
            console.error('Errore durante il caricamento del file CSV nel database:', error);
            return null;
        }
    }

    async getDbList() {
        try {
            const response = await fetch('http://localhost:5000/db-list');
            if (!response.ok) {
                throw new Error('Errore nel recupero della lista database');
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
