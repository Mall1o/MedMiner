import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Per ottenere i parametri dell'URL
import GraphComponent from '../../components/graph/GraphComponent'; // Il componente del grafo
import { fetchPatientGraphData } from '../../services/graphDataService';
import Loader from '../../components/Loader'; // Se hai un componente Loader

const GraphPage = () => {
  const { codiceFiscale } = useParams(); // Ottieni il codice fiscale dall'URL
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGraphData = async () => {
      const data = await fetchPatientGraphData(codiceFiscale);
      setGraphData(data);
      setLoading(false);
    };

    fetchGraphData();
  }, [codiceFiscale]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="graph-page-container">
      {graphData ? <GraphComponent data={graphData} /> : <p>Impossibile caricare i dati del grafo.</p>}
    </div>
  );
};

export default GraphPage;
