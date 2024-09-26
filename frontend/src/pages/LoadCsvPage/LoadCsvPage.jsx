import React, { useState } from 'react';
import styles from './LoadCsvPage.module.css';
import UtilsDataServices from '../../services/utilsDataService';

const LoadCsvPage = () => {
    const utilsDataServices = new UtilsDataServices();
    const [file, setFile] = useState(null);
    const [dbName, setDbName] = useState('');
    const [message, setMessage] = useState('');

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
            // Step 1: Carica il file CSV al server
            const filePath = await utilsDataServices.uploadFile(file);
            if (!filePath) throw new Error('Errore durante il caricamento del file CSV.');

            // Step 2: Creazione del database
            const dbCreationMessage = await utilsDataServices.createDatabase(dbName);
            if (!dbCreationMessage) throw new Error('Errore durante la creazione del database.');

            // Step 3: Caricamento del CSV nel database
            const csvLoadMessage = await utilsDataServices.loadCsvToDatabase(dbName, filePath);
            if (!csvLoadMessage) throw new Error('Errore durante il caricamento del file CSV nel database.');

            setMessage('Caricamento del file CSV e creazione del database avvenuti con successo.');
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Carica un file CSV e crea un database</h1>
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
            {message && <p className={styles.message}>{message}</p>}
        </div>
    );
};

export default LoadCsvPage;
