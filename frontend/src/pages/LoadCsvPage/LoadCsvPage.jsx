import React, { useState, useEffect } from 'react';
import styles from './LoadCsvPage.module.css';
import UtilsDataServices from '../../services/utilsDataService';

const LoadCsvPage = () => {
    const utilsDataServices = new UtilsDataServices();
    const [file, setFile] = useState(null);
    const [dbName, setDbName] = useState('');
    const [message, setMessage] = useState('');
    const [databases, setDatabases] = useState([]);

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

    const handleDbNameChange = (e) => {
        setDbName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !dbName) {
            setMessage('Per favore, inserisci sia un file CSV che il nome del database.');
            return;
        }

        try {
            const filePath = await utilsDataServices.uploadFile(file);
            if (!filePath) throw new Error('Errore durante il caricamento del file CSV.');

            const dbCreationMessage = await utilsDataServices.createDatabase(dbName);
            if (!dbCreationMessage) throw new Error('Errore durante la creazione del database.');

            const csvLoadMessage = await utilsDataServices.loadCsvToDatabase(dbName, filePath);
            if (!csvLoadMessage) throw new Error('Errore durante il caricamento del file CSV nel database.');

            setMessage('Caricamento del file CSV e creazione del database avvenuti con successo.');
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Gestisci i Database</h1>
            
            {/* Sezione per il caricamento di un nuovo CSV */}
            <div className={styles.section}>
                <h2>Carica un nuovo file CSV</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="dbName">Nome del Database:</label>
                        <input 
                            type="text"
                            id="dbName"
                            value={dbName}
                            onChange={handleDbNameChange}
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

            {/* Sezione per la selezione di un database esistente */}
            <div className={styles.section}>
                <h2>Seleziona un Database Esistente</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="existingDatabases">Database Esistenti:</label>
                    <select
                        id="existingDatabases"
                        onChange={(e) => setDbName(e.target.value)}
                        className={styles.input}
                        value={dbName}
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
            
            {message && <p className={styles.message}>{message}</p>}
        </div>
    );
};

export default LoadCsvPage;
