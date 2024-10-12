import React, { useState, useEffect } from 'react';
import styles from './LoadCsvPage.module.css';
import UtilsDataServices from '../../services/utilsDataService';
import Loader from '../../components/Loader';

const LoadCsvPage = () => {
    const utilsDataServices = new UtilsDataServices();
    const [file, setFile] = useState(null);
    const [newDbName, setNewDbName] = useState('');  
    const [selectedDb, setSelectedDb] = useState('');  
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');  
    const [databases, setDatabases] = useState([]);
    const [loading, setLoading] = useState(false);
    const [warningAccepted, setWarningAccepted] = useState(false);  // Stato per accettare l'avvertimento

    useEffect(() => {
        const fetchDatabases = async () => {
            try {
                const dbList = await utilsDataServices.getDbList();
                setDatabases(dbList);
            } catch (error) {
                setMessage('Errore nel recupero dei database esistenti.');
                setMessageType('error');  
            }
        };

        fetchDatabases();
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleNewDbNameChange = (e) => {
        setNewDbName(e.target.value);
    };

    const handleSelectDbChange = async (e) => {
        const selectedDbName = e.target.value;
        setSelectedDb(selectedDbName);
        
        if (selectedDbName) {
            try {
                const switchMessage = await utilsDataServices.switchDb(selectedDbName);
                if (!switchMessage) throw new Error('Errore durante lo switch del database.');
                setMessage(`Database cambiato con successo: ${switchMessage}`);
                setMessageType('success');  
            } catch (error) {
                setMessage(error.message);
                setMessageType('error');  
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !newDbName) {
            setMessage('Per favore, inserisci sia un file CSV che il nome del database.');
            setMessageType('error');  
            return;
        }

        if (!warningAccepted) {
            setMessage('Per favore, conferma di aver capito l\'ordine delle colonne.');
            setMessageType('error');
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
            setMessageType('success');  
        } catch (error) {
            setMessage(error.message);
            setMessageType('error');  
        } finally { 
            setLoading(false);
        }
    };

    const handleAcceptWarning = () => {
        setWarningAccepted(true);
        setMessage('');
    };

    return (
        <div className={styles.container}>
            {loading ? (
                <Loader />  
            ) : (
                <>
                    <h1>Gestisci i tuoi Database</h1>
                    
                    {/* Avvertimento prima del caricamento CSV */}
                    {!warningAccepted && (
                        <div className={styles.warning}>
                            <p>
                                Prima di caricare il file CSV, assicurati che le colonne siano nel seguente ordine e senza campi nulli:
                            </p>
                            <ul>
                                <li>CODICE_REGIONALE_MEDICO</li>
                                <li>CODICE_FISCALE_ASSISTITO</li>
                                <li>DATA_PRESCRIZIONE</li>
                                <li>TIPO_PRESCRIZIONE</li>
                                <li>ICD9_CM</li>
                                <li>DATA_PRIMA_DIAGNOSI</li>
                                <li>CODICE_PRESCRIZIONE</li>
                                <li>DESCRIZIONE_PRESCRIZIONE</li>
                                <li>QUANTITA_PRESCRIZIONE</li>
                                <li>ANNO_NASCITA</li>
                                <li>CAP_RESIDENZA</li>
                                <li>SESSO</li>
                                <li>DATA_ULTIMA_DIAGNOSI</li>
                                <li>DESCRIZIONE_MALATTIA</li>
                            </ul>
                            <button onClick={handleAcceptWarning} className={styles.acceptButton}>
                                Ho capito!
                            </button>
                        </div>
                    )}

                    {/* Sezione per creare un nuovo database e caricare un CSV */}
                    {warningAccepted && (
                        <div className={styles.section}>
                            <h2>Carica un nuovo file CSV e crea un database</h2>
                            <form onSubmit={handleSubmit} className={styles.form}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="newDbName">Nome del Nuovo Database:</label>
                                    <input 
                                        type="text"
                                        id="newDbName"
                                        value={newDbName}
                                        onChange={handleNewDbNameChange}  
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
                    )}
                    
                    {/* Visualizzazione del messaggio con stile condizionale */}
                    {message && (
                        <p className={`${styles.message} ${messageType === 'success' ? styles.success : styles.error}`}>
                            {message}
                        </p>
                    )}

                    {/* Sezione per la selezione di un database esistente */}
                    <div className={styles.section}>
                        <h2>Seleziona un Database Esistente</h2>
                        <div className={styles.formGroup}>
                            <label htmlFor="existingDatabases">Database Esistenti:</label>
                            <select
                                id="existingDatabases"
                                onChange={handleSelectDbChange}  
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
