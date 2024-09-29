import React, { useState, useEffect } from 'react';
import styles from './LoadCsvPage.module.css';
import UtilsDataServices from '../../services/utilsDataService';
import Loader from '../../components/Loader';

const LoadCsvPage = () => {
    const utilsDataServices = new UtilsDataServices();
    const [file, setFile] = useState(null);
    const [newDbName, setNewDbName] = useState('');  // Cambiato nome per chiarire
    const [selectedDb, setSelectedDb] = useState('');  // Usato per la selezione dei database esistenti
    const [message, setMessage] = useState('');
    const [databases, setDatabases] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDatabases = async () => {
            try {
                const dbList = await utilsDataServices.getDbList();
                setDatabases(dbList);
            } catch (error) {
                setMessage('Errore nel recupero dei database esistenti.');
            }
        };

        fetchDatabases();
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Funzione per gestire il cambiamento del nome di un nuovo database
    const handleNewDbNameChange = (e) => {
        setNewDbName(e.target.value);
    };

    // Funzione per gestire la selezione di un database esistente
    const handleSelectDbChange = async (e) => {
        const selectedDbName = e.target.value;
        setSelectedDb(selectedDbName);
        
        if (selectedDbName) {
            try {
                const switchMessage = await utilsDataServices.switchDb(selectedDbName);
                if (!switchMessage) throw new Error('Errore durante lo switch del database.');
                setMessage(`Database cambiato con successo: ${switchMessage}`);
            } catch (error) {
                setMessage(error.message);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !newDbName) {
            setMessage('Per favore, inserisci sia un file CSV che il nome del database.');
            return;
        }

        setLoading(true);

        try {
            const filePath = await utilsDataServices.uploadFile(file);
            if (!filePath) throw new Error('Errore durante il caricamento del file CSV.');

            const dbCreationMessage = await utilsDataServices.createDatabase(newDbName);
            if (!dbCreationMessage) throw new Error('Errore durante la creazione del database.');

            const csvLoadMessage = await utilsDataServices.loadCsvToDatabase(newDbName, filePath);
            if (!csvLoadMessage) throw new Error('Errore durante il caricamento del file CSV nel database.');

            setMessage('Caricamento del file CSV e creazione del database avvenuti con successo.');
        } catch (error) {
            setMessage(error.message);
        } finally { 
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            {loading ? (
                <Loader />  // Mostra il loader durante il caricamento
            ) : (
                <>
            <h1>Gestisci i Database</h1>
            
            {/* Sezione per creare un nuovo database e caricare un CSV */}
            <div className={styles.section}>
                <h2>Carica un nuovo file CSV e crea un database</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="newDbName">Nome del Nuovo Database:</label>
                        <input 
                            type="text"
                            id="newDbName"
                            value={newDbName}
                            onChange={handleNewDbNameChange}  // Funzione per gestire il nuovo database
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="file">Seleziona un file CSV:</label>
                        <input
                            type="file"
                            id="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            className={styles.input}
                        />
                    </div>
                    <button type="submit" className={styles.button}>Carica CSV</button>
                </form>
            </div>
            
            {message && <p className={styles.message}>{message}</p>}

            {/* Sezione per la selezione di un database esistente */}
            <div className={styles.section}>
                <h2>Seleziona un Database Esistente</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="existingDatabases">Database Esistenti:</label>
                    <select
                        id="existingDatabases"
                        onChange={handleSelectDbChange}  // Funzione per selezionare un database esistente
                        className={styles.input}
                        value={selectedDb}
                    >
                        <option value="">-- Seleziona un database --</option>
                        {databases.map((db) => (
                            <option key={db} value={db}>
                                {db}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            </>
        )}
        </div>
    );
};

export default LoadCsvPage;
