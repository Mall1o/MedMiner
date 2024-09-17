import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GraphComponent from '../../components/graph/GraphComponent';
import { fetchPatientGraphData } from '../../services/graphDataService';
import Loader from '../../components/Loader';
import styles from './GraphPage.module.css';  // Importa il CSS Module correttamente
import SyntheticDataTest from '../../components/detailsPanel/DetailPanel'; // Importa il componente per i dettagli del paziente

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
    <div className={styles.graphPageContainer}>
        {graphData ? (
        <div className={styles.graphContainer}>
          <GraphComponent data={graphData} />
        </div>
      ) : (
        <p>Impossibile caricare i dati del grafo.</p>
      )}
      <div className={styles.detailsPanel}>
        <SyntheticDataTest />
      </div>
    </div>
  );
};

export default GraphPage;
