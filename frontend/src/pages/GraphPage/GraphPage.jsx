// src/pages/GraphPage.jsx
import React, { useState, useEffect } from 'react';
import GraphComponent from '../../components/graph/GraphComponent'; // Importa il componente grafico
import { fetchGraphData } from '../../services/graphDataService'; // Servizio per il fetch dei dati
import Loader from '../../components/Loader'; 

const GraphPage = () => {
  const [graphData, setGraphData] = useState(null); // Stato per i dati del grafo
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchGraphData(); // Chiama il servizio per ottenere i dati
        if (data) {
          setGraphData(data); // Imposta i dati nel componente
        } else {
          setError('Errore nel caricamento dei dati del grafo');
        }
      } catch (err) {
        setError('Errore imprevisto: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <Loader />; // Mostra un caricamento se i dati non sono pronti
  if (error) return <div>{error}</div>; // Mostra un messaggio d'errore se c'è un problema

  return (
    <div>
      <h1>Visualizzazione del Grafo Paziente-Malattia-Prescrizione</h1>
      {graphData && <GraphComponent data={graphData} />} {/* Renderizza il grafo */}
    </div>
  );
};

export default GraphPage;
