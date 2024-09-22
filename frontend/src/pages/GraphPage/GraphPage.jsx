import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GraphComponent from '../../components/graph/GraphComponent';
import { fetchPatientGraphData, fetchPrescriptionGraphData } from '../../services/graphDataService';
import UtilsDataServices from '../../services/utilsDataService';
import Loader from '../../components/Loader';
import styles from './GraphPage.module.css';  // Importa il CSS Module correttamente
import DetailsPanel from '../../components/detailsPanel/DetailPanel'; // Importa il componente per i dettagli del paziente

const GraphPage = () => {
  const { codice, tipo } = useParams();
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [originalGraphData, setOriginalGraphData] = useState(null); // Stato per mantenere i dati originali
  const [betweennessApplied, setBetweennessApplied] = useState(false); // Stato per il cambio di bottone


  useEffect(() => {
    const fetchGraphData = async () => {
      let data;

      if (tipo === 'paziente') {
        data = await fetchPatientGraphData(codice);  // Codice fiscale
      } else if (tipo === 'prescrizione') {
        data = await fetchPrescriptionGraphData(codice);  // Codice prescrizione
      }

      setGraphData(data);
      setOriginalGraphData(data); 
      setLoading(false);
    };

    fetchGraphData();
  }, [codice, tipo]);

  // Funzione per gestire il click su un nodo
  const handleNodeClick = (nodeData) => {
    setSelectedDetails({
      type: 'Nodo',
      ...nodeData
    });
  };

  // Funzione per gestire il click su un arco
  const handleEdgeClick = (edgeData) => {
    setSelectedDetails({
      type: 'Arco',
      ...edgeData
    });
  };

  // Funzione per applicare la betweenness centrality
  const applyBetweenness = async () => {
    try {
      if (!betweennessApplied) {
        const utilsService = new UtilsDataServices();
        const betweennessData = await utilsService.getBetweenessMalattia();

        // Modifica i nodi in base alla betweenness
        const updatedNodes = graphData.nodes.map(node => {
          if (node.type === 'Malattia') {
            const nodeBetweenness = betweennessData.find(item => item.icd9cm === node.properties.codice);
          const newSize = nodeBetweenness ? nodeBetweenness.betweeness * 0.04 : 25; // Scala la dimensione in base alla betweenness
            return {
              ...node,
              size: newSize,
            };
          }
          return node; // Restituisci il nodo anche se non è di tipo Malattia
        });

        setGraphData({
          ...graphData,
          nodes: updatedNodes,
        });
        setBetweennessApplied(true); // Aggiorna lo stato per il cambio di bottone
      } else {
        // Ripristina i dati originali
        setGraphData(originalGraphData);
        setBetweennessApplied(false); // Torna allo stato iniziale
      }
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.graphPageContainer}>
        {graphData ? (
        <div className={styles.graphContainer}>
          <GraphComponent
            data={graphData}
            onNodeClick={handleNodeClick}
            onEdgeClick={handleEdgeClick}
          />
        </div>
      ) : (
        <p>Impossibile caricare i dati del grafo.</p>
      )}
      <div className={styles.detailsPanel}>
      <DetailsPanel
          details={selectedDetails}
          applyBetweenness={applyBetweenness}
          isBetweennessApplied={betweennessApplied}
      />
      </div>
    </div>
  );
};

export default GraphPage;
