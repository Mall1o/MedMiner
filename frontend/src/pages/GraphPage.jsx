import React, { useEffect, useState } from 'react';
import Grafo from '../components/graph/Grafo';
import './GraphPage.css';

function GraphPage() {
    const [graphData, setGraphData] = useState({ nodes: [], relationships: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/graph')  // Assicurati che l'URL corrisponda al tuo backend
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setGraphData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Errore nel fetching dei dati:', error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="graph-page">Caricamento in corso...</div>;
    }

    if (error) {
        return <div className="graph-page error">Errore: {error}</div>;
    }

    return (
        <div className="graph-page">
            <h1>Visualizzazione del Grafo</h1>
            <Grafo graphData={graphData} />
        </div>
    );
}

export default GraphPage;
