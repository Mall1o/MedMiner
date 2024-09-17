import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GraphComponent from '../../components/graph/GraphComponent';
import { fetchPatientGraphData } from '../../services/graphDataService';
import Loader from '../../components/Loader';
import './GraphPage.css';  // Importa il file di stile

const GraphPage = () => {
  const { codiceFiscale } = useParams();
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
